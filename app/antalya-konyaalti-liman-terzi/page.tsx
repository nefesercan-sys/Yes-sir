import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Liman Terzi - Profesyonel Kıyafet Tadilatı ve Dikim | TERZİ Can',
  description: 'Konyaaltı Liman mahallesi sakinlerine özel terzilik hizmeti. Uzman kadromuzla kıyafet tamiri, abiye tadilatı, özel ölçü dikim ve ütüleme çözümleri. WhatsApp destek hattımız aktiftir.',
  alternates: { canonical: '[https://swaphubs.com/antalya-konyaalti-liman-terzi](https://swaphubs.com/antalya-konyaalti-liman-terzi)' },
}

export default function LimanTerziPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Liman Mahallesi Terzi ve Kıyafet Tadilat Merkezi</h1>
      
      <div className="prose lg:prose-lg text-gray-600 mb-8">
        <p>Antalya <strong>Liman Mahallesi</strong> sakinlerine özel, yüksek kaliteli ve kusursuz işçilikle terzilik hizmetleri sağlıyoruz. Yabancı ve yerli müşterilerimizin en çok tercih ettiği atölyemizde, en hassas kumaşlardan standart günlük giyime kadar tüm tekstil ürünlerinizde garantili tadilat ve dikim işlemleri yapılmaktadır.</p>
        <p>Liman bölgesinden atölyemizi ziyaret edebilir veya uzaktan ölçü vererek kargo destekli online terzi hizmetimizden faydalanabilirsiniz. Kıyafetleriniz bizimle her zaman ilk günkü gibi şık ve üzerinize tam oturacak şekilde hazırlanır.</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Liman Mahallesi Hızlı Terzi Hattı</h3>
        <p className="text-gray-600 mb-4">Tadilat veya dikim işleriniz için dükkanımıza gelmeden önce WhatsApp'tan randevu alabilir ve fiyat sorabilirsiniz.</p>
        <a 
          href="[https://wa.me/905318986418](https://wa.me/905318986418)" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-all text-lg"
        >
          WhatsApp ile Mesaj Gönder
        </a>
      </div>

      <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Liman'dan Atölyemize Yol Tarifi</h2>
        <div className="w-full aspect-video rounded-lg overflow-hidden relative">
          <iframe src="[https://maps.app.goo.gl/QEgSkRoA8Nz8H62g8?g_st=ac](https://maps.app.goo.gl/QEgSkRoA8Nz8H62g8?g_st=ac)" width="100%" height="100%" style={{ border: 0, position: 'absolute', top: 0, left: 0 }} allowFullScreen={true} loading="lazy" title="Terzi Can - Liman Harita Konumu"></iframe>
        </div>
      </div>
    </main>
  )
}
