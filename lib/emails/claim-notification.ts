interface ClaimEmailData {
  clinicName: string
  claimerEmail: string
  claimerName: string | null
  listingId: string
}

export function buildClaimSubject(clinicName: string) {
  return `New Claim Request: ${clinicName}`
}

export function buildClaimHtml({
  clinicName,
  claimerEmail,
  claimerName,
  listingId,
}: ClaimEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:24px 16px;">

    <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);border-radius:12px 12px 0 0;padding:28px 24px;text-align:center;">
      <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">New Claim Request</h1>
      <p style="margin:6px 0 0;font-size:14px;color:#94a3b8;">A clinic owner wants to claim their listing</p>
    </div>

    <div style="background:#ffffff;border-radius:0 0 12px 12px;padding:28px 24px;border:1px solid #e5e7eb;border-top:none;">

      <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="padding:8px 12px;color:#6b7280;font-size:14px;white-space:nowrap;">Clinic</td>
          <td style="padding:8px 12px;font-size:14px;color:#111827;font-weight:600;">${escapeHtml(clinicName)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;color:#6b7280;font-size:14px;white-space:nowrap;">Claimed by</td>
          <td style="padding:8px 12px;font-size:14px;color:#111827;">${claimerName ? escapeHtml(claimerName) : 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;color:#6b7280;font-size:14px;white-space:nowrap;">Email</td>
          <td style="padding:8px 12px;font-size:14px;color:#111827;">
            <a href="mailto:${claimerEmail}" style="color:#2563eb;text-decoration:none;">${escapeHtml(claimerEmail)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;color:#6b7280;font-size:14px;white-space:nowrap;">Listing ID</td>
          <td style="padding:8px 12px;font-size:13px;color:#6b7280;font-family:monospace;">${listingId}</td>
        </tr>
      </table>

      <p style="margin:24px 0 0;font-size:14px;color:#374151;line-height:1.5;">
        Review this claim in Supabase and approve or reject it.
      </p>
    </div>

    <div style="text-align:center;padding:20px 0 0;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Hair Restoration Guide | Admin Notification</p>
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
