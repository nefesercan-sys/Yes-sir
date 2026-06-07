'use client';

import { useState, useEffect, useRef } from 'react';

const PHONE = '905318986418';
const WA = (msg: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = WA('Merhaba, terzi hizmetiniz hakkında bilgi almak istiyorum.');

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 'erkek-dikim',
    icon: '👔',
    badge: 'EN POPÜLER',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop',
    imgAlt: 'Erkek takım elbise dikimi Antalya — SwapHubs Bay Tailor',
    title: 'Erkek Kıyafet Dikimi',
    subtitle: 'Takım Elbise · Gömlek · Pantolon · Blazer · Smokin',
    desc: 'Ölçüye özel erkek giyim. Takım elbise, gömlek, pantolon, blazer, smokin ve günlük kıyafet. İş toplantısından özel günlere kadar mükemmel fit garantisi. Yerli ve ithal kumaş seçeneği.',
    features: ['Takım Elbise', 'Gömlek', 'Pantolon', 'Blazer', 'Smokin', 'Yelek', 'Şort', 'Günlük Kıyafet'],
    price: '₺800',
    priceNote: 'Takım elbise ₺2.500\'den başlar',
    time: '3–7 gün',
    waMsg: 'Merhaba, erkek kıyafet dikimi hakkında bilgi almak istiyorum.',
  },
  {
    id: 'bayan-dikim',
    icon: '👗',
    badge: '',
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop',
    imgAlt: 'Bayan elbise dikimi özel tasarım Antalya — SwapHubs',
    title: 'Bayan Kıyafet Dikimi',
    subtitle: 'Elbise · Bluz · Etek · Tulum · İş Kıyafeti · Abiye',
    desc: 'Her kadın farklıdır, her kıyafet özel olmalı. Günlük elbiseden abiyeye, iş kıyafetinden özel gün giysisine; ölçülerinize tam oturan, size özel dikilen kıyafetler.',
    features: ['Elbise', 'Bluz', 'Etek', 'Tulum', 'İş Kıyafeti', 'Abiye', 'Gelinlik', 'Kıyafet Seti'],
    price: '₺600',
    priceNote: 'Abiye ₺500\'den başlar',
    time: '3–5 gün',
    waMsg: 'Merhaba, bayan kıyafet dikimi hakkında bilgi almak istiyorum.',
  },
  {
    id: 'online-terzi',
    icon: '📱',
    badge: 'YENİ',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop',
    imgAlt: 'Online terzi hizmeti kıyafet sipariş Antalya — SwapHubs',
    title: 'Online Terzi Hizmeti',
    subtitle: 'Fotoğraf Gönderin · Ölçü Verin · Kargoya Gelsin',
    desc: 'Antalya dışında mısınız? Sorun değil. WhatsApp\'tan kıyafet modelini, ölçülerinizi ve kumaş tercihini gönderin. Kıyafetinizi dikip kargoluyoruz. Türkiye geneline teslimat.',
    features: ['WhatsApp ile Sipariş', 'Ölçü Danışmanlığı', 'Model Seçimi', 'Kumaş Önerisi', 'Kargo Teslimat', 'Video Ölçü Alma'],
    price: 'Ücretsiz',
    priceNote: 'Görüşme ve danışma ücretsiz',
    time: '5–10 gün (kargo dahil)',
    waMsg: 'Merhaba, online terzi hizmetiniz hakkında bilgi almak istiyorum. Ölçülerimi nasıl gönderebilirim?',
  },
  {
    id: 'utu-hizmeti',
    icon: '🧹',
    badge: 'EKSPRES',
    img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=80&auto=format&fit=crop',
    imgAlt: 'Profesyonel ütü hizmeti otel teslimat Antalya — SwapHubs',
    title: 'Ütü & Buharlı Presleme',
    subtitle: 'Profesyonel Ütü · Otel Alım-Teslimat · Aynı Gün',
    desc: 'Tatilde buruşuk kıyafet kabul yok! Otelinden alıp profesyonel buharlı pres ile ütüleyip aynı gün teslim ediyoruz. İş toplantısı, düğün, özel davet — her etkinlik için hazır görünün.',
    features: ['Gömlek Ütü', 'Takım Elbise Pres', 'Elbise Buharlama', 'Otel Alım', 'Aynı Gün Teslim', 'Ekspres Servis'],
    price: '₺80/adet',
    priceNote: 'Toplu indirim mevcuttur',
    time: '2–6 saat',
    waMsg: 'Merhaba, ütü hizmeti almak istiyorum. Otelime gelebilir misiniz?',
  },
  {
    id: 'tamir-tadilat',
    icon: '✂️',
    badge: '',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
    imgAlt: 'Kıyafet tamir tadilat paça kısaltma Antalya — SwapHubs',
    title: 'Tamir & Tadilat',
    subtitle: 'Paça Kısaltma · Fermuar · Yırtık · Bel Alma',
    desc: 'Sevdiğiniz kıyafeti değiştirmenize gerek yok. Paça kısaltma, fermuar değişimi, yırtık onarımı, bel alma, kol kısaltma ve tüm tamir işlemleri. Aynı gün teslim mümkün.',
    features: ['Paça Kısaltma', 'Fermuar Değişimi', 'Yırtık Onarımı', 'Bel Alma', 'Kol Kısaltma', 'Düğme Dikimi', 'Astar Değişimi', 'Cep Tamiri'],
    price: '₺100',
    priceNote: 'Paça kısaltma ₺150\'den başlar',
    time: 'Aynı gün – 48 saat',
    waMsg: 'Merhaba, kıyafet tamir ve tadilat hakkında bilgi almak istiyorum.',
  },
  {
    id: 'model-tasarim',
    icon: '✏️',
    badge: 'ÖNEMLİ',
    img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80&auto=format&fit=crop',
    imgAlt: 'Kişiye özel model tasarım kalıp çıkarma Antalya — SwapHubs',
    title: 'Kişiye Özel Model Tasarım',
    subtitle: 'Özgün Tasarım · Kalıp Çıkarma · Prototip · Numune',
    desc: 'Hayalinizdeki kıyafeti gerçeğe dönüştürüyoruz. Tasarımcılarımızla birlikte çalışın ya da kendi tasarımınızı getirin. Kalıp çıkarma, prototip dikimi, numune onayı ve seri üretime hazır hale getirme.',
    features: ['Tasarım Danışmanlığı', 'Kalıp Çıkarma', 'Prototip Dikimi', 'Numune Onayı', 'Teknik Çizim', 'Kumaş Danışmanlığı'],
    price: 'Teklif Al',
    priceNote: 'Proje bazında fiyatlandırma',
    time: '7–14 gün',
    waMsg: 'Merhaba, kişiye özel model tasarım hizmeti hakkında bilgi almak istiyorum.',
  },
  {
    id: 'seri-imalat',
    icon: '🏭',
    badge: 'B2B',
    img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80&auto=format&fit=crop',
    imgAlt: 'Tekstil seri imalat fason üretim atölye Antalya — SwapHubs',
    title: 'Tekstil Atölyesi & Seri İmalat',
    subtitle: 'Fason Üretim · Toplu Sipariş · Marka Üretimi',
    desc: 'Markanız için tam kapsamlı tekstil üretimi. Kalıp çıkarma, kesim, dikim, ütü, paket. Markalar, butikler, e-ticaret firmaları ve üniforma siparişleri için yüzden başlayan toplu üretim.',
    features: ['Fason Üretim', 'Kalıp Çıkarma', 'Seri Kesim', 'Kalite Kontrol', 'Paketleme', 'Marka Etiketi', 'Min. 50 Adet'],
    price: 'Teklif Al',
    priceNote: 'Minimum 50 adet / proje bazında',
    time: 'Sipariş miktarına göre',
    waMsg: 'Merhaba, tekstil atölyenizde seri imalat hakkında bilgi almak istiyorum. Adet ve model bilgisi paylaşmak istiyorum.',
  },
  {
    id: 'spor-gunluk',
    icon: '🏃',
    badge: '',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop',
    imgAlt: 'Spor kıyafet eşofman sweatshirt dikimi Antalya — SwapHubs',
    title: 'Spor & Günlük Kıyafet',
    subtitle: 'Eşofman · Sweatshirt · Kapüşonlu · Spor Şort',
    desc: 'Spor giyimde de kişiye özel olun. Eşofman, sweatshirt, kapüşonlu, spor şort, polo yaka tişört dikimi. Kumaş seçimi, nakış ve logo baskı dahil. Takım ve kulüp siparişleri için toplu fiyat.',
    features: ['Eşofman', 'Sweatshirt', 'Kapüşonlu', 'Spor Şort', 'Polo Yaka', 'Logo Nakış', 'Takım Sipariş'],
    price: '₺400',
    priceNote: 'Toplu sipariş için indirim',
    time: '3–7 gün',
    waMsg: 'Merhaba, spor ve günlük kıyafet dikimi hakkında bilgi almak istiyorum.',
  },
];

