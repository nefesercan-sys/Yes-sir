import { NextRequest, NextResponse } from 'next/server'

// Korumalı IndexNow tetikleyici.
// Kullanım: GET /api/indexnow  +  başlık  Authorization: Bearer <INDEXNOW_SECRET>
//       veya GET /api/indexnow?token=<INDEXNOW_SECRET>
// (Vercel → Settings → Environment Variables → INDEXNOW_SECRET). Secret yoksa endpoint kapalıdır.
const HOST = 'swaphubs.com'
const KEY = '02de353ea7f34c5db5448385d852cc59'

async function sitemapUrls(): Promise<string[]> {
  const out: string[] = []
  for (const sm of ['sitemap.xml', 'sitemap-terzi.xml']) {
    try {
      const xml = await (await fetch(`https://${HOST}/${sm}`, { cache: 'no-store' })).text()
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) out.push(m[1].trim())
    } catch {}
  }
  return Array.from(new Set(out)).filter((u) => u.startsWith(`https://${HOST}/`) || u === `https://${HOST}`)
}

export async function GET(req: NextRequest) {
  const secret = process.env.INDEXNOW_SECRET
  const auth = req.headers.get('authorization')
  const token = new URL(req.url).searchParams.get('token')
  // Yetki: Authorization: Bearer <secret> başlığı VEYA ?token=<secret>
  if (!secret || (auth !== `Bearer ${secret}` && token !== secret)) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 })
  }

  const all = [
    `https://${HOST}/llms.txt`,
    `https://${HOST}/llms-full.txt`,
    ...(await sitemapUrls()),
  ]
  const urlList = Array.from(new Set(all)).slice(0, 10000)
  const results: { endpoint: string; status?: number; error?: string }[] = []
  const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList })
  // Her uç nokta ayrı denenir: biri hata verse bile diğerleri gönderilir, asıl hata görünür.
  for (const endpoint of ['https://www.bing.com/indexnow', 'https://api.indexnow.org/indexnow', 'https://yandex.com/indexnow']) {
    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body,
        cache: 'no-store',
        signal: AbortSignal.timeout(8000),
      })
      results.push({ endpoint, status: r.status })
    } catch (e) {
      results.push({ endpoint, error: e instanceof Error ? e.message : String(e) })
    }
  }
  // 200/202 = kabul edildi
  const ok = results.some((r) => r.status === 200 || r.status === 202)
  return NextResponse.json({ success: ok, submitted: urlList.length, results }, { status: ok ? 200 : 502 })
}
