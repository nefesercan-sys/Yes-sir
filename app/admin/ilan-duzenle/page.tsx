"use client";
// ============================================================
// SwapHubs — app/ilan-duzenle/[id]/page.tsx
// İlan Düzenleme Sayfası
// - Mevcut ilanı API'den çeker, tüm alanları doldurur
// - Aynı ilan-ver formu mantığı (tek sayfa, scroll)
// - Kaydet: PUT /api/ilanlar/[id]
// ============================================================
import { useState, useEffect, Suspense } from "react";
export const dynamic = "force-dynamic";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { SEKTORLER, Sektor, FormAlan } from "@/lib/sektorler";
import { COUNTRIES, getCitiesForCountry } from "@/lib/countries";
import MedyaYukleyici from "@/app/components/MedyaYukleyici";

function IlanDuzenleIcerik() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const ilanId = params?.id as string;

  const [sayfaYukleniyor, setSayfaYukleniyor] = useState(true);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [hata, setHata] = useState("");
  const [basari, setBasari] = useState("");

  const [tip, setTip] = useState<"bireysel" | "ticari">("ticari");
  const [rol, setRol] = useState<"alan" | "veren">("alan");
  const [seciliSektor, setSeciliSektor] = useState<Sektor | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [medyalar, setMedyalar] = useState<{ url: string; tip: "resim" | "video" }[]>([]);
  const [seciliUlke, setSeciliUlke] = useState("TR");
  const [sehirler, setSehirler] = useState<string[]>([]);

  // ─── İlanı yükle ───
  useEffect(() => {
    if (!ilanId) return;
    (async () => {
      try {
        const res = await fetch(`/api/ilanlar/${ilanId}`);
        if (!res.ok) {
          setHata(res.status === 403 ? "Bu ilanı düzenleme yetkiniz yok." : res.status === 404 ? "İlan bulunamadı." : "İlan yüklenemedi.");
          setSayfaYukleniyor(false);
          return;
        }
        const ilan = await res.json();
        const sektor = SEKTORLER.find(s => s.id === ilan.sektorId) || null;
        setSeciliSektor(sektor);
        setTip(ilan.tip || "ticari");
        setRol(ilan.rol || "alan");
        const ulkeKodu = COUNTRIES.find(c => c.name === ilan.ulke)?.code || "TR";
        setSeciliUlke(ulkeKodu);
        setFormData({
          baslik: ilan.baslik || "",
          aciklama: ilan.aciklama || "",
          iletisim: ilan.iletisim || "",
          adres: ilan.adres || "",
          sehir: ilan.sehir || "",
          butceMin: ilan.butceMin || "",
          butceMax: ilan.butceMax || "",
          ...(ilan.formData || {}),
        });
        if (Array.isArray(ilan.medyalar)) {
          setMedyalar(ilan.medyalar.map((url: string) => ({
            url,
            tip: /\.(mp4|webm|ogg|mov)$/i.test(url) ? "video" : "resim",
          })));
        }
      } catch { setHata("Bağlantı hatası. Lütfen sayfayı yenileyin."); }
      setSayfaYukleniyor(false);
    })();
  }, [ilanId]);

  useEffect(() => {
    setSehirler(getCitiesForCountry(seciliUlke));
  }, [seciliUlke]);

  const setField = (key: string, val: any) => setFormData(p => ({ ...p, [key]: val }));
  const toggleMulti = (key: string, val: string) => {
    const mevcut: string[] = formData[key] || [];
    setField(key, mevcut.includes(val) ? mevcut.filter(v => v !== val) : [...mevcut, val]);
  };

  const handleMedyaYuklendi = (url: string) => {
    const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(url);
    setMedyalar(p => {
      if (isVideo) return [...p.filter(m => m.tip !== "video"), { url, tip: "video" }];
      const r = p.filter(m => m.tip === "resim").length;
      return r < 10 ? [...p, { url, tip: "resim" }] : p;
    });
  };

  const handleGuncelle = async () => {
    if (!seciliSektor) return;
    setHata(""); setBasari("");
    if (!formData.baslik?.trim()) { setHata("İlan başlığı zorunludur"); return; }
    if (!formData.sehir?.trim()) { setHata("Şehir zorunludur"); return; }
    if (!formData.aciklama?.trim()) { setHata("Açıklama zorunludur"); return; }
    if (!formData.iletisim?.trim()) { setHata("İletişim bilgisi zorunludur"); return; }

    setKaydediliyor(true);
    try {
      const ulkeObj = COUNTRIES.find(c => c.code === seciliUlke);
      const res = await fetch(`/api/ilanlar/${ilanId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sektorId: seciliSektor.id,
          baslik: formData.baslik,
          aciklama: formData.aciklama,
          iletisim: formData.iletisim,
          adres: formData.adres,
          kategori: formData.altKategori || seciliSektor.ad,
          formData: { ...formData, ulke: ulkeObj?.name || "Türkiye" },
          medyalar: medyalar.map(m => m.url),
          butceMin: Number(formData.butceMin) || 0,
          butceMax: Number(formData.butceMax) || 0,
          butceBirimi: seciliSektor.butceBirimi,
          tip, rol,
          ulke: ulkeObj?.name || "Türkiye",
          sehir: formData.sehir || "",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setBasari("✅ İlan güncellendi! Yönlendiriliyorsunuz...");
        setTimeout(() => router.push(`/ilan/${ilanId}`), 1800);
      } else setHata(data.error || "Güncelleme başarısız.");
    } catch { setHata("Bağlantı hatası. Lütfen tekrar deneyin."); }
    setKaydediliyor(false);
  };

  const INP: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: 11,
    border: "1.5px solid #e2e8f0", fontSize: 14,
    fontFamily: "inherit", outline: "none", background: "#fff",
    color: "#0f172a", transition: "border-color .15s",
  };

  const renderAlan = (alan: FormAlan) => {
    if (alan.key === "ulke" || alan.key === "sehir") return null;
    switch (alan.tip) {
      case "text":
      case "number":
        return <input type={alan.tip} value={formData[alan.key] || ""} onChange={e => setField(alan.key, e.target.value)} placeholder={alan.placeholder} style={INP} />;
      case "date":
        return <input type="date" value={formData[alan.key] || ""} onChange={e => setField(alan.key, e.target.value)} style={INP} />;
      case "daterange":
        return (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <input type="date" value={formData[alan.key + "_bas"] || ""} onChange={e => setField(alan.key + "_bas", e.target.value)} style={INP} />
            <input type="date" value={formData[alan.key + "_bit"] || ""} onChange={e => setField(alan.key + "_bit", e.target.value)} style={INP} />
          </div>
        );
      case "textarea":
        return <textarea value={formData[alan.key] || ""} onChange={e => setField(alan.key, e.target.value)} placeholder={alan.placeholder} rows={4} style={{ ...INP, resize: "vertical", minHeight: 100 }} />;
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
              return <button key={s} type="button" onClick={() => toggleMulti(alan.key, s)} style={{ padding: "7px 12px", borderRadius: 8, border: `1.5px solid ${secili ? "#2563eb" : "#e2e8f0"}`, background: secili ? "#2563eb" : "#fff", color: secili ? "#fff" : "#475569", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{secili ? "✓ " : ""}{s}</button>;
            })}
          </div>
        );
      case "range":
        return (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {(["Min", "Max"] as const).map(l => (
              <div key={l} style={{ position: "relative" }}>
                {alan.birim && <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 13, pointerEvents: "none" }}>{alan.birim}</span>}
                <input type="number" placeholder={l} value={formData[alan.key + l] || ""} onChange={e => setField(alan.key + l, e.target.value)} style={{ ...INP, paddingLeft: alan.birim ? 32 : 14 }} />
              </div>
            ))}
          </div>
        );
      case "toggle":
        const tv = formData[alan.key] || false;
        return (
          <div onClick={() => setField(alan.key, !tv)} style={{ width: 52, height: 28, borderRadius: 14, background: tv ? "#2563eb" : "#e2e8f0", cursor: "pointer", position: "relative", transition: "background .2s" }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: tv ? 26 : 2, transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.2)" }} />
          </div>
        );
      case "adres":
        return <textarea value={formData[alan.key] || ""} onChange={e => setField(alan.key, e.target.value)} placeholder="Tam adres..." rows={3} style={{ ...INP, resize: "vertical" }} />;
      default: return null;
    }
  };

  const aktifForm = seciliSektor ? (rol === "alan" ? seciliSektor.hizmetAlanFormu : seciliSektor.hizmetVerenFormu) : [];
  const gruplar = aktifForm.reduce((acc, alan) => {
    if (alan.key === "ulke" || alan.key === "sehir") return acc;
    const g = alan.grup || "Genel Detaylar";
    if (!acc[g]) acc[g] = [];
    acc[g].push(alan);
    return acc;
  }, {} as Record<string, FormAlan[]>);

  const resimSayisi = medyalar.filter(m => m.tip === "resim").length;
  const videoSayisi = medyalar.filter(m => m.tip === "video").length;
  const canUploadResim = resimSayisi < 10;
  const canUploadVideo = videoSayisi < 1;
  const canUploadMore = canUploadResim || canUploadVideo;

  // ─── LOADING ───
  if (status === "loading" || sayfaYukleniyor) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", gap: 14, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: 40, height: 40, border: "3px solid #e2e8f0", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
      <p style={{ color: "#64748b", fontSize: 14 }}>İlan yükleniyor...</p>
    </div>
  );

  if (hata && !seciliSektor) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", gap: 16, padding: 24, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <p style={{ fontSize: 40 }}>⚠️</p>
      <p style={{ fontSize: 16, fontWeight: 700, color: "#dc2626", textAlign: "center" }}>{hata}</p>
      <button onClick={() => router.push("/profil")} style={{ padding: "10px 24px", borderRadius: 12, background: "#2563eb", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Profilime Dön</button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: 80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Unbounded:wght@700;800&display=swap');
        *{box-sizing:border-box}
        input:focus,select:focus,textarea:focus{border-color:#2563eb!important;box-shadow:0 0 0 3px rgba(37,99,235,.1)}
      `}</style>

      {/* HEADER */}
      <div style={{ background: "#0f172a", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,.3)" }}>
        <button onClick={() => router.push(`/ilan/${ilanId}`)} style={{ background: "rgba(255,255,255,.1)", border: "none", color: "#fff", width: 38, height: 38, borderRadius: 10, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>←</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: "Unbounded, sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>✏️ İlanı Düzenle</h1>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 11, marginTop: 2 }}>{seciliSektor ? `${seciliSektor.icon} ${seciliSektor.ad}` : ""}</p>
        </div>
        <button onClick={handleGuncelle} disabled={kaydediliyor} style={{ background: kaydediliyor ? "rgba(255,255,255,.1)" : "#f59e0b", border: "none", color: kaydediliyor ? "rgba(255,255,255,.4)" : "#0f172a", padding: "8px 16px", borderRadius: 10, fontFamily: "inherit", fontSize: 13, fontWeight: 800, cursor: kaydediliyor ? "not-allowed" : "pointer", flexShrink: 0 }}>
          {kaydediliyor ? "⏳" : "💾 Kaydet"}
        </button>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>

        {/* MESAJLAR */}
        {hata && <div style={{ padding: "12px 16px", borderRadius: 12, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 13, marginBottom: 14, fontWeight: 600 }}>⚠️ {hata}</div>}
        {basari && <div style={{ padding: "12px 16px", borderRadius: 12, background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", fontSize: 13, marginBottom: 14, fontWeight: 600 }}>{basari}</div>}

        {/* BİLGİ BANNER */}
        <div style={{ padding: "12px 16px", borderRadius: 12, background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", fontSize: 12, marginBottom: 18, fontWeight: 600 }}>
          ✏️ Değişiklikler kaydedildikten sonra ilan sayfanıza yönlendirileceksiniz.
        </div>

        {/* BAŞLIK + ÜLKE + ŞEHİR */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
          <h3 style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 14 }}>📌 Temel Bilgiler</h3>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>İlan Başlığı <span style={{ color: "#dc2626" }}>*</span></label>
            <input value={formData.baslik || ""} onChange={e => setField("baslik", e.target.value)} placeholder="İlan başlığı" style={INP} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>Ülke <span style={{ color: "#dc2626" }}>*</span></label>
              <select value={seciliUlke} onChange={e => { setSeciliUlke(e.target.value); setField("sehir", ""); }} style={INP}>
                {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>Şehir / Bölge <span style={{ color: "#dc2626" }}>*</span></label>
              {sehirler.length > 0
                ? <select value={formData.sehir || ""} onChange={e => setField("sehir", e.target.value)} style={INP}><option value="">Şehir seçin</option>{sehirler.map(s => <option key={s} value={s}>{s}</option>)}</select>
                : <input type="text" value={formData.sehir || ""} onChange={e => setField("sehir", e.target.value)} placeholder="Şehir yazın" style={INP} />}
            </div>
          </div>
        </div>

        {/* AÇIKLAMA + İLETİŞİM + ADRES */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
          <h3 style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 14 }}>📝 Detaylar & İletişim</h3>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>Açıklama <span style={{ color: "#dc2626" }}>*</span></label>
            <textarea value={formData.aciklama || ""} onChange={e => setField("aciklama", e.target.value)} placeholder="Detaylı açıklama..." rows={5} style={{ ...INP, resize: "vertical", minHeight: 120 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>İletişim <span style={{ color: "#dc2626" }}>*</span></label>
              <input type="text" value={formData.iletisim || ""} onChange={e => setField("iletisim", e.target.value)} placeholder="Telefon veya E-posta" style={INP} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>Adres (Opsiyonel)</label>
              <input type="text" value={formData.adres || ""} onChange={e => setField("adres", e.target.value)} placeholder="Mahalle, Sokak vb." style={INP} />
            </div>
          </div>
        </div>

        {/* FİYAT */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
          <h3 style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 14 }}>💰 Fiyat Bilgisi</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[{ key: "butceMin", label: "Min Fiyat" }, { key: "butceMax", label: "Max Fiyat" }].map(item => (
              <div key={item.key}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>{item.label}</label>
                <div style={{ position: "relative" }}>
                  <input type="number" value={formData[item.key] || ""} onChange={e => setField(item.key, e.target.value)} placeholder="0" min="0" style={{ ...INP, paddingRight: 40 }} />
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontWeight: 700, fontSize: 13 }}>{seciliSektor?.butceBirimi || "₺"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DİNAMİK SEKTÖR ALANLARI */}
        {Object.entries(gruplar).map(([grupAdi, alanlar]) => (
          <div key={grupAdi} style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
            <h3 style={{ fontSize: 11, fontWeight: 800, color: seciliSektor?.renk || "#2563eb", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 14, paddingBottom: 10, borderBottom: `2px solid ${(seciliSektor?.renk || "#2563eb") + "20"}` }}>{grupAdi}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {alanlar.map(alan => (
                <div key={alan.key}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "flex", alignItems: "center", gap: 5, marginBottom: 7, flexWrap: "wrap" }}>
                    {alan.label}
                    {alan.zorunlu && <span style={{ color: "#dc2626", fontSize: 14 }}>*</span>}
                    {alan.birim && alan.tip !== "range" && <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 11 }}>({alan.birim})</span>}
                  </label>
                  {renderAlan(alan)}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* MEDYA */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", fontFamily: "Unbounded, sans-serif", marginBottom: 4 }}>📸 Fotoğraf & Video</h2>
          <p style={{ color: "#94a3b8", fontSize: 12, marginBottom: 16 }}>Mevcut görselleri silebilir veya yeni ekleyebilirsiniz. Max <strong>10 fotoğraf</strong> + <strong>1 video</strong>.</p>

          {medyalar.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
              {medyalar.map((m, i) => (
                <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 12, overflow: "hidden", background: "#f1f5f9", border: `2px solid ${i === 0 ? "#f59e0b" : "#e2e8f0"}` }}>
                  {m.tip === "video" ? <video src={m.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <img src={m.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  {i === 0 && <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", background: "#f59e0b", color: "#0f172a", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>KAPAK</div>}
                  <button onClick={() => setMedyalar(p => p.filter((_, j) => j !== i))} style={{ position: "absolute", top: 4, right: 4, width: 22, height: 22, borderRadius: "50%", background: "#dc2626", border: "none", color: "#fff", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>×</button>
                </div>
              ))}
            </div>
          )}

          {canUploadMore ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                {canUploadResim && <span style={{ fontSize: 11, color: "#2563eb", fontWeight: 600, background: "#eff6ff", padding: "4px 10px", borderRadius: 8 }}>📷 {10 - resimSayisi} fotoğraf hakkı kaldı</span>}
                {canUploadVideo && <span style={{ fontSize: 11, color: "#7c3aed", fontWeight: 600, background: "#f5f3ff", padding: "4px 10px", borderRadius: 8 }}>🎥 1 video ekleyebilirsiniz</span>}
              </div>
              <MedyaYukleyici onYuklendi={handleMedyaYuklendi} />
            </div>
          ) : (
            <div style={{ padding: 12, borderRadius: 10, background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", fontSize: 12, textAlign: "center", fontWeight: 600 }}>✅ Maksimum medya sayısına ulaşıldı.</div>
          )}
        </div>

        {/* KAYDET BUTONU */}
        <button onClick={handleGuncelle} disabled={kaydediliyor} style={{ width: "100%", padding: 16, borderRadius: 14, background: kaydediliyor ? "#94a3b8" : "#f59e0b", border: "none", color: kaydediliyor ? "#fff" : "#0f172a", fontFamily: "inherit", fontSize: 15, fontWeight: 800, cursor: kaydediliyor ? "not-allowed" : "pointer", boxShadow: kaydediliyor ? "none" : "0 4px 20px rgba(245,158,11,.4)", transition: ".2s" }}>
          {kaydediliyor ? "⏳ Kaydediliyor..." : "💾 Değişiklikleri Kaydet"}
        </button>
      </div>
    </div>
  );
}

export default function IlanDuzenlePage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#64748b" }}>Yükleniyor... ⏳</div>}>
      <IlanDuzenleIcerik />
    </Suspense>
  );
}
