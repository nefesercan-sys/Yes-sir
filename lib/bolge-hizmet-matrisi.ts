// ============================================================
// lib/bolge-hizmet-matrisi.ts — Türkçe bölge sayfaları için "hangi işleri yapıyoruz" bölümü + ek sorgu-kalıplı SSS
// Amaç: her bölge sayfası, işletmenin verdiği TÜM işleri (kısaltma, daraltma, tamir, tadilat, fermuar, düğme, astar,
// askı boyu, sökük/yırtık, özel dikim ...) kendi bölge adıyla barındırsın; ama sayfalar birbirinin kopyası olmasın:
// grup sırası, başlık, giriş cümlesi ve işlem sırası slug karmasına göre değişir (deterministik, her derlemede aynı).
// Yalnızca sahibin doğruladığı işler/fiyatlar: paça/bel/kol/boy kısaltma-daraltma ₺200'den, fermuar ₺300'den, deri ₺400'den;
// diğerlerinde fiyat "fotoğrafa göre". Kazak ve hırkada astar değişimi yapılmaz; gelinlik DİKİMİ yapılmaz (tadilat yapılır).
// ============================================================
import { hashStr } from '@/lib/seo-angles';

type Pick = <T>(arr: T[], salt: string) => T;

export interface MatrisGroup { id: string; heading: string; text: string }
export interface Matris { title: string; lead: string; groups: MatrisGroup[]; price: string }

