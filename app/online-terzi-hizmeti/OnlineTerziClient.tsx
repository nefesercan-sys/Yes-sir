'use client';

import React, { useState, useEffect } from 'react';

const WA_NUMBER = "905000000000";
const waLink = (msg: string): string =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const WaIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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

// Türkçe içerik odaklı
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
    keywords: 'abiye dikim, özel tasarım gece elbisesi, kişiye özel abiye, nikah elbisesi, nişan kıyafeti, özel gün elbisesi, ısmarlama abiye',
    desc: `Hayatınızın en özel gecelerinde tam anlamıyla parlamak için tasarlanmış koleksiyonumuz; her bedenin güzelliğini ön plana çıkaran kesimler, el işlemeli dantel detaylar, Fransız şifon ve İtalyan saten kumaşlarla hayata geçirilmektedir. Düğün, nişan, mezuniyet, kokteyl davetleri ve kırmızı halı etkinlikleri için size özel kalıp çıkarıyor, bedeninizin her konturuna mükemmel oturan tek parça tasarımlar üretiyoruz. Balık, prenses, A-line, straplez veya uzun kollu; hangi silueti hayal ediyorsanız onu gerçeğe dönüştürüyoruz. Ölçülerinizi WhatsApp üzerinden bize iletin, 3D taslak görselini onaylayın ve kıyafetiniz kapınıza gelsin.`,
    images: [
      'https://images.unsplash.com/photo-1566479179817-0b4d48a3b8d8?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop',
    ],
    features: ['El işlemeli dantel & boncuk', 'İtalyan saten & Fransız şifon', 'Balık / Prenses / A-line kesim', '3D taslak onayı', 'Ücretsiz revizyon'],
    waMsg: 'Merhaba, özel tasarım abiye/gece elbisesi siparişi vermek istiyorum. Ölçülerimi ve modelimi paylaşabilir miyim?',
  },
  {
    id: 'takim',
    icon: '🎩',
    color: C.navy,
    colorLight: '#EFF6FF',
    tag: 'Prestij Serisi',
    title: 'Takım Elbise & Smokin',
    subtitle: 'Her Ortamda Fark Yaratın',
    keywords: 'özel takım elbise dikim, ısmarlama smokin, kişiye özel ceket, erkek özel dikim, iş toplantısı takımı, damat takımı, düğün smokin',
    desc: `İngiltere'nin klasik Savile Row geleneğini dijital çağın kolaylığıyla buluşturuyoruz. Her detayı sizin için özelleştirilen takım elbiselerimiz; İtalyan yün karışımlı kumaşlar, Türk penyesi ve süperfine wool seçenekleriyle sunulmaktadır. Tek düğme slim fit, çift düğme klasik, üç parçalı yelek seçenekleri; kol boyu, sırt yırtmaç, yaka genişliği ve cep detaylarına kadar tamamen kişiselleştirilmektedir. Damat takımları için özel renk paleti ve kumaş kombinasyonları, iş görüşmeleri için otoriter kesimler, özel davetler için smokin ve frak tasarımları üretiyoruz. Ölçülerinizi bir kez alın, yıllarca mükemmel oturan kıyafetlere sahip olun.`,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop',
    ],
    features: ['İtalyan wool & supefine kumaş', 'Slim / Classic / Modern fit', 'Damat & düğün özel serisi', 'Kol, yaka, cep kişiselleştirme', 'Yaka nakışı & monogram'],
    waMsg: 'Merhaba, özel takım elbise veya smokin siparişi vermek istiyorum. Ölçülerimi ve modelimi paylaşabilir miyim?',
  },
  {
    id: 'spor',
    icon: '⚡',
    color: C.teal,
    colorLight: '#F0FDFA',
    tag: 'Performans Serisi',
    title: 'Spor & Aktif Giyim',
    subtitle: 'Hareket Özgürlüğü, Stil Mükemmelliği',
    keywords: 'özel spor kıyafet dikim, kişiye özel spor giyim, yoga kıyafeti, koşu forması, antrenman kıyafeti, özel spor takımı, fitness giyim tasarımı',
    desc: `Spor salonundan açık havaya, yogadan crossfit'e kadar her aktivite için bedeninizin hareketini özgürleştiren, ter yönetimini optimize eden ve sizi en iyi gösteren özel spor kıyafetler tasarlıyoruz. 4 yönlü streç likra, nem uzaklaştırıcı coolmax, UV korumalı kumaşlar ve antibakteriyel iplikler kullanarak tasarladığımız her parça hem estetik hem de işlevsel mükemmelliği bir arada sunuyor. Kişisel logonuzu, renklerinizi ve ölçülerinizi belirleyin; maraton koşuculuğundan pilates stüdyolarına, dağ yürüyüşünden su sporlarına kadar her aktiviteye özel set üretiyoruz. Takım sporları için grup siparişlerinde %20 indirim uygulanmaktadır.`,
    images: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    ],
    features: ['4 yönlü streç & coolmax', 'UV koruma & antibakteriyel', 'Logo & renk kişiselleştirme', 'Takım siparişi %20 indirim', 'Su sporları & outdoor serisi'],
    waMsg: 'Merhaba, özel spor ve aktif giyim siparişi vermek istiyorum. Ölçülerimi ve modelimi paylaşabilir miyim?',
  },
  {
    id: 'unifroma',
    icon: '🏨',
    color: C.charcoal,
    colorLight: '#F9FAFB',
    tag: 'B2B Kurumsal',
    title: 'Üniforma & Kurumsal Kıyafet',
    subtitle: 'Kurumsal Kimliğinizi Giyinin',
    keywords: 'kurumsal üniforma dikim, otel üniforma, restoran kıyafeti, medikal scrubs, personel kıyafeti, iş kıyafeti tasarımı, özel üniforma üretimi',
    desc: `Kurumsal imajınızın en güçlü yansıması çalışanlarınızın giydiği üniforma olduğunu biliyoruz. Otel resepsiyonistlerinden şeflere, medikal personelden havacılık ekiplerine kadar her sektörün özgün ihtiyaçlarına göre üniforma koleksiyonları tasarlıyor ve üretiyoruz. OEKO-TEX sertifikalı, uzun saatler boyunca konfor sağlayan antimikrobiyal ve kolay ütülenebilir kumaşlar kullanıyoruz. Marka renklerinizi, logonuzu ve kurumsal kimlik yönergelerinizi temel alarak özgün tasarımlar geliştiriyoruz. Minimum 10 adet siparişten başlayan toplu üretim imkânı, 60 gün sonra tekrar sipariş garantisi ve yıl boyu stok hizmeti sunuyoruz. Aşçılar için ergonomik cep tasarımları, garsonlar için leke itici apre uygulamaları, sağlık çalışanları için antimikrobiyal scrubs serisi başlıca uzmanlık alanlarımızdır.`,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop',
    ],
    features: ['Min. 10 adet toplu üretim', 'Logo nakışı & baskı', 'Antimikrobiyal & leke itici', 'Sağlık / Turizm / Havacılık', '60 gün yeniden sipariş garantisi'],
    waMsg: 'Merhaba, kurumsal üniforma üretimi için fiyat teklifi almak istiyorum. Sektörümüz ve adet bilgisini paylaşabilir miyim?',
  },
  {
    id: 'gece-davet',
    icon: '🌙',
    color: C.violet,
    colorLight: '#F5F3FF',
    tag: 'Lüks Koleksiyon',
    title: 'Gece & Davet Kıyafetleri',
    subtitle: 'Her Davet Bir Sahne, Her Kıyafet Bir Başyapıt',
    keywords: 'gece daveti kıyafeti, kokteyl elbisesi özel dikim, davet kıyafeti tasarımı, parti elbisesi dikim, özel gece kıyafeti, lüks kıyafet tasarımı',
    desc: `Kokteyl partilerinden gala gecelerine, özel davetlerden yıllık balo etkinliklerine kadar her ortamda sizi en zarif şekilde temsil edecek kıyafetler tasarlıyoruz. Fransız dantel, İtalyan organze, İspanyol brokart ve Türk ipek dokumalarını bir arada kullanan tasarımcı ekibimiz; mini, midi ve maksi boy seçeneklerinde, straplez, tek omuz, dekolte ve kapalı yakalarda özel kalıplar çıkarmaktadır. Her kıyafete eşleşen aksesuar önerileri, saç ve makyaj uyum kılavuzu sunuyoruz. Renk danışmanlığı, vücut tipi analizi ve stil danışmanlığı ücretsiz olarak hizmet kapsamındadır. Son teknoloji 3D model görselleştirme ile kıyafetinizi dikilmeden önce vücudunuzda nasıl görüneceğini görebilirsiniz.`,
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518622958668-eb0c08a7ea37?q=80&w=600&auto=format&fit=crop',
    ],
    features: ['Fransız dantel & İtalyan organze', 'Vücut tipi & renk analizi', '3D model görselleştirme', 'Aksesuar & stil danışmanlığı', 'Mini / Midi / Maksi seçenekler'],
    waMsg: 'Merhaba, gece daveti için özel kıyafet tasarımı yaptırmak istiyorum. Detayları paylaşabilir miyim?',
  },
  {
    id: 'muslin-keten',
    icon: '🌿',
    color: C.emerald,
    colorLight: '#ECFDF5',
    tag: '%100 Organik',
    title: 'Müslin & Keten Doğal Koleksiyon',
    subtitle: 'Doğayla Uyum, Bedeninizle Özgürlük',
    keywords: 'müslin elbise özel dikim, keten kıyafet tasarımı, organik kumaş kıyafet, doğal kumaş dikim, eko moda özel üretim, bebek müslin kıyafet, anne bebek kombin',
    desc: `%100 organik sertifikalı müslin ve keten kumaşlardan, cildinize nefes aldıran, kimyasal boyasız doğal pigmentlerle renklendirilmiş ve GOTS sertifikasını taşıyan koleksiyonumuzu keşfedin. Kadın için rahat ve akıcı palazzo pantolonlar, yazlık bluzlar, bol kesim elbiseler; erkek için terletmeyen keten gömlekler, şortlar ve hafif ceketler; bebek ve çocuklar için antialerjik, yumuşacık tulum ve takımlar tasarlıyoruz. Anne-bebek kombini koleksiyonumuz özel fotoğraf çekimleri ve anı günleri için birebir aynı kumaştan uyumlu tasarımlar sunmaktadır. Hem çevre dostu hem de sağlıklı bir seçim yapın; güneşin altında en ferah ve en şık sizinle aynı anda mümkün.`,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop',
    ],
    features: ['GOTS & OEKO-TEX sertifikalı', 'Kimyasal içermeyen doğal boyalar', 'Anne-bebek kombin serisi', 'Bebek antialerjik koleksiyon', 'Tüm mevsim yazlık modeller'],
    waMsg: 'Merhaba, müslin ve keten doğal koleksiyon siparişi vermek istiyorum. Ölçülerimi paylaşabilir miyim?',
  },
  {
    id: 'gelinlik',
    icon: '👰',
    color: '#BE185D',
    colorLight: '#FDF2F8',
    tag: 'Hayat Boyu Anı',
    title: 'Gelinlik & Düğün Koleksiyonu',
    subtitle: 'O Güne Layık Tek Parça — Sadece Sizin İçin',
    keywords: 'özel gelinlik dikim, ısmarlama gelinlik, kişiye özel gelinlik tasarımı, nikah elbisesi özel dikim, gelin kıyafeti tasarımı, gelinlik atölyesi Türkiye',
    desc: `Hayatınızın en kutsal gününde taşıyacağınız gelinliği hazır raflardan değil, sizin için özel olarak tasarlayıp dikiyoruz. İlk danışma görüşmesinden son prova ve teslimat aşamasına kadar kişisel stil danışmanınız yanınızda. İnce beli vurgulayan balık kesimler, romantik hacimli prenses modeller, modern ve minimalist sade tasarımlar ile bohem ruhlu bohemian siluetler arasından sizinle birlikte en doğru seçimi yapıyoruz. Swarovski taşlar, el yapımı dantel aplikeler, nakışlı etekler ve kişisel anlam taşıyan gizli detaylar (babanızın kravatından bir şerit, dedenizin mendilinden bir parça) ile benzersiz gelinliğinizi yaratıyoruz. Türkiye'nin her iline kargo ile teslimat yapılmaktadır; ücretsiz kargo, ücretsiz revizyon ve ömür boyu saklama çantası dahildir.`,
    images: [
      'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=600&auto=format&fit=crop',
    ],
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
    keywords: 'günlük kıyafet özel dikim, casual kıyafet tasarımı, kişiye özel pantolon, özel bluz dikim, gündelik giyim tasarımı, rahat şık kıyafet, ısmarlama casual kıyafet',
    desc: `Sabah kahvesinden akşam yemeğine, iş toplantısından hafta sonu pikniğine kadar her anınıza eşlik eden, tam bedeninize oturan günlük kıyafetler artık sadece birkaç ölçü paylaşımı kadar uzağınızda. Hazır giyimde yaşadığınız "bel dar bitti, basen dar bitti" sorunlarına son veriyoruz. Kendi bedeniniz için çıkarılmış özel kalıplarla dikilen pantolon, bluz, gömlek, elbise ve dış giyim parçaları; istediğiniz renk, desen, kumaş ve model kombinasyonunda hayata geçirilmektedir. Günde 12 saat konforla taşıyabileceğiniz, makinede yıkanabilir, solmaz boyalı ve dayanıklı kumaşları tercih ediyoruz. Artık kendinizi kalıba uydurmak zorunda değilsiniz — kıyafet size uyar.`,
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
    ],
    features: ['Tüm beden tiplerine özel kalıp', 'Makinede yıkanabilir kumaşlar', 'İstediğiniz renk & desen', 'Pantolon / Bluz / Elbise / Gömlek', '48 saat içinde taslak onayı'],
    waMsg: 'Merhaba, günlük ve casual kıyafet siparişi vermek istiyorum. Ölçülerimi paylaşabilir miyim?',
  },
];

