// ============================================================
// lib/bolge-hizmet-matrisi-i18n.ts — EN / RU / DE bölge sayfaları için "hangi işleri yapıyoruz" bölümü,
// ek sorgu kalıplı SSS ve bölgeye göre değişen başlık havuzu (Türkçe karşılığı: lib/bolge-hizmet-matrisi.ts).
// Kurallar: yalnızca sahibin doğruladığı işler ve fiyatlar (lib/facts.ts'ten); düğme/astar/yelek/tulum/dikim fiyatı
// "fotoğrafa göre"; kazak ve hırkada astar değişimi yok; gelinlikte yalnızca tadilat. Eve/otele alım-teslim her bölgede ücretsiz.
// Sayfalar birbirinin kopyası olmasın diye grup sırası, başlık, giriş cümlesi ve işlem sırası slug karmasına göre döner.
// ============================================================
import { hashStr } from '@/lib/seo-angles';
// Turist başlangıç fiyatları (€; terzihizmeti.com.tr lib/facts.ts ile aynı)
const EUR = { hem: 10, waist: 10, sleeve: 10, zipperPants: 15, zipperCoat: 20, leather: 20 } as const;
const eurFrom = (k: keyof typeof EUR) => EUR[k];

export type ILang = 'en' | 'ru' | 'de';
export interface MatrisGroup { id: string; heading: string; text: string }
export interface Matris { title: string; lead: string; groups: MatrisGroup[]; price: string }

type G = { id: string; ops: string[]; heads: ((n: string, l: string) => string)[]; intros: ((l: string, n: string, o: string) => string)[] };

