import { NextResponse } from 'next/server'
import { ANTALYA_ILCELERI, KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar'

export const revalidate = 86400

const BASE_URL = 'https://swaphubs.com'
const D = new Date('2026-10-02')

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
    { url: `${BASE_URL}/dogal-keten-pamuk-giyim`,        priority: '0.75', freq: 'monthly' },

    // 📋 7. FORM VE DÖNÜŞÜM SAYFALARI (Priority: 0.60)
    { url: `${BASE_URL}/terzi-cagir`, priority: '0.60', freq: 'monthly' },
    { url: `${BASE_URL}/terzi-talep`, priority: '0.60', freq: 'monthly' },
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

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${terziSayfalar.map(s => `  <url>
    <loc>${s.url}</loc>
    <lastmod>${D.toISOString()}</lastmod>
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
