// Örnek görseller (yapay zekâ ile üretilmiş; gerçek iş/müşteri fotoğrafı DEĞİLDİR). Tek kaynak: başlık + açıklama 4 dilde.
// Kullanım: <OrnekGorselSeridi lang="tr" anahtarlar={['sef-mutfak-uniforma', ...]} />
export type L4 = 'tr' | 'en' | 'de' | 'ru';
export type GLang = L4 | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
type L = Record<L4, string>;
type LA = Record<GLang, string>;
import { EK_METIN, type EkLang } from './ornek-gorseller-ek';
export interface OrnekGorsel { src: string; w: number; h: number; baslik: L; aciklama: L }

/** Dile göre başlık + açıklama (tr/en/de/ru ana veri; es/fr/pl/uk/nl/ar ek dosyadan; yoksa İngilizce). */
export function gorselMetin(k: GorselAnahtar, lang: GLang): { baslik: string; aciklama: string } {
  const g = GORSELLER[k];
  if (lang === 'tr' || lang === 'en' || lang === 'de' || lang === 'ru') return { baslik: g.baslik[lang], aciklama: g.aciklama[lang] };
  const e = EK_METIN[k]?.[lang as EkLang];
  return e ? { baslik: e[0], aciklama: e[1] } : { baslik: g.baslik.en, aciklama: g.aciklama.en };
}

const W = 1600, H = 893; // 1376×768 kaynaklar 1600 genişliğe ölçeklendi; 1264×848 kaynaklar olduğu gibi
const S = (n: string, w = 1264, h = 848) => ({ src: `/gorseller/${n}.webp`, w, h });
const WIDE = (n: string) => S(n, 1376, 768);

export const ORNEK_ETIKET: LA = { tr: 'örnek görsel', en: 'illustrative image', de: 'Beispielbild', ru: 'пример изображения',
  es: 'imagen ilustrativa', fr: 'image d’illustration', pl: 'obraz poglądowy', uk: 'ілюстративне зображення', nl: 'illustratieve afbeelding', ar: 'صورة توضيحية' };
/** Alt metne eklenen anahtar ifade (dile göre): Antalya terzi · dikim, tamir, tadilat. */
export const ALT_EK: LA = { tr: 'Antalya terzi: dikim, tamir, tadilat', en: 'tailor in Antalya: sewing, repairs, alterations', de: 'Schneider in Antalya: Nähen, Reparatur, Änderungen',
  ru: 'портной в Анталье: пошив, ремонт, подгонка', es: 'sastre en Antalya: confección, arreglos y ajustes', fr: 'couturier à Antalya : couture, réparations, retouches',
  pl: 'krawiec w Antalyi: szycie, naprawy, przeróbki', uk: 'кравець в Анталії: пошиття, ремонт, підгонка', nl: 'kleermaker in Antalya: naaien, reparaties, vermaken', ar: 'خياط في أنطاليا: خياطة وتصليح وتعديل' };
export const ORNEK_BASLIK: LA = { tr: 'Örnek görseller', en: 'Sample images', de: 'Beispielbilder', ru: 'Примеры изображений',
  es: 'Imágenes de ejemplo', fr: 'Exemples d’images', pl: 'Przykładowe obrazy', uk: 'Приклади зображень', nl: 'Voorbeeldafbeeldingen', ar: 'صور توضيحية' };
export const ORNEK_NOT: LA = {
  tr: 'Görseller örnek niteliğindedir; gerçek iş veya müşteri fotoğrafı değildir.',
  en: 'Images are illustrative examples, not photos of real work or customers.',
  de: 'Die Bilder sind Beispielbilder, keine Fotos echter Arbeiten oder Kunden.',
  ru: 'Изображения носят иллюстративный характер и не являются фотографиями реальных работ или клиентов.',
  es: 'Las imágenes son ilustrativas; no son fotos de trabajos o clientes reales.',
  fr: 'Les images sont illustratives ; ce ne sont pas des photos de vrais travaux ou clients.',
  pl: 'Zdjęcia mają charakter poglądowy i nie przedstawiają prawdziwych prac ani klientów.',
  uk: 'Зображення є ілюстративними й не є фотографіями реальних робіт чи клієнтів.',
  nl: "De afbeeldingen zijn illustratief en geen foto's van echt werk of klanten.",
  ar: 'الصور توضيحية وليست صورًا لأعمال أو عملاء حقيقيين.',
};

