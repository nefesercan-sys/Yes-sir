'use client';

// Kök layout hata verdiğinde gösterilir; kendi <html>/<body> etiketlerini taşımak zorundadır.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="tr">
      <body style={{ fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>Bir sorun oluştu</h1>
        <p style={{ color: '#555', marginBottom: 24 }}>Lütfen sayfayı yeniden deneyin.</p>
        <button type="button" onClick={() => reset()} style={{ padding: '12px 24px', borderRadius: 6, border: 'none', background: '#1d4ed8', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
          Tekrar dene
        </button>
      </body>
    </html>
  );
}
