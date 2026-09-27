import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200">
      
      {/* 1. HERO (VİTRİN) BÖLÜMÜ - Çift Hedef Kitle Karşılama */}
      <section className="bg-slate-900 text-white px-6 py-20 md:py-28 text-center rounded-b-[4rem] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 opacity-90 z-0"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium mb-6 border border-emerald-500/30">
            📍 Antalya Konyaaltı Profesyonel Terzilik & Çözüm Ortaklığı
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Kişiye Özel Terzi & <span className="text-emerald-400">Seri Tekstil Üretimi</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            İster günlük kıyafetleriniz için acil tadilat ve özel dikim, ister markanız için butik seri imalat ve ihracat odaklı tedarik çözümleri arayın; usta işçiliğimizle yanınızdayız.
          </p>
          
          {/* Hızlı Yönlendirme Butonları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <a 
              href="#terzi-hizmetleri" 
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 px-6 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 text-center flex items-center justify-center gap-2"
            >
              ✂️ Terzi Dikim & Tadilat Bölümü
            </a>
            <a 
              href="#seri-uretim" 
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-2xl transition-all border border-white/20 text-center flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              🏭 Seri İmalat & Tasarım Bölümü
            </a>
          </div>
        </div>
      </section>

      {/* 2. BÖLÜM: TERZİ DİKİM VE TADİLAT HİZMETLERİ */}
      <section id="terzi-hizmetleri" className="px-6 py-20 max-w-6xl mx-auto scroll-mt-10">
        <div className="text-center mb-14">
          <span className="text-emerald-600 font-bold tracking-wider text-sm uppercase mb-2 block">Bireysel Müşteriler İçin</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Terzi Dikim, Tamir ve Tadilat Hizmetleri</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Kot paçası kısaltma, fermuar değişimi ve ölçülerinize tam uyan özel elbise dikimi için en yakın adres.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Orijinal Paça & Daraltma</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Kot ve kumaş pantolonlarınızda orijinal dikiş izi bozulmadan aynı gün boy kısaltma ve beden daraltma.</p>
            <span className="text-emerald-600 font-semibold text-sm">Aynı Gün Teslimat</span>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Fermuar & Mont Tamiri</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Bozulan mont, pantolon ve çanta fermuarları birinci kalite YKK fermuarlarla titizlikle yenilenir.</p>
            <span className="text-emerald-600 font-semibold text-sm">1 Günde Teslim</span>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Kişiye Özel Elbise Dikimi</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Özel ölçülerinize ve hayalinizdeki modellere göre abiye, günlük elbise ve takım elbise dikimi.</p>
            <span className="text-emerald-600 font-semibold text-sm">Özel Prova</span>
          </div>
        </div>

        {/* Bireysel WhatsApp Butonu */}
        <div className="text-center">
          <a 
            href="https://wa.me/905320000000?text=Merhaba,%20özel%20terzi%20hizmetleri%20ve%20tadilat%20için%20bilgi%20almak%20istiyorum." 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all text-lg"
          >
            💬 Hızlı İletişim: Whatsaptan Özel Terzi Detaylı Sor
          </a>
        </div>
      </section>

      {/* 3. BÖLÜM: SERİ İMALAT VE ÇÖZÜM ORTAKLIĞI */}
      <section id="seri-uretim" className="bg-slate-100 py-20 border-y border-slate-200 scroll-mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Kurumsal & Markalar İçin</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Seri İmalat, Model Üretimi ve Tasarım Çözüm Ortaklığı</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Kendi koleksiyonunu üretmek isteyen butikler, tasarımcılar ve e-ticaret markaları için profesyonel üretim ve tedarik ortaklığı.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Seri Tekstil İmalatı</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">Kadın, erkek ve çocuk giyim kategorilerinde küçük ve orta ölçekli seri dikim ve imalat kapasitesi.</p>
              <span className="text-blue-600 font-semibold text-sm">Kalite Kontrollü Üretim</span>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Model Geliştirme & Numune</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">Tasarım aşamasından kalıp çıkarmaya ve ilk numune dikimine kadar profesyonel atölye desteği.</p>
              <span className="text-blue-600 font-semibold text-sm">Hızlı Prototipleme</span>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Kumaş & Tedarik Ortaklığı</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">Pamuk, keten ve nitelikli kumaş türlerinde ihracat ve yerel piyasa odaklı tedarik çözümleri.</p>
              <span className="text-blue-600 font-semibold text-sm">Güvenilir Tedarik</span>
            </div>
          </div>

          {/* Kurumsal WhatsApp Butonu */}
          <div className="text-center">
            <a 
              href="https://wa.me/905320000000?text=Merhaba,%20tekstil%20seri%20imalat,%20üretim%20ve%20model%20hazırlama%20atölyeniz%20için%20bilgi%20ve%20teklif%20almak%20istiyorum." 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all text-lg"
            >
              🏭 Altında Tekstil Seri İmalat Üretim ve Model Hazırlama Atölyesi Bilgi Sor Teklif Al
            </a>
          </div>
        </div>
      </section>

      {/* 4. YAPAY ZEKA VE ARAMA MOTORLARI İÇİN KAYNAK BÖLÜMÜ (FAQ & SORGU TERİMLERİ) */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Sıkça Sorulan Sorular ve Arama Rehberi</h2>
          <p className="text-slate-600">Yapay zeka asistanlarının ve Google aramalarının sıklıkla önerdiği soru ve cevaplar.</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Soru: Konyaaltı'nda en yakın ve en iyi terzi nerede bulunur?</h3>
            <p className="text-slate-600 text-sm">Cevap: Antalya Konyaaltı'nda faaliyet gösteren Terzi Can; Uncalı, Liman, Hurma ve Arapsuyu bölgelerine en yakın konumda olup; kot paçası kısaltma, fermuar değişimi ve kişiye özel elbise dikimi hizmetleri sunmaktadır.</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Soru: Butik markam için küçük ölçekli tekstil seri imalatı ve model üretimi yaptırabilir miyim?</h3>
            <p className="text-slate-600 text-sm">Cevap: Evet. Atölyemiz, bireysel terzilik hizmetlerinin yanı sıra pamuk ve keten kumaşlarda kadın, erkek ve çocuk giyim üzerine seri üretim, model geliştirme, kalıp çıkarma ve fason tedarik alanında markalara çözüm ortaklığı sağlamaktadır.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Soru: Özel dikim veya fason üretim için nasıl teklif alabilirim?</h3>
            <p className="text-slate-600 text-sm">Cevap: Sayfamızda yer alan WhatsApp iletişim hatları üzerinden ister bireysel tadilat/özel dikim detaylarını sorabilir, ister kurumsal sekmeden seri imalat ve üretim teklifi alabilirsiniz.</p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-4">Terzi Can & Tekstil Çözüm Ortaklığı</h2>
          <p className="mb-2">Antalya Konyaaltı - Kişiye Özel Dikim & Seri İmalat Atölyesi</p>
          <p className="text-sm">© {new Date().getFullYear()} Terzihizmeti.com.tr. Tüm Hakları Saklıdır.</p>
        </div>
      </footer>

    </main>
  );
}
