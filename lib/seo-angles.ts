// ============================================================
// lib/seo-angles.ts — Bölge sayfaları için "arama niyeti açıları"
// Her bölge sayfası, 6 açıdan (dikim / tamir-tadilat / fermuar-paça / daraltma-beden / keten-pamuk / üst giyim)
// birini ağırlık alır; böylece başlık, açıklama ve anahtar kelimeler sayfadan sayfaya farklılaşır (kopya hissi olmaz)
// ve her sayfa farklı bir aramada öne çıkar. Yalnızca doğrulanmış bilgiler kullanılır; sahte vaat yok.
// ============================================================
export type ALang = 'tr' | 'en' | 'ru' | 'de';
export const ANGLE_COUNT = 6;          // Türkçe: 6 niyet
export const FOREIGN_ANGLE_COUNT = 12; // EN/RU/DE: 12 niyet (6 temel + 6 ek)
export const A_DIKIM = 0, A_TAMIR = 1, A_FERMUAR = 2, A_DARALTMA = 3, A_KETEN = 4, A_UST = 5;

export function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Yabancı dillerde öncelikli bölgelere elle seçilmiş niyet (hotel/turist bölgeleri ↔ en çok aranan sorgu). */
const FG_ANGLE: Record<'en' | 'ru' | 'de', Record<string, number>> = {
  en: { konyaalti: 1, muratpasa: 11, side: 7, aksu: 6, kundu: 9, belek: 10, lara: 7, kemer: 8, beldibi: 6 },
  ru: { konyaalti: 1, muratpasa: 6, side: 7, aksu: 11, kundu: 8, belek: 7, lara: 10, kemer: 9, beldibi: 2 },
  de: { konyaalti: 1, muratpasa: 11, side: 6, aksu: 7, kundu: 10, belek: 9, lara: 8, kemer: 7, beldibi: 3 },
};
const FG_SHIFT: Record<'en' | 'ru' | 'de', number> = { en: 0, ru: 5, de: 9 };

/** Bölgeye açı atar. Türkçe + yakın bölge: tamir-tadilat Konyaaltı'nda ön planda; Türkçe + uzak bölge: tamir-tadilat açısı verilmez.
 *  Yabancı diller: öncelikli bölgeler elle, diğerleri sıra numarasıyla dağıtılır (12 niyet eşit yayılır, dil başına kaydırmalı). */
export function angleFor(lang: ALang, slug: string, trNear: boolean, nearOrder: number): number {
  if (lang === 'tr') {
    if (trNear) {
      if (slug === 'konyaalti') return A_TAMIR;
      const seq = [A_FERMUAR, A_DARALTMA, A_UST, A_DIKIM, A_KETEN, A_TAMIR, A_FERMUAR];
      return seq[nearOrder % seq.length];
    }
    const seq = [A_DIKIM, A_FERMUAR, A_DARALTMA, A_KETEN, A_UST];
    return seq[hashStr(slug) % seq.length];
  }
  const fixed = FG_ANGLE[lang][slug];
  if (fixed !== undefined) return fixed;
  return (nearOrder + FG_SHIFT[lang]) % FOREIGN_ANGLE_COUNT;
}

export interface AngleCtx {
  lang: ALang;
  n: string;          // bölge adı (o dilde)
  loc: string;        // "…'da" / "in X" / "в X"
  free: boolean;      // ücretsiz servis bölgesi mi (yakın) — değilse "bölgeye göre fiyatlandırılır"
  tail: string;       // site tonuna göre kapanış: telefon + (saat | fotoğraf at, fiyat al)
}

// Servis kuralı (lib/business.ts): otellere servis her bölgede ücretsiz; eve servis yalnız Konyaaltı ve yakın mahallelerde ücretsiz.
const SVC: Record<ALang, { free: string; paid: string }> = {
  tr: { free: 'Otele ve eve ücretsiz servis', paid: 'Otellere ücretsiz servis' },
  en: { free: 'Free hotel & home pick-up', paid: 'Free hotel pick-up' },
  ru: { free: 'Выезд в отель и на дом бесплатно', paid: 'Выезд в отели бесплатно' },
  de: { free: 'Gratis-Abholung Hotel & Zuhause', paid: 'Hotelabholung gratis' },
};

type T = { titles: (n: string) => string[]; core: (c: AngleCtx) => string; extra: string; kw: (n: string) => string[] };
const S = (lang: ALang, f: boolean) => (f ? SVC[lang].free : SVC[lang].paid);

