"use client"

import { useEffect, useState } from "react"
import { Share, Plus, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function InstallButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [standalone, setStandalone] = useState(true) // assume installed until checked (avoids flash)
  const [showIosSteps, setShowIosSteps] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase()
    setIsIOS(/iphone|ipad|ipod/.test(ua))

    const nav = window.navigator as Navigator & { standalone?: boolean }
    const installed =
      window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true
    setStandalone(installed)

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  // Hide if already installed, dismissed, or no install path available
  if (standalone || dismissed) return null
  if (!deferred && !isIOS) return null

  async function handleClick() {
    if (deferred) {
      await deferred.prompt()
      await deferred.userChoice
      setDeferred(null)
    } else if (isIOS) {
      setShowIosSteps((s) => !s)
    }
  }

  return (
    <div className="mb-5 rounded-2xl border border-primary/30 bg-primary/10 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold">Add Caddova to your home screen</div>
          <div className="text-xs text-muted-foreground">Opens like a real app — straight to your plan.</div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1">
          <button
            onClick={handleClick}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            Add
          </button>
          <button onClick={() => setDismissed(true)} aria-label="Dismiss" className="p-1 text-muted-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showIosSteps && (
        <div className="mt-3 border-t border-primary/20 pt-3 text-xs leading-relaxed text-foreground/80">
          In Safari, tap the <span className="font-semibold">Share</span> button
          <Share className="mx-1 inline h-3.5 w-3.5" /> at the bottom, then choose
          <span className="font-semibold"> &ldquo;Add to Home Screen&rdquo;</span>
          <Plus className="mx-1 inline h-3.5 w-3.5" />.
        </div>
      )}
    </div>
  )
}
