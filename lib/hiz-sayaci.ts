// lib/hiz-sayaci.ts — MongoDB tabanlı, ATOMİK sabit pencereli sayaç (sunucusuz ortamda örnekler arası ortak).
// Tek belge üzerinde tek bir güncelleme boru hattı ile çalışır: oku-sonra-yaz yarışı yoktur.
// Anahtar belgenin _id'sidir (string), bu yüzden ek indeks gerekmez. İsteğe bağlı TTL: { sonGuncelleme: 1 } expireAfterSeconds.
import type { Db } from 'mongodb';

const KOLEKSIYON = 'hizSayaclari';

/** Pencere içindeki istek sayısını bir artırır ve YENİ sayıyı döner (pencere dolmuşsa 1'den başlar). */
export async function pencereSayaci(db: Db, anahtar: string, pencereMs: number): Promise<number> {
  const simdi = new Date();
  const esik = new Date(simdi.getTime() - pencereMs);
  const aktif = {
    $and: [
      { $ne: [{ $type: '$pencereBaslangic' }, 'missing'] },
      { $gt: ['$pencereBaslangic', esik] },
    ],
  };
  const r: any = await db.collection(KOLEKSIYON).findOneAndUpdate(
    { _id: anahtar } as any,
    [
      {
        $set: {
          sayi: { $cond: [aktif, { $add: [{ $ifNull: ['$sayi', 0] }, 1] }, 1] },
          pencereBaslangic: { $cond: [aktif, '$pencereBaslangic', simdi] },
          sonGuncelleme: simdi,
        },
      },
    ] as any,
    { upsert: true, returnDocument: 'after' }
  );
  const doc = r && 'value' in r ? r.value : r; // sürücü sürümüne göre dönüş biçimi değişebilir
  return typeof doc?.sayi === 'number' ? doc.sayi : 1;
}

/** Sayacı sıfırlar (ör. başarılı girişten sonra). */
export async function sayaciSifirla(db: Db, anahtar: string): Promise<void> {
  await db.collection(KOLEKSIYON).deleteOne({ _id: anahtar } as any);
}
