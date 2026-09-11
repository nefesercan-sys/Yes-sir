'use client';

const YESIL = '#2d8c6e';

const OGELER = [
  { href: '/terzi-talep', icon: '📷', label: 'Talep Ver' },
  { href: '/terzi-talep?sekme=ilanlar', icon: '📋', label: 'İlanlar' },
  { href: '/terzi-talep?sekme=mesajlar', icon: '💬', label: 'Mesajlar' },
  { href: '/terzi-talep?sekme=profil', icon: '👤', label: 'Profil' },
];

export default function TerziMarketingBottomNav() {
  return (
    <div style={{
      position: 'sticky', bottom: 0, left: 0, right: 0,
      display: 'flex', background: '#fff', borderTop: '1px solid #eef2f0',
      paddingBottom: 'env(safe-area-inset-bottom, 8px)', paddingTop: 6,
      boxShadow: '0 -2px 12px rgba(0,0,0,.06)', zIndex: 30,
    }}>
      {OGELER.map(o => (
        <a key={o.href} href={o.href}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '6px 0 4px', textDecoration: 'none',
          }}>
          <span style={{ fontSize: 22 }}>{o.icon}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: YESIL }}>{o.label}</span>
        </a>
      ))}
    </div>
  );
}
