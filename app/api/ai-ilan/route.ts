// ============================================================
// SwapHubs — app/api/ai-ilan/route.ts
// AI İlan Üretim Motoru + Akıllı Görsel Atama (Tüm Yeni Sektörler)
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || ''
});

// 📸 KATEGORİLERE ÖZEL UNSPLASH GÖRSEL HAVUZU (Yüksek Çözünürlüklü)
const IMAGE_POOL: Record<string, string[]> = {
  // YENİ SEKTÖRLER
  'emlak-satis': [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', 
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  ],
  'emlak-kiralama': [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', 
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1de24220e8?auto=format&fit=crop&w=800&q=80'
  ],
  'oto-satis': [
    'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80', 
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?auto=format&fit=crop&w=800&q=80'
  ],
  'oto-kiralama': [
    'https://images.unsplash.com/photo-1562426509-5044a121aa49?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80'
  ],
  'elektronik': [
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80', 
    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  ],
  'beyaz-esya': [
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
  ],
  'bilet': [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80', 
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80'
  ],
  'yazilim': [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', 
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  ],
  'makine-kiralama': [
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356f67?auto=format&fit=crop&w=800&q=80'
  ],
  
  // ESKİ SEKTÖRLER
  turizm: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542314831-c6a4d14b836a?auto=format&fit=crop&w=800&q=80'
  ],
  tekstil: [
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80'
  ],
  uretim: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565439385074-126a11701d67?auto=format&fit=crop&w=800&q=80'
  ],
  lojistik: [
    'https://images.unsplash.com/photo-1586528116311-ad8ed7c66364?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80'
  ],
  'metal-celik': [
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  ],
  'gida-tarim': [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
  ],
  mobilya: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'
  ],
  usta: [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
  ],
  temizlik: [
    'https://images.unsplash.com/photo-1584820927498-cafe4c126956?auto=format&fit=crop&w=800&q=80',
  ],
  giyim: [
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  ]
};

function getRandomImageForSector(sektorId: string): string {
  const pool = IMAGE_POOL[sektorId] || IMAGE_POOL['default'];
  // Rastgeleliği garanti altına almak için Math.random kullanıyoruz
  return pool[Math.floor(Math.random() * pool.length)];
}

