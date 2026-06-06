'use client';

import React, { useState, useEffect, useCallback } from 'react';

const WA_NUMBER = "905318986418";
const waLink = (msg: string): string =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const WaIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ─── RENK PALETİ ─────────────────────────────────────────────────────────────
const C = {
  gold: '#C9A84C',
  goldLight: '#F0D080',
  goldDark: '#8B6914',
  cream: '#FAF7F0',
  creamDark: '#F0EAD6',
  charcoal: '#1A1A1A',
  charcoalMid: '#2D2D2D',
  charcoalLight: '#3D3D3D',
  slate: '#6B7280',
  slateLight: '#9CA3AF',
  white: '#FFFFFF',
  wa: '#25D366',
  emerald: '#059669',
  rose: '#E11D48',
  indigo: '#4338CA',
  amber: '#D97706',
  teal: '#0D9488',
  violet: '#7C3AED',
  navy: '#1E3A5F',
};

// ─── GÖRSEL KÜTÜPHANESİ (Pexels CDN — CORS yok, kararlı) ────────────────────
// Unsplash yerine Pexels statik URL'leri kullanılıyor.
// Formatlar: ?auto=compress&cs=tinysrgb&w=600
const IMG = {
  hero1: 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=800',
  hero2: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
  hero3: 'https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg?auto=compress&cs=tinysrgb&w=400',
  hero4: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
  // Kategoriler
  abiye1: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
  abiye2: 'https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg?auto=compress&cs=tinysrgb&w=600',
  abiye3: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=600',
  takim1: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=600',
  takim2: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
  takim3: 'https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg?auto=compress&cs=tinysrgb&w=600',
  spor1:  'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600',
  spor2:  'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600',
  spor3:  'https://images.pexels.com/photos/3768593/pexels-photo-3768593.jpeg?auto=compress&cs=tinysrgb&w=600',
  uni1:   'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
  uni2:   'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
  uni3:   'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
  gece1:  'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=600',
  gece2:  'https://images.pexels.com/photos/1906605/pexels-photo-1906605.jpeg?auto=compress&cs=tinysrgb&w=600',
  gece3:  'https://images.pexels.com/photos/1375849/pexels-photo-1375849.jpeg?auto=compress&cs=tinysrgb&w=600',
  muslin1:'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=600',
  muslin2:'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600',
  muslin3:'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
  gelin1: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
  gelin2: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=600',
  gelin3: 'https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=600',
  gunluk1:'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=600',
  gunluk2:'https://images.pexels.com/photos/1937336/pexels-photo-1937336.jpeg?auto=compress&cs=tinysrgb&w=600',
  gunluk3:'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
  atolye1:'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=500',
  atolye2:'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=500',
  atolye3:'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=500',
  atolye4:'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=500',
};

const LANGS = ['TR', 'EN', 'DE', 'AR'];

const SLOGANS = [
  "Terziniz Bir Tık Yakınınızda",
  "Hayalinizdeki Kıyafeti Tasarlayın",
  "Ölçünüzü Verin, Kapınıza Gelsin",
  "Türkiye'nin Her Köşesine Özel Dikim",
  "Sadece Size Özel — Tek Parça Üretim",
];

