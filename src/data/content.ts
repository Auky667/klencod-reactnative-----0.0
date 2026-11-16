import type {
  NameOfAllah,
  SearchEntry,
  Surah,
  Topic,
  TopicSection,
} from "@/types";
import { asmaAllah } from "@/data/asmaAllah";
import { aqeedah } from "@/data/aqeedah";
import { fiqh } from "@/data/fiqh";
import { quranScience, tajweed } from "@/data/quran";
import { seerah } from "@/data/seerah";
import { surahs } from "@/data/surahs";

export {
  aqeedah,
  asmaAllah,
  fiqh,
  quranScience,
  seerah,
  surahs,
  tajweed,
};

/* ------------------------ تقسيم السيرة النبوية ------------------------ */

const pick = (from: number, to?: number): Topic[] =>
  to === undefined ? seerah.slice(from) : seerah.slice(from, to);

export const seerahSections: TopicSection[] = [
  {
    key: "seerah-events",
    title: "أحداث السيرة",
    description:
      "من نسبه ﷺ ومولده إلى صلح الحديبية وفتح مكة وحجة الوداع، محطاتٌ مرتّبة بترتيبها التاريخي.",
    accent: "seerah",
    topics: pick(0, 24),
  },
  {
    key: "seerah-shamail",
    title: "الشمائل المحمدية",
    description:
      "أوصاف ﷺ في خَلقه وخلقه ومعاملاته، بقراءةٍ تُقرّب الصورة وتُبرز الأسوة الحسنة.",
    accent: "gold",
    topics: pick(24, 51),
  },
  {
    key: "seerah-khulafa",
    title: "الخلفاء الراشدون",
    description: "أبو بكر وعمر وعثمان وعليّ رضي الله عنهم، وعهدُهم في البناء والعدل.",
    accent: "seerah",
    topics: pick(51),
  },
];

/* -------------------------- أقسام القرآن -------------------------- */

export const quranSections: TopicSection[] = [
  {
    key: "quran-science",
    title: "علوم القرآن",
    description:
      "نزول القرآن وجمعه وضبطه وقراءاته، وأبوابٌ تُنظّم فهم النص وتدبّره.",
    accent: "quran",
    topics: quranScience,
  },
  {
    key: "quran-tajweed",
    title: "التجويد",
    description:
      "مخارج الحروف وصفاتها، وأحكام النون والميم والمدود والوقف، لضبط الأداء.",
    accent: "gold",
    topics: tajweed,
  },
];

/* ----------------------------- البحث ----------------------------- */

/** نصٌّ كامل للموضوع يُبنى مرةً واحدة للبحث والنسخ والمشاركة */
export function topicFullText(topic: Topic): string {
  const parts: string[] = [topic.title, "", topic.summary, "", ...topic.content];
  if (topic.evidences?.length) {
    parts.push("", "الأدلة الشرعية:");
    for (const ev of topic.evidences) parts.push(`• ${ev.text} — ${ev.source}`);
  }
  if (topic.benefits?.length) {
    parts.push("", "فوائد ودروس:");
    topic.benefits.forEach((b, i) => parts.push(`${i + 1}. ${b}`));
  }
  if (topic.references?.length) {
    parts.push("", "المصادر والمراجع:");
    topic.references.forEach((r, i) => parts.push(`${i + 1}. ${r}`));
  }
  return parts.join("\n");
}

