// ============================================================
// lib/kw-desc.ts — yabancı dil açıklamaları için anahtar kelimeli kalıp (sahibin isteği, 24 Kasım 2026)
// Sıra: sayfanın asıl işi + o dilde "terzi" + Antalya/bölge + tamir · tadilat · ölçüye özel dikim + tek ayırt edici.
// "2006'dan beri" ve çalışma saatleri açıklamaya yazılmaz (aranmayan bilgi). Başlıklar bu dosyadan etkilenmez.
// İki sitede aynı adresli sayfalar olduğu için site başına farklı kalıp (V) kullanılır; açıklamalar birebir aynı olmaz.
// Kurallar: kuru temizleme/ütü yok; "ücretsiz" yok; gelinlik dikimi yok; telefon yok.
// ============================================================
export type KLang = 'en' | 'de' | 'ru' | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
type V = 'a' | 'b';

const AREA: Record<KLang, Record<V, (a: string) => string>> = {
  en: {
    a: (a) => `Tailor in ${a}, Antalya: clothing repairs, alterations and made-to-measure for men and women. Hemming, zippers, evening dresses. Hotel pick-up.`,
    b: (a) => `${a}, Antalya tailor: alterations, clothing repairs and made-to-measure, men & women. Hems, zippers, dresses. Send a photo, get a price.`,
  },
  de: {
    a: (a) => `Schneider in ${a}, Antalya: Änderungsschneiderei, Reparatur und Maßanfertigung, Damen & Herren. Hose kürzen, Reißverschluss, Abendkleid. Abholung im Hotel.`,
    b: (a) => `Änderungsschneiderei für ${a}, Antalya: Kleidung ändern, reparieren und nach Maß nähen, Damen & Herren. Foto senden, Preis erhalten.`,
  },
  ru: {
    a: (a) => `Портной и ателье: ${a}, Анталья — ремонт, подгонка и пошив одежды для мужчин и женщин. Подшив, молнии, вечерние платья. Забор из отеля.`,
    b: (a) => `Ателье для района ${a} (Анталья): ремонт одежды, подгонка, пошив на заказ, мужская и женская одежда. Пришлите фото — назовём цену.`,
  },
  es: {
    a: (a) => `Sastre en ${a}, Antalya: arreglos de ropa, reparaciones y confección a medida, hombre y mujer. Bajos, cremalleras, vestidos de fiesta. Recogida en el hotel.`,
    b: (a) => `${a}, Antalya: sastre y costurera para arreglos, reparación de ropa y confección a medida. Envíe una foto y le damos el precio.`,
  },
  fr: {
    a: (a) => `Couturier à ${a}, Antalya : retouches, réparation de vêtements et sur-mesure pour homme et femme. Ourlets, fermetures, robes de soirée. Collecte à l'hôtel.`,
    b: (a) => `${a}, Antalya : couturier pour retouches, réparation de vêtements et couture sur mesure. Envoyez une photo, recevez le prix.`,
  },
  pl: {
    a: (a) => `Krawiec: ${a}, Antalya – przeróbki, naprawa odzieży i szycie na miarę dla kobiet i mężczyzn. Skracanie, zamki, suknie wieczorowe. Odbiór z hotelu.`,
    b: (a) => `${a}, Antalya: krawiec i krawcowa – przeróbki krawieckie, naprawa ubrań, szycie na miarę. Wyślij zdjęcie, podamy cenę.`,
  },
  uk: {
    a: (a) => `Кравець: ${a}, Анталія — ремонт, підгонка та пошиття одягу для жінок і чоловіків. Підшивання, блискавки, вечірні сукні. Забираємо з готелю.`,
    b: (a) => `Ательє для району ${a} (Анталія): ремонт одягу, підгонка, пошиття на замовлення. Надішліть фото — назвемо ціну.`,
  },
  nl: {
    a: (a) => `Kleermaker in ${a}, Antalya: kleding vermaken, repareren en op maat laten maken voor dames en heren. Zomen, ritsen, avondjurken. Ophalen bij het hotel.`,
    b: (a) => `${a}, Antalya: kleermaker voor vermaakwerk, kledingreparatie en maatwerk. Stuur een foto, ontvang de prijs.`,
  },
  ar: {
    a: (a) => `خياط في ${a}، أنطاليا: إصلاح الملابس وتعديلها وتفصيل حسب المقاس للرجال والنساء. تقصير، سحّابات، فساتين سهرة. استلام من الفندق.`,
    b: (a) => `${a}، أنطاليا: خياط لتعديل الملابس وإصلاحها والتفصيل حسب المقاس. أرسل صورة واعرف السعر.`,
  },
};

