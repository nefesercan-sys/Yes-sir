// ============================================================
// lib/value-props.ts — Slogan, WhatsApp mesajı ve adım metinleri (TEK KAYNAK)
// Telefon/saat için lib/business.ts esas alınır; burada sadece metinler var.
// NOT: "7/24" veya "2 dakika" gibi tutulamayacak sözler bilerek YOK.
// ============================================================
export type Lang = 'tr' | 'en' | 'de' | 'ru';

export const WA_NUMBER = '905318986418';
export const PHONE_TEL = '+905318986418';

export interface ValueProp {
  id: string;
  slogan: string;
  badge: string;
  actionText: string;
  waTemplate: string;
}

export const HOURS_LINE: Record<Lang, string> = {
  tr: 'Her gün 08:00–23:00 · Eve ve otele servis ücretsiz',
  en: 'Every day 08:00–23:00 · Free home & hotel service',
  de: 'Täglich 08:00–23:00 · Hotel- und Hausservice kostenlos',
  ru: 'Ежедневно 08:00–23:00 · Выезд домой и в отель бесплатно',
};

export const CALL_LABEL: Record<Lang, string> = {
  tr: 'Ara', en: 'Call', de: 'Anrufen', ru: 'Позвонить',
};

export const STEPS: Record<Lang, [string, string, string]> = {
  tr: ['Fotoğraf gönder', 'Fiyatı öğren', 'Adrese teslim'],
  en: ['Send a photo', 'Get your quote', 'Delivered to you'],
  de: ['Foto senden', 'Preis erhalten', 'Lieferung zu Ihnen'],
  ru: ['Отправьте фото', 'Узнайте цену', 'Доставка по адресу'],
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
      slogan: 'Otele Terzi Çağır — Yerinde Ölçü, 24 Saatte Teslim',
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
      slogan: 'Call a Tailor to Your Hotel — Fitting On Site, 24h Delivery',
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
      slogan: 'Schneider ins Hotel bestellen — Lieferung in 24 Std.',
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
      slogan: 'Вызов портного в отель — доставка за 24 часа',
      badge: 'Для отелей',
      actionText: 'Вызвать портного в отель',
      waTemplate: 'Здравствуйте, хочу вызвать портного в мой отель в Анталии.',
    },
    {
      id: 'door-pickup',
      slogan: 'Выездной портной: заберём и доставим по адресу',
      badge: 'С выездом',
      actionText: 'Вызвать портного',
      waTemplate: 'Здравствуйте, заберите мою одежду по адресу и привезите после ремонта.',
    },
  ],
};

// Sayfaya özel hazır WhatsApp mesajı (Türkçe sayfalar için)
export type ServiceKey =
  | 'genel' | 'paca' | 'fermuar' | 'bay' | 'bayan'
  | 'otel' | 'kuru-temizleme' | 'dikis' | 'uniforma';

export const SERVICE_WA_TR: Record<ServiceKey, string> = {
  genel: 'Merhaba, kıyafetimin fotoğrafını gönderiyorum. Tadilat/dikim fiyatı alabilir miyim?',
  paca: 'Merhaba, paça kısaltma için pantolonun fotoğrafını gönderiyorum. Fiyat nedir?',
  fermuar: 'Merhaba, fermuar değişimi için fotoğraf gönderiyorum. Fiyat ve süre nedir?',
  bay: 'Merhaba, erkek kıyafeti dikim/tadilat için fiyat almak istiyorum. Fotoğraf gönderiyorum.',
  bayan: 'Merhaba, elbise/kadın giyim dikim ve tadilat için fiyat almak istiyorum. Fotoğraf gönderiyorum.',
  otel: 'Merhaba, kaldığım otele terzi çağırmak istiyorum. Otel adını ve konumu gönderebilirim.',
  'kuru-temizleme': 'Merhaba, kuru temizleme ve ütü için fiyat ve alım saati öğrenmek istiyorum.',
  dikis: 'Merhaba, dikiş atölyesi / seri üretim için teklif almak istiyorum.',
  uniforma: 'Merhaba, üniforma üretimi için model ve adet bilgisiyle fiyat almak istiyorum.',
};

export function waUrl(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
