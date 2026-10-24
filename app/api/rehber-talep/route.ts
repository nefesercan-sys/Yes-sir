import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getDb } from '@/lib/mongodb';
import { clean, isEmail, isPhone, rateLimited, ADMIN_EMAIL } from '@/lib/api-guard';
import { telegramMesajGonder } from '@/lib/telegram';

// Antalya rehberi (statik sayfalar) "bize yazın" formu. Talep veritabanına kaydedilir,
// Telegram (ADMIN_TELEGRAM_CHAT_ID) ve/veya e-posta ile bildirilir.
const HTML = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function POST(req: NextRequest) {
  try {
    if (rateLimited(req, 'rehber-talep', 5, 10 * 60 * 1000)) {
      return NextResponse.json({ ok: false, error: 'rate' }, { status: 429 });
    }
    const b = await req.json().catch(() => null);
    if (!b || typeof b !== 'object') return NextResponse.json({ ok: false, error: 'bad' }, { status: 400 });
    // Bot tuzağı: görünmeyen alan doluysa sessizce başarılı dön
    if (clean(b.web, 50)) return NextResponse.json({ ok: true });

    const ad = clean(b.ad, 80);
    const iletisim = clean(b.iletisim, 120);
    const konu = clean(b.konu, 160);
    const dil = ['ru', 'de', 'en'].includes(b.dil) ? b.dil : 'en';
    const bolge = clean(b.bolge, 120);
    const tarih = clean(b.tarih, 60);
    const kisi = clean(String(b.kisi ?? ''), 10);
    const mesaj = clean(b.mesaj, 1000);
    if (b.onay !== true) return NextResponse.json({ ok: false, error: 'consent' }, { status: 400 });
    if (ad.length < 2 || !(isEmail(iletisim.toLowerCase()) || isPhone(iletisim))) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }

    const kayit = { ad, iletisim, konu, dil, bolge, tarih, kisi, mesaj, kaynak: clean(b.sayfa, 200), durum: 'yeni', createdAt: new Date() };
    try {
      const db = await getDb();
      await db.collection('rehber_talepleri').insertOne(kayit);
    } catch (e) {
      console.error('[rehber-talep] DB hatası:', e);
    }

    const metin = [
      `🧭 <b>Antalya rehberi talebi</b> (${dil.toUpperCase()})`,
      `<b>Konu:</b> ${HTML(konu)}`,
      `<b>Ad:</b> ${HTML(ad)}`,
      `<b>İletişim:</b> ${HTML(iletisim)}`,
      bolge ? `<b>Otel/bölge:</b> ${HTML(bolge)}` : '',
      tarih ? `<b>Tarih:</b> ${HTML(tarih)}` : '',
      kisi ? `<b>Kişi:</b> ${HTML(kisi)}` : '',
      mesaj ? `<b>Mesaj:</b> ${HTML(mesaj)}` : '',
    ].filter(Boolean).join('\n');

    let bildirildi = false;
    if (process.env.ADMIN_TELEGRAM_CHAT_ID) {
      const r = await telegramMesajGonder(process.env.ADMIN_TELEGRAM_CHAT_ID, metin);
      bildirildi = !!r.success;
    }
    const user = process.env.EMAIL_USER || process.env.SMTP_USER;
    const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
    if (!bildirildi && user && pass) {
      try {
        const t = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
        await t.sendMail({ from: user, to: ADMIN_EMAIL, subject: `Antalya rehberi talebi: ${konu}`.slice(0, 150), html: metin.replace(/\n/g, '<br>') });
      } catch (e) {
        console.error('[rehber-talep] e-posta hatası:', e);
      }
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[rehber-talep]', e);
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
