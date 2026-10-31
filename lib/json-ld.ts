// ============================================================
// lib/json-ld.ts — JSON-LD'yi <script> içine güvenle basmak için ortak yardımcı.
// DB'den gelen metinlerde (ürün adı, açıklama, yorum) "</script>" gibi diziler script etiketini
// erken kapatıp HTML enjeksiyonuna yol açabilir. "<", ">", "&" ve U+2028/2029 unicode kaçışına çevrilir;
// JSON anlamı değişmez.
// ============================================================
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
