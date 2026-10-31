// app/api/bal/fix-gorseller/route.ts
import { requireAdmin } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';


// Yan etkili işlem: yalnızca POST.
export async function GET() {
  return NextResponse.json({ error: 'Yalnızca POST kabul edilir' }, { status: 405, headers: { Allow: 'POST' } });
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin(req);
  if (guard) return guard;

  try {
    const db = await getDb();
    const col = db.collection('bal_urunler');

    // Ham Propolis — arı peteği görseli
    await col.updateOne(
      { slug: 'ham-propolis-50g' },
      { $set: { gorsel: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=600&q=80' } }
    );

    // Karışık Köy Seti — bal kavanozları görseli
    await col.updateOne(
      { slug: 'karisik-koy-seti' },
      { $set: { gorsel: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80' } }
    );

    // Kuşburnu — kırmızı meyveler görseli
    await col.updateOne(
      { slug: 'kusburnu-kuru-100g' },
      { $set: { gorsel: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&q=80' } }
    );

    return NextResponse.json({
      success: true,
      mesaj: '3 ürün görseli güncellendi',
      guncellenenler: ['ham-propolis-50g', 'karisik-koy-seti', 'kusburnu-kuru-100g'],
    });
  } catch (err) {
    console.error('Bal görsel düzeltme hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
