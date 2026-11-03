// ============================================================
// SwapHubs — lib/swaphubs-angle.ts
// swaphubs.com'un kendi açısı: "Terzi Can: önce fotoğraftan fiyat, sonra otel/ev kapısından alım-teslim".
// terzihizmeti.com.tr ise fiyat listesi ve rehber açısıyla yazılır; bu bölümler yalnızca swaphubs'ta vardır.
// Kural: sabit süre/fiyat sözü yok; süreler lib/business.ts DURATION'dan, servis kuralı SERVICE_RULE'dan gelir.
// ============================================================
import { DURATION, SERVICE_RULE } from '@/lib/business';

export type ALang = 'tr' | 'en' | 'ru' | 'de';
export type Angle = { h: string; p: string[]; steps: string[]; stepsH: string };

const STEPS_H: Record<ALang, string> = {
  tr: 'Terzi Can ile iş akışı', en: 'How a job runs with Terzi Can', ru: 'Как проходит заказ в Terzi Can', de: 'So läuft ein Auftrag bei Terzi Can',
};

/** Bölge sayfası: otel odası ve fotoğraftan teklif açısı. */
export function districtAngle(lang: ALang, n: string, loc: string): Angle {
  const R = SERVICE_RULE[lang].full;
  const D = DURATION[lang].all;
  const copy: Record<ALang, Angle> = {
    tr: {
      h: `${n} için fotoğraftan teklif, kapıdan teslim`,
      p: [
        `Terzi Can'da iş, kıyafet odanızdan çıkmadan önce konuşulur. Giysinin fotoğrafını çekin, otelinizin ya da sokağınızın adını WhatsApp'tan yazın; atölye fiyatı ve teslim gününü size geri yazar.`,
        `Teklifi onayladığınızda giysi ${loc} otelinizin resepsiyonundan ya da kapınızdan alınır, Hurma'daki atölyede hazırlanır ve aynı adrese geri getirilir. Ölçü gerektiren işlerde deneme için otelde buluşmak da mümkündür. ${R}`,
        D,
      ],
      steps: ['Fotoğrafı ve otel adını yazın', 'Fiyat ve gün size yazılı gelir', 'Giysi kapınızdan alınır', 'Hazır olunca aynı yere teslim edilir'],
      stepsH: STEPS_H.tr,
    },
    en: {
      h: `A photo quote first, then pick-up ${loc}`,
      p: [
        `At Terzi Can the job is agreed before the garment leaves your room. Photograph the piece, write the hotel name or your street on WhatsApp, and the workshop answers with a price and a ready date.`,
        `Once you accept, the garment is collected from your hotel reception or your door ${loc}, worked on in the Hurma workshop and brought back to the same address. When a job needs a fitting, we can meet you at the hotel. ${R}`,
        D,
      ],
      steps: ['Send a photo and your hotel name', 'Receive a written price and date', 'We collect the garment from your door', 'It comes back to the same place when ready'],
      stepsH: STEPS_H.en,
    },
    ru: {
      h: `Сначала цена по фото, потом забор вещи ${loc}`,
      p: [
        `В Terzi Can заказ согласуется ещё до того, как вещь покинет ваш номер. Сфотографируйте её, напишите в WhatsApp название отеля или улицы — мастерская ответит ценой и сроком.`,
        `После вашего согласия вещь забирают с ресепшена отеля или от двери ${loc}, делают в мастерской в Хурме и возвращают на тот же адрес. Если нужна примерка, можно встретиться в отеле. ${R}`,
        D,
      ],
      steps: ['Пришлите фото и название отеля', 'Получите цену и срок в сообщении', 'Вещь заберут от вашей двери', 'Готовую вернут на то же место'],
      stepsH: STEPS_H.ru,
    },
    de: {
      h: `Erst das Foto-Angebot, dann die Abholung ${loc}`,
      p: [
        `Bei Terzi Can wird der Auftrag geklärt, bevor das Kleidungsstück Ihr Zimmer verlässt. Fotografieren Sie das Teil, schreiben Sie Hotelname oder Straße per WhatsApp, und die Werkstatt antwortet mit Preis und Fertigtermin.`,
        `Nach Ihrer Zusage wird das Stück an der Rezeption Ihres Hotels oder an Ihrer Tür ${loc} abgeholt, in der Werkstatt in Hurma bearbeitet und zur selben Adresse zurückgebracht. Wenn eine Anprobe nötig ist, treffen wir uns im Hotel. ${R}`,
        D,
      ],
      steps: ['Foto und Hotelnamen senden', 'Preis und Termin schriftlich erhalten', 'Abholung direkt an Ihrer Tür', 'Rückgabe an dieselbe Adresse, sobald fertig'],
      stepsH: STEPS_H.de,
    },
  };
  return copy[lang];
}

