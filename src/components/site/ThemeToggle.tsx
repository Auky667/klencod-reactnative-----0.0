import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

/** زر تبديل الوضع الداكن والفاتح، يُحفظ الاختيار في التخزين المحلي */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-hairline bg-surface-2 px-3 text-gold transition hover:gold-gradient active:scale-95"
    >
      {isDark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
      {!compact && (
        <span className="text-[13px] font-medium">{isDark ? "فاتح" : "داكن"}</span>
      )}
    </button>
  );
}
