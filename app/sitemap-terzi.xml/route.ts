import { NextResponse } from 'next/server'
import { ANTALYA_ILCELERI, KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar'

const BASE = 'https://swaphubs.com'
export const dynamic = 'force-dynamic'

const terziSayfalar = [
  // ── Ana terzi sayfası ──────────────────────────────────────────────
  { url: `${BASE}/terzi`,                                                   priority: '1.0',  freq: 'weekly' },

  // ── Terzi Talep / Panel — Telefon+OTP Teklif Sistemi (Yandex Go tarzı) ──
  { url: `${BASE}/terzi-talep`,                                             priority: '0.95', freq: 'daily' },
  { url: `${BASE}/terzi-panel`,                                             priority: '0.9',  freq: 'daily' },

  // ── Yapay Zekâ (AEO) & Master Yerel SEO Sayfaları ───────────────────
  { url: `${BASE}/antalyada-terzi-dikim-tamirat-utu-hizmetleri`,            priority: '1.0',  freq: 'daily' },
  { url: `${BASE}/terzi-cagir`,                                             priority: '0.95', freq: 'weekly' },

  // ── Antalya Alt Hizmet Sayfaları ───────────────────────────────────
  { url: `${BASE}/terzi/paca-kisaltma-antalya`,                             priority: '0.95', freq: 'weekly' },
  { url: `${BASE}/terzi/bay-terzi-antalya`,                                 priority: '0.95', freq: 'weekly' },
  { url: `${BASE}/terzi/bayan-terzi-antalya`,                               priority: '0.95', freq: 'weekly' },
  { url: `${BASE}/terzi/dikis-atolyesi-antalya`,                            priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/terzi/uniforma-uretimi-antalya`,                          priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/terzi/kuru-temizleme-antalya`,                            priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/terzi/eve-gelen-terzi-antalya`,                           priority: '0.95', freq: 'weekly' },

  // ── YENİ (2026-09-20): Antalya ilçe + Konyaaltı mahalle dinamik sayfaları ──
  // Bu iki blok, ana sitemap.ts (app/sitemap.ts) ile senkron tutulmalı —
  // orada ANTALYA_ILCELERI / KONYAALTI_MAHALLELERI değişirse burası da
  // otomatik güncellenir çünkü aynı veri kaynağından besleniyor.
  ...ANTALYA_ILCELERI.map(i => ({
    url: `${BASE}/terzi/antalya/${i.slug}`, priority: '0.88', freq: 'weekly',
  })),
  ...KONYAALTI_MAHALLELERI.map(m => ({
    url: `${BASE}/terzi/konyaalti/${m.slug}`, priority: '0.88', freq: 'weekly',
  })),

  // ── Tekstil & Terzi Diğer Sayfalar ────────────────────────────────
  { url: `${BASE}/tekstil-antalya`,                                         priority: '0.9',  freq: 'weekly' },

  // ── Online Terzi Hizmeti ───────────────────────────────────────────
  { url: `${BASE}/online-terzi-hizmeti`,                                    priority: '1.0',  freq: 'weekly' },

  // ── Online Tailor Service (EN) ─────────────────────────────────────
  { url: `${BASE}/online-tailor-service`,                                   priority: '0.9',  freq: 'weekly' },

  // ── Rusça Sayfalar ───────────────────────────────────────────────────
  // YENİ (2026-09-20): /ru/atelie-antalya-online eksikti, eklendi.
  { url: `${BASE}/ru/atelie-antalya-online`,                                priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/ru/atelie-antalya`,                                       priority: '0.9',  freq: 'weekly' },

  // ── YENİ (2026-09-20): Eve/Otele Gelen Terzi — Çok Dilli Sayfalar ─────
  // Bu bölümün tamamı ana sitemap.ts'te aylardır vardı ama bu ikincil
  // dosyaya hiç eklenmemişti — EN/RU/DE ziyaretçileri ve arama motorları
  // için otel sayfaları bu sitemap üzerinden hiç keşfedilemiyordu.
  { url: `${BASE}/en/hotel-tailor-antalya`,                                 priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/ru/vyezdnoy-portnoy-antalya`,                             priority: '0.9',  freq: 'weekly' },
  { url: `${BASE}/de/schneider-service-hotel-antalya`,                      priority: '0.9',  freq: 'weekly' },
  ...['belek', 'lara', 'guzeloba', 'side'].flatMap((slug) => [
    { url: `${BASE}/en/hotel-tailor-antalya/${slug}`,           priority: '0.88', freq: 'weekly' },
    { url: `${BASE}/ru/vyezdnoy-portnoy-antalya/${slug}`,       priority: '0.88', freq: 'weekly' },
    { url: `${BASE}/de/schneider-service-hotel-antalya/${slug}`, priority: '0.88', freq: 'weekly' },
  ]),

  // ── Doğal Keten/Pamuk ─────────────────────────────────────────────
  { url: `${BASE}/dogal-keten-pamuk-giyim`,                                 priority: '0.85', freq: 'weekly' },

  // ── Bal Sayfası ────────────────────────────────────────────────────
  // YENİ (2026-09-20): ana sitemap.ts'te vardı, burada hiç yoktu.
  { url: `${BASE}/bal`,                                                     priority: '0.9',  freq: 'weekly' },
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
