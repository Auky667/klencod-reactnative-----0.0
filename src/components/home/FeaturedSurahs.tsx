import { ROUTES } from "@/constants/navigation";
import { featuredSurahs } from "@/data/content";
import type { Surah } from "@/types";
import { navigate } from "@/router";
import { SurahCard } from "@/components/quran/SurahCard";

/** بطاقة سورة، تُستخدم في الواجهة وصفحة القرآن */
export function FeaturedSurahs({ items }: { items?: Surah[] }) {
  const list = items ?? featuredSurahs;
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {list.map((surah) => (
          <SurahCard
            key={surah.id}
            surah={surah}
            onClick={() => navigate(ROUTES.quran)}
          />
        ))}
      </div>
    </div>
  );
}
