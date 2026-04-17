import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { nanoid } from 'nanoid'

const s3 = new S3Client({
  region: process.env.REGION_AWS ?? process.env.AWS_DEFAULT_REGION ?? 'ap-south-1',
  // No credentials config — SDK automatically uses the Amplify Lambda execution role.
  // For local dev, set AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY in .env.local.
  ...(process.env.AWS_ACCESS_KEY_ID && {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  }),
})

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
const MAX_SIZE_MB = 5

export async function POST(request: NextRequest) {
  try {
    const { filename, contentType, sizeBytes } = await request.json()

    if (!filename || !contentType) {
      return NextResponse.json({ error: 'filename and contentType are required' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json({ error: 'Only image files are allowed (JPEG, PNG, GIF, WebP, SVG)' }, { status: 400 })
    }

    if (sizeBytes && sizeBytes > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json({ error: `File size must be under ${MAX_SIZE_MB}MB` }, { status: 400 })
    }

    const bucket = process.env.S3_BUCKET_NAME
    const publicBase = process.env.S3_PUBLIC_URL

    if (!bucket || !publicBase) {
      return NextResponse.json({ error: 'S3 is not configured on this server' }, { status: 500 })
    }

    const ext = filename.split('.').pop()?.toLowerCase() || 'jpg'
    const key = `form-images/${nanoid()}.${ext}`

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    })

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 })
    const publicUrl = `${publicBase.replace(/\/$/, '')}/${key}`

    return NextResponse.json({ uploadUrl, publicUrl })
  } catch (error: any) {
    console.error('Upload presign error:', error)
    return NextResponse.json({ error: error.message || 'Failed to generate upload URL' }, { status: 500 })
  }
}
