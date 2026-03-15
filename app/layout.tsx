import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Provider";
// 📊 VERCEL ANALYTICS IMPORT
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

// 📱 MOBİL VE TEMA GÖRÜNÜMÜ (Next.js 14+ Standartı)
export const viewport: Viewport = {
  themeColor: "#0f172a", // Buraya sitenin ana marka renginin HEX kodunu yazabilirsin
  width: "device-width",
  initialScale: 1,
};

// 🚀 SİBER TURBO: %100 Kusursuz Global Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://swaphubs.com"), // 🚨 KİLİT NOKTA: Linklerin kırılmasını önler
  title: {
    template: "%s | SwapHubs",
    default: "SwapHubs | Küresel Hizmet & Ürün Takas Merkezi",
  },
  description: "Üretici, tedarikçi ve hizmet sağlayıcıları tek platformda buluşturan yeni nesil takas ve ticaret ağı.",
  keywords: ["takas", "B2B", "hizmet alımı", "ticaret", "ihracat", "ilan ver", "swap", "global pazar"],
  
  // 🌍 GLOBAL BİLDİRİM
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  
  // 📱 VİRAL SOSYAL MEDYA (WhatsApp, LinkedIn, Facebook)
  openGraph: {
    title: "SwapHubs | Küresel Hizmet & Ürün Takas Merkezi",
    description: "Üretici, tedarikçi ve hizmet sağlayıcıları tek platformda buluşturan yeni nesil takas ve ticaret ağı.",
    url: "https://swaphubs.com",
    siteName: "SwapHubs",
    images: [
      {
        url: "/og-image.jpg", // metadataBase eklendiği için artık sadece /og-image.jpg yazmamız yeterli
        width: 1200,
        height: 630,
        alt: "SwapHubs Global Pazar",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },

  // 🐦 TWITTER / X KARTI (Tweet atıldığında devasa afiş çıkmasını sağlar)
  twitter: {
    card: "summary_large_image",
    title: "SwapHubs | Küresel Hizmet & Ürün Takas Merkezi",
    description: "Üretici, tedarikçi ve hizmet sağlayıcıları tek platformda buluşturan yeni nesil takas ve ticaret ağı.",
    images: ["/og-image.jpg"],
  },
  
  // 🤖 GOOGLE BOT YÖNLENDİRMESİ
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
    <html lang="tr">
      <body className={inter.className}>
        {/* 🚨 SİBER ZIRH: Tüm siteyi oturum kontrolüne bağladık */}
        <AuthProvider>
          {children}
          {/* 📊 ANALYTICS AKTİF EDİLDİ */}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
