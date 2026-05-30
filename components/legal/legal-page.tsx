import Link from "next/link"
import { Footer } from "@/components/landing/footer"

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-background">
      {/* Minimal header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center px-4 py-5 sm:px-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Caddova home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary-foreground">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-xl font-semibold tracking-tight text-foreground">Caddova</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="legal-prose mt-10 space-y-6 text-[15px] leading-relaxed text-muted-foreground">
          {children}
        </div>
      </article>

      <Footer />
    </main>
  )
}
