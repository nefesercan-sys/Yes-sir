// Keten/pamuk özel dikim (Terzi Can) ve Anavera Tekstil için 4 dilli tanıtım sayfaları.
// İçerik yalnızca site sahibinin doğruladığı bilgileri içerir: fiyat, stok, organik/çevre dostu,
// kampanya veya kapıda ödeme iddiası YOKTUR. Tüm ürünler siparişe özel dikilir.
export type Lang = 'tr' | 'en' | 'ru' | 'de';
import { TATIL_URLS, TATIL_CONTENT, TATIL_NEXT, type TatilTopic } from './tatil-sayfalari';
export type { TatilTopic };
export type Topic = 'keten' | 'tekstil' | 'promo' | TatilTopic;
export const isTatil = (t: Topic): t is TatilTopic => t === 'acil' || t === 'otel' || t === 'etkinlik';
export const RELATED = (t: Topic): Topic => (isTatil(t) ? TATIL_NEXT[t] : t === 'keten' || t === 'promo' ? 'tekstil' : 'keten');
export const LANGS: Lang[] = ['tr', 'en', 'ru', 'de'];
import { SITE_URL, WA_NUMBER as WA_NUM } from '@/lib/business';
export const BASE = SITE_URL;
export const WA_NUMBER = WA_NUM;

export const URLS: Record<Topic, Record<Lang, string>> = {
  ...TATIL_URLS,
  keten: {
    tr: '/dogal-keten-pamuk-giyim',
    en: '/en/linen-clothing-custom-made-antalya',
    ru: '/ru/lnyanaya-odezhda-poshiv-antalya',
    de: '/de/leinenkleidung-massanfertigung-antalya',
  },
  tekstil: {
    tr: '/tekstil-antalya',
    en: '/en/textile-manufacturer-antalya',
    ru: '/ru/tekstilnoe-proizvodstvo-antalya',
    de: '/de/textilhersteller-antalya',
  },
  // Promosyon tekstili ve baskılı bez çanta rehberi: bu 4 dilin yanında ES/FR/PL/UK/NL/AR karşılıkları lib/intl-promo.ts içindedir.
  promo: {
    tr: '/promosyon-tekstil-bez-canta-antalya',
    en: '/en/promotional-textiles-tote-bags-antalya',
    ru: '/ru/reklamnyy-tekstil-sumki-antalya',
    de: '/de/werbetextilien-stoffbeutel-antalya',
  },
};

export const SERVICE_URL: Record<Lang, string> = {
  tr: '/terzi',
  en: '/en/hotel-tailor-antalya',
  ru: '/ru/atelie-antalya',
  de: '/de/schneider-service-hotel-antalya',
};

export const LOCALE: Record<Lang, string> = { tr: 'tr_TR', en: 'en_US', ru: 'ru_RU', de: 'de_DE' };
export const HREFLANG: Record<Lang, string> = { tr: 'tr-TR', en: 'en', ru: 'ru', de: 'de' };

export const UI: Record<Lang, { home: string; faq: string; examples: string; other: string; service: string; foot: string; langs: string; note: string }> = {
  tr: { home: 'SwapHubs', faq: 'Sık Sorulan Sorular', examples: 'Özel dikim örneklerimiz', other: 'İlgili sayfa', service: 'Antalya terzi ve tadilat hizmeti', foot: 'Terzi Can · Konyaaltı, Antalya', langs: 'Diller', note: 'Tüm ürünler siparişe özel dikilir; hazır stok satışı yapılmaz. Süre ve ücret modele ve kumaşa göre belirlenir.' },
  en: { home: 'SwapHubs', faq: 'Frequently asked questions', examples: 'Examples of our made-to-measure work', other: 'Related page', service: 'Tailoring and alterations in Antalya', foot: 'Terzi Can · Konyaaltı, Antalya, Türkiye', langs: 'Languages', note: 'Everything is made to order; we do not sell ready-made stock. Time and price depend on the design and fabric.' },
  ru: { home: 'SwapHubs', faq: 'Частые вопросы', examples: 'Примеры нашего индивидуального пошива', other: 'Похожая страница', service: 'Ателье и ремонт одежды в Анталье', foot: 'Terzi Can · Коняалты, Анталья, Турция', langs: 'Языки', note: 'Всё шьётся на заказ; готовых изделий на складе нет. Сроки и стоимость зависят от модели и ткани.' },
  de: { home: 'SwapHubs', faq: 'Häufige Fragen', examples: 'Beispiele unserer Maßanfertigungen', other: 'Verwandte Seite', service: 'Schneider und Änderungen in Antalya', foot: 'Terzi Can · Konyaaltı, Antalya, Türkei', langs: 'Sprachen', note: 'Alles wird auf Bestellung gefertigt; wir verkaufen keine fertige Lagerware. Dauer und Preis hängen von Modell und Stoff ab.' },
};

