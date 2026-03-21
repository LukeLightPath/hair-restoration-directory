import type { Metadata } from 'next'
import Breadcrumbs from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Hair Restoration Guide privacy policy — how we collect, use, store and protect your personal data under UK GDPR.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1>Privacy Policy</h1>
        <p className="lead">Last updated: 20 March 2026</p>

        <p>
          Hair Restoration Guide (&quot;we&quot;, &quot;our&quot; or &quot;us&quot;) is committed
          to protecting your privacy and handling your personal data responsibly. This Privacy
          Policy explains what data we collect, why we collect it, how we use it, and your
          rights under the UK General Data Protection Regulation (UK GDPR) and the Data
          Protection Act 2018.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect the following types of information:</p>

        <h3>a) Information you provide directly</h3>
        <ul>
          <li>
            <strong>Enquiry form submissions</strong> — your name, email address, phone number
            (if provided) and message when you submit an enquiry to a clinic
          </li>
          <li>
            <strong>Account registration</strong> — your name, email address and password when
            you create a clinic owner account
          </li>
        </ul>

        <h3>b) Information collected automatically</h3>
        <ul>
          <li>
            <strong>Usage data</strong> — pages visited, time spent on pages and interaction
            patterns, collected via anonymised analytics
          </li>
          <li>
            <strong>Cookies</strong> — we use essential cookies to maintain your session and
            preferences. We do not use third-party advertising cookies.
          </li>
        </ul>

        <h2>2. Legal Basis for Processing</h2>
        <p>Under the UK GDPR, we process your personal data on the following legal bases:</p>
        <ul>
          <li>
            <strong>Consent</strong> — when you submit an enquiry form, you explicitly consent
            to your details being shared with the selected clinic. You can withdraw consent at
            any time by contacting us.
          </li>
          <li>
            <strong>Contract performance</strong> — when you create a clinic owner account, we
            process your data to provide the services you have signed up for (listing management,
            enquiry delivery, dashboard access).
          </li>
          <li>
            <strong>Legitimate interest</strong> — we process anonymised usage data to improve
            the Platform. We also display publicly available business information (e.g. Google
            reviews, business addresses) to help users find clinics.
          </li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To deliver enquiries from prospective clients to clinics</li>
          <li>To provide clinic owners with dashboard access and listing management tools</li>
          <li>To send transactional emails (account verification, enquiry notifications)</li>
          <li>To send marketing communications (only with your explicit consent, and you can unsubscribe at any time)</li>
          <li>To improve the Platform through anonymised analytics</li>
        </ul>

        <h2>4. Data Sharing</h2>
        <p>
          When you submit an enquiry, your name, email, phone number and message are shared
          with the clinic you contacted. If that clinic has claimed their listing, the enquiry
          appears directly in their dashboard. The clinic then becomes an independent data
          controller for the data they receive and is responsible for handling it in accordance
          with their own privacy policy and the UK GDPR.
        </p>
        <p>
          We do not sell your personal data to third parties. We may share anonymised,
          aggregated data (e.g. total enquiry volumes, popular search locations) for internal
          reporting purposes.
        </p>

        <h2>5. Data Processors</h2>
        <p>
          We use the following third-party services to operate the Platform. These providers
          act as data processors on our behalf and process data in accordance with our
          instructions:
        </p>
        <ul>
          <li>
            <strong>Supabase</strong> — database hosting and authentication (data stored in
            EU data centres)
          </li>
          <li>
            <strong>Vercel</strong> — website hosting and content delivery
          </li>
          <li>
            <strong>Resend</strong> — transactional email delivery (enquiry notifications,
            account verification)
          </li>
        </ul>
        <p>
          Some of these providers may transfer data outside the UK. Where this happens,
          appropriate safeguards are in place (such as Standard Contractual Clauses or
          adequacy decisions) to ensure your data remains protected.
        </p>

        <h2>6. Data Retention</h2>
        <ul>
          <li>
            <strong>Enquiry data</strong> — retained for up to 24 months from the date of
            submission, then permanently deleted
          </li>
          <li>
            <strong>Account data</strong> — retained for as long as your account is active.
            If you delete your account, we will remove your personal data within 30 days.
          </li>
          <li>
            <strong>Analytics data</strong> — anonymised and retained indefinitely as it does
            not constitute personal data
          </li>
        </ul>

        <h2>7. Data Security</h2>
        <p>
          We take data security seriously and use industry-standard measures to protect your
          information, including:
        </p>
        <ul>
          <li>Encrypted connections (HTTPS) across the entire Platform</li>
          <li>Secure database hosting with row-level security policies</li>
          <li>Password hashing for all user accounts</li>
          <li>Regular review of access controls and security practices</li>
        </ul>

        <h2>8. Children&apos;s Data</h2>
        <p>
          The Platform is not directed at anyone under the age of 18. We do not knowingly
          collect personal data from children. If you believe a child has submitted data
          through the Platform, please contact us and we will delete it promptly.
        </p>

        <h2>9. Your Rights</h2>
        <p>Under the UK GDPR, you have the following rights:</p>
        <ul>
          <li><strong>Right of access</strong> — request a copy of the personal data we hold about you</li>
          <li><strong>Right to rectification</strong> — ask us to correct inaccurate data</li>
          <li><strong>Right to erasure</strong> — ask us to delete your personal data</li>
          <li><strong>Right to restrict processing</strong> — ask us to limit how we use your data</li>
          <li><strong>Right to data portability</strong> — receive your data in a structured, machine-readable format</li>
          <li><strong>Right to object</strong> — object to processing based on legitimate interest</li>
          <li><strong>Right to withdraw consent</strong> — withdraw your consent at any time where processing is based on consent</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:privacy@hairrestorationguide.com">privacy@hairrestorationguide.com</a>.
          We will respond within one month of receiving your request.
        </p>

        <h2>10. Complaints</h2>
        <p>
          If you are unhappy with how we have handled your personal data, you have the right to
          lodge a complaint with the Information Commissioner&apos;s Office (ICO), the UK&apos;s
          supervisory authority for data protection:
        </p>
        <ul>
          <li>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
          <li>Telephone: 0303 123 1113</li>
        </ul>
        <p>
          We would appreciate the opportunity to address your concerns before you contact the
          ICO, so please reach out to us first if possible.
        </p>

        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will update
          the &quot;Last updated&quot; date at the top. For material changes, we will make
          reasonable efforts to notify account holders by email.
        </p>

        <h2>12. Contact</h2>
        <p>
          For any privacy-related questions, please contact us at{' '}
          <a href="mailto:privacy@hairrestorationguide.com">privacy@hairrestorationguide.com</a>.
        </p>
      </article>
    </div>
  )
}
