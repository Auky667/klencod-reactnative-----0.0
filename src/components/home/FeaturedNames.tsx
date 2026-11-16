import { ROUTES } from "@/constants/navigation";
import { featuredNames } from "@/data/content";
import { navigate } from "@/router";

/** أسماء الله الحسنى: أول ثمانية أسماء بمعانيها */
export function FeaturedNames() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {featuredNames.map((name) => (
          <button
            key={name.id}
            type="button"
            onClick={() => navigate(ROUTES.aqeedah)}
            className="group overflow-hidden rounded-[20px] border border-hairline bg-surface p-4 text-center soft-shadow transition hover:border-gold/40 active:scale-[0.98]"
          >
            <span className="display-font block text-[19px] font-bold gold-text">{name.name}</span>
            <span className="mt-2 block text-[11.5px] leading-relaxed text-muted">
              {name.meaning}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
