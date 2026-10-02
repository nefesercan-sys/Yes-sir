import { NextResponse } from 'next/server'

const BASE = 'https://swaphubs.com'
export const dynamic = 'force-dynamic'

const terziSayfalar = [
  // ── Ana terzi sayfası ──────────────────────────────────────────────
  { url: `${BASE}/terzi`,                                                   priority: '1.0',  freq: 'weekly' },

  // ── Yapay Zekâ (AEO) & Master Yerel SEO Sayfaları ───────────────────
  // Botların ve yapay zeka tarayıcılarının bu güçlü sayfaları sürekli kontrol etmesi için eklendi
  { url: `${BASE}/antalyada-terzi-dikim-tamirat-utu-hizmetleri`,            priority: '1.0',  freq: 'daily' },
  // DÜZELTME (2026-08-13): antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat
  // master sayfayla (yukarıdaki) neredeyse birebir aynı içeriği tekrar ediyordu
  // ve hiçbiri diğerine canonical vermiyordu — Google iki sayfayı near-duplicate
  // görüp otoriteyi bölüyordu. 301 ile master sayfaya birleştirildi, kaldırıldı.
  // ✅ YENİ: fiziksel var olup hiçbir sitemap'te olmayan 2 sayfa eklendi
  { url: `${BASE}/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti`, priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/terzi-cagir`,                                             priority: '0.95', freq: 'weekly' },

  // ── Antalya Alt Hizmet Sayfaları ───────────────────────────────────
  { url: `${BASE}/terzi/paca-kisaltma-antalya`,                             priority: '0.95', freq: 'weekly' },
  { url: `${BASE}/terzi/bay-terzi-antalya`,                                 priority: '0.95', freq: 'weekly' },
  { url: `${BASE}/terzi/bayan-terzi-antalya`,                               priority: '0.95', freq: 'weekly' },
  { url: `${BASE}/terzi/dikis-atolyesi-antalya`,                            priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/terzi/uniforma-uretimi-antalya`,                          priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/terzi/kuru-temizleme-antalya`,                            priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/terzi/eve-gelen-terzi-antalya`,                           priority: '0.95', freq: 'weekly' },
  // DÜZELTME (2026-08-13): fermuar-degisimi-antalya ve gelinlik-tadilati-antalya
  // fiziksel sayfa değil — next.config.mjs'te /terzi'ye 301 redirect ediyorlar.
  // Redirect eden URL'yi sitemap'te tutmak GSC uyarısı üretir. Kaldırıldı.

  // ── Tekstil & Terzi Diğer Sayfalar ────────────────────────────────
  // DÜZELTME (2026-07-13): "/antalya-terzi-elbise-dikimi" satırı kaldırıldı.
  // DÜZELTME (2026-08-13): "/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat"
  // da master sayfaya 301 ile birleştirildi, aynı sebeple kaldırıldı.
  { url: `${BASE}/tekstil-antalya`,                                         priority: '0.9',  freq: 'weekly' },

  // ── Online Terzi Hizmeti ───────────────────────────────────────────
  // DÜZELTME (2026-08-13): abiye-dikim, gelinlik-dikim, takim-elbise-dikim,
  // uniforma-dikim, spor-giyim-dikim, gece-davet-kiyafeti, muslin-keten-kiyafet,
  // gunluk-kiyafet-dikim, olcu-rehberi, kurumsal, sss — bu 11 alt sayfanın
  // hiçbiri app/online-terzi-hizmeti/ altında fiziksel olarak yoktu.
  // Gerçekten yazılınca buraya geri eklenmeli.
  { url: `${BASE}/online-terzi-hizmeti`,                                    priority: '1.0',  freq: 'weekly' },

  // ── Online Tailor Service (EN) ─────────────────────────────────────
  { url: `${BASE}/online-tailor-service`,                                   priority: '0.9',  freq: 'weekly' },
  // DÜZELTME (2026-08-13): /online-terzi-servisi hiçbir zaman fiziksel
  // olarak var olmadı — kaldırıldı.

  // ── Rusça Sayfa ────────────────────────────────────────────────────
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
