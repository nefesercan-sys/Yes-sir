import Link from 'next/link';
import BusinessSchema from '@/components/BusinessSchema';
import ReviewsBlock from '@/components/ReviewsBlock';
import QuickActionBanner from '@/components/QuickActionBanner';
import { FAQ_TR } from '@/lib/faq-merkez-tr';
import { FAQ_INTL } from '@/lib/faq-merkez-intl';
import { PHONE_DISPLAY, PHONE_E164, waUrl } from '@/lib/business';

// Sık sorulan sorular merkezi: görünen SSS = FAQPage şeması (aynı dizi), kısa cevap kutusu, işlem/fiyat/süre tablosu,
// tüm hizmet sayfalarına iç link. 4 dil: tr, en, ru, de.
export type FaqHubLang = 'tr' | 'en' | 'ru' | 'de';

export const FAQ_HUB_PATH: Record<FaqHubLang, string> = {
  tr: '/terzi/sik-sorulan-sorular',
  en: '/en/tailor-faq-antalya',
  ru: '/ru/chasto-zadavaemye-voprosy-portnoy-antalya',
  de: '/de/haeufige-fragen-schneider-antalya',
};

const GREEN = '#2d8c6e', INK = '#1f2a24', TEXT = '#3b4a42', MUTED = '#6b7a72', SOFT = '#f4faf7', BORDER = '#e3ece7';
const FONT = "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

type Row = readonly [string, string, string];
interface L10n {
  home: string; homePath: string; crumb: string; h1: string; kisaLabel: string; kisa: string; waMsg: string;
  tableH: string; cols: [string, string, string]; rows: Row[]; tableNote: string;
  faqH: string; linksH: string; links: [string, string][]; ctaH: string; ctaP: string; wa: string;
  title: string; desc: string;
}

