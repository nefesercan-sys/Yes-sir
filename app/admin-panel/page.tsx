"use client";
// ============================================================
// SwapHubs — app/admin-panel/page.tsx
// SADECE ADMİN — Tüm trafik, ilanlar, mesajlar, destek
// AI İlan Oluşturucu burada — üye panelinde YOK
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type AdminTab = "ozet" | "ilanlar" | "uyeler" | "mesajlar" | "destek" | "ai_ilan" | "teklifler";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",").map(e => e.trim());

const LOADING: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#64748b", fontSize: 14, fontFamily: "sans-serif" };
const ADM_BTN = (bg: string, c: string): React.CSSProperties => ({ padding: "5px 10px", borderRadius: 7, background: bg, border: "none", color: c, fontFamily: "inherit", fontSize: 11, fontWeight: 700, cursor: "pointer" });
const SEL: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 13, fontFamily: "inherit", background: "#fff", outline: "none" };

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [aktifTab, setAktifTab] = useState<AdminTab>("ozet");
  const [ilanlar, setIlanlar] = useState<any[]>([]);
  const [uyeler, setUyeler] = useState<any[]>([]);
  const [mesajlar, setMesajlar] = useState<any[]>([]);
  const [destek, setDestek] = useState<any[]>([]);
  const [teklifler, setTeklifler] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    toplamIlan: 0, toplamUye: 0, toplamTeklif: 0,
    bekleyenDestek: 0, yapayIlan: 0, gercekIlan: 0,
  });

  // AI İlan
  const [aiSektor, setAiSektor] = useState("uretim");
  const [aiTip, setAiTip] = useState("ticari");
  const [aiRol, setAiRol] = useState("alan");
  const [aiSehir, setAiSehir] = useState("İstanbul");
  const [aiUlke, setAiUlke] = useState("Türkiye");
  const [aiAdet, setAiAdet] = useState(5);
  const [aiYukleniyor, setAiYukleniyor] = useState(false);
  const [aiSonuc, setAiSonuc] = useState("");

  // Erişim kontrolü (Güvenlik Duvarı)
  useEffect(() => {
    if (status === "unauthenticated") { router.push("/giris"); return; }
    if (status === "authenticated" && session?.user?.email) {
      const isAdmin =
        ADMIN_EMAILS.includes(session.user.email) ||
        session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (!isAdmin) { router.push("/"); return; }
    }
  }, [session, status, router]);

  const yukle = useCallback(async () => {
    setLoading(true);
    try {
      const [ilanRes, uyeRes, mesajRes, destekRes, teklifRes] = await Promise.all([
        fetch("/api/ilanlar?limit=500"), // Silinmişler hariç tüm ilanlar gelsin
        fetch("/api/admin/uyeler"),
        fetch("/api/admin/mesajlar"),
        fetch("/api/destek"),
        fetch("/api/teklifler?admin=true"),
      ]);

      const [ilanD, uyeD, mesajD, destekD, teklifD] = await Promise.all([
        ilanRes.json(), uyeRes.json(), mesajRes.json(), destekRes.json(), teklifRes.json(),
      ]);

      const iL = ilanD.ilanlar || ilanD.data || ilanD || [];
      const uL = Array.isArray(uyeD) ? uyeD : [];
      const mL = Array.isArray(mesajD) ? mesajD : [];
      const dL = Array.isArray(destekD) ? destekD : [];
      const tL = Array.isArray(teklifD) ? teklifD : [];

      setIlanlar(iL);
      setUyeler(uL);
      setMesajlar(mL);
      setDestek(dL);
      setTeklifler(tL);

      setStats({
        toplamIlan:     iL.length,
        toplamUye:      uL.length,
        toplamTeklif:   tL.length,
        bekleyenDestek: dL.filter((d: any) => !d.okundu).length,
        yapayIlan:      iL.filter((i: any) => Boolean(i.yapay) || Boolean(i.is_ai_generated)).length,
        gercekIlan:     iL.filter((i: any) => !Boolean(i.yapay) && !Boolean(i.is_ai_generated)).length,
      });
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { if (session) yukle(); }, [session, yukle]);

  const aiIlanOlustur = async () => {
    setAiYukleniyor(true);
    setAiSonuc("");
    try {
      const res = await fetch("/api/ai-ilan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sektorId: aiSektor, sehir: aiSehir, ulke: aiUlke,
          adet: aiAdet, tip: aiTip, rol: aiRol,
          adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiSonuc(`✅ ${data.uretilen} ilan başarıyla oluşturuldu!`);
        yukle(); // Yeni ilanları getirmek için paneli yenile
      } else {
        setAiSonuc("❌ Hata: " + (data.error || "Bilinmeyen hata"));
      }
    } catch (e: any) {
      setAiSonuc("❌ " + e.message);
    }
    setAiYukleniyor(false);
  };

  // Gerçek silme (Hard Delete) işlemi
  const ilanSil = async (id: string) => {
    if (!confirm("DİKKAT: Bu işlem ilanı veritabanından TAMAMEN SİLER! Emin misiniz?")) return;
    try {
      await fetch(`/api/ilanlar/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "" },
      });
      yukle(); // Arayüzü güncelle
    } catch (e) { alert("Silinirken hata oluştu."); }
  };

  // Destek mesajını okundu işaretleme
  const destekOku = async (id: string) => {
    try {
      await fetch(`/api/destek`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, okundu: true })
      });
      yukle();
    } catch (e) {}
  }

  if (status === "loading") return <div style={LOADING}>⏳ Siber Güvenlik Kontrolü...</div>;
  if (!session) return null;

  const TABS: { key: AdminTab; label: string; icon: string; badge?: number }[] = [
    { key: "ozet",    label: "Sistem Özeti", icon: "📊" },
    { key: "ilanlar", label: "Tüm İlanlar",  icon: "📋", badge: stats.toplamIlan },
    { key: "teklifler", label: "Teklifler",  icon: "💼", badge: stats.toplamTeklif },
    { key: "mesajlar", label: "Mesaj Ağı",   icon: "💬" },
    { key: "destek",  label: "Destek Bildirim", icon: "🆘", badge: stats.bekleyenDestek },
    { key: "uyeler",  label: "Üye Veritabanı",  icon: "👥", badge: stats.toplamUye },
    { key: "ai_ilan", label: "AI İlan Motoru",  icon: "🤖" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Unbounded:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .adm-layout { display: grid; grid-template-columns: 230px 1fr; min-height: calc(100vh - 56px); }
        .adm-sidebar { background: #0f172a; border-right: 1px solid rgba(255,255,255,.08); padding: 20px 12px; position: sticky; top: 56px; height: calc(100vh - 56px); overflow-y: auto; }
        .adm-main { background: #f8fafc; padding: 28px 24px; }
        .adm-tab { width: 100%; display: flex; align-items: center; gap: 10px; padding: 11px 12px; border-radius: 10px; border: none; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; text-align: left; margin-bottom: 4px; color: rgba(255,255,255,.5); background: transparent; transition: .12s; }
        .adm-tab.on { background: rgba(37,99,235,.15); color: #60a5fa; border: 1px solid rgba(37,99,235,.3); }
        .adm-tab:not(.on):hover { background: rgba(255,255,255,.06); color: rgba(255,255,255,.8); }
        .adm-bdg { background: #ef4444; color: #fff; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 99px; margin-left: auto; }
        .adm-card { background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
        .adm-row { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 14px 16px; margin-bottom: 10px; display: flex; align-items: center; gap: 14px; transition: 0.2s;}
        .adm-row:hover { border-color: #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .adm-sttl { font-size: 18px; font-weight: 800; color: #0f172a; font-family: 'Unbounded', sans-serif; margin-bottom: 20px; letter-spacing: -0.5px;}
        select, input { font-family: inherit; }
      `}</style>

      {/* TOPBAR */}
      <div style={{ background: "#020617", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "#2563eb", width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🌐</div>
          <span style={{ color: "#fff", fontFamily: "Unbounded, sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.5px" }}>SwapHubs Admin</span>
          <span style={{ background: "rgba(220,38,38,.2)", border: "1px solid rgba(220,38,38,.4)", color: "#ef4444", fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 6, textTransform: "uppercase" }}>Yetkili Erişim</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,.5)", fontSize: 12, fontWeight: 600 }}>{session.user?.email}</span>
          <button onClick={() => router.push("/")} style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit" }}>Siteye Dön</button>
        </div>
      </div>

      <div className="adm-layout">
        {/* SIDEBAR */}
        <div className="adm-sidebar">
          <p style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 14, paddingLeft: 12 }}>Sistem Kontrolü</p>
          {TABS.map(t => (
            <button key={t.key} className={`adm-tab ${aktifTab === t.key ? "on" : ""}`} onClick={() => setAktifTab(t.key)}>
              <span style={{fontSize: '16px'}}>{t.icon}</span>
              <span style={{ flex: 1 }}>{t.label}</span>
              {t.badge && t.badge > 0 ? <span className="adm-bdg">{t.badge}</span> : null}
            </button>
          ))}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.08)" }}>
            <button onClick={yukle} style={{ width: "100%", padding: "10px", borderRadius: 10, background: "rgba(255,255,255,.06)", border: "none", color: "rgba(255,255,255,.6)", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>🔄 Verileri Yenile</button>
          </div>
        </div>

        {/* MAIN */}
        <div className="adm-main">

          {/* ── ÖZET ── */}
          {aktifTab === "ozet" && (
            <div>
              <p className="adm-sttl">📊 Canlı Platform Özeti</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, marginBottom: 32 }}>
                {[
                  { l: "Toplam İlan", v: stats.toplamIlan, i: "📋", c: "#0f172a" },
                  { l: "Gerçek İlan", v: stats.gercekIlan, i: "✅", c: "#059669" },
                  { l: "Yapay (AI) İlan", v: stats.yapayIlan, i: "🤖", c: "#7c3aed" },
                  { l: "Üye Ağı", v: stats.toplamUye, i: "👥", c: "#2563eb" },
                  { l: "Verilen Teklif", v: stats.toplamTeklif, i: "💼", c: "#d97706" },
                  { l: "Destek Talebi", v: stats.bekleyenDestek, i: "🆘", c: "#dc2626" },
                ].map(s => (
                  <div key={s.l} className="adm-card" style={{ textAlign: "center", padding: "24px 16px" }}>
                    <p style={{ fontSize: 24, marginBottom: 8 }}>{s.i}</p>
                    <p style={{ fontSize: 28, fontWeight: 900, color: s.c, fontFamily: "Unbounded, sans-serif" }}>{s.v}</p>
                    <p style={{ fontSize: 11, color: "#64748b", marginTop: 4, fontWeight: 600 }}>{s.l}</p>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>Ağa Eklenen Son İlanlar</p>
              {ilanlar.slice(0, 5).map(i => (
                <div key={i._id} className="adm-row">
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f1f5f9', overflow: 'hidden', flexShrink: 0 }}>
                    {i.medyalar?.[0] ? <img src={i.medyalar[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📋</div>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.baslik}</p>
                    <p style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                      <span style={{ color: i.yapay || i.is_ai_generated ? '#7c3aed' : '#059669', fontWeight: 700 }}>{i.yapay || i.is_ai_generated ? "🤖 AI Bot" : "👤 Organik"}</span>
                      {" · "}{i.tip === 'ticari' ? 'B2B Ticari' : 'Bireysel'} · {i.rol === 'alan' ? 'Talep' : 'Hizmet'}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => window.open(`/ilan/${i._id}`, '_blank')} style={ADM_BTN("#f1f5f9", "#475569")}>İncele</button>
                    <button onClick={() => ilanSil(i._id)} style={ADM_BTN("#fef2f2", "#dc2626")}>Kaldır</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── TÜM İLANLAR (DENETİM) ── */}
          {aktifTab === "ilanlar" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <p className="adm-sttl" style={{ marginBottom: 0 }}>📋 İlan Denetim Ağı ({ilanlar.length})</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ fontSize: 11, padding: "6px 12px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 8, color: "#059669", fontWeight: 700 }}>👤 Organik: {stats.gercekIlan}</span>
                  <span style={{ fontSize: 11, padding: "6px 12px", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 8, color: "#7c3aed", fontWeight: 700 }}>🤖 AI Bot: {stats.yapayIlan}</span>
                </div>
              </div>
              
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> : ilanlar.map(i => (
                <div key={i._id} className="adm-row">
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: '#f8fafc', border: '1px solid #e2e8f0', overflow: 'hidden', flexShrink: 0 }}>
                    {i.medyalar?.[0] ? <img src={i.medyalar[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📸</div>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.baslik}</p>
                      {i.yapay || i.is_ai_generated ? (
                        <span style={{ background: "#f5f3ff", color: "#7c3aed", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4 }}>AI ÜRETİMİ</span>
                      ) : null}
                    </div>
                    <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#64748b", flexWrap: "wrap" }}>
                      <span style={{ background: i.tip === "ticari" ? "#fef9c3" : "#eff6ff", color: i.tip === "ticari" ? "#854d0e" : "#1d4ed8", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>{i.tip === 'ticari' ? 'B2B' : 'Bireysel'}</span>
                      <span>{i.rol === 'alan' ? '🛒 Alıcı' : '💼 Satıcı'}</span>
                      <span>📍 {i.ulke || "Türkiye"} / {i.sehir || "Genel"}</span>
                      <span>📅 {new Date(i.createdAt).toLocaleDateString("tr-TR")}</span>
                      <span>💰 {i.butceMin} - {i.butceMax} {i.butceBirimi}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => window.open(`/ilan/${i._id}`, '_blank')} style={ADM_BTN("#f8fafc", "#0f172a")}>İncele</button>
                    <button onClick={() => ilanSil(i._id)} style={ADM_BTN("#fef2f2", "#dc2626")}>Sil</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── ÜYELER ── */}
          {aktifTab === "uyeler" && (
            <div>
              <p className="adm-sttl">👥 Kayıtlı Kullanıcı Ağı ({uyeler.length})</p>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> : uyeler.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Üye bulunamadı</div>
              ) : uyeler.map((u: any) => (
                <div key={u._id} className="adm-row">
                  <img src={u.resim || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.ad || "U")}&background=0f172a&color=fff`} alt="" style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{u.ad || "İsimsiz Kullanıcı"}</p>
                    <p style={{ fontSize: 12, color: "#64748b" }}>✉️ {u.email} <span style={{margin: '0 6px'}}>•</span> 📅 Kayıt: {new Date(u.olusturuldu || u.createdAt).toLocaleDateString("tr-TR")}</p>
                  </div>
                  <button style={ADM_BTN("#f1f5f9", "#475569")}>Banla / Kısıtla</button>
                </div>
              ))}
            </div>
          )}

          {/* ── TEKLİFLER ── */}
          {aktifTab === "teklifler" && (
            <div>
              <p className="adm-sttl">💸 Canlı Ticaret & Teklifler ({teklifler.length})</p>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>Sistemdeki üyelerin birbirlerine veya AI ilanlarına verdikleri teklifler.</p>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> : teklifler.map(t => (
                <div key={t._id} className="adm-row" style={{ borderLeft: `4px solid ${t.durum === 'kabul_edildi' ? '#10b981' : '#f59e0b'}` }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>📋 {t.ilanBaslik}</p>
                    <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#475569", flexWrap: "wrap", marginBottom: 6 }}>
                      <span style={{ fontWeight: 800, color: "#059669" }}>💰 {Number(t.teklifFiyat).toLocaleString("tr-TR")} {t.doviz}</span>
                      <span>👤 Veren: {t.teklifVeren?.email}</span>
                    </div>
                    {t.aciklama && <p style={{ fontSize: 11, color: "#94a3b8", fontStyle: "italic", background: "#f8fafc", padding: 6, borderRadius: 6 }}>"{t.aciklama}"</p>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                    <span style={{ padding: "4px 10px", borderRadius: 8, fontSize: 10, fontWeight: 800, background: t.durum === "kabul_edildi" ? "#ecfdf5" : t.durum === "bekliyor" ? "#fffbeb" : "#f1f5f9", color: t.durum === "kabul_edildi" ? "#059669" : t.durum === "bekliyor" ? "#d97706" : "#64748b" }}>
                      {t.durum.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 10, color: "#94a3b8" }}>{new Date(t.olusturuldu).toLocaleDateString("tr-TR")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── MESAJLAR ── */}
          {aktifTab === "mesajlar" && (
            <div>
              <p className="adm-sttl">💬 İlan İçi Mesajlaşmalar</p>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> : mesajlar.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Mesaj trafiği yok</div>
              ) : mesajlar.map((m: any) => (
                <div key={m._id} className="adm-row">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#2563eb", marginBottom: 4 }}>{m.gonderen} ➡️ {m.alici}</p>
                    <p style={{ fontSize: 13, color: "#0f172a", lineHeight: 1.5 }}>{m.mesaj}</p>
                    <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 6 }}>{new Date(m.createdAt).toLocaleString("tr-TR")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── DESTEK ── */}
          {aktifTab === "destek" && (
            <div>
              <p className="adm-sttl">🆘 Site İçi Destek Talepleri ({destek.length})</p>
              <p style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>Yeşil Canlı Destek butonundan sana (Admine) yazan ziyaretçiler.</p>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> : destek.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Destek mesajı yok</div>
              ) : destek.map((d: any) => (
                <div key={d._id} className="adm-row" style={{ background: d.okundu ? "#fff" : "#fef2f2", border: `1px solid ${d.okundu ? "#e2e8f0" : "#fca5a5"}`, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      <p style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>{d.adSoyad || "İsimsiz"} <span style={{fontWeight: 400, color: "#64748b"}}>({d.email})</span></p>
                      <p style={{ fontSize: 10, color: "#94a3b8" }}>{new Date(d.createdAt).toLocaleString("tr-TR")}</p>
                    </div>
                    <p style={{ fontSize: 14, color: "#1e293b", lineHeight: 1.5 }}>{d.mesaj}</p>
                  </div>
                  {!d.okundu && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                      <button onClick={() => destekOku(d._id)} style={ADM_BTN("#f1f5f9", "#475569")}>Okundu</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── AI İLAN MOTORU ── */}
          {aktifTab === "ai_ilan" && (
            <div>
              <p className="adm-sttl">🤖 AI İlan Enjeksiyon Motoru</p>
              <p style={{ fontSize: 13, color: "#475569", marginBottom: 24, lineHeight: 1.6, maxWidth: 800 }}>
                Claude AI kullanarak SwapHubs veritabanına otomatik, gerçekçi ve SEO uyumlu sahte ilanlar basın. Bu işlem pazar yerinin dolu ve canlı görünmesini sağlar.
              </p>
              
              <div className="adm-card" style={{ maxWidth: 800 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 8 }}>İlan Modeli</label>
                    <select value={aiTip} onChange={e => setAiTip(e.target.value)} style={SEL}>
                      <option value="ticari">🏭 B2B / Toptan (Ticari)</option>
                      <option value="bireysel">👤 B2C / Perakende (Bireysel)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Kullanıcı Rolü</label>
                    <select value={aiRol} onChange={e => setAiRol(e.target.value)} style={SEL}>
                      <option value="alan">🛒 Alıcı (Hizmet/Ürün Arıyor)</option>
                      <option value="veren">💼 Satıcı (Üretiyor/Hizmet Veriyor)</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Sektör Seçimi</label>
                  <select value={aiSektor} onChange={e => setAiSektor(e.target.value)} style={SEL}>
                    <option value="uretim">🏭 Üretim & Fason</option>
                    <option value="tekstil">👕 Tekstil & Hazır Giyim</option>
                    <option value="metal-celik">⚙️ Metal & Çelik Sanayi</option>
                    <option value="gida-tarim">🌾 Gıda & Tarım İhracatı</option>
                    <option value="lojistik">🚢 Lojistik & Gümrük</option>
                    <option value="turizm">🏨 Turizm & Konaklama</option>
                    <option value="usta">👷 Usta & Tadilat</option>
                    <option value="temizlik">🧹 Temizlik Hizmetleri</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Ülke</label>
                    <input type="text" value={aiUlke} onChange={e => setAiUlke(e.target.value)} style={SEL} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Şehir</label>
                    <input type="text" value={aiSehir} onChange={e => setAiSehir(e.target.value)} style={SEL} />
                  </div>
                </div>

                <div style={{ marginBottom: 28, background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <label style={{ fontSize: 12, fontWeight: 800, color: "#0f172a", display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    Üretilecek İlan Sayısı <span style={{ color: "#2563eb", fontSize: 16 }}>{aiAdet} Adet</span>
                  </label>
                  <input type="range" min={1} max={50} value={aiAdet} onChange={e => setAiAdet(Number(e.target.value))} style={{ width: "100%", accentColor: "#2563eb" }} />
                </div>

                <button onClick={aiIlanOlustur} disabled={aiYukleniyor} style={{ width: "100%", padding: 16, borderRadius: 12, background: aiYukleniyor ? "#94a3b8" : "#2563eb", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 800, cursor: aiYukleniyor ? "not-allowed" : "pointer", boxShadow: aiYukleniyor ? 'none' : '0 10px 25px rgba(37,99,235,0.3)', transition: '0.2s' }}>
                  {aiYukleniyor ? "⏳ Claude 3.5 Sonnet Düşünüyor..." : "⚡ Yapay İlanları Üret ve Ağa Yükle"}
                </button>

                {aiSonuc && (
                  <div style={{ marginTop: 20, padding: "16px", borderRadius: 12, background: aiSonuc.includes("❌") ? "#fef2f2" : "#ecfdf5", border: `1px solid ${aiSonuc.includes("❌") ? "#fecaca" : "#a7f3d0"}`, fontSize: 14, fontWeight: 700, color: aiSonuc.includes("❌") ? "#dc2626" : "#059669", display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{fontSize: 20}}>{aiSonuc.includes("❌") ? "⚠️" : "✅"}</span> {aiSonuc}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
