import type { Metadata } from "next";
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/konyaalti;
const PARENT_URL = 'https://swaphubs.com/terzi';
export const metadata: Metadata = {
  title: "Konyaaltı Terzi Elbise Dikimi Tamiri Ütü Hizmeti | Terzi Can Antalya",
  description:
    "Konyaaltı'nda elbise dikimi, kıyafet tamiri ve ütü hizmetleri. Hurma, Liman, Sarısu, Uncalı, Çakırlar, Meltem mahallelerine paça kısaltma, fermuar değişimi, daraltma, bay bayan terzi hizmeti. Terzi Can – Antalya.",
  keywords: [
    // Genel Konyaaltı
    "konyaaltı terzi",
    "konyaaltı elbise dikimi",
    "konyaaltı kıyafet tamiri",
    "konyaaltı ütü hizmeti",
    "konyaaltı terzi hizmeti",
    "konyaaltı paça kısaltma",
    "konyaaltı fermuar değişimi",
    "konyaaltı elbise daraltma",
    "konyaaltı elbise tadilat",
    "konyaaltı bay terzi",
    "konyaaltı bayan terzi",
    "antalya konyaaltı terzi",
    "terzi can konyaaltı",
    // Hurma
    "hurma terzi",
    "hurma elbise dikimi",
    "hurma kıyafet tamiri",
    "hurma paça kısaltma",
    "hurma ütü hizmeti",
    "hurma mahallesi terzi",
    // Liman
    "liman terzi",
    "liman elbise dikimi",
    "liman kıyafet tamiri",
    "liman mahallesi terzi antalya",
    "liman paça kısaltma",
    // Sarısu
    "sarısu terzi",
    "sarısu elbise dikimi",
    "sarısu mahallesi terzi",
    "sarısu kıyafet tamiri",
    // Uncalı
    "uncalı terzi",
    "uncalı elbise dikimi",
    "uncalı kıyafet tamiri",
    "uncalı fermuar değişimi",
    "uncalı mahallesi terzi",
    // Çakırlar
    "çakırlar terzi",
    "çakırlar elbise dikimi",
    "çakırlar mahallesi terzi",
    "çakırlar kıyafet tamiri",
    // Meltem
    "meltem terzi",
    "meltem elbise dikimi",
    "meltem mahallesi terzi",
    "meltem kıyafet tamiri",
    "meltem ütü hizmeti",
    // Hizmet bazlı
    "elbise dikimi konyaaltı",
    "paça kısaltma konyaaltı",
    "fermuar tamiri konyaaltı",
    "kıyafet daraltma konyaaltı",
    "ütü servisi konyaaltı",
    "düğün elbisesi tamiri konyaaltı",
    "takım elbise tadilat konyaaltı",
    "kot paça kısaltma konyaaltı",
  ],
  alternates: {
    canonical: "https://swaphubs.com/terzi/konyaalti",
  },
  openGraph: {
    title: "Konyaaltı Terzi Elbise Dikimi Tamiri Ütü – Terzi Can",
    description:
      "Hurma, Liman, Sarısu, Uncalı, Çakırlar, Meltem ve tüm Konyaaltı mahallelerine profesyonel terzi, elbise dikimi, tamir ve ütü hizmeti. WhatsApp ile hemen ulaşın.",
    url: "https://swaphubs.com/terzi/konyaalti",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://swaphubs.com/terzi/konyaalti#business",
      name: "Terzi Can",
      alternateName: ["Terzi Can Konyaaltı", "Konyaaltı Terzi", "Antalya Terzi Can"],
      description:
        "Konyaaltı ilçesi ve Hurma, Liman, Sarısu, Uncalı, Çakırlar, Meltem mahallelerinde elbise dikimi, kıyafet tamiri, paça kısaltma, fermuar değişimi, daraltma ve ütü hizmetleri sunan profesyonel terzi.",
      url: "https://swaphubs.com/terzi/konyaalti",
      telephone: "+905318986418",
      email: "nefesercan@gmail.com",
      image: "https://swaphubs.com/og-image.jpg",
      priceRange: "₺₺",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Konyaaltı",
        addressLocality: "Konyaaltı",
        addressRegion: "Antalya",
        postalCode: "07070",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 36.8663,
        longitude: 30.6389,
      },
      areaServed: [
        { "@type": "Place", name: "Hurma Mahallesi, Konyaaltı, Antalya" },
        { "@type": "Place", name: "Liman Mahallesi, Konyaaltı, Antalya" },
        { "@type": "Place", name: "Sarısu Mahallesi, Konyaaltı, Antalya" },
        { "@type": "Place", name: "Uncalı Mahallesi, Konyaaltı, Antalya" },
        { "@type": "Place", name: "Çakırlar Mahallesi, Konyaaltı, Antalya" },
        { "@type": "Place", name: "Meltem Mahallesi, Konyaaltı, Antalya" },
        { "@type": "Place", name: "Konyaaltı, Antalya" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Konyaaltı Terzi Hizmetleri",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Elbise Dikimi", areaServed: "Konyaaltı, Antalya" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kıyafet Tamiri", areaServed: "Konyaaltı, Antalya" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Paça Kısaltma", areaServed: "Konyaaltı, Antalya" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fermuar Değişimi", areaServed: "Konyaaltı, Antalya" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Elbise Daraltma ve Genişletme", areaServed: "Konyaaltı, Antalya" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ütü Hizmeti", areaServed: "Konyaaltı, Antalya" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bay Kıyafet Dikimi", areaServed: "Konyaaltı, Antalya" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bayan Kıyafet Dikimi", areaServed: "Konyaaltı, Antalya" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Takım Elbise Tadilat", areaServed: "Konyaaltı, Antalya" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Düğün Kıyafeti Tamiri", areaServed: "Konyaaltı, Antalya" } },
        ],
      },
      sameAs: ["https://share.google/LdW3RoSRJOEkJfjKp"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+905318986418",
        contactType: "customer service",
        availableLanguage: ["Turkish"],
        contactOption: "TollFree",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://swaphubs.com" },
        { "@type": "ListItem", position: 2, name: "Terzi", item: "https://swaphubs.com/terzi" },
        { "@type": "ListItem", position: 3, name: "Konyaaltı Terzi Elbise Dikimi Tamiri Ütü Hizmeti", item: "https://swaphubs.com/terzi/konyaalti" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Hurma mahallesinde terzi nerede bulunur?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hurma mahallesinde elbise dikimi, paça kısaltma, fermuar değişimi ve kıyafet tamiri için Terzi Can'a WhatsApp üzerinden +90 531 898 64 18 numarasından ulaşabilirsiniz.",
          },
        },
        {
          "@type": "Question",
          name: "Liman mahallesinde elbise dikimi yaptırabilir miyim?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet. Terzi Can, Liman mahallesi sakinlerine elbise dikimi, tamir ve tadilat hizmetleri sunmaktadır. Randevu için WhatsApp yazabilirsiniz.",
          },
        },
        {
          "@type": "Question",
          name: "Uncalı veya Sarısu'da paça kısaltma nerede yaptırılır?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Terzi Can olarak Uncalı ve Sarısu mahallelerinden gelen müşterilerimize paça kısaltma, fermuar tamiri ve tüm tadilat işlemlerini hızlıca gerçekleştiriyoruz.",
          },
        },
        {
          "@type": "Question",
          name: "Çakırlar veya Meltem'de terzi hizmeti alabilir miyim?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet. Çakırlar ve Meltem mahalleleri hizmet bölgemiz içindedir. Elbise dikimi, kıyafet tamiri ve ütü için WhatsApp üzerinden randevu alabilirsiniz.",
          },
        },
        {
          "@type": "Question",
          name: "Konyaaltı'nda ütü hizmeti veren terzi var mı?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Terzi Can'da takım elbise, düğün kıyafeti ve günlük giysilerin ütüsü yapılmaktadır. Konyaaltı'nın tüm mahallelerine hizmet verilmektedir.",
          },
        },
        {
          "@type": "Question",
          name: "Bay ve bayan kıyafetleri için ayrı terzi hizmeti var mı?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Terzi Can hem bay hem bayan kıyafetleri için dikim, tamir, paça, fermuar ve tadilat hizmetleri sunmaktadır. Pantolon, elbise, ceket, abiye ve günlük kıyafetler için uygundur.",
          },
        },
      ],
    },
  ],
};

