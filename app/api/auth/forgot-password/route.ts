import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    // Generate a recovery link using Supabase Admin API.
    // admin.generateLink uses the implicit flow — the action_link goes through
    // Supabase's verify endpoint, which validates the token and redirects to
    // our redirectTo URL with auth tokens in the URL hash fragment.
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: {
        // Redirect directly to /reset-password — the client-side Supabase
        // browser client will auto-detect the hash fragments and set the session
        redirectTo: `${SITE_URL}/reset-password`,
      },
    })

    if (error) {
      // Don't reveal whether the email exists — always return success
      console.error('[ForgotPassword] Supabase error:', error.message)
      return NextResponse.json({ success: true })
    }

    const resetUrl = data.properties?.action_link

    if (!resetUrl) {
      console.error('[ForgotPassword] No action_link returned from Supabase')
      return NextResponse.json({ success: true })
    }

    // Send branded email via Resend
    await sendEmail({
      to: email,
      subject: 'Reset your password — Hair Restoration Guide',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h2 style="color: #1a1a1a; font-size: 22px; font-weight: 700; margin: 0 0 8px;">Reset your password</h2>
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Hair Restoration Guide</p>
          </div>
          <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
            We received a request to reset your password. Click the button below to choose a new one. This link will expire in 24 hours.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" style="display: inline-block; background-color: #2F6364; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 32px; border-radius: 12px;">
              Reset password
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 13px; line-height: 1.5; margin: 0 0 8px;">
            If you didn't request this, you can safely ignore this email. Your password won't change.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0 16px;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            Hair Restoration Guide — The UK's independent directory for non-surgical hair restoration clinics.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[ForgotPassword] Unexpected error:', err)
    return NextResponse.json({ success: true })
  }
}
