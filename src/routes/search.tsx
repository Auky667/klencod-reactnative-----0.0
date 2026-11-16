import { SearchX } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { SearchEntry } from "@/types";
import { searchEntries } from "@/data/content";
import { excerptAround, rankEntries } from "@/utils/search";
import { SearchBar } from "@/components/site/SearchBar";
import { PageHeader } from "@/components/site/PageHeader";
import { navigate, useRoute } from "@/router";
import { cn } from "@/utils/cn";

const PAGE_SIZE = 18;
const STEP = 18;

const KIND_LABEL: Record<string, string> = {
  topic: "موضوع",
  surah: "سورة",
  name: "اسم",
};

/** صفحة البحث الشامل في كامل الموسوعة */
export default function SearchPage() {
  const { query } = useRoute();
  const initial = query.get("q") ?? "";
  const [term, setTerm] = useState(initial);
  const [limit, setLimit] = useState(PAGE_SIZE);

  useEffect(() => {
    setTerm(initial);
  }, [initial]);

  const results: SearchEntry[] = useMemo(() => {
    if (term.trim().length === 0) return searchEntries.slice(0, PAGE_SIZE);
    return rankEntries(searchEntries, term).map((r) => r.entry);
  }, [term]);
  const shown = results;
  const visible = shown.slice(0, limit);

  useEffect(() => {
    setLimit(term.trim().length === 0 ? PAGE_SIZE : PAGE_SIZE);
  }, [term]);

  const onChange = useCallback((value: string) => {
    setTerm(value);
    setLimit(PAGE_SIZE);
    const path = value.trim() ? `/search?q=${encodeURIComponent(value.trim())}` : "/search";
    if (window.location.hash !== `#${path}`) window.history.replaceState(null, "", `#${path}`);
  }, []);

  return (
    <div className="animate-rise">
      <PageHeader
        title="البحث في الموسوعة"
        description="بحثٌ فوريٌّ في السيرة النبوية والعقيدة وعلوم القرآن والتجويد والفقه وأسماء الله الحسنى والسور."
        accent="gold"
        chips={[`${searchEntries.length} مدخلًا`, "بحث فوري", "دعم العربية والتشكيل"]}
      />

      <div className="mx-auto mt-6 w-full max-w-5xl px-4 sm:px-6">
        <SearchBar value={term} onChange={onChange} autoFocus onSubmit={() => undefined} />

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-[13px] text-muted">
            {term.trim().length === 0 ? (
              <>أول {PAGE_SIZE} مدخلًا من الموسوعة</>
            ) : (
              <>
                نتائج البحث: <span className="font-bold text-gold">{results.length}</span>
              </>
            )}
          </p>
          {term.trim().length > 0 && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full border border-hairline bg-surface px-3 py-1.5 text-[12.5px] font-bold text-muted transition hover:text-gold"
            >
              مسح البحث
            </button>
          )}
        </div>

        <div className="mt-4 space-y-2.5">
          {visible.map((entry) => (
            <button
              key={`${entry.id}-${entry.kind}`}
              type="button"
              onClick={() => navigate(entry.route)}
              className="block w-full overflow-hidden rounded-[20px] border border-hairline bg-surface px-4 py-3.5 text-right soft-shadow transition hover:border-gold/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="display-font text-[16px] font-bold leading-snug text-ink">
                    {entry.title}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                    {term.trim() ? excerptAround(entry.summary, term) : entry.summary}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full border border-hairline bg-surface-2 px-2.5 py-1 text-[11px] font-bold",
                    entry.kind === "surah"
                      ? "text-quran"
                      : entry.kind === "name"
                        ? "text-gold"
                        : "text-muted",
                  )}
                >
                  {KIND_LABEL[entry.kind]}
                </span>
              </div>
              <p className="mt-2 inline-block rounded-full bg-gold/12 px-2.5 py-1 text-[11px] font-medium text-gold">
                {entry.group}
              </p>
            </button>
          ))}
        </div>

        {term.trim().length > 0 && results.length === 0 && (
          <div className="mt-10 rounded-[22px] border border-hairline bg-surface px-6 py-10 text-center">
            <SearchX className="mx-auto size-10 text-gold/70" />
            <p className="display-font mt-3 text-[17px] font-bold">لا توجد نتائج</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
              جرّب كلمةً أخرى، أو ابحث باسمٍ من أسماء الله، أو باسم سورةٍ أو مبحثٍ فقهي.
            </p>
            <button
              type="button"
              onClick={() => onChange("")}
              className="mt-4 rounded-full bg-gradient-to-l from-gold to-gold-deep px-5 py-2 text-[13.5px] font-bold text-[#1f1b16]"
            >
              مسح البحث
            </button>
          </div>
        )}

        {shown.length > visible.length && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setLimit((l) => l + STEP)}
              className="rounded-full border border-hairline bg-surface px-6 py-2.5 text-[13.5px] font-bold text-gold transition hover:bg-surface-2"
            >
              عرض المزيد ({shown.length - visible.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
