interface InquiryEmailData {
  clinicName: string
  enquirerName: string
  enquirerEmail: string
  enquirerPhone: string | null
  message: string | null
}

export function buildInquirySubject(enquirerName: string, clinicName: string) {
  return `New Enquiry for ${clinicName} — ${enquirerName}`
}

export function buildInquiryHtml({
  clinicName,
  enquirerName,
  enquirerEmail,
  enquirerPhone,
  message,
}: InquiryEmailData): string {
  const phoneRow = enquirerPhone
    ? `<tr>
        <td style="padding:6px 12px;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top;">Phone</td>
        <td style="padding:6px 12px;font-size:14px;color:#111827;">
          <a href="tel:${enquirerPhone}" style="color:#2563eb;text-decoration:none;">${enquirerPhone}</a>
        </td>
      </tr>`
    : ''

  const messageBlock = message
    ? `<div style="margin-top:20px;">
        <p style="margin:0 0 8px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Their Message</p>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;">
          <p style="margin:0;font-size:14px;line-height:1.6;color:#374151;">${escapeHtml(message)}</p>
        </div>
      </div>`
    : ''

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);border-radius:12px 12px 0 0;padding:28px 24px;text-align:center;">
      <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">New Enquiry Received</h1>
      <p style="margin:6px 0 0;font-size:14px;color:#94a3b8;">Someone is interested in your services</p>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;border-radius:0 0 12px 12px;padding:28px 24px;border:1px solid #e5e7eb;border-top:none;">

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.5;">
        Hi <strong>${escapeHtml(clinicName)}</strong>,
      </p>

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.5;">
        You have a new enquiry via the <strong>Hair Restoration Guide</strong>. Here are their details:
      </p>

      <!-- Contact details table -->
      <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="padding:6px 12px;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top;">Name</td>
          <td style="padding:6px 12px;font-size:14px;color:#111827;font-weight:600;">${escapeHtml(enquirerName)}</td>
        </tr>
        <tr>
          <td style="padding:6px 12px;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top;">Email</td>
          <td style="padding:6px 12px;font-size:14px;color:#111827;">
            <a href="mailto:${enquirerEmail}" style="color:#2563eb;text-decoration:none;">${escapeHtml(enquirerEmail)}</a>
          </td>
        </tr>
        ${phoneRow}
      </table>

      ${messageBlock}

      <!-- CTA -->
      <div style="margin-top:28px;text-align:center;">
        <a href="mailto:${enquirerEmail}?subject=Re: Your enquiry to ${encodeURIComponent(clinicName)}"
           style="display:inline-block;background:#2563eb;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:12px 32px;border-radius:8px;">
          Reply to ${escapeHtml(enquirerName)}
        </a>
      </div>

      <p style="margin:24px 0 0;text-align:center;font-size:13px;color:#9ca3af;">
        You can also view all your enquiries in your
        <a href="https://www.hairrestorationguide.com/dashboard/inquiries" style="color:#2563eb;text-decoration:none;">dashboard</a>.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:20px 0 0;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        This email was sent by Hair Restoration Guide because someone enquired about your clinic.
      </p>
    </div>

  </div>
</body>
</html>`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