export const FAQ_HUB: Record<FaqHubLang, L10n> = {
  tr: {
    home: 'Antalya Terzi', homePath: '/terzi', crumb: 'Sık Sorulan Sorular',
    h1: 'Antalya Terzi Sık Sorulan Sorular: Fiyat, Süre, Otel Servisi',
    kisaLabel: 'Kısa cevap',
    kisa: "Terzi Can, Antalya Konyaaltı'nda 2006'dan beri bay ve bayan giysi tamiri, tadilatı ve özel dikim yapar. Paça, bel, kol ve boy kısaltma-daraltma ₺200'den, fermuar değişimi ₺300'den, deri tadilatı ₺400'den başlar (KDV dahil değil). Normal işler aynı gün hazırdır; evlere ve otellere alım-teslim yapılır. Fotoğraf at, fiyat al.",
    waMsg: 'Merhaba, kıyafetimin fotoğrafını gönderiyorum. Fiyat alabilir miyim?',
    tableH: 'İşlem, başlangıç fiyatı ve süre', cols: ['İşlem', 'Başlangıç fiyatı', 'Süre'],
    rows: [
      ['Paça, bel, kol ve boy kısaltma-daraltma', "₺200'den (≈ €10)", 'Aynı gün'],
      ['Pantolon fermuarı değişimi', "₺300'den (≈ €15)", 'Aynı gün'],
      ['Mont, kaban, palto ve deri fermuarı değişimi', "₺300'den (≈ €20)", 'Aynı gün'],
      ['Kot (paça, daraltma, ceket, etek)', "Yaklaşık ₺200'den", 'Aynı gün'],
      ['Kaban ve palto kısaltma-daraltma', "₺200'den", 'Aynı gün'],
      ['Deri ceket, pantolon, yelek tadilatı', "₺400'den (≈ €20)", 'İşin durumuna göre'],
      ['Gelinlik ve abiye tadilatı', 'Fotoğrafa veya işin detayına göre', 'İşin durumuna göre'],
      ['Dikim (elbise, etek, pantolon, takım, özel dikim)', 'Fotoğrafa ve istediğiniz modele göre', 'Modele göre'],
    ],
    tableNote: 'Fiyatlara KDV dahil değildir. Acil işler işin durumuna göre 1–2 saatte hazırlanır. Ödeme tüm para birimleriyle, nakit veya kartla yapılır.',
    faqH: 'Sık sorulan sorular', linksH: 'Hizmet sayfaları',
    links: [['/terzi/paca-kisaltma-antalya', 'Paça kısaltma'], ['/terzi/fermuar-degisimi', 'Fermuar değişimi'], ['/terzi/mont-tamiri-tadilati-antalya', 'Mont tamiri'], ['/terzi/kaban-palto-tadilati-antalya', 'Kaban ve palto'], ['/terzi/yelek-tamiri-tadilati-antalya', 'Yelek'], ['/terzi/deri-ceket-tadilati-antalya', 'Deri tadilatı'], ['/terzi/kot-pantolon-paca-kisaltma-antalya', 'Kot paça'], ['/terzi/eve-gelen-terzi-antalya', 'Eve ve otele gelen terzi'], ['/terzi/hizmet', 'Tüm hizmetler'], ['/terzi/iletisim', 'İletişim']],
    ctaH: 'Fotoğraf at, fiyat al', ctaP: 'Her gün 08:00–23:00 WhatsApp’tan yazın; fiyatı ve teslim süresini bildirelim.', wa: "WhatsApp'tan Yaz",
    title: 'Antalya Terzi Sık Sorulan Sorular · Fiyat ve Süre',
    desc: "Antalya terzi fiyatları, süreler, otele gelen terzi, gelinlik tadilatı, ödeme ve KDV hakkında 40+ soru-cevap. Fotoğraf at, fiyat al.",
  },
  en: {
    home: 'Antalya Tailor', homePath: '/terzi', crumb: 'FAQ',
    h1: 'Antalya Tailor FAQ: Prices, Timing, Hotel Service',
    kisaLabel: 'Short answer',
    kisa: 'Terzi Can has altered, repaired and made clothes in Konyaaltı, Antalya since 2006. Hemming and waist, sleeve and length alterations start from ₺200 (about €10), zipper replacement from ₺300, leather from ₺400, excluding VAT. Regular jobs are ready the same day; pick-up and delivery to homes and hotels are available. Send a photo, get a price.',
    waMsg: 'Hello, I am sending a photo of my garment. Can I get a price?',
    tableH: 'Services, starting prices and timing', cols: ['Service', 'Starting price', 'Timing'],
    rows: [
      ['Hemming, waist, sleeve and length alterations', 'From ₺200 (about €10)', 'Same day'],
      ['Trouser zipper replacement', 'From ₺300 (about €15)', 'Same day'],
      ['Coat, jacket and leather zipper replacement', 'From ₺300 (about €20)', 'Same day'],
      ['Jeans (hem, narrowing, jacket, skirt)', 'From about ₺200', 'Same day'],
      ['Coat shortening and taking-in', 'From ₺200', 'Same day'],
      ['Leather jacket, trousers, vest', 'From ₺400 (about €20)', 'Depends on the job'],
      ['Wedding and evening dress alteration', 'By photo or job detail', 'Depending on the job'],
      ['Sewing (dresses, skirts, trousers, suits, custom)', 'By photo and the model you want', 'Depends on the model'],
    ],
    tableNote: 'Prices exclude VAT. Urgent jobs take 1–2 hours depending on the job. Payment in any currency, cash or card.',
    faqH: 'Frequently asked questions', linksH: 'Service pages',
    links: [['/en/tailor-services', 'All tailor services'], ['/en/hotel-tailor-antalya', 'Hotel tailor Antalya'], ['/en/how-hotel-tailor-works-antalya', 'How the hotel tailor works'], ['/en/urgent-clothing-repair-antalya', 'Urgent clothing repair'], ['/en/event-outfit-alteration-antalya', 'Event outfit alteration'], ['/en/contact-tailor-antalya', 'Contact'], ['/online-tailor-service', 'Online tailor service']],
    ctaH: 'Send a photo, get a price', ctaP: 'Message us on WhatsApp every day 08:00–23:00 and we will confirm the price and timing.', wa: 'Message on WhatsApp',
    title: 'Antalya Tailor FAQ · Prices, Timing, Hotel Service',
    desc: 'Antalya tailor prices, timing, hotel tailor service, wedding dress alteration, payment and VAT: 20 answers. Send a photo, get a price.',
  },
  ru: {
    home: 'Портной Анталья', homePath: '/terzi', crumb: 'Вопросы и ответы',
    h1: 'Портной в Анталье: частые вопросы, цены, сроки, выезд в отель',
    kisaLabel: 'Коротко',
    kisa: 'Terzi Can с 2006 года ремонтирует, переделывает и шьёт одежду в Коньяалты (Анталья). Подгонка длины, талии и рукавов — от ₺200 (около €10), замена молнии — от ₺300, кожа — от ₺400, без НДС. Обычная работа готова в тот же день; забор и доставка по домам и отелям доступны. Отправьте фото — назовём цену.',
    waMsg: 'Здравствуйте, отправляю фото вещи. Подскажите цену?',
    tableH: 'Услуги, цены от и сроки', cols: ['Услуга', 'Цена от', 'Срок'],
    rows: [
      ['Подгонка длины, талии, рукавов', 'От ₺200 (около €10)', 'В тот же день'],
      ['Замена молнии на брюках', 'От ₺300 (около €15)', 'В тот же день'],
      ['Замена молнии на пальто, куртке, коже', 'От ₺300 (около €20)', 'В тот же день'],
      ['Джинсы (низ, ушивание, куртка, юбка)', 'От примерно ₺200', 'В тот же день'],
      ['Укорачивание и ушивание пальто', 'От ₺200', 'В тот же день'],
      ['Кожаная куртка, брюки, жилет', 'От ₺400 (около €20)', 'По работе'],
      ['Переделка свадебных и вечерних платьев', 'По фото или деталям работы', 'Зависит от работы'],
      ['Пошив (платья, юбки, брюки, костюмы, на заказ)', 'По фото и желаемой модели', 'По модели'],
    ],
    tableNote: 'Цены без НДС. Срочные работы — за 1–2 часа в зависимости от работы. Оплата в любой валюте, наличными или картой.',
    faqH: 'Частые вопросы', linksH: 'Страницы услуг',
    links: [['/ru/uslugi-portnogo', 'Все услуги портного'], ['/ru/vyezdnoy-portnoy-antalya', 'Выездной портной в отель'], ['/ru/kak-rabotaet-vyezdnoy-portnoy-antalya', 'Как это работает'], ['/ru/srochnyy-remont-odezhdy-antalya', 'Срочный ремонт одежды'], ['/ru/podgonka-naryada-dlya-sobytiya-antalya', 'Подгонка наряда'], ['/ru/kontakty-portnoy-antalya', 'Контакты'], ['/ru/atelie-antalya', 'Ателье Анталья']],
    ctaH: 'Отправьте фото — узнайте цену', ctaP: 'Пишите в WhatsApp ежедневно 08:00–23:00 — назовём цену и срок.', wa: 'Написать в WhatsApp',
    title: 'Портной в Анталье: частые вопросы, цены, сроки',
    desc: 'Цены портного в Анталье, сроки, выезд в отель, переделка свадебных платьев, оплата и НДС: 20 ответов. Отправьте фото — назовём цену.',
  },
  de: {
    home: 'Schneider Antalya', homePath: '/terzi', crumb: 'Häufige Fragen',
    h1: 'Schneider Antalya: Häufige Fragen, Preise, Dauer, Hotelservice',
    kisaLabel: 'Kurz gesagt',
    kisa: 'Terzi Can ändert, repariert und näht seit 2006 Kleidung in Konyaaltı, Antalya. Kürzen sowie Taille-, Ärmel- und Längenänderungen ab ₺200 (ca. €10), Reißverschlusswechsel ab ₺300, Leder ab ₺400, ohne MwSt. Normale Arbeiten sind am selben Tag fertig; Abholung und Lieferung zu Hause und ins Hotel sind möglich. Foto senden, Preis erhalten.',
    waMsg: 'Guten Tag, ich sende ein Foto meines Kleidungsstücks. Können Sie mir einen Preis nennen?',
    tableH: 'Leistungen, Preise ab und Dauer', cols: ['Leistung', 'Preis ab', 'Dauer'],
    rows: [
      ['Kürzen sowie Taille, Ärmel und Länge ändern', 'Ab ₺200 (ca. €10)', 'Am selben Tag'],
      ['Reißverschluss bei Hosen wechseln', 'Ab ₺300 (ca. €15)', 'Am selben Tag'],
      ['Reißverschluss bei Mantel, Jacke, Leder wechseln', 'Ab ₺300 (ca. €20)', 'Am selben Tag'],
      ['Jeans (Saum, enger machen, Jacke, Rock)', 'Ab ca. ₺200', 'Am selben Tag'],
      ['Mantel kürzen und enger machen', 'Ab ₺200', 'Am selben Tag'],
      ['Lederjacke, -hose, -weste', 'Ab ₺400 (ca. €20)', 'Je nach Arbeit'],
      ['Änderung von Braut- und Abendkleidern', 'Nach Foto oder Arbeitsumfang', 'Je nach Arbeit'],
      ['Maßanfertigung (Kleider, Röcke, Hosen, Anzüge, Einzelstücke)', 'Nach Foto und gewünschtem Modell', 'Je nach Modell'],
    ],
    tableNote: 'Preise ohne MwSt. Dringende Arbeiten dauern je nach Arbeit 1–2 Stunden. Zahlung in jeder Währung, bar oder mit Karte.',
    faqH: 'Häufige Fragen', linksH: 'Leistungsseiten',
    links: [['/de/schneider-leistungen', 'Alle Schneiderleistungen'], ['/de/schneider-service-hotel-antalya', 'Schneider-Service im Hotel'], ['/de/so-funktioniert-hotel-schneider-antalya', 'So funktioniert es'], ['/de/dringende-kleiderreparatur-antalya', 'Dringende Reparatur'], ['/de/festkleidung-aendern-antalya', 'Festkleidung ändern'], ['/de/kontakt-schneider-antalya', 'Kontakt'], ['/de/online-schneiderservice-antalya', 'Online-Schneiderservice']],
    ctaH: 'Foto senden, Preis erhalten', ctaP: 'Schreiben Sie täglich 08:00–23:00 per WhatsApp; wir nennen Preis und Dauer.', wa: 'Per WhatsApp schreiben',
    title: 'Schneider Antalya: Häufige Fragen, Preise, Dauer',
    desc: 'Schneider-Preise in Antalya, Dauer, Hotelservice, Brautkleid-Änderung, Zahlung und MwSt.: 20 Antworten. Foto senden, Preis erhalten.',
  },
};

