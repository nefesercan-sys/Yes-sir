// lib/admin-list.ts — yönetici e-posta listesi (sunucu tarafı; auth ve admin-auth ortak kullanır, döngüsel import yok).
// ADMIN_EMAILS="a@x.com,b@y.com" (ve/veya ADMIN_EMAIL) tanımlıysa YALNIZCA onlar geçerlidir.
// Hiçbiri tanımlı değilse eski davranış korunur (varsayılan: site sahibinin doğrulanmış adresi) — Vercel'de ADMIN_EMAILS ayarlanınca bu varsayılan devre dışı kalır.
const VARSAYILAN_YONETICILER = ['nefesercan@gmail.com'];

export const yoneticiler = (): string[] => {
  const env = [...(process.env.ADMIN_EMAILS || '').split(','), process.env.ADMIN_EMAIL || '']
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return env.length > 0 ? env : VARSAYILAN_YONETICILER;
};

export const adminEpostasiMi = (email: string): boolean => yoneticiler().includes(String(email || '').trim().toLowerCase());

/** İlk yönetici adresi: bildirim/mesaj alıcısı olarak kullanılır (kaynak kodda sabit e-posta yok). */
export const birincilYonetici = (): string => yoneticiler()[0];