const FAQS = [
  { q: "Türkiye'nin herhangi bir şehrinden sipariş verebilir miyim?", a: "Kesinlikle! İstanbul'dan Hakkari'ye, İzmir'den Kars'a Türkiye'nin 81 iline kapıya kadar kargo teslimatı yapıyoruz. Tüm süreç WhatsApp üzerinden yürütülüyor; mağazaya ya da atölyeye gelmenize gerek yok. Ücretsiz kargo imkânı belirli sipariş tutarlarında geçerlidir." },
  { q: "Ölçülerimi nasıl alacağım, yardımcı olur musunuz?", a: "Evet! WhatsApp üzerinden görüntülü ölçü alma seansı ayarlıyoruz. Uzman ekibimiz sizi adım adım yönlendirir; sadece bir mezura ve akıllı telefonunuz yeterli. Alternatif olarak, hazır kıyafetlerinizden ölçü alma yöntemini de kullanabilirsiniz." },
  { q: "Sipariş ne kadar sürede teslim edilir?", a: "Model karmaşıklığına göre 10–21 iş günü içinde hazırlanır. Temel modeller 7–10 iş gününde, abiye ve gelinlik gibi detaylı modeller 15–21 iş gününde tamamlanır. Kargo 1–3 iş günü içinde kapınıza ulaşır. Acele sipariş hizmeti mevcuttur (+50% ek ücret)." },
  { q: "Kıyafet tam oturmadıysa ne olacak?", a: "Tam Uyum Garantimiz kapsamında ücretsiz revizyon hakkınız var. Ürünü iade edersiniz, revize edilmiş haliyle tekrar kapınıza gönderilir. Eğer hiçbir şekilde memnun kalmazsanız, koşulsuz iade politikamız devreye girer." },
  { q: "Kendi kumaşımı getirip diktirebilir miyim?", a: "Evet! Kendi kumaşınızla fason dikim hizmeti de sunuyoruz. Kumaşınızı kargo ile atölyemize gönderin, ölçü ve model bilgilerinizle birlikte kıyafetiniz dikilip kapınıza gönderilir. Fason dikim ücretlendirmesi ayrıca hesaplanır." },
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

export default function OnlineTerziClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeLang, setActiveLang] = useState('TR');
  const [sloganIdx, setSloganIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [imgIndex, setImgIndex] = useState<Record<string, number>>({});

  useEffect(() => {
    const t = setInterval(() => setSloganIdx(i => (i + 1) % SLOGANS.length), 3000);
    return () => clearInterval(t);
  }, []);

  const cycleImg = (catId: string, dir: 1 | -1) => {
    setImgIndex(prev => {
      const cur = prev[catId] ?? 0;
      const cat = CATEGORIES.find(c => c.id === catId)!;
      const next = (cur + dir + cat.images.length) % cat.images.length;
      return { ...prev, [catId]: next };
    });
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.charcoal, backgroundColor: C.white, margin: 0, padding: 0, overflowX: 'hidden' }}>

      {/* TRUST BAR */}
      <div style={{ background: `linear-gradient(90deg, ${C.charcoal}, ${C.charcoalMid}, ${C.charcoal})`, color: C.goldLight, fontSize: 12, fontWeight: 600, padding: '9px 16px', textAlign: 'center', letterSpacing: '0.08em', fontFamily: 'system-ui, sans-serif' }}>
        🌍 Türkiye'nin 81 İline Ücretsiz Teslimat &nbsp;·&nbsp; 4 Dilde Hizmet: TR · EN · DE · AR &nbsp;·&nbsp; ✓ Tam Uyum Garantisi &nbsp;·&nbsp; ✓ Ücretsiz Revizyon
      </div>

      {/* NAVBAR */}
      <header style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', zIndex: 50, borderBottom: `1px solid #E5E7EB`, boxShadow: '0 1px 8px rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 68 }}>
          <a href="https://swaphubs.com/online-terzi-hizmeti" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 700, color: C.charcoal, textDecoration: 'none' }}>
            SwapHubs <span style={{ fontWeight: 300, color: C.gold, fontStyle: 'italic' }}>Terzi</span>
          </a>

          {/* Lang switcher */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {LANGS.map(l => (
              <button key={l} onClick={() => setActiveLang(l)} style={{ padding: '4px 10px', borderRadius: 6, border: activeLang === l ? `1.5px solid ${C.gold}` : '1.5px solid #E5E7EB', backgroundColor: activeLang === l ? C.gold : 'transparent', color: activeLang === l ? C.white : C.slate, fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: 'system-ui, sans-serif' }}>{l}</button>
            ))}
          </div>

          <a href={waLink("Merhaba, online terzi hizmeti hakkında bilgi almak istiyorum.")} target="_blank" rel="noopener noreferrer"
            style={{ backgroundColor: C.charcoal, color: C.white, padding: '10px 20px', borderRadius: 999, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', fontFamily: 'system-ui, sans-serif' }}>
            <WaIcon size={16} />
            Siparişe Başla
          </a>
        </div>

        {/* Category nav */}
        <div style={{ borderTop: '1px solid #F3F4F6', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 20px', display: 'flex', gap: 0 }}>
            {CATEGORIES.map(cat => (
              <a key={cat.id} href={`#${cat.id}`}
                style={{ padding: '10px 14px', fontSize: 12, fontWeight: 600, color: C.slate, textDecoration: 'none', whiteSpace: 'nowrap', borderBottom: `2px solid transparent`, fontFamily: 'system-ui, sans-serif', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.charcoal; (e.currentTarget as HTMLElement).style.borderBottomColor = C.gold; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.slate; (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'; }}>
                {cat.icon} {cat.title.split('&')[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${C.charcoal} 0%, #0D0D0D 50%, #1A1A1A 100%)`, minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '80px 20px' }}>
        {/* gold accent lines */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(201,168,76,0.04) 80px, rgba(201,168,76,0.04) 81px)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 60, position: 'relative', zIndex: 1 }}>
          <div style={{ flex: '1 1 380px' }}>
            {/* animated slogan badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 18px', borderRadius: 999, border: `1px solid ${C.gold}55`, backgroundColor: `${C.gold}15`, marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: C.gold, display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
              <span style={{ color: C.goldLight, fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', fontFamily: 'system-ui, sans-serif' }}>YENİ NESİL ONLİNE TERZİ HİZMETİ</span>
            </div>

            <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 700, color: C.white, margin: '0 0 8px', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Hayalinizdeki
            </h1>
            <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 300, color: C.gold, margin: '0 0 28px', lineHeight: 1.1, fontStyle: 'italic' }}>
              Kıyafeti Yaratın
            </h1>

            {/* Rotating slogan */}
            <div style={{ height: 32, overflow: 'hidden', marginBottom: 28 }}>
              <p style={{ fontSize: 18, color: '#D1D5DB', lineHeight: 1.6, fontStyle: 'italic', margin: 0, transition: 'all 0.5s' }}>
                "{SLOGANS[sloganIdx]}"
              </p>
            </div>

            <p style={{ fontSize: 15, color: '#9CA3AF', marginBottom: 40, lineHeight: 1.8, maxWidth: 540, fontFamily: 'system-ui, sans-serif' }}>
              Türkiye'nin neresinde olursanız olun — ölçülerinizi paylaşın, modelinizi seçin, hayalinizdeki kıyafet kapınıza gelsin. 4 dilde hizmet, 81 ile teslimat, sıfır ödün verilen kalite.
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

            {/* Stats row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {STATS.map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ color: C.gold, fontWeight: 700, fontSize: 22, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ color: '#6B7280', fontSize: 11, fontFamily: 'system-ui, sans-serif', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image mosaic */}
          <div style={{ flex: '1 1 340px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: 12, maxWidth: 560 }}>
            {[
              { src: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=700&auto=format&fit=crop', span: true },
              { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop', span: false },
              { src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=400&auto=format&fit=crop', span: false },
              { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=700&auto=format&fit=crop', span: true },
            ].map((img, i) => (
              <div key={i} style={{ gridColumn: img.span ? '1 / -1' : 'auto', borderRadius: 16, overflow: 'hidden', height: img.span ? 220 : 180, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                <img src={img.src} alt="Moda koleksiyonu" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.9)' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KATEGORİLER */}
      <section id="kategoriler" style={{ padding: '100px 20px', backgroundColor: C.cream }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <span style={{ color: C.gold, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: 11, display: 'block', marginBottom: 12, fontFamily: 'system-ui, sans-serif' }}>Tüm Koleksiyonlar</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: C.charcoal, margin: '0 0 16px', lineHeight: 1.2 }}>
              Her Kıyafet, <span style={{ color: C.gold, fontStyle: 'italic' }}>Sadece Sizin İçin</span>
            </h2>
            <p style={{ color: C.slate, maxWidth: 600, margin: '0 auto', fontSize: 15, lineHeight: 1.7, fontFamily: 'system-ui, sans-serif' }}>
              Abiyeden üniforma'ya, müslinden spor giyime — 8 farklı kategoride kişiye özel tasarım ve üretim hizmeti. Ölçülerinizi bir kez alın, yıllarca mükemmel giyin.
            </p>
          </div>

          {/* Category cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            {CATEGORIES.map((cat, idx) => {
              const isEven = idx % 2 === 0;
              const curImg = imgIndex[cat.id] ?? 0;
              return (
                <div key={cat.id} id={cat.id} style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center', flexDirection: isEven ? 'row' : 'row-reverse' }}>
                  {/* Image carousel */}
                  <div style={{ flex: '1 1 360px', position: 'relative' }}>
                    <div style={{ borderRadius: 24, overflow: 'hidden', height: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', position: 'relative', backgroundColor: '#F3F4F6' }}>
                      <img src={cat.images[curImg]} alt={cat.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.3s' }}
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                      {/* overlay gradient */}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                      {/* tag */}
                      <div style={{ position: 'absolute', top: 16, left: 16, backgroundColor: cat.color, color: C.white, fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 999, fontFamily: 'system-ui, sans-serif' }}>{cat.tag}</div>
                      {/* carousel arrows */}
                      {cat.images.length > 1 && (
                        <>
                          <button onClick={() => cycleImg(cat.id, -1)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                          <button onClick={() => cycleImg(cat.id, 1)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
                        </>
                      )}
                      {/* dots */}
                      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                        {cat.images.map((_, di) => (
                          <div key={di} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: di === curImg ? C.white : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setImgIndex(prev => ({ ...prev, [cat.id]: di }))} />
                        ))}
                      </div>
                    </div>
                    {/* floating icon badge */}
                    <div style={{ position: 'absolute', bottom: -20, right: isEven ? -12 : 'auto', left: isEven ? 'auto' : -12, backgroundColor: C.white, padding: '12px 20px', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: 10, border: `1px solid #F3F4F6` }}>
                      <span style={{ fontSize: 24 }}>{cat.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, color: C.charcoal, fontSize: 13 }}>Kişiye Özel</div>
                        <div style={{ fontSize: 11, color: C.slate, fontFamily: 'system-ui, sans-serif' }}>Tek parça üretim</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ flex: '1 1 340px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: cat.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'system-ui, sans-serif' }}>{cat.subtitle}</div>
                    <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, color: C.charcoal, margin: '0 0 8px', lineHeight: 1.2 }}>{cat.title}</h2>
                    <div style={{ fontSize: 11, color: C.slateLight, marginBottom: 20, fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
                      🔍 <em>{cat.keywords}</em>
                    </div>
                    <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.85, marginBottom: 28, fontFamily: 'system-ui, sans-serif' }}>{cat.desc}</p>

                    {/* Features */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                      {cat.features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: cat.colorLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ color: cat.color, fontWeight: 700, fontSize: 12 }}>✓</span>
                          </div>
                          <span style={{ fontSize: 14, color: C.charcoalLight, fontFamily: 'system-ui, sans-serif' }}>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <a href={waLink(cat.waMsg)} target="_blank" rel="noopener noreferrer"
                        style={{ backgroundColor: cat.color, color: C.white, padding: '14px 28px', borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'system-ui, sans-serif', boxShadow: `0 4px 16px ${cat.color}44` }}>
                        <WaIcon size={16} />
                        Sipariş Ver
                      </a>
                      <a href={waLink(`${cat.title} hakkında detaylı bilgi almak istiyorum.`)} target="_blank" rel="noopener noreferrer"
                        style={{ color: cat.color, padding: '14px 24px', borderRadius: 999, fontWeight: 600, fontSize: 14, textDecoration: 'none', border: `1.5px solid ${cat.color}44`, display: 'inline-block', fontFamily: 'system-ui, sans-serif' }}>
                        Fiyat Sor
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ÖLÇÜ REHBERİ */}
      <section id="olcu-rehberi" style={{ padding: '100px 20px', background: `linear-gradient(135deg, ${C.charcoal} 0%, #111 100%)`, color: C.white, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `radial-gradient(circle at 20% 50%, ${C.gold}08 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${C.gold}05 0%, transparent 50%)`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1300, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <span style={{ color: C.gold, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: 11, display: 'block', marginBottom: 12, fontFamily: 'system-ui, sans-serif' }}>Nasıl Çalışır?</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: C.white, margin: '0 0 16px' }}>
              4 Adımda <span style={{ color: C.gold, fontStyle: 'italic' }}>Özel Kıyafetiniz</span> Kapınızda
            </h2>
            <p style={{ color: '#9CA3AF', maxWidth: 560, margin: '0 auto', fontSize: 15, lineHeight: 1.7, fontFamily: 'system-ui, sans-serif' }}>
              Türkiye'nin herhangi bir şehrinden, evden çıkmadan, mağazaya gitmeden — sadece WhatsApp yeterli.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { n: '01', icon: '📏', title: 'Ölçünüzü Alın', desc: 'Evdeki mezuranızla 5 temel ölçüyü alın. Yardıma ihtiyacınız varsa WhatsApp görüntülü ölçü seansı ayarlıyoruz. Uzman ekibimiz sizi adım adım yönlendirir.' },
              { n: '02', icon: '✏️', title: 'Modelinizi Seçin', desc: 'Koleksiyonumuzdaki modeller arasından seçim yapın ya da hayalinizdeki kıyafetin fotoğrafını gönderin. Tasarımcılarımız 48 saat içinde taslak hazırlar.' },
              { n: '03', icon: '✂️', title: 'Üretim Başlıyor', desc: 'Taslağı onayladığınız anda atölyemiz harekete geçer. Kalıp çıkarma, kesim, dikim, ütü ve kalite kontrol aşamaları eksiksiz tamamlanır.' },
              { n: '04', icon: '📦', title: 'Kapınıza Gelir', desc: 'Özenle paketlenen kıyafetiniz 81 ilin herhangi birine teslimat yapılır. Memnun kalmazsanız ücretsiz revizyon veya koşulsuz iade garantimiz devreye girer.' },
            ].map(s => (
              <div key={s.n} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 32, border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
                <div style={{ color: C.gold, fontSize: 36, fontWeight: 700, opacity: 0.3, lineHeight: 1, marginBottom: 16, fontFamily: 'system-ui, sans-serif' }}>{s.n}</div>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: C.white, margin: '0 0 12px' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.7, margin: 0, fontFamily: 'system-ui, sans-serif' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <a href={waLink("Merhaba, ölçülerimi almak ve sipariş sürecini başlatmak istiyorum.")} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, backgroundColor: C.wa, color: C.white, padding: '18px 40px', borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 6px 32px rgba(37,211,102,0.4)', fontFamily: 'system-ui, sans-serif' }}>
              <WaIcon size={22} />
              WhatsApp'tan Sipariş Başlat
            </a>
          </div>
        </div>
      </section>

      {/* NEDEN BİZ */}
      <section style={{ padding: '100px 20px', backgroundColor: C.white }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center' }}>
            <div style={{ flex: '1 1 300px' }}>
              <span style={{ color: C.gold, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: 11, display: 'block', marginBottom: 12, fontFamily: 'system-ui, sans-serif' }}>Neden SwapHubs?</span>
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, color: C.charcoal, margin: '0 0 20px', lineHeight: 1.2 }}>
                Türkiye'nin En Yenilikçi <span style={{ color: C.gold, fontStyle: 'italic' }}>Online Terzi Platformu</span>
              </h2>
              <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.85, marginBottom: 32, fontFamily: 'system-ui, sans-serif' }}>
                2017'den bu yana Antalya merkezli atölyemizde 12.000'den fazla müşteri için özel kıyafet tasarladık ve diktik. Geleneksel terziliğin zanaat anlayışını, dijital çağın konfort ve hızıyla birleştiren hibrit modelimizle Türkiye'nin 81 iline, yurt dışında yaşayan Türklere ve uluslararası müşterilere hizmet veriyoruz.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {[
                  { icon: '🎯', title: 'Sıfır Hata Garantisi', desc: 'Kalıp çıkarma sürecinde dijital ölçüm teknolojisi' },
                  { icon: '⚡', title: 'Hızlı Teslimat', desc: 'Temel modeller 7-10 iş günü içinde hazır' },
                  { icon: '🌿', title: 'Sürdürülebilir Moda', desc: 'OEKO-TEX & GOTS sertifikalı organik kumaşlar' },
                  { icon: '🌍', title: '4 Dil Desteği', desc: 'TR · EN · DE · AR dillerinde tam hizmet' },
                ].map(w => (
                  <div key={w.title} style={{ padding: 20, borderRadius: 16, border: '1px solid #F3F4F6', backgroundColor: C.cream }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{w.icon}</div>
                    <div style={{ fontWeight: 700, color: C.charcoal, fontSize: 14, marginBottom: 4 }}>{w.title}</div>
                    <div style={{ fontSize: 12, color: C.slate, lineHeight: 1.5, fontFamily: 'system-ui, sans-serif' }}>{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: '1 1 340px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=500&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=500&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=500&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=500&auto=format&fit=crop',
              ].map((src, i) => (
                <div key={i} style={{ borderRadius: 16, overflow: 'hidden', height: 200, backgroundColor: '#F3F4F6' }}>
                  <img src={src} alt="Atölye" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SLOGAN BANNER */}
      <section style={{ backgroundColor: C.charcoal, padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 'clamp(20px, 4vw, 40px)', fontWeight: 300, color: C.goldLight, fontStyle: 'italic', margin: '0 0 12px', lineHeight: 1.4 }}>
            "Türkiye'nin Neresinde Olursanız Olun —
          </p>
          <p style={{ fontSize: 'clamp(20px, 4vw, 40px)', fontWeight: 700, color: C.white, margin: '0 0 32px', lineHeight: 1.4 }}>
            Ölçülerinizi Verin, Sadece Size Özel Tasarlayalım."
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', fontSize: 13, color: '#9CA3AF', fontFamily: 'system-ui, sans-serif' }}>
            {['Terziniz Bir Tık Yakınınızda', 'Online Terzi Hizmeti', 'Özel Kalıp Dikim', 'Kapıya Teslimat', 'Kisiye Özel Tasarım'].map(t => (
              <span key={t} style={{ padding: '6px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section id="sss" style={{ padding: '100px 20px', backgroundColor: C.cream }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ color: C.gold, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: 11, display: 'block', marginBottom: 12, fontFamily: 'system-ui, sans-serif' }}>SSS</span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 700, color: C.charcoal, margin: '0 0 12px' }}>Sık Sorulan Sorular</h2>
            <p style={{ color: C.slate, fontSize: 15, fontFamily: 'system-ui, sans-serif' }}>Aklınızdaki tüm soruların yanıtları burada.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ border: `1px solid ${openFaq === i ? C.gold + '66' : '#E5E7EB'}`, borderRadius: 16, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.white, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 15, color: C.charcoal, fontFamily: 'system-ui, sans-serif' }}>
                  <span>{faq.q}</span>
                  <span style={{ color: C.gold, fontWeight: 700, fontSize: 22, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: 16 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', fontSize: 14, color: C.slate, lineHeight: 1.75, backgroundColor: C.cream, borderTop: `1px solid #F3F4F6`, fontFamily: 'system-ui, sans-serif' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 20px', background: `linear-gradient(135deg, ${C.charcoal}, #0D0D0D)`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(ellipse at center, ${C.gold}10 0%, transparent 60%)`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>✨</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, color: C.white, margin: '0 0 16px', lineHeight: 1.2 }}>
            Hayalinizdeki Kıyafet
          </h2>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 300, color: C.gold, fontStyle: 'italic', margin: '0 0 28px', lineHeight: 1.2 }}>
            Bir Mesaj Kadar Yakın
          </h2>
          <p style={{ fontSize: 16, color: '#9CA3AF', marginBottom: 48, lineHeight: 1.7, fontFamily: 'system-ui, sans-serif' }}>
            Şu an WhatsApp'ta bize yazın. Ölçülerinizi alın, modelinizi seçin — kıyafetiniz kapınıza gelsin. Türkiye'nin 4 bir yanına, yurt dışına da teslimat yapıyoruz.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <a href={waLink("Merhaba! Özel kıyafet tasarımı ve dikimi hakkında bilgi almak istiyorum.")} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, backgroundColor: C.wa, color: C.white, padding: '18px 40px', borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 8px 32px rgba(37,211,102,0.45)', fontFamily: 'system-ui, sans-serif' }}>
              <WaIcon size={22} />
              WhatsApp'tan Yazın
            </a>
            <a href="tel:+905000000000"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255,255,255,0.08)', color: C.white, padding: '18px 32px', borderRadius: 999, fontWeight: 600, fontSize: 16, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.15)', fontFamily: 'system-ui, sans-serif' }}>
              📞 Ara
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#080808', padding: '60px 20px 28px', borderTop: '1px solid #1F1F1F' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, color: C.white, fontWeight: 700, marginBottom: 16 }}>
                SwapHubs <span style={{ color: C.gold, fontStyle: 'italic', fontWeight: 300 }}>Terzi</span>
              </div>
              <p style={{ color: '#6B7280', fontSize: 13, lineHeight: 1.7, fontFamily: 'system-ui, sans-serif' }}>
                Türkiye'nin yeni nesil dijital terzi ve tekstil platformu. Antalya'dan 81 ile, 4 dilde premium hizmet.
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                {LANGS.map(l => (
                  <span key={l} style={{ padding: '4px 10px', border: '1px solid #333', borderRadius: 6, color: '#9CA3AF', fontSize: 11, fontFamily: 'system-ui, sans-serif' }}>{l}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: C.white, fontWeight: 700, marginBottom: 16, fontSize: 13, fontFamily: 'system-ui, sans-serif' }}>Koleksiyonlar</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {CATEGORIES.map(c => (
                  <a key={c.id} href={`#${c.id}`} style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', fontFamily: 'system-ui, sans-serif' }}>
                    {c.icon} {c.title}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: C.white, fontWeight: 700, marginBottom: 16, fontSize: 13, fontFamily: 'system-ui, sans-serif' }}>Hizmetler</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#6B7280', fontFamily: 'system-ui, sans-serif' }}>
                {['Özel Tasarım & Dikim', 'Kalıp Çıkarma', 'Fason Üretim', 'Kurumsal Tekstil', 'Kendi Kumaşınla Dikim', '3D Model Görselleştirme'].map(s => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: C.white, fontWeight: 700, marginBottom: 16, fontSize: 13, fontFamily: 'system-ui, sans-serif' }}>İletişim</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, fontFamily: 'system-ui, sans-serif' }}>
                <a href={waLink("Merhaba!")} target="_blank" rel="noopener noreferrer" style={{ color: C.wa, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <WaIcon size={16} /> +90 500 000 00 00
                </a>
                <span style={{ color: '#6B7280' }}>✉️ tekstil@swaphubs.com</span>
                <span style={{ color: '#6B7280' }}>📍 Antalya, Türkiye</span>
                <span style={{ color: '#4B5563' }}>🚚 81 İle Ücretsiz Kargo</span>
                <span style={{ color: '#4B5563' }}>🌍 Yurt Dışı Teslimat Mevcut</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1F1F1F', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 11, color: '#4B5563', fontFamily: 'system-ui, sans-serif' }}>
            <span>© 2026 SwapHubs Online Terzi Platformu. Tüm Hakları Saklıdır.</span>
            <span>Antalya'dan 🇹🇷 Türkiye'ye & Dünyaya</span>
          </div>
        </div>
      </footer>

      {/* FLOATING WA */}
      <a href={waLink("Merhaba, e-terzi hizmeti hakkında bilgi almak istiyorum.")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile iletişim"
        style={{ position: 'fixed', bottom: 24, right: 24, backgroundColor: C.wa, color: C.white, width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(37,211,102,0.5)', zIndex: 999, textDecoration: 'none' }}>
        <WaIcon size={30} />
      </a>

    </div>
  );
}
