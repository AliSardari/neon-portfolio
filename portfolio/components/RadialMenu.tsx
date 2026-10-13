"use client";

import { useState } from "react";
import type { Section, SectionId } from "@/data/sections";
import CenterCircle from "./CenterCircle";

/** شعاع مدار گره‌ها و ابعاد دایره‌ها — درصدی از ضلع مربع اصلی */
const ORBIT = 37;
const NODE_R = 7.4;
const CENTER_R = 22;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad) };
}

interface Props {
  sections: Section[];
  active: SectionId | null;
  onSelect: (id: SectionId) => void;
}

/** منوی شعاعی: دایره مرکزی + ۶ گره با خطوط اتصال SVG */
export default function RadialMenu({ sections, active, onSelect }: Props) {
  const [hover, setHover] = useState<SectionId | null>(null);

  return (
    <div className="relative aspect-square w-[min(94vw,340px)] sm:w-[min(86vw,480px)] lg:w-[min(64vw,600px)]">
      {/* خطوط اتصال + نقاط نورانی */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full overflow-visible"
        aria-hidden="true"
      >
        {sections.map((s, i) => {
          const start = polar(s.angle, CENTER_R + 2);
          const end = polar(s.angle, ORBIT - NODE_R - 2);
          const mid = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
          const on = hover === s.id || active === s.id;
          return (
            <g key={s.id}>
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                pathLength={1}
                vectorEffect="non-scaling-stroke"
                strokeWidth={on ? 1.6 : 1}
                className={`anim-line transition-colors duration-300 ${on ? "stroke-accent-2 [filter:drop-shadow(0_0_4px_rgba(34,211,238,0.8))]" : "stroke-white/25"}`}
                style={{ animationDelay: `${0.35 + i * 0.08}s` }}
              />
              <circle
                cx={mid.x}
                cy={mid.y}
                r={0.55}
                className={`anim-dot transition-colors duration-300 ${on ? "fill-accent-2" : "fill-white/70"}`}
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            </g>
          );
        })}
      </svg>

      <CenterCircle />

      {/* گره‌ها */}
      {sections.map((s, i) => {
        const p = polar(s.angle, ORBIT);
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            id={`node-${s.id}`}
            type="button"
            aria-haspopup="dialog"
            aria-pressed={isActive}
            aria-label={s.label}
            onClick={() => onSelect(s.id)}
            onMouseEnter={() => setHover(s.id)}
            onMouseLeave={() => setHover((h) => (h === s.id ? null : h))}
            onFocus={() => setHover(s.id)}
            onBlur={() => setHover((h) => (h === s.id ? null : h))}
            className="anim-node group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${0.55 + i * 0.09}s` }}
          >
            <span
              className={`neon-glow neon-ring grid aspect-square w-[clamp(3.25rem,13vw,4.6rem)] place-items-center rounded-full bg-gradient-to-b from-white to-[#e8efff] text-accent transition duration-300 group-hover:scale-110 group-focus-visible:scale-110 ${isActive ? "ring-2 ring-accent-2" : ""}`}
            >
              {s.icon}
            </span>
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 w-24 -translate-x-1/2 text-center text-[clamp(0.65rem,1.7vw,0.8rem)] font-medium text-ink/90 [text-shadow:0_1px_8px_rgba(5,11,31,0.9)]">
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
