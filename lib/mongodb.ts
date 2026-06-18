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

let clientPromise: Promise<MongoClient>;

declare global {
  var _mc: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mc) {
    global._mc = new MongoClient(uri, options).connect();
  }
  clientPromise = global._mc;
} else {
  // Production (Vercel) ortamında opsiyonlarla birlikte yeni client oluşturulur
  clientPromise = new MongoClient(uri, options).connect();
}

export default clientPromise;

export async function getDb() { 
  // Bağlantı kurulduğunda veritabanını döndürür
  return (await clientPromise).db('hizmetara'); 
}
