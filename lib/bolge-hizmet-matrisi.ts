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
    heads: [(n) => `${n} pantolon paçası ve bel ayarı kaç TL?`, (n) => `${n} kot ve pantolon: kısaltma, daraltma, fermuar`, (n, l) => `${l} pantolonu uzun ya da bol gelenler için`],
    intros: [(l, n, o) => `Pantolon ve kotta en çok istenen işler: ${o}. ${n} için paça ve bel ₺200'den başlar.`, (l, n, o) => `${l} pantolon ya da kot için fiyat soruyorsanız: ${o}. Fotoğrafı gönderin, net fiyatı yazalım.`, (l, n, o) => `Paçası uzun, beli bol ya da fermuarı bozuk pantolon için yapılanlar: ${o}. ${n} adresinden alıp geri getirebiliriz.`] },
  { id: 'etek-elbise', label: 'etek, elbise ve abiye',
    ops: ['etek boyu kısaltma', 'etek bel daraltma', 'elbise boyu kısaltma', 'elbise beden daraltma', 'askı boyu ayarlama', 'elbise fermuarı değişimi', 'astar değişimi', 'abiye ve gelinlik tadilatı', 'özel elbise dikimi'],
    heads: [(n) => `${n} elbise ve etek: boy, bel, askı ayarı`, (n) => `${n} abiye ve elbise tadilatı nasıl fiyatlanır?`, (n, l) => `${l} elbisesi uzun ya da bol gelenler için`],
    intros: [(l, n, o) => `Elbise, etek ve abiyede yapılan işler: ${o}. Gelinlik dikilmez, yalnızca tadilatı yapılır.`, (l, n, o) => `${l} elbise ya da etek için fiyat almak kolay: fotoğrafı gönderin. Yapılanlar: ${o}.`, (l, n, o) => `Boyu uzun, beli bol ya da askısı düşen elbise için ${o}. ${n} için kısaltma ve daraltma ₺200'den başlar.`] },
  { id: 'ust-giyim', label: 'ceket, mont, kaban ve palto',
    ops: ['ceket ve mont kol kısaltma', 'boy kısaltma', 'beden daraltma', 'kaban ve palto tadilatı', 'mont ve ceket fermuarı değişimi', 'astar değişimi', 'düğme değişimi', 'yırtık ve sökük onarımı', 'deri ceket tadilatı'],
    heads: [(n) => `${n} ceket ve mont: kol, boy, fermuar`, (n) => `${n} kaban, palto ve mont tadilatı kaç TL?`, (n, l) => `${l} ceketinin kolu uzun gelenler için`],
    intros: [(l, n, o) => `Ceket, mont, kaban ve paltoda yapılanlar: ${o}. Kısaltma ve daraltma ₺200'den, fermuar ₺300'den başlar.`, (l, n, o) => `${l} mont ya da ceket için fiyat soruyorsanız: ${o}. Normal işler aynı gün, acil işler 1–2 saatte hazır olur.`, (l, n, o) => `Kolu uzun, bedeni bol ya da fermuarı bozuk üst giyim için ${o}. ${n} için fotoğrafla fiyat verilir.`] },
  { id: 'gomlek-bluz', label: 'gömlek, bluz ve tişört',
    ops: ['gömlek daraltma ve kısaltma', 'bluz daraltma', 'tişört kısaltma ve daraltma', 'kol kısaltma', 'düğme değişimi', 'sökük dikme', 'gömlek ve bluz dikimi'],
    heads: [(n) => `${n} gömlek, bluz, tişört: daraltma ve kısaltma`, (n) => `${n} bol gelen gömlek ve bluz için`, (n, l) => `${l} gömlek daraltma kaç TL?`],
    intros: [(l, n, o) => `Gömlek, bluz ve tişörtte yapılanlar: ${o}. Beden daraltma ₺200'den başlar.`, (l, n, o) => `${l} bol gelen gömlek ya da bluz için: ${o}. Net fiyat fotoğrafa göre yazılır.`, (l, n, o) => `Kolu uzun, bedeni geniş ya da düğmesi kopuk gömlek için ${o}; ${n} adresinden alınabilir.`] },
  { id: 'yelek-tulum', label: 'yelek, tulum, eşofman ve şort',
    ops: ['yelek tamir ve tadilatı', 'tulum kısaltma ve daraltma', 'eşofman paça ve bel ayarı', 'şort boy kısaltma', 'yelek, tulum ve eşofman dikimi', 'fermuar değişimi', 'sökük ve yırtık onarımı'],
    heads: [(n) => `${n} yelek, tulum, eşofman ve şort işleri`, (n) => `${n} eşofman paçası ve şort boyu kısaltma`, (n, l) => `${l} yeleği ya da tulumu bol gelenler için`],
    intros: [(l, n, o) => `Yelek, tulum, eşofman ve şortta yapılanlar: ${o}. Fiyat işin fotoğrafına göre yazılır.`, (l, n, o) => `${l} eşofman paçası uzun, şort boyu fazla ya da tulum bol mu? Yapılanlar: ${o}.`, (l, n, o) => `${n} için yelek, tulum, eşofman ve şortta ${o}. Kısaltma ve daraltma ₺200'den başlar.`] },
  { id: 'fermuar-dugme', label: 'fermuar, düğme ve astar',
    ops: ['pantolon, mont, ceket ve çanta fermuarı değişimi (fermuarlı ve fermuarsız modeller)', 'sıkışan fermuar tamiri', 'düğme değişimi', 'astar değişimi (kazak ve hırka hariç)', 'sökük ve yırtık onarımı'],
    heads: [(n) => `${n} fermuar değişimi kaç TL?`, (n) => `${n} bozulan fermuar, kopan düğme, yırtık astar`, (n, l) => `${l} fermuarı takılan ya da açılan kıyafet`],
    intros: [(l, n, o) => `Fermuar, düğme ve astarda yapılanlar: ${o}. Fermuar değişimi ₺300'den başlar.`, (l, n, o) => `${l} fermuarınız takılıyor ya da kendiliğinden açılıyorsa fotoğrafını gönderin. Yapılanlar: ${o}.`, (l, n, o) => `${n} için küçük ama acil işler: ${o}. Çoğu aynı gün biter.`] },
  { id: 'deri', label: 'deri ceket, pantolon ve yelek',
    ops: ['deri ceket yaka değiştirme', 'deri ceket kol kısaltma', 'deri ceket boy kısaltma', 'deri ceket daraltma', 'deri pantolon bel daraltma', 'deri pantolon boy kısaltma', 'deri pantolon fermuar değişimi', 'deri yelek tamir ve tadilatı', 'deri fermuar tamiri'],
    heads: [(n) => `${n} deri ceket ve deri pantolon tadilatı kaç TL?`, (n) => `${n} deri giyside kol, boy, yaka, fermuar`, (n, l) => `${l} deri ceketi bol ya da uzun gelenler için`],
    intros: [(l, n, o) => `Deri giysilerde yapılanlar: ${o}. Deri işleri ₺400'den başlar; net fiyat fotoğrafa göre yazılır.`, (l, n, o) => `${l} deri ceket, pantolon ya da yelek için fiyat soruyorsanız başlangıç ₺400'dür. Yapılanlar: ${o}.`, (l, n, o) => `Deride her iş her modelde yapılamaz; fotoğrafa bakıp söyleriz. ${n} için yapılanlar: ${o}.`] },
  { id: 'kot', label: 'kot pantolon, ceket, mont, etek ve şort',
    ops: ['kot pantolon paça kısaltma', 'kot pantolon orijinal paça yapımı', 'kot pantolon bel daraltma', 'kot pantolon bacak daraltma', 'kot ceket kol ve boy kısaltma', 'kot ceket daraltma', 'kot mont kısaltma ve daraltma', 'kot etek boy kısaltma ve bel daraltma', 'kot şort boy kısaltma', 'kot fermuar ve düğme değişimi', 'kot yırtık ve sökük onarımı'],
    heads: [(n) => `${n} kot paça kısaltma ve orijinal paça kaç TL?`, (n) => `${n} kot ceket, etek ve şort tadilatı`, (n, l) => `${l} kotu uzun ya da bol gelenler için`],
    intros: [(l, n, o) => `Kot giysilerde yapılanlar: ${o}. Kot işleri ₺200'den başlar.`, (l, n, o) => `${l} kot pantolon, ceket, etek ya da şort için fiyat ₺200'den başlar. Yapılanlar: ${o}.`, (l, n, o) => `Kotun paçası orijinal görünümü korunarak da kısaltılır. ${n} için yapılanlar: ${o}.`] },
];

