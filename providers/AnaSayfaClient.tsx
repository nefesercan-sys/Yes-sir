"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { TICARI_SEKTORLER, BIREYSEL_SEKTORLER } from "@/lib/sektorler";

interface Ilan {
  _id: string;
  baslik: string;
  kategori?: string;
  sektorId?: string;
  tip: "bireysel" | "ticari";
  rol: "alan" | "veren";
  sehir?: string;
  ulke?: string;
  butceMin?: number;
  butceMax?: number;
  butceBirimi?: string;
  resimUrl?: string;
  medyalar?: string[];
  createdAt: string;
  goruntulenme?: number;
  teklifSayisi?: number;
  yapay?: boolean;
}

const STATS = [
  { v: "12,400+", l: "Aktif İlan" },
  { v: "3,200+", l: "Üye Firma" },
  { v: "89", l: "Ülkede Erişim" },
  { v: "₺0", l: "İlan Ücreti" },
];

export default function AnaSayfaClient({ initialIlanlar }: { initialIlanlar: any[] }) {
  const { data: session, status } = useSession() || {};
  const router = useRouter();

  const [ilanlar, setIlanlar] = useState<Ilan[]>(initialIlanlar);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [aramaQ, setAramaQ] = useState("");
  const [aktifTip, setAktifTip] = useState<"bireysel" | "ticari">("ticari");
  const [aktifRol, setAktifRol] = useState<"alan" | "veren">("alan");
  const [aktifKat, setAktifKat] = useState("Tümü");
  const [destekAcik, setDestekAcik] = useState(false);
  const [destekMesaj, setDestekMesaj] = useState("");
  const [destekGonderildi, setDestekGonderildi] = useState(false);
  const [sayfa, setSayfa] = useState(1);
  const SAYFA_BOYUTU = 12;

  useEffect(() => {
    if (initialIlanlar.length === 100) {
      const veriCek = async () => {
        try {
          const res = await fetch("/api/ilanlar?limit=200&skip=100&durum=aktif");
          const data = await res.json();
          const liste = data.ilanlar || data.data || data || [];
          if (liste.length > 0) setIlanlar(prev => [...prev, ...liste]);
        } catch {}
      };
      setTimeout(veriCek, 800);
    }
  }, [initialIlanlar.length]);

  useEffect(() => { setSayfa(1); }, [aktifTip, aktifRol, aktifKat, aramaQ]);

  const kategoriler = useMemo(() => {
    const liste = aktifTip === "ticari" ? TICARI_SEKTORLER : BIREYSEL_SEKTORLER;
    const tumKategori = {
      id: "Tümü", ad: "Tüm Sektörler", icon: "🌐",
      tip: "both", renk: "#0f172a", altKategoriler: [],
      butceBirimi: "TL", hizmetAlanFormu: [], hizmetVerenFormu: []
    } as any;
    return [tumKategori, ...liste];
  }, [aktifTip]);

  const filtreliIlanlar = useMemo(() => {
    return ilanlar.filter(i => {
      if (i.tip !== aktifTip) return false;
      if (i.rol !== aktifRol) return false;
      if (aktifKat !== "Tümü" && i.sektorId !== aktifKat) return false;
      if (aramaQ) {
        const q = aramaQ.toLowerCase();
        return (
          i.baslik?.toLowerCase().includes(q) ||
          i.sehir?.toLowerCase().includes(q) ||
          i.ulke?.toLowerCase().includes(q) ||
          i.kategori?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [ilanlar, aktifTip, aktifRol, aktifKat, aramaQ]);

  const sayfaIlanlar = useMemo(() => {
    const start = (sayfa - 1) * SAYFA_BOYUTU;
    return filtreliIlanlar.slice(start, start + SAYFA_BOYUTU);
  }, [filtreliIlanlar, sayfa]);

  const toplamSayfa = Math.ceil(filtreliIlanlar.length / SAYFA_BOYUTU);
  const fmt = (n: number) => new Intl.NumberFormat("tr-TR").format(n || 0);

  // ✅ Optimize edilmiş görsel fonksiyonu
  const gorsel = (i: Ilan) => {
    const url = i.resimUrl || i.medyalar?.[0] || null;
    if (!url) return null;
    if (url.includes("res.cloudinary.com")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto:eco,w_400,h_185,c_fill/");
    }
    if (url.includes("unsplash.com")) {
      return `${url.split("?")[0]}?auto=format&fit=crop&w=400&q=60`;
    }
    return url;
  };

  const handleDestekGonder = async () => {
    if (!destekMesaj.trim()) return;
    try {
      await fetch("/api/destek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mesaj: destekMesaj, email: session?.user?.email }),
      });
    } catch {}
    setDestekGonderildi(true);
    setTimeout(() => {
      setDestekAcik(false);
      setDestekGonderildi(false);
      setDestekMesaj("");
    }, 3000);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SwapHubs",
            "url": "https://swaphubs.com",
            "description": "Küresel Hizmet & Ürün Takas Merkezi",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://swaphubs.com/ilanlar?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />

      {/* ── NAVBAR ── */}
      <nav className="nav">
        <a className="nav-logo" onClick={() => router.push("/")}>
          <div className="nav-logo-icon">S</div>
          Swap<span>Hubs</span>
        </a>
        <div className="nav-right">
          <button className="nav-btn" onClick={() => router.push("/ilanlar")}>
            🔍 <span>Keşfet</span>
          </button>
          {status === "authenticated" ? (
            <button className="nav-btn primary" onClick={() => router.push("/panel")}>
              👤 <span>Panelim</span>
            </button>
          ) : (
            <>
              <button className="nav-btn" onClick={() => router.push("/giris")}>Giriş Yap</button>
              <button className="nav-btn primary" onClick={() => router.push("/kayit")}>Üye Ol</button>
            </>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-badge">🌍 Global Hizmet & Ürün Merkezi</div>
        <h1>Türkiye'den <em>Dünyaya,</em><br />Dünyadan <em>Türkiye'ye</em></h1>
        <p className="hero-sub">
          Üretici, tedarikçi, hizmet sağlayıcı ve alıcıları tek platformda buluşturuyoruz.
          İlan verin, teklif alın — tamamen ücretsiz.
        </p>
        <div className="kontrol">
          <div className="toggle-row">
            <button
              className={`toggle-btn ${aktifTip === "bireysel" ? "on-bireysel" : ""}`}
              onClick={() => { setAktifTip("bireysel"); setAktifKat("Tümü"); }}
            >
              👤 BİREYSEL
            </button>
            <button
              className={`toggle-btn ${aktifTip === "ticari" ? "on-ticari" : ""}`}
              onClick={() => { setAktifTip("ticari"); setAktifKat("Tümü"); }}
            >
              🏭 TİCARİ & ENDÜSTRİYEL
            </button>
          </div>
          <div className="rol-row">
            <button
              className={`rol-btn ${aktifRol === "alan" ? "on-alan" : ""}`}
              onClick={() => setAktifRol("alan")}
            >
              🛒 {aktifTip === "ticari" ? "Tedarikçi / Üretici Arıyorum" : "Hizmet Almak İstiyorum"}
              <small>İlan verin, teklifler size gelsin</small>
            </button>
            <button
              className={`rol-btn ${aktifRol === "veren" ? "on-veren" : ""}`}
              onClick={() => setAktifRol("veren")}
            >
              💼 {aktifTip === "ticari" ? "Üretim / Kapasite Sunuyorum" : "Hizmet Vermek İstiyorum"}
              <small>Hizmetinizi sergileyin, müşteri bulun</small>
            </button>
          </div>
          <div className="arama-box">
            <input
              type="text"
              placeholder={
                aktifTip === "ticari"
                  ? "Örn: İzmir Fason Tekstil, Ankara Makine..."
                  : "Örn: Boya Ustası, İngilizce Dersi, Nakliye..."
              }
              value={aramaQ}
              onChange={e => setAramaQ(e.target.value)}
              onKeyDown={e => e.key === "Enter" && router.push(`/ilanlar?q=${aramaQ}&tip=${aktifTip}&rol=${aktifRol}`)}
            />
            <button
              className="arama-btn"
              onClick={() => router.push(`/ilanlar?q=${aramaQ}&tip=${aktifTip}&rol=${aktifRol}`)}
            >
              Ara & Listele
            </button>
          </div>
        </div>
      </header>

      {/* ── STATS ── */}
      <div className="stats-bar">
        {STATS.map(s => (
          <div key={s.l} className="stat-item">
            <div className="stat-v">{s.v}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── KATEGORİ ── */}
      <div className="kat-wrap">
        {kategoriler.map(k => (
          <div
            key={k.id}
            className={`kat-chip ${aktifKat === k.id ? "on" : ""}`}
            onClick={() => setAktifKat(k.id)}
          >
            <span>{k.icon}</span> {k.id === "Tümü" ? "Tüm Sektörler" : k.ad}
          </div>
        ))}
      </div>

      {/* ── VİTRİN ── */}
      <main className="vitrin-wrap">
        <div className="vitrin-head">
          <div>
            <h2 className="vitrin-title">
              {aktifTip === "ticari" ? "🏭 Ticari Pazar Yeri" : "👤 Bireysel İlanlar"}
            </h2>
            <p className="vitrin-sub">
              {filtreliIlanlar.length > 0
                ? `${filtreliIlanlar.length} ilan bulundu`
                : "Henüz ilan yok — ilk ilanı siz verin!"}
            </p>
          </div>
          <button
            className="nav-btn primary"
            style={{ borderRadius: "12px", padding: "10px 20px" }}
            onClick={() => router.push(`/ilan-ver?tip=${aktifTip}&rol=${aktifRol}`)}
          >
            ➕ {aktifRol === "alan" ? "Talep İlanı Oluştur" : "Hizmet İlanı Oluştur"}
          </button>
        </div>

        <div className="ilan-grid">
          {yukleniyor ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ borderRadius: 16, overflow: "hidden", background: "#fff", border: "1px solid var(--border)" }}>
                <div className="skeleton" style={{ height: 185 }} />
                <div style={{ padding: 15 }}>
                  <div className="skeleton" style={{ height: 12, width: "60%", marginBottom: 10 }} />
                  <div className="skeleton" style={{ height: 18, marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: "40%" }} />
                </div>
              </div>
            ))
          ) : sayfaIlanlar.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">📭</div>
              <p className="empty-title">Bu kriterlere uygun ilan bulunamadı</p>
              <p className="empty-sub">İlk ilanı siz verin — teklif almaya hemen başlayın!</p>
              <button
                className="nav-btn primary"
                style={{ borderRadius: 12, padding: "11px 28px", fontSize: ".9rem" }}
                onClick={() => router.push(`/ilan-ver?tip=${aktifTip}&rol=${aktifRol}`)}
              >
                Hemen İlan Ver
              </button>
            </div>
          ) : (
            sayfaIlanlar.map((ilan, idx) => (
              <div
                key={ilan._id}
                className="kart"
                onClick={() => router.push(`/ilan/${ilan._id}`)}
              >
                <div className="kart-img">
                  {gorsel(ilan) ? (
                    <img
                      src={gorsel(ilan)!}
                      alt={ilan.baslik}
                      loading={idx < 4 ? "eager" : "lazy"}
                      fetchPriority={idx === 0 ? "high" : "auto"}
                      width={400}
                      height={185}
                    />
                  ) : (
                    <span>
                      {ilan.sektorId === "turizm" ? "🏨"
                        : ilan.sektorId === "uretim" ? "🏭"
                        : ilan.sektorId === "giyim" ? "👗"
                        : ilan.sektorId === "lojistik" ? "🚢"
                        : ilan.sektorId === "gida" ? "🌾"
                        : ilan.tip === "ticari" ? "🏭" : "📋"}
                    </span>
                  )}
                  <div className="kart-badges">
                    <span className={`badge ${ilan.tip === "ticari" ? "b-ticari" : "b-bireysel"}`}>
                      {ilan.tip === "ticari" ? "TİCARİ" : "BİREYSEL"}
                    </span>
                    <span className={`badge ${ilan.rol === "alan" ? "b-talep" : "b-hizmet"}`}>
                      {ilan.rol === "alan" ? "🙋 TALEP" : "💼 HİZMET"}
                    </span>
                    {ilan.yapay === false && <span className="badge b-yeni">✓ GERÇEK</span>}
                  </div>
                </div>
                <div className="kart-body">
                  <div className="kart-kat">{ilan.kategori || ilan.sektorId || "Genel"}</div>
                  <div className="kart-baslik">{ilan.baslik}</div>
                  <div className="kart-meta">
                    <span>📍 {ilan.ulke && ilan.ulke !== "Türkiye" ? `${ilan.ulke} · ` : ""}{ilan.sehir || "Global"}</span>
                    <span>📅 {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}</span>
                    {(ilan.teklifSayisi || 0) > 0 && <span>💼 {ilan.teklifSayisi} teklif</span>}
                  </div>
                  <div className="kart-foot">
                    <div className="kart-butce">
                      {(ilan.butceMin || 0) > 0
                        ? `${fmt(ilan.butceMin!)} ${ilan.butceBirimi || "₺"}`
                        : "Teklif Al"}
                    </div>
                    <button
                      className={`kart-btn ${ilan.rol === "alan" ? "red" : ""}`}
                      onClick={e => { e.stopPropagation(); router.push(`/ilan/${ilan._id}`); }}
                    >
                      {ilan.rol === "alan" ? "Teklif Ver →" : "İncele →"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {toplamSayfa > 1 && (
          <div className="pagination">
            <button className="page-btn" onClick={() => setSayfa(p => Math.max(1, p - 1))} disabled={sayfa === 1}>‹</button>
            {Array.from({ length: toplamSayfa }, (_, i) => i + 1).map(p => (
              <button key={p} className={`page-btn ${p === sayfa ? "on" : ""}`} onClick={() => setSayfa(p)}>{p}</button>
            ))}
            <button className="page-btn" onClick={() => setSayfa(p => Math.min(toplamSayfa, p + 1))} disabled={sayfa === toplamSayfa}>›</button>
          </div>
        )}
      </main>

      {/* ── DESTEK FAB ── */}
      <button className="destek-fab" onClick={() => setDestekAcik(p => !p)} title="Canlı Destek">
        {destekAcik ? "✕" : "💬"}
      </button>

      {destekAcik && (
        <div className="destek-panel">
          <div className="destek-head">
            <h4>💬 Canlı Destek Hattı</h4>
            <button
              onClick={() => setDestekAcik(false)}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,.6)", cursor: "pointer", fontSize: "1.1rem" }}
            >✕</button>
          </div>
          <div className="destek-body">
            {destekGonderildi ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>✅</div>
                <p style={{ fontWeight: 700, color: "#059669" }}>Mesajınız alındı!</p>
                <p style={{ fontSize: ".85rem", color: "#64748b", marginTop: 4 }}>En kısa sürede dönüş yapacağız.</p>
              </div>
            ) : (
              <>
                <p style={{ fontSize: ".82rem", color: "#64748b", marginBottom: 10, lineHeight: 1.5 }}>
                  Soru, öneri veya sorunlarınızı yazın — ekibimiz size özel yanıt verir.
                </p>
                <textarea
                  className="destek-ta"
                  placeholder="Mesajınızı yazın..."
                  value={destekMesaj}
                  onChange={e => setDestekMesaj(e.target.value)}
                />
                {session?.user?.email && (
                  <p style={{ fontSize: ".75rem", color: "#94a3b8", marginTop: 4 }}>
                    📧 {session.user.email} üzerinden yanıtlanacak
                  </p>
                )}
                <button className="destek-send" onClick={handleDestekGonder}>Gönder →</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
