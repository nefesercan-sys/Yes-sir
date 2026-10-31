export default function Loading() {
  return (
    <div role="status" aria-live="polite" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
      Yükleniyor…
    </div>
  );
}
