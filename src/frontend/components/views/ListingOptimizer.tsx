"use client";

import { useMemo, useState } from "react";
import {
  Calendar,
  DollarSign,
  Home,
  Percent,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { LISTING, WEEKLY_CALENDAR } from "@/lib/constants/mock-data";
import { cn } from "@/lib/utils";

/** Inverse price → occupancy model anchored at listing base rate */
function computeOccupancy(price: number): number {
  const { currentNightlyRate, baseOccupancyAtBasePrice, minPrice, maxPrice } =
    LISTING;

  const minOccupancy = 0.35;
  const priceRange = maxPrice - minPrice;
  const normalizedPrice = (price - minPrice) / priceRange;
  const baseNormalized = (currentNightlyRate - minPrice) / priceRange;
  const occupancyAtBase = baseOccupancyAtBasePrice;

  if (price <= currentNightlyRate) {
    const boost = (1 - normalizedPrice / baseNormalized) * 0.08;
    return Math.min(occupancyAtBase + boost, 0.95);
  }

  const decay =
    ((price - currentNightlyRate) / (maxPrice - currentNightlyRate)) *
    (occupancyAtBase - minOccupancy);
  return Math.max(occupancyAtBase - decay, minOccupancy);
}

/**
 * Host-focused price optimizer — slider drives occupancy (Target 2)
 * and monthly yield readout in real time.
 */
export function ListingOptimizer() {
  const [nightlyPrice, setNightlyPrice] = useState(LISTING.currentNightlyRate);

  const occupancy = useMemo(
    () => computeOccupancy(nightlyPrice),
    [nightlyPrice],
  );

  const occupancyPct = Math.round(occupancy * 100);
  const estimatedMonthlyYield = Math.round(nightlyPrice * occupancy * 30);

  return (
    <div className="space-y-8">
      <PageHeader
        icon={Home}
        title="Listing Detail & Price Optimizer"
        subtitle="Adjust nightly rate to see ML-predicted occupancy and yield impact"
        iconClassName="text-coral-light"
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="overflow-hidden lg:col-span-2">
          <div className="relative h-48 bg-gradient-to-br from-pool/30 via-coral/20 to-tropical/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-16 w-16 text-white/30" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-body text-lg font-bold text-white">
                {LISTING.title}
              </h3>
              <p className="font-body text-sm text-slate-200">
                {LISTING.location}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-200/50 border-t border-slate-200/50">
            <div className="px-4 py-3 text-center">
              <p className="font-body text-xs text-slate-500">Current Rate</p>
              <p className="font-body font-bold text-slate-800">
                ${LISTING.currentNightlyRate}
              </p>
            </div>
            <div className="px-4 py-3 text-center">
              <p className="font-body text-xs text-slate-500">Your Rate</p>
              <p className="font-body font-bold text-coral-light">
                ${nightlyPrice}
              </p>
            </div>
            <div className="px-4 py-3 text-center">
              <p className="font-body text-xs text-slate-500">Delta</p>
              <p
                className={cn(
                  "font-body font-bold",
                  nightlyPrice > LISTING.currentNightlyRate
                    ? "text-coral-light"
                    : nightlyPrice < LISTING.currentNightlyRate
                      ? "text-pool-light"
                      : "text-slate-600",
                )}
              >
                {nightlyPrice > LISTING.currentNightlyRate ? "+" : ""}$
                {nightlyPrice - LISTING.currentNightlyRate}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-6 p-6 lg:col-span-3">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="price-slider"
                className="flex items-center gap-2 font-body text-sm font-semibold text-slate-800"
              >
                <DollarSign className="h-4 w-4 text-coral-light" />
                Adjust Nightly Price
                <span className="font-normal text-slate-500">(Target 1)</span>
              </label>
              <span className="rounded-xl border border-coral/30 bg-coral/10 px-3 py-1 font-mono text-lg font-bold text-coral-light backdrop-blur-sm">
                ${nightlyPrice}
              </span>
            </div>
            <input
              id="price-slider"
              type="range"
              min={LISTING.minPrice}
              max={LISTING.maxPrice}
              step={5}
              value={nightlyPrice}
              onChange={(e) => setNightlyPrice(Number(e.target.value))}
              className="price-slider mt-4 w-full cursor-pointer"
            />
            <div className="mt-1 flex justify-between font-body text-xs text-slate-500">
              <span>${LISTING.minPrice}</span>
              <span>${LISTING.maxPrice}</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-pool/25 bg-pool/10 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 font-body text-sm text-slate-600">
                <Percent className="h-4 w-4 text-pool-light" />
                Predicted Occupancy
                <span className="text-slate-500">(Target 2)</span>
              </div>
              <span className="mt-3 block font-body text-4xl font-bold text-pool-light">
                {occupancyPct}%
              </span>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/35">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pool to-pool-light transition-all duration-300"
                  style={{ width: `${occupancyPct}%` }}
                />
              </div>
              <p className="mt-2 font-body text-xs text-slate-500">
                Inverse price elasticity · updates in real time
              </p>
            </div>

            <div className="rounded-xl border border-coral/25 bg-coral/10 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 font-body text-sm text-slate-600">
                <DollarSign className="h-4 w-4 text-coral-light" />
                Estimated Monthly Yield
              </div>
              <p className="mt-3 font-body text-4xl font-bold text-coral-light">
                ${estimatedMonthlyYield.toLocaleString()}
              </p>
              <p className="mt-2 font-mono text-xs text-slate-500">
                ${nightlyPrice} × {occupancyPct}% × 30 days
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Calendar className="h-5 w-5 text-pool-light" />
          <h3 className="font-body font-semibold text-slate-800">
            7-Day Pricing Calendar
          </h3>
          <span className="ml-auto font-body text-xs text-slate-500">
            Recommended vs current nightly pricing
          </span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {WEEKLY_CALENDAR.map((day) => {
            const diff = day.recommendedPrice - day.currentPrice;
            const isWeekend = day.day === "Sat" || day.day === "Sun";
            return (
              <div
                key={day.date}
                className={cn(
                  "rounded-xl border p-3 text-center backdrop-blur-sm transition",
                  isWeekend
                    ? "border-coral/30 bg-coral/10"
                    : "border-slate-200/60 bg-white/30",
                )}
              >
                <p className="font-body text-xs font-medium text-slate-500">
                  {day.day}
                </p>
                <p className="font-body text-lg font-bold text-slate-800">
                  {day.date}
                </p>
                <div className="mt-2 space-y-1">
                  <p className="font-body text-xs text-slate-500 line-through">
                    ${day.currentPrice}
                  </p>
                  <p className="font-body text-sm font-bold text-pool-light">
                    ${day.recommendedPrice}
                  </p>
                  {diff > 0 && (
                    <p className="font-body text-xs font-medium text-tropical-light">
                      +${diff}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
