// Bilinmeyen /api adresleri (eski ilan/üyelik/yönetici uçları dahil, 25 Kasım 2026'da kaldırıldı): 410 Gone.
// Tanımlı uçlar (ör. /api/indexnow) kendi route dosyalarıyla önceliklidir.
const gone = () => new Response(JSON.stringify({ error: 'Gone' }), { status: 410, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=86400', 'X-Robots-Tag': 'noindex' } });
export const GET = gone;
export const POST = gone;
export const PUT = gone;
export const PATCH = gone;
export const DELETE = gone;
