// swaphubs.com — kargoyla abiye/mont fermuarı değişimi: yerel hizmet sayfalarında tek satırlık not (sayfanın konusu Antalya'da kalsın).
// Ayrıntılar online terzi sayfasının #kargo bölümünde. Fiyat yok.
import { KARGO_FERMUAR } from '@/lib/kargo-fermuar';
import { KARGO_KISA } from '@/lib/kargo-kisa';
import type { KargoLang } from '@/lib/kargo-terzi';
import { ONLINE_PATH } from '@/lib/intl-online';

export default function KargoFermuarKutusu({ lang }: { lang: KargoLang }) {
  const c = KARGO_FERMUAR[lang];
  return (
    <p
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      style={{ maxWidth: 820, margin: '1.5rem auto', padding: '.9rem 1.1rem', background: '#f4faf7', color: '#3b4a42', border: '1px solid #e3ece7', borderRadius: 10, lineHeight: 1.7, fontSize: '.95rem' }}
    >
      📦 {c.h}.{' '}
      <a href={`${ONLINE_PATH[lang]}#kargo`} style={{ color: '#15803d', fontWeight: 600 }}>{KARGO_KISA[lang].link} →</a>
    </p>
  );
}
