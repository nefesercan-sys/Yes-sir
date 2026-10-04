import type { Metadata } from 'next';

// Form sayfası: arama sonuçlarında çıkmasın (içerik değil, dönüşüm sayfası).
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function TerziTalepLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
