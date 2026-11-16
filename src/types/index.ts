/** أنواع البيانات المشتركة في الموسوعة */

export type AccentKey = "seerah" | "aqeedah" | "quran" | "fiqh" | "gold";

/** دليل شرعي: نص + مصدر */
export interface Evidence {
  text: string;
  source: string;
}

/**
 * موضوع موسوعي.
 * `id` معرّف ثابت يُعتمد عليه في المفضلة بدلًا من العنوان.
 */
export interface Topic {
  id: string;
  title: string;
  summary: string;
  content: string[];
  evidences?: Evidence[];
  benefits?: string[];
  references?: string[];
  tags?: string[];
}

/** قسم داخل صفحة (مثل: أحداث السيرة، الشمائل المحمدية، الخلفاء الراشدون) */
export interface TopicSection {
  key: string;
  title: string;
  description: string;
  accent: AccentKey;
  topics: Topic[];
}

/** قسم فقهي كامل */
export interface FiqhSection {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

/** سورة من السور المختارة */
export interface Surah {
  id: string;
  number: number;
  name: string;
  ayahs: number;
  revelation: "مكية" | "مدنية";
  virtue: string;
}

/** اسم من أسماء الله الحسنى */
export interface NameOfAllah {
  id: string;
  number: number;
  name: string;
  meaning: string;
}

export type SearchKind = "topic" | "surah" | "name";

/** مدخل بحث موحّد يُبنى من كل البيانات */
export interface SearchEntry {
  id: string;
  title: string;
  group: string;
  summary: string;
  body: string;
  kind: SearchKind;
  route: string;
}

export type ThemeMode = "dark" | "light";
