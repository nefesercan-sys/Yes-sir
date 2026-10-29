// ============================================================
// swaphubs.com — lib/intl-zones.ts
// Ek turist dilleri (ES/FR/PL/UK/NL/AR) için otel bölgesi derinlik sayfaları: /{dil}/{bölge-slug} (rehber sayfasının /{dil}/{rehber-slug} altındaki bölge derinliği).
// Bölgeler: işletme sahibinin onayladığı Belek, Lara, Güzeloba, Side, Kemer + atölyenin bulunduğu Konyaaltı.
// Veri: otel adları ve bölge tanımı lib/otel-bolgeleri.ts'ten; mesafe/dakika YAZILMAZ (sitenin kuralı).
// Ücretsiz alım-teslim yalnızca Konyaaltı; diğer bölgelerde koşullar WhatsApp'tan teyit edilir.
// ============================================================
import { OTEL_BOLGELERI } from '@/lib/otel-bolgeleri';
import { ILANGS, type ILang } from '@/lib/intl';

export const ZONE_SLUGS = ['belek', 'lara', 'guzeloba', 'side', 'kemer', 'konyaalti'] as const;
export type ZoneSlug = (typeof ZONE_SLUGS)[number];
export const isZone = (s: string): s is ZoneSlug => (ZONE_SLUGS as readonly string[]).includes(s);

const PREFIX: Record<ILang, string> = {
  es: 'sastre-hoteles', fr: 'couturier-hotels', pl: 'krawiec-hotele', uk: 'kravets-hoteli', nl: 'kleermaker-hotels', ar: 'khayyat-fanadiq',
};
export const zoneSlug = (l: ILang, z: ZoneSlug) => `${PREFIX[l]}-${z}`;
export const zoneUrl = (l: ILang, z: ZoneSlug) => `/${l}/${zoneSlug(l, z)}`;
export const parseZone = (l: ILang, slug: string): ZoneSlug | undefined => ZONE_SLUGS.find((z) => zoneSlug(l, z) === slug);

/** Mevcut TR/EN/RU/DE otel bölgesi sayfalarının hreflang'ına eklenecek yeni dil karşılıkları. */
export const zoneAlt = (z: string): Record<string, string> =>
  isZone(z) ? Object.fromEntries(ILANGS.map((l) => [l, `https://swaphubs.com${zoneUrl(l, z)}`])) : {};

const NAMES: Record<ILang, Record<ZoneSlug, string>> = {
  es: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer', konyaalti: 'Konyaaltı' },
  fr: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer', konyaalti: 'Konyaaltı' },
  pl: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer', konyaalti: 'Konyaaltı' },
  nl: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer', konyaalti: 'Konyaaltı' },
  uk: { belek: 'Белек', lara: 'Лара', guzeloba: 'Гюзельоба', side: 'Сіде', kemer: 'Кемер', konyaalti: 'Коньяалти' },
  ar: { belek: 'بيليك', lara: 'لارا', guzeloba: 'غوزيلوبا', side: 'سيدي', kemer: 'كيمر', konyaalti: 'كونيالتي' },
};