// 🎯 SEO KELİMELERİ VE SEKTÖR TANIMLARI
const SEO_KEYWORDS: Record<string, string[]> = {
  'emlak-satis': ['satılık daire', 'satılık arsa', 'emlak', 'ev satın al', 'konut projeleri', 'yatırımlık ev'],
  'emlak-kiralama': ['kiralık daire', 'kiralık ofis', 'günlük kiralık', 'emlak kiralama', 'sahibinden kiralık'],
  'oto-satis': ['satılık araba', 'ikinci el oto', 'sahibinden araba', 'oto alım satım', 'ikinci el araç'],
  'oto-kiralama': ['araç kiralama', 'rent a car', 'filo kiralama', 'günlük araç kiralama', 'havalimanı rent a car'],
  'elektronik': ['ikinci el telefon', 'bilgisayar tamiri', 'elektronik toptan', 'teknoloji ürünleri'],
  'beyaz-esya': ['beyaz eşya satışı', 'buzdolabı tamiri', 'çamaşır makinesi', 'ikinci el beyaz eşya'],
  'bilet': ['uçak bileti', 'otobüs bileti', 'erken rezervasyon', 'tatil paketi', 'ucuz bilet'],
  'yazilim': ['web tasarım', 'mobil uygulama geliştirme', 'yazılım ajansı', 'e-ticaret sitesi yaptırmak', 'özel yazılım'],
  'makine-kiralama': ['vinç kiralama', 'iş makinesi kiralama', 'forklift', 'inşaat makinesi', 'kiralık kepçe'],
  turizm:       ['otel','konaklama','tatil','tur','rezervasyon','turizm türkiye','holiday turkey'],
  seyahat:      ['transfer','havalimanı transfer','vip transfer','şehir turu','seyahat hizmeti'],
  kiralama:     ['araç kiralama','rent a car','günlük kiralama','kiralık araç türkiye'],
  tamir:        ['tamir ustası','ev tamiri','elektronik tamir','beyaz eşya tamir'],
  usta:         ['elektrikçi','tesisatçı','boyacı usta','marangoz','çilingir','usta bul'],
  temizlik:     ['temizlik hizmeti','ev temizliği','ofis temizliği','temizlikçi bul'],
  uretim:       ['özel üretim','toptan üretim','imalat','üretici firma','özel sipariş'],
  giyim:        ['tekstil','hazır giyim','elbise','gömlek üretimi','giyim toptan'],
  saglik:       ['hemşire','sağlık hizmeti','evde bakım','fizyoterapi','medikal'],
  egitim:       ['özel ders','dil kursu','online eğitim','öğretmen','danışmanlık'],
  etkinlik:     ['düğün organizasyon','etkinlik','catering','organizatör','toplantı'],
  mobilya:      ['mobilya','dekorasyon','iç mimar','parke','tadilat'],
  tekstil:      ['tekstil ihracat','hazır giyim ihracat','textile export turkey','kumaş toptan'],
  'mermer-tas': ['mermer ihracat','marble export turkey','travertin','granite turkey'],
  'metal-celik':['çelik kapı','panel çit','metal ihracat','steel door turkey'],
  'plastik-pvc':['PVC pencere','plastik boru','HDPE','ambalaj','packaging turkey'],
  'ahsap-mob':  ['ahşap kapı','mobilya ihracat','wooden furniture turkey','parke'],
  'gida-tarim': ['zeytinyağı ihracat','olive oil export turkey','kuru meyve','dried fruit turkey'],
  'insaat-malz':['seramik ihracat','ceramic tile turkey','çimento','building materials turkey'],
  elektrik:     ['kablo ihracat','LED aydınlatma','solar panel turkey','enerji'],
  makine:       ['makine ihracat','machinery turkey','tarım makinesi','industrial equipment'],
  lojistik:     ['konteyner taşımacılığı','container shipping turkey','gümrükleme','lojistik'],
  'kimya-boya': ['boya ihracat','paint manufacturer turkey','vernik','kimyasal'],
};

const SEKTOR_ADLARI: Record<string, string> = {
  'emlak-satis': 'Emlak Alım Satım', 'emlak-kiralama': 'Emlak Kiralama', 'oto-satis': 'Oto Alım Satım',
  'oto-kiralama': 'Araç Kiralama', 'elektronik': 'Elektronik & Teknoloji', 'beyaz-esya': 'Beyaz Eşya',
  'bilet': 'Bilet & Rezervasyon', 'yazilim': 'Yazılım & Bilişim Hizmetleri', 'makine-kiralama': 'İş Makinesi Kiralama',
  turizm:'Turizm & Konaklama', seyahat:'Seyahat & Transfer', kiralama:'Kiralama',
  tamir:'Tamir & Bakım', usta:'Usta & İşçi', temizlik:'Temizlik Hizmetleri',
  uretim:'Üretim', giyim:'Giyim & Tekstil', saglik:'Sağlık', egitim:'Eğitim',
  etkinlik:'Etkinlik', mobilya:'Mobilya', tekstil:'Tekstil & Hazır Giyim', 
  'mermer-tas':'Mermer & Doğal Taş', 'metal-celik':'Metal & Çelik', 'plastik-pvc':'Plastik & PVC',
  'ahsap-mob':'Ahşap & Mobilya', 'gida-tarim':'Gıda & Tarım', 'insaat-malz':'İnşaat Malzemeleri', 
  elektrik:'Elektrik & Enerji', makine:'Makine & Ekipman', lojistik:'Lojistik', 
  'kimya-boya':'Kimya & Boya', 'saglik-med':'Sağlık & Medikal',
};

const SEHIRLER = ['İstanbul','Ankara','İzmir','Bursa','Antalya','Adana','Konya','Gaziantep','Mersin','Kayseri','Trabzon','Denizli'];
const ULKELER  = ['Almanya','ABD','İngiltere','Fransa','Hollanda','Belçika','BAE','Suudi Arabistan','Mısır','Nijerya','Hindistan','Polonya'];

