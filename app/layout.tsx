import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/components/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/app/components/theme-provider";
import BottomNav from "@/components/BottomNav";
import LocaleHtmlLang from "@/app/components/LocaleHtmlLang";
import IcerikHaritasi from "@/components/IcerikHaritasi";
import GlobalSchema from "@/components/GlobalSchema";
import RuTelegramButton from "@/components/RuTelegramButton";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jakarta",
});

const unbounded = Unbounded({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-unbounded",
});

export const viewport: Viewport = {
  themeColor: "#B8975A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://swaphubs.com"),
  title: {
    template: "%s",
    default: "Terzi Can Antalya — Terzi, Tadilat, Özel Dikim | SwapHubs",
  },
  description:
    "Konyaaltı Antalya'da Terzi Can: tadilat, özel dikim, tekstil üretimi. Eve ve otele ücretsiz servis. Hurma Mahallesi. Her gün 08:00–23:00.",

  authors: [{ name: "SwapHubs", url: "https://swaphubs.com" }],
  creator: "SwapHubs",
  publisher: "SwapHubs",
  category: "business",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Terzi Can Antalya — Terzi, Tadilat, Özel Dikim | SwapHubs",
    description:
      "Konyaaltı Antalya'da terzi, tadilat, özel dikim ve tekstil üretimi. Eve ve otele ücretsiz servis.",
    url: "https://swaphubs.com",
    siteName: "SwapHubs",
    locale: "tr_TR",
    alternateLocale: ["en_US", "ru_RU", "de_DE"],
    type: "website",
    images: [
      {
        url: "https://swaphubs.com/swaphubs-og.jpg",
        width: 1200,
        height: 630,
        alt: "SwapHubs — Küresel Hizmet & Ürün Platformu",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Terzi Can Antalya — Terzi, Tadilat, Özel Dikim | SwapHubs",
    description: "Antalya terzi, tadilat, özel dikim ve tekstil üretimi. Eve ve otele ücretsiz servis.",
    site: "@swaphubs",
    images: ["https://swaphubs.com/swaphubs-og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    // Yandex Webmaster: eski kod korunur, yeni doğrulama kodu eklendi (birden fazla etiket basılır)
    yandex: ["4c73ee1911a4b197", "c81788c5ebe2163f"],
    other: { "msvalidate.01": "EE22134B7D1B55A44BA700154371D5C3" },
  },
  manifest: "/manifest.json",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  // Dil, middleware'in x-lang başlığından gelir (ham HTML'de doğru <html lang>).
  let lang = "tr";
  try {
    const h = headers().get("x-lang");
    if (h && /^(tr|en|ru|de|es|fr|pl|uk|nl|ar)$/.test(h)) lang = h;
  } catch {
    // statik üretimde başlık yok: varsayılan tr
  }

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${jakarta.variable} ${unbounded.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
        {/* Terzi / tekstil sayfalarında SwapHubs şemasını gizleyen Client Component (yol listesi GlobalSchema.tsx içinde) */}
        <GlobalSchema />
      </head>
      <body className={`${jakarta.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <LocaleHtmlLang />
            {/* Sayfalar kendi <main> etiketini taşıdığı için burada <div> kullanılır (iç içe <main> geçersizdir) */}
            <div id="icerik">{children}</div>
            <RuTelegramButton />
            <IcerikHaritasi />
            <BottomNav />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
 
