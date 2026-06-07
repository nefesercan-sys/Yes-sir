import type { Metadata } from 'next';
import Image from 'next/image';

const SITE_URL = 'https://www.swaphubs.com/antalya-by-tailor-online-terzi-utu-hizmeti';
const PHONE = '+90 531 898 64 18';
const WHATSAPP_URL = 'https://wa.me/905318986418';

// ─── 1. METADATA & SEO OPTİMİZASYONU ──────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),
  title: 'Antalya Online Terzi & Ütü Hizmeti | Özel Dikim Atölyesi',
  description: 'Antalya tekstil dikiş atölyemizde bay-bayan özel elbise dikimi, tamir, tadilat, profesyonel ütü hizmeti ve kurumsal seri imalat. ☎ İletişim',
  keywords: [
    'antalya terzi dikim', 'terzi tamir tadilat', 'online terzi antalya',
    'elbise dikimi antalya', 'bay bayan kiyafet dikimi', 'kisiye ozel model tasarim',
    'tekstil dikis atolyesi', 'seri imalat tekstil', 'profesyonel utu hizmeti',
    'antalya fason dikim', 'abiye dikimi', 'gelinlik tadilati', 'konyaalti terzi atolye'
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      'tr': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: 'By Tailor Antalya | Online Terzi, Özel Dikim & Ütü Hizmeti',
    description: 'Kişiye özel model tasarımı, tamir, tadilat ve seri imalat tekstil çözümleri. Adresten alım ve kapıya teslimat seçeneğiyle.',
    url: SITE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: '/og/by-tailor-antalya.jpg', width: 1200, height: 630, alt: 'Antalya By Tailor Terzi ve Ütü Hizmetleri' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antalya Terzi Dikim & Seri İmalat Dikiş Atölyesi',
    description: 'Online terzi, kıyafet tamiri, elbise dikimi ve ütü hizmeti bir arada.',
    images: ['/og/by-tailor-antalya.jpg'],
  },
};

// ─── 2. GOOGLE YAPISAL VERİ (JSON-LD) ─────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}#business`,
      name: 'By Tailor Antalya — Online Terzi & Ütü Atölyesi',
      description: 'Antalya genelinde online terzi dikim, tamir, tadilat, kişiye özel elbise tasarımı, profesyonel ütü hizmeti ve tekstil dikiş atölyesi seri imalat çözümleri.',
      url: SITE_URL,
      telephone: '+905318986418',
      priceRange: '₺₺',
      image: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        }
      ],
      // Hata riskini sıfırlayan düzleştirilmiş hizmet kataloğu yapısı
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'By Tailor Terzilik ve Tekstil Hizmetleri',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Kişiye Özel Elbise Dikimi ve Model Tasarımı',
            description: 'Bay ve bayan giyim için kişiye özel model tasarımı, abiye, gelinlik ve günlük elbise dikimi.',
            availability: 'https://schema.org/InStock',
            price: '500',
            priceCurrency: 'TRY',
            additionalType: 'https://schema.org/Service'
          },
          {
            '@type': 'Offer',
            name: 'Kıyafet Tamir ve Tadilat Hizmetleri',
            description: 'Paça kısaltma, bel daraltma, ceket astar değişimi ve fermuar yenileme gibi her nevi tadilat işleri.',
            availability: 'https://schema.org/InStock',
            price: '150',
            priceCurrency: 'TRY',
            additionalType: 'https://schema.org/Service'
          },
          {
            '@type': 'Offer',
            name: 'Tekstil Dikiş Atölyesi Seri İmalat',
            description: 'Kurumsal firmalar, oteller ve markalar için toplu üretim, kesim, dikim, nakış ve seri imalat çözümleri.',
            availability: 'https://schema.org/InStock',
            additionalType: 'https://schema.org/Service'
          },
          {
            '@type': 'Offer',
            name: 'Profesyonel Ütü Hizmeti',
            description: 'Hassas kumaşlar, takım elbiseler ve abiyeler için endüstriyel ekipmanlarla adresten alımlı ütüleme servisi.',
            availability: 'https://schema.org/InStock',
            price: '50',
            priceCurrency: 'TRY',
            additionalType: 'https://schema.org/Service'
          }
        ]
      }
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Online terzi hizmeti için ölçülerimi nasıl ulaştırabilirim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WhatsApp üzerinden uzman terzimizle görüntülü seans planlayabilir veya halihazırda üzerinize tam oturan bir kıyafetinizi kargo/kurye ile Antalya Konyaaltı atölyemize gönderebilirsiniz.'
          }
        },
        {
          '@type': 'Question',
          name: 'Tekstil dikiş atölyenizde minimum seri imalat adetiniz nedir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Butik markalar, oteller ve restoranlar için fason dikiş ve seri imalat süreçlerimizde minimum üretim adetimiz modele bağlı olarak değişkenlik göstermektedir. Detaylar için numune çalışması yapabilmekteyiz.'
          }
        },
        {
          '@type': 'Question',
          name: 'Ütü hizmetinde adresten alım yapıyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, Antalya genelinde belirli hacmin üzerindeki terzi tadilat ve toplu ütü siparişleriniz için araçlı servisimizle kapınızdan alıp, kusursuz şekilde ütülenmiş olarak askıda teslim ediyoruz.'
          }
        }
      ]
    }
  ]
};

