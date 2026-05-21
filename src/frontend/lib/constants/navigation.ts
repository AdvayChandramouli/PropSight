import type { AppViewMode, DashboardView } from "@/lib/types";

/** Top-nav link definitions keyed by dashboard view id */
export const NAV_ITEMS: {
  id: DashboardView;
  label: string;
  emphasis: AppViewMode | "both";
}[] = [
  { id: "market", label: "Market Overview", emphasis: "investor" },
  { id: "listing", label: "Price Optimizer", emphasis: "host" },
  { id: "neighborhoods", label: "Demand Explorer", emphasis: "investor" },
  { id: "revenue", label: "Yield Estimator", emphasis: "both" },
  { id: "sentiment", label: "Sentiment Explorer", emphasis: "host" },
];

/** Default dashboard view when switching Host / Investor mode */
export const DEFAULT_VIEWS: Record<AppViewMode, DashboardView> = {
  investor: "market",
  host: "listing",
};

export const VIEW_LABELS: Record<
  AppViewMode,
  { title: string; subtitle: string }
> = {
  investor: {
    title: "Investor View",
    subtitle: "Macro market surveying & yield discovery",
  },
  host: {
    title: "Host View",
    subtitle: "Property-level optimization & guest signals",
  },
};
