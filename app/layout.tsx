// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/components/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/app/components/theme-provider";
import BottomNav from "@/components/BottomNav";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-unbounded",
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
    template: "%s | SwapHubs",
    default: "SwapHubs | Küresel B2B Hizmet & Ürün Takas Platformu",
  },
  description: "Üretici, tedarikçi, hizmet sağlayıcı ve alıcıları tek platformda buluşturuyoruz. İlan verin, teklif alın — tamamen ücretsiz.",
  keywords: [
    "b2b takas", "hizmet takas", "ticari ilan", "tedarikçi bul",
    "fason üretim", "swaphubs", "global takas", "bireysel ilan",
  ],
  authors: [{ name: "SwapHubs", url: "https://swaphubs.com" }],
  creator: "SwapHubs",
  publisher: "SwapHubs",
  openGraph: {
    title: "SwapHubs | Küresel B2B Hizmet & Ürün Takas Platformu",
    description: "Türkiye'den Dünyaya, Dünyadan Türkiye'ye — ücretsiz ilan ver, teklif al.",
    url: "https://swaphubs.com",
    siteName: "SwapHubs",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SwapHubs | Küresel B2B Takas Platformu",
    description: "Üretici, tedarikçi ve alıcıları buluşturuyoruz.",
    site: "@swaphubs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${jakarta.variable} ${unbounded.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={jakarta.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <main>{children}</main>
            <BottomNav />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
