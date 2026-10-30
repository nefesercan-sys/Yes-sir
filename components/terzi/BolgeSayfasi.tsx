// ============================================================
// SwapHubs — components/terzi/BolgeSayfasi.tsx
// Antalya ilçe ve Konyaaltı/Muratpaşa mahalle sayfaları için ortak
// şablon. Bölgeye özgü bilgi (district-facts), deterministik kalıp seçimi ve hizmete özgü süreç anlatımı içerir. Sunucu bileşeni — hızlı, taranabilir, JS'siz de çalışır.
// ============================================================

import TerziMarketingBottomNav from '@/components/terzi/MarketingBottomNav';

import { PHONE_DISPLAY, waUrl, DURATION } from '@/lib/business';
import { directAnswer, processesFor, PROCESS, trLoc, pick, pickN, type ProcId } from '@/lib/bolge-icerik';
import { DISTRICT_FACTS } from '@/lib/district-facts';
import { findDistrict } from '@/lib/seo-data';

const YESIL = '#2d8c6e';
const PHONE = PHONE_DISPLAY;
const WA = (msg: string) => waUrl(msg);

type Props = {
  tip: 'antalya-ilce' | 'konyaalti-mahalle' | 'muratpasa-mahalle';
  slug: string;
  lokasyonAdi: string;
  blurb?: string;
  url?: string;
  komsuLokasyonlar: { slug: string; ad: string }[];
  komsuHref: (slug: string) => string;
  /** MongoDB'den o bölgenin çevresinde sayılan GERÇEK aktif talep sayısı. */
  aktifTalepSayisi: number;
};

// Bölgenin açısına göre öne çıkan süreç (DISTRICT_FACTS "needs" metnindeki işlerle uyumlu)
const ONCELIK: Record<string, ProcId[]> = {
  hurma: ['paca'], liman: ['takim'], gursu: ['mont'], uncali: ['gelinlik-abiye'], sarisu: ['kot'], cakirlar: ['ozel-dikim'],
  meltem: ['fermuar'], fener: ['elbise-tamir'], sirinyali: ['gomlek'], guzeloba: ['kiyafet-tamiri'],
  konyaalti: ['kiyafet-tamiri'], muratpasa: ['gelinlik-abiye'], lara: ['fermuar'], kundu: ['takim'], aksu: ['mont'], belek: ['takim'], side: ['fermuar'], beldibi: ['etek'],
};

