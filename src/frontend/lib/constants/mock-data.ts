import type {
  CalendarDay,
  MetricCard,
  MonthlyProjection,
  Neighborhood,
  SentimentTopic,
  UpgradeOption,
} from "../types";

/** Mock market-level KPI cards for the Investor dashboard */
export const MARKET_METRICS: MetricCard[] = [
  {
    label: "Average Market Yield",
    value: "8.4%",
    change: "+0.6% vs last quarter",
    trend: "up",
    accent: "sunset",
  },
  {
    label: "Median Occupancy Rate",
    value: "72%",
    change: "+3.2% seasonal lift",
    trend: "up",
    accent: "pool",
  },
  {
    label: "Top Performing Neighborhoods",
    value: "12",
    change: "Above 9% yield threshold",
    trend: "neutral",
    accent: "tropical",
  },
];

/** Neighborhoods ranked by yield capability */
export const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: "n1",
    name: "Oceanview Heights",
    yieldPct: 11.2,
    occupancyPct: 84,
    reviewVelocityZ: 2.1,
    demandSignal: "spike",
    listingCount: 142,
  },
  {
    id: "n2",
    name: "Downtown Arts District",
    yieldPct: 9.8,
    occupancyPct: 78,
    reviewVelocityZ: 0.4,
    demandSignal: "stable",
    listingCount: 318,
  },
  {
    id: "n3",
    name: "Harbor Walk",
    yieldPct: 9.1,
    occupancyPct: 81,
    reviewVelocityZ: 1.6,
    demandSignal: "spike",
    listingCount: 96,
  },
  {
    id: "n4",
    name: "Midtown Lofts",
    yieldPct: 7.6,
    occupancyPct: 69,
    reviewVelocityZ: -0.8,
    demandSignal: "cooling",
    listingCount: 204,
  },
  {
    id: "n5",
    name: "Garden District",
    yieldPct: 8.9,
    occupancyPct: 74,
    reviewVelocityZ: 0.2,
    demandSignal: "stable",
    listingCount: 167,
  },
  {
    id: "n6",
    name: "Sunset Ridge",
    yieldPct: 10.4,
    occupancyPct: 86,
    reviewVelocityZ: 1.9,
    demandSignal: "spike",
    listingCount: 58,
  },
];

/** 7-day pricing calendar for listing optimizer */
export const WEEKLY_CALENDAR: CalendarDay[] = [
  { day: "Mon", date: 22, currentPrice: 245, recommendedPrice: 265 },
  { day: "Tue", date: 23, currentPrice: 245, recommendedPrice: 255 },
  { day: "Wed", date: 24, currentPrice: 245, recommendedPrice: 280 },
  { day: "Thu", date: 25, currentPrice: 245, recommendedPrice: 295 },
  { day: "Fri", date: 26, currentPrice: 245, recommendedPrice: 320 },
  { day: "Sat", date: 27, currentPrice: 245, recommendedPrice: 340 },
  { day: "Sun", date: 28, currentPrice: 245, recommendedPrice: 310 },
];

/** 12-month forward revenue projections (base values in USD) */
export const MONTHLY_PROJECTIONS: MonthlyProjection[] = [
  { month: "Jun 2026", baseYield: 4820, adjustedYield: 4820 },
  { month: "Jul 2026", baseYield: 5240, adjustedYield: 5240 },
  { month: "Aug 2026", baseYield: 5680, adjustedYield: 5680 },
  { month: "Sep 2026", baseYield: 4950, adjustedYield: 4950 },
  { month: "Oct 2026", baseYield: 4380, adjustedYield: 4380 },
  { month: "Nov 2026", baseYield: 3920, adjustedYield: 3920 },
  { month: "Dec 2026", baseYield: 6100, adjustedYield: 6100 },
  { month: "Jan 2027", baseYield: 3650, adjustedYield: 3650 },
  { month: "Feb 2027", baseYield: 3780, adjustedYield: 3780 },
  { month: "Mar 2027", baseYield: 4520, adjustedYield: 4520 },
  { month: "Apr 2027", baseYield: 4890, adjustedYield: 4890 },
  { month: "May 2027", baseYield: 5120, adjustedYield: 5120 },
];

/** Asset upgrades that boost projected yield */
export const UPGRADE_OPTIONS: UpgradeOption[] = [
  {
    id: "hot-tub",
    label: "Add Hot Tub",
    description: "Premium amenity uplift across peak season",
    yieldBoostPct: 8,
  },
  {
    id: "superhost",
    label: "Achieve Superhost Status",
    description: "Trust badge improves conversion & ADR",
    yieldBoostPct: 12,
  },
  {
    id: "smart-lock",
    label: "Smart Lock + Self Check-in",
    description: "Operational efficiency & guest satisfaction",
    yieldBoostPct: 4,
  },
];

/** NLP sentiment topic clusters */
export const SENTIMENT_TOPICS: SentimentTopic[] = [
  {
    id: "cleanliness",
    label: "Cleanliness",
    score: 78,
    trend: -15,
    icon: "sparkles",
  },
  {
    id: "location",
    label: "Location",
    score: 94,
    trend: 2,
    icon: "map-pin",
  },
  {
    id: "communication",
    label: "Communication",
    score: 88,
    trend: 5,
    icon: "message-circle",
  },
  {
    id: "value",
    label: "Value",
    score: 82,
    trend: -3,
    icon: "badge-dollar",
  },
];

/** Listing metadata for the price optimizer view */
export const LISTING = {
  title: "Cozy Mid-Century Modern 2BR Villa",
  location: "Oceanview Heights · 2 bed · 2 bath",
  currentNightlyRate: 245,
  baseOccupancyAtBasePrice: 0.72,
  minPrice: 100,
  maxPrice: 400,
};
