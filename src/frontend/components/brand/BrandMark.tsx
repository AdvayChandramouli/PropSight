import Link from "next/link";
import { PropSightLogo } from "./PropSightLogo";
import { cn } from "@/lib/utils/cn";

interface BrandMarkProps {
  href?: string;
  className?: string;
  /** Show wordmark alongside the logo icon */
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: { logo: "h-7 w-7", text: "text-xl" },
  md: { logo: "h-9 w-9", text: "text-2xl sm:text-3xl" },
  lg: { logo: "h-12 w-12", text: "text-4xl sm:text-5xl" },
};

/**
 * Combined PropSight logo + Yellowtail wordmark for nav and hero placements.
 */
export function BrandMark({
  href = "/",
  className,
  showWordmark = true,
  size = "md",
}: BrandMarkProps) {
  const sizes = SIZE_MAP[size];

  const content = (
    <>
      <PropSightLogo
        className={cn(sizes.logo, "text-slate-800")}
        aria-hidden
      />
      {showWordmark && (
        <span className={cn("font-heading text-slate-800", sizes.text)}>
          PropSight
        </span>
      )}
    </>
  );

  if (!href) {
    return (
      <div className={cn("flex items-center gap-2.5", className)}>{content}</div>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2.5 transition-opacity hover:opacity-85",
        className,
      )}
      aria-label="PropSight home"
    >
      {content}
    </Link>
  );
}