const GROUPS: Record<ILang, G[]> = {
  en: [
    { id: 'pantolon',
      ops: ['hem shortening', 'waist taking-in', 'leg tapering', 'waist letting-out', 'jeans hem shortening with the original hem kept', 'trouser zipper replacement and repair', 'button replacement', 'repair of rips and open seams'],
      heads: [(n) => `${n} trouser and jeans alterations`, (n) => `Hem shortening and waist taking-in: ${n}`, (n, l) => `Trousers, jeans hems and zippers ${l}`],
      intros: [(l, n, o) => `Trousers and jeans ${l}: ${o}.`, (l, n, o) => `If your trousers are too long, too loose or damaged near ${n}: ${o}.`, (l, n, o) => `For trousers and jeans we offer ${o}, with free pickup and delivery to your home or hotel in ${n}.`] },
    { id: 'etek-elbise',
      ops: ['skirt hem shortening', 'skirt waist taking-in', 'dress hem shortening', 'dress taking-in', 'strap length adjustment', 'dress zipper replacement', 'lining replacement', 'evening dress and wedding dress alterations', 'custom dress making to your measurements'],
      heads: [(n) => `${n} skirt and dress alterations`, (n) => `Dress repair, evening dresses and strap length: ${n}`, (n, l) => `Dress shortening, taking-in and sewing ${l}`],
      intros: [(l, n, o) => `Skirts, dresses and evening wear ${l}: ${o}.`, (l, n, o) => `Near ${n} we handle ${o} for skirts and dresses; wedding dresses are altered only, not sewn from scratch.`, (l, n, o) => `For your skirt and dress: ${o}. Send a photo and we quote the price for ${n}.`] },
    { id: 'ust-giyim',
      ops: ['coat and jacket sleeve shortening', 'length shortening', 'taking-in at the body', 'overcoat and parka alterations', 'coat and jacket zipper replacement', 'lining replacement', 'button replacement', 'repair of rips and open seams', 'leather jacket alterations'],
      heads: [(n) => `${n} jacket, coat and overcoat alterations`, (n) => `Jacket and coat sleeve and length shortening: ${n}`, (n, l) => `Coat zipper, lining and buttons ${l}`],
      intros: [(l, n, o) => `Jackets, coats and overcoats ${l}: ${o}.`, (l, n, o) => `For outerwear we offer ${o}; same-day delivery near ${n}, urgent jobs in 1–2 hours.`, (l, n, o) => `Around ${n} we do ${o} on your jacket or coat.`] },
    { id: 'gomlek-bluz',
      ops: ['shirt taking-in and shortening', 'blouse taking-in', 'T-shirt shortening and taking-in', 'sleeve shortening', 'button replacement', 'sewing up open seams', 'shirt and blouse making to measure'],
      heads: [(n) => `${n} shirt and blouse taking-in`, (n) => `T-shirt, blouse and shirt alterations: ${n}`, (n, l) => `Blouse and shirt repair ${l}`],
      intros: [(l, n, o) => `Shirts, blouses and T-shirts ${l}: ${o}.`, (l, n, o) => `Shirt and blouse jobs for ${n}: ${o}.`, (l, n, o) => `For shirts, blouses and T-shirts: ${o}; the price depends on the photo.`] },
    { id: 'yelek-tulum',
      ops: ['waistcoat repair and alteration', 'jumpsuit shortening and taking-in', 'tracksuit hem and waist adjustment', 'shorts length shortening', 'making waistcoats, jumpsuits and tracksuits to measure', 'zipper replacement', 'repair of rips and open seams'],
      heads: [(n) => `${n} waistcoat, jumpsuit and tracksuit alterations`, (n) => `Shorts shortening and jumpsuit taking-in: ${n}`, (n, l) => `Waistcoat and tracksuit repair and sewing ${l}`],
      intros: [(l, n, o) => `Waistcoats, jumpsuits, tracksuits and shorts ${l}: ${o}.`, (l, n, o) => `Near ${n} we do ${o}.`, (l, n, o) => `For waistcoats, jumpsuits, tracksuits and shorts: ${o}. Get a price by photo for ${n}.`] },
    { id: 'fermuar-dugme',
      ops: ['zipper replacement on trousers, coats, jackets and bags (zippered and zipperless models)', 'repair of stuck zippers', 'button replacement', 'lining replacement (not on sweaters and cardigans)', 'repair of rips and open seams'],
      heads: [(n) => `${n} zipper replacement and repair`, (n) => `Zipper, button and lining replacement: ${n}`, (n, l) => `Broken zipper? Clothes repair ${l}`],
      intros: [(l, n, o) => `Zippers, buttons and linings ${l}: ${o}.`, (l, n, o) => `Broken zipper, missing button or torn lining? In ${n} we do ${o}.`, (l, n, o) => `For ${n}: ${o}.`] },
    { id: 'deri',
      ops: ['leather jacket collar replacement', 'leather jacket sleeve shortening', 'leather jacket length shortening', 'leather jacket taking-in', 'leather trouser waist taking-in', 'leather trouser hem shortening', 'leather trouser zipper replacement', 'leather waistcoat repair and alteration'],
      heads: [(n) => `${n} leather jacket, trouser and waistcoat alterations`, (n) => `Leather jacket collar and sleeve: ${n}`, (n, l) => `Leather trousers waist and hem ${l}`],
      intros: [(l, n, o) => `Leather garments ${l}: ${o}. Leather work starts from ${e('leather')}.`, (l, n, o) => `For leather jackets, trousers and waistcoats near ${n}: ${o}; send a photo for the exact price.`] },
    { id: 'kot',
      ops: ['jeans hem shortening', 'jeans hem shortening with the original hem kept', 'jeans waist taking-in', 'jeans leg tapering', 'denim jacket sleeve and length shortening', 'denim jacket taking-in', 'denim coat shortening and taking-in', 'denim skirt hem shortening and waist taking-in', 'denim shorts shortening', 'denim zipper and button replacement', 'repair of rips in denim'],
      heads: [(n) => `${n} jeans, denim jacket and denim coat alterations`, (n) => `Jeans hem and original hem: ${n}`, (n, l) => `Denim skirt and denim shorts shortening ${l}`],
      intros: [(l, n, o) => `Denim ${l}: ${o}. Denim work starts from ${e('hem')}.`, (l, n, o) => `For jeans, denim jackets, coats, skirts and shorts near ${n}: ${o}.`] },
  ],
  ru: [
    { id: 'pantolon',
      ops: ['подшив брюк', 'ушивание в поясе', 'сужение штанин', 'расширение пояса', 'подшив джинсов с сохранением оригинального низа', 'замена и ремонт молнии на брюках', 'замена пуговиц', 'ремонт дыр и распоров'],
      heads: [(n) => `${n}: переделка брюк и джинсов`, (n) => `${n}: подшив брюк и ушивание в поясе`, (n, l) => `Брюки, низ джинсов и молнии ${l}`],
      intros: [(l, n, o) => `Брюки и джинсы ${l}: ${o}.`, (l, n, o) => `Если брюки длинные, широкие или повреждены (${n}): ${o}.`, (l, n, o) => `Для брюк и джинсов: ${o}. Бесплатный забор и доставка домой или в отель — ${n}.`] },
    { id: 'etek-elbise',
      ops: ['укорочение юбок', 'ушивание юбки в поясе', 'укорочение платьев', 'ушивание платьев', 'регулировка длины бретелей', 'замена молнии на платье', 'замена подкладки', 'переделка вечерних и свадебных платьев', 'индивидуальный пошив платьев по меркам'],
      heads: [(n) => `${n}: переделка юбок и платьев`, (n) => `${n}: ремонт платьев, вечерние платья, бретели`, (n, l) => `Укоротить, ушить, сшить платье ${l}`],
      intros: [(l, n, o) => `Юбки, платья и вечерние наряды ${l}: ${o}.`, (l, n, o) => `Рядом с районом ${n}: ${o}. Свадебные платья только переделываем, не шьём.`, (l, n, o) => `Для юбки и платья: ${o}. Пришлите фото, назовём цену (${n}).`] },
    { id: 'ust-giyim',
      ops: ['укорочение рукавов пиджаков и курток', 'укорочение длины', 'ушивание по фигуре', 'переделка пальто и пуховиков', 'замена молнии на куртке и пальто', 'замена подкладки', 'замена пуговиц', 'ремонт дыр и распоров', 'переделка кожаных курток'],
      heads: [(n) => `${n}: переделка курток, пальто и пуховиков`, (n) => `${n}: укоротить рукава и длину куртки`, (n, l) => `Молния, подкладка и пуговицы на куртке ${l}`],
      intros: [(l, n, o) => `Куртки, пальто и пуховики ${l}: ${o}.`, (l, n, o) => `Для верхней одежды: ${o}; готово в тот же день, срочно — за 1–2 часа (${n}).`, (l, n, o) => `Рядом с районом ${n} делаем: ${o}.`] },
    { id: 'gomlek-bluz',
      ops: ['ушивание и укорочение рубашек', 'ушивание блузок', 'укорочение и ушивание футболок', 'укорочение рукавов', 'замена пуговиц', 'зашивание распоров', 'пошив рубашек и блузок по меркам'],
      heads: [(n) => `${n}: ушить рубашку и блузку`, (n) => `${n}: футболки, блузки, рубашки — переделка`, (n, l) => `Ремонт блузок и рубашек ${l}`],
      intros: [(l, n, o) => `Рубашки, блузки и футболки ${l}: ${o}.`, (l, n, o) => `Рубашки и блузки (${n}): ${o}.`, (l, n, o) => `Для рубашек, блузок и футболок: ${o}; цена зависит от фото.`] },
    { id: 'yelek-tulum',
      ops: ['ремонт и переделка жилетов', 'укорочение и ушивание комбинезонов', 'подгонка низа и пояса спортивных брюк', 'укорочение шорт', 'пошив жилетов, комбинезонов и спортивных костюмов по меркам', 'замена молнии', 'ремонт дыр и распоров'],
      heads: [(n) => `${n}: жилеты, комбинезоны, спортивные брюки`, (n) => `${n}: укоротить шорты, ушить комбинезон`, (n, l) => `Ремонт и пошив жилетов и спортивных костюмов ${l}`],
      intros: [(l, n, o) => `Жилеты, комбинезоны, спортивные костюмы и шорты ${l}: ${o}.`, (l, n, o) => `Рядом с районом ${n} делаем: ${o}.`, (l, n, o) => `Жилеты, комбинезоны, спортивные брюки и шорты: ${o}. Цену назовём по фото (${n}).`] },
    { id: 'fermuar-dugme',
      ops: ['замена молнии на брюках, куртках, пальто и сумках (с молнией и без)', 'ремонт заевшей молнии', 'замена пуговиц', 'замена подкладки (кроме свитеров и кардиганов)', 'ремонт дыр и распоров'],
      heads: [(n) => `${n}: замена и ремонт молнии`, (n) => `${n}: молния, пуговицы, подкладка`, (n, l) => `Сломалась молния? Ремонт одежды ${l}`],
      intros: [(l, n, o) => `Молнии, пуговицы и подкладка ${l}: ${o}.`, (l, n, o) => `Сломалась молния, оторвалась пуговица или порвалась подкладка? Район ${n}: ${o}.`, (l, n, o) => `${n}: ${o}.`] },
    { id: 'deri',
      ops: ['замена воротника кожаной куртки', 'укорочение рукавов кожаной куртки', 'укорочение длины кожаной куртки', 'ушивание кожаной куртки', 'ушивание кожаных брюк в поясе', 'подшив кожаных брюк', 'замена молнии на кожаных брюках', 'ремонт и переделка кожаного жилета'],
      heads: [(n) => `${n}: кожаные куртки, брюки и жилеты — переделка`, (n) => `${n}: воротник и рукава кожаной куртки`, (n, l) => `Кожаные брюки: пояс и низ ${l}`],
      intros: [(l, n, o) => `Кожаная одежда ${l}: ${o}. Работы с кожей — от ${e('leather')}.`, (l, n, o) => `Для кожаных курток, брюк и жилетов (${n}): ${o}; точную цену назовём по фото.`] },
    { id: 'kot',
      ops: ['подшив джинсов', 'подшив джинсов с сохранением оригинального низа', 'ушивание джинсов в поясе', 'сужение джинсов', 'укорочение рукавов и длины джинсовой куртки', 'ушивание джинсовой куртки', 'укорочение и ушивание джинсового пальто', 'укорочение и ушивание джинсовой юбки', 'укорочение джинсовых шорт', 'замена молнии и пуговиц на джинсах', 'ремонт дыр на джинсах'],
      heads: [(n) => `${n}: джинсы, джинсовые куртки и пальто — переделка`, (n) => `${n}: подшив джинсов и оригинальный низ`, (n, l) => `Джинсовая юбка и шорты: укоротить ${l}`],
      intros: [(l, n, o) => `Джинсовая одежда ${l}: ${o}. Работы с джинсой — от ${e('hem')}.`, (l, n, o) => `Для джинсов, джинсовых курток, пальто, юбок и шорт (${n}): ${o}.`] },
  ],
  de: [
    { id: 'pantolon',
      ops: ['Hosen kürzen', 'Bund enger machen', 'Beine schmaler machen', 'Bund weiter machen', 'Jeans kürzen mit Original-Saum', 'Reißverschluss an Hosen wechseln und reparieren', 'Knöpfe ersetzen', 'Risse und offene Nähte reparieren'],
      heads: [(n) => `${n}: Hosen und Jeans ändern`, (n) => `${n}: Hosen kürzen und Bund enger machen`, (n, l) => `Hosen, Jeans-Saum und Reißverschlüsse ${l}`],
      intros: [(l, n, o) => `Hosen und Jeans ${l}: ${o}.`, (l, n, o) => `Wenn Ihre Hose zu lang, zu weit oder kaputt ist (${n}): ${o}.`, (l, n, o) => `Für Hosen und Jeans: ${o}, mit kostenloser Abholung und Lieferung nach Hause oder ins Hotel (${n}).`] },
    { id: 'etek-elbise',
      ops: ['Röcke kürzen', 'Rockbund enger machen', 'Kleider kürzen', 'Kleider enger machen', 'Trägerlänge anpassen', 'Reißverschluss am Kleid wechseln', 'Futter erneuern', 'Abendkleider und Brautkleider ändern', 'Kleider nach Maß anfertigen'],
      heads: [(n) => `${n}: Röcke und Kleider ändern`, (n) => `${n}: Kleid reparieren, Abendkleid, Träger`, (n, l) => `Kleid kürzen, enger machen, nähen ${l}`],
      intros: [(l, n, o) => `Röcke, Kleider und Abendmode ${l}: ${o}.`, (l, n, o) => `In der Nähe von ${n}: ${o}. Brautkleider werden nur geändert, nicht neu genäht.`, (l, n, o) => `Für Rock und Kleid: ${o}. Foto schicken, wir nennen den Preis (${n}).`] },
    { id: 'ust-giyim',
      ops: ['Ärmel von Jacken und Mänteln kürzen', 'Länge kürzen', 'Taille enger machen', 'Mäntel und Parkas ändern', 'Reißverschluss an Jacke und Mantel wechseln', 'Futter erneuern', 'Knöpfe ersetzen', 'Risse und offene Nähte reparieren', 'Lederjacken ändern'],
      heads: [(n) => `${n}: Jacken, Mäntel und Parkas ändern`, (n) => `${n}: Ärmel und Länge von Jacken kürzen`, (n, l) => `Reißverschluss, Futter und Knöpfe an Jacken ${l}`],
      intros: [(l, n, o) => `Jacken, Mäntel und Parkas ${l}: ${o}.`, (l, n, o) => `Für Oberbekleidung: ${o}; am selben Tag fertig, Express in 1–2 Stunden (${n}).`, (l, n, o) => `In der Umgebung von ${n} erledigen wir: ${o}.`] },
    { id: 'gomlek-bluz',
      ops: ['Hemden enger machen und kürzen', 'Blusen enger machen', 'T-Shirts kürzen und enger machen', 'Ärmel kürzen', 'Knöpfe ersetzen', 'offene Nähte schließen', 'Hemden und Blusen nach Maß nähen'],
      heads: [(n) => `${n}: Hemd und Bluse enger machen`, (n) => `${n}: T-Shirts, Blusen, Hemden ändern`, (n, l) => `Blusen und Hemden reparieren ${l}`],
      intros: [(l, n, o) => `Hemden, Blusen und T-Shirts ${l}: ${o}.`, (l, n, o) => `Hemden und Blusen (${n}): ${o}.`, (l, n, o) => `Für Hemden, Blusen und T-Shirts: ${o}; der Preis richtet sich nach dem Foto.`] },
    { id: 'yelek-tulum',
      ops: ['Westen reparieren und ändern', 'Overalls kürzen und enger machen', 'Jogginghosen am Saum und Bund anpassen', 'Shorts kürzen', 'Westen, Overalls und Jogginganzüge nach Maß nähen', 'Reißverschluss wechseln', 'Risse und offene Nähte reparieren'],
      heads: [(n) => `${n}: Westen, Overalls, Jogginghosen`, (n) => `${n}: Shorts kürzen, Overall enger machen`, (n, l) => `Westen und Jogginganzüge reparieren und nähen ${l}`],
      intros: [(l, n, o) => `Westen, Overalls, Jogginganzüge und Shorts ${l}: ${o}.`, (l, n, o) => `In der Nähe von ${n}: ${o}.`, (l, n, o) => `Westen, Overalls, Jogginghosen und Shorts: ${o}. Preis per Foto (${n}).`] },
    { id: 'fermuar-dugme',
      ops: ['Reißverschluss an Hosen, Mänteln, Jacken und Taschen wechseln (mit und ohne Reißverschluss)', 'klemmende Reißverschlüsse reparieren', 'Knöpfe ersetzen', 'Futter erneuern (nicht bei Pullovern und Strickjacken)', 'Risse und offene Nähte reparieren'],
      heads: [(n) => `${n}: Reißverschluss wechseln und reparieren`, (n) => `${n}: Reißverschluss, Knopf, Futter`, (n, l) => `Reißverschluss kaputt? Kleidung reparieren ${l}`],
      intros: [(l, n, o) => `Reißverschlüsse, Knöpfe und Futter ${l}: ${o}.`, (l, n, o) => `Reißverschluss kaputt, Knopf ab oder Futter gerissen? Raum ${n}: ${o}.`, (l, n, o) => `${n}: ${o}.`] },
    { id: 'deri',
      ops: ['Kragen an Lederjacken wechseln', 'Ärmel von Lederjacken kürzen', 'Länge von Lederjacken kürzen', 'Lederjacken enger machen', 'Bund von Lederhosen enger machen', 'Lederhosen kürzen', 'Reißverschluss an Lederhosen wechseln', 'Lederwesten reparieren und ändern'],
      heads: [(n) => `${n}: Lederjacken, Lederhosen und Lederwesten ändern`, (n) => `${n}: Kragen und Ärmel der Lederjacke`, (n, l) => `Lederhose: Bund und Saum ${l}`],
      intros: [(l, n, o) => `Lederbekleidung ${l}: ${o}. Lederarbeiten ab ${e('leather')}.`, (l, n, o) => `Für Lederjacken, Lederhosen und Lederwesten (${n}): ${o}; den genauen Preis nennen wir per Foto.`] },
    { id: 'kot',
      ops: ['Jeans kürzen', 'Jeans kürzen mit Original-Saum', 'Jeansbund enger machen', 'Jeansbeine schmaler machen', 'Ärmel und Länge von Jeansjacken kürzen', 'Jeansjacken enger machen', 'Jeansmäntel kürzen und enger machen', 'Jeansröcke kürzen und Bund enger machen', 'Jeansshorts kürzen', 'Reißverschluss und Knöpfe an Jeans wechseln', 'Risse in Jeans reparieren'],
      heads: [(n) => `${n}: Jeans, Jeansjacken und Jeansmäntel ändern`, (n) => `${n}: Jeans kürzen und Original-Saum`, (n, l) => `Jeansrock und Jeansshorts kürzen ${l}`],
      intros: [(l, n, o) => `Jeansbekleidung ${l}: ${o}. Jeansarbeiten ab ${e('hem')}.`, (l, n, o) => `Für Jeans, Jeansjacken, Jeansmäntel, Jeansröcke und Jeansshorts (${n}): ${o}.`] },
  ],
};

