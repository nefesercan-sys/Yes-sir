import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import LangSetter from './LangSetter';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'], variable: '--font-inter', display: 'swap' });
const syne = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-syne', display: 'swap' });

const SITE = 'https://terzihizmeti.com.tr';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Terzi Can — Antalya Konyaaltı Terzi Hizmeti',
    template: '%s · Terzi Can',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'W2S_Gr49EgkgWG7xAWWMc5qPW6Cw3wEnOi6O6UC9zkQ',
    yandex: 'e7b38dec995b9142',
  },
  alternates: {
    canonical: SITE,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2C4A3E',
};

// DÜZELTME (SEO denetimi): Bu dosyada daha önce her sayfada basılan tam bir
// LocalBusiness/ClothingStore JSON-LD bloğu vardı. Ancak her alt sayfa
// (app/page.tsx, app/antalya-terzi/page.tsx, app/hurma-terzi/page.tsx, vb.)
// ZATEN aynı '@id' (`${SITE}#business`, `${SITE}#website`) ile kendi, daha
// eksiksiz ve doğru adresli (Hurma Mahallesi, 07130) şemalarını basıyordu.
// Aynı sayfada aynı @id için iki farklı/çelişen tanım olması (biri eksik/
// genel, diğeri tam) arama motorlarının ve AI motorlarının işletme bilgisini
// (NAP) doğru okumasını riske atıyordu. Global şema buradan tamamen
// kaldırıldı — her rota kendi doğru JSON-LD'sini kendi basıyor (blog
// sayfaları için de ayrıca eklendi, bkz. app/blog/**/page.tsx).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${syne.variable}`}>
      <body>
        <LangSetter />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
