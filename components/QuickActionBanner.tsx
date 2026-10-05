// Sunucu bileşeni (JS gerektirmez): botlar ham HTML'de slogan, saat ve WhatsApp bağlantısını görür.
import {
  VALUE_PROPS, STEPS, HOURS_LINE, CALL_LABEL, SERVICE_WA_TR,
  PHONE_TEL, waUrl, type Lang, type ServiceKey,
} from '@/lib/value-props';

interface Props {
  lang?: Lang;
  service?: ServiceKey;   // sadece Türkçe sayfalarda hazır mesajı hizmete göre değiştirir
  variant?: 'instant-quote' | 'hotel-service' | 'door-pickup';
}

export default function QuickActionBanner({ lang = 'tr', service = 'genel', variant = 'instant-quote' }: Props) {
  const list = VALUE_PROPS[lang] ?? VALUE_PROPS.tr;
  const primary = list.find(p => p.id === variant) ?? list[0];
  const message = lang === 'tr' && variant === 'instant-quote' ? SERVICE_WA_TR[service] : primary.waTemplate;
  const steps = STEPS[lang];

  return (
    <section
      id="quick-actions"
      aria-label={primary.slogan}
      style={{
        background: 'linear-gradient(90deg,#8a6a2f,#b8975a)',
        color: '#fff',
        padding: '14px 16px',
        fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif",
      }}
    >
      <div style={{
        maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <div style={{ flex: '1 1 280px', minWidth: 0 }}>
          <span style={{
            display: 'inline-block', background: '#fff', color: '#6b4f1d', fontSize: 11, fontWeight: 800,
            padding: '3px 10px', borderRadius: 999, letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 6,
          }}>{primary.badge}</span>
          <h2 className="hero-slogan" style={{ margin: 0, fontSize: 'clamp(1rem,2.6vw,1.25rem)', fontWeight: 800, lineHeight: 1.25 }}>
            {primary.slogan}
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, opacity: .95 }}>{HOURS_LINE[lang]}</p>
          <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 6, listStyle: 'none', padding: 0, margin: '8px 0 0', fontSize: 12 }}>
            {steps.map((s, i) => (
              <li key={s} style={{ background: 'rgba(255,255,255,.18)', borderRadius: 999, padding: '3px 10px' }}>
                {i + 1}. {s}
              </li>
            ))}
          </ol>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', width: '100%', maxWidth: 360 }}>
          <a
            href={waUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 180px', textAlign: 'center', background: '#25d366', color: '#fff', fontWeight: 800,
              fontSize: 14, padding: '12px 16px', borderRadius: 10, textDecoration: 'none',
            }}
          >
            💬 {primary.actionText}
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            style={{
              flex: '0 0 auto', textAlign: 'center', background: '#fff', color: '#6b4f1d', fontWeight: 800,
              fontSize: 14, padding: '12px 16px', borderRadius: 10, textDecoration: 'none',
            }}
          >
            📞 {CALL_LABEL[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}