const TITLES: Record<ILang, ((l: string, n: string) => string)[]> = {
  en: [(l) => `What we do ${l}`, (l, n) => `${n} tailor: shortening, taking-in, repair, alterations`, (l, n) => `Tailoring jobs we do around ${n}`, (l) => `Repairs, alterations and sewing ${l}`],
  ru: [(l) => `Что мы делаем ${l}`, (l, n) => `${n}: портной — подшив, ушивание, ремонт, переделка`, (l, n) => `Какие работы мы выполняем в районе ${n}`, (l) => `Ремонт, переделка и пошив ${l}`],
  de: [(l) => `Was wir ${l} machen`, (l, n) => `Schneider ${n}: kürzen, enger machen, reparieren, ändern`, (l, n) => `Schneiderarbeiten rund um ${n}`, (l) => `Reparatur, Änderung und Nähen ${l}`],
};
const LEADS: Record<ILang, ((l: string, n: string) => string)[]> = {
  en: [
    (l, n) => `${l} we shorten, take in, repair and alter men's and women's clothing, replace zippers, buttons and linings, and sew to measure. Everything for ${n} is listed below.`,
    (l, n) => `Looking for a tailor in ${n}? Trousers, skirts, dresses, jackets, coats, shirts, blouses, waistcoats, jumpsuits and tracksuits: all repairs and alterations in one place.`,
    (l) => `Shorten the length, take in the waist, replace a zipper or sew up a seam: message Terzi Can ${l} on WhatsApp.`,
  ],
  ru: [
    (l, n) => `${l} мы укорачиваем, ушиваем, ремонтируем и переделываем мужскую и женскую одежду, меняем молнии, пуговицы и подкладку, шьём по меркам. Все работы для района ${n} — ниже.`,
    (l, n) => `Ищете портного в районе ${n}? Брюки, юбки, платья, куртки, пальто, рубашки, блузки, жилеты, комбинезоны и спортивные костюмы: любой ремонт и переделка в одном месте.`,
    (l) => `Укоротить длину, ушить пояс, заменить молнию или зашить шов — напишите Terzi Can ${l} в WhatsApp.`,
  ],
  de: [
    (l, n) => `${l} kürzen, ändern und reparieren wir Damen- und Herrenkleidung, wechseln Reißverschlüsse, Knöpfe und Futter und nähen nach Maß. Alle Arbeiten für ${n} finden Sie unten.`,
    (l, n) => `Schneider in ${n} gesucht? Hosen, Röcke, Kleider, Jacken, Mäntel, Hemden, Blusen, Westen, Overalls und Jogginganzüge: alle Reparaturen und Änderungen an einem Ort.`,
    (l) => `Länge kürzen, Bund enger machen, Reißverschluss wechseln oder Naht schließen: schreiben Sie Terzi Can ${l} per WhatsApp.`,
  ],
};
const e = (k: Parameters<typeof eurFrom>[0]) => '€' + eurFrom(k);
const PRICES: Record<ILang, ((n: string) => string)[]> = {
  en: [
    (n) => `Starting prices for ${n}: hem, waist, sleeve and length shortening or taking-in from ${e('hem')}, zipper replacement from ${e('zipperPants')} (coats and jackets ${e('zipperCoat')}), leather repair and alteration from ${e('leather')}. Other jobs are priced by photo.`,
    (n) => `Prices are starting prices (${n}): shortening and taking-in ${e('hem')}, zippers ${e('zipperPants')}, leather ${e('leather')}. Buttons, linings, waistcoats, jumpsuits and made-to-measure items are quoted by photo or model.`,
  ],
  ru: [
    (n) => `Цены «от» для района ${n}: подшив и ушивание (низ, пояс, рукав, длина) от ${e('hem')}, замена молнии от ${e('zipperPants')} (куртки и пальто — ${e('zipperCoat')}), ремонт и переделка кожи от ${e('leather')}. Остальные работы — по фото.`,
    (n) => `Цены указаны «от» (${n}): укорочение и ушивание ${e('hem')}, молнии ${e('zipperPants')}, кожа ${e('leather')}. Пуговицы, подкладку, жилеты, комбинезоны и пошив по меркам оцениваем по фото или модели.`,
  ],
  de: [
    (n) => `Preise ab für ${n}: Saum, Bund, Ärmel und Länge kürzen oder enger machen ab ${e('hem')}, Reißverschluss wechseln ab ${e('zipperPants')} (Mäntel und Jacken ${e('zipperCoat')}), Lederreparatur und -änderung ab ${e('leather')}. Andere Arbeiten nach Foto.`,
    (n) => `Preise sind Ab-Preise (${n}): Kürzen und Enger machen ${e('hem')}, Reißverschlüsse ${e('zipperPants')}, Leder ${e('leather')}. Knöpfe, Futter, Westen, Overalls und Maßanfertigung nennen wir nach Foto oder Modell.`,
  ],
};

