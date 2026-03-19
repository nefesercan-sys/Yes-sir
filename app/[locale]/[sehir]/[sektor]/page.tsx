import { getDb } from "@/lib/mongodb";
import { notFound } from "next/navigation";

const SEHIRLER = [
  "istanbul", "ankara", "izmir", "bursa", "antalya", "adana", "konya",
  "gaziantep", "mersin", "kayseri", "eskisehir", "trabzon", "samsun",
  "denizli", "balikesir", "malatya", "kahramanmaras", "erzurum", "van",
  "diyarbakir", "sanliurfa", "manisa", "aydin", "tekirdag", "sakarya",
  "kocaeli", "hatay", "mugla", "mardin", "afyonkarahisar"
];

const SEKTORLER = [
  "tekstil", "gida", "insaat", "elektronik", "makine", "otomotiv",
  "kimya", "plastik", "metal", "mobilya", "tarim", "lojistik",
  "turizm", "saglik", "egitim", "yazilim", "medya", "enerji",
  "ambalaj", "baskı", "temizlik", "guvenlik", "hukuk", "muhasebe"
];

export async function generateStaticParams() {
  const params = [];
  for (const sehir of SEHIRLER) {
    for (const sektor of SEKTORLER) {
      params.push({ sehir, sektor });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { sehir: string; sektor: string; locale: string } }) {
  const sehirAd = params.sehir.charAt(0).toUpperCase() + params.sehir.slice(1);
  const sektorAd = params.sektor.charAt(0).toUpperCase() + params.sektor.slice(1);
  return {
    title: `${sehirAd} ${sektorAd} Tedarikçi ve Hizmet İlanları | SwapHubs`,
    description: `${sehirAd}'da ${sektorAd} sektöründe tedarikçi, üretici ve hizmet sağlayıcı ilanları. Ücretsiz teklif al, hemen iletişime geç.`,
    alternates: {
      canonical: `https://swaphubs.com/${params.sehir}/${params.sektor}`,
    },
    openGraph: {
      title: `${sehirAd} ${sektorAd} İlanları | SwapHubs`,
      description: `${sehirAd}'da ${sektorAd} sektöründe ilanlar`,
      url: `https://swaphubs.com/${params.sehir}/${params.sektor}`,
    },
  };
}

export default async function SehirSektorPage({
  params,
}: {
  params: { sehir: string; sektor: string; locale: string };
}) {
  if (!SEHIRLER.includes(params.sehir) || !SEKTORLER.includes(params.sektor)) {
    notFound();
  }

  const sehirAd = params.sehir.charAt(0).toUpperCase() + params.sehir.slice(1);
  const sektorAd = params.sektor.charAt(0).toUpperCase() + params.sektor.slice(1);

  const db = await getDb();

  const [ilanlar, toplamIlan, alanSayisi, verenSayisi] = await Promise.all([
    db.collection("ilanlar").find({
      durum: "aktif",
      $or: [
        { sehir: { $regex: params.sehir, $options: "i" } },
        { "formData.sehir": { $regex: params.sehir, $options: "i" } },
      ],
      $and: [{
        $or: [
          { sektorId: { $regex: params.sektor, $options: "i" } },
          { kategori: { $regex: params.sektor, $options: "i" } },
        ]
      }]
    }).sort({ createdAt: -1 }).limit(24).toArray(),

    db.collection("ilanlar").countDocuments({
      durum: "aktif",
      $or: [{ sehir: { $regex: params.sehir, $options: "i" } }],
    }),

    db.collection("ilanlar").countDocuments({
      durum: "aktif", rol: "alan",
      $or: [{ sehir: { $regex: params.sehir, $options: "i" } }],
    }),

    db.collection("ilanlar").countDocuments({
      durum: "aktif", rol: "veren",
      $or: [{ sehir: { $regex: params.sehir, $options: "i" } }],
    }),
  ]);

  const ilanlarSerialized = JSON.parse(JSON.stringify(ilanlar));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${sehirAd} ${sektorAd} İlanları`,
    "description": `${sehirAd}'da ${sektorAd} sektöründe tedarikçi ve hizmet ilanları`,
    "url": `https://swaphubs.com/${params.sehir}/${params.sektor}`,
    "numberOfItems": toplamIlan,
    "itemListElement": ilanlarSerialized.slice(0, 10).map((ilan: any, idx: number) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": ilan.baslik,
      "url": `https://swaphubs.com/ilan/${ilan._id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <style>{`
        .sh-page { max-width: 1200px; margin: 0 auto; padding: 24px; }
        .sh-hero { background: linear-gradient(135deg, #0d1b3e, #1e3a8a); border-radius: 20px; padding: 40px; margin-bottom: 32px; color: #fff; }
        .sh-badge { background: rgba(245,166,35,.2); border: 1px solid rgba(245,166,35,.4); color: #f5a623; padding: 6px 14px; border-radius: 99px; font-size: .75rem; font-weight: 700; display: inline-block; margin-bottom: 16px; }
        .sh-title { font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 900; margin-bottom: 12px; }
        .sh-title span { color: #f5a623; }
        .sh-sub { color: rgba(255,255,255,.75); font-size: 1rem; line-height: 1.7; margin-bottom: 24px; }
        .sh-stats { display: flex; gap: 16px; flex-wrap: wrap; }
        .sh-stat { background: rgba(255,255,255,.1); border-radius: 12px; padding: 12px 20px; text-align: center; }
        .sh-stat-v { font-size: 1.4rem; font-weight: 900; color: #f5a623; }
        .sh-stat-l { font-size: .7rem; color: rgba(255,255,255,.6); font-weight: 600; text-transform: uppercase; }
        .sh-cta { display: flex; gap: 10px; margin-top: 24px; flex-wrap: wrap; }
        .sh-btn { padding: 12px 24px; border-radius: 12px; border: none; font-weight: 700; font-size: .9rem; cursor: pointer; font-family: inherit; }
        .sh-btn-primary { background: #e8361a; color: #fff; }
        .sh-btn-outline { background: rgba(255,255,255,.1); color: #fff; border: 1px solid rgba(255,255,255,.2); }
        .sh-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; margin-bottom: 40px; }
        .sh-kart { background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; transition: .2s; text-decoration: none; display: block; }
        .sh-kart:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.12); }
        .sh-kart-img { height: 160px; background: linear-gradient(135deg, #f1f5f9, #e2e8f0); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; position: relative; overflow: hidden; }
        .sh-kart-img img { width: 100%; height: 100%; object-fit: cover; }
        .sh-kart-body { padding: 14px; }
        .sh-kart-kat { font-size: .65rem; font-weight: 800; color: #2563eb; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 4px; }
        .sh-kart-title { font-weight: 800; font-size: .95rem; color: #0f172a; margin-bottom: 8px; line-height: 1.3; }
        .sh-kart-meta { font-size: .7rem; color: #94a3b8; font-weight: 600; }
        .sh-kart-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0; }
        .sh-kart-price { font-weight: 800; color: #10b981; font-size: .9rem; }
        .sh-kart-btn { background: #0d1b3e; color: #fff; border: none; padding: 6px 12px; border-radius: 8px; font-size: .7rem; font-weight: 700; cursor: pointer; }
        .sh-seo { background: #f8fafc; border-radius: 16px; padding: 32px; margin-bottom: 32px; }
        .sh-seo h2 { font-size: 1.3rem; font-weight: 800; color: #0d1b3e; margin-bottom: 16px; }
        .sh-seo p { color: #475569; line-height: 1.8; margin-bottom: 12px; }
        .sh-links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
        .sh-link { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 8px 16px; font-size: .8rem; font-weight: 700; color: #475569; text-decoration: none; transition: .18s; }
        .sh-link:hover { border-color: #2563eb; color: #0d1b3e; }
        .sh-empty { text-align: center; padding: 60px 20px; background: #fff; border-radius: 20px; border: 2px dashed #e2e8f0; }
        @media (max-width: 640px) {
          .sh-page { padding: 16px; }
          .sh-hero { padding: 24px; }
          .sh-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sh-page">
        {/* HERO */}
        <div className="sh-hero">
          <div className="sh-badge">📍 {sehirAd} · {sektorAd}</div>
          <h1 className="sh-title">
            {sehirAd}'da <span>{sektorAd}</span> Tedarikçi &amp; Hizmet İlanları
          </h1>
          <p className="sh-sub">
            {sehirAd} bölgesinde {sektorAd} sektöründe faaliyet gösteren tedarikçi, üretici
            ve hizmet sağlayıcıları burada bulabilirsiniz. Ücretsiz ilan verin, teklif alın.
          </p>
          <div className="sh-stats">
            <div className="sh-stat">
              <div className="sh-stat-v">{toplamIlan}</div>
              <div className="sh-stat-l">Toplam İlan</div>
            </div>
            <div className="sh-stat">
              <div className="sh-stat-v">{alanSayisi}</div>
              <div className="sh-stat-l">Talep İlanı</div>
            </div>
            <div className="sh-stat">
              <div className="sh-stat-v">{verenSayisi}</div>
              <div className="sh-stat-l">Hizmet İlanı</div>
            </div>
          </div>
          <div className="sh-cta">
            <a href={`/ilan-ver?sehir=${params.sehir}&sektor=${params.sektor}`} className="sh-btn sh-btn-primary">
              ➕ İlan Ver
            </a>
            <a href="/ilanlar" className="sh-btn sh-btn-outline">
              🔍 Tüm İlanlar
            </a>
          </div>
        </div>

        {/* İLANLAR */}
        {ilanlarSerialized.length > 0 ? (
          <div className="sh-grid">
            {ilanlarSerialized.map((ilan: any, idx: number) => {
              const gorsel = ilan.resimUrl || ilan.medyalar?.[0] || null;
              const optimizedGorsel = gorsel?.includes("cloudinary")
                ? gorsel.replace("/upload/", "/upload/f_auto,q_auto:eco,w_400,h_160,c_fill/")
                : gorsel?.includes("unsplash")
                ? `${gorsel.split("?")[0]}?auto=format&fit=crop&w=400&q=60`
                : gorsel;

              return (
                <a key={ilan._id} href={`/ilan/${ilan._id}`} className="sh-kart">
                  <div className="sh-kart-img">
                    {optimizedGorsel ? (
                      <img
                        src={optimizedGorsel}
                        alt={ilan.baslik}
                        loading={idx < 6 ? "eager" : "lazy"}
                        width={400}
                        height={160}
                      />
                    ) : (
                      <span>🏭</span>
                    )}
                  </div>
                  <div className="sh-kart-body">
                    <div className="sh-kart-kat">{ilan.kategori || ilan.sektorId || sektorAd}</div>
                    <div className="sh-kart-title">{ilan.baslik}</div>
                    <div className="sh-kart-meta">
                      📍 {ilan.sehir || sehirAd} · 📅 {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}
                    </div>
                    <div className="sh-kart-foot">
                      <div className="sh-kart-price">
                        {(ilan.butceMin || 0) > 0
                          ? `${new Intl.NumberFormat("tr-TR").format(ilan.butceMin)} ${ilan.butceBirimi || "₺"}`
                          : "Teklif Al"}
                      </div>
                      <button className="sh-kart-btn">
                        {ilan.rol === "alan" ? "Teklif Ver →" : "İncele →"}
                      </button>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="sh-empty">
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>📭</div>
            <h2 style={{ fontWeight: 800, color: "#0d1b3e", marginBottom: 8 }}>
              Henüz ilan yok
            </h2>
            <p style={{ color: "#475569", marginBottom: 20 }}>
              {sehirAd}'da {sektorAd} sektöründe ilk ilanı siz verin!
            </p>
            <a href={`/ilan-ver?sehir=${params.sehir}&sektor=${params.sektor}`}
              style={{ background: "#e8361a", color: "#fff", padding: "12px 28px", borderRadius: 12, fontWeight: 700, textDecoration: "none" }}>
              İlan Ver
            </a>
          </div>
        )}

        {/* SEO METİN BLOĞU */}
        <div className="sh-seo">
          <h2>{sehirAd} {sektorAd} Sektörü Hakkında</h2>
          <p>
            {sehirAd}, Türkiye'nin önemli sanayi ve ticaret merkezlerinden biridir.
            {sektorAd} sektöründe faaliyet gösteren yüzlerce firma, SwapHubs üzerinden
            tedarikçi bulma ve hizmet sunma imkânı bulmaktadır.
          </p>
          <p>
            {sehirAd}'daki {sektorAd} firmalarıyla iletişime geçmek, teklif almak veya
            kendi hizmetinizi sunmak için hemen ücretsiz ilan verebilirsiniz.
            SwapHubs, Türkiye genelinde 81 ilde {sektorAd} başta olmak üzere 50'den
            fazla sektörde hizmet vermektedir.
          </p>

          {/* İlgili şehirler */}
          <h2 style={{ marginTop: 24 }}>Diğer Şehirlerdeki {sektorAd} İlanları</h2>
          <div className="sh-links">
            {SEHIRLER.filter(s => s !== params.sehir).slice(0, 10).map(s => (
              <a key={s} href={`/${s}/${params.sektor}`} className="sh-link">
                📍 {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
          </div>

          {/* İlgili sektörler */}
          <h2 style={{ marginTop: 24 }}>{sehirAd}'daki Diğer Sektörler</h2>
          <div className="sh-links">
            {SEKTORLER.filter(s => s !== params.sektor).slice(0, 10).map(s => (
              <a key={s} href={`/${params.sehir}/${s}`} className="sh-link">
                🏭 {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
