import type { AccentKey, Topic } from "@/types";
import { TopicAccordion } from "@/components/site/TopicAccordion";

/** بطاقة موضوع مختارة: تُفتح داخل نفس البطاقة */
export function TopicCard({
  topic,
  group,
  accent = "gold",
}: {
  topic: Topic;
  group?: string;
  accent?: AccentKey;
}) {
  return <TopicAccordion topic={topic} group={group} accent={accent} variant="card" />;
}
