// ============================================================
// swaphubs.com — lib/seo-data.ts
// Bölge × hizmet arama sorguları için TEK veri kaynağı (TR/EN/RU/DE).
// Kurallar:
//  - Sadece doğrulanmış bilgi: tek atölye (Hurma, Konyaaltı), 2006'dan beri, her gün 08:00–23:00,
//    otel ve eve ücretsiz servis, teslim süreleri (aynı gün / 1 gün / 3 gün), gelinlik ₺800+, abiye ₺400+.
//  - Mesafe/dakika, puan, müşteri sayısı, sahte vaat YOK.
//  - Yeni bölge/hizmet eklemek için sadece bu dosyaya satır ekle; sayfalar, sitemap ve iç linkler otomatik oluşur.
// ============================================================

import { KONYAALTI_MAHALLELERI, ANTALYA_ILCELERI } from '@/lib/turkiye-lokasyonlar';

export type Lang = 'tr' | 'en' | 'ru' | 'de';
export const LANGS: Lang[] = ['tr', 'en', 'ru', 'de'];
type L4<T = string> = Record<Lang, T>;

export const SITE = 'https://swaphubs.com';
export const BUSINESS_ID = 'https://swaphubs.com/terzi#business'; // app/terzi/page.tsx ile aynı işletme varlığı
export const PHONE = '+90 531 898 64 18';
export const PHONE_TEL = '+905318986418';
export const MAPS = 'https://www.google.com/maps?cid=5846987472659818117';
export const LAST_UPDATE = '2026-10-10';

// ── URL şeması ──────────────────────────────────────────────
export const DISTRICT_BASE: L4 = {
  tr: '/terzi/bolge', en: '/en/tailor-antalya', ru: '/ru/portnoy-antalya', de: '/de/schneider-antalya',
};
export const SERVICE_BASE: L4 = {
  tr: '/terzi/hizmet', en: '/en/tailor-services', ru: '/ru/uslugi-portnogo', de: '/de/schneider-leistungen',
};
export const HUB_MAIN: L4 = {
  tr: '/terzi', en: '/online-tailor-service', ru: '/ru/atelie-antalya', de: '/de/online-schneiderservice-antalya',
};
export const HOTEL_BASE: L4 = {
  tr: '', en: '/en/hotel-tailor-antalya', ru: '/ru/vyezdnoy-portnoy-antalya', de: '/de/schneider-service-hotel-antalya',
};

// ── Bölgeler ────────────────────────────────────────────────
export type Kind = 'central' | 'resort' | 'outer';
export interface District {
  slug: string;
  kind: Kind;
  name: L4;
  loc: L4;            // "…'da" gibi yer-durum kalıbı (TR: ek dahil, RU: önek dahil, EN/DE: "in X")
  alias: string[];    // ASCII/yazım varyantları (anahtar kelime)
  hotelSlug?: string; // OTEL_BOLGELERI'nde karşılığı varsa
}

