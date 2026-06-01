"use client"

import { ArrowRight } from "lucide-react"
import { track } from "@vercel/analytics"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
          Ready to Transform Your Game?
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
          Answer a few questions about your game and get a specific 12-week practice plan in about 30 seconds — then log every session and track your progress. Free during beta.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            <a href="/login" onClick={() => track("cta_get_plan", { location: "cta_section" })}>
              Get Your Free Plan
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <span className="text-sm text-muted-foreground">
            No credit card required
          </span>
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-sm">Secure & private</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-sm">Ready in ~30 seconds</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span className="text-sm">Free during beta</span>
          </div>
        </div>
      </div>
    </section>
  )
}