const TR: T[] = [
  { titles: (n) => [`${n} Terzi · Elbise Dikimi, Özel Dikim | Terzi Can`, `${n} Elbise Dikimi, Özel Dikim | Terzi Can`, `${n} Terzi | Terzi Can`],
    core: (c) => `${c.loc} bay bayan elbise dikimi, özel dikim: ölçüye göre, keten ve pamuk`, extra: 'Kaliteli işçilik, net fiyat',
    kw: (n) => [`${n} elbise dikimi`, `${n} özel dikim`, `${n} bayan kıyafet dikimi`, `${n} bay terzi`, `${n} ölçüye göre dikim`] },
  { titles: (n) => [`${n} Tamir Tadilat · Bay Bayan Terzi | Terzi Can`, `${n} Tamir Tadilat Terzi | Terzi Can`, `${n} Terzi | Terzi Can`],
    core: (c) => `${c.loc} tamir tadilat: söküğü, yırtığı dikme, daraltma, abiye tamiri; bay bayan`, extra: 'Özenli dikiş, net fiyat',
    kw: (n) => [`${n} tamir tadilat`, `${n} söküğü dikme`, `${n} yırtık tamiri`, `${n} elbise tamiri ve tadilatı`, `${n} abiye tamiri`] },
  { titles: (n) => [`${n} Fermuar Değişimi, Paça Kısaltma | Terzi Can`, `${n} Fermuar ve Paça Kısaltma | Terzi Can`, `${n} Terzi | Terzi Can`],
    core: (c) => `${c.loc} fermuar değişimi, tamiri, paça kısaltma: pantolon, etek, mont`, extra: 'Kaliteli işçilik, net fiyat',
    kw: (n) => [`${n} fermuar değişimi`, `${n} fermuar tamiri`, `${n} paça kısaltma`, `${n} pantolon kısaltma`, `${n} etek kısaltma`] },
  { titles: (n) => [`${n} Bel Daraltma, Beden Ayarı | Terzi Can`, `${n} Bel Daraltma, Beden Ayarı`, `${n} Terzi | Terzi Can`],
    core: (c) => `${c.loc} bel daraltma, beden küçültme ve büyütme: pantolon, elbise, ceket`, extra: 'Müşteri memnuniyeti odaklı hizmet',
    kw: (n) => [`${n} bel daraltma`, `${n} beden küçültme`, `${n} beden büyütme`, `${n} kıyafet daraltma`, `${n} ölçüye göre ayar`] },
  { titles: (n) => [`${n} Keten, Pamuk Dikim · Ölçüye Göre | Terzi Can`, `${n} Keten Pamuk Dikim | Terzi Can`, `${n} Terzi | Terzi Can`],
    core: (c) => `${c.loc} keten ve pamuk kumaştan ölçüye göre dikim: elbise, gömlek, pantolon`, extra: 'Özenli dikiş, güncel fiyat',
    kw: (n) => [`${n} keten elbise dikimi`, `${n} pamuk gömlek dikimi`, `${n} keten pantolon dikimi`, `${n} ölçüye göre elbise`] },
  { titles: (n) => [`${n} Ceket, Mont, Gömlek, Etek Tadilatı | Terzi Can`, `${n} Ceket, Mont, Gömlek Tadilatı | Terzi Can`, `${n} Terzi | Terzi Can`],
    core: (c) => `${c.loc} ceket, mont, gömlek, etek tadilatı: boy, kol kısaltma, daraltma; bay bayan`, extra: 'Kaliteli işçilik, net fiyat',
    kw: (n) => [`${n} ceket tadilatı`, `${n} mont kısaltma`, `${n} gömlek daraltma`, `${n} etek boy kısaltma`, `${n} mont tamiri`] },
];
const EN: T[] = [
  { titles: (n) => [`Tailor in ${n} · Custom Dress Making | Terzi Can`, `Custom Dress Making in ${n} | Terzi Can`, `Tailor in ${n} | Terzi Can`],
    core: (c) => `Custom dress making ${c.loc}: men's and women's clothing to measure, linen, cotton`, extra: 'Quality work, fair prices',
    kw: (n) => [`custom dress making ${n}`, `tailor made clothing ${n}`, `dressmaker ${n} Antalya`, `made to measure ${n}`] },
  { titles: (n) => [`Clothing Repair & Alterations in ${n} | Terzi Can`, `Clothing Repair in ${n}, Antalya | Terzi Can`, `Tailor in ${n} | Terzi Can`],
    core: (c) => `Clothing repair ${c.loc}: torn seams, hemming, taking in, evening dress repair; men, women`, extra: 'Careful stitching, clear prices',
    kw: (n) => [`clothing repair ${n}`, `alterations ${n} Antalya`, `torn clothes repair ${n}`, `dress repair ${n}`, `tailor repair ${n}`] },
  { titles: (n) => [`Zipper Repair & Hemming in ${n} | Terzi Can`, `Zipper & Hemming in ${n} | Terzi Can`, `Tailor in ${n} | Terzi Can`],
    core: (c) => `Zipper repair and replacement, trouser and skirt hemming ${c.loc}`, extra: 'Quality work, clear prices',
    kw: (n) => [`zipper repair ${n}`, `zipper replacement ${n}`, `trouser hemming ${n}`, `skirt hemming ${n}`, `shorten trousers ${n}`] },
  { titles: (n) => [`Tailor in ${n} · Taking In, Letting Out | Terzi Can`, `Waist & Size Alterations in ${n} | Terzi Can`, `Tailor in ${n} | Terzi Can`],
    core: (c) => `Waist taking in, size changes smaller or bigger ${c.loc}: trousers, dresses, jackets`, extra: 'Customer-focused service',
    kw: (n) => [`waist alteration ${n}`, `take in clothes ${n}`, `let out clothes ${n}`, `size adjustment tailor ${n}`] },
  { titles: (n) => [`Linen & Cotton Tailoring in ${n} | Terzi Can`, `Linen Cotton Clothing in ${n} | Terzi Can`, `Tailor in ${n} | Terzi Can`],
    core: (c) => `Linen and cotton clothing made to measure ${c.loc}: dresses, shirts, trousers`, extra: 'Careful stitching, fair prices',
    kw: (n) => [`linen dress tailor ${n}`, `cotton shirt made to measure ${n}`, `linen clothing tailor ${n}`] },
  { titles: (n) => [`Jacket, Coat, Shirt Alterations in ${n} | Terzi Can`, `Jacket & Coat Alterations in ${n} | Terzi Can`, `Tailor in ${n} | Terzi Can`],
    core: (c) => `Jacket, coat, shirt, skirt alterations ${c.loc}: shorten length and sleeves, take in; men, women`, extra: 'Quality work, clear prices',
    kw: (n) => [`jacket alteration ${n}`, `coat shortening ${n}`, `shirt alteration ${n}`, `skirt hemming ${n}`] },
];
const RU: T[] = [
  { titles: (n) => [`Пошив платьев на заказ: ${n} | Terzi Can`, `Пошив одежды: ${n} | Terzi Can`, `Портной ${n} | Terzi Can`],
    core: (c) => `Пошив одежды ${c.loc}: мужская и женская, по меркам, лён и хлопок`, extra: 'Качественная работа, честные цены',
    kw: (n) => [`пошив платья на заказ ${n}`, `пошив одежды по меркам ${n}`, `портной ${n} Анталья`] },
  { titles: (n) => [`Ремонт и переделка одежды: ${n} | Terzi Can`, `Ремонт одежды: ${n} | Terzi Can`, `Портной ${n} | Terzi Can`],
    core: (c) => `Ремонт одежды ${c.loc}: зашить дырку, подшив, ушивание, вечерние платья; муж., жен.`, extra: 'Аккуратная строчка, понятные цены',
    kw: (n) => [`ремонт одежды ${n}`, `зашить дырку ${n}`, `переделка одежды ${n}`, `ремонт платья ${n}`] },
  { titles: (n) => [`Замена молнии и подшив: ${n} | Terzi Can`, `Молния и подшив: ${n} | Terzi Can`, `Портной ${n} | Terzi Can`],
    core: (c) => `Замена и ремонт молнии, подшив брюк и юбок ${c.loc}`, extra: 'Качественно, цены понятны',
    kw: (n) => [`замена молнии ${n}`, `ремонт молнии ${n}`, `подшить брюки ${n}`, `укоротить юбку ${n}`] },
  { titles: (n) => [`Ушить и расширить одежду: ${n} | Terzi Can`, `Ушивание в талии: ${n} | Terzi Can`, `Портной ${n} | Terzi Can`],
    core: (c) => `Ушивание в талии, смена размера ${c.loc}: брюки, платья, пиджаки`, extra: 'Внимание к клиенту',
    kw: (n) => [`ушить одежду ${n}`, `ушить в талии ${n}`, `увеличить размер одежды ${n}`] },
  { titles: (n) => [`Пошив из льна и хлопка: ${n} | Terzi Can`, `Лён и хлопок на заказ: ${n} | Terzi Can`, `Портной ${n} | Terzi Can`],
    core: (c) => `Пошив из льна и хлопка по меркам ${c.loc}: платья, рубашки, брюки`, extra: 'Аккуратная строчка, честные цены',
    kw: (n) => [`пошив из льна ${n}`, `льняное платье на заказ ${n}`, `хлопковая рубашка на заказ ${n}`] },
  { titles: (n) => [`Пиджак, куртка, рубашка, юбка: ${n} | Terzi Can`, `Подгонка пиджаков и курток: ${n} | Terzi Can`, `Портной ${n} | Terzi Can`],
    core: (c) => `Подгонка пиджаков, курток, рубашек, юбок ${c.loc}: длина, рукава, ушить; муж., жен.`, extra: 'Качественная работа',
    kw: (n) => [`подгонка пиджака ${n}`, `укоротить куртку ${n}`, `укоротить рукава ${n}`] },
];
const DE: T[] = [
  { titles: (n) => [`Maßschneiderei ${n} · Kleider nähen | Terzi Can`, `Maßschneiderei ${n} | Terzi Can`, `Schneider ${n} | Terzi Can`],
    core: (c) => `Maßanfertigung ${c.loc}: Damen- und Herrenkleidung, Leinen, Baumwolle`, extra: 'Saubere Arbeit, faire Preise',
    kw: (n) => [`Maßschneiderei ${n}`, `Kleid nähen lassen ${n}`, `Kleidung nach Maß ${n}`, `Schneider ${n} Antalya`] },
  { titles: (n) => [`Kleidung ändern & reparieren ${n} | Terzi Can`, `Kleidung reparieren ${n} | Terzi Can`, `Schneider ${n} | Terzi Can`],
    core: (c) => `Kleidung reparieren ${c.loc}: Risse nähen, Kürzen, enger machen, Abendkleid; Damen, Herren`, extra: 'Sorgfältige Nähte, klare Preise',
    kw: (n) => [`Kleidung reparieren ${n}`, `Änderungsschneiderei ${n}`, `Riss nähen ${n}`, `Kleid ändern ${n}`] },
  { titles: (n) => [`Reißverschluss wechseln, Kürzen ${n} | Terzi Can`, `Reißverschluss & Kürzen ${n} | Terzi Can`, `Schneider ${n} | Terzi Can`],
    core: (c) => `Reißverschluss wechseln, reparieren, Hosen und Röcke kürzen ${c.loc}`, extra: 'Saubere Arbeit, klare Preise',
    kw: (n) => [`Reißverschluss wechseln ${n}`, `Reißverschluss reparieren ${n}`, `Hose kürzen ${n}`, `Rock kürzen ${n}`] },
  { titles: (n) => [`Taille enger machen · Größe ändern ${n} | Terzi Can`, `Taille enger machen ${n} | Terzi Can`, `Schneider ${n} | Terzi Can`],
    core: (c) => `Taille enger machen, Größe ändern ${c.loc}: Hosen, Kleider, Sakkos`, extra: 'Kundenorientierter Service',
    kw: (n) => [`Taille enger machen ${n}`, `Kleidung enger machen ${n}`, `Kleidung weiter machen ${n}`] },
  { titles: (n) => [`Leinen & Baumwolle nähen lassen ${n} | Terzi Can`, `Leinenkleidung nach Maß ${n} | Terzi Can`, `Schneider ${n} | Terzi Can`],
    core: (c) => `Leinen- und Baumwollkleidung nach Maß ${c.loc}: Kleider, Hemden, Hosen`, extra: 'Sorgfältige Nähte, faire Preise',
    kw: (n) => [`Leinenkleid nähen lassen ${n}`, `Baumwollhemd nach Maß ${n}`, `Leinenkleidung Schneider ${n}`] },
  { titles: (n) => [`Sakko, Mantel, Hemd, Rock ändern ${n} | Terzi Can`, `Sakko & Mantel ändern ${n} | Terzi Can`, `Schneider ${n} | Terzi Can`],
    core: (c) => `Sakko, Mantel, Hemd, Rock ändern ${c.loc}: Länge, Ärmel kürzen, enger; Damen, Herren`, extra: 'Saubere Arbeit',
    kw: (n) => [`Sakko ändern ${n}`, `Mantel kürzen ${n}`, `Hemd enger machen ${n}`, `Rock kürzen ${n}`] },
];