const TITLES: ((loc: string, n: string) => string)[] = [
  (l, n) => `${n} Terzi Fiyatları ve Yapılan İşler`,
  (l) => `${l} Terzi İşleri: Ne Yapılır, Kaç TL?`,
  (l, n) => `${n} İçin Tamir ve Tadilat Listesi`,
  (l, n) => `${n} Kısaltma, Daraltma, Fermuar: Fiyat ve Kapsam`,
];
const LEADS: ((loc: string, n: string) => string)[] = [
  (l, n) => `${n} için fiyat sormadan önce bakın: hangi giyside hangi iş yapılıyor ve başlangıç fiyatı ne? Liste aşağıda; net fiyat için fotoğraf yeterli.`,
  (l, n) => `Kısaltma ve daraltma ₺200'den, fermuar ₺300'den, deri işleri ₺400'den başlar (KDV hariç). ${n} için yapılan işler giysi türüne göre aşağıda.`,
  (l, n) => `${l} bir terziye ne yaptırabileceğinizi ve yaklaşık ne ödeyeceğinizi tek sayfada topladık. Fotoğrafı WhatsApp'tan gönderin, net fiyatı yazalım.`,
];
const PRICES: ((n: string) => string)[] = [
  (n) => `${n} için özet fiyat: paça, bel, kol ve boy işleri ₺200'den, fermuar ₺300'den, deri ₺400'den başlar; fiyatlara KDV dahil değildir. Listede olmayan işlerin fiyatı fotoğrafa göre yazılır.`,
  (n) => `Kısaca: kısaltma ve daraltma ₺200'den, fermuar değişimi ₺300'den, deri tadilatı ₺400'den (KDV hariç). Düğme, astar, yelek, tulum ve dikimde fiyat fotoğraf ya da modele göre belirlenir (${n}).`,
];

