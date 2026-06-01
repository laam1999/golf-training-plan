import type { Metadata } from "next"
import type { ReactNode } from "react"
import { AuthGuard } from "@/components/tracker/AuthGuard"
import { BottomNav } from "@/components/tracker/BottomNav"

export const metadata: Metadata = {
  title: "Caddova — Your Training",
  manifest: "/manifest.json",
}

export default function TrackerLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-[100dvh] bg-background pb-20 text-foreground">
        <main className="mx-auto max-w-md px-4 pt-6">{children}</main>
        <BottomNav />
      </div>
    </AuthGuard>
  )
}
