'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// SEO Düzeltmesi: app/layout.tsx içindeki <html lang="tr"> sabitti.
// /en, /de, /ru altındaki sayfalar için ayrı bir root layout mümkün değil
// (Next.js App Router'da <html> yalnızca kök layout'ta render edilebilir),
// bu yüzden lang özniteliği burada, sayfa yüklendikten hemen sonra,
// istemci tarafında path'e göre düzeltiliyor. Bu yöntem sunucu tarafındaki
// statik üretimi (generateStaticParams ile üretilen yüzlerce lokasyon
// sayfası dahil) etkilemez.
export default function LocaleHtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    let locale = 'tr';
    if (pathname === '/en' || pathname.startsWith('/en/')) locale = 'en';
    else if (pathname === '/ru' || pathname.startsWith('/ru/')) locale = 'ru';
    else if (pathname === '/de' || pathname.startsWith('/de/')) locale = 'de';

    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [pathname]);

  return null;
}
