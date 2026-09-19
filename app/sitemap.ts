import { MetadataRoute } from 'next'
import { getDb } from '@/lib/mongodb'
import { ANTALYA_ILCELERI, KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BASE_URL = 'https://swaphubs.com'
// HATA DÜZELTİLDİ: Sadece hex karakterleri değil, tüm SEO dostu (harf, rakam ve tire) slug'ları kabul eder
const SLUG_REGEX = /^[a-z0-9-]+$/i

// DÜZELTME (2026-09-08): Bu dosya daha önce clientPromise'ı doğrudan
// client.db('swaphubs_db') ile açıyordu. Ama tüm gerçek API route'ları
// (ilanlar, teklifler, blog, urunler vb.) lib/mongodb.ts'deki getDb()
// üzerinden 'hizmetara' veritabanını kullanıyor. Yani sitemap yanlış/boş
// bir veritabanını okuyordu ve gerçek ilan/blog/ürün URL'leri sitemap'e
// hiç girmiyordu. Artık merkezi getDb() kullanılıyor — doğru veritabanına
// bağlanıyor ve tüm route'larla tutarlı.

async function getIlanlar() {
  try {
    const db = await getDb()
    return await db
      .collection('ilanlar')
      .find(
        { durum: 'aktif', slug: { $exists: true, $nin: [null, ''] } },
        { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } }
      )
      .toArray()
  } catch (e) {
    console.error('[sitemap] ilan hatası:', e)
    return []
  }
}

async function getSektorler() {
  try {
    const db = await getDb()
    return await db
      .collection('sektorler')
      .find({}, { projection: { slug: 1, updatedAt: 1, _id: 0 } })
      .toArray()
  } catch (e) {
    console.error('[sitemap] sektor hatası:', e)
    return []
  }
}

async function getSehirler() {
  try {
    const db = await getDb()
    return await db
      .collection('sehirler')
      .find({}, { projection: { slug: 1, updatedAt: 1, _id: 0 } })
      .toArray()
  } catch (e) {
    console.error('[sitemap] sehir hatası:', e)
    return []
  }
}

async function getBlogYazilari() {
  try {
    const db = await getDb()
    return await db
      .collection('blog')
      .find(
        { durum: 'yayinda', slug: { $exists: true, $nin: [null, ''] } },
        { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } }
      )
      .toArray()
  } catch (e) {
    console.error('[sitemap] blog hatası:', e)
    return []
  }
}

