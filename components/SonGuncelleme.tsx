'use client';
// Sayfanın altında görünen "Son güncelleme" satırı. Tarih lib/lastmod.json'dan (gerçek içerik değişikliği; scripts/lastmod.mjs).
// İlk HTML'de sunucuda basılır (JavaScript çalıştırmayan arama ve yapay zeka botları da görür).
// data-lastmod: scripts/lastmod.mjs bu satırı içerik özetine katmaz.
import { usePathname } from 'next/navigation';
import { lastMod } from '@/lib/lastmod';

const LABEL: Record<string, [string, string]> = {
  tr: ['Son güncelleme', 'tr-TR'], en: ['Last updated', 'en-GB'], ru: ['Обновлено', 'ru-RU'], de: ['Zuletzt aktualisiert', 'de-DE'],
  es: ['Última actualización', 'es-ES'], fr: ['Dernière mise à jour', 'fr-FR'], pl: ['Ostatnia aktualizacja', 'pl-PL'],
  uk: ['Оновлено', 'uk-UA'], nl: ['Laatst bijgewerkt', 'nl-NL'], ar: ['آخر تحديث', 'ar'],
};
const langOf = (p: string) => {
  const seg = p.split('/')[1] ?? '';
  if (seg in LABEL) return seg;
  if (seg === 'online-tailor-service') return 'en';
  return 'tr';
};

export default function SonGuncelleme() {
  const path = usePathname() || '/';
  const d = lastMod(path);
  if (!d) return null;
  const [label, locale] = LABEL[langOf(path)];
  let text = d;
  try { text = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${d}T00:00:00Z`)); } catch { /* ISO tarih kalır */ }
  return (
    <p data-lastmod="" style={{ maxWidth: 1100, margin: '1.25rem auto .5rem', padding: '0 1rem', fontSize: '.8rem', color: '#6b7280' }}>
      {label}: <time dateTime={d} suppressHydrationWarning>{text}</time>
    </p>
  );
}
