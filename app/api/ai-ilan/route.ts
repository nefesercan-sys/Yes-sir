import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// ── SEO anahtar kelimeler — sektör bazlı ───────────────────────
const SEO_KEYWORDS: Record<string, string[]> = {
  turizm:      ['otel','konaklama','tatil','tur','rezervasyon','turizm türkiye','holiday turkey'],
  seyahat:     ['transfer','havalimanı transfer','vip transfer','şehir turu','seyahat hizmeti'],
  kiralama:    ['araç kiralama','rent a car','günlük kiralama','kiralık araç türkiye'],
  tamir:       ['tamir ustası','ev tamiri','elektronik tamir','beyaz eşya tamir'],
  usta:        ['elektrikçi','tesisatçı','boyacı usta','marangoz','çilingir','usta bul'],
  temizlik:    ['temizlik hizmeti','ev temizliği','ofis temizliği','temizlikçi bul'],
  uretim:      ['özel üretim','toptan üretim','imalat','üretici firma','özel sipariş'],
  giyim:       ['tekstil','hazır giyim','elbise','gömlek üretimi','giyim toptan'],
  saglik:      ['hemşire','sağlık hizmeti','evde bakım','fizyoterapi','medikal'],
  egitim:      ['özel ders','dil kursu','online eğitim','öğretmen','danışmanlık'],
  etkinlik:    ['düğün organizasyon','etkinlik','catering','organizatör','toplantı'],
  mobilya:     ['mobilya','dekorasyon','iç mimar','parke','tadilat'],
  tekstil:     ['tekstil ihracat','hazır giyim ihracat','textile export turkey','kumaş toptan',
                'fabric manufacturer turkey','OEM giyim üretimi'],
  'mermer-tas':['mermer ihracat','marble export turkey','travertin','granite turkey',
                'natural stone export','mermer plaka','doğal taş'],
  'metal-celik':['çelik kapı','panel çit','metal ihracat','steel door turkey',
                 'alüminyum profil','metal manufacturer turkey'],
  'plastik-pvc':['PVC pencere','plastik boru','HDPE','ambalaj','packaging turkey',
                 'PVC window manufacturer'],
  'ahsap-mob':  ['ahşap kapı','mobilya ihracat','wooden furniture turkey','parke',
                 'palet üretimi','FSC sertifikalı'],
  'gida-tarim': ['zeytinyağı ihracat','olive oil export turkey','kuru meyve','dried fruit turkey',
                 'fındık ihracat','hazelnut turkey','gıda ihracat'],
  'insaat-malz':['seramik ihracat','ceramic tile turkey','çimento','building materials turkey',
                 'yalıtım malzemesi','insulation turkey'],
  elektrik:    ['kablo ihracat','LED aydınlatma','solar panel turkey','electrical cable turkey',
                'enerji','güneş enerjisi'],
  makine:      ['makine ihracat','machinery turkey','tarım makinesi','forklift','industrial equipment'],
  lojistik:    ['konteyner taşımacılığı','container shipping turkey','lojistik','gümrükleme',
                'freight forwarding turkey','ihracat lojistik'],
  'kimya-boya':['boya ihracat','paint manufacturer turkey','vernik','kimyasal','coating turkey'],
};

// ── Şehirler ──────────────────────────────────────────────────
const SEHIRLER = [
  'İstanbul','Ankara','İzmir','Bursa','Antalya','Adana',
  'Konya','Gaziantep','Mersin','Kayseri','Trabzon','Denizli',
];

const ULKELER = [
  'Almanya','ABD','İngiltere','Fransa','Hollanda','Belçika',
  'BAE','Suudi Arabistan','Mısır','Nijerya','Hindistan','Polonya',
];

// ── Prompt fabrikası ──────────────────────────────────────────
function buildPrompt(params: {
  sektorId:    string;
  sektorAd:    string;
  tip:         string;
  rol:         string;
  sehir:       string;
  ulke:        string | null;
  adet:        number;
  keywords:    string[];
}): string {
  const { sektorId, sektorAd, tip, rol, sehir, ulke, adet, keywords } = params;
  const ticari    = tip === 'ticari';
  const verenMi   = rol === 'veren';
  const lokasyon  = ulke ? `${ulke} (Türkiye menşeli)` : sehir;

  const ilanTipiAciklama = ticari
    ? verenMi
      ? `Türkiye'de ${sektorAd} sektöründe ÜRETİM veya HİZMET VEREN firma ilanları`
      : `${ulke ?? 'Dünya'} genelinden ${sektorAd} sektöründe TOPTAN ALIM veya İTHALAT yapmak isteyen firma/kişi ilanları`
    : verenMi
      ? `${sehir}'de ${sektorAd} sektöründe BİREYSEL HİZMET VEREN ilanları (usta, hizmetçi, profesyonel)`
      : `${sehir}'de ${sektorAd} sektöründe BİREYSEL HİZMET ALAN ilanları (müşteri, talep sahibi)`;

  return `Sen SwapHubs platformu için SEO odaklı, gerçekçi ilan içerikleri üretiyorsun.

GÖREV: ${adet} adet "${ilanTipiAciklama}" oluştur.

KURALLAR:
1. Her ilan GERÇEK ve DETAYLI olsun — yapay belli olmasın
2. Başlıklar Google'da aranacak anahtar kelimeler içersin: ${keywords.slice(0,6).join(', ')}
3. Açıklamalar 80-150 kelime, özgün, ikna edici, SEO dostu olsun
4. ${ticari ? 'Ticari ilanlarda: minimum sipariş, teslimat, sertifika, ödeme şekli belirtilsin' : 'Bireysel ilanlarda: deneyim yılı, referans, garanti, bölge belirtilsin'}
5. Bütçeler gerçekçi olsun${ticari ? ' (dolar/euro veya TL, toptan fiyat mantığı)' : ' (TL, piyasa fiyatı)'}
6. Her ilana 4-6 adet "özellik" ekle (kısa, bullet point formatında)
7. Lokasyon: ${lokasyon}
8. Rol: ${verenMi ? 'HIZMET_VEREN' : 'HIZMET_ALAN'}

ÇIKTI FORMATI — Sadece JSON, başka hiçbir şey yazma:
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
      "metaAciklama": "150 karakter SEO meta açıklaması",
      "anahtarKelimeler": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
    }
  ]
}`;
}

