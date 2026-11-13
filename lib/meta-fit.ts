// description alanını arama sonuçlarında kesilmemesi için en çok `max` karakterde tutar.
// Önce sondaki "☎ telefon" kısmı atılır; hâlâ uzunsa son tam cümleye (yoksa kelimeye) kadar kısaltılır.
/** "Terziye sor" çağrısı: açıklamanın başında numaradan önce yazılır (dile göre). */
export const ASK: Record<string, string> = {
  tr: 'Terziye sor', en: 'Ask the tailor', de: 'Schneider fragen', ru: 'Спросите в ателье', es: 'Pregunte al sastre',
  fr: 'Demandez au tailleur', pl: 'Zapytaj krawca', uk: 'Запитайте кравця', nl: 'Vraag de kleermaker', ar: 'اسأل الخياط',
};
/** Açıklamanın sonundaki "☎ numara" ekini başa alır: "Terziye sor: numara · metin" (dil verilmezse "☎ numara · metin"). */
export function phoneFirst(s: string, lang?: string): string {
  const t = s.trim();
  const m = /^([\s\S]*?)\s*☎\s*(\+?\d[\d ]{9,18}\d)\s*\.?$/.exec(t);
  if (!m || !m[1].trim() || m[1].includes('☎')) return t;
  const pre = lang && ASK[lang] ? `${ASK[lang]}:` : '☎';
  return `${pre} ${m[2]} · ${m[1].trim()}`;
}

/** Açıklamada numara yoksa başına "Terziye sor: numara · " ekler (dile göre); zaten varsa dokunmaz. */
export function withAsk(desc: string, lang: string, phone = '+90 531 898 64 18'): string {
  const d = desc.trim();
  if (!ASK[lang] || /\+90 ?531|0531 ?898|☎/.test(d)) return d;
  return `${ASK[lang]}: ${phone} · ${d}`;
}

export function fitDesc(s: string, max = 155, lang?: string): string {
  let t = phoneFirst(s, lang);
  if (t.length <= max) return t;
  // numara baştaysa (☎ numara · metin) korunur; yalnızca metin kısmı kısaltılır
  const lead = /^((?:☎|[^\d:·]{3,40}:)\s*\+?\d[\d ]{9,18}\d\s*·\s*)([\s\S]+)$/.exec(t);
  if (lead) return lead[1] + fitDesc(lead[2], max - lead[1].length);
  t = t.replace(/\s*☎.*$/, '').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sentence = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '));
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1).trim();
  return cut.replace(/[\s,.;:–-]+\S*$/, '').trim() + '.';
}
