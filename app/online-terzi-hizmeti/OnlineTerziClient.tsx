'use client';

import React, { useState } from 'react';

const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const WA_NUMBER = "905000000000";
const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export default function OnlineTerziClient() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  const faqs = [
    {
      q: "Siparişimi vermek için mağazaya gitmem gerekiyor mu?",
      a: "Hayır! Tüm süreç online yürür. Ölçülerinizi alır, modelinizi seçer ve WhatsApp üzerinden iletirsiniz. Ürününüz kapınıza teslim edilir."
    },
    {
      q: "Ölçülerim tam oturmadıysa ne yapabilirim?",
      a: "Tam uyum garantimiz kapsamında ücretsiz revizyon imkanı sunuyoruz. Ürünü iade eder, revize edilmiş halini teslim alırsınız."
    },
    {
      q: "Teslimat süresi ne kadar?",
      a: "Sipariş onayından sonra ortalama 7-10 iş günü içinde ürününüz hazır olur. Kargo süresiyle birlikte toplam 10-14 iş günü içinde elinizde olur."
    },
    {
      q: "Hangi kumaşlar kullanılıyor?",
      a: "Yalnızca %100 organik müslin ve keten kumaş kullanıyoruz. Tüm boyalar OEKO-TEX sertifikalı, kimyasal içermiyor."
    }
  ];

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-white antialiased">

      {/* ── TRUST BAR ── */}
      <div className="bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 text-center tracking-wide">
        ✨ %100 Organik Kumaş Garantisi &nbsp;|&nbsp; Antalya'dan Tüm Türkiye'ye Hızlı Teslimat &nbsp;|&nbsp; Ücretsiz Revizyon
      </div>

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 md:h-20">
          <a href="https://swaphubs.com/online-terzi-hizmeti" className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-slate-900 flex-shrink-0">
            SwapHubs <span className="font-light text-emerald-600">Terzi</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#koleksiyonlar" className="hover:text-emerald-600 transition">Modellerimiz</a>
            <a href="#olcu-rehberi" className="hover:text-emerald-600 transition">Ölçü Rehberi</a>
            <a href="#kurumsal" className="hover:text-emerald-600 transition">Kurumsal</a>
            <a href="#sss" className="hover:text-emerald-600 transition">SSS</a>
            <a
              href={waLink("Merhaba, e-terzi hizmetinizden yararlanmak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-bold transition flex items-center gap-2 shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Siparişe Başla
            </a>
          </nav>

          {/* Mobile CTA */}
          <a
            href={waLink("Merhaba, sipariş vermek istiyorum.")}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full font-bold text-sm transition flex items-center gap-1.5"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Sipariş
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-slate-50 to-emerald-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28 flex flex-col lg:flex-row items-center gap-12">

          {/* Text */}
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-xs mb-6 border border-emerald-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Yeni Nesil Dijital Terzi
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Tam Ölçünüze Göre{' '}
              <span className="text-emerald-600">Kusursuz Tasarımlar</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Evinizin konforundan ayrılmadan, kendi ölçülerinize birebir uyan organik müslin ve keten kıyafetlere sahip olun. İnceleyin, ölçünüzü alın ve WhatsApp'tan siparişinizi tamamlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a href="#koleksiyonlar" className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 rounded-full font-bold transition shadow-lg text-center">
                Koleksiyonu Keşfet
              </a>
              <a href="#olcu-rehberi" className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 px-7 py-3.5 rounded-full font-bold transition text-center">
                📏 Ölçü Rehberi
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold text-lg">✓</span>
                <span>Tam Uyum Garantisi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold text-lg">✓</span>
                <span>%100 Organik Kumaş</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold text-lg">✓</span>
                <span>Ücretsiz Revizyon</span>
              </div>
            </div>
          </div>

          {/* Hero Image – gradient fallback if image fails */}
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 md:h-[420px] lg:h-[500px] bg-gradient-to-br from-emerald-100 to-slate-200">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
                alt="Tekstil atölyesi ve kumaşlar"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-base flex-shrink-0">✓</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Tam Uyum Garantisi</p>
                  <p className="text-xs text-slate-500">Ücretsiz revizyon imkânı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KOLEKSİYONLAR ── */}
      <section id="koleksiyonlar" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Müslin & Keten Koleksiyonu</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Cildinize nefes aldıran, tamamen doğal kumaşlardan size özel dikilen tasarımlar.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Kadın Modelleri",
                tag: "Özel Dikim",
                tagColor: "bg-emerald-100 text-emerald-700",
                desc: "Rahat kesim müslin elbiseler, keten palazzo pantolonlar ve yazlık bluzlar.",
                img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format&fit=crop",
                msg: "Kadın müslin/keten modelleri hakkında bilgi almak istiyorum."
              },
              {
                title: "Erkek Modelleri",
                tag: null,
                desc: "Terletmeyen %100 keten gömlekler, rahat kesim şortlar ve tam bedeninize oturan ceketler.",
                img: "https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=600&auto=format&fit=crop",
                msg: "Erkek keten modelleri hakkında bilgi almak istiyorum."
              },
              {
                title: "Bebek & Çocuk",
                tag: "Antialerjik",
                tagColor: "bg-amber-100 text-amber-700",
                desc: "Hassas ciltler için kimyasal içermeyen, organik boyalı yumuşacık müslin tulum ve takımlar.",
                img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop",
                msg: "Bebek müslin kıyafetleri hakkında bilgi almak istiyorum."
              },
              {
                title: "Anne – Bebek",
                tag: null,
                desc: "Özel günler ve dış çekimler için birebir aynı kumaştan uyumlu set tasarımları.",
                img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop",
                msg: "Anne-bebek kombinleri hakkında bilgi almak istiyorum."
              }
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => { e.target.parentNode.style.background = 'linear-gradient(135deg,#d1fae5,#e2e8f0)'; e.target.style.display = 'none'; }}
                  />
                  {item.tag && (
                    <div className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow ${item.tagColor}`}>
                      {item.tag}
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 mb-5 flex-grow leading-relaxed">{item.desc}</p>
                  <a
                    href={waLink(item.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-center py-2.5 rounded-xl font-semibold transition text-sm"
                  >
                    İncele & Sipariş Ver
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÖLÇÜ REHBERİ ── */}
      <section id="olcu-rehberi" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-emerald-50 rounded-3xl p-8 md:p-14 flex flex-col lg:flex-row items-center gap-12 border border-emerald-100">
            <div className="lg:w-1/2 w-full">
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 mb-5">Ölçünü Al, Siparişini Ver</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Kusursuz bir kalıp için sadece 3 basit adım. Evdeki mezuranızla ölçülerinizi alın ve WhatsApp'tan bize iletin.
              </p>

              <div className="space-y-4">
                {[
                  { n: "1", title: "Göğüs & Omuz", desc: "Mezurayı göğsünüzün en geniş yerinden ve omuz hizasından çok sıkmadan ölçün." },
                  { n: "2", title: "Bel & Basen", desc: "Belinizin en ince noktasını ve baseninizin en geniş kısmını belirleyin." },
                  { n: "3", title: "Boy & İletişim", desc: "İstediğiniz etek/pantolon boyunu seçin ve ölçüleri WhatsApp'tan gönderin." }
                ].map((s) => (
                  <div key={s.n} className="flex bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base flex-shrink-0 mr-4">
                      {s.n}
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold mb-0.5">{s.title}</h4>
                      <p className="text-slate-500 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href={waLink("Merhaba, ölçülerimi aldım. Özel dikim siparişi vermek istiyorum.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fae53] text-white px-7 py-4 rounded-full font-bold transition shadow-xl text-base w-full sm:w-auto justify-center"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp'tan Ölçüleri Gönder
                </a>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="rounded-2xl overflow-hidden shadow-xl h-72 md:h-[420px] bg-gradient-to-br from-emerald-100 to-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800&auto=format&fit=crop"
                  alt="Ölçü alma rehberi"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KURUMSAL ── */}
      <section id="kurumsal" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-2 block">B2B Atölye Çözümleri</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Kurumsal Tekstil & Fason İmalat</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-14">
            İşletmeniz için yüksek kaliteli, logo nakışlı ve dayanıklı üniforma üretim hizmeti.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🏨", title: "Otel & Restoran", desc: "Şef ceketleri, barista önlükleri, resepsiyon ve kat görevlisi takımları. Kurumsal kimliğinize tam uyumlu toptan üretim.", msg: "Otel/Restoran kurumsal üniforma fason üretimi için fiyat almak istiyorum." },
              { icon: "🩺", title: "Medikal Scrubs", desc: "Hastaneler ve klinikler için terletmeyen, konforlu doktor/hemşire formaları. Alpaka ve likralı kumaş seçenekleri.", msg: "Medikal scrubs üretimi için toptan fiyat almak istiyorum." },
              { icon: "✂️", title: "Markalara Fason", desc: "Kendi giyim markanız için modelistlik, kesim, dikim, ütü ve etiketleme süreçlerini butik kalitesinde yönetiyoruz.", msg: "Markam için fason üretim detayları görüşmek istiyorum." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition duration-300 text-left flex flex-col">
                <div className="text-3xl mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>
                <a href={waLink(item.msg)} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 text-sm">
                  Teklif İste <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SSS ── */}
      <section id="sss" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Sık Sorulan Sorular</h2>
            <p className="text-slate-500">Merak ettikleriniz için hızlı yanıtlar.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center bg-white hover:bg-slate-50 transition font-semibold text-slate-900"
                >
                  <span>{faq.q}</span>
                  <span className={`text-emerald-600 font-bold text-xl transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed bg-slate-50 border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 pt-14 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h4 className="font-serif text-2xl text-white mb-3 font-bold">SwapHubs <span className="text-emerald-500 font-light italic">Terzi</span></h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Modern dijital altyapımızla geleneksel terzilik sanatını evinize getiriyoruz. Özel dikimden toptan fason üretime kadar tekstilde güvenilir çözüm ortağınız.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-5">Hızlı Bağlantılar</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#koleksiyonlar" className="hover:text-emerald-400 transition">Müslin & Keten Koleksiyonu</a></li>
              <li><a href="#olcu-rehberi" className="hover:text-emerald-400 transition">Ölçü Alma Rehberi</a></li>
              <li><a href="#kurumsal" className="hover:text-emerald-400 transition">Kurumsal Tekstil Çözümleri</a></li>
              <li><a href="#sss" className="hover:text-emerald-400 transition">Sık Sorulan Sorular</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-5">İletişim</h4>
            <div className="space-y-3 text-slate-400 text-sm">
              <p className="text-white font-semibold">📞 +90 500 000 00 00</p>
              <p>✉️ tekstil@swaphubs.com</p>
              <p>📍 Antalya, Türkiye</p>
              <p className="text-xs text-slate-500">Tüm illere kargo mevcuttur.</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-2">
          <p>© 2026 SwapHubs E-Terzi Platformu. Tüm Hakları Saklıdır.</p>
          <p>Antalya'dan 🇹🇷 Türkiye'ye</p>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href={waLink("Merhaba, e-terzi hizmeti hakkında bilgi almak istiyorum.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile iletişim"
        className="fixed bottom-5 right-5 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition z-50"
        style={{ boxShadow: '0 4px 20px rgba(37,211,102,0.45)' }}
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </div>
  );
}
