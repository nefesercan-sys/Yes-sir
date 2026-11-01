// ============================================================
// swaphubs.com — lib/intl-zones.ts
// Ek turist dilleri (ES/FR/PL/UK/NL/AR) için otel bölgesi derinlik sayfaları: /{dil}/{bölge-slug} (rehber sayfasının /{dil}/{rehber-slug} altındaki bölge derinliği).
// Bölgeler: işletme sahibinin onayladığı Belek, Lara, Güzeloba, Side, Kemer + atölyenin bulunduğu Konyaaltı.
// Veri: otel adları ve bölge tanımı lib/otel-bolgeleri.ts'ten; mesafe/dakika YAZILMAZ (sitenin kuralı).
// Otellere servis tüm bölgelerde ücretsizdir (lib/business.ts). Süreler lib/business.ts DURATION'dan gelir.
// Benzerliği azaltmak için: bölgeye özgü not (ZONE_NOTE) + SSS havuzundan bölgeye göre deterministik seçim.
// ============================================================
import { OTEL_BOLGELERI } from '@/lib/otel-bolgeleri';
import { ILANGS, type ILang } from '@/lib/intl';
import { DURATION } from '@/lib/business';
const DU = (l: ILang) => DURATION[l];

export const ZONE_SLUGS = ['belek', 'lara', 'guzeloba', 'side', 'kemer', 'konyaalti', 'antalya'] as const;
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
  es: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer', konyaalti: 'Konyaaltı', antalya: 'Antalya' },
  fr: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer', konyaalti: 'Konyaaltı', antalya: 'Antalya' },
  pl: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer', konyaalti: 'Konyaaltı', antalya: 'Antalya' },
  nl: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer', konyaalti: 'Konyaaltı', antalya: 'Antalya' },
  uk: { belek: 'Белек', lara: 'Лара', guzeloba: 'Гюзельоба', side: 'Сіде', kemer: 'Кемер', konyaalti: 'Коньяалти', antalya: 'Анталія' },
  ar: { belek: 'بيليك', lara: 'لارا', guzeloba: 'غوزيلوبا', side: 'سيدي', kemer: 'كيمر', konyaalti: 'كونيالتي', antalya: 'أنطاليا' },
};

