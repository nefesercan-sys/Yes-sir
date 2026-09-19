import type { OtelBolgesi } from '@/lib/otel-bolgeleri';

const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';

type Lang = 'en' | 'ru' | 'de';

const T: Record<Lang, any> = {
  en: {
    tag: (r: string) => `🚗 Mobile Tailor · ${r} Hotel Zone`,
    h1a: 'Hotel Tailor', h1b: (r: string) => `${r}`,
    heroDesc: (r: string, blurb: string) => `${blurb} Terzi Can's mobile tailor comes directly to your hotel in ${r} — measurement, tailoring, alterations, ironing and dry cleaning, delivered back to your room.`,
    waShare: 'Share Hotel Name →', callBtn: PHONE,
    flags: [['🇬🇧', 'We come to your hotel'], ['🇷🇺', 'Приедем в ваш отель'], ['🇩🇪', 'Wir kommen zu Ihnen'], ['🇹🇷', 'Otele geliyoruz']],
    aboutH: (r: string) => `About the ${r} Hotel District`, travelLabel: 'Travel time:',
    hotelsH: (r: string) => `Hotels in the ${r} Area`, hotelsSub: 'We can reach you at any hotel in this district — just share your hotel name and we\'ll confirm.',
    otherHotels: '+ every other hotel in this district. Just message your hotel name on WhatsApp.',
    howH: 'How It Works', howSub: 'Tailor service delivered to your hotel room in 4 steps',
    steps: [
      ['📍', 'Share Hotel & Room', `Send your hotel name and room number to ${PHONE}`],
      ['📞', 'Booking Within 30 Min', 'We confirm a convenient time'],
      ['✂️', 'On-Site Measurement', 'Our tailor visits your hotel, measures and collects the garment'],
      ['🚗', '24–48h Delivery', 'Finished garment delivered back to your room'],
    ],
    servicesH: 'Tailoring, Repair & Ironing Services', servicesSub: 'Full-service workshop — everything handled off-site, delivered to your hotel',
    services: [
      ['✂️', 'Hemming & Alterations', 'Trousers, dresses, suits — precise fit adjustments'],
      ['🔧', 'Zipper & Repair', 'Zipper replacement, tears, buttons'],
      ['👗', 'Wedding & Evening Wear', 'Delicate alterations for special occasions'],
      ['🧺', 'Ironing & Dry Cleaning', 'Professional steam press and dry cleaning'],
    ],
    priceH: 'Prices', priceSub: 'The hotel visit itself is free — you only pay for the work',
    priceRows: [['Hotel Visit Fee', 'FREE'], ['Hemming', '₺150+'], ['Zipper Replacement', '₺200+'], ['Dress / Suit Alteration', '₺200+'], ['Wedding Dress Alteration', '₺500+'], ['Ironing (per item)', '₺80+'], ['Dry Cleaning', '₺300+']],
    faqH: 'Frequently Asked Questions',
    faq: (r: string) => [
      [`Do you come to all hotels in ${r}?`, `Yes! We visit every hotel in ${r} — just share your hotel name and room number on WhatsApp. WhatsApp: ${PHONE}`],
      ['Is the hotel visit free?', 'Yes, completely free — you only pay for the tailoring or repair work itself.'],
      ['How fast is the service?', 'Most repairs and hemming are completed within 24–48 hours, some same-day.'],
      ['Do you speak English?', `Yes, our team speaks English, Russian, German and Turkish. WhatsApp: ${PHONE}`],
    ],
    ctaH: (r: string) => `Book Your ${r} Hotel Tailor Now`, ctaSub: 'Share your hotel name — booked within 30 minutes',
    waBtn: 'WhatsApp — Share Hotel Name', related: 'Other Hotel Districts', allDistricts: '← All Antalya Districts',
  },
  ru: {
    tag: (r: string) => `🚗 Выездной портной · Отельная зона ${r}`,
    h1a: 'Портной в отеле', h1b: (r: string) => `${r}`,
    heroDesc: (r: string, blurb: string) => `${blurb} Выездной портной Terzi Can приедет прямо в ваш отель в районе ${r} — снятие мерок, пошив, подгонка, глажка и химчистка с доставкой в номер.`,
    waShare: 'Отправить название отеля →', callBtn: PHONE,
    flags: [['🇷🇺', 'Приедем в ваш отель'], ['🇬🇧', 'We come to your hotel'], ['🇩🇪', 'Wir kommen zu Ihnen'], ['🇹🇷', 'Otele geliyoruz']],
    aboutH: (r: string) => `Об отельном районе ${r}`, travelLabel: 'Время в пути:',
    hotelsH: (r: string) => `Отели в районе ${r}`, hotelsSub: 'Мы можем приехать в любой отель этого района — просто напишите название отеля, и мы подтвердим.',
    otherHotels: '+ все остальные отели этого района. Просто напишите название отеля в WhatsApp.',
    howH: 'Как это работает', howSub: 'Сервис портного прямо в ваш номер за 4 шага',
    steps: [
      ['📍', 'Отель и номер', `Отправьте название отеля и номер комнаты на ${PHONE}`],
      ['📞', 'Запись за 30 минут', 'Мы согласуем удобное время'],
      ['✂️', 'Снятие мерок на месте', 'Портной приезжает в отель, снимает мерки и забирает вещь'],
      ['🚗', 'Доставка за 24–48ч', 'Готовая вещь доставляется обратно в номер'],
    ],
    servicesH: 'Пошив, ремонт и глажка', servicesSub: 'Полный цикл услуг — всё делается в мастерской, доставка в отель',
    services: [
      ['✂️', 'Подгонка и укорачивание', 'Брюки, платья, костюмы — точная подгонка по фигуре'],
      ['🔧', 'Молнии и ремонт', 'Замена молнии, разрывы, пуговицы'],
      ['👗', 'Свадебная и вечерняя одежда', 'Деликатная подгонка для особых случаев'],
      ['🧺', 'Глажка и химчистка', 'Профессиональная паровая глажка и химчистка'],
    ],
    priceH: 'Цены', priceSub: 'Сам выезд в отель бесплатный — платите только за работу',
    priceRows: [['Выезд в отель', 'БЕСПЛАТНО'], ['Укорачивание', 'от ₺150'], ['Замена молнии', 'от ₺200'], ['Подгонка платья/костюма', 'от ₺200'], ['Подгонка свадебного платья', 'от ₺500'], ['Глажка (за вещь)', 'от ₺80'], ['Химчистка', 'от ₺300']],
    faqH: 'Часто задаваемые вопросы',
    faq: (r: string) => [
      [`Вы приезжаете во все отели ${r}?`, `Да! Мы приезжаем в каждый отель района ${r} — просто напишите название отеля и номер комнаты в WhatsApp. WhatsApp: ${PHONE}`],
      ['Выезд в отель бесплатный?', 'Да, полностью бесплатный — вы платите только за саму работу.'],
      ['Как быстро выполняется услуга?', 'Большинство работ по ремонту и подгонке выполняются за 24–48 часов, некоторые — в тот же день.'],
      ['Вы говорите по-русски?', `Да, наша команда говорит по-русски, английски, немецки и турецки. WhatsApp: ${PHONE}`],
    ],
    ctaH: (r: string) => `Вызвать портного в отель — ${r}`, ctaSub: 'Отправьте название отеля — запись за 30 минут',
    waBtn: 'WhatsApp — Отправить название отеля', related: 'Другие отельные районы', allDistricts: '← Все районы Антальи',
  },
  de: {
    tag: (r: string) => `🚗 Mobiler Schneider · Hotelzone ${r}`,
    h1a: 'Schneider im Hotel', h1b: (r: string) => `${r}`,
    heroDesc: (r: string, blurb: string) => `${blurb} Der mobile Schneider von Terzi Can kommt direkt zu Ihrem Hotel in ${r} — Maßnehmen, Schneidern, Änderungen, Bügeln und chemische Reinigung, geliefert zurück auf Ihr Zimmer.`,
    waShare: 'Hotelnamen senden →', callBtn: PHONE,
    flags: [['🇩🇪', 'Wir kommen zu Ihnen'], ['🇬🇧', 'We come to your hotel'], ['🇷🇺', 'Приедем в ваш отель'], ['🇹🇷', 'Otele geliyoruz']],
    aboutH: (r: string) => `Über den Hotelbezirk ${r}`, travelLabel: 'Anfahrtszeit:',
    hotelsH: (r: string) => `Hotels im Gebiet ${r}`, hotelsSub: 'Wir erreichen Sie in jedem Hotel dieses Bezirks — teilen Sie einfach Ihren Hotelnamen mit, wir bestätigen den Termin.',
    otherHotels: '+ alle anderen Hotels in diesem Bezirk. Teilen Sie einfach Ihren Hotelnamen per WhatsApp mit.',
    howH: 'So funktioniert es', howSub: 'Schneiderservice direkt auf Ihr Hotelzimmer in 4 Schritten',
    steps: [
      ['📍', 'Hotel & Zimmer angeben', `Senden Sie Hotelname und Zimmernummer an ${PHONE}`],
      ['📞', 'Termin in 30 Min', 'Wir bestätigen eine passende Zeit'],
      ['✂️', 'Maßnehmen vor Ort', 'Unser Schneider kommt ins Hotel, nimmt Maß und das Kleidungsstück mit'],
      ['🚗', 'Lieferung in 24–48 Std', 'Fertiges Kleidungsstück wird zurück auf Ihr Zimmer geliefert'],
    ],
    servicesH: 'Schneiderei, Reparatur & Bügelservice', servicesSub: 'Voller Service — alles in der Werkstatt erledigt, Lieferung ins Hotel',
    services: [
      ['✂️', 'Kürzen & Änderungen', 'Hosen, Kleider, Anzüge — präzise Passform-Anpassungen'],
      ['🔧', 'Reißverschluss & Reparatur', 'Reißverschluss ersetzen, Risse, Knöpfe'],
      ['👗', 'Braut- & Abendkleidung', 'Behutsame Änderungen für besondere Anlässe'],
      ['🧺', 'Bügeln & Reinigung', 'Professionelles Dampfbügeln und chemische Reinigung'],
    ],
    priceH: 'Preise', priceSub: 'Der Hotelbesuch selbst ist kostenlos — Sie zahlen nur für die Arbeit',
    priceRows: [['Hotelbesuch', 'KOSTENLOS'], ['Kürzen', 'ab ₺150'], ['Reißverschluss ersetzen', 'ab ₺200'], ['Kleid-/Anzugänderung', 'ab ₺200'], ['Brautkleid ändern', 'ab ₺500'], ['Bügeln (pro Stück)', 'ab ₺80'], ['Chemische Reinigung', 'ab ₺300']],
    faqH: 'Häufig gestellte Fragen',
    faq: (r: string) => [
      [`Kommen Sie zu allen Hotels in ${r}?`, `Ja! Wir besuchen jedes Hotel in ${r} — teilen Sie einfach Hotelname und Zimmernummer per WhatsApp mit. WhatsApp: ${PHONE}`],
      ['Ist der Hotelbesuch kostenlos?', 'Ja, völlig kostenlos — Sie zahlen nur für die eigentliche Schneiderarbeit.'],
      ['Wie schnell ist der Service?', 'Die meisten Reparaturen und Kürzungen werden innerhalb von 24–48 Stunden erledigt, manche am selben Tag.'],
      ['Sprechen Sie Deutsch?', `Ja, unser Team spricht Deutsch, Englisch, Russisch und Türkisch. WhatsApp: ${PHONE}`],
    ],
    ctaH: (r: string) => `Jetzt Schneider ins Hotel buchen — ${r}`, ctaSub: 'Hotelnamen senden — Termin in 30 Minuten',
    waBtn: 'WhatsApp — Hotelnamen senden', related: 'Andere Hotelbezirke', allDistricts: '← Alle Bezirke von Antalya',
  },
};

