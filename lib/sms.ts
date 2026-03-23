import twilio from 'twilio'

const client =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null

const FROM_NUMBER = process.env.TWILIO_PHONE_NUMBER || ''

interface SendSmsOptions {
  to: string
  body: string
}

/**
 * Send an SMS via Twilio. Fire-and-forget — logs errors
 * but never throws so it won't block API responses.
 */
export async function sendSms({ to, body }: SendSmsOptions) {
  if (!client || !FROM_NUMBER) {
    console.warn('[SMS] Twilio not configured — skipping SMS send')
    return null
  }

  try {
    const message = await client.messages.create({
      body,
      from: FROM_NUMBER,
      to,
    })

    console.log('[SMS] Sent successfully:', message.sid)
    return message
  } catch (err) {
    console.error('[SMS] Failed to send:', err)
    return null
  }
}

/**
 * Build the SMS body for a new inquiry notification.
 */
export function buildInquirySmsBody({
  clinicName,
  enquirerName,
  enquirerEmail,
  enquirerPhone,
  message,
}: {
  clinicName: string
  enquirerName: string
  enquirerEmail: string
  enquirerPhone: string | null
  message: string | null
}) {
  const lines = [
    `New enquiry for ${clinicName} via Hair Restoration Guide.`,
    '',
    `Name: ${enquirerName}`,
    `Email: ${enquirerEmail}`,
  ]

  if (enquirerPhone) {
    lines.push(`Phone: ${enquirerPhone}`)
  }

  if (message) {
    lines.push('')
    lines.push(`Message: ${message}`)
  }

  lines.push('')
  lines.push('Claim your listing for free to manage all enquiries: hairrestorationguide.com/for-clinics')
  lines.push('')
  lines.push('Reply STOP to opt out of text notifications.')

  return lines.join('\n')
}
