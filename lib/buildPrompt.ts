// In-app prompt builder — ported from the tuned prompt in public/plan.html so
// the app generates the same high-quality structured plan. Kept in sync with
// the coaching-quality rules and JSON schema we refined for the PDF/email output.

export interface GenerateAnswers {
  name: string
  experience: string
  score: string
  goal: string
  struggles: string[]
  facilities: string[] // display labels
  clubs: string // free text, optional
  practice: string
}

const FACILITY_SLUGS: Record<string, string> = {
  "Driving range": "range",
  "Putting green": "putting-green",
  "Chipping area": "chipping-area",
  "Practice bunker": "bunker",
  "Indoor simulator": "simulator",
  "Home / backyard": "home",
}

export function facilitySlug(label: string): string {
  return FACILITY_SLUGS[label] || "any"
}

export function buildPrompt(a: GenerateAnswers): string {
  const facilityOptions = a.facilities.map(facilitySlug).join(" | ") ||
    "range | putting-green | chipping-area | bunker | simulator | home"

  const clubsText = a.clubs.trim()
    ? a.clubs.trim()
    : "Uses a standard set of clubs (no specific brands/models provided). Keep club references generic but realistic (e.g. 7-iron, pitching wedge, driver)."

  return `You are a top-tier golf coach. Generate a personalized 12-week practice plan for the golfer below as structured JSON.

GOLFER PROFILE:
Name: ${a.name}
Experience: ${a.experience}
Typical score: ${a.score}
Main goal: ${a.goal}

Equipment situation:
${clubsText}

Biggest struggles (in priority order): ${a.struggles.join(", ")}
Practice frequency: ${a.practice}
Practice facilities available: ${a.facilities.join(", ")}

COACHING QUALITY RULES:

1. ZERO GENERIC ADVICE. Every drill, instruction, and "why" must reference THIS golfer's actual clubs, their struggles in priority order, their actual facilities, and their practice schedule. If it could apply to any beginner, rewrite it.

2. DIRECT, PERSONAL VOICE. Write like a coach who knows this player — encouraging, honest, slightly conversational. No stiff instructional-manual language.

3. EVERY DRILL: exact clubs, specific numbers for reps/time ("15 balls" not "some balls"), a personalized "why" tied to one of their actual stated struggles, and a measurable success marker with a number.

4. SESSIONS MATCH THEIR FACILITIES. Only create sessions for facilities they actually listed. The facility field for each session must be one of: ${facilityOptions}.

5. ADDRESS ${a.name} BY NAME once in the intro. Twice more naturally across the whole plan. Not more.

6. EQUAL DEPTH. All 3 phases get the same level of detail — do not rush phase 3. Phase 3 must have the same number of sessions and drills as phase 1, written out in full.

7. COACHING CUES NOT QUOTES. The mindsetTip for each phase must be a specific technical instruction the golfer recites during practice — like a swing thought or setup cue. Never a motivational quote or life philosophy.

OUTPUT FORMAT:
Output a single \`\`\`json code block. Nothing before it, nothing after it.

Use this exact JSON structure (replace placeholder text with real personalized content):

\`\`\`json
{
  "version": "1",
  "generatedAt": "WILL_BE_SET_BY_SERVER",
  "language": "en",
  "golferName": "${a.name}",
  "intro": "3-4 sentences: (1) Honest, specific read of where they are right now. (2) Name the root cause of their #1 struggle in coaching terms and roughly how many strokes it's costing per round. (3) Preview all 3 phases: what skill each builds and the concrete 12-week outcome.",
  "closingNote": "3-4 sentences: (1) Name the specific skills they will have built — reference actual drill names and clubs from this plan. (2) Restate their goal as now within reach. (3) Give one concrete first action for tomorrow — specific location, club, number of balls.",
  "phases": [
    {
      "phaseNumber": 1,
      "title": "e.g. Foundation",
      "theme": "e.g. Building consistent ball contact",
      "weekRange": "1-4",
      "rationale": "2-3 sentences: why this phase matters for THIS golfer. Tie to their top struggles and specific clubs.",
      "sessions": [
        {
          "id": "phase-1-session-a",
          "name": "Range Session",
          "facility": "range",
          "durationMinutes": 45,
          "frequencyPerWeek": 2,
          "drills": [
            {
              "id": "drill-id",
              "name": "Drill name",
              "focusArea": "irons",
              "clubs": ["7-iron"],
              "reps": "20 balls",
              "instructions": ["step 1", "step 2", "step 3", "step 4"],
              "why": "1-2 sentences tied to one of their stated struggles.",
              "successMarker": "Measurable pass/fail criterion with a number"
            }
          ]
        }
      ],
      "milestone": "Specific measurable end-of-phase goal.",
      "mindsetTip": "One short coaching cue (under 15 words) — a technical reminder, NOT a quote."
    },
    {
      "phaseNumber": 2,
      "title": "Phase 2 title",
      "theme": "Phase 2 theme",
      "weekRange": "5-8",
      "rationale": "2-3 sentences specific to phase 2",
      "sessions": [
        {
          "id": "phase-2-session-a",
          "name": "Session name",
          "facility": "one of the golfer's listed facilities",
          "durationMinutes": 45,
          "frequencyPerWeek": 2,
          "drills": [
            {
              "id": "drill-id",
              "name": "Drill name",
              "focusArea": "one of: driving | irons | short-game | putting | course-management | mental",
              "clubs": ["specific club"],
              "reps": "specific number",
              "instructions": ["step 1", "step 2", "step 3"],
              "why": "tied to a stated struggle",
              "successMarker": "measurable with a number"
            }
          ]
        }
      ],
      "milestone": "Measurable end-of-phase-2 goal",
      "mindsetTip": "One short coaching cue (under 15 words) — technical, NOT a quote."
    },
    {
      "phaseNumber": 3,
      "title": "Phase 3 title — performance / integration",
      "theme": "Phase 3 theme",
      "weekRange": "9-12",
      "rationale": "2-3 sentences: how this final phase connects their built skills to their stated goal.",
      "sessions": [
        {
          "id": "phase-3-session-a",
          "name": "Session name",
          "facility": "one of the golfer's listed facilities",
          "durationMinutes": 45,
          "frequencyPerWeek": 2,
          "drills": [
            {
              "id": "drill-id",
              "name": "Drill name",
              "focusArea": "one of: driving | irons | short-game | putting | course-management | mental",
              "clubs": ["specific club"],
              "reps": "specific number",
              "instructions": ["step 1", "step 2", "step 3"],
              "why": "tied to a stated struggle",
              "successMarker": "measurable with a number"
            }
          ]
        }
      ],
      "milestone": "Measurable end-of-phase-3 goal tied to their main goal",
      "mindsetTip": "One short coaching cue (under 15 words) — technical, NOT a quote."
    }
  ]
}
\`\`\`

FIELD LENGTH LIMITS — stay within these budgets or the plan will be cut off:
- intro: 3-4 sentences max
- closingNote: 3-4 sentences max
- rationale: 2 sentences max
- per phase: 2 sessions max (only for listed facilities)
- per session: 2-3 drills max
- instructions per drill: 3-4 steps max, each under 20 words
- why per drill: 1-2 sentences max, tied to one specific struggle
- successMarker: under 15 words, measurable number included
- milestone: 2 sentences max
- mindsetTip: 1 short sentence max (under 15 words)

focusArea must be one of: driving | irons | short-game | putting | course-management | mental

Output ONLY the \`\`\`json code block. Begin now.`
}