/** Hizmet sayfası: o hizmetin fotoğraftan teklif akışı. */
export function serviceAngle(lang: ALang, nm: string): Angle {
  const R = SERVICE_RULE[lang].full;
  const copy: Record<ALang, Angle> = {
    tr: {
      h: `${nm}: fotoğrafla başlayın`,
      p: [
        `${nm} için atölyeye gitmenize gerek yok. Giysinin işlem yapılacak yerini gösteren bir fotoğraf ve otelinizin ya da adresinizin adı yeterlidir; fiyat ve gün WhatsApp'tan yazılı olarak gelir.`,
        `Onayınızdan sonra giysi kapınızdan alınır, atölyede işlenir ve geri getirilir. ${R}`,
      ],
      steps: ['İşlem yerini gösteren fotoğraf çekin', 'Fiyat ve günü onaylayın', 'Giysiyi kapınızdan teslim alalım', 'Hazır giysi aynı yere gelir'],
      stepsH: STEPS_H.tr,
    },
    en: {
      h: `${nm}: start with a photo`,
      p: [
        `You do not have to visit the workshop for ${nm.toLowerCase()}. A photo that shows the part to be worked on and the name of your hotel or street are enough; the price and date come back in writing on WhatsApp.`,
        `After you agree, the garment is collected from your door, worked on in the workshop and brought back. ${R}`,
      ],
      steps: ['Take a photo of the part to be altered', 'Confirm the price and date', 'We collect the garment from your door', 'The finished piece comes back to you'],
      stepsH: STEPS_H.en,
    },
    ru: {
      h: `«${nm}»: начните с фото`,
      p: [
        `Для услуги «${nm}» ехать в мастерскую не нужно. Достаточно фото места, которое нужно доработать, и названия отеля или улицы; цену и срок вы получите в WhatsApp письменно.`,
        `После вашего согласия вещь заберут от двери, сделают в мастерской и вернут. ${R}`,
      ],
      steps: ['Сфотографируйте место для работы', 'Подтвердите цену и срок', 'Вещь заберут от вашей двери', 'Готовую вещь вернут вам'],
      stepsH: STEPS_H.ru,
    },
    de: {
      h: `„${nm}“: mit einem Foto beginnen`,
      p: [
        `Für „${nm}“ müssen Sie nicht in die Werkstatt kommen. Ein Foto der zu ändernden Stelle und der Name Ihres Hotels oder Ihrer Straße genügen; Preis und Termin kommen schriftlich per WhatsApp.`,
        `Nach Ihrer Zusage wird das Stück an Ihrer Tür abgeholt, in der Werkstatt bearbeitet und zurückgebracht. ${R}`,
      ],
      steps: ['Foto der zu ändernden Stelle machen', 'Preis und Termin bestätigen', 'Abholung direkt an Ihrer Tür', 'Das fertige Stück kommt zu Ihnen zurück'],
      stepsH: STEPS_H.de,
    },
  };
  return copy[lang];
}

