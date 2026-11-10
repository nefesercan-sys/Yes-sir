// ============================================================
// lib/bolge-hizmet-matrisi-i18n.ts — EN / RU / DE bölge sayfaları için "hangi işleri yapıyoruz" bölümü,
// ek sorgu kalıplı SSS ve bölgeye göre değişen başlık havuzu (Türkçe karşılığı: lib/bolge-hizmet-matrisi.ts).
// Kurallar: yalnızca sahibin doğruladığı işler ve fiyatlar (lib/facts.ts'ten); düğme/astar/yelek/tulum/dikim fiyatı
// "fotoğrafa göre"; kazak ve hırkada astar değişimi yok; gelinlikte yalnızca tadilat. Eve/otele alım-teslim her bölgede yapılır (ücretsiz denmez).
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
      heads: [(n) => `How much to shorten or take in trousers in ${n}?`, (n) => `${n}: trousers and jeans too long or too loose`, (n, l) => `Jeans hems, waists and zippers ${l}: what we do`],
      intros: [(l, n, o) => `The trouser and jeans jobs people ask for most ${l}: ${o}. Hems and waists start from ${e('hem')}.`, (l, n, o) => `Asking for a price on trousers or jeans near ${n}? Send a photo. We do: ${o}.`, (l, n, o) => `Too long, too loose or a broken zipper: ${o}. We can collect from your home or hotel in ${n} and bring it back.`] },
    { id: 'etek-elbise',
      ops: ['skirt hem shortening', 'skirt waist taking-in', 'dress hem shortening', 'dress taking-in', 'strap length adjustment', 'dress zipper replacement', 'lining replacement', 'evening dress and wedding dress alterations', 'custom dress making to your measurements'],
      heads: [(n) => `${n}: dress and skirt length, waist and straps`, (n) => `How are dress and evening wear alterations priced in ${n}?`, (n, l) => `Dress too long or too loose ${l}?`],
      intros: [(l, n, o) => `What we do on dresses, skirts and evening wear ${l}: ${o}. Wedding dresses are altered, not made.`, (l, n, o) => `Getting a price for a dress or skirt near ${n} is simple: send a photo. Jobs include ${o}.`, (l, n, o) => `Hem too long, waist too loose or straps slipping: ${o}. Shortening and taking-in start from ${e('hem')} (${n}).`] },
    { id: 'ust-giyim',
      ops: ['coat and jacket sleeve shortening', 'length shortening', 'taking-in at the body', 'overcoat and parka alterations', 'coat and jacket zipper replacement', 'lining replacement', 'button replacement', 'repair of rips and open seams', 'leather jacket alterations'],
      heads: [(n) => `${n}: jacket and coat sleeves, length, zippers`, (n) => `How much do coat and jacket alterations cost in ${n}?`, (n, l) => `Jacket sleeves too long ${l}?`],
      intros: [(l, n, o) => `What we do on jackets, coats and overcoats ${l}: ${o}. Shortening and taking-in from ${e('hem')}, coat zippers from ${e('zipperCoat')}.`, (l, n, o) => `Asking for a price on a coat or jacket near ${n}? Jobs include ${o}. Normal jobs are ready the same day, urgent ones in 1–2 hours.`, (l, n, o) => `Long sleeves, a loose fit or a broken zipper: ${o}. We quote from a photo for ${n}.`] },
    { id: 'gomlek-bluz',
      ops: ['shirt taking-in and shortening', 'blouse taking-in', 'T-shirt shortening and taking-in', 'sleeve shortening', 'button replacement', 'sewing up open seams', 'shirt and blouse making to measure'],
      heads: [(n) => `${n}: shirts, blouses and T-shirts taken in or shortened`, (n) => `Shirt or blouse too loose in ${n}?`, (n, l) => `How much to take in a shirt ${l}?`],
      intros: [(l, n, o) => `What we do on shirts, blouses and T-shirts ${l}: ${o}. Taking-in starts from ${e('waist')}.`, (l, n, o) => `For a loose shirt or blouse near ${n}: ${o}. The exact price follows from a photo.`, (l, n, o) => `Long sleeves, a wide body or a missing button: ${o}. We can collect it in ${n}.`] },
    { id: 'yelek-tulum',
      ops: ['waistcoat repair and alteration', 'jumpsuit shortening and taking-in', 'tracksuit hem and waist adjustment', 'shorts length shortening', 'making waistcoats, jumpsuits and tracksuits to measure', 'zipper replacement', 'repair of rips and open seams'],
      heads: [(n) => `${n}: waistcoats, jumpsuits, tracksuits and shorts`, (n) => `Tracksuit hems and shorts length in ${n}`, (n, l) => `Waistcoat or jumpsuit too loose ${l}?`],
      intros: [(l, n, o) => `What we do on waistcoats, jumpsuits, tracksuits and shorts ${l}: ${o}. The price follows from a photo of the job.`, (l, n, o) => `Tracksuit hem too long, shorts too long or a jumpsuit too loose near ${n}? We do ${o}.`, (l, n, o) => `For ${n}: ${o}. Shortening and taking-in start from ${e('hem')}.`] },
    { id: 'fermuar-dugme',
      ops: ['zipper replacement on trousers, coats, jackets and bags (zippered and zipperless models)', 'repair of stuck zippers', 'button replacement', 'lining replacement (not on sweaters and cardigans)', 'repair of rips and open seams'],
      heads: [(n) => `How much is a zipper replacement in ${n}?`, (n) => `${n}: broken zipper, lost button, torn lining`, (n, l) => `Zipper stuck or splitting open ${l}?`],
      intros: [(l, n, o) => `What we do on zippers, buttons and linings ${l}: ${o}. Zipper replacement starts from ${e('zipperPants')}.`, (l, n, o) => `If your zipper sticks or opens by itself near ${n}, send a photo. We do ${o}.`, (l, n, o) => `Small but urgent jobs for ${n}: ${o}. Most are finished the same day.`] },
    { id: 'deri',
      ops: ['leather jacket collar replacement', 'leather jacket sleeve shortening', 'leather jacket length shortening', 'leather jacket taking-in', 'leather trouser waist taking-in', 'leather trouser hem shortening', 'leather trouser zipper replacement', 'leather waistcoat repair and alteration'],
      heads: [(n) => `How much do leather jacket and trouser alterations cost in ${n}?`, (n) => `${n}: leather sleeves, length, collar and zipper`, (n, l) => `Leather jacket too loose or too long ${l}?`],
      intros: [(l, n, o) => `What we do on leather ${l}: ${o}. Leather work starts from ${e('leather')}; the exact price follows from a photo.`, (l, n, o) => `Not every job is possible on every leather piece, so we check the photo first. For ${n} we do ${o}; leather starts from ${e('leather')}.`] },
    { id: 'kot',
      ops: ['jeans hem shortening', 'jeans hem shortening with the original hem kept', 'jeans waist taking-in', 'jeans leg tapering', 'denim jacket sleeve and length shortening', 'denim jacket taking-in', 'denim coat shortening and taking-in', 'denim skirt hem shortening and waist taking-in', 'denim shorts shortening', 'denim zipper and button replacement', 'repair of rips in denim'],
      heads: [(n) => `How much to shorten jeans with the original hem in ${n}?`, (n) => `${n}: denim jackets, skirts and shorts altered`, (n, l) => `Jeans too long or too loose ${l}?`],
      intros: [(l, n, o) => `What we do on denim ${l}: ${o}. Denim jobs start from ${e('hem')}.`, (l, n, o) => `Jeans can be shortened so the original hem look stays. For ${n} we do ${o}; prices start from ${e('hem')}.`] },
  ],
  ru: [
    { id: 'pantolon',
      ops: ['подшив брюк', 'ушивание в поясе', 'сужение штанин', 'расширение пояса', 'подшив джинсов с сохранением оригинального низа', 'замена и ремонт молнии на брюках', 'замена пуговиц', 'ремонт дыр и распоров'],
      heads: [(n) => `${n}: сколько стоит подшить или ушить брюки?`, (n) => `${n}: брюки и джинсы длинны или велики`, (n, l) => `Низ джинсов, пояс и молния ${l}: что мы делаем`],
      intros: [(l, n, o) => `Чаще всего по брюкам и джинсам ${l} просят: ${o}. Подшив и пояс — от ${e('hem')}.`, (l, n, o) => `Хотите узнать цену на брюки или джинсы (${n})? Пришлите фото. Делаем: ${o}.`, (l, n, o) => `Длинные, широкие или со сломанной молнией: ${o}. Заберём из дома или отеля (${n}) и привезём обратно.`] },
    { id: 'etek-elbise',
      ops: ['укорочение юбок', 'ушивание юбки в поясе', 'укорочение платьев', 'ушивание платьев', 'регулировка длины бретелей', 'замена молнии на платье', 'замена подкладки', 'переделка вечерних и свадебных платьев', 'индивидуальный пошив платьев по меркам'],
      heads: [(n) => `${n}: длина, талия и бретели платья и юбки`, (n) => `${n}: как считается цена на переделку платья?`, (n, l) => `Платье длинное или велико ${l}?`],
      intros: [(l, n, o) => `Что делаем с платьями, юбками и вечерними нарядами ${l}: ${o}. Свадебные платья переделываем, но не шьём.`, (l, n, o) => `Узнать цену на платье или юбку просто: пришлите фото (${n}). В работе: ${o}.`, (l, n, o) => `Длинный подол, широкая талия или спадающие бретели: ${o}. Укорочение и ушивание — от ${e('hem')} (${n}).`] },
    { id: 'ust-giyim',
      ops: ['укорочение рукавов пиджаков и курток', 'укорочение длины', 'ушивание по фигуре', 'переделка пальто и пуховиков', 'замена молнии на куртке и пальто', 'замена подкладки', 'замена пуговиц', 'ремонт дыр и распоров', 'переделка кожаных курток'],
      heads: [(n) => `${n}: рукава, длина и молния куртки и пальто`, (n) => `${n}: сколько стоит переделка пальто и куртки?`, (n, l) => `Рукава куртки длинны ${l}?`],
      intros: [(l, n, o) => `Что делаем с куртками, пальто и пуховиками ${l}: ${o}. Укорочение и ушивание — от ${e('hem')}, молния на куртке — от ${e('zipperCoat')}.`, (l, n, o) => `Нужна цена на пальто или куртку (${n})? В работе: ${o}. Обычные работы готовы в тот же день, срочные — за 1–2 часа.`, (l, n, o) => `Длинные рукава, свободная посадка или сломанная молния: ${o}. Цену называем по фото (${n}).`] },
    { id: 'gomlek-bluz',
      ops: ['ушивание и укорочение рубашек', 'ушивание блузок', 'укорочение и ушивание футболок', 'укорочение рукавов', 'замена пуговиц', 'зашивание распоров', 'пошив рубашек и блузок по меркам'],
      heads: [(n) => `${n}: ушить или укоротить рубашку, блузку, футболку`, (n) => `${n}: рубашка или блузка велика`, (n, l) => `Сколько стоит ушить рубашку ${l}?`],
      intros: [(l, n, o) => `Что делаем с рубашками, блузками и футболками ${l}: ${o}. Ушивание — от ${e('waist')}.`, (l, n, o) => `Если рубашка или блузка велика (${n}): ${o}. Точную цену называем по фото.`, (l, n, o) => `Длинные рукава, широкий силуэт или оторванная пуговица: ${o}. Можем забрать вещь (${n}).`] },
    { id: 'yelek-tulum',
      ops: ['ремонт и переделка жилетов', 'укорочение и ушивание комбинезонов', 'подгонка низа и пояса спортивных брюк', 'укорочение шорт', 'пошив жилетов, комбинезонов и спортивных костюмов по меркам', 'замена молнии', 'ремонт дыр и распоров'],
      heads: [(n) => `${n}: жилеты, комбинезоны, спортивные брюки и шорты`, (n) => `${n}: низ спортивных брюк и длина шорт`, (n, l) => `Жилет или комбинезон велик ${l}?`],
      intros: [(l, n, o) => `Что делаем с жилетами, комбинезонами, спортивными костюмами и шортами ${l}: ${o}. Цену называем по фото работы.`, (l, n, o) => `Длинные спортивные брюки или шорты, свободный комбинезон (${n})? Делаем: ${o}.`, (l, n, o) => `${n}: ${o}. Укорочение и ушивание — от ${e('hem')}.`] },
    { id: 'fermuar-dugme',
      ops: ['замена молнии на брюках, куртках, пальто и сумках (с молнией и без)', 'ремонт заевшей молнии', 'замена пуговиц', 'замена подкладки (кроме свитеров и кардиганов)', 'ремонт дыр и распоров'],
      heads: [(n) => `${n}: сколько стоит замена молнии?`, (n) => `${n}: сломанная молния, оторванная пуговица, порванная подкладка`, (n, l) => `Молния заедает или расходится ${l}?`],
      intros: [(l, n, o) => `Что делаем с молниями, пуговицами и подкладкой ${l}: ${o}. Замена молнии — от ${e('zipperPants')}.`, (l, n, o) => `Если молния заедает или расходится сама (${n}), пришлите фото. Делаем: ${o}.`, (l, n, o) => `Небольшие, но срочные работы (${n}): ${o}. Большинство готово в тот же день.`] },
    { id: 'deri',
      ops: ['замена воротника кожаной куртки', 'укорочение рукавов кожаной куртки', 'укорочение длины кожаной куртки', 'ушивание кожаной куртки', 'ушивание кожаных брюк в поясе', 'подшив кожаных брюк', 'замена молнии на кожаных брюках', 'ремонт и переделка кожаного жилета'],
      heads: [(n) => `${n}: сколько стоит переделка кожаной куртки и брюк?`, (n) => `${n}: рукава, длина, воротник и молния на коже`, (n, l) => `Кожаная куртка велика или длинна ${l}?`],
      intros: [(l, n, o) => `Что делаем с кожей ${l}: ${o}. Работы с кожей — от ${e('leather')}; точную цену называем по фото.`, (l, n, o) => `Не всякую работу можно сделать на любой кожаной вещи, поэтому сначала смотрим фото. ${n}: ${o}; кожа — от ${e('leather')}.`] },
    { id: 'kot',
      ops: ['подшив джинсов', 'подшив джинсов с сохранением оригинального низа', 'ушивание джинсов в поясе', 'сужение джинсов', 'укорочение рукавов и длины джинсовой куртки', 'ушивание джинсовой куртки', 'укорочение и ушивание джинсового пальто', 'укорочение и ушивание джинсовой юбки', 'укорочение джинсовых шорт', 'замена молнии и пуговиц на джинсах', 'ремонт дыр на джинсах'],
      heads: [(n) => `${n}: сколько стоит подшить джинсы с оригинальным низом?`, (n) => `${n}: джинсовые куртки, юбки и шорты`, (n, l) => `Джинсы длинны или велики ${l}?`],
      intros: [(l, n, o) => `Что делаем с джинсовой одеждой ${l}: ${o}. Работы с джинсой — от ${e('hem')}.`, (l, n, o) => `Джинсы можно укоротить так, чтобы низ выглядел как оригинальный. ${n}: ${o}; цены — от ${e('hem')}.`] },
  ],
  de: [
    { id: 'pantolon',
      ops: ['Hosen kürzen', 'Bund enger machen', 'Beine schmaler machen', 'Bund weiter machen', 'Jeans kürzen mit Original-Saum', 'Reißverschluss an Hosen wechseln und reparieren', 'Knöpfe ersetzen', 'Risse und offene Nähte reparieren'],
      heads: [(n) => `${n}: Was kostet Hose kürzen oder enger machen?`, (n) => `${n}: Hose oder Jeans zu lang oder zu weit`, (n, l) => `Jeans-Saum, Bund und Reißverschluss ${l}: unsere Arbeiten`],
      intros: [(l, n, o) => `Am häufigsten gefragt bei Hosen und Jeans ${l}: ${o}. Saum und Bund ab ${e('hem')}.`, (l, n, o) => `Sie möchten einen Preis für Hose oder Jeans (${n})? Schicken Sie ein Foto. Wir machen: ${o}.`, (l, n, o) => `Zu lang, zu weit oder Reißverschluss defekt: ${o}. Wir holen bei Ihnen zu Hause oder im Hotel ab (${n}) und bringen es zurück.`] },
    { id: 'etek-elbise',
      ops: ['Röcke kürzen', 'Rockbund enger machen', 'Kleider kürzen', 'Kleider enger machen', 'Trägerlänge anpassen', 'Reißverschluss am Kleid wechseln', 'Futter erneuern', 'Abendkleider und Brautkleider ändern', 'Kleider nach Maß anfertigen'],
      heads: [(n) => `${n}: Länge, Taille und Träger bei Kleid und Rock`, (n) => `${n}: Wie wird die Änderung eines Kleids berechnet?`, (n, l) => `Kleid zu lang oder zu weit ${l}?`],
      intros: [(l, n, o) => `Das machen wir bei Kleidern, Röcken und Abendmode ${l}: ${o}. Brautkleider ändern wir, nähen sie aber nicht neu.`, (l, n, o) => `Ein Preis für Kleid oder Rock ist einfach: Foto schicken (${n}). Dazu gehören: ${o}.`, (l, n, o) => `Saum zu lang, Taille zu weit oder rutschende Träger: ${o}. Kürzen und Enger machen ab ${e('hem')} (${n}).`] },
    { id: 'ust-giyim',
      ops: ['Ärmel von Jacken und Mänteln kürzen', 'Länge kürzen', 'Taille enger machen', 'Mäntel und Parkas ändern', 'Reißverschluss an Jacke und Mantel wechseln', 'Futter erneuern', 'Knöpfe ersetzen', 'Risse und offene Nähte reparieren', 'Lederjacken ändern'],
      heads: [(n) => `${n}: Ärmel, Länge und Reißverschluss an Jacke und Mantel`, (n) => `${n}: Was kostet die Änderung von Mantel und Jacke?`, (n, l) => `Jackenärmel zu lang ${l}?`],
      intros: [(l, n, o) => `Das machen wir bei Jacken, Mänteln und Parkas ${l}: ${o}. Kürzen und Enger machen ab ${e('hem')}, Reißverschluss an Jacken ab ${e('zipperCoat')}.`, (l, n, o) => `Preis für Mantel oder Jacke gesucht (${n})? Dazu gehören: ${o}. Normale Arbeiten am selben Tag, Express in 1–2 Stunden.`, (l, n, o) => `Lange Ärmel, weiter Sitz oder defekter Reißverschluss: ${o}. Den Preis nennen wir per Foto (${n}).`] },
    { id: 'gomlek-bluz',
      ops: ['Hemden enger machen und kürzen', 'Blusen enger machen', 'T-Shirts kürzen und enger machen', 'Ärmel kürzen', 'Knöpfe ersetzen', 'offene Nähte schließen', 'Hemden und Blusen nach Maß nähen'],
      heads: [(n) => `${n}: Hemd, Bluse und T-Shirt enger machen oder kürzen`, (n) => `${n}: Hemd oder Bluse zu weit`, (n, l) => `Was kostet Hemd enger machen ${l}?`],
      intros: [(l, n, o) => `Das machen wir bei Hemden, Blusen und T-Shirts ${l}: ${o}. Enger machen ab ${e('waist')}.`, (l, n, o) => `Wenn Hemd oder Bluse zu weit ist (${n}): ${o}. Den genauen Preis nennen wir per Foto.`, (l, n, o) => `Lange Ärmel, weiter Schnitt oder fehlender Knopf: ${o}. Wir können das Stück abholen (${n}).`] },
    { id: 'yelek-tulum',
      ops: ['Westen reparieren und ändern', 'Overalls kürzen und enger machen', 'Jogginghosen am Saum und Bund anpassen', 'Shorts kürzen', 'Westen, Overalls und Jogginganzüge nach Maß nähen', 'Reißverschluss wechseln', 'Risse und offene Nähte reparieren'],
      heads: [(n) => `${n}: Westen, Overalls, Jogginghosen und Shorts`, (n) => `${n}: Saum der Jogginghose und Länge der Shorts`, (n, l) => `Weste oder Overall zu weit ${l}?`],
      intros: [(l, n, o) => `Das machen wir bei Westen, Overalls, Jogginganzügen und Shorts ${l}: ${o}. Den Preis nennen wir nach Foto der Arbeit.`, (l, n, o) => `Jogginghose oder Shorts zu lang, Overall zu weit (${n})? Wir machen: ${o}.`, (l, n, o) => `${n}: ${o}. Kürzen und Enger machen ab ${e('hem')}.`] },
    { id: 'fermuar-dugme',
      ops: ['Reißverschluss an Hosen, Mänteln, Jacken und Taschen wechseln (mit und ohne Reißverschluss)', 'klemmende Reißverschlüsse reparieren', 'Knöpfe ersetzen', 'Futter erneuern (nicht bei Pullovern und Strickjacken)', 'Risse und offene Nähte reparieren'],
      heads: [(n) => `${n}: Was kostet ein neuer Reißverschluss?`, (n) => `${n}: Reißverschluss defekt, Knopf ab, Futter gerissen`, (n, l) => `Reißverschluss klemmt oder geht auf ${l}?`],
      intros: [(l, n, o) => `Das machen wir bei Reißverschlüssen, Knöpfen und Futter ${l}: ${o}. Reißverschluss wechseln ab ${e('zipperPants')}.`, (l, n, o) => `Wenn der Reißverschluss klemmt oder von selbst aufgeht (${n}), schicken Sie ein Foto. Wir machen: ${o}.`, (l, n, o) => `Kleine, aber eilige Arbeiten (${n}): ${o}. Das meiste ist am selben Tag fertig.`] },
    { id: 'deri',
      ops: ['Kragen an Lederjacken wechseln', 'Ärmel von Lederjacken kürzen', 'Länge von Lederjacken kürzen', 'Lederjacken enger machen', 'Bund von Lederhosen enger machen', 'Lederhosen kürzen', 'Reißverschluss an Lederhosen wechseln', 'Lederwesten reparieren und ändern'],
      heads: [(n) => `${n}: Was kostet die Änderung von Lederjacke und Lederhose?`, (n) => `${n}: Ärmel, Länge, Kragen und Reißverschluss bei Leder`, (n, l) => `Lederjacke zu weit oder zu lang ${l}?`],
      intros: [(l, n, o) => `Das machen wir bei Leder ${l}: ${o}. Lederarbeiten ab ${e('leather')}; den genauen Preis nennen wir per Foto.`, (l, n, o) => `Nicht jede Arbeit ist an jedem Lederstück möglich, deshalb sehen wir uns zuerst das Foto an. ${n}: ${o}; Leder ab ${e('leather')}.`] },
    { id: 'kot',
      ops: ['Jeans kürzen', 'Jeans kürzen mit Original-Saum', 'Jeansbund enger machen', 'Jeansbeine schmaler machen', 'Ärmel und Länge von Jeansjacken kürzen', 'Jeansjacken enger machen', 'Jeansmäntel kürzen und enger machen', 'Jeansröcke kürzen und Bund enger machen', 'Jeansshorts kürzen', 'Reißverschluss und Knöpfe an Jeans wechseln', 'Risse in Jeans reparieren'],
      heads: [(n) => `${n}: Was kostet Jeans kürzen mit Original-Saum?`, (n) => `${n}: Jeansjacken, Jeansröcke und Jeansshorts ändern`, (n, l) => `Jeans zu lang oder zu weit ${l}?`],
      intros: [(l, n, o) => `Das machen wir bei Jeansbekleidung ${l}: ${o}. Jeansarbeiten ab ${e('hem')}.`, (l, n, o) => `Jeans lassen sich so kürzen, dass der Original-Saum erhalten bleibt. ${n}: ${o}; Preise ab ${e('hem')}.`] },
  ],
};

