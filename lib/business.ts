// ============================================================
// lib/business.ts — TEK DOĞRULUK KAYNAĞI (işletme bilgileri)
// Telefon, WhatsApp, saat, adres, hizmet bölgeleri, fiyat başlangıçları, teslim süreleri ve
// ücretsiz servis kuralı burada değişir; lib/seo-data.ts, lib/value-props.ts, lib/tekstil-sayfalari.ts,
// lib/mahalle-meta.ts, lib/tr-meta.ts ve şema bileşenleri buradan okur.
// NOT: Puan/yorum burada YOK. Gerçek ve doğrulanabilir yorumlar lib/reviews.ts'tedir.
// ============================================================
export const SITE_URL = 'https://swaphubs.com';

export const PHONE_E164 = '+905318986418';
export const PHONE_DISPLAY = '+90 531 898 64 18';
export const WA_NUMBER = '905318986418';
export const MAPS_URL = 'https://www.google.com/maps?cid=6436895271281342624';
export const GOOGLE_REVIEW_URL = 'https://g.page/r/CYUmDLIgrCRREAE/review';
/** Aynı işletmenin diğer RESMÎ web sitesi (iki site de resmîdir; her biri kendi adresinde canonical kalır). */
export const OTHER_OFFICIAL_SITE = 'https://terzihizmeti.com.tr';
export const OTHER_OFFICIAL_BUSINESS_ID = `${OTHER_OFFICIAL_SITE}/#business`;
export const BUSINESS_ID = `${SITE_URL}/terzi#business`;
export const waUrl = (text?: string) => `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/** Hizmet verilen bölgeler (schema.org areaServed ve metinler için tek liste). */
export const AREA_SERVED = ['Konyaaltı', 'Muratpaşa', 'Lara', 'Güzeloba', 'Kundu', 'Kepez', 'Aksu', 'Döşemealtı', 'Belek', 'Serik', 'Side', 'Manavgat', 'Kemer', 'Beldibi', 'Göynük', 'Antalya'] as const;

export const BUSINESS = {
  id: BUSINESS_ID,
  name: 'TERZİ Can - Konyaaltı', // Google profil adıyla birebir aynı
  legalShortName: 'Terzi Can',
  alternateName: [
    'Terzi Can',
    'TERZİ Can Antalya Tailor Service',
    'Terzi Can Antalya',
    'Tailor Can Antalya',
    'Портной Кан Анталья',
    'Schneider Can Antalya',
  ],
  phone: PHONE_E164,
  phoneDisplay: PHONE_DISPLAY,
  priceRange: '₺₺',
  languages: ['tr', 'en', 'ru', 'de', 'pl', 'uk', 'nl', 'fr', 'es', 'ar'],
  currencies: 'TRY, EUR, USD, GBP, RUB and other currencies',
  payments: 'Cash, Credit Card',
  image: `${SITE_URL}/og/terzi-can.jpg`,
  address: {
    streetAddress: 'Hurma Mahallesi',
    addressLocality: 'Konyaaltı',
    addressRegion: 'Antalya',
    postalCode: '07130',
    addressCountry: 'TR',
  },
  // Google Haritalar'dan doğrulanıp güncellenmeli
  geo: { latitude: 36.8572868, longitude: 30.5970193 },
  hours: { days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '08:00', closes: '23:00' },
  foundingYear: '2006',
  areaServed: AREA_SERVED,
  sameAs: [MAPS_URL, GOOGLE_REVIEW_URL, `https://wa.me/${WA_NUMBER}`, OTHER_OFFICIAL_SITE],
} as const;

/** schema.org areaServed düğümleri (tek işletme varlığında kullanılır). */
export const areaServedSchema = () => AREA_SERVED.map((name) => ({ '@type': name === 'Antalya' ? 'City' : 'Place', name }));


