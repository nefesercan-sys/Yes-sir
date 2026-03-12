import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const SEKTOR_BILGI: Record<string, { ad: string; ornekler: string[]; unsplashQuery: string }> = {
  turizm: { ad: 'Turizm & Konaklama', ornekler: ['otel', 'pansiyon', 'villa', 'apart', 'butik otel'], unsplashQuery: 'hotel room luxury' },
  seyahat: { ad: 'Seyahat & Transfer', ornekler: ['airport transfer', 'şehirlerarası', 'tur', 'araç kiralama'], unsplashQuery: 'travel car transfer' },
  kiralama: { ad: 'Kiralama', ornekler: ['araç', 'ekipman', 'ofis', 'depo', 'iş makinası'], unsplashQuery: 'rental equipment car' },
  tamir: { ad: 'Tamir & Bakım', ornekler: ['beyaz eşya', 'elektronik', 'mobilya', 'klima', 'kombi'], unsplashQuery: 'repair technician tools' },
  usta: { ad: 'Usta & İşçi', ornekler: ['elektrik', 'su tesisatı', 'boya badana', 'fayans', 'alçıpan'], unsplashQuery: 'construction worker tools' },
  temizlik: { ad: 'Temizlik Hizmetleri', ornekler: ['ev temizliği', 'ofis temizliği', 'derin temizlik', 'cam silme'], unsplashQuery: 'cleaning service house' },
  uretim: { ad: 'Üretim & Özel Sipariş', ornekler: ['mobilya', 'tekstil', 'metal', 'ahşap', 'plastik'], unsplashQuery: 'manufacturing production factory' },
  giyim: { ad: 'Giyim & Tekstil', ornekler: ['terzi', 'nakış', 'baskı', 'toptan giyim', 'üniforma'], unsplashQuery: 'fashion clothing textile' },
  saglik: { ad: 'Sağlık & Güzellik', ornekler: ['masaj', 'güzellik salonu', 'diyet', 'fizyoterapi', 'psikoloji'], unsplashQuery: 'beauty salon spa wellness' },
  egitim: { ad: 'Eğitim & Danışmanlık', ornekler: ['dil kursu', 'özel ders', 'danışmanlık', 'koçluk', 'sertifika'], unsplashQuery: 'education learning study' },
  etkinlik: { ad: 'Etkinlik & Düğün', ornekler: ['düğün organizasyon', 'fotoğrafçı', 'catering', 'ses sistemi', 'dekor'], unsplashQuery: 'wedding event decoration' },
  mobilya: { ad: 'Mobilya & Dekorasyon', ornekler: ['iç mimarlık', 'mobilya tasarım', 'dekorasyon', 'peyzaj'], unsplashQuery: 'interior design furniture modern' },
};

const SEHIRLER = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Kayseri'];

function getUnsplashResimler(query: string, adet: number): string[] {
  const resimler: string[] = [];
  for (let i = 0; i < adet; i++) {
    const seed = Math.floor(Math.random() * 1000) + i * 100;
    resimler.push(`https://source.unsplash.com/800x600/?${encodeURIComponent(query)}&sig=${seed}`);
  }
  return resimler;
}

export async function POST(req: NextRequest) {
  try {
    const { sektorId, sehir, adet = 5, adminKey } = await req.json();

    if (adminKey !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      return NextResponse.json({ success: false, error: 'Siber Anahtar (Admin Key) yanlış veya eksik!' }, { status: 401 });
    }

    if (!sektorId || !SEKTOR_BILGI[sektorId]) {
      return NextResponse.json({ success: false, error: 'Geçersiz sektör seçimi.' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ success: false, error: 'Vercel ortam değişkenlerinde ANTHROPIC_API_KEY eksik!' }, { status: 500 });
    }

    const sektor = SEKTOR_BILGI[sektorId];
    const hedefSehir = sehir || SEHIRLER[Math.floor(Math.random() * SEHIRLER.length)];

    const prompt = `Sen bir ${sektor.ad} sektöründe hizmet arayan Türk müşterisinin ilan metnini yazıyorsun.
${hedefSehir} şehrinde ${sektor.ornekler.join(', ')} gibi hizmetler için ${adet} adet FARKLI ilan oluştur.

Her ilan için şu JSON formatını kullan:
{
  "baslik": "kısa ve net başlık (max 60 karakter)",
  "aciklama": "detaylı ihtiyaç açıklaması (100-200 kelime, gerçekçi ve samimi)",
  "butceMin": sayı,
  "butceMax": sayı,
  "sure": "ne zaman lazım (örn: Bu hafta, 2 hafta içinde, Acil)",
  "sehir": "${hedefSehir}",
  "ilce": "rastgele gerçek ilçe adı"
}

SADECE JSON array döndür:
[{...}, {...}]`;

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const claudeData = await claudeRes.json();

    if (!claudeRes.ok) {
      const hataMesaji = claudeData.error?.message || 'Bilinmeyen Anthropic Hatası';
      let turkceHata = hataMesaji;
      if (hataMesaji.includes('credit balance is too low')) {
        turkceHata = 'Yapay Zeka kredisiz kalmış! (Anthropic hesabına bakiye yüklemeniz gerekiyor)';
      } else if (hataMesaji.includes('invalid x-api-key')) {
        turkceHata = 'Yapay Zeka şifresi yanlış! (ANTHROPIC_API_KEY hatalı)';
      }
      return NextResponse.json({ success: false, error: `Claude Reddedildi: ${turkceHata}` }, { status: 400 });
    }

    const metin = claudeData.content?.[0]?.text || '[]';
    const temizMetin = metin.replace(/```json|```/g, '').trim();
    let uretilen;

    try {
      uretilen = JSON.parse(temizMetin);
    } catch {
      return NextResponse.json({ success: false, error: 'Yapay Zeka JSON formatını bozdu. Tekrar deneyin.' }, { status: 500 });
    }

    if (!Array.isArray(uretilen)) {
      return NextResponse.json({ success: false, error: 'Yapay Zeka dizi formatında cevap vermedi.' }, { status: 500 });
    }

    const resimListesi = getUnsplashResimler(sektor.unsplashQuery, uretilen.length);

    const db = await getDb();
    const kayitlar = uretilen.map((ilan: any, index: number) => ({
      sektorId,
      baslik: ilan.baslik,
      formData: {
        aciklama: ilan.aciklama,
        sehir: ilan.sehir,
        ilce: ilan.ilce,
        sure: ilan.sure,
      },
      medyalar: [
        resimListesi[index],
        `https://source.unsplash.com/800x600/?${encodeURIComponent(sektor.unsplashQuery)}&sig=${Math.floor(Math.random() * 9999)}`,
      ],
      butceMin: ilan.butceMin,
      butceMax: ilan.butceMax,
      butceBirimi: '₺',
      durum: 'aktif',
      teklifSayisi: 0,
      goruntulenme: Math.floor(Math.random() * 200) + 20,
      teklifeAcik: true,
      gizliAd: true,
      yapay: true,
      ucretsizTeklif: true,
      sahibi: {
        email: 'sistem@yes-sir.com',
        ad: 'Sistem',
        resim: null,
      },
      createdAt: new Date(),
      guncellendi: new Date(),
    }));

    const result = await db.collection('ilanlar').insertMany(kayitlar);

    return NextResponse.json({
      success: true,
      uretilen: kayitlar.length,
      ids: Object.values(result.insertedIds).map(id => id.toString()),
    });

  } catch (error: any) {
    console.error('AI ilan üretim hatası:', error);
    return NextResponse.json({ success: false, error: `Sistem Hatası: ${error.message}` }, { status: 500 });
  }
}