export const DISTRICTS: District[] = [
  { slug: 'muratpasa', kind: 'central', name: { tr: 'Muratpaşa', en: 'Muratpaşa', ru: 'Муратпаша', de: 'Muratpaşa' },
    loc: { tr: "Muratpaşa'da", en: 'in Muratpaşa', ru: 'в Муратпаше', de: 'in Muratpaşa' }, alias: ['Muratpasa'] },
  { slug: 'konyaalti', kind: 'central', name: { tr: 'Konyaaltı', en: 'Konyaaltı', ru: 'Коньяалты', de: 'Konyaaltı' },
    loc: { tr: "Konyaaltı'nda", en: 'in Konyaaltı', ru: 'в Коньяалты', de: 'in Konyaaltı' }, alias: ['Konyaalti', 'Konyaalti Antalya'] },
  { slug: 'meltem', kind: 'central', name: { tr: 'Meltem', en: 'Meltem', ru: 'Мельтем', de: 'Meltem' },
    loc: { tr: "Meltem'de", en: 'in Meltem', ru: 'в Мельтеме', de: 'in Meltem' }, alias: [] },
  { slug: 'fener', kind: 'central', name: { tr: 'Fener', en: 'Fener', ru: 'Фенер', de: 'Fener' },
    loc: { tr: "Fener'de", en: 'in Fener', ru: 'в Фенере', de: 'in Fener' }, alias: ['Fener Mahallesi'] },
  { slug: 'sirinyali', kind: 'central', name: { tr: 'Şirinyalı', en: 'Şirinyalı', ru: 'Ширинъялы', de: 'Şirinyalı' },
    loc: { tr: "Şirinyalı'da", en: 'in Şirinyalı', ru: 'в Ширинъялы', de: 'in Şirinyalı' }, alias: ['Sirinyali', 'Şirinyali'] },
  { slug: 'lara', kind: 'resort', hotelSlug: 'lara', name: { tr: 'Lara', en: 'Lara', ru: 'Лара', de: 'Lara' },
    loc: { tr: "Lara'da", en: 'in Lara', ru: 'в Ларе', de: 'in Lara' }, alias: ['Lara Plajı'] },
  { slug: 'guzeloba', kind: 'resort', hotelSlug: 'guzeloba', name: { tr: 'Güzeloba', en: 'Güzeloba', ru: 'Гюзельоба', de: 'Güzeloba' },
    loc: { tr: "Güzeloba'da", en: 'in Güzeloba', ru: 'в Гюзельобе', de: 'in Güzeloba' }, alias: ['Guzeloba', 'Güzel Oba'] },
  { slug: 'kundu', kind: 'resort', hotelSlug: 'kundu', name: { tr: 'Kundu', en: 'Kundu', ru: 'Кунду', de: 'Kundu' },
    loc: { tr: "Kundu'da", en: 'in Kundu', ru: 'в Кунду', de: 'in Kundu' }, alias: [] },
  { slug: 'arapsuyu', kind: 'central', name: { tr: 'Arapsuyu', en: 'Arapsuyu', ru: 'Арапсую', de: 'Arapsuyu' },
    loc: { tr: "Arapsuyu'nda", en: 'in Arapsuyu', ru: 'в Арапсую', de: 'in Arapsuyu' }, alias: [] },
  { slug: 'toros', kind: 'central', name: { tr: 'Toros Mahallesi', en: 'Toros', ru: 'Торос', de: 'Toros' },
    loc: { tr: "Toros Mahallesi'nde", en: 'in Toros', ru: 'в районе Торос', de: 'in Toros' }, alias: ['Toros Mahallesi Konyaaltı'] },
  { slug: 'ogretmenevleri', kind: 'central', name: { tr: 'Öğretmenevleri', en: 'Öğretmenevleri', ru: 'Огретменевлери', de: 'Öğretmenevleri' },
    loc: { tr: "Öğretmenevleri'nde", en: 'in Öğretmenevleri', ru: 'в Огретменевлери', de: 'in Öğretmenevleri' }, alias: ['Ogretmenevleri'] },
  { slug: 'kepez', kind: 'central', name: { tr: 'Kepez', en: 'Kepez', ru: 'Кепез', de: 'Kepez' },
    loc: { tr: "Kepez'de", en: 'in Kepez', ru: 'в Кепезе', de: 'in Kepez' }, alias: [] },
  { slug: 'aksu', kind: 'outer', name: { tr: 'Aksu', en: 'Aksu', ru: 'Аксу', de: 'Aksu' },
    loc: { tr: "Aksu'da", en: 'in Aksu', ru: 'в Аксу', de: 'in Aksu' }, alias: [] },
  { slug: 'dosemealti', kind: 'outer', name: { tr: 'Döşemealtı', en: 'Döşemealtı', ru: 'Дёшемеалты', de: 'Döşemealtı' },
    loc: { tr: "Döşemealtı'nda", en: 'in Döşemealtı', ru: 'в Дёшемеалты', de: 'in Döşemealtı' }, alias: ['Dosemealti'] },
  { slug: 'belek', kind: 'resort', hotelSlug: 'belek', name: { tr: 'Belek', en: 'Belek', ru: 'Белек', de: 'Belek' },
    loc: { tr: "Belek'te", en: 'in Belek', ru: 'в Белеке', de: 'in Belek' }, alias: [] },
  { slug: 'side', kind: 'resort', hotelSlug: 'side', name: { tr: 'Side', en: 'Side', ru: 'Сиде', de: 'Side' },
    loc: { tr: "Side'de", en: 'in Side', ru: 'в Сиде', de: 'in Side' }, alias: ['Manavgat Side'] },
  { slug: 'manavgat', kind: 'outer', name: { tr: 'Manavgat', en: 'Manavgat', ru: 'Манавгат', de: 'Manavgat' },
    loc: { tr: "Manavgat'ta", en: 'in Manavgat', ru: 'в Манавгате', de: 'in Manavgat' }, alias: [] },
  { slug: 'kemer', kind: 'resort', hotelSlug: 'kemer', name: { tr: 'Kemer', en: 'Kemer', ru: 'Кемер', de: 'Kemer' },
    loc: { tr: "Kemer'de", en: 'in Kemer', ru: 'в Кемере', de: 'in Kemer' }, alias: [] },
  { slug: 'beldibi', kind: 'resort', name: { tr: 'Beldibi', en: 'Beldibi', ru: 'Бельдиби', de: 'Beldibi' },
    loc: { tr: "Beldibi'nde", en: 'in Beldibi', ru: 'в Бельдиби', de: 'in Beldibi' }, alias: [] },
  { slug: 'goynuk', kind: 'resort', name: { tr: 'Göynük', en: 'Göynük', ru: 'Гёйнюк', de: 'Göynük' },
    loc: { tr: "Göynük'te", en: 'in Göynük', ru: 'в Гёйнюке', de: 'in Göynük' }, alias: ['Goynuk'] },
];

// Zaten kendi sayfası olan Konyaaltı mahalleleri (yalnızca iç link için)
export const MAHALLE_PAGES: { href: string; name: L4 }[] = [
  { href: '/terzi/konyaalti/hurma', name: { tr: 'Hurma', en: 'Hurma', ru: 'Хурма', de: 'Hurma' } },
  { href: '/terzi/konyaalti/liman', name: { tr: 'Liman', en: 'Liman', ru: 'Лиман', de: 'Liman' } },
  { href: '/terzi/konyaalti/sarisu', name: { tr: 'Sarısu', en: 'Sarısu', ru: 'Сарысу', de: 'Sarısu' } },
  { href: '/terzi/konyaalti/uncali', name: { tr: 'Uncalı', en: 'Uncalı', ru: 'Унджалы', de: 'Uncalı' } },
  { href: '/terzi/konyaalti/gursu', name: { tr: 'Gürsu', en: 'Gürsu', ru: 'Гюрсу', de: 'Gürsu' } },
];

// ── Hizmetler ───────────────────────────────────────────────
export type TimeKey = 'same' | 'next' | 'three' | 'none';
export interface Service {
  id: string;
  icon: string;
  slug: L4;
  name: L4;
  q: L4;              // "{loc} {q}" şeklinde sorgu üretmek için ad öbeği
  intro: L4;
  vars: L4<string[]>; // aynı niyetin farklı yazılışları (başlık/açıklama/anahtar kelime)
  time: TimeKey;
  priceFrom?: number; // ₺ — yalnızca sitede zaten yayınlanan başlangıç fiyatları
  priceText?: L4;     // fiyat birden fazla kaleme bölünüyorsa serbest metin
  timeText?: L4;      // süre için özel metin (varsa time yerine)
  extra?: { href: string; label: L4 };
}

