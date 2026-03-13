import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwapHubs",
  description: "Hizmet ve Takas Platformu",
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
        </AuthProvider>
      </body>
    </html>
  );
}
