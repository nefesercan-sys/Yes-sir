// swaphubs.com — iletişim (WhatsApp / telefon) tıklama ölçümü için saf yardımcılar.
// Kişisel veri YOK: yalnızca dil kodu, sayfa yolu ve marka. Çerez veya yerel depolama kullanılmaz.
import { G_PREFIX, gAnySlugToLang } from './guzellik-slugs';

export type ContactType = 'whatsapp' | 'phone';
export type ContactBrand = 'tailor' | 'beauty';

const NON_TR = ['en', 'ru', 'de', 'es', 'fr', 'pl', 'uk', 'nl', 'ar'];
const BEAUTY_WA = '905423398584';

/** Yoldan dil: /en/..., /de/... önekleri; kökteki /online-tailor-service İngilizce; /guzellik/<slug> dili slug'dan; aksi halde 'tr'. */
export function langFromPath(pathname: string): string {
  const p = (pathname || '/').toLowerCase().replace(/\/+$/, '');
  const seg = p.split('/').filter(Boolean);
  if (seg[0] === G_PREFIX.slice(1)) return (seg[1] && gAnySlugToLang(seg[1])) || 'tr';
  if (seg[0] && NON_TR.includes(seg[0])) return seg[0];
  if (seg[0] === 'online-tailor-service') return 'en';
  return 'tr';
}

export function isBeauty(pathname: string, href: string): boolean {
  const p = (pathname || '').toLowerCase();
  return p === G_PREFIX || p.startsWith(`${G_PREFIX}/`) || href.includes(BEAUTY_WA);
}

/** Kısa sayfa kodu: yolun son parçası, en çok 28 karakter; güzellikte 'b-' öneki. */
export function pageCode(pathname: string, beauty: boolean): string {
  const seg = (pathname || '/').replace(/\/+$/, '').split('/').filter(Boolean);
  const last = (seg[seg.length - 1] || 'home').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 28) || 'home';
  return beauty ? `b-${last}`.slice(0, 28) : last;
}

const HELLO: Record<string, string> = {
  tr: 'Merhaba, bilgi almak istiyorum',
  en: 'Hello, I would like some information',
  ru: 'Здравствуйте, хочу получить информацию',
  de: 'Guten Tag, ich hätte gern Informationen',
};
const hello = (lang: string) => HELLO[lang] ?? HELLO.en;

export type Classified = { type: ContactType; href: string } | null;

export function classify(href: string): Classified {
  const h = (href || '').trim();
  if (/^tel:/i.test(h)) return { type: 'phone', href: h };
  if (/^(https?:\/\/(wa\.me|api\.whatsapp\.com)\/|whatsapp:\/\/)/i.test(h)) return { type: 'whatsapp', href: h };
  return null;
}

/** WhatsApp bağlantısının mesaj metninin sonuna ' [ref:<dil>/<sayfa>]' ekler. Başka bir parametreyi bozmaz. */
export function withRef(href: string, lang: string, code: string): string {
  const qi = href.indexOf('?');
  const base = qi === -1 ? href : href.slice(0, qi);
  const rest = qi === -1 ? '' : href.slice(qi + 1);
  const parts = rest ? rest.split('&') : [];
  let text: string | null = null;
  const others: string[] = [];
  for (const part of parts) {
    const eq = part.indexOf('=');
    const k = eq === -1 ? part : part.slice(0, eq);
    if (k === 'text') {
      const raw = eq === -1 ? '' : part.slice(eq + 1);
      try { text = decodeURIComponent(raw.replace(/\+/g, ' ')); } catch { text = raw; }
    } else if (part) others.push(part);
  }
  if (text !== null && text.includes('[ref:')) return href;
  const next = `${(text && text.trim()) || hello(lang)} [ref:${lang}/${code}]`;
  return `${base}?${[...others, `text=${encodeURIComponent(next)}`].join('&')}`;
}
