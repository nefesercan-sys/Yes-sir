import type { Metadata } from 'next';

// Özel / işlem sayfası: arama sonuçlarında çıkmasın (robots.txt'te engellemiyoruz ki Google noindex'i görebilsin).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
