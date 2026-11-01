// Fiyat tutarlılık kontrolü: kod içindeki ₺ ve € tutarlarını tarar, onaylı listede olmayanları raporlar.
// Kullanım: node scripts/fiyat-kontrol.mjs   (sorun varsa çıkış kodu 1)
// Onaylı fiyatlar (sahip kararı, Kasım 2026): lib/business.ts PRICE_FROM ve lib/facts.ts ile aynı olmalı.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const TRY_OK = new Set([200, 300, 800, 1000, 20000, 20]); // 20 = yalnız kur notu (₺20 = €1) için
const EUR_OK = new Set([10, 15, 20, 30, 40, 50, 1000, 1]);
const SKIP = /(^|\/)(node_modules|\.next|\.git|bal|ilan|api)(\/|$)|bal-icerik|fiyat-kontrol/;
const EXT = /\.(ts|tsx|txt|md)$/;

const N = '(\\d{1,3}(?:[.,]\\d{3})+|\\d+)';
const sayi = (s) => Number(s.replace(/[.,]/g, ''));
const bulgu = [];
function tara(dir) {
  for (const ad of readdirSync(dir)) {
    const yol = join(dir, ad);
    if (SKIP.test(yol)) continue;
    const st = statSync(yol);
    if (st.isDirectory()) { tara(yol); continue; }
    if (!EXT.test(ad) || /^docs\//.test(yol)) continue;
    readFileSync(yol, 'utf8').split('\n').forEach((satir, i) => {
      for (const m of satir.matchAll(new RegExp('₺ ?' + N, 'g'))) if (!TRY_OK.has(sayi(m[1]))) bulgu.push(`${yol}:${i + 1}  ₺${m[1]}`);
      for (const m of satir.matchAll(new RegExp('€ ?' + N, 'g'))) if (!EUR_OK.has(sayi(m[1]))) bulgu.push(`${yol}:${i + 1}  €${m[1]}`);
    });
  }
}
for (const d of ['app', 'components', 'lib', 'public']) { try { tara(d); } catch {} }
if (bulgu.length) { console.log('Onaylı listede olmayan tutarlar:\n' + bulgu.join('\n')); process.exit(1); }
console.log('Fiyat kontrolü temiz.');
