import type { DemandSignal } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Flame, Minus, Snowflake } from "lucide-react";

const SIGNAL_CONFIG: Record<
  DemandSignal,
  { label: string; className: string; icon: typeof Flame }
> = {
  spike: {
    label: "Demand Spike",
    className:
      "border-coral/45 bg-coral/15 text-coral-dark animate-pulseGlow backdrop-blur-md",
    icon: Flame,
  },
  stable: {
    label: "Stable",
    className: "border-pool/30 bg-pool/10 text-pool-dark backdrop-blur-md",
    icon: Minus,
  },
  cooling: {
    label: "Cooling",
    className:
      "border-slate-300/60 bg-white/40 text-slate-600 backdrop-blur-md",
    icon: Snowflake,
  },
};

interface DemandBadgeProps {
  signal: DemandSignal;
  zScore: number;
}

/** Glass badge for neighborhood demand signals based on review velocity Z-score */
export function DemandBadge({ signal, zScore }: DemandBadgeProps) {
  const config = SIGNAL_CONFIG[signal];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-body text-xs font-semibold",
        config.className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
      <span className="font-mono opacity-75">Z={zScore.toFixed(1)}</span>
    </span>
  );
}
