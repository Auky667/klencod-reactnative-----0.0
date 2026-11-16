import { MEMORIZATION_PLAN } from "@/data/content";

/** خطة حفظ القرآن بخطواتها الخمس كما في المرجع */
export function MemorizationPlan() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <ol className="space-y-2.5">
        {MEMORIZATION_PLAN.map((step, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-[20px] border border-hairline bg-surface px-4 py-3.5 soft-shadow"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-hairline bg-gold/14 text-[13px] font-bold text-gold">
              {i + 1}
            </span>
            <p className="pt-1.5 text-[14px] leading-[1.9] text-ink/90">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
