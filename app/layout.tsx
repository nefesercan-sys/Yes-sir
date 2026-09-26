import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/components/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/app/components/theme-provider";
import BottomNav from "@/components/BottomNav";
import LocaleHtmlLang from "@/app/components/LocaleHtmlLang";

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
    template: "%s | SwapHubs",
    default: "SwapHubs — Türkiye'den Dünyaya Hizmet & Ürün Platformu",
  },
  description:
    "Türkiye'nin üretici & tedarikçi platformu. 20+ sektörde ücretsiz ilan verin, teklif alın. Tekstil, gıda, lojistik, fason ve daha fazlası. Üretici, tedarikçi ve alıcıları buluşturuyoruz.",

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
    title: "SwapHubs — Türkiye'den Dünyaya Hizmet & Ürün Platformu",
    description:
      "20+ sektörde ücretsiz ilan verin. Tedarikçi, üretici ve alıcıları buluşturan Türkiye'nin B2B platformu.",
    url: "https://swaphubs.com",
    siteName: "SwapHubs",
    locale: "tr_TR",
    alternateLocale: ["en_US", "ru_RU", "de_DE"],
    type: "website",
    images: [
      {
        url: "https://swaphubs.com/og/swaphubs-og.jpg",
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
    images: ["https://swaphubs.com/og/swaphubs-og.jpg"],
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
    // DÜZELTME (2026-09-26 denetimi): Bu blok önceden 'en': '/en', 'de': '/de',
    // 'ru': '/ru' olarak TANIMLIYORDU ama bu sayfalar (kök seviyede) HİÇ YOK —
    // app/en/page.tsx, app/de/page.tsx, app/ru/page.tsx projede mevcut değil.
    // Google bu URL'lere gidip 404 alıyordu; bu hem "geçersiz hreflang" hatası
    // olarak Search Console'da raporlanır hem de sitenin uluslararası hedefleme
    // güvenilirliğini zedeler. Ana sayfanın gerçek bir çevirisi olmadığından
    // (SwapHubs ana sayfası çok sektörlü bir vitrin), şimdilik yalnızca kendine
    // ve x-default'a işaret ediyor. Gerçek /en, /de, /ru ana sayfaları
    // oluşturulduğunda buraya eklenmeli.
    languages: {
      tr: "https://swaphubs.com",
      "x-default": "https://swaphubs.com",
    },
  },

  verification: {
    yandex: "4c73ee1911a4b197",
    other: { "msvalidate.01": "EE22134B7D1B55A44BA700154371D5C3" },
  },
  manifest: "/manifest.json",
};

// ─── JSON-LD: WebSite + Organization ─────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://swaphubs.com/#website",
      url: "https://swaphubs.com",
      name: "SwapHubs",
      description: "Türkiye'nin küresel B2B ve bireysel hizmet & ürün platformu",
      inLanguage: ["tr", "en", "ru", "de"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://swaphubs.com/ilanlar?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://swaphubs.com/#organization",
      name: "SwapHubs",
      url: "https://swaphubs.com",
      logo: {
        "@type": "ImageObject",
        url: "https://swaphubs.com/og/logo.png",
        width: 512,
        height: 512,
      },
      image: "https://swaphubs.com/og/swaphubs-og.jpg",
      description:
        "Üretici, tedarikçi, hizmet sağlayıcı ve alıcıları tek platformda buluşturan B2B platformu.",
      areaServed: ["TR", "DE", "AE", "SA", "US", "GB", "RU"],
      knowsAbout: [
        "Terzilik Hizmetleri",
        "Özel Dikim ve Tekstil",
        "Kuru Temizleme",
        "B2B Ticaret",
        "Tekstil Tedarik",
        "Makine Ekipman",
        "Turizm",
        "İnşaat Malzemeleri",
        "Lojistik",
        "Temizlik",
        "Fason Üretim",
        "Hizmet ve Ürün Tedariği",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+905318986418",
        contactType: "customer service",
        areaServed: ["TR", "DE", "RU", "EN"],
        availableLanguage: ["Turkish", "English", "Russian", "German"]
      },
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
  // SEO Düzeltmesi: lang="tr" sabitti; /en, /de, /ru sayfaları da yanlışlıkla
  // Türkçe olarak işaretleniyordu (hreflang etiketleriyle çelişiyordu).
  // NOT: Bunu next/headers ile sunucu tarafında okumak, kök layout'u (ve dolayısıyla
  // TÜM siteyi — generateStaticParams ile statik üretilen yüzlerce lokasyon sayfası
  // dahil) dinamik render'a zorlar; bu da performans/Core Web Vitals'ı düşürerek SEO'ya
  // daha büyük zarar verir. Bu yüzden statik üretimi bozmayan, istemci tarafında
  // document.documentElement.lang'ı düzelten hafif bir bileşen kullanılıyor
  // (app/components/LocaleHtmlLang.tsx). Başlangıç değeri "tr" kalıyor.
  return (
    <html
      lang="tr"
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
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jakarta.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <LocaleHtmlLang />
            <main>{children}</main>
            <BottomNav />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