const GROUPS: { id: string; label: string; ops: string[]; heads: ((n: string, l: string) => string)[]; intros: ((loc: string, n: string, ops: string) => string)[] }[] = [
  { id: 'pantolon', label: 'pantolon ve kot',
    ops: ['paça kısaltma', 'bel daraltma', 'bacak daraltma', 'bel genişletme', 'kot paçasını orijinal paça görünümüyle kısaltma', 'pantolon fermuarı değişimi ve tamiri', 'düğme değişimi', 'sökük ve yırtık onarımı'],
    heads: [(n) => `${n} pantolon ve kot tadilatı`, (n) => `${n} paça kısaltma ve bel daraltma`, (n, l) => `${l} pantolon, kot paçası, fermuar`],
    intros: [(l, n, o) => `${l} pantolon ve kot için şu işleri yapıyoruz: ${o}.`, (l, n, o) => `${n} çevresinde pantolonunuz uzun, bol ya da bozuksa: ${o}.`, (l, n, o) => `Pantolon ve kotta ${o}; ${n} için eve ve otele ücretsiz alım-teslim yapılır.`] },
  { id: 'etek-elbise', label: 'etek, elbise ve abiye',
    ops: ['etek boyu kısaltma', 'etek bel daraltma', 'elbise boyu kısaltma', 'elbise beden daraltma', 'askı boyu ayarlama', 'elbise fermuarı değişimi', 'astar değişimi', 'abiye ve gelinlik tadilatı', 'özel elbise dikimi'],
    heads: [(n) => `${n} etek ve elbise tadilatı`, (n) => `${n} elbise tamiri, abiye ve askı boyu ayarı`, (n, l) => `${l} elbise kısaltma, daraltma, dikim`],
    intros: [(l, n, o) => `${l} etek, elbise ve abiye için: ${o}.`, (l, n, o) => `${n} civarında elbise ve etek işleriniz için ${o} yapılır; gelinlikte yalnızca tadilat yapılır.`, (l, n, o) => `Elbise ve eteğinizde ${o}. Fotoğrafı gönderin, ${n} için fiyatı söyleyelim.`] },
  { id: 'ust-giyim', label: 'ceket, mont, kaban ve palto',
    ops: ['ceket ve mont kol kısaltma', 'boy kısaltma', 'beden daraltma', 'kaban ve palto tadilatı', 'mont ve ceket fermuarı değişimi', 'astar değişimi', 'düğme değişimi', 'yırtık ve sökük onarımı', 'deri ceket tadilatı'],
    heads: [(n) => `${n} ceket, mont, kaban tadilatı`, (n) => `${n} ceket ve mont kol, boy kısaltma`, (n, l) => `${l} mont fermuarı, astar, düğme`],
    intros: [(l, n, o) => `${l} ceket, mont, kaban ve palto için: ${o}.`, (l, n, o) => `Üst giyimde ${o}; ${n} için aynı gün teslim, acil işler 1–2 saatte.`, (l, n, o) => `${n} çevresinde ceket ve montunuza ${o} yapıyoruz.`] },
  { id: 'gomlek-bluz', label: 'gömlek, bluz ve tişört',
    ops: ['gömlek daraltma ve kısaltma', 'bluz daraltma', 'tişört kısaltma ve daraltma', 'kol kısaltma', 'düğme değişimi', 'sökük dikme', 'gömlek ve bluz dikimi'],
    heads: [(n) => `${n} gömlek ve bluz daraltma`, (n) => `${n} tişört, bluz, gömlek tadilatı`, (n, l) => `${l} bluz ve gömlek tamiri`],
    intros: [(l, n, o) => `${l} gömlek, bluz ve tişört için: ${o}.`, (l, n, o) => `${n} için gömlek ve bluz işleri: ${o}.`, (l, n, o) => `Gömlek, bluz ve tişörtte ${o}; fiyat fotoğrafa göre netleşir.`] },
  { id: 'yelek-tulum', label: 'yelek, tulum, eşofman ve şort',
    ops: ['yelek tamir ve tadilatı', 'tulum kısaltma ve daraltma', 'eşofman paça ve bel ayarı', 'şort boy kısaltma', 'yelek, tulum ve eşofman dikimi', 'fermuar değişimi', 'sökük ve yırtık onarımı'],
    heads: [(n) => `${n} yelek, tulum, eşofman tadilatı`, (n) => `${n} şort kısaltma, tulum daraltma`, (n, l) => `${l} yelek ve eşofman tamiri, dikimi`],
    intros: [(l, n, o) => `${l} yelek, tulum, eşofman ve şort için: ${o}.`, (l, n, o) => `${n} çevresinde ${o} yapıyoruz.`, (l, n, o) => `Yelek, tulum, eşofman ve şortta ${o}; ${n} için fotoğrafla fiyat alın.`] },
  { id: 'fermuar-dugme', label: 'fermuar, düğme ve astar',
    ops: ['pantolon, mont, ceket ve çanta fermuarı değişimi (fermuarlı ve fermuarsız modeller)', 'sıkışan fermuar tamiri', 'düğme değişimi', 'astar değişimi (kazak ve hırka hariç)', 'sökük ve yırtık onarımı'],
    heads: [(n) => `${n} fermuar değişimi ve tamiri`, (n) => `${n} fermuar, düğme, astar değişimi`, (n, l) => `${l} fermuarı bozulan kıyafet`],
    intros: [(l, n, o) => `${l} fermuar, düğme ve astar işleri: ${o}.`, (l, n, o) => `Fermuarı bozulan, düğmesi düşen ya da astarı yırtılan kıyafetiniz için ${n}'de ${o}.`, (l, n, o) => `${n} için: ${o}.`] },
];

const TITLES: ((loc: string, n: string) => string)[] = [
  (l) => `${l} Hangi İşleri Yapıyoruz?`,
  (l, n) => `${n} Terzi: Kısaltma, Daraltma, Tamir, Tadilat`,
  (l, n) => `${n} Çevresinde Yaptığımız Terzi İşleri`,
  (l) => `${l} Tamir, Tadilat ve Dikim İşleri`,
];
const LEADS: ((loc: string, n: string) => string)[] = [
  (l, n) => `${l} bay ve bayan giysilerinde kısaltma, daraltma, tamir, tadilat, fermuar, düğme ve astar değişimi ile özel dikim yapıyoruz. ${n} için işlerin tamamı aşağıda.`,
  (l, n) => `${n} için terzi arıyorsanız: pantolon, etek, elbise, ceket, mont, gömlek, bluz, yelek, tulum ve eşofmanda her türlü tamir ve tadilat tek yerde.`,
  (l, n) => `Giysinin boyunu kısaltmak, bedenini daraltmak, fermuarını değiştirmek ya da söküğünü dikmek istiyorsanız ${l} Terzi Can'a yazabilirsiniz.`,
];
const PRICES: ((n: string) => string)[] = [
  (n) => `${n} için başlangıç fiyatları: paça, bel, kol ve boy kısaltma-daraltma ₺200'den, fermuar değişimi ₺300'den, deri tamir ve tadilatı ₺400'den. Diğer işlerde fiyat fotoğrafa göre söylenir.`,
  (n) => `Fiyatlar başlangıç fiyatıdır: kısaltma ve daraltma ₺200, fermuar ₺300, deri ürünler ₺400. Düğme, astar, yelek, tulum ve dikim işlerinin fiyatını fotoğraf ya da modelle netleştiriyoruz (${n}).`,
];