const BLURB: Record<ILang, Record<ZoneSlug, string>> = {
  es: {
    belek: `Belek es el rincón de Antalya de los campos de golf y los grandes resorts de cinco estrellas.`,
    lara: `Lara queda junto a la ciudad y destaca por su larga playa de arena y su hilera de hoteles frente al mar.`,
    guzeloba: `Güzeloba es la parte oriental de Lara, con hoteles frente al mar y un ambiente más sosegado que el centro.`,
    side: `Side es un núcleo turístico con historia, cerca de Manavgat, donde las ruinas antiguas conviven con hoteles de playa.`,
    kemer: `Kemer es una población costera al pie de los montes Tauro, conocida por su puerto deportivo y sus resorts.`,
    konyaalti: `Konyaaltı es el distrito costero donde trabaja nuestro taller, con hoteles y apartahoteles a lo largo del litoral.`,
    antalya: `Antalya reúne zonas hoteleras a lo largo de la costa: Konyaaltı, Lara, Belek, Side y Kemer. Atendemos hoteles en todas ellas.`,
  },
  fr: {
    belek: `Belek, c'est le coin d'Antalya des terrains de golf et des grands complexes cinq étoiles.`,
    lara: `Lara jouxte la ville et se distingue par sa longue plage de sable et sa rangée d'hôtels face à la mer.`,
    guzeloba: `Güzeloba occupe l'est de Lara : des hôtels en front de mer, dans une ambiance plus posée que le centre.`,
    side: `Side est une station chargée d'histoire près de Manavgat, où ruines antiques et hôtels de plage se côtoient.`,
    kemer: `Kemer est une localité côtière au pied du Taurus, connue pour sa marina et ses complexes hôteliers.`,
    konyaalti: `Konyaaltı est le district côtier où travaille notre atelier, avec hôtels et résidences hôtelières le long du littoral.`,
    antalya: `Antalya compte des zones hôtelières le long de la côte : Konyaaltı, Lara, Belek, Side et Kemer. Nous desservons les hôtels de toutes ces zones.`,
  },
  pl: {
    belek: `Belek to zakątek Antalyi pól golfowych i dużych pięciogwiazdkowych kompleksów.`,
    lara: `Lara sąsiaduje z miastem i słynie z długiej piaszczystej plaży oraz rzędu hoteli tuż przy morzu.`,
    guzeloba: `Güzeloba to wschodnia część Lary: hotele nad morzem i spokojniejsza atmosfera niż w centrum.`,
    side: `Side to zabytkowa miejscowość wypoczynkowa koło Manavgat, gdzie antyczne ruiny sąsiadują z hotelami plażowymi.`,
    kemer: `Kemer to nadmorska miejscowość u stóp gór Taurus, znana z mariny i kompleksów hotelowych.`,
    konyaalti: `Konyaaltı to nadmorski dystrykt, w którym pracuje nasza pracownia, z hotelami i aparthotelami wzdłuż wybrzeża.`,
    antalya: `Antalya ma strefy hotelowe wzdłuż wybrzeża: Konyaaltı, Lara, Belek, Side i Kemer. Obsługujemy hotele we wszystkich tych rejonach.`,
  },
  uk: {
    belek: `Белек — куточок Анталії з гольф-полями та великими п'ятизірковими курортами.`,
    lara: `Лара прилягає до міста й відома довгим піщаним пляжем та рядом готелів біля самого моря.`,
    guzeloba: `Гюзельоба — східна частина Лари: готелі біля моря й спокійніша атмосфера, ніж у центрі.`,
    side: `Сіде — курорт з історією поблизу Манавгата, де античні руїни сусідять із пляжними готелями.`,
    kemer: `Кемер — приморське містечко біля підніжжя гір Тавр, відоме мариною та курортними готелями.`,
    konyaalti: `Коньяалти — прибережний район, де працює наше ательє, з готелями й апарт-готелями вздовж узбережжя.`,
    antalya: `В Анталії готельні зони розташовані вздовж узбережжя: Коньяалти, Лара, Белек, Сіде і Кемер. Ми обслуговуємо готелі в усіх цих районах.`,
  },
  nl: {
    belek: `Belek is dé hoek van Antalya voor golfbanen en grote vijfsterrenresorts.`,
    lara: `Lara grenst aan de stad en valt op door het lange zandstrand en de rij hotels aan zee.`,
    guzeloba: `Güzeloba ligt in het oostelijke deel van Lara: hotels aan zee en een rustigere sfeer dan in het centrum.`,
    side: `Side is een vakantieplaats met geschiedenis bij Manavgat, waar oude ruïnes naast strandhotels liggen.`,
    kemer: `Kemer is een kustplaats aan de voet van het Taurusgebergte, bekend om de jachthaven en de resorts.`,
    konyaalti: `Konyaaltı is het kustdistrict waar ons atelier werkt, met hotels en aparthotels langs de kustlijn.`,
    antalya: `Antalya heeft hotelzones langs de kust: Konyaaltı, Lara, Belek, Side en Kemer. Wij bedienen hotels in al deze zones.`,
  },
  ar: {
    belek: `بيليك ركن في أنطاليا لملاعب الغولف والمنتجعات الكبيرة من فئة 5 نجوم.`,
    lara: `تجاور لارا المدينة وتتميز بشاطئها الرملي الطويل وصف الفنادق المطلة على البحر.`,
    guzeloba: `غوزيلوبا هي الجزء الشرقي من لارا: فنادق على البحر وأجواء أهدأ من الوسط.`,
    side: `سيدي منتجع ذو تاريخ قرب مانافغات، تجاور فيه الآثار القديمة فنادق الشاطئ.`,
    kemer: `كيمر بلدة ساحلية عند سفح جبال طوروس، تُعرف بمرساها ومنتجعاتها.`,
    konyaalti: `كونيالتي منطقة ساحلية تعمل فيها ورشتنا، وفيها فنادق وشقق فندقية على امتداد الساحل.`,
    antalya: `تضم أنطاليا مناطق فنادق على امتداد الساحل: كونيالتي ولارا وبيليك وسيدي وكيمر. نخدم الفنادق في جميع هذه المناطق.`,
  },
};


