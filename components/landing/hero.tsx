"use client"

import { ArrowRight } from "lucide-react"
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
              AI-Powered Golf Coaching
            </span>
          </div>

          {/* Main headline */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            Your Personal Path to
            <span className="block text-primary mt-2">Lower Scores</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed text-pretty">
            Transform your golf game with a personalized 12-week improvement plan built around your clubs, weaknesses, practice schedule, and goals.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            >
              <a href="/plan.html">
                Get Your Free Plan
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {/* Proof points */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {[
              "12-week personalized plan",
              "Built around your clubs & schedule",
              "100% free · no signup needed",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Preview Card */}
          <div className="mt-16 w-full max-w-4xl">
            <div className="glass-card rounded-2xl p-1">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-card">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid w-full max-w-2xl gap-4 p-6">
                    {/* Sample plan preview */}
                    <div className="glass-card rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-foreground">Week 3 Focus</span>
                        <span className="text-xs text-primary">In Progress</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Short Game Mastery</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="h-2 flex-1 rounded-full bg-secondary">
                            <div className="h-full w-[65%] rounded-full bg-primary" />
                          </div>
                          <span className="text-xs text-muted-foreground">65%</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">Chipping</span>
                          <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">Pitching</span>
                          <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">Bunker Play</span>
                        </div>
                      </div>
                    </div>
                    {/* Mini stats */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Drills Done", value: "12/18" },
                        { label: "Practice Time", value: "4.5hrs" },
                        { label: "Improvement", value: "+2.3" },
                      ].map((item) => (
                        <div key={item.label} className="glass-card rounded-lg p-3 text-center">
                          <div className="text-lg font-semibold text-foreground">{item.value}</div>
                          <div className="text-xs text-muted-foreground">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
