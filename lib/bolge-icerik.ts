// ============================================================
// lib/bolge-icerik.ts — Bölge × hizmet sayfalarını FARKLILAŞTIRAN içerik kütüphanesi
// - Hizmete özgü gerçek süreç anlatımları (paça, fermuar, gelinlik…) — genel zanaat bilgisi, işletmeye özel rakam/vaat yok
// - Bölgeye göre doğrudan cevap paragrafı (AI/sesli arama için 1–2 cümle), slug'a göre deterministik kalıp seçimi
// - Bölge + hizmet seçkisine göre değişen SSS havuzu (doğal soru kalıpları)
// Kurallar: uydurma mesafe/dakika/otel ortaklığı/puan YOK. Süre, fiyat ve servis kuralı lib/business.ts'ten gelir.
// swaphubs tonu: bilgi/rehber. terzihizmeti.com.tr'deki cümleler kopyalanmaz.
// ============================================================
import { hashStr } from '@/lib/seo-angles';
import { DURATION, SERVICE_RULE, PRICE_FROM, PHONE_DISPLAY, isFreeService } from '@/lib/business';
import { DISTRICT_FACTS } from '@/lib/district-facts';

export type BLang = 'tr' | 'en' | 'ru' | 'de';

/** slug'a göre deterministik seçim (aynı sayfa her derlemede aynı kalıbı alır). */
export const pick = <T,>(seed: string, arr: readonly T[]): T => arr[hashStr(seed) % arr.length];
/** slug'a göre deterministik karıştırıp ilk n öğeyi döndürür. */
export function pickN<T>(seed: string, arr: readonly T[], n: number): T[] {
  const a = [...arr];
  let h = hashStr(seed) || 1;
  for (let i = a.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

/** Türkçe özel ad + bulunma eki ("Çakırlar'da", "Meltem'de", "Kemer'de"). */
export function trLoc(ad: string): string {
  const lower = ad.toLocaleLowerCase('tr-TR');
  const vowels = lower.match(/[aeıioöuü]/g) || ['a'];
  const v = vowels[vowels.length - 1];
  const back = 'aıou'.includes(v);
  const hard = /[fstkçşhp]$/.test(lower);
  return `${ad}'${hard ? 't' : 'd'}${back ? 'a' : 'e'}`;
}

// ── Hizmete özgü süreç anlatımları ───────────────────────────────────────────
export type ProcId = 'paca' | 'kot' | 'bel' | 'fermuar' | 'elbise-tamir' | 'gelinlik-abiye' | 'takim' | 'mont' | 'gomlek' | 'deri' | 'etek' | 'ozel-dikim' | 'kiyafet-tamiri';
export const PROCESS: Record<ProcId, Record<BLang, { h: string; p: string }>> = {
  paca: {
    tr: { h: 'Paça kısaltma nasıl yapılır?', p: 'Boy, pantolonla birlikte giyeceğiniz ayakkabıyla işaretlenir. Kumaş pantolonda paça içten gizli dikişle, günlük pantolonda düz makine dikişiyle bitirilir; fazla kumaş kesilmeden önce iki paçanın eşitliği yeniden ölçülür.' },
    en: { h: 'How is trouser hemming done?', p: 'The length is marked while you wear the shoes you will wear with the trousers. Dress trousers get a blind hem stitched from the inside, casual trousers a straight machine hem; both legs are re-measured before any fabric is cut.' },
    ru: { h: 'Как подшивают брюки?', p: 'Длину отмечают, когда вы стоите в той обуви, с которой будете носить брюки. Классические брюки подшивают потайным швом изнутри, повседневные — прямой машинной строчкой; перед обрезкой ткани длину обеих штанин сверяют ещё раз.' },
    de: { h: 'Wie wird eine Hose gekürzt?', p: 'Die Länge wird mit den Schuhen abgesteckt, die Sie zur Hose tragen. Stoffhosen erhalten einen Blindsaum von innen, Freizeithosen eine gerade Maschinennaht; vor dem Zuschneiden werden beide Hosenbeine noch einmal verglichen.' },
  },
  kot: {
    tr: { h: 'Kot pantolon neden ayrı ele alınır?', p: 'Kot kumaşın paça kıvrımı ve yan dikişleri kalın olduğu için kot iğnesi ve kalın iplikle çalışılır. Daraltmada bacak çizgisi kalçadan paçaya doğru eşit dağıtılır ki pantolonun düşüşü bozulmasın.' },
    en: { h: 'Why are jeans handled differently?', p: 'Denim hems and side seams are thick, so a denim needle and heavy thread are used. When tapering, the reduction is spread evenly from hip to hem so the leg still hangs straight.' },
    ru: { h: 'Почему джинсы требуют особого подхода?', p: 'Низ и боковые швы джинсов плотные, поэтому работают джинсовой иглой и толстой нитью. При сужении убавку распределяют равномерно от бедра к низу, чтобы штанина не перекашивалась.' },
    de: { h: 'Warum werden Jeans anders bearbeitet?', p: 'Saum und Seitennähte von Jeans sind dick, daher wird mit Jeansnadel und kräftigem Garn genäht. Beim Verengen wird die Weite gleichmäßig von der Hüfte bis zum Saum verteilt, damit das Bein gerade fällt.' },
  },
  bel: {
    tr: { h: 'Bel daraltma ve genişletme nasıl işler?', p: 'Önce kemer bandı açılır ve alınacak pay arka orta dikişten ya da yan dikişlerden belirlenir. Genişletmede dikiş payının yeterli olup olmadığına provada bakılır; pay yoksa bu bilgi baştan söylenir.' },
    en: { h: 'How does taking in or letting out a waist work?', p: 'The waistband is opened and the amount is taken from the centre-back seam or the side seams. For letting out, the seam allowance is checked at the fitting; if there is not enough, you are told before any work starts.' },
    ru: { h: 'Как ушивают и расширяют пояс?', p: 'Пояс распарывают и убавку берут по среднему шву спинки или по боковым швам. Для расширения на примерке проверяют запас шва; если его нет, об этом говорят сразу.' },
    de: { h: 'Wie wird die Taille enger oder weiter gemacht?', p: 'Der Bund wird geöffnet und die Weite über die hintere Mittelnaht oder die Seitennähte genommen. Beim Weitermachen wird bei der Anprobe die Nahtzugabe geprüft; reicht sie nicht, erfahren Sie das vorab.' },
  },
  fermuar: {
    tr: { h: 'Fermuar değişiminde neye dikkat edilir?', p: 'Eski fermuar sökülür, kumaşın ağırlığına uygun tip seçilir: pantolonda dişli, elbisede gizli, montta ayrılabilir fermuar. Renk kumaşa göre eşleştirilir ve dikişten sonra fermuarın takılmadan kaydığı kontrol edilir.' },
    en: { h: 'What matters when replacing a zipper?', p: 'The old zipper is removed and a type suited to the fabric weight is chosen: a toothed zipper for trousers, an invisible one for dresses, a separating zipper for coats. The colour is matched and the slider is checked to run smoothly after sewing.' },
    ru: { h: 'Что важно при замене молнии?', p: 'Старую молнию выпарывают и подбирают тип по плотности ткани: на брюки — с зубьями, на платье — потайную, на куртку — разъёмную. Цвет подбирают под ткань, а после пришивания проверяют, что бегунок идёт без заеданий.' },
    de: { h: 'Worauf kommt es beim Reißverschlusswechsel an?', p: 'Der alte Reißverschluss wird herausgetrennt und ein zum Stoffgewicht passender Typ gewählt: bei Hosen mit Zähnen, bei Kleidern nahtverdeckt, bei Jacken teilbar. Die Farbe wird angepasst und nach dem Nähen geprüft, dass der Schieber leicht läuft.' },
  },
  'elbise-tamir': {
    tr: { h: 'Elbise tadilatı nasıl planlanır?', p: 'Ölçü elbise üzerinizdeyken iğneyle alınır: daraltma yan dikişlerden, kısaltma etek ucundan, askı ayarı omuzdan yapılır. Astarlı elbiselerde astar da aynı ölçüde düzeltilir ki dış kumaş çekmesin.' },
    en: { h: 'How is a dress alteration planned?', p: 'The fit is pinned while you wear the dress: taking in at the side seams, shortening at the hem, strap adjustment at the shoulder. In lined dresses the lining is adjusted by the same amount so the outer fabric does not pull.' },
    ru: { h: 'Как планируется переделка платья?', p: 'Посадку закалывают булавками прямо на вас: ушивают по боковым швам, укорачивают по низу, бретели подгоняют на плече. В платьях на подкладке подкладку правят на ту же величину, чтобы верх не тянул.' },
    de: { h: 'Wie wird eine Kleidänderung geplant?', p: 'Die Passform wird am Körper abgesteckt: enger über die Seitennähte, kürzer am Saum, Träger an der Schulter. Bei gefütterten Kleidern wird das Futter genauso angepasst, damit der Oberstoff nicht zieht.' },
  },
  'gelinlik-abiye': {
    tr: { h: 'Gelinlik ve abiye tadilatında süreç', p: 'İşlem provayla planlanır: korse ve beden daraltması, etek boyu ve kuyruk ayarı ayrı ayrı ele alınır. Boncuk, dantel veya tül gibi süslemelerin sökülüp yeniden işlenmesi gerekiyorsa bu kısım elde yapılır.' },
    en: { h: 'The process for wedding and evening gowns', p: 'The work is planned at a fitting: bodice and corset, hem length and train are handled one by one. Where beads, lace or tulle have to be removed and re-applied, that part is done by hand.' },
    ru: { h: 'Как идёт подгонка свадебного и вечернего платья', p: 'Работу планируют на примерке: корсет и лиф, длину и шлейф подгоняют по отдельности. Если бисер, кружево или фатин нужно снять и пришить заново, эту часть делают вручную.' },
    de: { h: 'Ablauf bei Braut- und Abendkleidern', p: 'Die Arbeit wird bei einer Anprobe geplant: Korsage, Saumlänge und Schleppe werden einzeln angepasst. Müssen Perlen, Spitze oder Tüll abgenommen und neu angebracht werden, geschieht das von Hand.' },
  },
  takim: {
    tr: { h: 'Takım elbise tadilatında ceket ve pantolon', p: 'Ceket ve pantolon birlikte değerlendirilir: ceket kolu gömlek manşetinin görünmesine göre, pantolon boyu ayakkabıya göre ayarlanır. Ceket yan ve sırt dikişlerinden daraltılır; omuz düzeltmesi ayrıca prova ister.' },
    en: { h: 'Suit alterations: jacket and trousers together', p: 'Jacket and trousers are assessed together: sleeve length so the shirt cuff shows, trouser length to suit your shoes. The jacket is taken in at the side and back seams; shoulder work needs its own fitting.' },
    ru: { h: 'Подгонка костюма: пиджак и брюки вместе', p: 'Пиджак и брюки оценивают вместе: длину рукава — так, чтобы был виден манжет рубашки, длину брюк — по обуви. Пиджак ушивают по боковым швам и шву спинки; правка плеч требует отдельной примерки.' },
    de: { h: 'Anzugänderung: Sakko und Hose zusammen', p: 'Sakko und Hose werden gemeinsam beurteilt: Ärmellänge so, dass die Hemdmanschette sichtbar bleibt, Hosenlänge passend zu den Schuhen. Das Sakko wird über Seiten- und Rückennaht enger gemacht; Schulterarbeiten brauchen eine eigene Anprobe.' },
  },
  mont: {
    tr: { h: 'Mont ve paltoda astar ve dolgu', p: 'Dış kumaş ile astar ayrı ayrı açılır; kol veya etek kısaltmasında astar boyu da aynı ölçüde alınır. Şişme montlarda dolgunun kaymaması için dikiş hattı kapitone çizgilerine göre seçilir.' },
    en: { h: 'Coats: lining and padding', p: 'Outer fabric and lining are opened separately; when sleeves or hems are shortened, the lining is shortened by the same amount. On padded jackets the seam line follows the quilting so the filling does not shift.' },
    ru: { h: 'Куртки и пальто: подкладка и утеплитель', p: 'Верх и подкладку распарывают отдельно; при укорачивании рукавов или низа подкладку укорачивают на ту же длину. На пуховиках линию шва ведут по стёжке, чтобы наполнитель не сбивался.' },
    de: { h: 'Mäntel und Jacken: Futter und Füllung', p: 'Oberstoff und Futter werden getrennt geöffnet; beim Kürzen von Ärmeln oder Saum wird das Futter um dasselbe Maß gekürzt. Bei Steppjacken folgt die Naht den Steppkammern, damit die Füllung nicht verrutscht.' },
  },
  gomlek: {
    tr: { h: 'Gömlek daraltma ve kısaltma', p: 'Gömlek yan dikişlerden daraltılır, kol boyu manşetten, boy etek ucundan alınır. Kapalı (çift) yan dikişli gömleklerde aynı dikiş tipi korunur, böylece içi de dışı kadar düzgün kalır.' },
    en: { h: 'Taking in and shortening shirts', p: 'Shirts are taken in at the side seams, sleeves are shortened from the cuff and length from the hem. Shirts with flat-felled side seams keep the same seam type, so the inside stays as neat as the outside.' },
    ru: { h: 'Ушивание и укорачивание рубашек', p: 'Рубашку ушивают по боковым швам, рукава укорачивают от манжета, длину — по низу. На рубашках с запошивочным швом сохраняют тот же тип шва, чтобы изнанка оставалась аккуратной.' },
    de: { h: 'Hemden enger machen und kürzen', p: 'Hemden werden über die Seitennähte enger gemacht, Ärmel ab der Manschette und die Länge am Saum gekürzt. Bei Kappnähten bleibt dieselbe Nahtart erhalten, damit auch die Innenseite sauber aussieht.' },
  },
  deri: {
    tr: { h: 'Deri ve süette neden önce fotoğraf istenir?', p: 'Deride iğne izi kalıcıdır; bu yüzden ölçü provada kesinleştirilir ve deriye uygun iğne ve iplikle çalışılır. Yapılabilecek işlem derinin cinsine bağlı olduğu için önce fotoğrafa bakılır.' },
    en: { h: 'Why leather and suede start with a photo', p: 'Needle holes in leather are permanent, so the fit is finalised at a fitting and a leather needle and thread are used. What can be done depends on the type of leather, so a photo is reviewed first.' },
    ru: { h: 'Почему для кожи и замши сначала нужно фото', p: 'Следы от иглы на коже остаются навсегда, поэтому мерки окончательно фиксируют на примерке и шьют специальной иглой и нитью. Что можно сделать, зависит от типа кожи — поэтому сначала смотрим фото.' },
    de: { h: 'Warum bei Leder und Wildleder zuerst ein Foto', p: 'Nadeleinstiche in Leder bleiben sichtbar, daher wird die Passform bei der Anprobe festgelegt und mit Ledernadel und passendem Garn gearbeitet. Was möglich ist, hängt von der Lederart ab — deshalb zuerst ein Foto.' },
  },
  etek: {
    tr: { h: 'Etek boyu ve bel ayarı', p: 'Etek boyunda kumaşın düşüşüne göre gizli dikiş ya da makine dikişi seçilir. Pliseli veya kloş eteklerde boy, desen bozulmasın diye gerekirse etek ucundan değil belden alınır.' },
    en: { h: 'Skirt length and waist', p: 'For the hem, a blind stitch or machine stitch is chosen according to how the fabric falls. On pleated or circle skirts the length may be taken from the waist rather than the hem so the pleats or flare stay intact.' },
    ru: { h: 'Длина и пояс юбки', p: 'Для низа выбирают потайной или машинный шов в зависимости от того, как ложится ткань. У плиссированных и клёш-юбок длину при необходимости убирают по поясу, а не по низу, чтобы не нарушить складки.' },
    de: { h: 'Rocklänge und Bund', p: 'Für den Saum wird je nach Fall des Stoffes Blindstich oder Maschinennaht gewählt. Bei Plissee- oder Glockenröcken wird die Länge notfalls am Bund statt am Saum genommen, damit Falten und Schwung erhalten bleiben.' },
  },
  'ozel-dikim': {
    tr: { h: 'Özel dikim adım adım', p: 'Model ve kumaş birlikte seçilir, ölçüler alınır ve kalıp çıkarılır. İlk provadan sonra gerekli düzeltmeler yapılır ve dikim tamamlanır; süre modele ve adede göre belirlenir.' },
    en: { h: 'Made-to-measure, step by step', p: 'Design and fabric are chosen together, measurements are taken and a pattern is drafted. After the first fitting the corrections are made and the garment is finished; the timing depends on the design and quantity.' },
    ru: { h: 'Индивидуальный пошив по шагам', p: 'Модель и ткань выбирают вместе, снимают мерки и строят выкройку. После первой примерки вносят правки и завершают пошив; срок зависит от модели и количества.' },
    de: { h: 'Maßanfertigung Schritt für Schritt', p: 'Modell und Stoff werden gemeinsam gewählt, Maße genommen und ein Schnitt erstellt. Nach der ersten Anprobe folgen die Korrekturen und die Fertigstellung; die Dauer richtet sich nach Modell und Stückzahl.' },
  },
  'kiyafet-tamiri': {
    tr: { h: 'Sökük ve yırtık onarımı', p: 'Dikiş yerinden açılan sökükler aynı hat üzerinden yeniden dikilir. Kumaşın kendisindeki yırtıklarda ise arkadan destek parçası konup onarım dışarıdan mümkün olduğunca belli olmayacak şekilde yapılır.' },
    en: { h: 'Open seams and tears', p: 'Seams that have come open are re-sewn along the original line. Tears in the fabric itself are backed with a support piece from the inside so the repair shows as little as possible.' },
    ru: { h: 'Распоровшиеся швы и разрывы', p: 'Разошедшийся шов прошивают заново по исходной линии. Разрыв самой ткани укрепляют изнутри подкладочным кусочком, чтобы ремонт был как можно менее заметен.' },
    de: { h: 'Offene Nähte und Risse', p: 'Aufgegangene Nähte werden entlang der ursprünglichen Linie neu genäht. Risse im Stoff selbst werden von innen mit einem Stützstück hinterlegt, damit die Reparatur möglichst wenig auffällt.' },
  },
};
const PROC_IDS = Object.keys(PROCESS) as ProcId[];

/** Bölgeye göre öne çıkan 3 süreç (bölgenin açısı + deterministik seçim). */
export function processesFor(slug: string, prefer: ProcId[] = [], n = 3): ProcId[] {
  const rest = pickN(`proc:${slug}`, PROC_IDS.filter((x) => !prefer.includes(x)), n);
  return [...prefer, ...rest].slice(0, n);
}

/** Servis id'sinden (lib/seo-data SERVICES) süreç anlatımına eşleme. */
export const PROC_OF_SERVICE: Record<string, ProcId> = {
  paca: 'paca', kot: 'kot', bel: 'bel', fermuar: 'fermuar', 'elbise-dikim': 'ozel-dikim', 'ozel-dikim': 'ozel-dikim',
  'elbise-tamir': 'elbise-tamir', 'gelinlik-abiye': 'gelinlik-abiye', takim: 'takim', mont: 'mont', gomlek: 'gomlek',
  deri: 'deri', tisort: 'kiyafet-tamiri', etek: 'etek', 'gece-kiyafeti': 'gelinlik-abiye', 'kiyafet-tamiri': 'kiyafet-tamiri', beden: 'bel',
};

// ── Servis kuralı (bölgeye göre) ─────────────────────────────────────────────
export function serviceRuleFor(lang: BLang, slug: string): string {
  const r = SERVICE_RULE[lang];
  return isFreeService(slug) ? `${r.hotelFree}; ${r.homeFree.charAt(0).toLocaleLowerCase(lang === 'tr' ? 'tr-TR' : lang) + r.homeFree.slice(1)}` : `${r.hotelFree}; ${r.homeByArea.charAt(0).toLocaleLowerCase(lang === 'tr' ? 'tr-TR' : lang) + r.homeByArea.slice(1)}`;
}

// ── Doğrudan cevap paragrafı (sayfa başı, 1–2 cümle) ─────────────────────────
export function directAnswer(lang: BLang, slug: string, n: string, loc: string, resort = false): string {
  const D = DURATION[lang];
  const rule = serviceRuleFor(lang, slug);
  const V: Record<BLang, string[]> = {
    tr: [
      `${loc} terzi arıyorsanız: Terzi Can'ın atölyesi Konyaaltı Hurma'dadır ve ${n} bölgesine hizmet verir. ${rule}; ${D.repairLine.charAt(0).toLocaleLowerCase('tr-TR') + D.repairLine.slice(1)}.`,
      `Kısa cevap: ${n} için kıyafetin fotoğrafını WhatsApp'tan gönderip fiyat alabilir, ${resort ? 'otelinizden' : 'adresinizden'} aldırabilirsiniz. ${D.normal}, ${D.urgent.charAt(0).toLocaleLowerCase('tr-TR') + D.urgent.slice(1)}.`,
      `${n} bölgesinde tamir, tadilat ve özel dikim için en kısa yol: fotoğrafı ${PHONE_DISPLAY} numarasına WhatsApp'tan göndermek. ${rule}.`,
    ],
    en: [
      `Looking for a tailor ${loc}? Terzi Can's workshop is in Hurma, Konyaaltı, and serves ${n}. ${rule}; ${D.repairLine.charAt(0).toLowerCase() + D.repairLine.slice(1)}.`,
      `Short answer: send a photo of the garment on WhatsApp for a price, and have it collected from your ${resort ? 'hotel' : 'address'} ${loc}. ${D.normal}; ${D.urgent.charAt(0).toLowerCase() + D.urgent.slice(1)}.`,
      `The quickest way to get a repair, alteration or made-to-measure piece ${loc}: send a photo to ${PHONE_DISPLAY} on WhatsApp. ${rule}.`,
    ],
    ru: [
      `Ищете портного ${loc}? Мастерская Terzi Can находится в Хурме (Коньяалты) и обслуживает район ${n}. ${rule}; ${D.repairLine.charAt(0).toLowerCase() + D.repairLine.slice(1)}.`,
      `Коротко: пришлите фото вещи в WhatsApp — назовём цену и заберём её ${resort ? 'из отеля' : 'по адресу'} ${loc}. ${D.normal}; ${D.urgent.charAt(0).toLowerCase() + D.urgent.slice(1)}.`,
      `Самый быстрый способ заказать ремонт, подгонку или пошив ${loc} — отправить фото на ${PHONE_DISPLAY} в WhatsApp. ${rule}.`,
    ],
    de: [
      `Schneider ${loc} gesucht? Die Werkstatt von Terzi Can liegt in Hurma, Konyaaltı, und bedient ${n}. ${rule}; ${D.repairLine.charAt(0).toLowerCase() + D.repairLine.slice(1)}.`,
      `Kurz gesagt: Foto des Kleidungsstücks per WhatsApp senden, Preis erhalten und ${resort ? 'im Hotel' : 'an Ihrer Adresse'} ${loc} abholen lassen. ${D.normal}; ${D.urgent.charAt(0).toLowerCase() + D.urgent.slice(1)}.`,
      `Der schnellste Weg zu Reparatur, Änderung oder Maßanfertigung ${loc}: ein Foto per WhatsApp an ${PHONE_DISPLAY}. ${rule}.`,
    ],
  };
  return pick(`ans:${slug}:${lang}`, V[lang]);
}

// ── SSS havuzu (bölge + hizmet seçkisi) ──────────────────────────────────────
type QA = [string, string];
interface FaqCtx { lang: BLang; slug: string; n: string; loc: string; resort: boolean; focus: ProcId[] }

function pool(c: FaqCtx): { always: QA[]; opt: QA[]; resort: QA[] } {
  const D = DURATION[c.lang];
  const P = PRICE_FROM;
  const R = SERVICE_RULE[c.lang];
  const rule = serviceRuleFor(c.lang, c.slug);
  const { n, loc } = c;
  const procQ = (id: ProcId): QA => [PROCESS[id][c.lang].h, PROCESS[id][c.lang].p];
  switch (c.lang) {
    case 'tr': return {
      always: [
        [`${loc} en yakın terzi nerede?`, `Terzi Can'ın atölyesi Konyaaltı Hurma Mahallesi'ndedir; ${n} için kıyafet adresten veya otelden alınıp teslim edilir. ${rule}. Her gün 08:00–23:00 açıktır.`],
        [`${loc} tamir ve tadilat ne kadar sürer?`, `${D.all}`],
      ],
      opt: [
        [`${loc} paça kısaltma kaç TL?`, `Paça kısaltma ₺${P.paca}'den, fermuar değişimi ₺${P.fermuar}'den, bel daraltma ₺${P.bel}'den başlar; kesin fiyat fotoğrafa göre söylenir.`],
        [`Acil terzi lazım, ${n} için 1–2 saatte yetişir mi?`, `${D.urgent}. Acil olduğunu yazarken belirtin; işin uygunluğu fotoğrafa bakılarak hemen söylenir.`],
        [`${loc} gelinlik veya abiye tadilatı yapılıyor mu?`, `Evet. Gelinlik tadilatı ₺${P.gelinlik}'den, abiye tadilatı ₺${P.abiye}'den başlar; işlem provayla planlanır. ${D.normal}.`],
        [`${loc} ölçüye göre elbise diktirebilir miyim?`, `Evet. Model ve kumaş birlikte seçilir; elbise dikimi ₺${P.elbiseDikim}'den başlar. ${D.custom}.`],
        [`Fiyatı nasıl öğrenirim?`, `Kıyafetin tamamını ve sorunlu yeri gösteren iki fotoğrafı ${PHONE_DISPLAY} numarasına WhatsApp'tan gönderin; fiyat ve teslim günü yanıtla birlikte gelir.`],
        [`Hafta sonu açık mısınız?`, `Evet, hafta sonu dahil her gün 08:00–23:00 arası hizmet verilir.`],
        procQ(c.focus[0] ?? 'paca'),
      ],
      resort: [
        [`${loc} otelime terzi gelir mi, ücretli mi?`, `${R.hotelFree}. Otel adını ve oda numarasını WhatsApp'tan yazmanız yeterli; teslim de otele yapılır.`],
        [`Türkçe bilmiyorum, anlaşabilir miyiz?`, `Evet. Türkçe, İngilizce, Rusça ve Almanca yazışabilirsiniz; fotoğraf ve kısa bir not yeterlidir.`],
      ],
    };
    case 'en': return {
      always: [
        [`Where is the nearest tailor ${loc}?`, `Terzi Can's workshop is in Hurma, Konyaaltı; for ${n} garments are collected from your address or hotel and brought back. ${rule}. Open daily 08:00–23:00.`],
        [`How long do repairs and alterations take ${loc}?`, D.all],
      ],
      opt: [
        [`How much does trouser hemming cost ${loc}?`, `Hemming starts from ₺${P.paca}, zipper replacement from ₺${P.fermuar} and waist taking-in from ₺${P.bel}; the exact price is given from a photo.`],
        [`I need an urgent fix — can it be done in 1–2 hours ${loc}?`, `${D.urgent}. Mention that it is urgent when you write; whether the job fits is confirmed from the photo straight away.`],
        [`Do you alter wedding and evening dresses ${loc}?`, `Yes. Wedding dress alterations start from ₺${P.gelinlik} and evening dresses from ₺${P.abiye}; the work is planned at a fitting. ${D.normal}.`],
        [`Can I have a dress made to measure ${loc}?`, `Yes. Design and fabric are chosen together; dressmaking starts from ₺${P.elbiseDikim}. ${D.custom}.`],
        [`How do I get a price?`, `Send two photos — the whole garment and the problem area — to ${PHONE_DISPLAY} on WhatsApp; the reply includes the price and the ready date.`],
        [`Are you open at weekends?`, `Yes, every day including weekends, 08:00–23:00.`],
        procQ(c.focus[0] ?? 'paca'),
      ],
      resort: [
        [`Will a tailor come to my hotel ${loc}, and is there a charge?`, `${R.hotelFree}. Just send the hotel name and room number on WhatsApp; the garment is delivered back to the hotel.`],
        [`I don't speak Turkish — is that a problem?`, `No. You can write in English, Russian, German or Turkish; a photo and a short note are enough.`],
      ],
    };
    case 'ru': return {
      always: [
        [`Где ближайший портной ${loc}?`, `Мастерская Terzi Can находится в Хурме (Коньяалты); для района ${n} вещи забирают с вашего адреса или из отеля и привозят обратно. ${rule}. Работаем ежедневно 08:00–23:00.`],
        [`Сколько времени занимает ремонт и подгонка ${loc}?`, D.all],
      ],
      opt: [
        [`Сколько стоит подшив брюк ${loc}?`, `Подшив брюк — от ₺${P.paca}, замена молнии — от ₺${P.fermuar}, ушивание в талии — от ₺${P.bel}; точную цену называем по фото.`],
        [`Нужно срочно — успеете за 1–2 часа ${loc}?`, `${D.urgent}. Напишите, что это срочно; по фото сразу скажем, получится ли.`],
        [`Подгоняете свадебные и вечерние платья ${loc}?`, `Да. Свадебное платье — от ₺${P.gelinlik}, вечернее — от ₺${P.abiye}; работу планируем на примерке. ${D.normal}.`],
        [`Можно ли сшить платье по меркам ${loc}?`, `Да. Модель и ткань выбираем вместе; пошив платья — от ₺${P.elbiseDikim}. ${D.custom}.`],
        [`Как узнать цену?`, `Пришлите два фото — вещь целиком и проблемное место — на ${PHONE_DISPLAY} в WhatsApp; в ответ получите цену и дату готовности.`],
        [`Вы работаете в выходные?`, `Да, ежедневно, включая выходные, с 08:00 до 23:00.`],
        procQ(c.focus[0] ?? 'paca'),
      ],
      resort: [
        [`Приедет ли портной в мой отель ${loc} и сколько это стоит?`, `${R.hotelFree}. Напишите в WhatsApp название отеля и номер комнаты — вещь привезём обратно в отель.`],
        [`Я не говорю по-турецки — сможем договориться?`, `Да. Можно писать по-русски, по-английски, по-немецки или по-турецки; достаточно фото и короткого описания.`],
      ],
    };
    default: return {
      always: [
        [`Wo ist der nächste Schneider ${loc}?`, `Die Werkstatt von Terzi Can liegt in Hurma, Konyaaltı; für ${n} wird Kleidung an Ihrer Adresse oder im Hotel abgeholt und zurückgebracht. ${rule}. Täglich 08:00–23:00 geöffnet.`],
        [`Wie lange dauern Reparaturen und Änderungen ${loc}?`, D.all],
      ],
      opt: [
        [`Was kostet Hose kürzen ${loc}?`, `Hose kürzen ab ₺${P.paca}, Reißverschluss wechseln ab ₺${P.fermuar}, Taille enger ab ₺${P.bel}; den genauen Preis nennen wir nach einem Foto.`],
        [`Es ist dringend — geht das in 1–2 Stunden ${loc}?`, `${D.urgent}. Schreiben Sie dazu, dass es eilt; anhand des Fotos sagen wir sofort, ob es klappt.`],
        [`Ändern Sie Braut- und Abendkleider ${loc}?`, `Ja. Brautkleid-Änderungen ab ₺${P.gelinlik}, Abendkleider ab ₺${P.abiye}; die Arbeit wird bei einer Anprobe geplant. ${D.normal}.`],
        [`Kann ich ein Kleid nach Maß nähen lassen ${loc}?`, `Ja. Modell und Stoff wählen wir gemeinsam; Kleider nach Maß ab ₺${P.elbiseDikim}. ${D.custom}.`],
        [`Wie erfahre ich den Preis?`, `Senden Sie zwei Fotos — das ganze Kleidungsstück und die Problemstelle — per WhatsApp an ${PHONE_DISPLAY}; die Antwort enthält Preis und Fertigstellungstermin.`],
        [`Haben Sie am Wochenende geöffnet?`, `Ja, täglich einschließlich Wochenende von 08:00 bis 23:00.`],
        procQ(c.focus[0] ?? 'paca'),
      ],
      resort: [
        [`Kommt ein Schneider in mein Hotel ${loc}, und kostet das etwas?`, `${R.hotelFree}. Schreiben Sie Hotelname und Zimmernummer per WhatsApp; die Kleidung wird ins Hotel zurückgebracht.`],
        [`Ich spreche kein Türkisch — ist das ein Problem?`, `Nein. Sie können auf Deutsch, Englisch, Russisch oder Türkisch schreiben; ein Foto und eine kurze Notiz genügen.`],
      ],
    };
  }
}

/** Bölge sayfası SSS'i: her sayfada 2 sabit + bölgeye göre seçilen 3 soru (+ otel bölgesinde 1 otel sorusu) + varsa yerel bilgi sorusu. */
export function districtFaqItems(c: FaqCtx): QA[] {
  const p = pool(c);
  const fact = DISTRICT_FACTS[c.slug];
  const local: QA[] = fact ? [[{
    tr: `${c.n} nerede, buradan en çok hangi işler gelir?`, en: `Where is ${c.n}, and what do people there usually bring in?`,
    ru: `Где находится ${c.n} и с чем оттуда чаще обращаются?`, de: `Wo liegt ${c.n}, und was wird von dort am häufigsten gebracht?`,
  }[c.lang], `${fact.where[c.lang]} ${fact.needs[c.lang]}`]] : [];
  const extra = c.resort ? [pick(`res:${c.slug}:${c.lang}`, p.resort)] : [];
  const chosen = pickN(`faq:${c.slug}:${c.lang}`, p.opt, c.resort ? 2 : 3);
  return [...p.always, ...extra, ...chosen, ...local];
}

/** Türkçe mahalle sayfaları için SSS (FaqBlock biçiminde). */
export function mahalleFaq(slug: string, ad: string, _ilce: string): { q: string; a: string }[] {
  return districtFaqItems({ lang: 'tr', slug, n: ad, loc: trLoc(ad), resort: slug === 'guzeloba' || slug === 'sirinyali', focus: [] })
    .map(([q, a]) => ({ q, a }));
}
