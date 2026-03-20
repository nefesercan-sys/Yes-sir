import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["tr", "en", "ar", "de", "ru", "zh", "es", "fr", "hi", "ms"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  localeDetection: false, // ← tarayıcı diline göre yönlendirme yapma
});

export const config = {
  matcher: ["/((?!api|_next|vercel|.*\\..*).*)"],
};