const TITLES: Record<ILang, ((l: string, n: string) => string)[]> = {
  en: [(l, n) => `${n} tailor prices and what we do`, (l) => `Tailoring ${l}: what is possible and what it costs`, (l, n) => `Repairs and alterations for ${n}: the list`, (l, n) => `${n}: shortening, taking-in, zippers, with prices`],
  ru: [(l, n) => `${n}: цены портного и список работ`, (l) => `Портной ${l}: что можно сделать и сколько это стоит`, (l, n) => `${n}: список ремонта и переделки`, (l, n) => `${n}: укорочение, ушивание, молнии — с ценами`],
  de: [(l, n) => `${n}: Schneiderpreise und unsere Arbeiten`, (l) => `Schneider ${l}: was möglich ist und was es kostet`, (l, n) => `${n}: Liste der Reparaturen und Änderungen`, (l, n) => `${n}: Kürzen, Enger machen, Reißverschluss mit Preisen`],
};
const LEADS: Record<ILang, ((l: string, n: string) => string)[]> = {
  en: [
    (l, n) => `Before you ask for a price in ${n}, see what can be done on which garment and where prices start. The list is below; a photo is enough for an exact quote.`,
    (l, n) => `Shortening and taking-in start from €10, zippers from €15 and leather from €20 (prices exclude VAT). The jobs we do for ${n} are grouped by garment below.`,
    (l) => `What a tailor can do for you ${l} and roughly what it costs, on one page. Send a photo on WhatsApp and we reply with the exact price.`,
  ],
  ru: [
    (l, n) => `Прежде чем спрашивать цену (${n}), посмотрите, что и на какой вещи можно сделать и от какой суммы. Список ниже; для точной цены достаточно фото.`,
    (l, n) => `Укорочение и ушивание — от €10, молнии — от €15, кожа — от €20 (цены без НДС). Работы для района ${n} сгруппированы по видам одежды ниже.`,
    (l) => `Что портной может сделать ${l} и сколько это примерно стоит — на одной странице. Пришлите фото в WhatsApp, и мы назовём точную цену.`,
  ],
  de: [
    (l, n) => `Bevor Sie nach dem Preis fragen (${n}): Hier sehen Sie, was an welchem Kleidungsstück möglich ist und ab welchem Preis. Die Liste steht unten; für den genauen Preis genügt ein Foto.`,
    (l, n) => `Kürzen und Enger machen ab €10, Reißverschlüsse ab €15, Leder ab €20 (zzgl. MwSt.). Die Arbeiten für ${n} sind unten nach Kleidungsstück geordnet.`,
    (l) => `Was ein Schneider ${l} für Sie tun kann und was es ungefähr kostet, auf einer Seite. Foto per WhatsApp schicken, wir nennen den genauen Preis.`,
  ],
};
const e = (k: Parameters<typeof eurFrom>[0]) => '€' + eurFrom(k);
const PRICES: Record<ILang, ((n: string) => string)[]> = {
  en: [
    (n) => `Price summary for ${n}: hems, waists, sleeves and lengths from ${e('hem')}, zippers from ${e('zipperPants')} (coats and jackets ${e('zipperCoat')}), leather from ${e('leather')}; prices exclude VAT. Anything not listed is priced from a photo.`,
    (n) => `In short (${n}): shortening and taking-in from ${e('hem')}, zipper replacement from ${e('zipperPants')}, leather alterations from ${e('leather')}, excluding VAT. Buttons, linings, waistcoats, jumpsuits and made-to-measure pieces are priced from a photo or model.`,
  ],
  ru: [
    (n) => `Коротко о ценах (${n}): низ, пояс, рукав и длина — от ${e('hem')}, молнии — от ${e('zipperPants')} (куртки и пальто — ${e('zipperCoat')}), кожа — от ${e('leather')}; цены без НДС. Чего нет в списке, оцениваем по фото.`,
    (n) => `Итого (${n}): укорочение и ушивание — от ${e('hem')}, замена молнии — от ${e('zipperPants')}, переделка кожи — от ${e('leather')}, без НДС. Пуговицы, подкладку, жилеты, комбинезоны и пошив оцениваем по фото или модели.`,
  ],
  de: [
    (n) => `Preisübersicht für ${n}: Saum, Bund, Ärmel und Länge ab ${e('hem')}, Reißverschlüsse ab ${e('zipperPants')} (Mäntel und Jacken ${e('zipperCoat')}), Leder ab ${e('leather')}; Preise zzgl. MwSt. Was nicht aufgeführt ist, berechnen wir nach Foto.`,
    (n) => `Kurz gesagt (${n}): Kürzen und Enger machen ab ${e('hem')}, Reißverschluss wechseln ab ${e('zipperPants')}, Lederänderung ab ${e('leather')}, zzgl. MwSt. Knöpfe, Futter, Westen, Overalls und Maßanfertigung nach Foto oder Modell.`,
  ],
};

