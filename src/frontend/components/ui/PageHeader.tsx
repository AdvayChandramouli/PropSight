import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  iconClassName?: string;
}

/** Consistent page heading using Yellowtail + Rethink Sans pairing */
export function PageHeader({
  icon: Icon,
  title,
  subtitle,
  iconClassName = "text-pool",
}: PageHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Icon className={`h-7 w-7 ${iconClassName}`} />
        <h2 className="page-title">{title}</h2>
      </div>
      <p className="page-subtitle mt-2 max-w-2xl">{subtitle}</p>
    </div>
  );
}
