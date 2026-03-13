import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'E-posta zorunlu' }, { status: 400 });

  const db   = await getDb();
  const user = await db.collection('users').findOne({ email: email.toLowerCase() });

  // Kullanıcı yoksa bile başarılı dön (güvenlik)
  if (!user) return NextResponse.json({ success: true });

  const token   = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 saat

  await db.collection('sifre_sifirlama').insertOne({
    email:     email.toLowerCase(),
    token,
    expires,
    kullanildi: false,
    createdAt: new Date(),
  });

  // TODO: Gerçek e-posta gönderimi ekle (nodemailer / resend)
  // Şimdilik konsola yaz (geliştirme ortamı)
  console.log(`\n🔐 Şifre sıfırlama linki:\nhttp://localhost:3000/sifre-sifirla?token=${token}\n`);

  return NextResponse.json({ success: true });
}
