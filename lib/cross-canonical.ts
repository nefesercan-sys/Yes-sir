// ============================================================
// lib/cross-canonical.ts — terzihizmeti.com.tr'ye cross-domain canonical
// İşletme sahibinin kararı: terzi aramalarında ana site terzihizmeti.com.tr. swaphubs'ta, kardeş sitede
// AYNI DİL + AYNI NİYET + AYNI KONU (aynı bölge/hizmet) karşılığı birebir bulunan sayfalar canonical'ı oraya verir.
// Doğrulama (Ekim 2026, nefesercan-sys/terzi-hizmeti/app): aşağıdaki yolların hepsi kardeş sitede aynı yol ile var:
//   /en/hotel-tailor-antalya (+[region]), /de/schneider-service-hotel-antalya (+[region]), /ru/vyezdnoy-portnoy-antalya (+[region])
//     → kardeş sitenin otel-bolgeleri listesi swaphubs'takini (belek, lara, guzeloba, side, kemer) kapsıyor
//   /en/tailor-antalya/[bolge], /de/schneider-antalya/[bolge], /ru/portnoy-antalya/[bolge] → aynı DISTRICTS slug listesi
//   /en/tailor-services (+[hizmet]), /de/schneider-leistungen (+[hizmet]), /ru/uslugi-portnogo (+[hizmet]) → aynı SERVICES slug'ları
//   /en/contact-tailor-antalya, /de/kontakt-schneider-antalya, /ru/kontakty-portnoy-antalya
// NOT: /en/tailor-antalya, /de/schneider-antalya, /ru/portnoy-antalya kök yolları iki sitede de sayfa değildir (yalnız [bolge]).
// Bu sayfalarda hreflang kümesi kaldırılır (canonical başka sitedeyken hreflang çelişki yaratır); Türkçe karşılıkları
// ve swaphubs'a özgü rehber sayfaları swaphubs'ta indexlenebilir kalır.
// ============================================================
import { DISTRICTS, SERVICES } from '@/lib/seo-data';
import { OTEL_BOLGELERI } from '@/lib/otel-bolgeleri';

export const TZ_SITE = 'https://terzihizmeti.com.tr';

const HOTEL = ['/en/hotel-tailor-antalya', '/de/schneider-service-hotel-antalya', '/ru/vyezdnoy-portnoy-antalya'];
const DISTRICT = ['/en/tailor-antalya', '/de/schneider-antalya', '/ru/portnoy-antalya'];
const SERVICE: Record<'en' | 'de' | 'ru', string> = { en: '/en/tailor-services', de: '/de/schneider-leistungen', ru: '/ru/uslugi-portnogo' };
const CONTACT = ['/en/contact-tailor-antalya', '/de/kontakt-schneider-antalya', '/ru/kontakty-portnoy-antalya'];

/** Kardeş sitede birebir karşılığı doğrulanmış swaphubs yolları. */
export const CROSS_CANONICAL_PATHS: ReadonlySet<string> = new Set<string>([
  ...HOTEL,
  ...HOTEL.flatMap((b) => OTEL_BOLGELERI.map((r) => `${b}/${r.slug}`)),
  ...DISTRICT.flatMap((b) => DISTRICTS.map((d) => `${b}/${d.slug}`)),
  ...Object.values(SERVICE),
  ...(Object.keys(SERVICE) as ('en' | 'de' | 'ru')[]).flatMap((l) => SERVICES.map((s) => `${SERVICE[l]}/${s.slug[l]}`)),
  ...CONTACT,
]);

/** swaphubs yolu için kardeş sitedeki canonical URL (yoksa null). */
export function crossCanonical(path: string): string | null {
  const p = path.replace(/\/$/, '');
  return CROSS_CANONICAL_PATHS.has(p) ? `${TZ_SITE}${p}` : null;
}

/** Next.js metadata.alternates: karşılığı varsa yalnız cross-domain canonical (hreflang yok), yoksa verilen değer. */
export function alternatesWithCross<T extends { canonical?: string }>(path: string, fallback: T): T | { canonical: string } {
  const c = crossCanonical(path);
  return c ? { canonical: c } : fallback;
}
