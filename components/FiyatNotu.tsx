'use client';
// Her sayfanın altında fiyat notu (sahip kararı, 26 Kasım 2026): fiyatlar başlangıç fiyatıdır, kesin fiyat kumaş ve
// işçilik detayına göre netleşir; KDV dahildir. İlk HTML'de sunucuda basılır (botlar ve yapay zekâ tarayıcıları da görür).
import { usePathname } from 'next/navigation';

const NOTE: Record<string, string> = {
  tr: 'Verilen fiyatlar başlangıç fiyatlarıdır; kesin fiyat kumaş ve işçilik detayına göre netleşir. Fiyatlara KDV dahildir.',
  en: 'Prices shown are starting prices; the final price depends on the fabric and the details of the work. Prices include VAT.',
  de: 'Die angegebenen Preise sind Ab-Preise; der Endpreis richtet sich nach Stoff und Arbeitsaufwand. Preise inkl. MwSt.',
  ru: 'Указаны цены «от»; окончательная цена зависит от ткани и сложности работы. Цены с НДС.',
  es: 'Los precios indicados son precios desde; el precio final depende de la tela y de los detalles del trabajo. IVA incluido.',
  fr: 'Les prix indiqués sont des prix de départ ; le prix final dépend du tissu et des détails du travail. TVA comprise.',
  pl: 'Podane ceny są cenami początkowymi; ostateczna cena zależy od tkaniny i zakresu pracy. Ceny zawierają VAT.',
  uk: 'Указано ціни «від»; остаточна ціна залежить від тканини та деталей роботи. Ціни з ПДВ.',
  nl: 'De genoemde prijzen zijn vanafprijzen; de definitieve prijs hangt af van de stof en de details van het werk. Prijzen incl. btw.',
  ar: 'الأسعار المذكورة هي أسعار ابتدائية؛ يتحدد السعر النهائي حسب القماش وتفاصيل العمل. الأسعار شاملة ضريبة القيمة المضافة.',
};
const langOf = (p: string) => {
  const seg = p.split('/')[1] ?? '';
  if (seg in NOTE) return seg;
  if (seg === 'online-tailor-service') return 'en';
  return 'tr';
};

export default function FiyatNotu() {
  const lang = langOf(usePathname() || '/');
  return (
    <p data-fiyat-notu="" style={{ maxWidth: 1100, margin: '1rem auto 0', padding: '0 1rem', fontSize: '.8rem', color: '#6b7280' }}>
      {NOTE[lang]}
    </p>
  );
}
