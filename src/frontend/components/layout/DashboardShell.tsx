"use client";

import { useCallback, useState } from "react";
import { TopNav } from "./TopNav";
import { MarketOverview } from "@/components/views/MarketOverview";
import { ListingOptimizer } from "@/components/views/ListingOptimizer";
import { NeighborhoodExplorer } from "@/components/views/NeighborhoodExplorer";
import { RevenueProjection } from "@/components/views/RevenueProjection";
import { SentimentExplorer } from "@/components/views/SentimentExplorer";
import { DEFAULT_VIEWS } from "@/lib/constants/navigation";
import type { AppViewMode, DashboardView } from "@/lib/types";

const VIEW_MAP: Record<DashboardView, React.ComponentType> = {
  market: MarketOverview,
  listing: ListingOptimizer,
  neighborhoods: NeighborhoodExplorer,
  revenue: RevenueProjection,
  sentiment: SentimentExplorer,
};

/**
 * Main dashboard shell — navigation and view-mode state via local useState.
 */
export function DashboardShell() {
  const [activeView, setActiveView] = useState<DashboardView>("market");
  const [viewMode, setViewModeState] = useState<AppViewMode>("investor");

  const handleViewModeChange = useCallback((mode: AppViewMode) => {
    setViewModeState(mode);
    setActiveView(DEFAULT_VIEWS[mode]);
  }, []);

  const ActiveComponent = VIEW_MAP[activeView];

  return (
    <>
      <TopNav
        activeView={activeView}
        onNavigate={setActiveView}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />
      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:py-10">
        <ActiveComponent />
      </main>
    </>
  );
}