function buildPrompt(p: {
  sektorId: string; sektorAd: string; tip: string; rol: string;
  sehir: string; ulke: string | null; adet: number; keywords: string[];
}): string {
  const { sektorId, sektorAd, tip, rol, sehir, ulke, adet, keywords } = p;
  const ticari   = tip === 'ticari';
  const verenMi  = rol === 'veren';
  const lokasyon = ulke && ulke !== 'Türkiye' ? `${ulke} (Türkiye menşeli / İhracat)` : sehir;

  const ilanTipi = ticari
    ? verenMi
      ? `B2B Toptan / Ticari Satış ve Hizmet veren (${sektorAd}) firma ilanları`
      : `B2B Toptan / Ticari Alım, İthalat ve Talep eden (${sektorAd}) firma ilanları`
    : verenMi
      ? `Bireysel / Perakende Hizmet Veren ve Satış Yapan (${sektorAd}) ilanları`
      : `Bireysel İhtiyaç / Hizmet Talep Eden (${sektorAd}) ilanları`;

  return `Sen SwapHubs pazar yeri platformu için çok gerçekçi, profesyonel ve SEO uyumlu ilan içerikleri üreten bir uzmansın.

GÖREV: ${adet} adet "${ilanTipi}" oluştur.

🚨 ÇOK ÖNEMLİ KURALLAR (BUNLARI ASLA DEĞİŞTİRME):
Sana gönderdiğim "sektorId", "tip" ve "rol" değerlerini JSON içinde BİREBİR KULLANACAKSIN. Asla kendi uydurduğun kategorileri yazma!
Zorunlu sektorId: "${sektorId}"
Zorunlu tip: "${tip}"
Zorunlu rol: "${rol}"

DİĞER KURALLAR:
1. İlanlar GERÇEKÇİ olsun, yapay zeka tarafından yazıldığı kesinlikle anlaşılmasın.
2. Başlıklar ve açıklamalar şu anahtar kelimeleri içersin: ${keywords.slice(0, 5).join(', ')}
3. Sektör spesifik olsun (Eğer yazılımsa kodlama dilleri, eğer emlaksa m2/oda sayısı, araçsa marka/model uydur).
4. Bütçeler piyasa şartlarına uygun olsun${ticari ? ' (dolar/euro veya TL, toptan / B2B ticari fiyat mantığı)' : ' (TL, bireysel fiyat)'}
5. Her ilana 4-6 adet "özellik" ekle (kısa bullet point formatında)
6. Lokasyon: ${lokasyon}
7. metaAciklama tam olarak 150-160 karakter SEO uyumlu özet olsun.

Sadece geçerli bir JSON döndür, kod bloğu dışında hiçbir açıklama yazma. JSON formatı kesinlikle şu yapıda olmalıdır:
{
  "ilanlar": [
    {
      "sektorId": "${sektorId}",
      "tip": "${tip}",
      "rol": "${rol}",
      "baslik": "...",
      "aciklama": "...",
      "butceMin": 5000,
      "butceMax": 15000,
      "butceBirimi": "${ticari ? 'USD' : '₺'}",
      "sehir": "${sehir}",
      "ulke": "${ulke ?? 'Türkiye'}",
      "ozellikler": ["Özellik 1", "Özellik 2", "Özellik 3", "Özellik 4"],
      "teslimat": "${ticari ? '30 gün' : 'Hemen Teslim'}",
      "metaAciklama": "150-160 karakterlik dikkat çekici SEO açıklaması...",
      "anahtarKelimeler": ["keyword1", "keyword2", "keyword3"]
    }
  ]
}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

export async function POST(req: NextRequest) {
  try {
    const body     = await req.json();
    const adminKey = body.adminKey as string;

    if (!adminKey || adminKey.length < 5) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
    }

    const sektorId = body.sektorId as string;
    const adet     = Math.min(Math.max(parseInt(body.adet ?? '5'), 1), 30);
    const tip      = (body.tip as string) ?? 'bireysel';
    const yapay    = Boolean(body.yapay ?? true);

    const sehir = body.sehir && body.sehir !== 'Rastgele' ? body.sehir : SEHIRLER[Math.floor(Math.random() * SEHIRLER.length)];
    const ulke  = body.ulke && body.ulke !== 'Rastgele' ? body.ulke : (tip === 'ticari' ? ULKELER[Math.floor(Math.random() * ULKELER.length)] : 'Türkiye');

    const keywords = SEO_KEYWORDS[sektorId] ?? [sektorId];
    const sektorAd = SEKTOR_ADLARI[sektorId] ?? sektorId;

    // YENİ MANTIK: AI'ın rol dağılımını kesin olarak alıyoruz
    const roller: Array<'alan' | 'veren'> = body.rol && body.rol !== 'her-ikisi'
      ? [body.rol]
      : ['veren', 'alan'];

    const db = await getDb();
    let toplamEklenen = 0;

    for (const rol of roller) {
      const adetPerRol = Math.ceil(adet / roller.length);

      const prompt = buildPrompt({
        sektorId, sektorAd, tip, rol, sehir, ulke, adet: adetPerRol, keywords,
      });

      const response = await client.messages.create({
        model:      'claude-3-opus-20240229', // SwapHubs sistemi Claude-3 Opus kullanıyor olmalı
        max_tokens: 4000,
        messages:   [{ role: 'user', content: prompt }],
      });

      const rawText = response.content
        .filter(b => b.type === 'text')
        .map(b => (b as { type: 'text'; text: string }).text)
        .join('');

      let ilanlar: any[] = [];
      try {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          ilanlar = parsed.ilanlar ?? [];
        }
      } catch {
        console.error('JSON parse hatası:', rawText.slice(0, 200));
        continue;
      }

      if (ilanlar.length > 0) {
        const docs = ilanlar.map(ilan => {
          // GÖRSEL ATAMA: AI'ın ürettiği her ilana o an rastgele farklı bir resim çek
          const atanacakGorsel = getRandomImageForSector(sektorId);
          
          return {
            // AI'ın uydurma ihtimaline karşı sistemin kesin değerleriyle zorluyoruz:
            sektorId:     sektorId,
            tip:          tip,
            rol:          rol,
            baslik:       ilan.baslik,
            formData: {
              sehir:      ilan.sehir ?? sehir,
              aciklama:   ilan.aciklama,
              ozellikler: ilan.ozellikler ?? [],
            },
            medyalar:     [atanacakGorsel],
            resimUrl:     atanacakGorsel,
            butceMin:     Number(ilan.butceMin) || 0,
            butceMax:     Number(ilan.butceMax) || 0,
            butceBirimi:  (ilan.butceBirimi as string) ?? '₺',
            durum:        'aktif',
            teklifSayisi: 0,
            goruntulenme: 0,
            teklifeAcik:  true,
            gizliAd:      false,
            sahibi:       null,
            misafirToken: null,
            createdAt:    new Date(),
            guncellendi:  new Date(),
            kategoriSlug: sektorId,
            kategoriAd:   sektorAd,
            ulke:         (ilan.ulke as string) ?? ulke ?? 'Türkiye',
            ozellikler:   ilan.ozellikler ?? [],
            teslimat:     [ilan.teslimat as string].filter(Boolean),
            yapay,
            is_ai_generated: yapay,
            seo: {
              metaBaslik:       `${ilan.baslik} | SwapHubs`,
              metaAciklama:     ilan.metaAciklama ?? '',
              anahtarKelimeler: [
                ...(ilan.anahtarKelimeler as string[] ?? []),
                ...keywords.slice(0, 3),
                'SwapHubs', sehir, sektorAd,
              ],
              slug: slugify(String(ilan.baslik)),
            },
          };
        });

        const result = await db.collection('ilanlar').insertMany(docs);
        toplamEklenen += result.insertedCount;
      }
    }

    return NextResponse.json({ success: true, uretilen: toplamEklenen });

  } catch (err) {
    console.error('AI ilan hatası:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