/** swaphubs'a özgü ek SSS (bölge ve hizmet sayfaları): fotoğraftan teklif ve otel odası kalıbı. */
export function angleFaq(lang: ALang, what: string): [string, string][] {
  const R = SERVICE_RULE[lang].full;
  return {
    tr: [
      [`${what} için önce fotoğraf göndermem gerekir mi?`, `Evet, en hızlı yol budur. Fotoğraf ve adres WhatsApp'tan gelince fiyat ve gün yazılı olarak size döner. ${R}`],
      [`Otel odamdan çıkmadan ${what} yaptırabilir miyim?`, `Evet. Giysi resepsiyondan ya da kapınızdan alınır ve hazır olunca aynı yere teslim edilir; deneme gerekiyorsa otelde buluşuruz.`],
    ],
    en: [
      [`Do I need to send a photo first for ${what}?`, `Yes, it is the fastest way. Once the photo and your address reach us on WhatsApp, the price and date come back in writing. ${R}`],
      [`Can I get ${what} done without leaving my hotel room?`, `Yes. The garment is collected from reception or your door and returned to the same place when ready; if a fitting is needed we meet you at the hotel.`],
    ],
    ru: [
      [`Нужно ли сначала присылать фото для услуги «${what}»?`, `Да, это самый быстрый путь. Когда фото и адрес приходят в WhatsApp, цена и срок возвращаются письменно. ${R}`],
      [`Можно ли заказать «${what}», не выходя из номера отеля?`, `Да. Вещь заберут с ресепшена или от двери и вернут на то же место; если нужна примерка, встретимся в отеле.`],
    ],
    de: [
      [`Muss ich für „${what}“ zuerst ein Foto senden?`, `Ja, das ist der schnellste Weg. Sobald Foto und Adresse per WhatsApp bei uns sind, kommen Preis und Termin schriftlich zurück. ${R}`],
      [`Kann ich „${what}“ erledigen lassen, ohne mein Hotelzimmer zu verlassen?`, `Ja. Das Stück wird an der Rezeption oder an Ihrer Tür abgeholt und zur selben Stelle zurückgebracht; bei Bedarf treffen wir uns zur Anprobe im Hotel.`],
    ],
  }[lang] as [string, string][];
}

/** Hizmetler ana sayfası (hub): Terzi Can iş akışı ve otel konuğu açısı. */
export function hubAngle(lang: ALang): Angle {
  const R = SERVICE_RULE[lang].full;
  const D = DURATION[lang].all;
  const copy: Record<ALang, Angle> = {
    tr: {
      h: 'Terzi Can: önce fotoğraf, sonra kapıdan alım',
      p: [
        `Bu sayfadaki her hizmet aynı yoldan yürür: giysinin fotoğrafını WhatsApp'tan gönderirsiniz, atölye fiyatı ve günü yazar, giysi otelinizden ya da evinizden alınır ve işlem bitince geri getirilir. ${R}`,
        D,
      ],
      steps: ['Fotoğrafı gönderin', 'Fiyat ve günü onaylayın', 'Giysi adresinizden alınır', 'Hazır giysi geri gelir'],
      stepsH: STEPS_H.tr,
    },
    en: {
      h: 'Terzi Can: photo first, pick-up from your door',
      p: [
        `Every service listed here follows the same path: you send a photo of the garment on WhatsApp, the workshop replies with a price and a date, the piece is collected from your hotel or home and brought back when the work is done. ${R}`,
        D,
      ],
      steps: ['Send the photo', 'Confirm price and date', 'We collect from your address', 'The finished garment comes back'],
      stepsH: STEPS_H.en,
    },
    ru: {
      h: 'Terzi Can: сначала фото, потом забор от двери',
      p: [
        `Каждая услуга на этой странице проходит один путь: вы присылаете фото вещи в WhatsApp, мастерская называет цену и срок, вещь забирают из отеля или дома и возвращают после работы. ${R}`,
        D,
      ],
      steps: ['Пришлите фото', 'Подтвердите цену и срок', 'Вещь заберут с вашего адреса', 'Готовую вещь вернут'],
      stepsH: STEPS_H.ru,
    },
    de: {
      h: 'Terzi Can: erst das Foto, dann die Abholung an der Tür',
      p: [
        `Jede Leistung hier läuft gleich ab: Sie senden ein Foto per WhatsApp, die Werkstatt nennt Preis und Termin, das Stück wird im Hotel oder zu Hause abgeholt und nach der Arbeit zurückgebracht. ${R}`,
        D,
      ],
      steps: ['Foto senden', 'Preis und Termin bestätigen', 'Abholung an Ihrer Adresse', 'Das fertige Stück kommt zurück'],
      stepsH: STEPS_H.de,
    },
  };
  return copy[lang];
}
