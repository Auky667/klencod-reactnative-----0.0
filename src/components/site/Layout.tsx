import { CheckCircle2, Info, XCircle } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { TAB_ITEMS } from "@/constants/navigation";
import { useApp } from "@/context/AppContext";
import { useRoute, navigate } from "@/router";
import { AppHeader } from "@/components/site/AppHeader";
import { AppFooter } from "@/components/site/AppFooter";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { SideDrawer } from "@/components/site/SideDrawer";
import { accentClasses } from "@/components/site/SectionTitle";
import { cn } from "@/utils/cn";

const TAB_ICONS: Record<string, ReactNode> = {
  home: <path d="M4 11.5 12 4l8 7.5M6 10v10h12V10" />,
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z" />,
  book: <path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3Zm0 0v13a3 3 0 0 0 3 3" />,
  scale: <path d="M12 4v16M5 8h14M7 8 4 15h6Zm10 0-3 7h6Z" />,
  shield: <path d="M12 3l7 3v6c0 5-3.4 8-7 9-3.6-1-7-4-7-9V6Z" />,
};

/** الهيكل العام: رأس التطبيق، مؤشر التقدم، القائمة، المحتوى، التذييل */
export function Layout({ children }: { children: ReactNode }) {
  const { toasts, drawerOpen, closeDrawer } = useApp();
  const { path } = useRoute();
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current !== null) return;
      raf.current = window.requestAnimationFrame(() => {
        raf.current = null;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        setProgress(ratio);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf.current !== null) window.cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-ink">
      {/* مؤشر تقدم القراءة */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 z-[60] h-[3px] bg-gradient-to-l from-gold to-gold-deep transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%`, opacity: progress > 0.002 ? 1 : 0 }}
      />

      <AppHeader />
      <SideDrawer />
      {drawerOpen && <div className="sr-only" onClick={closeDrawer} />}

      <main className="pb-8">{children}</main>
      <AppFooter />
      <ScrollToTop />

      {/* شريط التنقل السفلي للهاتف */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-hairline bg-bg/92 backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="التنقل السريع"
      >
        <div className="mx-auto flex max-w-lg items-stretch justify-between px-2 py-1.5">
          {TAB_ITEMS.map((item) => {
            const active = path === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-1.5 transition",
                  active ? "bg-gold/14" : "active:bg-surface-2",
                )}
                aria-current={active ? "page" : undefined}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={cn(
                    "size-[22px] transition-colors",
                    active ? accentClasses.text[item.accent] : "text-muted",
                  )}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {TAB_ICONS[item.icon]}
                </svg>
                <span
                  className={cn(
                    "text-[10.5px] font-medium",
                    active ? "text-gold" : "text-muted",
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* رسائل حالة العمليات */}
      <div
        className="pointer-events-none fixed bottom-[92px] left-0 right-0 z-[70] flex flex-col items-center gap-2 px-4 md:bottom-6"
        aria-live="polite"
      >
        {toasts.map((toast) => {
          const Icon =
            toast.tone === "success" ? CheckCircle2 : toast.tone === "error" ? XCircle : Info;
          return (
            <div
              key={toast.id}
              className={cn(
                "animate-float-in flex max-w-sm items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium soft-shadow",
                toast.tone === "error"
                  ? "border-red-500/40 bg-red-500/15 text-red-200"
                  : toast.tone === "info"
                    ? "border-hairline bg-surface-2 text-ink"
                    : "border-gold/45 bg-surface-2 text-gold",
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span className="line-clamp-2">{toast.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