/** يُبنى فهرس البحث مرةً واحدة عند تحميل الوحدة (أداءً وأمانًا) */
export function buildSearchEntries(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  const pushTopic = (topic: Topic, group: string, kind: "topic" = "topic") => {
    entries.push({
      id: topic.id,
      title: topic.title,
      group,
      summary: topic.summary,
      body: topicFullText(topic),
      kind,
      route: kind === "topic" ? `/search?q=${encodeURIComponent(topic.title)}` : "/search",
    });
  };

  for (const s of seerahSections) {
    for (const topic of s.topics) pushTopic(topic, `السيرة النبوية · ${s.title}`);
  }
  for (const topic of aqeedah) pushTopic(topic, "العقيدة");
  for (const topic of quranScience) pushTopic(topic, "القرآن الكريم · علوم القرآن");
  for (const topic of tajweed) pushTopic(topic, "القرآن الكريم · التجويد");
  for (const section of fiqh) {
    for (const topic of section.topics) {
      pushTopic(topic, `الفقه الإسلامي · ${section.title}`);
    }
  }
  for (const name of asmaAllah) {
    entries.push({
      id: name.id,
      title: name.name,
      group: "أسماء الله الحسنى",
      summary: name.meaning,
      body: `${name.name} — ${name.meaning}`,
      kind: "name",
      route: `/search?q=${encodeURIComponent(name.name)}`,
    });
  }
  for (const surah of surahs) {
    entries.push({
      id: surah.id,
      title: `سورة ${surah.name}`,
      group: "السور المختارة",
      summary: `${surah.revelation} · ${surah.ayahs} آية · ${surah.virtue}`,
      body: `سورة ${surah.name} — ${surah.revelation}، عدد آياتها ${surah.ayahs}. ${surah.virtue}`,
      kind: "surah",
      route: `/search?q=${encodeURIComponent(surah.name)}`,
    });
  }

  return entries;
}

/** كل موضوعات الموسوعة في مصفوفةٍ واحدة (للبحث السريع بالمُعرّف) */
export const allTopics: Topic[] = [
  ...seerah,
  ...aqeedah,
  ...quranScience,
  ...tajweed,
  ...fiqh.flatMap((s) => s.topics),
];

/** خريطة المُعرّف الثابت إلى الموضوع، لاستعادة المفضلة بأمانة */
export const topicById: ReadonlyMap<string, Topic> = new Map(
  allTopics.map((topic) => [topic.id, topic]),
);

/** الفهرس الموحّد، محسوبٌ مرةً واحدة */
export const searchEntries: SearchEntry[] = buildSearchEntries();

/* -------------------------- الإحصائيات -------------------------- */

export const totalTopics =
  seerah.length +
  aqeedah.length +
  quranScience.length +
  tajweed.length +
  fiqh.reduce((sum, s) => sum + s.topics.length, 0);

export const fiqhTopicsCount = fiqh.reduce((sum, s) => sum + s.topics.length, 0);

export const statistics = {
  sections: 6,
  topics: totalTopics,
  names: asmaAllah.length,
  surahs: surahs.length,
  fiqhChapters: fiqhTopicsCount,
  battles: 10,
} as const;

/* ------------------------ الموضوعات المختارة ------------------------ */

/** اختيار الموضوعات المميّزة بترتيب المصدر الأصلي */
export const featuredTopics: { topic: Topic; group: string }[] = [
  { topic: seerah[0], group: "السيرة النبوية" },
  { topic: seerah[5], group: "السيرة النبوية" },
  { topic: aqeedah[2], group: "العقيدة" },
  { topic: quranScience[0], group: "علوم القرآن" },
  { topic: tajweed[4], group: "التجويد" },
  { topic: fiqh[1].topics[0], group: `الفقه · ${fiqh[1].title}` },
];

export const featuredSurahs: Surah[] = surahs.slice(0, 6);
export const featuredNames: NameOfAllah[] = asmaAllah.slice(0, 8);

/* --------------------------- حوافظ ثابتة --------------------------- */

export const HOME_VERSE =
  "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ وَيُبَشِّرُ الْمُؤْمِنِينَ";
export const HOME_VERSE_SOURCE = "الإسراء: 9";