/** Ortak işletme düğümü çekirdeği (tek kaynak). BusinessSchema ve lib/json-ld.ts normalizasyonu bunu kullanır. */
export function businessCore() {
  const b = BUSINESS;
  return {
    '@type': ['LocalBusiness', 'ClothingStore'],
    '@id': b.id,
    name: b.name,
    url: `${SITE_URL}/terzi`,
    telephone: b.phone,
    priceRange: b.priceRange,
    currenciesAccepted: b.currencies,
    paymentAccepted: b.payments,
    knowsLanguage: [...b.languages],
    foundingDate: b.foundingYear,
    image: b.image,
    hasMap: MAPS_URL,
    address: { '@type': 'PostalAddress', ...b.address },
    geo: { '@type': 'GeoCoordinates', ...b.geo },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: [...b.hours.days], opens: b.hours.opens, closes: b.hours.closes }],
    areaServed: areaServedSchema(),
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'customer service', telephone: b.phone, availableLanguage: [...b.languages], hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: [...b.hours.days], opens: b.hours.opens, closes: b.hours.closes } },
      { '@type': 'ContactPoint', contactType: 'sales', url: `https://wa.me/${WA_NUMBER}`, telephone: b.phone, availableLanguage: [...b.languages] },
    ],
    sameAs: [...b.sameAs],
  };
}

// ── Fiyat başlangıçları (₺) — yalnızca sitede zaten yayınlanan rakamlar ────────────
export const PRICE_FROM = {
  paca: 200,
  bel: 200,
  fermuar: 300,
  deri: 400,
} as const;

/** DİKİM işlerinde (elbise, abiye, etek, pantolon, çocuk, damatlık/takım, özel dikim, yelek/tulum/bluz/eşofman) sabit fiyat YAZILMAZ (sahip kararı, Kasım 2026). */
export const PRICE_BY_MODEL: Record<DLang, string> = {
  tr: 'fotoğrafa ve istediğiniz modele göre',
  en: 'by photo and the model you want',
  ru: 'по фото и желаемой модели',
  de: 'nach Foto und gewünschtem Modell',
  es: 'según la foto y el modelo que desee',
  fr: 'selon la photo et le modèle souhaité',
  pl: 'według zdjęcia i wybranego modelu',
  uk: 'за фото та бажаною моделлю',
  nl: 'op basis van foto en gewenst model',
  ar: 'حسب الصورة والموديل الذي تريده',
};
/** Dikim fiyatı cümlesi: "Fiyat fotoğrafa ve istediğiniz modele göre belirlenir." (kısa, 10 dil) */
export const SEW_PRICE_LINE: Record<DLang, string> = {
  tr: 'Dikimde fiyat fotoğrafa ve istediğiniz modele göre belirlenir.',
  en: 'For sewing, the price is set by photo and the model you want.',
  ru: 'Цена пошива определяется по фото и желаемой модели.',
  de: 'Beim Nähen richtet sich der Preis nach Foto und gewünschtem Modell.',
  es: 'En la confección, el precio se fija según la foto y el modelo que desee.',
  fr: 'Pour la couture, le prix est fixé selon la photo et le modèle souhaité.',
  pl: 'Przy szyciu cena zależy od zdjęcia i wybranego modelu.',
  uk: 'Ціна пошиття визначається за фото та бажаною моделлю.',
  nl: 'Bij het maken van kleding wordt de prijs bepaald op basis van foto en gewenst model.',
  ar: 'في الخياطة يُحدَّد السعر حسب الصورة والموديل الذي تريده.',
};

/** Yabancı dil sayfalarında fiyat EURO; € fiyatlar sahibin belirlediği turist başlangıç fiyatlarıdır, gerçek kurla çevrilmez (sahip kararı, Kasım 2026; terzihizmeti.com.tr lib/facts.ts ile aynı). Gelinlik DİKİMİ yapılmaz (yalnız tadilat). */
export const TRY_PER_EUR = 20;
export const eurOf = (tl: number): number => Math.round(tl / TRY_PER_EUR);

