"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Section } from "@/data/sections";
import { useLanguage } from "@/lib/i18n";

interface Props {
  /** بخش فعال؛ null یعنی پنل بسته است */
  section: Section | null;
  onClose: () => void;
}

interface PanelState {
  current: Section;
  closing: boolean;
}

/**
 * پنل محتوای هر بخش — با تصویر پس‌زمینه‌ی موضوعی.
 * در RTL از لبه‌ی راست و در LTR از لبه‌ی چپ باز می‌شود.
 */
export default function SectionPanel({ section, onClose }: Props) {
  const { dir, t } = useLanguage();
  const [state, setState] = useState<PanelState | null>(null);
  const [prevSection, setPrevSection] = useState<Section | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // الگوی مستند ری‌اکت: «تنظیم state هنگام تغییر prop» — در زمان رندر، نه در effect
  if (section !== prevSection) {
    setPrevSection(section);
    if (section) {
      setState({ current: section, closing: false });
    } else {
      setState((s) => (s && !s.closing ? { ...s, closing: true } : s));
    }
  }

  // پاکسازی وضعیت پس از پایان انیمیشن خروج
  useEffect(() => {
    if (!state?.closing) return;
    const t = window.setTimeout(() => setState(null), 320);
    return () => window.clearTimeout(t);
  }, [state?.closing]);

  // فوکوس پنل هنگام باز شدن + برگرداندن فوکوس به گره هنگام شروع بسته شدن
  useEffect(() => {
    if (!state) return;
    if (state.closing) {
      document.getElementById(`node-${state.current.id}`)?.focus();
    } else {
      panelRef.current?.focus();
    }
  }, [state]);

  // بستن با کلید Escape
  useEffect(() => {
    if (!state || state.closing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state, onClose]);

  if (!state) return null;
  const render = state.current;
  const slideIn = dir === "rtl" ? "panel-in-rtl" : "panel-in-ltr";
  const slideOut = dir === "rtl" ? "panel-out-rtl" : "panel-out-ltr";

  return (
    <div
      className={`fixed inset-0 z-50 ${state.closing ? "backdrop-out" : "backdrop-in"}`}
    >
      {/* پس‌زمینه‌ی تاریک؛ کلیک روی آن پنل را می‌بندد */}
      <div
        className="absolute inset-0 bg-bg-deep/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={render.label}
        className={`absolute inset-y-0 start-0 flex w-full max-w-xl flex-col overflow-hidden border-e border-glass-border bg-bg-mid/75 shadow-2xl outline-none backdrop-blur-xl ${state.closing ? slideOut : slideIn}`}
      >
        {/* تصویر پس‌زمینه‌ی موضوعی بخش + پرده‌ی تیره‌کننده برای خوانایی متن */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Image
            src={render.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 576px"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-mid via-bg-mid/85 to-bg-mid/55" />
        </div>
        <header className="relative flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="kicker-line" />
              <span className="text-sm italic text-accent-2">{render.kicker}</span>
              <span className="kicker-line rotate-180" />
            </div>
            <h2 className="mt-1 text-xl font-bold sm:text-2xl">
              {render.title} <span className="text-gradient">{render.titleAccent}</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeLabel}
            className="glass grid size-10 shrink-0 place-items-center rounded-full text-ink-dim transition hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>
        <div className="relative flex-1 overflow-y-auto px-6 py-6">{render.content}</div>
      </div>
    </div>
  );
}
