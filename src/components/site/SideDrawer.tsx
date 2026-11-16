import { BookmarkCheck, Home, Info, MoonStar, ScrollText, ShieldCheck, X } from "lucide-react";
import type { ComponentType } from "react";
import { useEffect } from "react";
import { NAV_ITEMS, ROUTES } from "@/constants/navigation";
import { useApp } from "@/context/AppContext";
import { navigate } from "@/router";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { accentClasses } from "@/components/site/SectionTitle";
import { cn } from "@/utils/cn";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  home: Home,
  moon: MoonStar,
  shield: ShieldCheck,
  book: ScrollText,
  scale: ScrollText,
  info: Info,
};

/** القائمة الجانبية: آية اليوم + التنقل + المفضلة */
export function SideDrawer() {
  const { drawerOpen, closeDrawer, favoritesCount } = useApp();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;

  const go = (path: string) => {
    closeDrawer();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="القائمة الرئيسية">
      <button
        type="button"
        aria-label="إغلاق القائمة"
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
      />
      <aside
        className="absolute top-0 right-0 flex h-full w-[86%] max-w-sm flex-col border-s border-hairline bg-bg-soft"
        style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="islamic-pattern border-b border-hairline bg-surface/60 px-5 py-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="display-font text-xl font-bold">ترميم الإسلام</p>
              <p className="mt-1 text-[12px] text-muted">موسوعة علمية شاملة</p>
            </div>
            <button
              type="button"
              onClick={closeDrawer}
              aria-label="إغلاق القائمة"
              className="inline-flex size-9 items-center justify-center rounded-full border border-hairline bg-surface-2 text-muted transition hover:text-gold"
            >
              <X className="size-[18px]" />
            </button>
          </div>
        </div>

        <div className="mx-4 mt-4 rounded-2xl border border-hairline bg-surface p-4 soft-shadow">
          <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-gold">
            <MoonStar className="size-3.5" /> آية اليوم
          </p>
          <p className="quran-font text-[19px] leading-loose text-ink">
            إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ وَيُبَشِّرُ الْمُؤْمِنِينَ
          </p>
          <p className="mt-1.5 text-[12px] text-muted">الإسراء: 9</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = ICONS[item.icon] ?? Home;
              return (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => go(item.path)}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-3 text-right transition",
                      "hover:border-hairline hover:bg-surface",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-xl border border-hairline",
                        accentClasses.bg[item.accent],
                      )}
                    >
                      <Icon className={cn("size-5", accentClasses.text[item.accent])} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[15px] font-semibold">{item.label}</span>
                      <span className="block truncate text-[11.5px] text-muted">{item.description}</span>
                    </span>
                  </button>
                </li>
              );
            })}

            <li className="pt-2">
              <button
                type="button"
                onClick={() => go(ROUTES.favorites)}
                className="flex w-full items-center gap-3 rounded-2xl border border-hairline bg-surface px-3 py-3 text-right transition hover:bg-surface-2"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-hairline bg-gold/14">
                  <BookmarkCheck className="size-5 text-gold" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold">المفضلة</span>
                  <span className="block text-[11.5px] text-muted">الموضوعات المحفوظة</span>
                </span>
                <span className="rounded-full bg-gold/14 px-2 py-0.5 text-[12px] font-bold text-gold">
                  {favoritesCount}
                </span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="flex items-center justify-between gap-3 border-t border-hairline bg-surface/70 px-5 py-4">
          <p className="text-[11.5px] text-muted">© 2026 ترميم الإسلام</p>
          <ThemeToggle compact />
        </div>
      </aside>
    </div>
  );
}
