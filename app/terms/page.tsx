import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Hair Restoration Guide terms and conditions — the rules and legal terms that govern your use of our directory platform.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]} />

      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1>Terms &amp; Conditions</h1>
        <p className="lead">Last updated: 20 March 2026</p>

        <p>
          These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the Hair Restoration
          Guide website at hairrestorationguide.com (&quot;the Platform&quot;). By accessing or
          using the Platform, you agree to be bound by these Terms. If you do not agree,
          please do not use the Platform.
        </p>

        <h2>1. Who We Are</h2>
        <p>
          Hair Restoration Guide is a UK-based online directory that helps people find
          non-surgical hair restoration clinics. We connect potential clients with clinics
          by listing clinic profiles and forwarding enquiries submitted through the Platform.
        </p>

        <h2>2. Use of the Directory</h2>
        <p>
          The Platform is a free directory service. We do not provide medical advice, endorse
          specific clinics, or guarantee the quality of any services listed. Information
          displayed on clinic profiles is provided by the clinics themselves or sourced from
          publicly available data, and we make reasonable efforts to keep it accurate. However,
          you should always verify details directly with the clinic before booking any treatment.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          Clinic owners and their authorised representatives may create accounts to claim and
          manage their listings. By creating an account, you agree to:
        </p>
        <ul>
          <li>Provide accurate and complete registration information</li>
          <li>Keep your login credentials secure and confidential</li>
          <li>Accept responsibility for all activity that occurs under your account</li>
          <li>Notify us promptly if you become aware of any unauthorised use</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts that violate these Terms or
          that we reasonably believe are being used fraudulently.
        </p>

        <h2>4. Listing Claims</h2>
        <p>
          By claiming a listing, you confirm that you are an authorised representative of
          the clinic in question. We reserve the right to verify your identity and connection
          to the business, and to revoke claims made in bad faith or without proper authorisation.
        </p>

        <h2>5. Enquiry Handling &amp; Data Flow</h2>
        <p>
          When a visitor submits an enquiry through a clinic&apos;s listing page, the following happens:
        </p>
        <ul>
          <li>
            The visitor&apos;s name, email address, phone number (if provided) and message are
            collected by Hair Restoration Guide.
          </li>
          <li>
            If the clinic has claimed its listing and has an active account, the enquiry is delivered
            directly into the clinic&apos;s dashboard on the Platform.
          </li>
          <li>
            If the clinic has not claimed its listing, the enquiry is stored securely and the clinic
            may access it if they claim their listing in the future.
          </li>
        </ul>
        <p>
          We act as a <strong>data controller</strong> when collecting and storing enquiry data, and
          we process it on the legal basis of <strong>consent</strong> — the visitor explicitly
          consents to their details being shared with the selected clinic before submitting
          the form.
        </p>
        <p>
          For full details on how we handle personal data, please see
          our <Link href="/privacy">Privacy Policy</Link>.
        </p>

        <h2>6. Clinic Responsibilities for Enquiry Data</h2>
        <p>
          When a clinic with a claimed listing receives enquiry data through the Platform, that
          clinic becomes an independent <strong>data controller</strong> for the personal data
          received. This means the clinic is responsible for:
        </p>
        <ul>
          <li>
            Handling all received personal data in accordance with the UK General Data Protection
            Regulation (UK GDPR) and the Data Protection Act 2018
          </li>
          <li>Having their own privacy policy that covers how they process client enquiries</li>
          <li>Only using enquiry data for the purpose of responding to the enquiry and providing related services</li>
          <li>Securely storing and, when appropriate, deleting personal data they have received</li>
        </ul>
        <p>
          Hair Restoration Guide is not responsible for how a clinic handles personal data
          after it has been delivered to them.
        </p>

        <h2>7. Free Service &amp; No Guarantees</h2>
        <p>
          Listing on Hair Restoration Guide is free for clinics. Enquiry delivery is also provided
          at no cost. We do not guarantee any specific number of enquiries, business outcomes,
          or that all information displayed on the Platform is complete or up to date.
        </p>

        <h2>8. Prohibited Conduct</h2>
        <p>You must not:</p>
        <ul>
          <li>Submit false, misleading, or inaccurate information</li>
          <li>Attempt to manipulate ratings, reviews, or search rankings</li>
          <li>Scrape, crawl, or use automated tools to collect data from the Platform</li>
          <li>Use the Platform for any unlawful purpose</li>
          <li>Interfere with or disrupt the Platform&apos;s operation or security</li>
        </ul>

        <h2>9. Intellectual Property</h2>
        <p>
          All content on Hair Restoration Guide, including text, design, code, and branding, is
          owned by us unless otherwise stated. Clinic-provided content (descriptions, images, logos)
          remains the property of the respective clinics, and by uploading it they grant us
          a licence to display it on the Platform.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          The Platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any
          kind, whether express or implied. To the fullest extent permitted by law:
        </p>
        <ul>
          <li>
            We are not liable for any direct, indirect, incidental, or consequential damages arising
            from your use of the Platform
          </li>
          <li>
            We are not liable for any interactions, disputes, or outcomes between visitors and clinics
          </li>
          <li>
            We are not liable for any loss of data, revenue, or business opportunity
          </li>
        </ul>
        <p>
          Nothing in these Terms excludes or limits our liability for anything we cannot legally
          exclude or limit, including liability for death or personal injury caused by our
          negligence.
        </p>

        <h2>11. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. When we make changes, we will update the
          &quot;Last updated&quot; date at the top of this page. Continued use of the Platform after
          changes are published constitutes acceptance of the revised Terms. For material changes
          that significantly affect your rights, we will make reasonable efforts to notify account
          holders by email.
        </p>

        <h2>12. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of England and Wales.
          Any disputes arising from or relating to these Terms shall be subject to the exclusive
          jurisdiction of the courts of England and Wales.
        </p>

        <h2>13. Contact</h2>
        <p>
          If you have any questions about these Terms, you can reach us at{' '}
          <a href="mailto:legal@hairrestorationguide.com">legal@hairrestorationguide.com</a>.
        </p>
      </article>
    </div>
  )
}
