import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* 1. HERO (VİTRİN) BÖLÜMÜ - Müşteriyi İlk Karşılayan Alan */}
      <section className="bg-slate-900 text-white px-6 py-20 md:py-28 text-center rounded-b-[3rem] shadow-xl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Konyaaltı'nın En İyi <span className="text-emerald-400">Özel Dikim</span> & Tadilat Terzisi
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Kıyafetleriniz mi yırtıldı? Paça kısaltma mı gerekiyor? Veya ölçülerinize tam uyan bir elbise mi istiyorsunuz? Terzi Can ile hızlı, kaliteli ve şeffaf fiyatlı hizmet alın.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:+905320000000" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              Acil Tamir İçin Ara
            </a>
            <a 
              href="https://maps.google.com/?q=Terzi+Can+Konyaalti" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition-colors border border-white/20 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Yol Tarifi Al
            </a>
          </div>
        </div>
      </section>

      {/* 2. HİZMETLER BÖLÜMÜ (Ekran görüntüsündeki kartların modernize edilmiş hali) */}
      <section className="px-6 py-16 max-w-5xl mx-auto -mt-10 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popüler Tadilat Hizmetleri</h2>
          <p className="text-gray-600">Fiyatlarımız kumaş türüne ve işçilik detayına göre şeffaf şekilde belirlenir.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Hizmet Kartı 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Orijinal Kot Paçası Kısaltma</h3>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Aynı Gün</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">Orijinal dikiş izi bozulmadan, fabrikanın çıkardığı kalitede boy kısaltma işlemi.</p>
            </div>
            <div className="text-right font-semibold text-emerald-600">Uygun Fiyat / Express</div>
          </div>

          {/* Hizmet Kartı 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Kumaş / Takım Elbise Paça</h3>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Aynı Gün</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">Klasik giyim standartlarına uygun, gizli dikiş tekniğiyle kumaş pantolon tadilatı.</p>
            </div>
            <div className="text-right font-semibold text-emerald-600">Şeffaf Fiyatlandırma</div>
          </div>

          {/* Hizmet Kartı 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Pantolon & Mont Fermuar</h3>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">1 Gün</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">Bozulan fermuarlarınız sökülür ve birinci kalite YKK fermuarlarla değiştirilir.</p>
            </div>
            <div className="text-right font-semibold text-emerald-600">Kaliteli YKK Fermuar</div>
          </div>

          {/* Hizmet Kartı 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Gelinlik & Abiye Daraltma</h3>
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">Proje Bazlı</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">Özel günleriniz için hassas kumaşlarda profesyonel prova ve ölçüye tam oturtma işlemi.</p>
            </div>
            <div className="text-right font-semibold text-emerald-600">Özel İşçilik</div>
          </div>
        </div>
      </section>

    </main>
  );
}
