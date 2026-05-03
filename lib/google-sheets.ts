import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { FormField } from '@/lib/types'

const CLIENT_ID      = process.env.GOOGLE_CLIENT_ID!
const CLIENT_SECRET  = process.env.GOOGLE_CLIENT_SECRET!
const REDIRECT_URI   = process.env.GOOGLE_REDIRECT_URI!
const SIGNING_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// ─── State signing (CSRF protection for OAuth callback) ──────────────────────

export function signOAuthState(data: string): string {
  const sig = crypto
    .createHmac('sha256', SIGNING_SECRET)
    .update(data)
    .digest('hex')
    .slice(0, 16)
  return `${Buffer.from(data).toString('base64url')}.${sig}`
}

export function verifyOAuthState(state: string): string | null {
  const dot = state.lastIndexOf('.')
  if (dot === -1) return null
  const encoded = state.slice(0, dot)
  const sig     = state.slice(dot + 1)
  try {
    const data     = Buffer.from(encoded, 'base64url').toString()
    const expected = crypto
      .createHmac('sha256', SIGNING_SECRET)
      .update(data)
      .digest('hex')
      .slice(0, 16)
    return expected === sig ? data : null
  } catch {
    return null
  }
}

// ─── OAuth URL ────────────────────────────────────────────────────────────────

export function getGoogleAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id:     CLIENT_ID,
    redirect_uri:  REDIRECT_URI,
    response_type: 'code',
    scope:         'https://www.googleapis.com/auth/spreadsheets',
    access_type:   'offline',
    prompt:        'consent', // always return refresh_token
    state,
  })
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`
}

// ─── Token exchange ───────────────────────────────────────────────────────────

export async function exchangeCodeForTokens(code: string) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id:     CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri:  REDIRECT_URI,
      grant_type:    'authorization_code',
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error_description || 'Token exchange failed')
  }
  return res.json() as Promise<{
    access_token:  string
    refresh_token?: string
    expires_in:    number
    token_type:    string
  }>
}

// ─── Token refresh ────────────────────────────────────────────────────────────

async function refreshAccessToken(refreshToken: string) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id:     CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type:    'refresh_token',
    }),
  })
  if (!res.ok) throw new Error('Token refresh failed')
  return res.json() as Promise<{ access_token: string; expires_in: number }>
}

// ─── Get a valid access token (auto-refreshes when near expiry) ───────────────

async function getValidAccessToken(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { googleAccessToken: true, googleRefreshToken: true, googleTokenExpiry: true },
  })
  if (!user?.googleRefreshToken) throw new Error('Google account not connected')

  const nearExpiry =
    !user.googleTokenExpiry ||
    user.googleTokenExpiry <= new Date(Date.now() + 60_000)

  if (nearExpiry) {
    const { access_token, expires_in } = await refreshAccessToken(user.googleRefreshToken)
    await prisma.user.update({
      where: { id: userId },
      data: {
        googleAccessToken: access_token,
        googleTokenExpiry: new Date(Date.now() + expires_in * 1000),
      },
    })
    return access_token
  }

  return user.googleAccessToken!
}

// ─── Spreadsheet ID extraction ────────────────────────────────────────────────

export function extractSpreadsheetId(url: string): string | null {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  return match ? match[1] : null
}

// ─── Low-level Sheets API request ─────────────────────────────────────────────

async function sheetsRequest(
  accessToken: string,
  method: string,
  path: string,
  body?: object
) {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets${path}`, {
    method,
    headers: {
      Authorization:  `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Sheets API error ${res.status}`)
  }
  return res.json()
}

// ─── Main: append a form response as a new row ────────────────────────────────

export async function appendToGoogleSheet(
  formId: string,
  responseData: Record<string, any>
): Promise<void> {
  try {
    // Load form + owner in one query
    const form = await prisma.form.findUnique({
      where: { id: formId },
      select: {
        googleSheetsEnabled: true,
        googleSheetId:       true,
        googleSheetTab:      true,
        fields:              true,
        userId:              true,
      },
    })

    if (!form?.googleSheetsEnabled || !form.googleSheetId) return

    const accessToken = await getValidAccessToken(form.userId)
    const sheetTab    = form.googleSheetTab || 'Sheet1'
    const range       = `${sheetTab}!A:ZZ`

    const inputFields = (form.fields as unknown as FormField[]).filter(
      (f) => !['section', 'heading', 'image'].includes(f.type)
    )
    const headers = ['Submitted At (IST)', ...inputFields.map((f) => f.label)]
    const dataRow: string[] = [
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      ...inputFields.map((f) => {
        const v = responseData[f.id]
        if (v === undefined || v === null) return ''
        if (Array.isArray(v)) return v.join(', ')
        return String(v)
      }),
    ]

    // Check if the sheet already has data; write header row on first use
    const existing = await sheetsRequest(
      accessToken,
      'GET',
      `/${form.googleSheetId}/values/${encodeURIComponent('A1')}`
    )
    const hasData = !!(existing.values && existing.values.length > 0)

    if (!hasData) {
      await sheetsRequest(
        accessToken,
        'PUT',
        `/${form.googleSheetId}/values/${encodeURIComponent('A1')}?valueInputOption=USER_ENTERED`,
        { values: [headers] }
      )
    }

    await sheetsRequest(
      accessToken,
      'POST',
      `/${form.googleSheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      { values: [dataRow] }
    )
  } catch (error) {
    // Non-blocking — log but never fail the form submission
    console.error('Google Sheets append error:', error)
  }
}
