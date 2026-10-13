import type { NextConfig } from "next";

/* مسیر پایه برای گیت‌هاب پیجِ پروژه‌ای (username.github.io/neon-portfolio).
   در CI با NEXT_PUBLIC_BASE_PATH=/neon-portfolio ست می‌شود؛ لوکال خالی می‌ماند. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  /* خروجی استاتیک برای هاستینگ گیت‌هاب پیج.
     نکته: cacheComponents/partialPrefetching (PPR) با export ناسازگارند. */
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
