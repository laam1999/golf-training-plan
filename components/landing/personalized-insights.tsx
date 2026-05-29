"use client"

import { BarChart3, Brain, Target, TrendingDown, Video, Zap } from "lucide-react"

const insights = [
  {
    icon: TrendingDown,
    title: "Handicap Trajectory",
    value: "14.2 → 10.8",
    change: "-3.4",
    positive: true,
    description: "Projected handicap after completing your 12-week plan",
  },
  {
    icon: Target,
    title: "Biggest Opportunity",
    value: "Short Game",
    subtitle: "Scoring Zone",
    description: "Analysis shows 60% of lost strokes come from within 100 yards",
  },
  {
    icon: BarChart3,
    title: "GIR Improvement",
    value: "+22%",
    subtitle: "Greens in Reg",
    description: "Focus on approach shots could add 4 GIR per round",
  },
  {
    icon: Brain,
    title: "Mental Game Score",
    value: "6.8/10",
    subtitle: "Room to Grow",
    description: "Pre-shot routine and course management exercises recommended",
  },
  {
    icon: Video,
    title: "Swing Analysis",
    value: "3 Keys",
    subtitle: "Identified",
    description: "Tempo, weight shift, and follow-through need attention",
  },
  {
    icon: Zap,
    title: "Quick Wins",
    value: "5 Drills",
    subtitle: "High Impact",
    description: "Specific exercises that can improve scores within 2 weeks",
  },
]

export function PersonalizedInsights() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-card/50" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            AI-Powered Analysis
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Insights That Drive Results
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
            Deep analytics reveal exactly where your game needs work and how to fix it.
          </p>
        </div>

        {/* Insights grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight) => {
            const Icon = insight.icon
            return (
              <div
                key={insight.title}
                className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  {"change" in insight && (
                    <span className={`text-sm font-semibold ${insight.positive ? "text-primary" : "text-destructive"}`}>
                      {insight.change}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {insight.title}
                </h3>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-foreground">{insight.value}</span>
                  {"subtitle" in insight && (
                    <span className="text-sm text-muted-foreground">{insight.subtitle}</span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
