import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy | Caddova",
  description: "How Caddova collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="May 29, 2026">
      <p>
        Caddova (&ldquo;we,&rdquo; &ldquo;us&rdquo;) is a free tool that generates a personalized
        12-week golf practice plan. This policy explains what we collect, why, and the choices you
        have. Questions? Email{" "}
        <a href="mailto:hello@golfgains.app">hello@golfgains.app</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Questionnaire answers</strong> — your first name and details about your game
          (handicap, clubs, practice schedule, struggles, goals, and any physical notes you choose
          to share).
        </li>
        <li>
          <strong>Email address</strong> — only if you choose to have your plan emailed to you.
        </li>
        <li>
          <strong>Technical data</strong> — your IP address is used briefly to rate-limit abuse, and
          we use privacy-friendly, cookieless analytics to count page visits.
        </li>
      </ul>
      <p>
        We do not create accounts or store passwords, and we do not knowingly collect information
        from children.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To generate your training plan and show it to you.</li>
        <li>To email your plan to you, if you ask us to.</li>
        <li>
          If you provide your email, to occasionally send you product updates. You can unsubscribe
          at any time using the link in any email.
        </li>
        <li>To prevent abuse and keep the service running.</li>
      </ul>

      <h2>Service providers we share with</h2>
      <p>To run the product, your data passes through a few trusted processors:</p>
      <ul>
        <li>
          <strong>Anthropic</strong> — your questionnaire answers are sent to Anthropic&rsquo;s API
          to generate your plan.
        </li>
        <li>
          <strong>Resend</strong> — delivers plan emails and stores your email address if you
          subscribe.
        </li>
        <li>
          <strong>Vercel</strong> — hosting and cookieless analytics.
        </li>
        <li>
          <strong>Upstash</strong> — temporary, IP-based rate limiting.
        </li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Your choices</h2>
      <ul>
        <li>Unsubscribe from emails anytime via the link in any message.</li>
        <li>
          Request a copy or deletion of your data by emailing{" "}
          <a href="mailto:hello@golfgains.app">hello@golfgains.app</a>.
        </li>
      </ul>

      <h2>Changes</h2>
      <p>
        We may update this policy as the product evolves. Material changes will be reflected by the
        &ldquo;Last updated&rdquo; date above.
      </p>
    </LegalPage>
  )
}
