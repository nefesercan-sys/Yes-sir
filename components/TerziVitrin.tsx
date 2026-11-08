import Link from "next/link";
import { DURATION, PRICE_FROM, PRICE_BY_MODEL, AREA_SERVED, PHONE_E164, PHONE_DISPLAY, waUrl } from "@/lib/business";
import { ONLINE_ALL, ONLINE_PATH } from "@/lib/intl-online";
import { OZEL_ALL, OZEL_PATH, OZEL_META } from "@/lib/ozel-dikim";

// Ana sayfa vitrini: üç ayrı bölüm (Terzi Can, siparişe özel dikim ve dünyaya kargo, Can Beauty Studio).
// Sunucu bileşeni: tüm bağlantılar ham HTML'de görünür (botlar JS çalıştırmadan okur). Kendi renklerini taşır
// (arka plan + yazı rengi birlikte verilir), böylece açık veya koyu temada kontrast bozulmaz.

const BEAUTY_PATH = "/guzellik/guzellik-merkezi-antalya";
const BEAUTY_WA_NUMBER = "905315104458";
const BEAUTY_PHONE_DISPLAY = "+90 531 510 44 58";
const BEAUTY_WA_TEXT =
  "Merhaba, Can Beauty Studio hizmetleri için bilgi ve fiyat teklifi almak istiyorum. Konakladığım bölge: ";
// Güzellik sayfaları (dil adresleri /guzellik/ önekinde, PR #82)
const BEAUTY_LANG: { l: string; slug: string }[] = [
  { l: "tr", slug: "guzellik-merkezi-antalya" },
  { l: "en", slug: "beauty-salon-antalya" },
  { l: "de", slug: "schoenheitssalon-antalya" },
  { l: "ru", slug: "salon-krasoty-antalya" },
  { l: "es", slug: "salon-de-belleza-antalya" },
  { l: "fr", slug: "salon-de-beaute-antalya" },
  { l: "pl", slug: "salon-urody-antalya" },
  { l: "uk", slug: "salon-krasy-antaliya" },
  { l: "nl", slug: "schoonheidssalon-antalya" },
  { l: "ar", slug: "salon-tajmeel-antalya" },
];

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

const STYLES = `
.tv{background:#f8fafc;color:#0f172a;max-width:1100px;margin:0 auto;padding:24px 16px 40px;font-size:15px;line-height:1.7}
.tv *{box-sizing:border-box}
.tv a{color:#1d4ed8}
.tv h1{font-size:26px;line-height:1.25;font-weight:700;margin:0 0 10px;color:#0f172a}
.tv h2{font-size:20px;line-height:1.3;font-weight:700;margin:0 0 8px;color:#0f172a}
.tv p{margin:0 0 10px;color:#334155}
.tv .tv-note{font-size:13px;color:#475569}
.tv-actions{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0 6px}
.tv-btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:10px 18px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none!important;border:2px solid transparent}
.tv-wa{background:#15803d;color:#fff!important}
.tv-call{background:#0d1b3e;color:#fff!important}
.tv-detail{background:#fff;color:#0d1b3e!important;border-color:#0d1b3e}
.tv-btn:focus-visible,.tv a:focus-visible{outline:3px solid #f5a623;outline-offset:2px}
.tv-cards{display:grid;grid-template-columns:1fr;gap:16px;margin:22px 0}
@media(min-width:900px){.tv-cards{grid-template-columns:repeat(3,1fr)}}
.tv-card{background:#fff;color:#0f172a;border:1px solid #cbd5e1;border-radius:16px;padding:18px;display:flex;flex-direction:column}
.tv-card ul{margin:0 0 12px;padding-left:18px;color:#334155}
.tv-card li{margin-bottom:6px}
.tv-card .tv-actions{margin-top:auto}
.tv-tag{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.02em;padding:2px 10px;border-radius:999px;margin-bottom:8px;background:#e2e8f0;color:#0f172a}
.tv-langs{display:flex;flex-wrap:wrap;gap:6px;list-style:none;padding:0;margin:0 0 10px}
.tv-langs a,.tv-chips a{display:inline-block;padding:6px 12px;border:1px solid #94a3b8;border-radius:999px;font-size:14px;text-decoration:none;color:#1e293b}
.tv-chips{display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:0}
.tv-chips a{padding:8px 14px}
.tv-steps{display:grid;grid-template-columns:1fr;gap:12px;list-style:none;padding:0;margin:0 0 22px;counter-reset:s}
@media(min-width:700px){.tv-steps{grid-template-columns:repeat(3,1fr)}}
.tv-steps li{background:#fff;border:1px solid #cbd5e1;border-radius:12px;padding:14px;counter-increment:s}
.tv-steps li::before{content:counter(s);display:inline-flex;width:28px;height:28px;border-radius:50%;background:#0d1b3e;color:#fff;font-weight:700;align-items:center;justify-content:center;margin-bottom:6px}
.tv-steps strong{display:block;color:#0f172a}
.tv-sec{margin:22px 0 0}
`;

