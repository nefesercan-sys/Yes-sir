import { NextResponse } from 'next/server'

const BASE = 'https://swaphubs.com'
export const dynamic = 'force-dynamic'

const terziSayfalar = [
  // ── Ana terzi sayfası ──────────────────────────────────────────────
  { url: `${BASE}/terzi`,                                                   priority: '1.0',  freq: 'weekly' },

  // ── YENİ: Yapay Zekâ (AEO) & Master Yerel SEO Sayfaları ─────────────
  // Botların ve yapay zeka tarayıcılarının bu güçlü sayfaları sürekli kontrol etmesi için eklendi
  { url: `${BASE}/antalyada-terzi-dikim-tamirat-utu-hizmetleri`,            priority: '1.0',  freq: 'daily' },
  { url: `${BASE}/antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat`,      priority: '0.95', freq: 'weekly' },

  // ── Antalya Alt Hizmet Sayfaları ───────────────────────────────────
  { url: `${BASE}/terzi/paca-kisaltma-antalya`,                             priority: '0.95', freq: 'weekly' },
  { url: `${BASE}/terzi/bay-terzi-antalya`,                                 priority: '0.95', freq: 'weekly' },
  { url: `${BASE}/terzi/bayan-terzi-antalya`,                               priority: '0.95', freq: 'weekly' },
  { url: `${BASE}/terzi/dikis-atolyesi-antalya`,                            priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/terzi/uniforma-uretimi-antalya`,                          priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/terzi/kuru-temizleme-antalya`,                            priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/terzi/eve-gelen-terzi-antalya`,                           priority: '0.95', freq: 'weekly' },
  { url: `${BASE}/terzi/fermuar-degisimi-antalya`,                          priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/terzi/gelinlik-tadilati-antalya`,                         priority: '0.9',  freq: 'weekly' },

  // ── Tekstil & Terzi Diğer Sayfalar ────────────────────────────────
  { url: `${BASE}/tekstil-antalya`,                                         priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/antalya-terzi-elbise-dikimi`,                             priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat`,  priority: '0.9',  freq: 'weekly' },

  // ── Online Terzi Hizmeti ───────────────────────────────────────────
  { url: `${BASE}/online-terzi-hizmeti`,                                    priority: '1.0',  freq: 'weekly' },
  { url: `${BASE}/online-terzi-hizmeti/abiye-dikim`,                        priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/online-terzi-hizmeti/gelinlik-dikim`,                     priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/online-terzi-hizmeti/takim-elbise-dikim`,                 priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/online-terzi-hizmeti/uniforma-dikim`,                     priority: '0.85', freq: 'weekly' },
  { url: `${BASE}/online-terzi-hizmeti/spor-giyim-dikim`,                   priority: '0.85', freq: 'weekly' },
  { url: `${BASE}/online-terzi-hizmeti/gece-davet-kiyafeti`,                priority: '0.85', freq: 'weekly' },
  { url: `${BASE}/online-terzi-hizmeti/muslin-keten-kiyafet`,               priority: '0.85', freq: 'weekly' },
  { url: `${BASE}/online-terzi-hizmeti/gunluk-kiyafet-dikim`,               priority: '0.85', freq: 'weekly' },
  { url: `${BASE}/online-terzi-hizmeti/olcu-rehberi`,                       priority: '0.8',  freq: 'monthly' },
  { url: `${BASE}/online-terzi-hizmeti/kurumsal`,                           priority: '0.8',  freq: 'monthly' },
  { url: `${BASE}/online-terzi-hizmeti/sss`,                                priority: '0.7',  freq: 'monthly' },

  // ── Online Tailor Service (EN) ─────────────────────────────────────
  { url: `${BASE}/online-tailor-service`,                                   priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/online-terzi-servisi`,                                    priority: '0.9',  freq: 'weekly' },

  // ── Rusça Sayfa ────────────────────────────────────────────────────
  // DÜZELTİLDİ: Canonical yapısı ile tam uyumlu hale getirildi
  { url: `${BASE}/ru/atelie-antalya`,                                       priority: '0.9',  freq: 'weekly' },

  // ── Doğal Keten/Pamuk ─────────────────────────────────────────────
  { url: `${BASE}/dogal-keten-pamuk-giyim`,                                 priority: '0.85', freq: 'weekly' },
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
