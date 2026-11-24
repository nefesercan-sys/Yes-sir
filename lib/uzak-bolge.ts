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
    case 'tr': return `Terzi Can, ${n} için: atölye Konyaaltı Hurma'da; işin durumuna göre biz geliriz ya da siz atölyeye gelirsiniz. Fotoğrafla fiyat alın.`;
    case 'en': return `Terzi Can for ${n}: workshop in Hurma, Konyaaltı. We visit by arrangement, or you bring the garment to us. Photo on WhatsApp, price back.`;
    case 'ru': return `Terzi Can для района ${n}: мастерская в Хурме (Коньяалты). Выезд по договорённости или приходите сами. Фото в WhatsApp — цена в ответ.`;
    case 'de': return `Terzi Can für ${n}: Werkstatt in Hurma, Konyaaltı. Besuch nach Absprache, oder Sie bringen das Stück vorbei. Foto per WhatsApp, Preis zurück.`;
  }
}
