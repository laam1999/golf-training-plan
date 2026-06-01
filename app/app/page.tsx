"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { FOCUS_STYLES, FOCUS_LABELS } from "@/lib/focus"
import { InstallButton } from "@/components/tracker/InstallButton"
import type { PlanRow, Phase, Drill } from "@/lib/types"

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

  if (!plan) {
    return (
      <div>
        <header className="mb-6"><h1 className="text-xl font-bold tracking-tight">This Week</h1></header>
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="mb-1 font-semibold">No plan yet</p>
          <p className="mb-5 text-sm text-muted-foreground">
            Answer a few questions and we&apos;ll build your personalized 12-week plan.
          </p>
          <Link href="/app/generate" className="inline-block rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">
            Build my plan
          </Link>
        </div>
      </div>
    )
  }

  const phases = plan.plan_json.phases || []
  const current: Phase | undefined = phases.find((p) => p.phaseNumber === plan.current_phase) || phases[0]

  return (
    <div>
      <header className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight">This Week</h1>
          <p className="text-sm text-muted-foreground">
            Phase {current?.phaseNumber} of {phases.length}
            {current?.weekRange ? ` · Weeks ${current.weekRange.replace("-", "–")}` : ""}
          </p>
        </div>
        <Link href="/app/plan" className="mt-0.5 flex-shrink-0 text-xs font-medium text-primary underline underline-offset-2">
          Full plan →
        </Link>
      </header>

      <InstallButton />

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
                  {(session.drills || []).map((drill, di) => (
                    <DrillItem key={drill.id || di} drill={drill} index={di} />
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

function DrillItem({ drill, index }: { drill: Drill; index: number }) {
  const [open, setOpen] = useState(false)
  const hasDetail = (drill.instructions && drill.instructions.length > 0) || !!drill.why

  return (
    <div className="px-4 py-3">
      <button
        onClick={() => hasDetail && setOpen((o) => !o)}
        className="flex w-full items-start gap-3 text-left"
        aria-expanded={open}
      >
        <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-medium">{drill.name}</span>
            {hasDetail && (
              <ChevronDown className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
            )}
          </div>
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
        </div>
      </button>

      {/* Always-visible target */}
      {drill.successMarker && (
        <div className="ml-9 mt-2 rounded-lg bg-primary/5 px-2.5 py-1.5 text-xs text-foreground/75">
          🎯 Target: {drill.successMarker}
        </div>
      )}

      {/* Expandable detail */}
      {open && (
        <div className="ml-9 mt-2 space-y-2">
          {drill.instructions && drill.instructions.length > 0 && (
            <ol className="list-decimal space-y-1 pl-4 text-sm leading-relaxed text-foreground/80">
              {drill.instructions.map((step, idx) => <li key={idx}>{step}</li>)}
            </ol>
          )}
          {drill.why && (
            <div className="rounded-lg border-l-2 border-primary/50 bg-primary/5 px-3 py-2">
              <div className="text-[9px] font-bold uppercase tracking-widest text-primary">Why this matters</div>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground/80">{drill.why}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
