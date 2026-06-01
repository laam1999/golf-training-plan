"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import type { PlanRow, Phase, Session, Drill } from "@/lib/types"

function drillKey(d: Drill, i: number) {
  return d.id || `${i}-${d.name}`
}

export default function LogPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<PlanRow | null>(null)
  const [phase, setPhase] = useState<Phase | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [note, setNote] = useState("")
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from("plans")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        const row = data as PlanRow | null
        setPlan(row)
        if (row) {
          const ph = (row.plan_json.phases || []).find((p) => p.phaseNumber === row.current_phase) || row.plan_json.phases?.[0] || null
          setPhase(ph)
          // Preselect session from ?session= if present
          const param = new URLSearchParams(window.location.search).get("session")
          if (ph && param) {
            const match = (ph.sessions || []).find((s) => (s.id || s.name) === param || encodeURIComponent(s.name) === param)
            if (match) setSession(match)
          }
        }
        setLoading(false)
      })
  }, [])

  async function save() {
    if (!plan || !phase || !session) return
    setSaving(true)
    setError(null)
    try {
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData.user?.id
      if (!userId) throw new Error("Not signed in.")

      const results = (session.drills || []).map((d, i) => ({
        drillId: d.id || d.name,
        value: Number(values[drillKey(d, i)]) || 0,
        target: d.successMarker || null,
      }))

      const { error: insErr } = await supabase.from("session_logs").insert({
        user_id: userId,
        plan_id: plan.id,
        phase_number: plan.current_phase,
        session_id: session.id || session.name,
        logged_at: date,
        results,
        note: note.trim() || null,
      })
      if (insErr) throw new Error(insErr.message)
      setSaved(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="grid min-h-[40dvh] place-items-center text-sm text-muted-foreground">Loading…</div>
  }

  if (!plan || !phase) {
    return (
      <div>
        <header className="mb-6">
          <h1 className="text-xl font-bold tracking-tight">Log a session</h1>
        </header>
        <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          You need an active plan first.{" "}
          <Link href="/app/generate" className="text-primary underline">Build one</Link>.
        </div>
      </div>
    )
  }

  if (saved) {
    return (
      <div className="grid min-h-[50dvh] place-items-center text-center">
        <div>
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-3xl">✓</div>
          <p className="text-lg font-semibold">Session logged</p>
          <p className="mt-1 text-sm text-muted-foreground">Nice work. That&apos;s another data point toward your goal.</p>
          <div className="mt-6 flex flex-col gap-2">
            <Link href="/app/progress" className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">See progress</Link>
            <Link href="/app" className="rounded-xl border border-border px-5 py-3 font-medium text-foreground">Back to This Week</Link>
          </div>
        </div>
      </div>
    )
  }

  // Session picker if none selected yet
  if (!session) {
    return (
      <div>
        <header className="mb-6">
          <h1 className="text-xl font-bold tracking-tight">Log a session</h1>
          <p className="text-sm text-muted-foreground">Which session did you do?</p>
        </header>
        <div className="space-y-3">
          {(phase.sessions || []).map((s, i) => (
            <button
              key={s.id || i}
              onClick={() => setSession(s)}
              className="flex w-full items-center justify-between rounded-2xl border border-border bg-card px-4 py-4 text-left"
            >
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-xs text-muted-foreground">
                  {(s.drills || []).length} drill{(s.drills || []).length === 1 ? "" : "s"}
                </div>
              </div>
              <span className="text-primary">→</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Logging form for the selected session
  return (
    <div className="pb-4">
      <header className="mb-5">
        <button onClick={() => setSession(null)} className="mb-2 text-xs text-muted-foreground underline">
          ← Change session
        </button>
        <h1 className="text-xl font-bold tracking-tight">{session.name}</h1>
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Date practiced</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-base text-foreground outline-none focus:border-primary"
          />
        </div>
      </header>

      <div className="space-y-4">
        {(session.drills || []).map((drill, i) => {
          const key = drillKey(drill, i)
          return (
            <div key={key} className="rounded-2xl border border-border bg-card p-4">
              <div className="font-medium">{drill.name}</div>
              {drill.successMarker && (
                <div className="mt-1 text-xs text-muted-foreground">🎯 {drill.successMarker}</div>
              )}
              <div className="mt-3 flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground">Your result</span>
                <Stepper
                  value={values[key] ?? ""}
                  onChange={(v) => setValues((prev) => ({ ...prev, [key]: v }))}
                />
              </div>
            </div>
          )
        })}

        <div>
          <label className="mb-2 block text-sm font-medium">Notes (optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="How'd it feel? Anything to remember?"
            className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-primary"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          onClick={save}
          disabled={saving}
          className="w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-opacity disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save session"}
        </button>
      </div>
    </div>
  )
}

function Stepper({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const num = Number(value) || 0
  const set = (n: number) => onChange(String(Math.max(0, n)))
  return (
    <div className="ml-auto flex items-center gap-2">
      <button
        onClick={() => set(num - 1)}
        className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-lg font-semibold text-foreground active:bg-secondary"
      >
        −
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
        placeholder="0"
        className="h-9 w-14 rounded-lg border border-border bg-background text-center text-base font-semibold text-foreground outline-none focus:border-primary"
      />
      <button
        onClick={() => set(num + 1)}
        className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-lg font-semibold text-foreground active:bg-secondary"
      >
        +
      </button>
    </div>
  )
}
