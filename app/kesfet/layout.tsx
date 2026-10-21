import type { Metadata } from 'next';

// Herkese açık kategori vitrini: indekslenebilir; bağlantılar izlenir.
export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
