'use client';
import { usePathname } from 'next/navigation';

// Yalnızca Rusça sayfalarda (/ru/...) görünen "Telegram'dan yaz" butonu.
const TG_USER = 'terzican_antalya_tailor_service';

export default function RuTelegramButton() {
  const path = usePathname() || '';
  if (!(path === '/ru' || path.startsWith('/ru/'))) return null;
  return (
    <a
      href={`https://t.me/${TG_USER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в Telegram"
      style={{
        position: 'fixed', left: 14, bottom: 84, zIndex: 40,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: '#229ED9', color: '#fff', textDecoration: 'none',
        padding: '10px 16px', borderRadius: 999, fontWeight: 600, fontSize: 14,
        boxShadow: '0 4px 14px rgba(0,0,0,.25)',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.1 2.8 11.4c-.9.3-.9 1.3 0 1.6l4.7 1.5 1.8 5.6c.2.6 1 .8 1.4.3l2.6-2.6 4.8 3.5c.6.4 1.4.1 1.6-.6l3.3-15.1c.2-.8-.5-1.5-1.1-1.5Zm-3.7 3.6-8.6 7.8-.4 3.1-1.3-4.2 10.3-6.7Z"/></svg>
      Telegram
    </a>
  );
}
