import Link from "next/link";

// Ana sayfada, ilan listesinin altında: terzi ve tekstil sayfalarına sunucu tarafında
// render edilen düz bağlantılar (botlar JS çalıştırmadan görür).
const LINKS: { href: string; label: string }[] = [
  { href: "/terzi", label: "Terzi Can — Antalya Terzi" },
  { href: "/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti", label: "Konyaaltı Terzi, Elbise Dikim ve Tadilat" },
  { href: "/terzi/paca-kisaltma-antalya", label: "Paça Kısaltma" },
  { href: "/terzi/fermuar-degisimi", label: "Fermuar Değişimi" },
  { href: "/terzi/bay-terzi-antalya", label: "Bay Terzi" },
  { href: "/terzi/bayan-terzi-antalya", label: "Bayan Terzi" },
  { href: "/terzi/eve-gelen-terzi-antalya", label: "Eve ve Otele Gelen Terzi" },
  { href: "/terzi/kuru-temizleme-antalya", label: "Kuru Temizleme ve Ütü" },
  { href: "/terzi/dikis-atolyesi-antalya", label: "Dikiş Atölyesi, Fason Üretim" },
  { href: "/terzi/uniforma-uretimi-antalya", label: "Üniforma Üretimi" },
  { href: "/tekstil-antalya", label: "Tekstil Antalya" },
  { href: "/online-tailor-service", label: "Online Tailor Service (EN)" },
  { href: "/de/online-schneiderservice-antalya", label: "Online Schneiderservice (DE)" },
  { href: "/ru/atelie-antalya", label: "Ателье Анталья (RU)" },
];

export default function TerziVitrin() {
  return (
    <section
      aria-labelledby="terzi-vitrin-baslik"
      style={{ maxWidth: 1100, margin: "32px auto", padding: "0 16px" }}
    >
      <h2 id="terzi-vitrin-baslik" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
        Terzi ve Tekstil Hizmetleri — Antalya
      </h2>
      <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 12 }}>
        Terzi Can: paça kısaltma, fermuar değişimi, elbise dikimi, kuru temizleme ve seri üretim.
        Her gün 08:00–23:00. WhatsApp: +90 531 898 64 18
      </p>
      <ul style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              style={{
                display: "inline-block",
                padding: "8px 14px",
                border: "1px solid rgba(128,128,128,.4)",
                borderRadius: 999,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
