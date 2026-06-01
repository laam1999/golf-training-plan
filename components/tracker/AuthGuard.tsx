"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"

// Client-side auth gate. Redirects to /login when there is no session.
// Handles the magic-link landing too: supabase-js reads the token from the
// URL on load (detectSessionInUrl), so getSession resolves to the new session.
export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setLoading(false)
      if (!data.session) router.replace("/login")
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      if (!newSession) router.replace("/login")
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [router])

  if (loading) {
    return (
      <div className="grid min-h-[100dvh] place-items-center text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  if (!session) return null

  return <>{children}</>
}
