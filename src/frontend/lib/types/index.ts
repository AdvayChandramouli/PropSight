/** Shared TypeScript types for PropSight UI shell */

export type AppViewMode = "host" | "investor";

/** Dashboard view identifiers — switched via local useState */
export type DashboardView =
  | "market"
  | "listing"
  | "neighborhoods"
  | "revenue"
  | "sentiment";

export type DemandSignal = "stable" | "cooling" | "spike";

export interface Neighborhood {
  id: string;
  name: string;
  yieldPct: number;
  occupancyPct: number;
  reviewVelocityZ: number;
  demandSignal: DemandSignal;
  listingCount: number;
}

export interface MetricCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  accent: "sunset" | "pool" | "tropical";
}

export interface CalendarDay {
  day: string;
  date: number;
  currentPrice: number;
  recommendedPrice: number;
}

export interface MonthlyProjection {
  month: string;
  baseYield: number;
  adjustedYield: number;
}

export interface SentimentTopic {
  id: string;
  label: string;
  score: number;
  trend: number;
  icon: "sparkles" | "map-pin" | "message-circle" | "badge-dollar";
}

export interface UpgradeOption {
  id: string;
  label: string;
  description: string;
  yieldBoostPct: number;
}
