import { Metadata } from 'next';
import Script from 'next/script';

// ── SEO METADATA (Google Arama Sonuçlarında Görünecek Kısım) ──
export const metadata: Metadata = {
  title: 'Antalya Konyaaltı Terzi | Konyaaltı Terzi 05318986418 | Dikim Tamir Tadilat Ütü Hizmeti',
  description: 'Antalya Konyaaltı profesyonel terzi servisi. Özel elbise dikimi, tamir, tadilat ve ütü hizmeti. Hızlı servis için hemen arayın: 0531 898 64 18',
  keywords: 'antalya konyaaltı terzi, elbise dikim antalya, terzi tamir tadilat, konyaaltı ütü servisi, liman mahallesi terzi, hurma terzi, Konyaaltında terzi, fermuar tamiri, paca kisaltma terzi, bel daraltma, uncalı terzi, terzi fiyatlari',
  openGraph: {
    title: 'Konyaaltı Terzi, Elbise Dikim ve Tadilat Servisi - Antalya',
    description: 'Kapınıza teslim veya atölyemizde profesyonel terzi, özel dikim ve tadilat hizmetleri. İletişim: 0531 898 64 18',
    url: 'https://swaphubs.com/antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function KonyaaltiTerziPage() {
  const phoneNumber = '05318986418';
  const displayPhone = '0531 898 64 18';

  // ── MAHALLE LİSTESİ (Yerel SEO için kritik) ──
  const mahalleler = [
    'Liman Mahallesi', 'Hurma Mahallesi', 'Uncalı Mahallesi', 
    'Arapsuyu Mahallesi', 'Altınkum Mahallesi', 'Gürsu Mahallesi', 
    'Kuşkavağı Mahallesi', 'Öğretmenevleri Mahallesi', 'Pınarbaşı Mahallesi',
    'Sarısu Mahallesi', 'Toros Mahallesi', 'Uluç Mahallesi'
  ];

  // ── GOOGLE LOCAL BUSINESS SCHEMA (Google Haritalar ve Dizini için) ──
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Antalya Konyaaltı Terzi - Elbise Dikim, Tamir ve Tadilat",
    "image": "https://swaphubs.com/logo.png", // Kendi logonuzla değiştirin
    "@id": "https://swaphubs.com/antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat",
    "url": "https://swaphubs.com/antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat",
    "telephone": `+90${phoneNumber}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Konyaaltı",
      "addressLocality": "Antalya",
      "postalCode": "07070",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.8500, 
      "longitude": 30.6333 
    },
    "areaServed": mahalleler.map(m => ({
      "@type": "City",
      "name": m
    })),
    "priceRange": "₺₺",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Schema.org JSON-LD Enjeksiyonu */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* ── HERO BÖLÜMÜ ── */}
      <section className="bg-amber-800 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Antalya Konyaaltı Terzi Servisi
          </h1>
          <p className="text-xl text-amber-100 mb-8">
            Özel Elbise Dikimi, Tamir, Tadilat ve Ütü Hizmetleri
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={`tel:${phoneNumber}`} 
              className="bg-green-600 hover:bg-green-500 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Hemen Ara: {displayPhone}
            </a>
            <a 
              href={`https://wa.me/90${phoneNumber}?text=Merhaba,%20elbise%20dikim/tadilat%20hizmetiniz%20hakkında%20bilgi%20almak%20istiyorum.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-amber-800 hover:bg-gray-100 text-lg font-semibold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2 border border-amber-700"
            >
              WhatsApp'tan Yazın
            </a>
          </div>
        </div>
      </section>

      {/* ── HİZMETLER BÖLÜMÜ ── */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Neler Yapıyoruz?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow text-center">
            <div className="text-amber-700 text-5xl mb-4">👗</div>
            <h3 className="text-xl font-bold mb-3">Özel Elbise Dikimi</h3>
            <p className="text-gray-600">
              Vücut ölçülerinize ve zevkinize uygun abiye, günlük elbise, etek veya takım elbiseleri hayal ettiğiniz gibi dikiyoruz.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow text-center">
            <div className="text-amber-700 text-5xl mb-4">✂️</div>
            <h3 className="text-xl font-bold mb-3">Tamir & Tadilat</h3>
            <p className="text-gray-600">
              Daraltma, bollaştırma, paça boyu ayarı, fermuar ve astar değişimi gibi onarımlarla kıyafetlerinizi ilk günkü haline getiriyoruz.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow text-center">
            <div className="text-amber-700 text-5xl mb-4">👔</div>
            <h3 className="text-xl font-bold mb-3">Profesyonel Ütü</h3>
            <p className="text-gray-600">
              Evde ütülemekte zorlandığınız gömlek, takım elbise ve abiyeleri endüstriyel buharlı sistemimizle özenle ütülüyoruz.
            </p>
          </div>

        </div>
      </section>

      {/* ── HİZMET VERİLEN MAHALLELER (SEO İÇİN) ── */}
      <section className="bg-amber-50 py-12 px-4 border-y border-amber-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Konyaaltı'nda Hizmet Verdiğimiz Mahalleler</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {mahalleler.map((mahalle, index) => (
              <span key={index} className="bg-white px-4 py-2 rounded-full text-sm font-medium text-amber-800 border border-amber-200 shadow-sm">
                {mahalle}
              </span>
            ))}
          </div>
          <p className="mt-6 text-gray-500 text-sm">Hızlı iletişim ve servis için {displayPhone} numaralı hattan bize ulaşabilirsiniz.</p>
        </div>
      </section>

      {/* ── HARİTA VE İLETİŞİM ── */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">İletişim & Konum</h2>
            <ul className="space-y-6 text-lg">
              <li className="flex items-start gap-4">
                <span className="text-2xl mt-1">📞</span>
                <div>
                  <strong className="block text-gray-900">Telefon:</strong>
                  <a href={`tel:${phoneNumber}`} className="text-amber-700 font-bold hover:underline">{displayPhone}</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-2xl mt-1">📍</span>
                <div>
                  <strong className="block text-gray-900">Bölge:</strong>
                  <span className="text-gray-600">Konyaaltı, Antalya</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-2xl mt-1">⏰</span>
                <div>
                  <strong className="block text-gray-900">Çalışma Saatleri:</strong>
                  <span className="text-gray-600">Pzt - Cts: 09:00 - 19:00</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="md:w-1/2 h-80 md:h-auto bg-gray-200">
            {/* Google Haritalar'dan kendi işletmenizin embed kodunu buraya yapıştırabilirsiniz */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102148.88764132047!2d30.551717811342626!3d36.86608553018242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c391d1e4e6fb29%3A0xf6d6287e076dd033!2sKonyaalt%C4%B1%2FAntalya!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '300px' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Konyaaltı Terzi Harita Konumu"
            ></iframe>
          </div>

        </div>
      </section>
    </main>
  );
}
