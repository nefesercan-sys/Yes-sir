// description alanını arama sonuçlarında kesilmemesi için en çok `max` karakterde tutar.
// Önce sondaki "☎ telefon" kısmı atılır; hâlâ uzunsa son tam cümleye (yoksa kelimeye) kadar kısaltılır.
/** "Terziye sor" çağrısı: açıklamanın başında numaradan önce yazılır (dile göre). */
export const ASK: Record<string, string> = {
  tr: 'Terziye sor', en: 'Ask the tailor', de: 'Schneider fragen', ru: 'Спросите в ателье', es: 'Pregunte al sastre',
  fr: 'Demandez au tailleur', pl: 'Zapytaj krawca', uk: 'Запитайте кравця', nl: 'Vraag de kleermaker', ar: 'اسأل الخياط',
};
const ASK_ALT = Object.values(ASK).join('|');
const PHONE_RE = new RegExp(`(?:(?:${ASK_ALT})\\s*:\\s*)?(?:☎\\s*)?(?:\\+90|0)\\s?531\\s?898\\s?64\\s?18`, 'g');
/** Açıklamadan telefon numarasını ve "Terziye sor:" çağrısını çıkarır (numara sayfada ve işletme şemasında var). */
export function stripPhone(s: string): string {
  return s
    .replace(PHONE_RE, ' ')
    .replace(/☎/g, ' ')
    .replace(/(?:\s*·\s*){2,}/g, ' · ')
    .replace(/^\s*[·:,–-]\s*/, '')
    .replace(/\s*[·:,–-]\s*$/, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/ ([,.;])/g, '$1')
    .trim();
}

/** Eski adı korunur: numara artık açıklamaya yazılmaz. */
export function phoneFirst(s: string, _lang?: string): string {
  return stripPhone(s);
}

/** Eski adı korunur: açıklamaya numara eklenmez, varsa çıkarılır. */
export function withAsk(desc: string, _lang?: string, _phone?: string): string {
  return stripPhone(desc);
}

export function fitDesc(s: string, max = 155, lang?: string): string {
  let t = stripPhone(s);
  if (t.length <= max) return t;
  t = t.replace(/\s*☎.*$/, '').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sentence = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '));
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1).trim();
  return cut.replace(/[\s,.;:–-]+\S*$/, '').trim() + '.';
}

/** Arama sonucunda görünsün diye (sahip isteği, 26 Kasım 2026): açıklamada fotoğraf/resim bilgisi yoksa
 *  ilk cümleden sonra o dilde "Fotoğraf gönderin, fiyat alın" eklenir; sığmazsa sondaki cümleler kısalır. 10 dil. */
export const RESIM_FIYAT = 'Resim gönder, fiyat al.';
export const PHOTO_PRICE: Record<string, string> = {
  tr: RESIM_FIYAT, en: 'Send a photo, get a price.', ru: 'Пришлите фото — назовём цену.', de: 'Foto senden, Preis erhalten.',
  es: 'Envíe una foto y le damos el precio.', fr: 'Envoyez une photo, recevez un prix.', pl: 'Wyślij zdjęcie, poznaj cenę.',
  uk: 'Надішліть фото — назвемо ціну.', nl: 'Stuur een foto, krijg een prijs.', ar: 'أرسل صورة واحصل على السعر.',
};
const PHOTO_RE: Record<string, RegExp> = {
  tr: /fotoğraf|resim/i, en: /photo/i, ru: /фото/i, de: /foto/i, es: /foto/i, fr: /photo/i, pl: /zdję/i, uk: /фото/i, nl: /foto/i, ar: /صور/,
};
export function photoPrice(s: string, lang: string = 'tr', max?: number): string {
  const add = PHOTO_PRICE[lang]; const re = PHOTO_RE[lang];
  const t = stripPhone(s);
  const fitted = fitDesc(t, max, lang);
  if (!add || !re || re.test(fitted)) return fitted; // kısaltılmış hâlde de görünüyorsa dokunma
  const m = t.match(/^[^.!?؟]{10,95}[.!?؟](?=\s)/);
  const out = fitDesc((m ? `${m[0]} ${add} ${t.slice(m[0].length).trim()}` : `${add} ${t}`).trim(), max, lang);
  if ([...out].length >= [...add].length + 40) return out;
  // ilk cümle çok uzunsa: asıl metin kısaltılır, fotoğraf cümlesi sona eklenir (açıklama yalnızca bu cümleden ibaret kalmasın)
  const lim = (max ?? 155) - [...add].length - 1;
  let base = fitDesc(t, lim, lang);
  if ([...t].length > lim) base = base.replace(/\s+\S{1,2}\.$/, '.'); // kesildiyse sonda tek başına kalan kısa kelime atılır
  return `${base} ${add}`;
}
/** Eski ad: yalnızca Türkçe. */
export function resimFiyat(s: string, max?: number): string {
  return photoPrice(s, 'tr', max);
}
