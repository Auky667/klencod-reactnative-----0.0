import { BookOpen, ChevronLeft, MoonStar } from "lucide-react";
import { ROUTES } from "@/constants/navigation";
import { navigate } from "@/router";

/** القسم الافتتاحي: شارة، اسم، وصف المشروع، وزران بسرعتين */
export function HeroSection() {
  return (
    <section className="px-4 pt-6 sm:px-6 sm:pt-9">
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[28px] border border-hairline bg-surface soft-shadow">
        {/* تدرّج ذهبي داكن + زخرفة هندسية + إضاءة خفيفة */}
        <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(212,175,55,0.20)_0%,rgba(157,124,34,0.32)_42%,rgba(41,37,31,0.92)_100%)]" />
        <div className="islamic-pattern absolute inset-0 opacity-[0.16]" aria-hidden />
        <div
          className="pointer-events-none absolute -top-20 -end-16 size-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.35), transparent 70%)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -start-12 size-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(231,201,122,0.20), transparent 72%)" }}
          aria-hidden
        />

        <div className="relative px-5 py-8 text-center sm:px-8 sm:py-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-black/25 px-3.5 py-1.5 text-[12px] font-bold text-gold-soft backdrop-blur">
            <SparkleIcon /> موسوعة علمية شاملة
          </span>

          <h1 className="display-font mt-4 text-[38px] font-bold leading-[1.15] gold-text sm:text-[54px]">
            ترميم الإسلام
          </h1>

          <p className="mx-auto mt-3.5 max-w-2xl text-[14.5px] leading-[2] text-ink/85 sm:text-[16.5px]">
            منبر عربي يربط السيرة النبوية بالعقيدة والقرآن والفقه في صياغةٍ متينة، مع محتوى موثق
            يفتح أبواب التعلّم والتدبر.
          </p>

          <div className="mt-6 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center">
            <HeroButton
              onClick={() => navigate(ROUTES.seerah)}
              primary
              icon={<MoonStar className="size-[18px]" />}
              label="ابدأ بالسيرة"
            />
            <HeroButton
              onClick={() => navigate(ROUTES.quran)}
              icon={<BookOpen className="size-[18px]" />}
              label="القرآن الكريم"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
      <path d="M12 2l2.2 6.2L21 10l-6.8 1.8L12 18l-2.2-6.2L3 10l6.8-1.8z" />
    </svg>
  );
}

function HeroButton({
  label,
  icon,
  onClick,
  primary,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        primary
          ? "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-l from-gold to-gold-deep px-6 text-[15px] font-bold text-[#1f1b16] shadow-[0_10px_28px_-12px_rgba(212,175,55,0.75)] transition active:scale-[0.98]"
          : "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gold/40 bg-black/20 px-6 text-[15px] font-bold text-gold-soft backdrop-blur transition hover:bg-black/30 active:scale-[0.98]"
      }
    >
      {icon}
      {label}
      <ChevronLeft className="size-4 opacity-70 transition-transform group-hover:-translate-x-0.5" />
    </button>
  );
}
