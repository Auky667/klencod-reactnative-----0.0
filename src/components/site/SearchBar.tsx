import { Search, X } from "lucide-react";
import { cn } from "@/utils/cn";

export function SearchBar({
  value,
  onChange,
  placeholder = "ابحث في السيرة والعقيدة والقرآن والفقه…",
  autoFocus = false,
  onSubmit,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onSubmit?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute inset-y-0 start-4 my-auto size-[18px] text-gold/70" />
      <input
        type="search"
        dir="rtl"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) onSubmit();
        }}
        placeholder={placeholder}
        aria-label="البحث في الموسوعة"
        className="h-13 w-full rounded-full border border-hairline bg-surface ps-12 pe-12 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-muted/80 focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="مسح البحث"
          className="absolute inset-y-0 end-3 my-auto grid size-7 place-items-center rounded-full border border-hairline bg-surface-2 text-muted transition hover:text-gold"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
