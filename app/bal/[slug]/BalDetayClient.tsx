'use client';
import { waLink, formatFiyat, stokLabel } from '@/lib/bal-helpers';

const WA = process.env.NEXT_PUBLIC_BAL_WA || '905XXXXXXXXX';

export default function BalDetayClient({ urun }: { urun: any }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FDF6E3', padding: '2rem 1.5rem', fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <a href="/bal" style={{ color: '#D4870A', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem' }}>← Tüm Ürünler</a>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', marginTop: '1.5rem', alignItems: 'flex-start' }}>
          <img src={urun.gorsel || 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80'} alt={urun.ad}
            style={{ width: '100%', maxWidth: 380, borderRadius: 20, objectFit: 'cover', aspectRatio: '1', display: 'block', boxShadow: '0 8px 32px rgba(28,15,0,.12)' }} />
          <div style={{ flex: '1 1 280px' }}>
            <h1 style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: '#1C0F00', marginBottom: '.6rem' }}>{urun.ad}</h1>
            <p style={{ fontSize: '.9rem', color: '#7A6040', lineHeight: 1.8, marginBottom: '1.2rem' }}>{urun.aciklama}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', marginBottom: '1.2rem' }}>
              {urun.icerik?.map((i: string) => (
                <span key={i} style={{ fontSize: '.7rem', color: '#3A6B35', border: '1px solid rgba(58,107,53,.2)', padding: '.2rem .6rem', borderRadius: 999 }}>{i}</span>
              ))}
            </div>
            <div style={{ fontFamily: "'Lora', serif", fontSize: '2rem', fontWeight: 700, color: '#D4870A', marginBottom: '.3rem' }}>{formatFiyat(urun.fiyat)}</div>
            <div style={{ fontSize: '.75rem', color: '#7A6040', marginBottom: '1.5rem' }}>{urun.birim} · {stokLabel(urun.stok)}</div>
            <a href={waLink(WA, `Merhaba, ${urun.ad} sipariş etmek istiyorum`)} target="_blank" rel="noopener"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: '#25D366', color: '#fff', padding: '.9rem 2rem', borderRadius: 999, fontWeight: 700, fontSize: '.9rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,.4)' }}>
              💬 WhatsApp ile Sipariş Ver
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