const HOW_IT_WORKS = [
  { step: '01', icon: '📸', title: 'Fotoğraf & Ölçü Gönderin', desc: 'WhatsApp\'tan kıyafet modelinin fotoğrafını ve ölçülerinizi gönderin. Online danışma tamamen ücretsiz.' },
  { step: '02', icon: '🎨', title: 'Tasarım & Kumaş Seçimi', desc: 'Uzman terzimizle model detaylarını belirleyin. Kumaş rengi ve kalitesini seçin. Fiyatı onaylayın.' },
  { step: '03', icon: '✂️', title: 'Dikime Başlıyoruz', desc: 'Onayın ardından atölyemizde dikime başlıyoruz. Süreç boyunca fotoğraflarla sizi bilgilendiriyoruz.' },
  { step: '04', icon: '🚗', title: 'Teslimat', desc: 'Antalya içi ücretsiz kurye ile kapınıza, Türkiye geneline kargo ile teslim ediyoruz.' },
];

const WHY = [
  { icon: '📐', title: 'Mükemmel Fit Garantisi', desc: 'Her kıyafet ölçülerinize özel dikilir. Memnun kalmazsanız ücretsiz düzeltme.' },
  { icon: '⚡', title: 'Ekspres Teslimat', desc: 'Tamir işlemleri aynı gün, özel dikim 3–7 gün içinde teslim.' },
  { icon: '📱', title: 'Online Sipariş', desc: 'WhatsApp\'tan sipariş verin, Türkiye\'nin her yerine kargo.' },
  { icon: '🎨', title: 'Özgün Tasarım', desc: 'Kendi tasarımınız ya da uzman tasarımcılarımızla birlikte çalışın.' },
  { icon: '🏭', title: 'Seri İmalat Kapasitesi', desc: 'Markalar ve butikler için fason üretim, min. 50 adetten başlar.' },
  { icon: '💰', title: 'Şeffaf Fiyatlandırma', desc: 'Gizli ücret yok. Başlamadan önce net fiyat alın.' },
  { icon: '🌍', title: 'Türkiye Geneli Kargo', desc: 'Antalya dışından sipariş verin, kargo ile teslim edelim.' },
  { icon: '⭐', title: '4.9 / 5 Müşteri Puanı', desc: '112 değerlendirmede Google\'da 4.9 yıldız.' },
];

const PRICE_TABLE = [
  { cat: 'Erkek Dikimi', items: [
    ['Takım Elbise (2 parça)', '₺2.500+', '5–7 gün'],
    ['Takım Elbise (3 parça)', '₺3.200+', '7–10 gün'],
    ['Erkek Gömlek', '₺800+', '3–5 gün'],
    ['Erkek Pantolon', '₺700+', '3–5 gün'],
    ['Blazer / Ceket', '₺1.500+', '5–7 gün'],
    ['Smokin', '₺3.500+', '7–14 gün'],
  ]},
  { cat: 'Bayan Dikimi', items: [
    ['Günlük Elbise', '₺600+', '3–5 gün'],
    ['İş Kıyafeti', '₺800+', '3–5 gün'],
    ['Abiye / Gece Elbisesi', '₺1.200+', '5–7 gün'],
    ['Gelinlik', '₺5.000+', '14–21 gün'],
    ['Bluz / Etek', '₺500+', '2–4 gün'],
    ['Tulum', '₺900+', '4–6 gün'],
  ]},
  { cat: 'Ütü & Temizlik', items: [
    ['Gömlek Ütü', '₺80+', 'Aynı gün'],
    ['Takım Elbise Pres', '₺150+', 'Aynı gün'],
    ['Elbise Buharlama', '₺120+', 'Aynı gün'],
    ['Mont / Kaban Ütü', '₺200+', '24 saat'],
    ['Toplu Ütü (10+ adet)', '₺60+/adet', 'Aynı gün'],
  ]},
  { cat: 'Tamir & Tadilat', items: [
    ['Paça Kısaltma', '₺150+', 'Aynı gün'],
    ['Fermuar Değişimi', '₺120+', 'Aynı gün'],
    ['Yırtık Onarımı', '₺100+', 'Aynı gün'],
    ['Bel Alma / Daraltma', '₺200+', '24–48 saat'],
    ['Kol Kısaltma', '₺200+', '24–48 saat'],
    ['Astar Değişimi', '₺300+', '48 saat'],
  ]},
];

