// description alanını arama sonuçlarında kesilmemesi için en çok `max` karakterde tutar.
// Önce sondaki "☎ telefon" kısmı atılır; hâlâ uzunsa son tam cümleye (yoksa kelimeye) kadar kısaltılır.
/** Açıklamanın sonundaki "☎ numara" ekini başa alır ("☎ numara · metin"): arama sonucunda kesilse bile numara görünür. */
export function phoneFirst(s: string): string {
  const t = s.trim();
  const m = /^([\s\S]*?)\s*☎\s*(\+?\d[\d ]{9,18}\d)\s*\.?$/.exec(t);
  if (!m || !m[1].trim() || m[1].includes('☎')) return t;
  return `☎ ${m[2]} · ${m[1].trim()}`;
}

export function fitDesc(s: string, max = 155): string {
  let t = phoneFirst(s);
  if (t.length <= max) return t;
  // numara baştaysa (☎ numara · metin) korunur; yalnızca metin kısmı kısaltılır
  const lead = /^(☎[^·]{6,24}·\s*)([\s\S]+)$/.exec(t);
  if (lead) return lead[1] + fitDesc(lead[2], max - lead[1].length);
  t = t.replace(/\s*☎.*$/, '').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sentence = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '));
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1).trim();
  return cut.replace(/[\s,.;:–-]+\S*$/, '').trim() + '.';
}
