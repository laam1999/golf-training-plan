"use client"

import { Calendar, Clock, Flame, Target } from "lucide-react"

export function TrainingPlanCard() {
  return (
    <section className="relative py-24 overflow-hidden" id="features">
      {/* Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Personalized Plans
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Training Built Around Your Life
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Tell us about your clubs, schedule, and goals. Every plan is written from scratch for you — specific drills tied to the equipment you actually own and the time you actually have.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Target, title: "Your Weaknesses", desc: "Targeted drills for improvement areas" },
                { icon: Calendar, title: "Your Schedule", desc: "Fits your available practice time" },
                { icon: Clock, title: "Your Pace", desc: "Progressive difficulty that matches you" },
                { icon: Flame, title: "Your Goals", desc: "Aligned with handicap targets" },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sample Plan Card — an honest excerpt of a real generated plan */}
          <div className="relative">
            <div className="glass-card rounded-2xl p-6 md:p-8">
              {/* Card header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Sample plan output
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">Your 12-week plan</h3>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                  Personalized
                </span>
              </div>

              {/* Phase 1 excerpt */}
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Phase 1 · Weeks 1–4 · Foundation
                </span>

                {[
                  {
                    name: "Hybrid tee drill — 5-hybrid",
                    detail: "15 balls, 70% effort. Goal: 10 of 15 airborne, 120+ yds.",
                  },
                  {
                    name: "Gate putting — your blade putter",
                    detail: "2 tees a putter-head wide, 6 ft. Goal: 8 of 10 through clean.",
                  },
                  {
                    name: "Wedge ladder — 52° / 56°",
                    detail: "10 balls each to 30/50/70 yds. Goal: land within 15 ft.",
                  },
                ].map((drill, i) => (
                  <div key={drill.name} className="flex gap-3 rounded-lg border border-border bg-secondary/40 p-3">
                    <span className="shrink-0 text-sm font-semibold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-foreground">{drill.name}</div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{drill.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
                Every drill names your clubs, sets real reps, and gives a measurable success marker — across all 12 weeks.
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 -right-4 -bottom-4 h-full w-full rounded-2xl bg-primary/10" />
          </div>
        </div>
      </div>
    </section>
  )
}
