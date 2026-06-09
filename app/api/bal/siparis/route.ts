import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { urunId, urunAd, miktar, adSoyad, telefon, adres, sehir, notlar, toplamFiyat } = body;

    if (!adSoyad || !telefon || !adres || !sehir) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 });
    }

    const db = await getDb();
    const siparis = {
      urunId,
      urunAd,
      miktar: Number(miktar),
      adSoyad,
      telefon,
      adres,
      sehir,
      notlar: notlar || '',
      durum: 'bekliyor',
      toplamFiyat: Number(toplamFiyat),
      createdAt: new Date(),
    };

    const result = await db.collection('bal_siparisler').insertOne(siparis);

    const waMsg = `🍯 YENİ SİPARİŞ\n\nÜrün: ${urunAd}\nMiktar: ${miktar}\nMüşteri: ${adSoyad}\nTel: ${telefon}\nŞehir: ${sehir}\nToplam: ₺${toplamFiyat}\nNot: ${notlar || 'Yok'}`;
    const waLink = `https://wa.me/${process.env.BAL_WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;

    return NextResponse.json({ success: true, siparisId: result.insertedId, waLink }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Sipariş kaydedilemedi' }, { status: 500 });
  }
}
