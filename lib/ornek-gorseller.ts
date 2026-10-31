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
export const ORNEK_BASLIK: LA = { tr: 'Örnek görseller', en: 'Sample images', de: 'Beispielbilder', ru: 'Примеры изображений',
  es: 'Imágenes de ejemplo', fr: 'Exemples d’images', pl: 'Przykładowe obrazy', uk: 'Приклади зображень', nl: 'Voorbeeldafbeeldingen', ar: 'صور توضيحية' };
export const ORNEK_NOT: LA = {
  tr: 'Bu görseller yapay zekâ ile üretilmiş örneklerdir; gerçek iş veya müşteri fotoğrafı değildir.',
  en: 'These are AI-generated illustrations, not photos of real work or customers.',
  de: 'Diese Bilder sind KI-generierte Beispiele, keine Fotos echter Arbeiten oder Kunden.',
  ru: 'Это изображения, созданные ИИ, а не фотографии реальных работ или клиентов.',
  es: 'Estas imágenes están generadas por IA; no son fotos de trabajos o clientes reales.',
  fr: 'Ces images sont générées par IA ; ce ne sont pas des photos de vrais travaux ou clients.',
  pl: 'Są to obrazy wygenerowane przez AI, a nie zdjęcia prawdziwych prac ani klientów.',
  uk: 'Це зображення, створені ШІ, а не фотографії реальних робіт чи клієнтів.',
  nl: "Dit zijn door AI gegenereerde afbeeldingen, geen foto's van echt werk of klanten.",
  ar: 'هذه صور مُنشأة بالذكاء الاصطناعي وليست صورًا لأعمال أو عملاء حقيقيين.',
};

