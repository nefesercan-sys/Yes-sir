'use client';

import { useState } from 'react';

// ─── ÜRÜNLER ──────────────────────────────────────────────────────────────────
const URUNLER = [
  // ── KADIN ──
  {
    id: 'k1', grup: 'kadin',
    baslik: 'Kadın Keten Maxi Elbise',
    aciklama: '%100 doğal keten kumaştan üretilmiş, yazın serin tutan, nefes alan maxi elbise. Geniş kesim, bağcıklı bel, uzun boy. Sahil tatillerinin vazgeçilmezi.',
    fiyat: 890,
    img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
    bedenler: ['XS','S','M','L','XL','XXL'],
    renkler: ['Doğal Krem','Açık Gri','Toprak'],
  },
  {
    id: 'k2', grup: 'kadin',
    baslik: 'Kadın Pamuk Oversize Gömlek',
    aciklama: '%100 organik pamuktan dokunmuş, oversize kesim, uzun kollu günlük gömlek. Hem iş hem de rahat günler için ideal. Yıkamaya dayanıklı, solmaz renkler.',
    fiyat: 650,
    img: 'https://images.unsplash.com/photo-1603344204980-4edb0ea63148?w=600&q=80',
    bedenler: ['XS','S','M','L','XL'],
    renkler: ['Beyaz','Açık Mavi','Çizgili'],
  },
  {
    id: 'k3', grup: 'kadin',
    baslik: 'Kadın Keten Wide-Leg Pantolon',
    aciklama: 'Yüksek belli, bol paçalı %100 keten pantolon. Ofisten sahile her ortama uyum sağlar. Elastik bel bantlı, yan cepli konforlu kesim.',
    fiyat: 720,
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    bedenler: ['XS','S','M','L','XL','XXL'],
    renkler: ['Bej','Haki','Siyah','Beyaz'],
  },
  {
    id: 'k4', grup: 'kadin',
    baslik: 'Kadın Pamuk Midi Etek',
    aciklama: 'Midi boy, %100 pamuk, hafif ve akışkan yapılı günlük etek. Elastik bel, A-line kesim. Yazın serinliği, baharda zarafeti.',
    fiyat: 580,
    img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
    bedenler: ['XS','S','M','L','XL'],
    renkler: ['Ekru','Terracotta','Lacivert'],
  },
  {
    id: 'k5', grup: 'kadin',
    baslik: 'Kadın Keten Kimono Hırka',
    aciklama: 'Açık kesim, %100 keten kumaş kimono hırka. Plaj üstü, ev içi veya dışarıda şık bir katman. Uzun boy, bağcıksız serbest kesim.',
    fiyat: 760,
    img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
    bedenler: ['S/M','L/XL','XXL'],
    renkler: ['Doğal Krem','Açık Kahve','Beyaz'],
  },

  // ── ERKEK ──
  {
    id: 'e1', grup: 'erkek',
    baslik: 'Erkek Keten Yazlık Gömlek',
    aciklama: '%100 keten, hafif dokulu erkek gömleği. Sıcak havalarda nefes alan yapısıyla terletmez. Düğmeli yaka, yarım kollu seçenek mevcut.',
    fiyat: 680,
    img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
    bedenler: ['S','M','L','XL','XXL','3XL'],
    renkler: ['Beyaz','Açık Mavi','Bej','Haki'],
  },
  {
    id: 'e2', grup: 'erkek',
    baslik: 'Erkek Pamuk Slim Pantolon',
    aciklama: '%100 organik pamuk, slim fit kesim erkek pantolonu. Günlük ve yarı resmi kullanıma uygun. Bel bandı ayarlanabilir, iki yan cep.',
    fiyat: 750,
    img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
    bedenler: ['28','30','32','34','36','38'],
    renkler: ['Lacivert','Haki','Gri','Bej'],
  },
  {
    id: 'e3', grup: 'erkek',
    baslik: 'Erkek Keten-Pamuk Takım',
    aciklama: '%100 keten-pamuk karışımı 2 parça takım. Hafif blazer ceket ve slim pantolon. Düğün, davet ve özel günler için doğal ve şık seçenek.',
    fiyat: 1850,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    bedenler: ['S','M','L','XL','XXL'],
    renkler: ['Doğal Krem','Açık Gri','Bej'],
  },
  {
    id: 'e4', grup: 'erkek',
    baslik: 'Erkek Pamuk Polo Tişört',
    aciklama: '%100 organik pamuk polo yaka tişört. Hafif pique dokusundan üretilmiş, günlük ve spor kullanıma uygun. Solmaz boyama.',
    fiyat: 420,
    img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80',
    bedenler: ['S','M','L','XL','XXL','3XL'],
    renkler: ['Beyaz','Lacivert','Haki','Terracotta'],
  },
  {
    id: 'e5', grup: 'erkek',
    baslik: 'Erkek Keten Şort',
    aciklama: '%100 keten, diz üstü boy erkek şort. Elastik ve ip bağcıklı bel, yan ve arka cep. Plaj, tatil ve günlük kullanım için ideal.',
    fiyat: 480,
    img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80',
    bedenler: ['S','M','L','XL','XXL'],
    renkler: ['Bej','Haki','Beyaz','Lacivert'],
  },

  // ── ÇOCUK ──
  {
    id: 'c1', grup: 'cocuk',
    baslik: 'Çocuk Keten Elbise (Kız)',
    aciklama: 'Kız çocukları için %100 keten, kolsuz A-line elbise. Omuz askılı, bağcıklı sırt. Nefes alan yapısı hassas ciltler için idealdir.',
    fiyat: 420,
    img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80',
    bedenler: ['2-3Y','4-5Y','6-7Y','8-9Y','10-11Y','12Y'],
    renkler: ['Pembe','Ekru','Açık Mavi'],
  },
  {
    id: 'c2', grup: 'cocuk',
    baslik: 'Çocuk Pamuk Takım (Erkek)',
    aciklama: 'Erkek çocukları için %100 organik pamuk, kısa kollu gömlek + şort takım. Yumuşak ve dayanıklı, aktif çocuklar için tasarlandı.',
    fiyat: 560,
    img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80',
    bedenler: ['2-3Y','4-5Y','6-7Y','8-9Y','10-11Y'],
    renkler: ['Mavi-Beyaz','Bej','Haki'],
  },
  {
    id: 'c3', grup: 'cocuk',
    baslik: 'Çocuk Keten Yazlık Tulum',
    aciklama: 'Hem kız hem erkek çocuklar için unisex %100 keten tulum. Çıtçıtlı kapanma, geniş kesim. Yaz sıcaklarında en konforlu seçenek.',
    fiyat: 490,
    img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80',
    bedenler: ['2-3Y','4-5Y','6-7Y','8-9Y','10-11Y','12Y'],
    renkler: ['Ekru','Açık Gri','Terracotta'],
  },
  {
    id: 'c4', grup: 'cocuk',
    baslik: 'Çocuk Pamuk Pijama Takımı',
    aciklama: '%100 organik pamuk, yumuşak dokulu çocuk pijama takımı. Uzun kollu üst + uzun pantolon. Dört mevsim kullanıma uygun, hipoalerjenik.',
    fiyat: 520,
    img: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600&q=80',
    bedenler: ['2-3Y','4-5Y','6-7Y','8-9Y','10-11Y','12Y'],
    renkler: ['Açık Mavi','Pembe','Ekru'],
  },

  // ── BEBEK ──
  {
    id: 'b1', grup: 'bebek',
    baslik: 'Bebek Keten Tulum',
    aciklama: 'Yeni doğan ve küçük bebekler için %100 doğal keten tulum. Çıtçıtlı kapanma, hassas deri dostu. Formaldehit içermez, Oeko-Tex sertifikalı.',
    fiyat: 380,
    img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
    bedenler: ['0-3M','3-6M','6-9M','9-12M','12-18M'],
    renkler: ['Ekru','Açık Pembe','Açık Mavi'],
  },
  {
    id: 'b2', grup: 'bebek',
    baslik: 'Bebek Pamuk Zıbın Seti (5li)',
    aciklama: '%100 organik pamuk, 5 adet zıbın seti. Çıtçıtlı, farklı renk ve desenlerde. Hassas bebek ciltleri için en güvenli seçenek.',
    fiyat: 450,
    img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80',
    bedenler: ['0-3M','3-6M','6-9M','9-12M'],
    renkler: ['Karışık Pastel','Beyaz Set','Ekru Set'],
  },
  {
    id: 'b3', grup: 'bebek',
    baslik: 'Bebek Keten Şapka + Elbise Set',
    aciklama: 'Bebek kız için %100 keten, kolsuz elbise ve geniş kenarlı şapka seti. Güneş koruması yüksek, nefes alan yapı. Fotoğraf çekimleri için ideal.',
    fiyat: 520,
    img: 'https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?w=600&q=80',
    bedenler: ['3-6M','6-9M','9-12M','12-18M','18-24M'],
    renkler: ['Ekru','Pembe','Açık Sarı'],
  },
  {
    id: 'b4', grup: 'bebek',
    baslik: 'Bebek Pamuk Uyku Tulumu',
    aciklama: '%100 organik pamuk uyku tulumu. Bebek geceleri güvenle uyusun diye tasarlandı. Fermuar kapanma, ayak kısmı açılabilir.',
    fiyat: 490,
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    bedenler: ['0-6M','6-12M','12-18M','18-24M'],
    renkler: ['Ekru','Açık Mavi','Açık Pembe'],
  },
];

