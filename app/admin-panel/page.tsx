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

  const [aiSektor, setAiSektor] = useState("uretim");
  const [aiTip, setAiTip] = useState("ticari");
  const [aiRol, setAiRol] = useState("alan");
  const [aiSehir, setAiSehir] = useState("İstanbul");
  const [aiUlke, setAiUlke] = useState("Türkiye");
  const [aiAdet, setAiAdet] = useState(5);
  const [aiYukleniyor, setAiYukleniyor] = useState(false);
  const [aiSonuc, setAiSonuc] = useState("");

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
        fetch("/api/ilanlar?limit=200&durum=aktif"),
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
      setIlanlar(iL); setUyeler(uL); setMesajlar(mL); setDestek(dL); setTeklifler(tL);
      setStats({
        toplamIlan: iL.length, toplamUye: uL.length, toplamTeklif: tL.length,
        bekleyenDestek: dL.filter((d: any) => !d.okundu).length,
        yapayIlan: iL.filter((i: any) => i.yapay === true).length,
        gercekIlan: iL.filter((i: any) => i.yapay === false).length,
      });
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { if (session) yukle(); }, [session, yukle]);

  const aiIlanOlustur = async () => {
    setAiYukleniyor(true); setAiSonuc("");
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
      if (data.success) { setAiSonuc(`✅ ${data.uretilen} ilan başarıyla oluşturuldu!`); yukle(); }
      else setAiSonuc("❌ Hata: " + (data.error || "Bilinmeyen hata"));
    } catch (e: any) { setAiSonuc("❌ " + e.message); }
    setAiYukleniyor(false);
  };

  const ilanSil = async (id: string) => {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/ilanlar/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ durum: "silindi", _adminUpdate: true }),
    });
    yukle();
  };

  if (status === "loading") return <div style={LOADING}>⏳ Yükleniyor...</div>;
  if (!session) return null;

  const TABS: { key: AdminTab; label: string; icon: string; badge?: number }[] = [
    { key: "ozet",      label: "Özet",          icon: "📊" },
    { key: "ilanlar",   label: "Tüm İlanlar",   icon: "📋", badge: stats.toplamIlan },
    { key: "uyeler",    label: "Üyeler",         icon: "👥", badge: stats.toplamUye },
    { key: "teklifler", label: "Teklifler",      icon: "💼", badge: stats.toplamTeklif },
    { key: "mesajlar",  label: "Mesajlar",       icon: "💬" },
    { key: "destek",    label: "Destek",         icon: "🆘", badge: stats.bekleyenDestek },
    { key: "ai_ilan",   label: "AI İlan",        icon: "🤖" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Unbounded:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .adm-layout { display: grid; grid-template-columns: 220px 1fr; min-height: calc(100vh - 56px); }
        .adm-sidebar { background: #0f172a; border-right: 1px solid rgba(255,255,255,.08); padding: 16px 10px; position: sticky; top: 56px; height: calc(100vh - 56px); overflow-y: auto; }
        .adm-main { background: #f8fafc; padding: 22px 20px; }
        .adm-tab { width: 100%; display: flex; align-items: center; gap: 8px; padding: 9px 10px; border-radius: 10px; border: none; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; text-align: left; margin-bottom: 2px; color: rgba(255,255,255,.5); background: transparent; transition: .12s; }
        .adm-tab.on { background: rgba(255,255,255,.12); color: #fff; font-weight: 700; }
        .adm-tab:not(.on):hover { background: rgba(255,255,255,.06); color: rgba(255,255,255,.8); }
        .adm-bdg { background: #f59e0b; color: #0f172a; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 99px; margin-left: auto; }
        .adm-card { background: #fff; border-radius: 14px; border: 1.5px solid #e2e8f0; padding: 16px; }
        .adm-row { background: #fff; border-radius: 12px; border: 1.5px solid #e2e8f0; padding: 12px 14px; margin-bottom: 8px; display: flex; align-items: flex-start; gap: 12px; }
        .adm-sttl { font-size: 17px; font-weight: 800; color: #0f172a; font-family: 'Unbounded', sans-serif; margin-bottom: 16px; }
        select, input { font-family: inherit; }
      `}</style>

      {/* TOPBAR */}
      <div style={{ background: "#020617", padding: "0 20px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "#dc2626", width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".9rem" }}>🛡️</div>
          <span style={{ color: "#fff", fontFamily: "Unbounded, sans-serif", fontWeight: 800, fontSize: 14 }}>SwapHubs Admin</span>
          <span style={{ background: "#dc2626", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 4, textTransform: "uppercase" }}>SADECE ADMİN</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,.5)", fontSize: 12 }}>{session.user?.email}</span>
          <button onClick={() => router.push("/")} style={{ background: "rgba(255,255,255,.08)", border: "none", color: "rgba(255,255,255,.6)", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontFamily: "inherit" }}>Siteye Git</button>
          <button onClick={() => signOut({ callbackUrl: "/" })} style={{ background: "#dc2626", border: "none", color: "#fff", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontFamily: "inherit" }}>Çıkış</button>
        </div>
      </div>

      <div className="adm-layout">
        {/* SIDEBAR */}
        <div className="adm-sidebar">
          <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12, paddingLeft: 10 }}>Yönetim</p>
          {TABS.map(t => (
            <button key={t.key} className={`adm-tab ${aktifTab === t.key ? "on" : ""}`} onClick={() => setAktifTab(t.key)}>
              <span>{t.icon}</span>
              <span style={{ flex: 1 }}>{t.label}</span>
              {t.badge ? <span className="adm-bdg">{t.badge}</span> : null}
            </button>
          ))}
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.08)" }}>
            <button onClick={yukle} style={{ width: "100%", padding: "9px", borderRadius: 10, background: "rgba(255,255,255,.06)", border: "none", color: "rgba(255,255,255,.5)", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>🔄 Yenile</button>
          </div>
        </div>

        {/* MAIN */}
        <div className="adm-main">

          {/* ── ÖZET ── */}
          {aktifTab === "ozet" && (
            <div>
              <p className="adm-sttl">📊 Platform Özeti</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
                {[
                  { l: "Toplam İlan", v: stats.toplamIlan, i: "📋", c: "#2563eb" },
                  { l: "Gerçek İlan", v: stats.gercekIlan, i: "✅", c: "#059669" },
                  { l: "Yapay İlan",  v: stats.yapayIlan,  i: "🤖", c: "#7c3aed" },
                  { l: "Toplam Üye", v: stats.toplamUye,  i: "👥", c: "#0891b2" },
                  { l: "Teklif",     v: stats.toplamTeklif, i: "💼", c: "#d97706" },
                  { l: "Bekleyen Destek", v: stats.bekleyenDestek, i: "🆘", c: "#dc2626" },
                ].map(s => (
                  <div key={s.l} className="adm-card" style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 20, marginBottom: 6 }}>{s.i}</p>
                    <p style={{ fontSize: 24, fontWeight: 800, color: s.c, fontFamily: "Unbounded, sans-serif" }}>{s.v}</p>
                    <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>{s.l}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>Son Yayınlanan İlanlar</p>
              {ilanlar.slice(0, 5).map(i => (
                <div key={i._id} className="adm-row">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.baslik}</p>
                    <p style={{ fontSize: 11, color: "#64748b" }}>{i.tip} · {i.rol} · {i.ulke || "TR"} · {i.sehir || "—"} · {i.yapay ? "🤖 Yapay" : "✅ Gerçek"}</p>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => router.push(`/ilan/${i._id}`)} style={ADM_BTN("#eff6ff", "#2563eb")}>Gör</button>
                    <button onClick={() => ilanSil(i._id)} style={ADM_BTN("#fef2f2", "#dc2626")}>Sil</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── TÜM İLANLAR ── */}
          {aktifTab === "ilanlar" && (
            <div>
              <p className="adm-sttl">📋 Tüm İlanlar ({ilanlar.length})</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, padding: "6px 12px", background: "#ecfdf5", borderRadius: 8, color: "#059669", fontWeight: 600 }}>✅ Gerçek: {stats.gercekIlan}</span>
                <span style={{ fontSize: 12, padding: "6px 12px", background: "#f5f3ff", borderRadius: 8, color: "#7c3aed", fontWeight: 600 }}>🤖 Yapay: {stats.yapayIlan}</span>
              </div>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> : ilanlar.map(i => (
                <div key={i._id} className="adm-row">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.baslik}</p>
                    <div style={{ display: "flex", gap: 8, fontSize: 11, color: "#64748b", marginTop: 3, flexWrap: "wrap" }}>
                      <span style={{ background: i.tip === "ticari" ? "#fffbeb" : "#eff6ff", padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>{i.tip}</span>
                      <span style={{ background: "#f1f5f9", padding: "1px 6px", borderRadius: 4 }}>{i.rol}</span>
                      <span>📍 {i.ulke || "TR"} · {i.sehir || "—"}</span>
                      <span>📅 {new Date(i.createdAt).toLocaleDateString("tr-TR")}</span>
                      <span>{i.yapay ? "🤖 Yapay" : "✅ Gerçek"}</span>
                      <span>💼 {i.teklifSayisi || 0} teklif</span>
                      <span>👁 {i.goruntulenme || 0} görüntülenme</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => router.push(`/ilan/${i._id}`)} style={ADM_BTN("#eff6ff", "#2563eb")}>Gör</button>
                    <button onClick={() => ilanSil(i._id)} style={ADM_BTN("#fef2f2", "#dc2626")}>Sil</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── ÜYELER ── */}
          {aktifTab === "uyeler" && (
            <div>
              <p className="adm-sttl">👥 Üyeler ({uyeler.length})</p>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> : uyeler.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Üye bulunamadı</div>
              ) : uyeler.map((u: any) => (
                <div key={u._id} className="adm-row">
                  <img src={u.resim || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.ad || "U")}&background=1e3a5f&color=f59e0b`} alt="" style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{u.ad || "—"}</p>
                    <p style={{ fontSize: 11, color: "#64748b" }}>{u.email} · {new Date(u.olusturuldu || u.createdAt).toLocaleDateString("tr-TR")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── TEKLİFLER ── */}
          {aktifTab === "teklifler" && (
            <div>
              <p className="adm-sttl">💼 Tüm Teklifler ({teklifler.length})</p>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> : teklifler.map(t => (
                <div key={t._id} className="adm-row">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{t.ilanBaslik}</p>
                    <div style={{ display: "flex", gap: 8, fontSize: 11, color: "#64748b", marginTop: 3, flexWrap: "wrap" }}>
                      <span>💰 {Number(t.teklifFiyat).toLocaleString("tr-TR")} {t.doviz}</span>
                      <span>👤 {t.teklifVeren?.email}</span>
                      <span>📅 {new Date(t.olusturuldu).toLocaleDateString("tr-TR")}</span>
                    </div>
                  </div>
                  <span style={{ padding: "3px 9px", borderRadius: 99, fontSize: 10, fontWeight: 700, background: t.durum === "kabul_edildi" ? "#ecfdf5" : t.durum === "bekliyor" ? "#fffbeb" : "#f1f5f9", color: t.durum === "kabul_edildi" ? "#059669" : t.durum === "bekliyor" ? "#d97706" : "#64748b" }}>
                    {t.durum}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ── MESAJLAR ── */}
          {aktifTab === "mesajlar" && (
            <div>
              <p className="adm-sttl">💬 Platform Mesajları ({mesajlar.length})</p>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> : mesajlar.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Mesaj bulunamadı</div>
              ) : mesajlar.map((m: any) => (
                <div key={m._id} className="adm-row">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{m.gonderen} → {m.alici}</p>
                    <p style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>{m.mesaj?.slice(0, 100)}</p>
                    <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{new Date(m.createdAt).toLocaleString("tr-TR")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── DESTEK ── */}
          {aktifTab === "destek" && (
            <div>
              <p className="adm-sttl">🆘 Destek Mesajları ({destek.length})</p>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> : destek.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Destek mesajı yok</div>
              ) : destek.map((d: any) => (
                <div key={d._id} className="adm-row" style={{ background: d.okundu ? "#fff" : "#eff6ff", border: `1.5px solid ${d.okundu ? "#e2e8f0" : "#bfdbfe"}` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{d.email}</p>
                      <p style={{ fontSize: 10, color: "#94a3b8" }}>{new Date(d.createdAt).toLocaleString("tr-TR")}</p>
                    </div>
                    <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}>{d.mesaj}</p>
                  </div>
                  {!d.okundu && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563eb", flexShrink: 0, marginTop: 6 }} />}
                </div>
              ))}
            </div>
          )}

          {/* ── AI İLAN ── */}
          {aktifTab === "ai_ilan" && (
            <div>
              <p className="adm-sttl">🤖 AI İlan Oluşturucu</p>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20, lineHeight: 1.6 }}>
                Claude AI ile otomatik yapay ilanlar oluştur. Bu özellik <strong>sadece admin panelinde</strong> mevcuttur.
              </p>
              <div className="adm-card" style={{ maxWidth: 600 }}>
                {[
                  { l: "İlan Tipi", el: <select value={aiTip} onChange={e => setAiTip(e.target.value)} style={SEL}><option value="ticari">🏭 Ticari</option><option value="bireysel">👤 Bireysel</option></select> },
                  { l: "Rol", el: <select value={aiRol} onChange={e => setAiRol(e.target.value)} style={SEL}><option value="alan">🛒 Hizmet/Ürün Alıyor</option><option value="veren">💼 Hizmet/Ürün Veriyor</option></select> },
                  { l: "Sektör", el: <select value={aiSektor} onChange={e => setAiSektor(e.target.value)} style={SEL}>
                    <option value="uretim">🏭 Üretim & Fason</option>
                    <option value="turizm">🏨 Turizm & Konaklama</option>
                    <option value="giyim">👗 Giyim & Tekstil</option>
                    <option value="lojistik">🚢 Lojistik & Gümrük</option>
                    <option value="gida">🌾 Gıda & Tarım</option>
                    <option value="makine">⚙️ Makine & Endüstri</option>
                    <option value="bilisim">💻 Bilişim & Yazılım</option>
                    <option value="usta">👷 Usta & İşçi</option>
                    <option value="temizlik">🧹 Temizlik</option>
                    <option value="egitim">📚 Eğitim</option>
                    <option value="saglik">💊 Sağlık</option>
                    <option value="nakliyat">🚛 Nakliyat</option>
                    <option value="insaat">🏗️ İnşaat</option>
                  </select> },
                  { l: "Ülke", el: <input type="text" value={aiUlke} onChange={e => setAiUlke(e.target.value)} style={SEL} /> },
                  { l: "Şehir", el: <input type="text" value={aiSehir} onChange={e => setAiSehir(e.target.value)} style={SEL} /> },
                ].map(f => (
                  <div key={f.l} style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 6 }}>{f.l}</label>
                    {f.el}
                  </div>
                ))}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                    Kaç İlan? <span style={{ color: "#7c3aed", fontSize: 14 }}>{aiAdet}</span>
                  </label>
                  <input type="range" min={1} max={20} value={aiAdet} onChange={e => setAiAdet(Number(e.target.value))} style={{ width: "100%", accentColor: "#7c3aed" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94a3b8", marginTop: 4 }}><span>1</span><span>20</span></div>
                </div>
                <button onClick={aiIlanOlustur} disabled={aiYukleniyor} style={{ width: "100%", padding: 14, borderRadius: 12, background: aiYukleniyor ? "#94a3b8" : "#7c3aed", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: aiYukleniyor ? "not-allowed" : "pointer" }}>
                  {aiYukleniyor ? "⏳ Claude AI çalışıyor..." : "🤖 AI ile İlan Oluştur ve Yayınla"}
                </button>
                {aiSonuc && (
                  <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 10, background: aiSonuc.includes("❌") ? "#fef2f2" : "#f0fdf4", border: `1px solid ${aiSonuc.includes("❌") ? "#fecaca" : "#bbf7d0"}`, fontSize: 13, fontWeight: 600, color: aiSonuc.includes("❌") ? "#dc2626" : "#059669" }}>
                    {aiSonuc}
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
