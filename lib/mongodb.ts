import { MongoClient, MongoClientOptions } from 'mongodb';

// 1. Fail-Fast: Bağlantı dizesi yoksa açıkça bağır ve durdur
if (!process.env.MONGODB_URI) {
  throw new Error('Kritik Hata: Çevre değişkenlerinde MONGODB_URI tanımlı değil!');
}

const uri = process.env.MONGODB_URI;

// 2. Serverless Optimizasyonu: Bağlantı havuzu ayarları
const options: MongoClientOptions = {
  maxPoolSize: 10,        // Her bir Vercel instance'ı maksimum 10 bağlantı açabilir
  minPoolSize: 1,         // Hazırda en az 1 bağlantı beklet
  maxIdleTimeMS: 10000,   // 10 saniye boşta kalan bağlantıyı kapatıp RAM'i boşalt
};

declare global {
  var _mc: Promise<MongoClient> | undefined;
}

// Her ortamda (üretim dahil) client global'de önbelleğe alınır: sıcak sunucusuz örnek yeniden bağlanmaz,
// modül birden çok kez değerlendirilse bile bağlantı havuzu çoğalmaz.
function baglan(): Promise<MongoClient> {
  if (!global._mc) {
    const p = new MongoClient(uri, options).connect();
    global._mc = p;
    // Bağlantı hatası kalıcı önbelleğe yapışmasın: sonraki istek yeniden denesin
    p.catch(() => { if (global._mc === p) global._mc = undefined; });
  }
  return global._mc;
}

const clientPromise: Promise<MongoClient> = baglan();

export default clientPromise;

export async function getDb() {
  // Bağlantı kurulduğunda veritabanını döndürür
  return (await baglan()).db('hizmetara');
}