export const GORSELLER = {
  'paca-kisaltma': { ...S('antalya-terzi-paca-kisaltma'),
    baslik: { tr: 'Paça kısaltma: boy iğneyle işaretleniyor', en: 'Hemming: length marked with pins', de: 'Hose kürzen: Länge mit Nadeln markiert', ru: 'Подшив брюк: длина отмечена булавками' },
    aciklama: { tr: 'Paça boyu ayakkabıyla işaretlenir; kısaltma aynı gün yapılır.', en: 'The hem length is marked with your shoes on; hemming is done the same day.', de: 'Die Länge wird mit Schuhen markiert; gekürzt wird am selben Tag.', ru: 'Длину отмечаем в обуви; подшив делаем в тот же день.' } },
  'fermuar-degisimi': { ...S('antalya-terzi-fermuar-degisimi-tamiri'),
    baslik: { tr: 'Fermuar değişimi ve tamiri', en: 'Zipper replacement and repair', de: 'Reißverschluss wechseln und reparieren', ru: 'Замена и ремонт молнии' },
    aciklama: { tr: 'Mont, pantolon, etek ve çanta fermuarı; bozuk fermuar sökülüp yenisi dikilir.', en: 'Coat, trouser, skirt and bag zippers; the broken zipper is removed and a new one sewn in.', de: 'Reißverschlüsse an Jacken, Hosen, Röcken und Taschen: der defekte wird ersetzt.', ru: 'Молнии на куртках, брюках, юбках и сумках: старую снимаем, новую вшиваем.' } },
  'dikis-makinesi': { ...S('antalya-terzi-dikim-tamir-dikis-makinesi'),
    baslik: { tr: 'Dikiş makinesinde dikim ve tamir', en: 'Sewing and repairs on the machine', de: 'Nähen und Reparieren an der Maschine', ru: 'Пошив и ремонт на машине' },
    aciklama: { tr: 'Sökük, yırtık ve tadilat dikişleri makinede sağlam şekilde yapılır.', en: 'Open seams, tears and alteration seams are stitched firmly on the machine.', de: 'Offene Nähte, Risse und Änderungsnähte werden fest an der Maschine genäht.', ru: 'Распоровшиеся швы, разрывы и швы подгонки прочно прошиваем на машине.' } },
  'bel-daraltma-manken': { ...S('antalya-terzi-elbise-bel-daraltma'),
    baslik: { tr: 'Elbise bel daraltma provası', en: 'Dress waist taking-in fitting', de: 'Kleid an der Taille enger machen', ru: 'Ушивание платья по талии' },
    aciklama: { tr: 'Daraltma payı iğnelerle işaretlenir, sonra dikilir.', en: 'The amount to take in is pinned first, then sewn.', de: 'Die Änderung wird zuerst abgesteckt, dann genäht.', ru: 'Припуск сначала закалываем булавками, затем прошиваем.' } },
  'gelinlik-abiye': { ...S('antalya-terzi-gelinlik-tadilati'),
    baslik: { tr: 'Gelinlik tadilatı', en: 'Wedding dress alteration', de: 'Brautkleid ändern', ru: 'Подгонка свадебного платья' },
    aciklama: { tr: 'Gelinlikte yalnızca tadilat yapılır: beden, boy ve askı ayarı.', en: 'Wedding dresses are altered only: fit, length and straps.', de: 'Brautkleider werden nur geändert: Passform, Länge und Träger.', ru: 'Свадебные платья только подгоняем: размер, длина и бретели.' } },
  'keten-kadin-evde': { ...WIDE('antalya-terzi-keten-gomlek-pantolon-ozel-dikim'),
    baslik: { tr: 'Kadın keten gömlek ve pantolon', en: "Women's linen shirt and trousers", de: 'Damen-Leinenhemd und -hose', ru: 'Женская льняная рубашка и брюки' },
    aciklama: { tr: 'Rahat kesim keten takım; özel dikimde ölçünüze göre hazırlanır.', en: 'A relaxed-fit linen set; made to your measurements when custom tailored.', de: 'Ein bequemes Leinen-Set; als Maßanfertigung nach Ihren Maßen.', ru: 'Свободный льняной комплект; при индивидуальном пошиве — по вашим меркам.' } },
  'keten-blazer-atolye': { ...WIDE('antalya-terzi-kadin-keten-takim-dikim'),
    baslik: { tr: 'Keten blazer ve pantolon', en: 'Linen blazer and trousers', de: 'Leinenblazer und Hose', ru: 'Льняной блейзер и брюки' },
    aciklama: { tr: 'Atölyede kalıp, kumaş ve makine; ceket ve pantolon özel dikim.', en: 'Patterns, fabric and machines in the workshop; jacket and trousers made to order.', de: 'Schnitte, Stoffe und Maschinen im Atelier; Jacke und Hose nach Maß.', ru: 'Выкройки, ткани и машины в ателье; пиджак и брюки на заказ.' } },
  'keten-erkek-gomlek': { ...WIDE('antalya-terzi-erkek-keten-gomlek-dikim'),
    baslik: { tr: 'Erkek keten gömlek ve pantolon', en: "Men's linen shirt and trousers", de: 'Herren-Leinenhemd und -hose', ru: 'Мужская льняная рубашка и брюки' },
    aciklama: { tr: 'Sıcak havalar için nefes alan keten takım.', en: 'A breathable linen set for hot weather.', de: 'Ein atmungsaktives Leinen-Set für heiße Tage.', ru: 'Дышащий льняной комплект для жаркой погоды.' } },
  'keten-pantolon-katli': { ...S('antalya-terzi-keten-pantolon-paca-kisaltma'),
    baslik: { tr: 'Keten pantolon', en: 'Linen trousers', de: 'Leinenhose', ru: 'Льняные брюки' },
    aciklama: { tr: 'Keten kumaşta pantolon; paça ve bel ayarı yapılabilir.', en: 'Trousers in linen fabric; hem and waist can be adjusted.', de: 'Hose aus Leinen; Saum und Bund können angepasst werden.', ru: 'Брюки из льна; длину и талию можно подогнать.' } },
  'erkek-gomlek-atolye': { ...WIDE('antalya-terzi-erkek-gomlek-pantolon-tadilat'),
    baslik: { tr: 'Erkek gömlek ve pantolon', en: "Men's shirt and trousers", de: 'Herrenhemd und Hose', ru: 'Мужская рубашка и брюки' },
    aciklama: { tr: 'Atölye ortamında gömlek ve pantolon; dikim ve tadilat.', en: 'Shirt and trousers in a workshop setting; sewing and alterations.', de: 'Hemd und Hose im Atelier; Nähen und Änderungen.', ru: 'Рубашка и брюки в ателье; пошив и ремонт.' } },
  'kadin-trenckot-atolye': { ...WIDE('antalya-terzi-kadin-trenckot-tadilat'),
    baslik: { tr: 'Kadın trençkot ve tişört', en: "Women's trench coat and T-shirt", de: 'Damen-Trenchcoat und T-Shirt', ru: 'Женский тренч и футболка' },
    aciklama: { tr: 'Askıda hazır giyim ve kumaş topları: model ve ürün birlikte seçilir.', en: 'Ready-to-wear on racks and fabric rolls: model and product are chosen together.', de: 'Konfektion auf Stangen und Stoffrollen: Modell und Produkt wählen wir gemeinsam.', ru: 'Готовая одежда на вешалках и рулоны ткани: модель и изделие выбираем вместе.' } },
  'erkek-palto-atolye': { ...WIDE('antalya-terzi-erkek-palto-tadilati'),
    baslik: { tr: 'Erkek palto', en: "Men's coat", de: 'Herrenmantel', ru: 'Мужское пальто' },
    aciklama: { tr: 'Palto ve mont tadilatı: boy, kol ve beden ayarı.', en: 'Coat and jacket alterations: length, sleeves and fit.', de: 'Mantel- und Jackenänderungen: Länge, Ärmel und Passform.', ru: 'Подгонка пальто и курток: длина, рукава и посадка.' } },
  'sef-mutfak-uniforma': { ...WIDE('antalya-terzi-asci-uniformasi-dikim'),
    baslik: { tr: 'Mutfak personeli üniforması', en: 'Kitchen staff uniform', de: 'Küchenuniform', ru: 'Форма для персонала кухни' },
    aciklama: { tr: 'Aşçı ceketi ve önlük: restoran ve otel mutfakları için.', en: 'Chef jacket and apron: for restaurant and hotel kitchens.', de: 'Kochjacke und Schürze: für Restaurant- und Hotelküchen.', ru: 'Поварской китель и фартук: для кухонь ресторанов и отелей.' } },
  'atolye-kesim-masasi': { ...WIDE('antalya-terzi-dikis-atolyesi-kalip-kesim'),
    baslik: { tr: 'Kesim masası ve kalıplar', en: 'Cutting table and patterns', de: 'Zuschneidetisch und Schnitte', ru: 'Раскройный стол и выкройки' },
    aciklama: { tr: 'Kalıp, makas ve kumaşla hazırlık: üretimin ilk adımı.', en: 'Preparing with patterns, scissors and fabric: the first step of production.', de: 'Vorbereitung mit Schnitt, Schere und Stoff: der erste Produktionsschritt.', ru: 'Подготовка с выкройками, ножницами и тканью: первый этап производства.' } },
  'abiye-elbise-atolye': { ...WIDE('antalya-terzi-abiye-elbise-dikim-tadilat'),
    baslik: { tr: 'Omuzu açık abiye elbise', en: 'Off-shoulder evening dress', de: 'Schulterfreies Abendkleid', ru: 'Вечернее платье с открытыми плечами' },
    aciklama: { tr: 'Özel gün elbiseleri için ölçü, prova ve dikim.', en: 'Measuring, fittings and sewing for special-occasion dresses.', de: 'Maßnehmen, Anproben und Nähen für festliche Kleider.', ru: 'Мерки, примерки и пошив для праздничных платьев.' } },
  'abiye-askida': { ...S('antalya-terzi-abiye-tamiri-tadilati'),
    baslik: { tr: 'Boncuk işlemeli abiye', en: 'Beaded evening gown', de: 'Perlenbesetztes Abendkleid', ru: 'Вечернее платье с бисером' },
    aciklama: { tr: 'İşlemeli ve tüllü abiyelerde boy, bel ve bedende hassas tadilat.', en: 'Careful alterations of length, waist and fit on beaded and tulle gowns.', de: 'Sorgfältige Änderungen von Länge, Taille und Passform bei Perlen- und Tüllkleidern.', ru: 'Аккуратная подгонка длины, талии и посадки на платьях с бисером и фатином.' } },
  'erkek-takim-olcu': { ...WIDE('antalya-terzi-takim-elbise-olcu-prova'),
    baslik: { tr: 'Erkek takım elbise ölçüsü', en: "Men's suit measurement", de: 'Maßnehmen für Herrenanzug', ru: 'Мерки для мужского костюма' },
    aciklama: { tr: 'Takım elbisede ölçü alma ve prova.', en: 'Taking measurements and fitting for a suit.', de: 'Maßnehmen und Anprobe beim Anzug.', ru: 'Снятие мерок и примерка костюма.' } },
  'manken-palto-takim': { ...S('antalya-terzi-palto-ceket-ozel-dikim'),
    baslik: { tr: 'Mankende palto ve takım', en: 'Coats and suit on mannequins', de: 'Mäntel und Anzug auf Schneiderpuppen', ru: 'Пальто и костюм на манекенах' },
    aciklama: { tr: 'Mankende prova: model, kumaş ve dikiş birlikte görülür.', en: 'Mannequin fittings: model, fabric and stitching seen together.', de: 'Anprobe an der Puppe: Modell, Stoff und Naht im Blick.', ru: 'Примерка на манекене: модель, ткань и строчка перед глазами.' } },
  'manken-bej-ceket': { ...S('antalya-terzi-kadin-ceket-dikimi'),
    baslik: { tr: 'Bej ceket ve pantolon takımı', en: 'Beige jacket and trouser suit', de: 'Beiger Blazer mit Hose', ru: 'Бежевый жакет и брюки' },
    aciklama: { tr: 'Kadın ceket-pantolon takımı; hazır giyim ve özel dikim.', en: "Women's jacket-and-trouser suit; ready-to-wear and custom.", de: 'Damen-Hosenanzug; Konfektion und Maßanfertigung.', ru: 'Женский брючный костюм; готовая одежда и пошив на заказ.' } },
  'pilili-etek': { ...S('antalya-terzi-pliseli-etek-kisaltma'),
    baslik: { tr: 'Pilili etek', en: 'Pleated skirt', de: 'Plisseerock', ru: 'Плиссированная юбка' },
    aciklama: { tr: 'Etek boyu kısaltma ve bel ayarı.', en: 'Skirt hemming and waist adjustment.', de: 'Rock kürzen und Bund anpassen.', ru: 'Укорачивание юбки и подгонка по талии.' } },
  'beyaz-gomlek-katli': { ...S('antalya-terzi-gomlek-daraltma-kisaltma'),
    baslik: { tr: 'Gömlek tadilatı', en: 'Shirt alterations', de: 'Hemdenänderung', ru: 'Ремонт рубашек' },
    aciklama: { tr: 'Gömlekte kol boyu, yan daraltma ve yıpranan yaka onarımı.', en: 'Sleeve length, side taking-in and collar repair for shirts.', de: 'Ärmellänge, seitliches Enger-Machen und Kragenreparatur bei Hemden.', ru: 'Длина рукава, подгонка по бокам и ремонт воротника.' } },
  'sweatshirt-katli': { ...S('antalya-terzi-sweatshirt-tamir-tadilat'),
    baslik: { tr: 'Sweatshirt', en: 'Sweatshirt', de: 'Sweatshirt', ru: 'Свитшот' },
    aciklama: { tr: 'Ekip ve etkinlik giyimi için sweatshirt; logo baskısıyla.', en: 'Sweatshirts for teams and events; with logo printing.', de: 'Sweatshirts für Teams und Events; mit Logodruck.', ru: 'Свитшоты для команд и мероприятий; с печатью логотипа.' } },
  'yun-pantolon-metre': { ...S('antalya-terzi-kumas-pantolon-tadilat'),
    baslik: { tr: 'Pantolon ve mezura', en: 'Trousers and measuring tape', de: 'Hose und Maßband', ru: 'Брюки и сантиметр' },
    aciklama: { tr: 'Paça kısaltmada boy ölçüyle belirlenir.', en: 'The length for hemming is set by measuring.', de: 'Die Länge beim Kürzen wird durch Messen festgelegt.', ru: 'Длину при подшиве определяют по замерам.' } },
  'palto-yaka-detay': { ...S('antalya-terzi-palto-ceket-tamiri'),
    baslik: { tr: 'Palto yakası ve dikiş detayı', en: 'Coat lapel and stitching detail', de: 'Mantelrevers und Nahtdetail', ru: 'Лацкан пальто и детали строчки' },
    aciklama: { tr: 'Yün palto ve ceketlerde yaka ve kol onarımı.', en: 'Lapel and sleeve repair on wool coats and jackets.', de: 'Reparatur von Revers und Ärmel bei Woll­mänteln und Jacken.', ru: 'Ремонт лацканов и рукавов шерстяных пальто и пиджаков.' } },
  'polar-yelek': { ...S('antalya-terzi-yelek-tamiri-fermuar'),
    baslik: { tr: 'Polar yelek', en: 'Fleece vest', de: 'Fleeceweste', ru: 'Флисовый жилет' },
    aciklama: { tr: 'Fermuarlı polar yelek; ekip giyimi için logolu üretim yapılır.', en: 'Zippered fleece vest; made with a logo for team wear.', de: 'Fleeceweste mit Reißverschluss; für Teamkleidung mit Logo.', ru: 'Флисовый жилет на молнии; для командной одежды — с логотипом.' } },
  'eve-gelen-terzi': { ...S('antalya-eve-otele-gelen-terzi'),
    baslik: { tr: 'Eve ve otele gelen terzi', en: 'Tailor visiting your home or hotel', de: 'Schneider kommt zu Ihnen nach Hause oder ins Hotel', ru: 'Портной приезжает домой или в отель' },
    aciklama: { tr: 'Ölçü ve prova için adresinize gelen terzi hizmeti.', en: 'A tailor who comes to your address for measuring and fittings.', de: 'Ein Schneider, der zum Maßnehmen und zur Anprobe zu Ihnen kommt.', ru: 'Портной приезжает по вашему адресу для мерок и примерки.' } },
  'bez-canta-atolye': { ...S('antalya-baskili-bez-canta-uretim'),
    baslik: { tr: 'Bez çanta', en: 'Tote bags', de: 'Stofftaschen', ru: 'Тканевые сумки' },
    aciklama: { tr: 'Logolu baskılı bez çanta imalatı: fuar ve organizasyonlar için.', en: 'Printed tote bags with your logo: for fairs and events.', de: 'Stofftaschen mit Logodruck: für Messen und Events.', ru: 'Тканевые сумки с логотипом: для выставок и мероприятий.' } },
  'hazir-giyim-atolye': { ...S('antalya-tekstil-tisort-seri-uretim'),
    baslik: { tr: 'Tişört', en: 'T-shirts', de: 'T-Shirts', ru: 'Футболки' },
    aciklama: { tr: 'Logonuzla ya da kendi tasarımınızla baskılı tişört.', en: 'T-shirts printed with your logo or your own design.', de: 'T-Shirts mit Ihrem Logo oder eigenem Design.', ru: 'Футболки с вашим логотипом или дизайном.' } },
  'uniforma': { ...S('antalya-uniforma-dikim-uretim'),
    baslik: { tr: 'Uniforma', en: 'Uniforms', de: 'Uniformen', ru: 'Униформа' },
    aciklama: { tr: 'İstediğiniz model ve baskıyla uniforma.', en: 'Uniforms in the model and print you want.', de: 'Uniformen in gewünschtem Modell und Druck.', ru: 'Униформа в нужной модели и с нужной печатью.' } },
} satisfies Record<string, OrnekGorsel>;

export type GorselAnahtar = keyof typeof GORSELLER;
