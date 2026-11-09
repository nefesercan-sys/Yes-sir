// swaphubs.com — TR/EN/DE/RU online terzi sayfalarının tepesinde: kısa cevap + telefon (düz metin) + tel: + önceden doldurulmuş wa.me.
// Yapay zeka asistanları ve sesli arama için sayfa metninde numara ve WhatsApp bağlantısı açıkça bulunur. Sunucu bileşeni.
import { PHONE, PHONE_TEL } from '@/lib/seo-data';

type L = 'tr' | 'en' | 'de' | 'ru';
const T: Record<L, { short: string; cta: string; call: string; wa: string }> = {
  tr: { short: "Kısa cevap: kıyafetin fotoğrafını WhatsApp'tan +90 531 898 64 18 numarasına gönderin, fiyatı söyleyelim. Antalya'da otel ve evlere alım-teslim yapıyoruz (her gün 08:00–23:00); Antalya içi ve yurt dışı için kargoyla da hizmet veriyoruz.", cta: 'WhatsApp ile fotoğraf gönder', call: 'Ara', wa: 'Merhaba, kıyafetimin fotoğrafını gönderiyorum. Yapılacak işin fiyatını öğrenebilir miyim?' },
  en: { short: 'Short answer: send a photo of the garment on WhatsApp to +90 531 898 64 18 and we will tell you the price. We offer pick-up and delivery to hotels and homes in Antalya (every day 08:00–23:00); we also work by post within Antalya and from abroad.', cta: 'Send a photo on WhatsApp', call: 'Call', wa: 'Hello, I am sending a photo of my garment. Can you tell me the price for the work?' },
  de: { short: 'Kurz gesagt: Senden Sie ein Foto des Kleidungsstücks per WhatsApp an +90 531 898 64 18, wir nennen den Preis. Abholung und Lieferung zu Hotels und Wohnungen in Antalya sind möglich (täglich 08:00–23:00); per Paket arbeiten wir auch innerhalb Antalyas und aus dem Ausland.', cta: 'Foto per WhatsApp senden', call: 'Anrufen', wa: 'Guten Tag, ich sende ein Foto meines Kleidungsstücks. Was würde die Arbeit kosten?' },
  ru: { short: 'Коротко: пришлите фото вещи в WhatsApp на +90 531 898 64 18, и мы назовём цену. Забор и доставка в отели и дома Анталии доступны (каждый день 08:00–23:00); по почте работаем также по Анталье и из-за рубежа.', cta: 'Отправить фото в WhatsApp', call: 'Позвонить', wa: 'Здравствуйте, отправляю фото вещи. Сколько будет стоить работа?' },
};

export default function OnlineContactStrip({ lang }: { lang: L }) {
  const t = T[lang];
  return (
    <section lang={lang} style={{ maxWidth: 820, margin: '0 auto', padding: '1rem 1.25rem', fontFamily: 'system-ui,sans-serif', color: '#1C1814' }}>
      <p className="short-answer" style={{ background: '#F2EDE4', borderRadius: 8, padding: '.9rem 1.1rem', margin: '0 0 .8rem', lineHeight: 1.6 }}>{t.short}</p>
      <p style={{ margin: 0 }}>
        <a href={`https://wa.me/${PHONE_TEL.replace('+', '')}?text=${encodeURIComponent(t.wa)}`} target="_blank" rel="noopener noreferrer"
          style={{ background: '#15803d', color: '#fff', padding: '.7rem 1.3rem', fontWeight: 700, textDecoration: 'none', borderRadius: 4, display: 'inline-block' }}>💬 {t.cta}</a>
        {' '}<a href={`tel:${PHONE_TEL}`} dir="ltr" style={{ color: '#2C4A3E', fontWeight: 700, marginInlineStart: '.8rem', display: 'inline-block' }}>☎ {t.call}: {PHONE}</a>
      </p>
    </section>
  );
}
