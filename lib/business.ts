// ============================================================
// lib/business.ts — TEK DOĞRULUK KAYNAĞI (işletme bilgileri)
// Telefon, saat, adres burada değişir; tüm sayfalar buradan okur.
// NOT: Puan/yorum YOK. Gerçek ve doğrulanabilir yorumlar
// BusinessSchema'ya `reviews` prop'u ile verilir.
// ============================================================
export const SITE_URL = 'https://swaphubs.com';

export const BUSINESS = {
  id: `${SITE_URL}/terzi#business`,
  name: 'TERZİ Can Antalya Tailor Service', // Google profil adıyla birebir aynı
  legalShortName: 'Terzi Can',
  alternateName: [
    'Terzi Can',
    'TERZİ Can - Konyaaltı',
    'Terzi Can Antalya',
    'Tailor Can Antalya',
    'Портной Кан Анталья',
    'Schneider Can Antalya',
  ],
  phone: '+905318986418',
  phoneDisplay: '+90 531 898 64 18',
  priceRange: '$$',
  languages: ['tr', 'en', 'ru', 'de'],
  currencies: 'TRY, EUR, USD, RUB',
  payments: 'Cash, Credit Card, Bank Transfer',
  image: `${SITE_URL}/og/terzi-can.jpg`,
  address: {
    streetAddress: 'Hurma Mahallesi',
    addressLocality: 'Konyaaltı',
    addressRegion: 'Antalya',
    postalCode: '07130',
    addressCountry: 'TR',
  },
  // Google Haritalar'dan doğrulanıp güncellenmeli (sayfalarda farklı değerler var)
  geo: { latitude: 36.8615, longitude: 30.6095 },
  hours: { days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '08:00', closes: '22:00' },
  sameAs: ['https://share.google/dsCVIz116FhbjISfz'],
} as const;
