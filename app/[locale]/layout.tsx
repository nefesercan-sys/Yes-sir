import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import AuthProvider from "@/app/components/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/app/components/theme-provider";
import BottomNav from "@/components/BottomNav";

// Tüm mesajları statik olarak import et
import tr from "../../messages/tr.json";
import en from "../../messages/en.json";
import de from "../../messages/de.json";
import ru from "../../messages/ru.json";
import zh from "../../messages/zh.json";
import es from "../../messages/es.json";
import fr from "../../messages/fr.json";
import hi from "../../messages/hi.json";
import ms from "../../messages/ms.json";
import ar from "../../messages/ar.json";

export const dynamic = "force-dynamic";

const locales = ["tr", "en", "ar", "de", "ru", "zh", "es", "fr", "hi", "ms"];

const messageMap: Record<string, any> = { tr, en, de, ru, zh, es, fr, hi, ms, ar };

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params?.locale || "tr";

  if (!locales.includes(locale)) notFound();

  const messages = messageMap[locale] || tr;

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
        <NextIntlClientProvider locale={locale} messages={messages}>
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
