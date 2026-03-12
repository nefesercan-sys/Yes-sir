import { getDb } from '@/lib/mongodb';
import AnaSayfaClient from './AnaSayfaClient';
import Link from 'next/link';
import { ShieldCheck, Star, Zap, Crown, Gavel, CheckCircle, Briefcase, Timer, Wallet, Sparkles } from 'lucide-react';

export const revalidate = 60;

export default async function AnaSayfa() {
  let ilanlar: any[] = [];
  
  // 🚨 SİBER OPTİMİZASYON: İstatistikleri admin paneline taşıyacağımız için 
  // ana sayfada veritabanını boşuna yormuyoruz. Site artık şimşek gibi açılacak!
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
         
         {/* 👑 DİKKAT ÇEKİCİ ROZET (MÜŞTERİ İÇİN) */}
         <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm mb-8 shadow-sm border border-indigo-200">
           <Crown size={18} /> Patron Sensin, Hizmet Ayağına Gelsin!
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
             <Zap size={24} className="fill-white" /> Yönetim Sende, İlan Ver!
           </Link>
           <Link href="/ilanlar" className="px-10 py-5 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-black text-lg uppercase tracking-wider hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-3">
             Hizmetleri İncele
           </Link>
         </div>

         {/* ⚖️ İHALE USULÜ - GÜÇ MÜŞTERİDE BÖLÜMÜ */}
         <div className="mt-20 max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-indigo-950 rounded-[3rem] p-10 md:p-16 text-left shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 opacity-10">
              <Gavel size={300} className="text-white" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/30 text-indigo-200 font-bold text-sm mb-6 border border-indigo-400/30 backdrop-blur-sm uppercase tracking-widest">
                <Gavel size={16} /> İhale Usulü Teklif Sistemi
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Seçme Özgürlüğü <br/><span className="text-indigo-400">Senin Elinde.</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed mb-10 max-w-3xl">
                Verdiğin <strong className="text-white">"Hizmet almak istiyorum"</strong> ilanı ile en uygun fiyat, en kaliteli hizmet ve en önemlisi sana gelen teklifler adeta bir <strong className="text-indigo-300">ihale usulü</strong> ile yarışır!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-emerald-400 shrink-0 mt-1" size={24} />
                  <p className="text-gray-300 font-medium">Sana en uygun fiyatı vereni dilediğin gibi seç.</p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-emerald-400 shrink-0 mt-1" size={24} />
                  <p className="text-gray-300 font-medium">En kaliteli hizmeti taahhüt eden profesyonelle anlaş.</p>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-2xl font-black text-white italic tracking-wide">
                  "BU PLATFORMDA Kendini gerçekten değerli hissedeceksin! <br/>
                  Son sözü her zaman <span className="text-indigo-400">sen söyleyeceksin.</span>"
                </p>
              </div>
            </div>
         </div>

         {/* 💼 HİZMET VERENLER İÇİN BÖLÜM */}
         <div className="mt-10 max-w-5xl mx-auto bg-gradient-to-br from-emerald-600 to-teal-900 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <Briefcase size={400} className="text-white" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 text-white font-bold text-sm mb-6 border border-white/30 backdrop-blur-sm uppercase tracking-widest">
                <Wallet size={16} /> Hizmet Verenler İçin
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Müşteri Arama <br/>Derdine <span className="text-emerald-300">Son Ver!</span>
              </h2>
              <p className="text-lg md:text-xl text-emerald-50 font-medium leading-relaxed mb-10 max-w-3xl mx-auto">
                Bütün iş fırsatları tek ekranda, senin önünde! Yeter ki hizmet vermek iste. Zaman kaybetme; <strong className="text-white">işi seç, hizmetini sun ve anında para kazan!</strong>
              </p>

              <Link href="/ilanlar" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-emerald-700 rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-gray-50 hover:scale-105 transition-all shadow-xl">
                <Briefcase size={24} /> İş Fırsatlarını Gör
              </Link>
            </div>
         </div>
       </main>

       {/* 🌟 GERÇEK İLANLARIN EKRANA BASILDIĞI VİTRİN KISMI */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
         <div className="flex items-center gap-3 mb-10 border-b border-gray-200 pb-4">
           <Sparkles className="text-indigo-600" size={32} />
           <h2 className="text-3xl font-black text-gray-900 tracking-tight">Güncel Hizmet Talepleri</h2>
         </div>
         
         {/* Senin orijinal AnaSayfaClient bileşenini burada çağırıyoruz */}
         <AnaSayfaClient ilanlar={ilanlar} istatistik={istatistik} />
       </div>

    </div>
  );
}
