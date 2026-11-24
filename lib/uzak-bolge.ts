// ============================================================
// lib/uzak-bolge.ts — atölyeye uzak bölgeler için dürüst metin (sahibin kararı, 24 Kasım 2026)
// Döşemealtı ve Serik atölyeye (Hurma, Konyaaltı) uzak: işin durumuna göre gidilir ya da müşteri atölyeye gelir.
// Bu sayfalarda "eve servis / adresinize gelir" sözü verilmez; bunun yerine aşağıdaki cümleler kullanılır.
// ============================================================
import { isFar } from '@/lib/seo-data';

export { isFar };
export type FarLang = 'tr' | 'en' | 'ru' | 'de';

/** Sayfa başındaki kısa etiket (örn. hero satırı). */
export const FAR_TAG: Record<FarLang, string> = {
  tr: 'İşin durumuna göre servis',
  en: 'Visits by arrangement',
  ru: 'Выезд по договорённости',
  de: 'Besuch nach Absprache',
};

/** Sayfa başında ve SSS'de kullanılan açıklama. */
export function farNote(lang: FarLang, n: string): string {
  switch (lang) {
    case 'tr': return `Atölyemiz Konyaaltı Hurma'da, ${n} bize uzak. İşin durumuna göre gelebiliriz ya da atölyemize gelebilirsiniz. Önce fotoğrafı WhatsApp'tan gönderin, fiyatı söyleyelim.`;
    case 'en': return `Our workshop is in Hurma, Konyaaltı, some distance from ${n}. Depending on the job we can come to you, or you can visit the workshop. Send a photo on WhatsApp first and we will give you a price.`;
    case 'ru': return `Мастерская находится в Хурме (Коньяалты), далеко от района ${n}. В зависимости от работы мы можем приехать, или вы можете прийти в мастерскую. Сначала пришлите фото в WhatsApp — назовём цену.`;
    case 'de': return `Unsere Werkstatt liegt in Hurma, Konyaaltı, etwas entfernt von ${n}. Je nach Auftrag kommen wir zu Ihnen, oder Sie besuchen die Werkstatt. Senden Sie zuerst ein Foto per WhatsApp, wir nennen den Preis.`;
  }
}

/** Arama sonucu açıklaması (telefon yok, ~150 karakter). */
export function farDesc(lang: FarLang, n: string): string {
  switch (lang) {
    case 'tr': return `${n} terzi: atölyemiz Konyaaltı'nda. İşin durumuna göre gelebiliriz ya da atölyeye gelebilirsiniz. Fotoğraf gönderin, fiyatı söyleyelim.`;
    case 'en': return `Tailor for ${n}: our workshop is in Konyaaltı. Depending on the job we come to you, or you visit us. Send a photo, get a price.`;
    case 'ru': return `Портной для района ${n}: мастерская в Коньяалты. По договорённости приедем, или приходите к нам. Пришлите фото — назовём цену.`;
    case 'de': return `Schneider für ${n}: Werkstatt in Konyaaltı. Je nach Auftrag kommen wir zu Ihnen oder Sie zu uns. Foto senden, Preis erhalten.`;
  }
}
