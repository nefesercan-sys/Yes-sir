import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import ContactTracker from "@/components/ContactTracker";
import { ThemeProvider } from "@/app/components/theme-provider";
import LocaleHtmlLang from "@/app/components/LocaleHtmlLang";
import IcerikHaritasi from "@/components/IcerikHaritasi";
import GlobalSchema from "@/components/GlobalSchema";
import RuTelegramButton from "@/components/RuTelegramButton";
import GoogleYorumSeridi from "@/components/GoogleYorumSeridi";
import SabitIletisim from "@/components/SabitIletisim";

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
    default: "Terzi Can Antalya — Terzi, Tadilat, Özel Dikim | Terzi Can",
  },
  description:
    "Konyaaltı Antalya'da Terzi Can: tadilat, özel dikim, tekstil üretimi. Eve ve otele servis. Hurma Mahallesi. Her gün 08:00–23:00.",

  authors: [{ name: "Terzi Can", url: "https://swaphubs.com" }],
  creator: "Terzi Can",
  publisher: "Terzi Can",
  category: "business",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Terzi Can Antalya — Terzi, Tadilat, Özel Dikim | Terzi Can",
    description:
      "Konyaaltı Antalya'da terzi, tadilat, özel dikim ve tekstil üretimi. Eve ve otele servis.",
    url: "https://swaphubs.com",
    siteName: "Terzi Can",
    locale: "tr_TR",
    alternateLocale: ["en_US", "ru_RU", "de_DE"],
    type: "website",
    images: [
      {
        url: "https://swaphubs.com/og/antalya-terzi-can-dikim-tamir-tadilat.jpg",
        width: 1200,
        height: 630,
        alt: "Terzi Can Antalya — terzi, tadilat, özel dikim",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Terzi Can Antalya — Terzi, Tadilat, Özel Dikim | Terzi Can",
    description: "Antalya terzi, tadilat, özel dikim ve tekstil üretimi. Eve ve otele servis.",
    images: ["https://swaphubs.com/og/antalya-terzi-can-dikim-tamir-tadilat.jpg"],
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
    yandex: ["4c73ee1911a4b197", "c81788c5ebe2163f", "8e4cc899c1db4298"],
    other: { "msvalidate.01": "EE22134B7D1B55A44BA700154371D5C3" },
  },
  manifest: "/manifest.json",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  // Dil, middleware'in x-lang başlığından gelir (ham HTML'de doğru <html lang>).
  let lang = "tr";
  try {
    const h = (await headers()).get("x-lang");
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
        {/* Terzi / tekstil sayfalarında Terzi Can şemasını gizleyen Client Component (yol listesi GlobalSchema.tsx içinde) */}
        <GlobalSchema />
      </head>
      <body className={`${jakarta.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LocaleHtmlLang />
            {/* Sayfalar kendi <main> etiketini taşıdığı için burada <div> kullanılır (iç içe <main> geçersizdir) */}
            <div id="icerik">{children}</div>
            <GoogleYorumSeridi lang={lang} />
            <RuTelegramButton />
            <SabitIletisim homeBar />
            <IcerikHaritasi />
            <Analytics />
            <ContactTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}
 
