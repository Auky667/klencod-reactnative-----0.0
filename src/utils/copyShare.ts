/** النسخ والمشاركة بأسلوبٍ أصلي: Clipboard + Web Share مع بدائل آمنة */

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* نكمل على المسار البديل */
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "true");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

export async function shareText(title: string, text: string): Promise<"shared" | "copied" | "failed"> {
  const navigatorWithShare = navigator as Navigator & {
    share?: (data: { title?: string; text?: string }) => Promise<void>;
  };
  if (navigatorWithShare.share) {
    try {
      await navigatorWithShare.share({ title, text });
      return "shared";
    } catch {
      /* المستخدم ألغى المشاركة أو فشلت، نُبقي المحتوى في الحافظة */
    }
  }
  const ok = await copyText(`${title}\n\n${text}`);
  return ok ? "copied" : "failed";
}
