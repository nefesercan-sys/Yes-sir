import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/components/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/app/components/theme-provider";
import BottomNav from "@/components/BottomNav";
import LocaleHtmlLang from "@/app/components/LocaleHtmlLang";
import IcerikHaritasi from "@/components/IcerikHaritasi";
import { headers } from "next/headers";

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

const SITE = "https://swaphubs.com";
const TITLE = "Terzi Can Antalya — Konyaaltı Terzi, Tadilat, Dikim | Her Gün 08:00–23:00";
const DESC =
  "Antalya Konyaaltı (Hurma) terzi: paça kısaltma, fermuar değişimi, elbise dikimi, tadilat, kuru temizleme ve ütü. Eve ve otele gelen terzi servisi. Haftanın her günü 08:00–23:00. Türkçe, English, Русский, Deutsch. WhatsApp: +90 531 898 64 18";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    template: "%s | Terzi Can",
    default: TITLE,
  },
  description: DESC,

  authors: [{ name: "Terzi Can", url: `${SITE}/terzi` }],
  creator: "Terzi Can",
  publisher: "Terzi Can",
  category: "business",
  applicationName: "Terzi Can",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Terzi Can Antalya — Konyaaltı Terzi · Her Gün 08:00–23:00",
    description:
      "Paça kısaltma, fermuar, elbise dikimi, tadilat ve kuru temizleme. Eve ve otele gelen terzi. Konyaaltı, Hurma Mahallesi.",
    url: `${SITE}/terzi`,
    siteName: "Terzi Can",
    locale: "tr_TR",
    alternateLocale: ["en_US", "ru_RU", "de_DE"],
    type: "website",
    images: [
      {
        url: `${SITE}/og/terzi-can.jpg`,
        width: 1200,
        height: 630,
        alt: "Terzi Can — Konyaaltı, Antalya terzi atölyesi",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Terzi Can Antalya — Konyaaltı Terzi",
    description: "Tadilat, dikim, kuru temizleme. Her gün 08:00–23:00. Eve ve otele servis.",
    images: [`${SITE}/og/terzi-can.jpg`],
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
    yandex: "4c73ee1911a4b197",
    other: { "msvalidate.01": "EE22134B7D1B55A44BA700154371D5C3" },
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Terzi Can",
      alternateName: ["Terzi Can Antalya", "SwapHubs"],
      description: "Antalya Konyaaltı terzi, tadilat, dikim ve kuru temizleme — eve ve otele servis.",
      inLanguage: ["tr", "en", "ru", "de"],
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "SwapHubs",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/og/logo.png`, width: 512, height: 512 },
      description: "Terzi Can'ın bağlı olduğu hizmet ve ürün platformu.",
      subOrganization: { "@id": `${SITE}/terzi#business` },
    },
  ],
};

type Props = { children: React.ReactNode };

const SUPPORTED = ["tr", "en", "ru", "de"];

export default async function RootLayout({ children }: Props) {
  // middleware.ts URL'den dili çıkarıp x-lang başlığına yazar → ham HTML'de doğru <html lang>
  const h = await Promise.resolve(headers());
  const hdr = h.get("x-lang") || "tr";
  const lang = SUPPORTED.includes(hdr) ? hdr : "tr";

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${jakarta.variable} ${unbounded.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://images.pexels.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className={`${jakarta.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <LocaleHtmlLang />
            <main>{children}</main>
            <IcerikHaritasi />
            <BottomNav />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
