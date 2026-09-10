// ============================================================
// SwapHubs — app/api/terzi/sifre-belirle/route.ts
// Telefon doğrulaması (OTP) tamamlanmış, oturumu açık kullanıcı
// yeni şifre belirler. Hem ilk kayıtta hem "şifremi unuttum"
// akışında kullanılır — ikisi de önce OTP ile doğrulanmış oturum
// gerektirir, yani şifreyi sadece gerçek numara sahibi ayarlayabilir.
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getSessionUserId } from '@/lib/terzi-session';

export async function POST(req: NextRequest) {
  try {
    const userId = getSessionUserId();
    if (!userId) return NextResponse.json({ error: 'Önce telefon doğrulaması yapın' }, { status: 401 });

    const { sifre } = await req.json();
    if (!sifre || typeof sifre !== 'string' || sifre.length < 6) {
      return NextResponse.json({ error: 'Şifre en az 6 karakter olmalı' }, { status: 400 });
    }

    const sifreHash = await bcrypt.hash(sifre, 10);
    const db = await getDb();

    await db.collection('terziKullanicilar').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { sifreHash, sifreBasarisizDeneme: 0 }, $unset: { sifreKilitlenmeZamani: '' } }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Şifre belirle hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
