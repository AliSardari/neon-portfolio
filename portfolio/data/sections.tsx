import type { ReactNode } from "react";
import type { Lang } from "@/lib/i18n";

export type SectionId =
  | "about"
  | "skills"
  | "projects"
  | "certificates"
  | "interests"
  | "contact";

export interface Section {
  id: SectionId;
  label: string;
  /** زاویه روی دایره به درجه؛ برای RTL از بال در جهت پادساعتی چیده شده */
  angle: number;
  icon: ReactNode;
  kicker: string;
  title: string;
  titleAccent: string;
  content: ReactNode;
  /** تصویر پس‌زمینه‌ی موضوعی پنل (public/panels/) */
  image: string;
}

/* ---------- آیکون‌ها (SVG ساده و سبک) ---------- */

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function UserIcon() {
  return (
    <svg {...svgProps} className="size-1/2">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg {...svgProps} className="size-1/2">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg {...svgProps} className="size-1/2">
      <path d="M12 2 3 7v10l9 5 9-5V7l-9-5z" />
      <path d="M3 7l9 5 9-5M12 12v10" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg {...svgProps} className="size-1/2">
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.5 7 22l5-2.5L17 22l-1.5-8.5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg {...svgProps} className="size-1/2">
      <path d="M12 20s-7-4.4-7-9.3C5 7.4 7.2 5.5 9.6 5.5c1.4 0 2.5.7 2.4 2 .1-1.3 1-2 2.4-2 2.4 0 4.6 1.9 4.6 5.2 0 4.9-7 9.3-7 9.3z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...svgProps} className="size-1/2">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

/* ---------- نمونه‌محتوا (قابل ویرایش) — دوزبانه ---------- */

function SkillsContent() {
  const skills = [
    { name: "PHP / Laravel", level: 90 },
    { name: "JavaScript / TypeScript", level: 85 },
    { name: "React / Next.js", level: 85 },
    { name: "HTML / CSS / Tailwind", level: 90 },
    { name: "Bootstrap", level: 80 },
    { name: "Python", level: 70 },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {skills.map((s) => (
        <div key={s.name} className="glass rounded-2xl p-4">
          <div className="mb-2 flex items-center justify-between text-sm" dir="ltr">
            <span className="font-medium">{s.name}</span>
            <span className="text-ink-dim">{s.level}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-l from-accent to-accent-2"
              style={{ width: `${s.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsContent({ lang }: { lang: Lang }) {
  const p = (fa: string, en: string) => (lang === "fa" ? fa : en);
  const projects = [
    {
      name: p("پروژه‌ی نمونه یک", "Sample Project One"),
      desc: p(
        "فروشگاه اینترنتی با Laravel و پنل مدیریت کامل. (متن نمونه — جایگزین کن)",
        "An online store with Laravel and a full admin panel. (Sample text — replace me)",
      ),
      tags: ["Laravel", "Tailwind", "MySQL"],
    },
    {
      name: p("پروژه‌ی نمونه دو", "Sample Project Two"),
      desc: p(
        "داشبورد تحلیل داده با Next.js و TypeScript. (متن نمونه — جایگزین کن)",
        "A data analytics dashboard with Next.js and TypeScript. (Sample text — replace me)",
      ),
      tags: ["Next.js", "TypeScript", "Recharts"],
    },
    {
      name: p("پروژه‌ی نمونه سه", "Sample Project Three"),
      desc: p(
        "ربات تلگرام با Python برای اتوماسیون کارها. (متن نمونه — جایگزین کن)",
        "A Telegram bot in Python for task automation. (Sample text — replace me)",
      ),
      tags: ["Python", "Telegram API"],
    },
  ];
  return (
    <div className="grid gap-3">
      {projects.map((pr) => (
        <article key={pr.name} className="glass rounded-2xl p-5 transition hover:border-accent/40">
          <h3 className="font-bold">{pr.name}</h3>
          <p className="mt-1 text-sm leading-6 text-ink-dim">{pr.desc}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {pr.tags.map((t) => (
              <span key={t} className="rounded-full bg-accent/15 px-3 py-1 text-xs text-accent-2" dir="ltr">
                {t}
              </span>
            ))}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ms-auto text-xs font-medium text-accent underline-offset-4 hover:underline"
            >
              {p("مشاهده در گیت‌هاب ↗", "View on GitHub ↗")}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

function ContactContent({ lang }: { lang: Lang }) {
  const p = (fa: string, en: string) => (lang === "fa" ? fa : en);
  const links = [
    { label: p("ایمیل", "Email"), value: "me@example.com", href: "mailto:me@example.com" },
    { label: p("گیت‌هاب", "GitHub"), value: "github.com/username", href: "https://github.com/" },
    { label: p("لینکدین", "LinkedIn"), value: "linkedin.com/in/username", href: "https://linkedin.com/" },
  ];
  return (
    <div className="space-y-4">
      <p className="text-sm leading-7 text-ink-dim">
        {p(
          "خوشحال می‌شوم از طریق هر کدام از راه‌های زیر با من در ارتباط باشید.",
          "I'd love to hear from you through any of the channels below.",
        )}
      </p>
      <div className="grid gap-3">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="glass flex items-center justify-between rounded-2xl px-5 py-4 transition hover:border-accent/40"
          >
            <span className="text-sm font-medium">{l.label}</span>
            <span className="text-xs text-ink-dim" dir="ltr">
              {l.value}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function CertificatesContent({ lang }: { lang: Lang }) {
  const p = (fa: string, en: string) => (lang === "fa" ? fa : en);
  const certs = [
    { name: p("دوره‌ی توسعه‌ی وب (نمونه)", "Web Development Course (sample)"), issuer: p("صادرکننده", "Issuer"), year: p("۱۴۰۲", "2023") },
    { name: p("مدرک TypeScript (نمونه)", "TypeScript Certificate (sample)"), issuer: p("صادرکننده", "Issuer"), year: p("۱۴۰۳", "2024") },
  ];
  return (
    <div className="grid gap-3">
      {certs.map((c) => (
        <div key={c.name} className="glass flex items-center gap-4 rounded-2xl px-5 py-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-b from-white to-[#e8efff] text-accent">
            <AwardIcon />
          </span>
          <div>
            <h3 className="text-sm font-bold">{c.name}</h3>
            <p className="text-xs text-ink-dim">
              {c.issuer} · {c.year}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function InterestsContent({ lang }: { lang: Lang }) {
  const p = (fa: string, en: string) => (lang === "fa" ? fa : en);
  const interests = [
    p("کدنویسی", "Coding"),
    p("طراحی رابط کاربری", "UI Design"),
    p("هوش مصنوعی", "Artificial Intelligence"),
    p("کوهنوردی", "Hiking"),
    p("عکاسی", "Photography"),
    p("کتاب", "Books"),
    p("قهوه", "Coffee"),
    p("بازی‌های ویدیویی", "Video Games"),
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {interests.map((i) => (
        <span key={i} className="glass rounded-full px-4 py-2 text-sm">
          {i}
        </span>
      ))}
    </div>
  );
}

/* ---------- تعریف نهایی ۶ بخش (دوزبانه) ---------- */

export function getSections(lang: Lang): Section[] {
  const p = (fa: string, en: string) => (lang === "fa" ? fa : en);

  return [
    {
      id: "about",
      label: p("درباره من", "About Me"),
      angle: -90,
      icon: <UserIcon />,
      kicker: p("درباره من", "About Me"),
      title: p("چند خط درباره‌ی", "A Few Lines"),
      titleAccent: p("من", "About Me"),
      image: "/panels/about.jpg",
      content: (
        <div className="space-y-4 text-sm leading-7 text-ink-dim">
          <p>
            {p(
              "سلام! من یک توسعه‌دهنده‌ی وب هستم که عاشق ساختن تجربه‌های تعاملی و تمیز در مرز طراحی و کدنویسی‌ام. چند سالی است با PHP و Laravel کار می‌کنم و در فرانت‌اند با TypeScript و React/Next.js می‌سازم.",
              "Hi! I'm a web developer who loves building interactive, clean experiences at the intersection of design and code. I've been working with PHP and Laravel for a few years, and I build on the front end with TypeScript and React/Next.js.",
            )}
          </p>
          <p>
            {p(
              "این سایت خودش یک نمونه‌کار است: یک هیروی ویدیویی با منوی دایره‌ای که کاملاً با کد ساخته شده.",
              "This site is itself a portfolio piece: a video hero with a radial menu, built entirely with code.",
            )}
          </p>
          <dl className="grid grid-cols-3 gap-3 text-center">
            {[
              { t: p("۴+", "4+"), l: p("سال تجربه", "years experience") },
              { t: p("۲۰+", "20+"), l: p("پروژه", "projects") },
              { t: p("ریموت", "Remote"), l: p("نحوه‌ی همکاری", "collaboration") },
            ].map((f) => (
              <div key={f.l} className="glass rounded-2xl px-2 py-4">
                <dt className="text-lg font-bold text-ink">{f.t}</dt>
                <dd className="mt-1 text-xs">{f.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      ),
    },
    {
      id: "skills",
      label: p("مهارت‌های من", "My Skills"),
      angle: -150,
      icon: <BoltIcon />,
      kicker: p("مهارت‌ها", "Skills"),
      title: p("آنچه بلدم و باهاش", "What I Know"),
      titleAccent: p("می‌سازم", "and Build With"),
      image: "/panels/skills.jpg",
      content: <SkillsContent />,
    },
    {
      id: "projects",
      label: p("پروژه‌های من", "My Projects"),
      angle: 150,
      icon: <CubeIcon />,
      kicker: p("پروژه‌ها", "Projects"),
      title: p("نمونه‌کارهای", "Selected"),
      titleAccent: p("من", "Work"),
      image: "/panels/projects.jpg",
      content: <ProjectsContent lang={lang} />,
    },
    {
      id: "contact",
      label: p("تماس با من", "Contact Me"),
      angle: 90,
      icon: <MailIcon />,
      kicker: p("تماس با من", "Get in Touch"),
      title: p("بیایید با هم", "Let's Work"),
      titleAccent: p("کار کنیم", "Together"),
      image: "/panels/contact.jpg",
      content: <ContactContent lang={lang} />,
    },
    {
      id: "certificates",
      label: p("مدارک من", "My Certificates"),
      angle: 30,
      icon: <AwardIcon />,
      kicker: p("مدارک", "Certificates"),
      title: p("گواهی‌نامه‌ها و", "Certificates"),
      titleAccent: p("دوره‌ها", "& Courses"),
      image: "/panels/certificates.jpg",
      content: <CertificatesContent lang={lang} />,
    },
    {
      id: "interests",
      label: p("علاقه‌مندی‌های من", "My Interests"),
      angle: -30,
      icon: <HeartIcon />,
      kicker: p("بیرون از کد", "Beyond Code"),
      title: p("علاقه‌مندی‌های", "Things I"),
      titleAccent: p("من", "Enjoy"),
      image: "/panels/interests.jpg",
      content: <InterestsContent lang={lang} />,
    },
  ];
}
