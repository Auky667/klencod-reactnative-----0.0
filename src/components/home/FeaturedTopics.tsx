import { featuredTopics } from "@/data/content";
import { TopicCard } from "@/components/site/TopicCard";
import type { AccentKey } from "@/types";

/** الموضوعات المختارة بالاختيار الأصلي: seerah[0], seerah[5], aqeedah[2], quranScience[0], tajweed[4], fiqh[1].topics[0] */
const ACCENTS: AccentKey[] = ["seerah", "seerah", "aqeedah", "quran", "gold", "fiqh"];

export function FeaturedTopics() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {featuredTopics.map((item, i) => (
          <TopicCard
            key={item.topic.id}
            topic={item.topic}
            group={item.group}
            accent={ACCENTS[i] ?? "gold"}
          />
        ))}
      </div>
    </div>
  );
}