/** Bölgeye özgü kısa not: misafirlerin bu bölgeden en çok getirdiği işler (lib/district-facts.ts "needs" ile uyumlu; rakam/vaat yok). */
export const ZONE_NOTE: Record<ILang, Record<ZoneSlug, string>> = {
  es: {
    belek: 'En Belek lo más habitual son cremalleras que fallan durante la estancia, costuras abiertas y bajos que acortar.',
    lara: 'Desde Lara suelen llegar cremalleras rotas, costuras sueltas, ajustes de vestidos y trajes para una cena y bajos de prendas compradas en vacaciones.',
    guzeloba: 'En Güzeloba atendemos tanto a huéspedes de hotel como a residentes: arreglos y ajustes de vestidos, pantalones y camisas.',
    side: 'En Side, junto a Manavgat, predominan los arreglos urgentes: cremalleras, costuras y bajos antes de una excursión o del vuelo de regreso.',
    kemer: 'En Kemer y sus pueblos de playa lo más frecuente son cremalleras rotas, costuras y bajos durante las vacaciones.',
    konyaalti: 'En Konyaaltı, por la vida de playa, se piden mucho bajos y ajustes de talla en pantalones de lino, shorts, camisetas y vestidos.',
    antalya: `Los arreglos más pedidos por huéspedes de hotel en Antalya son cremalleras, costuras abiertas, bajos y ajustes de talla.`,
  },
  fr: {
    belek: 'À Belek, on voit surtout des fermetures qui lâchent pendant le séjour, des coutures ouvertes et des ourlets à reprendre.',
    lara: 'De Lara arrivent souvent des fermetures cassées, des coutures défaites, des robes ou costumes à ajuster pour un dîner et des ourlets de vêtements achetés en vacances.',
    guzeloba: 'À Güzeloba, nous servons aussi bien les clients d\'hôtel que les habitants : réparations et ajustements de robes, pantalons et chemises.',
    side: 'À Side, près de Manavgat, ce sont surtout des retouches urgentes : fermetures, coutures et ourlets avant une excursion ou le vol retour.',
    kemer: 'À Kemer et dans ses villages balnéaires, il s\'agit le plus souvent de fermetures cassées, de coutures et d\'ourlets en cours de séjour.',
    konyaalti: 'À Konyaaltı, vie de plage oblige, on demande souvent des ourlets et des ajustements de taille sur pantalons en lin, shorts, t-shirts et robes.',
    antalya: `Chez les clients d'hôtels d'Antalya, les retouches les plus demandées sont les fermetures, les coutures ouvertes, les ourlets et les ajustements de taille.`,
  },
  pl: {
    belek: 'W Belek najczęściej chodzi o zamki, które psują się w trakcie pobytu, rozprute szwy i nogawki do skrócenia.',
    lara: 'Z Lary trafiają do nas głównie zepsute zamki, puszczone szwy, dopasowanie sukienek i garniturów na kolację oraz skracanie rzeczy kupionych na wakacjach.',
    guzeloba: 'W Güzeloba obsługujemy zarówno gości hoteli, jak i mieszkańców: naprawy i dopasowanie sukienek, spodni i koszul.',
    side: 'W Side koło Manavgat przeważają pilne poprawki: zamki, szwy i skracanie przed wycieczką lub lotem powrotnym.',
    kemer: 'W Kemer i okolicznych miejscowościach plażowych najczęściej są to zepsute zamki, szwy i skracanie w trakcie urlopu.',
    konyaalti: 'W Konyaaltı, przy plażowym trybie życia, często prosi się o skracanie i dopasowanie lnianych spodni, szortów, koszulek i sukienek.',
    antalya: `Goście hoteli w Antalyi najczęściej zamawiają wymianę zamków, naprawę rozprutych szwów, skracanie i dopasowanie rozmiaru.`,
  },
  uk: {
    belek: 'У Белеку найчастіше звертаються через блискавки, що ламаються під час відпочинку, розпороті шви та задовгі штани.',
    lara: 'З Лари зазвичай приносять зламані блискавки, розпороті шви, сукні й костюми для вечері та речі, куплені у відпустці, які треба вкоротити.',
    guzeloba: 'У Гюзельобі ми працюємо і з гостями готелів, і з місцевими мешканцями: ремонт і підгонка суконь, штанів і сорочок.',
    side: 'У Сіде, поруч із Манавгатом, переважають термінові роботи: блискавки, шви й укорочення перед екскурсією чи зворотним рейсом.',
    kemer: 'У Кемері та курортних селищах поруч найчастіше це зламані блискавки, шви та вкорочення під час відпочинку.',
    konyaalti: 'У Коньяалти через пляжний спосіб життя часто просять вкоротити або підігнати лляні штани, шорти, футболки й сукні.',
    antalya: `Гості готелів в Анталії найчастіше замовляють заміну блискавок, ремонт розпоролих швів, підшивання та підгонку за розміром.`,
  },
  nl: {
    belek: 'In Belek gaat het meestal om ritsen die tijdens het verblijf kapotgaan, losgeraakte naden en broeken die korter moeten.',
    lara: 'Uit Lara komen vaak kapotte ritsen, losse naden, jurken en pakken die voor een diner moeten passen en vakantieaankopen die korter moeten.',
    guzeloba: 'In Güzeloba helpen we zowel hotelgasten als bewoners: reparaties en aanpassingen van jurken, broeken en overhemden.',
    side: 'In Side, bij Manavgat, gaat het vooral om spoedklussen: ritsen, naden en zomen vóór een excursie of de terugvlucht.',
    kemer: 'In Kemer en de badplaatsen eromheen gaat het meestal om kapotte ritsen, naden en zomen tijdens de vakantie.',
    konyaalti: 'In Konyaaltı, met het strandleven, wordt vaak gevraagd om linnen broeken, shorts, T-shirts en jurken in te korten of passend te maken.',
    antalya: `Hotelgasten in Antalya vragen vooral om ritsen, losgegane naden, zomen en maataanpassingen.`,
  },
  ar: {
    belek: 'في بيليك تكون أكثر الطلبات سحّابات تتعطل أثناء الإقامة، ودرزات مفتوحة، وتقصير البناطيل.',
    lara: 'من لارا تصلنا غالباً سحّابات مكسورة ودرزات مفكوكة وفساتين وبدلات تحتاج ضبطاً لعشاء، وتقصير ملابس اشتُريت في العطلة.',
    guzeloba: 'في غوزيلوبا نخدم نزلاء الفنادق والسكان معاً: إصلاح وضبط الفساتين والبناطيل والقمصان.',
    side: 'في سيدي قرب مانافغات تغلب الأعمال العاجلة: السحّابات والدرزات والتقصير قبل رحلة أو قبل رحلة العودة.',
    kemer: 'في كيمر وقراها الساحلية تكون الطلبات غالباً سحّابات مكسورة ودرزات وتقصيراً أثناء العطلة.',
    konyaalti: 'في كونيالتي، مع حياة الشاطئ، يكثر طلب تقصير وضبط مقاس البناطيل الكتانية والشورتات والقمصان والفساتين.',
    antalya: `أكثر ما يطلبه نزلاء فنادق أنطاليا هو تبديل السحابات وإصلاح الدرزات المفتوحة وتقصير الأطراف وتعديل المقاس.`,
  },
};