const WHATSAPP_URL =
  "https://wa.me/905318986418?text=Merhaba%2C%20Konyaalt%C4%B1%27nda%20terzi%20hizmeti%20almak%20istiyorum.";
const MAPS_URL = "https://share.google/LdW3RoSRJOEkJfjKp";

const services = [
  {
    icon: "✂️",
    title: "Elbise Dikimi",
    desc: "Bay & bayan özel ölçü dikimi, sipariş elbise, abiye, günlük kıyafet.",
    wa: "https://wa.me/905318986418?text=Konyaalt%C4%B1%27nda%20elbise%20dikimi%20yapt%C4%B1rmak%20istiyorum.",
  },
  {
    icon: "📏",
    title: "Paça Kısaltma",
    desc: "Pantolon, kot, elbise ve takım paça kısaltma — aynı gün teslim mümkün.",
    wa: "https://wa.me/905318986418?text=Pa%C3%A7a%20k%C4%B1saltma%20yapt%C4%B1rmak%20istiyorum.",
  },
  {
    icon: "🔧",
    title: "Fermuar Değişimi",
    desc: "Ceket, pantolon, elbise ve çanta fermuarı değişimi & tamiri.",
    wa: "https://wa.me/905318986418?text=Fermuar%20de%C4%9Fi%C5%9Fimi%20yapt%C4%B1rmak%20istiyorum.",
  },
  {
    icon: "🪡",
    title: "Daraltma & Genişletme",
    desc: "Bel, kol, omuz daraltma/genişletme — vücudunuza tam oturan kıyafet.",
    wa: "https://wa.me/905318986418?text=K%C4%B1yafet%20daraltma%20veya%20geni%C5%9Fletme%20yapt%C4%B1rmak%20istiyorum.",
  },
  {
    icon: "👔",
    title: "Kıyafet Tamiri",
    desc: "Yırtık onarımı, dikiş açığı, düğme dikimi, astar tamiri.",
    wa: "https://wa.me/905318986418?text=K%C4%B1yafet%20tamiri%20yapt%C4%B1rmak%20istiyorum.",
  },
  {
    icon: "🔥",
    title: "Ütü Hizmeti",
    desc: "Takım elbise, düğün kıyafeti, gömlek, elbise profesyonel ütü.",
    wa: "https://wa.me/905318986418?text=%C3%9Ct%C3%BC%20hizmeti%20almak%20istiyorum.",
  },
];

