import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/app/components/AuthProvider"; 
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
    template: "%s | SwapHubs - Güvenli Takas Platformu",
    default: "SwapHubs | Türkiye'nin En Büyük Ürün & Hizmet Takas Platformu",
  },
  description: "Nakit harcamadan ticaret yapın. SwapHubs ile ürün ve hizmetlerinizi güvenle takas edebileceğiniz modern ticaret platformu.",
  keywords: ["takas", "swap", "takas sitesi", "hizmet takası", "güvenli ticaret"],
  authors: [{ name: "SwapHubs", url: "https://swaphubs.com" }],
  creator: "SwapHubs Team",
  publisher: "SwapHubs",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen bg-background antialiased`}>
        {/* Hata veren attribute, defaultTheme vb. kısımları temizledim */}
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