const SERVICE: Record<KLang, Record<V, (j: string) => string>> = {
  en: {
    a: (j) => `${j} in Antalya: tailor for clothing repairs, alterations and made-to-measure. Hotel pick-up, price by photo on WhatsApp.`,
    b: (j) => `${j} in Antalya by Terzi Can, tailor: repairs, alterations, made-to-measure for men and women. Send a photo, get a price.`,
  },
  de: {
    a: (j) => `${j} in Antalya: Änderungsschneiderei für Reparatur, Änderung und Maßanfertigung. Abholung im Hotel, Preis per Foto.`,
    b: (j) => `${j} in Antalya bei Terzi Can: Schneider für Änderungen, Reparaturen und Maßanfertigung, Damen & Herren. Foto senden, Preis erhalten.`,
  },
  ru: {
    a: (j) => `${j} в Анталье: ателье — ремонт, подгонка и пошив одежды. Забор из отеля, цена по фото в WhatsApp.`,
    b: (j) => `${j} в Анталье, ателье Terzi Can: ремонт, подгонка, пошив на заказ, мужская и женская одежда. Пришлите фото — назовём цену.`,
  },
  es: {
    a: (j) => `${j} en Antalya: sastre para arreglos, reparación de ropa y confección a medida. Recogida en el hotel, precio por foto.`,
    b: (j) => `${j} en Antalya con Terzi Can: sastre y costurera, arreglos, reparaciones y ropa a medida. Envíe una foto, le damos el precio.`,
  },
  fr: {
    a: (j) => `${j} à Antalya : couturier pour retouches, réparation de vêtements et sur-mesure. Collecte à l'hôtel, prix sur photo.`,
    b: (j) => `${j} à Antalya avec Terzi Can : retouches, réparations et couture sur mesure, homme et femme. Envoyez une photo, recevez le prix.`,
  },
  pl: {
    a: (j) => `${j} w Antalyi: krawiec – przeróbki, naprawa odzieży i szycie na miarę. Odbiór z hotelu, cena po zdjęciu.`,
    b: (j) => `${j} w Antalyi, Terzi Can: krawiec i krawcowa – przeróbki, naprawy, szycie na miarę. Wyślij zdjęcie, podamy cenę.`,
  },
  uk: {
    a: (j) => `${j} в Анталії: кравець — ремонт, підгонка та пошиття одягу. Забираємо з готелю, ціна за фото.`,
    b: (j) => `${j} в Анталії, ательє Terzi Can: ремонт, підгонка, пошиття на замовлення. Надішліть фото — назвемо ціну.`,
  },
  nl: {
    a: (j) => `${j} in Antalya: kleermaker voor vermaakwerk, kledingreparatie en maatwerk. Ophalen bij het hotel, prijs via foto.`,
    b: (j) => `${j} in Antalya bij Terzi Can: kleding vermaken, repareren en op maat laten maken. Stuur een foto, ontvang de prijs.`,
  },
  ar: {
    a: (j) => `${j} في أنطاليا: خياط لإصلاح الملابس وتعديلها والتفصيل حسب المقاس. استلام من الفندق، السعر بالصورة.`,
    b: (j) => `${j} في أنطاليا مع Terzi Can: تعديل وإصلاح وتفصيل حسب المقاس للرجال والنساء. أرسل صورة واعرف السعر.`,
  },
};

