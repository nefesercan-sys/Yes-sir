// ============================================================
// SwapHubs — scripts/terzi-index-olustur.ts
// Geo sorgular ($near) için zorunlu 2dsphere indexlerini oluşturur.
// Çalıştırma: npx tsx scripts/terzi-index-olustur.ts
// ============================================================
import { getDb } from '../lib/mongodb';

async function main() {
  const db = await getDb();
  await db.collection('ilanlar').createIndex({ location: '2dsphere' });
  await db.collection('teklifler').createIndex({ location: '2dsphere' });
  console.log('✅ 2dsphere indexleri oluşturuldu (ilanlar, teklifler)');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Index oluşturma hatası:', err);
  process.exit(1);
});