const CATEGORIES = [
  {
    id: 'abiye',
    icon: '✨',
    color: C.rose,
    colorLight: '#FFF1F2',
    tag: 'Özel Tasarım',
    title: 'Abiye & Gece Elbiseleri',
    subtitle: 'Her Gecenin Yıldızı Olun',
    desc: `Hayatınızın en özel gecelerinde tam anlamıyla parlamak için tasarlanmış koleksiyonumuz; her bedenin güzelliğini ön plana çıkaran kesimler, el işlemeli dantel detaylar, Fransız şifon ve İtalyan saten kumaşlarla hayata geçirilmektedir. Düğün, nişan, mezuniyet ve kokteyl davetleri için size özel kalıp çıkarıyor, bedeninizin her konturuna mükemmel oturan tek parça tasarımlar üretiyoruz.`,
    images: [IMG.abiye1, IMG.abiye2, IMG.abiye3],
    features: ['El işlemeli dantel & boncuk', 'İtalyan saten & Fransız şifon', 'Balık / Prenses / A-line kesim', '3D taslak onayı', 'Ücretsiz revizyon'],
    waMsg: 'Merhaba, özel tasarım abiye siparişi vermek istiyorum.',
  },
  {
    id: 'takim',
    icon: '🎩',
    color: C.navy,
    colorLight: '#EFF6FF',
    tag: 'Prestij Serisi',
    title: 'Takım Elbise & Smokin',
    subtitle: 'Her Ortamda Fark Yaratın',
    desc: `İngiltere'nin klasik Savile Row geleneğini dijital çağın kolaylığıyla buluşturuyoruz. Her detayı sizin için özelleştirilen takım elbiselerimiz; İtalyan yün karışımlı kumaşlar ve süperfine wool seçenekleriyle sunulmaktadır. Tek düğme slim fit, çift düğme klasik, üç parçalı yelek — tamamen kişiselleştirilmektedir. Damat takımları, iş görüşmeleri ve smokin tasarımları üretiyoruz.`,
    images: [IMG.takim1, IMG.takim2, IMG.takim3],
    features: ['İtalyan wool & superfine kumaş', 'Slim / Classic / Modern fit', 'Damat & düğün özel serisi', 'Kol, yaka, cep kişiselleştirme', 'Yaka nakışı & monogram'],
    waMsg: 'Merhaba, özel takım elbise veya smokin siparişi vermek istiyorum.',
  },
  {
    id: 'spor',
    icon: '⚡',
    color: C.teal,
    colorLight: '#F0FDFA',
    tag: 'Performans Serisi',
    title: 'Spor & Aktif Giyim',
    subtitle: 'Hareket Özgürlüğü, Stil Mükemmelliği',
    desc: `Spor salonundan açık havaya, yogadan crossfit'e kadar her aktivite için bedeninizin hareketini özgürleştiren özel spor kıyafetler tasarlıyoruz. 4 yönlü streç likra, nem uzaklaştırıcı coolmax, UV korumalı kumaşlar kullanarak her parçayı hem estetik hem işlevsel yapıyoruz. Takım sporları için grup siparişlerinde %20 indirim uygulanmaktadır.`,
    images: [IMG.spor1, IMG.spor2, IMG.spor3],
    features: ['4 yönlü streç & coolmax', 'UV koruma & antibakteriyel', 'Logo & renk kişiselleştirme', 'Takım siparişi %20 indirim', 'Su sporları & outdoor serisi'],
    waMsg: 'Merhaba, özel spor ve aktif giyim siparişi vermek istiyorum.',
  },
  {
    id: 'unifroma',
    icon: '🏨',
    color: C.charcoal,
    colorLight: '#F9FAFB',
    tag: 'B2B Kurumsal',
    title: 'Üniforma & Kurumsal Kıyafet',
    subtitle: 'Kurumsal Kimliğinizi Giyinin',
    desc: `Kurumsal imajınızın en güçlü yansıması çalışanlarınızın giydiği üniforma olduğunu biliyoruz. Otel resepsiyonistlerinden şeflere, medikal personelden havacılık ekiplerine kadar her sektörün ihtiyaçlarına göre üniforma koleksiyonları tasarlıyoruz. Minimum 10 adet siparişten başlayan toplu üretim ve 60 gün sonra tekrar sipariş garantisi sunuyoruz.`,
    images: [IMG.uni1, IMG.uni2, IMG.uni3],
    features: ['Min. 10 adet toplu üretim', 'Logo nakışı & baskı', 'Antimikrobiyal & leke itici', 'Sağlık / Turizm / Havacılık', '60 gün yeniden sipariş garantisi'],
    waMsg: 'Merhaba, kurumsal üniforma üretimi için fiyat teklifi almak istiyorum.',
  },
  {
    id: 'gece-davet',
    icon: '🌙',
    color: C.violet,
    colorLight: '#F5F3FF',
    tag: 'Lüks Koleksiyon',
    title: 'Gece & Davet Kıyafetleri',
    subtitle: 'Her Davet Bir Sahne, Her Kıyafet Bir Başyapıt',
    desc: `Kokteyl partilerinden gala gecelerine kadar her ortamda sizi en zarif şekilde temsil edecek kıyafetler tasarlıyoruz. Fransız dantel, İtalyan organze ve Türk ipek dokumalarını kullanan tasarımcı ekibimiz; mini, midi ve maksi boy seçeneklerinde özel kalıplar çıkarmaktadır. Renk danışmanlığı ve 3D model görselleştirme ücretsiz olarak sunulmaktadır.`,
    images: [IMG.gece1, IMG.gece2, IMG.gece3],
    features: ['Fransız dantel & İtalyan organze', 'Vücut tipi & renk analizi', '3D model görselleştirme', 'Aksesuar & stil danışmanlığı', 'Mini / Midi / Maksi seçenekler'],
    waMsg: 'Merhaba, gece daveti için özel kıyafet tasarımı yaptırmak istiyorum.',
  },
  {
    id: 'muslin-keten',
    icon: '🌿',
    color: C.emerald,
    colorLight: '#ECFDF5',
    tag: '%100 Organik',
    title: 'Müslin & Keten Doğal Koleksiyon',
    subtitle: 'Doğayla Uyum, Bedeninizle Özgürlük',
    desc: `%100 organik sertifikalı müslin ve keten kumaşlardan, cildinize nefes aldıran, GOTS sertifikasını taşıyan koleksiyonumuzu keşfedin. Kadın için rahat elbiseler, erkek için keten gömlekler, bebek ve çocuklar için antialerjik tulum ve takımlar tasarlıyoruz. Anne-bebek kombini koleksiyonumuz özel fotoğraf çekimleri için birebir aynı kumaştan uyumlu tasarımlar sunmaktadır.`,
    images: [IMG.muslin1, IMG.muslin2, IMG.muslin3],
    features: ['GOTS & OEKO-TEX sertifikalı', 'Kimyasal içermeyen doğal boyalar', 'Anne-bebek kombin serisi', 'Bebek antialerjik koleksiyon', 'Tüm mevsim yazlık modeller'],
    waMsg: 'Merhaba, müslin ve keten doğal koleksiyon siparişi vermek istiyorum.',
  },
  {
    id: 'gelinlik',
    icon: '👰',
    color: '#BE185D',
    colorLight: '#FDF2F8',
    tag: 'Hayat Boyu Anı',
    title: 'Gelinlik & Düğün Koleksiyonu',
    subtitle: 'O Güne Layık Tek Parça — Sadece Sizin İçin',
    desc: `Hayatınızın en kutsal gününde taşıyacağınız gelinliği hazır raflardan değil, sizin için özel olarak tasarlayıp dikiyoruz. İlk danışma görüşmesinden son prova ve teslimat aşamasına kadar kişisel stil danışmanınız yanınızda. Swarovski taşlar, el yapımı dantel aplikeler ve kişisel anlam taşıyan gizli detaylarla benzersiz gelinliğinizi yaratıyoruz.`,
    images: [IMG.gelin1, IMG.gelin2, IMG.gelin3],
    features: ['Kişisel stil danışmanı', 'Swarovski & el nakışı detay', 'Gizli anlamlı detaylar', 'Ücretsiz kargo & revizyon', 'Ömür boyu saklama çantası'],
    waMsg: 'Merhaba, özel gelinlik tasarımı ve dikimi için randevu almak istiyorum.',
  },
  {
    id: 'gunluk',
    icon: '☀️',
    color: C.amber,
    colorLight: '#FFFBEB',
    tag: 'Her Gün Şıklık',
    title: 'Günlük & Casual Koleksiyon',
    subtitle: 'Konfor ve Stil, Her Gün Her Yerde',
    desc: `Sabah kahvesinden akşam yemeğine, iş toplantısından hafta sonu pikniğine kadar her anınıza eşlik eden, tam bedeninize oturan günlük kıyafetler artık sadece birkaç ölçü paylaşımı kadar uzağınızda. Hazır giyimde yaşadığınız beden sorunlarına son veriyoruz — kıyafet size uyar. İstediğiniz renk, desen, kumaş ve model kombinasyonunda üretim yapıyoruz.`,
    images: [IMG.gunluk1, IMG.gunluk2, IMG.gunluk3],
    features: ['Tüm beden tiplerine özel kalıp', 'Makinede yıkanabilir kumaşlar', 'İstediğiniz renk & desen', 'Pantolon / Bluz / Elbise / Gömlek', '48 saat içinde taslak onayı'],
    waMsg: 'Merhaba, günlük ve casual kıyafet siparişi vermek istiyorum.',
  },
];

