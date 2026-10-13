"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useLanguage } from "@/lib/i18n";

/** متن تایپ‌شونده — با تغییر زبان دوباره از صفر تایپ می‌شود (کامپوننت با key زبان ری‌مونت می‌شود) */
function TypedText({ text }: { text: string }) {
  const reduce = usePrefersReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) window.clearInterval(id);
    }, 55);
    return () => window.clearInterval(id);
  }, [reduce, text]);

  const display = reduce ? text : text.slice(0, n);
  const finished = reduce || n >= text.length;

  return (
    <p className="flex min-h-[2.4em] items-center justify-center text-[clamp(0.9rem,2.9vw,1.35rem)] font-bold leading-tight">
      <span>{display}</span>
      {!finished && <span className="anim-caret ms-0.5 text-accent-2">▍</span>}
    </p>
  );
}

/** دایره‌ی مرکزی با متن تایپ‌شونده و حلقه‌های نورانی */
export default function CenterCircle() {
  const { lang, t } = useLanguage();

  return (
    <div
      className="anim-fade-up absolute left-1/2 top-1/2 aspect-square w-[43%] -translate-x-1/2 -translate-y-1/2"
      style={{ animationDelay: "0.15s" }}
    >
      {/* حلقه‌ی بیرونی چرخان نقطه‌چین */}
      <div className="anim-spin-slow absolute -inset-[6%] rounded-full border border-dashed border-white/15" />
      {/* حلقه‌ی نورانی میانی — نئون آبی چرخان */}
      <div className="neon-ring absolute -inset-[3%] rounded-full border border-white/10" />
      {/* خود دایره */}
      <div className="glass neon-glow absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-full px-[10%] text-center">
        <TypedText key={lang} text={t.typed} />
        <p className="text-[clamp(0.78rem,2.2vw,1.05rem)] font-light leading-tight text-ink">
          {t.welcome}
        </p>
      </div>
    </div>
  );
}
