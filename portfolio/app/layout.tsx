import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "پورتفولیوی من | برنامه‌نویس وب",
  description:
    "نمونه‌کار طراحی و توسعه وب — هیروی تعاملی با ویدیوی پس‌زمینه و منوی دایره‌ای.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} h-full antialiased`}>
      <body className="min-h-full font-sans text-ink">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
