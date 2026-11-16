import { Scale } from "lucide-react";
import { fiqh, fiqhTopicsCount } from "@/data/content";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionTitle } from "@/components/site/SectionTitle";
import { TopicAccordion } from "@/components/site/TopicAccordion";

/** صفحة الفقه الإسلامي: الأبواب الفقهية السبعة بموضوعاتها */
export default function FiqhPage() {
  return (
    <div className="animate-rise">
      <PageHeader
        title="الفقه الإسلامي"
        description="خريطةٌ عمليةٌ لأبواب الفقه السبعة مع عرضٍ مبسّطٍ للأحكام ومسالك الاستدلال من القرآن والسنة وأقوال الفقهاء."
        accent="fiqh"
        icon={Scale}
        chips={[`${fiqh.length} أبوابًا`, `${fiqhTopicsCount} بابًا فقهيًّا`, "أحكام واستدلال"]}
      />

      <div className="mx-auto mt-8 w-full max-w-5xl space-y-9 px-4 sm:px-6">
        {fiqh.map((section, index) => (
          <section key={section.id}>
            <SectionTitle
              title={`${index + 1}. ${section.title}`}
              description={section.description}
              accent="fiqh"
              action={
                <span className="rounded-full border border-hairline bg-surface px-3 py-1 text-[12px] font-bold text-fiqh">
                  {section.topics.length} موضوعًا
                </span>
              }
            />
            <div className="space-y-2.5">
              {section.topics.map((topic, i) => (
                <TopicAccordion
                  key={topic.id}
                  topic={topic}
                  accent="fiqh"
                  number={i + 1}
                  group={`الفقه الإسلامي · ${section.title}`}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
