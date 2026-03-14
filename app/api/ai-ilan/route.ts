// ============================================================
// SwapHubs — app/api/ai-ilan/route.ts
// AI İlan Üretim Motoru + Akıllı Görsel Atama
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// 📸 KATEGORİLERE ÖZEL UNSPLASH GÖRSEL HAVUZU (Yüksek Çözünürlüklü)
const IMAGE_POOL: Record<string, string[]> = {
  turizm: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', // Lüks Otel
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80', // Resort
    'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?auto=format&fit=crop&w=800&q=80', // Otel Odası
  ],
  tekstil: [
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80', // Kumaş Ruloları
    'https://images.unsplash.com/photo-1558024920-b41e1887dc32?auto=format&fit=crop&w=800&q=80', // Tekstil Fabrikası
    'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=800&q=80', // İplikler
  ],
  uretim: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', // Laboratuvar/Üretim
    'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80', // Fabrika İçi
    'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=800&q=80', // CNC Makine
  ],
  lojistik: [
    'https://images.unsplash.com/photo-1586528116311-ad8ed7c66364?auto=format&fit=crop&w=800&q=80', // Liman Konteyner
    'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80', // Kargo Gemisi
    'https://images.unsplash.com/photo-1587293852726-694b5544adab?auto=format&fit=crop&w=800&q=80', // Depo
  ],
  'metal-celik': [
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80', // Çelik konstrüksiyon
    'https://images.unsplash.com/photo-1612690669207-fed642192c40?auto=format&fit=crop&w=800&q=80', // Kaynak/Metal
  ],
  'gida-tarim': [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', // Market/Gıda
    'https://images.unsplash.com/photo-1595858640583-4ce4999cc562?auto=format&fit=crop&w=800&q=80', // Tarım arazisi
    'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80', // Zeytinyağı/Şişe
  ],
  mobilya: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', // Koltuk
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', // Modern Mobilya
  ],
  usta: [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', // Tadilat/Usta
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80', // Plan/Çizim
  ],
  temizlik: [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', // Temizlik (Placeholder)
    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80', // Ev İçi
  ],
  giyim: [
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80', // Giyim Mağazası
    'https://images.unsplash.com/photo-1489987707023-afc232dce9f2?auto=format&fit=crop&w=800&q=80', // Askılar
  ],
  // Varsayılan genel resimler (Eğer sektör eşleşmezse)
  default: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', // Plaza/İş
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80', // Ticaret
    'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80', // Toplantı
  ]
};

// İlgili sektöre rastgele görsel seçen yardımcı fonksiyon
function getRandomImageForSector(sektorId: string): string {
  const pool = IMAGE_POOL[sektorId] || IMAGE_POOL['default'];
  return pool[Math.floor(Math.random() * pool.length)];
}

const SEO_KEYWORDS: Record<string, string[]> = {
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
  tekstil:      ['tekstil ihracat','hazır giyim ihracat','textile export turkey','kumaş toptan',
                 'fabric manufacturer turkey','OEM giyim üretimi'],
  'mermer-tas': ['mermer ihracat','marble export turkey','travertin','granite turkey',
                 'natural stone export','mermer plaka','doğal taş'],
  'metal-celik':['çelik kapı','panel çit','metal ihracat','steel door turkey',
                 'alüminyum profil','metal manufacturer turkey'],
  'plastik-pvc':['PVC pencere','plastik boru','HDPE','ambalaj','packaging turkey',
                 'PVC window manufacturer'],
  'ahsap-mob':  ['ahşap kapı','mobilya ihracat','wooden furniture turkey','parke',
                 'palet üretimi','FSC sertifikalı'],
  'gida-tarim': ['zeytinyağı ihracat','olive oil export turkey','kuru meyve',
                 'dried fruit turkey','fındık ihracat','hazelnut turkey','gıda ihracat'],
  'insaat-malz':['seramik ihracat','ceramic tile turkey','çimento',
                 'building materials turkey','yalıtım malzemesi','insulation turkey'],
  elektrik:     ['kablo ihracat','LED aydınlatma','solar panel turkey',
                 'electrical cable turkey','enerji','güneş enerjisi'],
  makine:       ['makine ihracat','machinery turkey','tarım makinesi','forklift','industrial equipment'],
  lojistik:     ['konteyner taşımacılığı','container shipping turkey','lojistik',
                 'gümrükleme','freight forwarding turkey','ihracat lojistik'],
  'kimya-boya': ['boya ihracat','paint manufacturer turkey','vernik','kimyasal','coating turkey'],
};

const SEHIRLER = ['İstanbul','Ankara','İzmir','Bursa','Antalya','Adana',
                  'Konya','Gaziantep','Mersin','Kayseri','Trabzon','Denizli'];

const ULKELER  = ['Almanya','ABD','İngiltere','Fransa','Hollanda','Belçika',
                  'BAE','Suudi Arabistan','Mısır','Nijerya','Hindistan','Polonya'];

const SEKTOR_ADLARI: Record<string, string> = {
  turizm:'Turizm & Konaklama', seyahat:'Seyahat & Transfer', kiralama:'Kiralama',
  tamir:'Tamir & Bakım', usta:'Usta & İşçi', temizlik:'Temizlik Hizmetleri',
  uretim:'Üretim', giyim:'Giyim & Tekstil', saglik:'Sağlık', egitim:'Eğitim',
  etkinlik:'Etkinlik', mobilya:'Mobilya',
  tekstil:'Tekstil & Hazır Giyim', 'mermer-tas':'Mermer & Doğal Taş',
  'metal-celik':'Metal & Çelik', 'plastik-pvc':'Plastik & PVC',
  'ahsap-mob':'Ahşap & Mobilya', 'gida-tarim':'Gıda & Tarım',
  'insaat-malz':'İnşaat Malzemeleri', elektrik:'Elektrik & Enerji',
  makine:'Makine & Ekipman', lojistik:'Lojistik', 'kimya-boya':'Kimya & Boya',
  'saglik-med':'Sağlık & Medikal',
};

