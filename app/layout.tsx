import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Varsa AuthProvider ve Analytics importlarını buraya ekle

const inter = Inter({ subsets: ["latin"] });

// 📱 MOBİL VE TEMA GÖRÜNÜMÜ
export const viewport: Viewport = {
  themeColor: "#0f172a", // Atakasa kurumsal laciverti
  width: "device-width",
  initialScale: 1,
};

// 🚀 SİBER TURBO: Atakasa %100 Kusursuz Global Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://atakasa.com"), 
  title: {
    template: "%s | Atakasa",
    default: "Atakasa | Küresel B2B Barter ve Takas Platformu",
  },
  description: "Şirketler arası (B2B) ürün ve hizmet takas ağı. Nakit kullanmadan ticaret yapın, stoklarınızı değerlendirin ve kapasitenizi paraya çevirin.",
  keywords: ["barter", "takas", "b2b ticaret", "stok eritme", "kurumsal takas", "atakasa", "hizmet takası", "global pazar"],
  
  // 🌍 GLOBAL BİLDİRİM
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  
  // 📱 VİRAL SOSYAL MEDYA (WhatsApp, LinkedIn, vb.)
  openGraph: {
    title: "Atakasa | Küresel B2B Barter ve Takas Platformu",
    description: "Şirketler arası (B2B) nakitsiz ticaret ağına katılın. Ürün ve hizmetlerinizi global pazarda takas edin.",
    url: "https://atakasa.com",
    siteName: "Atakasa",
    images: [
      {
        url: "/og-image.jpg", // Yeni eklediğimiz logo burada devreye giriyor
        width: 1200,
        height: 630,
        alt: "Atakasa B2B Barter Platformu",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },

  // 🐦 TWITTER / X KARTI
  twitter: {
    card: "summary_large_image",
    title: "Atakasa | Küresel B2B Barter Platformu",
    description: "Nakit kullanmadan ticaret yapın, şirketler arası takas ağına katılın.",
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
        {children}
      </body>
    </html>
  );
}
