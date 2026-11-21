// ============================================================
// SwapHubs — lib/turist-acisi.ts
// swaphubs.com (21 Kasım 2026, sahibin kararı): yerli ve yabancı müşteri; ev, iş yeri ve otelden alım-teslim açısı.
// terzihizmeti.com.tr aynı hizmetleri "Antalya'daki müşteri, fiyat, hizmet" açısıyla anlatır; swaphubs ise
// sayfanın en üstünde (H1 ikinci satırı + doğrudan cevap paragrafı) müşterinin yaşadığı durumdan ve kapıdan alım-teslimden başlar.
// Böylece iki sitenin aynı konudaki sayfaları ilk okunan metinde birbirinin kopyası olmaz.
// Kural: yeni fiyat/süre sözü yok; süreler sayfada lib/business.ts'ten gelir. Ütü/kuru temizleme sözü yok.
// ============================================================

export type TLang = 'tr' | 'en' | 'ru' | 'de';

/** Hizmet sayfası H1'inin ikinci satırı. */
export const HOTEL_H1: Record<TLang, string> = {
  tr: 'Antalya · Eve ve Otele Gelir',
  en: 'Antalya · We Come to Your Home or Hotel',
  ru: 'Анталья · приедем домой или в отель',
  de: 'Antalya · Wir kommen nach Hause oder ins Hotel',
};

