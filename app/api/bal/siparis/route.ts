import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { clean, isPhone, rateLimited } from '@/lib/api-guard';

export async function POST(req: Request) {
  try {
    if (rateLimited(req, 'bal-siparis', 5, 10 * 60 * 1000)) {
      return NextResponse.json({ error: 'Çok fazla istek. Lütfen biraz sonra tekrar deneyin.' }, { status: 429 });
    }
    const body = await req.json();
    const urunId = clean(body?.urunId, 40);
    const urunAd = clean(body?.urunAd, 150);
    const adSoyad = clean(body?.adSoyad, 100);
    const telefon = clean(body?.telefon, 20);
    const adres = clean(body?.adres, 400);
    const sehir = clean(body?.sehir, 60);
    const notlar = clean(body?.notlar, 500);
    const miktar = Number(body?.miktar);
    const toplamFiyat = Number(body?.toplamFiyat);

    if (!adSoyad || !telefon || !adres || !sehir) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 });
    }
    if (!isPhone(telefon)) {
      return NextResponse.json({ error: 'Telefon numarası geçersiz' }, { status: 400 });
    }
    if (!Number.isFinite(miktar) || miktar < 1 || miktar > 100 || !Number.isFinite(toplamFiyat) || toplamFiyat < 0 || toplamFiyat > 1000000) {
      return NextResponse.json({ error: 'Miktar veya fiyat geçersiz' }, { status: 400 });
    }

    const db = await getDb();
    const siparis = {
      urunId,
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
