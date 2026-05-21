import { cn } from "@/lib/utils/cn";

interface PropSightLogoProps {
  className?: string;
  /** Logo fill color — defaults to slate-900 for light backgrounds */
  color?: string;
}

/**
 * PropSight mark: city skyline with a mirrored water reflection.
 * Inspired by the brand reference — solid silhouette, window lights, ripple cutouts.
 */
export function PropSightLogo({
  className,
  color = "currentColor",
}: PropSightLogoProps) {
  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      {/* ── Skyline (top half) ── */}
      <g fill={color}>
        {/* Left wing */}
        <path d="M4 28 L4 20 L7 20 L7 16 L10 16 L10 28 Z" />
        <path d="M11 28 L11 14 L14 14 L14 28 Z" />
        {/* Center spire cluster */}
        <path d="M16 28 L16 8 L19 8 L19 12 L21 12 L21 6 L24 6 L24 28 Z" />
        <path d="M25 28 L25 10 L28 10 L28 28 Z" />
        <path d="M29 28 L29 4 L32 4 L32 28 Z" />
        {/* Right wing */}
        <path d="M33 28 L33 12 L36 12 L36 28 Z" />
        <path d="M37 28 L37 16 L40 16 L40 20 L43 20 L43 28 Z" />
        <path d="M44 28 L44 22 L47 22 L47 28 Z" />
      </g>

      {/* Window lights (skyline) */}
      <g fill="white" opacity="0.85">
        <rect x="5" y="22" width="1.5" height="1.5" />
        <rect x="5" y="18" width="1.5" height="1.5" />
        <rect x="12" y="20" width="1.5" height="1.5" />
        <rect x="12" y="16" width="1.5" height="1.5" />
        <rect x="17" y="22" width="1.5" height="1.5" />
        <rect x="17" y="18" width="1.5" height="1.5" />
        <rect x="17" y="14" width="1.5" height="1.5" />
        <rect x="22" y="20" width="1.5" height="1.5" />
        <rect x="22" y="14" width="1.5" height="1.5" />
        <rect x="30" y="10" width="1.5" height="1.5" />
        <rect x="30" y="16" width="1.5" height="1.5" />
        <rect x="30" y="22" width="1.5" height="1.5" />
        <rect x="34" y="18" width="1.5" height="1.5" />
        <rect x="38" y="22" width="1.5" height="1.5" />
        <rect x="45" y="24" width="1.5" height="1.5" />
      </g>

      {/* Shoreline */}
      <path
        d="M3 29.5 Q8 28.5 12 29.5 T24 29.5 T36 29.5 T45 29.5"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />

      {/* ── Reflection (bottom half, mirrored) ── */}
      <g fill={color} opacity="0.55">
        <path d="M4 29 L4 37 L7 37 L7 41 L10 41 L10 29 Z" />
        <path d="M11 29 L11 43 L14 43 L14 29 Z" />
        <path d="M16 29 L16 49 L19 49 L19 45 L21 45 L21 51 L24 51 L24 29 Z" />
        <path d="M25 29 L25 47 L28 47 L28 29 Z" />
        <path d="M29 29 L29 53 L32 53 L32 29 Z" />
        <path d="M33 29 L33 45 L36 45 L36 29 Z" />
        <path d="M37 29 L37 41 L40 41 L40 37 L43 37 L43 29 Z" />
        <path d="M44 29 L44 35 L47 35 L47 29 Z" />
      </g>

      {/* Ripple highlights cutting through reflection */}
      <g stroke="white" strokeWidth="0.8" opacity="0.6">
        <line x1="6" y1="34" x2="14" y2="34" />
        <line x1="18" y1="38" x2="28" y2="38" />
        <line x1="20" y1="44" x2="32" y2="44" />
        <line x1="34" y1="36" x2="44" y2="36" />
        <line x1="8" y1="48" x2="18" y2="48" />
      </g>
    </svg>
  );
}
