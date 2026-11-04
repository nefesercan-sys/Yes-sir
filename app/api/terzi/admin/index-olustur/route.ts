// ============================================================
// SwapHubs — app/api/terzi/admin/index-olustur/route.ts
// Geo sorgular ($near) için zorunlu 2dsphere indexlerini oluşturur.
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

  try {
    const db = await getDb();
    await db.collection('ilanlar').createIndex({ location: '2dsphere' });
    await db.collection('teklifler').createIndex({ location: '2dsphere' });

    // Tekil (unique) ve TTL indeksleri: mevcut veride yinelenen kayıt varsa oluşturma hata verir;
    // bu durumda uç nokta kırılmaz, hata sonuçta raporlanır (yinelenenler elle temizlendikten sonra yeniden çalıştırın).
    const ek: { ad: string; durum: string }[] = [];
    const dene = async (ad: string, koleksiyon: string, anahtar: Record<string, 1>, secenek: Record<string, unknown>) => {
      try {
        await db.collection(koleksiyon).createIndex(anahtar as any, secenek as any);
        ek.push({ ad, durum: 'tamam' });
      } catch (e) {
        console.error(`[index-olustur] ${ad} oluşturulamadı:`, e);
        ek.push({ ad, durum: `hata: ${String((e as Error)?.message || e).slice(0, 200)}` });
      }
    };
    // Yalnızca dolu string değeri olan belgeler indekslenir (boş/eksik alanlar çakışmaz).
    await dene('users.email unique', 'users', { email: 1 }, { unique: true, name: 'email_unique', partialFilterExpression: { email: { $type: 'string', $gt: '' } } });
    await dene('terziKullanicilar.telefon unique', 'terziKullanicilar', { telefon: 1 }, { unique: true, name: 'telefon_unique', partialFilterExpression: { telefon: { $type: 'string', $gt: '' } } });
    // Hız sayacı: son güncellemeden 1 gün sonra silinir (en uzun pencereden fazlasıyla büyük).
    await dene('hizSayaclari TTL', 'hizSayaclari', { sonGuncelleme: 1 }, { expireAfterSeconds: 86400, name: 'sonGuncelleme_ttl' });

    return NextResponse.json({ success: true, mesaj: '2dsphere indexleri oluşturuldu (ilanlar, teklifler)', ek });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
