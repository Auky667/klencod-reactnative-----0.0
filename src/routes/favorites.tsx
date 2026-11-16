import { BookmarkCheck } from "lucide-react";
import { useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { topicById } from "@/data/content";
import { PageHeader } from "@/components/site/PageHeader";
import { TopicAccordion } from "@/components/site/TopicAccordion";
import { navigate } from "@/router";

/** صفحة المفضلة: الموضوعات المحفوظة في التخزين المحلي بمُعرّفها الثابت */
export default function FavoritesPage() {
  const { favorites } = useApp();

  const topics = useMemo(
    () => favorites.flatMap((id) => (topicById.has(id) ? [topicById.get(id)!] : [])),
    [favorites],
  );

  return (
    <div className="animate-rise">
      <PageHeader
        title="المفضلة"
        description="الموضوعات التي أضفتها إلى المفضلة، وتُحفَظ على جهازك حتى بعد إغلاق التطبيق."
        accent="gold"
        icon={BookmarkCheck}
        chips={[`${favorites.length} موضوعًا محفوظًا`]}
      />

      <div className="mx-auto mt-8 w-full max-w-5xl px-4 sm:px-6">
        {topics.length === 0 ? (
          <div className="rounded-[22px] border border-hairline bg-surface px-6 py-12 text-center">
            <BookmarkCheck className="mx-auto size-10 text-gold/70" />
            <p className="display-font mt-3 text-[17px] font-bold">لا توجد موضوعات محفوظة</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
              افتح أي موضوعٍ واضغط «مفضلة» لتظهر هنا.
            </p>
            <button
              type="button"
              onClick={() => navigate("/seerah")}
              className="mt-4 rounded-full bg-gradient-to-l from-gold to-gold-deep px-5 py-2 text-[13.5px] font-bold text-[#1f1b16]"
            >
              ابدأ بالسيرة
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {topics.map((topic, i) => (
              <TopicAccordion
                key={topic.id}
                topic={topic}
                accent="gold"
                number={i + 1}
                group="المفضلة"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
