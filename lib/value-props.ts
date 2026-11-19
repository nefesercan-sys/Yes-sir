// ============================================================
// lib/value-props.ts — Slogan, WhatsApp mesajı ve adım metinleri (TEK KAYNAK)
// Telefon/saat için lib/business.ts esas alınır; burada sadece metinler var.
// NOT: "7/24" veya "2 dakika" gibi tutulamayacak sözler bilerek YOK.
// ============================================================
import { WA_NUMBER as WA_NUM, PHONE_E164, waUrl as bizWaUrl } from '@/lib/business';

export type Lang = 'tr' | 'en' | 'de' | 'ru' | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';

// Telefon/WhatsApp: lib/business.ts (tek kaynak); geriye dönük adlarla yeniden dışa aktarılır.
export const WA_NUMBER = WA_NUM;
export const PHONE_TEL = PHONE_E164;

export interface ValueProp {
  id: string;
  slogan: string;
  badge: string;
  actionText: string;
  waTemplate: string;
}

export const HOURS_LINE: Record<Lang, string> = {
  tr: "Her gün 08:00–23:00 · Eve ve otele servis",
  en: 'Every day 08:00–23:00 · Service to homes and hotels',
  de: 'Täglich 08:00–23:00 · Service zu Hause und im Hotel',
  ru: 'Ежедневно 08:00–23:00 · Выезд на дом и в отель',
  es: 'Todos los días 08:00–23:00 · Servicio a domicilio y hoteles',
  fr: 'Tous les jours 08:00–23:00 · Service à domicile et à l\'hôtel',
  pl: 'Codziennie 08:00–23:00 · Obsługa w domu i w hotelu',
  uk: 'Щодня 08:00–23:00 · Виїзд додому та в готель',
  nl: 'Elke dag 08:00–23:00 · Service thuis en in het hotel',
  ar: 'يومياً 08:00–23:00 · خدمة في المنزل والفندق',
};

export const CALL_LABEL: Record<Lang, string> = {
  tr: 'Ara', en: 'Call', de: 'Anrufen', ru: 'Позвонить',
  es: 'Llamar', fr: 'Appeler', pl: 'Zadzwoń', uk: 'Зателефонувати', nl: 'Bellen', ar: 'اتصل',
};

export const STEPS: Record<Lang, [string, string, string]> = {
  tr: ['Fotoğraf gönder', 'Fiyatı öğren', 'Adrese teslim'],
  en: ['Send a photo', 'Get your quote', 'Delivered to you'],
  de: ['Foto senden', 'Preis erhalten', 'Lieferung zu Ihnen'],
  ru: ['Отправьте фото', 'Узнайте цену', 'Доставка по адресу'],
  es: ['Envíe una foto', 'Reciba el precio', 'Recíbala'],
  fr: ['Envoyez une photo', 'Recevez le prix', 'Récupérez-le'],
  pl: ['Wyślij zdjęcie', 'Poznaj cenę', 'Odbierz'],
  uk: ['Надішліть фото', 'Дізнайтеся ціну', 'Отримайте річ'],
  nl: ['Stuur een foto', 'Ontvang de prijs', 'Ontvang het'],
  ar: ['أرسل صورة', 'اعرف السعر', 'استلم القطعة'],
};