const rot = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

export function bolgeMatrisiI18n(lang: ILang, slug: string, n: string, loc: string): Matris {
  const h = (s: string) => hashStr(slug + ':' + lang + ':' + s);
  const gs = GROUPS[lang];
  const order = rot(gs, h('g') % gs.length);
  const groups: MatrisGroup[] = order.map((g, gi) => {
    const ops = rot(g.ops, h('o' + g.id) % g.ops.length); // tüm işlemler kalır, yalnızca sıra döner
    return {
      id: g.id,
      heading: g.heads[(h('h' + g.id) + gi) % g.heads.length](n, loc),
      text: g.intros[h('i' + g.id) % g.intros.length](loc, n, ops.join(', ')),
    };
  });
  const T = TITLES[lang]; const L = LEADS[lang]; const P = PRICES[lang];
  return { title: T[h('T') % T.length](loc, n), lead: L[h('L') % L.length](loc, n), groups, price: P[h('P') % P.length](n) };
}

// ── Ek sorgu kalıplı SSS (bölge başına 3 tane) ────────────────
type F = { id: string; f: (l: string, n: string) => [string, string] };
const FAQ: Record<ILang, F[]> = {
  en: [
    { id: 'paca', f: (l) => [`How much does hem shortening cost ${l}?`, `Hem shortening starts from ${e('hem')}; the exact price is quoted by photo on WhatsApp. Normal jobs are ready the same day, urgent jobs in 1–2 hours.`] },
    { id: 'fermuar', f: (l) => [`My zipper is broken ${l}, what should I do?`, `Send a photo of the zipper on WhatsApp. Zipper replacement starts from ${e('zipperPants')} (coats and jackets ${e('zipperCoat')}); stuck zippers can often be repaired without replacing them. Normal jobs are same day.`] },
    { id: 'kol', f: (l, n) => [`Can you shorten jacket and coat sleeves near ${n}?`, `Yes. Sleeve and length shortening on jackets and coats starts from ${e('hem')}; the sleeve is marked while you wear the garment. Pickup and delivery to your home or hotel is free.`] },
    { id: 'bluz', f: (l) => [`Do you take in blouses and shirts ${l}?`, `Yes. We take in and shorten blouses, shirts and T-shirts; taking-in starts from ${e('waist')} and the exact price depends on the photo.`] },
    { id: 'aski', f: (l) => [`Can a dress strap length be adjusted ${l}?`, `Yes. We adjust strap length on dresses and evening wear; the price depends on the job, send a photo for an exact quote. Wedding dresses are altered only.`] },
    { id: 'astar', f: (l) => [`Do you replace the lining of coats and jackets ${l}?`, `Yes, we replace linings (not on sweaters and cardigans). The price depends on the lining and the scope of the job, quoted by photo.`] },
    { id: 'dugme', f: (l) => [`Do you replace buttons ${l}?`, `Yes. We replace buttons on shirts, jackets, coats and trousers; the price is quoted by photo.`] },
    { id: 'yelek', f: (l) => [`Do you alter waistcoats, jumpsuits or tracksuits ${l}?`, `Yes. We repair, alter and sew waistcoats, jumpsuits, tracksuits, overcoats and coats. Send a photo or a model and we quote the price.`] },
    { id: 'orijinal', f: (l) => [`Can you shorten jeans and keep the original hem ${l}?`, `Yes. We shorten jeans so the original hem look is kept; it starts from ${e('hem')}.`] },
    { id: 'soktuk', f: (l) => [`Do you repair rips and open seams ${l}?`, `Yes. We sew up open seams and repair rips on every garment type; the price depends on the job, send a photo for a quote.`] },
    { id: 'etek', f: (l) => [`How much does skirt shortening and taking-in cost ${l}?`, `Skirt hem shortening and waist taking-in start from ${e('hem')}; denim skirts too. Normal jobs are ready the same day.`] },
    { id: 'dikim', f: (l, n) => [`Do you sew dresses, waistcoats, jumpsuits, blouses or tracksuits to measure for ${n}?`, `Yes. Dresses, waistcoats, jumpsuits, blouses and tracksuits are sewn to your measurements; send a model photo and we tell you the price and time. Wedding dresses are not sewn from scratch, only altered.`] },
    { id: 'kaban', f: (l) => [`Do you alter overcoats and winter coats ${l}?`, `Yes. For overcoats and coats we shorten length and sleeves, take in, and replace zippers and linings; the price is quoted by photo.`] },
    { id: 'deri', f: (l) => [`Can a leather jacket collar, sleeves or length be altered ${l}?`, `Yes. We replace leather jacket collars, shorten sleeves and length and take in leather jackets; leather work starts from ${e('leather')}, exact price by photo.`] },
    { id: 'deripant', f: (l) => [`Do you take in the waist and shorten leather trousers ${l}?`, `Yes. Leather trousers and waistcoats: waist taking-in, hem shortening, zipper replacement and repair; from ${e('leather')}, exact price by photo.`] },
    { id: 'kotmont', f: (l) => [`Do you shorten denim jackets, denim coats and denim shorts ${l}?`, `Yes. Sleeve and length shortening and taking-in on denim jackets and coats, and length shortening on denim shorts; denim work starts from ${e('hem')}.`] },
  ],
  ru: [
    { id: 'paca', f: (l) => [`Сколько стоит подшить брюки ${l}?`, `Подшив низа брюк — от ${e('hem')}; точную цену назовём по фото в WhatsApp. Обычные работы готовы в тот же день, срочные — за 1–2 часа.`] },
    { id: 'fermuar', f: (l) => [`Сломалась молния ${l}, что делать?`, `Пришлите фото молнии в WhatsApp. Замена молнии — от ${e('zipperPants')} (куртки и пальто — ${e('zipperCoat')}); заевшую молнию часто можно починить без замены. Обычные работы — в тот же день.`] },
    { id: 'kol', f: (l, n) => [`Можно укоротить рукава куртки или пальто в районе ${n}?`, `Да. Укорочение рукавов и длины курток и пальто — от ${e('hem')}; длину рукава отмечаем на вас. Забор и доставка домой или в отель бесплатны.`] },
    { id: 'bluz', f: (l) => [`Ушиваете блузки и рубашки ${l}?`, `Да. Ушиваем и укорачиваем блузки, рубашки и футболки; ушивание — от ${e('waist')}, точная цена зависит от фото.`] },
    { id: 'aski', f: (l) => [`Можно подогнать длину бретелей платья ${l}?`, `Да. Регулируем длину бретелей на платьях и вечерних нарядах; цена зависит от работы, для точной оценки пришлите фото. Свадебные платья только переделываем.`] },
    { id: 'astar', f: (l) => [`Меняете подкладку на куртках и пальто ${l}?`, `Да, меняем подкладку (кроме свитеров и кардиганов). Цена зависит от материала подкладки и объёма работы, оцениваем по фото.`] },
    { id: 'dugme', f: (l) => [`Меняете пуговицы ${l}?`, `Да. Меняем пуговицы на рубашках, куртках, пальто и брюках; цену называем по фото.`] },
    { id: 'yelek', f: (l) => [`Переделываете жилеты, комбинезоны и спортивные костюмы ${l}?`, `Да. Ремонтируем, переделываем и шьём жилеты, комбинезоны, спортивные костюмы, пальто и пуховики. Пришлите фото или модель — назовём цену.`] },
    { id: 'orijinal', f: (l) => [`Можно подшить джинсы с сохранением оригинального низа ${l}?`, `Да. Укорачиваем джинсы так, чтобы сохранился вид оригинального низа; от ${e('hem')}.`] },
    { id: 'soktuk', f: (l) => [`Ремонтируете дыры и распоры ${l}?`, `Да. Зашиваем распоры и ремонтируем дыры на любой одежде; цена зависит от работы, для оценки пришлите фото.`] },
    { id: 'etek', f: (l) => [`Сколько стоит укоротить и ушить юбку ${l}?`, `Укорочение юбки и ушивание в поясе — от ${e('hem')}; джинсовые юбки тоже. Обычные работы готовы в тот же день.`] },
    { id: 'dikim', f: (l, n) => [`Шьёте платья, жилеты, комбинезоны, блузки или спортивные костюмы по меркам для района ${n}?`, `Да. Платья, жилеты, комбинезоны, блузки и спортивные костюмы шьём по вашим меркам; пришлите фото модели — назовём цену и срок. Свадебные платья не шьём с нуля, только переделываем.`] },
    { id: 'kaban', f: (l) => [`Переделываете пальто и зимние куртки ${l}?`, `Да. В пальто и куртках укорачиваем длину и рукава, ушиваем, меняем молнии и подкладку; цену называем по фото.`] },
    { id: 'deri', f: (l) => [`Можно заменить воротник, укоротить рукава или длину кожаной куртки ${l}?`, `Да. Меняем воротники кожаных курток, укорачиваем рукава и длину, ушиваем кожаные куртки; работы с кожей — от ${e('leather')}, точная цена по фото.`] },
    { id: 'deripant', f: (l) => [`Ушиваете пояс и подшиваете кожаные брюки ${l}?`, `Да. Кожаные брюки и жилеты: ушивание в поясе, подшив, замена и ремонт молнии; от ${e('leather')}, точная цена по фото.`] },
    { id: 'kotmont', f: (l) => [`Укорачиваете джинсовые куртки, пальто и шорты ${l}?`, `Да. Укорачиваем рукава и длину джинсовых курток и пальто, ушиваем их, а также укорачиваем джинсовые шорты; работы с джинсой — от ${e('hem')}.`] },
  ],
  de: [
    { id: 'paca', f: (l) => [`Was kostet Hosen kürzen ${l}?`, `Hosen kürzen ab ${e('hem')}; den genauen Preis nennen wir per Foto auf WhatsApp. Normale Arbeiten sind am selben Tag fertig, Express in 1–2 Stunden.`] },
    { id: 'fermuar', f: (l) => [`Mein Reißverschluss ist kaputt ${l}, was tun?`, `Schicken Sie ein Foto des Reißverschlusses per WhatsApp. Reißverschluss wechseln ab ${e('zipperPants')} (Mäntel und Jacken ${e('zipperCoat')}); klemmende Reißverschlüsse lassen sich oft ohne Austausch reparieren. Normale Arbeiten am selben Tag.`] },
    { id: 'kol', f: (l, n) => [`Können Sie Jacken- und Mantelärmel in der Nähe von ${n} kürzen?`, `Ja. Ärmel und Länge von Jacken und Mänteln kürzen ab ${e('hem')}; die Ärmellänge wird am getragenen Kleidungsstück markiert. Abholung und Lieferung nach Hause oder ins Hotel sind kostenlos.`] },
    { id: 'bluz', f: (l) => [`Machen Sie Blusen und Hemden enger ${l}?`, `Ja. Wir machen Blusen, Hemden und T-Shirts enger und kürzer; Enger machen ab ${e('waist')}, der genaue Preis hängt vom Foto ab.`] },
    { id: 'aski', f: (l) => [`Kann man die Trägerlänge eines Kleides anpassen ${l}?`, `Ja. Wir passen die Trägerlänge bei Kleidern und Abendmode an; der Preis hängt von der Arbeit ab, schicken Sie ein Foto für ein genaues Angebot. Brautkleider werden nur geändert.`] },
    { id: 'astar', f: (l) => [`Erneuern Sie das Futter von Mänteln und Jacken ${l}?`, `Ja, wir erneuern Futter (nicht bei Pullovern und Strickjacken). Der Preis hängt vom Futter und vom Aufwand ab, Angebot per Foto.`] },
    { id: 'dugme', f: (l) => [`Ersetzen Sie Knöpfe ${l}?`, `Ja. Wir ersetzen Knöpfe an Hemden, Jacken, Mänteln und Hosen; den Preis nennen wir per Foto.`] },
    { id: 'yelek', f: (l) => [`Ändern Sie Westen, Overalls oder Jogginganzüge ${l}?`, `Ja. Wir reparieren, ändern und nähen Westen, Overalls, Jogginganzüge, Mäntel und Parkas. Schicken Sie ein Foto oder Modell, wir nennen den Preis.`] },
    { id: 'orijinal', f: (l) => [`Kann man Jeans kürzen und den Original-Saum behalten ${l}?`, `Ja. Wir kürzen Jeans so, dass der Original-Saum erhalten bleibt; ab ${e('hem')}.`] },
    { id: 'soktuk', f: (l) => [`Reparieren Sie Risse und offene Nähte ${l}?`, `Ja. Wir schließen offene Nähte und reparieren Risse an jeder Kleidungsart; der Preis hängt von der Arbeit ab, schicken Sie ein Foto.`] },
    { id: 'etek', f: (l) => [`Was kostet Rock kürzen und enger machen ${l}?`, `Rock kürzen und Bund enger machen ab ${e('hem')}; auch Jeansröcke. Normale Arbeiten sind am selben Tag fertig.`] },
    { id: 'dikim', f: (l, n) => [`Nähen Sie Kleider, Westen, Overalls, Blusen oder Jogginganzüge nach Maß für ${n}?`, `Ja. Kleider, Westen, Overalls, Blusen und Jogginganzüge nähen wir nach Ihren Maßen; schicken Sie ein Modellfoto, wir nennen Preis und Dauer. Brautkleider werden nicht neu genäht, nur geändert.`] },
    { id: 'kaban', f: (l) => [`Ändern Sie Mäntel und Winterjacken ${l}?`, `Ja. Bei Mänteln und Jacken kürzen wir Länge und Ärmel, machen sie enger und wechseln Reißverschlüsse und Futter; Preis per Foto.`] },
    { id: 'deri', f: (l) => [`Kann man bei einer Lederjacke Kragen, Ärmel oder Länge ändern ${l}?`, `Ja. Wir wechseln Kragen an Lederjacken, kürzen Ärmel und Länge und machen Lederjacken enger; Lederarbeiten ab ${e('leather')}, genauer Preis per Foto.`] },
    { id: 'deripant', f: (l) => [`Machen Sie Lederhosen am Bund enger und kürzen sie ${l}?`, `Ja. Lederhosen und Lederwesten: Bund enger machen, kürzen, Reißverschluss wechseln und reparieren; ab ${e('leather')}, genauer Preis per Foto.`] },
    { id: 'kotmont', f: (l) => [`Kürzen Sie Jeansjacken, Jeansmäntel und Jeansshorts ${l}?`, `Ja. Ärmel und Länge von Jeansjacken und Jeansmänteln kürzen und enger machen sowie Jeansshorts kürzen; Jeansarbeiten ab ${e('hem')}.`] },
  ],
};

