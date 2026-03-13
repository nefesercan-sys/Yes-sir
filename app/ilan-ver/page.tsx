"use client";
// ============================================================
// SwapHubs — app/ilan-ver/page.tsx
// Gelişmiş İlan Formu — Ülke/şehir, sektöre özel form, medya
// ============================================================
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { SEKTORLER, BIREYSEL_SEKTORLER, TICARI_SEKTORLER, Sektor, FormAlan } from "@/lib/sektorler";
import { COUNTRIES, getCitiesForCountry } from "@/lib/countries";
import MedyaYukleyici from "@/app/components/MedyaYukleyici";
import { Suspense } from "react";

function IlanVerIcerik() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initTip = (searchParams.get("tip") as "bireysel" | "ticari") || "ticari";
  const initRol = (searchParams.get("rol") as "alan" | "veren") || "alan";

  const [adim, setAdim] = useState(1);
  const [tip, setTip] = useState<"bireysel" | "ticari">(initTip);
  const [rol, setRol] = useState<"alan" | "veren">(initRol);
  const [seciliSektor, setSeciliSektor] = useState<Sektor | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [medyalar, setMedyalar] = useState<{ url: string; tip: "resim" | "video" }[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");

  // Ülke/şehir state
  const [seciliUlke, setSeciliUlke] = useState("TR");
  const [sehirler, setSehirler] = useState<string[]>([]);

  useEffect(() => {
    setSehirler(getCitiesForCountry(seciliUlke));
  }, [seciliUlke]);

  const gosterilecekSektorler = tip === "bireysel" ? BIREYSEL_SEKTORLER : TICARI_SEKTORLER;
  const aktifForm = seciliSektor
    ? (rol === "alan" ? seciliSektor.hizmetAlanFormu : seciliSektor.hizmetVerenFormu)
    : [];

  const setField = (key: string, val: any) => setFormData(p => ({ ...p, [key]: val }));
  const toggleMulti = (key: string, val: string) => {
    const mevcut: string[] = formData[key] || [];
    setField(key, mevcut.includes(val) ? mevcut.filter(v => v !== val) : [...mevcut, val]);
  };

  const handleMedyaYuklendi = (url: string) => {
    const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(url);
    setMedyalar(p => [...p, { url, tip: isVideo ? "video" : "resim" }]);
  };

  const handleYayinla = async () => {
    if (!seciliSektor) return;
    const zorunlular = aktifForm.filter(f => f.zorunlu);
    for (const f of zorunlular) {
      if (!formData[f.key]) {
        setHata(`"${f.label}" alanı zorunludur`);
        return;
      }
    }
    if (!formData.baslik?.trim()) {
      setHata("İlan başlığı zorunludur");
      return;
    }
    setYukleniyor(true);
    setHata("");
    try {
      const ulkeObj = COUNTRIES.find(c => c.code === seciliUlke);
      const res = await fetch("/api/ilanlar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sektorId: seciliSektor.id,
          baslik: formData.baslik,
          kategori: formData.altKategori || seciliSektor.ad,
          formData: { ...formData, ulke: ulkeObj?.name || formData.ulke },
          medyalar: medyalar.map(m => m.url),
          butceMin: Number(formData.butceMin) || Number(formData.butceMin) || 0,
          butceMax: Number(formData.butceMax) || Number(formData.butceMax) || 0,
          butceBirimi: seciliSektor.butceBirimi,
          tip,
          rol,
          ulke: ulkeObj?.name || "Türkiye",
          sehir: formData.sehir || "",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(`/ilan/${data.id}?yeni=1`);
      } else {
        setHata(data.error || "Bir hata oluştu");
      }
    } catch {
      setHata("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
    setYukleniyor(false);
  };

  const INP: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: 11,
    border: "1.5px solid #e2e8f0", fontSize: 14,
    fontFamily: "inherit", outline: "none", background: "#fff",
    color: "#0f172a", transition: "border-color .15s",
  };

  const renderAlan = (alan: FormAlan) => {
    // Ülke ve şehir alanlarını override ediyoruz
    if (alan.key === "ulke") {
      return (
        <select
          value={seciliUlke}
          onChange={e => { setSeciliUlke(e.target.value); setField("sehir", ""); }}
          style={INP}
        >
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
          ))}
        </select>
      );
    }
    if (alan.key === "sehir") {
      const cities = sehirler;
      if (cities.length > 0) {
        return (
          <select
            value={formData.sehir || ""}
            onChange={e => setField("sehir", e.target.value)}
            style={INP}
          >
            <option value="">Şehir seçin</option>
            {cities.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        );
      }
      return (
        <input
          type="text"
          value={formData.sehir || ""}
          onChange={e => setField("sehir", e.target.value)}
          placeholder="Şehir / Bölge"
          style={INP}
        />
      );
    }

    switch (alan.tip) {
      case "text":
      case "number":
        return (
          <input
            type={alan.tip}
            value={formData[alan.key] || ""}
            onChange={e => setField(alan.key, e.target.value)}
            placeholder={alan.placeholder}
            style={INP}
          />
        );
      case "date":
        return (
          <input
            type="date"
            value={formData[alan.key] || ""}
            onChange={e => setField(alan.key, e.target.value)}
            style={INP}
          />
        );
      case "daterange":
        return (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <input type="date" placeholder="Başlangıç" value={formData[alan.key + "_bas"] || ""} onChange={e => setField(alan.key + "_bas", e.target.value)} style={INP} />
            <input type="date" placeholder="Bitiş" value={formData[alan.key + "_bit"] || ""} onChange={e => setField(alan.key + "_bit", e.target.value)} style={INP} />
          </div>
        );
      case "textarea":
        return (
          <textarea
            value={formData[alan.key] || ""}
            onChange={e => setField(alan.key, e.target.value)}
            placeholder={alan.placeholder}
            rows={4}
            style={{ ...INP, resize: "vertical", minHeight: 100 }}
          />
        );
      case "select":
        return (
          <select value={formData[alan.key] || ""} onChange={e => setField(alan.key, e.target.value)} style={INP}>
            <option value="">Seçin...</option>
            {alan.secenekler?.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        );
      case "multiselect":
        return (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {alan.secenekler?.map(s => {
              const secili = (formData[alan.key] || []).includes(s);
              return (
                <button
                  key={s} type="button"
                  onClick={() => toggleMulti(alan.key, s)}
                  style={{
                    padding: "7px 12px", borderRadius: 8,
                    border: `1.5px solid ${secili ? "#2563eb" : "#e2e8f0"}`,
                    background: secili ? "#2563eb" : "#fff",
                    color: secili ? "#fff" : "#475569",
                    fontFamily: "inherit", fontSize: 12, fontWeight: 600,
                    cursor: "pointer", transition: "all .12s",
                  }}
                >
                  {secili ? "✓ " : ""}{s}
                </button>
              );
            })}
          </div>
        );
      case "range":
        return (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ position: "relative" }}>
              {alan.birim && (
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 13, pointerEvents: "none" }}>
                  {alan.birim}
                </span>
              )}
              <input
                type="number" placeholder="Min"
                value={formData[alan.key + "Min"] || ""}
                onChange={e => setField(alan.key + "Min", e.target.value)}
                style={{ ...INP, paddingLeft: alan.birim ? 32 : 14 }}
              />
            </div>
            <div style={{ position: "relative" }}>
              {alan.birim && (
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 13, pointerEvents: "none" }}>
                  {alan.birim}
                </span>
              )}
              <input
                type="number" placeholder="Maks"
                value={formData[alan.key + "Max"] || ""}
                onChange={e => setField(alan.key + "Max", e.target.value)}
                style={{ ...INP, paddingLeft: alan.birim ? 32 : 14 }}
              />
            </div>
          </div>
        );
      case "toggle":
        const togVal = formData[alan.key] || false;
        return (
          <div
            onClick={() => setField(alan.key, !togVal)}
            style={{
              width: 52, height: 28, borderRadius: 14,
              background: togVal ? "#2563eb" : "#e2e8f0",
              cursor: "pointer", position: "relative", transition: "background .2s",
            }}
          >
            <div style={{
              width: 24, height: 24, borderRadius: "50%", background: "#fff",
              position: "absolute", top: 2,
              left: togVal ? 26 : 2,
              transition: "left .2s",
              boxShadow: "0 1px 4px rgba(0,0,0,.2)",
            }} />
          </div>
        );
      case "adres":
        return (
          <textarea
            value={formData[alan.key] || ""}
            onChange={e => setField(alan.key, e.target.value)}
            placeholder="Tam adres..."
            rows={3}
            style={{ ...INP, resize: "vertical" }}
          />
        );
      default:
        return null;
    }
  };

  const gruplar = aktifForm.reduce((acc, alan) => {
    const g = alan.grup || "Genel";
    if (!acc[g]) acc[g] = [];
    acc[g].push(alan);
    return acc;
  }, {} as Record<string, FormAlan[]>);

  if (status === "loading") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#64748b" }}>
        Yükleniyor... ⏳
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: 80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Unbounded:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        input:focus, select:focus, textarea:focus { border-color: #2563eb !important; box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
        input[type=number]::-webkit-inner-spin-button { opacity: 1; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "#0f172a", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,.3)" }}>
        <button
          onClick={() => adim > 1 ? setAdim(p => p - 1) : router.push("/")}
          style={{ background: "rgba(255,255,255,.1)", border: "none", color: "#fff", width: 38, height: 38, borderRadius: 10, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
        >←</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ color: "#fff", fontSize: 16, fontWeight: 800, fontFamily: "Unbounded, sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {adim === 1 ? "İlan Ver — Sektör Seç" : adim === 2 ? `${seciliSektor?.icon} ${seciliSektor?.ad}` : "📸 Medya & Yayınla"}
          </h1>
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: 11, marginTop: 2 }}>
            Adım {adim} / 3 {seciliSektor ? `· ${tip === "ticari" ? "TİCARİ" : "BİREYSEL"} · ${rol === "alan" ? "TALEP" : "HİZMET"}` : ""}
          </p>
        </div>
        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
          {[1, 2, 3].map(a => (
            <div key={a} style={{ width: 32, height: 4, borderRadius: 2, background: a <= adim ? "#f59e0b" : "rgba(255,255,255,.15)", transition: ".2s" }} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>
        {hata && (
          <div style={{ padding: "12px 16px", borderRadius: 12, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 13, marginBottom: 14, fontWeight: 600 }}>
            ⚠️ {hata}
          </div>
        )}

        {/* ── ADIM 1: TİP + ROL + SEKTÖR ── */}
        {adim === 1 && (
          <div>
            {/* TİP & ROL SEÇİMİ */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".06em" }}>İlan Tipi</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                {(["bireysel", "ticari"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTip(t)}
                    style={{
                      flex: 1, padding: "11px 8px", borderRadius: 10,
                      border: `2px solid ${tip === t ? (t === "ticari" ? "#f59e0b" : "#2563eb") : "#e2e8f0"}`,
                      background: tip === t ? (t === "ticari" ? "#fffbeb" : "#eff6ff") : "#fff",
                      color: tip === t ? (t === "ticari" ? "#92400e" : "#1d4ed8") : "#64748b",
                      fontFamily: "inherit", fontWeight: 700, fontSize: 13, cursor: "pointer",
                    }}
                  >
                    {t === "bireysel" ? "👤 Bireysel" : "🏭 Ticari / Kurumsal"}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".06em" }}>Rolünüz</p>
              <div style={{ display: "flex", gap: 8 }}>
                {(["alan", "veren"] as const).map(r => (
                  <button
                    key={r}
                    onClick={() => setRol(r)}
                    style={{
                      flex: 1, padding: "11px 8px", borderRadius: 10,
                      border: `2px solid ${rol === r ? (r === "alan" ? "#0f172a" : "#dc2626") : "#e2e8f0"}`,
                      background: rol === r ? (r === "alan" ? "#0f172a" : "#dc2626") : "#fff",
                      color: rol === r ? "#fff" : "#64748b",
                      fontFamily: "inherit", fontWeight: 700, fontSize: 13, cursor: "pointer",
                    }}
                  >
                    {r === "alan" ? "🛒 Hizmet / Ürün Alıyorum" : "💼 Hizmet / Ürün Veriyorum"}
                  </button>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", fontFamily: "Unbounded, sans-serif", marginBottom: 6 }}>
              Sektör Seçin
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 18 }}>
              Sektörünüze özel form alanları otomatik gelir.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))", gap: 10 }}>
              {gosterilecekSektorler.map(s => (
                <div
                  key={s.id}
                  onClick={() => { setSeciliSektor(s); setFormData({}); setAdim(2); }}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: `2px solid ${seciliSektor?.id === s.id ? s.renk : "#e2e8f0"}`,
                    padding: "18px 12px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all .15s",
                    boxShadow: seciliSektor?.id === s.id ? `0 4px 16px ${s.renk}30` : "none",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = s.renk)}
                  onMouseLeave={e => { if (seciliSektor?.id !== s.id) e.currentTarget.style.borderColor = "#e2e8f0"; }}
                >
                  <p style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</p>
                  <p style={{ fontSize: 12, fontWeight: 800, color: "#0f172a", marginBottom: 3 }}>{s.ad}</p>
                  <p style={{ fontSize: 10, color: "#94a3b8" }}>
                    {(s.altKategoriler?.length || 0)} alt kategori
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ADIM 2: FORM ── */}
        {adim === 2 && seciliSektor && (
          <div>
            {/* Sektör başlık */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, padding: 16, background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: seciliSektor.renk + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                {seciliSektor.icon}
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", fontFamily: "Unbounded, sans-serif" }}>{seciliSektor.ad}</h2>
                <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>
                  {rol === "alan" ? "📋 Talep İlanı — Ne arıyorsunuz?" : "💼 Hizmet / Ürün İlanı — Ne sunuyorsunuz?"}
                </p>
              </div>
              <button onClick={() => setAdim(1)} style={{ marginLeft: "auto", background: "#f1f5f9", border: "none", padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#475569", fontFamily: "inherit", flexShrink: 0 }}>
                Değiştir
              </button>
            </div>

            {/* Başlık */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>
                İlan Başlığı <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                value={formData.baslik || ""}
                onChange={e => setField("baslik", e.target.value)}
                placeholder="Kısa, açıklayıcı bir başlık yazın..."
                style={INP}
              />
              <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>
                Örn: {seciliSektor.id === "uretim" ? "100 Adet Bayan Mont Fason Üretim Arıyorum" : seciliSektor.id === "turizm" ? "Antalya 5 Yıldızlı Otel Paketi — 2 Kişi 7 Gece" : "Başlığı kısa ve net tutun"}
              </p>
            </div>

            {/* GRUP BAZLI FORM ALANLARI */}
            {Object.entries(gruplar).map(([grupAdi, alanlar]) => (
              <div key={grupAdi} style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
                <h3 style={{
                  fontSize: 11, fontWeight: 800, color: seciliSektor.renk,
                  textTransform: "uppercase", letterSpacing: ".08em",
                  marginBottom: 14, paddingBottom: 10,
                  borderBottom: `2px solid ${seciliSektor.renk}20`,
                }}>
                  {grupAdi}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {alanlar.map(alan => (
                    <div key={alan.key}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "flex", alignItems: "center", gap: 5, marginBottom: 7, flexWrap: "wrap" }}>
                        {alan.label}
                        {alan.zorunlu && <span style={{ color: "#dc2626", fontSize: 14 }}>*</span>}
                        {alan.birim && alan.tip !== "range" && (
                          <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 11 }}>({alan.birim})</span>
                        )}
                      </label>
                      {renderAlan(alan)}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={() => { setHata(""); setAdim(3); }}
              style={{ width: "100%", padding: 15, borderRadius: 14, background: "#2563eb", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 16px rgba(37,99,235,.3)" }}
            >
              Devam Et → Fotoğraf & Video
            </button>
          </div>
        )}

        {/* ── ADIM 3: MEDYA + YAYINLA ── */}
        {adim === 3 && seciliSektor && (
          <div>
            <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", fontFamily: "Unbounded, sans-serif", marginBottom: 4 }}>
                📸 Fotoğraf & Video
              </h2>
              <p style={{ color: "#94a3b8", fontSize: 12, marginBottom: 16, lineHeight: 1.6 }}>
                Görsel eklemek teklif alma oranınızı <strong>3 kat</strong> artırır. Max 10 fotoğraf, 3 video.
              </p>

              {medyalar.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
                  {medyalar.map((m, i) => (
                    <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 12, overflow: "hidden", background: "#f1f5f9", border: `2px solid ${i === 0 ? "#f59e0b" : "#e2e8f0"}` }}>
                      {m.tip === "video" ? (
                        <video src={m.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <img src={m.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      )}
                      {i === 0 && (
                        <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", background: "#f59e0b", color: "#0f172a", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>
                          KAPAK
                        </div>
                      )}
                      <button
                        onClick={() => setMedyalar(p => p.filter((_, j) => j !== i))}
                        style={{ position: "absolute", top: 4, right: 4, width: 22, height: 22, borderRadius: "50%", background: "#dc2626", border: "none", color: "#fff", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}
                      >×</button>
                    </div>
                  ))}
                </div>
              )}

              <MedyaYukleyici onYuklendi={handleMedyaYuklendi} />
            </div>

            {/* Özet Kutusu */}
            <div style={{ background: "#f8fafc", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>📋 İlan Özeti</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { l: "Başlık", v: formData.baslik },
                  { l: "Sektör", v: seciliSektor.ad },
                  { l: "Tip", v: tip === "ticari" ? "Ticari" : "Bireysel" },
                  { l: "Rol", v: rol === "alan" ? "Hizmet / Ürün Alıyorum" : "Hizmet / Ürün Veriyorum" },
                  { l: "Ülke", v: COUNTRIES.find(c => c.code === seciliUlke)?.name },
                  { l: "Şehir", v: formData.sehir },
                  { l: "Medya", v: medyalar.length > 0 ? `${medyalar.length} dosya` : "Yok" },
                ].filter(r => r.v).map(r => (
                  <div key={r.l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderBottom: "1px solid #e2e8f0" }}>
                    <span style={{ color: "#64748b", fontWeight: 600 }}>{r.l}</span>
                    <span style={{ color: "#0f172a", fontWeight: 700, textAlign: "right", maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {!session && (
              <div style={{ padding: 14, borderRadius: 12, background: "#fffbeb", border: "1px solid #fde68a", marginBottom: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>ℹ️ Üye Olmadan İlan Veriyorsunuz</p>
                <p style={{ fontSize: 11, color: "#78350f", lineHeight: 1.6 }}>
                  İlanınız yayınlanacak. Teklif kabul etmek için üye olmanız gerekecek.
                </p>
              </div>
            )}

            <button
              onClick={handleYayinla}
              disabled={yukleniyor}
              style={{
                width: "100%", padding: 16, borderRadius: 14,
                background: yukleniyor ? "#94a3b8" : "#f59e0b",
                border: "none", color: yukleniyor ? "#fff" : "#0f172a",
                fontFamily: "inherit", fontSize: 15, fontWeight: 800,
                cursor: yukleniyor ? "not-allowed" : "pointer",
                boxShadow: yukleniyor ? "none" : "0 4px 20px rgba(245,158,11,.4)",
                transition: ".2s",
              }}
            >
              {yukleniyor ? "⏳ İlan Yayınlanıyor..." : "⚡ İlanı Yayınla — Teklifler Gelsin"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function IlanVerPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#64748b" }}>
        Yükleniyor... ⏳
      </div>
    }>
      <IlanVerIcerik />
    </Suspense>
  );
}
