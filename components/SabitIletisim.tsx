'use client';
// Her sayfada sağ altta sabit iletişim: görünür telefon numarası (arama bağlantısı) ve WhatsApp simgesi. 10 dil.
// Mobilde alttaki çubukların (sayfa altı menü, ana sayfa arama çubuğu) üstünde durur.
import { usePathname } from 'next/navigation';

const TEL = '+905318986418';
const SHOW = '+90 531 898 64 18';
const WA = '905318986418';
const LANGS = ['en', 'de', 'ru', 'es', 'fr', 'pl', 'uk', 'nl', 'ar'] as const;
type L = 'tr' | (typeof LANGS)[number];

const T: Record<L, { call: string; wa: string; msg: string }> = {
  tr: { call: 'Terziyi ara', wa: "WhatsApp'tan yazın", msg: 'Merhaba, terzi hizmeti hakkında bilgi almak istiyorum.' },
  en: { call: 'Call the tailor', wa: 'Message us on WhatsApp', msg: 'Hello, I would like information about your tailoring service.' },
  de: { call: 'Schneider anrufen', wa: 'Per WhatsApp schreiben', msg: 'Hallo, ich hätte gern Informationen zu Ihrem Schneiderservice.' },
  ru: { call: 'Позвонить в ателье', wa: 'Написать в WhatsApp', msg: 'Здравствуйте, хочу узнать об услугах ателье.' },
  es: { call: 'Llamar al sastre', wa: 'Escribir por WhatsApp', msg: 'Hola, quisiera información sobre su servicio de sastrería.' },
  fr: { call: 'Appeler le tailleur', wa: 'Écrire sur WhatsApp', msg: 'Bonjour, je souhaite des informations sur votre service de couture.' },
  pl: { call: 'Zadzwoń do krawca', wa: 'Napisz na WhatsApp', msg: 'Dzień dobry, proszę o informacje o usługach krawieckich.' },
  uk: { call: 'Подзвонити кравцю', wa: 'Написати у WhatsApp', msg: 'Добрий день, хочу дізнатися про послуги кравця.' },
  nl: { call: 'Bel de kleermaker', wa: 'Stuur een WhatsApp', msg: 'Hallo, ik wil graag informatie over uw kleermakersservice.' },
  ar: { call: 'اتصل بالخياط', wa: 'راسلنا عبر واتساب', msg: 'مرحباً، أرغب في معلومات عن خدمة الخياطة.' },
};

function langOf(path: string): L {
  const seg = path.split('/')[1] || '';
  if ((LANGS as readonly string[]).includes(seg)) return seg as L;
  if (path.startsWith('/online-tailor-service')) return 'en';
  return 'tr';
}

const HIDE = ['/admin', '/giris', '/api', '/uye-ol'];

/** homeBar: ana sayfada mobilde kendi alt çubuğu olan site (swaphubs) için true. */
export default function SabitIletisim({ homeBar = false }: { homeBar?: boolean }) {
  const path = usePathname() || '/';
  if (HIDE.some((h) => path === h || path.startsWith(h + '/'))) return null;
  const t = T[langOf(path)];
  // Ana sayfada mobilde zaten alt arama/WhatsApp çubuğu var: orada yalnız masaüstünde görünür.
  const home = homeBar && path === '/';
  return (
    <div className={`si-wrap${home ? ' si-home' : ''}`} dir="ltr">
      <style>{`
.si-wrap{position:fixed;right:14px;bottom:calc(84px + env(safe-area-inset-bottom));z-index:120;display:flex;flex-direction:column;align-items:flex-end;gap:10px;font-family:inherit}
@media(min-width:768px){.si-wrap{bottom:20px;right:20px}}
@media(max-width:767px){.si-home{display:none}}
.si-tel{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;background:#1c1814;color:#fff!important;font-weight:700;font-size:15px;line-height:1;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25);white-space:nowrap}
.si-wa{display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;background:#15803d;color:#fff!important;box-shadow:0 4px 14px rgba(21,128,61,.45);text-decoration:none}
.si-tel:hover,.si-wa:hover{transform:translateY(-1px)}
.si-tel:focus-visible,.si-wa:focus-visible{outline:3px solid #facc15;outline-offset:2px}
@media print{.si-wrap{display:none}}
`}</style>
      <a className="si-tel" href={`tel:${TEL}`} aria-label={`${t.call}: ${SHOW}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>
        <span>{SHOW}</span>
      </a>
      <a className="si-wa" href={`https://wa.me/${WA}?text=${encodeURIComponent(t.msg)}`} target="_blank" rel="noopener noreferrer" aria-label={t.wa} title={t.wa}>
        <svg width="30" height="30" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.04 3C9.1 3 3.46 8.63 3.46 15.57c0 2.22.58 4.38 1.68 6.29L3.36 28.5l6.8-1.78a12.53 12.53 0 0 0 5.88 1.47h.01c6.94 0 12.58-5.63 12.58-12.57 0-3.36-1.31-6.52-3.69-8.9A12.5 12.5 0 0 0 16.04 3zm0 22.97h-.01a10.4 10.4 0 0 1-5.3-1.45l-.38-.23-4.04 1.06 1.08-3.94-.25-.4a10.36 10.36 0 0 1-1.6-5.53c0-5.76 4.69-10.45 10.46-10.45 2.79 0 5.41 1.09 7.39 3.07a10.38 10.38 0 0 1 3.06 7.39c0 5.77-4.69 10.48-10.41 10.48zm5.73-7.83c-.31-.16-1.86-.92-2.15-1.02-.29-.11-.5-.16-.71.16-.21.31-.81 1.02-1 1.23-.18.21-.37.24-.68.08-.31-.16-1.33-.49-2.53-1.56-.93-.83-1.56-1.86-1.75-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.62 0 1.54 1.13 3.04 1.28 3.25.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.86-.76 2.12-1.5.26-.73.26-1.36.18-1.5-.08-.13-.29-.21-.6-.37z"/></svg>
      </a>
    </div>
  );
}
