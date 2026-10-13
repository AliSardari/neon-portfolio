"use client";

import { useLanguage } from "@/lib/i18n";

/** نوار آمار پایین هیرو (الگوی نوار پایین عکس مرجع) — دوزبانه */
export default function StatBar() {
  const { t } = useLanguage();
  const items = t.statItems;

  return (
    <div
      className="glass anim-fade-up flex max-w-full items-center gap-4 overflow-x-auto rounded-full px-6 py-3 text-[clamp(0.7rem,2vw,0.85rem)] text-ink-dim"
      style={{ animationDelay: "1.15s" }}
    >
      {items.map((item, i) => (
        <span key={item} className="flex shrink-0 items-center gap-4">
          <span className="whitespace-nowrap" dir={/[A-Za-z]/.test(item) ? "ltr" : "rtl"}>
            {item}
          </span>
          {i < items.length - 1 && <span className="h-4 w-px shrink-0 bg-white/15" />}
        </span>
      ))}
    </div>
  );
}
