"use client"

import { ArrowRight } from "lucide-react"
import { track } from "@vercel/analytics"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-radial" />
      
      {/* Floating golf ball decoration */}
      <div className="absolute right-[10%] top-[20%] h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute left-[5%] bottom-[20%] h-48 w-48 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center pt-16 md:pt-24">
          {/* Badge */}
          <div className="glass-card mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
            <span className="text-xs font-medium text-muted-foreground">
              Free during beta · Plan + track your game
            </span>
          </div>

          {/* Main headline */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            A 12-week practice plan
            <span className="block text-primary mt-2">built around your game</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed text-pretty">
            Tell us your clubs, your weak spots, and how often you practice. Get a specific, drill-by-drill 12-week roadmap — named clubs, real reps, measurable goals, not generic tips. Then log every session and track whether you&apos;re actually improving.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            >
              <a href="/login" onClick={() => track("cta_get_plan", { location: "hero" })}>
                Get Your Free Plan
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {/* Proof points */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {[
              "Generates in ~30 seconds",
              "Built around your clubs & schedule",
              "Log & track every session",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Preview Card — an honest excerpt of a real generated plan */}
          <div className="mt-16 w-full max-w-3xl">
            <div className="glass-card rounded-2xl p-1">
              <div className="relative overflow-hidden rounded-xl bg-card p-6 text-left sm:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Sample plan output
                  </span>
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                    Personalized
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Luis&apos;s 12-week plan to break 100
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Built around your Callaway Edge irons · 1hr practice 2x/week · range &amp; chipping area
                </p>

                <div className="mt-5 border-t border-border pt-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Phase 1 · Weeks 1–4 · Foundation
                  </span>
                  <div className="mt-3 flex gap-3 rounded-xl border border-border bg-secondary/40 p-4">
                    <span className="shrink-0 text-sm font-semibold text-primary">01</span>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        Hybrid tee drill — 5-hybrid
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        15 balls per session, 70% effort, tee at half-inch. Goal: 10 of 15 airborne and 120+ yards consistently.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Fade to imply more content below */}
                <div className="pointer-events-none mt-2 h-10 bg-gradient-to-b from-transparent to-card" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
