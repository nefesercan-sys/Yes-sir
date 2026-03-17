import type { Metadata, Viewport } from "next";
// 1. Yeni fontları import ediyoruz
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/app/components/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/app/components/theme-provider";

// 2. Font ayarları: 'swap' özelliği sayesinde sayfa açılırken bekleme yapmaz
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-jakarta', // CSS'te kullanmak için değişken adı
});

const unbounded = Unbounded({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-unbounded',
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
    template: "%s | Atakasa",
    default: "Atakasa | Küresel B2B Barter ve Takas Platformu",
  },
  description: "Şirketler arası (B2B) ürün ve hizmet takas ağı.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. Font değişkenlerini html etiketine ekliyoruz
    <html lang="tr" suppressHydrationWarning className={`${jakarta.variable} ${unbounded.variable}`}>
      <body className={jakarta.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <main>
              {children}
            </main>
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