// ═══════════════════════════════════════════════════════════════
export async function POST(req: NextRequest) {
  try {
    const body      = await req.json();
    const adminKey  = body.adminKey as string;

    // Admin doğrulama
    if (!adminKey || adminKey.length < 5) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
    }

    const sektorId  = body.sektorId  as string;
    const adet      = Math.min(Math.max(parseInt(body.adet ?? '5'), 1), 20);
    const tip       = (body.tip   as string) ?? 'bireysel';
    const yapay     = Boolean(body.yapay ?? true);

    // Şehir/Ülke
    const sehir = body.sehir ?? SEHIRLER[Math.floor(Math.random() * SEHIRLER.length)];
    const ulke  = tip === 'ticari'
      ? (body.ulke && body.ulke !== 'Rastgele'
          ? body.ulke
          : ULKELER[Math.floor(Math.random() * ULKELER.length)])
      : null;

    const keywords = SEO_KEYWORDS[sektorId] ?? [sektorId];

    // Sektör adı
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
    const sektorAd = SEKTOR_ADLARI[sektorId] ?? sektorId;

    // ── Her sektörde HEM alan HEM veren üret ──────────────────
    const roller: Array<'alan' | 'veren'> = body.rol
      ? [body.rol]           // admin belirli rol seçtiyse sadece o
      : ['veren', 'alan'];   // belirtilmemişse ikisi de

    const db      = await getDb();
    let toplamEklenen = 0;

    for (const rol of roller) {
      const adetPerRol = Math.ceil(adet / roller.length);

      const prompt = buildPrompt({
        sektorId, sektorAd, tip, rol, sehir,
        ulke, adet: adetPerRol, keywords,
      });

      // Anthropic API çağrısı
      const response = await client.messages.create({
        model:      'claude-opus-4-6',
        max_tokens: 4000,
        messages:   [{ role: 'user', content: prompt }],
      });

      const rawText = response.content
        .filter(b => b.type === 'text')
        .map(b => (b as { type: 'text'; text: string }).text)
        .join('');

      // JSON parse
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

      // MongoDB'ye kaydet
      if (ilanlar.length > 0) {
        const docs = ilanlar.map(ilan => ({
          // Mevcut yapıyla uyumlu alanlar
          sektorId,
          baslik:      ilan.baslik,
          formData: {
            sehir:          ilan.sehir ?? sehir,
            aciklama:       ilan.aciklama,
            ozellikler:     ilan.ozellikler ?? [],
          },
          medyalar:         [],
          butceMin:         Number(ilan.butceMin) || 0,
          butceMax:         Number(ilan.butceMax) || 0,
          butceBirimi:      (ilan.butceBirimi as string) ?? '₺',
          durum:            'aktif',
          teklifSayisi:     0,
          goruntulenme:     0,
          teklifeAcik:      true,
          gizliAd:          false,
          sahibi:           null,
          misafirToken:     null,
          createdAt:        new Date(),
          guncellendi:      new Date(),
          // Yeni alanlar
          tip,
          rol,
          kategoriSlug:     sektorId,
          kategoriAd:       sektorAd,
          ulke:             (ilan.ulke as string) ?? ulke ?? 'Türkiye',
          ozellikler:       ilan.ozellikler ?? [],
          teslimat:         [ilan.teslimat as string].filter(Boolean),
          yapay,
          // SEO alanları
          seo: {
            metaBaslik:     `${ilan.baslik} | SwapHubs`,
            metaAciklama:   ilan.metaAciklama ?? '',
            anahtarKelimeler: [
              ...(ilan.anahtarKelimeler as string[] ?? []),
              ...keywords.slice(0, 3),
              'SwapHubs', sehir, sektorAd,
            ],
            slug: slugify(String(ilan.baslik)),
          },
        }));

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

// ── Slug üretici ──────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}
