import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'

const client = new BedrockRuntimeClient({
  region: process.env.REGION_AWS ?? 'ap-south-1',
  // Credentials auto-discovered from Amplify Lambda execution role in production
  // For local dev, set AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY in .env.local
  ...(process.env.AWS_ACCESS_KEY_ID && {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  }),
})

export type BedrockModel = 
  | 'anthropic.claude-3-5-sonnet-20240620-v1:0'  // Best quality, most expensive
  | 'anthropic.claude-3-haiku-20240307-v1:0'     // Fast, cheap, good for simple tasks
  | 'meta.llama3-70b-instruct-v1:0'              // Open source, good balance
  | 'mistral.mistral-large-2402-v1:0'            // European, GDPR-friendly

interface BedrockRequest {
  model: BedrockModel
  prompt: string
  maxTokens?: number
  temperature?: number
  systemPrompt?: string
}

interface BedrockResponse {
  text: string
  usage: {
    inputTokens: number
    outputTokens: number
  }
}

export async function invokeBedrock({
  model,
  prompt,
  maxTokens = 2000,
  temperature = 0.7,
  systemPrompt,
}: BedrockRequest): Promise<BedrockResponse> {
  try {
    // Format request based on model provider
    let payload: any

    if (model.startsWith('anthropic.claude')) {
      // Claude format
      payload = {
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: maxTokens,
        temperature,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }
      if (systemPrompt) {
        payload.system = systemPrompt
      }
    } else if (model.startsWith('meta.llama')) {
      // Llama format
      payload = {
        prompt: systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt,
        max_gen_len: maxTokens,
        temperature,
      }
    } else if (model.startsWith('mistral')) {
      // Mistral format
      payload = {
        prompt: systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt,
        max_tokens: maxTokens,
        temperature,
      }
    }

    const command = new InvokeModelCommand({
      modelId: model,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload),
    })

    const response = await client.send(command)
    const responseBody = JSON.parse(new TextDecoder().decode(response.body))

    // Parse response based on model provider
    let text: string
    let usage: { inputTokens: number; outputTokens: number }

    if (model.startsWith('anthropic.claude')) {
      text = responseBody.content[0].text
      usage = {
        inputTokens: responseBody.usage.input_tokens,
        outputTokens: responseBody.usage.output_tokens,
      }
    } else if (model.startsWith('meta.llama')) {
      text = responseBody.generation
      usage = {
        inputTokens: responseBody.prompt_token_count || 0,
        outputTokens: responseBody.generation_token_count || 0,
      }
    } else if (model.startsWith('mistral')) {
      text = responseBody.outputs[0].text
      usage = {
        inputTokens: 0, // Mistral doesn't return token counts
        outputTokens: 0,
      }
    } else {
      throw new Error(`Unsupported model: ${model}`)
    }

    return { text, usage }
  } catch (error: any) {
    console.error('Bedrock invocation error:', error)
    throw new Error(`Failed to invoke Bedrock: ${error.message}`)
  }
}

// Cost calculation (approximate, in USD)
export function calculateCost(model: BedrockModel, inputTokens: number, outputTokens: number): number {
  const pricing: Record<BedrockModel, { input: number; output: number }> = {
    'anthropic.claude-3-5-sonnet-20240620-v1:0': { input: 0.003, output: 0.015 }, // per 1K tokens
    'anthropic.claude-3-haiku-20240307-v1:0': { input: 0.00025, output: 0.00125 },
    'meta.llama3-70b-instruct-v1:0': { input: 0.00099, output: 0.00099 },
    'mistral.mistral-large-2402-v1:0': { input: 0.008, output: 0.024 },
  }

  const rates = pricing[model]
  if (!rates) return 0

  const inputCost = (inputTokens / 1000) * rates.input
  const outputCost = (outputTokens / 1000) * rates.output
  return inputCost + outputCost
}
