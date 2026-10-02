import { NextResponse } from 'next/server'

const BASE = 'https://swaphubs.com'
export const dynamic = 'force-dynamic'

const terziSayfalar = [
  // ── 1. Ana Terzi & İngilizce Sayfalar (Priority: 1.0) ─────────────
  { url: `${BASE}/terzi`,                                                   priority: '1.0',  freq: 'daily' },
  { url: `${BASE}/online-tailor-service`,                                   priority: '1.0',  freq: 'daily' },

  // ── 2. Yüksek Trafikli Sayfalar (1. Ekran Görüntüsündeki 5 URL) ─────
  { url: `${BASE}/antalyada-terzi-dikim-tamirat-utu-hizmetleri`,            priority: '0.95', freq: 'daily' },
  { url: `${BASE}/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti`, priority: '0.95', freq: 'daily' },
  { url: `${BASE}/antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat`,      priority: '0.95', freq: 'daily' },
  { url: `${BASE}/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat`,    priority: '0.95', freq: 'daily' },
  { url: `${BASE}/antalya-terzi-elbise-dikimi`,                              priority: '0.95', freq: 'daily' },

  // ── 3. app/terzi/ İçindeki Fiziksel Alt Klasörler (2. Ekran Görüntüsü) ──
  { url: `${BASE}/terzi/bay-terzi-antalya`,                                 priority: '0.90', freq: 'weekly' },
  { url: `${BASE}/terzi/bayan-terzi-antalya`,                               priority: '0.90', freq: 'weekly' },
  { url: `${BASE}/terzi/dikis-atolyesi-antalya`,                            priority: '0.90', freq: 'weekly' },
  { url: `${BASE}/terzi/eve-gelen-terzi-antalya`,                           priority: '0.90', freq: 'weekly' },
  { url: `${BASE}/terzi/fermuar-degisimi`,                                  priority: '0.90', freq: 'weekly' },
  { url: `${BASE}/terzi/kuru-temizleme-antalya`,                            priority: '0.90', freq: 'weekly' },
  { url: `${BASE}/terzi/paca-kisaltma-antalya`,                             priority: '0.90', freq: 'weekly' },
  { url: `${BASE}/terzi/uniforma-uretimi-antalya`,                          priority: '0.90', freq: 'weekly' },

  // ── 4. Online Terzi & Dönüşüm Sayfaları ──────────────────────────────
  { url: `${BASE}/online-terzi-hizmeti`,                                    priority: '0.95', freq: 'weekly' },
  { url: `${BASE}/terzi-cagir`,                                             priority: '0.90', freq: 'weekly' },

  // ── 5. Diğer Tekstil & Çok Dilli Sayfalar ────────────────────────────
  { url: `${BASE}/tekstil-antalya`,                                         priority: '0.85', freq: 'weekly' },
  { url: `${BASE}/ru/atelie-antalya`,                                       priority: '0.85', freq: 'weekly' },
  { url: `${BASE}/dogal-keten-pamuk-giyim`,                                 priority: '0.80', freq: 'weekly' },
]

export async function GET() {
  const now = new Date().toISOString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${terziSayfalar.map(s => `  <url>
    <loc>${s.url}</loc>
    <lastmod>${now}</lastmod>
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
