import { NextRequest, NextResponse } from 'next/server'

// Korumalı IndexNow tetikleyici.
// Kullanım: GET /api/indexnow  +  başlık  Authorization: Bearer <INDEXNOW_SECRET>
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
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 })
  }

  const all = [`https://${HOST}/llms.txt`, ...(await sitemapUrls())]
  const urlList = Array.from(new Set(all)).slice(0, 10000)
  const results: number[] = []
  try {
    for (const endpoint of ['https://api.indexnow.org/indexnow', 'https://yandex.com/indexnow']) {
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
      })
      results.push(r.status)
    }
    return NextResponse.json({ success: true, submitted: urlList.length, statuses: results })
  } catch {
    return NextResponse.json({ success: false, error: 'ping failed' }, { status: 500 })
  }
}
