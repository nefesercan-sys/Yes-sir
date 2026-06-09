// scripts/seed-bal.ts
// Çalıştırmak için: npx ts-node --project tsconfig.json scripts/seed-bal.ts
// veya: npx tsx scripts/seed-bal.ts

import { MongoClient } from 'mongodb';

const MONGODB_URI = mongodb+srv://nexusadmin:pandora1x@cluster0.ifg5d7n.mongodb.net/swaphubs_db?retryWrites=true&w=majority || '';

const urunler = [
  {
    slug: 'sivas-yayla-bali-500g',
    ad: 'Sivas Yayla Balı — 500g',
    kategori: 'bal',
    fiyat: 455,
    birim: '500g',
    stok: 'var',
    aciklama:
      'Sivas\'ın bozulmamış dağ yaylalarından süzülen katkısız yayla balı. Endemik bitkilerden — dağ kekiği, nane, adaçayı, kantaron — toplanan nektardan üretilir. Bir kaşıkta yüzlerce çiçeğin özü.',
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
      'Meşe ormanlarından toplanan salgı balı. Koyu rengi, yoğun kıvamı ve mineral açısından zengin içeriğiyle diğer ballardan ayrışır. Özellikle kış aylarında bağışıklığı destekler.',
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
      'Arıların endemik dağ çiçeklerinden topladığı taze çiçek poleni. Protein, vitamin ve mineraller açısından doğanın en değerli süper besinlerinden biri. Bal ile karıştırarak ya da direkt tüketilebilir.',
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
      'Arıların kovana gelen yabancı maddelere karşı ürettiği doğal kalkan. İşlenmemiş, katkısız ham haliyle. Güçlü antibakteriyel ve antifungal özellikleriyle bilinir. Kovan direkt çıktı.',
    icerik: ['Ham Reçine', 'Bal Mumu', 'Uçucu Yağlar', 'Flavonoidler', 'Fenol Bileşikleri'],
    gorsel: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80',
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
      'Arım Balım Çiçeğim\'in en sevilen üçlüsü bir arada: 500g yayla balı, 250g çiçek poleni ve 50g ham propolis. Kendinize ya da sevdiklerinize en doğal hediye.',
    icerik: ['500g Yayla Balı', '250g Çiçek Poleni', '50g Ham Propolis', 'Hediye Paketi'],
    gorsel: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
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
      'Sivas dağlarından elle toplanan yabani kuşburnu. C vitamini deposu. Çay olarak demlenir, bal ile karıştırılır ya da direkt tüketilebilir. Katkısız, doğal kurutma.',
    icerik: ['C Vitamini', 'Antioksidan', 'Doğal Kurutma', 'Elle Toplama'],
    gorsel: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=600&q=80',
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
      'Sivas yaylalarından elle toplanan yabani dağ kekiği. Kekik çayı, et yemekleri ve doğal ilaç olarak kullanılır. Aromatik kokusu ve uçucu yağ içeriğiyle marketten satılanlarla kıyaslanamaz.',
    icerik: ['Uçucu Yağ', 'Timol', 'Karvakrol', 'Doğal Kurutma'],
    gorsel: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=600&q=80',
    aktif: true,
    createdAt: new Date(),
  },
];

async function seed() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI bulunamadı. .env.local dosyasını kontrol et.');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ MongoDB bağlantısı kuruldu');

    const db = client.db();
    const col = db.collection('bal_urunler');

    // Önce mevcut ürünleri sil
    await col.deleteMany({});
    console.log('🗑️  Eski ürünler temizlendi');

    // Yeni ürünleri ekle
    const result = await col.insertMany(urunler);
    console.log(`✅ ${result.insertedCount} ürün eklendi:`);
    urunler.forEach(u => console.log(`   🍯 ${u.ad} — ${u.fiyat}₺`));

    // Index ekle
    await col.createIndex({ slug: 1 }, { unique: true });
    await col.createIndex({ kategori: 1 });
    await col.createIndex({ aktif: 1 });
    console.log('✅ Index\'ler oluşturuldu');

  } catch (err) {
    console.error('❌ Hata:', err);
  } finally {
    await client.close();
    console.log('🔒 Bağlantı kapatıldı');
  }
}

seed();
