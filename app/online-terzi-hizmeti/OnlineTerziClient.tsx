'use client';

import React, { useState } from 'react';

export default function OnlineTerziClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50 antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* ── ÜST BİLGİ BARI (TRUST BAR) ────────────────────────────── */}
      <div className="bg-emerald-700 text-white text-xs font-medium py-2 px-4 text-center tracking-wide">
        ✨ %100 Organik Kumaş Garantisi | Antalya'nın Kalbinden Tüm Türkiye'ye Hızlı Teslimat
      </div>

      {/* ── NAVBAR ────────────────────────────────  */}
      <header className="sticky top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <a href="https://swaphubs.com/online-terzi-hizmeti" className="font-serif text-3xl font-bold tracking-tight text-slate-900">
              SwapHubs <span className="font-light text-emerald-600">Terzi</span>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center text-sm font-semibold text-slate-600">
            <a href="#koleksiyonlar" className="hover:text-emerald-600 transition">Modellerimiz</a>
            <a href="#olcu-rehberi" className="hover:text-emerald-600 transition">Nasıl Ölçü Alınır?</a>
            <a href="#kurumsal" className="hover:text-emerald-600 transition">Kurumsal Üretim</a>
            
            <a 
              href="https://wa.me/905000000000?text=Merhaba, e-terzi hizmetinizden yararlanmak ve sipariş vermek istiyorum." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-bold transition flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              {/* WhatsApp SVG Icon */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.411 0 11.981 0c3.186.001 6.182 1.24 8.432 3.492 2.25 2.253 3.488 5.249 3.485 8.434-.006 6.632-5.357 11.98-11.931 11.98-1.933-.001-3.832-.471-5.527-1.371L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.016-5.079-2.865-6.93C16.315 2.023 13.858.999 11.24.999 5.836.999 1.436 5.4 1.433 10.805c-.001 1.563.411 3.091 1.196 4.469l-.986 3.604 3.698-.97c1.374.747 2.848 1.146 4.506 1.146zm10.425-7.139c-.197-.099-1.17-.578-1.353-.646-.182-.067-.315-.099-.448.099-.132.197-.513.646-.629.779-.114.133-.23.147-.426.049-.196-.099-.827-.305-1.575-.971-.582-.519-.974-1.16-.1.088-1.15-.133-.23-.115-.244-.229-.049-.015-.015-.074-.03-.115-.049-.042-.114-.315-.114-.411 0-.097.043-.129.083-.167.039-.039.088-.099.132-.148.044-.049.058-.082.088-.137.03-.055.015-.104-.007-.152-.022-.049-.182-.448-.25-.613-.065-.16-.13-.138-.182-.138-.048 0-.104-.006-.16-.006-.056 0-.148.021-.226.104-.077.083-.295.289-.295.704 0 .415.301.815.343.87.041.056.591.902 1.432 1.263.2.086.356.137.478.176.201.064.383.055.527.034.161-.024.536-.22.611-.431.074-.212.074-.394.052-.431-.022-.037-.083-.056-.28-.155z"/>
              </svg>
              Siparişe Başla
            </a>
          </nav>
        </div>
      </header>

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center py-16 lg:py-24 gap-12">
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-sm mb-6 border border-emerald-100">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Yeni Nesil Dijital Terzi
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Tam Ölçünüze Göre <br />
              <span className="text-emerald-600">Kusursuz Tasarımlar</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Evinizin konforundan ayrılmadan, kendi ölçülerinize birebir uyan organik müslin ve keten kıyafetlere sahip olun. İnceleyin, ölçünüzü alın ve WhatsApp'tan siparişinizi tamamlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#koleksiyonlar" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold transition shadow-xl flex items-center justify-center gap-2 text-center">
                Koleksiyonu Keşfet
              </a>
              <a href="#olcu-rehberi" className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-full font-bold transition flex items-center justify-center gap-2 text-center">
                📏 Ölçü Rehberi
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative w-full">
            <div className="absolute inset-0 bg-emerald-100 rounded-full blur-3xl opacity-50 transform translate-x-10 -translate-y-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1590135322960-914fb0f4b321?q=80&w=1000&auto=format&fit=crop" 
              alt="Aydınlık Tekstil Atölyesi ve Kumaşlar" 
              className="relative z-10 rounded-3xl shadow-2xl object-cover h-[500px] w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-slate-100">
              <div className="bg-emerald-100 p-2.5 rounded-full text-emerald-600 font-bold text-xl w-10 h-10 flex items-center justify-center">
                ✓
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Tam Uyum Garantisi</p>
                <p className="text-xs text-slate-500">Ücretsiz revizyon imkanı</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KOLEKSİYONLAR (VİTRİN - B2C) ──────────────────────────── */}
      <section id="koleksiyonlar" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-extrabold text-slate-900 mb-4">Müslin & Keten Koleksiyonu</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Cildinize nefes aldıran, tamamen doğal kumaşlardan size özel dikilen tasarım harikaları.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Kadın */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col">
              <div className="relative h-80 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format&fit=crop" alt="Kadın Müslin Giyim" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-emerald-700 text-xs font-bold px-3 py-1 rounded-full shadow">
                  Özel Dikim
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Kadın Modelleri</h3>
                <p className="text-sm text-slate-600 mb-6 flex-grow">Rahat kesim müslin elbiseler, keten palazzo pantolonlar ve tiril tiril yazlık bluzlar.</p>
                <a href="https://wa.me/905000000000?text=Kadın müslin/keten modelleri hakkında bilgi almak ve sipariş vermek istiyorum." target="_blank" className="w-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-center py-3 rounded-xl font-semibold transition">
                  İncele & Sipariş Ver
                </a>
              </div>
            </div>

            {/* Erkek */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col">
              <div className="relative h-80 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=600&auto=format&fit=crop" alt="Erkek Keten Gömlek" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Erkek Modelleri</h3>
                <p className="text-sm text-slate-600 mb-6 flex-grow">Terletmeyen %100 doğal keten gömlekler, rahat kesim şortlar ve tam bedeninize oturan ceketler.</p>
                <a href="https://wa.me/905000000000?text=Erkek keten modelleri hakkında bilgi almak ve sipariş vermek istiyorum." target="_blank" className="w-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-center py-3 rounded-xl font-semibold transition">
                  İncele & Sipariş Ver
                </a>
              </div>
            </div>

            {/* Bebek / Çocuk */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col">
              <div className="relative h-80 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop" alt="Bebek Müslin Tulum" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
                <div className="absolute top-4 left-4 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full shadow">
                  Antialerjik
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Bebek & Çocuk</h3>
                <p className="text-sm text-slate-600 mb-6 flex-grow">Hassas ciltler için kimyasal içermeyen, organik boyalı yumuşacık müslin tulum ve takımlar.</p>
                <a href="https://wa.me/905000000000?text=Bebek müslin kıyafetleri hakkında bilgi almak ve sipariş vermek istiyorum." target="_blank" className="w-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-center py-3 rounded-xl font-semibold transition">
                  İncele & Sipariş Ver
                </a>
              </div>
            </div>

            {/* Anne Kombinleri */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col">
              <div className="relative h-80 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop" alt="Anne Bebek Kombin" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Anne - Bebek</h3>
                <p className="text-sm text-slate-600 mb-6 flex-grow">Özel günler, dış çekimler ve günlük şıklık için birebir aynı kumaştan uyumlu set tasarımları.</p>
                <a href="https://wa.me/905000000000?text=Anne-bebek kombinleri hakkında bilgi almak ve sipariş vermek istiyorum." target="_blank" className="w-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-center py-3 rounded-xl font-semibold transition">
                  İncele & Sipariş Ver
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ÖLÇÜ ALMA VE WHATSAPP SİPARİŞ REHBERİ ─────────────────── */}
      <section id="olcu-rehberi" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-emerald-50 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 border border-emerald-100">
            <div className="lg:w-1/2 w-full">
              <h2 className="font-serif text-4xl font-extrabold text-slate-900 mb-6">Ölçünü Al, Siparişini Ver</h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                Kusursuz bir kalıp için sadece 3 basit adıma ihtiyacımız var. Evdeki mezuranızla ölçülerinizi alın ve model seçiminizle birlikte bize WhatsApp'tan iletin.
              </p>
              
              <div className="space-y-6">
                <div className="flex bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl flex-shrink-0 mr-4 shadow-inner">1</div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-lg mb-1">Göğüs & Omuz</h4>
                    <p className="text-slate-500 text-sm">Mezurayı göğsünüzün en geniş yerinden ve omuz hizasından çok sıkmadan ölçün.</p>
                  </div>
                </div>
                <div className="flex bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl flex-shrink-0 mr-4 shadow-inner">2</div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-lg mb-1">Bel & Basen</h4>
                    <p className="text-slate-500 text-sm">Belinizin en ince noktasını ve baseninizin en geniş kısmını mezura ile belirleyin.</p>
                  </div>
                </div>
                <div className="flex bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl flex-shrink-0 mr-4 shadow-inner">3</div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-lg mb-1">Boy & İletişim</h4>
                    <p className="text-slate-500 text-sm">İstediğiniz etek/pantolon boyunu belirleyin ve çıkan rakamları bize WhatsApp'tan gönderin.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <a 
                  href="https://wa.me/905000000000?text=Merhaba, ölçülerimi aldım. Özel dikim siparişi vermek istiyorum." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-3 bg-[#25D366] hover:bg-[#1fae53] text-white px-8 py-4 rounded-full font-bold transition shadow-xl text-lg w-full sm:w-auto"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.411 0 11.981 0c3.186.001 6.182 1.24 8.432 3.492 2.25 2.253 3.488 5.249 3.485 8.434-.006 6.632-5.357 11.98-11.931 11.98-1.933-.001-3.832-.471-5.527-1.371L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.016-5.079-2.865-6.93C16.315 2.023 13.858.999 11.24.999 5.836.999 1.436 5.4 1.433 10.805c-.001 1.563.411 3.091 1.196 4.469l-.986 3.604 3.698-.97c1.374.747 2.848 1.146 4.506 1.146zm10.425-7.139c-.197-.099-1.17-.578-1.353-.646-.182-.067-.315-.099-.448.099-.132.197-.513.646-.629.779-.114.133-.23.147-.426.049-.196-.099-.827-.305-1.575-.971-.582-.519-.974-1.16-.1.088-1.15-.133-.23-.115-.244-.229-.049-.015-.015-.074-.03-.115-.049-.042-.114-.315-.114-.411 0-.097.043-.129.083-.167.039-.039.088-.099.132-.148.044-.049.058-.082.088-.137.03-.055.015-.104-.007-.152-.022-.049-.182-.448-.25-.613-.065-.16-.13-.138-.182-.138-.048 0-.104-.006-.16-.006-.056 0-.148.021-.226.104-.077.083-.295.289-.295.704 0 .415.301.815.343.87.041.056.591.902 1.432 1.263.2.086.356.137.478.176.201.064.383.055.527.034.161-.024.536-.22.611-.431.074-.212.074-.394.052-.431-.022-.037-.083-.056-.28-.155z"/>
                  </svg>
                  WhatsApp'tan Ölçüleri Gönder
                </a>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <img 
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800&auto=format&fit=crop" 
                alt="Terzi Ölçü Alma Rehberi" 
                className="w-full rounded-[2rem] shadow-2xl object-cover h-[550px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── B2B KURUMSAL ÜRETİM & FASON DİKİM ────────────────────────── */}
      <section id="kurumsal" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-emerald-600 font-bold tracking-widest uppercase mb-2 block text-sm">B2B Atölye Çözümleri</span>
          <h2 className="font-serif text-4xl font-extrabold text-slate-900 mb-6">Kurumsal Tekstil & Fason İmalat</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-16 text-lg">
            İşletmeniz için profesyonel kimliğinizi yansıtan yüksek kaliteli, logo nakışlı ve dayanıklı üniforma üretim hizmeti sağlıyoruz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Otel */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition duration-300 text-left flex flex-col">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-6 text-emerald-600 font-bold">🏨</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Otel & Restoran</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">Şef ceketleri, barista önlükleri, resepsiyon ve kat görevlisi takımları. Firmanızın kurumsal kimliğine tam uyumlu toptan üretim.</p>
              <a href="https://wa.me/905000000000?text=Otel/Restoran kurumsal üniforma fason üretimi için fiyat almak istiyorum." target="_blank" className="font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1">Teklif İste <span className="text-lg">→</span></a>
            </div>
            
            {/* Medikal */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition duration-300 text-left flex flex-col">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-6 text-emerald-600 font-bold">🩺</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Medikal Scrubs</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">Hastaneler, klinikler ve estetik merkezleri için terletmeyen alpaka ve likralı kumaştan konforlu doktor/hemşire formaları.</p>
              <a href="https://wa.me/905000000000?text=Medikal scrubs üretimi için toptan fiyat almak istiyorum." target="_blank" className="font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1">Teklif İste <span className="text-lg">→</span></a>
            </div>

            {/* Butik Fason */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition duration-300 text-left flex flex-col">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-6 text-emerald-600 font-bold">✂️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Markalara Fason Üretim</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">Kendi giyim markanızı kuruyorsanız; modelistlik, kesim, dikim, ütü ve etiketleme süreçlerini butik kalitesinde yönetiyoruz.</p>
              <a href="https://wa.me/905000000000?text=Markam için fason üretim detayları görüşmek istiyorum." target="_blank" className="font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1">Teklif İste <span className="text-lg">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 pt-16 pb-8 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="font-serif text-2xl text-white mb-4 font-bold">SwapHubs <span className="text-emerald-500 font-light italic">Terzi</span></h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Modern dijital altyapımızla, geleneksel terzilik sanatını evinize getiriyoruz. Özel dikimden toptan fason üretime kadar tekstilde güvenilir çözüm ortağınız.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Hızlı Bağlantılar</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#koleksiyonlar" className="hover:text-emerald-400 transition">Kadın & Erkek Modelleri</a></li>
              <li><a href="#olcu-rehberi" className="hover:text-emerald-400 transition">Ölçü Alma Rehberi</a></li>
              <li><a href="#kurumsal" className="hover:text-emerald-400 transition">Kurumsal Tekstil Çözümleri</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Müşteri Destek Merkezi</h4>
            <div className="space-y-4 text-slate-400">
              <p className="text-white font-bold">📞 +90 500 000 00 00</p>
              <p>✉️  tekstil@swaphubs.com</p>
              <p>📍 Antalya, Türkiye (Tüm illere kargomuz mevcuttur)</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
          <p>&copy; 2026 SwapHubs E-Terzi Platformu. Tüm Hakları Saklıdır.</p>
        </div>
      </footer>
      
      {/* Sabit Hızlı Eylemler WhatsApp İkonu */}
      <a 
        href="https://wa.me/905000000000?text=Merhaba, e-terzi hizmeti hakkında bilgi almak istiyorum." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition z-50"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.411 0 11.981 0c3.186.001 6.182 1.24 8.432 3.492 2.25 2.253 3.488 5.249 3.485 8.434-.006 6.632-5.357 11.98-11.931 11.98-1.933-.001-3.832-.471-5.527-1.371L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.016-5.079-2.865-6.93C16.315 2.023 13.858.999 11.24.999 5.836.999 1.436 5.4 1.433 10.805c-.001 1.563.411 3.091 1.196 4.469l-.986 3.604 3.698-.97c1.374.747 2.848 1.146 4.506 1.146zm10.425-7.139c-.197-.099-1.17-.578-1.353-.646-.182-.067-.315-.099-.448.099-.132.197-.513.646-.629.779-.114.133-.23.147-.426.049-.196-.099-.827-.305-1.575-.971-.582-.519-.974-1.16-.1.088-1.15-.133-.23-.115-.244-.229-.049-.015-.015-.074-.03-.115-.049-.042-.114-.315-.114-.411 0-.097.043-.129.083-.167.039-.039.088-.099.132-.148.044-.049.058-.082.088-.137.03-.055.015-.104-.007-.152-.022-.049-.182-.448-.25-.613-.065-.16-.13-.138-.182-.138-.048 0-.104-.006-.16-.006-.056 0-.148.021-.226.104-.077.083-.295.289-.295.704 0 .415.301.815.343.87.041.056.591.902 1.432 1.263.2.086.356.137.478.176.201.064.383.055.527.034.161-.024.536-.22.611-.431.074-.212.074-.394.052-.431-.022-.037-.083-.056-.28-.155z"/>
        </svg>
      </a>
      
    </div>
  );
}
