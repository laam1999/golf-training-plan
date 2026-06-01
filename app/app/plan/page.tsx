"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { FOCUS_STYLES, FOCUS_LABELS } from "@/lib/focus"
import type { PlanRow, Drill } from "@/lib/types"

const FACILITY_LABELS: Record<string, string> = {
  range: "Driving Range", "putting-green": "Putting Green", "chipping-area": "Chipping Area",
  bunker: "Bunker", simulator: "Simulator", home: "Home", any: "Any",
}

export default function FullPlanPage() {
  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<PlanRow | null>(null)

  useEffect(() => {
    supabase
      .from("plans")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        setPlan(data as PlanRow | null)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="grid min-h-[40dvh] place-items-center text-sm text-muted-foreground">Loading…</div>
  }

  if (!plan) {
    return (
      <div>
        <header className="mb-6"><h1 className="text-xl font-bold tracking-tight">Your Plan</h1></header>
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="mb-5 text-sm text-muted-foreground">No plan yet — build one to see it here.</p>
          <Link href="/app/generate" className="inline-block rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">
            Build my plan
          </Link>
        </div>
      </div>
    )
  }

  const p = plan.plan_json
  const phases = p.phases || []

  return (
    <div className="pb-4">
      <header className="mb-5">
        <h1 className="text-xl font-bold tracking-tight">
          {p.golferName ? `${p.golferName}'s 12-Week Plan` : "Your 12-Week Plan"}
        </h1>
        <p className="text-sm text-muted-foreground">The full plan — refer back anytime.</p>
      </header>

      {p.intro && (
        <div className="mb-6 rounded-2xl border-l-2 border-primary bg-primary/5 p-4 text-sm leading-relaxed text-foreground/90">
          {p.intro}
        </div>
      )}

      <div className="space-y-8">
        {phases.map((phase) => (
          <section key={phase.phaseNumber}>
            {/* Phase header */}
            <div className="mb-3 flex items-start gap-3">
              <span className="text-3xl font-bold leading-none text-primary/30">
                {String(phase.phaseNumber).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-primary">{phase.title}</h2>
                <p className="text-xs text-muted-foreground">
                  Weeks {(phase.weekRange || "").replace("-", "–")}
                  {phase.theme ? ` · ${phase.theme}` : ""}
                </p>
              </div>
            </div>

            {phase.rationale && (
              <p className="mb-4 border-l-2 border-border pl-3 text-sm leading-relaxed text-foreground/75">
                {phase.rationale}
              </p>
            )}

            <div className="space-y-3">
              {(phase.sessions || []).map((session, si) => (
                <div key={session.id || si} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="border-b border-border/60 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{session.name}</span>
                      {session.facility && (
                        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                          {FACILITY_LABELS[session.facility] || session.facility}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {session.durationMinutes ? `${session.durationMinutes} min` : ""}
                      {session.frequencyPerWeek ? ` · ${session.frequencyPerWeek}×/week` : ""}
                    </div>
                  </div>

                  <div className="divide-y divide-border/40">
                    {(session.drills || []).map((drill: Drill, di) => (
                      <div key={drill.id || di} className="px-4 py-3">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                            {di + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium">{drill.name}</div>
                            <div className="mt-1 flex flex-wrap items-center gap-1.5">
                              {drill.focusArea && (
                                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${FOCUS_STYLES[drill.focusArea] || "border-border text-muted-foreground"}`}>
                                  {FOCUS_LABELS[drill.focusArea] || drill.focusArea}
                                </span>
                              )}
                              {(drill.clubs || []).map((c) => (
                                <span key={c} className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">{c}</span>
                              ))}
                              {drill.reps && <span className="text-xs font-medium text-primary">{drill.reps}</span>}
                            </div>

                            {drill.instructions && drill.instructions.length > 0 && (
                              <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm leading-relaxed text-foreground/80">
                                {drill.instructions.map((step, idx) => <li key={idx}>{step}</li>)}
                              </ol>
                            )}

                            {drill.why && (
                              <div className="mt-2 rounded-lg border-l-2 border-primary/50 bg-primary/5 px-3 py-2">
                                <div className="text-[9px] font-bold uppercase tracking-widest text-primary">Why this matters</div>
                                <p className="mt-0.5 text-xs leading-relaxed text-foreground/80">{drill.why}</p>
                              </div>
                            )}

                            {drill.successMarker && (
                              <div className="mt-2 text-xs text-foreground/70">🎯 Target: {drill.successMarker}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {phase.milestone && (
              <div className="mt-3 rounded-2xl border border-border bg-secondary/40 p-4">
                <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  Phase {phase.phaseNumber} milestone
                </div>
                <p className="text-sm leading-relaxed text-foreground/85">{phase.milestone}</p>
              </div>
            )}

            {phase.mindsetTip && (
              <div className="mt-2 rounded-xl border-l-2 border-primary/50 bg-primary/5 px-3 py-2 text-xs text-foreground/75">
                <span className="font-semibold text-primary">Coach&apos;s cue: </span>
                {phase.mindsetTip}
              </div>
            )}
          </section>
        ))}
      </div>

      {p.closingNote && (
        <div className="mt-8 rounded-2xl border-l-2 border-primary bg-primary/5 p-4 text-sm leading-relaxed text-foreground/90">
          {p.closingNote}
        </div>
      )}
    </div>
  )
}
