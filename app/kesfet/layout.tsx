import type { Metadata } from 'next';

// Herkese açık kategori vitrini: indekslenebilir; bağlantılar izlenir.
export const metadata: Metadata = {
  title: { absolute: 'Kategorileri Keşfet — Hizmet ve Ürün İlanları | SwapHubs' },
  description: 'Bireysel ve ticari kategorilere göz atın: hizmet verin, hizmet alın, ilan verin ve teklif toplayın.',
  alternates: { canonical: 'https://swaphubs.com/kesfet' },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
