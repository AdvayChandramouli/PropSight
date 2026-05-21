import type { MetricCard } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

const ACCENT_STYLES = {
  sunset: "metric-accent-coral",
  pool: "metric-accent-pool",
  tropical: "metric-accent-tropical",
};

const VALUE_COLORS = {
  sunset: "text-coral-dark",
  pool: "text-pool-dark",
  tropical: "text-tropical-dark",
};

interface MetricCardProps {
  metric: MetricCard;
}

/** Reusable liquid-glass KPI card for dashboard metrics */
export function MetricCardView({ metric }: MetricCardProps) {
  const TrendIcon =
    metric.trend === "up"
      ? ArrowUpRight
      : metric.trend === "down"
        ? ArrowDownRight
        : Minus;

  const trendColor =
    metric.trend === "up"
      ? "text-tropical-dark"
      : metric.trend === "down"
        ? "text-coral-dark"
        : "text-slate-500";

  return (
    <GlassCard className={cn("p-5", ACCENT_STYLES[metric.accent])}>
      <p className="font-body text-sm font-medium text-slate-600">
        {metric.label}
      </p>
      <p
        className={cn(
          "mt-2 font-body text-3xl font-bold tracking-tight",
          VALUE_COLORS[metric.accent],
        )}
      >
        {metric.value}
      </p>
      <div
        className={cn(
          "mt-3 flex items-center gap-1 font-body text-xs",
          trendColor,
        )}
      >
        <TrendIcon className="h-3.5 w-3.5" />
        <span>{metric.change}</span>
      </div>
    </GlassCard>
  );
}