// ── Yabancı diller için 6 EK arama niyeti (6–11): turist, otelden alım, kot/şort, abiye/gelinlik, bay-bayan, yakınımda+fiyat ──
// Yalnızca doğrulanmış bilgi: haftanın 7 günü, 08:00–23:00, otel/eve alım, paça ₺200'den, fermuar ₺300'den, EN/RU/DE konuşulur.
const V = (c: AngleCtx, a: string[]) => a[hashStr(c.n) % a.length];

const EN2: T[] = [
  { titles: (n) => [`Holiday Clothing Repair in ${n} | Terzi Can`, `Tailor for Tourists in ${n} | Terzi Can`, `Tailor in ${n} | Terzi Can`],
    core: (c) => V(c, [`Holiday clothes torn or too tight? Hemming, zippers, dress fixes ${c.loc}; message us on WhatsApp in your language`, `Tailor for visitors ${c.loc}: torn seam, broken zipper or a dress for a special evening; English spoken`]), extra: 'Quality work, clear prices',
    kw: (n) => [`tourist clothing alterations ${n}`, `tailor for tourists ${n}`, `holiday clothes repair ${n}`, `english speaking tailor ${n}`, `fix torn clothes on holiday ${n}`, `zip repair holiday ${n}`] },
  { titles: (n) => [`Hotel Pick-up Tailor in ${n} | Terzi Can`, `Tailor Comes to Your Hotel, ${n} | Terzi Can`, `Tailor in ${n} | Terzi Can`],
    core: (c) => V(c, [`A tailor that collects from your hotel ${c.loc}: alterations, hemming, zippers, repairs, then back to you`, `Hotel tailor service ${c.loc}: we collect clothes, alter or repair them in our workshop and return them`]), extra: 'Careful stitching',
    kw: (n) => [`hotel tailor ${n}`, `tailor hotel pick up ${n}`, `tailor comes to hotel ${n}`, `hotel tailor service ${n} Antalya`, `clothes alteration hotel delivery ${n}`] },
  { titles: (n) => [`Jeans & Shorts Hemming, Waist, ${n} | Terzi Can`, `Jeans Hemming in ${n} | Terzi Can`, `Tailor in ${n} | Terzi Can`],
    core: (c) => V(c, [`Jeans and shorts hemming, waist taking in ${c.loc}: trousers, denim, skirts; men and women`, `Jeans too long or loose at the waist ${c.loc}? Hemming and waist alterations for jeans, shorts, trousers`]), extra: 'Quality work',
    kw: (n) => [`jeans hemming ${n}`, `hem jeans ${n}`, `shorten jeans ${n}`, `shorts alteration ${n}`, `jeans waist alteration ${n}`, `hem pants ${n}`] },
  { titles: (n) => [`Evening & Wedding Dress Alterations, ${n} | Terzi Can`, `Evening Dress Alterations in ${n} | Terzi Can`, `Tailor in ${n} | Terzi Can`],
    core: (c) => V(c, [`Evening dress, gown and wedding dress alterations ${c.loc}: taking in, hemming, zipper and seam repair`, `Dress for a wedding or special evening ${c.loc}? Alterations, hemming, zipper and seam repair`]), extra: 'Careful stitching',
    kw: (n) => [`evening dress alteration ${n}`, `wedding dress alteration ${n}`, `gown alterations ${n}`, `formal dress tailor ${n}`, `bridal alterations ${n}`] },
  { titles: (n) => [`Men's & Women's Tailor in ${n} | Terzi Can`, `Tailor for Men and Women, ${n} | Terzi Can`, `Tailor in ${n} | Terzi Can`],
    core: (c) => V(c, [`Men's and women's tailor ${c.loc}: shirts, trousers, dresses, skirts, jackets; alterations and made to measure`, `Tailor for men and women ${c.loc}: alter, repair or sew to measure: shirts, trousers, dresses, jackets`]), extra: 'Clear prices',
    kw: (n) => [`mens tailor ${n}`, `womens tailor ${n}`, `suit trousers alteration ${n}`, `shirt tailor ${n}`, `dress tailor ${n}`, `tailor for men and women ${n}`] },
  { titles: (n) => [`Tailor Near Me in ${n} · Open 7 Days | Terzi Can`, `Tailor in ${n}, Hemming & Zippers | Terzi Can`, `Tailor in ${n} | Terzi Can`],
    core: (c) => V(c, [`Tailor near you ${c.loc}: hemming, zipper replacement, repairs and custom sewing`, `Looking for a tailor ${c.loc}? Price by photo on WhatsApp: hemming, zippers, repairs, custom clothes`]), extra: 'Quality work',
    kw: (n) => [`tailor near me ${n}`, `tailor prices ${n}`, `hemming price ${n}`, `zipper replacement price ${n}`, `tailor open sunday ${n}`, `tailor open late ${n}`] },
];
const RU2: T[] = [
  { titles: (n) => [`Ремонт одежды для туристов: ${n} | Terzi Can`, `Портной для туристов: ${n} | Terzi Can`, `Портной ${n} | Terzi Can`],
    core: (c) => V(c, [`Порвалась одежда в отпуске? Подшив, молнии, платья ${c.loc}; пишите в WhatsApp на своём языке`, `Портной для отдыхающих ${c.loc}: шов, молния, платье для особого вечера; русский язык`]), extra: 'Качественно',
    kw: (n) => [`ремонт одежды для туристов ${n}`, `портной для туристов ${n}`, `русскоговорящий портной ${n}`, `зашить одежду в отпуске ${n}`, `ремонт молнии в отпуске ${n}`] },
  { titles: (n) => [`Портной с выездом в отель: ${n} | Terzi Can`, `Ателье с забором из отеля: ${n} | Terzi Can`, `Портной ${n} | Terzi Can`],
    core: (c) => V(c, [`Портной забирает вещи из отеля ${c.loc}: подгонка, подшив, молнии, ремонт и возврат`, `Ателье для отелей ${c.loc}: заберём одежду, подгоним или отремонтируем и вернём`]), extra: 'Аккуратно',
    kw: (n) => [`портной в отель ${n}`, `ателье с выездом ${n}`, `портной на дом ${n}`, `забор одежды из отеля ${n}`, `ателье для отелей ${n}`] },
  { titles: (n) => [`Подшив джинсов и шорт: ${n} | Terzi Can`, `Укоротить джинсы, ушить талию: ${n} | Terzi Can`, `Портной ${n} | Terzi Can`],
    core: (c) => V(c, [`Подшив джинсов и шорт, ушивание в талии ${c.loc}: брюки, деним, юбки; муж., жен.`, `Джинсы длинны или велики в талии ${c.loc}? Подшив и ушивание: джинсы, шорты, брюки`]), extra: 'Качественно',
    kw: (n) => [`подшить джинсы ${n}`, `укоротить джинсы ${n}`, `ушить шорты ${n}`, `ушить джинсы в талии ${n}`, `подшив шорт ${n}`] },
  { titles: (n) => [`Подгонка вечерних и свадебных платьев, ${n} | Terzi Can`, `Подгонка вечернего платья: ${n} | Terzi Can`, `Портной ${n} | Terzi Can`],
    core: (c) => V(c, [`Подгонка вечерних и свадебных платьев ${c.loc}: ушивание, подшив, молния, ремонт швов`, `Платье на свадьбу или особый вечер ${c.loc}? Подгонка, подшив, молния, швы`]), extra: 'Аккуратная строчка',
    kw: (n) => [`подгонка вечернего платья ${n}`, `ушить свадебное платье ${n}`, `ремонт вечернего платья ${n}`, `подшить платье ${n}`] },
  { titles: (n) => [`Портной для мужчин и женщин: ${n} | Terzi Can`, `Мужской и женский портной: ${n} | Terzi Can`, `Портной ${n} | Terzi Can`],
    core: (c) => V(c, [`Портной для мужчин и женщин ${c.loc}: рубашки, брюки, платья, юбки, пиджаки; подгонка и пошив`, `Мужская и женская одежда ${c.loc}: подгоним, отремонтируем или сошьём по меркам`]), extra: 'Понятные цены',
    kw: (n) => [`мужской портной ${n}`, `женский портной ${n}`, `подгонка брюк ${n}`, `пошив рубашки ${n}`, `пошив платья ${n}`] },
  { titles: (n) => [`Портной рядом: ${n} · работаем 7 дней | Terzi Can`, `Портной ${n}: подшив и молнии | Terzi Can`, `Портной ${n} | Terzi Can`],
    core: (c) => V(c, [`Портной рядом ${c.loc}: подшив, замена молнии, ремонт и пошив на заказ`, `Ищете портного ${c.loc}? Цена по фото в WhatsApp: подшив, молнии, ремонт, пошив`]), extra: 'Качественно',
    kw: (n) => [`портной рядом ${n}`, `ателье рядом ${n}`, `цены на подшив ${n}`, `замена молнии цена ${n}`, `ателье работает в воскресенье ${n}`, `ателье до 23:00 ${n}`] },
];
const DE2: T[] = [
  { titles: (n) => [`Schneider für Urlauber in ${n} | Terzi Can`, `Kleidung im Urlaub ändern, ${n} | Terzi Can`, `Schneider ${n} | Terzi Can`],
    core: (c) => V(c, [`Kleidung im Urlaub gerissen oder zu eng ${c.loc}? Kürzen, Reißverschluss, Kleider ändern; schreiben Sie uns per WhatsApp`, `Schneider für Urlauber ${c.loc}: Naht nähen, Reißverschluss ersetzen, Kleid anpassen; Deutsch gesprochen`]), extra: 'Saubere Arbeit',
    kw: (n) => [`Schneider Urlaub ${n}`, `Kleidung im Urlaub ändern ${n}`, `deutschsprachiger Schneider ${n}`, `Reißverschluss kaputt Urlaub ${n}`, `Schneider für Touristen ${n}`] },
  { titles: (n) => [`Schneider mit Hotelabholung in ${n} | Terzi Can`, `Hotel-Schneider ${n} | Terzi Can`, `Schneider ${n} | Terzi Can`],
    core: (c) => V(c, [`Schneider holt Kleidung im Hotel ab ${c.loc}: ändern, kürzen, Reißverschluss, reparieren, zurückbringen`, `Schneider-Service fürs Hotel ${c.loc}: wir holen ab, ändern oder reparieren und liefern zurück`]), extra: 'Sorgfältige Nähte',
    kw: (n) => [`Hotel Schneider ${n}`, `Schneider Hotelabholung ${n}`, `Schneider kommt ins Hotel ${n}`, `Änderungsservice Hotel ${n}`, `Schneider Abholservice ${n}`] },
  { titles: (n) => [`Jeans kürzen & Taille enger, ${n} | Terzi Can`, `Jeans & Shorts ändern ${n} | Terzi Can`, `Schneider ${n} | Terzi Can`],
    core: (c) => V(c, [`Jeans und Shorts kürzen, Taille enger machen ${c.loc}: Hosen, Denim, Röcke; Damen, Herren`, `Jeans zu lang oder in der Taille zu weit ${c.loc}? Kürzen und enger machen: Jeans, Shorts, Hosen`]), extra: 'Saubere Arbeit',
    kw: (n) => [`Jeans kürzen ${n}`, `Jeans enger machen ${n}`, `Shorts enger machen ${n}`, `Jeans Saum kürzen ${n}`, `Hose Taille enger ${n}`] },
  { titles: (n) => [`Abend- & Brautkleid ändern in ${n} | Terzi Can`, `Abendkleid ändern ${n} | Terzi Can`, `Schneider ${n} | Terzi Can`],
    core: (c) => V(c, [`Abendkleid und Brautkleid ändern ${c.loc}: enger machen, kürzen, Reißverschluss, Nähte reparieren`, `Kleid für Hochzeit oder besonderen Abend ${c.loc}? Anpassen, kürzen, Reißverschluss, Nähte`]), extra: 'Sorgfältige Nähte',
    kw: (n) => [`Abendkleid ändern ${n}`, `Brautkleid ändern ${n}`, `Kleid enger machen ${n}`, `Kleid kürzen ${n}`] },
  { titles: (n) => [`Damen- & Herrenschneider in ${n} | Terzi Can`, `Schneider für Damen und Herren ${n} | Terzi Can`, `Schneider ${n} | Terzi Can`],
    core: (c) => V(c, [`Damen- und Herrenschneider ${c.loc}: Hemden, Hosen, Kleider, Röcke, Sakkos; ändern und nach Maß`, `Schneider für Damen und Herren ${c.loc}: ändern, reparieren oder nach Maß nähen`]), extra: 'Klare Preise',
    kw: (n) => [`Herrenschneider ${n}`, `Damenschneider ${n}`, `Anzughose kürzen ${n}`, `Hemd nach Maß ${n}`, `Kleid nach Maß ${n}`] },
  { titles: (n) => [`Schneider in der Nähe: ${n} · 7 Tage offen | Terzi Can`, `Schneider ${n}: Kürzen & Reißverschluss | Terzi Can`, `Schneider ${n} | Terzi Can`],
    core: (c) => V(c, [`Schneider in Ihrer Nähe ${c.loc}: Kürzen, Reißverschluss, Reparatur, Maßanfertigung`, `Schneider gesucht ${c.loc}? Preis per Foto über WhatsApp: Kürzen, Reißverschluss, Reparatur`]), extra: 'Saubere Arbeit',
    kw: (n) => [`Schneider in der Nähe ${n}`, `Schneider Preise ${n}`, `Hose kürzen Preis ${n}`, `Schneider sonntags geöffnet ${n}`, `Schneider abends geöffnet ${n}`] },
];

