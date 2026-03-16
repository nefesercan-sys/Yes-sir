import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Provider importları (app/components altındaki dosya yapına göre)
import { AuthProvider } from "@/app/components/AuthProvider";
// Analytics ve ThemeProvider için dosyaların olduğundan emin ol
import { Analytics } from "@/app/components/analytics/analytics"; 
import { ThemeProvider } from "@/app/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
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
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
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
