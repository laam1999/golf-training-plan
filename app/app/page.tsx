"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import type { PlanRow, Phase, Drill } from "@/lib/types"

const FOCUS_STYLES: Record<string, string> = {
  irons: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  driving: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  "short-game": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  putting: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "course-management": "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  mental: "bg-pink-500/15 text-pink-300 border-pink-500/30",
}
const FOCUS_LABELS: Record<string, string> = {
  irons: "Irons", driving: "Driving", "short-game": "Short Game",
  putting: "Putting", "course-management": "Course Mgmt", mental: "Mental",
}

export default function ThisWeekPage() {
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

  // No active plan → prompt to generate
  if (!plan) {
    return (
      <div>
        <header className="mb-6">
          <h1 className="text-xl font-bold tracking-tight">This Week</h1>
        </header>
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="mb-1 font-semibold">No plan yet</p>
          <p className="mb-5 text-sm text-muted-foreground">
            Answer a few questions and we&apos;ll build your personalized 12-week plan.
          </p>
          <Link
            href="/app/generate"
            className="inline-block rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground"
          >
            Build my plan
          </Link>
        </div>
      </div>
    )
  }

  const phases = plan.plan_json.phases || []
  const current: Phase | undefined =
    phases.find((p) => p.phaseNumber === plan.current_phase) || phases[0]

  return (
    <div>
      <header className="mb-5">
        <h1 className="text-xl font-bold tracking-tight">This Week</h1>
        <p className="text-sm text-muted-foreground">
          Phase {current?.phaseNumber} of {phases.length}
          {current?.weekRange ? ` · Weeks ${current.weekRange.replace("-", "–")}` : ""}
        </p>
      </header>

      {current && (
        <>
          <div className="mb-5 rounded-2xl border border-border bg-card p-4">
            <div className="text-base font-semibold text-primary">{current.title}</div>
            {current.theme && <div className="mt-0.5 text-sm text-muted-foreground">{current.theme}</div>}
            {current.rationale && <p className="mt-2 text-sm leading-relaxed text-foreground/80">{current.rationale}</p>}
          </div>

          <div className="space-y-4">
            {(current.sessions || []).map((session, si) => (
              <div key={session.id || si} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                  <div>
                    <div className="font-semibold">{session.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {session.durationMinutes ? `${session.durationMinutes} min` : ""}
                      {session.frequencyPerWeek ? ` · ${session.frequencyPerWeek}×/week` : ""}
                    </div>
                  </div>
                  <Link
                    href={`/app/log?session=${encodeURIComponent(session.id || session.name)}`}
                    className="rounded-lg bg-primary/15 px-3 py-1.5 text-xs font-semibold text-primary"
                  >
                    Log
                  </Link>
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
                          {drill.successMarker && (
                            <div className="mt-2 rounded-lg bg-primary/5 px-2.5 py-1.5 text-xs text-foreground/75">
                              🎯 Target: {drill.successMarker}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {current.milestone && (
            <div className="mt-5 rounded-2xl border border-border bg-secondary/40 p-4">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                Phase {current.phaseNumber} milestone
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">{current.milestone}</p>
            </div>
          )}

          {current.mindsetTip && (
            <div className="mt-3 rounded-xl border-l-2 border-primary/50 bg-primary/5 px-3 py-2 text-xs text-foreground/75">
              <span className="font-semibold text-primary">Coach&apos;s cue: </span>
              {current.mindsetTip}
            </div>
          )}
        </>
      )}

      <button
        onClick={() => supabase.auth.signOut()}
        className="mt-8 text-xs text-muted-foreground underline underline-offset-2"
      >
        Sign out
      </button>
    </div>
  )
}
