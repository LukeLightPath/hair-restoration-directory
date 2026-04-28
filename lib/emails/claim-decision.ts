interface ClaimDecisionEmailData {
  clinicName: string
  claimerName: string | null
  action: 'approve' | 'reject'
  dashboardUrl: string
}

export function buildClaimDecisionSubject(clinicName: string, action: 'approve' | 'reject') {
  return action === 'approve'
    ? `Claim Approved: ${clinicName}`
    : `Claim Update: ${clinicName}`
}

export function buildClaimDecisionHtml({
  clinicName,
  claimerName,
  action,
  dashboardUrl,
}: ClaimDecisionEmailData): string {
  const isApproved = action === 'approve'
  const firstName = claimerName ? escapeHtml(claimerName.split(' ')[0]) : 'there'

  const headerBg = isApproved
    ? 'linear-gradient(135deg,#065F46 0%,#047857 100%)'
    : 'linear-gradient(135deg,#7F1D1D 0%,#991B1B 100%)'

  const headerTitle = isApproved ? 'Claim Approved' : 'Claim Not Approved'
  const headerSubtitle = isApproved
    ? 'You can now manage your listing'
    : 'Your claim could not be verified'

  const bodyText = isApproved
    ? `<p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.6;">
        Hi ${firstName}, great news. Your claim for <strong>${escapeHtml(clinicName)}</strong> has been approved.
        You can now log in to your dashboard to manage your listing, respond to enquiries and upload photos.
      </p>
      <a href="${escapeHtml(dashboardUrl)}" style="display:inline-block;background:#2F6364;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;">
        Go to your dashboard
      </a>`
    : `<p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.6;">
        Hi ${firstName}, we were unable to verify your claim for <strong>${escapeHtml(clinicName)}</strong> at this time.
        This could happen if the clinic has already been claimed by someone else or if we need more information to verify ownership.
      </p>
      <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
        If you believe this was an error, please reply to this email or contact us at
        <a href="mailto:support@lightpath.agency" style="color:#2563eb;text-decoration:none;">support@lightpath.agency</a>.
      </p>`

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:24px 16px;">

    <div style="background:${headerBg};border-radius:12px 12px 0 0;padding:28px 24px;text-align:center;">
      <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">${headerTitle}</h1>
      <p style="margin:6px 0 0;font-size:14px;color:rgba(255,255,255,0.7);">${headerSubtitle}</p>
    </div>

    <div style="background:#ffffff;border-radius:0 0 12px 12px;padding:28px 24px;border:1px solid #e5e7eb;border-top:none;">
      ${bodyText}
    </div>

    <div style="text-align:center;padding:20px 0 0;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Hair Restoration Guide</p>
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
