// ============================================================
// lib/seo-angles.ts — Bölge sayfaları için "arama niyeti açıları"
// Her bölge sayfası, 6 açıdan (dikim / tamir-tadilat / fermuar-paça / daraltma-beden / keten-pamuk / üst giyim)
// birini ağırlık alır; böylece başlık, açıklama ve anahtar kelimeler sayfadan sayfaya farklılaşır (kopya hissi olmaz)
// ve her sayfa farklı bir aramada öne çıkar. Yalnızca doğrulanmış bilgiler kullanılır; sahte vaat yok.
// ============================================================
export type ALang = 'tr' | 'en' | 'ru' | 'de';
export const ANGLE_COUNT = 6;
export const A_DIKIM = 0, A_TAMIR = 1, A_FERMUAR = 2, A_DARALTMA = 3, A_KETEN = 4, A_UST = 5;

export function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Bölgeye açı atar. Türkçe + yakın bölge: tamir-tadilat Konyaaltı'nda ön planda; Türkçe + uzak bölge: tamir-tadilat açısı verilmez. */
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
  return hashStr(lang + ':' + slug) % ANGLE_COUNT;
}

export interface AngleCtx {
  lang: ALang;
  n: string;          // bölge adı (o dilde)
  loc: string;        // "…'da" / "in X" / "в X"
  free: boolean;      // ücretsiz servis bölgesi mi (yakın) — değilse "bölgeye göre fiyatlandırılır"
  tail: string;       // site tonuna göre kapanış: telefon + (saat | fotoğraf at, fiyat al)
}

const SVC: Record<ALang, { free: string; paid: string }> = {
  tr: { free: 'Yakın bölgelere ücretsiz servis', paid: 'Uzak bölgede servis duruma göre' },
  en: { free: 'Free pick-up nearby', paid: 'Pick-up priced by area' },
  ru: { free: 'Выезд рядом бесплатно', paid: 'Выезд — по району' },
  de: { free: 'Gratis-Abholung in der Nähe', paid: 'Abholung je nach Gebiet' },
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
const BANK: Record<ALang, T[]> = { tr: TR, en: EN, ru: RU, de: DE };

export function angleTitles(lang: ALang, a: number, n: string): string[] { return BANK[lang][a].titles(n); }
export function angleDescs(lang: ALang, a: number, c: AngleCtx): string[] {
  const t = BANK[lang][a];
  const core = t.core(c), svc = S(lang, c.free);
  return [`${core}. ${t.extra}. ${svc}. ${c.tail}`, `${core}. ${svc}. ${c.tail}`, `${core}. ${c.tail}`];
}
export function angleKeywords(lang: ALang, a: number, n: string): string[] { return BANK[lang][a].kw(n); }
export const svcLine = (lang: ALang, free: boolean) => S(lang, free);
