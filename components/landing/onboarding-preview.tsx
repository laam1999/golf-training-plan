"use client"

import { useState } from "react"
import { ArrowRight, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    id: 1,
    title: "Your Current Game",
    fields: [
      { label: "Current Handicap", placeholder: "e.g., 15" },
      { label: "How long have you played?", placeholder: "e.g., 5 years" },
    ],
  },
  {
    id: 2,
    title: "Your Clubs",
    options: ["Full Set (14 clubs)", "Basic Set (10-12)", "Partial Set (<10)", "Need Advice"],
  },
  {
    id: 3,
    title: "Your Weaknesses",
    options: ["Driving", "Iron Play", "Short Game", "Putting", "Course Management", "Mental Game"],
    multiSelect: true,
  },
  {
    id: 4,
    title: "Your Goal",
    options: ["Drop 5+ strokes", "Break 100", "Break 90", "Break 80", "Get to single digits", "Just have more fun"],
  },
]

export function OnboardingPreview() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const step = steps[currentStep]

  const handleOptionSelect = (option: string) => {
    if (step.multiSelect) {
      setSelectedOptions((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
      )
    } else {
      setSelectedOptions([option])
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setSelectedOptions([])
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setSelectedOptions([])
    }
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-card/50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Get Started
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Effortless Onboarding
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Answer a few quick questions about your game, and our AI will build your personalized 12-week improvement plan in seconds.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Takes just a few minutes",
                "No signup, no credit card",
                "Plan generates in ~30 seconds",
                "Email or print it and start today",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Onboarding card */}
          <div className="relative">
            <div className="glass-card rounded-2xl p-6 md:p-8">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
                  <span className="text-foreground font-medium">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step content */}
              <div className="min-h-[280px]">
                <h3 className="text-xl font-semibold text-foreground mb-6">{step.title}</h3>

                {"fields" in step ? (
                  <div className="space-y-4">
                    {step.fields.map((field) => (
                      <div key={field.label}>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          className="w-full rounded-lg bg-secondary border-0 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {"options" in step &&
                      step.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(option)}
                          className={`flex items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition-all ${
                            selectedOptions.includes(option)
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {option}
                          {selectedOptions.includes(option) && (
                            <Check className="h-4 w-4" />
                          )}
                        </button>
                      ))}
                  </div>
                )}

                {step.multiSelect && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Select all that apply
                  </p>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                {currentStep === steps.length - 1 ? (
                  <Button
                    asChild
                    className="group bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <a href="/plan.html">
                      Get My Plan
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="group bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                )}
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 -right-4 -bottom-4 h-full w-full rounded-2xl bg-accent/10" />
          </div>
        </div>
      </div>
    </section>
  )
}
