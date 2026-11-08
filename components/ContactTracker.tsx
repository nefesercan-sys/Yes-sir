'use client';
// swaphubs.com — WhatsApp ve telefon tıklamalarını dile/sayfaya/markaya göre ölçer.
// Tek, delege edilmiş dinleyici. Çerez/yerel depolama/kişisel veri YOK; JS kapalıysa bağlantılar aynen çalışır.
import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { classify, isBeauty, langFromPath, pageCode, withRef } from '@/lib/contact-track';

export default function ContactTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      try {
        if (e.type === 'auxclick' && e.button !== 1) return;
        const t = e.target as Element | null;
        const a = t && 'closest' in t ? (t.closest('a[href]') as HTMLAnchorElement | null) : null;
        if (!a) return;
        const href = a.getAttribute('href') || '';
        const c = classify(href);
        if (!c) return;
        const pathname = window.location.pathname;
        const lang = langFromPath(pathname);
        const beauty = isBeauty(pathname, href);
        if (c.type === 'whatsapp') {
          a.setAttribute('href', withRef(href, lang, pageCode(pathname, beauty)));
        }
        try {
          track('contact_click', { type: c.type, lang, page: pathname.slice(0, 120), brand: beauty ? 'beauty' : 'tailor' });
        } catch { /* ölçüm hiçbir zaman siteyi bozmaz */ }
      } catch { /* sessizce geç */ }
    };
    document.addEventListener('click', onClick, { capture: true, passive: true });
    document.addEventListener('auxclick', onClick, { capture: true, passive: true });
    return () => {
      document.removeEventListener('click', onClick, { capture: true } as AddEventListenerOptions);
      document.removeEventListener('auxclick', onClick, { capture: true } as AddEventListenerOptions);
    };
  }, []);
  return null;
}