export const SERVICES: Service[] = [
  {
    id: 'paca', icon: '📏', time: 'same', priceFrom: 150,
    slug: { tr: 'pantolon-paca-kisaltma', en: 'trouser-hemming', ru: 'podshiv-bryuk', de: 'hosen-kuerzen' },
    name: { tr: 'Pantolon Paça Kısaltma', en: 'Trouser Hemming', ru: 'Подшив брюк', de: 'Hosen kürzen' },
    q: { tr: 'paça kısaltma', en: 'trouser hemming', ru: 'подшив брюк', de: 'Hosen kürzen' },
    intro: {
      tr: 'Kumaş pantolon, takım pantolonu ve etek paçasını boyunuza göre kısaltıyoruz. Ölçü sizin üzerinizde alınır, dikiş temiz ve düzgün biter.',
      en: 'We shorten the hems of dress trousers, suit trousers and skirts to your exact length. The length is marked on you and the stitching is finished cleanly.',
      ru: 'Укорачиваем низ классических брюк, брюк от костюма и юбок точно по вашему росту. Длину отмечаем прямо на вас, шов выполняем аккуратно.',
      de: 'Wir kürzen Anzughosen, Stoffhosen und Röcke exakt auf Ihre Länge. Die Länge wird direkt am Körper abgesteckt und sauber genäht.',
    },
    vars: {
      tr: ['pantolon paça kısaltma', 'paça kısaltma terzi', 'kumaş pantolon boy kısaltma', 'pantolon boyu kısaltma', 'paça tadilatı', 'yakınımdaki terzi paça kısaltma', 'aynı gün paça kısaltma'],
      en: ['trouser hemming', 'shorten trousers', 'pants hemming near me', 'trouser length alteration', 'hem pants tailor', 'same day trouser hemming'],
      ru: ['подшить брюки', 'укоротить брюки', 'подшив брюк срочно', 'ателье подшить брюки рядом', 'укорочение брюк', 'подшив низа брюк'],
      de: ['Hose kürzen', 'Hosen kürzen lassen', 'Hosensaum kürzen', 'Änderungsschneiderei Hose kürzen', 'Hose kürzen in der Nähe', 'Hosenlänge ändern'],
    },
  },
  {
    id: 'kot', icon: '👖', time: 'same', priceFrom: 150,
    slug: { tr: 'kot-pantolon-paca-kisaltma', en: 'jeans-hemming', ru: 'podshiv-dzhinsov', de: 'jeans-kuerzen' },
    name: { tr: 'Kot Pantolon Daraltma ve Kısaltma', en: 'Jeans Hemming & Taking In', ru: 'Подшив и ушивание джинсов', de: 'Jeans kürzen und enger machen' },
    q: { tr: 'kot pantolon kısaltma', en: 'jeans hemming', ru: 'подшив джинсов', de: 'Jeans kürzen' },
    intro: {
      tr: 'Kot pantolon paçası kısaltma ve daraltma işlemlerini kalın kot kumaşa uygun makine ve iplikle yapıyoruz. Paça boyu ve bacak genişliği ölçünüze göre ayarlanır.',
      en: 'We hem and taper jeans with machines and thread suited to heavy denim. Leg length and leg width are adjusted to your measurements.',
      ru: 'Подшиваем и сужаем джинсы на машине и нитками, подходящими для плотного денима. Длину и ширину штанин подгоняем по вашим меркам.',
      de: 'Wir kürzen und verengen Jeans mit Maschinen und Garn, die für dicken Denim geeignet sind. Länge und Beinweite richten sich nach Ihren Maßen.',
    },
    vars: {
      tr: ['kot pantolon paça kısaltma', 'kot pantolon daraltma', 'kot pantolon kısaltma', 'kot paçası kısaltma', 'jean paça kısaltma terzi', 'kot bel daraltma'],
      en: ['jeans hemming', 'shorten jeans', 'taper jeans tailor', 'jeans length alteration', 'jeans alteration near me', 'take in jeans waist'],
      ru: ['подшить джинсы', 'укоротить джинсы', 'ушить джинсы', 'подшив джинсов с сохранением низа', 'ателье джинсы подшить', 'ушивание джинсов в талии'],
      de: ['Jeans kürzen', 'Jeans enger machen', 'Jeans kürzen lassen', 'Jeans Bund enger machen', 'Jeans Änderung Schneider', 'Jeans Hosenbein enger'],
    },
  },
  {
    id: 'bel', icon: '🪡', time: 'same', priceFrom: 150,
    slug: { tr: 'bel-daraltma', en: 'waist-taking-in', ru: 'ushivanie-v-talii', de: 'taille-enger-machen' },
    name: { tr: 'Bel Daraltma ve Genişletme', en: 'Waist Taking-in & Letting-out', ru: 'Ушивание и расширение в талии', de: 'Taille enger und weiter machen' },
    q: { tr: 'bel daraltma', en: 'waist alteration', ru: 'ушивание в талии', de: 'Taille enger machen' },
    intro: {
      tr: 'Pantolon, etek, elbise ve ceketin belini bedeninize göre daraltıyor veya genişletiyoruz. Prova ile ölçü birlikte belirlenir; kıyafet bedeninize oturur.',
      en: 'We take in or let out the waist of trousers, skirts, dresses and jackets to fit your body. The fit is set together with you at a fitting.',
      ru: 'Ушиваем или расширяем талию брюк, юбок, платьев и пиджаков по вашей фигуре. Посадку определяем вместе с вами на примерке.',
      de: 'Wir machen die Taille von Hosen, Röcken, Kleidern und Sakkos enger oder weiter, passend zu Ihrer Figur. Die Passform legen wir gemeinsam bei der Anprobe fest.',
    },
    vars: {
      tr: ['bel daraltma', 'pantolon bel daraltma', 'elbise bel daraltma', 'bel genişletme terzi', 'beden küçültme terzi', 'kıyafet daraltma', 'etek bel daraltma'],
      en: ['waist alteration', 'take in waist', 'take in trousers waist', 'dress taking in', 'clothes too big alteration', 'let out waist tailor'],
      ru: ['ушить в талии', 'ушить брюки', 'ушить платье', 'ателье ушить одежду', 'расширить в талии', 'уменьшить размер одежды'],
      de: ['Taille enger machen', 'Hose enger machen', 'Kleid enger machen', 'Kleidung enger machen lassen', 'Bund weiter machen', 'Änderungsschneiderei Taille'],
    },
  },
  {
    id: 'fermuar', icon: '🔧', time: 'same', priceFrom: 200,
    slug: { tr: 'fermuar-degisimi-tamiri', en: 'zipper-repair-replacement', ru: 'zamena-molnii', de: 'reissverschluss-wechseln' },
    name: { tr: 'Fermuar Değişimi ve Tamiri', en: 'Zipper Repair & Replacement', ru: 'Замена и ремонт молнии', de: 'Reißverschluss wechseln und reparieren' },
    q: { tr: 'fermuar değişimi', en: 'zipper replacement', ru: 'замена молнии', de: 'Reißverschluss wechseln' },
    intro: {
      tr: 'Pantolon, etek, elbise, mont, çanta ve ceket fermuarını değiştiriyor veya tamir ediyoruz. Kıyafetin kumaşına ve renge uygun fermuar seçilir.',
      en: 'We replace or repair zippers on trousers, skirts, dresses, coats, jackets and bags. The zipper is matched to the fabric and colour of the garment.',
      ru: 'Меняем и ремонтируем молнии на брюках, юбках, платьях, куртках, пальто и сумках. Молнию подбираем по ткани и цвету изделия.',
      de: 'Wir wechseln oder reparieren Reißverschlüsse an Hosen, Röcken, Kleidern, Jacken, Mänteln und Taschen. Der Reißverschluss wird passend zu Stoff und Farbe gewählt.',
    },
    vars: {
      tr: ['fermuar değişimi', 'fermuar tamiri', 'fermuar değiştirme terzi', 'pantolon fermuar tamiri', 'mont fermuar değişimi', 'elbise fermuarı değişimi', 'çanta fermuar tamiri'],
      en: ['zipper repair', 'zipper replacement', 'replace zipper tailor', 'trouser zipper repair', 'jacket zipper replacement', 'dress zipper repair near me'],
      ru: ['замена молнии', 'ремонт молнии', 'заменить молнию на куртке', 'замена молнии на брюках', 'ремонт молнии на платье', 'ателье замена молнии'],
      de: ['Reißverschluss wechseln', 'Reißverschluss reparieren', 'Reißverschluss Jacke wechseln', 'Reißverschluss Hose reparieren', 'Reißverschluss Kleid wechseln', 'Reißverschluss Reparatur Schneider'],
    },
  },
  {
    id: 'elbise-dikim', icon: '👗', time: 'three', priceFrom: 600,
    slug: { tr: 'elbise-dikimi', en: 'custom-dress-making', ru: 'poshiv-platya', de: 'kleid-naehen-lassen' },
    name: { tr: 'Elbise Dikimi (Ölçüye Göre)', en: 'Custom Dress Making', ru: 'Пошив платьев на заказ', de: 'Kleid nach Maß nähen' },
    q: { tr: 'elbise dikimi', en: 'custom dress making', ru: 'пошив платья', de: 'Kleid nähen lassen' },
    intro: {
      tr: 'Beden ölçünüze göre elbise dikimi yapıyoruz: günlük elbise, keten elbise, gece kıyafeti ve abiye. Model, kumaş ve ölçü birlikte belirlenir.',
      en: 'We make dresses to your measurements: everyday dresses, linen dresses, evening wear and formal gowns. Style, fabric and size are decided together with you.',
      ru: 'Шьём платья по вашим меркам: повседневные, льняные, вечерние и коктейльные. Модель, ткань и размер выбираем вместе с вами.',
      de: 'Wir nähen Kleider nach Ihren Maßen: Alltagskleider, Leinenkleider, Abendmode und festliche Roben. Schnitt, Stoff und Größe legen wir gemeinsam fest.',
    },
    extra: { href: '/dogal-keten-pamuk-giyim', label: { tr: 'Doğal keten ve pamuk giyim', en: 'Natural linen & cotton clothing (Turkish)', ru: 'Одежда из льна и хлопка (тур.)', de: 'Leinen- und Baumwollkleidung (türk.)' } },
    vars: {
      tr: ['elbise dikimi', 'ölçüye göre elbise dikimi', 'elbise diktirme', 'keten elbise dikimi', 'gece kıyafeti dikimi', 'bayan kıyafet dikimi', 'bay bayan kıyafet dikimi'],
      en: ['custom dress making', 'dress made to measure', 'get a dress sewn', 'linen dress tailor', 'evening dress tailor', 'women clothing tailor'],
      ru: ['пошив платья на заказ', 'пошив платья по меркам', 'заказать платье в ателье', 'пошив льняного платья', 'пошив вечернего платья', 'ателье женской одежды'],
      de: ['Kleid nach Maß', 'Kleid nähen lassen', 'Maßschneiderei Kleid', 'Leinenkleid nähen lassen', 'Abendkleid nähen lassen', 'Damenschneiderei'],
    },
  },
  {
    id: 'elbise-tamir', icon: '🧵', time: 'next',
    slug: { tr: 'elbise-tamiri-tadilati', en: 'dress-repair-alteration', ru: 'remont-i-pereshiv-platya', de: 'kleid-aendern-reparieren' },
    name: { tr: 'Elbise Tamiri ve Tadilatı', en: 'Dress Repair & Alteration', ru: 'Ремонт и переделка платьев', de: 'Kleider ändern und reparieren' },
    q: { tr: 'elbise tamiri', en: 'dress alteration', ru: 'ремонт платья', de: 'Kleid ändern' },
    intro: {
      tr: 'Elbise daraltma, kısaltma, askı ve kol ayarı, sökük dikimi ve onarım işlerini yapıyoruz. Gündelik elbiseden özel gün elbisesine kadar her kıyafet için ölçü provayla alınır.',
      en: 'We take in, shorten and repair dresses, adjust straps and sleeves, and fix seams. Everything from everyday dresses to special-occasion outfits is fitted on you.',
      ru: 'Ушиваем и укорачиваем платья, подгоняем бретели и рукава, исправляем швы и ремонтируем. От повседневных платьев до нарядных, с примеркой на вас.',
      de: 'Wir machen Kleider enger, kürzen sie, passen Träger und Ärmel an und reparieren Nähte. Vom Alltagskleid bis zum festlichen Outfit wird alles anprobiert.',
    },
    vars: {
      tr: ['elbise tamiri', 'elbise tadilatı', 'elbise daraltma', 'elbise kısaltma', 'elbise tamiri terzi', 'kıyafet tadilatı', 'her türlü kıyafet tadilatı'],
      en: ['dress alteration', 'dress repair', 'dress tailor near me', 'shorten dress', 'take in dress', 'clothing alterations'],
      ru: ['переделка платья', 'ремонт платья', 'ушить платье', 'укоротить платье', 'ателье по ремонту одежды', 'подгонка платья по фигуре'],
      de: ['Kleid ändern', 'Kleid reparieren', 'Kleid kürzen', 'Kleid enger machen', 'Änderungsschneiderei Kleid', 'Kleidung ändern lassen'],
    },
  },
  {
    id: 'gelinlik-abiye', icon: '👰', time: 'none',
    slug: { tr: 'gelinlik-abiye-tadilati', en: 'wedding-evening-dress-alteration', ru: 'podgonka-svadebnogo-vechernego-platya', de: 'brautkleid-abendkleid-aendern' },
    name: { tr: 'Gelinlik ve Abiye Tadilatı', en: 'Wedding & Evening Dress Alteration', ru: 'Подгонка свадебных и вечерних платьев', de: 'Brautkleid und Abendkleid ändern' },
    q: { tr: 'gelinlik ve abiye tadilatı', en: 'wedding dress alteration', ru: 'подгонка свадебного платья', de: 'Brautkleid ändern' },
    priceText: {
      tr: 'Gelinlik tadilatı ₺800\'den, abiye tadilatı ₺400\'den başlar.',
      en: 'Wedding dress alteration starts from ₺800, evening dress alteration from ₺400.',
      ru: 'Подгонка свадебного платья от ₺800, вечернего платья от ₺400.',
      de: 'Brautkleid-Änderung ab ₺800, Abendkleid-Änderung ab ₺400.',
    },
    timeText: {
      tr: 'Abiye tadilatı ertesi gün (1 gün) teslim edilir; gelinlikte süre işlemin kapsamına göre WhatsApp\'ta netleştirilir.',
      en: 'Evening dress alterations are ready the next day (1 day); for wedding dresses the time depends on the work and is confirmed on WhatsApp.',
      ru: 'Вечерние платья готовы на следующий день (1 день); для свадебных платьев срок зависит от объёма работы и уточняется в WhatsApp.',
      de: 'Abendkleid-Änderungen sind am nächsten Tag (1 Tag) fertig; beim Brautkleid hängt die Dauer vom Umfang ab und wird per WhatsApp geklärt.',
    },
    intro: {
      tr: 'Gelinlik ve abiyede daraltma, boy ayarı, korse ve askı düzenlemesi gibi hassas işleri provalı olarak yapıyoruz. Otelde konaklayan gelinler ve davetliler için servis mümkündür.',
      en: 'We handle delicate work on wedding and evening gowns — taking in, hem length, corset and strap adjustments — with fittings. Service to hotels is available for brides and guests staying in Antalya.',
      ru: 'Выполняем деликатные работы на свадебных и вечерних платьях — ушивание, длина, корсет и бретели — с примерками. Для невест и гостей, остановившихся в отеле, возможен выезд.',
      de: 'Wir führen empfindliche Arbeiten an Braut- und Abendkleidern aus — Enger machen, Saumlänge, Korsett und Träger — mit Anprobe. Für Bräute und Gäste im Hotel ist ein Service möglich.',
    },
    vars: {
      tr: ['gelinlik tadilatı', 'gelinlik daraltma', 'abiye tadilatı', 'abiye elbise daraltma', 'gece elbisesi tadilat', 'abiye tamiri', 'gelinlik boy ayarı'],
      en: ['wedding dress alteration', 'bridal gown alterations', 'evening gown alteration', 'prom dress alteration', 'formal dress tailor', 'wedding dress tailor near me'],
      ru: ['подгонка свадебного платья', 'ушить свадебное платье', 'переделка вечернего платья', 'ателье свадебные платья', 'подгонка вечернего платья', 'ушить вечернее платье'],
      de: ['Brautkleid ändern', 'Brautkleid enger machen', 'Abendkleid ändern', 'Abendkleid kürzen', 'Brautkleid Änderungsschneiderei', 'Festliches Kleid ändern'],
    },
  },
  {
    id: 'takim', icon: '🤵', time: 'next',
    slug: { tr: 'takim-elbise-ceket-tadilati', en: 'suit-jacket-alteration', ru: 'podgonka-kostyuma-pidzhaka', de: 'anzug-sakko-aendern' },
    name: { tr: 'Takım Elbise ve Ceket Tadilatı', en: 'Suit & Jacket Alteration', ru: 'Подгонка костюма и пиджака', de: 'Anzug und Sakko ändern' },
    q: { tr: 'takım elbise tadilatı', en: 'suit alteration', ru: 'подгонка костюма', de: 'Anzug ändern' },
    intro: {
      tr: 'Takım elbise ve ceket daraltma, kısaltma, kol boyu ve omuz düzeltme işlerini yapıyoruz. Pantolon ve ceket birlikte ölçülür, bay ve bayan modeller için uygulanır.',
      en: 'We take in and shorten suits and jackets and adjust sleeve length and shoulders. Jacket and trousers are fitted together, for men\'s and women\'s cuts.',
      ru: 'Ушиваем и укорачиваем костюмы и пиджаки, подгоняем длину рукава и плечи. Пиджак и брюки примеряем вместе, для мужских и женских моделей.',
      de: 'Wir machen Anzüge und Sakkos enger, kürzen sie und passen Ärmellänge und Schultern an. Sakko und Hose werden zusammen anprobiert, für Herren und Damen.',
    },
    vars: {
      tr: ['takım elbise tadilatı', 'ceket daraltma', 'ceket kısaltma', 'ceket kol kısaltma', 'takım elbise daraltma', 'blazer ceket tadilat', 'bay bayan ceket tadilatı'],
      en: ['suit alteration', 'jacket alteration', 'tailor suit near me', 'take in jacket', 'shorten jacket sleeves', 'blazer alteration'],
      ru: ['подгонка костюма', 'ушить пиджак', 'укоротить рукава пиджака', 'ателье мужские костюмы', 'переделка пиджака', 'ушить костюм'],
      de: ['Anzug ändern', 'Sakko ändern', 'Sakko enger machen', 'Sakkoärmel kürzen', 'Anzug Änderung Schneider', 'Blazer ändern lassen'],
    },
  },
  {
    id: 'mont', icon: '🧥', time: 'next',
    slug: { tr: 'mont-palto-tadilati', en: 'coat-jacket-alteration', ru: 'podgonka-kurtki-palto', de: 'mantel-jacke-aendern' },
    name: { tr: 'Mont ve Palto Tadilatı', en: 'Coat & Jacket Alteration', ru: 'Подгонка курток и пальто', de: 'Mantel und Jacke ändern' },
    q: { tr: 'mont tadilatı', en: 'coat alteration', ru: 'подгонка куртки', de: 'Mantel ändern' },
    intro: {
      tr: 'Mont, kaban ve paltoda daraltma, kısaltma, kol ve fermuar işlerini yapıyoruz. Astarlı ve kalın kumaşlar için uygun makine ve iplik kullanılır.',
      en: 'We take in and shorten coats and padded jackets and handle sleeve and zipper work. Suitable machines and thread are used for lined and thick fabrics.',
      ru: 'Ушиваем и укорачиваем куртки и пальто, меняем рукава и молнии. Для подкладочных и плотных тканей используем подходящие машины и нитки.',
      de: 'Wir machen Mäntel und Jacken enger, kürzen sie und erledigen Ärmel- und Reißverschlussarbeiten. Für gefütterte und dicke Stoffe nutzen wir passende Maschinen und Garne.',
    },
    vars: {
      tr: ['mont tadilatı', 'mont daraltma', 'mont kısaltma', 'palto tadilatı', 'kaban daraltma', 'mont kol kısaltma', 'mont tamiri'],
      en: ['coat alteration', 'jacket repair', 'shorten coat sleeves', 'take in coat', 'winter jacket alteration', 'coat tailor near me'],
      ru: ['подгонка куртки', 'ушить куртку', 'укоротить рукава пальто', 'ремонт куртки', 'переделка пальто', 'ателье куртки'],
      de: ['Mantel ändern', 'Jacke enger machen', 'Mantelärmel kürzen', 'Jacke reparieren', 'Wintermantel ändern', 'Mantel Änderung Schneider'],
    },
  },
  {
    id: 'gomlek', icon: '👔', time: 'next',
    slug: { tr: 'gomlek-daraltma-kisaltma', en: 'shirt-alteration', ru: 'podgonka-rubashki', de: 'hemd-aendern' },
    name: { tr: 'Gömlek Daraltma ve Kısaltma', en: 'Shirt Alteration', ru: 'Подгонка рубашек', de: 'Hemd ändern' },
    q: { tr: 'gömlek daraltma', en: 'shirt alteration', ru: 'подгонка рубашки', de: 'Hemd enger machen' },
    intro: {
      tr: 'Gömlekte yan daraltma, kol boyu ve etek boyu kısaltma işlemlerini yapıyoruz. Erkek ve kadın gömlekleri için ölçü deneme üzerinde alınır.',
      en: 'We take in shirts at the sides and shorten sleeves and hems. Men\'s and women\'s shirts are measured on you.',
      ru: 'Ушиваем рубашки по бокам, укорачиваем рукава и низ. Мужские и женские рубашки меряем на вас.',
      de: 'Wir machen Hemden seitlich enger und kürzen Ärmel und Saum. Herren- und Damenhemden werden am Körper abgesteckt.',
    },
    vars: {
      tr: ['gömlek daraltma', 'gömlek kısaltma', 'gömlek kol kısaltma', 'gömlek tadilatı', 'gömlek yan daraltma', 'gömlek boy kısaltma'],
      en: ['shirt alteration', 'take in shirt', 'shorten shirt sleeves', 'tailor shirt near me', 'shirt hemming', 'slim fit shirt alteration'],
      ru: ['подгонка рубашки', 'ушить рубашку', 'укоротить рукава рубашки', 'ателье рубашки', 'подшив рубашки', 'ушивание рубашки по бокам'],
      de: ['Hemd enger machen', 'Hemd kürzen', 'Hemdärmel kürzen', 'Hemd ändern lassen', 'Hemd Änderung Schneider', 'Hemd Seitennähte enger'],
    },
  },
  {
    id: 'deri', icon: '🧤', time: 'none',
    slug: { tr: 'deri-ceket-pantolon-tadilati', en: 'leather-jacket-alteration', ru: 'remont-kozhanoy-odezhdy', de: 'lederjacke-lederhose-aendern' },
    name: { tr: 'Deri Ceket ve Deri Pantolon Tadilatı', en: 'Leather Jacket & Leather Trousers Alteration', ru: 'Ремонт и подгонка кожаной одежды', de: 'Lederjacke und Lederhose ändern' },
    q: { tr: 'deri ceket tadilatı', en: 'leather jacket alteration', ru: 'ремонт кожаной куртки', de: 'Lederjacke ändern' },
    intro: {
      tr: 'Deri ceket ve deri pantolonda daraltma, kısaltma ve onarım için önce fotoğraf istiyoruz; deri cinsine göre yapılabilecek işlem ve fiyat net olarak söylenir.',
      en: 'For leather jackets and leather trousers we ask for a photo first; the possible work and the price are confirmed once we know the type of leather.',
      ru: 'Для кожаных курток и брюк сначала просим фото; возможные работы и цену называем после определения типа кожи.',
      de: 'Bei Lederjacken und Lederhosen bitten wir zuerst um ein Foto; mögliche Arbeiten und Preis nennen wir, sobald die Lederart klar ist.',
    },
    vars: {
      tr: ['deri ceket tadilatı', 'deri ceket daraltma', 'deri pantolon tadilatı', 'deri ceket kol kısaltma', 'deri ceket tamiri', 'deri mont terzi'],
      en: ['leather jacket alteration', 'leather jacket repair', 'leather trousers alteration', 'shorten leather jacket sleeves', 'leather tailor Antalya', 'take in leather jacket'],
      ru: ['ремонт кожаной куртки', 'подгонка кожаной куртки', 'ушить кожаную куртку', 'укоротить рукава кожаной куртки', 'ремонт кожаных брюк', 'ателье кожа'],
      de: ['Lederjacke ändern', 'Lederjacke enger machen', 'Lederhose ändern', 'Lederjacke Ärmel kürzen', 'Lederjacke reparieren', 'Lederschneider'],
    },
  },
  {
    id: 'tisort', icon: '👕', time: 'none',
    slug: { tr: 'tisort-sort-tadilati', en: 'tshirt-shorts-alteration', ru: 'podgonka-futbolok-shortov', de: 'tshirt-shorts-aendern' },
    name: { tr: 'Tişört ve Şort Tadilatı', en: 'T-shirt & Shorts Alteration', ru: 'Подгонка футболок и шортов', de: 'T-Shirt und Shorts ändern' },
    q: { tr: 'tişört şort tadilatı', en: 'shorts alteration', ru: 'подгонка шортов', de: 'Shorts ändern' },
    intro: {
      tr: 'Tişört daraltma ve kısaltma, şort boy ve bel ayarı gibi küçük tadilatları yapıyoruz. Fotoğraf gönderin, işlemin fiyatını WhatsApp\'tan hemen söyleyelim.',
      en: 'We do small alterations such as taking in or shortening T-shirts and adjusting shorts length and waist. Send a photo and we will quote on WhatsApp.',
      ru: 'Выполняем небольшие переделки: ушиваем и укорачиваем футболки, подгоняем длину и пояс шортов. Пришлите фото — назовём цену в WhatsApp.',
      de: 'Wir erledigen kleine Änderungen wie T-Shirts enger machen oder kürzen und Shorts in Länge und Bund anpassen. Foto senden, Preis per WhatsApp.',
    },
    vars: {
      tr: ['tişört daraltma', 'tişört kısaltma', 'şort kısaltma', 'şort bel daraltma', 'şort tadilatı', 'tişört tadilatı'],
      en: ['t-shirt alteration', 'shorts alteration', 'shorten shorts', 'take in t-shirt', 'shorts waist alteration', 'summer clothes alteration'],
      ru: ['подгонка футболки', 'подшить шорты', 'ушить футболку', 'ушить шорты в поясе', 'переделка шортов', 'ателье летняя одежда'],
      de: ['T-Shirt enger machen', 'Shorts kürzen', 'T-Shirt kürzen', 'Shorts Bund enger machen', 'Shorts ändern', 'Sommerkleidung ändern'],
    },
  },
  {
    id: 'beden', icon: '📐', time: 'none',
    slug: { tr: 'olcuye-gore-beden-ayarlama', en: 'size-adjustment-tailor', ru: 'podgonka-odezhdy-po-figure', de: 'kleidung-anpassen-nach-mass' },
    name: { tr: 'Ölçüye Göre Beden Ayarlama', en: 'Fit Adjustment to Your Measurements', ru: 'Подгонка одежды по фигуре', de: 'Kleidung auf Ihre Maße anpassen' },
    q: { tr: 'beden ayarlama', en: 'size adjustment', ru: 'подгонка по фигуре', de: 'Kleidung anpassen' },
    intro: {
      tr: 'Bay ve bayan kıyafetlerini beden ölçünüze göre ayarlıyoruz: daraltma, genişletme, kısaltma, uzatma, omuz ve kol düzeltme. Kaliteli işçilik, özenli dikiş ve zamanında teslim esastır.',
      en: 'We fit men\'s and women\'s clothing to your measurements: taking in, letting out, shortening, lengthening, shoulders and sleeves. Careful workmanship, clean stitching and on-time delivery come first.',
      ru: 'Подгоняем мужскую и женскую одежду по вашим меркам: ушивание, расширение, укорачивание, удлинение, плечи и рукава. Качественная работа, аккуратный шов и сдача в срок.',
      de: 'Wir passen Herren- und Damenkleidung an Ihre Maße an: enger, weiter, kürzer, länger, Schultern und Ärmel. Sorgfältige Arbeit, saubere Nähte und pünktliche Lieferung stehen im Mittelpunkt.',
    },
    vars: {
      tr: ['beden ayarlama terzi', 'ölçüye göre kıyafet ayarlama', 'kıyafet daraltma kısaltma', 'bay bayan kıyafet tadilatı', 'terzi tadilat', 'dikiş tamir terzi', 'giysi tadilatı'],
      en: ['clothing alterations Antalya', 'tailor near me', 'alterations shop', 'fit clothes to measurements', 'men and women clothing alteration', 'seamstress Antalya'],
      ru: ['ателье по ремонту одежды', 'портной рядом со мной', 'подгонка одежды по фигуре', 'мужская и женская одежда переделка', 'срочный ремонт одежды', 'швея Анталья'],
      de: ['Änderungsschneiderei', 'Schneider in der Nähe', 'Kleidung anpassen lassen', 'Herren- und Damenkleidung ändern', 'Schneiderei Antalya', 'Änderungsservice Kleidung'],
    },
  },
];