const isK = (l: string): l is KLang => l in AREA;

/** Bölge / otel bölgesi sayfası açıklaması. */
export function areaKwDesc(lang: string, area: string, v: V, fallback: string): string {
  return isK(lang) ? AREA[lang][v](area) : fallback;
}

// Otel bölgesi sayfaları (EN/DE/RU): aynı bölgenin bölge sayfasıyla aynı açıklama olmasın diye otele odaklı kalıp.
const HOTEL: Partial<Record<KLang, Record<V, (a: string) => string>>> = {
  en: {
    a: (a) => `Hotel tailor in ${a}, Antalya: pick-up from your hotel for clothing repairs, alterations and made-to-measure. Hems, zippers, evening dresses.`,
    b: (a) => `Staying in ${a}, Antalya? Tailor with hotel pick-up: alterations, repairs, made-to-measure for men & women. Send a photo, get a price.`,
  },
  de: {
    a: (a) => `Schneider fürs Hotel in ${a}, Antalya: Abholung im Hotel für Änderungen, Reparaturen und Maßanfertigung. Hose kürzen, Reißverschluss, Abendkleid.`,
    b: (a) => `Urlaub in ${a}, Antalya? Änderungsschneiderei mit Hotelabholung: ändern, reparieren, nach Maß nähen. Foto senden, Preis erhalten.`,
  },
  ru: {
    a: (a) => `Портной с выездом в отель: ${a}, Анталья — ремонт, подгонка и пошив одежды. Подшив, молнии, вечерние платья. Забираем вещи из отеля.`,
    b: (a) => `Отдыхаете: ${a}, Анталья? Ателье с забором из отеля — подгонка, ремонт, пошив на заказ. Пришлите фото — назовём цену.`,
  },
};

/** Otel bölgesi sayfası açıklaması (EN/DE/RU); diğer dillerde bölge kalıbı. */
export function hotelKwDesc(lang: string, area: string, v: V, fallback: string): string {
  const h = isK(lang) ? HOTEL[lang] : undefined;
  return h ? h[v](area) : areaKwDesc(lang, area, v, fallback);
}

// Başlık/H1'deki "Antalya'da" kısmını atıp işin adını bırakır (ör. "Acortar pantalones en Antalya" → "Acortar pantalones").
const AREA_TAIL = /\s*(?:[:·|]|\s[–—-]\s).*$/; // yalnız boşluklu tire ayırır (T-Shirt bozulmasın)
const LOC_RE: Record<KLang, RegExp> = {
  en: /\s+(?:in|for)\s+(?:Antalya|Konyaaltı).*$/i,
  de: /\s+in\s+(?:Antalya|Konyaaltı).*$/i,
  ru: /\s+в\s+(?:Анталь[ея]|Анталии|Коньяалты).*$/i,
  es: /\s+en\s+(?:Antalya|Konyaaltı).*$/i,
  fr: /\s+à\s+(?:Antalya|Konyaaltı).*$/i,
  pl: /\s+w\s+(?:Antaly[ai]|Antalyi|Konyaaltı).*$/i,
  uk: /\s+в\s+(?:Анталії|Коньяалти).*$/i,
  nl: /\s+in\s+(?:Antalya|Konyaaltı).*$/i,
  ar: /\s+في\s+(?:أنطاليا|كونيالتي).*$/,
};
export function jobName(lang: string, h: string): string {
  if (!isK(lang)) return h;
  return h.replace(LOC_RE[lang], '').replace(AREA_TAIL, '').trim();
}

/** Hizmet sayfası açıklaması; işin adı H1/ad alanından gelir. */
export function serviceKwDesc(lang: string, job: string, v: V, fallback: string): string {
  if (!isK(lang)) return fallback;
  const j = jobName(lang, job);
  return j ? SERVICE[lang][v](j) : fallback;
}

