import { NextResponse } from 'next/server'
import { ANTALYA_ILCELERI, KONYAALTI_MAHALLELERI, MURATPASA_MAHALLELERI } from '@/lib/turkiye-lokasyonlar'
import { CONTACT_URL } from '@/components/terzi/IletisimSayfasi'
import { URLS as TEKSTIL_URLS } from '@/lib/tekstil-sayfalari'
import { ILANGS, INTL, iUrl } from '@/lib/intl'
import { ZONE_SLUGS, zoneUrl } from '@/lib/intl-zones'
import { svcgUrl } from '@/lib/intl-svc'
import { KONU_IDS, konuUrl, konuLanguages, sixAlt } from '@/lib/intl-konu'
import { HZ_IDS, hzUrl, hzLanguages, hzSixForService } from '@/lib/intl-hz'
import { PROMO_ALL } from '@/lib/intl-promo'
import { DISTRICTS, SERVICES, LANGS, SERVICE_BASE, districtUrl, serviceUrl, isIndexable, type Lang } from '@/lib/seo-data'
import { crossCanonical } from '@/lib/cross-canonical'

export const revalidate = 86400

const BASE_URL = 'https://swaphubs.com'

// Otel ana sayfası / bölge sayfaları için hreflang kümesi (sayfa <head> değerleriyle aynı olmalı)
const FOUR_ZONES = ['belek', 'lara', 'guzeloba', 'side', 'kemer', 'kundu', 'muratpasa', 'goynuk']
const HUB_TR = `${BASE_URL}/terzi/eve-gelen-terzi-antalya`
const HUB_EN = `${BASE_URL}/en/hotel-tailor-antalya`, HUB_RU = `${BASE_URL}/ru/vyezdnoy-portnoy-antalya`, HUB_DE = `${BASE_URL}/de/schneider-service-hotel-antalya`
function zoneAltMap(z: (typeof ZONE_SLUGS)[number]): Record<string, string> {
  const six = Object.fromEntries(ILANGS.map((x) => [INTL[x].hreflang, `${BASE_URL}${zoneUrl(x, z)}`]))
  if (z === 'antalya') return { tr: HUB_TR, en: HUB_EN, ru: HUB_RU, de: HUB_DE, ...six, 'x-default': HUB_TR }
  if (FOUR_ZONES.includes(z)) return { en: `${HUB_EN}/${z}`, ru: `${HUB_RU}/${z}`, de: `${HUB_DE}/${z}`, ...six, 'x-default': `${HUB_EN}/${z}` }
  return six
}
// lastmod: yalnızca içeriği gerçekten değişen sayfalar güncel tarihi alır (sahte güncelleme sinyali verilmez).
// 2026-10-30: süre/ücretsiz servis/Muratpaşa/kopya içerik düzeltmeleriyle değişen terzi sayfaları.
// Bu düzeltmelerden etkilenmeyen sayfalar (keten/pamuk ve Anavera tekstil tanıtımları, üniforma) eski tarihlerinde kalır.
const CHANGED = '2026-11-01'
const OLD = '2026-10-04'
const UNCHANGED_PREFIXES = ['/dogal-keten-pamuk-giyim', '/en/linen-clothing-custom-made-antalya', '/ru/lnyanaya-odezhda-poshiv-antalya', '/de/leinenkleidung-massanfertigung-antalya',
  '/tekstil-antalya', '/en/textile-manufacturer-antalya', '/ru/tekstilnoe-proizvodstvo-antalya', '/de/textilhersteller-antalya', '/terzi/uniforma-uretimi-antalya']
const lastmodOf = (url: string) => (UNCHANGED_PREFIXES.some((p) => url === `${BASE_URL}${p}`) ? OLD : CHANGED)
// terzihizmeti.com.tr'ye canonical'lanan sayfalar sitemap'e girmez
const isOwnCanonical = (url: string) => !crossCanonical(url.replace(BASE_URL, ''))

