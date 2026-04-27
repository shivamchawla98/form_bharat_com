'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles, Loader2, RefreshCw, Check } from 'lucide-react'
import { FormField } from '@/lib/types'
import { getValidToken } from '@/lib/getToken'

interface AIFormGeneratorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onFormGenerated: (form: { title: string; description: string; fields: FormField[] }) => void
}

interface GeneratedForm {
  title: string
  description: string
  fields: Array<{
    type: string
    label: string
    placeholder: string
    required: boolean
    options?: string[]
  }>
  metadata?: {
    tokensUsed: number
    cost: string
    remainingGenerations: number
  }
}

const EXAMPLE_PROMPTS = [
  'Customer feedback form for my restaurant',
  'Event registration form for a tech conference',
  'Job application form for software engineer position',
  'Product order form for handmade jewelry',
  'Student enrollment form for online courses',
]

export function AIFormGenerator({ open, onOpenChange, onFormGenerated }: AIFormGeneratorProps) {
  const [description, setDescription] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generatedForm, setGeneratedForm] = useState<GeneratedForm | null>(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!description.trim() || description.length < 10) {
      setError('Please enter at least 10 characters')
      return
    }

    setGenerating(true)
    setError('')
    setGeneratedForm(null)

    try {
      const token = await getValidToken()
      if (!token) {
        throw new Error('Please log in to use AI features')
      }

      const response = await fetch('/api/ai/generate-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          language: 'en', // TODO: Detect from browser or user preference
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate form')
      }

      const data: GeneratedForm = await response.json()
      setGeneratedForm(data)
    } catch (err: any) {
      setError(err.message || 'Failed to generate form. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const handleUseForm = () => {
    if (!generatedForm) return

    // Convert AI fields to FormField format with IDs
    const fieldsWithIds: FormField[] = generatedForm.fields.map((field, index) => ({
      id: `field-${Date.now()}-${index}`,
      type: field.type as any,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      options: field.options,
    }))

    onFormGenerated({
      title: generatedForm.title,
      description: generatedForm.description,
      fields: fieldsWithIds,
    })

    // Reset and close
    setDescription('')
    setGeneratedForm(null)
    setError('')
    onOpenChange(false)
  }

  const handleRegenerate = () => {
    setGeneratedForm(null)
    handleGenerate()
  }

  const handleReset = () => {
    setDescription('')
    setGeneratedForm(null)
    setError('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Sparkles className="h-5 w-5 text-orange-500" />
            AI Form Generator
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            Describe your form in plain English — AI builds it in seconds.
          </DialogDescription>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

          {/* Prompt textarea — always visible */}
          <div>
            <Textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                setError('')
              }}
              placeholder="E.g., Customer feedback form for my restaurant with food quality and service ratings"
              className="min-h-[90px] text-sm resize-none"
              disabled={generating}
            />
            <div className="flex items-center justify-between mt-1.5">
              {error ? (
                <p className="text-xs text-red-600">{error}</p>
              ) : (
                <p className="text-xs text-gray-400">Be specific for best results</p>
              )}
              <p className="text-xs text-gray-400">{description.length}/500</p>
            </div>
          </div>

          {/* Example chips — hide once a form is generated */}
          {!generatedForm && !generating && (
            <div className="flex flex-wrap gap-1.5">
              {EXAMPLE_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setDescription(prompt)}
                  className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 border border-transparent hover:border-orange-200 rounded-full transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Loading state */}
          {generating && (
            <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3.5">
              <Loader2 className="h-4 w-4 text-orange-500 animate-spin flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-800">Building your form…</p>
                <p className="text-xs text-gray-500">Usually takes 5–10 seconds</p>
              </div>
            </div>
          )}

          {/* Generated form preview — always shown once available */}
          {generatedForm && !generating && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              {/* Preview header */}
              <div className="bg-orange-50 px-4 py-3 border-b border-orange-100 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-base text-gray-900 leading-snug">{generatedForm.title}</h3>
                  {generatedForm.description && (
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">{generatedForm.description}</p>
                  )}
                </div>
                <span className="flex-shrink-0 flex items-center gap-1 text-xs text-orange-600 bg-white border border-orange-200 px-2 py-1 rounded-full font-medium">
                  <Check className="h-3 w-3" />
                  {generatedForm.fields.length} fields
                </span>
              </div>

              {/* Field list */}
              <div className="divide-y divide-gray-100 max-h-[260px] overflow-y-auto">
                {generatedForm.fields.map((field, index) => (
                  <div key={index} className="px-4 py-3 flex items-start gap-3">
                    <span className="mt-0.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-100 px-1.5 py-0.5 rounded flex-shrink-0">
                      {field.type}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 leading-snug">
                        {field.label}
                        {field.required && <span className="text-orange-500 ml-0.5">*</span>}
                      </p>
                      {field.options && field.options.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {field.options.map((option, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                              {option}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions — always visible */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex gap-2.5">
          {generatedForm && !generating ? (
            <>
              <Button onClick={handleUseForm} className="flex-1 bg-orange-500 hover:bg-orange-600">
                <Check className="mr-2 h-4 w-4" />
                Use This Form
              </Button>
              <Button
                onClick={handleRegenerate}
                variant="outline"
                disabled={generating}
                className="px-3"
                title="Regenerate"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button onClick={handleReset} variant="outline">
                Start Over
              </Button>
            </>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={generating || !description.trim()}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {description.trim() ? 'Generate Form' : 'Describe your form above'}
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
