import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Provider importları
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@/components/analytics/analytics"; 

const inter = Inter({ subsets: ["latin"] });

// 📱 MOBİL VE TEMA GÖRÜNÜMÜ
export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

// 🚀 METADATA (Daha önce oluşturduğumuz SEO ayarları)
export const metadata: Metadata = {
  metadataBase: new URL("https://atakasa.com"), 
  title: {
    template: "%s | Atakasa",
    default: "Atakasa | Küresel B2B Barter ve Takas Platformu",
  },
  description: "Şirketler arası (B2B) ürün ve hizmet takas ağı.",
  // ... diğer metadata değerlerin
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        {/* PROVIDER SARMALAYICILARI */}
        {/* Tema ve Auth gibi Client Provider'ları en dışta sarmalıyoruz */}
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
        >
          <AuthProvider>
            <main>
              {children}
            </main>
            {/* Analitik izleyici */}
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
