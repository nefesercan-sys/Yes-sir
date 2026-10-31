import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import { clean } from '@/lib/api-guard';
import { medyaListesi, sonluSayi } from '@/lib/validate';

// ── Alan beyaz listesi ──
// İstemci yalnızca aşağıdaki alanları yazabilir. email, _id, onaylandi, puan, teklifSayisi vb. ASLA istemciden alınmaz.
const METIN_ALANLARI: Record<string, number> = {
  otelAdi: 120, yildiz: 10, tesisTipi: 60, ulke: 60, sehir: 60, adres: 300,
  telefon: 30, aciklama: 3000, sezonBilgisi: 1000,
};
const SAYI_ALANLARI = ['odaSayisi', 'fiyatMin', 'fiyatMax'];
const LISTE_ALANLARI = [
  'eglencel', 'havuzPlaj', 'icecekSecenekleri', 'karaAktivite', 'odaTipleri',
  'olanaklar', 'paketler', 'suSporlari', 'yemekSecenekleri',
];

/** Gövdeden yalnızca izinli alanları, doğrulanmış/kırpılmış halde döndürür; gönderilmeyen alan sonuçta yer almaz. */
function otelAlanlari(b: any): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (!b || typeof b !== 'object') return out;
  for (const [k, max] of Object.entries(METIN_ALANLARI)) {
    if (typeof b[k] === 'string' || typeof b[k] === 'number') out[k] = clean(String(b[k]), max);
  }
  if (typeof b.website === 'string') {
    const w = b.website.trim().slice(0, 200);
    out.website = /^https?:\/\/[^\s<>"']+$/i.test(w) ? w : ''; // yalnızca http(s) bağlantısı
  }
  for (const k of SAYI_ALANLARI) {
    if (b[k] === undefined || b[k] === '' || b[k] === null) continue;
    const n = sonluSayi(b[k]);
    if (n !== null && n >= 0 && n <= 1e9) out[k] = n;
  }
  for (const k of LISTE_ALANLARI) {
    if (Array.isArray(b[k])) out[k] = b[k].filter((x: unknown) => typeof x === 'string').slice(0, 40).map((x: string) => clean(x, 80)).filter(Boolean);
  }
  if (Array.isArray(b.medyalar)) out.medyalar = medyaListesi(b.medyalar, 20);
  return out;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Geçersiz istek' }, { status: 400 });
    const db = await getDb();

    const alanlar = otelAlanlari(body);
    if (!alanlar.otelAdi) {
      return NextResponse.json({ error: 'Tesis adı zorunlu' }, { status: 400 });
    }

    await db.collection('otel_profiller').updateOne(
      { email: session.user.email },
      {
        // e-posta her zaman OTURUMDAN gelir; onay durumu sunucuda sıfırlanır (içerik değişince yeniden incelenir)
        $set: { ...alanlar, email: session.user.email, guncellendi: new Date(), onaylandi: false },
        // puan/teklifSayisi yalnızca ilk kayıtta başlatılır; her kayıtta sıfırlanmaz
        $setOnInsert: { olusturuldu: new Date(), puan: 0, teklifSayisi: 0 },
      },
      { upsert: true }
    );

    await db.collection('users').updateOne(
      { email: session.user.email },
      {
        $set: {
          tip: 'otel',
          profilTamamlandi: true,
          firmaAd: (alanlar.otelAdi as string) || '',
          guncellendi: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('Otel profil hatası:', e);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  const db = await getDb();
  const profil = await db.collection('otel_profiller').findOne({
    email: session.user.email,
  });

  return NextResponse.json(JSON.parse(JSON.stringify(profil || {})));
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const alanlar = otelAlanlari(body);
  if (Object.keys(alanlar).length === 0) {
    return NextResponse.json({ error: 'Güncellenecek geçerli alan yok' }, { status: 400 });
  }
  const db = await getDb();

  await db.collection('otel_profiller').updateOne(
    { email: session.user.email },
    { $set: { ...alanlar, guncellendi: new Date() } }
  );

  return NextResponse.json({ success: true });
}
