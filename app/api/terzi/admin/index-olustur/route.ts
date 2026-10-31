// ============================================================
// SwapHubs — app/api/terzi/admin/index-olustur/route.ts
// MongoDB indekslerini (geo 2dsphere, unique, TTL) tek seferde oluşturur; her biri ayrı denenir ve sonuç listelenir.
// Terminal/Node ortamı olmayanlar için: tarayıcıdan tek tıkla
// çalıştırılabilir. ADMIN_SECRET ile korunur.
// Kullanım: yönetici hesabıyla giriş yapıp /api/terzi/admin/index-olustur adresini açın (parola URL'ye YAZILMAZ).
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAdminSecretOrSession } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const yetki = await requireAdminSecretOrSession(req);
  if (yetki) return yetki;

  const db = await getDb();
  const liste: { koleksiyon: string; alan: Record<string, any>; secenek?: Record<string, any> }[] = [
    { koleksiyon: 'ilanlar', alan: { location: '2dsphere' } },
    { koleksiyon: 'teklifler', alan: { location: '2dsphere' } },
    { koleksiyon: 'ilanlar', alan: { slug: 1 }, secenek: { sparse: true } },
    { koleksiyon: 'ilanlar', alan: { durum: 1, createdAt: -1 } },
    { koleksiyon: 'users', alan: { email: 1 }, secenek: { unique: true, sparse: true } },
    { koleksiyon: 'terziKullanicilar', alan: { telefon: 1 }, secenek: { unique: true, sparse: true } },
    { koleksiyon: 'password_resets', alan: { tokenHash: 1 } },
    { koleksiyon: 'password_resets', alan: { expires: 1 }, secenek: { expireAfterSeconds: 0 } },
    { koleksiyon: 'hizSayaclari', alan: { sonGuncelleme: 1 }, secenek: { expireAfterSeconds: 86400 } },
    { koleksiyon: 'bal_urunler', alan: { slug: 1 }, secenek: { unique: true, sparse: true } },
  ];
  // Her indeks ayrı denenir: biri başarısız olursa (ör. çift kayıt nedeniyle unique kurulamazsa) diğerleri etkilenmez.
  const sonuc: { indeks: string; durum: string }[] = [];
  for (const it of liste) {
    const ad = `${it.koleksiyon} ${JSON.stringify(it.alan)}`;
    try {
      await db.collection(it.koleksiyon).createIndex(it.alan as any, (it.secenek || {}) as any);
      sonuc.push({ indeks: ad, durum: 'tamam' });
    } catch (err) {
      sonuc.push({ indeks: ad, durum: 'HATA: ' + (err instanceof Error ? err.message : String(err)).slice(0, 160) });
    }
  }
  const hata = sonuc.filter((x) => x.durum !== 'tamam').length;
  return NextResponse.json({ success: hata === 0, hataSayisi: hata, sonuc });
}