export function bolgeEkSssI18n(lang: ILang, slug: string, n: string, loc: string): [string, string][] {
  const pool = FAQ[lang];
  const start = hashStr(slug + ':' + lang + ':faq2') % pool.length;
  const step = [1, 3, 5][hashStr(slug + ':' + lang + ':fs2') % 3];
  const out: F[] = [];
  for (let i = 0; out.length < 3 && i < pool.length * 3; i++) {
    const x = pool[(start + i * step) % pool.length];
    if (!out.includes(x)) out.push(x);
  }
  return out.map((x) => x.f(loc, n));
}

// ── Başlık havuzu: her bölge farklı bir hizmet vurgusuyla başlar; 60 karaktere sığan ilki seçilir, sonda kısa yedek ──
export function intlDistrictTitles(lang: ILang, n: string, order = -1): string[] {
  const t: Record<ILang, string[]> = {
    en: [
      `Tailor ${n} · Hem Shortening, Zipper, Alterations`, `Tailor ${n}: Trousers, Skirt, Jacket Alterations`, `${n} Dress Repair, Taking-in, Shortening | Antalya`,
      `Tailor ${n} · Waist Taking-in, Zipper Replacement`, `Tailor ${n}: Coat, Jacket, Jeans Alterations`, `Tailor ${n} · Sewing, Repair, Alterations | Antalya`,
      `Tailor ${n} · Zipper, Button, Lining Replacement`, `Men's & Women's Tailor ${n} · Shorten, Take In`, `Tailor ${n} · Vest, Jumpsuit, Blouse, Tracksuit`,
      `Tailor ${n} | Jeans Hem, Skirt, Dress Repair`, `Tailor ${n}: Evening Dress, Strap Length, Zipper`, `Tailor ${n} · Leather Jacket & Coat Alterations`],
    ru: [
      `Портной ${n}: укорочение, молнии, переделка`, `Портной ${n}: брюки, юбки, куртки`, `${n}: ремонт платьев, ушивание, подшив`,
      `Портной ${n} · ушить пояс, заменить молнию`, `Портной ${n}: пальто, куртки, джинсы`, `Портной ${n} · пошив, ремонт, переделка`,
      `Портной ${n} · молния, пуговицы, подкладка`, `Ателье ${n} · укоротить, ушить`, `Портной ${n} · жилет, комбинезон, блузка`,
      `Портной ${n} | подшив джинсов, юбок, платьев`, `Портной ${n}: вечернее платье, бретели`, `Портной ${n} · кожаные куртки, пальто`],
    de: [
      `Schneider ${n} · Kürzen, Reißverschluss, Änderung`, `Schneider ${n}: Hose, Rock, Jacke ändern`, `${n}: Kleid reparieren, enger machen, kürzen`,
      `Schneider ${n} · Bund enger, Reißverschluss neu`, `Schneider ${n}: Mantel, Jacke, Jeans ändern`, `Schneider ${n} · Nähen, Reparatur, Änderung`,
      `Schneider ${n} · Reißverschluss, Knopf, Futter`, `Änderungsschneiderei ${n} · Damen & Herren`, `Schneider ${n} · Weste, Overall, Bluse`,
      `Schneider ${n} | Jeans kürzen, Rock, Kleid`, `Schneider ${n}: Abendkleid, Träger, Reißverschluss`, `Schneider ${n} · Lederjacke & Mantel ändern`],
  };
  const fb: Record<ILang, string> = { en: `Tailor ${n}, Antalya`, ru: `Портной ${n}, Анталья`, de: `Schneider ${n}, Antalya` };
  const base = t[lang];
  const k = (order >= 0 ? order : hashStr(n)) % base.length;
  return [...base.map((_, i) => base[(i + k) % base.length]), fb[lang]];
}