const REVIEWS = [
  { name: 'Kemal A.', rating: 5, city: 'Antalya', date: 'Nisan 2025', text: 'Erkek takım elbise dikimi için geldim. Ölçüler mükemmel alındı, kumaş kalitesi ve işçilik çok iyiydi. Online sipariş sistemi çok pratik.' },
  { name: 'Ayşe T.', rating: 5, city: 'İstanbul', date: 'Mayıs 2025', text: 'İstanbul\'dan online sipariş verdim. WhatsApp\'tan ölçü ve model paylaştım, 8 günde kapıma geldi. Fit mükemmel, çok memnunum!' },
  { name: 'Mehmet S.', rating: 5, city: 'Ankara', date: 'Mart 2025', text: '200 adet iş gömleği seri imalat yaptırdık. Zamanında, eksiksiz ve kaliteli teslim. Tekstil atölyesi gerçekten profesyonel.' },
  { name: 'Sarah M.', rating: 5, city: 'London', date: 'Haziran 2025', text: 'Visited Antalya for holidays, needed my dress ironed urgently. They picked up from hotel and delivered in 3 hours. Amazing service!' },
  { name: 'Fatma K.', rating: 5, city: 'Antalya', date: 'Şubat 2025', text: 'Gelinliğim için kişiye özel tasarım yaptırdım. Tasarımcıyla çalışmak çok keyifliydi. Sonuç hayalimden daha güzeldi!' },
  { name: 'Ali R.', rating: 5, city: 'Kemer', date: 'Mayıs 2025', text: 'Kemer\'deki otelimden kurye ile ütü hizmeti aldım. Aynı gün teslim, çok profesyonel. Fiyatlar da makul.' },
];

const FAQS = [
  ['Antalya\'da erkek takım elbise dikimi fiyatı ne kadar?', '₺2.500\'den başlar. Kumaş ve model karmaşıklığına göre değişir. Fiyat için WhatsApp\'tan fotoğraf ve ölçü gönderin.'],
  ['Online terzi hizmeti nasıl çalışır?', 'WhatsApp\'tan model fotoğrafı ve ölçülerinizi gönderin. Fiyatı onaylayın. Kıyafetin dikildikten sonra adresinize kargoluyoruz.'],
  ['Ütü için otelime geliyor musunuz?', 'Evet! Antalya\'daki tüm otellere kurye ile alım ve teslimat yapıyoruz. Aynı gün teslim garantisi.'],
  ['Tekstil atölyenizde minimum sipariş adedi nedir?', 'Seri imalat için minimum 50 adet. Numune ve prototip için tek adet kabul edilir.'],
  ['Kişiye özel tasarım hizmeti veriyor musunuz?', 'Evet. Kendi tasarımınızı getirebilir ya da tasarımcılarımızla birlikte çalışabilirsiniz. Kalıp çıkarma dahil.'],
  ['Tamir ve tadilat ne kadar sürer?', 'Basit tamir (paça, fermuar) aynı gün. Tadilat işlemleri 24–48 saat. Ekspres hizmet mevcuttur.'],
  ['Türkiye geneline kargo yapıyor musunuz?', 'Evet. Antalya içi ücretsiz kurye, Türkiye geneli kargo ile teslim. 5–10 iş günü.'],
  ['Kumaş seçimi konusunda yardımcı oluyor musunuz?', 'Evet. Yerli ve ithal kumaş stoğumuzdan seçim yapabilir ya da kendi kumaşınızı getirebilirsiniz.'],
];