const rot = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

export function bolgeMatrisiI18n(lang: ILang, slug: string, n: string, loc: string): Matris {
  const h = (s: string) => hashStr(slug + ':' + lang + ':' + s);
  const gs = GROUPS[lang];
  const order = rot(gs, h('g') % gs.length);
  const groups: MatrisGroup[] = order.map((g, gi) => {
    const ops = rot(g.ops, h('o' + g.id) % g.ops.length).reverse(); // swaphubs: işlem sırası ters (terzihizmeti ile aynı dizilim olmasın) // tüm işlemler kalır, yalnızca sıra döner
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
    { id: 'paca', f: (l) => [`What does it cost to shorten trousers ${l}?`, `From ${e('hem')}, excluding VAT. Send a photo on WhatsApp and we reply with the exact price. Normal jobs are ready the same day, urgent ones in 1–2 hours.`] },
    { id: 'fermuar', f: (l) => [`What does a new trouser zipper cost ${l}?`, `Zipper replacement starts from ${e('zipperPants')}; coats and jackets from ${e('zipperCoat')}. If only the slider is faulty it can often be fixed without changing the whole zipper. We tell you from a photo.`] },
    { id: 'kol', f: (l, n) => [`What does it cost to shorten jacket or coat sleeves in ${n}?`, `Sleeve and length shortening starts from ${e('hem')}. The sleeve is marked while you wear the garment; we can collect it in ${n} and bring it back.`] },
    { id: 'bluz', f: (l) => [`What does it cost to take in a blouse or shirt ${l}?`, `Taking-in starts from ${e('waist')}. Blouses, shirts and T-shirts can be taken in and shortened; the exact price follows from a photo.`] },
    { id: 'aski', f: (l) => [`My dress straps are too long ${l}. Can they be shortened?`, `Yes, straps on dresses and evening wear can be shortened. The price depends on the job, so send a photo. Wedding dresses are altered only, not made.`] },
    { id: 'astar', f: (l) => [`Can a torn coat or jacket lining be replaced ${l}?`, `Yes, linings are repaired or replaced; we do not line sweaters or cardigans. The price depends on the lining and how much of it is replaced, quoted from a photo.`] },
    { id: 'dugme', f: (l) => [`Is a missing button worth a trip to the tailor ${l}?`, `Yes. Buttons are sewn on or replaced on shirts, jackets, coats and trousers; the price follows from a photo.`] },
    { id: 'yelek', f: (l) => [`What can you do on waistcoats, jumpsuits and tracksuits ${l}?`, `Repairs, alterations and made-to-measure sewing, overcoats and coats included. Send a photo or a model and we reply with the price.`] },
    { id: 'orijinal', f: (l) => [`Can jeans be shortened with the original stitching ${l}?`, `Yes. The hem is shortened so the original look stays; it starts from ${e('hem')}.`] },
    { id: 'soktuk', f: (l) => [`Can a ripped or split garment be mended ${l}?`, `Yes, open seams are sewn and rips repaired on every kind of garment. The price depends on the job, so send a photo.`] },
    { id: 'etek', f: (l) => [`What does skirt shortening or waist taking-in cost ${l}?`, `Both start from ${e('hem')}, denim skirts included. Normal jobs are ready the same day.`] },
    { id: 'dikim', f: (l, n) => [`Can I have a dress, blouse, waistcoat or jumpsuit made for me in ${n}?`, `Yes, to your measurements. Made-to-measure has no fixed price: we quote price and time from a photo of the model. Wedding dresses are altered only, not made.`] },
    { id: 'kaban', f: (l) => [`What does shortening an overcoat or winter coat cost ${l}?`, `Length, sleeves and taking-in start from ${e('hem')}, coat zippers from ${e('zipperCoat')}. Lining work is priced from a photo.`] },
    { id: 'deri', f: (l) => [`What do leather jacket alterations cost ${l}?`, `Leather work starts from ${e('leather')}. Collars are replaced, sleeves and length shortened and jackets taken in; the exact price follows from a photo.`] },
    { id: 'deripant', f: (l) => [`What do leather trouser and leather waistcoat alterations cost ${l}?`, `From ${e('leather')}. Waist taking-in, hem shortening, zipper replacement and repairs are possible; the exact price follows from a photo.`] },
    { id: 'kotmont', f: (l) => [`What does shortening a denim jacket, denim coat or denim shorts cost ${l}?`, `Denim jobs start from ${e('hem')}. Jackets and coats get shorter sleeves or length and a closer fit; shorts are shortened.`] },
  ],
  ru: [
    { id: 'paca', f: (l) => [`Во сколько обойдётся подшить брюки ${l}?`, `От ${e('hem')}, без НДС. Пришлите фото в WhatsApp — назовём точную цену. Обычные работы готовы в тот же день, срочные — за 1–2 часа.`] },
    { id: 'fermuar', f: (l) => [`Сколько стоит новая молния на брюках ${l}?`, `Замена молнии — от ${e('zipperPants')}; на куртках и пальто — от ${e('zipperCoat')}. Если сломан только бегунок, часто хватает ремонта без замены всей молнии. Скажем по фото.`] },
    { id: 'kol', f: (l, n) => [`Сколько стоит укоротить рукава куртки или пальто (${n})?`, `Укорочение рукавов и длины — от ${e('hem')}. Длину рукава отмечаем на вас; вещь можем забрать и привезти обратно.`] },
    { id: 'bluz', f: (l) => [`Сколько стоит ушить блузку или рубашку ${l}?`, `Ушивание — от ${e('waist')}. Блузки, рубашки и футболки ушиваем и укорачиваем; точную цену называем по фото.`] },
    { id: 'aski', f: (l) => [`Бретели платья длинны ${l}. Их можно укоротить?`, `Да, бретели на платьях и вечерних нарядах укорачиваем. Цена зависит от работы, поэтому пришлите фото. Свадебные платья только переделываем, не шьём.`] },
    { id: 'astar', f: (l) => [`Можно заменить порванную подкладку куртки или пальто ${l}?`, `Да, подкладку ремонтируем или меняем; на свитерах и кардиганах подкладку не делаем. Цена зависит от материала и объёма замены, называем по фото.`] },
    { id: 'dugme', f: (l) => [`Стоит ли идти к портному из-за оторванной пуговицы ${l}?`, `Да. Пуговицы пришиваем и меняем на рубашках, куртках, пальто и брюках; цену называем по фото.`] },
    { id: 'yelek', f: (l) => [`Что вы делаете с жилетами, комбинезонами и спортивными костюмами ${l}?`, `Ремонт, переделку и пошив по меркам, включая пальто и пуховики. Пришлите фото или модель — назовём цену.`] },
    { id: 'orijinal', f: (l) => [`Можно укоротить джинсы с оригинальной строчкой ${l}?`, `Да. Низ укорачиваем так, чтобы сохранился оригинальный вид; от ${e('hem')}.`] },
    { id: 'soktuk', f: (l) => [`Можно починить порванную или разошедшуюся по шву вещь ${l}?`, `Да, зашиваем швы и ремонтируем дыры на любой одежде. Цена зависит от работы, поэтому пришлите фото.`] },
    { id: 'etek', f: (l) => [`Сколько стоит укоротить юбку или ушить её в поясе ${l}?`, `И то и другое — от ${e('hem')}, включая джинсовые юбки. Обычные работы готовы в тот же день.`] },
    { id: 'dikim', f: (l, n) => [`Можно сшить платье, блузку, жилет или комбинезон на заказ (${n})?`, `Да, по вашим меркам. У пошива нет фиксированной цены: цену и срок называем по фото модели. Свадебные платья только переделываем, не шьём.`] },
    { id: 'kaban', f: (l) => [`Сколько стоит укоротить пальто или зимнюю куртку ${l}?`, `Длина, рукава и ушивание — от ${e('hem')}, молния на куртке — от ${e('zipperCoat')}. Работы с подкладкой оцениваем по фото.`] },
    { id: 'deri', f: (l) => [`Сколько стоит переделка кожаной куртки ${l}?`, `Работы с кожей — от ${e('leather')}. Меняем воротник, укорачиваем рукава и длину, ушиваем; точную цену называем по фото.`] },
    { id: 'deripant', f: (l) => [`Сколько стоит переделка кожаных брюк и кожаного жилета ${l}?`, `От ${e('leather')}. Возможны ушивание в поясе, подшив, замена молнии и ремонт; точную цену называем по фото.`] },
    { id: 'kotmont', f: (l) => [`Сколько стоит укоротить джинсовую куртку, пальто или шорты ${l}?`, `Работы с джинсой — от ${e('hem')}. В куртках и пальто укорачиваем рукава и длину и ушиваем; шорты укорачиваем.`] },
  ],
  de: [
    { id: 'paca', f: (l) => [`Was kostet es, eine Hose zu kürzen ${l}?`, `Ab ${e('hem')}, zzgl. MwSt. Schicken Sie ein Foto per WhatsApp, wir nennen den genauen Preis. Normale Arbeiten sind am selben Tag fertig, Express in 1–2 Stunden.`] },
    { id: 'fermuar', f: (l) => [`Was kostet ein neuer Hosenreißverschluss ${l}?`, `Reißverschluss wechseln ab ${e('zipperPants')}; an Mänteln und Jacken ab ${e('zipperCoat')}. Ist nur der Schieber defekt, genügt oft eine Reparatur ohne kompletten Austausch. Das sagen wir Ihnen nach Foto.`] },
    { id: 'kol', f: (l, n) => [`Was kostet es, Jacken- oder Mantelärmel zu kürzen (${n})?`, `Ärmel und Länge kürzen ab ${e('hem')}. Die Ärmellänge wird am getragenen Stück markiert; wir können es abholen und zurückbringen.`] },
    { id: 'bluz', f: (l) => [`Was kostet es, eine Bluse oder ein Hemd enger zu machen ${l}?`, `Enger machen ab ${e('waist')}. Blusen, Hemden und T-Shirts machen wir enger und kürzer; den genauen Preis nennen wir nach Foto.`] },
    { id: 'aski', f: (l) => [`Die Träger meines Kleids sind zu lang ${l}. Kann man sie kürzen?`, `Ja, Träger an Kleidern und Abendmode kürzen wir. Der Preis hängt von der Arbeit ab, bitte Foto schicken. Brautkleider ändern wir nur, wir nähen sie nicht neu.`] },
    { id: 'astar', f: (l) => [`Kann ein gerissenes Mantel- oder Jackenfutter ersetzt werden ${l}?`, `Ja, Futter wird repariert oder erneuert; bei Pullovern und Strickjacken nicht. Der Preis hängt vom Futter und vom Umfang ab, Angebot nach Foto.`] },
    { id: 'dugme', f: (l) => [`Lohnt sich der Weg zum Schneider für einen fehlenden Knopf ${l}?`, `Ja. Knöpfe nähen wir an oder ersetzen sie, an Hemden, Jacken, Mänteln und Hosen; den Preis nennen wir nach Foto.`] },
    { id: 'yelek', f: (l) => [`Was machen Sie an Westen, Overalls und Jogginganzügen ${l}?`, `Reparatur, Änderung und Maßanfertigung, auch für Mäntel und Parkas. Foto oder Modell schicken, wir nennen den Preis.`] },
    { id: 'orijinal', f: (l) => [`Kann man Jeans mit der Originalnaht kürzen ${l}?`, `Ja. Der Saum wird so gekürzt, dass die Originaloptik bleibt; ab ${e('hem')}.`] },
    { id: 'soktuk', f: (l) => [`Kann ein gerissenes oder aufgegangenes Kleidungsstück repariert werden ${l}?`, `Ja, offene Nähte werden geschlossen und Risse repariert, an jeder Art von Kleidung. Der Preis hängt von der Arbeit ab, bitte Foto schicken.`] },
    { id: 'etek', f: (l) => [`Was kostet es, einen Rock zu kürzen oder am Bund enger zu machen ${l}?`, `Beides ab ${e('hem')}, auch bei Jeansröcken. Normale Arbeiten sind am selben Tag fertig.`] },
    { id: 'dikim', f: (l, n) => [`Kann ich mir ein Kleid, eine Bluse, eine Weste oder einen Overall nähen lassen (${n})?`, `Ja, nach Ihren Maßen. Maßanfertigung hat keinen Festpreis: Preis und Dauer nennen wir nach einem Foto des Modells. Brautkleider ändern wir nur, wir nähen sie nicht neu.`] },
    { id: 'kaban', f: (l) => [`Was kostet es, einen Mantel oder eine Winterjacke zu kürzen ${l}?`, `Länge, Ärmel und Enger machen ab ${e('hem')}, Reißverschluss an Jacken ab ${e('zipperCoat')}. Futterarbeiten berechnen wir nach Foto.`] },
    { id: 'deri', f: (l) => [`Was kostet die Änderung einer Lederjacke ${l}?`, `Lederarbeiten ab ${e('leather')}. Kragen wechseln, Ärmel und Länge kürzen, enger machen; den genauen Preis nennen wir nach Foto.`] },
    { id: 'deripant', f: (l) => [`Was kostet die Änderung von Lederhose und Lederweste ${l}?`, `Ab ${e('leather')}. Bund enger machen, kürzen, Reißverschluss wechseln und Reparaturen sind möglich; den genauen Preis nennen wir nach Foto.`] },
    { id: 'kotmont', f: (l) => [`Was kostet es, Jeansjacke, Jeansmantel oder Jeansshorts zu kürzen ${l}?`, `Jeansarbeiten ab ${e('hem')}. Bei Jacken und Mänteln kürzen wir Ärmel und Länge und machen sie enger; Shorts kürzen wir.`] },
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
      `Tailor ${n} · Prices: Hems, Zippers, Waists`, `Tailor ${n}: What Does Shortening Cost?`, `Tailor ${n} · Hems from €10, Zippers from €15`, `Tailor ${n} · Waist Taking-in and Zipper Prices`, `Tailor ${n}: Coat, Jacket and Jeans Prices`, `Tailor ${n} · Repair, Alteration, Sewing Prices`, `Tailor ${n} · Zipper, Button, Lining: Prices`, `Men's & Women's Tailor ${n} · Price List`, `Tailor ${n} · Waistcoat, Jumpsuit, Tracksuit`, `Tailor ${n} | Jeans Hem, Skirt, Dress Prices`, `Tailor ${n}: Evening Dress Alteration Prices`, `Tailor ${n} · Leather Jacket and Coat Prices`],
    ru: [
      `Портной ${n} · цены: подшив, молнии, пояс`, `Портной ${n}: сколько стоит укоротить?`, `Портной ${n} · подшив от €10, молнии от €15`, `Портной ${n} · ушить пояс, молния: цены`, `Портной ${n}: пальто, куртки, джинсы — цены`, `Портной ${n} · ремонт, переделка, пошив: цены`, `Портной ${n} · молния, пуговицы, подкладка: цены`, `Ателье ${n} · мужская и женская одежда, цены`, `Портной ${n} · жилет, комбинезон, костюм`, `Портной ${n} | джинсы, юбки, платья: цены`, `Портной ${n}: переделка вечернего платья`, `Портной ${n} · кожаные куртки и пальто: цены`],
    de: [
      `Schneider ${n} · Preise: Saum, Reißverschluss`, `Schneider ${n}: Was kostet Kürzen?`, `Schneider ${n} · Kürzen ab €10, Reißverschluss ab €15`, `Schneider ${n} · Bund enger, Reißverschluss: Preise`, `Schneider ${n}: Mantel, Jacke, Jeans – Preise`, `Schneider ${n} · Reparatur, Änderung, Nähen: Preise`, `Schneider ${n} · Reißverschluss, Knopf, Futter: Preise`, `Änderungsschneiderei ${n} · Preisliste`, `Schneider ${n} · Weste, Overall, Jogginganzug`, `Schneider ${n} | Jeans, Rock, Kleid kürzen: Preise`, `Schneider ${n}: Abendkleid ändern – Preise`, `Schneider ${n} · Lederjacke und Mantel: Preise`],
  };
  const fb: Record<ILang, string> = { en: `Tailor ${n}, Antalya`, ru: `Портной ${n}, Анталья`, de: `Schneider ${n}, Antalya` };
  const base = t[lang];
  const k = (order >= 0 ? order : hashStr(n)) % base.length;
  return [...base.map((_, i) => base[(i + k) % base.length]), fb[lang]];
}
