import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"

export const metadata: Metadata = {
  title: "Terms of Service | GolfGains",
  description: "The terms for using GolfGains.",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="May 29, 2026">
      <p>
        By using GolfGains, you agree to these terms. If you don&rsquo;t agree, please don&rsquo;t
        use the service. Questions? Email{" "}
        <a href="mailto:hello@golfgains.app">hello@golfgains.app</a>.
      </p>

      <h2>What GolfGains is</h2>
      <p>
        GolfGains generates a personalized 12-week golf practice plan from the answers you provide.
        The plan is created by AI and is for general informational purposes only.
      </p>

      <h2>Not professional or medical advice</h2>
      <p>
        Your plan is <strong>not a substitute for professional coaching or medical advice</strong>.
        Golf involves physical activity and risk of injury. Practice within your limits, and consult
        a qualified coach or a medical professional before starting any new physical routine —
        especially if you have an injury or health condition.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Use the service for your own personal golf improvement.</li>
        <li>Don&rsquo;t abuse, overload, scrape, or attempt to disrupt the service.</li>
        <li>Don&rsquo;t submit information that isn&rsquo;t yours to share.</li>
      </ul>
      <p>To keep the service free and available, usage is rate-limited.</p>

      <h2>Your plan content</h2>
      <p>
        The plan we generate is yours to use, keep, print, and share for personal use. The GolfGains
        name, site, and design remain ours.
      </p>

      <h2>No warranty</h2>
      <p>
        The service is provided &ldquo;as is,&rdquo; without warranties of any kind. We don&rsquo;t
        guarantee specific results, score improvements, or that the service will always be available
        or error-free.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, GolfGains and its creator are not liable for any
        indirect, incidental, or consequential damages arising from your use of the service or
        reliance on a generated plan, including injury resulting from practice.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as the product evolves. Continued use after changes means you
        accept the updated terms.
      </p>
    </LegalPage>
  )
}
