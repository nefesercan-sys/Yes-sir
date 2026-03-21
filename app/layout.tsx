import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/components/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/app/components/theme-provider";
import BottomNav from "@/components/BottomNav";

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
  description:
    "Türkiye'den Dünyaya, Dünyadan Türkiye'ye — üretici, tedarikçi, hizmet sağlayıcı ve alıcıları tek platformda buluşturuyoruz. Ücretsiz ilan ver, teklif al.",
  keywords: [
    "b2b takas", "hizmet takas", "ticari ilan", "tedarikçi bul",
    "fason üretim", "swaphubs", "global takas", "bireysel ilan",
    "hizmet al", "hizmet ver", "ilan platformu", "türkiye ihracat",
    "uluslararası ticaret", "swap platform", "b2b marketplace",
  ],
  authors: [{ name: "SwapHubs", url: "https://swaphubs.com" }],
  creator: "SwapHubs",
  publisher: "SwapHubs",
  category: "business",
  openGraph: {
    title: "SwapHubs — Küresel Hizmet & Ürün Takas Platformu",
    description: "Türkiye'den Dünyaya, Dünyadan Türkiye'ye — ücretsiz ilan ver, teklif al.",
    url: "https://swaphubs.com",
    siteName: "SwapHubs",
    locale: "tr_TR",
    alternateLocale: ["en_US", "ar_SA", "de_DE"],
    type: "website",
    images: [
      {
        url: "https://swaphubs.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SwapHubs — Küresel Hizmet & Ürün Takas Platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SwapHubs — Küresel B2B Takas Platformu",
    description: "Üretici, tedarikçi ve alıcıları buluşturuyoruz. Ücretsiz.",
    site: "@swaphubs",
    images: ["https://swaphubs.com/og-image.jpg"],
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
  alternates: {
    canonical: "https://swaphubs.com",
    languages: {
      "tr": "https://swaphubs.com",
      "en": "https://swaphubs.com/en",
      "ar": "https://swaphubs.com/ar",
      "de": "https://swaphubs.com/de",
      "x-default": "https://swaphubs.com",
    },
  },
  verification: {
    google: "BURAYA_GOOGLE_SEARCH_CONSOLE_KODUNU_YAZ",
    yandex: "2422561e968edf9f",
    other: {
      "msvalidate.01": "EE22134B7D1B55A44BA700154371D5C3",
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${jakarta.variable} ${unbounded.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        {/* Bing doğrulama */}
        <meta name="msvalidate.01" content="EE22134B7D1B55A44BA700154371D5C3" />
      </head>
      <body className={jakarta.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <main>{children}</main>
            <BottomNav />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
