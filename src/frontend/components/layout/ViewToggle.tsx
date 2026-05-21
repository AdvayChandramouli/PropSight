"use client";

import { Building2, Home } from "lucide-react";
import { VIEW_LABELS } from "@/lib/constants/navigation";
import type { AppViewMode } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  viewMode: AppViewMode;
  onViewModeChange: (mode: AppViewMode) => void;
}

/** Host vs Investor toggle — controlled via parent useState */
export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right lg:block">
        <p className="font-body text-xs font-semibold text-slate-800">
          {VIEW_LABELS[viewMode].title}
        </p>
        <p className="font-body text-[11px] text-slate-500">
          {VIEW_LABELS[viewMode].subtitle}
        </p>
      </div>

      <div
        className="flex rounded-xl border border-white/50 bg-white/30 p-1 backdrop-blur-sm"
        role="group"
        aria-label="View mode toggle"
      >
        <button
          type="button"
          onClick={() => onViewModeChange("host")}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-body text-xs font-medium transition-all sm:text-sm",
            viewMode === "host"
              ? "bg-coral/20 text-slate-800 shadow-inner ring-1 ring-coral/35"
              : "text-slate-500 hover:text-slate-800",
          )}
        >
          <Home className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Host</span>
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange("investor")}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-body text-xs font-medium transition-all sm:text-sm",
            viewMode === "investor"
              ? "bg-pool/20 text-slate-800 shadow-inner ring-1 ring-pool/35"
              : "text-slate-500 hover:text-slate-800",
          )}
        >
          <Building2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Investor</span>
        </button>
      </div>
    </div>
  );
}