// ── Yardımcılar ─────────────────────────────────────────────
// Türkçe sayfalar: swaphubs'ta zaten var olan rotalar korunur, yalnızca eksikler için yeni rota kullanılır
const KONYAALTI_SLUGS = new Set(KONYAALTI_MAHALLELERI.map((m) => m.slug));
const ILCE_SLUGS = new Set(ANTALYA_ILCELERI.map((i) => i.slug));
export const trDistrictHasOwnRoute = (slug: string) => slug === 'konyaalti' || KONYAALTI_SLUGS.has(slug) || ILCE_SLUGS.has(slug);
export const districtUrl = (lang: Lang, d: District) => {
  if (lang !== 'tr') return `${DISTRICT_BASE[lang]}/${d.slug}`;
  if (d.slug === 'konyaalti') return '/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti';
  if (KONYAALTI_SLUGS.has(d.slug)) return `/terzi/konyaalti/${d.slug}`;
  if (ILCE_SLUGS.has(d.slug)) return `/terzi/antalya/${d.slug}`;
  return `${DISTRICT_BASE.tr}/${d.slug}`;
};
const TR_SERVICE_PAGES: Record<string, string> = {
  paca: '/terzi/paca-kisaltma-antalya', fermuar: '/terzi/fermuar-degisimi', 'elbise-dikim': '/antalya-terzi-elbise-dikimi',
};
export const trServiceHasOwnRoute = (id: string) => id in TR_SERVICE_PAGES;
export const serviceUrl = (lang: Lang, s: Service) =>
  lang === 'tr' && TR_SERVICE_PAGES[s.id] ? TR_SERVICE_PAGES[s.id] : `${SERVICE_BASE[lang]}/${s.slug[lang]}`;
