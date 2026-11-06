// app/api/admin/yapay-ilanlar/route.ts — yapay (AI ile üretilmiş) ilanları önizleme + güvenli toplu silme (yalnız yönetici).
// GET  : Silmeden ÖNCE ne silineceğini gösterir (adet, kimlik/başlık listesi, bağlı teklif sayısı, Cloudinary public_id listesi).
// POST : { onay: 'YAPAY-ILANLARI-SIL', adet: N } — N, GET'teki adetle birebir aynı değilse HİÇBİR ŞEY silinmez.
// Yalnızca yapay === true / is_ai_generated === true olan kayıtlar etkilenir. Cloudinary dosyaları ve teklifler SİLİNMEZ.
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { getDb } from '@/lib/mongodb';
import { rateLimited } from '@/lib/api-guard';

export const dynamic = 'force-dynamic';

const YAPAY = { $or: [{ yapay: true }, { is_ai_generated: true }] };
const ONAY = 'YAPAY-ILANLARI-SIL';

function publicId(url: unknown): string | null {
  if (typeof url !== 'string') return null;
  const m = url.match(/\/upload\/(?:[^/]+\/)*?(?:v\d+\/)?([^?]+?)(?:\.[a-z0-9]+)?(?:\?.*)?$/i);
  return m ? m[1] : null;
}

export async function GET(req: NextRequest) {
  const g = await requireAdmin(req);
  if (g) return g;
  try {
    const db = await getDb();
    const col = db.collection('ilanlar');
    const adet = await col.countDocuments(YAPAY);
    const toplam = await col.countDocuments({});
    const liste = await col
      .find(YAPAY, { projection: { baslik: 1, slug: 1, medyalar: 1, createdAt: 1 } })
      .limit(5000)
      .toArray();
    const idler = liste.map((d) => String(d._id));
    const teklifSayisi = idler.length ? await db.collection('teklifler').countDocuments({ ilanId: { $in: idler } }) : 0;
    const cloudinaryIds = Array.from(
      new Set(liste.flatMap((d) => (Array.isArray(d.medyalar) ? d.medyalar : [])).map(publicId).filter(Boolean) as string[])
    );
    return NextResponse.json({
      yapayIlanAdedi: adet,
      toplamIlanAdedi: toplam,
      gercekIlanAdedi: toplam - adet,
      baglıTeklifSayisi: teklifSayisi,
      ornekBasliklar: liste.slice(0, 10).map((d) => d.baslik),
      kayitlar: liste.map((d) => ({ id: String(d._id), baslik: d.baslik, slug: d.slug })),
      cloudinaryPublicIds: cloudinaryIds,
      not: 'Silmeden önce bu çıktıyı yedekleyin. Silme için POST: { onay: "' + ONAY + '", adet: ' + adet + ' }',
    });
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const g = await requireAdmin(req);
  if (g) return g;
  if (rateLimited(req, 'yapay-ilan-sil', 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Çok fazla deneme' }, { status: 429 });
  }
  const body = await req.json().catch(() => null);
  if (!body || body.onay !== ONAY || !Number.isInteger(body.adet) || body.adet < 0) {
    return NextResponse.json({ error: `Onay gerekli: { onay: "${ONAY}", adet: <GET'teki yapayIlanAdedi> }` }, { status: 400 });
  }
  try {
    const db = await getDb();
    const col = db.collection('ilanlar');
    const mevcut = await col.countDocuments(YAPAY);
    if (mevcut !== body.adet) {
      return NextResponse.json({ error: 'Adet uyuşmuyor, silme iptal edildi', mevcut, gelen: body.adet }, { status: 409 });
    }
    const r = await col.deleteMany(YAPAY);
    console.warn(`[yapay-ilan-sil] ${r.deletedCount} yapay ilan silindi`);
    return NextResponse.json({ silinen: r.deletedCount });
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