// ── Ücretsiz servis kuralı ─────────────────────────────────────────────────────────
// Sahibin kararı (Ekim 2026): EVE VE OTELE alım-teslim hizmet verilen tüm bölgelerde yapılır; sayfalarda 'ücretsiz' VAADİ YAZILMAZ (Kasım 2026 kararı).
// Aşağıdaki liste yalnızca geriye dönük uyumluluk içindir; isFreeService her zaman true döner. Eski not: bölgeye göre
//    WhatsApp'ta netleşir. Liste işletme sahibinin onayladığı Ekim 2026 listesidir. Meltem idari olarak Muratpaşa'ya
//    bağlıdır ancak Konyaaltı sınırında olduğu ve onaylı listede yer aldığı için korunmuştur.
export const HOTEL_SERVICE_FREE = true;
export const FREE_SERVICE_SLUGS = [
  'konyaalti', 'hurma', 'sarisu', 'liman', 'uncali', 'altinkum', 'ogretmenevleri', 'siteler', 'arapsuyu', 'gursu', 'uluc', 'meltem',
] as const;
export const isFreeService = (_slug: string): boolean => true;

// ── Teslim süreleri (TEK KAYNAK, 10 dil) ───────────────────────────────────────────
// ACİL tamir/tadilat: 1–2 saat · NORMAL tamir/tadilat: aynı gün teslim · ÖZEL DİKİM: modele ve adede göre (gün yazılmaz).
export type DLang = 'tr' | 'en' | 'ru' | 'de' | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
export interface DurationCopy {
  urgent: string;      // "Acil tamir ve tadilat: 1–2 saat"
  normal: string;      // "Normal tamir ve tadilat: aynı gün teslim"
  custom: string;      // "Özel dikim: süre modele ve adede göre"
  urgentShort: string; // başlık/rozet için kısa
  normalShort: string;
  customShort: string;
  repairLine: string;  // tamir/tadilat hizmeti için tek cümle (normal + acil)
  all: string;         // üçünü birlikte anlatan tek cümle
}
export const DURATION: Record<DLang, DurationCopy> = {
  tr: {
    urgent: 'Acil tamir ve tadilat 1–2 saatte hazır', normal: 'Normal tamir ve tadilat aynı gün teslim', custom: 'Özel dikimde süre modele ve adede göre belirlenir',
    urgentShort: 'Acilse 1–2 Saat', normalShort: 'Aynı Gün Teslim', customShort: 'Süre Modele Göre',
    repairLine: 'Aynı gün teslim; acil işler 1–2 saatte hazır',
    all: 'Normal tamir ve tadilat aynı gün teslim edilir, acil işler 1–2 saatte hazırlanır; özel dikimde süre modele ve adede göre belirlenir.',
  },
  en: {
    urgent: 'Urgent repairs and alterations ready in 1–2 hours', normal: 'Regular repairs and alterations ready the same day', custom: 'Custom tailoring: timing depends on the design and quantity',
    urgentShort: '1–2 Hours if Urgent', normalShort: 'Same-Day', customShort: 'Timing by Design',
    repairLine: 'Ready the same day; urgent jobs in 1–2 hours',
    all: 'Regular repairs and alterations are ready the same day and urgent jobs in 1–2 hours; for custom tailoring the timing depends on the design and quantity.',
  },
  ru: {
    urgent: 'Срочный ремонт и подгонка — за 1–2 часа', normal: 'Обычный ремонт и подгонка — готово в тот же день', custom: 'Индивидуальный пошив: срок зависит от модели и количества',
    urgentShort: 'Срочно — 1–2 часа', normalShort: 'В тот же день', customShort: 'Срок по модели',
    repairLine: 'Готово в тот же день; срочно — за 1–2 часа',
    all: 'Обычный ремонт и подгонка готовы в тот же день, срочные работы — за 1–2 часа; срок индивидуального пошива зависит от модели и количества.',
  },
  de: {
    urgent: 'Dringende Reparaturen und Änderungen in 1–2 Stunden fertig', normal: 'Normale Reparaturen und Änderungen am selben Tag fertig', custom: 'Maßanfertigung: Dauer je nach Modell und Stückzahl',
    urgentShort: 'Eilig in 1–2 Std.', normalShort: 'Am selben Tag', customShort: 'Dauer je nach Modell',
    repairLine: 'Am selben Tag fertig; dringend in 1–2 Stunden',
    all: 'Normale Reparaturen und Änderungen sind am selben Tag fertig, dringende Aufträge in 1–2 Stunden; bei Maßanfertigung richtet sich die Dauer nach Modell und Stückzahl.',
  },
  es: {
    urgent: 'Arreglos urgentes listos en 1–2 horas', normal: 'Arreglos normales listos el mismo día', custom: 'Confección a medida: el plazo depende del modelo y la cantidad',
    urgentShort: 'Urgente: 1–2 horas', normalShort: 'El mismo día', customShort: 'Plazo según modelo',
    repairLine: 'Listo el mismo día; urgencias en 1–2 horas',
    all: 'Los arreglos normales están listos el mismo día y los urgentes en 1–2 horas; en la confección a medida el plazo depende del modelo y la cantidad.',
  },
  fr: {
    urgent: 'Retouches urgentes prêtes en 1 à 2 heures', normal: 'Retouches normales prêtes le jour même', custom: 'Sur mesure : délai selon le modèle et la quantité',
    urgentShort: 'Urgent : 1 à 2 h', normalShort: 'Le jour même', customShort: 'Délai selon modèle',
    repairLine: 'Prêt le jour même ; urgences en 1 à 2 heures',
    all: 'Les retouches normales sont prêtes le jour même et les urgences en 1 à 2 heures ; pour le sur-mesure, le délai dépend du modèle et de la quantité.',
  },
  pl: {
    urgent: 'Pilne naprawy i przeróbki gotowe w 1–2 godziny', normal: 'Zwykłe naprawy i przeróbki gotowe tego samego dnia', custom: 'Szycie na miarę: termin zależy od modelu i liczby sztuk',
    urgentShort: 'Pilne: 1–2 godziny', normalShort: 'Tego samego dnia', customShort: 'Termin wg modelu',
    repairLine: 'Gotowe tego samego dnia; pilne w 1–2 godziny',
    all: 'Zwykłe naprawy i przeróbki są gotowe tego samego dnia, pilne w 1–2 godziny; przy szyciu na miarę termin zależy od modelu i liczby sztuk.',
  },
  uk: {
    urgent: 'Термінові ремонт і підгонка — за 1–2 години', normal: 'Звичайні ремонт і підгонка — готово того ж дня', custom: 'Індивідуальне пошиття: термін залежить від моделі та кількості',
    urgentShort: 'Терміново — 1–2 год', normalShort: 'Того ж дня', customShort: 'Термін за моделлю',
    repairLine: 'Готово того ж дня; терміново — за 1–2 години',
    all: 'Звичайні ремонт і підгонка готові того ж дня, термінові роботи — за 1–2 години; термін індивідуального пошиття залежить від моделі та кількості.',
  },
  nl: {
    urgent: 'Spoedreparaties en -vermaak klaar in 1–2 uur', normal: 'Gewone reparaties en vermaak dezelfde dag klaar', custom: 'Maatwerk: doorlooptijd hangt af van model en aantal',
    urgentShort: 'Spoed: 1–2 uur', normalShort: 'Dezelfde dag', customShort: 'Tijd per model',
    repairLine: 'Dezelfde dag klaar; spoed in 1–2 uur',
    all: 'Gewone reparaties en vermaak zijn dezelfde dag klaar, spoedklussen in 1–2 uur; bij maatwerk hangt de doorlooptijd af van model en aantal.',
  },
  ar: {
    urgent: 'الإصلاح والتعديل العاجل جاهز خلال ساعة إلى ساعتين', normal: 'الإصلاح والتعديل العادي جاهز في اليوم نفسه', custom: 'التفصيل حسب الطلب: المدة حسب الموديل والكمية',
    urgentShort: 'العاجل: 1–2 ساعة', normalShort: 'في اليوم نفسه', customShort: 'المدة حسب الموديل',
    repairLine: 'جاهز في اليوم نفسه؛ العاجل خلال ساعة إلى ساعتين',
    all: 'الإصلاحات والتعديلات العادية جاهزة في اليوم نفسه، والعاجلة خلال ساعة إلى ساعتين؛ أما التفصيل حسب الطلب فمدته حسب الموديل والكمية.',
  },
};
export const durationOf = (lang: DLang): DurationCopy => DURATION[lang] ?? DURATION.en;

