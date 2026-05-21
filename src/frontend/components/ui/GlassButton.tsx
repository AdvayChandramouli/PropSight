import Link from "next/link";
import { cn } from "@/lib/utils";

interface GlassButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "coral";
}

/** Energetic liquid-glass CTA button */
export function GlassButton({
  href,
  onClick,
  children,
  className,
  variant = "primary",
}: GlassButtonProps) {
  const classes = cn(
    "glass-button",
    variant === "coral" &&
      "border-coral/40 shadow-[0_4px_20px_rgba(255,107,74,0.3)] hover:border-coral/60 hover:bg-coral/20",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
