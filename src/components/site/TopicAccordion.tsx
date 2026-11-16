import {
  BookMarked,
  Bookmark,
  Check,
  ChevronDown,
  Copy,
  Quote,
  Share2,
  Sparkles,
} from "lucide-react";
import { memo, useCallback, useState } from "react";
import type { AccentKey, Topic } from "@/types";
import { useApp } from "@/context/AppContext";
import { topicFullText } from "@/data/content";
import { copyText, shareText } from "@/utils/copyShare";
import { accentClasses } from "@/components/site/SectionTitle";
import { cn } from "@/utils/cn";

interface Props {
  topic: Topic;
  accent?: AccentKey;
  number?: number;
  group?: string;
  variant?: "accordion" | "card";
  defaultOpen?: boolean;
}

function TopicAccordionBase({
  topic,
  accent = "gold",
  number,
  group,
  variant = "accordion",
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const [status, setStatus] = useState<string | null>(null);
  const { isFavorite, toggleFavorite, notify } = useApp();
  const favorite = isFavorite(topic.id);

  const flash = useCallback((message: string) => {
    setStatus(message);
    notify(message, "success");
    window.setTimeout(() => setStatus((prev) => (prev === message ? null : prev)), 2000);
  }, [notify]);

  const onCopy = useCallback(async () => {
    const ok = await copyText(topicFullText(topic));
    if (ok) flash("نُسِخ الموضوع إلى الحافظة");
    else notify("تعذّر النسخ، حاول مرة أخرى", "error");
  }, [topic, flash, notify]);

  const onShare = useCallback(async () => {
    const result = await shareText(`${topic.title} — ترميم الإسلام`, topicFullText(topic));
    if (result === "shared") notify("تم فتح ورقة المشاركة", "success");
    else if (result === "copied") flash("نُسِخ الموضوع لأن المشاركة غير متاحة");
    else notify("تعذّرت المشاركة", "error");
  }, [topic, notify, flash]);

  const onFavorite = useCallback(() => {
    toggleFavorite(topic.id, topic.title);
  }, [toggleFavorite, topic.id, topic.title]);

  const isCard = variant === "card";

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[20px] border border-hairline bg-surface soft-shadow transition-colors",
        open && "bg-surface-2/60",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-right transition hover:bg-surface-2/50 sm:px-5"
      >
        {typeof number === "number" && (
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-xl border border-hairline text-[13px] font-bold",
              accentClasses.bg[accent],
              accentClasses.text[accent],
            )}
          >
            {number}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "display-font block text-[16px] font-bold leading-snug sm:text-[17.5px]",
              open && accentClasses.text[accent],
            )}
          >
            {topic.title}
          </span>
          {(group || isCard) && (
            <span className="mt-0.5 block truncate text-[11.5px] text-muted">{group}</span>
          )}
          {!isCard && !open && (
            <span className="mt-1 line-clamp-2 block text-[12.5px] leading-relaxed text-muted">
              {topic.summary}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted transition-transform duration-300",
            open && "-rotate-180 text-gold",
          )}
        />
      </button>

      <div className="acc-panel" data-open={open}>
        <div>
          <div className="border-t border-hairline px-4 pb-4 pt-4 sm:px-5">
            <p className="mb-3 text-[13.5px] leading-relaxed text-muted">{topic.summary}</p>

            <div className="space-y-3">
              {topic.content.map((paragraph, i) => (
                <p key={i} className="text-[14.5px] leading-[2] text-ink">
                  {paragraph}
                </p>
              ))}
            </div>

            {topic.evidences && topic.evidences.length > 0 && (
              <section className="mt-4">
                <h4 className="mb-2 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-gold">
                  <Quote className="size-3.5" /> الأدلة الشرعية
                </h4>
                <ul className="space-y-2">
                  {topic.evidences.map((ev, i) => (
                    <li
                      key={i}
                      className="rounded-2xl border-s-2 border-gold/60 bg-bg-soft/60 px-3.5 py-3"
                    >
                      <p className="quran-font text-[16.5px] leading-loose text-ink">{ev.text}</p>
                      <p className="mt-1.5 text-[11.5px] text-muted">— {ev.source}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {topic.benefits && topic.benefits.length > 0 && (
              <section className="mt-4">
                <h4 className="mb-2 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-gold">
                  <Sparkles className="size-3.5" /> فوائد ودروس
                </h4>
                <ul className="space-y-2">
                  {topic.benefits.map((b, i) => (
                    <li key={i} className="flex gap-2 text-[13.5px] leading-relaxed">
                      <span
                        className={cn(
                          "mt-1.5 size-1.5 shrink-0 rounded-full",
                          "bg-gold/70",
                        )}
                      />
                      <span className="text-ink/90">{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {topic.references && topic.references.length > 0 && (
              <section className="mt-4">
                <h4 className="mb-2 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-gold">
                  <BookMarked className="size-3.5" /> المصادر والمراجع
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {topic.references.map((ref, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-hairline bg-bg-soft/70 px-2.5 py-1 text-[11.5px] text-muted"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-hairline pt-3.5">
              <ActionButton label="نسخ" onClick={onCopy} icon={<Copy className="size-4" />} />
              <ActionButton label="مشاركة" onClick={onShare} icon={<Share2 className="size-4" />} />
              <ActionButton
                label={favorite ? "مُحفوظ" : "مفضلة"}
                onClick={onFavorite}
                icon={
                  favorite ? <Bookmark className="size-4" fill="currentColor" /> : <Bookmark className="size-4" />
                }
                active={favorite}
              />
              {status && (
                <span className="ms-auto inline-flex items-center gap-1 text-[11.5px] font-medium text-quran">
                  <Check className="size-3.5" /> {status}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ActionButton({
  label,
  icon,
  onClick,
  active,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition active:scale-95",
        active
          ? "border-gold/50 bg-gold/16 text-gold"
          : "border-hairline bg-surface-2 text-muted hover:text-gold",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

export const TopicAccordion = memo(TopicAccordionBase);
