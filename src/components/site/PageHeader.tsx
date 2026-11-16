import type { ComponentType } from "react";
import type { AccentKey } from "@/types";
import { accentClasses } from "@/components/site/SectionTitle";
import { cn } from "@/utils/cn";

/** رأس الصفحة: عنوانٌ ووصفٌ ووسومٌ إحصائية بخلفيةٍ زخرفيةٍ ذهبية */
export function PageHeader({
  title,
  description,
  accent = "gold",
  icon: Icon,
  chips,
}: {
  title: string;
  description: string;
  accent?: AccentKey;
  icon?: ComponentType<{ className?: string }>;
  chips?: string[];
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-b-[28px] border-b border-hairline",
        accentClasses.bg[accent],
      )}
    >
      <div className="islamic-pattern absolute inset-0 opacity-[0.13]" aria-hidden />
      <div
        className="pointer-events-none absolute -top-24 start-1/3 size-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.28), transparent 70%)" }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-5xl px-4 pb-7 pt-7 sm:px-6 sm:pb-9 sm:pt-9">
        <div className="flex items-start gap-3.5">
          {Icon && (
            <span
              className={cn(
                "grid size-12 shrink-0 place-items-center rounded-2xl border border-hairline bg-surface/70 soft-shadow",
                accentClasses.text[accent],
              )}
            >
              <Icon className="size-6" />
            </span>
          )}
          <div className="min-w-0">
            <h1 className="display-font text-[26px] font-bold leading-tight sm:text-3xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-muted sm:text-[15px]">
              {description}
            </p>
          </div>
        </div>

        {chips && chips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-hairline bg-surface/80 px-3 py-1 text-[12px] font-medium text-muted"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
