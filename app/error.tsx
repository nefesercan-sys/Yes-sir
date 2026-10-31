'use client';

import Link from 'next/link';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main style={{ textAlign: 'center', padding: '60px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Bir sorun oluştu</h1>
      <p style={{ color: '#555', marginBottom: 24, maxWidth: 420 }}>
        Sayfa yüklenirken beklenmeyen bir hata oldu. Tekrar deneyebilir veya ana sayfaya dönebilirsiniz.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button type="button" onClick={() => reset()} style={{ padding: '12px 24px', borderRadius: 6, border: 'none', background: '#1d4ed8', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
          Tekrar dene
        </button>
        <Link href="/" style={{ padding: '12px 24px', borderRadius: 6, background: '#e5e7eb', color: '#111', textDecoration: 'none', fontWeight: 700 }}>
          Ana sayfa
        </Link>
      </div>
    </main>
  );
}
