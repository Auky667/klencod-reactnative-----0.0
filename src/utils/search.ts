import type { SearchEntry } from "@/types";

/**
 * تطبيع النص العربي: إزالة التشكيل والتطويل، وتوحيد الألف والهمزات
 * والياء والتاء المربوطة، حتى ينجح البحث مهما اختلف الرسم.
 */
export function normalizeArabic(input: string): string {
  if (!input) return "";
  return input
    .replace(/[\u061C\u0640\u064B-\u0652\u0670\u06D6-\u06ED]/g, "")
    .replace(/[\u0622\u0623\u0625\u0627\u0671]/g, "ا")
    .replace(/[\u0649\u064A]/g, "ي")
    .replace(/\u0629/g, "ه")
    .replace(/\u0624/g, "و")
    .replace(/\u0626/g, "ي")
    .replace(/\u06CC/g, "ي")
    .replace(/[«»"“”'’(){}\[\]:؛,،.\-]/g, " ")
    .replace(/[\u0660-\u0669]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const WEIGHT = { title: 12, group: 6, summary: 4, body: 1 } as const;

/** نتائج البحث مع درجة ملاءمة، مرتبة تنازليًا */
export function rankEntries(
  entries: SearchEntry[],
  query: string,
): { entry: SearchEntry; score: number }[] {
  const q = normalizeArabic(query);
  if (!q) return [];
  const terms = q.split(" ").filter(Boolean);

  const results: { entry: SearchEntry; score: number }[] = [];
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    const t = normalizeArabic(e.title);
    const g = normalizeArabic(e.group);
    const s = normalizeArabic(e.summary);
    const b = normalizeArabic(e.body);
    const haystack = `${t} ${g} ${s} ${b}`;

    let score = 0;
    let ok = true;
    for (let j = 0; j < terms.length; j++) {
      const term = terms[j];
      let termScore = 0;
      if (t.startsWith(term)) termScore += WEIGHT.title * 1.4;
      else if (t.includes(term)) termScore += WEIGHT.title;
      if (g.includes(term)) termScore += WEIGHT.group;
      if (s.includes(term)) termScore += WEIGHT.summary;
      if (b.includes(term)) termScore += WEIGHT.body;
      if (termScore === 0) {
        ok = false;
        break;
      }
      score += termScore;
    }

    // كلمة البحث الكاملة كسلسلة واحدة تُعطي أولوية إضافية
    if (ok && q.length > 3 && haystack.includes(q)) score += 8;
    if (ok && score > 0) results.push({ entry: e, score });
  }

  results.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, "ar"));
  return results;
}

/** اقتطاع مقطع من النص حول أول ورود للبحث */
export function excerptAround(text: string, query: string, radius = 110): string {
  const q = normalizeArabic(query).split(" ")[0] ?? "";
  if (!q) return text.length > radius * 2 ? text.slice(0, radius * 2) + "…" : text;
  const norm = normalizeArabic(text);
  const idx = norm.indexOf(q);
  if (idx < 0) return text.slice(0, radius * 2) + (text.length > radius * 2 ? "…" : "");
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + q.length + radius);
  return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
}
