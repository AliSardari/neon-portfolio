"use client";

import { useLanguage } from "@/lib/i18n";

/** دکمه‌ی تغییر زبان فارسی/انگلیسی — در گوشه‌ی بالا، سمت منطقی «شروع» (راست در RTL، چپ در LTR) */
export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "fa" ? "en" : "fa")}
      aria-label={t.toggleLabel}
      className="fixed top-4 start-4 z-40 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-sm font-medium text-ink-dim backdrop-blur-sm transition hover:border-accent/40 hover:text-ink"
    >
      {t.toggleText}
    </button>
  );
}
