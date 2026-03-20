import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["tr", "en", "ar", "de", "ru", "zh", "es", "fr", "hi", "ms"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|_next|vercel|.*\\..*).*)"],
};
