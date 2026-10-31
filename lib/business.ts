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
export const BUSINESS_ID = `${SITE_URL}/terzi#business`;
export const waUrl = (text?: string) => `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/** Hizmet verilen bölgeler (schema.org areaServed ve metinler için tek liste). */
export const AREA_SERVED = ['Konyaaltı', 'Muratpaşa', 'Lara', 'Belek', 'Side', 'Manavgat', 'Kemer', 'Antalya'] as const;

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
  priceRange: '$$',
  languages: ['tr', 'en', 'ru', 'de', 'pl', 'uk', 'nl', 'fr', 'es', 'ar'],
  currencies: 'TRY, EUR, USD, RUB',
  payments: 'Cash, Credit Card, Bank Transfer',
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
  sameAs: [MAPS_URL, 'https://terzihizmeti.com.tr'],
} as const;

/** schema.org areaServed düğümleri (tek işletme varlığında kullanılır). */
export const areaServedSchema = () => AREA_SERVED.map((name) => ({ '@type': name === 'Antalya' ? 'City' : 'Place', name }));

// ── Fiyat başlangıçları (₺) — yalnızca sitede zaten yayınlanan rakamlar ────────────
export const PRICE_FROM = {
  paca: 200,
  bel: 200,
  fermuar: 300,
  elbiseDikim: 800,
  gelinlik: 800,
  abiye: 800,
} as const;

// ── Ücretsiz servis kuralı ─────────────────────────────────────────────────────────
// 1) OTELLER: hizmet verilen tüm otel bölgelerinde (Konyaaltı, Lara, Güzeloba, Kundu, Belek, Side/Manavgat, Kemer…)
//    otele alım-teslim ÜCRETSİZDİR.
// 2) EV ADRESLERİ: yalnızca aşağıdaki Konyaaltı ve yakın mahallelerde ücretsiz; diğer adreslerde ücret bölgeye göre
//    WhatsApp'ta netleşir. Liste işletme sahibinin onayladığı Ekim 2026 listesidir. Meltem idari olarak Muratpaşa'ya
//    bağlıdır ancak Konyaaltı sınırında olduğu ve onaylı listede yer aldığı için korunmuştur.
export const HOTEL_SERVICE_FREE = true;
export const FREE_SERVICE_SLUGS = [
  'konyaalti', 'hurma', 'sarisu', 'liman', 'uncali', 'altinkum', 'ogretmenevleri', 'siteler', 'arapsuyu', 'gursu', 'uluc', 'meltem',
] as const;
export const isFreeService = (slug: string): boolean => (FREE_SERVICE_SLUGS as readonly string[]).includes(slug);

// ── Teslim süreleri (TEK KAYNAK, 10 dil) ───────────────────────────────────────────
// ACİL tamir/tadilat: 1–2 saat · NORMAL tamir/tadilat: ertesi gün teslim · ÖZEL DİKİM: modele ve adede göre (gün yazılmaz).
export type DLang = 'tr' | 'en' | 'ru' | 'de' | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
export interface DurationCopy {
  urgent: string;      // "Acil tamir ve tadilat: 1–2 saat"
  normal: string;      // "Normal tamir ve tadilat: ertesi gün teslim"
  custom: string;      // "Özel dikim: süre modele ve adede göre"
  urgentShort: string; // başlık/rozet için kısa
  normalShort: string;
  customShort: string;
  repairLine: string;  // tamir/tadilat hizmeti için tek cümle (normal + acil)
  all: string;         // üçünü birlikte anlatan tek cümle
}
export const DURATION: Record<DLang, DurationCopy> = {
  tr: {
    urgent: 'Acil tamir ve tadilat 1–2 saatte hazır', normal: 'Normal tamir ve tadilat ertesi gün teslim', custom: 'Özel dikimde süre modele ve adede göre belirlenir',
    urgentShort: 'Acilse 1–2 Saat', normalShort: 'Ertesi Gün Teslim', customShort: 'Süre Modele Göre',
    repairLine: 'Ertesi gün teslim; acil işler 1–2 saatte hazır',
    all: 'Normal tamir ve tadilat ertesi gün teslim edilir, acil işler 1–2 saatte hazırlanır; özel dikimde süre modele ve adede göre belirlenir.',
  },
  en: {
    urgent: 'Urgent repairs and alterations ready in 1–2 hours', normal: 'Regular repairs and alterations ready the next day', custom: 'Custom tailoring: timing depends on the design and quantity',
    urgentShort: '1–2 Hours if Urgent', normalShort: 'Next-Day', customShort: 'Timing by Design',
    repairLine: 'Ready the next day; urgent jobs in 1–2 hours',
    all: 'Regular repairs and alterations are ready the next day and urgent jobs in 1–2 hours; for custom tailoring the timing depends on the design and quantity.',
  },
  ru: {
    urgent: 'Срочный ремонт и подгонка — за 1–2 часа', normal: 'Обычный ремонт и подгонка — готово на следующий день', custom: 'Индивидуальный пошив: срок зависит от модели и количества',
    urgentShort: 'Срочно — 1–2 часа', normalShort: 'На следующий день', customShort: 'Срок по модели',
    repairLine: 'Готово на следующий день; срочно — за 1–2 часа',
    all: 'Обычный ремонт и подгонка готовы на следующий день, срочные работы — за 1–2 часа; срок индивидуального пошива зависит от модели и количества.',
  },
  de: {
    urgent: 'Dringende Reparaturen und Änderungen in 1–2 Stunden fertig', normal: 'Normale Reparaturen und Änderungen am nächsten Tag fertig', custom: 'Maßanfertigung: Dauer je nach Modell und Stückzahl',
    urgentShort: 'Eilig in 1–2 Std.', normalShort: 'Am nächsten Tag', customShort: 'Dauer je nach Modell',
    repairLine: 'Am nächsten Tag fertig; dringend in 1–2 Stunden',
    all: 'Normale Reparaturen und Änderungen sind am nächsten Tag fertig, dringende Aufträge in 1–2 Stunden; bei Maßanfertigung richtet sich die Dauer nach Modell und Stückzahl.',
  },
  es: {
    urgent: 'Arreglos urgentes listos en 1–2 horas', normal: 'Arreglos normales listos al día siguiente', custom: 'Confección a medida: el plazo depende del modelo y la cantidad',
    urgentShort: 'Urgente: 1–2 horas', normalShort: 'Al día siguiente', customShort: 'Plazo según modelo',
    repairLine: 'Listo al día siguiente; urgencias en 1–2 horas',
    all: 'Los arreglos normales están listos al día siguiente y los urgentes en 1–2 horas; en la confección a medida el plazo depende del modelo y la cantidad.',
  },
  fr: {
    urgent: 'Retouches urgentes prêtes en 1 à 2 heures', normal: 'Retouches normales prêtes le lendemain', custom: 'Sur mesure : délai selon le modèle et la quantité',
    urgentShort: 'Urgent : 1 à 2 h', normalShort: 'Le lendemain', customShort: 'Délai selon modèle',
    repairLine: 'Prêt le lendemain ; urgences en 1 à 2 heures',
    all: 'Les retouches normales sont prêtes le lendemain et les urgences en 1 à 2 heures ; pour le sur-mesure, le délai dépend du modèle et de la quantité.',
  },
  pl: {
    urgent: 'Pilne naprawy i przeróbki gotowe w 1–2 godziny', normal: 'Zwykłe naprawy i przeróbki gotowe następnego dnia', custom: 'Szycie na miarę: termin zależy od modelu i liczby sztuk',
    urgentShort: 'Pilne: 1–2 godziny', normalShort: 'Następnego dnia', customShort: 'Termin wg modelu',
    repairLine: 'Gotowe następnego dnia; pilne w 1–2 godziny',
    all: 'Zwykłe naprawy i przeróbki są gotowe następnego dnia, pilne w 1–2 godziny; przy szyciu na miarę termin zależy od modelu i liczby sztuk.',
  },
  uk: {
    urgent: 'Термінові ремонт і підгонка — за 1–2 години', normal: 'Звичайні ремонт і підгонка — готово наступного дня', custom: 'Індивідуальне пошиття: термін залежить від моделі та кількості',
    urgentShort: 'Терміново — 1–2 год', normalShort: 'Наступного дня', customShort: 'Термін за моделлю',
    repairLine: 'Готово наступного дня; терміново — за 1–2 години',
    all: 'Звичайні ремонт і підгонка готові наступного дня, термінові роботи — за 1–2 години; термін індивідуального пошиття залежить від моделі та кількості.',
  },
  nl: {
    urgent: 'Spoedreparaties en -vermaak klaar in 1–2 uur', normal: 'Gewone reparaties en vermaak de volgende dag klaar', custom: 'Maatwerk: doorlooptijd hangt af van model en aantal',
    urgentShort: 'Spoed: 1–2 uur', normalShort: 'Volgende dag', customShort: 'Tijd per model',
    repairLine: 'De volgende dag klaar; spoed in 1–2 uur',
    all: 'Gewone reparaties en vermaak zijn de volgende dag klaar, spoedklussen in 1–2 uur; bij maatwerk hangt de doorlooptijd af van model en aantal.',
  },
  ar: {
    urgent: 'الإصلاح والتعديل العاجل جاهز خلال ساعة إلى ساعتين', normal: 'الإصلاح والتعديل العادي جاهز في اليوم التالي', custom: 'التفصيل حسب الطلب: المدة حسب الموديل والكمية',
    urgentShort: 'العاجل: 1–2 ساعة', normalShort: 'في اليوم التالي', customShort: 'المدة حسب الموديل',
    repairLine: 'جاهز في اليوم التالي؛ العاجل خلال ساعة إلى ساعتين',
    all: 'الإصلاحات والتعديلات العادية جاهزة في اليوم التالي، والعاجلة خلال ساعة إلى ساعتين؛ أما التفصيل حسب الطلب فمدته حسب الموديل والكمية.',
  },
};
export const durationOf = (lang: DLang): DurationCopy => DURATION[lang] ?? DURATION.en;

// ── Servis kuralı metinleri (4 ana dil) ─────────────────────────────────────────────
export type SLang = 'tr' | 'en' | 'ru' | 'de';
export const SERVICE_RULE: Record<SLang, { hotelFree: string; homeFree: string; homeByArea: string; full: string }> = {
  tr: {
    hotelFree: 'Otellere servis ücretsiz',
    homeFree: 'Konyaaltı ve yakın mahallelerde eve servis ücretsiz',
    homeByArea: "Ev adreslerinde servis ücreti bölgeye göre WhatsApp'ta netleşir",
    full: "Hizmet verdiğimiz tüm otel bölgelerinde otele servis ücretsizdir; ev adreslerine servis Konyaaltı ve yakın mahallelerde ücretsiz, diğer adreslerde bölgeye göre WhatsApp'ta netleşir.",
  },
  en: {
    hotelFree: 'Free service to hotels',
    homeFree: 'Free home service in Konyaaltı and nearby',
    homeByArea: 'Home pick-up fee depends on the area, confirmed on WhatsApp',
    full: 'Service to hotels is free in every hotel area we cover; home pick-up is free in Konyaaltı and nearby neighbourhoods and priced by area elsewhere, confirmed on WhatsApp.',
  },
  ru: {
    hotelFree: 'Выезд в отели бесплатно',
    homeFree: 'Выезд на дом в Коньяалты и рядом бесплатно',
    homeByArea: 'Выезд на дом — по району, уточняется в WhatsApp',
    full: 'Выезд в отели бесплатный во всех отельных районах, где мы работаем; выезд на дом бесплатный в Коньяалты и соседних кварталах, в остальных районах стоимость уточняется в WhatsApp.',
  },
  de: {
    hotelFree: 'Hotelservice kostenlos',
    homeFree: 'Hausservice in Konyaaltı und Umgebung kostenlos',
    homeByArea: 'Hausabholung je nach Gebiet, per WhatsApp geklärt',
    full: 'Der Service zu Hotels ist in allen von uns bedienten Hotelgebieten kostenlos; die Abholung zu Hause ist in Konyaaltı und Umgebung kostenlos, anderswo je nach Gebiet per WhatsApp geklärt.',
  },
};
