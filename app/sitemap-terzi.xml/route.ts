import { NextResponse } from 'next/server'
import { ANTALYA_ILCELERI, KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar'
import { DISTRICTS, SERVICES, LANGS, SERVICE_BASE, districtUrl, serviceUrl, LAST_UPDATE, type Lang } from '@/lib/seo-data'

export const revalidate = 86400

const BASE_URL = 'https://swaphubs.com'
const D = new Date('2026-10-04')

export async function GET() {
  const terziSayfalar = [
    // 🌟 1. ANA ODAK SAYFALAR (Priority: 1.0)
    { url: `${BASE_URL}/terzi`, priority: '1.0', freq: 'daily' },
    { url: `${BASE_URL}/online-tailor-service`, priority: '1.0', freq: 'daily' },

    // 🔥 2. YÜKSEK TRAFİKLİ URL'LER (Priority: 0.95)
    { url: `${BASE_URL}/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti`, priority: '0.95', freq: 'weekly' },
    { url: `${BASE_URL}/antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat`,      priority: '0.95', freq: 'weekly' },
    { url: `${BASE_URL}/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat`,    priority: '0.95', freq: 'weekly' },
    { url: `${BASE_URL}/antalya-terzi-elbise-dikimi`,                              priority: '0.95', freq: 'weekly' },
    { url: `${BASE_URL}/antalyada-terzi-dikim-tamirat-utu-hizmetleri`,             priority: '0.95', freq: 'weekly' },

    // ✂️ 3. MİKRO TERZİ SAYFALARI (Priority: 0.90)
    { url: `${BASE_URL}/online-terzi-hizmeti`,        priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/terzi/paca-kisaltma-antalya`, priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/terzi/dikis-atolyesi-antalya`, priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/terzi/bay-terzi-antalya`,     priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/terzi/bayan-terzi-antalya`,   priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/terzi/eve-gelen-terzi-antalya`, priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/terzi/fermuar-degisimi`,      priority: '0.90', freq: 'weekly' },

    // 🌐 4. ÇOK DİLLİ (B2B & OTEL) SAYFALAR (Priority: 0.90)
    { url: `${BASE_URL}/en/hotel-tailor-antalya`,             priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/de/online-schneiderservice-antalya`,  priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/de/schneider-service-hotel-antalya`,  priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/ru/atelie-antalya`,                   priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/ru/atelie-antalya-online`,            priority: '0.90', freq: 'weekly' },
    { url: `${BASE_URL}/ru/vyezdnoy-portnoy-antalya`,         priority: '0.90', freq: 'weekly' },

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

  ANTALYA_ILCELERI.filter(i => i.slug !== 'konyaalti').forEach(i => {
    terziSayfalar.push({ url: `${BASE_URL}/terzi/antalya/${i.slug}`, priority: '0.80', freq: 'weekly' })
  })

  const turistik = ['belek', 'lara', 'guzeloba', 'side', 'kemer', 'kundu']
  turistik.forEach(slug => {
    terziSayfalar.push({ url: `${BASE_URL}/en/hotel-tailor-antalya/${slug}`, priority: '0.80', freq: 'weekly' })
    terziSayfalar.push({ url: `${BASE_URL}/ru/vyezdnoy-portnoy-antalya/${slug}`, priority: '0.80', freq: 'weekly' })
    terziSayfalar.push({ url: `${BASE_URL}/de/schneider-service-hotel-antalya/${slug}`, priority: '0.80', freq: 'weekly' })
  })

  // 🔎 Bölge × hizmet SEO sayfaları (4 dil, karşılıklı hreflang)
  type Item = { url: string; priority: string; freq: string; alt?: Record<string, string> }
  const hasAlt = (urlFor: (l: Lang) => string): Record<string, string> => ({
    ...Object.fromEntries(LANGS.map((l) => [l, `${BASE_URL}${urlFor(l)}`])),
    'x-default': `${BASE_URL}${urlFor('tr')}`,
  })
  const seoItems: Item[] = [
    ...LANGS.map((l) => ({ url: `${BASE_URL}${SERVICE_BASE[l]}`, priority: '0.80', freq: 'weekly', alt: hasAlt((x) => SERVICE_BASE[x]) })),
    ...SERVICES.flatMap((sv) => LANGS.map((l) => ({ url: `${BASE_URL}${serviceUrl(l, sv)}`, priority: '0.78', freq: 'monthly', alt: hasAlt((x) => serviceUrl(x, sv)) }))),
    ...DISTRICTS.flatMap((d) => LANGS.map((l) => ({ url: `${BASE_URL}${districtUrl(l, d)}`, priority: '0.76', freq: 'monthly', alt: hasAlt((x) => districtUrl(x, d)) }))),
  ]
  // aynı adres iki kez gelmesin (Türkçe sayfalar mevcut rotalarla çakışabilir)
  const seen = new Set(terziSayfalar.map((x) => x.url))
  const seoUnique = seoItems.filter((x) => (seen.has(x.url) ? false : (seen.add(x.url), true)))
  // Mevcut Türkçe sayfalara da hreflang karşılığı vermek için alt bilgisini eşle
  const altByUrl = new Map(seoItems.map((x) => [x.url, x.alt]))
  const all: Item[] = [...terziSayfalar.map((x) => ({ ...x, alt: altByUrl.get(x.url) })), ...seoUnique]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${all.map(s => `  <url>
    <loc>${s.url}</loc>${s.alt ? '\n' + Object.entries(s.alt).map(([l, u]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${u}"/>`).join('\n') : ''}
    <lastmod>${(seoUnique.includes(s) ? new Date(LAST_UPDATE) : D).toISOString()}</lastmod>
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
