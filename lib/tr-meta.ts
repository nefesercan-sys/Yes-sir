// TÜRKÇE yakın bölge sayfaları için elle yazılmış başlık/açıklama/anahtar kelime.
// Kurallar: başlık ≤60 (marka eki dahil), açıklama ≤155 (telefon dahil), uzak bölge adı yok.
// "{F}" yer tutucusu servis kuralına göre doldurulur (lib/business.ts: eve ücretsiz servis yalnız onaylı yakın mahallelerde, otellere her yerde).
// {loc} = sayfanın yer-durum kalıbı (örn. "Meltem'de"). Yeni bölge için bu tabloya satır ekle.
import { isFreeService } from '@/lib/business';
export interface TrMeta { title: string; desc: string; kw: string[] }
const T: Record<string, { t: string; d: string; kw: string[] }> = {
  konyaalti: { t: "Konyaaltı Terzi Çağır · Fotoğrafla Fiyat", d: "{loc} terzi: Hurma, Liman, Uncalı, Gürsu, Altınkum, Uluç. Fotoğraf at, fiyat al. Paça ₺200'den, fermuar ₺300'den. {F}", kw: ["Hurma terzi", "Liman terzi", "Uncalı terzi", "Sarısu terzi", "Gürsu terzi", "Altınkum terzi", "Uluç terzi", "sahil terzi", "ölçüye göre özel dikim", "beden ayarlama", "abiye tamiri", "kot paçası kısaltma", "mont ceket gömlek tadilatı", "şort pantolon etek kısaltma"] },
  muratpasa: { t: "Muratpaşa Terzi · Beden Ayarı, Daraltma", d: "{loc} beden ayarlama, bel ve pantolon daraltma, elbise kısaltma. Fotoğraf at, fiyat al. Bel daraltma ₺200'den.", kw: ["bel daraltma", "beden ayarlama", "beden küçültme", "pantolon daraltma", "elbise daraltma", "kıyafet daraltma", "fermuar değişimi", "tamir tadilat"] },
  meltem: { t: "Meltem Terzi · Mont, Ceket, Gömlek Tadilatı", d: "{loc} mont, ceket, gömlek, etek tadilatı; kısaltma, daraltma, tamir. Fotoğraf at, fiyat al, fermuar ₺300'den. {F}", kw: ["ceket tadilatı", "mont tamiri", "mont kısaltma", "gömlek daraltma", "etek kısaltma", "etek boy kısaltma", "mont fermuar değişimi", "tamir tadilat"] },
  fener: { t: "Fener Terzi · Elbise ve Özel Dikim", d: "{loc} bay bayan özel dikim, ölçüye göre elbise, gömlek, etek; tamir tadilat. Fotoğraf at, fiyat al. Elbise ₺800'den.", kw: ["elbise dikimi", "özel dikim", "ölçüye göre dikim", "bayan elbise dikimi", "bay terzi", "abiye dikimi", "gömlek dikimi", "etek dikimi"] },
  sirinyali: { t: "Şirinyalı Terzi · Keten, Pamuk Özel Dikim", d: "{loc} keten, pamuk elbise ve gömlek özel dikim, ölçüye göre; tamir, tadilat. Fotoğraf at, fiyat al. Elbise ₺800'den.", kw: ["keten elbise dikimi", "pamuk gömlek dikimi", "keten pantolon dikimi", "özel dikim", "ölçüye göre elbise", "tatil kıyafeti dikimi", "tamir tadilat"] },
  arapsuyu: { t: "Arapsuyu Terzi · Bay Bayan Tamir Tadilat", d: "{loc} bay bayan tamir tadilat: söküğü, yırtığı dikme, daraltma, kısaltma. Fotoğraf at, fiyat al. Paça ₺200'den. {F}", kw: ["tamir tadilat", "söküğü dikme", "yırtık tamiri", "abiye tamiri", "bay bayan terzi", "elbise tamiri", "daraltma kısaltma", "fermuar değişimi"] },
  toros: { t: "Toros Terzi · Fermuar, Paça, Bel Daraltma", d: "{loc} fermuar değişimi ₺300'den, paça kısaltma ₺200'den, bel daraltma. Fotoğraf at, fiyat al. {F}", kw: ["fermuar değişimi", "fermuar tamiri", "paça kısaltma", "pantolon kısaltma", "bel daraltma", "mont fermuar değişimi", "tamir tadilat"] },
  ogretmenevleri: { t: "Öğretmenevleri Terzi · Kot, Şort, Etek", d: "{loc} kot paçası, şort, pantolon, etek kısaltma ve daraltma. Fotoğraf at, fiyat al. Paça ₺200'den. {F}", kw: ["kot paçası kısaltma", "kot daraltma", "şort kısaltma", "şort daraltma", "pantolon kısaltma", "etek kısaltma", "etek daraltma", "fermuar değişimi"] },
  uluc: { t: "Uluç Terzi · Pantolon, Etek, Elbise Tadilat", d: "{loc} pantolon, etek, elbise daraltma ve kısaltma, tamir, özel dikim. Fotoğraf at, fiyat al. Paça ₺200'den. {F}", kw: ["pantolon daraltma", "etek daraltma", "elbise daraltma", "pantolon kısaltma", "etek kısaltma", "özel dikim", "tamir tadilat", "bay bayan terzi"] },
  siteler: { t: "Siteler Terzi · Abiye ve Elbise Tamiri", d: "{loc} abiye ve elbise tamiri, tadilatı ₺800'den; daraltma, kısaltma, fermuar. Fotoğraf at, fiyat al. {F}", kw: ["abiye tamiri", "abiye tadilatı", "abiye daraltma", "elbise tamiri", "elbise tadilatı", "gelinlik tadilatı", "fermuar değişimi", "özel dikim"] },
  altinkum: { t: "Altınkum Terzi · Sahil Kıyafeti Tamir, Tadilat", d: "{loc} plaj elbisesi, şort, pantolon tamiri ve kısaltma; fermuar, daraltma. Fotoğraf at, fiyat al. Paça ₺200'den. {F}", kw: ["tatil kıyafeti tamiri", "plaj elbisesi tamiri", "elbise tamiri", "şort kısaltma", "pantolon kısaltma", "fermuar değişimi", "tamir tadilat", "sahil terzi"] },
};
export function trNearDistrict(slug: string, name: string, loc: string, phone: string, brand: string): TrMeta | undefined {
  const e = T[slug]; if (!e) return undefined;
  const F = isFreeService(slug) ? 'Ücretsiz servis.' : 'Otele ücretsiz servis.';
  const d = e.d.includes('{F}') ? e.d.replace('{F}', F) : e.d;
  return { title: `${e.t} | ${brand}`, desc: `${d.replace('{loc}', loc.charAt(0).toUpperCase() + loc.slice(1))} ☎ ${phone}`.replace(/\s+/g, ' '), kw: e.kw.map((k) => `${name} ${k}`) };
}
