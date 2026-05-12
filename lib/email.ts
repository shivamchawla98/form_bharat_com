import { Resend } from 'resend'
import { prisma } from './prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || 'FormBharat <onboarding@resend.dev>'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://formbharat.com'

// ─── Generic send ────────────────────────────────────────────────────────────

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[]
  subject: string
  html: string
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not set — skipping send')
    return
  }

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  })

  if (error) {
    console.error('[email] Resend error:', error)
    throw new Error(error.message || 'Failed to send email')
  }
}

// ─── Form submission notification ────────────────────────────────────────────

export async function sendFormNotification(
  formId: string,
  responseId: string,
  responseData: Record<string, any>
): Promise<void> {
  if (!process.env.RESEND_API_KEY) return

  try {
    // Fetch form + owner email in one query
    const form = await prisma.form.findUnique({
      where: { id: formId },
      select: {
        title: true,
        emailNotificationsEnabled: true,
        emailRecipients: true,
        user: { select: { email: true } },
        _count: { select: { responses: true } },
      },
    })

    if (!form) return

    // Opt-out model:
    // - If explicitly disabled AND the owner has set up recipients → respect that choice
    // - If never configured (empty recipients) → default ON to form owner
    // - If enabled → send to configured recipients or fall back to owner
    const hasBeenConfigured = form.emailRecipients.length > 0
    if (form.emailNotificationsEnabled === false && hasBeenConfigured) {
      return // Owner explicitly turned it off
    }

    const recipients: string[] = hasBeenConfigured
      ? form.emailRecipients
      : [form.user.email]

    const totalResponses = form._count.responses

    const html = buildNotificationEmail({
      formTitle: form.title,
      formId,
      responseId,
      responseData,
      totalResponses,
    })

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: recipients,
      subject: `New response on "${form.title}"`,
      html,
    })
  } catch (err) {
    // Never let email errors break the submission flow
    console.error('[email] sendFormNotification error:', err)
  }
}

// ─── OTP verification email ───────────────────────────────────────────────────

export function buildOTPEmail(otp: string, formDescription?: string): string {
  const digits = otp.split('')
  const digitCells = digits
    .map(
      (d) =>
        `<td style="width:44px;height:56px;background:#fff7ed;border:2px solid #fed7aa;border-radius:10px;text-align:center;vertical-align:middle;font-size:28px;font-weight:800;color:#ea580c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">${d}</td>`
    )
    .join('<td style="width:8px"></td>')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Your FormBharat verification code</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%">

          <!-- Brand header -->
          <tr>
            <td style="background:linear-gradient(135deg,#f97316,#ec4899);border-radius:12px 12px 0 0;padding:24px 32px">
              <div style="display:inline-flex;align-items:center">
                <div style="width:32px;height:32px;background:rgba(255,255,255,0.25);border-radius:8px;text-align:center;line-height:32px;font-weight:900;font-size:16px;color:#fff;display:inline-block">F</div>
                <span style="color:rgba(255,255,255,0.95);font-size:15px;font-weight:600;margin-left:10px">FormBharat</span>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#fff;padding:36px 32px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb">

              <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827">Here's your code</p>
              <p style="margin:0 0 28px;font-size:14px;color:#6b7280">Use it within the next 10 minutes. It's one-time only.</p>

              <!-- OTP digits -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 28px">
                <tr>${digitCells}</tr>
              </table>

              ${
                formDescription
                  ? `<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px 16px;margin-bottom:24px">
                       <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em">You're building</p>
                       <p style="margin:0;font-size:13px;color:#374151;font-style:italic">"${formDescription}"</p>
                     </div>`
                  : ''
              }

              <p style="margin:0;font-size:13px;color:#9ca3af">
                Didn't request this? Ignore this email — nothing will happen.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#fff;padding:16px 32px 28px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;border-radius:0 0 12px 12px">
              <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 16px" />
              <p style="margin:0;font-size:11px;color:#d1d5db;text-align:center">
                FormBharat · Free AI form builder for Indian businesses ·
                <a href="${APP_URL}" style="color:#d1d5db;text-decoration:none">formbharat.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── Form submission notification ────────────────────────────────────────────

function buildNotificationEmail({
  formTitle,
  formId,
  responseId,
  responseData,
  totalResponses,
}: {
  formTitle: string
  formId: string
  responseId: string
  responseData: Record<string, any>
  totalResponses: number
}): string {
  const responsesUrl = `${APP_URL}/dashboard/forms/${formId}/responses`

  // Build response rows — skip internal meta fields
  const filteredEntries = Object.entries(responseData).filter(
    ([key]) => !key.startsWith('_')
  )

  const dataRows = filteredEntries.length > 0
    ? filteredEntries
        .map(([key, value]) => {
          const label = key
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase())
          const displayValue = Array.isArray(value)
            ? value.join(', ')
            : value === null || value === undefined || value === ''
            ? '<span style="color:#9ca3af;font-style:italic">—</span>'
            : String(value)
          return `
            <tr>
              <td style="padding:10px 16px;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;font-weight:500;width:35%;vertical-align:top">${label}</td>
              <td style="padding:10px 16px;border-bottom:1px solid #f3f4f6;font-size:13px;color:#111827;vertical-align:top">${displayValue}</td>
            </tr>`
        })
        .join('')
    : `<tr><td colspan="2" style="padding:16px;font-size:13px;color:#9ca3af;text-align:center">No response data</td></tr>`

  const totalLabel = totalResponses === 1
    ? '1 total response'
    : `${totalResponses} total responses`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New response on ${formTitle}</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#f97316,#ec4899);border-radius:12px 12px 0 0;padding:28px 32px">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display:inline-flex;align-items:center;gap:8px">
                      <div style="width:32px;height:32px;background:rgba(255,255,255,0.25);border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;color:#fff;line-height:32px;text-align:center">F</div>
                      <span style="color:rgba(255,255,255,0.9);font-size:14px;font-weight:600;margin-left:8px">FormBharat</span>
                    </div>
                    <p style="color:#fff;font-size:22px;font-weight:700;margin:16px 0 4px">New response received</p>
                    <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:0">${formTitle}</p>
                  </td>
                  <td align="right" style="vertical-align:bottom">
                    <span style="background:rgba(255,255,255,0.2);color:#fff;font-size:12px;font-weight:600;padding:4px 12px;border-radius:100px">${totalLabel}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Response data -->
          <tr>
            <td style="background:#fff;padding:0;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${dataRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:#fff;padding:24px 32px 32px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;border-radius:0 0 12px 12px;text-align:center">
              <a href="${responsesUrl}"
                 style="display:inline-block;background:#f97316;color:#fff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none">
                View all responses →
              </a>
              <p style="color:#9ca3af;font-size:12px;margin:16px 0 0">
                To stop these emails, go to
                <a href="${responsesUrl.replace('/responses', '/settings')}" style="color:#f97316;text-decoration:none">Form Settings</a>
                and disable notifications.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px;text-align:center">
              <p style="color:#d1d5db;font-size:11px;margin:0">
                FormBharat · Free form builder for Indian businesses ·
                <a href="${APP_URL}" style="color:#d1d5db">formbharat.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
