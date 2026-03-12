import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import AuthProvider from './components/AuthProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://hizmetara.com'),
  title: { template: '%s | HizmetAra', default: 'HizmetAra — Hizmet Al, Hizmet Ver' },
  description: 'Türkiye\'nin en büyük hizmet ilan havuzu. Turizm, tamir, temizlik, üretim ve daha fazlası. İlan ver, teklif al.',
  keywords: ['hizmet', 'ilan', 'teklif', 'turizm', 'tamir', 'temizlik', 'usta', 'otel', 'kiralama'],
  openGraph: { type: 'website', locale: 'tr_TR', siteName: 'HizmetAra' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
        {/* 🚨 SİBER RADAR FİŞE TAKILDI VE AKTİF! */}
        <Analytics />
      </body>
    </html>
  );
}
