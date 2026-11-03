// swaphubs.com — "Fotoğrafla fiyat al" WhatsApp bandı (ES/FR/PL/UK/NL/AR). Sunucu bileşeni; botlar ham HTML'de bağlantıyı görür.
import { PHONE_TEL } from '@/lib/seo-data';
import type { ILang } from '@/lib/intl';

const T: Record<ILang, { slogan: string; btn: string; msg: string }> = {
  es: { slogan: 'Envíe una foto por WhatsApp y le decimos el precio', btn: 'Enviar foto, pedir precio', msg: 'Hola, le envío una foto de mi prenda. ¿Puede indicarme el precio del arreglo necesario?' },
  fr: { slogan: 'Envoyez une photo sur WhatsApp, recevez le prix', btn: 'Envoyer la photo', msg: "Bonjour, je vous envoie une photo de mon vêtement. Pouvez-vous m'indiquer le prix de la retouche ?" },
  pl: { slogan: 'Wyślij zdjęcie na WhatsApp, podamy cenę', btn: 'Wyślij zdjęcie', msg: 'Dzień dobry, wysyłam zdjęcie mojej odzieży. Jaka będzie cena poprawki?' },
  uk: { slogan: 'Надішліть фото у WhatsApp: швидко назвемо ціну', btn: 'Надіслати фото', msg: 'Добрий день, надсилаю фото одягу. Скільки коштуватиме потрібна робота?' },
  nl: { slogan: 'Stuur een foto via WhatsApp en ontvang snel een prijs', btn: 'Foto sturen, prijs vragen', msg: 'Hallo, ik stuur een foto van mijn kledingstuk. Wat kost de benodigde aanpassing?' },
  ar: { slogan: 'أرسل صورة عبر واتساب واعرف السعر بسرعة', btn: 'أرسل الصورة واسأل عن السعر', msg: 'مرحباً، أرسل صورة لملابسي. هل يمكنكم إخباري بسعر التعديل المطلوب؟' },
};

export default function PhotoBand({ lang }: { lang: ILang }) {
  const t = T[lang];
  return (
    <div id="hizli-eylem" lang={lang} dir={lang === 'ar' ? 'rtl' : undefined} style={{ background: '#1f5c47', color: '#fff', padding: '.55rem 1rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '.6rem 1rem', textAlign: 'center' }}>
        <span style={{ fontSize: '.92rem', fontWeight: 700 }}>{t.slogan}</span>
        <a href={`https://wa.me/${PHONE_TEL.replace('+', '')}?text=${encodeURIComponent(t.msg)}`} target="_blank" rel="noopener noreferrer"
          style={{ background: '#0F7B3C', color: '#fff', fontWeight: 800, fontSize: '.85rem', padding: '.4rem 1rem', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.btn}</a>
      </div>
    </div>
  );
}
