"use client";

import { BrandMark } from "@/components/brand";
import { NAV_ITEMS } from "@/lib/constants/navigation";
import type { AppViewMode, DashboardView } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ViewToggle } from "./ViewToggle";

interface TopNavProps {
  activeView: DashboardView;
  onNavigate: (view: DashboardView) => void;
  viewMode: AppViewMode;
  onViewModeChange: (mode: AppViewMode) => void;
}

/** Global fluid top navigation — logo, 5 view links, Host/Investor toggle */
export function TopNav({
  activeView,
  onNavigate,
  viewMode,
  onViewModeChange,
}: TopNavProps) {
  return (
    <header className="glass-nav sticky top-0 z-30">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-4 px-4 py-3 sm:px-6 lg:gap-6">
        <BrandMark href="/" size="sm" />

        <nav
          className="order-3 flex w-full gap-1 overflow-x-auto pb-1 lg:order-2 lg:w-auto lg:flex-1 lg:justify-center lg:pb-0"
          aria-label="Dashboard views"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            const isEmphasized =
              item.emphasis === "both" || item.emphasis === viewMode;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "shrink-0 rounded-xl px-3 py-2 font-body text-sm font-medium transition-all",
                  isActive
                    ? "border border-white/60 bg-white/50 text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                    : "text-slate-600 hover:bg-white/30 hover:text-slate-800",
                  !isEmphasized && !isActive && "opacity-45",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="order-2 ml-auto lg:order-3">
          <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
        </div>
      </div>
    </header>
  );
}