function buildPrompt(p: {
  sektorId: string; sektorAd: string; tip: string; rol: string;
  sehir: string; ulke: string | null; adet: number; keywords: string[];
}): string {
  const { sektorId, sektorAd, tip, rol, sehir, ulke, adet, keywords } = p;
  const ticari   = tip === 'ticari';
  const verenMi  = rol === 'veren';
  const lokasyon = ulke ? `${ulke} (Türkiye menşeli)` : sehir;

  const ilanTipi = ticari
    ? verenMi
      ? `Türkiye'de ${sektorAd} sektöründe ÜRETİM veya HİZMET VEREN firma ilanları`
      : `${ulke ?? 'Dünya'} genelinden ${sektorAd} sektöründe TOPTAN ALIM veya İTHALAT yapmak isteyen firma/kişi ilanları`
    : verenMi
      ? `${sehir}'de ${sektorAd} sektöründe BİREYSEL HİZMET VEREN ilanları`
      : `${sehir}'de ${sektorAd} sektöründe BİREYSEL HİZMET ALAN ilanları`;

  return `Sen SwapHubs platformu için SEO odaklı, gerçekçi ilan içerikleri üretiyorsun.

GÖREV: ${adet} adet "${ilanTipi}" oluştur.

KURALLAR:
1. Her ilan GERÇEK ve DETAYLI olsun — yapay belli olmasın
2. Başlıklar Google'da aranacak anahtar kelimeler içersin: ${keywords.slice(0, 6).join(', ')}
3. Açıklamalar 80-150 kelime, özgün, ikna edici, SEO dostu olsun
4. ${ticari ? 'Ticari ilanlarda: minimum sipariş, teslimat, sertifika, ödeme şekli belirtilsin' : 'Bireysel ilanlarda: deneyim yılı, referans, garanti, bölge belirtilsin'}
5. Bütçeler gerçekçi olsun${ticari ? ' (dolar/euro veya TL, toptan fiyat mantığı)' : ' (TL, piyasa fiyatı)'}
6. Her ilana 4-6 adet "özellik" ekle (kısa bullet point formatında)
7. Lokasyon: ${lokasyon}
8. Rol: ${verenMi ? 'HIZMET_VEREN' : 'HIZMET_ALAN'}
9. metaAciklama tam olarak 150-160 karakter olsun

Sadece JSON döndür, başka hiçbir şey yazma:
{
  "ilanlar": [
    {
      "baslik": "...",
      "aciklama": "...",
      "butceMin": 0,
      "butceMax": 0,
      "butceBirimi": "${ticari ? 'USD' : '₺'}",
      "sehir": "${sehir}",
      "ulke": "${ulke ?? 'Türkiye'}",
      "ozellikler": ["...", "...", "...", "..."],
      "teslimat": "${ticari ? '30 gün' : '1 gün'}",
      "metaAciklama": "150-160 karakter SEO meta açıklaması",
      "anahtarKelimeler": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
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
    const adet     = Math.min(Math.max(parseInt(body.adet ?? '5'), 1), 20);
    const tip      = (body.tip as string) ?? 'bireysel';
    const yapay    = Boolean(body.yapay ?? true);

    const sehir = body.sehir ?? SEHIRLER[Math.floor(Math.random() * SEHIRLER.length)];
    const ulke  = tip === 'ticari'
      ? (body.ulke && body.ulke !== 'Rastgele'
          ? body.ulke
          : ULKELER[Math.floor(Math.random() * ULKELER.length)])
      : null;

    const keywords = SEO_KEYWORDS[sektorId] ?? [sektorId];
    const sektorAd = SEKTOR_ADLARI[sektorId] ?? sektorId;

    // Hem alan hem veren — body.rol yoksa ikisi de üretilir
    const roller: Array<'alan' | 'veren'> = body.rol
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
        model:      'claude-opus-4-6', // Model adını sistemin desteklediğine emin ol ('claude-3-opus-20240229' vb.)
        max_tokens: 4000,
        messages:   [{ role: 'user', content: prompt }],
      });

      const rawText = response.content
        .filter(b => b.type === 'text')
        .map(b => (b as { type: 'text'; text: string }).text)
        .join('');

      let ilanlar: Record<string, unknown>[] = [];
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
          // GÖRSEL ATAMA: AI'ın ürettiği ilana sektörden rastgele bir resim ata
          const atanacakGorsel = getRandomImageForSector(sektorId);
          
          return {
            sektorId,
            baslik: ilan.baslik,
            formData: {
              sehir:      ilan.sehir ?? sehir,
              aciklama:   ilan.aciklama,
              ozellikler: ilan.ozellikler ?? [],
            },
            medyalar:     [atanacakGorsel], // Artık emojiden kurtulduk!
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
            tip,
            rol,
            kategoriSlug: sektorId,
            kategoriAd:   sektorAd,
            ulke:         (ilan.ulke as string) ?? ulke ?? 'Türkiye',
            ozellikler:   ilan.ozellikler ?? [],
            teslimat:     [ilan.teslimat as string].filter(Boolean),
            yapay,
            is_ai_generated: yapay, // Sistem denetimi için ek flag
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
