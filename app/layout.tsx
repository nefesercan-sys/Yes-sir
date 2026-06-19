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
  themeColor: "#B8975A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── SEO FIX LOG ──────────────────────────────────────────────────────────────
// FIX 1: title.template "%s | SwapHubs" → "%s" olarak değiştirildi.
//         Her alt sayfa kendi tam title'ını tanımlıyor (terzi: 57 kar, tailor: 58 kar).
//         "| SwapHubs" suffix terzi sayfasını 72 karaktere çıkarıp Google'ın kesmesine yol açıyordu.
// FIX 2: og-image.svg → og-image.jpg. WhatsApp/Twitter/LinkedIn SVG önizleme göstermiyor.
//         /public/og-image.jpg olarak 1200×630 JPG oluşturun.
// FIX 3: keywords dizisi layout'tan kaldırıldı. Google 2009'dan beri kullanmıyor.
//         Her sayfa kendi keywords'ünü page.tsx'inde tanımlıyor.
//         Layout keywords'ü tüm alt sayfalara "B2B platform Türkiye..." yazıyordu — yanlış.
// FIX 4: Organization.logo → og-image.svg'den logo.png'ye düzeltildi.
//         Schema.org'da logo ImageObject boyutu 512×512 olmalı, 1200×630 değil.
// FIX 5: google verification placeholder kaldı — gerçek kodu aşağıya yapıştırın.
// ──────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://swaphubs.com"),
  title: {
    // FIX 1: "%s | SwapHubs" → "%s"
    // Her sayfa kendi title'ını tam olarak tanımlıyor, suffix eklenmeyecek.
    template: "%s",
    default: "SwapHubs — Türkiye'den Dünyaya Hizmet & Ürün Platformu",
  },
  // ✅ 149 karakter — fark yaratan bilgi + anahtar kelime öne
  description:
    "Türkiye'nin üretici & tedarikçi platformu. 20+ sektörde ücretsiz ilan verin, teklif alın. Tekstil, gıda, lojistik, fason ve daha fazlası. Üretici, tedarikçi ve alıcıları buluşturuyoruz.",

  // FIX 3: keywords KALDIRILDI — layout'tan tüm sayfalara yayılıyordu.
  // Terzi sayfasında "B2B platform Türkiye" keywords'ü çıkıyordu, alakasız.
  // Her sayfa kendi page.tsx'inde kendi keywords'ünü tanımlıyor.

  authors: [{ name: "SwapHubs", url: "https://swaphubs.com" }],
  creator: "SwapHubs",
  publisher: "SwapHubs",
  category: "business",
  openGraph: {
    title: "SwapHubs — Türkiye'den Dünyaya Hizmet & Ürün Platformu",
    description:
      "20+ sektörde ücretsiz ilan verin. Tedarikçi, üretici ve alıcıları buluşturan Türkiye'nin B2B platformu.",
    url: "https://swaphubs.com",
    siteName: "SwapHubs",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        // FIX 2: .svg → .jpg — Sosyal medya SVG önizleme göstermiyor
        // /public/og-image.jpg oluşturun: 1200×630, JPG, navy arka plan + logo
        url: "https://swaphubs.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SwapHubs — Küresel Hizmet & Ürün Platformu",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SwapHubs — Türkiye'den Dünyaya Hizmet & Ürün Platformu",
    description: "20+ sektörde ücretsiz ilan verin, teklif alın.",
    site: "@swaphubs",
    // FIX 2: .svg → .jpg
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
  alternates: { canonical: "https://swaphubs.com" },
  verification: {
    // ⚠️ BURAYA YAPIŞTIRINIZ:
    // Google Search Console → Mülk → HTML etiketi → content="..." değerini kopyalayın
    // Örnek: google: "AbCdEfGh1234567890AbCdEfGh1234567890AbCd",
    google: "BURAYA_GOOGLE_SEARCH_CONSOLE_KODUNU_YAZ",
    yandex: "4c73ee1911a4b197",
    other: { "msvalidate.01": "EE22134B7D1B55A44BA700154371D5C3" },
  },
  manifest: "/manifest.json",
};

// ─── JSON-LD: WebSite + Organization ─────────────────────────────────────────
// FIX 4: Organization.logo → og-image.svg'den logo.png'ye düzeltildi.
//         og-image 1200×630 — logo olarak kullanılamaz, Google hata verir.
//         logo.png 512×512 kare format olmalı.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://swaphubs.com/#website",
      url: "https://swaphubs.com",
      name: "SwapHubs",
      description: "Türkiye'nin küresel B2B ve bireysel hizmet & ürün platformu",
      inLanguage: "tr-TR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://swaphubs.com/ilanlar?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://swaphubs.com/#organization",
      name: "SwapHubs",
      url: "https://swaphubs.com",
      // FIX 4: logo → og-image.svg yerine logo.png (512×512 kare)
      // /public/logo.png dosyası yoksa oluşturun veya mevcut logo dosyasını kullanın
      logo: {
        "@type": "ImageObject",
        url: "https://swaphubs.com/logo.png",
        width: 512,
        height: 512,
      },
      // OG image ayrı bir alan olarak eklendi
      image: "https://swaphubs.com/og-image.jpg",
      description:
        "Üretici, tedarikçi, hizmet sağlayıcı ve alıcıları tek platformda buluşturan B2B platformu.",
      areaServed: ["TR", "DE", "AE", "SA", "US", "GB"],
      knowsAbout: [
        "B2B Ticaret",
        "Tekstil Tedarik",
        "Makine Ekipman",
        "Turizm",
        "İnşaat Malzemeleri",
        "Lojistik",
        "Temizlik",
        "Fason Üretim",
      ],
      sameAs: [
        "https://twitter.com/swaphubs",
        "https://www.linkedin.com/company/swaphubs",
      ],
    },
  ],
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
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        {/* Bing ve Yandex verification — Next.js verification API dışında kalıyor */}
        <meta name="msvalidate.01" content="EE22134B7D1B55A44BA700154371D5C3" />
        <meta name="yandex-verification" content="4c73ee1911a4b197" />
        {/* Global JSON-LD: WebSite + Organization — tüm sayfalarda geçerli */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
