export type Language = 'tr' | 'en' | 'de' | 'ru';

export interface ValueProp {
  id: string;
  badge: string;
  slogan: string;
  actionText: string;
  waTemplate: string;
}

export const VALUE_PROPS: Record<Language, ValueProp[]> = {
  tr: [
    {
      id: 'instant-quote',
      badge: '7/24 Canlı',
      slogan: "WhatsApp'tan Resim At, 2 Dakikada Fiyat Al!",
      actionText: 'Resim Gönder & Fiyat Sor',
      waTemplate: 'Merhaba, kıyafetimin fotoğrafını gönderiyorum. Tadilat/dikim fiyatı ve süresi alabilir miyim?',
    },
    {
      id: 'hotel-service',
      badge: 'Adrese & Otele Özel',
      slogan: 'Otelinize / Adresinize Terzi Çağırın — Ücretsiz Kurye & Ölçü',
      actionText: 'Otele / Adrese Terzi Çağır',
      waTemplate: 'Merhaba, bulunduğum adrese/otele terzi servisi almak istiyorum. Konum paylaşabilirim.',
    },
    {
      id: 'call-center',
      badge: 'Canlı Hat',
      slogan: '7/24 Terzi Çağrı Merkezi & Canlı Fiyat Hattı',
      actionText: 'Terziye Sor, Fiyat Al',
      waTemplate: 'Merhaba, terzi hizmeti hakkında soru sormak ve fiyat almak istiyorum.',
    },
  ],
  en: [
    {
      id: 'instant-quote',
      badge: '24/7 Active',
      slogan: 'Send a Photo via WhatsApp, Get an Instant Quote in 2 Mins!',
      actionText: 'Send Photo & Get Quote',
      waTemplate: 'Hello, I am sending a photo of my garment. Could you give me an estimated price and timeframe?',
    },
    {
      id: 'hotel-service',
      badge: 'Hotel Service',
      slogan: 'Call a Tailor to Your Hotel — Free Doorstep Pickup & Delivery',
      actionText: 'Request Hotel Tailor',
      waTemplate: 'Hello, I need tailor service at my hotel in Antalya. Please guide me.',
    },
  ],
  de: [
    {
      id: 'instant-quote',
      badge: '24/7 Active',
      slogan: 'Foto per WhatsApp senden, Angebot in 2 Min erhalten!',
      actionText: 'Foto per WhatsApp senden',
      waTemplate: 'Hallo, ich sende ein Foto meiner Kleidung. Können Sie mir einen Preis nennen?',
    },
    {
      id: 'hotel-service',
      badge: 'Hotel Service',
      slogan: 'Schneider ins Hotel bestellen — Kostenlose Abholung & Lieferung',
      actionText: 'Schneider bestellen',
      waTemplate: 'Hallo, ich benötige einen Schneiderservice in meinem Hotel in Antalya.',
    },
  ],
  ru: [
    {
      id: 'instant-quote',
      badge: '24/7 Активно',
      slogan: 'Пришлите фото в WhatsApp — Расчет цены за 2 минуты!',
      actionText: 'Отправить фото в WhatsApp',
      waTemplate: 'Здравствуйте, отправляю фото одежды. Подскажите стоимость и сроки ремонта?',
    },
    {
      id: 'hotel-service',
      badge: 'Выезд в отель',
      slogan: 'Вызов портного в отель — Бесплатный забор и доставка за 24 часа',
      actionText: 'Вызвать портного',
      waTemplate: 'Здравствуйте, мне нужен выездной портной в отель в Анталии.',
    },
  ],
};

export function getProps(lang: Language = 'tr'): ValueProp[] {
  return VALUE_PROPS[lang] || VALUE_PROPS.tr;
}