const BLURB: Record<ILang, Record<ZoneSlug, string>> = {
  es: {
    belek: 'Belek es la zona vacacional de Antalya conocida por sus campos de golf y sus resorts de 5 estrellas.',
    lara: 'Lara está cerca del centro de la ciudad, con una larga playa de arena y hoteles alineados a lo largo de la costa.',
    guzeloba: 'Güzeloba está en el lado este de Lara: un tramo de hoteles frente al mar más tranquilo que el centro.',
    side: 'Side es un pueblo vacacional histórico cerca de Manavgat, con ruinas antiguas y muchos hoteles de playa uno junto a otro.',
    kemer: 'Kemer es una localidad costera donde los montes Tauro caen hacia el mar, conocida por su puerto deportivo y sus resorts.',
    konyaalti: 'Konyaaltı, donde está nuestro propio taller, reúne hoteles y apartahoteles a lo largo de siete kilómetros de costa.',
  },
  fr: {
    belek: 'Belek est la zone de vacances d\'Antalya connue pour ses terrains de golf et ses complexes hôteliers 5 étoiles.',
    lara: 'Lara est proche du centre-ville, avec une longue plage de sable et des hôtels alignés le long de la côte.',
    guzeloba: 'Güzeloba se trouve du côté est de Lara : une portion d\'hôtels en bord de mer plus calme que le centre.',
    side: 'Side est une station balnéaire historique près de Manavgat, où des ruines antiques côtoient de nombreux hôtels de plage.',
    kemer: 'Kemer est une ville côtière où les monts Taurus plongent dans la mer, connue pour sa marina et ses complexes hôteliers.',
    konyaalti: 'Konyaaltı, où se trouve notre atelier, accueille hôtels et appart-hôtels le long de sept kilomètres de côte.',
  },
  pl: {
    belek: 'Belek to wakacyjny rejon Antalyi znany z pól golfowych i pięciogwiazdkowych kompleksów hotelowych.',
    lara: 'Lara leży blisko centrum miasta, z długą piaszczystą plażą i hotelami ułożonymi wzdłuż wybrzeża.',
    guzeloba: 'Güzeloba leży po wschodniej stronie Lary: spokojniejszy niż centrum pas hoteli nad morzem.',
    side: 'Side to historyczna miejscowość wypoczynkowa niedaleko Manavgat, gdzie starożytne ruiny sąsiadują z wieloma hotelami plażowymi.',
    kemer: 'Kemer to nadmorskie miasteczko, w którym góry Taurus opadają do morza, znane z mariny i kompleksów hotelowych.',
    konyaalti: 'Konyaaltı, gdzie mieści się nasza pracownia, to hotele i aparthotele ułożone wzdłuż siedmiu kilometrów wybrzeża.',
  },
  uk: {
    belek: 'Белек це курортна зона Анталії, відома гольф-полями та 5-зірковими готелями.',
    lara: 'Лара розташована поруч із центром міста: довгий піщаний пляж і готелі вздовж узбережжя.',
    guzeloba: 'Гюзельоба лежить у східній частині Лари: тихіша, ніж центр, смуга готелів біля моря.',
    side: 'Сіде це історичне курортне містечко поблизу Манавгата, де античні руїни сусідять із багатьма пляжними готелями.',
    kemer: 'Кемер це приморське містечко, де гори Тавр спускаються до моря, відоме мариною та курортними готелями.',
    konyaalti: 'Коньяалти, де розташоване наше ательє, це готелі й апарт-готелі вздовж семи кілометрів узбережжя.',
  },
  nl: {
    belek: 'Belek is het vakantiegebied van Antalya, bekend om zijn golfbanen en 5-sterrenresorts.',
    lara: 'Lara ligt dicht bij het stadscentrum, met een lang zandstrand en hotels langs de kust.',
    guzeloba: 'Güzeloba ligt aan de oostkant van Lara: een rustiger strook strandhotels dan het centrum.',
    side: 'Side is een historisch vakantiestadje bij Manavgat, waar oude ruïnes en veel strandhotels naast elkaar liggen.',
    kemer: 'Kemer is een kustplaats waar het Taurusgebergte tot aan het water afdaalt, bekend om zijn jachthaven en resorts.',
    konyaalti: 'Konyaaltı, waar ons eigen atelier staat, telt hotels en aparthotels langs zeven kilometer kustlijn.',
  },
  ar: {
    belek: 'بيليك منطقة عطلات في أنطاليا تُعرف بملاعب الغولف ومنتجعاتها من فئة 5 نجوم.',
    lara: 'تقع لارا قرب وسط المدينة، وفيها شاطئ رملي طويل وفنادق متراصّة على امتداد الساحل.',
    guzeloba: 'تقع غوزيلوبا في الجانب الشرقي من لارا، وهي شريط من فنادق الواجهة البحرية أكثر هدوءاً من الوسط.',
    side: 'سيدي بلدة سياحية تاريخية قرب مانافغات، حيث تجاور الآثار القديمة كثيراً من فنادق الشاطئ.',
    kemer: 'كيمر بلدة ساحلية تنحدر فيها جبال طوروس نحو البحر، وتُعرف بمرساها السياحي ومنتجعاتها.',
    konyaalti: 'كونيالتي، حيث تقع ورشتنا، تضم فنادق وشققاً فندقية على امتداد سبعة كيلومترات من الساحل.',
  },
};

export type ZCopy = {
  title: (z: string) => string; desc: (z: string) => string; h1: (z: string) => string; lead: (z: string) => string;
  aboutTitle: (z: string) => string; hotelsLabel: string;
  howTitle: string; how: (z: string, home: boolean) => string;
  faqTitle: string; faq: (z: string, home: boolean) => [string, string][];
  back: string; zonesLabel: string; wa: (z: string) => string; cta: string;
};

