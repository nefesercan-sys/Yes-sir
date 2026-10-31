// ============================================================
// SwapHubs — app/api/terzi/profil/route.ts
// GET  : oturum sahibinin profil bilgisini döner (gizli alanlar hariç)
// PATCH: ad ve/veya terzi rolü (isProvider) günceller
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getSessionUserId } from '@/lib/terzi-session';
import { clean } from '@/lib/api-guard';
import { tamSayi } from '@/lib/validate';

// Şifre özeti, OTP ve deneme/kilit sayaçları istemciye ASLA dönmez.
const GIZLI_ALANLAR = {
  otpKod: 0, otpSonGecerlilik: 0, otpBasarisizDeneme: 0, otpSonTalepZamani: 0,
  otpTalepSayisiSaatlik: 0, otpTalepPencereBaslangic: 0, otpDogrulamaZamani: 0,
  sifreBasarisizDeneme: 0, sifreKilitlenmeZamani: 0,
};

export async function GET() {
  const userId = getSessionUserId();
  if (!userId || !ObjectId.isValid(userId)) return NextResponse.json(null, { status: 401 });

  const db = await getDb();
  // Projeksiyonda dışlama ile hesaplanan alan karıştırılamaz: sifreHash'i kodda çıkarıp yalnızca "var mı" bilgisini veriyoruz.
  const kullanici = await db.collection('terziKullanicilar').findOne(
    { _id: new ObjectId(userId) },
    { projection: GIZLI_ALANLAR }
  );
  if (!kullanici) return NextResponse.json(null, { status: 404 });

  const { sifreHash, ...acik } = kullanici as any;
  return NextResponse.json(JSON.parse(JSON.stringify({ ...acik, sifreVar: !!sifreHash })));
}

export async function PATCH(req: NextRequest) {
  const userId = getSessionUserId();
  if (!userId || !ObjectId.isValid(userId)) return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });

  const b = await req.json().catch(() => null);
  if (!b || typeof b !== 'object') return NextResponse.json({ error: 'Geçersiz istek' }, { status: 400 });
  const { ad, isProvider, serviceRadiusKm } = b;

  const guncelleme: Record<string, any> = {};
  if (typeof ad === 'string') guncelleme.ad = clean(ad, 80);
  if (typeof isProvider === 'boolean') guncelleme.isProvider = isProvider;
  if (typeof serviceRadiusKm === 'number' && Number.isFinite(serviceRadiusKm)) guncelleme.serviceRadiusKm = tamSayi(serviceRadiusKm, 1, 100, 15);
  if (Object.keys(guncelleme).length === 0) return NextResponse.json({ success: true });

  const db = await getDb();
  await db.collection('terziKullanicilar').updateOne({ _id: new ObjectId(userId) }, { $set: guncelleme });
  return NextResponse.json({ success: true });
}
