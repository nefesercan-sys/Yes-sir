// app/api/terzi-sitemap/route.ts
// DÜZELTİLDİ:
//  1. Yeni sayfa eklendi: /antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti-online-tailor
//  2. Artık sitemap.ts ile aynı URL'leri listeliyor — bu kasıtlı:
//     terzi-sitemap ayrı bir XML endpoint, Google Search Console'a
//     "Sitemaps" bölümünden AYRI olarak eklenmeli:
//     https://swaphubs.com/api/terzi-sitemap
//     Bu sayede terzi sayfaları öncelikli crawl edilir.
//  3. Her iki Google Business profili bilgisi yorum satırında belirtildi.
import { NextResponse } from 'next/server'

const BASE = 'https://swaphubs.com'
export const dynamic = 'force-dynamic'

// ── Google Business Profilleri ────────────────────────────────────────────────
// Profil 1: CID 1496201377277644027 — Liman Mah. "Konyaaltı Terzi - Terzi Dikim Tamir Tadilat"
//   Maps: https://www.google.com/maps?cid=1496201377277644027
//   Short: https://maps.app.goo.gl/i73c4xKZwr7uaSjbA
// Profil 2: CID 1496201834409914715 — Hurma "ANTALYA TERZİ CAN - TAILOR"
//   Maps: https://www.google.com/maps?cid=1496201834409914715
//   Short: https://maps.app.goo.gl/rpgwjJgWZHfgafTy5
// NOT: İki profil sameAs array'inde birleştirildi → terzi/page.tsx
// ─────────────────────────────────────────────────────────────────────────────

const terziSayfalar = [
  // ── Ana terzi sayfası ──────────────────────────────────────────────────────
  { url: `${BASE}/terzi`,                                                                          priority: '1.0',  freq: 'weekly'  },

  // ── Terzi alt hizmet sayfaları ─────────────────────────────────────────────
  { url: `${BASE}/terzi/paca-kisaltma-antalya`,                                                    priority: '0.95', freq: 'weekly'  },
  { url: `${BASE}/terzi/bay-terzi-antalya`,                                                        priority: '0.95', freq: 'weekly'  },
  { url: `${BASE}/terzi/bayan-terzi-antalya`,                                                      priority: '0.95', freq: 'weekly'  },
  { url: `${BASE}/terzi/dikis-atolyesi-antalya`,                                                   priority: '0.90', freq: 'weekly'  },
  { url: `${BASE}/terzi/uniforma-uretimi-antalya`,                                                 priority: '0.90', freq: 'weekly'  },
  { url: `${BASE}/terzi/kuru-temizleme-antalya`,                                                   priority: '0.90', freq: 'weekly'  },
  { url: `${BASE}/terzi/eve-gelen-terzi-antalya`,                                                  priority: '0.95', freq: 'weekly'  },
  { url: `${BASE}/terzi/fermuar-degisimi-antalya`,                                                 priority: '0.90', freq: 'weekly'  },
  { url: `${BASE}/terzi/gelinlik-tadilati-antalya`,                                                priority: '0.90', freq: 'weekly'  },

  // ── Tekstil & Terzi yardımcı sayfalar ─────────────────────────────────────
  { url: `${BASE}/tekstil-antalya`,                                                                priority: '0.90', freq: 'weekly'  },
  { url: `${BASE}/online-tailor-service`,                                                          priority: '0.90', freq: 'weekly'  },
  { url: `${BASE}/online-terzi-servisi`,                                                           priority: '0.90', freq: 'weekly'  },
  { url: `${BASE}/dogal-keten-pamuk-giyim`,                                                        priority: '0.85', freq: 'weekly'  },
  { url: `${BASE}/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat`,                          priority: '0.90', freq: 'weekly'  },
  { url: `${BASE}/antalya-terzi-elbise-dikimi`,                                                    priority: '0.90', freq: 'weekly'  },

  // ── ✅ YENİ SAYFA ───────────────────────────────────────────────────────────
  { url: `${BASE}/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti-online-tailor`,         priority: '0.95', freq: 'weekly'  },

  // ── Online Terzi Hizmeti ───────────────────────────────────────────────────
  { url: `${BASE}/online-terzi-hizmeti`,                                                           priority: '1.0',  freq: 'weekly'  },
  { url: `${BASE}/online-terzi-hizmeti/abiye-dikim`,                                               priority: '0.90', freq: 'weekly'  },
  { url: `${BASE}/online-terzi-hizmeti/gelinlik-dikim`,                                            priority: '0.90', freq: 'weekly'  },
  { url: `${BASE}/online-terzi-hizmeti/takim-elbise-dikim`,                                        priority: '0.90', freq: 'weekly'  },
  { url: `${BASE}/online-terzi-hizmeti/uniforma-dikim`,                                            priority: '0.85', freq: 'weekly'  },
  { url: `${BASE}/online-terzi-hizmeti/spor-giyim-dikim`,                                          priority: '0.85', freq: 'weekly'  },
  { url: `${BASE}/online-terzi-hizmeti/gece-davet-kiyafeti`,                                       priority: '0.85', freq: 'weekly'  },
  { url: `${BASE}/online-terzi-hizmeti/muslin-keten-kiyafet`,                                      priority: '0.85', freq: 'weekly'  },
  { url: `${BASE}/online-terzi-hizmeti/gunluk-kiyafet-dikim`,                                      priority: '0.85', freq: 'weekly'  },
  { url: `${BASE}/online-terzi-hizmeti/olcu-rehberi`,                                              priority: '0.80', freq: 'monthly' },
  { url: `${BASE}/online-terzi-hizmeti/kurumsal`,                                                  priority: '0.80', freq: 'monthly' },
  { url: `${BASE}/online-terzi-hizmeti/sss`,                                                       priority: '0.70', freq: 'monthly' },
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