async function getUrunler() {
  try {
    const db = await getDb()
    return await db
      .collection('urunler')
      .find(
        { durum: 'aktif', slug: { $exists: true, $nin: [null, ''] } },
        { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } }
      )
      .toArray()
  } catch (e) {
    console.error('[sitemap] urun hatası:', e)
    return []
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toDate(val: any, fallback = '2026-01-01'): Date {
  if (!val) return new Date(fallback)
  const d = new Date(val)
  return isNaN(d.getTime()) ? new Date(fallback) : d
}

function isRecent(date: Date, days = 30): boolean {
  return Date.now() - date.getTime() < days * 24 * 60 * 60 * 1000
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    // ── Ana sayfalar ──
    { url: BASE_URL,                  lastModified: new Date('2026-06-22'), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/ilanlar`,     lastModified: new Date('2026-06-22'), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/kesfet`,      lastModified: new Date('2026-06-22'), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/ilan`,        lastModified: new Date('2026-06-22'), changeFrequency: 'daily',   priority: 0.9 },

    // ── Online Terzi Hizmeti ──
    { url: `${BASE_URL}/online-terzi-hizmeti`,                      lastModified: new Date('2026-08-13'), changeFrequency: 'weekly', priority: 1.0  },
    // DÜZELTME (2026-08-13): Bu sayfanın altında abiye-dikim, gelinlik-dikim,
    // takim-elbise-dikim, uniforma-dikim, spor-giyim-dikim, gece-davet-kiyafeti,
    // muslin-keten-kiyafet, gunluk-kiyafet-dikim, olcu-rehberi, kurumsal, sss
    // adında 11 alt sayfa Google'a bildiriliyordu ama app/online-terzi-hizmeti/
    // altında bu klasörlerin HİÇBİRİ fiziksel olarak yoktu (sadece ana sayfa var).
    // Bu, Search Console'da "Taranmadı: 404" hatası olarak birikiyordu ve
    // Google'ın siteye olan "URL beyanı doğruluğu" güvenini zedeliyordu.
    // Bu sayfalar gerçekten yazılırsa buraya geri eklenmeli.

    // ── Terzi Ana Sayfa ──
    { url: `${BASE_URL}/terzi`, lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 1.0 },

    // ── AEO VE YEREL SEO MASTER SAYFASI (YAPAY ZEKA İÇİN KRİTİK) ──
    { url: `${BASE_URL}/antalyada-terzi-dikim-tamirat-utu-hizmetleri`, lastModified: new Date('2026-07-13'), changeFrequency: 'daily', priority: 1.0 },

    // ── Terzi Alt Hizmet Sayfaları ──
    { url: `${BASE_URL}/terzi/paca-kisaltma-antalya`,     lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/terzi/bay-terzi-antalya`,         lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/terzi/bayan-terzi-antalya`,       lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/terzi/dikis-atolyesi-antalya`,    lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/terzi/uniforma-uretimi-antalya`,  lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/terzi/kuru-temizleme-antalya`,    lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/terzi/eve-gelen-terzi-antalya`,   lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.95 },
    // DÜZELTME (2026-08-13): /terzi/fermuar-degisimi-antalya ve
    // /terzi/gelinlik-tadilati-antalya sitemap'te vardı ama bu URL'lerin
    // ikisi de next.config.mjs'te 301 ile /terzi'ye yönlendiriliyor —
    // fiziksel page.tsx dosyaları yok. Sitemap'te redirect eden bir URL'yi
    // tutmak Search Console'da "Sayfa yönlendirme içeriyor" uyarısı
    // üretir ve gereksiz tarama bütçesi harcar. Kaldırıldı.

    // ── Terzi & Tekstil Diğer Sayfalar ──
    // DÜZELTME (2026-07-13): "/antalya-terzi-elbise-dikimi" kaldırıldı.
    // Bu URL artık next.config.mjs üzerinden 301 ile master sayfaya
    // (antalyada-terzi-dikim-tamirat-utu-hizmetleri) yönlendiriliyor.
    // Yönlendirilen bir URL'yi sitemap'te tutmak Search Console'da
    // "Sayfa yönlendirme içeriyor" uyarısına ve gereksiz tarama israfına yol açar.
    { url: `${BASE_URL}/tekstil-antalya`,                                        lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/online-tailor-service`,                                  lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    // DÜZELTME (2026-08-13): /online-terzi-servisi sitemap'te vardı ama
    // app/ altında bu isimde bir page.tsx hiç yoktu — kaldırıldı.
    { url: `${BASE_URL}/dogal-keten-pamuk-giyim`,                                lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.85 },
    // DÜZELTME (2026-08-13): antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat
    // ve antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat, master sayfayla
    // (antalyada-terzi-dikim-tamirat-utu-hizmetleri) birleştirilip 301 redirect
    // yapıldı — sitemap'ten kaldırıldı (bkz. next.config.mjs).
    // ✅ YENİ: Fiziksel olarak var olup sitemap'te hiç bulunmayan 2 sayfa eklendi
    // DÜZELTME (2026-09): antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti
    // /terzi/antalya/konyaalti'ye 301 ile birleştirildi (next.config.mjs), kaldırıldı.
    { url: `${BASE_URL}/terzi-cagir`, lastModified: new Date('2026-08-13'), changeFrequency: 'weekly', priority: 0.95 },

    // ── Terzi Talep / Panel — Telefon+OTP Teklif Sistemi (Yandex Go tarzı) ──
    { url: `${BASE_URL}/terzi-talep`, lastModified: new Date('2026-09-08'), changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE_URL}/terzi-panel`, lastModified: new Date('2026-09-08'), changeFrequency: 'daily', priority: 0.9 },

    // ── Antalya ilçeleri (öncelikli, fiziksel hizmet alanı) ──
    ...ANTALYA_ILCELERI.map(i => ({
      url: `${BASE_URL}/terzi/antalya/${i.slug}`,
      lastModified: new Date('2026-09-10'), changeFrequency: 'weekly' as const, priority: 0.85,
    })),

    // ── Konyaaltı mahalleleri (2026-09 EKLENDİ) — en çok trafik alan
    // /antalyada-terzi-dikim-tamirat-utu-hizmetleri sayfası bu 10 mahalleye
    // zaten link veriyordu, ama sayfalar hiç var olmamıştı. Artık gerçekler. ──
    ...KONYAALTI_MAHALLELERI.map(m => ({
      url: `${BASE_URL}/terzi/konyaalti/${m.slug}`,
      lastModified: new Date('2026-09-16'), changeFrequency: 'weekly' as const, priority: 0.88,
    })),

    // DÜZELTME (2026-09-19): "Türkiye'nin diğer illeri" bloğu (80 sayfa)
    // sitemap'ten kaldırıldı — bu sayfalar noindex edildi (bkz. app/terzi/[il]/
    // page.tsx), Antalya'nın yerel arama otoritesini zayıflattıkları
    // değerlendirildi. Sayfalar hâlâ var (silinmedi), sadece artık aranmıyor/
    // indekslenmiyor.

    // ── Rusça Sayfalar ──
    { url: `${BASE_URL}/ru/atelie-antalya-online`,                               lastModified: new Date('2026-07-01'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/ru/atelie-antalya`,                                      lastModified: new Date('2026-07-01'), changeFrequency: 'weekly', priority: 0.9  },

    // ── Eve/Otele Gelen Terzi — Çok Dilli Sayfalar (2026-09) ──
    { url: `${BASE_URL}/en/hotel-tailor-antalya`,                                lastModified: new Date('2026-09-12'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/ru/vyezdnoy-portnoy-antalya`,                            lastModified: new Date('2026-09-12'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/de/schneider-service-hotel-antalya`,                     lastModified: new Date('2026-09-12'), changeFrequency: 'weekly', priority: 0.9  },

    // ── Otel Bölgesi Sayfaları — Belek/Lara/Güzeloba/Side × EN/RU/DE (2026-09) ──
    ...['belek', 'lara', 'guzeloba', 'side'].flatMap((slug) => [
      { url: `${BASE_URL}/en/hotel-tailor-antalya/${slug}`, lastModified: new Date('2026-09-13'), changeFrequency: 'weekly' as const, priority: 0.88 },
      { url: `${BASE_URL}/ru/vyezdnoy-portnoy-antalya/${slug}`, lastModified: new Date('2026-09-13'), changeFrequency: 'weekly' as const, priority: 0.88 },
      { url: `${BASE_URL}/de/schneider-service-hotel-antalya/${slug}`, lastModified: new Date('2026-09-13'), changeFrequency: 'weekly' as const, priority: 0.88 },
    ]),

    // ── Bal Sayfaları ──
    { url: `${BASE_URL}/bal`,       lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    // DÜZELTME (2026-09-18): "/arimbalim" kaldırıldı — app/ altında bu
    // isimde bir page.tsx hiç yoktu, sitemap'te olması Search Console'da
    // 404 olarak birikiyordu. Sayfa gerçekten yazılırsa geri eklenmeli.

    // DÜZELTME (2026-09-18): "Statik sayfalar" bloğu (/files, /hakkimizda,
    // /iletisim, /gizlilik, /kullanim-kosullari) tamamen kaldırıldı — hiçbirinin
    // app/ altında karşılığı yok, altısı da Googlebot'a 404 dönüyordu.
    // Bu sayfalar gerçekten yazılırsa buraya geri eklenmeli.
  ]

  // DÜZELTME (2026-09-18): 14 statik blog slug'ı ve buna bağlı dynamicBlogUrls/
  // blogUrls fallback mantığı tamamen kaldırıldı. app/ altında "blog" adında
  // hiçbir klasör yok — ne app/blog/[slug]/page.tsx ne de başka bir route bu
  // URL'leri karşılıyordu. Yani sitemap'teki tüm /blog/* girdileri (14 statik +
  // veritabanından gelen dinamik yazılar) Googlebot'a 404 dönüyordu.
  // Blog özelliği gerçekten kodlanınca getBlogYazilari() burada tekrar
  // kullanılmalı; fonksiyon aşağıda duruyor, sadece return'e dahil edilmiyor.

  const ilanlar = await getIlanlar()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ilanUrls: MetadataRoute.Sitemap = ilanlar
    .filter((i: any) => i.slug && SLUG_REGEX.test(i.slug))
    .map((i: any) => {
      const lastMod = toDate(i.updatedAt ?? i.createdAt)
      return {
        url: `${BASE_URL}/ilan/${i.slug}`,
        lastModified: lastMod,
        changeFrequency: (isRecent(lastMod) ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
        priority: 0.8,
      }
    })

  // DÜZELTME (2026-09-18): sektorUrls (/sektor/*), sehirUrls (/sehir/*) ve
  // urunUrls (/urun/*) üretimi durduruldu — üçü için de app/ altında route
  // hiç yok (app/bal/[slug] ayrı bir şey, /urun/* değil). Veritabanında kaç
  // kayıt olursa olsun bu üç kategori toplamda tek bir gerçek sayfaya
  // karşılık gelmiyordu; sitemap'e girdikleri her satır 404 demekti.
  // getSektorler(), getSehirler(), getBlogYazilari() fonksiyonları yukarıda
  // duruyor — ilgili route'lar yazılınca burada tekrar kullanılabilirler.

  return [
    ...staticPages,
    ...ilanUrls,
  ]
}
