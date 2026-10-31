import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { clean, isPhone, rateLimited } from '@/lib/api-guard';
import { idGecerli } from '@/lib/validate';

export async function POST(req: Request) {
  try {
    if (rateLimited(req, 'bal-siparis', 5, 10 * 60 * 1000)) {
      return NextResponse.json({ error: 'Çok fazla istek. Lütfen biraz sonra tekrar deneyin.' }, { status: 429 });
    }
    const body = await req.json();
    const urunId = clean(body?.urunId, 80); // ObjectId veya slug
    const adSoyad = clean(body?.adSoyad, 100);
    const telefon = clean(body?.telefon, 20);
    const adres = clean(body?.adres, 400);
    const sehir = clean(body?.sehir, 60);
    const notlar = clean(body?.notlar, 500);
    const miktar = Number(body?.miktar);
    // NOT: istemciden gelen toplamFiyat/urunAd GÜVENİLMEZ; ürün adı ve fiyat sunucuda bal_urunler'den alınır.

    if (!adSoyad || !telefon || !adres || !sehir) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 });
    }
    if (!isPhone(telefon)) {
      return NextResponse.json({ error: 'Telefon numarası geçersiz' }, { status: 400 });
    }
    if (!Number.isInteger(miktar) || miktar < 1 || miktar > 100) {
      return NextResponse.json({ error: 'Miktar geçersiz' }, { status: 400 });
    }
    if (!urunId) {
      return NextResponse.json({ error: 'Ürün seçilmedi' }, { status: 400 });
    }

    const db = await getDb();
    const urun = await db.collection('bal_urunler').findOne(
      { ...(idGecerli(urunId) ? { _id: new ObjectId(urunId) } : { slug: urunId }), aktif: true },
      { projection: { ad: 1, fiyat: 1 } }
    );
    const birimFiyat = Number(urun?.fiyat);
    if (!urun || !Number.isFinite(birimFiyat) || birimFiyat < 0) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 400 });
    }
    const urunAd = clean(urun.ad, 150);
    const toplamFiyat = Math.round(birimFiyat * miktar * 100) / 100;

    const siparis = {
      urunId: String(urun._id),
      urunAd,
      miktar,
      adSoyad,
      telefon,
      adres,
      sehir,
      notlar,
      durum: 'bekliyor',
      toplamFiyat,
      createdAt: new Date(),
    };

    const result = await db.collection('bal_siparisler').insertOne(siparis);

    const waMsg = `🍯 YENİ SİPARİŞ\n\nÜrün: ${urunAd}\nMiktar: ${miktar}\nMüşteri: ${adSoyad}\nTel: ${telefon}\nŞehir: ${sehir}\nToplam: ₺${toplamFiyat}\nNot: ${notlar || 'Yok'}`;
    const waLink = `https://wa.me/${process.env.BAL_WA_NUMBER || process.env.NEXT_PUBLIC_BAL_WA || '905345104458'}?text=${encodeURIComponent(waMsg)}`;

    return NextResponse.json({ success: true, siparisId: result.insertedId, waLink }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Sipariş kaydedilemedi' }, { status: 500 });
  }
}