// Dilden bağımsız "genel" aramalar: her sayfaya 3 tanesi dönüşümlü eklenir (sayfalar birbirinin kopyası olmasın)
const GEN: Record<ALang, string[]> = {
  tr: [],
  en: ['tailor Antalya', 'alterations Antalya', 'clothing repair Antalya', 'tailor Konyaaltı', 'dressmaker Antalya', 'hemming Antalya', 'zipper repair Antalya', 'tailor near me Antalya'],
  ru: ['портной Анталья', 'ателье Анталья', 'ремонт одежды Анталья', 'портной Коньяалты', 'подшить брюки Анталья', 'замена молнии Анталья', 'пошив платья Анталья', 'ателье рядом Анталья'],
  de: ['Schneider Antalya', 'Änderungsschneiderei Antalya', 'Kleidung reparieren Antalya', 'Schneider Konyaaltı', 'Hose kürzen Antalya', 'Reißverschluss wechseln Antalya', 'Maßschneiderei Antalya', 'Schneider in der Nähe Antalya'],
};

const BANK: Record<ALang, T[]> = { tr: TR, en: [...EN, ...EN2], ru: [...RU, ...RU2], de: [...DE, ...DE2] };

export function angleTitles(lang: ALang, a: number, n: string): string[] { return BANK[lang][a].titles(n); }
export function angleDescs(lang: ALang, a: number, c: AngleCtx): string[] {
  const t = BANK[lang][a];
  const core = t.core(c), svc = S(lang, c.free);
  return [`${core}. ${t.extra}. ${svc}. ${c.tail}`, `${core}. ${svc}. ${c.tail}`, `${core}. ${c.tail}`];
}
export function angleKeywords(lang: ALang, a: number, n: string): string[] {
  const own = BANK[lang][a].kw(n);
  const g = GEN[lang];
  if (!g.length) return own;
  const h = hashStr(lang + n);
  const pick = [0, 3, 5].map((k) => g[(h + k) % g.length]);
  return Array.from(new Set([...own, ...pick]));
}
export const svcLine = (lang: ALang, free: boolean) => S(lang, free);

