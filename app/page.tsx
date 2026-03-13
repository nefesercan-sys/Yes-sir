import { getDb } from '@/lib/mongodb';
import AnaSayfaClient from './AnaSayfaClient';
import Link from 'next/link';

export const revalidate = 60;

export default async function AnaSayfa() {
  let ilanlar: any[] = [];
  
  // 🚨 SİBER OPTİMİZASYON: İstatistikleri gizledik. Site artık şimşek gibi açılacak!
  let istatistik = { toplamIlan: 0, toplamUye: 0, toplamTeklif: 0 };

  try {
    const db = await getDb();
    
    // Sadece aktif vitrin ilanlarını çekiyoruz
    const ilanRaw = await db.collection('ilanlar')
      .find({ durum: 'aktif' })
      .sort({ createdAt: -1 })
      .limit(24)
      .toArray();
    
    ilanlar = JSON.parse(JSON.stringify(ilanRaw));
    
  } catch (error) {
    console.error("Siber Veritabanı Hatası:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white font-sans selection:bg-indigo-600 selection:text-white">
       
       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 text-center lg:pt-32">
         
         {/* 👑 DİKKAT ÇEKİCİ ROZET */}
         <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm mb-8 shadow-sm border border-indigo-200">
           <svg className="w-4 h-4 fill-indigo-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
           Patron Sensin, Hizmet Ayağına Gelsin!
         </div>
         
         {/* 🚀 LOGO & ANA SLOGAN */}
         <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-6 leading-tight">
           SwapHubs <br />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
             Hizmet Al & Ver İlan Havuzu
           </span>
         </h1>

         {/* 💡 ALT BİLGİLENDİRME METNİ */}
         <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
           İlan ver, en uygun ve en kaliteli hizmet teklifleri <span className="text-indigo-600 font-extrabold bg-indigo-50 px-2 py-1 rounded">ücretsiz</span> önüne gelsin. 
           Hizmet alan olarak patron sensin!
         </p>

         {/* 🚀 HAREKETE GEÇİRİCİ BUTONLAR (CTA) */}
         <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
           <Link href="/ilan-ver" className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
             <svg className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
             Yönetim Sende, İlan Ver!
           </Link>
           <Link href="/ilanlar" className="px-10 py-5 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-black text-lg uppercase tracking-wider hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-3">
             Hizmetleri İncele
           </Link>
         </div>

         {/* 🎯 VURUCU SÖZ KUTUSU */}
         <div className="mt-20 max-w-4xl mx-auto bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-indigo-100/50 relative overflow-hidden group hover:border-indigo-200 transition-colors">
           <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-indigo-500 to-purple-600"></div>
           <p className="text-xl md:text-3xl text-gray-800 font-black italic tracking-wide leading-relaxed">
             "BU PLATFORMDA kendini gerçekten değerli hissedeceksin! <br className="hidden md:block mt-2" />
             Son sözü her zaman <span className="text-indigo-600 underline decoration-wavy decoration-indigo-300 underline-offset-8">sen söyleyeceksin.</span>"
           </p>
         </div>

         {/* ⚖️ İHALE USULÜ - GÜÇ MÜŞTERİDE BÖLÜMÜ */}
         <div className="mt-16 max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-indigo-950 rounded-[3rem] p-10 md:p-16 text-left shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-10">
              <svg className="w-[250px] h-[250px] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/30 text-indigo-200 font-bold text-sm mb-6 border border-indigo-400/30 backdrop-blur-sm uppercase tracking-widest">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.5 1 6.5 2a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
                İhale Usulü Teklif Sistemi
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Seçme Özgürlüğü <br/><span className="text-indigo-400">Senin Elinde.</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed mb-10 max-w-3xl">
                Verdiğin <strong className="text-white">"Hizmet almak istiyorum"</strong> ilanı ile en uygun fiyat, en kaliteli hizmet ve en önemlisi sana gelen teklifler adeta bir <strong className="text-indigo-300">ihale usulü</strong> ile yarışır!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  <p className="text-gray-300 font-medium">Sana en uygun fiyatı vereni dilediğin gibi seç.</p>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  <p className="text-gray-300 font-medium">En kaliteli hizmeti taahhüt eden profesyonelle anlaş.</p>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-2xl font-black text-white italic tracking-wide">
                  "Sonunda sözü <span className="text-indigo-400">sen söyle!</span>"
                </p>
              </div>
            </div>
         </div>

         {/* ✨ ÜÇLÜ GÜVEN KARTLARI */}
         <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 fill-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">En Kaliteli Teklifler</h3>
              <p className="text-gray-600 font-medium leading-relaxed">İlanını oluşturduğunda, bütçene ve kalite standartlarına en uygun profesyonel teklifler anında önüne düşer.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.5 1 6.5 2a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">%100 Ücretsiz Önizleme</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Gelen teklifleri incelemek, profillere bakmak ve değerlendirmek tamamen ücretsizdir. Gizli maliyet asla yok.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Hizmet Ayağına Gelsin</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Yönetim sende! Sen sadece ne istediğini söyle. Hizmet verenler senin için yarışsın, son kararı patron olarak sen ver.</p>
            </div>
         </div>

       </main>

       {/* 🌟 GERÇEK İLANLARIN EKRANA BASILDIĞI VİTRİN KISMI */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
         <div className="flex items-center gap-3 mb-10 border-b border-gray-200 pb-4">
           <svg className="w-8 h-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
           <h2 className="text-3xl font-black text-gray-900 tracking-tight">Güncel Hizmet Talepleri</h2>
         </div>
         
         {/* Senin orijinal AnaSayfaClient bileşenini burada çağırıyoruz */}
         <AnaSayfaClient ilanlar={ilanlar} istatistik={istatistik} />
       </div>

    </div>
  );
}
