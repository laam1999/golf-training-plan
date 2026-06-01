import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { ProgressionTimeline } from "@/components/landing/progression-timeline"
import { HowItWorks } from "@/components/landing/how-it-works"
import { TrainingPlanCard } from "@/components/landing/training-plan-card"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProgressionTimeline />
      <HowItWorks />
      <TrainingPlanCard />
      <CTASection />
      <Footer />
    </main>
  )
}