const FAQS = [
  { q: "Türkiye'nin herhangi bir şehrinden sipariş verebilir miyim?", a: "Kesinlikle! İstanbul'dan Hakkari'ye, İzmir'den Kars'a Türkiye'nin 81 iline kapıya kadar kargo teslimatı yapıyoruz. Tüm süreç WhatsApp üzerinden yürütülüyor; mağazaya ya da atölyeye gelmenize gerek yok." },
  { q: "Ölçülerimi nasıl alacağım, yardımcı olur musunuz?", a: "Evet! WhatsApp üzerinden görüntülü ölçü alma seansı ayarlıyoruz. Uzman ekibimiz sizi adım adım yönlendirir; sadece bir mezura ve akıllı telefonunuz yeterli." },
  { q: "Sipariş ne kadar sürede teslim edilir?", a: "Temel modeller 7–10 iş gününde, abiye ve gelinlik gibi detaylı modeller 15–21 iş gününde tamamlanır. Kargo 1–3 iş günü içinde kapınıza ulaşır. Acele sipariş hizmeti mevcuttur." },
  { q: "Kıyafet tam oturmadıysa ne olacak?", a: "Tam Uyum Garantimiz kapsamında ücretsiz revizyon hakkınız var. Ürünü iade edersiniz, revize edilmiş haliyle tekrar kapınıza gönderilir. Hiçbir şekilde memnun kalmazsanız koşulsuz iade politikamız devreye girer." },
  { q: "Kendi kumaşımı getirip diktirebilir miyim?", a: "Evet! Kendi kumaşınızla fason dikim hizmeti de sunuyoruz. Kumaşınızı kargo ile atölyemize gönderin, ölçü ve model bilgilerinizle birlikte kıyafetiniz dikilip kapınıza gönderilir." },
  { q: "4 dilde hizmet gerçekten mümkün mü?", a: "Türkçe, İngilizce, Almanca ve Arapça dillerinde müşteri hizmeti sunuyoruz. Yurt dışında yaşayan Türkler ve uluslararası müşterilerimiz için özellikle geliştirdiğimiz bu hizmet sayesinde dünyada nerede olursanız olun, SwapHubs Online Terzi hizmetinden faydalanabilirsiniz." },
];

const STATS = [
  { n: '12.000+', label: 'Mutlu Müşteri' },
  { n: '81', label: 'İl Teslimat' },
  { n: '4', label: 'Dil Hizmet' },
  { n: '%98', label: 'Memnuniyet' },
  { n: '7+', label: 'Yıl Tecrübe' },
  { n: '500+', label: 'Farklı Model' },
];

