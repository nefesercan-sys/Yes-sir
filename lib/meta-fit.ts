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