/** Giriş paragrafı için ek kalıplar (bölgeye göre deterministik seçilir; ZCOPY.lead ile birlikte 3 seçenek). */
export const ZONE_LEAD_ALT: Record<ILang, ((z: string) => string)[]> = {
  es: [
    (z) => `Respuesta corta: si se aloja en ${z} y una prenda necesita arreglo, envíe una foto por WhatsApp; recogemos la prenda en su hotel sin coste y se la devolvemos.`,
    (z) => `Las vacaciones en ${z} no tienen por qué complicarse por un bajo o una cremallera: el taller de Terzi Can en Konyaaltı arregla la prenda y la devuelve a su hotel.`,
  ],
  fr: [
    (z) => `En bref : si vous séjournez à ${z} et qu'un vêtement doit être retouché, envoyez une photo sur WhatsApp ; nous le récupérons gratuitement à votre hôtel et le rapportons.`,
    (z) => `Un ourlet ou une fermeture ne doit pas gâcher un séjour à ${z} : l'atelier Terzi Can de Konyaaltı retouche le vêtement et le rapporte à votre hôtel.`,
  ],
  pl: [
    (z) => `Krótko: jeśli mieszkasz w hotelu w ${z} i ubranie wymaga poprawki, wyślij zdjęcie na WhatsApp; bezpłatnie odbierzemy je z hotelu i odwieziemy.`,
    (z) => `Urlop w ${z} nie musi się komplikować przez nogawkę czy zamek: pracownia Terzi Can w Konyaaltı poprawi ubranie i odwiezie je do hotelu.`,
  ],
  uk: [
    (z) => `Коротко: якщо ви відпочиваєте в районі ${z} і річ потребує ремонту, надішліть фото у WhatsApp; ми безкоштовно заберемо її з готелю та повернемо.`,
    (z) => `Відпустку в районі ${z} не зіпсують задовгі штани чи блискавка: ательє Terzi Can у Коньяалти полагодить річ і привезе її до готелю.`,
  ],
  nl: [
    (z) => `Kort antwoord: logeert u in ${z} en moet er iets aan uw kleding gebeuren, stuur dan een foto via WhatsApp; wij halen het gratis op bij uw hotel en brengen het terug.`,
    (z) => `Een zoom of rits hoeft uw vakantie in ${z} niet te verstoren: het atelier van Terzi Can in Konyaaltı past het kledingstuk aan en brengt het naar uw hotel.`,
  ],
  ar: [
    (z) => `باختصار: إذا كنت تقيم في ${z} وتحتاج قطعة ملابس إلى تعديل، أرسل صورة عبر واتساب؛ نستلمها من فندقك مجاناً ونعيدها إليك.`,
    (z) => `لا داعي لأن يعكّر تقصير أو سحّاب عطلتك في ${z}: ورشة Terzi Can في كونيالتي تصلح القطعة وتعيدها إلى فندقك.`,
  ],
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
      : `1) Escriba por WhatsApp con una foto y el nombre de su hotel en ${z}. 2) Le confirmamos plazo y precio. 3) Recogemos la prenda en su hotel sin coste y se la devolvemos arreglada.`,
    faqTitle: 'Dudas habituales',
    faq: (z, home) => [
      [`¿Se puede arreglar ropa durante una estancia en ${z}?`, home ? 'Sí: el taller está en Konyaaltı y la recogida en los hoteles es gratuita.' : `Sí. Atendemos a huéspedes de ${z} y la recogida en el hotel es gratuita.`],
      ['¿En cuánto tiempo?', DU('es').all],
      ['¿Qué envío primero?', 'Una foto de la prenda entera y otra de lo que desea cambiar. Con eso le indicamos el precio.'],
      ['¿Llegaré antes de mi vuelo?', `Indique su fecha de salida al escribir. ${DU('es').urgent}.`],
      ['¿Puedo encargar una prenda a medida?', `Sí. ${DU('es').custom}; conviene encargarla al principio de la estancia.`],
      ['¿En qué idioma puedo escribir?', 'Puede escribir en su idioma; basta con una foto y una nota breve.'],
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
      : `1) Écrivez sur WhatsApp avec une photo et le nom de votre hôtel à ${z}. 2) Nous confirmons délai et prix. 3) Nous récupérons le vêtement à votre hôtel sans frais et vous le rapportons retouché.`,
    faqTitle: 'Questions courantes',
    faq: (z, home) => [
      [`Peut-on faire retoucher un vêtement pendant un séjour à ${z} ?`, home ? 'Oui : l\'atelier est à Konyaaltı et la collecte dans les hôtels est gratuite.' : `Oui. Nous accueillons les clients de ${z} et la collecte à l'hôtel est gratuite.`],
      ['En combien de temps ?', DU('fr').all],
      ['Que dois-je envoyer en premier ?', 'Une photo du vêtement entier et une du détail à changer. Nous indiquons le prix à partir de là.'],
      ['Serai-je prêt avant mon vol ?', `Indiquez votre date de départ en écrivant. ${DU('fr').urgent}.`],
      ['Puis-je commander un vêtement sur mesure ?', `Oui. ${DU('fr').custom} ; mieux vaut le commander en début de séjour.`],
      ['Dans quelle langue puis-je écrire ?', 'Vous pouvez écrire dans votre langue ; une photo et une courte note suffisent.'],
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
      : `1) Napisz na WhatsApp, dołącz zdjęcie i podaj nazwę hotelu w ${z}. 2) Potwierdzimy termin i cenę. 3) Bezpłatnie odbierzemy ubranie z hotelu i oddamy je poprawione.`,
    faqTitle: 'Najczęstsze wątpliwości',
    faq: (z, home) => [
      [`Czy można zrobić przeróbkę podczas pobytu w ${z}?`, home ? 'Tak: pracownia jest w Konyaaltı, a odbiór z hoteli jest bezpłatny.' : `Tak. Obsługujemy gości z ${z}, a odbiór z hotelu jest bezpłatny.`],
      ['Jak szybko?', DU('pl').all],
      ['Co wysłać na początek?', 'Zdjęcie całego ubrania i zbliżenie tego, co chcesz zmienić. Na tej podstawie podamy cenę.'],
      ['Czy zdążę przed wylotem?', `Podaj datę wyjazdu w wiadomości. ${DU('pl').urgent}.`],
      ['Czy mogę zamówić ubranie na miarę?', `Tak. ${DU('pl').custom}; najlepiej zamówić je na początku pobytu.`],
      ['W jakim języku mogę pisać?', 'Możesz pisać w swoim języku; wystarczy zdjęcie i krótka notatka.'],
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
      : `1) Напишіть у WhatsApp, додайте фото та назвіть готель у районі ${z}. 2) Ми підтвердимо строк і ціну. 3) Безкоштовно заберемо річ із готелю й повернемо її підігнаною.`,
    faqTitle: 'Поширені запитання',
    faq: (z, home) => [
      [`Чи можна підігнати одяг під час відпочинку в районі ${z}?`, home ? 'Так: ательє в Коньяалти, а забір із готелів безкоштовний.' : `Так. Ми обслуговуємо гостей району ${z}, і забір із готелю безкоштовний.`],
      ['Як швидко?', DU('uk').all],
      ['Що надіслати спочатку?', 'Фото речі повністю та фото місця, яке треба змінити. За ними ми назвемо ціну.'],
      ['Чи встигну до вильоту?', `Вкажіть дату виїзду в повідомленні. ${DU('uk').urgent}.`],
      ['Чи можна замовити пошиття за мірками?', `Так. ${DU('uk').custom}; краще замовляти на початку відпочинку.`],
      ['Якою мовою можна писати?', 'Пишіть своєю мовою; достатньо фото і короткого опису.'],
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
      : `1) Stuur een WhatsApp-bericht met een foto en de naam van uw hotel in ${z}. 2) Wij bevestigen termijn en prijs. 3) Wij halen het kledingstuk gratis op bij uw hotel en brengen het aangepast terug.`,
    faqTitle: 'Veelvoorkomende vragen',
    faq: (z, home) => [
      [`Kan ik kleding laten vermaken tijdens mijn verblijf in ${z}?`, home ? 'Ja: het atelier ligt in Konyaaltı en ophalen bij hotels is gratis.' : `Ja. Wij helpen gasten uit ${z} en ophalen bij het hotel is gratis.`],
      ['Hoe snel?', DU('nl').all],
      ['Wat stuur ik eerst?', 'Een foto van het hele kledingstuk en een van wat u wilt veranderen. Daarmee noemen wij de prijs.'],
      ['Is het klaar vóór mijn vlucht?', `Vermeld uw vertrekdatum in het bericht. ${DU('nl').urgent}.`],
      ['Kan ik iets op maat laten maken?', `Ja. ${DU('nl').custom}; bestel het liefst aan het begin van uw verblijf.`],
      ['In welke taal kan ik schrijven?', 'U kunt in uw eigen taal schrijven; een foto en een korte notitie zijn genoeg.'],
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
      : `1) راسلنا على واتساب مع صورة واسم فندقك في ${z}. 2) نؤكد لك الموعد والسعر. 3) نستلم القطعة من فندقك مجاناً ونعيدها إليك بعد التعديل.`,
    faqTitle: 'أسئلة متكررة',
    faq: (z, home) => [
      [`هل يمكن تعديل الملابس أثناء الإقامة في ${z}؟`, home ? 'نعم: الورشة في كونيالتي والاستلام من الفنادق مجاني.' : `نعم. نخدم نزلاء ${z}، والاستلام من الفندق مجاني.`],
      ['كم يستغرق؟', DU('ar').all],
      ['ماذا أرسل أولاً؟', 'صورة للقطعة كاملة وصورة لما تريد تغييره. وبناءً عليهما نحدد السعر.'],
      ['هل ستكون جاهزة قبل رحلتي؟', `اذكر تاريخ مغادرتك في الرسالة. ${DU('ar').urgent}.`],
      ['هل يمكن تفصيل قطعة حسب المقاس؟', `نعم. ${DU('ar').custom}؛ ويُفضَّل طلبها في بداية الإقامة.`],
      ['بأي لغة يمكنني الكتابة؟', 'يمكنك الكتابة بلغتك؛ تكفي صورة وملاحظة قصيرة.'],
    ],
    back: '← دليل الخياطة في أنطاليا', zonesLabel: 'مناطق أخرى', wa: (z) => `مرحباً، أنا في عطلة في ${z} وأريد تعديل قطعة ملابس. أرسل لكم الصورة.`, cta: 'اطلب عبر واتساب',
  },
};

export function zoneData(l: ILang, z: ZoneSlug) {
  const reg = OTEL_BOLGELERI.find((b) => b.slug === z);
  return { name: NAMES[l][z], blurb: BLURB[l][z], note: ZONE_NOTE[l][z], hotels: reg ? reg.hotels.filter((h) => !/\(nearby\)|\(yakın\)/.test(h)) : [], home: z === 'konyaalti' };
}
