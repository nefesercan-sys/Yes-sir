// Keten/pamuk özel dikim (Terzi Can) ve Anavera Tekstil için 4 dilli tanıtım sayfaları.
// İçerik yalnızca site sahibinin doğruladığı bilgileri içerir: fiyat, stok, organik/çevre dostu,
// kampanya veya kapıda ödeme iddiası YOKTUR. Tüm ürünler siparişe özel dikilir.
export type Lang = 'tr' | 'en' | 'ru' | 'de';
export type Topic = 'keten' | 'tekstil';
export const LANGS: Lang[] = ['tr', 'en', 'ru', 'de'];
export const BASE = 'https://swaphubs.com';
export const WA_NUMBER = '905318986418';

export const URLS: Record<Topic, Record<Lang, string>> = {
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
};

export const CONTENT: Record<Topic, Record<Lang, Page>> = {
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
  },
};