export const abs = (p: string) => `${SITE}${p}`;
export const findDistrict = (slug: string) => DISTRICTS.find((d) => d.slug === slug);
export const findServiceBySlug = (lang: Lang, slug: string) => SERVICES.find((s) => s.slug[lang] === slug);

/** "{yer} {hizmet}" sorgusu (dile göre sözdizimi) */
export function query(lang: Lang, d: District, s: Service): string {
  if (lang === 'tr') return `${d.loc.tr} ${s.q.tr}`;
  if (lang === 'ru') return `${s.q.ru} ${d.loc.ru}`;
  return `${s.q[lang]} ${d.loc[lang]}`;
}

export const TIME_TEXT: Record<TimeKey, L4> = {
  same: { tr: 'Aynı gün teslim', en: 'Same-day delivery', ru: 'Готово в тот же день', de: 'Am selben Tag fertig' },
  next: { tr: '1 gün sonra (ertesi gün) teslim', en: 'Ready the next day (1 day)', ru: 'Готово на следующий день (1 день)', de: 'Am nächsten Tag fertig (1 Tag)' },
  three: { tr: '3 günde teslim', en: 'Ready in 3 days', ru: 'Готово за 3 дня', de: 'In 3 Tagen fertig' },
  none: { tr: 'Süre işleme göre WhatsApp\'ta netleştirilir', en: 'Time confirmed on WhatsApp depending on the work', ru: 'Срок уточняется в WhatsApp в зависимости от работы', de: 'Dauer wird per WhatsApp je nach Arbeit geklärt' },
};
export const timeOf = (lang: Lang, s: Service) => (s.timeText ? s.timeText[lang] : TIME_TEXT[s.time][lang]);
export const priceOf = (lang: Lang, s: Service) =>
  s.priceText ? s.priceText[lang] : s.priceFrom ? (lang === 'tr' ? `₺${s.priceFrom}'den başlar` : lang === 'en' ? `from ₺${s.priceFrom}` : lang === 'ru' ? `от ₺${s.priceFrom}` : `ab ₺${s.priceFrom}`) : null;
