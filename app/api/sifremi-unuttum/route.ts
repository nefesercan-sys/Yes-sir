import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'E-posta zorunludur.' }, { status: 400 });

    const db = await getDb();
    const emailKucuk = email.toLowerCase().trim();
    const user = await db.collection('users').findOne({ email: emailKucuk });

    if (!user) return NextResponse.json({ success: true });

    const token = randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await db.collection('password_resets').insertOne({
      email: emailKucuk,
      token,
      expiry,
      kullanildi: false,
      createdAt: new Date(),
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/sifre-sifirla?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HizmetAra" <${process.env.SMTP_USER}>`,
      to: emailKucuk,
      subject: 'HizmetAra — Şifre Sıfırlama',
      html: `
        <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;background:#f8fafc;padding:32px 16px;">
          <div style="background:white;border-radius:20px;padding:32px;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <div style="text-align:center;margin-bottom:24px;">
              <span style="font-size:32px;">🌐</span>
              <h1 style="font-size:22px;font-weight:800;color:#0f172a;margin:8px 0 4px;">HizmetAra</h1>
              <p style="color:#94a3b8;font-size:13px;">Şifre Sıfırlama Talebi</p>
            </div>
            <p style="color:#475569;font-size:14px;line-height:1.6;margin-bottom:24px;">
              Merhaba,<br><br>
              HizmetAra hesabınız için şifre sıfırlama talebinde bulundunuz.
            </p>
            <div style="text-align:center;margin-bottom:24px;">
              <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;background:#2563eb;color:white;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;">
                🔒 Şifremi Sıfırla
              </a>
            </div>
            <p style="color:#94a3b8;font-size:12px;line-height:1.6;">
              Bu link <strong>1 saat</strong> geçerlidir. Bu talebi siz yapmadıysanız görmezden gelebilirsiniz.
            </p>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
            <p style="color:#cbd5e1;font-size:11px;text-align:center;">HizmetAra — Hizmet Al, Hizmet Ver</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('Şifremi unuttum hatası:', e);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
