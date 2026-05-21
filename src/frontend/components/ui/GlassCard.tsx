import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** Apply pulsing coral glow for demand spike territory */
  spike?: boolean;
}

/** Reusable liquid-glass card surface */
export function GlassCard({
  children,
  className,
  spike,
  ...props
}: GlassCardProps) {
  return (
    <div className={cn("glass-card", spike && "glass-spike", className)} {...props}>
      {children}
    </div>
  );
}