export const GALLERY = [
  { f: 'linen-maxi-dress-hadrians-gate.jpg', w: 938, h: 768, alt: { tr: 'Kahverengi işlemeli yakalı keten maxi elbise, özel dikim örneği', en: 'Linen maxi dress with embroidered brown collar, made-to-measure example', ru: 'Льняное макси-платье с вышитым коричневым воротником, пример индивидуального пошива', de: 'Maxikleid aus Leinen mit brauner Stickereikante, Maßanfertigung' } },
  { f: 'linen-dress-slit-hadrians-gate-antalya.jpg', w: 720, h: 1290, alt: { tr: 'Yandan yırtmaçlı bej keten maxi elbise', en: 'Beige linen maxi dress with a side slit', ru: 'Бежевое льняное макси-платье с боковым разрезом', de: 'Beiges Leinen-Maxikleid mit seitlichem Schlitz' } },
  { f: 'linen-dress-white-garden.jpg', w: 760, h: 1018, alt: { tr: 'İnce askılı beyaz keten yazlık elbise', en: 'White linen summer dress with thin straps', ru: 'Белое льняное летнее платье на тонких бретелях', de: 'Weißes Leinen-Sommerkleid mit dünnen Trägern' } },
  { f: 'linen-shirt-man-tea-antalya.jpg', w: 1100, h: 600, alt: { tr: 'Açık mavi keten erkek gömlek', en: 'Light blue linen shirt for men', ru: 'Голубая льняная мужская рубашка', de: 'Hellblaues Leinenhemd für Herren' } },
  { f: 'linen-shirt-trousers-man-castle-antalya.jpg', w: 720, h: 1290, alt: { tr: 'Keten gömlek ve beyaz keten pantolon, erkek takım', en: 'Linen shirt and white linen trousers for men', ru: 'Льняная рубашка и белые льняные брюки, мужской комплект', de: 'Leinenhemd und weiße Leinenhose für Herren' } },
  { f: 'kids-linen-shirt-shorts-kaleici.jpg', w: 938, h: 768, alt: { tr: 'Hardal rengi keten gömlek ve şort, çocuk', en: 'Mustard linen shirt and shorts for kids', ru: 'Горчичная льняная рубашка и шорты для детей', de: 'Senffarbenes Leinenhemd mit Shorts für Kinder' } },
];
export const GALLERY_BASE = 'https://terzihizmeti.com.tr/linen/';

type Sec = { h: string; p?: string; ul?: string[] };
export type Page = {
  t: string; d: string; h1: string; badge: string; lead: string;
  secs: Sec[]; faq: [string, string][]; cta: string; wa: string; crumb: string;
  // İsteğe bağlı: sayfaya özel alt not ve alt bilgi (verilmezse UI.note / UI.foot kullanılır)
  note?: string; foot?: string;
};

