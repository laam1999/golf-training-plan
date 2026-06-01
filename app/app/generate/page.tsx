"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { buildPrompt, type GenerateAnswers } from "@/lib/buildPrompt"

const EXPERIENCE = ["Less than 6 months", "6–12 months", "1–2 years", "More than 2 years"]
const SCORES = ["Under 80", "80–89", "90–99", "100–109", "110+", "Not sure yet"]
const GOALS = ["Break 100", "Break 90", "Break 80", "Drop 5+ strokes", "Build a handicap & compete", "Just have more fun"]
const STRUGGLES = ["Driving", "Irons", "Short game", "Putting", "Course management", "Mental game"]
const FACILITIES = ["Driving range", "Putting green", "Chipping area", "Practice bunker", "Indoor simulator", "Home / backyard"]
const PRACTICE = ["Once a week", "2–3 times a week", "4+ times a week", "A few times a month"]

export default function GeneratePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [experience, setExperience] = useState("")
  const [score, setScore] = useState("")
  const [goal, setGoal] = useState("")
  const [practice, setPractice] = useState("")
  const [struggles, setStruggles] = useState<string[]>([])
  const [facilities, setFacilities] = useState<string[]>([])
  const [clubs, setClubs] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggle = (list: string[], set: (v: string[]) => void, val: string, max?: number) => {
    if (list.includes(val)) set(list.filter((v) => v !== val))
    else if (!max || list.length < max) set([...list, val])
  }

  const ready =
    name.trim() && experience && score && goal && practice && struggles.length > 0 && facilities.length > 0

  async function generate() {
    if (!ready) return
    setLoading(true)
    setError(null)
    try {
      const answers: GenerateAnswers = { name: name.trim(), experience, score, goal, practice, struggles, facilities, clubs }
      const resp = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: buildPrompt(answers) }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || `HTTP ${resp.status}`)
      const plan = data.plan
      if (!plan) throw new Error("No plan returned.")

      const { data: userData } = await supabase.auth.getUser()
      const userId = userData.user?.id
      if (!userId) throw new Error("Not signed in.")

      // Archive any existing active plan, then save the new one.
      await supabase.from("plans").update({ status: "archived" }).eq("user_id", userId).eq("status", "active")
      const { error: insErr } = await supabase
        .from("plans")
        .insert({ user_id: userId, plan_json: plan, current_phase: 1, status: "active" })
      if (insErr) throw new Error(insErr.message)

      router.push("/app")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.")
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid min-h-[60dvh] place-items-center text-center">
        <div>
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Building your 12-week plan…</p>
          <p className="mt-1 text-xs text-muted-foreground/70">This takes about 30 seconds.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-4">
      <header className="mb-6">
        <h1 className="text-xl font-bold tracking-tight">Build your plan</h1>
        <p className="text-sm text-muted-foreground">A few quick questions and we&apos;ll tailor your 12 weeks.</p>
      </header>

      <div className="space-y-6">
        <Field label="Your first name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Luis"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-primary"
          />
        </Field>

        <Selecter label="Experience" options={EXPERIENCE} value={experience} onChange={setExperience} />
        <Selecter label="Typical 18-hole score" options={SCORES} value={score} onChange={setScore} />
        <Selecter label="Main goal" options={GOALS} value={goal} onChange={setGoal} />
        <Selecter label="How often you practice" options={PRACTICE} value={practice} onChange={setPractice} />

        <Chips label="Biggest struggles (pick up to 3)" options={STRUGGLES} selected={struggles}
          onToggle={(v) => toggle(struggles, setStruggles, v, 3)} />
        <Chips label="Where you practice" options={FACILITIES} selected={facilities}
          onToggle={(v) => toggle(facilities, setFacilities, v)} />

        <Field label="What's in your bag? (optional)">
          <textarea
            value={clubs}
            onChange={(e) => setClubs(e.target.value)}
            placeholder="e.g. Callaway driver, 5–PW irons, 56° wedge, putter"
            rows={3}
            className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-primary"
          />
        </Field>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          onClick={generate}
          disabled={!ready}
          className="w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
        >
          Generate my plan
        </button>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      {children}
    </div>
  )
}

function Selecter({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
              value === o ? "border-primary bg-primary/15 text-primary" : "border-border bg-card text-muted-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </Field>
  )
}

function Chips({ label, options, selected, onToggle }: { label: string; options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <Field label={label}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onToggle(o)}
            className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
              selected.includes(o) ? "border-primary bg-primary/15 text-primary" : "border-border bg-card text-muted-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </Field>
  )
}