// ── Servis kuralı metinleri (4 ana dil) ─────────────────────────────────────────────
export type SLang = 'tr' | 'en' | 'ru' | 'de';
export const SERVICE_RULE: Record<SLang, { hotelFree: string; homeFree: string; homeByArea: string; full: string }> = {
  tr: {
    hotelFree: 'Eve ve otele servis',
    homeFree: 'Eve ve otele servis',
    homeByArea: 'Eve ve otele servis',
    full: 'Hizmet verdiğimiz bölgelerde eve ve otele alım-teslim yapıyoruz; ayrıntı WhatsApp\'ta netleşir.',
  },
  en: {
    hotelFree: 'Service to homes and hotels',
    homeFree: 'Service to homes and hotels',
    homeByArea: 'Service to homes and hotels',
    full: 'We offer pick-up and delivery to homes and hotels in the areas we serve; details are confirmed on WhatsApp.',
  },
  ru: {
    hotelFree: 'Выезд на дом и в отель',
    homeFree: 'Выезд на дом и в отель',
    homeByArea: 'Выезд на дом и в отель',
    full: 'Мы забираем и доставляем вещи на дом и в отели в районах обслуживания; детали уточняются в WhatsApp.',
  },
  de: {
    hotelFree: 'Service zu Hause und im Hotel',
    homeFree: 'Service zu Hause und im Hotel',
    homeByArea: 'Service zu Hause und im Hotel',
    full: 'Wir holen Ihre Kleidung zu Hause oder im Hotel ab und bringen sie zurück; Einzelheiten klären wir per WhatsApp.',
  },
};

