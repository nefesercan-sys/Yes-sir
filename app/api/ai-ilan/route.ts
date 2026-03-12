import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

// 🚨 SİBER ZIRH: Her sektöre uygun İngilizce resim arama kelimeleri eklendi
const SEKTOR_BILGI: Record<string, { ad: string; ornekler: string[]; resimKelimeleri: string }> = {
  turizm: { ad: 'Turizm & Konaklama', ornekler: ['otel', 'pansiyon', 'villa', 'apart'], resimKelimeleri: 'hotel,resort,room' },
  seyahat: { ad: 'Seyahat & Transfer', ornekler: ['transfer', 'tur', 'araç kiralama'], resimKelimeleri: 'car,travel,airport' },
  kiralama: { ad: 'Kiralama', ornekler: ['araç', 'ekipman', 'ofis', 'depo'], resimKelimeleri: 'rent,equipment,car' },
  tamir: { ad: 'Tamir & Bakım', ornekler: ['beyaz eşya', 'elektronik', 'klima'], resimKelimeleri: 'repair,mechanic,tools' },
  usta: { ad: 'Usta & İşçi', ornekler: ['elektrik', 'su tesisatı', 'boya'], resimKelimeleri: 'construction,worker,tools' },
  temizlik: { ad: 'Temizlik Hizmetleri', ornekler: ['ev temizliği', 'ofis temizliği'], resimKelimeleri: 'cleaning,clean,house' },
  uretim: { ad: 'Üretim & Özel Sipariş', ornekler: ['mobilya', 'tekstil', 'metal'], resimKelimeleri: 'factory,manufacturing,wood' },
  giyim: { ad: 'Giyim & Tekstil', ornekler: ['terzi', 'nakış', 'baskı'], resimKelimeleri: 'tailor,clothing,fabric' },
  saglik: { ad: 'Sağlık & Güzellik', ornekler: ['masaj', 'diyet', 'psikoloji'], resimKelimeleri: 'spa,massage,health' },
  egitim: { ad: 'Eğitim & Danışmanlık', ornekler: ['dil kursu', 'özel ders', 'koçluk'], resimKelimeleri: 'education,tutor,study' },
  etkinlik: { ad: 'Etkinlik & Düğün', ornekler: ['düğün', 'fotoğrafçı', 'catering'], resimKelimeleri: 'wedding,event,party' },
  mobilya: { ad: 'Mobilya & Dekorasyon', ornekler: ['iç mimarlık', 'mobilya tasarım'], resimKelimeleri: 'furniture,interior,decor' },
};

const SEHIRLER = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Kayseri'];

export async function POST(req: NextRequest) {
  try {
    const { sektorId, sehir, adet = 5, adminKey } = await req.json();

    // 1. Admin Anahtarı Kontrolü
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

    // 2. Claude'a İstek Atma
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const claudeData = await claudeRes.json();

    // 🚨 SİBER ZIRH: Eğer Claude bizi kapıdan kovarsa çökmeden hatayı yakala
    if (!claudeRes.ok) {
      const hataMesaji = claudeData.error?.message || 'Bilinmeyen Anthropic Hatası';
      return NextResponse.json({ 
        success: false, 
        error: `Claude Reddedildi: ${hataMesaji}` 
      }, { status: 400 });
    }

    // 3. Gelen Veriyi Ayrıştırma
    const metin = claudeData.content?.[0]?.text || '[]';
    const temizMetin = metin.replace(/```json|```/g, '').trim();
    let uretilen;
    
    try {
      uretilen = JSON.parse(temizMetin);
    } catch (parseError) {
      return NextResponse.json({ success: false, error: 'Yapay Zeka JSON formatını bozdu. Tekrar deneyin.' }, { status: 500 });
    }

    if (!Array.isArray(uretilen)) {
      return NextResponse.json({ success: false, error: 'Yapay Zeka dizi formatında cevap vermedi.' }, { status: 500 });
    }

    const db = await getDb();
    
    // 📸 SİBER RESİM: Her ilana o sektöre uygun farklı ve dinamik bir resim ekle!
    const kayitlar = uretilen.map((ilan: any, index: number) => {
      // Her resmin farklı olması için random bir kilit numarası üretiyoruz
      const randomId = Math.floor(Math.random() * 10000) + index;
      
      // Dinamik Fotoğraf Servisi URL'si (Sektöre göre otomatik resim getirir)
      const dinamikResimUrl = `https://loremflickr.com/800/600/${sektor.resimKelimeleri}?lock=${randomId}`;

      return {
        sektorId,
        baslik: ilan.baslik,
        formData: {
          aciklama: ilan.aciklama,
          sehir: ilan.sehir,
          ilce: ilan.ilce,
          sure: ilan.sure,
        },
        medyalar: [dinamikResimUrl], // 🚨 RESİM DİZİYE EKLENDİ!
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
      };
    });

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
