"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fa" | "en";
export type Dir = "rtl" | "ltr";

/** رشته‌های رابط کاربری برای هر زبان */
export const STRINGS = {
  fa: {
    typed: "سلام! من یک برنامه‌ نویسم 👋",
    welcome: "به پروفایل من خوش آمدی 🌟",
    closeLabel: "بستن پنل",
    toggleLabel: "تغییر زبان به انگلیسی",
    toggleText: "EN",
    statItems: ["۴+ سال تجربه", "۲۰+ پروژه", "TypeScript", "Next.js", "Remote"],
  },
  en: {
    typed: "Hi! I'm a web developer 👋",
    welcome: "Welcome to my profile 🌟",
    closeLabel: "Close panel",
    toggleLabel: "Switch to Persian",
    toggleText: "فا",
    statItems: [
      "4+ years of experience",
      "20+ projects",
      "TypeScript",
      "Next.js",
      "Remote",
    ],
  },
} as const;

export type Strings = (typeof STRINGS)[Lang];

const LANG_DIR: Record<Lang, Dir> = { fa: "rtl", en: "ltr" };

interface LanguageValue {
  lang: Lang;
  dir: Dir;
  t: Strings;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageValue>({
  lang: "fa",
  dir: "rtl",
  t: STRINGS.fa,
  setLang: () => {},
});

/** ارائه‌دهنده‌ی زبان: فارسی (راست‌چین) / انگلیسی (چپ‌چین) */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fa");
  const dir = LANG_DIR[lang];

  // همگام‌سازی ویژگی‌های html با زبان فعال — تنظیم DOM خارج از ری‌اکت، بدون setState
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, dir, t: STRINGS[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageValue {
  return useContext(LanguageContext);
}
