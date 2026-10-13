"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSyncExternalStore } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * آماده بودن ویدیو را به‌صورت مشتق‌شده از خود المان ویدیو می‌خواند.
 * با useSyncExternalStore تا رویدادهایی که قبل از hydration رخ می‌دهند
 * (مثلاً onCanPlay روی لوکال) از دست نروند و نیازی به setState در effect نباشد.
 */
function useVideoReady(videoRef: React.RefObject<HTMLVideoElement | null>, reduce: boolean) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const video = videoRef.current;
      if (!video || reduce) return () => {};
      const handler = () => onChange();
      const events = ["loadeddata", "canplay", "playing", "error", "emptied"] as const;
      for (const e of events) video.addEventListener(e, handler);
      return () => {
        for (const e of events) video.removeEventListener(e, handler);
      };
    },
    [videoRef, reduce],
  );

  const getSnapshot = useCallback(
    () => (videoRef.current?.readyState ?? 0) >= 2,
    [videoRef],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/**
 * ویدیوی پس‌زمینه‌ی بلورشده با فالت‌بک گرادیان متحرک.
 * فایل ویدیو: public/video/hero.mp4 — تا وقتی نباشد گرادیان جایگزین دیده می‌شود.
 */
export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const ready = useVideoReady(videoRef, reduce);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;

    const tryPlay = () => {
      video.play().catch(() => {
        /* autoplay رد شد؛ گرادیان جایگزین همچنان دیده می‌شود */
      });
    };

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const observer = wrapRef.current
      ? new IntersectionObserver(
          ([entry]) => (entry.isIntersecting ? tryPlay() : video.pause()),
          { threshold: 0.1 },
        )
      : null;
    if (observer && wrapRef.current) observer.observe(wrapRef.current);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, [reduce]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* فالت‌بک: سه لکه‌ی نورانی بلورشده که جای ویدیو را می‌گیرند */}
      <div className="absolute inset-0 bg-bg-deep" />
      <div
        className={`absolute -top-1/4 right-[-10%] size-[70vh] rounded-full bg-accent/25 blur-[120px] ${reduce ? "" : "anim-blob"}`}
      />
      <div
        className={`absolute bottom-[-20%] left-[-10%] size-[60vh] rounded-full bg-accent-2/15 blur-[110px] ${reduce ? "" : "anim-blob"}`}
        style={{ animationDelay: "-6s" }}
      />
      <div
        className={`absolute left-1/3 top-1/3 size-[50vh] rounded-full bg-indigo-500/20 blur-[130px] ${reduce ? "" : "anim-blob"}`}
        style={{ animationDelay: "-12s" }}
      />

      {!reduce && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 size-full scale-105 object-cover blur-[8px] saturate-150 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
