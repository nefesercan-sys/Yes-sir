// Tüm dillerde "otelinize geliyoruz" satırı + o dildeki otel servisi sayfasına bağlantı.
// Sunucu ve istemci bileşenlerinde kullanılabilir (veri sabit; ağır kütüphane içe aktarılmaz).
const TEXT: Record<string, { t: string; a: string }> = {
  tr: { t: "Otelinize ve evinize geliyoruz: Konyaaltı, Lara, Belek, Side ve Kemer'de alım-teslim.", a: 'Otele gelen terzi' },
  en: { t: 'We come to your hotel: pick-up and delivery in Konyaaltı, Lara, Belek, Side and Kemer.', a: 'Hotel tailor service' },
  de: { t: 'Wir kommen in Ihr Hotel: Abholung und Lieferung in Konyaaltı, Lara, Belek, Side und Kemer.', a: 'Schneider-Service im Hotel' },
  ru: { t: 'Приедем в ваш отель: забор и доставка в Коньяалты, Ларе, Белеке, Сиде и Кемере.', a: 'Портной в отель' },
  es: { t: 'Vamos a su hotel: recogida y entrega en Konyaaltı, Lara, Belek, Side y Kemer.', a: 'Sastre en su hotel' },
  fr: { t: 'Nous venons à votre hôtel : collecte et livraison à Konyaaltı, Lara, Belek, Side et Kemer.', a: "Couturier à l'hôtel" },
  pl: { t: 'Przyjedziemy do Twojego hotelu: odbiór i dostawa w Konyaaltı, Lara, Belek, Side i Kemer.', a: 'Krawiec w hotelu' },
  uk: { t: 'Приїдемо до вашого готелю: забір і доставка в Коньяалти, Ларі, Белеку, Сіде та Кемері.', a: 'Кравець у готель' },
  nl: { t: 'We komen naar uw hotel: ophalen en terugbrengen in Konyaaltı, Lara, Belek, Side en Kemer.', a: 'Kleermaker in uw hotel' },
  ar: { t: 'نأتي إلى فندقك: استلام وتسليم في كونيالتي ولارا وبيليك وسيدي وكيمير.', a: 'خياط إلى الفندق' },
};
const URL: Record<string, string> = {
  tr: '/terzi/eve-gelen-terzi-antalya',
  en: '/en/hotel-tailor-antalya',
  de: '/de/schneider-service-hotel-antalya',
  ru: '/ru/vyezdnoy-portnoy-antalya',
  es: '/es/sastre-hoteles-antalya',
  fr: '/fr/couturier-hotels-antalya',
  pl: '/pl/krawiec-hotele-antalya',
  uk: '/uk/kravets-hoteli-antalya',
  nl: '/nl/kleermaker-hotels-antalya',
  ar: '/ar/khayyat-fanadiq-antalya',
};
/** Bu yol bir otel servisi sayfası mı (o sayfada satır gösterilmez). */
export const isHotelPath = (p: string) =>
  Object.values(URL).some((u) => p === u || p.startsWith(u + '/')) || /^\/(es|fr|pl|uk|nl|ar)\/(sastre-hoteles|couturier-hotels|krawiec-hotele|kravets-hoteli|kleermaker-hotels|khayyat-fanadiq)-/.test(p);

export default function OtelServisSatiri({ lang = 'tr', color = 'inherit' }: { lang?: string; color?: string }) {
  const x = TEXT[lang] ?? TEXT.en;
  const href = URL[lang] ?? URL.en;
  return (
    <p style={{ margin: '6px 0 0', fontSize: 13, lineHeight: 1.45, color }}>
      🏨 {x.t}{' '}
      <a href={href} hrefLang={lang} style={{ color, fontWeight: 800, textDecoration: 'underline' }}>{x.a} {lang === 'ar' ? '←' : '→'}</a>
    </p>
  );
}