/** Sahip teyidi (Kasım 2026): otellerle ortaklık yok; Antalya'daki tüm otellere hizmet verilir. Otel listesi geçen her yerde bu cümle kullanılır. */
export const HOTEL_NOTE = {
  tr: "Bu otellerle ortaklığımız yoktur; Antalya'daki tüm otellere hizmet veriyoruz.",
  en: 'We are not partnered with these hotels; we serve all hotels in Antalya.',
  ru: 'Мы не являемся партнёрами этих отелей; мы обслуживаем все отели Антальи.',
  de: 'Wir sind keine Partner dieser Hotels; wir bedienen alle Hotels in Antalya.',
  es: 'No somos socios de estos hoteles; atendemos a todos los hoteles de Antalya.',
  fr: "Nous ne sommes pas partenaires de ces hôtels ; nous servons tous les hôtels d'Antalya.",
  pl: 'Nie jesteśmy partnerem tych hoteli; obsługujemy wszystkie hotele w Antalyi.',
  uk: 'Ми не є партнерами цих готелів; ми обслуговуємо всі готелі Анталії.',
  nl: 'Wij zijn geen partner van deze hotels; wij bedienen alle hotels in Antalya.',
  ar: 'لسنا شركاء لهذه الفنادق؛ نخدم جميع فنادق أنطاليا.',
} as const;