const GRUPLAR = [
  { id: 'tumu', label: 'Tümü', icon: '🌿' },
  { id: 'kadin', label: 'Kadın', icon: '👗' },
  { id: 'erkek', label: 'Erkek', icon: '👔' },
  { id: 'cocuk', label: 'Çocuk', icon: '🧒' },
  { id: 'bebek', label: 'Bebek', icon: '👶' },
];

type Siparis = {
  urun: typeof URUNLER[0];
  adet: number;
  beden: string;
  renk: string;
  kampanya: boolean;
};

export default function DogalGiyimClient() {
  const [aktifGrup, setAktifGrup] = useState('tumu');
  const [sepet, setSepet] = useState<Siparis[]>([]);
  const [sepetAcik, setSepetAcik] = useState(false);
  const [siparisVerildi, setSiparisVerildi] = useState(false);
  const [modal, setModal] = useState<typeof URUNLER[0] | null>(null);
  const [secimler, setSecimler] = useState<Record<string, { adet: number; beden: string; renk: string; kampanya: boolean }>>({});

  const filtreliUrunler = aktifGrup === 'tumu'
    ? URUNLER
    : URUNLER.filter(u => u.grup === aktifGrup);

  const getSecim = (id: string) => secimler[id] || { adet: 1, beden: '', renk: '', kampanya: false };

  const updateSecim = (id: string, key: string, val: any) => {
    setSecimler(p => ({ ...p, [id]: { ...getSecim(id), [key]: val } }));
  };

  const sepeteEkle = (urun: typeof URUNLER[0]) => {
    const s = getSecim(urun.id);
    if (!s.beden || !s.renk) { alert('Lütfen beden ve renk seçiniz.'); return; }
    setSepet(p => [...p, { urun, adet: s.adet, beden: s.beden, renk: s.renk, kampanya: s.kampanya }]);
    setSepetAcik(true);
    setModal(null);
  };

  const toplamFiyat = sepet.reduce((acc, s) => {
    const fiyat = s.kampanya ? s.urun.fiyat * s.adet * (2 / 3) : s.urun.fiyat * s.adet;
    return acc + fiyat;
  }, 0);

  const siparisVer = () => {
    if (sepet.length === 0) return;
    setSiparisVerildi(true);
    setSepet([]);
    setSepetAcik(false);
  };

  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", background: '#F7F4EE', minHeight: '100vh', color: '#2C2416' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --krem:#F7F4EE; --yesil:#3D5A40; --altin:#C9A84C;
          --toprak:#8B5E3C; --koyu:#2C2416; --bej:#E8E0D0;
          --sans:'Jost',system-ui,sans-serif;
        }
        body{background:var(--krem)}
        .sans{font-family:var(--sans)}
        .btn{display:inline-flex;align-items:center;gap:.4rem;padding:.7rem 1.5rem;
             border:none;cursor:pointer;font-family:var(--sans);font-size:.78rem;
             font-weight:600;letter-spacing:.08em;text-transform:uppercase;
             border-radius:2px;transition:all .25s;text-decoration:none}
        .btn-yesil{background:var(--yesil);color:#fff}
        .btn-yesil:hover{background:#2d4430;transform:translateY(-1px)}
        .btn-altin{background:var(--altin);color:var(--koyu)}
        .btn-altin:hover{background:#b8973f;transform:translateY(-1px)}
        .btn-outline{background:transparent;color:var(--yesil);border:1.5px solid var(--yesil)}
        .btn-outline:hover{background:var(--yesil);color:#fff}
        /* HERO */
        .hero{background:linear-gradient(135deg,#3D5A40 0%,#2d4430 60%,#1e2e22 100%);
              padding:5rem 2rem 4rem;text-align:center;position:relative;overflow:hidden}
        .hero::before{content:'';position:absolute;inset:0;
          background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")}
        .hero-badge{display:inline-block;background:rgba(201,168,76,.15);
          border:1px solid rgba(201,168,76,.4);color:var(--altin);
          font-family:var(--sans);font-size:.65rem;letter-spacing:.3em;
          text-transform:uppercase;padding:.4rem 1rem;margin-bottom:1.5rem}
        .hero h1{font-size:clamp(2.2rem,5vw,4rem);font-weight:700;color:#fff;
                 line-height:1.1;margin-bottom:1rem}
        .hero h1 em{color:var(--altin);font-style:italic}
        .hero-sub{font-family:var(--sans);font-size:.95rem;color:rgba(255,255,255,.65);
                  max-width:580px;margin:0 auto 2rem;line-height:1.8}
        .hero-stats{display:flex;justify-content:center;gap:3rem;flex-wrap:wrap;
                    padding-top:2rem;border-top:1px solid rgba(255,255,255,.1);
                    margin-top:2rem}
        .hstat{text-align:center}
        .hstat-n{font-size:1.6rem;font-weight:700;color:var(--altin);display:block}
        .hstat-l{font-family:var(--sans);font-size:.65rem;color:rgba(255,255,255,.5);
                 letter-spacing:.15em;text-transform:uppercase;margin-top:.2rem}
        /* TABS */
        .tabs{background:#fff;border-bottom:2px solid var(--bej);
              display:flex;justify-content:center;gap:.5rem;flex-wrap:wrap;padding:1.2rem 1rem;
              position:sticky;top:0;z-index:50;box-shadow:0 2px 12px rgba(0,0,0,.06)}
        .tab{background:none;border:1.5px solid transparent;cursor:pointer;
             font-family:var(--sans);font-size:.8rem;font-weight:500;
             padding:.55rem 1.4rem;border-radius:50px;transition:all .2s;color:#666;
             display:flex;align-items:center;gap:.4rem}
        .tab:hover{border-color:var(--yesil);color:var(--yesil)}
        .tab.aktif{background:var(--yesil);color:#fff;border-color:var(--yesil);font-weight:600}
        /* GRID */
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
              gap:1.5rem;padding:2.5rem 2rem;max-width:1280px;margin:0 auto}
        /* KART */
        .kart{background:#fff;border-radius:4px;overflow:hidden;
              box-shadow:0 2px 12px rgba(0,0,0,.06);transition:transform .3s,box-shadow .3s}
        .kart:hover{transform:translateY(-4px);box-shadow:0 8px 30px rgba(0,0,0,.12)}
        .kart-img{width:100%;height:280px;object-fit:cover;display:block;cursor:pointer}
        .kart-grup{position:absolute;top:.8rem;left:.8rem;background:var(--yesil);
                   color:#fff;font-family:var(--sans);font-size:.58rem;
                   letter-spacing:.15em;text-transform:uppercase;padding:.25rem .65rem;border-radius:1px}
        .kart-body{padding:1.2rem}
        .kart-baslik{font-size:1.05rem;font-weight:700;color:var(--koyu);margin-bottom:.4rem;line-height:1.3}
        .kart-aciklama{font-family:var(--sans);font-size:.75rem;color:#666;
                       line-height:1.65;margin-bottom:1rem;
                       display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .kart-fiyat{font-size:1.3rem;font-weight:700;color:var(--yesil);margin-bottom:.8rem}
        .kart-fiyat span{font-family:var(--sans);font-size:.72rem;color:#999;
                         text-decoration:line-through;margin-left:.5rem;font-weight:400}
        /* SEÇİM */
        .secim-label{font-family:var(--sans);font-size:.65rem;letter-spacing:.12em;
                     text-transform:uppercase;color:#888;display:block;margin-bottom:.3rem;margin-top:.6rem}
        .secim-grup{display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:.4rem}
        .secim-btn{background:none;border:1px solid #ddd;font-family:var(--sans);
                   font-size:.7rem;padding:.25rem .6rem;cursor:pointer;border-radius:1px;transition:all .2s}
        .secim-btn:hover,.secim-btn.aktif{background:var(--yesil);color:#fff;border-color:var(--yesil)}
        .adet-wrap{display:flex;align-items:center;gap:.5rem;margin:.6rem 0}
        .adet-btn{width:28px;height:28px;border:1px solid #ddd;background:none;
                  cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;
                  border-radius:1px;transition:all .2s}
        .adet-btn:hover{background:var(--yesil);color:#fff;border-color:var(--yesil)}
        .kampanya-box{background:linear-gradient(135deg,#FFF9EC,#FFF3D4);
                      border:1px solid rgba(201,168,76,.3);border-radius:2px;
                      padding:.7rem;margin:.6rem 0;cursor:pointer;transition:all .2s}
        .kampanya-box:hover,.kampanya-box.aktif{border-color:var(--altin);
          background:linear-gradient(135deg,#FFF3D4,#FFEBB0)}
        .kampanya-box label{font-family:var(--sans);font-size:.72rem;color:var(--toprak);
                            font-weight:600;cursor:pointer;display:flex;align-items:center;gap:.5rem}
        /* MODAL */
        .overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:100;
                 display:flex;align-items:center;justify-content:center;padding:1rem}
        .modal{background:#fff;border-radius:4px;max-width:680px;width:100%;
               max-height:90vh;overflow-y:auto;display:grid;grid-template-columns:1fr 1fr}
        .modal-img{height:100%;min-height:400px;object-fit:cover}
        .modal-body{padding:2rem;overflow-y:auto}
        .modal-close{position:absolute;top:1rem;right:1rem;background:#fff;
                     border:none;width:32px;height:32px;border-radius:50%;
                     cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center}
        /* SEPET */
        .sepet-panel{position:fixed;right:0;top:0;bottom:0;width:360px;background:#fff;
                     z-index:200;box-shadow:-4px 0 20px rgba(0,0,0,.1);
                     display:flex;flex-direction:column;transform:translateX(100%);transition:transform .35s}
        .sepet-panel.acik{transform:translateX(0)}
        .sepet-header{padding:1.5rem;border-bottom:1px solid var(--bej);
                      display:flex;justify-content:space-between;align-items:center}
        .sepet-items{flex:1;overflow-y:auto;padding:1rem}
        .sepet-item{display:flex;gap:.8rem;padding:.8rem 0;border-bottom:1px solid var(--bej)}
        .sepet-item-img{width:60px;height:70px;object-fit:cover;border-radius:2px;flex-shrink:0}
        .sepet-footer{padding:1.2rem;border-top:1px solid var(--bej);background:#fff}
        .kapida-odeme{background:#f0f7f0;border:1px solid rgba(61,90,64,.2);
                      border-radius:2px;padding:.8rem;margin-bottom:1rem;
                      font-family:var(--sans);font-size:.75rem;color:var(--yesil);
                      display:flex;align-items:center;gap:.5rem}
        /* BADGE */
        .kart-wrap{position:relative}
        /* BASARI */
        .basari{position:fixed;inset:0;background:rgba(61,90,64,.97);z-index:300;
                display:flex;flex-direction:column;align-items:center;justify-content:center;
                color:#fff;text-align:center;padding:2rem}
        .basari h2{font-size:2.5rem;margin-bottom:1rem}
        .basari p{font-family:var(--sans);font-size:1rem;opacity:.8;max-width:400px;line-height:1.8}
        /* SEO TEXT */
        .seo-sec{background:var(--bej);padding:3rem 2rem;text-align:center}
        .seo-sec h2{font-size:1.8rem;margin-bottom:.8rem;color:var(--koyu)}
        .seo-sec p{font-family:var(--sans);font-size:.85rem;color:#666;
                   max-width:720px;margin:0 auto;line-height:1.9}
        /* FOOTER */
        footer{background:var(--koyu);padding:2rem;text-align:center;
               font-family:var(--sans);font-size:.75rem;color:rgba(255,255,255,.4)}
        footer a{color:var(--altin);text-decoration:none}
        /* RESPONSIVE */
        @media(max-width:640px){
          .modal{grid-template-columns:1fr}
          .modal-img{display:none}
          .sepet-panel{width:100%}
          .hero-stats{gap:1.5rem}
          .grid{grid-template-columns:repeat(auto-fill,minmax(240px,1fr));padding:1rem}
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">%100 Doğal • Keten & Pamuk • Türkiye Üretimi</div>
        <h1>Doğanın Dokusunu<br/><em>Giy</em></h1>
        <p className="hero-sub sans">
          Kadın, erkek, çocuk ve bebek için %100 doğal keten ve pamuk koleksiyonu.
          Nefes alan kumaş, hassas ciltler için güvenli, çevre dostu üretim.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#koleksiyon" className="btn btn-altin">Koleksiyonu Keşfet ↓</a>
          <button className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }}
            onClick={() => setSepetAcik(true)}>
            🛒 Sepet {sepet.length > 0 && `(${sepet.length})`}
          </button>
        </div>
        <div className="hero-stats">
          {[['%100','Doğal Keten & Pamuk'],['0','Zararlı Kimyasal'],['Kapıda','Ödeme İmkanı'],['3 Al 2 Öde','Kampanya']].map(([n,l]) => (
            <div key={l} className="hstat">
              <span className="hstat-n">{n}</span>
              <span className="hstat-l sans">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TABS */}
      <div className="tabs" id="koleksiyon">
        {GRUPLAR.map(g => (
          <button key={g.id} className={`tab${aktifGrup === g.id ? ' aktif' : ''}`}
            onClick={() => setAktifGrup(g.id)}>
            {g.icon} {g.label}
          </button>
        ))}
        <button className="btn btn-yesil sans" style={{ marginLeft: 'auto', fontSize: '.72rem', padding: '.5rem 1rem' }}
          onClick={() => setSepetAcik(true)}>
          🛒 Sepet {sepet.length > 0 && `(${sepet.length})`}
        </button>
      </div>

      {/* ÜRÜN GRİD */}
      <div className="grid">
        {filtreliUrunler.map(urun => {
          const s = getSecim(urun.id);
          const kampanyaFiyat = urun.fiyat * (2 / 3);
          return (
            <div key={urun.id} className="kart kart-wrap">
              <span className="kart-grup sans">
                {GRUPLAR.find(g => g.id === urun.grup)?.icon} {GRUPLAR.find(g => g.id === urun.grup)?.label}
              </span>
              <img src={urun.img} alt={urun.baslik} className="kart-img"
                onClick={() => setModal(urun)} loading="lazy" />
              <div className="kart-body">
                <h2 className="kart-baslik">{urun.baslik}</h2>
                <p className="kart-aciklama sans">{urun.aciklama}</p>

                <div className="kart-fiyat sans">
                  {s.kampanya
                    ? <>{kampanyaFiyat.toFixed(0)} ₺ <span>{urun.fiyat} ₺</span></>
                    : <>{urun.fiyat} ₺</>}
                </div>

                {/* Beden */}
                <span className="secim-label sans">Beden</span>
                <div className="secim-grup">
                  {urun.bedenler.map(b => (
                    <button key={b} className={`secim-btn${s.beden === b ? ' aktif' : ''}`}
                      onClick={() => updateSecim(urun.id, 'beden', b)}>{b}</button>
                  ))}
                </div>

                {/* Renk */}
                <span className="secim-label sans">Renk</span>
                <div className="secim-grup">
                  {urun.renkler.map(r => (
                    <button key={r} className={`secim-btn${s.renk === r ? ' aktif' : ''}`}
                      onClick={() => updateSecim(urun.id, 'renk', r)}>{r}</button>
                  ))}
                </div>

                {/* Adet */}
                <span className="secim-label sans">Adet</span>
                <div className="adet-wrap">
                  <button className="adet-btn" onClick={() => updateSecim(urun.id, 'adet', Math.max(1, s.adet - 1))}>−</button>
                  <span className="sans" style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600 }}>{s.adet}</span>
                  <button className="adet-btn" onClick={() => updateSecim(urun.id, 'adet', s.adet + 1)}>+</button>
                </div>

                {/* 3 Al 2 Öde */}
                <div className={`kampanya-box${s.kampanya ? ' aktif' : ''}`}
                  onClick={() => updateSecim(urun.id, 'kampanya', !s.kampanya)}>
                  <label>
                    <input type="checkbox" checked={s.kampanya} onChange={() => {}}
                      style={{ accentColor: 'var(--altin)' }} />
                    🎁 3 Al 2 Öde Kampanyası — Ekstra indirim!
                  </label>
                </div>

                <button className="btn btn-yesil" style={{ width: '100%', justifyContent: 'center', marginTop: '.4rem' }}
                  onClick={() => sepeteEkle(urun)}>
                  Sepete Ekle
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEO TEXT SECTION */}
      <div className="seo-sec">
        <h2>%100 Doğal Keten & Pamuk Neden Tercih Edilmeli?</h2>
        <p className="sans">
          Keten ve pamuk, dünyanın en eski ve en doğal kumaşları arasındadır. Nefes alan yapısı sayesinde yaz sıcaklarında
          serinletir, kış aylarında ise vücut ısısını dengeler. Kimyasal işlem görmemiş organik kumaşlar, hassas ciltler ve
          bebekler için en güvenli seçenektir. Sürdürülebilir moda anlayışıyla üretilen koleksiyonumuz; kadın, erkek, çocuk
          ve bebek kategorilerinde geniş bir yelpazeye sahiptir. Türkiye'de üretilmiş, kapıda ödeme seçeneğiyle sipariş verin.
        </p>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ position: 'relative' }}>
            <img src={modal.img} alt={modal.baslik} className="modal-img" />
            <div className="modal-body">
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
              <p className="sans" style={{ fontSize: '.65rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--yesil)', marginBottom: '.5rem' }}>
                {GRUPLAR.find(g => g.id === modal.grup)?.label}
              </p>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '.8rem' }}>{modal.baslik}</h2>
              <p className="sans" style={{ fontSize: '.82rem', color: '#555', lineHeight: 1.8, marginBottom: '1rem' }}>{modal.aciklama}</p>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--yesil)', marginBottom: '1rem' }}>
                {getSecim(modal.id).kampanya
                  ? <>{(modal.fiyat * 2 / 3).toFixed(0)} ₺ <span style={{ fontSize: '1rem', color: '#999', textDecoration: 'line-through', fontWeight: 400 }}>{modal.fiyat} ₺</span></>
                  : <>{modal.fiyat} ₺</>}
              </div>
              <span className="secim-label sans">Beden</span>
              <div className="secim-grup">
                {modal.bedenler.map(b => (
                  <button key={b} className={`secim-btn${getSecim(modal.id).beden === b ? ' aktif' : ''}`}
                    onClick={() => updateSecim(modal.id, 'beden', b)}>{b}</button>
                ))}
              </div>
              <span className="secim-label sans">Renk</span>
              <div className="secim-grup">
                {modal.renkler.map(r => (
                  <button key={r} className={`secim-btn${getSecim(modal.id).renk === r ? ' aktif' : ''}`}
                    onClick={() => updateSecim(modal.id, 'renk', r)}>{r}</button>
                ))}
              </div>
              <div className={`kampanya-box${getSecim(modal.id).kampanya ? ' aktif' : ''}`}
                onClick={() => updateSecim(modal.id, 'kampanya', !getSecim(modal.id).kampanya)}>
                <label>
                  <input type="checkbox" checked={getSecim(modal.id).kampanya} onChange={() => {}}
                    style={{ accentColor: 'var(--altin)' }} />
                  🎁 3 Al 2 Öde Kampanyası
                </label>
              </div>
              <button className="btn btn-yesil" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                onClick={() => sepeteEkle(modal)}>
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEPET PANELİ */}
      <div className={`sepet-panel${sepetAcik ? ' acik' : ''}`}>
        <div className="sepet-header">
          <h3 style={{ fontSize: '1.1rem' }}>Sepetim ({sepet.length})</h3>
          <button onClick={() => setSepetAcik(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
        </div>
        <div className="sepet-items">
          {sepet.length === 0
            ? <p className="sans" style={{ color: '#999', fontSize: '.85rem', textAlign: 'center', marginTop: '2rem' }}>Sepetiniz boş</p>
            : sepet.map((s, i) => (
              <div key={i} className="sepet-item">
                <img src={s.urun.img} alt={s.urun.baslik} className="sepet-item-img" />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '.85rem', fontWeight: 600, marginBottom: '.2rem' }}>{s.urun.baslik}</p>
                  <p className="sans" style={{ fontSize: '.7rem', color: '#888' }}>{s.beden} · {s.renk} · {s.adet} adet</p>
                  {s.kampanya && <p className="sans" style={{ fontSize: '.65rem', color: 'var(--altin)', fontWeight: 600 }}>🎁 3 Al 2 Öde</p>}
                  <p className="sans" style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--yesil)', marginTop: '.3rem' }}>
                    {s.kampanya ? (s.urun.fiyat * s.adet * 2 / 3).toFixed(0) : (s.urun.fiyat * s.adet).toFixed(0)} ₺
                  </p>
                </div>
                <button onClick={() => setSepet(p => p.filter((_, j) => j !== i))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', fontSize: '1rem', alignSelf: 'flex-start' }}>✕</button>
              </div>
            ))}
        </div>
        <div className="sepet-footer">
          <div className="kapida-odeme">
            💵 Kapıda ödeme seçeneği mevcuttur
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="sans" style={{ fontWeight: 600 }}>Toplam</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--yesil)' }}>{toplamFiyat.toFixed(0)} ₺</span>
          </div>
          <button className="btn btn-yesil" style={{ width: '100%', justifyContent: 'center', fontSize: '.82rem' }}
            onClick={siparisVer}>
            Siparişi Onayla — Kapıda Ödeme
          </button>
        </div>
      </div>

      {/* OVERLAY SEPET */}
      {sepetAcik && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 199 }}
          onClick={() => setSepetAcik(false)} />
      )}

      {/* SİPARİŞ BAŞARI */}
      {siparisVerildi && (
        <div className="basari">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h2>Siparişiniz Alındı!</h2>
          <p className="sans">
            Siparişiniz sisteme düştü. Kısa süre içinde sizi arayacağız.
            Kapıda ödeme seçeneğiyle güvenle alışveriş yaptınız.
          </p>
          <button className="btn btn-altin" style={{ marginTop: '2rem' }}
            onClick={() => setSiparisVerildi(false)}>
            Alışverişe Devam Et
          </button>
        </div>
      )}

      <footer>
        <p>© {new Date().getFullYear()} <a href="https://www.swaphubs.com">SwapHubs</a> · %100 Doğal Keten & Pamuk Giyim · Türkiye</p>
        <p style={{ marginTop: '.4rem', fontSize: '.65rem' }}>Keten Kadın Giyim · Keten Erkek Giyim · Keten Çocuk Giyim · Organik Bebek Kıyafeti · Kapıda Ödeme</p>
      </footer>
    </div>
  );
}
