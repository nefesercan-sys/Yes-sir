import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Provider";
// 📊 VERCEL ANALYTICS IMPORT
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwapHubs | Küresel Hizmet & Ürün Takas Merkezi",
  description: "Üretici, tedarikçi ve hizmet sağlayıcıları tek platformda buluşturan yeni nesil takas ve ticaret ağı.",
  keywords: ["takas", "B2B", "hizmet alımı", "ticaret", "ihracat", "ilan ver"],
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
