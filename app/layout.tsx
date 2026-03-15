import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Provider";
// 📊 VERCEL ANALYTICS IMPORT
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

// 🚀 SİBER TURBO: Mevcut metadatan global standartlara yükseltildi
export const metadata: Metadata = {
  title: {
    template: '%s | SwapHubs',
    default: "SwapHubs | Küresel Hizmet & Ürün Takas Merkezi",
  },
  description: "Üretici, tedarikçi ve hizmet sağlayıcıları tek platformda buluşturan yeni nesil takas ve ticaret ağı.",
  keywords: ["takas", "B2B", "hizmet alımı", "ticaret", "ihracat", "ilan ver", "swap", "global pazar"],
  
  // 🌍 GLOBAL BİLDİRİM: Dil etiketleri eklendi
  alternates: {
    canonical: 'https://swaphubs.com',
    languages: {
      'tr-TR': 'https://swaphubs.com',
      'en-US': 'https://swaphubs.com/en',
      'x-default': 'https://swaphubs.com',
    },
  },
  
  // 📱 VİRAL SOSYAL MEDYA: Link paylaşımlarında şık görünüm
  openGraph: {
    title: 'SwapHubs | Küresel Hizmet & Ürün Takas Merkezi',
    description: 'Üretici, tedarikçi ve hizmet sağlayıcıları tek platformda buluşturan yeni nesil takas ve ticaret ağı.',
    url: 'https://swaphubs.com',
    siteName: 'SwapHubs',
    images: [
      {
        url: 'https://swaphubs.com/og-image.jpg', // İpucu: public klasörüne og-image.jpg adında şık bir logo/görsel koymalısın
        width: 1200,
        height: 630,
        alt: 'SwapHubs Global Pazar',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  
  // 🤖 GOOGLE BOT YÖNLENDİRMESİ
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
