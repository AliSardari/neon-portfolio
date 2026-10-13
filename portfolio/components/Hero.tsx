"use client";

import { useCallback, useMemo, useState } from "react";
import VideoBackground from "./VideoBackground";
import RadialMenu from "./RadialMenu";
import StatBar from "./StatBar";
import SectionPanel from "./SectionPanel";
import LanguageToggle from "./LanguageToggle";
import { getSections, type SectionId } from "@/data/sections";
import { useLanguage } from "@/lib/i18n";

/** هیروی اصلی: ویدیوی بلورشده + منوی دایره‌ای + نوار آمار + پنل محتوا */
export default function Hero() {
  const { lang } = useLanguage();
  const [active, setActive] = useState<SectionId | null>(null);

  const sections = useMemo(() => getSections(lang), [lang]);
  const section = sections.find((s) => s.id === active) ?? null;
  const close = useCallback(() => setActive(null), []);

  return (
    <section className="relative isolate flex min-h-svh flex-col items-center justify-center gap-10 overflow-hidden px-4 py-14">
      <VideoBackground />

      {/* اسکریم خوانایی متن روی ویدیو */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(65%_60%_at_50%_45%,rgba(5,11,31,0.6)_0%,rgba(5,11,31,0.3)_60%,transparent_100%)]"
      />

      <LanguageToggle />
      <RadialMenu sections={sections} active={active} onSelect={setActive} />
      <StatBar />
      <SectionPanel section={section} onClose={close} />
    </section>
  );
}