export const ZCOPY: Record<ILang, ZCopy> = {
  es: {
    title: (z) => `Sastre para hoteles en ${z}: arreglos de ropa`,
    desc: (z) => `Arreglos de ropa para huéspedes de hoteles en ${z}, Antalya. Recogida en el hotel, abierto todos los días 08:00–23:00. Precio por WhatsApp.`,
    h1: (z) => `Sastre para hoteles en ${z}`, lead: (z) => `Si se aloja en ${z}, le recogemos la prenda en el hotel y se la devolvemos arreglada. Envíe una foto por WhatsApp y le decimos precio y plazo.`,
    aboutTitle: (z) => `Sobre la zona de ${z}`, hotelsLabel: 'Ejemplos de hoteles de la zona',
    howTitle: 'Cómo funciona en su hotel',
    how: (z, home) => home ? `Nuestro taller está en Hurma, Konyaaltı, y la recogida y entrega en hoteles de Konyaaltı es gratuita. Escríbanos con el nombre de su hotel y la fecha de salida.` : `Escríbanos por WhatsApp con el nombre de su hotel en ${z} y su fecha de salida. Confirmamos las condiciones de recogida y entrega para su hotel antes de nada.`,
    faqTitle: 'Preguntas frecuentes',
    faq: (z, home) => [
      [`¿Atienden hoteles en ${z}?`, home ? `Sí. El taller está en Konyaaltı y la recogida en hoteles de la zona es gratuita.` : `Sí, atendemos hoteles en ${z}. Indíquenos el nombre del hotel por WhatsApp y confirmamos las condiciones.`],
      ['¿Cuánto tarda un arreglo?', 'Los arreglos sencillos suelen estar listos en un día y las urgencias con frecuencia en 2–4 horas; el plazo exacto se confirma por WhatsApp.'],
      ['¿Cómo conozco el precio?', 'Envíe por WhatsApp una foto de la prenda y del problema; normalmente indicamos precio y plazo desde la foto.'],
    ],
    back: '← Sastre en Antalya para turistas', zonesLabel: 'Otras zonas hoteleras', wa: (z) => `Hola, estoy alojado en ${z} y necesito un arreglo de ropa. Le envío una foto.`, cta: 'Escribir por WhatsApp',
  },
  fr: {
    title: (z) => `Tailleur pour hôtels à ${z} : retouches`,
    desc: (z) => `Retouches pour les clients d'hôtels à ${z}, Antalya. Collecte à l'hôtel, ouvert tous les jours 08h00–23h00. Prix sur WhatsApp avec photo.`,
    h1: (z) => `Tailleur pour hôtels à ${z}`, lead: (z) => `Si vous séjournez à ${z}, nous récupérons le vêtement à l'hôtel et vous le rapportons retouché. Envoyez une photo sur WhatsApp : prix et délai vous sont indiqués.`,
    aboutTitle: (z) => `À propos de la zone de ${z}`, hotelsLabel: 'Exemples d\'hôtels de la zone',
    howTitle: 'Comment cela se passe à votre hôtel',
    how: (z, home) => home ? `Notre atelier est à Hurma, Konyaaltı, et la collecte et la livraison dans les hôtels de Konyaaltı sont gratuites. Écrivez-nous avec le nom de votre hôtel et votre date de départ.` : `Écrivez-nous sur WhatsApp avec le nom de votre hôtel à ${z} et votre date de départ. Nous confirmons d'abord les conditions de collecte et de livraison pour votre hôtel.`,
    faqTitle: 'Questions fréquentes',
    faq: (z, home) => [
      [`Desservez-vous les hôtels à ${z} ?`, home ? 'Oui. L\'atelier est à Konyaaltı et la collecte dans les hôtels du secteur est gratuite.' : `Oui, nous desservons les hôtels à ${z}. Indiquez-nous le nom de l'hôtel sur WhatsApp et nous confirmons les conditions.`],
      ['Combien de temps dure une retouche ?', 'Les retouches simples sont souvent prêtes en un jour et les urgences souvent en 2 à 4 heures ; le délai exact est confirmé sur WhatsApp.'],
      ['Comment connaître le prix ?', 'Envoyez sur WhatsApp une photo du vêtement et du problème ; nous indiquons en général prix et délai d\'après la photo.'],
    ],
    back: '← Tailleur à Antalya pour touristes', zonesLabel: 'Autres zones hôtelières', wa: (z) => `Bonjour, je séjourne à ${z} et j'ai besoin d'une retouche. Je vous envoie une photo.`, cta: 'Écrire sur WhatsApp',
  },
  pl: {
    title: (z) => `Krawiec dla hoteli w ${z}: przeróbki ubrań`,
    desc: (z) => `Przeróbki ubrań i krawiectwo dla gości hoteli w ${z}, Antalya. Odbiór i dostawa do hotelu, otwarte codziennie 08:00–23:00. Cena na WhatsAppie po zdjęciu.`,
    h1: (z) => `Krawiec dla hoteli w ${z}`, lead: (z) => `Jeśli mieszkasz w ${z}, odbierzemy ubranie z hotelu i oddamy je poprawione. Wyślij zdjęcie na WhatsAppie, a podamy cenę i termin.`,
    aboutTitle: (z) => `O rejonie ${z}`, hotelsLabel: 'Przykładowe hotele w okolicy',
    howTitle: 'Jak to wygląda w Twoim hotelu',
    how: (z, home) => home ? `Nasza pracownia jest w Hurma w Konyaaltı, a odbiór i dostawa do hoteli w Konyaaltı są bezpłatne. Napisz do nas z nazwą hotelu i datą wyjazdu.` : `Napisz na WhatsAppie z nazwą hotelu w ${z} i datą wyjazdu. Najpierw potwierdzimy warunki odbioru i dostawy dla Twojego hotelu.`,
    faqTitle: 'Najczęstsze pytania',
    faq: (z, home) => [
      [`Czy obsługujecie hotele w ${z}?`, home ? 'Tak. Pracownia jest w Konyaaltı, a odbiór z hoteli w tej okolicy jest bezpłatny.' : `Tak, obsługujemy hotele w ${z}. Podaj nazwę hotelu na WhatsAppie, a potwierdzimy warunki.`],
      ['Ile trwa przeróbka?', 'Proste przeróbki są zwykle gotowe w jeden dzień, pilne często w 2–4 godziny; dokładny termin potwierdzamy na WhatsAppie.'],
      ['Jak poznać cenę?', 'Wyślij na WhatsAppie zdjęcie ubrania i problemu; zwykle podajemy cenę i termin na podstawie zdjęcia.'],
    ],
    back: '← Krawiec w Antalyi dla turystów', zonesLabel: 'Inne rejony hotelowe', wa: (z) => `Dzień dobry, mieszkam w ${z} i potrzebuję przeróbki ubrania. Wysyłam zdjęcie.`, cta: 'Napisz na WhatsAppie',
  },
  uk: {
    title: (z) => `Кравець для готелів: ${z}, підгонка одягу`,
    desc: (z) => `Підгонка одягу та пошиття для гостей готелів: ${z}, Анталія. Забір і доставка до готелю, щодня 08:00–23:00. Ціна у WhatsApp за фото.`,
    h1: (z) => `Кравець для готелів: ${z}`, lead: (z) => `Якщо ви зупинилися в районі ${z}, ми заберемо річ у готелі й повернемо підігнаною. Надішліть фото у WhatsApp, і ми назвемо ціну та строк.`,
    aboutTitle: (z) => `Про район: ${z}`, hotelsLabel: 'Приклади готелів у районі',
    howTitle: 'Як це відбувається у вашому готелі',
    how: (z, home) => home ? `Наше ательє в районі Хурма, Коньяалти, а забір і доставка до готелів Коньяалти безкоштовні. Напишіть нам з назвою готелю та датою виїзду.` : `Напишіть у WhatsApp з назвою вашого готелю (${z}) і датою виїзду. Спершу ми підтвердимо умови забору та доставки для вашого готелю.`,
    faqTitle: 'Часті запитання',
    faq: (z, home) => [
      [`Чи обслуговуєте ви готелі в районі ${z}?`, home ? 'Так. Ательє у Коньяалти, а забір із готелів району безкоштовний.' : `Так, ми обслуговуємо готелі в районі ${z}. Вкажіть назву готелю у WhatsApp, і ми підтвердимо умови.`],
      ['Скільки триває підгонка?', 'Прості роботи зазвичай готові за день, термінові часто за 2–4 години; точний строк підтверджуємо у WhatsApp.'],
      ['Як дізнатися ціну?', 'Надішліть у WhatsApp фото речі та проблеми; зазвичай ми називаємо ціну та строк за фото.'],
    ],
    back: '← Кравець в Анталії для туристів', zonesLabel: 'Інші готельні зони', wa: (z) => `Добрий день, я зупинився в районі ${z} і потребую підгонки одягу. Надсилаю фото.`, cta: 'Написати у WhatsApp',
  },
  nl: {
    title: (z) => `Kleermaker voor hotels in ${z}: vermaken`,
    desc: (z) => `Kleding vermaken voor hotelgasten in ${z}, Antalya. Ophalen bij het hotel, dagelijks open 08:00–23:00. Prijs via WhatsApp met foto.`,
    h1: (z) => `Kleermaker voor hotels in ${z}`, lead: (z) => `Verblijft u in ${z}? Dan halen wij het kledingstuk op bij uw hotel en brengen het aangepast terug. Stuur een foto via WhatsApp en wij geven prijs en termijn door.`,
    aboutTitle: (z) => `Over het gebied ${z}`, hotelsLabel: 'Voorbeelden van hotels in de buurt',
    howTitle: 'Zo werkt het bij uw hotel',
    how: (z, home) => home ? `Ons atelier ligt in Hurma, Konyaaltı, en ophalen en terugbrengen bij hotels in Konyaaltı is gratis. Schrijf ons met de naam van uw hotel en uw vertrekdatum.` : `Schrijf ons via WhatsApp met de naam van uw hotel in ${z} en uw vertrekdatum. Wij bevestigen eerst de voorwaarden voor ophalen en terugbrengen bij uw hotel.`,
    faqTitle: 'Veelgestelde vragen',
    faq: (z, home) => [
      [`Bedienen jullie hotels in ${z}?`, home ? 'Ja. Het atelier ligt in Konyaaltı en ophalen bij hotels in de buurt is gratis.' : `Ja, wij bedienen hotels in ${z}. Geef de hotelnaam door via WhatsApp en wij bevestigen de voorwaarden.`],
      ['Hoe lang duurt een aanpassing?', 'Eenvoudige klussen zijn meestal binnen een dag klaar en spoedklussen vaak binnen 2–4 uur; de exacte termijn bevestigen wij via WhatsApp.'],
      ['Hoe weet ik de prijs?', 'Stuur via WhatsApp een foto van het kledingstuk en het probleem; meestal noemen wij prijs en termijn aan de hand van de foto.'],
    ],
    back: '← Kleermaker in Antalya voor toeristen', zonesLabel: 'Andere hotelgebieden', wa: (z) => `Hallo, ik verblijf in ${z} en heb een kledingaanpassing nodig. Ik stuur een foto.`, cta: 'Stuur een WhatsApp-bericht',
  },
  ar: {
    title: (z) => `خيّاط لفنادق ${z}: تعديل الملابس`,
    desc: (z) => `تعديل الملابس والخياطة لنزلاء فنادق ${z} في أنطاليا. استلام وتسليم في الفندق، مفتوح كل يوم 08:00–23:00. السعر عبر واتساب بصورة.`,
    h1: (z) => `خيّاط لفنادق ${z}`, lead: (z) => `إذا كنت تقيم في ${z} فنستلم القطعة من فندقك ونعيدها إليك معدّلة. أرسل صورة عبر واتساب ونخبرك بالسعر والموعد.`,
    aboutTitle: (z) => `نبذة عن منطقة ${z}`, hotelsLabel: 'أمثلة على فنادق في المنطقة',
    howTitle: 'كيف يتم الأمر في فندقك',
    how: (z, home) => home ? `ورشتنا في حي هورما بكونيالتي، والاستلام والتسليم في فنادق كونيالتي مجاني. راسلنا باسم فندقك وتاريخ مغادرتك.` : `راسلنا على واتساب باسم فندقك في ${z} وتاريخ مغادرتك. نؤكد لك أولاً شروط الاستلام والتسليم لفندقك.`,
    faqTitle: 'الأسئلة الشائعة',
    faq: (z, home) => [
      [`هل تخدمون فنادق ${z}؟`, home ? 'نعم. الورشة في كونيالتي والاستلام من فنادق المنطقة مجاني.' : `نعم، نخدم فنادق ${z}. أرسل اسم الفندق عبر واتساب ونؤكد لك الشروط.`],
      ['كم يستغرق التعديل؟', 'التعديلات البسيطة تكون جاهزة عادةً خلال يوم والعاجلة غالباً خلال 2–4 ساعات، ويُؤكَّد الموعد الدقيق عبر واتساب.'],
      ['كيف أعرف السعر؟', 'أرسل عبر واتساب صورة للقطعة وللمشكلة؛ نحدد السعر والموعد عادةً من الصورة.'],
    ],
    back: '← خيّاط في أنطاليا للسياح', zonesLabel: 'مناطق فندقية أخرى', wa: (z) => `مرحباً، أقيم في ${z} وأحتاج إلى تعديل ملابس. أرسل لكم صورة.`, cta: 'راسلنا على واتساب',
  },
};

export function zoneData(l: ILang, z: ZoneSlug) {
  const reg = OTEL_BOLGELERI.find((b) => b.slug === z);
  return { name: NAMES[l][z], blurb: BLURB[l][z], hotels: reg ? reg.hotels.filter((h) => !/\(yakın\)/.test(h)) : [], home: z === 'konyaalti' };
}
