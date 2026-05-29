"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-primary-foreground"
              >
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path
                  d="M12 2v4M12 18v4M2 12h4M18 12h4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              GolfGains
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden items-center md:flex">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="/plan.html">Get My Plan</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 pb-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#features"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <div className="pt-4 border-t border-border">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="/plan.html">Get My Plan</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
