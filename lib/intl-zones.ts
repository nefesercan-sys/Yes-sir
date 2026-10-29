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
    belek: `Belek es el rincón de Antalya de los campos de golf y los grandes resorts de cinco estrellas.`,
    lara: `Lara queda junto a la ciudad y destaca por su larga playa de arena y su hilera de hoteles frente al mar.`,
    guzeloba: `Güzeloba es la parte oriental de Lara, con hoteles frente al mar y un ambiente más sosegado que el centro.`,
    side: `Side es un núcleo turístico con historia, cerca de Manavgat, donde las ruinas antiguas conviven con hoteles de playa.`,
    kemer: `Kemer es una población costera al pie de los montes Tauro, conocida por su puerto deportivo y sus resorts.`,
    konyaalti: `Konyaaltı es el distrito costero donde trabaja nuestro taller, con hoteles y apartahoteles a lo largo del litoral.`,
  },
  fr: {
    belek: `Belek, c'est le coin d'Antalya des terrains de golf et des grands complexes cinq étoiles.`,
    lara: `Lara jouxte la ville et se distingue par sa longue plage de sable et sa rangée d'hôtels face à la mer.`,
    guzeloba: `Güzeloba occupe l'est de Lara : des hôtels en front de mer, dans une ambiance plus posée que le centre.`,
    side: `Side est une station chargée d'histoire près de Manavgat, où ruines antiques et hôtels de plage se côtoient.`,
    kemer: `Kemer est une localité côtière au pied du Taurus, connue pour sa marina et ses complexes hôteliers.`,
    konyaalti: `Konyaaltı est le district côtier où travaille notre atelier, avec hôtels et résidences hôtelières le long du littoral.`,
  },
  pl: {
    belek: `Belek to zakątek Antalyi pól golfowych i dużych pięciogwiazdkowych kompleksów.`,
    lara: `Lara sąsiaduje z miastem i słynie z długiej piaszczystej plaży oraz rzędu hoteli tuż przy morzu.`,
    guzeloba: `Güzeloba to wschodnia część Lary: hotele nad morzem i spokojniejsza atmosfera niż w centrum.`,
    side: `Side to zabytkowa miejscowość wypoczynkowa koło Manavgat, gdzie antyczne ruiny sąsiadują z hotelami plażowymi.`,
    kemer: `Kemer to nadmorska miejscowość u stóp gór Taurus, znana z mariny i kompleksów hotelowych.`,
    konyaalti: `Konyaaltı to nadmorski dystrykt, w którym pracuje nasza pracownia, z hotelami i aparthotelami wzdłuż wybrzeża.`,
  },
  uk: {
    belek: `Белек — куточок Анталії з гольф-полями та великими п'ятизірковими курортами.`,
    lara: `Лара прилягає до міста й відома довгим піщаним пляжем та рядом готелів біля самого моря.`,
    guzeloba: `Гюзельоба — східна частина Лари: готелі біля моря й спокійніша атмосфера, ніж у центрі.`,
    side: `Сіде — курорт з історією поблизу Манавгата, де античні руїни сусідять із пляжними готелями.`,
    kemer: `Кемер — приморське містечко біля підніжжя гір Тавр, відоме мариною та курортними готелями.`,
    konyaalti: `Коньяалти — прибережний район, де працює наше ательє, з готелями й апарт-готелями вздовж узбережжя.`,
  },
  nl: {
    belek: `Belek is dé hoek van Antalya voor golfbanen en grote vijfsterrenresorts.`,
    lara: `Lara grenst aan de stad en valt op door het lange zandstrand en de rij hotels aan zee.`,
    guzeloba: `Güzeloba ligt in het oostelijke deel van Lara: hotels aan zee en een rustigere sfeer dan in het centrum.`,
    side: `Side is een vakantieplaats met geschiedenis bij Manavgat, waar oude ruïnes naast strandhotels liggen.`,
    kemer: `Kemer is een kustplaats aan de voet van het Taurusgebergte, bekend om de jachthaven en de resorts.`,
    konyaalti: `Konyaaltı is het kustdistrict waar ons atelier werkt, met hotels en aparthotels langs de kustlijn.`,
  },
  ar: {
    belek: `بيليك ركن في أنطاليا لملاعب الغولف والمنتجعات الكبيرة من فئة 5 نجوم.`,
    lara: `تجاور لارا المدينة وتتميز بشاطئها الرملي الطويل وصف الفنادق المطلة على البحر.`,
    guzeloba: `غوزيلوبا هي الجزء الشرقي من لارا: فنادق على البحر وأجواء أهدأ من الوسط.`,
    side: `سيدي منتجع ذو تاريخ قرب مانافغات، تجاور فيه الآثار القديمة فنادق الشاطئ.`,
    kemer: `كيمر بلدة ساحلية عند سفح جبال طوروس، تُعرف بمرساها ومنتجعاتها.`,
    konyaalti: `كونيالتي منطقة ساحلية تعمل فيها ورشتنا، وفيها فنادق وشقق فندقية على امتداد الساحل.`,
  },
};

