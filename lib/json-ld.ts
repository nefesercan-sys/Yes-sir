// ============================================================
// lib/json-ld.ts — JSON-LD'yi <script> içine güvenle basmak için ortak yardımcı.
// DB'den gelen metinlerde (ürün adı, açıklama, yorum) "</script>" gibi diziler script etiketini
// erken kapatıp HTML enjeksiyonuna yol açabilir. "<", ">", "&" ve U+2028/2029 unicode kaçışına çevrilir;
// JSON anlamı değişmez.
// ============================================================
import { BUSINESS, BUSINESS_ID, businessCore } from '@/lib/business';

// ── İşletme düğümü birleştirme ─────────────────────────────────────────────────
// Sayfalar kendi '#business' @id'lerini ve elle yazılmış LocalBusiness düğümlerini üretse bile çıktı tek varlığa
// (BUSINESS_ID) ve ortak çekirdeğe (ad, priceRange, ödeme, saat, bölgeler, iletişim, sameAs) indirgenir.
const hasType = (n: Record<string, unknown>, t: string) => {
  const ty = n['@type'];
  return Array.isArray(ty) ? ty.includes(t) : ty === t;
};
function unifyBusiness(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(unifyBusiness);
  if (!node || typeof node !== 'object') return node;
  const o = { ...(node as Record<string, unknown>) };
  for (const k of Object.keys(o)) o[k] = unifyBusiness(o[k]);
  const id = typeof o['@id'] === 'string' ? (o['@id'] as string) : '';
  const isBizType = hasType(o, 'LocalBusiness') || hasType(o, 'ClothingStore');
  const name = typeof o.name === 'string' ? o.name : '';
  const ours = /terzi/i.test(name) || id.endsWith('#business');
  if (id.endsWith('#business') && id !== BUSINESS_ID && !id.startsWith('https://terzihizmeti.com.tr')) o['@id'] = BUSINESS_ID;
  if (isBizType && ours && o['@id'] !== BUSINESS_ID && !id) o['@id'] = BUSINESS_ID;
  if (isBizType && ours && o['@id'] === BUSINESS_ID) {
    if ('name' in o) o.name = BUSINESS.name;
    if (o.address) {
      const alt = new Set<string>([...BUSINESS.alternateName, ...(Array.isArray(o.alternateName) ? (o.alternateName as string[]) : typeof o.alternateName === 'string' ? [o.alternateName] : [])]);
      const core = businessCore();
      Object.assign(o, core, { alternateName: [...alt] });
    }
  }
  return o;
}

export function jsonLdString(data: unknown): string {
  return JSON.stringify(unifyBusiness(data))
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/** FAQPage şeması — görünür SSS ile AYNI dizi kullanılsın (tek kaynak): sayfada `const FAQ = [[soru, cevap], ...]`, hem <details> hem bu fonksiyon FAQ'dan beslenir. */
export function faqPageSchema(items: ReadonlyArray<readonly [string, string]>) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}
