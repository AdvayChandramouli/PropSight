"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, TrendingUp } from "lucide-react";
import { MetricCardView } from "@/components/ui/MetricCard";
import { DemandBadge } from "@/components/ui/DemandBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { MARKET_METRICS, NEIGHBORHOODS } from "@/lib/constants/mock-data";
import { cn } from "@/lib/utils";

type SortKey = "yield" | "occupancy" | "listings";

/** Investor-focused market overview with glass KPI cards and ranking grid */
export function MarketOverview() {
  const [sortBy, setSortBy] = useState<SortKey>("yield");
  const [selectedId, setSelectedId] = useState<string | null>("n1");

  const sortedNeighborhoods = useMemo(() => {
    const copy = [...NEIGHBORHOODS];
    switch (sortBy) {
      case "yield":
        return copy.sort((a, b) => b.yieldPct - a.yieldPct);
      case "occupancy":
        return copy.sort((a, b) => b.occupancyPct - a.occupancyPct);
      case "listings":
        return copy.sort((a, b) => b.listingCount - a.listingCount);
    }
  }, [sortBy]);

  return (
    <div className="space-y-8">
      <PageHeader
        icon={TrendingUp}
        title="Market Overview Dashboard"
        subtitle="High-level STR market signals and top-yield neighborhoods"
        iconClassName="text-pool-light"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MARKET_METRICS.map((metric) => (
          <MetricCardView key={metric.label} metric={metric} />
        ))}
      </div>

      <GlassCard className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/50 px-5 py-4">
          <div>
            <h3 className="font-body font-semibold text-slate-800">
              Neighborhoods by Yield Capability
            </h3>
            <p className="font-body text-xs text-slate-500">
              Click a row to inspect · {sortedNeighborhoods.length} markets tracked
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="glass-input py-1.5"
            >
              <option value="yield" className="bg-slate-900">
                Sort by Yield
              </option>
              <option value="occupancy" className="bg-slate-900">
                Sort by Occupancy
              </option>
              <option value="listings" className="bg-slate-900">
                Sort by Listings
              </option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-200/50">
          {sortedNeighborhoods.map((n, index) => {
            const isSelected = selectedId === n.id;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedId(n.id)}
                className={cn(
                  "flex w-full items-center gap-4 px-5 py-4 text-left transition",
                  isSelected
                    ? "bg-gradient-to-r from-pool/10 to-coral/10"
                    : "hover:bg-white/30",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-body text-sm font-bold",
                    index < 3
                      ? "border border-coral/30 bg-coral/15 text-coral-light"
                      : "border border-slate-200/50 bg-white/30 text-slate-600",
                  )}
                >
                  #{index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-body font-semibold text-slate-800">
                      {n.name}
                    </span>
                    <DemandBadge
                      signal={n.demandSignal}
                      zScore={n.reviewVelocityZ}
                    />
                  </div>
                  <p className="mt-0.5 font-body text-xs text-slate-500">
                    {n.listingCount} active listings
                  </p>
                </div>
                <div className="hidden gap-6 sm:flex">
                  <div className="text-right">
                    <p className="font-body text-xs text-slate-500">Yield</p>
                    <p className="font-body font-bold text-coral-light">
                      {n.yieldPct}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-xs text-slate-500">Occupancy</p>
                    <p className="font-body font-bold text-pool-light">
                      {n.occupancyPct}%
                    </p>
                  </div>
                </div>
                <div className="hidden w-24 md:block">
                  <div className="h-2 overflow-hidden rounded-full bg-white/35">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pool to-coral transition-all"
                      style={{ width: `${Math.min(n.yieldPct * 8, 100)}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
