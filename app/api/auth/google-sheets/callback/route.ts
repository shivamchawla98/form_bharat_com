import { NextRequest, NextResponse } from 'next/server'
import { verifyOAuthState, exchangeCodeForTokens } from '@/lib/google-sheets'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code  = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  const base = new URL(request.url).origin

  if (error || !code || !state) {
    return NextResponse.redirect(`${base}/dashboard?google=error`)
  }

  const stateData = verifyOAuthState(state)
  if (!stateData) {
    return NextResponse.redirect(`${base}/dashboard?google=invalid`)
  }

  const [userId, formId] = stateData.split(':')

  try {
    const tokens = await exchangeCodeForTokens(code)

    await prisma.user.update({
      where: { id: userId },
      data: {
        googleAccessToken: tokens.access_token,
        // Google only sends refresh_token on first consent; preserve existing one if absent
        ...(tokens.refresh_token && { googleRefreshToken: tokens.refresh_token }),
        googleTokenExpiry: new Date(Date.now() + tokens.expires_in * 1000),
      },
    })

    return NextResponse.redirect(
      `${base}/dashboard/forms/${formId}/settings?google=connected`
    )
  } catch (err) {
    console.error('Google OAuth callback error:', err)
    return NextResponse.redirect(
      `${base}/dashboard/forms/${formId}/settings?google=error`
    )
  }
}
