// Fiyat tutarlılık kontrolü: kod, metin ve JSON-LD içindeki tutarları (₺, "N TL", "N lir/лир", €, "N €", price:) tarar.
// Kullanım: node scripts/fiyat-kontrol.mjs   (sorun varsa çıkış kodu 1)
// Kurallar (sahip kararı, Kasım 2026):
//  - Paça/bel/kol/boy ₺200 (€10), fermuar ₺300 (€15; mont/ceket/deri fermuarı €20), deri ₺400 (€20), kot ~₺200.
//  - Abiye/gelinlik/elbise TADİLATI için de sabit tutar YAZILMAZ (sahip kararı: "fotoğrafa veya işin detayına göre"); ₺800/€40 hiçbir yerde izinli değil.
//  - DİKİM tutarları (₺800/₺1000/₺20.000, €40/€50/€1000 ve JSON-LD karşılıkları) HİÇBİR yerde yazılamaz:
//    dikim işleri "fotoğrafa ve istediğiniz modele göre" fiyatlanır.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const TRY_OK = new Set([200, 300, 400, 20]); // 20 = yalnız kur notu (₺20 = €1) için
const EUR_OK = new Set([10, 15, 20, 1]);
const TADILAT_TRY = new Set([]);
const TADILAT_EUR = new Set([]);
const JSONLD_OK = new Set([200, 300, 400, 10, 15, 20]); // TRY 200/300/400 veya EUR 10/15/20 (dikim için sayısal fiyat YOK)
const TADILAT = /tadilat|tamir|alteration|alter\b|änderung|ändern|anpass|reparatur|переделк|подгонк|ремонт|arreglo|retouche|przeróbk|переробк|aanpass|vermaak|تعديل|gelinlik|abiye|evening|wedding|bridal|brautkleid|abendkleid/i;
const DIKIM = /dikim|diktir|sewing|dress ?making|nähen|пошив|confecci|couture|szycie|пошиття|maatwerk|خياطة|sew\b|tailoring from|groom suit|damatlık|bräutigam/i;
// Olumsuz ifadeler ("gelinlik dikimi yapılmaz", "no wedding dress sewing"...) dikim sayılmaz.
const NEG = /dikimi? (yapılmaz|yapmıyoruz)|(no|not|do not|don't|never) (wedding dress )?(sew|sewing)\w*( wedding dresses?)?|nähen keine? Brautkleid\w*|kein\w* Brautkleid-Nähen|nicht nähen|не шьём|пошив не делаем/gi;
const SKIP = /(^|\/)(node_modules|\.next|\.git|bal|ilan|api)(\/|$)|bal-icerik|fiyat-kontrol/;
const EXT = /\.(ts|tsx|txt|md|json)$/;

const N = '(\\d{1,3}(?:[.,]\\d{3})+|\\d+)';
const sayi = (s) => Number(s.replace(/[.,]/g, ''));
const bulgu = [];
function tara(dir) {
  for (const ad of readdirSync(dir)) {
    const yol = join(dir, ad);
    if (SKIP.test(yol)) continue;
    const st = statSync(yol);
    if (st.isDirectory()) { tara(yol); continue; }
    if (!EXT.test(ad) || /^docs\//.test(yol) || /package(-lock)?\.json|tsconfig/.test(ad)) continue;
    readFileSync(yol, 'utf8').split('\n').forEach((satir, i) => {
      // Tadilat izni tutarın bulunduğu CÜMLEYE bakar (satırın tamamına değil).
      let pencere = '';
      const ok = (n, set, tset) => set.has(n) || (tset.has(n) && TADILAT.test(pencere) && !DIKIM.test(pencere.replace(NEG, '')));
      const rapor = (tur, ham) => bulgu.push(`${yol}:${i + 1}  ${tur}${ham}`);
      const pen = (m) => {
        const once = satir.slice(0, m.index), sonra = satir.slice(m.index + m[0].length);
        const b = Math.max(once.lastIndexOf('. '), once.lastIndexOf('\n'), once.length - 160);
        const e = sonra.search(/\. |\.['"`]|$/);
        pencere = satir.slice(Math.max(0, b), m.index + m[0].length + (e < 0 ? 0 : Math.min(e, 120)));
      };
      for (const m of satir.matchAll(new RegExp('₺ ?' + N, 'g'))) if (pen(m), !ok(sayi(m[1]), TRY_OK, TADILAT_TRY)) rapor('₺', m[1]);
      for (const m of satir.matchAll(new RegExp('\\b' + N + ' ?(?:TL\\b|TRY\\b|₺|лир|lira|Lira)', 'g'))) if (pen(m), !ok(sayi(m[1]), TRY_OK, TADILAT_TRY)) rapor('TL ', m[1]);
      for (const m of satir.matchAll(new RegExp('€ ?' + N, 'g'))) if (pen(m), !ok(sayi(m[1]), EUR_OK, TADILAT_EUR)) rapor('€', m[1]);
      for (const m of satir.matchAll(new RegExp('\\b' + N + ' ?€', 'g'))) if (pen(m), !ok(sayi(m[1]), EUR_OK, TADILAT_EUR)) rapor('€ ', m[1]);
      for (const m of satir.matchAll(new RegExp('\\b' + N + ' ?(?:EUR|euro)\\b', 'gi'))) if (pen(m), !ok(sayi(m[1]), EUR_OK, TADILAT_EUR)) rapor('EUR ', m[1]);
      // JSON-LD sayısal fiyat: price / lowPrice / highPrice / minPrice / maxPrice
      for (const m of satir.matchAll(/["']?(?:price|lowPrice|highPrice|minPrice|maxPrice)["']?\s*:\s*["']?(\d[\d.,]*)["']?/g)) {
        const n = sayi(m[1]);
        if (!JSONLD_OK.has(n)) rapor('JSON-LD price ', m[1]);
      }
    });
  }
}
for (const d of ['app', 'components', 'lib', 'public']) { try { tara(d); } catch {} }

// llms.txt / llms-full.txt tutarlılığı: hizmet bölgesi lib/business.ts AREA_SERVED ile aynı olmalı, tek "Last updated" olmalı.
try {
  const biz = readFileSync('lib/business.ts', 'utf8');
  const alanlar = (biz.match(/AREA_SERVED = \[([^\]]+)\]/)?.[1] ?? '').split(',').map((x) => x.trim().replace(/['"]/g, '')).filter(Boolean);
  for (const f of ['public/llms.txt', 'public/llms-full.txt']) {
    const t = readFileSync(f, 'utf8');
    const satir = t.split('\n').find((l) => /Service area:|Visits and pickups cover/.test(l)) ?? '';
    for (const a of alanlar) if (!satir.includes(a === 'Side' ? 'Side' : a)) bulgu.push(`${f}  hizmet bölgesi satırında "${a}" yok (lib/business.ts AREA_SERVED ile aynı olmalı)`);
    for (const x of ['Kepez', 'Döşemealtı', 'Serik', 'Aksu']) if (satir.includes(x)) bulgu.push(`${f}  hizmet bölgesi satırında AREA_SERVED dışı "${x}" var`);
    const n = (t.match(/Last updated/g) ?? []).length;
    if (n !== 1) bulgu.push(`${f}  "Last updated" ${n} kez geçiyor (1 olmalı)`);
    if (/^## About swaphubs\.com\s*\n\s*\n(\*|##)/mi.test(t)) bulgu.push(`${f}  "About swaphubs.com" başlığı boş`);
  }
} catch (e) { bulgu.push('llms tutarlılık kontrolü çalışmadı: ' + e.message); }

if (bulgu.length) { console.log('Onaylı listede olmayan tutarlar (' + bulgu.length + '):\n' + bulgu.join('\n')); process.exit(1); }
console.log('Fiyat kontrolü temiz.');
