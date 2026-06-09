// app/api/bal/fix-gorseller/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const SECRET = 'arimbalim2024';

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== SECRET) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

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
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
