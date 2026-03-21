import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_ADDRESS = 'Hair Restoration Guide <notifications@hairrestorationguide.com>'

interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

/**
 * Send an email via Resend. Fire-and-forget — logs errors
 * but never throws so it won't block API responses.
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  if (!resend) {
    console.warn('[Email] RESEND_API_KEY not set — skipping email send')
    return null
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    })

    if (error) {
      console.error('[Email] Resend error:', error)
      return null
    }

    console.log('[Email] Sent successfully:', data?.id)
    return data
  } catch (err) {
    console.error('[Email] Failed to send:', err)
    return null
  }
}
