// swaphubs.com — kargoyla abiye/mont fermuarı değişimi kutusu. Fiyat içermez; WhatsApp'a yönlendirir. Kendi renkleriyle çalışır (açık/koyu sayfalarda okunur).
import { KARGO_FERMUAR } from '@/lib/kargo-fermuar';
import type { KargoLang } from '@/lib/kargo-terzi';
import { waUrl } from '@/lib/business';

export default function KargoFermuarKutusu({ lang }: { lang: KargoLang }) {
  const c = KARGO_FERMUAR[lang];
  return (
    <section
      id="kargo-fermuar"
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      aria-label={c.h}
      style={{ background: '#f4faf7', color: '#3b4a42', border: '1px solid #e3ece7', borderRadius: 12, padding: '1.2rem 1.25rem', margin: '2rem auto', maxWidth: 820, lineHeight: 1.7 }}
    >
      <h2 style={{ color: '#1f2a24', fontSize: '1.2rem', margin: '0 0 .6rem', lineHeight: 1.3 }}>{c.h}</h2>
      <p style={{ margin: '0 0 1rem' }}>{c.p}</p>
      <p style={{ margin: 0 }}>
        <a href={waUrl(c.waMsg)} target="_blank" rel="noopener noreferrer"
          style={{ background: '#15803d', color: '#fff', padding: '.7rem 1.3rem', fontWeight: 700, textDecoration: 'none', borderRadius: 6, display: 'inline-block' }}>
          💬 {c.wa}
        </a>
      </p>
    </section>
  );
}
