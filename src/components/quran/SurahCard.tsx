import { memo } from "react";
import type { Surah } from "@/types";
import { cn } from "@/utils/cn";

/** بطاقة سورة: الرقم والاسم والنوع وعدد الآيات والفضل */
export const SurahCard = memo(function SurahCard({
  surah,
  onClick,
  compact = false,
}: {
  surah: Surah;
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative h-full overflow-hidden rounded-[20px] border border-hairline bg-surface text-right soft-shadow transition hover:border-quran/45 active:scale-[0.98]",
        compact ? "p-3.5" : "p-4",
      )}
    >
      <span className="pointer-events-none absolute -top-10 -end-8 size-24 rounded-full bg-quran/12 blur-2xl" aria-hidden />
      <div className="relative flex items-start gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-hairline bg-quran/14 text-[13px] font-bold text-quran">
          {surah.number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="display-font block text-[16.5px] font-bold leading-snug">
            سورة {surah.name}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-muted">
            <span className="rounded-full bg-quran/12 px-2 py-0.5 font-medium text-quran">
              {surah.revelation}
            </span>
            <span className="rounded-full border border-hairline px-2 py-0.5">
              {surah.ayahs} آية
            </span>
          </span>
        </span>
      </div>
      {!compact && (
        <p className="relative mt-2.5 line-clamp-3 text-[12.5px] leading-relaxed text-muted">
          {surah.virtue}
        </p>
      )}
    </button>
  );
});
