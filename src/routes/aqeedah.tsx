import { ShieldCheck } from "lucide-react";
import { aqeedah, asmaAllah } from "@/data/content";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionTitle } from "@/components/site/SectionTitle";
import { TopicAccordion } from "@/components/site/TopicAccordion";
import { navigate } from "@/router";

/** صفحة العقيدة: موضوعات العقيدة ثم أسماء الله الحسنى */
export default function AqeedahPage() {
  return (
    <div className="animate-rise">
      <PageHeader
        title="العقيدة"
        description="توحيد الربوبية والألوهية والأسماء والصفات، والإيمان بالملائكة والرسل واليوم الآخر، مع قاعدةٍ راسخةٍ في فهم منهج أهل السنة."
        accent="aqeedah"
        icon={ShieldCheck}
        chips={[`${aqeedah.length} موضوعًا`, `${asmaAllah.length} اسمًا`, "منهج أهل السنة"]}
      />

      <div className="mx-auto mt-8 w-full max-w-5xl px-4 sm:px-6">
        <SectionTitle
          title="موضوعات العقيدة"
          description="التوحيد والإيمان بأركانه، وقواعد الإثبات والتنزيه، وسيادة الصحابة."
          accent="aqeedah"
          action={
            <span className="rounded-full border border-hairline bg-surface px-3 py-1 text-[12px] font-bold text-aqeedah">
              {aqeedah.length} موضوعًا
            </span>
          }
        />
        <div className="space-y-2.5">
          {aqeedah.map((topic, i) => (
            <TopicAccordion
              key={topic.id}
              topic={topic}
              accent="aqeedah"
              number={i + 1}
              group="العقيدة"
            />
          ))}
        </div>

        <div className="mt-10">
          <SectionTitle
            title="أسماء الله الحسنى"
            description="المئة اسمٌ بمعانيها، وكل اسمٍ يدعو إلى دعاءٍ وعمل."
            accent="gold"
            action={
              <button
                type="button"
                onClick={() => navigate("/search?q=أسماء الله الحسنى")}
                className="rounded-full border border-hairline bg-surface px-3 py-1.5 text-[12px] font-bold text-gold transition hover:bg-surface-2"
              >
                بحث في الأسماء
              </button>
            }
          />
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {asmaAllah.map((name) => (
              <div
                key={name.id}
                className="rounded-[20px] border border-hairline bg-surface px-4 py-3.5 soft-shadow"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-hairline bg-gold/14 text-[12px] font-bold text-gold">
                    {name.number}
                  </span>
                  <p className="display-font text-[18px] font-bold gold-text">{name.name}</p>
                </div>
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">{name.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
