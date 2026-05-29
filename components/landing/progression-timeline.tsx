"use client"

import { Check, Target, TrendingUp, Trophy } from "lucide-react"

const phases = [
  {
    week: "Weeks 1-3",
    title: "Foundation",
    description: "Build your baseline with assessment rounds and identify key improvement areas.",
    icon: Target,
    color: "primary",
    milestones: ["Handicap assessment", "Swing analysis", "Goal setting"],
  },
  {
    week: "Weeks 4-6",
    title: "Development",
    description: "Targeted drills and practice routines designed for your specific weaknesses.",
    icon: TrendingUp,
    color: "accent",
    milestones: ["Custom drill library", "Video feedback", "Weekly check-ins"],
  },
  {
    week: "Weeks 7-9",
    title: "Integration",
    description: "Combine skills on the course with strategic play and mental game coaching.",
    icon: Check,
    color: "primary",
    milestones: ["Course management", "Mental strategies", "Pressure practice"],
  },
  {
    week: "Weeks 10-12",
    title: "Performance",
    description: "Peak performance phase with tournament prep and score optimization.",
    icon: Trophy,
    color: "accent",
    milestones: ["Score tracking", "Competition prep", "Goal achievement"],
  },
]

export function ProgressionTimeline() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-radial opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Your 12-Week Journey
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
            A scientifically-designed progression that transforms your game phase by phase.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop timeline line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
          </div>

          {/* Timeline cards */}
          <div className="grid gap-8 lg:grid-cols-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon
              return (
                <div
                  key={phase.title}
                  className="relative"
                >
                  {/* Mobile connector */}
                  {index < phases.length - 1 && (
                    <div className="lg:hidden absolute left-6 top-14 bottom-0 w-0.5 bg-border -mb-8" />
                  )}

                  {/* Desktop connector dot */}
                  <div className="hidden lg:flex absolute -top-2 left-1/2 -translate-x-1/2 items-center justify-center">
                    <div className={`h-4 w-4 rounded-full ${phase.color === 'primary' ? 'bg-primary' : 'bg-accent'}`} />
                    <div className={`absolute h-8 w-8 rounded-full ${phase.color === 'primary' ? 'bg-primary' : 'bg-accent'} opacity-20 animate-pulse-soft`} />
                  </div>

                  <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] lg:mt-12">
                    <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
                      {/* Icon */}
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${phase.color === 'primary' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                        <Icon className="h-6 w-6" />
                      </div>

                      <div className="flex-1">
                        {/* Week label */}
                        <span className={`text-xs font-semibold uppercase tracking-wider ${phase.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                          {phase.week}
                        </span>

                        {/* Title */}
                        <h3 className="mt-1 text-xl font-semibold text-foreground">
                          {phase.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {phase.description}
                        </p>

                        {/* Milestones */}
                        <ul className="mt-4 space-y-2">
                          {phase.milestones.map((milestone) => (
                            <li
                              key={milestone}
                              className="flex items-center gap-2 text-sm text-muted-foreground lg:justify-center"
                            >
                              <Check className={`h-4 w-4 ${phase.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                              {milestone}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