const rot = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

export function bolgeMatrisi(slug: string, n: string, loc: string): Matris {
  const h = (s: string) => hashStr(slug + ':' + s);
  const order = rot(GROUPS, h('g') % GROUPS.length);
  const groups: MatrisGroup[] = order.map((g, gi) => {
    // Tüm işlemler her sayfada yer alır; yalnızca sıra döner (her işlem bağımsız bir ad öbeği olduğu için cümle bozulmaz)
    const ops = rot(g.ops, h('o' + g.id) % g.ops.length).reverse(); // swaphubs: işlem sırası ters (terzihizmeti ile aynı dizilim olmasın)
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
  { id: 'paca', f: (l) => [`${l} paça kısaltma kaç TL?`, `₺200'den başlar (KDV hariç). Fotoğrafı WhatsApp'tan gönderin, net fiyatı yazalım. Normal işler aynı gün, acil işler 1–2 saatte hazır olur.`] },
  { id: 'fermuar', f: (l) => [`${l} pantolon fermuarı değişimi kaç TL?`, `Fermuar değişimi ₺300'den başlar. Yalnızca sürgüsü bozuksa fermuarın tamamı değişmeden onarılabilir; fotoğrafa bakıp söyleriz.`] },
  { id: 'kol', f: (l, n) => [`${n} için ceket ve mont kolu kısaltma kaç TL?`, `Kol ve boy kısaltma ₺200'den başlar. Kol boyu giysi üzerinizdeyken işaretlenir; ${n} adresinden alıp geri getirebiliriz.`] },
  { id: 'bluz', f: (l) => [`${l} bluz ve gömlek daraltma kaç TL?`, `Beden daraltma ₺200'den başlar. Bluz, gömlek ve tişörtte daraltma ve kısaltma yapılır; net fiyat fotoğrafa göre yazılır.`] },
  { id: 'aski', f: (l) => [`${l} elbisenin askısı uzun geliyor, kısalır mı?`, `Evet, elbise ve abiyede askı boyu kısaltılır. Fiyat işe göre değişir; fotoğraf gönderin, yazalım. Gelinlikte yalnızca tadilat yapılır.`] },
  { id: 'astar', f: (l) => [`${l} yırtılan mont ya da ceket astarı değişir mi?`, `Evet, astar onarılır ya da değiştirilir; kazak ve hırkada astar işi yapılmaz. Fiyat astarın türüne ve ne kadarının değişeceğine göre fotoğrafla yazılır.`] },
  { id: 'dugme', f: (l) => [`${l} kopan düğme için terziye gidilir mi?`, `Evet. Gömlek, ceket, mont, kaban ve pantolonda düğme dikilir ya da değiştirilir; fiyat fotoğrafa göre yazılır.`] },
  { id: 'yelek', f: (l) => [`${l} yelek, tulum ya da eşofman için ne yapılıyor?`, `Tamir, tadilat ve dikim yapılır; kaban ve palto da buna dahildir. Fotoğraf ya da model gönderin, net fiyatı yazalım.`] },
  { id: 'orijinal', f: (l) => [`${l} kot paçası orijinal dikişiyle kısaltılır mı?`, `Evet. Paçanın orijinal görünümü korunarak kısaltılır; fiyat ₺200'den başlar.`] },
  { id: 'soktuk', f: (l) => [`${l} sökük ya da yırtık kıyafet onarılır mı?`, `Evet, her giysi türünde sökük dikilir ve yırtık onarılır. Fiyat işe göre değişir; fotoğraf gönderin, yazalım.`] },
  { id: 'etek', f: (l) => [`${l} etek kısaltma ve bel daraltma kaç TL?`, `İkisi de ₺200'den başlar; kot etek de yapılır. Normal işler aynı gün hazır olur.`] },
  { id: 'dikim', f: (l, n) => [`${n} için elbise, bluz, yelek ya da tulum diktirebilir miyim?`, `Evet, ölçüye göre dikilir. Dikimde sabit fiyat yoktur; model fotoğrafına göre fiyat ve süre yazılır. Gelinlik dikilmez, yalnızca tadilatı yapılır.`] },
  { id: 'kaban', f: (l) => [`${l} kaban ve palto kısaltma kaç TL?`, `Boy ve kol kısaltma ile daraltma ₺200'den, fermuar ₺300'den başlar. Astar işlerinde fiyat fotoğrafa göre yazılır.`] },
  { id: 'deri', f: (l) => [`${l} deri ceket tadilatı kaç TL?`, `Deri işleri ₺400'den başlar. Yaka değişimi, kol ve boy kısaltma ile daraltma yapılır; net fiyat fotoğrafa göre yazılır.`] },
  { id: 'deripant', f: (l) => [`${l} deri pantolon ve deri yelek tadilatı kaç TL?`, `₺400'den başlar. Bel daraltma, boy kısaltma, fermuar değişimi ve tamir yapılır; net fiyat fotoğrafa göre yazılır.`] },
  { id: 'kotmont', f: (l) => [`${l} kot ceket, kot mont ve kot şort kısaltma kaç TL?`, `Kot işleri ₺200'den başlar. Ceket ve montta kol ve boy kısaltılır, beden daraltılır; şortta boy kısaltılır.`] },
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
    `${n} Terzi Fiyatları · Paça, Fermuar, Bel | Terzi Can`,
    `${n} Terzi: Kısaltma ve Daraltma Kaç TL?`,
    `${n} Terzi · Paça ₺200'den, Fermuar ₺300'den`,
    `${n} Terzi · Bel Daraltma ve Fermuar Kaç TL?`,
    `${n} Terzi: Mont, Ceket, Kot Tadilatı Fiyatı`,
    `${n} Terzi · Tamir, Tadilat, Dikim Fiyatları`,
    `${n} Terzi · Fermuar, Düğme, Astar Kaç TL?`,
    `${n} Bay Bayan Terzi Fiyatları | Terzi Can`,
    `${n} Terzi · Yelek, Tulum, Eşofman Tadilatı Fiyatı`,
    `${n} Terzi | Kot Paça, Etek, Elbise Kısaltma Fiyatı`,
    `${n} Terzi: Abiye ve Elbise Tadilatı Fiyatı`,
    `${n} Terzi · Sökük ve Yırtık Tamiri Kaç TL?`,
    `${n} Terzi · Kot Pantolon Daraltma, Kısaltma Fiyatı`,
    `${n} Terzi: Kaban, Palto, Mont Tamiri Fiyatı`,
    `${n} Terzi · Etek Kısaltma, Bluz Daraltma Kaç TL?`,
    `${n} Terzi | Gömlek, Tişört, Şort Tadilatı Fiyatı`,
    `${n} Terzi · Özel Dikim ve Tadilat Fiyatları`,
    `${n} Terzi: Kol, Boy Kısaltma, Daraltma Fiyatı`,
  ];
  const k = (order >= 0 ? order : hashStr(slug + ':title')) % t.length; // sıra numarası: sayfalar arasında çakışma olmaz
  return [...t.slice(k), ...t.slice(0, k), `${n} Terzi Fiyatları | Antalya`];
}
