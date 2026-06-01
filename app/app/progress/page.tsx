"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import type { PlanRow } from "@/lib/types"

interface LogResult {
  drillId: string
  value: number
  target?: string | null
}
interface LogRow {
  id: string
  logged_at: string
  created_at: string
  results: LogResult[]
}
interface DrillSeries {
  drillId: string
  name: string
  target: string | null
  targetNum: number | null
  points: number[]
}

function parseTargetNum(target: string | null): number | null {
  if (!target) return null
  const m = target.match(/\d+/)
  return m ? Number(m[0]) : null
}

export default function ProgressPage() {
  const [loading, setLoading] = useState(true)
  const [series, setSeries] = useState<DrillSeries[]>([])
  const [sessionCount, setSessionCount] = useState(0)

  useEffect(() => {
    ;(async () => {
      const planResp = await supabase
        .from("plans")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
      const plan = planResp.data as PlanRow | null

      // Map drillId -> friendly name from the active plan
      const nameByDrill: Record<string, string> = {}
      if (plan) {
        for (const ph of plan.plan_json.phases || []) {
          for (const s of ph.sessions || []) {
            for (const d of s.drills || []) {
              nameByDrill[d.id || d.name] = d.name
            }
          }
        }
      }

      const logsResp = await supabase
        .from("session_logs")
        .select("id,logged_at,created_at,results")
        .order("created_at", { ascending: true })
      const logs = (logsResp.data as LogRow[] | null) || []
      setSessionCount(logs.length)

      // Aggregate per drill, chronological
      const map = new Map<string, DrillSeries>()
      for (const log of logs) {
        for (const r of log.results || []) {
          if (!map.has(r.drillId)) {
            map.set(r.drillId, {
              drillId: r.drillId,
              name: nameByDrill[r.drillId] || r.drillId,
              target: r.target ?? null,
              targetNum: parseTargetNum(r.target ?? null),
              points: [],
            })
          }
          map.get(r.drillId)!.points.push(Number(r.value) || 0)
        }
      }
      setSeries(Array.from(map.values()))
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <div className="grid min-h-[40dvh] place-items-center text-sm text-muted-foreground">Loading…</div>
  }

  return (
    <div>
      <header className="mb-5">
        <h1 className="text-xl font-bold tracking-tight">Progress</h1>
        <p className="text-sm text-muted-foreground">
          {sessionCount === 0
            ? "Are you moving in the right direction?"
            : `${sessionCount} session${sessionCount === 1 ? "" : "s"} logged`}
        </p>
      </header>

      {series.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="mb-1 font-semibold">No data yet</p>
          <p className="mb-5 text-sm text-muted-foreground">Log a session and your trends will show up here.</p>
          <Link href="/app/log" className="inline-block rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">
            Log a session
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {series.map((s) => (
            <DrillCard key={s.drillId} series={s} />
          ))}
        </div>
      )}
    </div>
  )
}

function DrillCard({ series }: { series: DrillSeries }) {
  const { name, target, targetNum, points } = series
  const latest = points[points.length - 1]
  const prev = points.length > 1 ? points[points.length - 2] : null
  const best = Math.max(...points)
  const scaleMax = Math.max(targetNum ?? 0, ...points, 1)

  const trend =
    prev === null ? null : latest > prev ? "up" : latest < prev ? "down" : "flat"
  const hitTarget = targetNum !== null && latest >= targetNum

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-medium">{name}</div>
          {target && <div className="mt-0.5 text-xs text-muted-foreground">🎯 {target}</div>}
        </div>
        {trend && (
          <span
            className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              trend === "up"
                ? "bg-emerald-500/15 text-emerald-300"
                : trend === "down"
                ? "bg-red-500/15 text-red-300"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {trend === "up" ? "↑ improving" : trend === "down" ? "↓ down" : "→ steady"}
          </span>
        )}
      </div>

      {/* Bar chart */}
      <div className="mt-4 flex h-24 items-end gap-1.5">
        {points.map((p, i) => {
          const isLast = i === points.length - 1
          const h = Math.max(8, Math.round((p / scaleMax) * 96))
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground">{p}</span>
              <div
                className={`w-full rounded-t ${isLast ? "bg-primary" : "bg-primary/35"}`}
                style={{ height: `${h}px` }}
              />
            </div>
          )
        })}
      </div>
      {targetNum !== null && (
        <div className="mt-2 border-t border-dashed border-border pt-2 text-[11px] text-muted-foreground">
          Target {targetNum} · best {best} · latest {latest}{" "}
          {hitTarget && <span className="font-semibold text-emerald-300">✓ hit target</span>}
        </div>
      )}
    </div>
  )
}