export const CONTENT: Record<Topic, Record<Lang, Page>> = {
  ...TATIL_CONTENT,
  keten: {
    tr: {
      t: 'Keten Giyim Özel Dikim ve Seri Üretim | Terzi Can Antalya',
      d: 'Keten ve pamuktan kadın, erkek, çocuk giyim: özel dikim, model ve kalıp çıkarma, tek ve seri adet, fason üretim. Terzi Can, Konyaaltı Antalya.',
      h1: 'Keten ve Pamuk Giyim: Özel Dikim ve Seri Üretim',
      badge: 'Terzi Can · Konyaaltı, Antalya',
      lead: 'Kadın, erkek ve çocuk için keten ve pamuk kumaşlardan siparişe özel dikim. Tek adet de seri üretim de yapıyoruz; modeli birlikte belirliyoruz.',
      secs: [
        { h: 'Neler dikiyoruz?', ul: ['Keten elbise, gömlek, pantolon, ceket, şort ve etek', 'Kadın, erkek ve çocuk için özel dikim', 'Fotoğraftan veya örnek üründen model ve kalıp çıkarma', 'Tek adet ve seri adet dikim, fason üretim'] },
        { h: 'Neden keten?', p: 'Keten, hafif ve nefes alan bir kumaştır; sıcak yaz günlerinde ve tatilde rahat giyilir. Doğal olarak kırışır, bu da onun karakterinin bir parçasıdır.' },
        { h: 'Sipariş nasıl ilerler?', ul: ['WhatsApp\'tan modeli, fotoğrafı veya fikrinizi gönderirsiniz', 'Kumaş, model ve ölçüler birlikte netleştirilir', 'Dikim yapılır; süre ve ücret baştan konuşulur', 'Türkiye içi ve yurt dışı gönderim sipariş bazında ayarlanır'] },
      ],
      faq: [
        ['Hazır ürün satıyor musunuz?', 'Hayır. Tüm ürünler siparişe özel dikilir; hazır stok satışı yapmıyoruz.'],
        ['Fotoğraftan model dikebilir misiniz?', 'Evet, fotoğraf veya örnek üründen çalışabiliriz. Sonuç kumaşa ve detaylara göre değişir; önce görüşürüz.'],
        ['Yurt dışına gönderim yapıyor musunuz?', 'Gönderim sipariş bazında ayarlanır; Avrupa ve Rusya dahil yurt dışı için WhatsApp\'tan yazabilirsiniz.'],
        ['Fiyat ve süre nedir?', 'Modele, kumaşa ve adede göre değişir. Dikime başlamadan önce net olarak konuşuruz.'],
      ],
      cta: 'WhatsApp ile yazın', wa: 'Merhaba, keten giyim özel dikim hakkında bilgi almak istiyorum.', crumb: 'Keten ve Pamuk Giyim',
    },
    en: {
      t: 'Custom Linen Clothing Made in Antalya | Terzi Can',
      d: 'Made-to-measure linen and cotton clothing for women, men and kids: pattern making, single pieces, small series and contract sewing. Terzi Can, Antalya.',
      h1: 'Custom Linen Clothing in Antalya: Made to Measure and Small Series',
      badge: 'Terzi Can · Konyaaltı, Antalya',
      lead: 'Linen and cotton garments for women, men and children, made to order. We sew single pieces and small series, and agree on the design together.',
      secs: [
        { h: 'What we make', ul: ['Linen dresses, shirts, trousers, jackets, shorts and skirts', 'Made-to-measure for women, men and children', 'Pattern and model making from a photo or a sample garment', 'Single pieces, small series and contract (fason) sewing'] },
        { h: 'Why linen?', p: 'Linen is light and breathable, comfortable in hot summer weather and on holiday. It creases naturally, which is part of its character.' },
        { h: 'How an order works', ul: ['Send your idea, photo or sample by WhatsApp', 'We agree fabric, design and measurements together', 'We sew it; time and price are discussed up front', 'Delivery within Türkiye and abroad is arranged per order'] },
      ],
      faq: [
        ['Do you sell ready-made clothes?', 'No. Everything is made to order; we do not sell ready-made stock.'],
        ['Can you copy a design from a photo?', 'Yes, we can work from a photo or a sample garment. The result depends on fabric and details, so we discuss it first.'],
        ['Do you ship abroad?', 'Shipping is arranged per order. For Europe, Russia and other countries, write to us on WhatsApp.'],
        ['What are the price and turnaround?', 'They depend on the design, fabric and quantity. We agree them clearly before sewing starts.'],
      ],
      cta: 'Write on WhatsApp', wa: 'Hello, I would like information about custom linen clothing.', crumb: 'Custom linen clothing',
    },
    ru: {
      t: 'Льняная одежда на заказ в Анталье: индивидуальный пошив',
      d: 'Индивидуальный пошив одежды из льна и хлопка для женщин, мужчин и детей: выкройки, единичные изделия и партии. Terzi Can, Коняалты, Анталья.',
      h1: 'Льняная одежда на заказ в Анталье: индивидуальный пошив и партии',
      badge: 'Terzi Can · Коняалты, Анталья',
      lead: 'Шьём одежду из льна и хлопка для женщин, мужчин и детей на заказ. Делаем единичные изделия и небольшие партии, модель обсуждаем вместе.',
      secs: [
        { h: 'Что мы шьём', ul: ['Льняные платья, рубашки, брюки, жакеты, шорты и юбки', 'Индивидуальный пошив для женщин, мужчин и детей', 'Построение выкройки и модели по фото или образцу', 'Единичные изделия, небольшие партии, пошив по контракту (фасон)'] },
        { h: 'Почему лён?', p: 'Лён лёгкий и дышащий, удобен в жару и в отпуске. Он естественно мнётся, и это часть его характера.' },
        { h: 'Как проходит заказ', ul: ['Присылаете идею, фото или образец в WhatsApp', 'Вместе уточняем ткань, модель и мерки', 'Шьём; сроки и стоимость обсуждаем заранее', 'Доставка по Турции и за границу согласуется для каждого заказа'] },
      ],
      faq: [
        ['Вы продаёте готовую одежду?', 'Нет. Всё шьётся на заказ; готовых изделий на складе мы не продаём.'],
        ['Можно ли сшить по фото?', 'Да, можем работать по фото или образцу. Результат зависит от ткани и деталей, поэтому сначала обсуждаем.'],
        ['Отправляете за границу?', 'Отправка согласуется для каждого заказа. По Европе, России и другим странам напишите нам в WhatsApp.'],
        ['Какие цена и сроки?', 'Зависят от модели, ткани и количества. Мы чётко согласуем их до начала пошива.'],
      ],
      cta: 'Написать в WhatsApp', wa: 'Здравствуйте, хочу узнать о пошиве льняной одежды на заказ.', crumb: 'Льняная одежда на заказ',
    },
    de: {
      t: 'Leinenkleidung nach Maß in Antalya | Terzi Can',
      d: 'Leinen- und Baumwollkleidung nach Maß für Damen, Herren und Kinder: Schnittmuster, Einzelstücke, Kleinserien und Lohnfertigung. Terzi Can, Antalya.',
      h1: 'Leinenkleidung nach Maß in Antalya: Einzelstücke und Kleinserien',
      badge: 'Terzi Can · Konyaaltı, Antalya',
      lead: 'Kleidung aus Leinen und Baumwolle für Damen, Herren und Kinder, auf Bestellung gefertigt. Wir nähen Einzelstücke und Kleinserien und stimmen das Modell gemeinsam ab.',
      secs: [
        { h: 'Was wir nähen', ul: ['Leinenkleider, Hemden, Hosen, Jacken, Shorts und Röcke', 'Maßanfertigung für Damen, Herren und Kinder', 'Schnitt und Modell nach Foto oder Mustervorlage', 'Einzelstücke, Kleinserien und Lohnfertigung'] },
        { h: 'Warum Leinen?', p: 'Leinen ist leicht und atmungsaktiv, angenehm bei Sommerhitze und im Urlaub. Es knittert natürlich, das gehört zu seinem Charakter.' },
        { h: 'So läuft eine Bestellung', ul: ['Senden Sie Idee, Foto oder Vorlage per WhatsApp', 'Wir klären Stoff, Modell und Maße gemeinsam', 'Wir nähen; Dauer und Preis besprechen wir vorab', 'Versand in der Türkei und ins Ausland wird je Bestellung abgestimmt'] },
      ],
      faq: [
        ['Verkaufen Sie fertige Kleidung?', 'Nein. Alles wird auf Bestellung gefertigt; wir verkaufen keine fertige Lagerware.'],
        ['Können Sie nach Foto nähen?', 'Ja, wir können nach Foto oder Mustervorlage arbeiten. Das Ergebnis hängt von Stoff und Details ab, deshalb sprechen wir es vorher durch.'],
        ['Versenden Sie ins Ausland?', 'Der Versand wird je Bestellung abgestimmt. Für Europa, Russland und andere Länder schreiben Sie uns per WhatsApp.'],
        ['Wie sind Preis und Dauer?', 'Sie hängen von Modell, Stoff und Menge ab. Wir klären sie klar, bevor das Nähen beginnt.'],
      ],
      cta: 'Per WhatsApp schreiben', wa: 'Guten Tag, ich möchte mich über Leinenkleidung nach Maß informieren.', crumb: 'Leinenkleidung nach Maß',
    },
  },
  tekstil: {
    tr: {
      t: 'Anavera Tekstil Antalya | Numune, Seri İmalat, Fason Üretim',
      d: 'Antalya\'da numune, seri imalat ve fason üretim: Anavera Tekstil erkek, kadın ve çocuk tekstili üretir. Proje bazında teklif için WhatsApp.',
      h1: 'Antalya Tekstil Üreticisi Anavera Tekstil: Numune ve Seri İmalat',
      badge: 'Anavera Tekstil · Antalya',
      lead: 'Antalya merkezli üretici: numune çalışması, seri imalat ve fason üretim. Erkek, kadın ve çocuk tekstili için proje bazında çalışıyoruz.',
      secs: [
        { h: 'Antalya\'da numune ve seri üretim süreci', ul: ['Numune: tasarımınıza veya referans ürününüze göre hazırlanır', 'Onay: kumaş, kalıp ve dikiş detayları netleşir', 'Seri imalat: onaylanan numuneye göre üretim yapılır', 'Yurt dışı siparişler proje bazında görüşülür'] },
        { h: 'Üretim kategorileri', ul: ['Erkek giyim', 'Kadın giyim', 'Çocuk giyimi', 'Kurumsal ve üniforma'] },
        { h: 'Fason ve özel marka', p: 'Kendi tasarımınızla veya referans ürünle gelebilirsiniz; fason ve özel marka (private label) üretim için proje bazında teklif veriyoruz.' },
      ],
      faq: [
        ['Minimum sipariş adediniz nedir?', 'Adet projeye göre belirlenir; numune ve prototip için tek adet de kabul edilir.'],
        ['Numune süreci nasıl işliyor?', 'Tasarımınıza veya referans ürününüze göre numune hazırlanır, onayınızdan sonra seri üretime geçilir.'],
        ['Yurt dışı siparişleri alıyor musunuz?', 'Avrupa ve Rusya dahil yurt dışı siparişler proje bazında görüşülür; WhatsApp\'tan yazabilirsiniz.'],
        ['Erkek, kadın ve çocuk tekstili aynı siparişte üretilebilir mi?', 'Numune onayından sonra kategorileri tek siparişte birleştirmek için birlikte plan yaparız.'],
      ],
      cta: 'WhatsApp\'tan teklif alın', wa: 'Merhaba, Anavera Tekstil seri imalat ve numune çalışması hakkında bilgi almak istiyorum.', crumb: 'Anavera Tekstil',
    },
    en: {
      t: 'Clothing Manufacturer in Antalya | Anavera Tekstil',
      d: 'Anavera Tekstil in Antalya: sample making, series production and contract manufacturing for men\'s, women\'s and children\'s clothing. Quotes per project.',
      h1: 'Clothing Manufacturer in Antalya: Sample Making and Series Production',
      badge: 'Anavera Tekstil · Antalya, Türkiye',
      lead: 'An Antalya-based producer offering sample making, series production and contract manufacturing for men\'s, women\'s and children\'s clothing, project by project.',
      secs: [
        { h: 'From sample to series production in Antalya', ul: ['Sample: made from your design or a reference garment', 'Approval: fabric, pattern and stitching details are confirmed', 'Series production: made according to the approved sample', 'Orders from abroad are discussed project by project'] },
        { h: 'Product categories', ul: ['Men\'s clothing', 'Women\'s clothing', 'Children\'s clothing', 'Corporate wear and uniforms'] },
        { h: 'Contract manufacturing and private label', p: 'Bring your own design or a reference garment; we quote contract manufacturing and private label production per project.' },
      ],
      faq: [
        ['What is your minimum order quantity?', 'It depends on the project; a single piece is accepted for samples and prototypes.'],
        ['How does sampling work?', 'We make a sample from your design or reference garment, and move to series production after your approval.'],
        ['Do you take orders from abroad?', 'Orders from abroad, including Europe and Russia, are discussed project by project. Write to us on WhatsApp.'],
        ['Can men\'s, women\'s and children\'s items be made in one order?', 'After sample approval we plan together how to combine categories into one order.'],
      ],
      cta: 'Get a quote on WhatsApp', wa: 'Hello, I would like information about sample making and series production at Anavera Tekstil.', crumb: 'Anavera Tekstil',
    },
    ru: {
      t: 'Швейное производство в Анталье | Anavera Tekstil',
      d: 'Anavera Tekstil в Анталье: образцы, серийный пошив и производство по контракту мужской, женской и детской одежды. Расчёт под проект.',
      h1: 'Швейное производство в Анталье: образцы и серийный пошив одежды',
      badge: 'Anavera Tekstil · Анталья, Турция',
      lead: 'Производитель из Антальи: образцы, серийный пошив и производство по контракту мужской, женской и детской одежды, под каждый проект отдельно.',
      secs: [
        { h: 'От образца до серийного пошива в Анталье', ul: ['Образец: по вашему дизайну или референсному изделию', 'Утверждение: уточняются ткань, лекала и детали швов', 'Серийный пошив: по утверждённому образцу', 'Заказы из-за границы обсуждаются под каждый проект'] },
        { h: 'Категории продукции', ul: ['Мужская одежда', 'Женская одежда', 'Детская одежда', 'Корпоративная одежда и униформа'] },
        { h: 'Контрактный пошив и собственная марка', p: 'Приносите свой дизайн или образец; мы рассчитываем контрактное производство и пошив под вашей маркой (private label) под проект.' },
      ],
      faq: [
        ['Какой минимальный тираж?', 'Зависит от проекта; для образцов и прототипов принимается одно изделие.'],
        ['Как проходит работа над образцом?', 'Образец шьётся по вашему дизайну или референсному изделию, после утверждения переходим к серии.'],
        ['Принимаете заказы из-за границы?', 'Заказы из-за границы, включая Европу и Россию, обсуждаются под каждый проект. Напишите нам в WhatsApp.'],
        ['Можно ли шить мужское, женское и детское в одном заказе?', 'После утверждения образца вместе планируем объединение категорий в один заказ.'],
      ],
      cta: 'Получить расчёт в WhatsApp', wa: 'Здравствуйте, хочу узнать об образцах и серийном пошиве в Anavera Tekstil.', crumb: 'Anavera Tekstil',
    },
    de: {
      t: 'Bekleidungshersteller in Antalya | Anavera Tekstil',
      d: 'Anavera Tekstil in Antalya: Musterfertigung, Serienproduktion und Lohnfertigung für Herren-, Damen- und Kinderbekleidung. Angebote je Projekt.',
      h1: 'Bekleidungshersteller in Antalya: Musterfertigung und Serienproduktion',
      badge: 'Anavera Tekstil · Antalya, Türkei',
      lead: 'Hersteller aus Antalya mit Musterfertigung, Serienproduktion und Lohnfertigung für Herren-, Damen- und Kinderbekleidung, jeweils projektbezogen.',
      secs: [
        { h: 'Vom Muster zur Serie in Antalya', ul: ['Muster: nach Ihrem Entwurf oder einem Referenzteil', 'Freigabe: Stoff, Schnitt und Nahtdetails werden bestätigt', 'Serienfertigung: nach dem freigegebenen Muster', 'Bestellungen aus dem Ausland werden projektbezogen besprochen'] },
        { h: 'Produktkategorien', ul: ['Herrenbekleidung', 'Damenbekleidung', 'Kinderbekleidung', 'Berufs- und Firmenkleidung'] },
        { h: 'Lohnfertigung und Eigenmarke', p: 'Bringen Sie Ihren eigenen Entwurf oder ein Referenzteil mit; wir erstellen projektbezogene Angebote für Lohnfertigung und Private Label.' },
      ],
      faq: [
        ['Wie hoch ist die Mindestmenge?', 'Sie hängt vom Projekt ab; für Muster und Prototypen wird auch ein einzelnes Stück angenommen.'],
        ['Wie läuft die Musterfertigung ab?', 'Wir fertigen ein Muster nach Ihrem Entwurf oder Referenzteil und gehen nach Ihrer Freigabe in die Serie.'],
        ['Nehmen Sie Aufträge aus dem Ausland an?', 'Aufträge aus dem Ausland, auch aus Europa und Russland, besprechen wir projektbezogen. Schreiben Sie uns per WhatsApp.'],
        ['Können Herren-, Damen- und Kinderteile in einer Bestellung gefertigt werden?', 'Nach der Musterfreigabe planen wir gemeinsam, wie sich die Kategorien in einer Bestellung bündeln lassen.'],
      ],
      cta: 'Angebot per WhatsApp', wa: 'Guten Tag, ich möchte mich über Musterfertigung und Serienproduktion bei Anavera Tekstil informieren.', crumb: 'Anavera Tekstil',
    },
  },  promo: {
    tr: {
      t: 'Promosyon Tekstil ve Baskılı Bez Çanta Rehberi | Antalya',
      d: 'Fuar ve organizasyon için promosyon tekstili nasıl planlanır? Bez çanta, tişört, polar yelek, uniforma seçimi; logo dosyası, baskı ve sipariş akışı.',
      h1: 'Fuar ve Organizasyonlar İçin Promosyon Tekstili ve Baskılı Bez Çanta: Nasıl Planlanır?',
      badge: 'Anavera Tekstil · Antalya',
      lead: 'Fuar ya da organizasyon için logolu tekstil hazırlarken en çok zaman kazandıran şey, işe doğru sırayla başlamaktır: önce ürün, sonra logo dosyası, sonra baskı. Bu sayfa o sırayı anlatıyor; üretimi Antalya\'da yapıyoruz.',
      secs: [
        { h: 'Planlamaya nereden başlanır?', p: 'Önce ürünlerin kim için olduğunu netleştirin. Ziyaretçilere hediye olarak dağıtılacak ürünlerle ekibin giyeceği ürünler farklı ihtiyaçlardır: birincisinde bez çanta ve tişört gibi parçalar, ikincisinde polar yelek, mont, pantolon, önlük ya da uniforma gibi gün boyu giyilecek parçalar düşünülür. Fuar ya da organizasyonun tarihini ilk mesajda yazmak planı kolaylaştırır.' },
        { h: 'Hangi ürünleri yapıyoruz?', ul: ['Baskılı, logolu bez çanta (tanıtım ve hediyelik)', 'Tişört', 'Polar yelek', 'Mont', 'Pantolon', 'Şort', 'Önlük', 'Uniforma ve diğer tekstil ürünleri'], p: 'Ürünler istediğiniz tasarım, model ve baskı çeşidiyle üretilir.' },
        { h: 'Logo dosyası, baskı ve logo tasarımı', p: 'Baskı ve logo tasarımı da yapıyoruz; yani logonuz hazır değilse de başlayabilirsiniz. Hazır logonuz varsa vektörel dosya (AI, PDF ya da SVG gibi) en rahat çalışılan biçimdir; yoksa yüksek çözünürlüklü bir görsel de iş görebilir. Baskı çeşidi kumaşa, logonun renk ve detay yoğunluğuna ve adede göre seçilir; hangisinin uygun olduğunu sipariş sırasında birlikte belirleriz.', ul: ['Logonuzun renklerini ve varsa kurumsal renk kodlarını not edin', 'Baskının ürünün neresine gelmesini istediğinizi yazın (ön, arka vb.)', 'Aynı logonun çanta ve tişört gibi farklı ürünlerde nasıl duracağını birlikte değerlendirin'] },
        { h: 'Baskı teknikleri', p: 'Serigrafi, nakış, transfer ve DTF baskının hepsini yapıyoruz. Hangisinin uygun olduğu ürüne, kumaşa, logoya ve adede göre birlikte seçilir.', ul: ['Serigrafi: düz renkli logolarda ve aynı tasarımın çok adette basılmasında sık tercih edilir', 'Nakış: logo kumaşa iplikle işlenir; polar yelek, mont, önlük ve uniformada iyi durur', 'Transfer baskı: tasarım önce bir taşıyıcıya basılır, sonra ısı ve baskıyla ürüne aktarılır', 'DTF baskı: çok renkli, detaylı ve fotoğraf benzeri tasarımlar için uygundur'] },
        { h: 'Fuar ve organizasyonlar için üretim', p: 'Antalya\'daki EXPO ve diğer fuarlarda ve organizasyonlarda ihtiyaç duyulan tekstil ürünlerini üretiyoruz; firmalara baskılı, logolu bez çanta imalatı ve baskısı da bunun bir parçası. Süre sipariş bazında netleştiği için etkinlik tarihini baştan paylaşmak, ürün ve baskı kararlarını o tarihe göre vermenizi sağlar.' },
        { h: 'Sipariş nasıl ilerler?', ul: ['Logonuzu, tasarım dosyanızı ya da fikrinizi WhatsApp\'tan gönderirsiniz; ihtiyacınız olan ürünleri ve etkinlik tarihini yazarsınız', 'Model, ürün ve baskı seçimi birlikte yapılır', 'Onaylanan model ve baskıyla üretim yapılır', 'Süre ve fiyat sipariş bazında netleşir'] },
      ],
      faq: [
        ['Minimum sipariş adedi var mı?', 'Adet; ürüne, baskıya ve siparişe göre değişir, bu sayfada rakam vermiyoruz. Ne kadar ürüne ihtiyacınız olduğunu WhatsApp\'tan yazın, birlikte netleştirelim.'],
        ['Fiyatı nasıl öğrenirim?', 'Fiyat ürüne, baskıya ve adede bağlı olduğu için sayfada yazmıyoruz. Logonuzu ya da fikrinizi WhatsApp\'tan gönderin; teklif sipariş bazında verilir.'],
        ['Ne kadar sürede hazır olur?', 'Süre sipariş bazında netleşir. Fuar ya da organizasyon tarihini ilk mesajda yazarsanız planı ona göre konuşuruz.'],
        ['Logom ya da tasarımım yoksa ne yapmalıyım?', 'Logo ve baskı tasarımı da yapıyoruz. Kurumunuzun adını, varsa renklerini ve aklınızdaki fikri yazmanız yeterli.'],
        ['Bez çanta dışında hangi ürünler yapılıyor?', 'Tişört, polar yelek, mont, pantolon, şort, önlük, uniforma ve diğer tekstil ürünleri; istenen tasarım, model ve baskı çeşidiyle üretilir.'],
      ],
      cta: 'WhatsApp\'tan teklif alın', wa: 'Merhaba, fuar/organizasyon için logolu promosyon tekstili ve baskılı bez çanta hakkında bilgi ve teklif almak istiyorum. Logomu veya fikrimi gönderiyorum.', crumb: 'Promosyon tekstili ve bez çanta',
      note: 'Süre ve fiyat sipariş bazında netleşir; ürün, model ve baskı birlikte belirlenir.', foot: 'Anavera Tekstil · Antalya',
    },
    en: {
      t: 'Promotional Textiles and Printed Tote Bags: Planning Guide',
      d: 'How to plan promotional textiles for trade fairs and events: tote bags, T-shirts, fleece vests, uniforms, logo files, print choice and how an order runs.',
      h1: 'Promotional Textiles and Printed Tote Bags for Fairs and Events: How to Plan Them',
      badge: 'Anavera Tekstil · Antalya, Türkiye',
      lead: 'When you prepare branded textiles for a trade fair or event, the biggest time-saver is doing things in the right order: product first, then the logo file, then the print. This page walks through that order. We produce in Antalya.',
      secs: [
        { h: 'Where to start', p: 'First decide who the items are for. Giveaways for visitors and clothing for your own team are different needs: tote bags and T-shirts fit the first, while fleece vests, jackets, trousers, aprons or uniforms fit pieces that staff wear all day. Putting the date of the fair or event in your first message makes planning easier.' },
        { h: 'What we make', ul: ['Printed tote bags with your logo (for promotion and gifts)', 'T-shirts', 'Fleece vests', 'Jackets', 'Trousers', 'Shorts', 'Aprons', 'Uniforms and other textile products'], p: 'Items are made in the design, model and print type you ask for.' },
        { h: 'Logo file, printing and logo design', p: 'We also do print and logo design, so you can start even if your logo is not ready. If you have one, a vector file (such as AI, PDF or SVG) is the easiest to work with; a high-resolution image can also do the job. The print type is chosen according to the fabric, how many colours and how much detail the logo has, and the quantity; we decide together at the time of the order which one fits.', ul: ['Note your logo colours and any brand colour codes', 'Say where the print should go on the item (front, back and so on)', 'Look together at how the same logo will sit on different items, such as a tote bag and a T-shirt'] },
        { h: 'Printing techniques', p: 'We do all of these: screen printing, embroidery, transfer printing and DTF printing. Which one fits depends on the item, the fabric, the logo and the quantity, and we choose it together.', ul: ['Screen printing: often chosen for logos in solid colours and for printing the same design in larger quantities', 'Embroidery: the logo is stitched into the fabric with thread; well suited to fleece vests, jackets, aprons and uniforms', 'Transfer printing: the design is first printed on a carrier, then applied to the item with heat and pressure', 'DTF printing: suited to multi-colour, detailed and photo-like designs'] },
        { h: 'Production for fairs and events', p: 'We produce the textile products needed at EXPO and other fairs and events in Antalya; making and printing logo tote bags for companies is part of that. Because time is settled per order, sharing the event date early lets you make product and print decisions around it.' },
        { h: 'How an order runs', ul: ['You send your logo, design file or idea on WhatsApp, along with the products you need and the event date', 'Model, product and print are chosen together', 'Production follows the approved model and print', 'Time and price are settled per order'] },
      ],
      faq: [
        ['Is there a minimum order quantity?', 'Quantity depends on the product, the print and the order, and we do not publish figures here. Tell us on WhatsApp how many items you need and we will sort it out together.'],
        ['How do I find out the price?', 'Price depends on the product, the print and the quantity, so we do not list it. Send your logo or idea on WhatsApp and a quote is given per order.'],
        ['How long does it take?', 'Time is settled per order. If you give the date of the fair or event in your first message, we plan around it.'],
        ['What if I do not have a logo or design?', 'We do logo and print design as well. Tell us your organisation\'s name, its colours if it has any, and the idea you have in mind.'],
        ['What do you make besides tote bags?', 'T-shirts, fleece vests, jackets, trousers, shorts, aprons, uniforms and other textile products, in the design, model and print type you ask for.'],
      ],
      cta: 'Get a quote on WhatsApp', wa: 'Hello, I would like information and a quote on logo promotional textiles and printed tote bags for a fair/event. I will send my logo or idea.', crumb: 'Promotional textiles and tote bags',
      note: 'Time and price are settled per order; product, model and print are chosen together.', foot: 'Anavera Tekstil · Antalya, Türkiye',
    },
    ru: {
      t: 'Рекламный текстиль и сумки-шопперы с печатью: как планировать',
      d: 'Как спланировать рекламный текстиль для выставок и мероприятий: шопперы, футболки, флисовые жилеты, униформа, файл логотипа, печать и порядок заказа.',
      h1: 'Рекламный текстиль и сумки-шопперы с логотипом для выставок и мероприятий: как всё спланировать',
      badge: 'Anavera Tekstil · Анталья, Турция',
      lead: 'Когда готовите текстиль с логотипом к выставке или мероприятию, больше всего времени экономит правильный порядок: сначала изделия, затем файл логотипа, затем печать. Эта страница описывает такой порядок. Производство у нас в Анталье.',
      secs: [
        { h: 'С чего начать', p: 'Сначала решите, для кого изделия. Подарки гостям и одежда для вашей команды — разные задачи: для первого подходят сумки-шопперы и футболки, для второго — флисовые жилеты, куртки, брюки, фартуки или униформа, которую носят весь день. Если в первом сообщении указать дату выставки или мероприятия, планировать проще.' },
        { h: 'Что мы изготавливаем', ul: ['Тканевые сумки-шопперы с печатью и логотипом (для рекламы и в подарок)', 'Футболки', 'Флисовые жилеты', 'Куртки', 'Брюки', 'Шорты', 'Фартуки', 'Униформа и другие текстильные изделия'], p: 'Изделия шьются с тем дизайном, моделью и видом печати, которые вы выберете.' },
        { h: 'Файл логотипа, печать и разработка логотипа', p: 'Мы также разрабатываем логотип и макет печати, так что начать можно, даже если логотипа ещё нет. Если он есть, удобнее всего векторный файл (например, AI, PDF или SVG); подойдёт и изображение в высоком разрешении. Вид печати выбирают по ткани, по числу цветов и детализации логотипа и по тиражу; какой подходит лучше, решаем вместе при заказе.', ul: ['Запишите цвета логотипа и фирменные цветовые коды, если они есть', 'Укажите, где на изделии должна быть печать (спереди, сзади и т. д.)', 'Вместе посмотрите, как один и тот же логотип будет смотреться на разных изделиях, например на сумке и футболке'] },
        { h: 'Виды нанесения', p: 'Мы делаем все четыре вида: шелкографию, вышивку, трансферную печать и DTF-печать. Какой подходит, зависит от изделия, ткани, логотипа и тиража — выбираем вместе.', ul: ['Шелкография: часто выбирают для логотипов в плотных цветах и для печати одного макета большим тиражом', 'Вышивка: логотип вышивается нитью по ткани; хорошо подходит для флисовых жилетов, курток, фартуков и униформы', 'Трансферная печать: рисунок сначала печатается на носитель, затем переносится на изделие под нагревом и давлением', 'DTF-печать: подходит для многоцветных, детализированных и фотореалистичных рисунков'] },
        { h: 'Производство для выставок и мероприятий', p: 'Мы шьём текстильные изделия, которые нужны на EXPO и других выставках и мероприятиях в Анталье; изготовление и печать сумок с логотипом для компаний — часть этой работы. Сроки уточняются для каждого заказа, поэтому дату мероприятия лучше назвать сразу: тогда выбор изделий и печати можно подогнать под неё.' },
        { h: 'Как проходит заказ', ul: ['Вы присылаете в WhatsApp логотип, файл с дизайном или идею, а также перечень изделий и дату мероприятия', 'Модель, изделия и печать выбираются вместе', 'Производство идёт по утверждённой модели и печати', 'Сроки и стоимость уточняются для каждого заказа'] },
      ],
      faq: [
        ['Есть ли минимальный тираж?', 'Количество зависит от изделия, печати и заказа, поэтому цифр на странице нет. Напишите в WhatsApp, сколько изделий нужно, и мы обсудим это вместе.'],
        ['Как узнать стоимость?', 'Стоимость зависит от изделия, печати и количества, поэтому мы её не публикуем. Пришлите логотип или идею в WhatsApp, расчёт делается под каждый заказ.'],
        ['Сколько времени занимает заказ?', 'Сроки уточняются для каждого заказа. Если в первом сообщении указать дату выставки или мероприятия, мы будем планировать работу с учётом неё.'],
        ['Что делать, если нет логотипа или макета?', 'Мы разрабатываем логотип и макет печати. Достаточно написать название организации, её цвета (если есть) и вашу идею.'],
        ['Что вы шьёте, кроме сумок?', 'Футболки, флисовые жилеты, куртки, брюки, шорты, фартуки, униформу и другие текстильные изделия — с тем дизайном, моделью и видом печати, которые вы выберете.'],
      ],
      cta: 'Получить расчёт в WhatsApp', wa: 'Здравствуйте, хочу узнать о рекламном текстиле с логотипом и сумках-шопперах с печатью для выставки/мероприятия и получить расчёт. Отправлю логотип или идею.', crumb: 'Рекламный текстиль и сумки',
      note: 'Сроки и стоимость уточняются для каждого заказа; изделия, модель и печать выбираются вместе.', foot: 'Anavera Tekstil · Анталья, Турция',
    },
    de: {
      t: 'Werbetextilien und bedruckte Stoffbeutel: Planungshilfe',
      d: 'So planen Sie Werbetextilien für Messen und Veranstaltungen: Stoffbeutel, T-Shirts, Fleeceweste, Uniformen, Logodatei, Druckwahl und Bestellablauf.',
      h1: 'Werbetextilien und bedruckte Stoffbeutel für Messen und Veranstaltungen: So planen Sie richtig',
      badge: 'Anavera Tekstil · Antalya, Türkei',
      lead: 'Wer Textilien mit Logo für eine Messe oder eine Veranstaltung vorbereitet, spart am meisten Zeit mit der richtigen Reihenfolge: erst die Produkte, dann die Logodatei, dann der Druck. Diese Seite beschreibt genau das. Gefertigt wird bei uns in Antalya.',
      secs: [
        { h: 'Womit beginnt die Planung?', p: 'Klären Sie zuerst, für wen die Teile gedacht sind. Give-aways für Besucher und Kleidung für das eigene Team sind unterschiedliche Aufgaben: Für das eine passen Stoffbeutel und T-Shirts, für das andere Fleeceweste, Jacke, Hose, Schürze oder Uniform, die den ganzen Tag getragen werden. Nennen Sie das Datum der Messe oder Veranstaltung gleich in der ersten Nachricht, dann lässt sich besser planen.' },
        { h: 'Was wir fertigen', ul: ['Bedruckte Stoffbeutel mit Ihrem Logo (zur Werbung und als Geschenk)', 'T-Shirts', 'Fleecewesten', 'Jacken', 'Hosen', 'Shorts', 'Schürzen', 'Uniformen und weitere Textilprodukte'], p: 'Die Teile entstehen in dem Design, Modell und Druckverfahren, das Sie sich wünschen.' },
        { h: 'Logodatei, Druck und Logogestaltung', p: 'Wir übernehmen auch Druck- und Logogestaltung; Sie können also beginnen, selbst wenn Ihr Logo noch nicht fertig ist. Liegt eines vor, lässt sich eine Vektordatei (zum Beispiel AI, PDF oder SVG) am besten verarbeiten; auch eine hochauflösende Bilddatei kann genügen. Das Druckverfahren richtet sich nach dem Stoff, nach Farbanzahl und Detailgrad des Logos und nach der Menge; was am besten passt, legen wir bei der Bestellung gemeinsam fest.', ul: ['Notieren Sie die Farben Ihres Logos und gegebenenfalls Ihre Firmenfarbcodes', 'Geben Sie an, wo der Druck auf dem Teil sitzen soll (vorn, hinten usw.)', 'Prüfen Sie gemeinsam, wie dasselbe Logo auf verschiedenen Teilen wirkt, etwa auf Stoffbeutel und T-Shirt'] },
        { h: 'Druck- und Veredelungstechniken', p: 'Wir bieten alle vier an: Siebdruck, Stickerei, Transferdruck und DTF-Druck. Welche Technik passt, hängt von Artikel, Stoff, Logo und Stückzahl ab; wir wählen sie gemeinsam aus.', ul: ['Siebdruck: häufig gewählt für Logos in Volltonfarben und für größere Stückzahlen desselben Motivs', 'Stickerei: das Logo wird mit Garn in den Stoff gestickt; passt gut zu Fleecewesten, Jacken, Schürzen und Uniformen', 'Transferdruck: das Motiv wird zuerst auf einen Träger gedruckt und dann mit Hitze und Druck auf den Artikel übertragen', 'DTF-Druck: geeignet für mehrfarbige, detailreiche und fotoähnliche Motive'] },
        { h: 'Fertigung für Messen und Veranstaltungen', p: 'Wir fertigen die Textilprodukte, die auf der EXPO und auf anderen Messen und Veranstaltungen in Antalya gebraucht werden; Herstellung und Bedruckung von Logo-Stoffbeuteln für Unternehmen gehören dazu. Da sich die Dauer je Bestellung klärt, hilft es, das Veranstaltungsdatum früh zu nennen, damit Sie Produkt- und Druckentscheidungen darauf abstimmen können.' },
        { h: 'So läuft eine Bestellung', ul: ['Sie senden Logo, Designdatei oder Idee per WhatsApp, dazu die gewünschten Produkte und das Veranstaltungsdatum', 'Modell, Produkt und Druck werden gemeinsam ausgewählt', 'Die Fertigung erfolgt nach dem freigegebenen Modell und Druck', 'Dauer und Preis klären sich je Bestellung'] },
      ],
      faq: [
        ['Gibt es eine Mindestmenge?', 'Die Menge hängt von Produkt, Druck und Bestellung ab; Zahlen nennen wir hier nicht. Schreiben Sie uns per WhatsApp, wie viele Teile Sie brauchen, dann klären wir es gemeinsam.'],
        ['Wie erfahre ich den Preis?', 'Der Preis hängt von Produkt, Druck und Menge ab, deshalb nennen wir ihn hier nicht. Senden Sie Ihr Logo oder Ihre Idee per WhatsApp, das Angebot erfolgt je Bestellung.'],
        ['Wie lange dauert es?', 'Die Dauer klärt sich je Bestellung. Nennen Sie das Datum der Messe oder Veranstaltung in Ihrer ersten Nachricht, dann planen wir danach.'],
        ['Was, wenn ich noch kein Logo oder Design habe?', 'Wir gestalten auch Logo und Druck. Nennen Sie uns den Namen Ihrer Organisation, gegebenenfalls ihre Farben und Ihre Idee.'],
        ['Was fertigen Sie außer Stoffbeuteln?', 'T-Shirts, Fleecewesten, Jacken, Hosen, Shorts, Schürzen, Uniformen und weitere Textilprodukte, im gewünschten Design, Modell und Druckverfahren.'],
      ],
      cta: 'Angebot per WhatsApp', wa: 'Guten Tag, ich möchte mich über Werbetextilien mit Logo und bedruckte Stoffbeutel für eine Messe/Veranstaltung informieren und ein Angebot erhalten. Mein Logo bzw. meine Idee sende ich mit.', crumb: 'Werbetextilien und Stoffbeutel',
      note: 'Dauer und Preis klären sich je Bestellung; Produkt, Modell und Druck werden gemeinsam gewählt.', foot: 'Anavera Tekstil · Antalya, Türkei',
    },
  },
};
