import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import "../globals.css";
import AuthProvider from "@/app/components/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/app/components/theme-provider";
import BottomNav from "@/components/BottomNav";

const locales = ["tr", "en", "de", "ru", "zh", "es", "fr", "hi", "ms"];

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-unbounded",
});

export const viewport: Viewport = {
  themeColor: "#0d1b3e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://swaphubs.com"),
  title: {
    template: "%s | SwapHubs",
    default: "SwapHubs — Küresel Hizmet & Ürün Takas Platformu",
  },
  description: "Türkiye'den Dünyaya, Dünyadan Türkiye'ye — ücretsiz ilan ver, teklif al.",
  verification: {
    google: "BURAYA_GOOGLE_SEARCH_CONSOLE_KODUNU_YAZ",
    yandex: "2422561e968edf9f",
    other: {
      "msvalidate.01": "EE22134B7D1B55A44BA700154371D5C3",
    },
  },
  manifest: "/manifest.json",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale || "tr";

  // Locale'i request context'ine set et
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${jakarta.variable} ${unbounded.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="msvalidate.01" content="EE22134B7D1B55A44BA700154371D5C3" />
      </head>
      <body className={jakarta.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <main>{children}</main>
              <BottomNav />
              <Analytics />
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
