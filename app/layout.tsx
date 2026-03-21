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
  metadataBase: new URL("https://www.swaphubs.com"),
  title: {
    template: "%s | SwapHubs",
    default: "SwapHubs — Türkiye'den Dünyaya Hizmet & Ürün Platformu",
  },
  description:
    "SwapHubs: Türkiye'nin küresel B2B ve bireysel hizmet platformu. Tekstil, makine, turizm, temizlik, inşaat ve 20+ sektörde ücretsiz ilan verin, teklif alın. Üretici, tedarikçi ve alıcıları buluşturuyoruz.",
  keywords: [
    "B2B platform Türkiye", "toptan alım satım", "tedarikçi bul Türkiye",
    "üretici bul", "fason üretim Türkiye", "tekstil tedarikçi",
    "ihracat ithalat platformu", "hizmet ilanı ver ücretsiz",
    "bireysel hizmet ilanı", "temizlik hizmeti ilanı", "usta bul",
    "makine ekipman satış", "inşaat malzeme tedarik", "lojistik nakliye ilanı",
    "turizm hizmet ilanı", "SwapHubs", "ücretsiz ilan", "teklif al",
    "b2b marketplace Türkiye", "global ticaret platformu", "uluslararası ticaret",
  ],
  authors: [{ name: "SwapHubs", url: "https://www.swaphubs.com" }],
  creator: "SwapHubs",
  publisher: "SwapHubs",
  category: "business",
  openGraph: {
    title: "SwapHubs — Türkiye'den Dünyaya Hizmet & Ürün Platformu",
    description: "20+ sektörde ücretsiz ilan verin. Tedarikçi, üretici ve alıcıları buluşturan Türkiye'nin B2B platformu.",
    url: "https://www.swaphubs.com",
    siteName: "SwapHubs",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "https://www.swaphubs.com/og-image.svg", width: 1200, height: 630, alt: "SwapHubs — Küresel Hizmet & Ürün Platformu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SwapHubs — Türkiye'den Dünyaya Hizmet & Ürün Platformu",
    description: "20+ sektörde ücretsiz ilan verin, teklif alın.",
    site: "@swaphubs",
    images: ["https://www.swaphubs.com/og-image.svg"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  alternates: { canonical: "https://www.swaphubs.com" },
  verification: {
    google: "BURAYA_GOOGLE_SEARCH_CONSOLE_KODUNU_YAZ",
    yandex: "2422561e968edf9f",
    other: { "msvalidate.01": "EE22134B7D1B55A44BA700154371D5C3" },
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.swaphubs.com/#website",
      url: "https://www.swaphubs.com",
      name: "SwapHubs",
      description: "Türkiye'nin küresel B2B ve bireysel hizmet & ürün platformu",
      inLanguage: "tr-TR",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://www.swaphubs.com/ilanlar?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.swaphubs.com/#organization",
      name: "SwapHubs",
      url: "https://www.swaphubs.com",
      logo: { "@type": "ImageObject", url: "https://www.swaphubs.com/og-image.svg", width: 1200, height: 630 },
      description: "Üretici, tedarikçi, hizmet sağlayıcı ve alıcıları tek platformda buluşturan B2B platformu.",
      areaServed: ["TR", "DE", "AE", "SA", "US", "GB"],
      knowsAbout: ["B2B Ticaret", "Tekstil Tedarik", "Makine Ekipman", "Turizm", "İnşaat Malzemeleri", "Lojistik", "Temizlik", "Fason Üretim"],
      sameAs: ["https://twitter.com/swaphubs", "https://www.linkedin.com/company/swaphubs"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${jakarta.variable} ${unbounded.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="msvalidate.01" content="EE22134B7D1B55A44BA700154371D5C3" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
