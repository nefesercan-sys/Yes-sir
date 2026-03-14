"use client";
// ============================================================
// SwapHubs — app/ilanlar/page.tsx
// Tüm ilanlar — arama, filtre, sektör, ülke/şehir
// NOT: generateMetadata KALDIRILDI — "use client" ile çakışıyor
// ============================================================
import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { SEKTORLER, KATEGORILER_ANA } from "@/lib/sektorler";
import { COUNTRIES } from "@/lib/countries";

interface Ilan {
  _id: string;
  baslik: string;
  sektorId?: string;
  kategori?: string;
  tip: "bireysel" | "ticari";
  rol: "alan" | "veren";
  ulke?: string;
  sehir?: string;
  butceMin?: number;
  butceMax?: number;
  butceBirimi?: string;
  resimUrl?: string;
  medyalar?: string[];
  createdAt: string;
  teklifSayisi?: number;
  goruntulenme?: number;
  yapay?: boolean;
}

function IlanlarIcerik() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [toplam, setToplam] = useState(0);

  // Filtreler
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [tip, setTip] = useState<"" | "bireysel" | "ticari">(
    (searchParams.get("tip") as any) || ""
  );
  const [rol, setRol] = useState<"" | "alan" | "veren">(
    (searchParams.get("rol") as any) || ""
  );
  const [sektor, setSektor] = useState(searchParams.get("sektor") || "");
  const [ulke, setUlke] = useState(searchParams.get("ulke") || "");
  const [sehir, setSehir] = useState(searchParams.get("sehir") || "");
  const [sort, setSort] = useState("yeni");
  const [sayfa, setSayfa] = useState(1);
  const LIMIT = 20;

  useEffect(() => {
    const fetchIlanlar = async () => {
      setYukleniyor(true);
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (tip) params.set("tip", tip);
      if (rol) params.set("rol", rol);
      if (sektor) params.set("sektor", sektor);
      if (ulke) params.set("ulke", ulke);
      if (sehir) params.set("sehir", sehir);
      params.set("sort", sort);
      params.set("limit", String(LIMIT));
      params.set("skip", String((sayfa - 1) * LIMIT));

      try {
        const res = await fetch(`/api/ilanlar?${params}`);
        const data = await res.json();
        setIlanlar(data.ilanlar || data.data || data || []);
        setToplam(data.toplam || 0);
      } catch {
        setIlanlar([]);
      }
      setYukleniyor(false);
    };
    fetchIlanlar();
  }, [q, tip, rol, sektor, ulke, sehir, sort, sayfa]);

  // Filtre değişince sayfayı sıfırla
  useEffect(() => { setSayfa(1); }, [q, tip, rol, sektor, ulke, sehir, sort]);

  const fmt = (n: number) => new Intl.NumberFormat("tr-TR").format(n || 0);
  const gorsel = (i: Ilan) => i.resimUrl || i.medyalar?.[0] || null;
  const toplamSayfa = Math.ceil(toplam / LIMIT);

  const secilenUlkeObj = COUNTRIES.find(c => c.name === ulke || c.code === ulke);
  const sehirler = secilenUlkeObj?.cities || [];

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Unbounded:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        select, input { font-family: inherit; }
        select:focus, input:focus { outline: none; border-color: #2563eb !important; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "#0f172a", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,.3)" }}>
        <button onClick={() => router.push("/")} style={{ background: "rgba(255,255,255,.1)", border: "none", color: "#fff", padding: "7px 14px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>← Ana Sayfa</button>
        <h1 style={{ color: "#fff", fontSize: 16, fontWeight: 800, fontFamily: "Unbounded, sans-serif", flex: 1 }}>🔍 İlan Ara</h1>
        {session && (
          <button onClick={() => router.push("/panel")} style={{ background: "rgba(255,255,255,.1)", border: "none", color: "#fff", padding: "7px 14px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Panelim</button>
        )}
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 16px", display: "grid", gridTemplateColumns: "260px 1fr", gap: 20, alignItems: "start" }}>

        {/* ── FİLTRE PANELİ ── */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, position: "sticky", top: 76 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>🎛️ Filtreler</h3>

          {/* Arama */}
          <div style={{ marginBottom: 14 }}>
            <label style={LBL}>Arama</label>
            <input
              type="text" value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Başlık, şehir, ülke..."
              style={INP}
            />
          </div>

          {/* Tip */}
          <div style={{ marginBottom: 14 }}>
            <label style={LBL}>Tip</label>
            <select value={tip} onChange={e => setTip(e.target.value as any)} style={INP}>
              <option value="">Tümü</option>
              <option value="ticari">🏭 Ticari</option>
              <option value="bireysel">👤 Bireysel</option>
            </select>
          </div>

          {/* Rol */}
          <div style={{ marginBottom: 14 }}>
            <label style={LBL}>Rol</label>
            <select value={rol} onChange={e => setRol(e.target.value as any)} style={INP}>
              <option value="">Tümü</option>
              <option value="alan">🛒 Hizmet / Ürün Alıyor</option>
              <option value="veren">💼 Hizmet / Ürün Veriyor</option>
            </select>
          </div>

          {/* Sektör */}
          <div style={{ marginBottom: 14 }}>
            <label style={LBL}>Sektör</label>
            <select value={sektor} onChange={e => setSektor(e.target.value)} style={INP}>
              <option value="">Tüm Sektörler</option>
              {SEKTORLER.map(s => (
                <option key={s.id} value={s.id}>{s.icon} {s.ad}</option>
              ))}
            </select>
          </div>

          {/* Ülke */}
          <div style={{ marginBottom: 14 }}>
            <label style={LBL}>Ülke</label>
            <select
              value={ulke}
              onChange={e => { setUlke(e.target.value); setSehir(""); }}
              style={INP}
            >
              <option value="">Tüm Ülkeler</option>
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
              ))}
            </select>
          </div>

          {/* Şehir */}
          {ulke && (
            <div style={{ marginBottom: 14 }}>
              <label style={LBL}>Şehir</label>
              {sehirler.length > 0 ? (
                <select value={sehir} onChange={e => setSehir(e.target.value)} style={INP}>
                  <option value="">Tüm Şehirler</option>
                  {sehirler.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              ) : (
                <input type="text" value={sehir} onChange={e => setSehir(e.target.value)} placeholder="Şehir..." style={INP} />
              )}
            </div>
          )}

          {/* Sırala */}
          <div style={{ marginBottom: 14 }}>
            <label style={LBL}>Sıralama</label>
            <select value={sort} onChange={e => setSort(e.target.value)} style={INP}>
              <option value="yeni">🕐 En Yeni</option>
              <option value="populer">🔥 En Popüler</option>
              <option value="butce_asc">💰 Bütçe (Düşük→Yüksek)</option>
              <option value="butce_desc">💰 Bütçe (Yüksek→Düşük)</option>
            </select>
          </div>

          {/* Temizle */}
          {(q || tip || rol || sektor || ulke || sehir) && (
            <button
              onClick={() => { setQ(""); setTip(""); setRol(""); setSektor(""); setUlke(""); setSehir(""); }}
              style={{ width: "100%", padding: "9px", borderRadius: 10, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            >
              ✕ Filtreleri Temizle
            </button>
          )}
        </div>

        {/* ── İLAN LİSTESİ ── */}
        <div>
          {/* Sonuç başlığı */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", fontFamily: "Unbounded, sans-serif" }}>
                {yukleniyor ? "Yükleniyor..." : `${toplam.toLocaleString("tr-TR")} İlan`}
              </h2>
              {(q || tip || rol || sektor || ulke) && (
                <p style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>
                  {[q, tip, rol, sektor, ulke, sehir].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
            <button
              onClick={() => router.push("/ilan-ver")}
              style={{ background: "#f59e0b", border: "none", color: "#0f172a", padding: "10px 20px", borderRadius: 12, fontFamily: "inherit", fontSize: 13, fontWeight: 800, cursor: "pointer" }}
            >
              ➕ İlan Ver
            </button>
          </div>

          {/* Grid */}
          {yukleniyor ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid #e2e8f0" }}>
                  <div style={{ height: 170, background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
                  <div style={{ padding: 14 }}>
                    <div style={{ height: 12, background: "#f1f5f9", borderRadius: 6, marginBottom: 8, width: "60%" }} />
                    <div style={{ height: 16, background: "#f1f5f9", borderRadius: 6, marginBottom: 6 }} />
                    <div style={{ height: 12, background: "#f1f5f9", borderRadius: 6, width: "40%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : ilanlar.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 20, border: "2px dashed #e2e8f0" }}>
              <div style={{ fontSize: "4rem", marginBottom: 12 }}>📭</div>
              <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>İlan bulunamadı</p>
              <p style={{ fontSize: ".9rem", color: "#64748b", marginBottom: 20 }}>Farklı filtreler deneyin veya ilk ilanı siz verin</p>
              <button onClick={() => router.push("/ilan-ver")} style={{ background: "#2563eb", border: "none", color: "#fff", padding: "11px 28px", borderRadius: 12, fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                İlan Ver
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                {ilanlar.map(ilan => (
                  <div
                    key={ilan._id}
                    onClick={() => router.push(`/ilan/${ilan._id}`)}
                    style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden", cursor: "pointer", transition: ".2s", display: "flex", flexDirection: "column" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,.1)"; e.currentTarget.style.borderColor = "#2563eb"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "#e2e8f0"; }}
                  >
                    {/* Görsel */}
                    <div style={{ height: 170, background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", position: "relative", overflow: "hidden" }}>
                      {gorsel(ilan) ? (
                        <img src={gorsel(ilan)!} alt={ilan.baslik} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                      ) : (
                        <span>{ilan.sektorId === "turizm" ? "🏨" : ilan.sektorId === "uretim" ? "🏭" : ilan.sektorId === "giyim" ? "👗" : ilan.tip === "ticari" ? "🏭" : "📋"}</span>
                      )}
                      <div style={{ position: "absolute", top: 8, left: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ fontSize: ".6rem", fontWeight: 800, padding: "3px 8px", borderRadius: 6, background: ilan.tip === "ticari" ? "#f5a623" : "#2563eb", color: ilan.tip === "ticari" ? "#0f172a" : "#fff", textTransform: "uppercase" }}>
                          {ilan.tip === "ticari" ? "TİCARİ" : "BİREYSEL"}
                        </span>
                        <span style={{ fontSize: ".6rem", fontWeight: 800, padding: "3px 8px", borderRadius: 6, background: ilan.rol === "alan" ? "#fff" : "#e8361a", color: ilan.rol === "alan" ? "#0f172a" : "#fff", border: ilan.rol === "alan" ? "1.5px solid #0f172a" : "none", textTransform: "uppercase" }}>
                          {ilan.rol === "alan" ? "TALEP" : "HİZMET"}
                        </span>
                      </div>
                    </div>
                    {/* İçerik */}
                    <div style={{ padding: 14, flex: 1, display: "flex", flexDirection: "column" }}>
                      <p style={{ fontSize: ".68rem", fontWeight: 800, color: "#2563eb", textTransform: "uppercase", marginBottom: 5 }}>{ilan.kategori || ilan.sektorId || "Genel"}</p>
                      <p style={{ fontWeight: 800, fontSize: ".95rem", lineHeight: 1.35, marginBottom: 10, flex: 1, color: "#0f172a" }}>{ilan.baslik}</p>
                      <div style={{ display: "flex", gap: 10, fontSize: ".72rem", color: "#94a3b8", marginBottom: 12, flexWrap: "wrap" }}>
                        <span>📍 {ilan.ulke && ilan.ulke !== "Türkiye" ? `${ilan.ulke} · ` : ""}{ilan.sehir || "Global"}</span>
                        <span>📅 {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
                        <span style={{ fontFamily: "Unbounded, sans-serif", fontWeight: 800, fontSize: ".9rem", color: "#10b981" }}>
                          {(ilan.butceMin || 0) > 0 ? `${fmt(ilan.butceMin!)} ${ilan.butceBirimi || "₺"}` : "Teklif Al"}
                        </span>
                        <button
                          onClick={e => { e.stopPropagation(); router.push(`/ilan/${ilan._id}`); }}
                          style={{ background: ilan.rol === "alan" ? "#e8361a" : "#0f172a", color: "#fff", border: "none", padding: "7px 14px", borderRadius: 8, fontSize: ".72rem", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}
                        >
                          {ilan.rol === "alan" ? "Teklif Ver →" : "İncele →"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGİNASYON */}
              {toplamSayfa > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32, flexWrap: "wrap" }}>
                  <button onClick={() => setSayfa(p => Math.max(1, p - 1))} disabled={sayfa === 1} style={PGBTN(false)}>‹</button>
                  {Array.from({ length: Math.min(toplamSayfa, 7) }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setSayfa(p)} style={PGBTN(p === sayfa)}>{p}</button>
                  ))}
                  <button onClick={() => setSayfa(p => Math.min(toplamSayfa, p + 1))} disabled={sayfa === toplamSayfa} style={PGBTN(false)}>›</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 260px"] { grid-template-columns: 1fr !important; }
          div[style*="position: sticky"][style*="top: 76px"] { position: static !important; }
        }
      `}</style>
    </div>
  );
}

// Stil yardımcıları
const LBL: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 };
const INP: React.CSSProperties = { width: "100%", padding: "9px 12px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 13, fontFamily: "inherit", background: "#fff", color: "#0f172a" };
const PGBTN = (active: boolean): React.CSSProperties => ({
  width: 38, height: 38, borderRadius: 10,
  border: `1.5px solid ${active ? "#0f172a" : "#e2e8f0"}`,
  background: active ? "#0f172a" : "#fff",
  color: active ? "#fff" : "#475569",
  fontFamily: "inherit", fontSize: ".85rem", fontWeight: 700,
  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
});

export default function IlanlarPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#64748b", fontFamily: "sans-serif" }}>
        Yükleniyor... ⏳
      </div>
    }>
      <IlanlarIcerik />
    </Suspense>
  );
}