const mahalleler = [
  {
    name: "Hurma",
    h2: "Hurma Mahallesi'nde Terzi",
    desc:
      "Hurma'da elbise dikimi, paça kısaltma, fermuar değişimi ve kıyafet tamiri için Terzi Can hizmetinizdedir. Hurma sakinleri randevularını WhatsApp ile kolayca alabilir.",
    keywords: ["hurma terzi", "hurma elbise dikimi", "hurma paça kısaltma"],
  },
  {
    name: "Liman",
    h2: "Liman Mahallesi'nde Terzi",
    desc:
      "Liman mahallesinde takım elbise tadilat, bay bayan kıyafet dikimi ve fermuar tamiri hizmetleri. Hızlı teslimat, uygun fiyat.",
    keywords: ["liman terzi", "liman elbise dikimi", "liman kıyafet tamiri"],
  },
  {
    name: "Sarısu",
    h2: "Sarısu Mahallesi'nde Terzi",
    desc:
      "Sarısu'da elbise dikimi ve kıyafet tamiri arıyorsanız Terzi Can doğru adres. Paça kısaltma ve daraltma işlemleri aynı gün başlar.",
    keywords: ["sarısu terzi", "sarısu elbise dikimi", "sarısu kıyafet tamiri"],
  },
  {
    name: "Uncalı",
    h2: "Uncalı Mahallesi'nde Terzi",
    desc:
      "Uncalı sakinleri için elbise dikimi, fermuar değişimi, paça kısaltma ve ütü hizmeti. WhatsApp ile fotoğraf atın, fiyat öğrenin.",
    keywords: ["uncalı terzi", "uncalı elbise dikimi", "uncalı fermuar değişimi"],
  },
  {
    name: "Çakırlar",
    h2: "Çakırlar Mahallesi'nde Terzi",
    desc:
      "Çakırlar'dan Terzi Can'a ulaşın: kıyafet tamiri, elbise dikimi ve ütü işlemleri için hızlı randevu.",
    keywords: ["çakırlar terzi", "çakırlar kıyafet tamiri", "çakırlar elbise dikimi"],
  },
  {
    name: "Meltem",
    h2: "Meltem Mahallesi'nde Terzi",
    desc:
      "Meltem mahallesinde profesyonel terzi hizmeti. Bay bayan kıyafet dikimi, paça kısaltma, fermuar değişimi ve ütü.",
    keywords: ["meltem terzi", "meltem elbise dikimi", "meltem ütü hizmeti"],
  },
];

