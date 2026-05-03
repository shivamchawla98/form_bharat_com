import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { signOAuthState, getGoogleAuthUrl } from '@/lib/google-sheets'
import { prisma } from '@/lib/prisma'

// GET — return Google OAuth URL for the given formId
export async function GET(request: NextRequest) {
  const user = await verifyAuth(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formId = request.nextUrl.searchParams.get('formId')
  if (!formId) return NextResponse.json({ error: 'formId required' }, { status: 400 })

  const state = signOAuthState(`${user.id}:${formId}`)
  const url   = getGoogleAuthUrl(state)

  return NextResponse.json({ url })
}

// DELETE — disconnect Google account (clear stored tokens)
export async function DELETE(request: NextRequest) {
  const user = await verifyAuth(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.user.update({
    where: { id: user.id },
    data: {
      googleAccessToken:  null,
      googleRefreshToken: null,
      googleTokenExpiry:  null,
    },
  })

  return NextResponse.json({ success: true })
}
