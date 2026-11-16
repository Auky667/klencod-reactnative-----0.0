import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { AccentKey } from "@/types";

const ACCENT_TEXT: Record<AccentKey, string> = {
  seerah: "text-seerah",
  aqeedah: "text-aqeedah",
  quran: "text-quran",
  fiqh: "text-fiqh",
  gold: "text-gold",
};

const ACCENT_BG: Record<AccentKey, string> = {
  seerah: "bg-seerah/14",
  aqeedah: "bg-aqeedah/14",
  quran: "bg-quran/14",
  fiqh: "bg-fiqh/14",
  gold: "bg-gold/14",
};

const ACCENT_BAR: Record<AccentKey, string> = {
  seerah: "from-seerah to-seerah/30",
  aqeedah: "from-aqeedah to-aqeedah/30",
  quran: "from-quran to-quran/30",
  fiqh: "from-fiqh to-fiqh/30",
  gold: "from-gold to-gold/30",
};

export const accentClasses = { text: ACCENT_TEXT, bg: ACCENT_BG, bar: ACCENT_BAR };

/** عنوان قسم داخل الصفحة مع خطٍّ ذهبيٍّ ووصفٍ اختياري */
export function SectionTitle({
  title,
  description,
  accent = "gold",
  action,
  className,
  icon,
}: {
  title: string;
  description?: string;
  accent?: AccentKey;
  action?: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <div className={cn("mb-4", className)}>
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className={cn("mb-2 h-[3px] w-12 rounded-full bg-gradient-to-l", ACCENT_BAR[accent])} />
          <h2 className="display-font inline-flex items-center gap-2 text-xl font-bold leading-snug sm:text-2xl">
            {icon}
            {title}
          </h2>
          {description && (
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted sm:text-sm">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
