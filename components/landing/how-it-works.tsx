"use client"

import { Clipboard, LineChart, Sparkles, UserCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Clipboard,
    title: "Tell Us About Your Game",
    description:
      "Share your handicap, clubs in the bag, available practice time, and what aspects of your game need work.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Builds Your Plan",
    description:
      "Our AI analyzes your profile against thousands of improvement patterns to create your personalized 12-week roadmap.",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Practice With Purpose",
    description:
      "Follow structured drills with video guidance, track your sessions, and get real-time feedback on your progress.",
  },
  {
    number: "04",
    icon: LineChart,
    title: "Watch Your Scores Drop",
    description:
      "See measurable improvement as the plan adapts to your progress. Average users drop 4+ strokes in 12 weeks.",
  },
]

export function HowItWorks() {
  return (
    <section className="relative py-24 overflow-hidden" id="how-it-works">
      {/* Background decoration */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Simple Process
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            How GolfGains Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
            From assessment to achievement in four simple steps.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="group relative"
              >
                {/* Connector line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] right-0 h-px bg-gradient-to-r from-border to-transparent" />
                )}

                <div className="glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:scale-[1.02] hover:bg-card/80">
                  {/* Step number */}
                  <div className="mb-4 text-5xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
