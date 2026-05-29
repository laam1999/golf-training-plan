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
              Tell us about your clubs, schedule, and goals. Our AI analyzes thousands of data points to create a plan that fits your game and your lifestyle.
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

          {/* Sample Plan Card */}
          <div className="relative">
            <div className="glass-card rounded-2xl p-6 md:p-8">
              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Week 5 of 12</span>
                  <h3 className="text-xl font-semibold text-foreground">Mike&apos;s Training Plan</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <span className="text-lg font-bold text-primary">M</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="text-foreground font-medium">42%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500" />
                </div>
              </div>

              {/* This week's focus */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">This Week&apos;s Focus</h4>
                
                {/* Drill items */}
                {[
                  { name: "50-Yard Pitch Control", duration: "20 min", complete: true },
                  { name: "Bunker Exit Drill", duration: "15 min", complete: true },
                  { name: "Lag Putting Distance", duration: "25 min", complete: false },
                  { name: "Pre-Shot Routine Practice", duration: "10 min", complete: false },
                ].map((drill) => (
                  <div
                    key={drill.name}
                    className={`flex items-center justify-between rounded-lg p-3 transition-colors ${
                      drill.complete ? "bg-primary/10" : "bg-secondary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                          drill.complete
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {drill.complete && (
                          <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${drill.complete ? "text-primary" : "text-foreground"}`}>
                        {drill.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{drill.duration}</span>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">-2.4</div>
                  <div className="text-xs text-muted-foreground">Strokes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">18</div>
                  <div className="text-xs text-muted-foreground">Drills Done</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">6.5</div>
                  <div className="text-xs text-muted-foreground">Hours</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 -right-4 -bottom-4 h-full w-full rounded-2xl bg-primary/10" />
          </div>
        </div>
      </div>
    </section>
  )
}