export default function KonyaaaltiTerziPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="konyaalti-page">

        {/* HERO */}
        <section className="hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Ana Sayfa</a>
              <span aria-hidden="true">/</span>
              <a href="/terzi">Terzi</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Konyaaltı</span>
            </nav>
            <h1>
              Konyaaltı Terzi — Elbise Dikimi, Tamiri &amp; Ütü Hizmeti
            </h1>
            <p className="hero-mahalleler">
              Hurma · Liman · Sarısu · Uncalı · Çakırlar · Meltem
            </p>
            <p className="hero-desc">
              Konyaaltı'nın tüm mahallelerinde <strong>elbise dikimi</strong>,{" "}
              <strong>kıyafet tamiri</strong>, paça kısaltma, fermuar değişimi ve{" "}
              <strong>ütü hizmeti</strong>. <strong>Terzi Can</strong> — Antalya'nın
              güvenilir terzi ustası.
            </p>
            <div className="cta-group">
              <a href={WHATSAPP_URL} className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp ile Randevu Al
              </a>
              <a href={MAPS_URL} className="btn-maps" target="_blank" rel="noopener noreferrer">
                📍 Google Maps'te Bul
              </a>
              <a href="tel:+905318986418" className="btn-phone">
                📞 0531 898 64 18
              </a>
            </div>
          </div>
        </section>

        {/* HİZMETLER */}
        <section className="services">
          <div className="container">
            <h2>Konyaaltı'nda Sunulan Terzi Hizmetleri</h2>
            <p className="section-sub">Tüm mahallelere hizmet — elbise dikimi, tamir, ütü ve tadilat</p>
            <div className="services-grid">
              {services.map((s) => (
                <div key={s.title} className="service-card">
                  <span className="service-icon" aria-hidden="true">{s.icon}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <a href={s.wa} target="_blank" rel="noopener noreferrer" className="card-cta">
                    Fiyat Al →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HER MAHALLEYE ÖZEL BÖLÜM */}
        <section className="mahalleler-section">
          <div className="container">
            <h2>Konyaaltı Mahallelerinde Terzi Can</h2>
            <p className="section-sub">Her mahalleye özel hizmet — hızlı ulaşım, güvenilir usta</p>
            <div className="mahalle-grid">
              {mahalleler.map((m) => (
                <article key={m.name} className="mahalle-card">
                  <div className="mahalle-header">
                    <span className="mahalle-pin">📍</span>
                    <h2 className="mahalle-h2">{m.h2}</h2>
                  </div>
                  <p className="mahalle-desc">{m.desc}</p>
                  <ul className="mahalle-keywords" aria-label={`${m.name} anahtar kelimeler`}>
                    {m.keywords.map((k) => (
                      <li key={k}>{k}</li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/905318986418?text=${encodeURIComponent(`Merhaba, ${m.name} mahallesindeyim, terzi hizmeti almak istiyorum.`)}`}
                    className="mahalle-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 {m.name}'da Randevu Al
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MAPS BÖLÜMÜ */}
        <section className="maps-section">
          <div className="container">
            <h2>Terzi Can'ı Haritada Bul</h2>
            <p className="section-sub">Konyaaltı, Antalya — Google Maps'te işletmemizi görüntüleyin</p>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="maps-link">
              <div className="maps-card">
                <div className="maps-icon">🗺️</div>
                <div className="maps-info">
                  <strong>Terzi Can — Konyaaltı, Antalya</strong>
                  <span>Google Maps'te Aç &amp; Yol Tarifi Al →</span>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* NEDEN TERZİ CAN */}
        <section className="why-us">
          <div className="container">
            <h2>Neden Konyaaltı'nda Terzi Can?</h2>
            <div className="why-grid">
              <div className="why-item">
                <span aria-hidden="true">🏆</span>
                <h3>Deneyimli Usta</h3>
                <p>Yılların verdiği tecrübeyle her kıyafete özel çözüm üretilir.</p>
              </div>
              <div className="why-item">
                <span aria-hidden="true">⚡</span>
                <h3>Hızlı Teslimat</h3>
                <p>Acil paça ve fermuar işlemlerinde aynı gün teslim mümkündür.</p>
              </div>
              <div className="why-item">
                <span aria-hidden="true">💬</span>
                <h3>WhatsApp Kolaylığı</h3>
                <p>Fotoğraf atın, anında fiyat öğrenin, randevunuzu alın.</p>
              </div>
              <div className="why-item">
                <span aria-hidden="true">📍</span>
                <h3>Tüm Mahallelere Hizmet</h3>
                <p>Hurma'dan Uncalı'ya, Meltem'den Çakırlar'a tüm Konyaaltı.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="faq">
          <div className="container">
            <h2>Sık Sorulan Sorular</h2>
            <div className="faq-list">
              <details>
                <summary>Hurma mahallesinde terzi nerede bulunur?</summary>
                <p>
                  Hurma'da elbise dikimi, paça kısaltma ve kıyafet tamiri için{" "}
                  <a href={WHATSAPP_URL}>WhatsApp'tan</a> ulaşabilirsiniz. Terzi Can olarak Hurma
                  sakinlerine hızlı ve güvenilir hizmet sunuyoruz.
                </p>
              </details>
              <details>
                <summary>Liman mahallesinde elbise dikimi yaptırabilir miyim?</summary>
                <p>
                  Evet. Liman mahallesi müşterilerimiz bay bayan elbise dikimi, takım elbise
                  tadilat ve fermuar değişimi için randevu alabilir.
                </p>
              </details>
              <details>
                <summary>Uncalı veya Sarısu'da paça kısaltma nereden yaptırılır?</summary>
                <p>
                  Terzi Can, Uncalı ve Sarısu mahallelerinden gelen müşterilere paça kısaltma,
                  fermuar tamiri ve tüm tadilat işlemlerini gerçekleştirmektedir.
                </p>
              </details>
              <details>
                <summary>Çakırlar ve Meltem'de terzi hizmeti alınabilir mi?</summary>
                <p>
                  Evet, Çakırlar ve Meltem mahalleleri hizmet bölgemiz içindedir. Elbise dikimi,
                  kıyafet tamiri ve ütü için WhatsApp ile randevu alabilirsiniz.
                </p>
              </details>
              <details>
                <summary>Konyaaltı'nda ütü hizmeti veren terzi var mı?</summary>
                <p>
                  Terzi Can'da takım elbise, düğün kıyafeti ve günlük giysiler için profesyonel
                  ütü hizmeti mevcuttur.
                </p>
              </details>
              <details>
                <summary>Fermuar değişimi kaç günde tamamlanır?</summary>
                <p>
                  Standart fermuar değişimleri 1–2 iş günü içinde tamamlanır. Acil durumlarda
                  aynı gün teslim mümkündür.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* SON CTA */}
        <section className="final-cta">
          <div className="container">
            <h2>Konyaaltı'nda Terzi Hizmeti İçin Hemen Ulaşın</h2>
            <p>
              Hurma, Liman, Sarısu, Uncalı, Çakırlar veya Meltem'deyseniz —<br />
              <strong>Terzi Can</strong> en yakın ustanız.
            </p>
            <div className="cta-group">
              <a href={WHATSAPP_URL} className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
                💬 WhatsApp: 0531 898 64 18
              </a>
              <a href={MAPS_URL} className="btn-maps" target="_blank" rel="noopener noreferrer">
                📍 Konumu Gör
              </a>
              <a href="tel:+905318986418" className="btn-phone">
                📞 Hemen Ara
              </a>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .konyaalti-page {
          font-family: var(--font-dm-sans, 'DM Sans', sans-serif);
          color: #1a1a1a;
          background: #fafafa;
        }
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }

        /* HERO */
        .hero {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
          color: #fff;
          padding: 3.5rem 0 3rem;
        }
        .breadcrumb {
          font-size: 0.8rem;
          color: #aab;
          margin-bottom: 1.5rem;
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .breadcrumb a { color: #c9a96e; text-decoration: none; }
        .breadcrumb a:hover { text-decoration: underline; }
        h1 {
          font-family: var(--font-playfair, 'Playfair Display', serif);
          font-size: clamp(1.6rem, 4vw, 2.6rem);
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 0.6rem;
          color: #fff;
        }
        .hero-mahalleler {
          color: #c9a96e;
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          margin: 0 0 1rem;
          font-weight: 500;
        }
        .hero-desc {
          color: #ccd;
          font-size: 1.05rem;
          max-width: 640px;
          margin: 0 0 2rem;
          line-height: 1.75;
        }
        .cta-group {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #25d366;
          color: #fff;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.95rem;
          transition: background 0.2s;
        }
        .btn-whatsapp:hover { background: #1ebe5d; }
        .btn-maps {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          border: 2px solid #c9a96e;
          color: #c9a96e;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .btn-maps:hover { background: #c9a96e; color: #1a1a2e; }
        .btn-phone {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255,255,255,0.12);
          color: #fff;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.95rem;
          transition: background 0.2s;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .btn-phone:hover { background: rgba(255,255,255,0.2); }

        /* ORTAK BAŞLIK */
        .services h2, .mahalleler-section h2, .maps-section h2,
        .why-us h2, .faq h2, .final-cta h2 {
          font-family: var(--font-playfair, 'Playfair Display', serif);
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          color: #1a1a2e;
          margin-bottom: 0.4rem;
          text-align: center;
        }
        .section-sub {
          text-align: center;
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 2.5rem;
        }

        /* HİZMETLER */
        .services {
          padding: 4rem 0;
          background: #fff;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        .service-card {
          background: #f7f7f9;
          border: 1px solid #e8e8ee;
          border-radius: 12px;
          padding: 1.5rem;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .service-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.09);
          transform: translateY(-2px);
        }
        .service-icon { font-size: 2rem; display: block; margin-bottom: 0.75rem; }
        .service-card h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 0.4rem;
        }
        .service-card p { font-size: 0.9rem; color: #555; margin: 0 0 1rem; line-height: 1.6; }
        .card-cta {
          font-size: 0.85rem;
          color: #c9a96e;
          font-weight: 600;
          text-decoration: none;
        }
        .card-cta:hover { text-decoration: underline; }

        /* MAHALLELER */
        .mahalleler-section {
          padding: 4rem 0;
          background: #f7f7f9;
        }
        .mahalle-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }
        .mahalle-card {
          background: #fff;
          border: 1px solid #e0e0e8;
          border-radius: 12px;
          padding: 1.5rem;
          transition: box-shadow 0.2s;
        }
        .mahalle-card:hover { box-shadow: 0 4px 18px rgba(0,0,0,0.08); }
        .mahalle-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .mahalle-pin { font-size: 1.2rem; }
        .mahalle-h2 {
          font-family: var(--font-playfair, 'Playfair Display', serif);
          font-size: 1.05rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }
        .mahalle-desc {
          font-size: 0.9rem;
          color: #555;
          line-height: 1.65;
          margin: 0 0 1rem;
        }
        .mahalle-keywords {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin: 0 0 1.25rem;
        }
        .mahalle-keywords li {
          background: #f0f0f5;
          border-radius: 20px;
          padding: 0.25rem 0.7rem;
          font-size: 0.75rem;
          color: #444;
          border: 1px solid #e0e0ea;
        }
        .mahalle-cta {
          display: inline-block;
          background: #25d366;
          color: #fff;
          padding: 0.6rem 1.1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s;
        }
        .mahalle-cta:hover { background: #1ebe5d; }

        /* MAPS */
        .maps-section {
          padding: 3rem 0;
          background: #fff;
        }
        .maps-link { text-decoration: none; display: block; }
        .maps-card {
          background: #1a1a2e;
          border-radius: 12px;
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          max-width: 600px;
          margin: 0 auto;
          transition: opacity 0.2s;
          cursor: pointer;
        }
        .maps-card:hover { opacity: 0.9; }
        .maps-icon { font-size: 3rem; flex-shrink: 0; }
        .maps-info {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          color: #fff;
        }
        .maps-info strong { font-size: 1rem; }
        .maps-info span { font-size: 0.875rem; color: #c9a96e; }

        /* NEDEN */
        .why-us {
          padding: 4rem 0;
          background: #f7f7f9;
        }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .why-item {
          text-align: center;
          padding: 1.5rem 1rem;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e8e8ee;
        }
        .why-item span { font-size: 2.25rem; display: block; margin-bottom: 0.75rem; }
        .why-item h3 { font-size: 0.95rem; font-weight: 700; color: #1a1a2e; margin: 0 0 0.5rem; }
        .why-item p { font-size: 0.875rem; color: #666; margin: 0; line-height: 1.6; }

        /* SSS */
        .faq {
          padding: 4rem 0;
          background: #fff;
        }
        .faq-list {
          max-width: 750px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        details {
          background: #f7f7f9;
          border: 1px solid #e0e0e8;
          border-radius: 10px;
          padding: 1rem 1.25rem;
        }
        summary {
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          color: #1a1a2e;
          list-style: none;
          padding-right: 1.5rem;
          position: relative;
        }
        summary::after {
          content: "+";
          position: absolute;
          right: 0;
          color: #c9a96e;
          font-size: 1.1rem;
        }
        details[open] summary::after { content: "−"; }
        details p {
          margin: 0.75rem 0 0;
          font-size: 0.9rem;
          color: #555;
          line-height: 1.65;
        }
        details a { color: #c9a96e; }

        /* SON CTA */
        .final-cta {
          padding: 4rem 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
          color: #fff;
          text-align: center;
        }
        .final-cta h2 { color: #fff; margin-bottom: 1rem; }
        .final-cta p {
          color: #ccd;
          font-size: 1.05rem;
          margin-bottom: 2rem;
          line-height: 1.75;
        }
        .final-cta .cta-group { justify-content: center; }
        .final-cta .btn-phone {
          background: rgba(255,255,255,0.12);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .final-cta .btn-phone:hover { background: rgba(255,255,255,0.22); }

        @media (max-width: 600px) {
          .cta-group { flex-direction: column; }
          .btn-whatsapp, .btn-maps, .btn-phone { justify-content: center; text-align: center; }
          .maps-card { flex-direction: column; text-align: center; padding: 1.5rem 1rem; }
        }
      `}</style>
    </>
  );
}