export const ABOUT = {
  mission:
    "ترميم الإسلام منبرٌ عربي يربط السيرة النبوية بالعقيدة والقرآن والفقه في صياغةٍ متينة، مع محتوى موثق يفتح أبواب التعلّم والتدبر، ويجعل المعلومة العلمية بين يدي القارئ في عرضٍ عربيٍّ رصين.",
  goals: [
    "تقديم السيرة النبوية بأحداثها وشَمائلها وسِيَر خلفائها في قراءةٍ تربوية.",
    "تمهيد عقيدة أهل السنة في توحيد وإيمان وقواعدٍ واضحة لا تُشَابِه.",
    "تفريغ علوم القرآن وأحكام التجويد وضبط الأداء بأسلوبٍ عمليةٍ مبسّط.",
    "عرض خريطة الأبواب الفقهية مع مسالك الاستدلال من القرآن والسنة.",
    "تيسير البحث الشامل في الموسوعة والوصول السريع إلى الموضوعات المختارة.",
    "تشجيع الحفظ والمراجعة من خلال السور المختارة وخطة حفظٍ متدرّجة.",
  ],
  methodology: [
    "الاعتماد على النصوص المثبَتة في القرآن والسنّة، والتنقية في اختيار الدليل.",
    "العرض في موضوعاتٍ قصيرةٍ مُتَسَلسِلة تُقرأ في جلسةٍ واحدة وتُراجَع بسهولة.",
    "ربط الدليل بالفائدة العملية، فلا مِعلومةً بلا أثر، ولا أثرًا بلا دليل.",
    "الانتصار في العرض إلى الكتب المُعتمَدة في التاريخ والعقيدة والفقه.",
    "التدرّج من المعنى إلى الحكم، ومن الحكم إلى العمل، فالغاية التدبر والتطبيق.",
  ],
  sources: [
    "سيرة ابن هشام",
    "السيرة النبوية لابن كثير",
    "زاد المعاد لابن القيم",
    "الرحيق المختوم للمباركفوري",
    "الشمائل المحمدية للترمذي",
    "صحيح البخاري وصحيح مسلم",
    "عقيدة أهل السنة للطحاوية",
    "العقيدة الواسطية لابن تيمية",
    "كتاب التوحيد لمحمد بن عبد الوهاب",
    "الإتقان في علوم القرآن للسيوطي",
    "البرهان في علوم القرآن للزركشي",
    "المقدمة الجزرية وهداية القاري للداني",
    "الفقه الإسلامي وأدلته للزرقا",
    "المغني لابن قدامة، المجموع للنووي، بدائع الصنائع للكاساني",
    "الفقه على المذاهب الأربعة للجزيري",
  ],
} as const;

export const MEMORIZATION_PLAN = [
  "ابدأ بتثبيت الفاتحة وقصار السور مع تصحيح المخارج والمدود.",
  "قسّم الحفظ إلى وحداتٍ صغيرة مع تكرارٍ يوميٍّ قبل المراجعة.",
  "اجعل لك وردًا ثابتًا من السرد والمراجعة في كل أسبوع.",
  "راجع المتشابهات والأطراف بعد كل ختمةٍ جزئية.",
  "اجمع بين الحفظ والفهم والتدبر، فذلك أثبت وأبرك.",
];

export const SECTION_CARDS = [
  {
    key: "seerah",
    path: "/seerah",
    title: "السيرة النبوية",
    description:
      "محطات النبوة والشمائل والهجرة والجهاد والخلفاء الراشدون في قراءةٍ تجمع الرواية الصحيحة والدرس التربوي.",
    accent: "seerah",
    icon: "moon",
    count: seerah.length,
    unit: "موضوعًا",
  },
  {
    key: "aqeedah",
    path: "/aqeedah",
    title: "العقيدة",
    description:
      "توحيد الربوبية والألوهية والأسماء والصفات، والإيمان بالملائكة والرسل واليوم الآخر، مع قاعدةٍ راسخةٍ في منهج أهل السنة.",
    accent: "aqeedah",
    icon: "shield",
    count: aqeedah.length,
    unit: "موضوعًا",
  },
  {
    key: "quran",
    path: "/quran",
    title: "القرآن الكريم",
    description:
      "علوم القرآن والتجويد والسور المختارة وخطة حفظٍ متدرجة، مع مراعاة ضبط الأداء وفهم المعاني.",
    accent: "quran",
    icon: "book",
    count: quranScience.length + tajweed.length,
    unit: "موضوعًا",
  },
  {
    key: "fiqh",
    path: "/fiqh",
    title: "الفقه الإسلامي",
    description:
      "خريطةٌ عمليةٌ لأبواب الفقه السبعة مع عرضٍ مبسّطٍ للأحكام ومسالك الاستدلال من القرآن والسنة وأقوال الفقهاء.",
    accent: "fiqh",
    icon: "scale",
    count: fiqhTopicsCount,
    unit: "بابًا فقهيًّا",
  },
] as const;
