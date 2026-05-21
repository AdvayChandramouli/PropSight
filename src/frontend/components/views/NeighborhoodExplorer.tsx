"use client";

import { useMemo, useState } from "react";
import { Filter, Map, Zap } from "lucide-react";
import { DemandBadge } from "@/components/ui/DemandBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { NEIGHBORHOODS } from "@/lib/constants/mock-data";
import type { DemandSignal } from "@/lib/types";
import { cn } from "@/lib/utils";

type FilterSignal = DemandSignal | "all";

/**
 * Demand explorer — pulsing sunset-coral glow on glass cards
 * when Z-score exceeds 1.5 (Demand Spike Territory).
 */
export function NeighborhoodExplorer() {
  const [filter, setFilter] = useState<FilterSignal>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return NEIGHBORHOODS;
    return NEIGHBORHOODS.filter((n) => n.demandSignal === filter);
  }, [filter]);

  const spikeCount = NEIGHBORHOODS.filter(
    (n) => n.demandSignal === "spike",
  ).length;

  return (
    <div className="space-y-8">
      <PageHeader
        icon={Map}
        title="Neighbourhood Demand Explorer"
        subtitle="ML-derived Review Velocity Z-Scores · Tourism spike detection"
        iconClassName="text-pool-light"
      />

      {spikeCount > 0 && (
        <GlassCard className="flex items-center gap-4 border-coral/30 bg-coral/10 p-5">
          <Zap className="h-6 w-6 shrink-0 animate-pulse text-coral-light" />
          <div>
            <p className="font-body font-semibold text-coral-light">
              {spikeCount} neighborhood{spikeCount > 1 ? "s" : ""} in Demand
              Spike Territory
            </p>
            <p className="font-body text-sm text-slate-600">
              Review velocity Z-score exceeds 1.5 — recent tourism surge detected
            </p>
          </div>
        </GlassCard>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-slate-500" />
        {(
          [
            { value: "all", label: "All Markets" },
            { value: "spike", label: "Demand Spike" },
            { value: "stable", label: "Stable" },
            { value: "cooling", label: "Cooling" },
          ] as const
        ).map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFilter(option.value)}
            className={cn(
              "rounded-full border px-3 py-1.5 font-body text-sm font-medium backdrop-blur-sm transition",
              filter === option.value
                ? "border-pool/40 bg-pool/15 text-pool-light"
                : "border-slate-200/60 bg-white/30 text-slate-500 hover:border-white/25 hover:text-slate-800",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((n) => {
          const isSpike = n.reviewVelocityZ > 1.5;
          return (
            <GlassCard
              key={n.id}
              spike={isSpike}
              className="relative p-5"
            >
              {isSpike && (
                <div className="absolute right-0 top-0 rounded-bl-xl bg-coral px-3 py-1 font-body text-xs font-bold text-white">
                  Z &gt; 1.5
                </div>
              )}
              <h3 className="font-body font-semibold text-slate-800">{n.name}</h3>
              <div className="mt-2">
                <DemandBadge signal={n.demandSignal} zScore={n.reviewVelocityZ} />
              </div>

              <div className="mt-4">
                <div className="flex justify-between font-body text-xs text-slate-500">
                  <span>Review Velocity Z-Score</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {n.reviewVelocityZ.toFixed(2)}
                  </span>
                </div>
                <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-white/35">
                  <div className="absolute left-1/2 top-0 h-full w-px bg-white/20" />
                  <div
                    className={cn(
                      "absolute top-0 h-full rounded-full transition-all",
                      n.reviewVelocityZ > 1.5
                        ? "bg-gradient-to-r from-coral to-coral-light"
                        : n.reviewVelocityZ < 0
                          ? "bg-slate-500"
                          : "bg-gradient-to-r from-pool to-pool-light",
                    )}
                    style={{
                      left: n.reviewVelocityZ >= 0 ? "50%" : undefined,
                      right: n.reviewVelocityZ < 0 ? "50%" : undefined,
                      width: `${Math.min(Math.abs(n.reviewVelocityZ) * 25, 50)}%`,
                    }}
                  />
                </div>
                <div className="mt-1 flex justify-between font-body text-[10px] text-slate-500">
                  <span>Cooling</span>
                  <span>Stable</span>
                  <span>Spike</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200/50 pt-4">
                <div>
                  <p className="font-body text-xs text-slate-500">Yield</p>
                  <p className="font-body font-bold text-coral-light">
                    {n.yieldPct}%
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs text-slate-500">Listings</p>
                  <p className="font-body font-bold text-slate-800">
                    {n.listingCount}
                  </p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
