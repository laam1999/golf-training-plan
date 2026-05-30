"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "David Chen",
    handicap: "16 → 11",
    location: "San Francisco, CA",
    avatar: "D",
    quote:
      "I was stuck at 16 for years. Caddova identified my putting as the issue I was ignoring. 12 weeks later, I broke 80 for the first time.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    handicap: "24 → 18",
    location: "Austin, TX",
    avatar: "S",
    quote:
      "The personalized drills actually fit my schedule. 30 minutes, 3x a week, and I saw real improvement. The app kept me accountable.",
    rating: 5,
  },
  {
    name: "Marcus Thompson",
    handicap: "12 → 8",
    location: "Chicago, IL",
    avatar: "M",
    quote:
      "Breaking into single digits felt impossible until Caddova. The course management insights alone were worth it. This is the real deal.",
    rating: 5,
  },
  {
    name: "Jennifer Park",
    handicap: "20 → 14",
    location: "Seattle, WA",
    avatar: "J",
    quote:
      "As a busy mom, I needed efficient practice. Caddova gave me a plan that worked with my life. Six strokes down in three months!",
    rating: 5,
  },
  {
    name: "Robert Williams",
    handicap: "8 → 4",
    location: "Phoenix, AZ",
    avatar: "R",
    quote:
      "Already a low handicapper but wanted to go lower. The mental game modules and pressure practice routines were game-changers.",
    rating: 5,
  },
  {
    name: "Emily Foster",
    handicap: "28 → 21",
    location: "Denver, CO",
    avatar: "E",
    quote:
      "Started golf during the pandemic with no idea what I was doing. Caddova gave me structure and confidence. Now I actually love the game.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden" id="testimonials">
      {/* Background */}
      <div className="absolute right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Success Stories
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Golfers Who Transformed Their Game
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
            Real results from real golfers who committed to their 12-week journey.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <span className="text-lg font-semibold text-primary">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-lg font-bold text-primary">{testimonial.handicap}</div>
                  <div className="text-xs text-muted-foreground">Handicap</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
