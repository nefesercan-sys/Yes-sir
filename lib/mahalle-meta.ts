// SwapHubs — Konyaaltı ve Muratpaşa mahalle sayfaları için elle yazılmış başlık / açıklama / anahtar kelime.
// Kurallar: başlık ≤60, açıklama ≤158 (telefon dahil); doğrulanmamış vaat yok (mesafe, dakika, puan, kurye süresi);
// ücretsiz servis yalnızca yakın mahallelerde; terzihizmeti.com.tr ile aynı başlık kullanılmaz.
type M = { t: string; d: string; kw: string[] };
const FREE = ' {{F}}';
import { isFreeService } from '@/lib/business';
// Ücretsiz servis listesi tek kaynaktan (lib/business.ts FREE_SERVICE_SLUGS); otellere servis her bölgede ücretsiz.
const BANK: Record<string, M> = {
  hurma: { t: 'Hurma Terzi Çağır · Tamir, Tadilat, Dikim', d: "Hurma'da tamir tadilat, özel dikim, daraltma, kısaltma: fotoğraf at, fiyat al. Paça ₺200'den, fermuar ₺300'den." + FREE,
    kw: ['tamir tadilat', 'özel dikim', 'ölçüye göre dikim', 'bay bayan elbise dikimi', 'elbise daraltma', 'elbise kısaltma', 'pantolon kısaltma', 'kot paçası kısaltma', 'fermuar değişimi', 'abiye tamiri', 'beden ayarlama', 'yakınımda terzi'] },
  liman: { t: 'Liman Terzi · Fermuar Değişimi, Beden Ayarı', d: "Liman'da fermuar değişimi ₺300'den, paça kısaltma ₺200'den, bel daraltma, beden ayarlama. Fotoğraf at, fiyat al." + FREE,
    kw: ['fermuar değişimi', 'fermuar tamiri', 'mont fermuar değişimi', 'beden ayarlama', 'beden küçültme', 'beden büyütme', 'bel daraltma', 'pantolon daraltma', 'kot paçası kısaltma', 'şort kısaltma', 'tamir tadilat', 'özel dikim'] },
  sarisu: { t: 'Sarısu Terzi · Kot Paçası, Şort, Etek Kısaltma', d: "Sarısu'da kot paçası, şort, etek, pantolon kısaltma, bel daraltma, tamir. Paça ₺200'den. Fiyat için fotoğraf at." + FREE,
    kw: ['kot paçası kısaltma', 'kot daraltma', 'şort kısaltma', 'şort daraltma', 'etek kısaltma', 'etek daraltma', 'pantolon kısaltma', 'bel daraltma', 'çocuk kıyafet tadilatı', 'özel dikim', 'fermuar değişimi', 'tamir tadilat'] },
  uncali: { t: 'Uncalı Terzi · Abiye Tamiri, Elbise Tadilat', d: "Uncalı'da abiye tamiri, tadilatı, elbise daraltma, kısaltma. Abiye ₺800'den, paça ₺200'den. Fotoğraf at, fiyat al." + FREE,
    kw: ['abiye tamiri', 'abiye tadilatı', 'abiye daraltma', 'abiye kısaltma', 'abiye fermuar değişimi', 'elbise daraltma', 'elbise kısaltma', 'bayan elbise dikimi', 'gelinlik tadilatı', 'etek kısaltma', 'ölçüye göre özel dikim', 'tamir tadilat'] },
  gursu: { t: 'Gürsu Terzi · Pantolon, Ceket, Mont Tadilatı', d: "Gürsu'da pantolon, ceket, mont, gömlek tadilatı; kısaltma, daraltma, fermuar. Paça ₺200'den. Fotoğraf at, fiyat al." + FREE,
    kw: ['pantolon kısaltma', 'pantolon daraltma', 'ceket tadilatı', 'ceket daraltma', 'mont kısaltma', 'mont tamiri', 'gömlek daraltma', 'gömlek kısaltma', 'erkek terzi', 'bay bayan terzi', 'fermuar değişimi', 'özel dikim'] },
  cakirlar: { t: 'Çakırlar Terzi · Bay Bayan Özel Dikim', d: "Çakırlar'da bay bayan özel dikim, ölçüye göre elbise, gömlek, pantolon, etek; tamir tadilat. Fotoğraf at, fiyat al.",
    kw: ['özel dikim', 'bay bayan özel dikim', 'ölçüye göre elbise', 'gömlek dikimi', 'pantolon dikimi', 'etek dikimi', 'tamir tadilat', 'daraltma kısaltma', 'fermuar değişimi'] },
  meltem: { t: 'Meltem Terzi Çağır · Daraltma, Kısaltma', d: "Meltem'de daraltma, kısaltma, fermuar değişimi, tamir tadilat: pantolon, kot, etek, elbise. Fotoğraf at, fiyat al." + FREE,
    kw: ['daraltma', 'kısaltma', 'pantolon daraltma', 'kot paçası kısaltma', 'etek kısaltma', 'elbise daraltma', 'fermuar değişimi', 'beden ayarlama', 'tamir tadilat', 'özel dikim'] },
  sirinyali: { t: 'Şirinyalı Terzi · Tamir, Tadilat, Elbise', d: "Şirinyalı'da tamir tadilat, elbise ve abiye tadilatı, kısaltma, daraltma. Paça ₺200'den. Fotoğraf at, fiyat al." + FREE,
    kw: ['tamir tadilat', 'elbise tadilatı', 'abiye tadilatı', 'abiye tamiri', 'elbise kısaltma', 'pantolon kısaltma', 'şort kısaltma', 'fermuar değişimi', 'beden ayarlama', 'otel terzi'] },
  fener: { t: 'Fener Terzi · Gömlek, Etek, Elbise Tadilat', d: "Fener'de gömlek, etek, elbise, ceket tadilatı; kısaltma, daraltma, fermuar değişimi. Fotoğraf at, fiyat al. Paça ₺200'den." + FREE,
    kw: ['gömlek daraltma', 'gömlek kısaltma', 'etek kısaltma', 'elbise daraltma', 'elbise kısaltma', 'ceket tadilatı', 'mont tamiri', 'fermuar değişimi', 'bay bayan terzi', 'özel dikim', 'tamir tadilat'] },
  guzeloba: { t: 'Güzeloba Terzi · Fotoğrafla Fiyat Al', d: "Güzeloba için terzi: tamir, tadilat, kısaltma, daraltma. Fotoğraf at, fiyat al, birlikte netleştirelim. Paça ₺200'den.",
    kw: ['tamir tadilat', 'kısaltma', 'daraltma', 'fermuar değişimi'] },
};
export function mahalleMeta(slug: string, ad: string, phone: string, ilce = 'Konyaaltı') {
  const b = BANK[slug];
  const title = b ? `${b.t} | SwapHubs` : `${ad} Terzi Çağır | SwapHubs`;
  const dd = b ? b.d.replace(' {{F}}', isFreeService(slug) ? ' Ücretsiz alım-teslim.' : ' Otele ücretsiz servis.') : '';
  const desc = b ? `${dd} ☎ ${phone}` : `${ad} tamir tadilat lazım mı? Fotoğraf at, fiyat al. ☎ ${phone}`;
  const base = [`${ad} terzi`, `${ad} mahallesi terzi`, `${ad} ${ilce} terzi`, `${ad} terzi çağır`];
  const kw = [...base, ...(b?.kw ?? []).map((k) => `${ad} ${k}`), `${ilce} terzi`, 'Antalya terzi'];
  return { title, desc, kw: Array.from(new Set(kw)) };
}
