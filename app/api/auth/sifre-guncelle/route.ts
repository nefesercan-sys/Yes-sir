import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { token, sifre } = await req.json();

    if (!token || !sifre) {
      return NextResponse.json({ error: 'Eksik bilgi gönderildi.' }, { status: 400 });
    }

    if (sifre.length < 6) {
      return NextResponse.json({ error: 'Şifre en az 6 karakter olmalıdır.' }, { status: 400 });
    }

    const db = await getDb();

    // 1. ADIM: Token kontrolü
    // Hem 'expires' hem 'expiry' kontrolü yapıyoruz (veritabanında hangisi varsa)
    const resetRecord = await db.collection('password_resets').findOne({
      token: token,
      kullanildi: false,
      $or: [
        { expires: { $gt: new Date() } },
        { expiry: { $gt: new Date() } }
      ]
    });

    if (!resetRecord) {
      return NextResponse.json({ error: 'Link geçersiz veya süresi dolmuş.' }, { status: 400 });
    }

    // 2. ADIM: Yeni şifreyi güvenli hale getir
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(sifre, salt);

    // 3. ADIM: Kullanıcı tablosunu güncelle
    const userUpdate = await db.collection('users').updateOne(
      { email: resetRecord.email },
      { 
        $set: { 
          password: hashedPassword, 
          updatedAt: new Date(),
          guncellenmeTarihi: new Date() 
        } 
      }
    );

    if (userUpdate.matchedCount === 0) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    }

    // 4. ADIM: Token'ı "Kullanıldı" yap ki tekrar girmesinler
    await db.collection('password_resets').updateOne(
      { token: token },
      { $set: { kullanildi: true, kullanılanTarih: new Date() } }
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Şifreniz başarıyla güncellendi.' 
    });

  } catch (error: any) {
    console.error('Şifre güncelleme hatası:', error);
    return NextResponse.json({ 
      error: 'Sunucu tarafında bir hata oluştu: ' + error.message 
    }, { status: 500 });
  }
}
