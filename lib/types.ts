// Shared types for the saved golf plan (mirrors the generator's JSON schema).

export interface Drill {
  id?: string
  name: string
  focusArea?: string
  clubs?: string[]
  reps?: string
  instructions?: string[]
  why?: string
  successMarker?: string
}

export interface Session {
  id?: string
  name: string
  facility?: string
  durationMinutes?: number
  frequencyPerWeek?: number
  drills?: Drill[]
}

export interface Phase {
  phaseNumber: number
  title: string
  theme?: string
  weekRange?: string
  rationale?: string
  sessions?: Session[]
  milestone?: string
  mindsetTip?: string
}

export interface GolfPlan {
  version?: string
  generatedAt?: string
  language?: string
  golferName?: string
  intro?: string
  closingNote?: string
  phases: Phase[]
}

export interface PlanRow {
  id: string
  user_id: string
  created_at: string
  status: string
  current_phase: number
  plan_json: GolfPlan
}
