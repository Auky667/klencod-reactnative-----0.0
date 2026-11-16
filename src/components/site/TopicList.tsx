import { Fragment, memo } from "react";
import type { AccentKey, Topic } from "@/types";
import { TopicAccordion } from "@/components/site/TopicAccordion";
import { SectionTitle } from "@/components/site/SectionTitle";

interface SectionLike {
  key: string;
  title: string;
  description: string;
  accent: AccentKey;
  topics: Topic[];
}

/** قائمة أقسامٍ موضوعية مع مُفَوِّقِ الموضوعات */
export const TopicSectionsList = memo(function TopicSectionsList({
  sections,
  groupLabel,
  numbering = true,
}: {
  sections: SectionLike[];
  groupLabel?: string;
  numbering?: boolean;
}) {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <Fragment key={section.key}>
          <SectionTitle
            title={section.title}
            description={section.description}
            accent={section.accent}
            action={
              <span className="rounded-full border border-hairline bg-surface px-3 py-1 text-[12px] font-bold text-gold">
                {section.topics.length} موضوعًا
              </span>
            }
          />
          <div className="space-y-2.5">
            {section.topics.map((topic, i) => (
              <TopicAccordion
                key={topic.id}
                topic={topic}
                accent={section.accent}
                number={numbering ? i + 1 : undefined}
                group={groupLabel ? `${groupLabel} · ${section.title}` : undefined}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
});

/** قائمة موضوعاتٍ مفردة (المفضلة مثلاً) */
export const TopicsOnlyList = memo(function TopicsOnlyList({
  topics,
  accent = "gold",
  emptyState,
}: {
  topics: Topic[];
  accent?: AccentKey;
  emptyState?: React.ReactNode;
}) {
  if (topics.length === 0 && emptyState) return <>{emptyState}</>;
  return (
    <div className="space-y-2.5">
      {topics.map((topic, i) => (
        <TopicAccordion key={topic.id} topic={topic} accent={accent} number={i + 1} />
      ))}
    </div>
  );
});
