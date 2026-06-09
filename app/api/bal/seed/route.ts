// app/api/bal/seed/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const SECRET = 'arimbalim2024';

const urunler = [
  {
    slug: 'sivas-yayla-bali-500g',
    ad: 'Sivas Yayla Balı — 500g',
    kategori: 'bal',
    fiyat: 455,
    birim: '500g',
    stok: 'var',
    aciklama:
      "Sivas'ın bozulmamış dağ yaylalarından süzülen katkısız yayla balı. Endemik bitkilerden — dağ kekiği, nane, adaçayı, kantaron — toplanan nektardan üretilir. Bir kaşıkta yüzlerce çiçeğin özü.",
    icerik: ['Dağ Kekiği', 'Nane', 'Adaçayı', 'Kantaron', 'Endemik Bitkiler'],
    gorsel: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80',
    aktif: true,
    createdAt: new Date(),
  },
  {
    slug: 'sivas-yayla-bali-1kg',
    ad: 'Sivas Yayla Balı — 1kg',
    kategori: 'bal',
    fiyat: 845,
    birim: '1kg',
    stok: 'var',
    aciklama:
      'Aynı saf yayla balından ekonomik 1kg boy. Ailece tüketim için ideal. Yıllık rezervasyon ile sezon başında taze olarak kapınıza gelir.',
    icerik: ['Dağ Kekiği', 'Nane', 'Adaçayı', 'Kantaron', 'Endemik Bitkiler'],
    gorsel: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80',
    aktif: true,
    createdAt: new Date(),
  },
  {
    slug: 'kekik-bali-500g',
    ad: 'Dağ Kekiği Balı — 500g',
    kategori: 'bal',
    fiyat: 520,
    birim: '500g',
    stok: 'var',
    aciklama:
      'Sivas dağlarının mor kekik tarlalarından toplanan nektardan elde edilir. Kendine özgü aromatik kokusu ve koyu altın rengiyle sofranızın en değerli balı.',
    icerik: ['Dağ Kekiği', 'Yabani Kekik', 'Doğal Enzimler'],
    gorsel: 'https://images.unsplash.com/photo-1601063458289-77247ba485ec?w=600&q=80',
    aktif: true,
    createdAt: new Date(),
  },
  {
    slug: 'mese-bali-500g',
    ad: 'Meşe Balı — 500g',
    kategori: 'bal',
    fiyat: 494,
    birim: '500g',
    stok: 'var',
    aciklama:
      'Meşe ormanlarından toplanan salgı balı. Koyu rengi, yoğun kıvamı ve mineral açısından zengin içeriğiyle diğer ballardan ayrışır. Bağışıklığı destekler.',
    icerik: ['Meşe Özü', 'Orman Salgısı', 'Mineral Bakımından Zengin'],
    gorsel: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?w=600&q=80',
    aktif: true,
    createdAt: new Date(),
  },
  {
    slug: 'cicek-poleni-250g',
    ad: 'Taze Çiçek Poleni — 250g',
    kategori: 'polen',
    fiyat: 364,
    birim: '250g',
    stok: 'var',
    aciklama:
      'Arıların endemik dağ çiçeklerinden topladığı taze çiçek poleni. Protein, vitamin ve mineraller açısından doğanın en değerli süper besinlerinden biri.',
    icerik: ['Çiçek Poleni', 'Protein', 'B Vitaminleri', 'Enzimler', 'Antioksidan'],
    gorsel: 'https://images.unsplash.com/photo-1504567961542-e24d9439a724?w=600&q=80',
    aktif: true,
    createdAt: new Date(),
  },
  {
    slug: 'ham-propolis-50g',
    ad: 'Ham Propolis — 50g',
    kategori: 'propolis',
    fiyat: 416,
    birim: '50g',
    stok: 'var',
    aciklama:
      'Arıların kovana gelen yabancı maddelere karşı ürettiği doğal kalkan. İşlenmemiş, katkısız ham haliyle. Güçlü antibakteriyel özellikleriyle bilinir.',
    icerik: ['Ham Reçine', 'Bal Mumu', 'Uçucu Yağlar', 'Flavonoidler', 'Fenol Bileşikleri'],
    gorsel: 'https://images.unsplash.com/photo-1595981234058-a9302fb97229?w=600&q=80',
    aktif: true,
    createdAt: new Date(),
  },
  {
    slug: 'karisik-koy-seti',
    ad: 'Karışık Köy Seti — Bal + Polen + Propolis',
    kategori: 'set',
    fiyat: 1105,
    birim: 'Set',
    stok: 'var',
    aciklama:
      "Arım Balım Çiçeğim'in en sevilen üçlüsü bir arada: 500g yayla balı, 250g çiçek poleni ve 50g ham propolis. Kendinize ya da sevdiklerinize en doğal hediye.",
    icerik: ['500g Yayla Balı', '250g Çiçek Poleni', '50g Ham Propolis', 'Hediye Paketi'],
    gorsel: 'https://images.unsplash.com/photo-1612540139013-a22a8f3d9706?w=600&q=80',
    aktif: true,
    createdAt: new Date(),
  },
  {
    slug: 'kusburnu-kuru-100g',
    ad: 'Kuşburnu (Kuru) — 100g',
    kategori: 'ot',
    fiyat: 156,
    birim: '100g',
    stok: 'var',
    aciklama:
      'Sivas dağlarından elle toplanan yabani kuşburnu. C vitamini deposu. Çay olarak demlenir, bal ile karıştırılır ya da direkt tüketilebilir.',
    icerik: ['C Vitamini', 'Antioksidan', 'Doğal Kurutma', 'Elle Toplama'],
    gorsel: 'https://images.unsplash.com/photo-1567648547591-9a1e5e5a5a1b?w=600&q=80',
    aktif: true,
    createdAt: new Date(),
  },
  {
    slug: 'dag-kekigi-kuru-100g',
    ad: 'Dağ Kekiği (Kuru) — 100g',
    kategori: 'ot',
    fiyat: 117,
    birim: '100g',
    stok: 'var',
    aciklama:
      'Sivas yaylalarından elle toplanan yabani dağ kekiği. Kekik çayı, et yemekleri ve doğal ilaç olarak kullanılır. Uçucu yağ içeriğiyle marketten satılanlarla kıyaslanamaz.',
    icerik: ['Uçucu Yağ', 'Timol', 'Karvakrol', 'Doğal Kurutma'],
    gorsel: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=600&q=80',
    aktif: true,
    createdAt: new Date(),
  },
];

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== SECRET) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const db = await getDb();
    const col = db.collection('bal_urunler');

    await col.deleteMany({});
    await col.insertMany(urunler);

    try {
      await col.createIndex({ slug: 1 }, { unique: true });
      await col.createIndex({ kategori: 1 });
      await col.createIndex({ aktif: 1 });
    } catch {}

    return NextResponse.json({
      success: true,
      mesaj: `${urunler.length} ürün başarıyla güncellendi`,
      urunler: urunler.map(u => ({ ad: u.ad, fiyat: u.fiyat })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
