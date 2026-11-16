import { MoonStar } from "lucide-react";
import { seerah, seerahSections } from "@/data/content";
import { PageHeader } from "@/components/site/PageHeader";
import { TopicSectionsList } from "@/components/site/TopicList";

/** صفحة السيرة النبوية */
export default function SeerahPage() {
  return (
    <div className="animate-rise">
      <PageHeader
        title="السيرة النبوية"
        description="محطات النبوة والشمائل والهجرة والجهاد والخلفاء الراشدون في قراءةٍ تجمع الرواية الصحيحة والدرس التربوي."
        accent="seerah"
        icon={MoonStar}
        chips={[
          `${seerah.length} موضوعًا`,
          "أحداث السيرة",
          "الشمائل المحمدية",
          "الخلفاء الراشدون",
        ]}
      />

      <div className="mx-auto mt-8 w-full max-w-5xl px-4 sm:px-6">
        <TopicSectionsList sections={seerahSections} groupLabel="السيرة النبوية" />
      </div>
    </div>
  );
}
