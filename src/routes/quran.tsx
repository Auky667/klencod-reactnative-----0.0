import { BookOpen } from "lucide-react";
import { useMemo, useState } from "react";
import { quranScience, surahs, tajweed, quranSections } from "@/data/content";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionTitle } from "@/components/site/SectionTitle";
import { TopicSectionsList } from "@/components/site/TopicList";
import { SurahCard } from "@/components/quran/SurahCard";
import { MemorizationPlan } from "@/components/quran/MemorizationPlan";
import { navigate } from "@/router";
import { cn } from "@/utils/cn";

type Filter = "all" | "مكية" | "مدنية";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "مكية", label: "مكية" },
  { key: "مدنية", label: "مدنية" },
];

/** صفحة القرآن الكريم: علوم القرآن والتجويد والسور وخطة الحفظ */
export default function QuranPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredSurahs = useMemo(
    () => (filter === "all" ? surahs : surahs.filter((s) => s.revelation === filter)),
    [filter],
  );

  return (
    <div className="animate-rise">
      <PageHeader
        title="القرآن الكريم"
        description="علوم القرآن والتجويد والسور المختارة وخطة حفظٍ متدرجة، مع مراعاة ضبط الأداء وفهم المعاني."
        accent="quran"
        icon={BookOpen}
        chips={[
          `${quranScience.length} موضوعًا في العلوم`,
          `${tajweed.length} موضوعًا في التجويد`,
          `${surahs.length} سورة`,
        ]}
      />

      <div className="mx-auto mt-8 w-full max-w-5xl px-4 sm:px-6">
        <TopicSectionsList sections={quranSections} groupLabel="القرآن الكريم" />

        <div className="mt-10">
          <SectionTitle
            title="السور المختارة"
            description="السور المئة وأربع عشرة، بالنوع وعدد الآيات والفضل، مع تصفيةٍ بحسب المكية والمدنية."
            accent="quran"
            action={
              <span className="rounded-full border border-hairline bg-surface px-3 py-1 text-[12px] font-bold text-quran">
                {filteredSurahs.length} سورة
              </span>
            }
          />
          <div className="mb-4 flex gap-2">
            {FILTERS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-[12.5px] font-bold transition active:scale-95",
                  filter === item.key
                    ? "border-quran/50 bg-quran/16 text-quran"
                    : "border-hairline bg-surface text-muted hover:text-quran",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {filteredSurahs.map((surah) => (
              <SurahCard
                key={surah.id}
                surah={surah}
                compact
                onClick={() => navigate(`/search?q=${encodeURIComponent(surah.name)}`)}
              />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <SectionTitle
            title="خطة حفظ القرآن"
            description="خمس خطواتٍ عمليةٍ تجمع بين التثبيت والتكرار والمراجعة والتدبر."
            accent="gold"
          />
          <MemorizationPlan />
        </div>
      </div>
    </div>
  );
}
