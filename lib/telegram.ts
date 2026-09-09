// ============================================================
// SwapHubs — lib/telegram.ts
// Telegram Bot API üzerinden tamamen ücretsiz mesaj gönderimi.
// Kurulum: @BotFather'dan bot oluştur, TELEGRAM_BOT_TOKEN ve
// TELEGRAM_BOT_USERNAME .env'e ekle.
// ============================================================

export async function telegramMesajGonder(chatId: string | number, mesaj: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return { success: false, error: 'TELEGRAM_BOT_TOKEN tanımlı değil' };

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: mesaj, parse_mode: 'HTML' }),
    });
    const data = await res.json();
    if (!data.ok) return { success: false, error: data.description };
    return { success: true };
  } catch (err) {
    console.error('Telegram gönderim hatası:', err);
    return { success: false, error: String(err) };
  }
}

// Telefon numarasını Telegram deep-link payload'ına çevirir (+ işaretsiz rakamlar)
export function telefonuPayloadYap(telefon: string) {
  return telefon.replace('+', '');
}

export function payloadiTelefonaCevir(payload: string) {
  return payload.startsWith('90') ? `+${payload}` : payload;
}

export function telegramBaglanLinki(telefon: string) {
  const username = process.env.TELEGRAM_BOT_USERNAME;
  if (!username) return null;
  return `https://t.me/${username}?start=${telefonuPayloadYap(telefon)}`;
}