export default function TerziVitrin() {
  const wa = waUrl("Merhaba, kıyafetimin fotoğrafını gönderiyorum, fiyat ve teslim zamanını öğrenmek istiyorum.");
  const waOzel = waUrl(
    "Merhaba, siparişe özel dikim yaptırmak istiyorum. Ürün türü, kumaş, ölçüler ve ülke/şehir bilgisini yazıyorum."
  );
  const waBeauty = `https://wa.me/${BEAUTY_WA_NUMBER}?text=${encodeURIComponent(BEAUTY_WA_TEXT)}`;

  return (
    <section aria-labelledby="terzi-vitrin-baslik" className="tv">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── Üst: başlık, kısa tanıtım, ana düğmeler ── */}
      <h1 id="terzi-vitrin-baslik">Antalya&apos;da Terzi Can: tadilat, özel dikim ve dünyaya kargo</h1>
      <p>
        Terzi Can, Konyaaltı Hurma&apos;daki atölyesinde 2006&apos;dan beri Antalya&apos;da tadilat ve dikim işleri yapar.
        Başlamak için kıyafetin fotoğrafını WhatsApp&apos;tan gönderin; iş netleşince fiyatı yazılı olarak söyleriz.
        Paça ve bel işleri {PRICE_FROM.paca} TL&apos;den, fermuar değişimi {PRICE_FROM.fermuar} TL&apos;den, deri tadilatı{" "}
        {PRICE_FROM.deri} TL&apos;den başlar; fiyatlara KDV dahil değildir. Dikim işlerinde fiyat {PRICE_BY_MODEL.tr} belirlenir.
      </p>
      <div className="tv-actions">
        <a className="tv-btn tv-wa" href={wa} rel="noopener">WhatsApp&apos;tan yazın</a>
        <a className="tv-btn tv-call" href={`tel:${PHONE_E164}`}>Ara: {PHONE_DISPLAY}</a>
      </div>
      <p className="tv-note">Terzi Can her gün 08:00–23:00 arasında açıktır. Yazışma Türkçe, İngilizce, Almanca ve Rusça yapılabilir.</p>

      {/* ── Üç ayrı bölüm ── */}
      <div className="tv-cards">
        <article className="tv-card" aria-labelledby="kart-terzi">
          <span className="tv-tag">Terzi Can</span>
          <h2 id="kart-terzi">Antalya&apos;da tadilat ve dikim</h2>
          <ul>
            <li>Paça, bel, kol ve boy kısaltma-daraltma, fermuar değişimi, deri ve mont tadilatı, özel dikim.</li>
            <li>
              Hizmet verdiğimiz bölgelerde ({AREA_SERVED.join(", ")}) evinize ve otelinize alım-teslim ücretsizdir; yalnızca
              yapılan iş ücretlendirilir.
            </li>
            <li>{DURATION.tr.all}</li>
          </ul>
          <div className="tv-actions">
            <Link className="tv-btn tv-detail" href="/terzi">Terzi Can sayfası</Link>
            <a className="tv-btn tv-wa" href={wa} rel="noopener">WhatsApp</a>
          </div>
        </article>

        <article className="tv-card" aria-labelledby="kart-ozel">
          <span className="tv-tag">Dünyaya kargo</span>
          <h2 id="kart-ozel">Siparişe özel dikim</h2>
          <ul>
            <li>
              Keten, pamuk ve diğer kumaşlardan kadın ve erkek takım, pantolon, gömlek, etek, şort, abiye ve takım elbise
              siparişe özel dikilir.
            </li>
            <li>Ölçü ve model fotoğrafını WhatsApp&apos;tan gönderirsiniz; fiyat fotoğrafa veya istenilen modele göre verilir.</li>
            <li>Antalya içine ve yurt dışına kargolanır; kargo ücreti müşteriye aittir, süre işin durumuna göre değişir.</li>
          </ul>
          <ul className="tv-langs" aria-label="Siparişe özel dikim sayfaları, diller">
            {OZEL_ALL.map((l) => (
              <li key={l}>
                <a href={OZEL_PATH[l]} hrefLang={OZEL_META[l].hreflang} lang={OZEL_META[l].hreflang}>{OZEL_META[l].name}</a>
              </li>
            ))}
          </ul>
          <div className="tv-actions">
            <Link className="tv-btn tv-detail" href={OZEL_PATH.tr}>Özel dikim sayfası</Link>
            <a className="tv-btn tv-wa" href={waOzel} rel="noopener">WhatsApp</a>
          </div>
        </article>

        <article className="tv-card" aria-labelledby="kart-guzellik">
          <span className="tv-tag">Can Beauty Studio</span>
          <h2 id="kart-guzellik">Antalya&apos;da güzellik hizmetleri</h2>
          <ul>
            <li>
              Saç, tırnak, makyaj, gelin saçı ve makyajı, cilt bakımı, kaş-kirpik bakımı ve ağda için konakladığınız
              bölgedeki anlaşmalı salonlara yönlendirilirsiniz.
            </li>
            <li>
              Hizmet bölgedeki anlaşmalı salonlar aracılığıyla verilir; ev veya otele hizmet verilmez, salona kendiniz
              gidersiniz.
            </li>
            <li>Hizmet bilgisi, size özel fiyat teklifi ve güncel kampanyalar WhatsApp&apos;tan paylaşılır.</li>
          </ul>
          <ul className="tv-langs" aria-label="Can Beauty Studio sayfaları, diller">
            {BEAUTY_LANG.map(({ l, slug }) => {
              const m = OZEL_META[l as keyof typeof OZEL_META];
              return (
                <li key={l}>
                  <a href={`/guzellik/${slug}`} hrefLang={m.hreflang} lang={m.hreflang}>{m.name}</a>
                </li>
              );
            })}
          </ul>
          <p className="tv-note">Her gün 08:00–24:00 · {BEAUTY_PHONE_DISPLAY}</p>
          <div className="tv-actions">
            <Link className="tv-btn tv-detail" href={BEAUTY_PATH}>Güzellik sayfası</Link>
            <a className="tv-btn tv-wa" href={waBeauty} rel="noopener">WhatsApp</a>
          </div>
        </article>
      </div>

      {/* ── Nasıl çalışır ── */}
      <h2>Nasıl çalışır?</h2>
      <ol className="tv-steps">
        <li><strong>Fotoğraf veya ölçü gönderin</strong>Kıyafetin fotoğrafını ya da özel dikim için ölçü ve modeli WhatsApp&apos;tan yazın.</li>
        <li><strong>Fiyat ve zaman netleşir</strong>Fiyat ve teslim zamanı yazılı olarak söylenir; süre işin durumuna göre değişir.</li>
        <li><strong>Alım-teslim veya kargo</strong>Antalya&apos;da kıyafet adresinizden ya da otelin resepsiyonundan alınır, işlem bitince geri getirilir; özel dikim kargolanır.</li>
      </ol>

      {/* ── Dil seçici ── */}
      <h2>Diğer dillerde online terzi hizmeti</h2>
      <ul className="tv-langs" aria-label="Diller">
        {ONLINE_ALL.map((l) => (
          <li key={l}>
            <a href={ONLINE_PATH[l]} hrefLang={OZEL_META[l].hreflang} lang={OZEL_META[l].hreflang}>{OZEL_META[l].name}</a>
          </li>
        ))}
      </ul>

      {/* ── Hizmet sayfaları ── */}
      <div className="tv-sec">
        <h2>Terzi hizmet sayfaları</h2>
        <p>
          Fiyat listesi, mahalle sayfaları ve hizmet rehberi için <Link href="/terzi">Terzi Can sayfasına</Link> gidin;
          otel konuğuysanız <Link href="/terzi/eve-gelen-terzi-antalya">eve ve otele gelen terzi</Link> sayfasına bakın.
          Telefon ve WhatsApp: {PHONE_DISPLAY}.
        </p>
        <ul className="tv-chips">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