export async function GET() {
  const terziSayfalar = [
    // 🌟 1. ANA ODAK SAYFALAR (Priority: 1.0)
    { url: `${BASE_URL}/terzi`, priority: '1.0', freq: 'daily' },
    { url: `${BASE_URL}/online-tailor-service`, priority: '1.0', freq: 'daily' },

    // 🔥 2. YÜKSEK TRAFİKLİ URL'LER (Priority: 0.95)
    { url: `${BASE_URL}/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti`, priority: '0.95', freq: 'weekly' },
    { url: `${BASE_URL}/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat`,    priority: '0.95', freq: 'weekly' },
    { url: `${BASE_URL}/antalya-terzi-elbise-dikimi`,                              priority: '0.95', freq: 'weekly' },
    { url: `${BASE_URL}/antalyada-terzi-dikim-tamirat-utu-hizmetleri`,             priority: '0.95', freq: 'weekly' },

    // ✂️ 3. MİKRO TERZİ SAYFALARI (Priority: 0.90)
    { url: `${BASE_URL}/online-terzi-hizmeti`,        priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/terzi/paca-kisaltma-antalya`, priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/terzi/dikis-atolyesi-antalya`, priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/terzi/bay-terzi-antalya`,     priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/terzi/bayan-terzi-antalya`,   priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/terzi/eve-gelen-terzi-antalya`, priority: '0.90', freq: 'weekly', alt: zoneAltMap('antalya') },
    { url: `${BASE_URL}/terzi/fermuar-degisimi`,      priority: '0.90', freq: 'weekly' },

    // 🌐 4. ÇOK DİLLİ (B2B & OTEL) SAYFALAR (Priority: 0.90)
    { url: `${BASE_URL}/en/hotel-tailor-antalya`,             priority: '0.90', freq: 'weekly', alt: zoneAltMap('antalya') },
    { url: `${BASE_URL}/de/online-schneiderservice-antalya`,  priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/de/schneider-service-hotel-antalya`,  priority: '0.90', freq: 'weekly', alt: zoneAltMap('antalya') },
    { url: `${BASE_URL}/ru/atelie-antalya`,                   priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/ru/atelie-antalya-online`,            priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/ru/vyezdnoy-portnoy-antalya`,         priority: '0.90', freq: 'weekly', alt: zoneAltMap('antalya') },

    // 👕 6. ATÖLYE, FASON VE KUMAŞ (Priority: 0.75)
    { url: `${BASE_URL}/terzi/uniforma-uretimi-antalya`, priority: '0.75', freq: 'weekly' },
    { url: `${BASE_URL}/terzi/kuru-temizleme-antalya`,   priority: '0.75', freq: 'weekly' },
    { url: `${BASE_URL}/tekstil-antalya`,             priority: '0.75', freq: 'weekly' },
    { url: `${BASE_URL}/dogal-keten-pamuk-giyim`,        priority: '0.75', freq: 'monthly' },

    // 📋 7. DÖNÜŞÜM SAYFASI (/terzi-talep noindex olduğu için sitemap'ten çıkarıldı)
    { url: `${BASE_URL}/terzi-cagir`, priority: '0.60', freq: 'monthly' },
  ]

  // 📍 5. YEREL SEO (İlçe ve Mahalleler) (Priority: 0.80 - 0.85)
  KONYAALTI_MAHALLELERI.forEach(m => {
    terziSayfalar.push({ url: `${BASE_URL}/terzi/konyaalti/${m.slug}`, priority: '0.85', freq: 'weekly' })
  })
  // Meltem, Şirinyalı, Fener, Güzeloba: Muratpaşa'ya bağlı (eski /terzi/konyaalti/<slug> → 301)
  MURATPASA_MAHALLELERI.forEach(m => {
    terziSayfalar.push({ url: `${BASE_URL}/terzi/muratpasa/${m.slug}`, priority: '0.85', freq: 'weekly' })
  })

  ANTALYA_ILCELERI.filter(i => i.slug !== 'konyaalti').forEach(i => {
    terziSayfalar.push({ url: `${BASE_URL}/terzi/antalya/${i.slug}`, priority: '0.80', freq: 'weekly' })
  })

  // Yalnızca gerçekten sayfası olan bölgeler (lib/otel-bolgeleri.ts). Kundu için sayfa yok → eklenirse buraya da ekle.
  const turistik = ['belek', 'lara', 'guzeloba', 'side', 'kemer', 'kundu', 'muratpasa', 'goynuk']
  turistik.forEach(slug => {
    terziSayfalar.push({ url: `${BASE_URL}/en/hotel-tailor-antalya/${slug}`, priority: '0.80', freq: 'weekly', alt: zoneAltMap(slug as (typeof ZONE_SLUGS)[number]) })
    terziSayfalar.push({ url: `${BASE_URL}/ru/vyezdnoy-portnoy-antalya/${slug}`, priority: '0.80', freq: 'weekly', alt: zoneAltMap(slug as (typeof ZONE_SLUGS)[number]) })
    terziSayfalar.push({ url: `${BASE_URL}/de/schneider-service-hotel-antalya/${slug}`, priority: '0.80', freq: 'weekly', alt: zoneAltMap(slug as (typeof ZONE_SLUGS)[number]) })
  })

  // 🔎 Bölge × hizmet SEO sayfaları. EN/RU/DE karşılıkları terzihizmeti.com.tr'ye canonical'landığı için yalnız TR'ler listelenir
  // ve hreflang verilmez (canonical ile tutarlı).
  type Item = { url: string; priority: string; freq: string; alt?: Record<string, string>; lastmod?: string }
  const hasAlt = (urlFor: (l: Lang) => string, ok: (l: Lang) => boolean = () => true): Record<string, string> => {
    const ls = LANGS.filter(ok)
    return {
      ...Object.fromEntries(ls.map((l) => [l, `${BASE_URL}${urlFor(l)}`])),
      'x-default': `${BASE_URL}${urlFor(ls.includes('tr') ? 'tr' : 'en')}`,
    }
  }
  const seoItems: Item[] = [
    ...LANGS.map((l) => ({ url: `${BASE_URL}${SERVICE_BASE[l]}`, priority: '0.80', freq: 'weekly', alt: { ...Object.fromEntries(LANGS.map((x) => [x, `${BASE_URL}${SERVICE_BASE[x]}`])), ...Object.fromEntries(Object.entries(sixAlt('tamir')).map(([k, v]) => [k, v.replace('https://swaphubs.com', BASE_URL)])), 'x-default': `${BASE_URL}${SERVICE_BASE.tr}` } })),
    ...SERVICES.flatMap((sv) => {
      const sx = sv.slug.tr === 'ozel-dikim-antalya' ? sixAlt('ozel') : hzSixForService(sv.slug.tr)
      const alt = Object.keys(sx).length
        ? { ...Object.fromEntries(LANGS.map((x) => [x, `${BASE_URL}${serviceUrl(x, sv)}`])), ...Object.fromEntries(Object.entries(sx).map(([k, v]) => [k, v.replace('https://swaphubs.com', BASE_URL)])), 'x-default': `${BASE_URL}${serviceUrl('tr', sv)}` }
        : undefined
      return LANGS.map((l) => ({ url: `${BASE_URL}${serviceUrl(l, sv)}`, priority: '0.78', freq: 'monthly', alt }))
    }),
    ...HZ_IDS.flatMap((h) => (['es', 'fr', 'pl', 'uk', 'nl', 'ar'] as const).map((l) => ({ url: `${BASE_URL}${hzUrl(l, h)}`, priority: '0.70', freq: 'monthly', alt: Object.fromEntries(Object.entries(hzLanguages(h)).map(([k, v]) => [k, v.replace('https://swaphubs.com', BASE_URL)])) }))),
    ...DISTRICTS.flatMap((d) => LANGS.filter((l) => isIndexable(l, d.slug)).map((l) => ({ url: `${BASE_URL}${districtUrl(l, d)}`, priority: '0.76', freq: 'monthly' }))),
    // 📞 İletişim sayfası (TR; EN/RU/DE karşılıkları terzihizmeti.com.tr'de)
    ...(['tr', 'en', 'ru', 'de'] as Lang[]).map((l) => ({ url: `${BASE_URL}${CONTACT_URL[l]}`, priority: l === 'tr' ? '0.85' : '0.80', freq: 'monthly' })),
    // 🧵 Keten özel dikim + Anavera Tekstil (4 dil, karşılıklı hreflang)
    ...(['keten', 'tekstil', 'acil', 'otel', 'etkinlik'] as const).flatMap((tp) => LANGS.map((l) => ({ url: `${BASE_URL}${TEKSTIL_URLS[tp][l]}`, priority: '0.80', freq: 'monthly', alt: tp === 'keten' || tp === 'tekstil' ? { ...hasAlt((x) => TEKSTIL_URLS[tp][x]), ...sixAlt(tp) } : hasAlt((x) => TEKSTIL_URLS[tp][x]) }))),
    // 🌍 Ek turist dilleri (ES/FR/PL/UK/NL/AR): tek tanıtım sayfası, kendi aralarında hreflang
    ...ILANGS.map((l) => ({ url: `${BASE_URL}${iUrl(l)}`, priority: '0.70', freq: 'monthly', alt: Object.fromEntries(ILANGS.map((x) => [INTL[x].hreflang, `${BASE_URL}${iUrl(x)}`])) })),
    // 🧵 Hizmetler, kumaşlar ve yurt dışı sipariş rehberi (6 dil, kendi aralarında hreflang)
    ...ILANGS.map((l) => ({ url: `${BASE_URL}${svcgUrl(l)}`, priority: '0.70', freq: 'monthly', alt: Object.fromEntries(ILANGS.map((x) => [INTL[x].hreflang, `${BASE_URL}${svcgUrl(x)}`])) })),
    // 🎽 Promosyon tekstili ve baskılı bez çanta rehberi (10 dil, karşılıklı hreflang + x-default)
    ...KONU_IDS.flatMap((t) => ILANGS.map((l) => ({ url: `${BASE_URL}${konuUrl(l, t)}`, priority: '0.70', freq: 'monthly', alt: Object.fromEntries(Object.entries(konuLanguages(t)).map(([k, v]) => [k, v.replace('https://swaphubs.com', BASE_URL)])) }))),
    ...PROMO_ALL.map((x) => ({
      url: `${BASE_URL}${x.path}`, priority: '0.70', freq: 'monthly',
      alt: { ...Object.fromEntries(PROMO_ALL.map((y) => [y.hreflang, `${BASE_URL}${y.path}`])), 'x-default': `${BASE_URL}${PROMO_ALL[0].path}` },
    })),
    // 🏨 Otel bölgesi derinlik sayfaları (6 dil × 6 bölge, bölge başına 6 dilli hreflang)
    ...ZONE_SLUGS.flatMap((z) => ILANGS.map((l) => ({ url: `${BASE_URL}${zoneUrl(l, z)}`, priority: '0.65', freq: 'monthly', alt: zoneAltMap(z) }))),
  ]
  // aynı adres iki kez gelmesin (Türkçe sayfalar mevcut rotalarla çakışabilir)
  const seen = new Set(terziSayfalar.map((x) => x.url))
  const seoUnique = seoItems.filter((x) => (seen.has(x.url) ? false : (seen.add(x.url), true)))
  const altByUrl = new Map(seoItems.map((x) => [x.url, x.alt]))
  const all: Item[] = [...terziSayfalar.map((x) => ({ ...x, alt: altByUrl.get(x.url) ?? x.alt })), ...seoUnique]
    .filter((x) => isOwnCanonical(x.url))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${all.map(s => `  <url>
    <loc>${s.url}</loc>${s.alt ? '\n' + Object.entries(s.alt).map(([l, u]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${u}"/>`).join('\n') : ''}
    <lastmod>${s.lastmod ?? lastmodOf(s.url)}</lastmod>
    <changefreq>${s.freq}</changefreq>
    <priority>${s.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  })
}
  
