'use client';

const YESIL = '#2d8c6e';

export type SekmeId = 'ana' | 'mesajlar' | 'ilanlar' | 'profil';

type Sekme = { id: SekmeId; label: string; icon: string };

export function TerziBottomNav({
  aktif, setAktif, anaLabel, anaIcon, rozet,
}: {
  aktif: SekmeId;
  setAktif: (s: SekmeId) => void;
  anaLabel: string;
  anaIcon: string;
  rozet?: { mesajlar?: number; ilanlar?: number };
}) {
  const sekmeler: Sekme[] = [
    { id: 'ana', label: anaLabel, icon: anaIcon },
    { id: 'ilanlar', label: 'İlanlar', icon: '📋' },
    { id: 'mesajlar', label: 'Mesajlar', icon: '💬' },
    { id: 'profil', label: 'Profil', icon: '👤' },
  ];

  return (
    <div style={{
      position: 'sticky', bottom: 0, left: 0, right: 0,
      display: 'flex', background: '#fff', borderTop: '1px solid #eef2f0',
      paddingBottom: 'env(safe-area-inset-bottom, 8px)', paddingTop: 6,
      boxShadow: '0 -2px 12px rgba(0,0,0,.04)', zIndex: 20,
    }}>
      {sekmeler.map(s => {
        const isAktif = aktif === s.id;
        const rozetSayi = s.id === 'mesajlar' ? rozet?.mesajlar : s.id === 'ilanlar' ? rozet?.ilanlar : undefined;
        return (
          <button key={s.id} onClick={() => setAktif(s.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '6px 0 4px', border: 'none', background: 'none', position: 'relative', cursor: 'pointer',
            }}>
            <span style={{ fontSize: 22, filter: isAktif ? 'none' : 'grayscale(40%) opacity(0.6)' }}>{s.icon}</span>
            {!!rozetSayi && (
              <span style={{
                position: 'absolute', top: 0, right: '28%', minWidth: 16, height: 16, borderRadius: 8,
                background: '#dc2626', color: '#fff', fontSize: 10, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px',
              }}>{rozetSayi > 9 ? '9+' : rozetSayi}</span>
            )}
            <span style={{ fontSize: 11, fontWeight: isAktif ? 800 : 600, color: isAktif ? YESIL : '#94a3b8' }}>{s.label}</span>
          </button>
        );
      })}
    </div>
  );
}