export const VALUE_PROPS: Record<Lang, ValueProp[]> = {
  tr: [
    {
      id: 'instant-quote',
      slogan: "WhatsApp'tan Fotoğraf At, Hızlı Fiyat Al",
      badge: 'Hızlı Fiyat',
      actionText: 'Fotoğraf Gönder & Fiyat Sor',
      waTemplate: 'Merhaba, kıyafetimin fotoğrafını gönderiyorum. Tadilat/dikim fiyatı alabilir miyim?',
    },
    {
      id: 'hotel-service',
      slogan: 'Otele Terzi Çağır — Yerinde Ölçü, Otele Teslim',
      badge: 'Otellere Özel',
      actionText: 'Otele Terzi Çağır',
      waTemplate: 'Merhaba, kaldığım otele terzi çağırmak istiyorum. Otel adını ve konumu gönderebilirim.',
    },
    {
      id: 'door-pickup',
      slogan: 'Adresten Alıp Adrese Teslim Terzi Servisi',
      badge: 'Araçlı Servis',
      actionText: 'Terzi Çağır',
      waTemplate: 'Merhaba, adresimden giysi alıp tadilat sonrası adrese teslim etmenizi istiyorum.',
    },
    {
      id: 'ask',
      slogan: 'Terziye Sor, Fiyat Al',
      badge: 'Sor & Öğren',
      actionText: 'Terziye Sor',
      waTemplate: 'Merhaba, bir konuda fiyat ve bilgi almak istiyorum.',
    },
  ],
  en: [
    {
      id: 'instant-quote',
      slogan: 'Send a Photo via WhatsApp, Get a Quick Quote',
      badge: 'Quick Quote',
      actionText: 'Send Photo on WhatsApp',
      waTemplate: 'Hello, I am sending a photo of my garment. Could you give me an estimated price?',
    },
    {
      id: 'hotel-service',
      slogan: 'Call a Tailor to Your Hotel — Fitting On Site, Delivered Back',
      badge: 'Hotel Service',
      actionText: 'Call a Tailor to My Hotel',
      waTemplate: 'Hello, I need a tailor at my hotel in Antalya. I can send the hotel name and location.',
    },
    {
      id: 'door-pickup',
      slogan: 'Doorstep Pick-up & Delivery Tailor Service',
      badge: 'Door to Door',
      actionText: 'Request Pick-up',
      waTemplate: 'Hello, I would like you to pick up my clothes from my address and deliver them back after tailoring.',
    },
    {
      id: 'ask',
      slogan: 'Ask the Tailor, Get a Price',
      badge: 'Ask & Learn',
      actionText: 'Ask the Tailor',
      waTemplate: 'Hello, I would like to ask about a price.',
    },
  ],
  de: [
    {
      id: 'instant-quote',
      slogan: 'Foto per WhatsApp senden, schnell Preis erhalten',
      badge: 'Schnell-Angebot',
      actionText: 'Foto per WhatsApp senden',
      waTemplate: 'Hallo, ich sende ein Foto meiner Kleidung. Können Sie mir einen Preis nennen?',
    },
    {
      id: 'hotel-service',
      slogan: 'Schneider ins Hotel bestellen — Anprobe vor Ort, Lieferung zu Ihnen',
      badge: 'Hotelservice',
      actionText: 'Schneider ins Hotel',
      waTemplate: 'Hallo, ich möchte einen Schneider in mein Hotel in Antalya bestellen.',
    },
    {
      id: 'door-pickup',
      slogan: 'Abhol- und Lieferservice direkt an Ihre Tür',
      badge: 'Abholservice',
      actionText: 'Abholung anfragen',
      waTemplate: 'Hallo, bitte holen Sie meine Kleidung ab und liefern Sie sie nach der Änderung zurück.',
    },
  ],
  ru: [
    {
      id: 'instant-quote',
      slogan: 'Пришлите фото в WhatsApp — быстрый расчёт цены',
      badge: 'Быстрая цена',
      actionText: 'Отправить фото в WhatsApp',
      waTemplate: 'Здравствуйте, отправляю фото одежды. Подскажите стоимость ремонта?',
    },
    {
      id: 'hotel-service',
      slogan: 'Вызов портного в отель — мерки на месте, доставка к вам',
      badge: 'Для отелей',
      actionText: 'Вызвать портного в отель',
      waTemplate: 'Здравствуйте, хочу вызвать портного в мой отель в Анталье.',
    },
    {
      id: 'door-pickup',
      slogan: 'Выездной портной: заберём и доставим по адресу',
      badge: 'С выездом',
      actionText: 'Вызвать портного',
      waTemplate: 'Здравствуйте, заберите мою одежду по адресу и привезите после ремонта.',
    },
  ],
  es: [
    { id: 'instant-quote', slogan: "Envíe una foto por WhatsApp y le decimos el precio", badge: "Precio por foto", actionText: "Enviar foto, pedir precio", waTemplate: "Hola, le envío una foto de mi prenda. ¿Puede indicarme el precio del arreglo necesario?" },
  ],
  fr: [
    { id: 'instant-quote', slogan: "Envoyez une photo sur WhatsApp, recevez le prix", badge: "Prix sur photo", actionText: "Envoyer la photo", waTemplate: "Bonjour, je vous envoie une photo de mon vêtement. Pouvez-vous m'indiquer le prix de la retouche ?" },
  ],
  pl: [
    { id: 'instant-quote', slogan: "Wyślij zdjęcie na WhatsApp, podamy cenę", badge: "Cena po zdjęciu", actionText: "Wyślij zdjęcie", waTemplate: "Dzień dobry, wysyłam zdjęcie mojej odzieży. Jaka będzie cena poprawki?" },
  ],
  uk: [
    { id: 'instant-quote', slogan: "Надішліть фото у WhatsApp: швидко назвемо ціну", badge: "Ціна за фото", actionText: "Надіслати фото", waTemplate: "Добрий день, надсилаю фото одягу. Скільки коштуватиме потрібна робота?" },
  ],
  nl: [
    { id: 'instant-quote', slogan: "Stuur een foto via WhatsApp en ontvang snel een prijs", badge: "Prijs via foto", actionText: "Foto sturen, prijs vragen", waTemplate: "Hallo, ik stuur een foto van mijn kledingstuk. Wat kost de benodigde aanpassing?" },
  ],
  ar: [
    { id: 'instant-quote', slogan: "أرسل صورة عبر واتساب واعرف السعر بسرعة", badge: "السعر بالصورة", actionText: "أرسل الصورة واسأل عن السعر", waTemplate: "مرحباً، أرسل صورة لملابسي. هل يمكنكم إخباري بسعر التعديل المطلوب؟" },
  ],
};

// Sayfaya özel hazır WhatsApp mesajı (Türkçe sayfalar için)
export type ServiceKey =
  | 'genel' | 'paca' | 'fermuar' | 'bay' | 'bayan'
  | 'otel' | 'dikis' | 'uniforma';

export const SERVICE_WA_TR: Record<ServiceKey, string> = {
  genel: 'Merhaba, kıyafetimin fotoğrafını gönderiyorum. Tadilat/dikim fiyatı alabilir miyim?',
  paca: 'Merhaba, paça kısaltma için pantolonun fotoğrafını gönderiyorum. Fiyat nedir?',
  fermuar: 'Merhaba, fermuar değişimi için fotoğraf gönderiyorum. Fiyat ve süre nedir?',
  bay: 'Merhaba, erkek kıyafeti dikim/tadilat için fiyat almak istiyorum. Fotoğraf gönderiyorum.',
  bayan: 'Merhaba, elbise/kadın giyim dikim ve tadilat için fiyat almak istiyorum. Fotoğraf gönderiyorum.',
  otel: 'Merhaba, kaldığım otele terzi çağırmak istiyorum. Otel adını ve konumu gönderebilirim.',
  dikis: 'Merhaba, dikiş atölyesi / seri üretim için teklif almak istiyorum.',
  uniforma: 'Merhaba, üniforma üretimi için model ve adet bilgisiyle fiyat almak istiyorum.',
};

export function waUrl(text: string): string {
  return bizWaUrl(text);
}