export default function OtelBolgeSayfasi({ lang, region, allRegions }: { lang: Lang; region: OtelBolgesi; allRegions: OtelBolgesi[] }) {
  const t = T[lang];
  const waMsg = lang === 'ru' ? 'Здравствуйте, я в отеле в районе ' + region.name + '. Мой отель: '
    : lang === 'de' ? 'Hallo, ich bin in einem Hotel in ' + region.name + '. Mein Hotel: '
    : 'Hello, I am at a hotel in ' + region.name + '. My hotel: ';
  const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(waMsg)}`;

  // EKLEME (2026-09-19): FAQPage JSON-LD şeması — daha önce hiçbir dilde yoktu.
  // FAQ içeriği ekranda <details> olarak görünüyordu ama makine tarafından
  // okunabilir bir işaretleme taşımıyordu. AI cevap motorları (ChatGPT,
  // Perplexity, Google AI Overview) soru-cevap içeriğini en güvenilir şekilde
  // FAQPage schema üzerinden alıntılıyor — bu olmadan sayfa "önerilmeye" aday
  // bile olamıyordu. t.faq() zaten her dil için var olan veriden üretiliyor,
  // yani bu tek değişiklik en/de/ru üçünü de otomatik kapsıyor.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq(region.name).map(([q, a]: string[]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <main style={{ fontFamily: 'system-ui,sans-serif', background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section style={{ background: 'linear-gradient(135deg,#1C1814 0%,#2E2820 100%)', padding: '5rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: '.68rem', letterSpacing: '.3em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>{t.tag(region.name)}</div>
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: '1.2rem' }}>
            {t.h1a}<br /><span style={{ color: '#D4B07A', fontStyle: 'italic' }}>{t.h1b(region.name)}</span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.8, maxWidth: 620, marginBottom: '1.5rem' }}>
            {t.heroDesc(region.name, region.blurb[lang])}
          </p>
          <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {t.flags.map(([f, txt]: string[]) => (
              <span key={f} style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.65)', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', padding: '.3rem .8rem', borderRadius: 2 }}>{f} {txt}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ background: '#B8975A', color: '#fff', padding: '1rem 2.2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.88rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>💬 {t.waShare}</a>
            <a href={`tel:${PHONE_E164}`} style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '1rem 1.8rem', textDecoration: 'none', fontSize: '.88rem' }}>📞 {t.callBtn}</a>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: '#1C1814', marginBottom: '.7rem' }}>{t.aboutH(region.name)}</h2>
          <p style={{ color: '#7A6E62', fontSize: '.92rem', lineHeight: 1.8, marginBottom: '.8rem' }}>{region.blurb[lang]}</p>
          <p style={{ fontSize: '.85rem', color: '#B8975A', fontWeight: 700 }}>🚗 {t.travelLabel} {region.travelTime[lang]}</p>
        </div>
      </section>

      <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', color: '#1C1814', marginBottom: '.4rem' }}>{t.hotelsH(region.name)}</h2>
          <p style={{ color: '#7A6E62', fontSize: '.85rem', marginBottom: '1.5rem' }}>{t.hotelsSub}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1rem' }}>
            {region.hotels.map((h) => (<span key={h} style={{ fontSize: '.77rem', color: '#3A3028', background: '#fff', border: '1px solid rgba(184,151,90,.2)', padding: '.3rem .75rem', borderRadius: 2 }}>{h}</span>))}
          </div>
          <p style={{ fontSize: '.8rem', color: '#7A6E62', fontStyle: 'italic' }}>{t.otherHotels}</p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', color: '#1C1814', marginBottom: '.3rem' }}>{t.howH}</h2>
          <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>{t.howSub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 1, background: '#E8E0D2' }}>
            {t.steps.map(([ic, ti, d]: string[], i: number) => (
              <div key={i} style={{ background: '#FAF7F2', padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '.6rem' }}>{ic}</div>
                <div style={{ fontFamily: 'Georgia,serif', fontSize: '.95rem', color: '#B8975A', marginBottom: '.3rem' }}>{ti}</div>
                <div style={{ fontSize: '.77rem', color: '#7A6E62', lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', color: '#1C1814', marginBottom: '.3rem' }}>{t.servicesH}</h2>
          <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>{t.servicesSub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem' }}>
            {t.services.map(([ic, ti, d]: string[]) => (
              <div key={ti} style={{ background: '#fff', border: '1px solid rgba(184,151,90,.15)', borderRadius: 2, padding: '1.4rem', borderLeft: '3px solid #B8975A' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '.5rem' }}>{ic}</div>
                <strong style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#1C1814', display: 'block', marginBottom: '.4rem' }}>{ti}</strong>
                <p style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', color: '#1C1814', marginBottom: '.3rem' }}>{t.priceH}</h2>
          <p style={{ color: '#7A6E62', fontSize: '.85rem', marginBottom: '1.5rem' }}>{t.priceSub}</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#F2EDE4' }}>
            <tbody>
              {t.priceRows.map(([s, p]: string[], i: number) => (
                <tr key={s} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i % 2 ? 'rgba(184,151,90,.04)' : 'transparent' }}>
                  <td style={{ padding: '.85rem .8rem', fontSize: '.88rem' }}>{s}</td>
                  <td style={{ padding: '.85rem .8rem', fontSize: '.88rem', color: p.match(/FREE|БЕСПЛАТНО|KOSTENLOS/) ? '#22c55e' : '#8A6E3E', fontWeight: 600, textAlign: 'right' }}>{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', color: '#1C1814', marginBottom: '1.5rem' }}>{t.faqH}</h2>
          {t.faq(region.name).map(([q, a]: string[]) => (
            <details key={q} style={{ borderBottom: '1px solid rgba(184,151,90,.15)', padding: '1rem 0' }}>
              <summary style={{ cursor: 'pointer', fontSize: '.9rem', fontWeight: 500, color: '#1C1814', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>{q} <span style={{ color: '#B8975A', fontWeight: 300 }}>+</span></summary>
              <p style={{ marginTop: '.7rem', fontSize: '.82rem', color: '#7A6E62', lineHeight: 1.8 }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section style={{ background: '#B8975A', padding: '3.5rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#fff', marginBottom: '.7rem' }}>{t.ctaH(region.name)}</h2>
        <p style={{ color: 'rgba(255,255,255,.85)', marginBottom: '1.6rem', fontSize: '.9rem' }}>{t.ctaSub}</p>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ background: '#25d366', color: '#fff', padding: '1rem 2.3rem', fontWeight: 700, textDecoration: 'none', fontSize: '.9rem', borderRadius: 4, display: 'inline-block' }}>💬 {t.waBtn}</a>
      </section>

      <section style={{ padding: '2rem 1.5rem', background: '#F2EDE4' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          <a href={`/${lang}/hotel-tailor-antalya`} style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: 2, background: '#fff' }}>{t.allDistricts}</a>
          {allRegions.filter(r => r.slug !== region.slug).map(r => (
            <a key={r.slug} href={`/${lang}/hotel-tailor-antalya/${r.slug}`} style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: 2, background: '#fff' }}>{r.name}</a>
          ))}
        </div>
      </section>
    </main>
  );
}