/** Hizmet sayfasının ilk cümlesi: tatildeki durum + otelden alım. */
export const TOURIST_LEAD: Record<string, Record<TLang, string>> = {
  paca: {
    tr: 'Yeni aldığınız pantolon ya da kot uzun mu geldi? Evinizden ya da otelinizden alıp kısaltıyoruz.',
    en: 'New trousers or jeans too long? We collect them from your home or hotel and shorten them.',
    ru: 'Новые брюки или джинсы длинноваты? Заберём из дома или отеля и подошьём.',
    de: 'Neue Hose oder Jeans zu lang? Wir holen sie zu Hause oder im Hotel ab und kürzen sie.',
  },
  kot: {
    tr: "Yeni aldığınız kotun paçası uzun mu? İsterseniz orijinal paçasını koruyarak kısaltıp evinize ya da otelinize getiriyoruz.",
    en: 'New jeans too long? We shorten them, keeping the original hem if you wish, and bring them back to your home or hotel.',
    ru: 'Новые джинсы длинноваты? Подошьём, при желании с сохранением фабричного края, и привезём домой или в отель.',
    de: 'Neue Jeans zu lang? Wir kürzen sie, auf Wunsch mit Originalsaum, und bringen sie nach Hause oder ins Hotel zurück.',
  },
  bel: {
    tr: 'Kıyafetiniz belden bol mu geldi? Fotoğrafını gönderin, evinizden ya da otelinizden alıp daraltalım.',
    en: 'Clothes loose at the waist? Send a photo; we collect them from your home or hotel and take them in.',
    ru: 'Одежда велика в талии? Пришлите фото — заберём из дома или отеля и ушьём.',
    de: 'Kleidung an der Taille zu weit? Foto senden – wir holen sie zu Hause oder im Hotel ab und machen sie enger.',
  },
  fermuar: {
    tr: 'Fermuar mı bozuldu? Pantolon, mont ve çantanızı evinizden ya da otelinizden alıp fermuarını değiştiriyoruz.',
    en: 'Broken zipper? We collect trousers, jackets and bags from your home or hotel and replace the zipper.',
    ru: 'Сломалась молния? Заберём брюки, куртку или сумку из дома или отеля и заменим молнию.',
    de: 'Reißverschluss kaputt? Wir holen Hose, Jacke oder Tasche zu Hause oder im Hotel ab und tauschen ihn aus.',
  },
  'elbise-dikim': {
    tr: 'Size özel bir elbise mi istiyorsunuz? Ölçüyü evde ya da otelde alabilir, modeli fotoğraftan konuşabiliriz.',
    en: 'Want a dress made to your measurements? We can take measurements at your home or hotel and agree the design from a photo.',
    ru: 'Хотите сшить платье по меркам? Мерки можем снять дома или в отеле, модель обсудим по фото.',
    de: 'Möchten Sie ein Kleid nach Maß nähen lassen? Maße nehmen wir zu Hause oder im Hotel, das Modell besprechen wir per Foto.',
  },
  'ozel-dikim': {
    tr: "Ölçünüze özel kıyafet diktirmek mi istiyorsunuz? Ölçü atölyede, evinizde ya da otelinizde alınır; Antalya dışına ve yurt dışına kargoyla da gönderilir.",
    en: 'Want clothes made to measure? Measurements can be taken at the workshop, your home or your hotel; we also ship within Turkey and abroad.',
    ru: 'Хотите сшить одежду по меркам? Мерки снимем в мастерской, дома или в отеле; отправляем также по Турции и за границу.',
    de: 'Kleidung nach Maß? Maße nehmen wir in der Werkstatt, bei Ihnen zu Hause oder im Hotel; Versand auch innerhalb der Türkei und ins Ausland.',
  },
  'elbise-tamir': {
    tr: 'Giyeceğiniz elbisede sökük mü var ya da bol mu geldi? Evinizden ya da otelinizden alıp hazırlıyoruz.',
    en: 'A dress you need soon has a torn seam or doesn’t fit? We collect it from your home or hotel and get it ready.',
    ru: 'Платье порвалось по шву или не по размеру? Заберём из дома или отеля и подготовим.',
    de: 'Das Kleid für Ihren Anlass hat eine offene Naht oder passt nicht? Wir holen es zu Hause oder im Hotel ab und machen es fertig.',
  },
  'gelinlik-abiye': {
    tr: "Düğün ya da nikâh için gelinlik veya abiye mi prova ediyorsunuz? Provayı evde ya da otelde yapabiliriz; fiyat fotoğrafa göre.",
    en: 'Wedding or evening dress for a ceremony? Fittings can be done at your home or hotel; the price is set by photo.',
    ru: 'Свадебное или вечернее платье для церемонии? Примерку можно провести дома или в отеле; цена по фото.',
    de: 'Braut- oder Abendkleid für eine Feier? Die Anprobe kann zu Hause oder im Hotel stattfinden; Preis per Foto.',
  },
  abiye: {
    tr: 'Gala ya da davet için abiyenizin boyu, beli ya da askısı ayar mı istiyor? Evinizden ya da otelinizden alıp aynı adrese teslim ediyoruz.',
    en: 'Evening gown for a gala or party needs its length, waist or straps adjusted? We collect from and deliver to your home or hotel.',
    ru: 'Вечернему платью для торжества нужна подгонка длины, талии или бретелей? Заберём и привезём домой или в отель.',
    de: 'Abendkleid für eine Gala braucht Änderung an Länge, Taille oder Trägern? Abholung und Lieferung zu Hause oder im Hotel.',
  },
  pantolon: {
    tr: 'Pantolonun beli, boyu ya da paçası mı uymadı? Evinizden ya da otelinizden alıp düzeltiyoruz.',
    en: 'Trousers don’t fit at the waist, length or leg? We collect them from your home or hotel and fix them.',
    ru: 'Брюки не подходят по талии, длине или ширине? Заберём из дома или отеля и подгоним.',
    de: 'Hose passt an Bund, Länge oder Bein nicht? Wir holen sie zu Hause oder im Hotel ab und ändern sie.',
  },
  kol: {
    tr: 'Ceket ya da gömlek kolu uzun mu? Evinizden ya da otelinizden alıp kısaltıyoruz.',
    en: 'Jacket or shirt sleeves too long? We collect it from your home or hotel and shorten them.',
    ru: 'Рукава пиджака или рубашки длинные? Заберём из дома или отеля и укоротим.',
    de: 'Ärmel an Sakko oder Hemd zu lang? Wir holen es zu Hause oder im Hotel ab und kürzen sie.',
  },
  takim: {
    tr: 'Düğün ya da iş toplantısı için takım elbiseniz ayar mı istiyor? Evinizden ya da otelinizden alıp giymeye hazır getiriyoruz.',
    en: 'Suit for a wedding or a meeting needs adjusting? We collect it from your home or hotel and bring it back ready to wear.',
    ru: 'Костюм к свадьбе или встрече требует подгонки? Заберём из дома или отеля и вернём готовым.',
    de: 'Anzug für Hochzeit oder Termin muss angepasst werden? Wir holen ihn zu Hause oder im Hotel ab und bringen ihn fertig zurück.',
  },
  mont: {
    tr: 'Mont ya da ceketin fermuarı, astarı ya da boyu mu sorun? Evinizden ya da otelinizden alıp tamir ediyoruz.',
    en: 'Problem with a coat or jacket zipper, lining or length? We collect it from your home or hotel and repair it.',
    ru: 'Проблема с молнией, подкладкой или длиной куртки? Заберём из дома или отеля и отремонтируем.',
    de: 'Probleme mit Reißverschluss, Futter oder Länge der Jacke? Wir holen sie zu Hause oder im Hotel ab und reparieren sie.',
  },
  gomlek: {
    tr: 'Gömlek bol mu, kolları uzun mu? Evinizden ya da otelinizden alıp daraltıyor, kısaltıyoruz.',
    en: 'Shirt too loose or sleeves too long? We collect it from your home or hotel and adjust it.',
    ru: 'Рубашка велика или длинные рукава? Заберём из дома или отеля и подгоним.',
    de: 'Hemd zu weit oder Ärmel zu lang? Wir holen es zu Hause oder im Hotel ab und passen es an.',
  },
  deri: {
    tr: "Yeni aldığınız deri ceket ya da pantolon uymadı mı? Kısaltma, daraltma ve tamir için evinizden ya da otelinizden alıyoruz.",
    en: 'New leather jacket or trousers don’t fit? We collect them from your home or hotel for shortening, taking in or repair.',
    ru: 'Новая кожаная куртка или брюки не подошли? Заберём из дома или отеля для укорачивания, ушивания или ремонта.',
    de: 'Neue Lederjacke oder -hose passt nicht? Wir holen sie zum Kürzen, Enger machen oder Reparieren zu Hause oder im Hotel ab.',
  },
  tisort: {
    tr: 'Tişört ya da şort bol mu, uzun mu? Evinizden ya da otelinizden alıp ayarlıyoruz.',
    en: 'T-shirt or shorts too big or too long? We collect them from your home or hotel and adjust them.',
    ru: 'Футболка или шорты велики или длинные? Заберём из дома или отеля и подгоним.',
    de: 'T-Shirt oder Shorts zu groß oder zu lang? Wir holen sie zu Hause oder im Hotel ab und ändern sie.',
  },
  etek: {
    tr: 'Etek uzun mu ya da belden bol mu? Evinizden ya da otelinizden alıp kısaltıyor, daraltıyoruz.',
    en: 'Skirt too long or loose at the waist? We collect it from your home or hotel and shorten or take it in.',
    ru: 'Юбка длинная или велика в талии? Заберём из дома или отеля, укоротим или ушьём.',
    de: 'Rock zu lang oder an der Taille zu weit? Wir holen ihn zu Hause oder im Hotel ab und kürzen oder engen ihn ein.',
  },
  'gece-kiyafeti': {
    tr: 'Bir davet için gece kıyafeti mi lazım? Dikim ya da tadilat için ölçüyü evde ya da otelde alabiliriz.',
    en: 'Need evening wear for an event? For making or alterations we can take measurements at your home or hotel.',
    ru: 'Нужен вечерний наряд к мероприятию? Для пошива или подгонки мерки снимем дома или в отеле.',
    de: 'Abendmode für ein Fest nötig? Für Anfertigung oder Änderung nehmen wir die Maße zu Hause oder im Hotel.',
  },
  'kiyafet-tamiri': {
    tr: 'Kıyafetiniz yırtıldı ya da söküldü mü? Fotoğrafını gönderin, evinizden ya da otelinizden alıp onaralım.',
    en: 'Clothes torn or a seam opened? Send a photo; we collect them from your home or hotel and mend them.',
    ru: 'Одежда порвалась или разошёлся шов? Пришлите фото — заберём из дома или отеля и починим.',
    de: 'Kleidung gerissen oder Naht offen? Foto senden – wir holen sie zu Hause oder im Hotel ab und reparieren sie.',
  },
  beden: {
    tr: 'Kıyafet bedeninize tam oturmuyor mu? Ölçüyü evde ya da otelde alıp ayarlıyoruz.',
    en: 'Clothes don’t quite fit your size? We take measurements at your home or hotel and adjust them.',
    ru: 'Одежда сидит не по фигуре? Снимем мерки дома или в отеле и подгоним.',
    de: 'Kleidung sitzt nicht richtig? Wir nehmen die Maße zu Hause oder im Hotel und passen sie an.',
  },
};

/** Bölge sayfasının ilk cümlesi (loc: "Hurma'da", "in Hurma", "в Хурме", "in Hurma"). */
export const districtLead = (lang: TLang, loc: string): string => ({
  tr: `${loc} evde, iş yerinde ya da otelde misiniz? Kıyafetin fotoğrafını WhatsApp'tan gönderin; kapınızdan ya da otel resepsiyonundan alıp geri getiriyoruz.`,
  en: `Living or staying ${loc}? Send a photo of the garment on WhatsApp; we collect it from your door or hotel reception and bring it back.`,
  ru: `Живёте или отдыхаете ${loc}? Пришлите фото вещи в WhatsApp — заберём от двери или со стойки отеля и вернём.`,
  de: `Wohnen oder Urlaub ${loc}? Schicken Sie ein Foto per WhatsApp; wir holen das Kleidungsstück an Ihrer Tür oder der Hotelrezeption ab und bringen es zurück.`,
}[lang]);