export function faqFor(lang: FaqHubLang): ReadonlyArray<readonly [string, string]> {
  return lang === 'tr' ? FAQ_TR : FAQ_INTL[lang];
}

export default function FaqHub({ lang }: { lang: FaqHubLang }) {
  const t = FAQ_HUB[lang];
  const faq = faqFor(lang);
  const path = FAQ_HUB_PATH[lang];
  const wa = waUrl(t.waMsg);
  const h2 = { fontSize: 'clamp(1.3rem,3vw,1.7rem)', color: INK, margin: '0 0 .7rem', fontWeight: 800 } as const;
  const wrap = { maxWidth: 960, margin: '0 auto' } as const;
  const btn = { display: 'inline-block', background: GREEN, color: '#fff', padding: '.85rem 1.5rem', borderRadius: 10, fontWeight: 700, textDecoration: 'none' } as const;
  const btnLine = { display: 'inline-block', background: '#fff', color: INK, padding: '.85rem 1.3rem', borderRadius: 10, fontWeight: 600, textDecoration: 'none', border: `1px solid ${BORDER}` } as const;
  return (
    <main style={{ fontFamily: FONT, color: TEXT, background: '#fff', lineHeight: 1.65 }}>
      <BusinessSchema
        path={path} name={t.h1} description={t.desc} lang={lang} lastModified="2026-11-06"
        breadcrumbs={[{ name: t.home, path: t.homePath }, { name: t.crumb, path }]}
        faq={faq.map(([q, a]) => ({ q, a }))}
      />
      <QuickActionBanner lang={lang} />
      <section style={{ background: SOFT, borderBottom: `1px solid ${BORDER}`, padding: '2.2rem 1.25rem 2.4rem' }}>
        <div style={wrap}>
          <nav aria-label="breadcrumb" style={{ fontSize: '.8rem', color: MUTED, marginBottom: '1rem' }}>
            <Link href={t.homePath} style={{ color: MUTED, textDecoration: 'none' }}>{t.home}</Link>{' › '}<span style={{ color: INK }}>{t.crumb}</span>
          </nav>
          <h1 style={{ fontSize: 'clamp(1.8rem,5vw,2.6rem)', lineHeight: 1.15, color: INK, margin: '0 0 1rem', fontWeight: 800 }}>{t.h1}</h1>
          <p style={{ fontSize: '1.05rem', maxWidth: 760, margin: '0 0 1.3rem', color: INK }}><strong>{t.kisaLabel}:</strong> {t.kisa}</p>
          <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
            <a href={wa} target="_blank" rel="noopener noreferrer" style={btn}>💬 {t.wa}</a>
            <a href={`tel:${PHONE_E164}`} style={btnLine}>📞 {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>
      <section style={{ padding: '2.4rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>{t.tableH}</h2>
          <div style={{ overflowX: 'auto', border: `1px solid ${BORDER}`, borderRadius: 12 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.94rem' }}>
              <thead>
                <tr style={{ background: SOFT, textAlign: 'left' }}>{t.cols.map((c) => <th key={c} style={{ padding: '.75rem 1rem', color: INK }}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {t.rows.map(([a, b, c]) => (
                  <tr key={a} style={{ borderTop: `1px solid ${BORDER}` }}>
                    <td style={{ padding: '.7rem 1rem' }}>{a}</td>
                    <td style={{ padding: '.7rem 1rem', color: GREEN, fontWeight: 700 }}>{b}</td>
                    <td style={{ padding: '.7rem 1rem' }}>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ margin: '.7rem 0 0', fontSize: '.88rem', color: MUTED }}>{t.tableNote}</p>
        </div>
      </section>
      <section style={{ padding: '2.4rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>{t.faqH}</h2>
          <div style={{ display: 'grid', gap: '.6rem' }}>
            {faq.map(([q, a]) => (
              <details key={q} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '.9rem 1.1rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700, color: INK }}>{q}</summary>
                <p style={{ margin: '.6rem 0 0', fontSize: '.95rem' }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '2.4rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>{t.linksH}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
            {t.links.map(([href, label]) => (
              <Link key={href} href={href} style={{ border: `1px solid ${BORDER}`, borderRadius: 10, padding: '.55rem 1rem', fontSize: '.9rem', color: GREEN, fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '2.4rem 1.25rem 3rem' }}>
        <div style={{ ...wrap, background: SOFT, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '1.6rem 1.3rem', textAlign: 'center' }}>
          <h2 style={{ ...h2, margin: '0 0 .4rem' }}>{t.ctaH}</h2>
          <p style={{ margin: '0 0 1rem' }}>{t.ctaP}</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" style={btn}>💬 {t.wa}</a>
        </div>
      </section>
      <ReviewsBlock lang={lang} schema />
    </main>
  );
}