const rot = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

export function bolgeMatrisi(slug: string, n: string, loc: string): Matris {
  const h = (s: string) => hashStr(slug + ':' + s);
  const order = rot(GROUPS, h('g') % GROUPS.length);
  const groups: MatrisGroup[] = order.map((g, gi) => {
    // Tüm işlemler her sayfada yer alır; yalnızca sıra döner (her işlem bağımsız bir ad öbeği olduğu için cümle bozulmaz)
    const ops = rot(g.ops, h('o' + g.id) % g.ops.length);
    const text = g.intros[h('i' + g.id) % g.intros.length](loc, n, ops.join(', '));
    return { id: g.id, heading: g.heads[(h('h' + g.id) + gi) % g.heads.length](n, loc), text };
  });
  return {
    title: TITLES[h('T') % TITLES.length](loc, n),
    lead: LEADS[h('L') % LEADS.length](loc, n),
    groups,
    price: PRICES[h('P') % PRICES.length](n),
  };
}

// ── Ek sorgu kalıplı SSS (bölge başına 3 tane, slug karmasıyla farklı alt küme) ────────
const FAQ: { id: string; f: (loc: string, n: string) => [string, string] }[] = [
  { id: 'paca', f: (l) => [`${l} paça kısaltma fiyatı ne kadar?`, `Paça kısaltma ₺200'den başlar; net fiyat fotoğrafla WhatsApp'tan söylenir. Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.`] },
  { id: 'fermuar', f: (l) => [`${l} pantolonun fermuarı bozuldu, ne yapmalıyım?`, `Fermuarın fotoğrafını WhatsApp'tan gönderin. Fermuar değişimi ₺300'den başlar; sıkışan fermuar çoğu zaman değişmeden onarılabilir. Normal işler aynı gün teslim edilir.`] },
  { id: 'kol', f: (l, n) => [`${n} çevresinde ceket ve mont kolu kısaltan terzi var mı?`, `Evet. Ceket ve mont kol ve boy kısaltma ₺200'den başlar; kol boyu giysi üzerinizdeyken işaretlenir. ${n} için eve ve otele alım-teslim ücretsizdir.`] },
  { id: 'bluz', f: (l) => [`${l} bluz ve gömlek daraltma yapılıyor mu?`, `Evet. Bluz, gömlek ve tişört daraltma ve kısaltma yapıyoruz; beden daraltma ₺200'den başlar, net fiyat fotoğrafa göre söylenir.`] },
  { id: 'aski', f: (l) => [`${l} elbise askı boyu ayarlanır mı?`, `Evet. Elbise ve abiyede askı boyu ayarlama yapıyoruz; fiyat işe göre değişir, fotoğraf gönderirseniz net fiyatı söyleriz. Gelinlikte yalnızca tadilat yapılır.`] },
  { id: 'astar', f: (l) => [`${l} mont ve ceket astarı değişir mi?`, `Evet. Astar değişimi yapıyoruz (kazak ve hırkada yapılmaz). Fiyat astarın türüne ve işin kapsamına göre fotoğrafla netleşir.`] },
  { id: 'dugme', f: (l) => [`${l} düğme değişimi yapılıyor mu?`, `Evet. Gömlek, ceket, mont, kaban ve pantolonda düğme değişimi yapıyoruz; fiyat fotoğrafa göre söylenir.`] },
  { id: 'yelek', f: (l) => [`${l} yelek, tulum veya eşofman tadilatı yapılıyor mu?`, `Evet. Yelek, tulum, eşofman, kaban ve palto için tamir, tadilat ve dikim yapıyoruz. Fotoğraf ya da model gönderirseniz net fiyatı söyleriz.`] },
  { id: 'orijinal', f: (l) => [`${l} kot pantolonu orijinal paçayla kısaltıyor musunuz?`, `Evet. Kot paçasını orijinal paça görünümünü koruyacak şekilde kısaltıyoruz; fiyat ₺200'den başlar.`] },
  { id: 'soktuk', f: (l) => [`${l} sökük ve yırtık tamiri yapılıyor mu?`, `Evet. Söküklerin dikilmesi ve yırtık onarımı her giysi grubunda yapılır; fiyat işe göre değişir, fotoğraf gönderirseniz net fiyatı söyleriz.`] },
  { id: 'etek', f: (l) => [`${l} etek kısaltma ve daraltma ne kadar?`, `Etek boyu kısaltma ve bel daraltma ₺200'den başlar; kot etek de yapılır. Normal işler aynı gün teslim edilir.`] },
  { id: 'dikim', f: (l, n) => [`${n} için elbise veya yelek, tulum, bluz, eşofman dikimi yapıyor musunuz?`, `Evet. Elbise, yelek, tulum, bluz ve eşofman dikimi ölçüye göre yapılır; model fotoğrafı gönderirseniz net fiyatı ve süreyi söyleriz. Gelinlik dikimi yapılmaz, gelinlik tadilatı yapılır.`] },
  { id: 'kaban', f: (l) => [`${l} kaban ve palto tadilatı yapılıyor mu?`, `Evet. Kaban ve palto için boy ve kol kısaltma, daraltma, fermuar ve astar değişimi yapıyoruz; fiyat işe göre fotoğrafla söylenir.`] },
];

