// swaphubs.com — "Bu işlem kargoyla da yapılabilir" KISA notu (10 dil). İşin kendi sayfasında, sayfa başına bir kez.
// Sahip kararı: tüm tamir/tadilat işleri WhatsApp'tan görüşülerek kargoyla yapılabilir. Kargo yalnızca Antalya içi ve yurt dışı; kargo ücreti müşteriye aittir.
// FİYAT, gün sayısı, mesafe, kargo firması adı YOK. 'Dikim' (özel dikim) sayfalarına eklenmez. İş adı ve cümle kalıbı (3 kalıp) sayfaya göre değişir.
import type { KargoLang } from '@/lib/kargo-terzi';
import type { ILang } from '@/lib/intl';

export const KARGO_KISA: Record<KargoLang, { t: string[]; tail: string; link: string }> = {
  tr: { t: ["{job}: dilerseniz kargoyla da yaptırabilirsiniz; WhatsApp'tan görüşülür.", "{job}: WhatsApp'tan görüşerek kargoyla da yaptırabilirsiniz.", "Yakında değilseniz: {job} işini WhatsApp'tan görüşerek kargoyla da yaptırabilirsiniz."], tail: "Kargo Antalya içi ve yurt dışı için geçerlidir; kargo ücretini müşteri öder.", link: "Kargoyla hizmet" },
  en: { t: ["{job}: if you prefer, you can also have it done by post, arranged on WhatsApp.", "{job}: can also be done by post, arranged on WhatsApp.", "Not nearby? {job}: send it by post, arranged on WhatsApp."], tail: "Shipping covers Antalya and international customers; the customer pays for shipping.", link: "Service by post" },
  ru: { t: ["{job}: при желании это можно сделать и по почте — по договорённости в WhatsApp.", "{job}: можно выполнить и по почте, обсудив в WhatsApp.", "Вы не рядом? {job}: отправьте по почте, обсудив детали в WhatsApp."], tail: "Доставка действует внутри Антальи и из-за рубежа; доставку оплачивает клиент.", link: "Услуга по почте" },
  de: { t: ["{job}: auf Wunsch auch per Post möglich, nach Absprache über WhatsApp.", "{job}: lässt sich auch per Post erledigen, nach Absprache über WhatsApp.", "Nicht in der Nähe? {job}: per Post senden, nach Absprache über WhatsApp."], tail: "Der Versand gilt innerhalb von Antalya und aus dem Ausland; die Versandkosten trägt der Kunde.", link: "Service per Post" },
  es: { t: ["{job}: si lo prefiere, también por envío, acordándolo por WhatsApp.", "{job}: también puede hacerse por envío, acordándolo por WhatsApp.", "¿No está cerca? {job}: envíelo por correo, acordándolo por WhatsApp."], tail: "El envío es para Antalya y el extranjero; el cliente paga el envío.", link: "Servicio por envío" },
  fr: { t: ["{job} : si vous préférez, aussi par envoi, après échange sur WhatsApp.", "{job} : peut aussi se faire par envoi, après échange sur WhatsApp.", "Vous n'êtes pas sur place ? {job} : envoyez-le par colis, après échange sur WhatsApp."], tail: "L'envoi concerne Antalya et l'étranger ; les frais d'envoi sont à la charge du client.", link: "Service par envoi" },
  pl: { t: ["{job}: jeśli wolisz, także wysyłkowo, po ustaleniu przez WhatsApp.", "{job}: można też zlecić wysyłkowo, po ustaleniu przez WhatsApp.", "Nie jesteś w pobliżu? {job}: wyślij kurierem, po ustaleniu przez WhatsApp."], tail: "Wysyłka dotyczy Antalyi i zagranicy; koszt przesyłki ponosi klient.", link: "Usługa wysyłkowa" },
  uk: { t: ["{job}: за бажанням — також поштою, за домовленістю у WhatsApp.", "{job}: можна виконати й поштою, обговоривши у WhatsApp.", "Ви не поруч? {job}: надішліть поштою, обговоривши у WhatsApp."], tail: "Послуга поштою діє в межах Анталії та з-за кордону; доставку оплачує клієнт.", link: "Послуга поштою" },
  nl: { t: ["{job}: desgewenst ook per post, in overleg via WhatsApp.", "{job}: kan ook per post, in overleg via WhatsApp.", "Niet in de buurt? {job}: stuur het per post, in overleg via WhatsApp."], tail: "Verzending geldt voor Antalya en het buitenland; de verzendkosten zijn voor de klant.", link: "Service per post" },
  ar: { t: ["{job}: إن رغبتم يمكن تنفيذه عبر الشحن أيضًا بالاتفاق عبر واتساب.", "{job}: يمكن تنفيذه عبر الشحن أيضًا بعد الاتفاق عبر واتساب.", "لستم قريبين؟ {job}: أرسلوه بالشحن بعد الاتفاق عبر واتساب."], tail: "الشحن متاح داخل أنطاليا ومن الخارج؛ وتكاليف الشحن على العميل.", link: "الخدمة عبر الشحن" },
};

/** HZ (ES/FR/PL/UK/NL/AR) tamir/tadilat sayfaları için iş adı; fermuar/abiye/gelinlik/mont tam kutu alır, elbise (dikim) hiç almaz. */
export type KargoKisaHz = 'paca' | 'kot' | 'bel' | 'kol' | 'takim' | 'deri' | 'pantolon' | 'beden' | 'tamir';
export const KARGO_KISA_HZ: Record<KargoKisaHz, Record<ILang, string>> = {
  paca: { es: "El acortado de pantalones", fr: "Le raccourcissage de pantalon", pl: "Skracanie spodni", uk: "Вкорочення штанів", nl: "Broeken inkorten", ar: "تقصير البناطيل" },
  kot: { es: "Los arreglos de vaqueros", fr: "Les retouches de jean", pl: "Przeróbki jeansów", uk: "Підгонка джинсів", nl: "Jeansaanpassingen", ar: "تعديل الجينز" },
  bel: { es: "El ajuste de cintura", fr: "La reprise de taille", pl: "Zwężanie w talii", uk: "Звуження в поясі", nl: "De taille innemen", ar: "تضييق الخصر" },
  kol: { es: "El acortado de mangas", fr: "Le raccourcissement de manches", pl: "Skracanie rękawów", uk: "Вкорочення рукавів", nl: "Mouwen inkorten", ar: "تقصير الأكمام" },
  takim: { es: "Los arreglos de trajes", fr: "Les retouches de costume", pl: "Przeróbki garniturów", uk: "Підгонка костюмів", nl: "Pakaanpassingen", ar: "تعديل البدلات" },
  deri: { es: "Los arreglos de prendas de cuero", fr: "Les retouches de vêtements en cuir", pl: "Przeróbki odzieży skórzanej", uk: "Ремонт шкіряних виробів", nl: "Reparaties van leren kleding", ar: "إصلاح الملابس الجلدية" },
  pantolon: { es: "Los arreglos de pantalones", fr: "Les retouches de pantalon", pl: "Przeróbki spodni", uk: "Підгонка штанів", nl: "Broekaanpassingen", ar: "تعديل البناطيل" },
  beden: { es: "El ajuste de talla", fr: "L'ajustement de taille", pl: "Dopasowanie rozmiaru", uk: "Підгонка за розміром", nl: "Maataanpassing", ar: "تعديل المقاس" },
  tamir: { es: "Las reparaciones de ropa", fr: "Les réparations de vêtements", pl: "Naprawy odzieży", uk: "Ремонт одягу", nl: "Kledingreparaties", ar: "إصلاح الملابس" },
};