export const GORSELLER = {
  'keten-kadin-evde': { ...WIDE('keten-kadin-evde'),
    baslik: { tr: 'Kadın keten gömlek ve pantolon', en: "Women's linen shirt and trousers", de: 'Damen-Leinenhemd und -hose', ru: 'Женская льняная рубашка и брюки' },
    aciklama: { tr: 'Rahat kesim keten takım; özel dikimde ölçünüze göre hazırlanır.', en: 'A relaxed-fit linen set; made to your measurements when custom tailored.', de: 'Ein bequemes Leinen-Set; als Maßanfertigung nach Ihren Maßen.', ru: 'Свободный льняной комплект; при индивидуальном пошиве — по вашим меркам.' } },
  'keten-blazer-atolye': { ...WIDE('keten-blazer-atolye'),
    baslik: { tr: 'Keten blazer ve pantolon', en: 'Linen blazer and trousers', de: 'Leinenblazer und Hose', ru: 'Льняной блейзер и брюки' },
    aciklama: { tr: 'Atölyede kalıp, kumaş ve makine; ceket ve pantolon özel dikim.', en: 'Patterns, fabric and machines in the workshop; jacket and trousers made to order.', de: 'Schnitte, Stoffe und Maschinen im Atelier; Jacke und Hose nach Maß.', ru: 'Выкройки, ткани и машины в ателье; пиджак и брюки на заказ.' } },
  'keten-erkek-gomlek': { ...WIDE('keten-erkek-gomlek'),
    baslik: { tr: 'Erkek keten gömlek ve pantolon', en: "Men's linen shirt and trousers", de: 'Herren-Leinenhemd und -hose', ru: 'Мужская льняная рубашка и брюки' },
    aciklama: { tr: 'Sıcak havalar için nefes alan keten takım.', en: 'A breathable linen set for hot weather.', de: 'Ein atmungsaktives Leinen-Set für heiße Tage.', ru: 'Дышащий льняной комплект для жаркой погоды.' } },
  'keten-pantolon-katli': { ...S('keten-pantolon-katli'),
    baslik: { tr: 'Keten pantolon', en: 'Linen trousers', de: 'Leinenhose', ru: 'Льняные брюки' },
    aciklama: { tr: 'Keten kumaşta pantolon; paça ve bel ayarı yapılabilir.', en: 'Trousers in linen fabric; hem and waist can be adjusted.', de: 'Hose aus Leinen; Saum und Bund können angepasst werden.', ru: 'Брюки из льна; длину и талию можно подогнать.' } },
  'erkek-gomlek-atolye': { ...WIDE('erkek-gomlek-atolye'),
    baslik: { tr: 'Erkek gömlek ve pantolon', en: "Men's shirt and trousers", de: 'Herrenhemd und Hose', ru: 'Мужская рубашка и брюки' },
    aciklama: { tr: 'Atölye ortamında gömlek ve pantolon; dikim ve tadilat.', en: 'Shirt and trousers in a workshop setting; sewing and alterations.', de: 'Hemd und Hose im Atelier; Nähen und Änderungen.', ru: 'Рубашка и брюки в ателье; пошив и ремонт.' } },
  'kadin-trenckot-atolye': { ...WIDE('kadin-trenckot-atolye'),
    baslik: { tr: 'Kadın trençkot ve tişört', en: "Women's trench coat and T-shirt", de: 'Damen-Trenchcoat und T-Shirt', ru: 'Женский тренч и футболка' },
    aciklama: { tr: 'Askıda hazır giyim ve kumaş topları: model ve ürün birlikte seçilir.', en: 'Ready-to-wear on racks and fabric rolls: model and product are chosen together.', de: 'Konfektion auf Stangen und Stoffrollen: Modell und Produkt wählen wir gemeinsam.', ru: 'Готовая одежда на вешалках и рулоны ткани: модель и изделие выбираем вместе.' } },
  'erkek-palto-atolye': { ...WIDE('erkek-palto-atolye'),
    baslik: { tr: 'Erkek palto', en: "Men's coat", de: 'Herrenmantel', ru: 'Мужское пальто' },
    aciklama: { tr: 'Palto ve mont tadilatı: boy, kol ve beden ayarı.', en: 'Coat and jacket alterations: length, sleeves and fit.', de: 'Mantel- und Jackenänderungen: Länge, Ärmel und Passform.', ru: 'Подгонка пальто и курток: длина, рукава и посадка.' } },
  'sef-mutfak-uniforma': { ...WIDE('sef-mutfak-uniforma'),
    baslik: { tr: 'Mutfak personeli üniforması', en: 'Kitchen staff uniform', de: 'Küchenuniform', ru: 'Форма для персонала кухни' },
    aciklama: { tr: 'Aşçı ceketi ve önlük: restoran ve otel mutfakları için.', en: 'Chef jacket and apron: for restaurant and hotel kitchens.', de: 'Kochjacke und Schürze: für Restaurant- und Hotelküchen.', ru: 'Поварской китель и фартук: для кухонь ресторанов и отелей.' } },
  'atolye-kesim-masasi': { ...WIDE('atolye-kesim-masasi'),
    baslik: { tr: 'Kesim masası ve kalıplar', en: 'Cutting table and patterns', de: 'Zuschneidetisch und Schnitte', ru: 'Раскройный стол и выкройки' },
    aciklama: { tr: 'Kalıp, makas ve kumaşla hazırlık: üretimin ilk adımı.', en: 'Preparing with patterns, scissors and fabric: the first step of production.', de: 'Vorbereitung mit Schnitt, Schere und Stoff: der erste Produktionsschritt.', ru: 'Подготовка с выкройками, ножницами и тканью: первый этап производства.' } },
  'abiye-elbise-atolye': { ...WIDE('abiye-elbise-atolye'),
    baslik: { tr: 'Omuzu açık abiye elbise', en: 'Off-shoulder evening dress', de: 'Schulterfreies Abendkleid', ru: 'Вечернее платье с открытыми плечами' },
    aciklama: { tr: 'Özel gün elbiseleri için ölçü, prova ve dikim.', en: 'Measuring, fittings and sewing for special-occasion dresses.', de: 'Maßnehmen, Anproben und Nähen für festliche Kleider.', ru: 'Мерки, примерки и пошив для праздничных платьев.' } },
  'abiye-askida': { ...S('abiye-askida'),
    baslik: { tr: 'Boncuk işlemeli abiye', en: 'Beaded evening gown', de: 'Perlenbesetztes Abendkleid', ru: 'Вечернее платье с бисером' },
    aciklama: { tr: 'İşlemeli ve tüllü abiyelerde boy, bel ve bedende hassas tadilat.', en: 'Careful alterations of length, waist and fit on beaded and tulle gowns.', de: 'Sorgfältige Änderungen von Länge, Taille und Passform bei Perlen- und Tüllkleidern.', ru: 'Аккуратная подгонка длины, талии и посадки на платьях с бисером и фатином.' } },
  'erkek-takim-olcu': { ...WIDE('erkek-takim-olcu'),
    baslik: { tr: 'Erkek takım elbise ölçüsü', en: "Men's suit measurement", de: 'Maßnehmen für Herrenanzug', ru: 'Мерки для мужского костюма' },
    aciklama: { tr: 'Takım elbisede ölçü alma ve prova.', en: 'Taking measurements and fitting for a suit.', de: 'Maßnehmen und Anprobe beim Anzug.', ru: 'Снятие мерок и примерка костюма.' } },
  'manken-palto-takim': { ...S('manken-palto-takim'),
    baslik: { tr: 'Mankende palto ve takım', en: 'Coats and suit on mannequins', de: 'Mäntel und Anzug auf Schneiderpuppen', ru: 'Пальто и костюм на манекенах' },
    aciklama: { tr: 'Mankende prova: model, kumaş ve dikiş birlikte görülür.', en: 'Mannequin fittings: model, fabric and stitching seen together.', de: 'Anprobe an der Puppe: Modell, Stoff und Naht im Blick.', ru: 'Примерка на манекене: модель, ткань и строчка перед глазами.' } },
  'manken-bej-ceket': { ...S('manken-bej-ceket'),
    baslik: { tr: 'Bej ceket ve pantolon takımı', en: 'Beige jacket and trouser suit', de: 'Beiger Blazer mit Hose', ru: 'Бежевый жакет и брюки' },
    aciklama: { tr: 'Kadın ceket-pantolon takımı; hazır giyim ve özel dikim.', en: "Women's jacket-and-trouser suit; ready-to-wear and custom.", de: 'Damen-Hosenanzug; Konfektion und Maßanfertigung.', ru: 'Женский брючный костюм; готовая одежда и пошив на заказ.' } },
  'pilili-etek': { ...S('pilili-etek'),
    baslik: { tr: 'Pilili etek', en: 'Pleated skirt', de: 'Plisseerock', ru: 'Плиссированная юбка' },
    aciklama: { tr: 'Etek boyu kısaltma ve bel ayarı.', en: 'Skirt hemming and waist adjustment.', de: 'Rock kürzen und Bund anpassen.', ru: 'Укорачивание юбки и подгонка по талии.' } },
  'beyaz-gomlek-katli': { ...S('beyaz-gomlek-katli'),
    baslik: { tr: 'Gömlek tadilatı', en: 'Shirt alterations', de: 'Hemdenänderung', ru: 'Ремонт рубашек' },
    aciklama: { tr: 'Gömlekte kol boyu, yan daraltma ve yıpranan yaka onarımı.', en: 'Sleeve length, side taking-in and collar repair for shirts.', de: 'Ärmellänge, seitliches Enger-Machen und Kragenreparatur bei Hemden.', ru: 'Длина рукава, подгонка по бокам и ремонт воротника.' } },
  'sweatshirt-katli': { ...S('sweatshirt-katli'),
    baslik: { tr: 'Sweatshirt', en: 'Sweatshirt', de: 'Sweatshirt', ru: 'Свитшот' },
    aciklama: { tr: 'Ekip ve etkinlik giyimi için sweatshirt; logo baskısıyla.', en: 'Sweatshirts for teams and events; with logo printing.', de: 'Sweatshirts für Teams und Events; mit Logodruck.', ru: 'Свитшоты для команд и мероприятий; с печатью логотипа.' } },
  'yun-pantolon-metre': { ...S('yun-pantolon-metre'),
    baslik: { tr: 'Pantolon ve mezura', en: 'Trousers and measuring tape', de: 'Hose und Maßband', ru: 'Брюки и сантиметр' },
    aciklama: { tr: 'Paça kısaltmada boy ölçüyle belirlenir.', en: 'The length for hemming is set by measuring.', de: 'Die Länge beim Kürzen wird durch Messen festgelegt.', ru: 'Длину при подшиве определяют по замерам.' } },
  'palto-yaka-detay': { ...S('palto-yaka-detay'),
    baslik: { tr: 'Palto yakası ve dikiş detayı', en: 'Coat lapel and stitching detail', de: 'Mantelrevers und Nahtdetail', ru: 'Лацкан пальто и детали строчки' },
    aciklama: { tr: 'Yün palto ve ceketlerde yaka, kol ve astar onarımı.', en: 'Lapel, sleeve and lining repair on wool coats and jackets.', de: 'Reparatur von Revers, Ärmel und Futter bei Woll­mänteln und Jacken.', ru: 'Ремонт лацканов, рукавов и подкладки шерстяных пальто и пиджаков.' } },
  'polar-yelek': { ...S('polar-yelek'),
    baslik: { tr: 'Polar yelek', en: 'Fleece vest', de: 'Fleeceweste', ru: 'Флисовый жилет' },
    aciklama: { tr: 'Fermuarlı polar yelek; ekip giyimi için logolu üretim yapılır.', en: 'Zippered fleece vest; made with a logo for team wear.', de: 'Fleeceweste mit Reißverschluss; für Teamkleidung mit Logo.', ru: 'Флисовый жилет на молнии; для командной одежды — с логотипом.' } },
  'eve-gelen-terzi': { ...S('eve-gelen-terzi'),
    baslik: { tr: 'Eve ve otele gelen terzi', en: 'Tailor visiting your home or hotel', de: 'Schneider kommt zu Ihnen nach Hause oder ins Hotel', ru: 'Портной приезжает домой или в отель' },
    aciklama: { tr: 'Ölçü ve prova için adresinize gelen terzi hizmeti.', en: 'A tailor who comes to your address for measuring and fittings.', de: 'Ein Schneider, der zum Maßnehmen und zur Anprobe zu Ihnen kommt.', ru: 'Портной приезжает по вашему адресу для мерок и примерки.' } },
  'kuru-temizleme-utu': { ...S('kuru-temizleme-utu'),
    baslik: { tr: 'Kuru temizleme ve ütü', en: 'Dry cleaning and ironing', de: 'Reinigung und Bügeln', ru: 'Химчистка и глажка' },
    aciklama: { tr: 'Kuru temizleme, buharlı ütü ve pres hizmeti.', en: 'Dry cleaning, steam ironing and pressing.', de: 'Reinigung, Dampfbügeln und Pressen.', ru: 'Химчистка, отпаривание и глажка.' } },
  'bez-canta-atolye': { ...S('bez-canta-atolye'),
    baslik: { tr: 'Bez çanta', en: 'Tote bags', de: 'Stofftaschen', ru: 'Тканевые сумки' },
    aciklama: { tr: 'Logolu baskılı bez çanta imalatı: fuar ve organizasyonlar için.', en: 'Printed tote bags with your logo: for fairs and events.', de: 'Stofftaschen mit Logodruck: für Messen und Events.', ru: 'Тканевые сумки с логотипом: для выставок и мероприятий.' } },
  'hazir-giyim-atolye': { ...S('hazir-giyim-atolye'),
    baslik: { tr: 'Tişört', en: 'T-shirts', de: 'T-Shirts', ru: 'Футболки' },
    aciklama: { tr: 'Logonuzla ya da kendi tasarımınızla baskılı tişört.', en: 'T-shirts printed with your logo or your own design.', de: 'T-Shirts mit Ihrem Logo oder eigenem Design.', ru: 'Футболки с вашим логотипом или дизайном.' } },
  'uniforma': { ...S('uniforma'),
    baslik: { tr: 'Uniforma', en: 'Uniforms', de: 'Uniformen', ru: 'Униформа' },
    aciklama: { tr: 'İstediğiniz model ve baskıyla uniforma.', en: 'Uniforms in the model and print you want.', de: 'Uniformen in gewünschtem Modell und Druck.', ru: 'Униформа в нужной модели и с нужной печатью.' } },
} satisfies Record<string, OrnekGorsel>;

export type GorselAnahtar = keyof typeof GORSELLER;
