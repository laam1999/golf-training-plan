import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-primary-foreground"
                >
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <path
                    d="M12 2v4M12 18v4M2 12h4M18 12h4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold tracking-tight text-foreground">
                GolfGains
              </span>
            </div>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              A free AI tool that builds a specific, drill-by-drill 12-week practice plan around your
              clubs, weak spots, and schedule. Email it or print it and start this week.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/plan.html" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Get my plan
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:hello@golfgains.app" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GolfGains · Built by Luis Acosta
          </p>
          <p className="text-xs text-muted-foreground/70 max-w-md md:text-right">
            AI-generated plans for general guidance — not a substitute for professional coaching or
            medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
