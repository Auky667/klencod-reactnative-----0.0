import { BookMarked, Compass, HeartHandshake, Target } from "lucide-react";
import { ABOUT, statistics } from "@/data/content";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionTitle } from "@/components/site/SectionTitle";

/** صفحة عن التطبيق: الرسالة والأهداف والمنهجية والمصادر */
export default function AboutPage() {
  return (
    <div className="animate-rise">
      <PageHeader
        title="عن التطبيق"
        description="ترميم الإسلام موسوعةٌ عربيةٌ شاملة، تجمع السيرة والعقيدة والقرآن والفقه في عرضٍ واحدٍ موثق."
        accent="gold"
        icon={Compass}
        chips={[
          `${statistics.topics} موضوعًا`,
          `${statistics.names} اسمًا`,
          `${statistics.surahs} سورة`,
        ]}
      />

      <div className="mx-auto mt-8 w-full max-w-5xl space-y-9 px-4 sm:px-6">
        <section>
          <SectionTitle title="رسالتنا" accent="gold" icon={<HeartHandshake className="size-4" />} />
          <div className="rounded-[22px] border border-hairline bg-surface p-5 soft-shadow">
            <p className="text-[14.5px] leading-[2] text-ink/90">{ABOUT.mission}</p>
          </div>
        </section>

        <section>
          <SectionTitle title="أهدافنا" accent="aqeedah" icon={<Target className="size-4" />} />
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {ABOUT.goals.map((goal, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-[20px] border border-hairline bg-surface px-4 py-3.5 soft-shadow"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-hairline bg-aqeedah/14 text-[12px] font-bold text-aqeedah">
                  {i + 1}
                </span>
                <p className="pt-1 text-[13.5px] leading-relaxed text-ink/90">{goal}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle title="منهجيتنا" accent="quran" icon={<Compass className="size-4" />} />
          <ol className="space-y-2.5">
            {ABOUT.methodology.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-[20px] border border-hairline bg-surface px-4 py-3.5 soft-shadow"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-hairline bg-quran/14 text-[12px] font-bold text-quran">
                  {i + 1}
                </span>
                <p className="pt-1 text-[13.5px] leading-relaxed text-ink/90">{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionTitle title="المصادر" accent="fiqh" icon={<BookMarked className="size-4" />} />
          <div className="rounded-[22px] border border-hairline bg-surface p-5 soft-shadow">
            <div className="flex flex-wrap gap-2">
              {ABOUT.sources.map((source, i) => (
                <span
                  key={i}
                  className="rounded-full border border-hairline bg-surface-2 px-3 py-1.5 text-[12.5px] text-muted"
                >
                  {source}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[12.5px] leading-relaxed text-muted">
              لا تُنتَسب إلى الموسوعة أقوالٌ أو كتاباتٌ ليست في مصادرها، وكل دليلٍ في الموضوعات
              مذكورٌ بعنوانه ومصدره.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