// ── Ev adresine ücretsiz servis yalnız Konyaaltı ve yakın mahallelerde; OTELLERE servis her bölgede ücretsiz ──
// unfree(): "otel ve eve ücretsiz" kalıplarını, eve ücretsiz servisin olmadığı bölgeler için "otele ücretsiz, eve bölgeye göre"
// biçimine çevirir. Çıktıdaki ücretsiz kelimesi \u0000 işaretiyle korunur ki sonraki kurallar tekrar dönüştürmesin.
type UL = 'tr' | 'en' | 'ru' | 'de';
const F = '\u0000f', FU = '\u0000F';
const FREE_WORD: Record<UL, [string, string]> = { tr: ['ücretsiz', 'Ücretsiz'], en: ['free', 'Free'], ru: ['бесплатно', 'Бесплатно'], de: ['kostenlos', 'Kostenlos'] };
const UNFREE: Record<UL, [RegExp, string][]> = {
  tr: [
    [/Yakın bölgelere ücretsiz servis/g, `Otellere ${F} servis`],
    [/yakın bölgelere ücretsiz servis/g, `otellere ${F} servis`],
    [/Otele ve eve ücretsiz servis/g, `Otele ${F} servis, eve bölgeye göre`],
    [/Otel ve eve ücretsiz servis/g, `Otele ${F} servis, eve bölgeye göre`],
    [/otel ve eve ücretsiz alım/g, `otelden ${F} alım, evden bölgeye göre`],
    [/otel ve eve ücretsiz servis/g, `otele ${F} servis, eve bölgeye göre`],
    [/otel ve eve servis ücretsizdir/g, `otele servis ${F}dir; eve servis ücreti bölgeye göre belirlenir`],
    [/otel ve eve servis ücretsiz/g, `otele servis ${F}, eve servis ücreti bölgeye göre`],
    [/(?<!otelden )alım-teslim ücretsizdir/g, `otelden alım-teslim ${F}dir; ev adresinde ücret bölgeye göre belirlenir`],
    [/(?<!otelden )alım-teslim ücretsiz/g, `otelden alım-teslim ${F}`],
    [/(?<!otelden )ücretsiz alım/g, `otelden ${F} alım`],
    [/(?<![Oo]tele |[Oo]tellere )ücretsiz servis/g, `otele ${F} servis`],
  ],
  en: [
    [/Free pick-up nearby/g, `${FU} hotel pick-up`],
    [/Free hotel & home pick-up/g, `${FU} hotel pick-up`],
    [/Free pick-up and delivery/g, `${FU} hotel pick-up and delivery`],
    [/Free pick-up/g, `${FU} hotel pick-up`],
    [/Free service to hotels and homes/g, `${FU} service to hotels; home pick-up by area`],
    [/free of charge for hotels and homes/g, `${F} of charge for hotels, with home pick-up priced by area`],
    [/Pick-up and delivery in (.+?) and nearby is free\./g, `Hotel pick-up in $1 is ${F}; home pick-up is priced by area.`],
    [/(hotel and home service|pick-up and delivery to hotels and homes) is free/gi, `hotel service is ${F} and home pick-up is priced by area`],
    [/service to hotels and homes is free/g, `service to hotels is ${F} and home pick-up is priced by area`],
    [/collection and delivery are free/g, `hotel collection and delivery are ${F}`],
    [/pick-up and delivery are free/gi, `hotel pick-up and delivery are ${F}`],
    [/free pick-up and delivery/gi, `${F} hotel pick-up and delivery`],
    [/free pick-up/gi, `${F} hotel pick-up`],
  ],
  ru: [
    [/Выезд рядом бесплатно/g, `Выезд в отели ${F}`],
    [/бесплатный выезд рядом/g, `выезд в отели ${F}`],
    [/Выезд в отель и на дом бесплатно/g, `Выезд в отели ${F}, на дом — по району`],
    [/Бесплатный выезд в отели и на дом/g, `Выезд в отели ${F}, на дом — по району`],
    [/[Вв]ыезд в отели и на дом бесплатны\S*/g, `выезд в отели ${F}, на дом — по району`],
    [/забор и доставка в отели и на дом бесплатны/g, `забор и доставка в отели ${F}, на дом — по району`],
    [/[Зз]абор и доставка бесплатны/g, `забор и доставка из отеля ${F}`],
    [/[Бб]есплатный забор и доставка/g, `Забор и доставка из отеля ${F}`],
  ],
  de: [
    [/Gratis-Abholung in der Nähe/g, `Hotelabholung ${F}`],
    [/Gratis-Abholung Hotel & Zuhause/g, `Hotelabholung ${F}`],
    [/Kostenloser Service zu Hotels und nach Hause/g, `Hotelservice ${F}, Hausabholung je nach Gebiet`],
    [/Abholung und Lieferung in (.+?) und Umgebung sind kostenlos/g, `Hotelabholung in $1 ${F}, Hausabholung je nach Gebiet`],
    [/(Hotel- und Heimservice sind|Abholung und Lieferung zu Hotels und nach Hause sind) kostenlos/g, `Hotelservice ist ${F}, Hausabholung je nach Gebiet`],
    [/der Service zu Hotels und nach Hause ist kostenlos/g, `der Service zu Hotels ist ${F}, Hausabholung je nach Gebiet`],
    [/Abholung und Lieferung sind kostenlos/g, `Hotelabholung und -lieferung sind ${F}`],
  ],
};
export function unfree(lang: string, s: string): string {
  const L = (lang as UL);
  let o = s;
  for (const [rx, to] of UNFREE[L] || []) o = o.replace(rx, to);
  const w = FREE_WORD[L];
  return w ? o.split(FU).join(w[1]).split(F).join(w[0]) : o;
}
export function unfreeDeep<T>(lang: string, v: T): T {
  if (typeof v === 'string') return unfree(lang, v) as unknown as T;
  if (Array.isArray(v)) return v.map((x) => unfreeDeep(lang, x)) as unknown as T;
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v as object).map(([k, x]) => [k, unfreeDeep(lang, x)])) as unknown as T;
  return v;
}
