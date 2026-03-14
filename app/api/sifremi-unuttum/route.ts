import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'E-posta zorunludur.' }, { status: 400 });

    const db = await getDb();
    const emailKucuk = email.toLowerCase().trim();
    const user = await db.collection('users').findOne({ email: emailKucuk });

    if (!user) {
      // Güvenlik: Kötü niyetli kişiler kimin üye olduğunu bulamasın diye her zaman başarılı dönüyoruz
      return NextResponse.json({ success: true });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 saat geçerli

    await db.collection('password_resets').insertOne({
      email: emailKucuk,
      token,
      expiry,
      kullanildi: false,
      createdAt: new Date(),
    });

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://swaphubs.com';
    const resetLink = `${siteUrl}/sifre-sifirla?token=${token}`;

    // 🚀 GMAIL İÇİN FOOLPROOF (KUSURSUZ) AYAR: 
    // Sadece "service: 'gmail'" yazmak yeterlidir. Host ve Port'a gerek yok.
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER, // Senin nefesercan@gmail.com adresin
        pass: process.env.EMAIL_PASS, // Google'dan alacağın 16 haneli uygulama şifresi
      },
    });

    const mailOptions = {
      from: `"SwapHubs" <${process.env.EMAIL_USER}>`,
      to: emailKucuk,
      subject: 'SwapHubs - Şifre Sıfırlama Talebi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px;">SwapHubs</h1>
          </div>
          <div style="padding: 32px; background-color: #ffffff; color: #334155;">
            <h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Şifre Sıfırlama Talebi</h2>
            <p style="font-size: 15px; line-height: 1.6;">Merhaba,</p>
            <p style="font-size: 15px; line-height: 1.6;">Hesabınızın şifresini sıfırlamak için bir talep aldık. Aşağıdaki butona tıklayarak yeni şifrenizi belirleyebilirsiniz:</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetLink}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Yeni Şifre Belirle</a>
            </div>
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; border-top: 1px solid #e2e8f0; padding-top: 16px;">
              Bu talebi siz yapmadıysanız, lütfen bu e-postayı dikkate almayın.<br><br>
              Bu bağlantı güvenliğiniz için 1 saat içinde geçerliliğini yitirecektir.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Sifremi unuttum hatasi:', error);
    return NextResponse.json({ error: 'Sunucu hatasi' }, { status: 500 });
  }
}
