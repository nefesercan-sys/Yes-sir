import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb';
import { rateLimited } from '@/lib/api-guard';
import { hashToken, tokenGecerliMi } from '@/lib/password-reset';

export async function POST(req: NextRequest) {
  try {
    if (rateLimited(req, 'sifre-guncelle', 10, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin.' }, { status: 429 });
    }
    const b = await req.json().catch(() => null);
    const token = b?.token;
    const sifre = typeof b?.sifre === 'string' ? b.sifre : '';

    if (!tokenGecerliMi(token) || !sifre) {
      return NextResponse.json({ error: 'Link geçersiz veya süresi dolmuş.' }, { status: 400 });
    }
    if (sifre.length < 6 || sifre.length > 128) {
      return NextResponse.json({ error: 'Şifre en az 6 karakter olmalıdır.' }, { status: 400 });
    }

    const db = await getDb();
    const tokenHash = hashToken(token);

    // Tek adımda "kullanıldı" işaretle: aynı bağlantı iki kez kullanılamaz (yarış durumu yok).
    const kayit = await db.collection('password_resets').findOneAndUpdate(
      { tokenHash, kullanildi: false, expires: { $gt: new Date() } },
      { $set: { kullanildi: true, kullanilanTarih: new Date() } },
    );
    const resetRecord = (kayit as any)?.value ?? kayit; // sürücü sürümüne göre döndürülen biçim farklı olabilir
    if (!resetRecord || !resetRecord.email) {
      return NextResponse.json({ error: 'Link geçersiz veya süresi dolmuş.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(sifre, 12);
    const userUpdate = await db.collection('users').updateOne(
      { email: resetRecord.email },
      { $set: { password: hashedPassword, updatedAt: new Date(), guncellenmeTarihi: new Date() } },
    );
    if (userUpdate.matchedCount === 0) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Şifreniz başarıyla güncellendi.' });
  } catch (e) {
    console.error('Şifre güncelleme hatası:', e);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
