import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/uniforma-uretimi-antalya';
const PARENT = 'https://swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';
const WA = (t: string) => `https://wa.me/905318986418?text=${encodeURIComponent(t)}`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Üniforma Üretimi Antalya — Otel Restoran Sağlık Okul 2026',
      description: "Antalya'da üniforma üretimi. Otel, resepsiyon, aşçı, garson, güvenlik, spa, okul, sağlık sektörü. Tasarım + kalıp + seri imalat + nakış tek elden.",
      provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: '+905318986418', '@id': `${PARENT}#business` },
      areaServed: { '@type': 'City', name: 'Antalya' },
      category: 'Uniform Manufacturing',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'SwapHubs', item:'https://www.swaphubs.com' },
        { '@type':'ListItem', position:2, name:'Antalya Terzi', item:PARENT },
        { '@type':'ListItem', position:3, name:'Üniforma Üretimi Antalya', item:SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type':'Question', name:'Otel üniforması üretimi Antalya fiyatı?', acceptedAnswer:{'@type':'Answer', text:`Otel üniforma üretimi adet ve modele göre fiyatlandırılmaktadır. Teklif için WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Aşçı üniforması dikimi Antalya?', acceptedAnswer:{'@type':'Answer', text:`Evet! Aşçı üniforma, garson üniforma, resepsiyon üniforma üretimi yapılmaktadır. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Okul üniforması üretimi yapılıyor mu?', acceptedAnswer:{'@type':'Answer', text:`Evet! Okul üniforma seri üretimi yapılmaktadır. Tasarım ve nakış dahil. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Minimum kaç adet üniforma siparişi verilebilir?', acceptedAnswer:{'@type':'Answer', text:'Minimum sipariş adeti 10 adet olup, daha az adet için de görüşme yapılabilir. Numune dikimi yapılmaktadır.'}},
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),
  title: 'Üniforma Üretimi Antalya · Otel Aşçı Garson Okul Sağlık · Seri İmalat 2026 | Terzi Can',
  description: "Antalya üniforma üretimi: otel, resepsiyon, aşçı, garson, güvenlik, spa, okul, sağlık. Tasarım + seri imalat + nakış tek elden. ☎ +90 531 898 64 18",
  keywords: [
    'üniforma üretimi Antalya', 'otel üniforması Antalya', 'aşçı üniforması Antalya',
    'garson üniforması Antalya', 'okul üniforması Antalya', 'sağlık üniforması Antalya',
    'güvenlik üniforması Antalya', 'iş üniforması Antalya', 'toplu üniforma dikimi Antalya',
    'restoran üniforması Antalya', 'nakış Antalya', 'seri imalat üniforma',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Üniforma Üretimi Antalya · Otel Aşçı Garson Okul · Seri İmalat',
    description: "Otel, resepsiyon, aşçı, garson, güvenlik, okul. Tasarım + seri imalat + nakış. ☎ +90 531 898 64 18",
    url: SITE_URL, type: 'website',
  },
  robots: { index: true, follow: true },
};

const SEKTORLER = [
  { ic: '🏨', baslik: 'Otel & Konaklama', list: ['Resepsiyon üniforma','Kat görevlisi','Kapıcı / Valet','Havuzbaşı personel','Animatör üniforma','Meydancı personel'] },
  { ic: '🍽️', baslik: 'Restoran & Mutfak', list: ['Aşçı / Şef üniforma','Garson üniforma','Barista üniforma','Bulaşıkçı / Kiler','Pasta şefi üniforma','Catering personeli'] },
  { ic: '🏥', baslik: 'Sağlık Sektörü', list: ['Doktor önlüğü','Hemşire üniforma','Eczacı önlüğü','Fizyoterapist','Diş hekimi üniforma','Veteriner önlüğü'] },
  { ic: '🏫', baslik: 'Okul & Eğitim', list: ['Okul üniforma (öğrenci)','Öğretmen üniforma','Güvenlik görevlisi','Temizlik personeli','Kreş & anaokulu','Üniversite takımı'] },
  { ic: '🔒', baslik: 'Güvenlik & Hizmet', list: ['Güvenlik üniforma','AVM personeli','Havalimanı personeli','Temizlik şirketi','Lojistik & kargo','Fabrika iş elbisesi'] },
  { ic: '💆', baslik: 'Spa & Wellness', list: ['Masaj terapisti','Spa resepsiyon','Kuaför önlüğü','Güzellik uzmanı','Hamam görevlisi','Fitness eğitmeni'] },
];

