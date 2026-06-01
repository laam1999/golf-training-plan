"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClipboardList, BookOpen, PencilLine, TrendingUp } from "lucide-react"

const tabs = [
  { href: "/app", label: "This Week", Icon: ClipboardList },
  { href: "/app/plan", label: "Plan", Icon: BookOpen },
  { href: "/app/log", label: "Log", Icon: PencilLine },
  { href: "/app/progress", label: "Progress", Icon: TrendingUp },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-md">
        {tabs.map(({ href, label, Icon }) => {
          const active = href === "/app" ? pathname === "/app" : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
