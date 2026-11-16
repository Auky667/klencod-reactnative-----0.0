import { BookOpen, Menu, Search } from "lucide-react";
import { ROUTES } from "@/constants/navigation";
import { useApp } from "@/context/AppContext";
import { navigate } from "@/router";
import { ThemeToggle } from "@/components/site/ThemeToggle";

/** رأس التطبيق: الشعار والاسم والوصف والبحث والقائمة */
export function AppHeader() {
  const { openDrawer } = useApp();

  const goSearch = () => navigate(ROUTES.search);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-3 px-4 sm:h-[72px] sm:px-6">
        <button
          type="button"
          onClick={() => navigate(ROUTES.home)}
          className="flex min-w-0 items-center gap-3 text-right"
          aria-label="ترميم الإسلام — الصفحة الرئيسية"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl gold-gradient hairline soft-shadow">
            <BookOpen className="size-6 text-gold-soft" />
          </span>
          <span className="min-w-0">
            <span className="display-font block truncate text-lg font-bold leading-tight sm:text-xl">
              ترميم الإسلام
            </span>
            <span className="hidden truncate text-[11px] text-muted sm:block">
              موسوعة علمية شاملة
            </span>
          </span>
        </button>

        <div className="ms-auto flex items-center gap-2">
          <button
            type="button"
            onClick={goSearch}
            aria-label="البحث في الموسوعة"
            title="البحث"
            className="inline-flex size-10 items-center justify-center rounded-full border border-hairline bg-surface-2 text-gold transition hover:gold-gradient active:scale-95"
          >
            <Search className="size-[18px]" />
          </button>
          <ThemeToggle compact />
          <button
            type="button"
            onClick={openDrawer}
            aria-label="فتح القائمة"
            title="القائمة"
            className="inline-flex size-10 items-center justify-center rounded-full border border-hairline bg-surface-2 text-gold transition hover:gold-gradient active:scale-95"
          >
            <Menu className="size-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
