import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Provider";
import { Analytics } from "@vercel/analytics/react";

// 🏎️ HIZ OPTİMİZASYONU: display: 'swap' tarayıcıya font yüklenene kadar yedek fontu kullanmasını söyler.
const inter = Inter({ 
  subsets: ["latin"], 
  display: 'swap',
  variable: '--font-inter', // CSS değişkeni olarak kullanmak performansı artırır
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Erişilebilirlik (SEO puanı) için kullanıcıya yakınlaştırma izni verin
};

export const metadata: Metadata = {
  metadataBase: new URL("https://swaphubs.com"),
  title: {
    template: "%s | SwapHubs - Güvenli Takas Borsası",
    default: "SwapHubs | Türkiye'nin En Büyük Ürün & Hizmet Takas Borsası",
  },
  description: "Nakit harcamadan ticaret yapın! SwapHubs, ürün ve hizmetlerinizi güvenle takas edebileceğiniz, B2B ve bireysel ticaretin yeni nesil merkezi.",
  keywords: [
    "takas borsası", "ürün takası", "hizmet takası", "ücretsiz ilan", 
    "ikinci el takas", "barter sistemi", "eşya değiştirme", "güvenli ticaret"
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
    title: "SwapHubs | Ürün ve Hizmet Takas Borsası",
    description: "Para yerine ürünlerini kullan! Türkiye'nin en aktif takas ağına sen de katıl.",
    url: "https://swaphubs.com",
    siteName: "SwapHubs",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SwapHubs Takas ve Ticaret Platformu",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SwapHubs | Takas Yap, Kazan!",
    description: "Nakit harcamadan ihtiyacın olan ürüne veya hizmete ulaşmanın en hızlı yolu.",
    images: ["/og-image.jpg"],
    creator: "@swaphubs", // Varsa sosyal medya hesabınız
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable}`}>
      <head>
        {/* 📈 GOOGLE İÇİN ZENGİN SONUÇLAR (JSON-LD) 
            Bu kod, Google'ın sitenizi bir 'Arama Motoru' veya 'Pazar Yeri' gibi algılamasını sağlar. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SwapHubs",
              "url": "https://swaphubs.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://swaphubs.com/ara?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
