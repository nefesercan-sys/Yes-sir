// ============================================================
// SwapHubs — lib/sms.ts
// Basit SMS gönderim sarmalayıcı. NetGSM, İleti Merkezi, Twilio
// vb. entegre edilebilir. .env'de SMS_PROVIDER ayarlanmadıysa
// sadece konsola yazar (dev modu) — test için yeterli.
// ============================================================

/** Telefonu loglarda maskeler: +90555*****12 */
function maskele(telefon: string): string {
  const t = String(telefon || '');
  return t.length <= 5 ? '***' : `${t.slice(0, 5)}${'*'.repeat(Math.max(t.length - 7, 1))}${t.slice(-2)}`;
}

/**
 * Kullanıcı kaynaklı metni (ör. ilan başlığı) SMS içine koymadan önce temizler: URL/alan adı ve kontrol karakterleri atılır,
 * metin kısaltılır (oltalama bağlantısı taşınmasın).
 */
export function smsMetin(v: unknown, max = 40): string {
  const t = String(v ?? '')
    .replace(/[\u0000-\u001F\u007F"<>]/g, ' ')
    .replace(/(?:https?:\/\/|www\.)\S+/gi, '')
    .replace(/\S+\.(?:com|net|org|info|biz|xyz|tr|ru|io|co|me|ly|gl|cc|top|site|online|link)\b\S*/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

export async function smsGonder(telefon: string, mesaj: string) {
  try {
    if (process.env.SMS_PROVIDER === 'netgsm') {
      const res = await fetch('https://api.netgsm.com.tr/sms/send/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          usercode: process.env.NETGSM_USERCODE || '',
          password: process.env.NETGSM_PASSWORD || '',
          gsmno: telefon.replace('+', ''),
          message: mesaj,
          msgheader: process.env.NETGSM_HEADER || '',
        }),
        signal: AbortSignal.timeout(8000), // takılı kalan sağlayıcı isteği kapatmasın
      });
      const text = (await res.text()).trim();
      // NetGSM başarıda "00 <bulkid>" (veya "01"/"02") döner; diğer kodlar hatadır (20, 30, 40, 50, 51, 70, 85 ...).
      const kod = text.split(/\s+/)[0];
      const basarili = res.ok && ['00', '01', '02'].includes(kod);
      if (!basarili) {
        console.error(`SMS sağlayıcı hatası (netgsm) HTTP ${res.status} kod=${kod}`);
        return { success: false, provider: 'netgsm', error: `netgsm kod ${kod || res.status}` };
      }
      return { success: true, provider: 'netgsm', response: text };
    }

    // Sağlayıcı tanımlı değilse: telefon/mesaj içeriği loglanmaz (kişisel veri); yalnızca maskeli bilgi
    console.log(`[SMS - DEV MODU] SMS_PROVIDER tanımlı değil; gönderilmedi → ${maskele(telefon)} (${mesaj.length} karakter)`);
    return { success: true, provider: 'dev-console' };
  } catch (err) {
    console.error('SMS gönderim hatası:', err instanceof Error ? err.message : 'bilinmeyen hata');
    return { success: false, error: 'SMS gönderilemedi' };
  }
}
