// app/api/index-ping/route.ts
// Bu route'u deploy sonrası bir kez çağırın:
// curl https://swaphubs.com/api/index-ping
// VEYA tarayıcıdan açın — Google'a tüm yeni sayfaları bildirir

import { NextResponse } from "next/server";

const SAYFALAR = [
  "https://swaphubs.com/terzi",
  "https://swaphubs.com/terzi/paca-kisaltma-antalya",
  "https://swaphubs.com/terzi/bay-terzi-antalya",
  "https://swaphubs.com/terzi/bayan-terzi-antalya",
  "https://swaphubs.com/terzi/dikis-atolyesi-antalya",
  "https://swaphubs.com/terzi/uniforma-uretimi-antalya",
  "https://swaphubs.com/terzi/kuru-temizleme-antalya",
  "https://swaphubs.com/terzi/eve-gelen-terzi-antalya",
  "https://swaphubs.com/online-terzi-hizmeti",
  "https://swaphubs.com/tekstil-antalya",
  "https://swaphubs.com/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat",
];

export const dynamic = "force-dynamic";

export async function GET() {
  const results: { url: string; status: string }[] = [];

  // Google Indexing API ping (sitemap üzerinden)
  // Sitemap ping — Google botunu uyarır
  const sitemapPingUrl =
    `https://www.google.com/ping?sitemap=https://swaphubs.com/sitemap.xml`;

  try {
    const pingRes = await fetch(sitemapPingUrl, { method: "GET" });
    results.push({
      url: "sitemap-ping",
      status: pingRes.ok ? "✅ ping gönderildi" : `❌ ${pingRes.status}`,
    });
  } catch (e) {
    results.push({ url: "sitemap-ping", status: "❌ hata" });
  }

  // Bing ping (bonus — Bing de önemli turist aramaları için)
  const bingPing =
    `https://www.bing.com/ping?sitemap=https://swaphubs.com/sitemap.xml`;
  try {
    const bingRes = await fetch(bingPing, { method: "GET" });
    results.push({
      url: "bing-ping",
      status: bingRes.ok ? "✅ ping gönderildi" : `❌ ${bingRes.status}`,
    });
  } catch (e) {
    results.push({ url: "bing-ping", status: "❌ hata" });
  }

  const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Index Ping — SwapHubs</title>
  <style>
    body { font-family: system-ui; background: #FAF7F2; padding: 2rem; }
    h1 { color: #B8975A; }
    .ok { color: #16a34a; }
    .err { color: #dc2626; }
    table { border-collapse: collapse; width: 100%; margin-top: 1rem; }
    td, th { padding: .6rem 1rem; border: 1px solid #E8E0D2; text-align: left; font-size: .9rem; }
    th { background: #F2EDE4; color: #8A6E3E; }
    .next { background: #fff; border: 1px solid #E8E0D2; padding: 1.5rem; margin-top: 2rem; border-radius: 4px; }
    code { background: #F2EDE4; padding: .2rem .5rem; border-radius: 2px; font-size: .85rem; }
  </style>
</head>
<body>
  <h1>🔍 Google & Bing Index Ping</h1>
  <p>swaphubs.com/terzi sayfaları Google ve Bing'e bildirildi.</p>
  <table>
    <thead><tr><th>Hedef</th><th>Durum</th></tr></thead>
    <tbody>
      ${results.map(r => `<tr><td>${r.url}</td><td>${r.status}</td></tr>`).join("")}
    </tbody>
  </table>

  <div class="next">
    <h2>✅ Sonraki Adım — Google Search Console</h2>
    <p>Aşağıdaki sayfaları <strong>Search Console → URL Denetimi → İndexlemeyi İste</strong> ile manuel olarak ekleyin:</p>
    <ul style="margin-top:.8rem;line-height:2.2">
      ${SAYFALAR.map(u => `<li><code>${u}</code></li>`).join("")}
    </ul>
    <p style="margin-top:1rem;color:#7A6E62;font-size:.85rem">
      Search Console adresi: <a href="https://search.google.com/search-console" target="_blank">search.google.com/search-console</a>
    </p>
  </div>

  <div class="next" style="margin-top:1rem">
    <h2>📱 Google Business Profile Kontrol</h2>
    <ul style="line-height:2.2;font-size:.9rem">
      <li>✅ Web sitesi: <code>https://swaphubs.com/terzi</code> ekli mi?</li>
      <li>✅ Kategori: <strong>Terzi</strong> + <strong>Kuru Temizleme</strong> seçili mi?</li>
      <li>✅ Hizmetler listesi dolu mu? (paça kısaltma ₺150, fermuar ₺120...)</li>
      <li>✅ Bu hafta fotoğraf yükledin mi? (minimum 10)</li>
      <li>✅ Google Post paylaştın mı? (haftada 1)</li>
    </ul>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
