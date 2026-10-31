// İstemci tarafı medya yükleme yardımcısı (terzi talep, otel profili).
// Vercel sunucusuz fonksiyonlarında istek gövdesi ~4,5 MB ile sınırlıdır; telefon fotoğrafları genelde daha büyüktür.
// Bu yüzden resimler yüklenmeden önce cihazda küçültülür (en uzun kenar 1600 px, JPEG).
// Hata durumunda kullanıcıya gösterilecek açık bir mesajla reddedilir (sessizce yutulmaz).

const VERCEL_GOVDE_SINIRI = 4 * 1024 * 1024; // güvenli sınır (4,5 MB'ın altında)
const EN_UZUN_KENAR = 1600;

export class YuklemeHatasi extends Error {}

function resmiYukle(dosya: File): Promise<HTMLImageElement> {
  return new Promise((coz, red) => {
    const url = URL.createObjectURL(dosya);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); coz(img); };
    img.onerror = () => { URL.revokeObjectURL(url); red(new Error('çözülemedi')); };
    img.src = url;
  });
}

/** Resmi küçültür; küçültülemezse ve zaten sınırın altındaysa orijinali döndürür. */
export async function resmiKucult(dosya: File): Promise<File> {
  if (!dosya.type.startsWith('image/') || dosya.type === 'image/gif') return dosya;
  try {
    const img = await resmiYukle(dosya);
    const oran = Math.min(1, EN_UZUN_KENAR / Math.max(img.naturalWidth, img.naturalHeight));
    // Zaten küçük ve hafifse dokunma
    if (oran === 1 && dosya.size <= 1.5 * 1024 * 1024) return dosya;
    const w = Math.max(1, Math.round(img.naturalWidth * oran));
    const h = Math.max(1, Math.round(img.naturalHeight * oran));
    const tuval = document.createElement('canvas');
    tuval.width = w; tuval.height = h;
    const ctx = tuval.getContext('2d');
    if (!ctx) throw new Error('canvas yok');
    ctx.drawImage(img, 0, 0, w, h);
    for (const kalite of [0.82, 0.7, 0.55]) {
      const blob: Blob | null = await new Promise((c) => tuval.toBlob(c, 'image/jpeg', kalite));
      if (blob && blob.size <= VERCEL_GOVDE_SINIRI) {
        const ad = dosya.name.replace(/\.[^.]+$/, '') + '.jpg';
        return new File([blob], ad, { type: 'image/jpeg' });
      }
    }
  } catch {
    /* tarayıcı bu formatı çözemedi (ör. HEIC): aşağıda boyuta göre karar verilir */
  }
  return dosya;
}

export interface YuklenenMedya { url: string; tip: 'resim' | 'video'; }

/** Dosyayı /api/upload'a gönderir. Başarısızlıkta YuklemeHatasi fırlatır (kullanıcıya gösterilecek metinle). */
export async function medyaYukle(dosya: File): Promise<YuklenenMedya> {
  const hazir = await resmiKucult(dosya);
  if (hazir.size > VERCEL_GOVDE_SINIRI) {
    throw new YuklemeHatasi(
      hazir.type.startsWith('video/')
        ? `"${dosya.name}" çok büyük (en fazla 4 MB). Video yerine fotoğraf ekleyin veya videoyu WhatsApp'tan gönderin.`
        : `"${dosya.name}" işlenemedi. Lütfen JPG veya PNG biçiminde bir fotoğraf seçin.`,
    );
  }
  const fd = new FormData();
  fd.append('file', hazir);
  let res: Response;
  try {
    res = await fetch('/api/upload', { method: 'POST', body: fd });
  } catch {
    throw new YuklemeHatasi('Bağlantı hatası: fotoğraf yüklenemedi. İnternetinizi kontrol edip tekrar deneyin.');
  }
  const veri = await res.json().catch(() => ({} as Record<string, unknown>));
  if (!res.ok || typeof veri.url !== 'string') {
    const mesaj = typeof veri.error === 'string' && veri.error ? veri.error : 'Fotoğraf yüklenemedi. Lütfen tekrar deneyin.';
    throw new YuklemeHatasi(res.status === 429 ? 'Çok fazla yükleme yaptınız. Birkaç dakika sonra tekrar deneyin.' : mesaj);
  }
  return { url: veri.url, tip: veri.tip === 'video' ? 'video' : 'resim' };
}