const KEYWORDS_SEO = [
  'Antalya Bay Terzi', 'Erkek Kıyafet Dikimi', 'Bayan Kıyafet Dikimi', 'Online Terzi Antalya',
  'Ütü Hizmeti Antalya', 'Tekstil Atölyesi', 'Seri İmalat Antalya', 'Fason Üretim',
  'Kişiye Özel Kıyafet', 'Model Tasarım', 'Kalıp Çıkarma', 'Paça Kısaltma',
  'Fermuar Değişimi', 'Kıyafet Tadilat', 'Otel Ütü Servisi', 'Erkek Takım Elbise',
  'Tailor Antalya', 'Online Tailor', 'Портной Анталья', 'Schneider Antalya',
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function TailorOnlineClient() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePriceTab, setActivePriceTab] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, e.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-observe]').forEach((el) => {
      observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="to-root" suppressHydrationWarning>

      {/* ─── GLOBAL CSS ───────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --ink:   #0a0908;
          --ink2:  #131110;
          --ink3:  #1c1a18;
          --ink4:  #252220;
          --gold:  #c5973a;
          --gold2: #e8c97a;
          --gold3: #8b6a22;
          --bone:  #f2ede4;
          --bone2: #e8e1d4;
          --muted: #7a7060;
          --red:   #c0392b;
          --green: #27ae60;
          --serif: 'Cormorant Garamond', Georgia, serif;
          --sans:  'DM Sans', system-ui, sans-serif;
          --r4: 4px; --r8: 8px; --r12: 12px; --r16: 16px;
          --shadow: 0 2px 16px rgba(0,0,0,.35);
          --shadow-lg: 0 8px 40px rgba(0,0,0,.5);
          --transition: all .3s cubic-bezier(.4,0,.2,1);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { background: var(--ink); color: var(--bone); font-family: var(--sans);
               font-weight: 300; line-height: 1.7; overflow-x: hidden; }

        /* SCROLLBAR */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--ink); }
        ::-webkit-scrollbar-thumb { background: var(--gold3); }

        /* SKIP */
        .to-skip { position: absolute; top: -40px; left: 0; background: var(--gold);
                   color: var(--ink); padding: .5rem 1rem; font-weight: 700; z-index: 999; }
        .to-skip:focus { top: 0; }

        /* ─── NAV ─── */
        .to-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200;
                  padding: 1.2rem 2rem; display: flex; align-items: center;
                  justify-content: space-between; transition: var(--transition); }
        .to-nav.up { background: rgba(10,9,8,.96); backdrop-filter: blur(20px);
                     border-bottom: 1px solid rgba(197,151,58,.1); padding: .8rem 2rem; }
        .to-nav-logo { font-family: var(--serif); font-size: 1.4rem; font-weight: 700;
                       color: var(--gold); text-decoration: none; letter-spacing: .03em; }
        .to-nav-logo span { color: var(--bone); font-weight: 400; font-style: italic; font-size: 1rem; }
        .to-nav-links { display: flex; gap: 2rem; list-style: none; }
        .to-nav-links a { color: var(--bone2); text-decoration: none; font-size: .78rem;
                          letter-spacing: .1em; text-transform: uppercase; transition: color .2s; }
        .to-nav-links a:hover { color: var(--gold); }
        .to-nav-cta { background: var(--gold); color: var(--ink); padding: .6rem 1.4rem;
                      font-size: .78rem; font-weight: 600; letter-spacing: .08em;
                      text-transform: uppercase; text-decoration: none; border-radius: var(--r4);
                      transition: var(--transition); }
        .to-nav-cta:hover { background: var(--gold2); transform: translateY(-1px); }

        /* ─── HERO ─── */
        .to-hero { position: relative; min-height: 100vh; display: grid;
                   grid-template-columns: 1fr 1fr; overflow: hidden; }
        .to-hero-left { display: flex; flex-direction: column; justify-content: center;
                        padding: 8rem 3rem 5rem 5rem; position: relative; z-index: 2; }
        .to-hero-right { position: relative; overflow: hidden; }
        .to-hero-right::after { content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, var(--ink) 0%, transparent 40%); }
        .to-hero-img { width: 100%; height: 100%; object-fit: cover;
                       filter: brightness(.45) saturate(.6); }
        .to-hero-tag { display: inline-flex; align-items: center; gap: .6rem;
                       font-size: .68rem; letter-spacing: .25em; text-transform: uppercase;
                       color: var(--gold); border: 1px solid rgba(197,151,58,.3);
                       padding: .35rem 1rem; margin-bottom: 2rem; border-radius: var(--r4);
                       width: fit-content; }
        .to-hero-tag::before { content: ''; width: 24px; height: 1px; background: var(--gold); }
        .to-hero h1 { font-family: var(--serif); font-size: clamp(2.8rem, 5vw, 5rem);
                      line-height: 1.05; font-weight: 700; margin-bottom: 1.5rem; }
        .to-hero h1 em { color: var(--gold); font-style: italic; display: block; }
        .to-hero-sub { font-size: .92rem; color: var(--muted); line-height: 1.8;
                       max-width: 420px; margin-bottom: 2.5rem; }
        .to-hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3rem; }
        .to-hero-stats { display: flex; gap: 2.5rem; padding-top: 2rem;
                         border-top: 1px solid rgba(197,151,58,.12); }
        .to-hstat-n { font-family: var(--serif); font-size: 1.8rem; color: var(--gold);
                      font-weight: 700; line-height: 1; display: block; }
        .to-hstat-l { font-size: .68rem; color: var(--muted); letter-spacing: .1em;
                      text-transform: uppercase; margin-top: .2rem; }
        /* Floating badge on hero image */
        .to-hero-badge { position: absolute; bottom: 3rem; left: 50%; transform: translateX(-50%);
                         z-index: 3; background: rgba(10,9,8,.9); border: 1px solid rgba(197,151,58,.25);
                         border-radius: var(--r8); padding: 1rem 1.5rem;
                         display: flex; align-items: center; gap: 1rem;
                         backdrop-filter: blur(8px); white-space: nowrap; }
        .to-hero-badge-icon { font-size: 1.5rem; }
        .to-hero-badge-text strong { font-size: .88rem; color: var(--bone); display: block; }
        .to-hero-badge-text span { font-size: .72rem; color: var(--muted); }

        /* ─── BUTTONS ─── */
        .to-bg { display: inline-flex; align-items: center; gap: .5rem; background: var(--gold);
                 color: var(--ink); padding: .9rem 2rem; font-family: var(--sans);
                 font-size: .8rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
                 text-decoration: none; border: none; cursor: pointer;
                 border-radius: var(--r4); transition: var(--transition); }
        .to-bg:hover { background: var(--gold2); transform: translateY(-2px); box-shadow: 0 4px 20px rgba(197,151,58,.3); }
        .to-bo { display: inline-flex; align-items: center; gap: .5rem; background: transparent;
                 color: var(--bone); padding: .9rem 2rem; font-family: var(--sans);
                 font-size: .8rem; font-weight: 400; letter-spacing: .08em; text-transform: uppercase;
                 text-decoration: none; border: 1px solid rgba(242,237,228,.2); cursor: pointer;
                 border-radius: var(--r4); transition: var(--transition); }
        .to-bo:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }
        .to-wa { background: #25D366; color: #fff; }
        .to-wa:hover { background: #1eba56; box-shadow: 0 4px 16px rgba(37,211,102,.3); }

        /* ─── SECTION BASE ─── */
        .to-sec { padding: 6rem 5rem; }
        .to-ctr { max-width: 1200px; margin: 0 auto; }
        .to-sh { margin-bottom: 3.5rem; }
        .to-sh.center { text-align: center; }
        .to-sh.center .to-sub { margin-left: auto; margin-right: auto; }
        .to-eyebrow { font-size: .68rem; letter-spacing: .28em; text-transform: uppercase;
                      color: var(--gold); font-weight: 500; margin-bottom: .8rem; display: block; }
        .to-h2 { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3.2rem);
                 font-weight: 700; line-height: 1.1; color: var(--bone); }
        .to-h2 em { color: var(--gold); font-style: italic; }
        .to-sub { color: var(--muted); font-size: .9rem; max-width: 540px;
                  line-height: 1.8; margin-top: .8rem; }
        .to-divider { width: 40px; height: 2px; background: var(--gold); margin-top: 1.2rem; }
        .to-sh.center .to-divider { margin-left: auto; margin-right: auto; }

        /* ─── ANNOUNCE STRIP ─── */
        .to-strip { background: var(--gold); padding: .65rem 2rem;
                    text-align: center; font-size: .78rem; font-weight: 600;
                    color: var(--ink); letter-spacing: .04em; }
        .to-strip a { color: var(--ink); text-decoration: underline; }

        /* ─── SEO INTRO ─── */
        .to-seoint { background: var(--ink2); padding: 2rem 5rem; }
        .to-seobl { max-width: 1200px; margin: 0 auto; font-size: .82rem; color: var(--muted);
                    line-height: 1.9; border-left: 2px solid var(--gold3); padding-left: 1.5rem; }

        /* ─── SERVICES GRID ─── */
        .to-svcsec { background: var(--ink2); padding: 6rem 5rem; }
        .to-svcgrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
        .to-scard { position: relative; overflow: hidden; min-height: 420px;
                    display: flex; flex-direction: column; justify-content: flex-end;
                    cursor: pointer; }
        .to-scard-img { position: absolute; inset: 0; width: 100%; height: 100%;
                        object-fit: cover; filter: brightness(.25) saturate(.35);
                        transition: transform .7s ease, filter .5s ease; }
        .to-scard:hover .to-scard-img { transform: scale(1.07); filter: brightness(.2) saturate(.25); }
        .to-scard-ov { position: absolute; inset: 0;
                       background: linear-gradient(to top, rgba(10,9,8,.98) 0%, rgba(10,9,8,.3) 55%, transparent 100%); }
        .to-scard-top { position: absolute; top: 1.2rem; left: 1.5rem; right: 1.5rem;
                        display: flex; justify-content: space-between; align-items: flex-start; z-index: 2; }
        .to-scard-badge { font-size: .6rem; letter-spacing: .2em; text-transform: uppercase;
                          background: var(--gold); color: var(--ink); padding: .22rem .65rem;
                          font-weight: 700; border-radius: 2px; }
        .to-scard-badge.new { background: #27ae60; color: #fff; }
        .to-scard-badge.b2b { background: #2980b9; color: #fff; }
        .to-scard-badge.exp { background: #e74c3c; color: #fff; }
        .to-scard-icon { font-size: 1.6rem; }
        .to-scard-body { position: relative; z-index: 2; padding: 1.8rem 1.8rem 2rem; }
        .to-scard-title { font-family: var(--serif); font-size: 1.5rem; font-weight: 700;
                          color: var(--bone); margin-bottom: .3rem; line-height: 1.15; }
        .to-scard-sub { font-size: .73rem; color: var(--gold); letter-spacing: .06em;
                        text-transform: uppercase; margin-bottom: .75rem; }
        .to-scard-desc { font-size: .8rem; color: rgba(242,237,228,.6); line-height: 1.65;
                         margin-bottom: 1rem; }
        .to-scard-features { display: flex; flex-wrap: wrap; gap: .35rem; margin-bottom: 1.1rem; }
        .to-scard-feat { font-size: .65rem; color: var(--muted); border: 1px solid rgba(197,151,58,.15);
                         padding: .2rem .6rem; border-radius: 2px; }
        .to-scard-footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .to-scard-price { display: flex; flex-direction: column; }
        .to-scard-price-val { font-family: var(--serif); font-size: 1.3rem; color: var(--gold); font-weight: 700; }
        .to-scard-price-note { font-size: .65rem; color: var(--muted); margin-top: .1rem; }
        .to-scard-price-time { font-size: .65rem; color: var(--green); }
        .to-scard-line { position: absolute; bottom: 0; left: 1.8rem; right: 1.8rem;
                         height: 1.5px; background: linear-gradient(to right, var(--gold), transparent);
                         transform: scaleX(0); transform-origin: left; transition: transform .5s ease; }
        .to-scard:hover .to-scard-line { transform: scaleX(1); }

        /* ─── HOW IT WORKS ─── */
        .to-howsec { background: var(--ink3); }
        .to-howgrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
                      margin-top: 3rem; background: rgba(197,151,58,.07); border-radius: var(--r8); overflow: hidden; }
        .to-howcard { background: var(--ink3); padding: 2.2rem 1.8rem; position: relative; }
        .to-howcard::before { content: ''; position: absolute; top: 0; left: 0; right: 0;
                               height: 2px; background: transparent; transition: background .3s; }
        .to-howcard:hover::before { background: linear-gradient(90deg, var(--gold), transparent); }
        .to-how-step { font-family: var(--serif); font-size: 3rem; color: rgba(197,151,58,.12);
                       font-weight: 700; line-height: 1; margin-bottom: .5rem; }
        .to-how-icon { font-size: 1.8rem; margin-bottom: 1rem; }
        .to-how-title { font-size: .9rem; font-weight: 600; color: var(--bone);
                        margin-bottom: .5rem; }
        .to-how-desc { font-size: .78rem; color: var(--muted); line-height: 1.65; }

        /* ─── WHY ─── */
        .to-whysec { background: var(--ink); }
        .to-whygrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: .8rem; margin-top: 3rem; }
        .to-wcard { background: var(--ink3); border: 1px solid rgba(197,151,58,.07);
                    border-radius: var(--r8); padding: 1.5rem;
                    transition: border-color .3s, transform .3s; }
        .to-wcard:hover { border-color: rgba(197,151,58,.25); transform: translateY(-3px); }
        .to-wic { width: 40px; height: 40px; border-radius: var(--r8);
                  background: linear-gradient(135deg, var(--gold3), var(--gold));
                  display: flex; align-items: center; justify-content: center;
                  font-size: 1rem; margin-bottom: 1rem; }
        .to-wt { font-size: .88rem; font-weight: 600; color: var(--bone); margin-bottom: .4rem; }
        .to-wd { font-size: .76rem; color: var(--muted); line-height: 1.55; }

        /* ─── PRICES ─── */
        .to-pricesec { background: var(--ink2); }
        .to-price-tabs { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .to-ptab { background: none; border: 1px solid rgba(197,151,58,.15); color: var(--muted);
                   font-size: .75rem; padding: .5rem 1.2rem; cursor: pointer; font-family: var(--sans);
                   border-radius: var(--r4); letter-spacing: .06em; transition: var(--transition); }
        .to-ptab.on, .to-ptab:hover { background: var(--gold); color: var(--ink);
                                       border-color: var(--gold); font-weight: 600; }
        .to-ptable-wrap { border-radius: var(--r8); overflow: hidden; border: 1px solid rgba(197,151,58,.1); }
        .to-ptable { width: 100%; border-collapse: collapse; }
        .to-ptable thead { background: var(--ink4); }
        .to-ptable th { text-align: left; font-size: .66rem; letter-spacing: .2em;
                        text-transform: uppercase; color: var(--gold); padding: .9rem 1.2rem;
                        font-weight: 500; }
        .to-ptable th:not(:first-child) { text-align: right; }
        .to-ptable td { padding: .9rem 1.2rem; font-size: .84rem; border-bottom: 1px solid rgba(255,255,255,.03); color: var(--bone2); }
        .to-ptable tr:last-child td { border-bottom: none; }
        .to-ptable tr:nth-child(even) td { background: rgba(197,151,58,.02); }
        .to-ptable tr:hover td { background: rgba(197,151,58,.05); }
        .to-ptable td:nth-child(2) { text-align: right; color: var(--gold); font-weight: 600; }
        .to-ptable td:nth-child(3) { text-align: right; color: var(--muted); font-size: .75rem; }

        /* ─── REVIEWS ─── */
        .to-revsec { background: var(--ink3); }
        .to-revgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 3rem; }
        .to-rcard { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06);
                    border-radius: var(--r8); padding: 1.5rem;
                    transition: border-color .3s; }
        .to-rcard:hover { border-color: rgba(197,151,58,.2); }
        .to-rstars { color: var(--gold); font-size: .9rem; letter-spacing: 2px; margin-bottom: .6rem; }
        .to-rtxt { font-size: .82rem; color: rgba(242,237,228,.6); line-height: 1.75;
                   font-style: italic; margin-bottom: .9rem; }
        .to-rauth { font-size: .75rem; }
        .to-rauth strong { color: var(--gold); }
        .to-rauth span { color: var(--muted); }

        /* ─── FAQ ─── */
        .to-faqsec { background: var(--ink); }
        .to-faqlist { max-width: 800px; margin: 3rem auto 0; }
        .to-faqitem { border-bottom: 1px solid rgba(197,151,58,.08); }
        .to-faqq { width: 100%; background: none; border: none; padding: 1.2rem 0;
                   display: flex; align-items: center; justify-content: space-between; gap: 1rem;
                   cursor: pointer; text-align: left; font-family: var(--sans);
                   font-size: .9rem; color: var(--bone); font-weight: 400; transition: color .2s; }
        .to-faqq:hover { color: var(--gold); }
        .to-faqico { flex-shrink: 0; width: 22px; height: 22px;
                     border: 1px solid rgba(197,151,58,.3); border-radius: 50%;
                     display: flex; align-items: center; justify-content: center;
                     font-size: .9rem; color: var(--gold); transition: transform .3s; }
        .to-faqico.open { transform: rotate(45deg); }
        .to-faqa { max-height: 0; overflow: hidden; transition: max-height .4s ease, padding .3s;
                   font-size: .83rem; color: var(--muted); line-height: 1.85; }
        .to-faqa.open { max-height: 200px; padding-bottom: 1.2rem; }

        /* ─── CTA STRIP ─── */
        .to-ctasec { background: linear-gradient(135deg, #1a1200 0%, var(--ink2) 50%, #0f1a0f 100%);
                     padding: 5rem; text-align: center; position: relative; overflow: hidden; }
        .to-ctasec::before { content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(197,151,58,.08) 0%, transparent 70%);
          pointer-events: none; }
        .to-cta-h { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3.2rem);
                    font-weight: 700; color: var(--bone); margin-bottom: 1rem; }
        .to-cta-h em { color: var(--gold); font-style: italic; }
        .to-cta-sub { color: var(--muted); font-size: .9rem; margin-bottom: 2.5rem; }
        .to-cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .to-cta-phone { display: flex; align-items: center; justify-content: center; gap: .5rem;
                        margin-top: 1.5rem; font-size: .82rem; color: var(--muted); }
        .to-cta-phone a { color: var(--gold); text-decoration: none; }

        /* ─── CONTACT ─── */
        .to-contsec { background: var(--ink2); }
        .to-contgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-top: 3rem; }
        .to-crow { display: flex; gap: .9rem; align-items: flex-start;
                   padding: .85rem 0; border-bottom: 1px solid rgba(197,151,58,.06); }
        .to-cic { font-size: 1.1rem; padding-top: .1rem; }
        .to-clbl { font-size: .64rem; letter-spacing: .2em; text-transform: uppercase;
                   color: var(--gold); margin-bottom: .18rem; }
        .to-cval { font-size: .88rem; color: var(--bone); }
        .to-cval a { color: var(--bone); text-decoration: none; transition: color .2s; }
        .to-cval a:hover { color: var(--gold); }
        .to-map { border-radius: var(--r8); overflow: hidden; height: 300px; }
        .to-map iframe { display: block; width: 100%; height: 100%; border: 0; }

        /* ─── FOOTER ─── */
        .to-footer { background: #060504; border-top: 1px solid rgba(197,151,58,.07);
                     padding: 2.5rem 5rem; }
        .to-footer-inner { max-width: 1200px; margin: 0 auto; text-align: center; }
        .to-footer-brand { font-family: var(--serif); font-size: 1.1rem; color: var(--gold);
                           margin-bottom: .5rem; }
        .to-footer-links { display: flex; flex-wrap: wrap; justify-content: center;
                           gap: .5rem 1.5rem; margin-bottom: 1rem; }
        .to-footer-links a { color: var(--muted); font-size: .75rem; text-decoration: none; }
        .to-footer-links a:hover { color: var(--gold); }
        .to-footer-copy { font-size: .72rem; color: rgba(122,112,96,.5); }
        .to-kws { display: flex; flex-wrap: wrap; gap: .3rem; justify-content: center; margin-top: 1rem; }
        .to-kpill { font-size: .6rem; color: rgba(197,151,58,.25);
                    border: 1px solid rgba(197,151,58,.08); padding: .18rem .55rem;
                    border-radius: 2px; }

        /* ─── WA FLOAT ─── */
        .to-wafloat { position: fixed; bottom: 1.8rem; right: 1.8rem; z-index: 150;
                      width: 3.2rem; height: 3.2rem; border-radius: 50%; background: #25D366;
                      display: flex; align-items: center; justify-content: center;
                      font-size: 1.4rem; text-decoration: none;
                      box-shadow: 0 4px 20px rgba(37,211,102,.4); transition: transform .3s;
                      animation: wapulse 2.5s ease infinite; }
        .to-wafloat:hover { transform: scale(1.12); animation: none; }
        @keyframes wapulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,.4); }
          50% { box-shadow: 0 4px 32px rgba(37,211,102,.65), 0 0 0 10px rgba(37,211,102,.08); }
        }

        /* ─── BREADCRUMB ─── */
        .to-breadcrumb { background: var(--ink2); padding: .8rem 5rem;
                         display: flex; gap: .5rem; align-items: center; flex-wrap: wrap; }
        .to-breadcrumb a { font-size: .72rem; color: var(--muted); text-decoration: none; }
        .to-breadcrumb a:hover { color: var(--gold); }
        .to-breadcrumb span { font-size: .72rem; color: rgba(122,112,96,.4); }
        .to-breadcrumb strong { font-size: .72rem; color: var(--bone2); }

        /* ─── FADE IN ─── */
        @media (prefers-reduced-motion: no-preference) {
          .to-fadein { opacity: 0; transform: translateY(20px); transition: opacity .6s ease, transform .6s ease; }
          .to-fadein.visible { opacity: 1; transform: translateY(0); }
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .to-sec, .to-svcsec, .to-pricesec, .to-revsec, .to-faqsec, .to-contsec,
          .to-seoint, .to-footer, .to-ctasec, .to-breadcrumb, .to-whysec, .to-howsec { padding-left: 2rem; padding-right: 2rem; }
          .to-hero { grid-template-columns: 1fr; }
          .to-hero-left { padding: 7rem 2rem 3rem; }
          .to-hero-right { display: none; }
          .to-svcgrid { grid-template-columns: 1fr; }
          .to-howgrid { grid-template-columns: repeat(2, 1fr); }
          .to-whygrid { grid-template-columns: repeat(2, 1fr); }
          .to-revgrid { grid-template-columns: 1fr; }
          .to-contgrid { grid-template-columns: 1fr; }
          .to-nav-links { display: none; }
        }
        @media (max-width: 640px) {
          .to-whygrid { grid-template-columns: 1fr; }
          .to-howgrid { grid-template-columns: 1fr; }
          .to-hero-stats { flex-wrap: wrap; gap: 1.2rem; }
          .to-price-tabs { gap: .3rem; }
        }

        .to-sr-only { position: absolute; width: 1px; height: 1px; padding: 0;
                      margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
      `}</style>

      <a href="#main" className="to-skip">İçeriğe geç</a>
      <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="to-wafloat" aria-label="WhatsApp">💬</a>

      {/* ─── ANNOUNCEMENT ─── */}
      <div className="to-strip" role="banner">
        🧵 Seri imalat siparişlerinde %15 indirim · Haziran 2026 kampanyası ·{' '}
        <a href={WA('Merhaba, seri imalat kampanyası hakkında bilgi almak istiyorum.')}>WhatsApp ile bilgi al →</a>
      </div>

      {/* ─── NAV ─── */}
      <nav className={`to-nav${scrolled ? ' up' : ''}`} aria-label="Ana navigasyon">
        <a href="https://www.swaphubs.com" className="to-nav-logo">
          SwapHubs <span>/ Bay Tailor</span>
        </a>
        <ul className="to-nav-links">
          <li><a href="#services">Hizmetler</a></li>
          <li><a href="#prices">Fiyatlar</a></li>
          <li><a href="#reviews">Yorumlar</a></li>
          <li><a href="#faq">SSS</a></li>
          <li><a href="#contact">İletişim</a></li>
        </ul>
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="to-nav-cta">
          💬 Sipariş Ver
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <section className="to-hero" aria-label="Hero bölümü" id="main">
        <div className="to-hero-left">
          <span className="to-hero-tag">Antalya Bay Tailor — Online Terzi & Ütü Hizmeti</span>
          <h1>
            Kıyafet Dikimi,<br />
            <em>Online Terzi</em><br />
            & Ütü Servisi
          </h1>
          <p className="to-hero-sub">
            Erkek & bayan kıyafet dikimi, kişiye özel model tasarım, tekstil atölyesi,
            seri imalat ve profesyonel ütü hizmeti. Antalya Konyaaltı merkezli,
            Türkiye geneline kargo.
          </p>
          <div className="to-hero-btns">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="to-bg to-wa">
              💬 WhatsApp Sipariş
            </a>
            <a href="#services" className="to-bo">Hizmetleri Gör ↓</a>
          </div>
          <div className="to-hero-stats" aria-label="İstatistikler">
            {[
              ['10+', 'Yıl Deneyim'],
              ['5000+', 'Mutlu Müşteri'],
              ['4.9★', '112 Yorum'],
              ['24–48h', 'Teslimat'],
            ].map(([n, l]) => (
              <div key={l}>
                <span className="to-hstat-n">{n}</span>
                <span className="to-hstat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="to-hero-right">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop"
            alt="Antalya Bay Tailor erkek kıyafet dikimi online terzi hizmeti — SwapHubs"
            className="to-hero-img"
            width={900}
            height={1200}
            loading="eager"
          />
          <div className="to-hero-badge" aria-hidden="true">
            <span className="to-hero-badge-icon">✂️</span>
            <div className="to-hero-badge-text">
              <strong>Erkek & Bayan Kıyafet Dikimi</strong>
              <span>Online Sipariş · Türkiye Geneli Kargo</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BREADCRUMB ─── */}
      <nav className="to-breadcrumb" aria-label="Sayfa yolu">
        <a href="https://www.swaphubs.com">SwapHubs</a>
        <span>›</span>
        <a href="https://www.swaphubs.com/terzi">Terzi Can</a>
        <span>›</span>
        <strong>Antalya Bay Tailor — Online Terzi & Ütü</strong>
      </nav>

      {/* ─── SEO INTRO ─── */}
      <div className="to-seoint">
        <p className="to-seobl">
          <strong>Antalya Bay Tailor</strong> olarak Konyaaltı merkezimizden tüm Antalya ilçelerine
          ve Türkiye geneline online terzi hizmeti sunuyoruz. Erkek takım elbise dikimi, bayan elbise dikimi,
          kişiye özel model tasarım, kalıp çıkarma, prototip, seri imalat ve fason üretim.
          Ütü hizmeti, buharlı presleme, otellerden kurye ile alım. Paça kısaltma, fermuar değişimi,
          kıyafet tamir ve tadilat. Spor kıyafet, eşofman, sweatshirt dikimi ve nakış baskı.
          Tekstil dikişatölyemizde minimum 50 adetten başlayan toplu üretim kapasitesi.
        </p>
      </div>

      {/* ─── HİZMETLER ─── */}
      <section id="services" className="to-svcsec" aria-labelledby="services-h">
        <div className="to-ctr">
          <div className="to-sh">
            <span className="to-eyebrow">✦ Tüm Hizmetlerimiz</span>
            <h2 className="to-h2" id="services-h">Ne Yapıyoruz?</h2>
            <p className="to-sub">
              Erkek & bayan kıyafet dikiminden online terziye, ütü hizmetinden
              seri imalata — her ihtiyaç için profesyonel çözüm.
            </p>
            <div className="to-divider" />
          </div>
        </div>
        <div className="to-svcgrid">
          {SERVICES.map((s) => (
            <article
              key={s.id}
              className="to-scard"
              onClick={() => setActiveService(activeService === s.id ? null : s.id)}
              aria-label={s.title}
            >
              <img
                src={s.img}
                alt={s.imgAlt}
                className="to-scard-img"
                loading="lazy"
                width={800}
                height={420}
              />
              <div className="to-scard-ov" />
              <div className="to-scard-top">
                {s.badge && (
                  <span className={`to-scard-badge${s.badge==='YENİ'?' new':s.badge==='B2B'?' b2b':s.badge==='EKSPRES'?' exp':''}`}>
                    {s.badge}
                  </span>
                )}
                <span className="to-scard-icon" aria-hidden="true">{s.icon}</span>
              </div>
              <div className="to-scard-body">
                <h3 className="to-scard-title">{s.title}</h3>
                <div className="to-scard-sub">{s.subtitle}</div>
                <p className="to-scard-desc">{s.desc}</p>
                <div className="to-scard-features">
                  {s.features.map(f => (
                    <span key={f} className="to-scard-feat">{f}</span>
                  ))}
                </div>
                <div className="to-scard-footer">
                  <div className="to-scard-price">
                    <span className="to-scard-price-val">{s.price}</span>
                    <span className="to-scard-price-note">{s.priceNote}</span>
                    <span className="to-scard-price-time">⏱ {s.time}</span>
                  </div>
                  <a
                    href={WA(s.waMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="to-bg to-wa"
                    onClick={e => e.stopPropagation()}
                    style={{ fontSize: '.72rem', padding: '.6rem 1.1rem' }}
                  >
                    Sipariş Ver
                  </a>
                </div>
              </div>
              <div className="to-scard-line" />
            </article>
          ))}
        </div>
      </section>

      {/* ─── NASIL ÇALIŞIR ─── */}
      <section className="to-sec to-howsec" aria-labelledby="how-h">
        <div className="to-ctr">
          <div className="to-sh center">
            <span className="to-eyebrow">📱 Online Sipariş</span>
            <h2 className="to-h2" id="how-h">Nasıl Çalışır?</h2>
            <p className="to-sub">WhatsApp'tan sipariş verin, Türkiye'nin her yerine teslim edelim.</p>
            <div className="to-divider" />
          </div>
          <div className="to-howgrid">
            {HOW_IT_WORKS.map((h) => (
              <div key={h.step} className="to-howcard">
                <div className="to-how-step">{h.step}</div>
                <div className="to-how-icon">{h.icon}</div>
                <div className="to-how-title">{h.title}</div>
                <p className="to-how-desc">{h.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href={WA('Merhaba, online terzi siparişi vermek istiyorum. Nasıl başlayabilirim?')} target="_blank" rel="noopener noreferrer" className="to-bg to-wa">
              💬 Hemen Başla — WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─── NEDEN BİZ ─── */}
      <section className="to-sec to-whysec" aria-labelledby="why-h">
        <div className="to-ctr">
          <div className="to-sh">
            <span className="to-eyebrow">✦ Neden SwapHubs?</span>
            <h2 className="to-h2" id="why-h">Neden Bizi <em>Seçmelisiniz?</em></h2>
            <div className="to-divider" />
          </div>
          <div className="to-whygrid">
            {WHY.map((w) => (
              <div key={w.title} className="to-wcard">
                <div className="to-wic">{w.icon}</div>
                <div className="to-wt">{w.title}</div>
                <p className="to-wd">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FİYATLAR ─── */}
      <section id="prices" className="to-sec to-pricesec" aria-labelledby="prices-h">
        <div className="to-ctr">
          <div className="to-sh">
            <span className="to-eyebrow">₺ Şeffaf Fiyatlar</span>
            <h2 className="to-h2" id="prices-h">Terzi Fiyatları <em>2025–2026</em></h2>
            <p className="to-sub">
              Başlangıç fiyatları. Kesin teklif için WhatsApp'tan fotoğraf gönderin.
            </p>
            <div className="to-divider" />
          </div>
          <div className="to-price-tabs" role="tablist">
            {PRICE_TABLE.map((cat, i) => (
              <button
                key={cat.cat}
                className={`to-ptab${activePriceTab === i ? ' on' : ''}`}
                onClick={() => setActivePriceTab(i)}
                role="tab"
                aria-selected={activePriceTab === i}
              >
                {cat.cat}
              </button>
            ))}
          </div>
          <div className="to-ptable-wrap">
            <table className="to-ptable" aria-label={PRICE_TABLE[activePriceTab].cat}>
              <caption className="to-sr-only">
                {PRICE_TABLE[activePriceTab].cat} Fiyat Listesi — SwapHubs Antalya
              </caption>
              <thead>
                <tr>
                  <th scope="col">Hizmet</th>
                  <th scope="col">Başlangıç Fiyatı</th>
                  <th scope="col">Süre</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_TABLE[activePriceTab].items.map(([svc, price, time]) => (
                  <tr key={svc}>
                    <td>{svc}</td>
                    <td>{price}</td>
                    <td>{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href={WA('Merhaba, fiyat teklifi almak istiyorum.')} target="_blank" rel="noopener noreferrer" className="to-bg">
              📲 Ücretsiz Teklif Al
            </a>
          </div>
        </div>
      </section>

      {/* ─── YORUMLAR ─── */}
      <section id="reviews" className="to-sec to-revsec" aria-labelledby="reviews-h">
        <div className="to-ctr">
          <div className="to-sh center">
            <span className="to-eyebrow">⭐ 4.9 / 5 · 112 Değerlendirme</span>
            <h2 className="to-h2" id="reviews-h">Müşterilerimiz <em>Ne Diyor?</em></h2>
            <div className="to-divider" />
          </div>
          <div className="to-revgrid">
            {REVIEWS.map((r) => (
              <article key={r.name} className="to-rcard" itemScope itemType="https://schema.org/Review">
                <div className="to-rstars" aria-label="5 yıldız">★★★★★</div>
                <p className="to-rtxt" itemProp="reviewBody">{r.text}</p>
                <div className="to-rauth">
                  <strong itemProp="author">{r.name}</strong>
                  {' '}<span>— {r.city} · {r.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="to-ctasec" aria-label="Sipariş ver">
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="to-cta-h">
            Kıyafetiniz Tam Ölçüye<br />
            <em>Dikildikten Sonra Kapınızda</em>
          </h2>
          <p className="to-cta-sub">
            Online sipariş · WhatsApp ile anında iletişim · Türkiye geneli kargo
          </p>
          <div className="to-cta-btns">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="to-bg to-wa">
              💬 WhatsApp Sipariş Ver
            </a>
            <a href={WA('Merhaba, seri imalat / toplu sipariş hakkında bilgi almak istiyorum.')} target="_blank" rel="noopener noreferrer" className="to-bo">
              🏭 Toplu Sipariş
            </a>
          </div>
          <div className="to-cta-phone">
            <span>Telefon ile de ulaşabilirsiniz:</span>
            <a href="tel:+905318986418">+90 531 898 64 18</a>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="to-sec to-faqsec" aria-labelledby="faq-h">
        <div className="to-ctr">
          <div className="to-sh center">
            <span className="to-eyebrow">FAQ</span>
            <h2 className="to-h2" id="faq-h">Sık Sorulan Sorular</h2>
            <div className="to-divider" />
          </div>
          <div className="to-faqlist">
            {FAQS.map(([q, a], i) => (
              <div key={i} className="to-faqitem">
                <button
                  className="to-faqq"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-${i}`}
                >
                  <span>{q}</span>
                  <span className={`to-faqico${openFaq === i ? ' open' : ''}`} aria-hidden="true">+</span>
                </button>
                <div id={`faq-${i}`} className={`to-faqa${openFaq === i ? ' open' : ''}`} role="region">
                  {a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── İLETİŞİM ─── */}
      <section id="contact" className="to-sec to-contsec" aria-labelledby="contact-h">
        <div className="to-ctr">
          <div className="to-sh">
            <span className="to-eyebrow">✦ İletişim</span>
            <h2 className="to-h2" id="contact-h">Bize <em>Ulaşın</em></h2>
            <div className="to-divider" />
          </div>
          <div className="to-contgrid">
            <address style={{ fontStyle: 'normal' }}>
              {[
                { ic: '📞', lbl: 'Telefon', val: <a href="tel:+905318986418">+90 531 898 64 18</a> },
                { ic: '💬', lbl: 'WhatsApp', val: <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer">+90 531 898 64 18</a> },
                { ic: '🕐', lbl: 'Çalışma Saatleri', val: <span>09:00 – 19:00 · Pzt–Cmt</span> },
                { ic: '📍', lbl: 'Adres', val: <span>Konyaaltı, Antalya</span> },
                { ic: '🚚', lbl: 'Teslimat', val: <span>Antalya içi ücretsiz kurye · Türkiye geneli kargo</span> },
                { ic: '🌍', lbl: 'Hizmet Bölgesi', val: <span>Tüm Antalya İlçeleri + Online Türkiye Geneli</span> },
              ].map(({ ic, lbl, val }, i) => (
                <div key={i} className="to-crow">
                  <span className="to-cic" aria-hidden="true">{ic}</span>
                  <div>
                    <div className="to-clbl">{lbl}</div>
                    <div className="to-cval">{val}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem', marginTop: '1.8rem' }}>
                <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="to-bg to-wa" style={{ justifyContent: 'center' }}>
                  💬 WhatsApp
                </a>
                <a href="https://maps.google.com/?q=Konyaaltı+Antalya" target="_blank" rel="noopener noreferrer" className="to-bo" style={{ justifyContent: 'center' }}>
                  📍 Google Maps
                </a>
              </div>
            </address>

            <div className="to-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12742.017!2d30.6946!3d36.8769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3914a3f49b36b%3A0xe9e87c5c9a6b2700!2sKonyaalti%2C%20Antalya!5e0!3m2!1str!2str!4v1720000000000"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SwapHubs Antalya — Konyaaltı konumu"
                aria-label="SwapHubs Bay Tailor konumu haritası"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="to-footer">
        <div className="to-footer-inner">
          <div className="to-footer-brand">SwapHubs — Antalya Bay Tailor | Online Terzi & Ütü Hizmeti</div>
          <nav className="to-footer-links" aria-label="Footer bağlantılar">
            <a href="https://www.swaphubs.com">Ana Sayfa</a>
            <a href="https://www.swaphubs.com/terzi">Terzi Can</a>
            <a href="#services">Hizmetler</a>
            <a href="#prices">Fiyatlar</a>
            <a href="#faq">SSS</a>
            <a href="#contact">İletişim</a>
          </nav>
          <p className="to-footer-copy">
            © 2026 SwapHubs · Antalya Terzi & Tekstil Hizmetleri ·{' '}
            <a href="tel:+905318986418" style={{ color: 'rgba(197,151,58,.4)', textDecoration: 'none' }}>
              +90 531 898 64 18
            </a>
          </p>
          {/* SEO keyword cloud */}
          <div className="to-kws" aria-label="Anahtar kelimeler">
            {KEYWORDS_SEO.map(k => <span key={k} className="to-kpill">{k}</span>)}
          </div>
        </div>
      </footer>

    </div>
  );
}