export function bolgeEkSss(slug: string, n: string, loc: string, exclude: string[] = []): [string, string][] {
  const pool = FAQ.filter((x) => !exclude.includes(x.id));
  const start = hashStr(slug + ':faq2') % pool.length;
  const step = [1, 3, 5][hashStr(slug + ':fs2') % 3];
  const out: typeof pool = [];
  for (let i = 0; out.length < 3 && i < pool.length * 3; i++) {
    const x = pool[(start + i * step) % pool.length];
    if (!out.includes(x)) out.push(x);
  }
  return out.map((x) => x.f(loc, n));
}

// ── Başlık havuzu (Türkçe bölge sayfaları): her bölge farklı bir hizmet vurgusuyla başlar; 60 karaktere sığan ilki seçilir ──
export function trDistrictTitles(slug: string, n: string, order = -1): string[] {
  const t = [
    `${n} Terzi · Paça Kısaltma, Fermuar, Tadilat | Antalya`,
    `${n} Terzi: Pantolon, Etek, Ceket Tadilatı | Antalya`,
    `${n} Elbise Tamiri, Daraltma, Kısaltma | Terzi Can`,
    `${n} Terzi · Bel Daraltma, Fermuar Değişimi`,
    `${n} Terzi: Mont, Ceket, Kot Tadilatı | Antalya`,
    `${n} Terzi · Dikim, Tamir, Tadilat | Antalya`,
    `${n} Terzi · Fermuar, Düğme, Astar Değişimi`,
    `${n} Bay Bayan Terzi · Kısaltma, Daraltma`,
    `${n} Terzi · Yelek, Tulum, Bluz, Eşofman`,
    `${n} Terzi | Kot Paça, Etek, Elbise Tamiri`,
    `${n} Terzi: Abiye, Elbise, Askı Boyu Ayarı`,
    `${n} Terzi · Sökük, Yırtık Tamiri, Tadilat`,
    `${n} Terzi · Kot Pantolon Daraltma, Kısaltma`,
    `${n} Terzi: Kaban, Palto, Mont Tamiri`,
    `${n} Terzi · Etek Kısaltma, Bluz Daraltma`,
    `${n} Terzi | Gömlek, Tişört, Şort Tadilatı`,
    `${n} Terzi · Özel Dikim, Tamir, Tadilat`,
    `${n} Terzi: Kol, Boy Kısaltma, Beden Daraltma`,
  ];
  const k = (order >= 0 ? order : hashStr(slug + ':title')) % t.length; // sıra numarası: sayfalar arasında çakışma olmaz
  return [...t.slice(k), ...t.slice(0, k), `${n} Terzi | Antalya`];
}
