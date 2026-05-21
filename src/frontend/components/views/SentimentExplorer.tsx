"use client";

import {
  AlertTriangle,
  BadgeDollarSign,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SENTIMENT_TOPICS } from "@/lib/constants/mock-data";
import type { SentimentTopic } from "@/lib/types";
import { cn } from "@/lib/utils";

const TOPIC_ICONS = {
  sparkles: Sparkles,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  "badge-dollar": BadgeDollarSign,
};

function scoreColor(score: number): string {
  if (score >= 85) return "from-tropical to-tropical-light";
  if (score >= 70) return "from-pool to-pool-light";
  return "from-coral to-coral-light";
}

function TopicCard({ topic }: { topic: SentimentTopic }) {
  const Icon = TOPIC_ICONS[topic.icon];
  const isNegativeTrend = topic.trend < -5;

  return (
    <GlassCard
      className={cn("p-5", isNegativeTrend && "ring-1 ring-coral/30")}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-sm",
              topic.score >= 85
                ? "border border-tropical/30 bg-tropical/15 text-tropical-light"
                : topic.score >= 70
                  ? "border border-pool/30 bg-pool/15 text-pool-light"
                  : "border border-coral/30 bg-coral/15 text-coral-light",
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-body font-semibold text-slate-800">{topic.label}</h3>
            <p className="font-body text-xs text-slate-500">NLP topic cluster</p>
          </div>
        </div>
        <span
          className={cn(
            "font-body text-2xl font-bold",
            topic.score >= 85
              ? "text-tropical-light"
              : topic.score >= 70
                ? "text-pool-light"
                : "text-coral-light",
          )}
        >
          {topic.score}%
        </span>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/35">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all",
            scoreColor(topic.score),
          )}
          style={{ width: `${topic.score}%` }}
        />
      </div>

      <div className="mt-3 flex items-center gap-1 font-body text-xs">
        <span
          className={cn(
            "font-semibold",
            topic.trend > 0
              ? "text-tropical-light"
              : topic.trend < 0
                ? "text-coral-light"
                : "text-slate-500",
          )}
        >
          {topic.trend > 0 ? "+" : ""}
          {topic.trend}%
        </span>
        <span className="text-slate-500">vs prior 30 reviews</span>
      </div>
    </GlassCard>
  );
}

/** NLP sentiment explorer with glass alert banner for anomaly flags */
export function SentimentExplorer() {
  const cleanliness = SENTIMENT_TOPICS.find((t) => t.id === "cleanliness");
  const avgScore = Math.round(
    SENTIMENT_TOPICS.reduce((s, t) => s + t.score, 0) /
      SENTIMENT_TOPICS.length,
  );

  return (
    <div className="space-y-8">
      <PageHeader
        icon={MessageSquareText}
        title="Review Sentiment Explorer"
        subtitle="NLP-derived topic signals · no raw review text wall"
        iconClassName="text-pool-light"
      />

      {cleanliness && cleanliness.trend <= -10 && (
        <GlassCard
          role="alert"
          className="flex items-start gap-4 border-coral/35 bg-coral/10 p-5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-coral/30 bg-coral/20 backdrop-blur-sm">
            <AlertTriangle className="h-5 w-5 text-coral-light" />
          </div>
          <div>
            <p className="font-body font-bold text-coral-light">
              Anomaly Flag Alert
            </p>
            <p className="mt-1 font-body text-sm text-slate-200">
              Warning: Cleanliness score dropped{" "}
              <span className="font-semibold text-slate-800">
                {Math.abs(cleanliness.trend)}%
              </span>{" "}
              in the last 3 reviews. Consider scheduling a deep clean before the
              next guest arrival.
            </p>
          </div>
        </GlassCard>
      )}

      <GlassCard className="flex flex-wrap items-center gap-6 p-5">
        <div>
          <p className="font-body text-sm text-slate-500">
            Composite Sentiment Score
          </p>
          <p className="font-body text-4xl font-bold text-pool-light">
            {avgScore}%
          </p>
        </div>
        <div className="hidden h-12 w-px bg-white/15 sm:block" />
        <div className="min-w-[200px] flex-1">
          <p className="mb-2 font-body text-xs text-slate-500">
            Weighted across {SENTIMENT_TOPICS.length} topic clusters
          </p>
          <div className="h-4 overflow-hidden rounded-full bg-white/35">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pool via-tropical to-coral"
              style={{ width: `${avgScore}%` }}
            />
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-2">
        {SENTIMENT_TOPICS.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      <GlassCard className="p-5">
        <h3 className="mb-3 font-body font-semibold text-slate-800">
          Sentiment Signal Legend
        </h3>
        <div className="flex flex-wrap gap-4 font-body text-sm">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-tropical" />
            <span className="text-slate-600">Strong (85%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-pool" />
            <span className="text-slate-600">Healthy (70–84%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-coral" />
            <span className="text-slate-600">At Risk (&lt;70%)</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
