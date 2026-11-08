import Link from "next/link";
import { DURATION, PRICE_FROM, PRICE_BY_MODEL, AREA_SERVED } from "@/lib/business";

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
  { href: "/terzi/dikis-atolyesi-antalya", label: "Dikiş Atölyesi, Fason Üretim" },
  { href: "/terzi/uniforma-uretimi-antalya", label: "Üniforma Üretimi" },
  { href: "/tekstil-antalya", label: "Tekstil Antalya" },
  { href: "/siparise-ozel-dikim-dunyaya-kargo", label: "Siparişe Özel Dikim ve Kargo" },
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
      <h1 id="terzi-vitrin-baslik" style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>
        SwapHubs Antalya: Terzi Can ile fotoğraftan fiyat, kapıya ücretsiz alım-teslim
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.9, marginBottom: 10 }}>
        SwapHubs, Antalya&apos;daki yerel hizmetleri ve terzilik talebini tek yerde toplayan platformdur. Terzilik hizmetini
        Konyaaltı Hurma&apos;daki atölyesiyle Terzi Can verir. Başlamak için kıyafetin fotoğrafını WhatsApp&apos;tan gönderin;
        iş net olunca fiyatı yazılı olarak söyleriz. Paça ve bel işleri {PRICE_FROM.paca} TL&apos;den, fermuar değişimi
        {" "}{PRICE_FROM.fermuar} TL&apos;den, deri tadilatı {PRICE_FROM.deri} TL&apos;den başlar. Dikim işlerinde fiyat{" "}
        {PRICE_BY_MODEL.tr} belirlenir.
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.9, marginBottom: 10 }}>
        Hizmet verdiğimiz tüm bölgelerde ({AREA_SERVED.join(", ")}) evinize ve otelinize alım-teslim ücretsizdir;
        yalnızca yapılan iş ücretlendirilir. {DURATION.tr.all} Atölye her gün 08:00–23:00 arasında açıktır; yazışma Türkçe,
        İngilizce, Almanca ve Rusça yapılabilir.
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.9, marginBottom: 10 }}>
        İş akışı kısadır: fotoğrafı gönderirsiniz, fiyat ve teslim zamanı yazılı olarak netleşir, kıyafet adresinizden ya da
        otelinizin resepsiyonundan alınır, işlem bitince aynı yere geri getirilir. Pantolon ve kot paçası, etek ve kol boyu,
        bel daraltma, fermuar, deri ve mont tadilatı ile özel dikim bu akışla yürür. Yurt dışından gelen konuklar için
        ölçü ve fotoğraf çevrimiçi alınır.
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.9, marginBottom: 14 }}>
        Fiyat listesi, mahalle sayfaları ve hizmet rehberi için{" "}
        <Link href="/terzi">Terzi Can sayfasına</Link> gidin; otel konuğuysanız{" "}
        <Link href="/terzi/eve-gelen-terzi-antalya">eve ve otele gelen terzi</Link> sayfasına bakın. Telefon ve WhatsApp:
        +90 531 898 64 18.
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