// ── Bölge sayfası: başlıktaki işler açıklamada da geçsin (sahibin isteği, 24 Kasım 2026) ─────────
// Başlıktan iş listesini çıkarır: "Schneider Gürsu: Mantel, Jacke, Jeans ändern" → "Mantel, Jacke, Jeans ändern".
// Fiyat/foto/otel gibi iş olmayan başlık kuyrukları için null döner (o zaman genel kalıp kullanılır).
const NOT_JOB = /foto|photo|fotoğraf|фото|preis|price|цена|fiyat|hotel|otel|отел|pick-up|abholung|забор|çağır|near me|nähe|рядом|whatsapp/i;
export function titleJobs(title: string): string | null {
  const t = title.replace(/\s*\|.*$/, '').trim();
  const i = t.search(/[:·]/);
  if (i < 0) return null;
  const j = t.slice(i + 1).trim().replace(/[.!?]+$/, '');
  if (!j || NOT_JOB.test(j) || j.length < 4) return null;
  return j;
}
// Başlıktaki Büyük Harfli iş adları cümle içinde küçük harfe çevrilir (Almancada isimler büyük harfle kalır).
const lowerFirst = (lang: string, s: string) => (lang === 'de' ? s : s.toLocaleLowerCase(lang === 'tr' ? 'tr-TR' : lang));

const AREA_JOBS: Partial<Record<KLang, Record<V, (a: string, j: string) => string>>> = {
  en: {
    a: (a, j) => `Tailor in ${a}, Antalya: ${j}. Clothing repairs, alterations and made-to-measure for men and women. Hotel pick-up.`,
    b: (a, j) => `${a}, Antalya tailor: ${j}; alterations, repairs and made-to-measure, men & women. Send a photo, get a price.`,
  },
  de: {
    a: (a, j) => `Schneider in ${a}, Antalya: ${j}. Reparatur, Änderung und Maßanfertigung, Damen & Herren. Abholung im Hotel.`,
    b: (a, j) => `Änderungsschneiderei für ${a}, Antalya: ${j}; ändern, reparieren, nach Maß nähen. Foto senden, Preis erhalten.`,
  },
  ru: {
    a: (a, j) => `Портной и ателье: ${a}, Анталья — ${j}. Ремонт, подгонка и пошив одежды для мужчин и женщин. Забор из отеля.`,
    b: (a, j) => `Ателье для района ${a} (Анталья): ${j}; ремонт, подгонка, пошив на заказ. Пришлите фото — назовём цену.`,
  },
};

/** EN/DE/RU bölge sayfası: başlıktaki işler + genel üçlü; iş yoksa genel bölge kalıbı. */
export function areaJobsDesc(lang: string, area: string, title: string, v: V, fallback: string): string {
  const j = titleJobs(title);
  const f = isK(lang) ? AREA_JOBS[lang] : undefined;
  return j && f ? f[v](area, lowerFirst(lang, j)) : areaKwDesc(lang, area, v, fallback);
}

/** Türkçe bölge sayfası: "Lara'da terzi: abiye, elbise, askı boyu ayarı. Tamir, tadilat ve özel dikim…" */
export function trAreaJobsDesc(loc: string, title: string, v: V, fallback: string): string {
  const j = titleJobs(title);
  if (!j) return fallback;
  const jl = lowerFirst('tr', j);
  const trio = (/tamir/i.test(jl) ? 1 : 0) + (/tadilat/i.test(jl) ? 1 : 0) + (/dikim/i.test(jl) ? 1 : 0);
  const mid = trio >= 2 ? 'Bay bayan kıyafetleri, paça ₺200\'den, fermuar ₺300\'den.' : 'Tamir, tadilat ve özel dikim, bay bayan. Paça ₺200\'den, fermuar ₺300\'den.';
  const end = v === 'a' ? 'Otele ve eve servis.' : 'Fotoğraf gönderin, fiyatı söyleyelim.';
  return `${loc} terzi: ${jl}. ${mid} ${end}`;
}
