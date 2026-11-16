import { HOME_VERSE, HOME_VERSE_SOURCE } from "@/data/content";

/** بطاقة الآية القرآنية في الواجهة */
export function VerseCard() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-[24px] border border-hairline bg-surface soft-shadow">
        <div className="islamic-pattern absolute inset-0 opacity-[0.10]" aria-hidden />
        <div className="relative px-5 py-6 text-center sm:px-8 sm:py-8">
          <div className="mx-auto mb-3 h-[2px] w-16 rounded-full bg-gradient-to-l from-gold to-transparent" />
          <p className="quran-font text-[21px] leading-[2.2] text-ink sm:text-[27px]">
            {HOME_VERSE}
          </p>
          <p className="mt-3 text-[13px] font-bold text-gold">— {HOME_VERSE_SOURCE}</p>
          <div className="mx-auto mt-3 h-[2px] w-16 rounded-full bg-gradient-to-r from-gold to-transparent" />
        </div>
      </div>
    </div>
  );
}
