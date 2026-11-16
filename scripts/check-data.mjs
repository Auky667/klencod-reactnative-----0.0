import { build } from "esbuild";
await build({
  entryPoints: ["src/data/content.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: ".tmp-content.mjs",
  alias: { "@": "src" },
  logLevel: "error",
});
const m = await import("./.tmp-content.mjs");
const sum = (arr) => arr.reduce((a, s) => a + s.topics.length, 0);
const flatFiqh = m.fiqh.flatMap((s) => s.topics.map((t) => `${s.title} / ${t.title}`));
const missing = [];
const audit = (topics, name) => {
  for (const t of topics) {
    if (!t.title || !t.summary || !t.content?.length) missing.push(`${name}: ${t.id} ناقص`);
    if (!t.references?.length) missing.push(`${name} مراجع مفقودة: ${t.id}`);
    if (!t.evidences?.length) missing.push(`${name} دليل مفقود: ${t.id}`);
  }
};
audit(m.seerah, "seerah");
audit(m.aqeedah, "aqeedah");
audit(m.quranScience, "quranScience");
audit(m.tajweed, "tajweed");
audit(m.fiqh.flatMap((s) => s.topics), "fiqh");
console.log(JSON.stringify({
  seerah: m.seerah.length,
  seerahEvents: m.seerahSections[0].topics.length,
  shamail: m.seerahSections[1].topics.length,
  khulafa: m.seerahSections[2].topics.length,
  aqeedah: m.aqeedah.length,
  quranScience: m.quranScience.length,
  tajweed: m.tajweed.length,
  surahs: m.surahs.length,
  surahFirst6: m.surahs.slice(0,6).map(s=>`${s.number}-${s.name}(${s.ayahs},${s.revelation})`),
  fiqhSections: m.fiqh.length,
  fiqhTopicsPerSection: m.fiqh.map((s)=>`${s.title}:${s.topics.length}`),
  asmaAllah: m.asmaAllah.length,
  namesFirst8: m.asmaAllah.slice(0,8).map(n=>n.name),
  totalTopics: m.totalTopics,
  searchEntries: m.searchEntries.length,
  featured: m.featuredTopics.map((f)=>`${f.group} → ${f.topic.title}`),
  searchGroups: [...new Set(m.searchEntries.map(e=>e.group))],
  missingIssues: missing.length,
  missingSample: missing.slice(0, 6),
}, null, 2));
