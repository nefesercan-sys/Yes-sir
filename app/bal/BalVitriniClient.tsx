'use client';
import { useState } from 'react';
import { waLink, formatFiyat, stokLabel } from '@/lib/bal-helpers';

const WA = process.env.NEXT_PUBLIC_BAL_WA || '905XXXXXXXXX';

interface Urun {
  _id: string;
  slug: string;
  ad: string;
  kategori: string;
  fiyat: number;
  birim: string;
  stok: string;
  aciklama: string;
  icerik: string[];
  gorsel: string;
}

export default function BalVitriniClient({ urunler }: { urunler: Urun[] }) {
  const [aktifKat, setAktifKat] = useState('tumu');

  const kategoriler = [
    { id: 'tumu', label: '🍯 Tümü' },
    { id: 'bal', label: '🍯 Bal' },
    { id: 'polen', label: '🌸 Polen' },
    { id: 'propolis', label: '💎 Propolis' },
    { id: 'set', label: '🎁 Set' },
    { id: 'koy-urun', label: '🏡 Köy' },
    { id: 'ot', label: '🌿 Otlar' },
  ];

  const filtrelenmis = aktifKat === 'tumu'
    ? urunler
    : urunler.filter(u => u.kategori === aktifKat);

  return (
    <div style={{ minHeight: '100vh', background: '#FDF6E3', fontFamily: "'Nunito', sans-serif" }}>

      {/* Hero */}
      <section style={{
        minHeight: '70vh',
        background: 'linear-gradient(to bottom, rgba(28,15,0,.6) 0%, rgba(28,15,0,.2) 60%, #FDF6E3 100%), url(https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1600&q=80) center/cover',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '5rem 1.5rem 3rem',
      }}>
        <div>
          <span style={{ display: 'inline-block', background: 'rgba(245,166,35,.2)', border: '1px solid rgba(245,166,35,.4)', color: '#FFC85A', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', padding: '.3rem .9rem', borderRadius: 999, marginBottom: '1.2rem' }}>
            🐝 Sivas Dağ Yaylalarından
          </span>
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '.8rem', textShadow: '0 2px 16px rgba(0,0,0,.4)' }}>
            Bir Damla Balda<br /><em style={{ color: '#FFC85A' }}>Binlerce Çiçeğin Özü</em>
          </h1>
          <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', color: 'rgba(255,255,255,.8)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            "Bir damla balda binlerce çiçeğin özüne ulaşırsınız"
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#urunler" style={{ background: '#D4870A', color: '#fff', padding: '.8rem 1.8rem', borderRadius: 999, fontWeight: 700, fontSize: '.85rem', textDecoration: 'none' }}>
              🍯 Ürünleri Gör
            </a>
            <a href={waLink(WA, 'Merhaba, bal sipariş etmek istiyorum')} target="_blank" rel="noopener" style={{ background: '#25D366', color: '#fff', padding: '.8rem 1.8rem', borderRadius: 999, fontWeight: 700, fontSize: '.85rem', textDecoration: 'none' }}>
              💬 WhatsApp Sipariş
            </a>
          </div>
        </div>
      </section>

      {/* Kategoriler */}
      <div id="urunler" style={{ background: '#fff', borderBottom: '1px solid rgba(212,135,10,.1)', padding: '.8rem 1.5rem', display: 'flex', gap: '.5rem', overflowX: 'auto', justifyContent: 'center', flexWrap: 'wrap' }}>
        {kategoriler.map(k => (
          <button key={k.id} onClick={() => setAktifKat(k.id)}
            style={{ padding: '.4rem 1rem', borderRadius: 999, border: aktifKat === k.id ? '1.5px solid #D4870A' : '1.5px solid #E5E7EB', background: aktifKat === k.id ? '#D4870A' : 'transparent', color: aktifKat === k.id ? '#fff' : '#7A6040', fontWeight: 700, fontSize: '.75rem', cursor: 'pointer' }}>
            {k.label}
          </button>
        ))}
      </div>

      {/* Ürün Grid */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem' }}>
        {filtrelenmis.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7A6040', padding: '3rem' }}>Bu kategoride ürün yok.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filtrelenmis.map(urun => (
              <article key={urun._id} style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 20px rgba(28,15,0,.08)', display: 'flex', flexDirection: 'column' }}>
                <img
                  src={urun.gorsel || 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400&q=80'}
                  alt={urun.ad}
                  style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
                <div style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: "'Lora', serif", fontSize: '1.1rem', fontWeight: 700, color: '#1C0F00', marginBottom: '.4rem' }}>{urun.ad}</h3>
                  <p style={{ fontSize: '.8rem', color: '#7A6040', lineHeight: 1.7, marginBottom: '.8rem', flex: 1 }}>{urun.aciklama}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.25rem', marginBottom: '.8rem' }}>
                    {urun.icerik?.map(i => (
                      <span key={i} style={{ fontSize: '.6rem', color: '#3A6B35', border: '1px solid rgba(58,107,53,.2)', padding: '.1rem .5rem', borderRadius: 999, background: 'rgba(58,107,53,.05)' }}>{i}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(28,15,0,.06)', paddingTop: '.8rem' }}>
                    <div>
                      <div style={{ fontFamily: "'Lora', serif", fontSize: '1.3rem', fontWeight: 700, color: '#D4870A' }}>{formatFiyat(urun.fiyat)}</div>
                      <div style={{ fontSize: '.65rem', color: '#7A6040' }}>{urun.birim} · {stokLabel(urun.stok)}</div>
                    </div>
                    <a href={waLink(WA, `Merhaba, ${urun.ad} sipariş etmek istiyorum`)} target="_blank" rel="noopener"
                      style={{ background: '#D4870A', color: '#fff', padding: '.5rem 1.1rem', borderRadius: 999, fontSize: '.75rem', fontWeight: 700, textDecoration: 'none' }}>
                      🛒 Satın Al
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #D4870A, #7A3E00)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(1.5rem,3vw,2.5rem)', color: '#fff', fontWeight: 700, marginBottom: '.8rem' }}>
          Sezon Başlamadan Rezervasyon Yapın
        </h2>
        <p style={{ color: 'rgba(255,255,255,.8)', marginBottom: '1.5rem', fontSize: '.9rem' }}>
          Ağustos öncesi sipariş alınıyor — stoklar her yıl hızla tükeniyor
        </p>
        <a href={waLink(WA, 'Merhaba, bal rezervasyonu yapmak istiyorum')} target="_blank" rel="noopener"
          style={{ background: '#fff', color: '#7A3E00', padding: '.9rem 2rem', borderRadius: 999, fontWeight: 700, fontSize: '.9rem', textDecoration: 'none', display: 'inline-block' }}>
          🍯 Hemen Rezervasyon Yap
        </a>
      </div>

      {/* WA Float */}
      <a href={waLink(WA, 'Merhaba, bal hakkında bilgi almak istiyorum')} target="_blank" rel="noopener"
        aria-label="WhatsApp"
        style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', width: 52, height: 52, background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,.5)', zIndex: 999 }}>
        💬
      </a>
    </div>
  );
}
