// lib/password-reset.ts — şifre sıfırlama için ortak yardımcılar.
// Token veritabanında DÜZ METİN değil, SHA-256 özeti olarak saklanır (veritabanı sızsa bile bağlantılar kullanılamaz).
import { createHash, randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getDb } from '@/lib/mongodb';
import { clean, isEmail, rateLimited } from '@/lib/api-guard';
import { pencereSayaci } from '@/lib/hiz-sayaci';

export const RESET_SURE_MS = 60 * 60 * 1000; // 1 saat

export const hashToken = (t: string) => createHash('sha256').update(t).digest('hex');

/** Yalnızca 64 karakterlik hex dizesi geçerli token sayılır (nesne/operatör enjeksiyonunu keser). */
export const tokenGecerliMi = (t: unknown): t is string => typeof t === 'string' && /^[0-9a-f]{64}$/i.test(t);

/** "Şifremi unuttum" isteği: hız sınırı + giriş doğrulama + token üretimi + e-posta.
 *  Kullanıcı yok / e-posta başına limit aşıldı / SMTP hatası durumlarında da AYNI başarı yanıtı döner (hesap taraması önlenir). */
export async function sifirlamaIstegi(req: Request, govde: unknown): Promise<NextResponse> {
  if (rateLimited(req, 'sifre-iste', 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin.' }, { status: 429 });
  }
  const email = clean((govde as { email?: unknown } | null)?.email, 254).toLowerCase();
  if (!email || !isEmail(email)) {
    return NextResponse.json({ error: 'Geçerli bir e-posta girin.' }, { status: 400 });
  }
  try {
    const db = await getDb();
    const BASARI = NextResponse.json({ success: true });
    // E-posta başına saatte en çok 3 istek (atomik); aşılırsa sessizce aynı yanıt — başkasının kutusuna yağdırma engellenir
    if ((await pencereSayaci(db, `sifre-iste:${email}`, 60 * 60 * 1000)) > 3) return BASARI;

    const user = await db.collection('users').findOne({ email });
    if (!user) return BASARI; // hesap taramasını engellemek için aynı yanıt

    // Yeni talep eskileri geçersiz kılar: aynı anda yalnızca en son bağlantı çalışır
    await db.collection('password_resets').updateMany(
      { email, kullanildi: false },
      { $set: { kullanildi: true, iptalTarihi: new Date() } }
    );

    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + RESET_SURE_MS);
    await db.collection('password_resets').insertOne({
      email, tokenHash: hashToken(token), expires, kullanildi: false, createdAt: new Date(),
    });

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://swaphubs.com';
    const resetLink = `${siteUrl}/sifre-sifirla?token=${token}`;
    try {
    const kullanici = process.env.SMTP_USER || process.env.EMAIL_USER;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: kullanici, pass: process.env.SMTP_PASS || process.env.EMAIL_PASS },
    });
    await transporter.sendMail({
      from: `"SwapHubs" <${kullanici}>`,
      to: email,
      subject: 'SwapHubs - Şifre Sıfırlama Talebi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">SwapHubs</h1>
          </div>
          <div style="padding: 32px; background-color: #ffffff; color: #334155;">
            <h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Şifre Sıfırlama Talebi</h2>
            <p style="font-size: 15px; line-height: 1.6;">Merhaba,</p>
            <p style="font-size: 15px; line-height: 1.6;">Hesabınızın şifresini sıfırlamak için bir talep aldık. Aşağıdaki butona tıklayarak yeni şifrenizi belirleyebilirsiniz.</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetLink}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Şifremi Sıfırla</a>
            </div>
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; border-top: 1px solid #e2e8f0; padding-top: 16px;">
              Bu talebi siz yapmadıysanız bu e-postayı dikkate almayın.<br><br>
              Bu bağlantı güvenliğiniz için 1 saat içinde geçerliliğini yitirecektir.
            </p>
          </div>
        </div>`,
    });
    } catch (e) {
      // SMTP hatası kullanıcıya yansıtılmaz (var/yok farkı sızdırmasın); yalnızca sunucu günlüğüne yazılır
      console.error('Şifre sıfırlama e-postası gönderilemedi:', e instanceof Error ? e.message : e);
    }
    return BASARI;
  } catch (e) {
    console.error('Şifre sıfırlama isteği hatası:', e);
    return NextResponse.json({ error: 'İstek işlenemedi, lütfen daha sonra tekrar deneyin.' }, { status: 500 });
  }
}
