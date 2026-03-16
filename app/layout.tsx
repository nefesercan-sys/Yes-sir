import type { Metadata, Viewport } from "next";
// Font optimizasyonu için 'swap' ekledik
import { Inter } from "next/font/google";
import "./globals.css";

// Import yollarını proje yapına göre güncelledik
import AuthProvider from "@/app/components/AuthProvider";
import { Analytics } from "@/app/components/analytics/analytics";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/app/components/theme-provider";

// Font optimizasyonu (display: 'swap')
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Font yüklenene kadar sistem fontunu gösterir, LCP süresini kısaltır
});

// Viewport ayarları
export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Erişilebilirlik ve zoom performansı için
};

// SEO ve Sosyal Medya Metadataları
export const metadata: Metadata = {
  metadataBase: new URL("https://swaphubs.com"), // Gerçek URL'nizi buraya yazın
  title: {
    template: "%s | Atakasa",
    default: "Atakasa | Küresel B2B Barter ve Takas Platformu",
  },
  description: "Şirketler arası (B2B) ürün ve hizmet takas ağı.",
  // Mobil SEO için favicon ve diğer ikonlar buraya eklenebilir
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning, Tema geçişlerindeki uyarıyı engeller
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Tema Provider'ı en dışta olmalı */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Auth Provider bir 'Client Component' gerektirdiği için tema içinde sarmalanıyor */}
          <AuthProvider>
            <main>
              {children}
            </main>
            {/* Analitik kodunu en sona taşıdık, yüklenmesini ana içerikten sonraya bıraktık */}
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
