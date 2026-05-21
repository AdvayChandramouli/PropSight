import { BarChart3, MessageSquareHeart, Sparkles, Waves, Zap } from "lucide-react";
import { BrandMark } from "@/components/brand";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";

const CONCEPT_STEPS = [
  {
    icon: Sparkles,
    title: "Property DNA",
    description:
      "We start with your listing's static attributes — beds, amenities, location tier — to establish a baseline nightly rate and occupancy curve.",
    accent: "text-pool-dark",
  },
  {
    icon: Zap,
    title: "Tourism Spike Signals",
    description:
      "Real-time review velocity Z-scores flag neighborhoods heating up. When Z exceeds 1.5, you're in Demand Spike Territory — time to adjust.",
    accent: "text-coral-dark",
  },
  {
    icon: MessageSquareHeart,
    title: "Guest Sentiment NLP",
    description:
      "Topic clusters from reviews (Cleanliness, Location, Value…) reveal what's driving bookings — or what's quietly hurting them.",
    accent: "text-tropical-dark",
  },
];

/** Casual introduction landing page — entry point before the dashboard */
export function LandingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-12 sm:px-6 lg:py-20">
      <div className="mb-10 flex justify-center">
        <BrandMark href="/" size="lg" />
      </div>

      <section className="text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/35 px-4 py-1.5 font-body text-xs text-pool-dark backdrop-blur-sm">
          <Waves className="h-3.5 w-3.5" />
          STR Pricing Intelligence
        </div>

        <h1 className="font-heading text-5xl leading-tight text-slate-800 sm:text-6xl md:text-7xl">
          Smarter Pricing,
          <br />
          <span className="bg-gradient-to-r from-pool-dark via-violet-600 to-coral-dark bg-clip-text text-transparent">
            Sunnier Yields.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-slate-600 sm:text-lg">
          PropSight blends property data, tourism spike detection, and guest
          sentiment into one friendly dashboard — so you can price with
          confidence, not guesswork.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <GlassButton href="/dashboard" variant="coral">
            <BarChart3 className="h-5 w-5" />
            Dive Into the Dashboard
          </GlassButton>
          <p className="font-body text-xs text-slate-500">
            No login required · Mock data preview
          </p>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center font-heading text-3xl text-slate-800 sm:text-4xl">
          How the Engine Works
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center font-body text-sm text-slate-500">
          Three signals, one optimized nightly rate — no PhD required.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {CONCEPT_STEPS.map((step) => (
            <GlassCard key={step.title} className="p-6">
              <step.icon className={`mb-4 h-8 w-8 ${step.accent}`} />
              <h3 className="font-body text-lg font-semibold text-slate-800">
                {step.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      <GlassCard className="mt-16 flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <p className="font-heading text-2xl text-slate-800">
            Ready to ride the wave?
          </p>
          <p className="mt-1 font-body text-sm text-slate-600">
            Explore market yields, optimize your listing, and spot tourism
            spikes — all in one place.
          </p>
        </div>
        <GlassButton href="/dashboard">Launch PropSight →</GlassButton>
      </GlassCard>
    </div>
  );
}