export type ZCopy = {
  title: (z: string) => string; desc: (z: string) => string; h1: (z: string) => string; lead: (z: string) => string;
  aboutTitle: (z: string) => string; hotelsLabel: string;
  howTitle: string; how: (z: string, home: boolean) => string;
  faqTitle: string; faq: (z: string, home: boolean) => [string, string][];
  back: string; zonesLabel: string; wa: (z: string) => string; cta: string;
};

// swaphubs.com: REHBER sesi (adım adım, "nasıl yapılır"). terzihizmeti.com.tr'deki atölye anlatımından bilerek farklı yazılmıştır.
export const ZCOPY: Record<ILang, ZCopy> = {
  es: {
    title: (z) => `Arreglos de ropa en ${z}: guía para turistas`,
    desc: (z) => `Guía para huéspedes en ${z}: qué arreglos de ropa se pueden hacer en vacaciones, plazos y cómo pedirlos por WhatsApp. Terzi Can, Antalya.`,
    h1: (z) => `Arreglar la ropa durante sus vacaciones en ${z}`,
    lead: (z) => `¿Un pantalón largo, una cremallera rota o un vestido que no queda bien en ${z}? Terzi Can, en Konyaaltı, se ocupa: usted envía una foto y le indicamos cómo seguir.`,
    aboutTitle: (z) => `La zona de ${z} en pocas palabras`, hotelsLabel: 'Hoteles de la zona (a modo de ejemplo)',
    howTitle: 'Qué hacer, paso a paso',
    how: (z, home) => home
      ? `1) Escriba por WhatsApp con una foto. 2) Le confirmamos plazo y precio. 3) Recogemos la prenda en su hotel de Konyaaltı sin coste y se la devolvemos allí.`
      : `1) Escriba por WhatsApp con una foto y el nombre de su hotel en ${z}. 2) Le confirmamos plazo, precio y condiciones de recogida para su hotel. 3) Se la devolvemos arreglada.`,
    faqTitle: 'Dudas habituales',
    faq: (z, home) => [
      [`¿Se puede arreglar ropa durante una estancia en ${z}?`, home ? 'Sí: el taller está en Konyaaltı y la recogida en los hoteles de la zona es gratuita.' : `Sí. Atendemos a huéspedes de ${z}; las condiciones de recogida se confirman por WhatsApp.`],
      ['¿En cuánto tiempo?', 'Un arreglo sencillo, normalmente en un día; una urgencia, a menudo en 2–4 horas.'],
      ['¿Qué envío primero?', 'Una foto de la prenda y de lo que desea cambiar. Con eso le indicamos el precio.'],
    ],
    back: '← Guía de sastrería en Antalya', zonesLabel: 'Más zonas', wa: (z) => `Hola, estoy de vacaciones en ${z} y quiero arreglar una prenda. Le envío la foto.`, cta: 'Pedir por WhatsApp',
  },
  fr: {
    title: (z) => `Retouches de vêtements à ${z} : guide touristes`,
    desc: (z) => `Guide pour les séjours à ${z} : quelles retouches faire pendant les vacances, délais et demande par WhatsApp. Terzi Can, Antalya.`,
    h1: (z) => `Faire retoucher ses vêtements pendant ses vacances à ${z}`,
    lead: (z) => `Un pantalon trop long, une fermeture cassée ou une robe qui ne tombe pas bien à ${z} ? Terzi Can, à Konyaaltı, s'en charge : vous envoyez une photo, nous vous disons la suite.`,
    aboutTitle: (z) => `${z} en quelques mots`, hotelsLabel: 'Hôtels du secteur (à titre d\'exemple)',
    howTitle: 'Comment procéder, étape par étape',
    how: (z, home) => home
      ? `1) Écrivez sur WhatsApp avec une photo. 2) Nous confirmons délai et prix. 3) Nous venons chercher le vêtement dans votre hôtel de Konyaaltı, sans frais, et nous le rapportons.`
      : `1) Écrivez sur WhatsApp avec une photo et le nom de votre hôtel à ${z}. 2) Nous confirmons délai, prix et conditions de collecte pour votre hôtel. 3) Nous vous rapportons le vêtement retouché.`,
    faqTitle: 'Questions courantes',
    faq: (z, home) => [
      [`Peut-on faire retoucher un vêtement pendant un séjour à ${z} ?`, home ? 'Oui : l\'atelier est à Konyaaltı et la collecte dans les hôtels du secteur est gratuite.' : `Oui. Nous accueillons les clients de ${z} ; les conditions de collecte se confirment sur WhatsApp.`],
      ['En combien de temps ?', 'Une retouche simple, en général en un jour ; une urgence, souvent en 2 à 4 heures.'],
      ['Que dois-je envoyer en premier ?', 'Une photo du vêtement et de ce que vous souhaitez changer. Nous indiquons le prix à partir de là.'],
    ],
    back: '← Guide couture à Antalya', zonesLabel: 'Autres secteurs', wa: (z) => `Bonjour, je suis en vacances à ${z} et je voudrais faire retoucher un vêtement. Je vous envoie la photo.`, cta: 'Demander sur WhatsApp',
  },
  pl: {
    title: (z) => `Przeróbki ubrań: ${z}, poradnik dla turystów`,
    desc: (z) => `Poradnik dla gości w ${z}: jakie przeróbki ubrań zrobić na wakacjach, terminy i zamówienie przez WhatsApp. Terzi Can, Antalya.`,
    h1: (z) => `Przeróbka ubrań podczas wakacji w ${z}`,
    lead: (z) => `Za długie spodnie, zepsuty zamek albo sukienka, która nie leży, a jesteś w ${z}? Terzi Can z Konyaaltı się tym zajmie: wyślij zdjęcie, a podpowiemy, co dalej.`,
    aboutTitle: (z) => `${z} w kilku słowach`, hotelsLabel: 'Hotele w okolicy (przykładowo)',
    howTitle: 'Jak to zrobić krok po kroku',
    how: (z, home) => home
      ? `1) Napisz na WhatsApp i dołącz zdjęcie. 2) Potwierdzimy termin i cenę. 3) Odbierzemy ubranie z Twojego hotelu w Konyaaltı bez opłaty i tam je oddamy.`
      : `1) Napisz na WhatsApp, dołącz zdjęcie i podaj nazwę hotelu w ${z}. 2) Potwierdzimy termin, cenę i warunki odbioru dla Twojego hotelu. 3) Oddamy poprawione ubranie.`,
    faqTitle: 'Najczęstsze wątpliwości',
    faq: (z, home) => [
      [`Czy można zrobić przeróbkę podczas pobytu w ${z}?`, home ? 'Tak: pracownia jest w Konyaaltı, a odbiór z hoteli w okolicy jest bezpłatny.' : `Tak. Obsługujemy gości z ${z}; warunki odbioru potwierdzamy na WhatsApp.`],
      ['Jak szybko?', 'Prostą przeróbkę zwykle w jeden dzień; pilną często w 2–4 godziny.'],
      ['Co wysłać na początek?', 'Zdjęcie ubrania i tego, co chcesz zmienić. Na tej podstawie podamy cenę.'],
    ],
    back: '← Poradnik krawiecki Antalya', zonesLabel: 'Inne rejony', wa: (z) => `Dzień dobry, jestem na wakacjach w ${z} i chcę poprawić ubranie. Wysyłam zdjęcie.`, cta: 'Zamów przez WhatsApp',
  },
  uk: {
    title: (z) => `Підгонка одягу: ${z}, гід для туристів`,
    desc: (z) => `Гід для гостей району ${z}: яку підгонку одягу можна зробити на відпочинку, строки та замовлення через WhatsApp. Terzi Can, Анталія.`,
    h1: (z) => `Підгонка одягу під час відпустки: ${z}`,
    lead: (z) => `Задовгі штани, зламана блискавка чи сукня, що погано сидить, а ви в районі ${z}? Terzi Can у Коньяалти допоможе: надішліть фото, і ми підкажемо, що далі.`,
    aboutTitle: (z) => `Район ${z} коротко`, hotelsLabel: 'Готелі району (для прикладу)',
    howTitle: 'Що робити крок за кроком',
    how: (z, home) => home
      ? `1) Напишіть у WhatsApp і додайте фото. 2) Ми підтвердимо строк і ціну. 3) Заберемо річ у вашому готелі в Коньяалти безкоштовно й повернемо туди ж.`
      : `1) Напишіть у WhatsApp, додайте фото та назвіть готель у районі ${z}. 2) Ми підтвердимо строк, ціну та умови забору для вашого готелю. 3) Повернемо річ підігнаною.`,
    faqTitle: 'Поширені запитання',
    faq: (z, home) => [
      [`Чи можна підігнати одяг під час відпочинку в районі ${z}?`, home ? 'Так: ательє в Коньяалти, а забір із готелів району безкоштовний.' : `Так. Ми обслуговуємо гостей району ${z}; умови забору підтверджуємо у WhatsApp.`],
      ['Як швидко?', 'Просту підгонку зазвичай за день; термінову часто за 2–4 години.'],
      ['Що надіслати спочатку?', 'Фото речі та того, що хочете змінити. За ним ми назвемо ціну.'],
    ],
    back: '← Гід з пошиття в Анталії', zonesLabel: 'Інші райони', wa: (z) => `Добрий день, я на відпочинку в районі ${z} і хочу підігнати річ. Надсилаю фото.`, cta: 'Замовити у WhatsApp',
  },
  nl: {
    title: (z) => `Kleding laten vermaken in ${z}: gids voor toeristen`,
    desc: (z) => `Gids voor gasten in ${z}: welke kledingaanpassingen kunnen tijdens de vakantie, termijnen en aanvragen via WhatsApp. Terzi Can, Antalya.`,
    h1: (z) => `Kleding laten aanpassen tijdens uw vakantie in ${z}`,
    lead: (z) => `Een te lange broek, een kapotte rits of een jurk die niet zit, en u bent in ${z}? Terzi Can in Konyaaltı regelt het: stuur een foto en wij zeggen hoe het verder gaat.`,
    aboutTitle: (z) => `${z} in het kort`, hotelsLabel: 'Hotels in de buurt (ter illustratie)',
    howTitle: 'Zo gaat het, stap voor stap',
    how: (z, home) => home
      ? `1) Stuur een WhatsApp-bericht met een foto. 2) Wij bevestigen termijn en prijs. 3) Wij halen het kledingstuk gratis op bij uw hotel in Konyaaltı en brengen het daar terug.`
      : `1) Stuur een WhatsApp-bericht met een foto en de naam van uw hotel in ${z}. 2) Wij bevestigen termijn, prijs en ophaalvoorwaarden voor uw hotel. 3) Wij brengen het aangepaste kledingstuk terug.`,
    faqTitle: 'Veelvoorkomende vragen',
    faq: (z, home) => [
      [`Kan ik kleding laten vermaken tijdens mijn verblijf in ${z}?`, home ? 'Ja: het atelier ligt in Konyaaltı en ophalen bij hotels in de buurt is gratis.' : `Ja. Wij helpen gasten uit ${z}; de ophaalvoorwaarden bevestigen wij via WhatsApp.`],
      ['Hoe snel?', 'Een eenvoudige aanpassing meestal in een dag; een spoedklus vaak in 2–4 uur.'],
      ['Wat stuur ik eerst?', 'Een foto van het kledingstuk en van wat u wilt veranderen. Daarmee noemen wij de prijs.'],
    ],
    back: '← Kleermakersgids Antalya', zonesLabel: 'Meer gebieden', wa: (z) => `Hallo, ik ben op vakantie in ${z} en wil een kledingstuk laten aanpassen. Ik stuur een foto.`, cta: 'Vraag via WhatsApp',
  },
  ar: {
    title: (z) => `تعديل الملابس في ${z}: دليل السائح`,
    desc: (z) => `دليل لنزلاء ${z}: ما تعديلات الملابس الممكنة أثناء العطلة، والمواعيد، وكيف تطلبها عبر واتساب. Terzi Can، أنطاليا.`,
    h1: (z) => `تعديل ملابسك أثناء عطلتك في ${z}`,
    lead: (z) => `بنطال طويل أو سحّاب مكسور أو فستان غير مناسب وأنت في ${z}؟ Terzi Can في كونيالتي تتكفل بالأمر: أرسل صورة ونخبرك بالخطوة التالية.`,
    aboutTitle: (z) => `${z} باختصار`, hotelsLabel: 'فنادق في المنطقة (على سبيل المثال)',
    howTitle: 'ماذا تفعل خطوة بخطوة',
    how: (z, home) => home
      ? `1) راسلنا على واتساب مع صورة. 2) نؤكد لك الموعد والسعر. 3) نستلم القطعة من فندقك في كونيالتي مجاناً ونعيدها إليه.`
      : `1) راسلنا على واتساب مع صورة واسم فندقك في ${z}. 2) نؤكد لك الموعد والسعر وشروط الاستلام لفندقك. 3) نعيد إليك القطعة بعد التعديل.`,
    faqTitle: 'أسئلة متكررة',
    faq: (z, home) => [
      [`هل يمكن تعديل الملابس أثناء الإقامة في ${z}؟`, home ? 'نعم: الورشة في كونيالتي والاستلام من فنادق المنطقة مجاني.' : `نعم. نخدم نزلاء ${z}، ونؤكد شروط الاستلام عبر واتساب.`],
      ['كم يستغرق؟', 'التعديل البسيط عادةً خلال يوم، والعاجل غالباً خلال 2–4 ساعات.'],
      ['ماذا أرسل أولاً؟', 'صورة للقطعة ولما تريد تغييره. وبناءً عليها نحدد السعر.'],
    ],
    back: '← دليل الخياطة في أنطاليا', zonesLabel: 'مناطق أخرى', wa: (z) => `مرحباً، أنا في عطلة في ${z} وأريد تعديل قطعة ملابس. أرسل لكم الصورة.`, cta: 'اطلب عبر واتساب',
  },
};

export function zoneData(l: ILang, z: ZoneSlug) {
  const reg = OTEL_BOLGELERI.find((b) => b.slug === z);
  return { name: NAMES[l][z], blurb: BLURB[l][z], hotels: reg ? reg.hotels.filter((h) => !/\(yakın\)/.test(h)) : [], home: z === 'konyaalti' };
}
