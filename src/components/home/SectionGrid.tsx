import { BookOpen, MoonStar, Scale, ShieldCheck } from "lucide-react";
import type { ComponentType } from "react";
import { SECTION_CARDS } from "@/data/content";
import { accentClasses } from "@/components/site/SectionTitle";
import { navigate } from "@/router";
import { cn } from "@/utils/cn";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  moon: MoonStar,
  shield: ShieldCheck,
  book: BookOpen,
  scale: Scale,
};

/** أقسام الموسوعة الأربعة، كل بطاقة تنقل إلى صفحتها */
export function SectionGrid() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {SECTION_CARDS.map((card) => {
          const Icon = ICONS[card.icon] ?? BookOpen;
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => navigate(card.path)}
              className="group relative overflow-hidden rounded-[22px] border border-hairline bg-surface p-5 text-right soft-shadow transition hover:border-gold/40 active:scale-[0.99]"
            >
              <div
                className={cn(
                  "pointer-events-none absolute -top-16 -end-12 size-44 rounded-full blur-2xl transition-opacity group-hover:opacity-100",
                  accentClasses.bg[card.accent],
                  "opacity-60",
                )}
                aria-hidden
              />
              <div className="relative flex items-start gap-3.5">
                <span
                  className={cn(
                    "grid size-12 shrink-0 place-items-center rounded-2xl border border-hairline",
                    accentClasses.bg[card.accent],
                    accentClasses.text[card.accent],
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="display-font text-[18px] font-bold leading-snug">{card.title}</h3>
                    <span className="shrink-0 rounded-full bg-gold/14 px-2.5 py-1 text-[11.5px] font-bold text-gold">
                      {card.count} {card.unit}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{card.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
