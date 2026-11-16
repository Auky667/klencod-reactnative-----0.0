import { BarChart3, BookOpen, Layers, MoonStar, ScrollText, Swords } from "lucide-react";
import { statistics } from "@/data/content";

const ITEMS = [
  { label: "أقسام الموسوعة", value: statistics.sections, icon: Layers, suffix: "أقسام" },
  { label: "إجمالي الموضوعات", value: statistics.topics, icon: BarChart3, suffix: "موضوعًا" },
  { label: "أسماء الله الحسنى", value: statistics.names, icon: MoonStar, suffix: "اسمًا" },
  { label: "السور المختارة", value: statistics.surahs, icon: ScrollText, suffix: "سورة" },
  { label: "الأبواب الفقهية", value: `${statistics.fiqhChapters}+`, icon: BookOpen, suffix: "بابًا" },
  { label: "الغزوات والمشاهد", value: `${statistics.battles}+`, icon: Swords, suffix: "غزوة" },
];

/** إحصائيات الموسوعة كما في المرجع */
export function Statistics() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-[20px] border border-hairline bg-surface px-4 py-4 text-center soft-shadow"
            >
              <Icon className="mx-auto size-5 text-gold/80" />
              <p className="display-font mt-2.5 text-[26px] font-bold leading-none gold-text">
                {item.value}
              </p>
              <p className="mt-1.5 text-[11.5px] leading-tight text-muted">{item.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
