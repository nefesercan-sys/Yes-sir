// description alanını arama sonuçlarında kesilmemesi için en çok `max` karakterde tutar.
// Önce sondaki "☎ telefon" kısmı atılır; hâlâ uzunsa son tam cümleye (yoksa kelimeye) kadar kısaltılır.
export function fitDesc(s: string, max = 155): string {
  let t = s.trim();
  if (t.length <= max) return t;
  t = t.replace(/\s*☎.*$/, '').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sentence = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '));
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1).trim();
  return cut.replace(/[\s,.;:–-]+\S*$/, '').trim() + '.';
}
