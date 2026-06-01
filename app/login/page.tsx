"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"email" | "code">("email")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function sendCode(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: true },
    })
    setLoading(false)
    if (error) setError(error.message)
    else setStep("code")
  }

  async function verify(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    router.push("/app")
  }

  return (
    <div
      className="grid min-h-[100dvh] place-items-center bg-background px-6 text-foreground"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="text-2xl font-bold tracking-tight">Caddova</div>
          <p className="mt-1 text-sm text-muted-foreground">
            {step === "email"
              ? "Enter your email — we'll send a 6-digit code. No password. Free during beta."
              : `Enter the 6-digit code we sent to ${email}.`}
          </p>
        </div>

        {step === "email" ? (
          <form onSubmit={sendCode} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
              inputMode="email"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-opacity disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send my code"}
            </button>
            {error && <p className="text-sm text-red-400">{error}</p>}
          </form>
        ) : (
          <form onSubmit={verify} className="space-y-3">
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^\d]/g, "").slice(0, 6))}
              placeholder="123456"
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength={6}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-center text-2xl font-semibold tracking-[0.3em] text-foreground outline-none transition-colors placeholder:text-muted-foreground placeholder:tracking-normal focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
            >
              {loading ? "Verifying…" : "Verify & sign in"}
            </button>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="button"
              onClick={() => { setStep("email"); setCode(""); setError(null) }}
              className="w-full pt-1 text-center text-xs text-muted-foreground underline underline-offset-2"
            >
              Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
