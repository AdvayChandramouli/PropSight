"use client";

import { useMemo, useState } from "react";
import { Check, TrendingUp, Wrench } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { MONTHLY_PROJECTIONS, UPGRADE_OPTIONS } from "@/lib/constants/mock-data";
import { cn } from "@/lib/utils";

/** 12-month yield estimator with glass upgrade checkboxes */
export function RevenueProjection() {
  const [selectedUpgrades, setSelectedUpgrades] = useState<Set<string>>(
    new Set(),
  );

  const totalBoostPct = useMemo(() => {
    return UPGRADE_OPTIONS.filter((u) => selectedUpgrades.has(u.id)).reduce(
      (sum, u) => sum + u.yieldBoostPct,
      0,
    );
  }, [selectedUpgrades]);

  const projections = useMemo(() => {
    const multiplier = 1 + totalBoostPct / 100;
    return MONTHLY_PROJECTIONS.map((row) => ({
      ...row,
      adjustedYield: Math.round(row.baseYield * multiplier),
    }));
  }, [totalBoostPct]);

  const annualBase = projections.reduce((s, r) => s + r.baseYield, 0);
  const annualAdjusted = projections.reduce((s, r) => s + r.adjustedYield, 0);
  const maxYield = Math.max(...projections.map((r) => r.adjustedYield));

  const toggleUpgrade = (id: string) => {
    setSelectedUpgrades((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <PageHeader
        icon={TrendingUp}
        title="Revenue Projection Tool"
        subtitle="12-month forward yield estimates with asset upgrade modeling"
        iconClassName="text-tropical-light"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <GlassCard className="metric-accent-pool p-5">
          <p className="font-body text-sm text-slate-600">Base Annual Projection</p>
          <p className="mt-2 font-body text-2xl font-bold text-pool-light">
            ${annualBase.toLocaleString()}
          </p>
        </GlassCard>
        <GlassCard className="metric-accent-coral p-5">
          <p className="font-body text-sm text-slate-600">
            Adjusted Annual Projection
          </p>
          <p className="mt-2 font-body text-2xl font-bold text-coral-light">
            ${annualAdjusted.toLocaleString()}
          </p>
          {totalBoostPct > 0 && (
            <p className="mt-1 font-body text-xs font-medium text-tropical-light">
              +{totalBoostPct}% from upgrades
            </p>
          )}
        </GlassCard>
        <GlassCard className="metric-accent-tropical p-5">
          <p className="font-body text-sm text-slate-600">Peak Month</p>
          <p className="mt-2 font-body text-2xl font-bold text-tropical-light">
            ${maxYield.toLocaleString()}
          </p>
        </GlassCard>
      </div>

      <GlassCard className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-slate-500" />
          <h3 className="font-body font-semibold text-slate-800">
            Add Asset / Upgrade Status
          </h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {UPGRADE_OPTIONS.map((upgrade) => {
            const isChecked = selectedUpgrades.has(upgrade.id);
            return (
              <label
                key={upgrade.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-4 backdrop-blur-sm transition",
                  isChecked
                    ? "border-tropical/40 bg-tropical/10 ring-1 ring-tropical/25"
                    : "border-slate-200/60 bg-white/30 hover:border-white/25",
                )}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleUpgrade(upgrade.id)}
                  className="sr-only"
                />
                <div
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border backdrop-blur-sm transition",
                    isChecked
                      ? "border-tropical bg-tropical/80 text-white"
                      : "border-white/25 bg-white/30",
                  )}
                >
                  {isChecked && <Check className="h-3.5 w-3.5" />}
                </div>
                <div>
                  <p className="font-body font-medium text-slate-800">
                    {upgrade.label}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-slate-500">
                    {upgrade.description}
                  </p>
                  <p className="mt-1 font-body text-xs font-semibold text-tropical-light">
                    +{upgrade.yieldBoostPct}% yield boost
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden">
        <div className="border-b border-slate-200/50 px-5 py-4">
          <h3 className="font-body font-semibold text-slate-800">
            12-Month Forward Projections
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full font-body text-sm">
            <thead>
              <tr className="border-b border-slate-200/50 bg-white/30 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3 font-semibold">Month</th>
                <th className="px-5 py-3 font-semibold">Base Yield</th>
                <th className="px-5 py-3 font-semibold">Adjusted Yield</th>
                <th className="px-5 py-3 font-semibold">Visual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50">
              {projections.map((row) => {
                const uplift = row.adjustedYield - row.baseYield;
                const barWidth = (row.adjustedYield / maxYield) * 100;
                return (
                  <tr key={row.month} className="transition hover:bg-white/30">
                    <td className="px-5 py-3 font-medium text-slate-800">
                      {row.month}
                    </td>
                    <td className="px-5 py-3 text-slate-500">
                      ${row.baseYield.toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-bold text-coral-light">
                        ${row.adjustedYield.toLocaleString()}
                      </span>
                      {uplift > 0 && (
                        <span className="ml-2 text-xs font-medium text-tropical-light">
                          (+${uplift.toLocaleString()})
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="h-2.5 w-full max-w-xs overflow-hidden rounded-full bg-white/35">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-pool to-coral transition-all duration-500"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-200/60 bg-white/30 font-semibold">
                <td className="px-5 py-3 text-slate-800">Annual Total</td>
                <td className="px-5 py-3 text-slate-600">
                  ${annualBase.toLocaleString()}
                </td>
                <td className="px-5 py-3 text-coral-light">
                  ${annualAdjusted.toLocaleString()}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