export default function BolgeSayfasi({ tip, slug, lokasyonAdi, blurb, komsuLokasyonlar, komsuHref, aktifTalepSayisi }: Props) {
  // FAQ bu bileşende basılmaz: sayfa kendi FaqBlock'u ile görünür SSS + FAQPage şemasını tek kez verir (çift FAQPage olmasın).
  const d = findDistrict(slug);
  const loc = d?.loc.tr ?? trLoc(lokasyonAdi);
  const resort = d?.kind === 'resort';
  const fact = DISTRICT_FACTS[slug];
  const cevap = directAnswer('tr', slug, lokasyonAdi, loc, resort);
  const surecler = processesFor(slug, ONCELIK[slug] ?? []);
  const ilceAdi = tip === 'konyaalti-mahalle' ? 'Konyaaltı' : tip === 'muratpasa-mahalle' ? 'Muratpaşa' : null;
  const altBaslik = pick(`h1:${slug}`, [
    'Paça Kısaltma, Tadilat, Özel Dikim',
    'Tamir, Tadilat ve Ölçüye Göre Dikim',
    'Fermuar, Daraltma, Kısaltma ve Dikim',
  ]);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0f2f24, #14392b)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span style={{ display: 'inline-block', background: 'rgba(45,140,110,.25)', color: '#a7f3d0', fontSize: '.75rem', fontWeight: 700, padding: '.4rem .9rem', borderRadius: 20, marginBottom: '1.2rem' }}>
            🧵 {lokasyonAdi}{ilceAdi ? `, ${ilceAdi}` : ''} · Antalya
          </span>
          <h1 className="hero-slogan" style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '1rem' }}>
            {lokasyonAdi} Terzi — {altBaslik}
          </h1>
          <p id="dogrudan-cevap" style={{ color: 'rgba(255,255,255,.85)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1rem' }}>{cevap}</p>
          {blurb && <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>{blurb}</p>}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA(`Merhaba, ${lokasyonAdi} için terzi hizmeti almak istiyorum.`)} target="_blank" rel="noopener noreferrer"
              style={{ background: YESIL, color: '#fff', padding: '.9rem 1.8rem', borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: '.95rem' }}>
              💬 WhatsApp'tan Fotoğraf Gönder
            </a>
            <a href="/terzi-talep"
              style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,.4)', color: '#fff', padding: '.9rem 1.8rem', borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: '.95rem' }}>
              📝 Talep Oluştur
            </a>
          </div>
          {/* GERÇEK, CANLI VERİ — MongoDB'den o an sayılan aktif talep sayısı */}
          {aktifTalepSayisi > 0 && (
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.8rem', marginTop: '1.2rem' }}>
              📍 Şu anda {lokasyonAdi} çevresinde {aktifTalepSayisi} aktif terzi talebi var.
            </p>
          )}
        </div>
      </section>

      {fact && (
        <section style={{ padding: '2.5rem 1.5rem', maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '.8rem' }}>{lokasyonAdi} hakkında</h2>
          <p style={{ fontSize: '.92rem', lineHeight: 1.7, color: '#334155', margin: '0 0 .6rem' }}><strong>Konum:</strong> {fact.where.tr}</p>
          <p style={{ fontSize: '.92rem', lineHeight: 1.7, color: '#334155', margin: 0 }}><strong>En çok istenen işler:</strong> {fact.needs.tr}</p>
        </section>
      )}

      {/* HİZMETE ÖZGÜ SÜREÇ — bölgeye göre seçilen 3 iş */}
      <section style={{ background: '#f7faf9', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.2rem' }}>{loc} sık yapılan işler nasıl yapılır?</h2>
          {surecler.map((id) => (
            <div key={id} style={{ marginBottom: '1.1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 .3rem' }}>{PROCESS[id].tr.h}</h3>
              <p style={{ fontSize: '.9rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>{PROCESS[id].tr.p}</p>
            </div>
          ))}
          <p style={{ fontSize: '.85rem', color: '#64748b', marginTop: '1rem' }}>{DURATION.tr.all}</p>
        </div>
      </section>

      {/* HİZMETLER LİSTESİ */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.2rem', textAlign: 'center' }}>
          {lokasyonAdi} Terzi Hizmetleri
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', justifyContent: 'center' }}>
          {pickN(`chips:${slug}`, ['Paça Kısaltma', 'Bel Daraltma', 'Etek Kısaltma', 'Fermuar Değişimi', 'Ceket Tadilatı', 'Mont Tamiri',
            'Gömlek Daraltma', 'Elbise Tamiri', 'Abiye Tadilatı', 'Özel Dikim', 'Kot Paçası', 'Sökük Dikimi'], 8).map(h => (
            <span key={h} style={{ background: '#eaf6f1', color: YESIL, fontSize: '.8rem', fontWeight: 600, padding: '.5rem 1rem', borderRadius: 20 }}>
              {h}
            </span>
          ))}
        </div>
      </section>

      {/* KOMŞU BÖLGELER — iç linkleme */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', textAlign: 'center' }}>
          {ilceAdi ? `Diğer ${ilceAdi} Mahalleleri` : 'Diğer Antalya Bölgeleri'}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', justifyContent: 'center' }}>
          {komsuLokasyonlar.map(k => (
            <a key={k.slug} href={komsuHref(k.slug)} style={{ fontSize: '.8rem', color: '#475569', textDecoration: 'none', border: '1px solid #e2e8f0', padding: '.5rem 1rem', borderRadius: 20 }}>
              {k.ad}
            </a>
          ))}
        </div>
      </section>

      {/* KAPANIŞ CTA */}
      <section style={{ background: YESIL, padding: '3rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>
          {loc} terzi için fotoğraf gönderin
        </h2>
        <a href={WA(`Merhaba, ${lokasyonAdi} için fiyat almak istiyorum, fotoğraf gönderiyorum.`)} target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: YESIL, padding: '.9rem 1.8rem', borderRadius: 10, fontWeight: 800, textDecoration: 'none', fontSize: '.95rem', display: 'inline-block' }}>
          💬 {PHONE} — WhatsApp
        </a>
      </section>
      <TerziMarketingBottomNav />
    </div>
  );
}
