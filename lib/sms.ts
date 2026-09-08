// ============================================================
// SwapHubs — lib/sms.ts
// Basit SMS gönderim sarmalayıcı. NetGSM, İleti Merkezi, Twilio
// vb. entegre edilebilir. .env'de SMS_PROVIDER ayarlanmadıysa
// sadece konsola yazar (dev modu) — test için yeterli.
// ============================================================

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
      });
      const text = await res.text();
      return { success: true, provider: 'netgsm', response: text };
    }

    // Sağlayıcı tanımlı değilse: dev modunda konsola yaz
    console.log(`[SMS - DEV MODU] → ${telefon}: ${mesaj}`);
    return { success: true, provider: 'dev-console' };
  } catch (err) {
    console.error('SMS gönderim hatası:', err);
    return { success: false, error: String(err) };
  }
}
