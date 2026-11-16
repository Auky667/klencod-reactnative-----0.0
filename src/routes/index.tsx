import { SectionTitle } from "@/components/site/SectionTitle";
import { HeroSection } from "@/components/home/HeroSection";
import { VerseCard } from "@/components/home/VerseCard";
import { Statistics } from "@/components/home/Statistics";
import { SectionGrid } from "@/components/home/SectionGrid";
import { FeaturedTopics } from "@/components/home/FeaturedTopics";
import { FeaturedSurahs } from "@/components/home/FeaturedSurahs";
import { FeaturedNames } from "@/components/home/FeaturedNames";

const STACK = "mx-auto w-full max-w-5xl px-4 sm:px-6";

/** الصفحة الرئيسية */
export default function HomePage() {
  return (
    <div className="animate-rise">
      <HeroSection />
      <div className="mt-6" />
      <VerseCard />

      <section className="mt-8">
        <div className={STACK}>
          <SectionTitle title="إحصائيات الموسوعة" description="أرقام الموسوعة كما هي في بيانها." />
        </div>
        <Statistics />
      </section>

      <section className="mt-9">
        <div className={STACK}>
          <SectionTitle
            title="أقسام الموسوعة"
            description="أربعة أقسامٍ كبرى تجمع السيرة والعقيدة والقرآن والفقه."
          />
        </div>
        <SectionGrid />
      </section>

      <section className="mt-9">
        <div className={STACK}>
          <SectionTitle
            title="مواضيع مختارة"
            description="مقتطفاتٌ من كل قسم، تُفتح داخل نفس البطاقة لقراءةٍ سريعة."
          />
        </div>
        <FeaturedTopics />
      </section>

      <section className="mt-9">
        <div className={STACK}>
          <SectionTitle
            title="السور المختارة"
            description="أول ست سورٍ من السور المختارة، بالنوع وعدد الآيات والفضل."
          />
        </div>
        <FeaturedSurahs />
      </section>

      <section className="mt-9">
        <div className={STACK}>
          <SectionTitle
            title="أسماء الله الحسنى"
            description="أول ثمانية أسماء من المئة اسمٍ بمعانيها."
          />
        </div>
        <FeaturedNames />
      </section>
    </div>
  );
}