// ─── Güvenli resim bileşeni — yüklenemezse placeholder gösterir ──────────────
function SafeImg({
  src, alt, style, placeholderColor = '#E5E7EB'
}: { src: string; alt: string; style?: React.CSSProperties; placeholderColor?: string }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) {
    return (
      <div style={{
        ...style,
        backgroundColor: placeholderColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 32, opacity: 0.3 }}>🧵</span>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div style={{ ...style, backgroundColor: placeholderColor, position: 'absolute', inset: 0 }} />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity 0.4s', position: loaded ? 'static' : 'absolute' }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  );
}

// ─── Ana bileşen ─────────────────────────────────────────────────────────────
export default function OnlineTerziClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeLang, setActiveLang] = useState('TR');
  const [sloganIdx, setSloganIdx] = useState(0);
  const [imgIndex, setImgIndex] = useState<Record<string, number>>({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSloganIdx(i => (i + 1) % SLOGANS.length), 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cycleImg = useCallback((catId: string, dir: 1 | -1, len: number) => {
    setImgIndex(prev => {
      const cur = prev[catId] ?? 0;
      return { ...prev, [catId]: (cur + dir + len) % len };
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.charcoal, backgroundColor: C.white, margin: 0, padding: 0, overflowX: 'hidden' }}>

      {/* ── GÜVEN ÇUBUĞU ─────────────────────────────────────────── */}
      <div role="banner" style={{ background: `linear-gradient(90deg, ${C.charcoal}, ${C.charcoalMid}, ${C.charcoal})`, color: C.goldLight, fontSize: 12, fontWeight: 600, padding: '9px 16px', textAlign: 'center', letterSpacing: '0.08em', fontFamily: 'system-ui, sans-serif' }}>
        🌍 Türkiye'nin 81 İline Ücretsiz Teslimat &nbsp;·&nbsp; 4 Dil: TR · EN · DE · AR &nbsp;·&nbsp; ✓ Tam Uyum Garantisi &nbsp;·&nbsp; ✓ Ücretsiz Revizyon
      </div>

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0,
        backgroundColor: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(16px)',
        zIndex: 50,
        borderBottom: `1px solid #E5E7EB`,
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.1)' : '0 1px 8px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s',
      }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 68 }}>
          <a href="https://swaphubs.com/online-terzi-hizmeti" aria-label="SwapHubs Terzi Ana Sayfa"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 700, color: C.charcoal, textDecoration: 'none' }}>
            SwapHubs <span style={{ fontWeight: 300, color: C.gold, fontStyle: 'italic' }}>Terzi</span>
          </a>

          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} role="navigation" aria-label="Dil seçimi">
            {LANGS.map(l => (
              <button key={l} onClick={() => setActiveLang(l)}
                aria-pressed={activeLang === l}
                style={{ padding: '4px 10px', borderRadius: 6, border: activeLang === l ? `1.5px solid ${C.gold}` : '1.5px solid #E5E7EB', backgroundColor: activeLang === l ? C.gold : 'transparent', color: activeLang === l ? C.white : C.slate, fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: 'system-ui, sans-serif' }}>
                {l}
              </button>
            ))}
          </div>

          <a href={waLink("Merhaba, online terzi hizmeti hakkında bilgi almak istiyorum.")} target="_blank" rel="noopener noreferrer"
            aria-label="WhatsApp ile sipariş başlat"
            style={{ backgroundColor: C.charcoal, color: C.white, padding: '10px 20px', borderRadius: 999, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', fontFamily: 'system-ui, sans-serif' }}>
            <WaIcon size={16} />
            Siparişe Başla
          </a>
        </div>

        {/* Kategori navigasyonu */}
        <nav aria-label="Kategori menüsü" style={{ borderTop: '1px solid #F3F4F6', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 20px', display: 'flex', gap: 0 }}>
            {CATEGORIES.map(cat => (
              <a key={cat.id} href={`#${cat.id}`}
                style={{ padding: '10px 14px', fontSize: 12, fontWeight: 600, color: C.slate, textDecoration: 'none', whiteSpace: 'nowrap', borderBottom: `2px solid transparent`, fontFamily: 'system-ui, sans-serif', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.charcoal; (e.currentTarget as HTMLElement).style.borderBottomColor = C.gold; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.slate; (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'; }}>
                <span aria-hidden="true">{cat.icon}</span> {cat.title.split('&')[0].trim()}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section aria-labelledby="hero-heading" style={{ background: `linear-gradient(135deg, ${C.charcoal} 0%, #0D0D0D 50%, #1A1A1A 100%)`, minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '80px 20px' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(201,168,76,0.04) 80px, rgba(201,168,76,0.04) 81px)`, pointerEvents: 'none' }} aria-hidden="true" />

        <div style={{ maxWidth: 1300, margin: '0 auto', width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 60, position: 'relative', zIndex: 1 }}>
          <div style={{ flex: '1 1 380px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 18px', borderRadius: 999, border: `1px solid ${C.gold}55`, backgroundColor: `${C.gold}15`, marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: C.gold, display: 'inline-block' }} aria-hidden="true" />
              <span style={{ color: C.goldLight, fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', fontFamily: 'system-ui, sans-serif' }}>YENİ NESİL ONLİNE TERZİ HİZMETİ</span>
            </div>

            <h1 id="hero-heading" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 700, color: C.white, margin: '0 0 8px', lineHeight: 1.1 }}>
              Hayalinizdeki
            </h1>
            <p style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 300, color: C.gold, margin: '0 0 28px', lineHeight: 1.1, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Kıyafeti Yaratın
            </p>

            <div style={{ height: 36, overflow: 'hidden', marginBottom: 28 }} aria-live="polite" aria-atomic="true">
              <p style={{ fontSize: 18, color: '#D1D5DB', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                "{SLOGANS[sloganIdx]}"
              </p>
            </div>

            <p style={{ fontSize: 15, color: '#9CA3AF', marginBottom: 40, lineHeight: 1.8, maxWidth: 540, fontFamily: 'system-ui, sans-serif' }}>
              Türkiye'nin neresinde olursanız olun — ölçülerinizi paylaşın, modelinizi seçin, hayalinizdeki kıyafet size özel dikilip kapınıza gelsin. 4 dilde hizmet, 81 ile teslimat, sıfır ödün verilen kalite.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 48 }}>
              <a href={waLink("Merhaba, özel kıyafet siparişi vermek istiyorum.")} target="_blank" rel="noopener noreferrer"
                style={{ backgroundColor: C.wa, color: C.white, padding: '16px 32px', borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 24px rgba(37,211,102,0.4)', fontFamily: 'system-ui, sans-serif' }}>
                <WaIcon size={20} />
                Hemen Sipariş Ver
              </a>
              <a href="#kategoriler"
                style={{ backgroundColor: 'transparent', color: C.white, padding: '16px 32px', borderRadius: 999, fontWeight: 600, fontSize: 15, textDecoration: 'none', border: `1.5px solid rgba(255,255,255,0.2)`, fontFamily: 'system-ui, sans-serif' }}>
                Koleksiyonu Keşfet ↓
              </a>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }} role="list" aria-label="İstatistikler">
              {STATS.map(s => (
                <div key={s.label} style={{ textAlign: 'center' }} role="listitem">
                  <div style={{ color: C.gold, fontWeight: 700, fontSize: 22, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ color: '#6B7280', fontSize: 11, fontFamily: 'system-ui, sans-serif', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero görsel mozaik */}
          <div style={{ flex: '1 1 340px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: 12, maxWidth: 560 }} aria-hidden="true">
            {[
              { src: IMG.hero1, span: true, h: 220 },
              { src: IMG.hero2, span: false, h: 180 },
              { src: IMG.hero3, span: false, h: 180 },
              { src: IMG.hero4, span: true, h: 220 },
            ].map((img, i) => (
              <div key={i} style={{ gridColumn: img.span ? '1 / -1' : 'auto', borderRadius: 16, overflow: 'hidden', height: img.h, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', position: 'relative', backgroundColor: '#2D2D2D' }}>
                <SafeImg src={img.src} alt="Moda koleksiyonu" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.88)' }} placeholderColor="#2D2D2D" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KATEGORİLER ───────────────────────────────────────────── */}
      <section id="kategoriler" aria-labelledby="kategoriler-heading" style={{ padding: '100px 20px', backgroundColor: C.cream }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <span style={{ color: C.gold, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: 11, display: 'block', marginBottom: 12, fontFamily: 'system-ui, sans-serif' }}>Tüm Koleksiyonlar</span>
            <h2 id="kategoriler-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: C.charcoal, margin: '0 0 16px', lineHeight: 1.2 }}>
              Her Kıyafet, <span style={{ color: C.gold, fontStyle: 'italic' }}>Sadece Sizin İçin</span>
            </h2>
            <p style={{ color: C.slate, maxWidth: 600, margin: '0 auto', fontSize: 15, lineHeight: 1.7, fontFamily: 'system-ui, sans-serif' }}>
              Abiyeden üniforma'ya, müslinden spor giyime — 8 farklı kategoride kişiye özel dikim ve tasarım hizmeti. Ölçülerinizi bir kez alın, yıllarca mükemmel giyin.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            {CATEGORIES.map((cat, idx) => {
              const isEven = idx % 2 === 0;
              const curImg = imgIndex[cat.id] ?? 0;
              return (
                <article key={cat.id} id={cat.id} aria-labelledby={`cat-title-${cat.id}`}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center', flexDirection: isEven ? 'row' : 'row-reverse' }}>

                  {/* Görsel carousel */}
                  <div style={{ flex: '1 1 360px', position: 'relative' }}>
                    <div style={{ borderRadius: 24, overflow: 'hidden', height: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', position: 'relative', backgroundColor: '#F3F4F6' }}>
                      <SafeImg
                        src={cat.images[curImg]}
                        alt={`${cat.title} — görsel ${curImg + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        placeholderColor="#F3F4F6"
                      />
                      {/* gradient overlay */}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)', pointerEvents: 'none' }} aria-hidden="true" />
                      {/* etiket */}
                      <div style={{ position: 'absolute', top: 16, left: 16, backgroundColor: cat.color, color: C.white, fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 999, fontFamily: 'system-ui, sans-serif' }}>{cat.tag}</div>
                      {/* carousel okları */}
                      {cat.images.length > 1 && (
                        <>
                          <button onClick={() => cycleImg(cat.id, -1, cat.images.length)}
                            aria-label="Önceki görsel"
                            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.92)', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>‹</button>
                          <button onClick={() => cycleImg(cat.id, 1, cat.images.length)}
                            aria-label="Sonraki görsel"
                            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.92)', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>›</button>
                        </>
                      )}
                      {/* nokta göstergesi */}
                      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }} role="tablist" aria-label="Görsel seçimi">
                        {cat.images.map((_, di) => (
                          <button key={di} role="tab" aria-selected={di === curImg} aria-label={`Görsel ${di + 1}`}
                            style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: di === curImg ? C.white : 'rgba(255,255,255,0.4)', cursor: 'pointer', border: 'none', padding: 0, transition: 'all 0.2s' }}
                            onClick={() => setImgIndex(prev => ({ ...prev, [cat.id]: di }))} />
                        ))}
                      </div>
                    </div>
                    {/* ikon rozeti */}
                    <div style={{ position: 'absolute', bottom: -20, right: isEven ? -12 : 'auto', left: isEven ? 'auto' : -12, backgroundColor: C.white, padding: '12px 20px', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: 10, border: `1px solid #F3F4F6` }} aria-hidden="true">
                      <span style={{ fontSize: 24 }}>{cat.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, color: C.charcoal, fontSize: 13 }}>Kişiye Özel</div>
                        <div style={{ fontSize: 11, color: C.slate, fontFamily: 'system-ui, sans-serif' }}>Tek parça üretim</div>
                      </div>
                    </div>
                  </div>

                  {/* İçerik */}
                  <div style={{ flex: '1 1 340px' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: cat.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'system-ui, sans-serif' }}>{cat.subtitle}</p>
                    <h2 id={`cat-title-${cat.id}`} style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, color: C.charcoal, margin: '0 0 20px', lineHeight: 1.2 }}>{cat.title}</h2>
                    <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.85, marginBottom: 28, fontFamily: 'system-ui, sans-serif' }}>{cat.desc}</p>

                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32, padding: 0, listStyle: 'none' }}>
                      {cat.features.map(f => (
                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: cat.colorLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                            <span style={{ color: cat.color, fontWeight: 700, fontSize: 12 }}>✓</span>
                          </div>
                          <span style={{ fontSize: 14, color: C.charcoalLight, fontFamily: 'system-ui, sans-serif' }}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <a href={waLink(cat.waMsg)} target="_blank" rel="noopener noreferrer"
                        aria-label={`${cat.title} — WhatsApp ile sipariş ver`}
                        style={{ backgroundColor: cat.color, color: C.white, padding: '14px 28px', borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'system-ui, sans-serif', boxShadow: `0 4px 16px ${cat.color}44` }}>
                        <WaIcon size={16} />
                        Sipariş Ver
                      </a>
                      <a href={waLink(`${cat.title} hakkında fiyat bilgisi almak istiyorum.`)} target="_blank" rel="noopener noreferrer"
                        aria-label={`${cat.title} fiyat sor`}
                        style={{ color: cat.color, padding: '14px 24px', borderRadius: 999, fontWeight: 600, fontSize: 14, textDecoration: 'none', border: `1.5px solid ${cat.color}44`, display: 'inline-block', fontFamily: 'system-ui, sans-serif' }}>
                        Fiyat Sor
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NASIL ÇALIŞIR ─────────────────────────────────────────── */}
      <section id="nasil-calisir" aria-labelledby="nasil-heading" style={{ padding: '100px 20px', background: `linear-gradient(135deg, ${C.charcoal} 0%, #111 100%)`, color: C.white, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `radial-gradient(circle at 20% 50%, ${C.gold}08 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${C.gold}05 0%, transparent 50%)`, pointerEvents: 'none' }} aria-hidden="true" />
        <div style={{ maxWidth: 1300, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <span style={{ color: C.gold, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: 11, display: 'block', marginBottom: 12, fontFamily: 'system-ui, sans-serif' }}>Nasıl Çalışır?</span>
            <h2 id="nasil-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: C.white, margin: '0 0 16px' }}>
              4 Adımda <span style={{ color: C.gold, fontStyle: 'italic' }}>Özel Kıyafetiniz</span> Kapınızda
            </h2>
            <p style={{ color: '#9CA3AF', maxWidth: 560, margin: '0 auto', fontSize: 15, lineHeight: 1.7, fontFamily: 'system-ui, sans-serif' }}>
              Türkiye'nin herhangi bir şehrinden, evden çıkmadan — sadece WhatsApp yeterli.
            </p>
          </div>

          <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24, padding: 0, listStyle: 'none' }}>
            {[
              { n: '01', icon: '📏', title: 'Ölçünüzü Alın', desc: 'Evdeki mezuranızla 5 temel ölçüyü alın. Yardıma ihtiyacınız varsa WhatsApp görüntülü ölçü seansı ayarlıyoruz. Uzman ekibimiz sizi adım adım yönlendirir.' },
              { n: '02', icon: '✏️', title: 'Modelinizi Seçin', desc: 'Koleksiyonumuzdaki modeller arasından seçim yapın ya da hayalinizdeki kıyafetin fotoğrafını gönderin. Tasarımcılarımız 48 saat içinde taslak hazırlar.' },
              { n: '03', icon: '✂️', title: 'Üretim Başlıyor', desc: 'Taslağı onayladığınız anda atölyemiz harekete geçer. Kalıp çıkarma, kesim, dikim, ütü ve kalite kontrol aşamaları eksiksiz tamamlanır.' },
              { n: '04', icon: '📦', title: 'Kapınıza Gelir', desc: 'Özenle paketlenen kıyafetiniz Türkiye\'nin 81 iline teslimat yapılır. Memnun kalmazsanız ücretsiz revizyon veya koşulsuz iade garantimiz devreye girer.' },
            ].map(s => (
              <li key={s.n} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 32, border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
                <div aria-hidden="true" style={{ color: C.gold, fontSize: 36, fontWeight: 700, opacity: 0.3, lineHeight: 1, marginBottom: 16, fontFamily: 'system-ui, sans-serif' }}>{s.n}</div>
                <div aria-hidden="true" style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: C.white, margin: '0 0 12px' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.7, margin: 0, fontFamily: 'system-ui, sans-serif' }}>{s.desc}</p>
              </li>
            ))}
          </ol>

          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <a href={waLink("Merhaba, ölçülerimi almak ve sipariş sürecini başlatmak istiyorum.")} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, backgroundColor: C.wa, color: C.white, padding: '18px 40px', borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 6px 32px rgba(37,211,102,0.4)', fontFamily: 'system-ui, sans-serif' }}>
              <WaIcon size={22} />
              WhatsApp'tan Sipariş Başlat
            </a>
          </div>
        </div>
      </section>

      {/* ── NEDEN BİZ ─────────────────────────────────────────────── */}
      <section aria-labelledby="neden-heading" style={{ padding: '100px 20px', backgroundColor: C.white }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center' }}>
            <div style={{ flex: '1 1 300px' }}>
              <span style={{ color: C.gold, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: 11, display: 'block', marginBottom: 12, fontFamily: 'system-ui, sans-serif' }}>Neden SwapHubs?</span>
              <h2 id="neden-heading" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, color: C.charcoal, margin: '0 0 20px', lineHeight: 1.2 }}>
                Türkiye'nin En Yenilikçi <span style={{ color: C.gold, fontStyle: 'italic' }}>Online Terzi Platformu</span>
              </h2>
              <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.85, marginBottom: 32, fontFamily: 'system-ui, sans-serif' }}>
                2017'den bu yana Antalya merkezli atölyemizde 12.000'den fazla müşteri için özel kıyafet tasarladık ve diktik. Geleneksel terziliğin zanaat anlayışını dijital çağın konfort ve hızıyla birleştiren hibrit modelimizle Türkiye'nin 81 iline hizmet veriyoruz.
              </p>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: 0, listStyle: 'none' }}>
                {[
                  { icon: '🎯', title: 'Sıfır Hata Garantisi', desc: 'Kalıp çıkarmada dijital ölçüm teknolojisi' },
                  { icon: '⚡', title: 'Hızlı Teslimat', desc: 'Temel modeller 7–10 iş günü içinde hazır' },
                  { icon: '🌿', title: 'Sürdürülebilir Moda', desc: 'OEKO-TEX & GOTS sertifikalı organik kumaşlar' },
                  { icon: '🌍', title: '4 Dil Desteği', desc: 'TR · EN · DE · AR dillerinde tam hizmet' },
                ].map(w => (
                  <li key={w.title} style={{ padding: 20, borderRadius: 16, border: '1px solid #F3F4F6', backgroundColor: C.cream }}>
                    <div aria-hidden="true" style={{ fontSize: 24, marginBottom: 8 }}>{w.icon}</div>
                    <div style={{ fontWeight: 700, color: C.charcoal, fontSize: 14, marginBottom: 4 }}>{w.title}</div>
                    <div style={{ fontSize: 12, color: C.slate, lineHeight: 1.5, fontFamily: 'system-ui, sans-serif' }}>{w.desc}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: '1 1 340px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} aria-hidden="true">
              {[IMG.atolye1, IMG.atolye2, IMG.atolye3, IMG.atolye4].map((src, i) => (
                <div key={i} style={{ borderRadius: 16, overflow: 'hidden', height: 200, backgroundColor: '#F3F4F6', position: 'relative' }}>
                  <SafeImg src={src} alt="Atölye" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SSS ───────────────────────────────────────────────────── */}
      <section id="sss" aria-labelledby="sss-heading" style={{ padding: '100px 20px', backgroundColor: C.cream }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ color: C.gold, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: 11, display: 'block', marginBottom: 12, fontFamily: 'system-ui, sans-serif' }}>SSS</span>
            <h2 id="sss-heading" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 700, color: C.charcoal, margin: '0 0 12px' }}>Sık Sorulan Sorular</h2>
            <p style={{ color: C.slate, fontSize: 15, fontFamily: 'system-ui, sans-serif' }}>Aklınızdaki tüm soruların yanıtları burada.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ border: `1px solid ${openFaq === i ? C.gold + '66' : '#E5E7EB'}`, borderRadius: 16, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  style={{ width: '100%', textAlign: 'left', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.white, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 15, color: C.charcoal, fontFamily: 'system-ui, sans-serif' }}>
                  <span>{faq.q}</span>
                  <span aria-hidden="true" style={{ color: C.gold, fontWeight: 700, fontSize: 22, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: 16 }}>+</span>
                </button>
                {openFaq === i && (
                  <div id={`faq-answer-${i}`} role="region" style={{ padding: '0 24px 20px', fontSize: 14, color: C.slate, lineHeight: 1.75, backgroundColor: C.cream, borderTop: `1px solid #F3F4F6`, fontFamily: 'system-ui, sans-serif' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 20px', background: `linear-gradient(135deg, ${C.charcoal}, #0D0D0D)`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(ellipse at center, ${C.gold}10 0%, transparent 60%)`, pointerEvents: 'none' }} aria-hidden="true" />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <div aria-hidden="true" style={{ fontSize: 56, marginBottom: 20 }}>✨</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, color: C.white, margin: '0 0 16px', lineHeight: 1.2 }}>
            Hayalinizdeki Kıyafet
          </h2>
          <p style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 300, color: C.gold, fontStyle: 'italic', margin: '0 0 28px', lineHeight: 1.2, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Bir Mesaj Kadar Yakın
          </p>
          <p style={{ fontSize: 16, color: '#9CA3AF', marginBottom: 48, lineHeight: 1.7, fontFamily: 'system-ui, sans-serif' }}>
            Şu an WhatsApp'ta bize yazın. Ölçülerinizi alın, modelinizi seçin — kıyafetiniz kapınıza gelsin. Türkiye'nin tüm illerine ve yurt dışına teslimat yapıyoruz.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <a href={waLink("Merhaba! Özel kıyafet tasarımı ve dikimi hakkında bilgi almak istiyorum.")} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, backgroundColor: C.wa, color: C.white, padding: '18px 40px', borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 8px 32px rgba(37,211,102,0.45)', fontFamily: 'system-ui, sans-serif' }}>
              <WaIcon size={22} />
              WhatsApp'tan Yazın
            </a>
            <a href="tel:+905318986418"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255,255,255,0.08)', color: C.white, padding: '18px 32px', borderRadius: 999, fontWeight: 600, fontSize: 16, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.15)', fontFamily: 'system-ui, sans-serif' }}>
              📞 +90 531 898 64 18
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: '#080808', padding: '60px 20px 28px', borderTop: '1px solid #1F1F1F' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, color: C.white, fontWeight: 700, marginBottom: 16 }}>
                SwapHubs <span style={{ color: C.gold, fontStyle: 'italic', fontWeight: 300 }}>Terzi</span>
              </div>
              <p style={{ color: '#6B7280', fontSize: 13, lineHeight: 1.7, fontFamily: 'system-ui, sans-serif' }}>
                Türkiye'nin yeni nesil dijital özel terzi ve tekstil platformu. Antalya'dan 81 ile, 4 dilde premium hizmet. WhatsApp üzerinden bize ölçülerinizi gönderin, istediğiniz kıyafeti dikelim, kapınıza ücretsiz kargo ile ulaştıralım.
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                {LANGS.map(l => (
                  <span key={l} style={{ padding: '4px 10px', border: '1px solid #333', borderRadius: 6, color: '#9CA3AF', fontSize: 11, fontFamily: 'system-ui, sans-serif' }}>{l}</span>
                ))}
              </div>
            </div>
            <nav aria-label="Koleksiyonlar">
              <div style={{ color: C.white, fontWeight: 700, marginBottom: 16, fontSize: 13, fontFamily: 'system-ui, sans-serif' }}>Koleksiyonlar</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 0, listStyle: 'none' }}>
                {CATEGORIES.map(c => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', fontFamily: 'system-ui, sans-serif' }}>
                      <span aria-hidden="true">{c.icon}</span> {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <div style={{ color: C.white, fontWeight: 700, marginBottom: 16, fontSize: 13, fontFamily: 'system-ui, sans-serif' }}>Hizmetler</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#6B7280', fontFamily: 'system-ui, sans-serif', padding: 0, listStyle: 'none' }}>
                {['Özel Tasarım & Dikim', 'Kalıp Çıkarma', 'Fason Üretim', 'Kurumsal Tekstil', 'Kendi Kumaşınla Dikim', '3D Model Görselleştirme'].map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ color: C.white, fontWeight: 700, marginBottom: 16, fontSize: 13, fontFamily: 'system-ui, sans-serif' }}>İletişim</div>
              <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, fontFamily: 'system-ui, sans-serif' }}>
                <a href={waLink("Merhaba!")} target="_blank" rel="noopener noreferrer" style={{ color: C.wa, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <WaIcon size={16} /> +90 531 898 64 18
                </a>
                <a href="mailto:tekstil@swaphubs.com" style={{ color: '#6B7280', textDecoration: 'none' }}>✉️ tekstil@swaphubs.com</a>
                <span style={{ color: '#6B7280' }}>📍 Antalya, Türkiye</span>
                <span style={{ color: '#4B5563' }}>🚚 81 İle Ücretsiz Kargo</span>
                <span style={{ color: '#4B5563' }}>🌍 Yurt Dışı Teslimat Mevcut</span>
              </address>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1F1F1F', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 11, color: '#4B5563', fontFamily: 'system-ui, sans-serif' }}>
            <span>© {new Date().getFullYear()} SwapHubs Online Terzi Platformu. Tüm Hakları Saklıdır.</span>
            <span>Antalya'dan 🇹🇷 Türkiye'ye & Dünyaya</span>
          </div>
        </div>
      </footer>

      {/* ── YÜZEN WA BUTONU ──────────────────────────────────────── */}
      <a href={waLink("Merhaba, e-terzi hizmeti hakkında bilgi almak istiyorum.")} target="_blank" rel="noopener noreferrer"
        aria-label="WhatsApp ile bize ulaşın"
        style={{ position: 'fixed', bottom: 24, right: 24, backgroundColor: C.wa, color: C.white, width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(37,211,102,0.55)', zIndex: 999, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}>
        <WaIcon size={30} />
      </a>

    </div>
  );
}
