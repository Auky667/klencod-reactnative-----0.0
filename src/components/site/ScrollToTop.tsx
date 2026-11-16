import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

/** زر العودة للأعلى، يظهر بعد تمريرٍ مناسب */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="العودة إلى أعلى الصفحة"
      className={cn(
        "fixed bottom-[86px] left-4 z-30 inline-flex size-11 items-center justify-center rounded-full border border-hairline bg-surface text-gold soft-shadow transition sm:bottom-6",
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