// ─── 3. ZENGİN KULLANICI ARAYÜZÜ (UI COMPONENT) ─────────────────────────────────
export default function OnlineTerziUtuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        {/* HERO SECTION */}
        <section className="relative bg-neutral-900 text-white py-20 px-4 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-amber-400 font-semibold tracking-widest text-sm uppercase block mb-3">
              SwapHubs Profesyonel Tekstil Atölyesi
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Antalya By Tailor <br />
              <span className="text-amber-400">Online Terzi & Ütü</span> Hizmeti
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Kişiye özel model tasarımlarından seri imalat tekstil üretimine, kusursuz tamir tadilattan endüstriyel ütü hizmetine kadar aradığınız profesyonel dikiş atölyesi kapınızda.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transition duration-300 flex items-center gap-2"
              >
                <span>WhatsApp ile Ölçü/Teklif Ver</span>
              </a>
              <a
                href={`tel:${PHONE.replace(/\s+/g, '')}`}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-full transition duration-300"
              >
                Hemen Ara: {PHONE}
              </a>
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        </section>

        {/* ÖNE ÇIKAN SEKTÖREL STRİP */}
        <div className="bg-amber-400 text-neutral-950 py-4 font-medium text-center px-4 overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="mx-4">🧵 Kişiye Özel Model Tasarım</span> • 
          <span className="mx-4">✂️ Bay & Bayan Kıyafet Dikimi</span> • 
          <span className="mx-4">📐 Profesyonel Tamir Tadilat</span> • 
          <span className="mx-4">💨 Endüstriyel Ütü Hizmeti</span> • 
          <span className="mx-4">🏭 Seri İmalat Dikiş Atölyesi</span>
        </div>

        {/* DETAYLI HİZMET SEÇENEKLERİ (RICH CONTENT) */}
        <section className="max-w-6xl mx-auto py-16 px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Neler Yapıyoruz? Aradığınız Tüm Tekstil Çözümleri</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Antalya dikiş atölyemizde master terzilerimizle hem bireysel kupon dikim hem de kurumsal hacimli üretim hatlarında kusursuz işçilik sunuyoruz.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Kart 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 relative">
                {/* Görsel placeholder - projenize göre Image src güncelleyebilirsiniz */}
                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white p-4 text-center font-semibold">
                  [Kişiye Özel Elbise Dikimi Görseli]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Kişiye Özel Model Tasarım & Elbise Dikimi</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hayal ettiğiniz tasarımı gerçeğe dönüştürüyoruz. Özel gün abiyeleri, gelinlik revizyonları, şık gece elbiseleri ve günlük bay-bayan premium kıyafet dikimi isteklerinizi ölçülerinize milimetrik uyum garantisiyle hazırlıyoruz.
                </p>
              </div>
            </div>

            {/* Kart 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white p-4 text-center font-semibold">
                  [Terzi Tamir Tadilat Görseli]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Profesyonel Tamir & Kusursuz Tadilat</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Gözden çıkarmak istemediğiniz kıyafetlerinizi baştan yaratın. Paça kısaltma, bel/omuz daraltma, modern kalıp adaptasyonları, fermuar ve astar değişimleri uzman ellerde orijinal dikiş yapısı bozulmadan tamamlanır.
                </p>
              </div>
            </div>

            {/* Kart 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white p-4 text-center font-semibold">
                  [Tekstil Dikiş Atölyesi Seri İmalat]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tekstil Dikiş Atölyesi & Seri İmalat</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Butik tekstil markalarına, otel, restoran ve kurumsal firmalara fason üretim çözümleri. Kalıp çıkarma, numune hazırlama, seri kesim ve yüksek standartlı toplu dikiş hatlarımızla projelerinizi zamanında teslim ediyoruz.
                </p>
              </div>
            </div>

            {/* Kart 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white p-4 text-center font-semibold">
                  [Profesyonel Ütü Hizmeti Görseli]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Online Profesyonel Ütü Hizmeti</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Kıyafetlerinizin duruşunu dikiş kadar gösteren unsurdur ütüdür. Atölyemizde yer alan sanayi tipi merkezi buharlı ütü sistemlerimiz ile en zorlu kumaşlar (keten, müslin, ipek, saten) deforme edilmeden kusursuzca jilet gibi ütülenir.
                </p>
              </div>
            </div>

            {/* Kart 5 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white p-4 text-center font-semibold">
                  [Bay & Bayan Kıyafet Dikimi]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Bay & Bayan Premium Giyim Üretimi</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Takım elbiseler, ceketler, gömlekler, pantolonlar ve custom tasarım giysiler. Cinsiyet ve kalıp sınırlaması olmaksızın, her vücut tipine ve anotomik yapıya özel, konforlu ve estetik lüks işçilik uyguluyoruz.
                </p>
              </div>
            </div>

            {/* Kart 6 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white p-4 text-center font-semibold">
                  [Araçlı Mobil Servis Görseli]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Adresten Alım & Kapıya Teslimat</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yoğun iş temponuzda terziye gitmeye vakit bulamıyorsanız, Antalya içi mobil araçlı By Tailor servisimiz adresinize gelerek tadilatlık veya ütülenecek ürünlerinizi teslim alır, işlem sonrası hijyenik koruyucu kılıflarla kapınıza teslim eder.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SSS BÖLÜMÜ (FAQ INTERACTIVE UI) */}
        <section className="bg-white py-16 px-4 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Sıkça Sorulan Sorular</h2>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-bold mb-2">Antalya içi fason dikim ve toplu numune yapıyor musunuz?</h4>
                <p className="text-gray-600 text-sm">Evet, dikiş atölyemizde kurumsal talepleriniz için öncelikle teknik detayları inceler, kumaş yapısına göre kalıp çıkartır ve onayınız için numune dikimi gerçekleştiririz.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-bold mb-2">Kendi kumaşımı getirip elbise diktirebilir miyim?</h4>
                <p className="text-gray-600 text-sm">Kesinlikle! İstediğiniz model tasarımına uygun satın aldığınız kumaşları atölyemize getirebilir ya da kuryeyle ulaştırarak hayalinizdeki bay-bayan kıyafet dikimini yaptırabilirsiniz.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-bold mb-2">Hassas abiye ve ceket ütülemelerinde risk var mı?</h4>
                <p className="text-gray-600 text-sm">Hayır. Endüstriyel buhar kazanlı vakumlu ütü tezgahlarımız parlatma, sarartma veya yanma riskini tamamen ortadan kaldırır. Kıyafetleriniz fabrikasyon formunda ütülenmektedir.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ALT CALL TO ACTION */}
        <section className="bg-neutral-900 text-white py-12 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Projeniz mi Var veya Hemen Tadilat mı Gerekiyor?</h3>
            <p className="text-gray-400 mb-6 text-sm md:text-base">Kişiye özel tekil siparişlerden, tekstil atölyesi dikiş hacimlerine kadar Antalya genelinde her zaman hızlı reaksiyon veriyoruz.</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 font-bold px-10 py-4 rounded-full shadow-lg transition duration-300"
            >
              Şimdi Destek ve Fiyat Al
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
