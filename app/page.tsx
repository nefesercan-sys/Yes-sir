import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200">
      
      {/* 1. HERO (VİTRİN) BÖLÜMÜ - İlk İzlenim ve Hızlı Aksiyon */}
      <section className="bg-slate-900 text-white px-6 py-24 md:py-32 text-center rounded-b-[4rem] shadow-2xl relative overflow-hidden">
        {/* Arka plan efekti */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 opacity-80 z-0"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold mb-6 border border-emerald-500/30">
            📍 Konyaaltı'nda Aradığınız En Yakın Terzi
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Konyaaltı'nın En İyi <span className="text-emerald-400">Özel Dikim</span> & Tadilat Merkezi
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Elbiseniz mi yırtıldı? Paça kısaltma mı gerekiyor? Yoksa ölçülerinize tam uyan bir tasarım veya butiğiniz için seri üretim mi istiyorsunuz? Terzi Can ile usta işçilik ve şeffaf fiyat garantisi.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:+905320000000" 
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Acil Tamir İçin Ara
            </a>
            <a 
              href="https://maps.google.com/?q=Terzi+Can+Konyaalti" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all border border-white/20 flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Yol Tarifi Al
            </a>
          </div>
        </div>
      </section>

      {/* 2. BİREYSEL HİZMETLER BÖLÜMÜ */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Hızlı & Profesyonel Tadilat Hizmetleri</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Günlük kıyafetlerinizden özel gün abiyelerinize kadar her türlü kumaşta orijinal görünümü bozmadan işlem yapıyoruz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Kart 1 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all group">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Paça Kısaltma & Daraltma</h3>
            <p className="text-slate-500 mb-4 text-sm leading-relaxed">Kot, kumaş veya keten pantolonlarınızın boyunu orijinal dikiş izini koruyarak kısaltıyoruz. Beden daraltma işlemleri titizlikle yapılır.</p>
            <span className="text-emerald-600 font-semibold text-sm">Aynı Gün Teslimat</span>
          </div>

          {/* Kart 2 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all group">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Fermuar Değişimi</h3>
            <p className="text-slate-500 mb-4 text-sm leading-relaxed">Bozulan pantolon, mont veya çanta fermuarlarınızı uzun ömürlü ve kaliteli YKK fermuarlarla hızlıca değiştiriyoruz.</p>
            <span className="text-blue-600 font-semibold text-sm">Uygun Fiyat</span>
          </div>

          {/* Kart 3 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all group">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Kişiye Özel Elbise Dikimi</h3>
            <p className="text-slate-500 mb-4 text-sm leading-relaxed">Kişiye özel ölçüye göre elbise diktirmek istiyorsanız, hayalinizdeki modeli üzerinize kusursuz oturacak şekilde tasarlayıp dikiyoruz.</p>
            <span className="text-purple-600 font-semibold text-sm">Özel Prova</span>
          </div>
        </div>
      </section>

      {/* 3. KURUMSAL B2B & TEKSTİL ÜRETİMİ (SEO İÇİN ÇOK ÖNEMLİ) */}
      <section className="bg-slate-100 py-20 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-emerald-600 font-bold tracking-wider text-sm uppercase mb-2 block">Butik & Markalar İçin</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Küçük ve Orta Ölçekli Tekstil İmalatı</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Kendi markanız veya koleksiyonunuz için tekstil üretimi yapan firma mı arıyorsunuz? Antalya'daki dikiş atölyemizde pamuk, keten ve diğer kumaş türlerinde <strong>kadın giyimi, erkek giyimi ve çocuk giyimi</strong> üzerine model üretimi ve seri dikim yapıyoruz.
            </p>
            <ul className="space-y-3 text-slate-700 font-medium mb-8">
              <li className="flex items-center gap-3"><span className="text-emerald-500">✔</span> Fason Tekstil Üretimi</li>
              <li className="flex items-center gap-3"><span className="text-emerald-500">✔</span> Pamuk & Keten Kumaş Dikimi</li>
              <li className="flex items-center gap-3"><span className="text-emerald-500">✔</span> Numune ve Model Çıkarma</li>
            </ul>
            <a href="tel:+905320000000" className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-xl transition-colors">
              Atölye Fiyatı Alın
            </a>
          </div>
          <div className="bg-slate-200 rounded-3xl h-80 w-full flex items-center justify-center shadow-inner relative overflow-hidden">
            {/* Buraya atölyenizin bir fotoğrafını koyabilirsiniz. Şimdilik yer tutucu */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-400 opacity-20"></div>
            <p className="text-slate-500 font-medium z-10">Profesyonel Atölye Ekipmanları</p>
          </div>
        </div>
      </section>

      {/* 4. SIKÇA SORULAN SORULAR (FAQ - Google Aramaları İçin) */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Sıkça Sorulan Sorular</h2>
          <p className="text-slate-600">Müşterilerimizin Google'da en çok aradığı soruların cevapları.</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Kot pantolon boyu kısalttırmak istiyorum, paça kısaltma fiyatı ne kadar?</h3>
            <p className="text-slate-600 text-sm">Orijinal paça kısaltma işlemlerimiz kumaş türüne göre çok uygun fiyatlardan başlamaktadır. En net fiyat ve aynı gün teslimat bilgisi için atölyemize uğrayabilirsiniz.</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Ölçülerime göre kendime elbise diktirmek istiyorum, yardımcı oluyor musunuz?</h3>
            <p className="text-slate-600 text-sm">Evet, hayalinizdeki modeli ölçülerinize tam uyacak şekilde, istediğiniz kumaş türüyle özel olarak dikiyoruz. Bize bir fotoğraf veya çizim göstermeniz yeterli.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Bana en yakın terziyi arıyorum, tam olarak neredesiniz?</h3>
            <p className="text-slate-600 text-sm">Terzi Can atölyemiz Antalya Konyaaltı'ndadır. Uncalı, Liman, Hurma ve Arapsuyu bölgelerinden bize çok kolay bir şekilde ulaşabilirsiniz.</p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6">Terzi Can</h2>
          <p className="mb-4">Antalya, Konyaaltı - En İyi Terzi ve Dikim Atölyesi</p>
          <p className="text-sm">© {new Date().getFullYear()} Terzihizmeti.com.tr. Tüm Hakları Saklıdır.</p>
        </div>
      </footer>

    </main>
  );
}