export default function UniformaUretimiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: "'Jost',system-ui,sans-serif", background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}<Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}<span>Üniforma Üretimi Antalya</span>
        </nav>

        <section style={{ background: 'linear-gradient(135deg,#1C1814,#2E2820)', padding: '4rem 1.5rem 3.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=1200&q=70') center/cover", opacity: .1 }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              🏭 Terzi Can · Antalya · Üniforma Üretimi
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Üniforma Üretimi Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Otel · Restoran · Sağlık · Okul · Güvenlik</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '620px', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#fff' }}>Tasarım + Kalıp + Seri İmalat + Nakış</strong> tek elden.
              Antalya'nın en deneyimli üniforma üreticisi. Minimum 10 adet sipariş, numune dikimi mevcut.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', maxWidth: '750px', marginBottom: '1.5rem' }}>
              {[['Tasarım','Ücretsiz danışmanlık'],['Kalıp','Özel kalıp çıkarma'],['Seri İmalat','Min. 10 adet'],['Nakış','Logo & isim'],['Teslimat','Tüm Antalya']].map(([t,d])=>(
                <div key={t} style={{ background: 'rgba(255,255,255,.04)', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#D4B07A', marginBottom: '.3rem' }}>{t}</div>
                  <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.5)' }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, üniforma üretimi için teklif almak istiyorum. Sektörüm: ')} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                🏭 Toplu Teklif Al
              </a>
              <a href="tel:+905318986418" style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '.9rem 1.6rem', textDecoration: 'none', fontSize: '.85rem' }}>
                📞 {PHONE}
              </a>
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Hangi Sektörlere Üniforma Üretiyoruz?</h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>Antalya'nın önde gelen otel, restoran, sağlık ve eğitim kurumlarına hizmet veriyoruz</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
              {SEKTORLER.map(({ ic, baslik, list }) => (
                <div key={baslik} style={{ background: '#F2EDE4', border: '1px solid rgba(184,151,90,.15)', borderTop: '3px solid #B8975A', padding: '1.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '.6rem' }}>{ic}</div>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.05rem', color: '#1C1814', marginBottom: '.8rem', fontWeight: 600 }}>{baslik}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {list.map(item => (
                      <li key={item} style={{ fontSize: '.78rem', color: '#7A6E62', padding: '.22rem 0', borderBottom: '1px solid rgba(184,151,90,.1)' }}>
                        ✓ {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>Üniforma Üretim Süreci</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1px', background: '#E8E0D2' }}>
              {[
                ['1️⃣','Danışmanlık','Sektör ve ihtiyaç analizi. Tasarım ve kumaş seçimi.'],
                ['2️⃣','Numune Dikim','Onay numunesi dikilir, gerekli değişiklikler yapılır.'],
                ['3️⃣','Seri İmalat','Onaylanan numune baz alınarak seri üretim başlar.'],
                ['4️⃣','Nakış & Baskı','Logo, isim, unvan nakışı veya baskısı eklenir.'],
                ['5️⃣','Kalite Kontrol','Her üniforma tek tek kontrol edilir.'],
                ['6️⃣','Teslimat','Paketlenmiş ve etiketlenmiş olarak kurumunuza teslim.'],
              ].map(([ic,t,d])=>(
                <div key={t as string} style={{ background: '#FAF7F2', padding: '1.8rem 1.2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '.95rem', color: '#B8975A', marginBottom: '.4rem' }}>{t}</div>
                  <div style={{ fontSize: '.76rem', color: '#7A6E62', lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#1C1814', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#D4B07A', marginBottom: '1rem' }}>
              Antalya Otel Üniforma Uzmanı
            </h2>
            <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '.9rem', lineHeight: 1.9, marginBottom: '1.5rem' }}>
              Antalya'da <strong style={{ color: '#fff' }}>Rixos, Regnum, Kaya Palazzo, Gloria, Delphin, Calista, Maxx Royal, Titanic</strong> gibi
              5 yıldızlı oteller dahil yüzlerce konaklama tesisine üniforma üretimi yapıyoruz.
              Otel personelinin departmanına göre — resepsiyon, kat, mutfak, güvenlik, spa, animasyon —
              farklı model ve renk seçenekleriyle komple üniforma paketi sunuyoruz.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem' }}>
              {[
                ['🎨','Özel Tasarım','Kurumsal kimliğinize uygun tasarım'],
                ['🧵','Premium Kumaş','Yıkamaya dayanıklı, nefes alır kumaşlar'],
                ['🪡','Logo Nakışı','3D, düz veya dijital nakış seçenekleri'],
                ['📦','Paket Teslimat','Etiketli ve paketlenmiş teslim'],
              ].map(([ic,t,d])=>(
                <div key={t as string} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(212,176,122,.15)', padding: '1.2rem' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>{ic}</div>
                  <div style={{ fontSize: '.88rem', color: '#fff', fontWeight: 500, marginBottom: '.2rem' }}>{t}</div>
                  <div style={{ fontSize: '.74rem', color: '#D4B07A' }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>Üniforma Üretimi SSS</h2>
            {[
              ['Otel üniforması üretimi Antalya fiyatı?', `Fiyat; model, kumaş, adet ve nakış detayına göre değişir. WhatsApp'tan numune ve adet bildirin: ${PHONE}`],
              ['Minimum kaç adet üniforma sipariş verilebilir?', 'Minimum 10 adet. Daha az adet için de görüşme yapılabilir. Numune dikimi tek adet yapılmaktadır.'],
              ['Numune dikimi yapılıyor mu?', 'Evet! Seri üretime geçmeden önce onay numunesi dikilir. Numune onaylanınca seri imalat başlar.'],
              ['Logo nakışı dahil mi?', 'Evet! Logo, isim ve unvan nakışı üniforma paketiyle birlikte sunulmaktadır. 3D nakış seçeneği de mevcuttur.'],
              ['Teslimat süresi ne kadar?', 'Numune onayından sonra seri imalat 10–20 iş günüdür. Acil siparişler için görüşme yapılabilir.'],
              ['Kumaş seçimi yapılabiliyor mu?', 'Evet! Sektöre göre farklı kumaş seçenekleri sunulmaktadır. Otel için nefes alır, mutfak için ısıya dayanıklı, sağlık için antibakteriyel kumaşlar.'],
            ].map(([q,a],i)=>(
              <details key={i} style={{ borderBottom: '1px solid rgba(184,151,90,.1)', padding: '.8rem 0' }}>
                <summary style={{ cursor: 'pointer', fontSize: '.92rem', fontWeight: 500, color: '#1C1814', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#B8975A' }}>+</span>
                </summary>
                <p style={{ marginTop: '.7rem', fontSize: '.84rem', color: '#7A6E62', lineHeight: 1.85 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section style={{ background: '#B8975A', padding: '3.5rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.7rem' }}>Toplu Üniforma Teklifi Alın</h2>
          <p style={{ color: 'rgba(255,255,255,.9)', marginBottom: '1.8rem', fontSize: '.92rem' }}>
            Sektörünüzü ve adet bilgisini gönderin — 24 saat içinde fiyat teklifi
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, üniforma üretimi için teklif almak istiyorum. Sektörüm: ')} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Teklif İste
            </a>
            <a href="tel:+905318986418" style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
        </section>

        <section style={{ padding: '2rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>Diğer Hizmetler</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[['Dikiş Atölyesi','/terzi/dikis-atolyesi-antalya'],['Bay Terzi','/terzi/bay-terzi-antalya'],['Kuru Temizleme','/terzi/kuru-temizleme-antalya'],['← Tüm Hizmetler','/terzi']].map(([l,h])=>(
                <Link key={l} href={h} style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>{l}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
