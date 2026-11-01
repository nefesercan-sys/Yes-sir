import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı — SwapHubs',
  description: 'Aradığınız sayfa mevcut değil. Ana sayfaya dönün.',
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#333' }}>404</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#555' }}>Sayfa Bulunamadı</h2>
      <p style={{ fontSize: '16px', color: '#777', marginBottom: '30px' }}>
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" style={{
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          Ana Sayfaya Dön
        </Link>

        <Link href="/terzi" style={{
          padding: '12px 24px',
          backgroundColor: '#28a745',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          Terzi Hizmetleri
        </Link>

        <Link href="/" style={{ padding: '12px 24px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}>
          Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
