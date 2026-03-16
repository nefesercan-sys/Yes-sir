import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://swaphubs.com"),

  title: {
    template: "%s | SwapHubs - Güvenli Takas Borsası",
    default:
      "SwapHubs | Türkiye'nin En Büyük Ürün & Hizmet Takas Platformu",
  },

  description:
    "Nakit harcamadan ticaret yapın. SwapHubs ile ürün ve hizmetlerinizi güvenle takas edebileceğiniz modern ticaret platformu.",

  keywords: [
    "takas",
    "takas sitesi",
    "ürün takası",
    "hizmet takası",
    "barter sistemi",
    "eşya değiştirme",
    "güvenli ticaret",
  ],

  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },

  openGraph: {
    title: "SwapHubs | Ürün ve Hizmet Takas Platformu",
    description:
      "Para yerine ürünlerini kullanarak ticaret yapabileceğin yeni nesil platform.",
    url: "https://swaphubs.com",
    siteName: "SwapHubs",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SwapHubs Takas Platformu",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SwapHubs | Takas Yap Kazan",
    description:
      "Ürün ve hizmetlerini kullanarak ticaret yapabileceğin modern platform.",
    images: ["/og-image.jpg"],
    creator: "@swaphubs",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SwapHubs",
    url: "https://swaphubs.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://swaphubs.com/ara?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SwapHubs",
    url: "https://swaphubs.com",
    logo: "https://swaphubs.com/logo.png",
    sameAs: [
      "https://twitter.com/swaphubs",
      "https://instagram.com/swaphubs",
      "https://linkedin.com/company/swaphubs",
    ],
  };

  return (
    <html lang="tr" className={inter.variable}>
      <head>

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

      </head>

      <body
        className={`${inter.className} bg-white text-gray-900 antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>

        {/* Analytics en sona */}
        <Analytics />

      </body>
    </html>
  );
}
