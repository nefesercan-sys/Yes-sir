// swaphubs.com — kısa 'kargoyla da yaptırabilirsiniz' notu. İş adı parametre; cümle kalıbı iş adına göre seçilir (sayfalar arası birebir kopya olmasın).
import { KARGO_KISA } from '@/lib/kargo-kisa';
import type { KargoLang } from '@/lib/kargo-terzi';
import { ONLINE_PATH } from '@/lib/intl-online';

const pick = (s: string, n: number) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h % n; };

export default function KargoKisaNot({ lang, job }: { lang: KargoLang; job: string }) {
  const c = KARGO_KISA[lang];
  const text = c.t[pick(job, c.t.length)].replace('{job}', job);
  return (
    <p
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      style={{ maxWidth: 820, margin: '1.5rem auto', padding: '.9rem 1.1rem', background: '#f4faf7', color: '#3b4a42', border: '1px solid #e3ece7', borderRadius: 10, lineHeight: 1.7, fontSize: '.95rem' }}
    >
      {text} {c.tail}{' '}
      <a href={`${ONLINE_PATH[lang]}#kargo`} style={{ color: '#15803d', fontWeight: 600 }}>{c.link} →</a>
    </p>
  );
}
