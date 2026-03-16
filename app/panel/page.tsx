"use client";
// ============================================================
// SwapHubs — app/panel/page.tsx
// Tam üye paneli + Adminler için Gizli AI İlan Motoru
// ============================================================
import { useState, useEffect, useCallback, Suspense, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { TUM_SEKTORLER } from "@/lib/sektorler"; // 🌟 Merkezi sektör listemiz!
const BTN_SM = (bg: string, c: string) => ({
  padding: "6px 12px",
  borderRadius: "8px",
  background: bg,
  border: "none",
  color: c,
  fontFamily: "inherit",
  fontSize: "11px",
  fontWeight: 700,
  cursor: "pointer",
  transition: "all 0.15s",
});
const SEHIRLER = ['Rastgele','İstanbul','Ankara','İzmir','Bursa','Antalya','Adana','Konya','Gaziantep','Mersin','Kayseri','Trabzon','Denizli'];
const ULKELER  = ['Türkiye','Almanya','ABD','İngiltere','Fransa','Hollanda','BAE','Suudi Arabistan','Mısır','Nijerya','Hindistan','Rastgele'];

type Tab = "ozet" | "ilanlarim" | "tekliflerim" | "gelenTeklifler" | "siparisler" | "mesajlar" | "bildirimler" | "profil" | "ayarlar" | "ai_ilan_bireysel" | "ai_ilan_ticari";
type Rol = "alan" | "veren";
type Tip = "bireysel" | "ticari";

const DURUM_STIL: Record<string, { bg: string; c: string }> = {
  aktif:          { bg: "#ecfdf5", c: "#059669" },
  bekliyor:       { bg: "#fffbeb", c: "#d97706" },
  kabul_edildi:   { bg: "#eff6ff", c: "#2563eb" },
  reddedildi:     { bg: "#fef2f2", c: "#dc2626" },
  tamamlandi:     { bg: "#f0fdf4", c: "#16a34a" },
  iptal:          { bg: "#fef2f2", c: "#dc2626" },
  gonullu_kapali: { bg: "#f1f5f9", c: "#64748b" },
  geri_alindi:    { bg: "#f1f5f9", c: "#64748b" },
  on_rezervasyon: { bg: "#eff6ff", c: "#2563eb" },
};

function PanelIcerik() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Admin Kontrolü
  const isAdmin = session?.user?.email === 'nefesercan@gmail.com' || session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const [aktifTab, setAktifTab] = useState<Tab>(
    (searchParams.get("tab") as Tab) || "ozet"
  );
  const [tip, setTip] = useState<Tip>("ticari");
  const [rol, setRol] = useState<Rol>("alan");

  // Data
  const [ilanlar, setIlanlar] = useState<any[]>([]);
  const [teklifler, setTeklifler] = useState<any[]>([]);
  const [gelenTeklifler, setGelenTeklifler] = useState<any[]>([]);
  const [siparisler, setSiparisler] = useState<any[]>([]);
  const [bildirimler, setBildirimler] = useState<any[]>([]);
  const [konusmalar, setKonusmalar] = useState<any[]>([]);
  const [aktifKonusma, setAktifKonusma] = useState<string | null>(null);
  const [mesajlar, setMesajlar] = useState<any[]>([]);
  const [yeniMesaj, setYeniMesaj] = useState("");
  const [loading, setLoading] = useState(true);
  const [mesajYukleniyor, setMesajYukleniyor] = useState(false);
  const mesajSonuRef = useRef<HTMLDivElement>(null);

  const [stats, setStats] = useState({
    aktifIlan: 0, bekleyenTeklif: 0, gelenTeklif: 0,
    okunmamisBildirim: 0, toplamSiparis: 0,
  });

  const yukle = useCallback(async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      // Admin isek kendi paneline hem kendi ilanlarını hem de AI ilanlarını (denetim için) getir
      const ilanApiUrl = isAdmin ? "/api/ilanlar?limit=100" : "/api/ilanlar?kendi=true";

      const [ilanRes, teklifRes, gelenRes, sipRes, bilRes, konRes] = await Promise.all([
        fetch(ilanApiUrl),
        fetch("/api/teklifler?kendi=true"),
        fetch("/api/teklifler"),
        fetch("/api/rezervasyonlar"),
        fetch("/api/bildirimler"),
        fetch("/api/mesajlar"),
      ]);

      const [ilanD, teklifD, gelenD, sipD, bilD, konD] = await Promise.all([
        ilanRes.json(), teklifRes.json(), gelenRes.json(),
        sipRes.json(), bilRes.json(), konRes.json(),
      ]);

      const tumIlanlar = Array.isArray(ilanD) ? ilanD : ilanD.ilanlar || ilanD.data || [];
      // Kullanıcı görünümü filtrelemesi
      const filtreIlanlar = tumIlanlar.filter(
        (i: any) => isAdmin ? true : (i.rol === rol && i.tip === tip)
      );
      
      const tL = Array.isArray(teklifD) ? teklifD : [];
      const gL = Array.isArray(gelenD) ? gelenD : [];
      const sL = Array.isArray(sipD) ? sipD : [];
      const bL = Array.isArray(bilD) ? bilD : [];
      const kL = Array.isArray(konD) ? konD : [];

      setIlanlar(filtreIlanlar);
      setTeklifler(tL);
      setGelenTeklifler(gL);
      setSiparisler(sL);
      setBildirimler(bL);
      setKonusmalar(kL);

      setStats({
        aktifIlan: filtreIlanlar.filter((i: any) => i.durum === "aktif").length,
        bekleyenTeklif: tL.filter((t: any) => t.durum === "bekliyor").length,
        gelenTeklif: gL.filter((t: any) => t.durum === "bekliyor").length,
        okunmamisBildirim: bL.filter((b: any) => !b.okundu).length,
        toplamSiparis: sL.length,
      });
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [session, rol, tip, isAdmin]);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/giris?redirect=/panel"); return; }
    if (session) yukle();
  }, [session, status, yukle]);

  // Mesajları yükle
  const mesajYukle = useCallback(async (karsiEmail: string, ilanId?: string) => {
    setMesajYukleniyor(true);
    try {
      const params = new URLSearchParams({ with: karsiEmail });
      if (ilanId) params.set("ilanId", ilanId);
      const res = await fetch(`/api/mesajlar?${params}`);
      const data = await res.json();
      setMesajlar(Array.isArray(data) ? data : []);
    } catch {}
    setMesajYukleniyor(false);
    setTimeout(() => mesajSonuRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, []);

  useEffect(() => {
    if (aktifKonusma) {
      const k = konusmalar.find(k => k._id === aktifKonusma);
      if (k) mesajYukle(k.karsiTaraf, k.ilanId);
    }
  }, [aktifKonusma]);

  const mesajGonder = async () => {
    if (!yeniMesaj.trim() || !aktifKonusma) return;
    const k = konusmalar.find(k => k._id === aktifKonusma);
    if (!k) return;
    const tmp = yeniMesaj;
    setYeniMesaj("");
    try {
      await fetch("/api/mesajlar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alici: k.karsiTaraf, mesaj: tmp, ilanId: k.ilanId }),
      });
      mesajYukle(k.karsiTaraf, k.ilanId);
    } catch {}
  };

  const teklifDurumGuncelle = async (teklifId: string, durum: string) => {
    await fetch("/api/teklifler", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teklifId, durum }),
    });
    yukle();
  };

  const bildirimOku = async (id: string) => {
    await fetch("/api/bildirimler", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBildirimler(p => p.map(b => b._id === id ? { ...b, okundu: true } : b));
    setStats(p => ({ ...p, okunmamisBildirim: Math.max(0, p.okunmamisBildirim - 1) }));
  };

  const ilanSil = async (id: string) => {
    if (!confirm("İlanı silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/ilanlar/${id}`, { method: "DELETE" });
    yukle();
  };

  // Güvenli Tarih Formatlayıcı
  const formatTarih = (tarihStr: any) => {
    if (!tarihStr) return "Tarih Yok";
    const d = new Date(tarihStr);
    return isNaN(d.getTime()) ? "Geçersiz Tarih" : d.toLocaleDateString("tr-TR");
  };

  // Güvenli Sayı Formatlayıcı
  const formatSayi = (sayiStr: any) => {
    const s = Number(sayiStr);
    return isNaN(s) ? 0 : s.toLocaleString("tr-TR");
  };

  if (status === "loading") return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#64748b", fontSize: 14, fontWeight: 600 }}>
      ⏳ Siber Kimlik Doğrulanıyor...
    </div>
  );
  if (!session) return null;

  const TABS: { key: Tab; label: string; icon: string; badge?: number; adminOnly?: boolean }[] = [
    { key: "ozet", label: "Özet", icon: "📊" },
    { key: "ilanlarim", label: isAdmin ? "Tüm İlanlar (Denetim)" : (rol === "alan" ? "Taleplerim" : "İlanlarım"), icon: "📋", badge: stats.aktifIlan },
    { key: "gelenTeklifler", label: "Gelen Teklifler", icon: "📥", badge: stats.gelenTeklif },
    { key: "tekliflerim", label: "Verdiğim Teklifler", icon: "💼", badge: stats.bekleyenTeklif },
    { key: "siparisler", label: "Siparişler", icon: "📦", badge: stats.toplamSiparis },
    { key: "mesajlar", label: "Mesajlarım", icon: "💬", badge: konusmalar.filter((k: any) => k.okunmamis > 0).length || undefined },
    { key: "bildirimler", label: "Bildirimler", icon: "🔔", badge: stats.okunmamisBildirim },
    { key: "profil", label: "Profilim", icon: "🏢" },
    { key: "ayarlar", label: "Ayarlar", icon: "⚙️" },
    // ADMIN ÖZEL SEKMELER
    { key: "ai_ilan_bireysel", label: "🤖 AI İlan (Bireysel)", icon: "⚡", adminOnly: true },
    { key: "ai_ilan_ticari", label: "🤖 AI İlan (B2B)", icon: "🏭", adminOnly: true },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Unbounded:wght@600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .panel-layout { display: grid; grid-template-columns: 240px 1fr; min-height: calc(100vh - 58px); }
        .sidebar { background: #fff; border-right: 1px solid #e2e8f0; padding: 16px 10px; position: sticky; top: 58px; height: calc(100vh - 58px); overflow-y: auto; }
        .main-area { padding: 22px 20px; max-width: 1000px; }
        .card { background: #fff; border-radius: 16px; border: 1.5px solid #e2e8f0; padding: 18px; }
        .row-item { background: #fff; border-radius: 12px; border: 1.5px solid #e2e8f0; padding: 14px; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px; transition: .15s; }
        .row-item:hover { box-shadow: 0 4px 16px rgba(0,0,0,.07); }
        .tab-btn { width: 100%; display: flex; align-items: center; gap: 8px; padding: 9px 10px; border-radius: 10px; border: none; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; text-align: left; margin-bottom: 2px; transition: .12s; background: transparent; color: #475569; }
        .tab-btn.on { background: #0f172a; color: #fff; font-weight: 700; }
        .tab-btn:not(.on):hover { background: #f1f5f9; }
        .admin-tab { background: rgba(124, 58, 237, 0.05); color: #7c3aed; border: 1px solid rgba(124, 58, 237, 0.2); }
        .admin-tab.on { background: #7c3aed; color: #fff; }
        .badge-dot { background: #f59e0b; color: #0f172a; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 99px; margin-left: auto; }
        .dur { padding: 3px 9px; border-radius: 99px; font-size: 10px; font-weight: 700; white-space: nowrap; }
        .sttl { font-size: 18px; font-weight: 800; color: #0f172a; font-family: 'Unbounded', sans-serif; margin-bottom: 16px; }
        .empty-box { text-align: center; padding: 48px; background: #fff; border-radius: 18px; border: 1.5px dashed #e2e8f0; }
        .adm-input { width: 100%; padding: 10px 14px; border-radius: 10px; border: 1.5px solid #e2e8f0; font-size: 13px; font-family: inherit; outline: none; }
        @media (max-width: 768px) {
          .panel-layout { display: flex; flex-direction: column; }
          .sidebar { position: static; height: auto; overflow-x: auto; overflow-y: hidden; padding: 0; border-right: none; border-bottom: 1px solid #e2e8f0; }
          .sidebar > div { display: none !important; }
          .sidebar > div:last-child { display: flex !important; overflow-x: auto; padding: 10px 12px; gap: 6px; white-space: nowrap; }
          .tab-btn { width: auto; flex-shrink: 0; margin-bottom: 0; padding: 8px 12px; }
          .main-area { padding: 14px; }
        }
      `}</style>

      {/* TOPBAR */}
      <div style={{ background: "#0f172a", padding: "0 20px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => router.push("/")} style={{ background: "rgba(255,255,255,.1)", border: "none", color: "#fff", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>← Ana Sayfa</button>
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: "Unbounded, sans-serif" }}>🌐 SwapHubs Panel</span>
          {isAdmin && <span style={{ background: "#dc2626", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4, marginLeft: 8 }}>ADMİN</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {stats.okunmamisBildirim > 0 && (
            <div style={{ background: "#dc2626", color: "#fff", borderRadius: 99, padding: "2px 8px", fontSize: 11, fontWeight: 800 }}>
              🔔 {stats.okunmamisBildirim}
            </div>
          )}
          <img
            src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || "U")}&background=1e3a5f&color=f59e0b`}
            alt="" style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid rgba(245,158,11,.4)" }}
          />
          <span style={{ color: "rgba(255,255,255,.7)", fontSize: 12 }}>{session.user?.name?.split(" ")[0]}</span>
          <button onClick={() => signOut({ callbackUrl: "/" })} style={{ background: "rgba(255,255,255,.08)", border: "none", color: "rgba(255,255,255,.6)", padding: "5px 10px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontFamily: "inherit" }}>Çıkış</button>
        </div>
      </div>

      <div className="panel-layout">
        {/* SIDEBAR */}
        <div className="sidebar">
          {/* Kullanıcı */}
          <div style={{ padding: "12px", background: "#f8fafc", borderRadius: 12, marginBottom: 14 }}>
            <img src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || "U")}&background=1e3a5f&color=f59e0b`} alt="" style={{ width: 40, height: 40, borderRadius: "50%", display: "block", marginBottom: 6 }} />
            <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{session.user?.name}</p>
            <p style={{ fontSize: 10, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.user?.email}</p>
          </div>

          {/* Kimlik şalteri */}
          <div style={{ background: "#f8fafc", borderRadius: 12, padding: "10px", marginBottom: 12, border: "1px solid #e2e8f0" }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 8 }}>Panel Görünümü</p>
            <div style={{ display: "flex", background: "#fff", padding: 3, borderRadius: 8, marginBottom: 8, border: "1px solid #e2e8f0" }}>
              {(["bireysel", "ticari"] as const).map(t => (
                <button key={t} onClick={() => setTip(t)} style={{ flex: 1, padding: "6px 4px", border: "none", borderRadius: 6, background: tip === t ? (t === "ticari" ? "#f59e0b" : "#2563eb") : "transparent", color: tip === t ? (t === "ticari" ? "#0f172a" : "#fff") : "#64748b", fontFamily: "inherit", fontWeight: 600, fontSize: 11, cursor: "pointer" }}>
                  {t === "bireysel" ? "👤 Bireysel" : "🏭 Ticari"}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", background: "#fff", padding: 3, borderRadius: 8, border: "1px solid #e2e8f0" }}>
              {(["alan", "veren"] as const).map(r => (
                <button key={r} onClick={() => setRol(r)} style={{ flex: 1, padding: "6px 4px", border: "none", borderRadius: 6, background: rol === r ? (r === "alan" ? "#0f172a" : "#dc2626") : "transparent", color: rol === r ? "#fff" : "#64748b", fontFamily: "inherit", fontWeight: 600, fontSize: 10, cursor: "pointer" }}>
                  {r === "alan" ? "🛒 Alıyorum" : "💼 Veriyorum"}
                </button>
              ))}
            </div>
          </div>

          {/* Menü */}
          <div>
            {TABS.filter(t => !t.adminOnly || isAdmin).map(t => (
              <button 
                key={t.key} 
                className={`tab-btn ${aktifTab === t.key ? "on" : ""} ${t.adminOnly ? 'admin-tab' : ''}`} 
                onClick={() => setAktifTab(t.key)}
              >
                <span>{t.icon}</span>
                <span style={{ flex: 1 }}>{t.label}</span>
                {t.badge ? <span className="badge-dot">{t.badge}</span> : null}
              </button>
            ))}
          </div>

          {/* Yeni İlan butonu */}
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #e2e8f0" }}>
            <button onClick={() => router.push(`/ilan-ver?tip=${tip}&rol=${rol}`)} style={{ width: "100%", padding: "10px", borderRadius: 10, background: "#f59e0b", border: "none", color: "#0f172a", fontFamily: "inherit", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>
              ⚡ Yeni İlan Ver
            </button>
          </div>
        </div>

        {/* ANA ALAN */}
        <div className="main-area">

          {/* ── ÖZET ── */}
          {aktifTab === "ozet" && (
            <div>
              <p className="sttl">Hoş geldiniz, {session.user?.name?.split(" ")[0]} 👋</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 24 }}>
                {[
                  { l: isAdmin ? "Sistemdeki İlanlar" : "Aktif İlan", v: stats.aktifIlan, i: "📋", c: "#2563eb" },
                  { l: "Gelen Teklif", v: stats.gelenTeklif, i: "📥", c: "#d97706" },
                  { l: "Verdiğim Teklif", v: stats.bekleyenTeklif, i: "💼", c: "#7c3aed" },
                  { l: "Sipariş", v: stats.toplamSiparis, i: "📦", c: "#059669" },
                ].map(s => (
                  <div key={s.l} className="card" style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 22, marginBottom: 6 }}>{s.i}</p>
                    <p style={{ fontSize: 26, fontWeight: 800, color: s.c, fontFamily: "Unbounded, sans-serif" }}>{s.v}</p>
                    <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>{s.l}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>{isAdmin ? 'Sistemdeki Son İlanlar' : 'Son İlanlarım'}</p>
              {loading ? <p style={{ color: "#94a3b8", fontSize: 13 }}>Yükleniyor...</p> :
                ilanlar.slice(0, 5).length === 0 ? (
                  <div className="empty-box">
                    <p style={{ fontSize: "2rem", marginBottom: 8 }}>📋</p>
                    <p style={{ fontSize: 14, color: "#64748b", marginBottom: 12 }}>Bu kimlikte henüz ilanınız yok</p>
                    <button onClick={() => router.push(`/ilan-ver?tip=${tip}&rol=${rol}`)} style={{ padding: "9px 20px", borderRadius: 10, background: "#2563eb", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>İlan Ver</button>
                  </div>
                ) : ilanlar.slice(0, 5).map(i => (
                  <div key={i._id} className="row-item" style={{ cursor: "pointer" }} onClick={() => router.push(`/ilan/${i._id}`)}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f1f5f9", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                      {i.resimUrl || i.medyalar?.[0] ? <img src={i.resimUrl || i.medyalar[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "📋"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.baslik}</p>
                      <p style={{ fontSize: 11, color: "#64748b" }}>
                        {i.yapay || i.is_ai_generated ? <span style={{color: '#7c3aed', fontWeight: 700}}>🤖 AI İlanı · </span> : ''}
                        {i.teklifSayisi || 0} teklif · {formatTarih(i.createdAt)}
                      </p>
                    </div>
                    <span className="dur" style={DURUM_STIL[i.durum] ? { background: DURUM_STIL[i.durum].bg, color: DURUM_STIL[i.durum].c } : { background: "#f1f5f9", color: "#64748b" }}>{i.durum}</span>
                  </div>
                ))}
            </div>
          )}

          {/* ── İLANLARIM ── */}
          {aktifTab === "ilanlarim" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <p className="sttl" style={{ marginBottom: 0 }}>{isAdmin ? 'Tüm Sistem İlanları' : 'İlanlarım'} ({ilanlar.length})</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {ilanlar.length > 0 && (
                    <button onClick={async () => {
                      if (!confirm("Tüm ilanlar silinecek!")) return;
                      await Promise.all(ilanlar.map(i => fetch(`/api/ilanlar/${i._id}`, { method: "DELETE" })));
                      yukle();
                    }} style={{ padding: "8px 14px", borderRadius: 10, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Tümünü Sil</button>
                  )}
                  <button onClick={() => router.push(`/ilan-ver?tip=${tip}&rol=${rol}`)} style={{ padding: "8px 14px", borderRadius: 10, background: "#0f172a", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ Yeni İlan</button>
                </div>
              </div>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> :
                ilanlar.length === 0 ? (
                  <div className="empty-box">
                    <p style={{ fontSize: "2rem", marginBottom: 8 }}>📋</p>
                    <p style={{ fontSize: 14, color: "#64748b", marginBottom: 12 }}>Henüz ilan yok</p>
                    <button onClick={() => router.push(`/ilan-ver?tip=${tip}&rol=${rol}`)} style={{ padding: "10px 24px", borderRadius: 10, background: "#2563eb", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>İlan Ver</button>
                  </div>
                ) : ilanlar.map(i => (
                  <div key={i._id} className="row-item">
                    <div style={{ width: 60, height: 60, borderRadius: 10, background: "#f1f5f9", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                      {i.resimUrl || i.medyalar?.[0] ? <img src={i.resimUrl || i.medyalar[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "📋"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                           <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.baslik}</p>
                           {i.yapay || i.is_ai_generated ? <span style={{background: '#f5f3ff', color: '#7c3aed', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4}}>AI</span> : null}
                        </div>
                        <span className="dur" style={DURUM_STIL[i.durum] ? { background: DURUM_STIL[i.durum].bg, color: DURUM_STIL[i.durum].c } : { background: "#f1f5f9", color: "#64748b" }}>{i.durum}</span>
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 3 }}>
                        {i.butceMin > 0 ? `${formatSayi(i.butceMin)} ${i.butceBirimi}` : "Bütçe açık"}
                      </p>
                      <div style={{ display: "flex", gap: 10, fontSize: 11, color: "#94a3b8", marginBottom: 8, flexWrap: "wrap" }}>
                        <span style={{background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, color: '#475569'}}>{i.tip} / {i.rol}</span>
                        <span>💼 {i.teklifSayisi || 0} teklif</span>
                        <span>👁 {i.goruntulenme || 0} görüntülenme</span>
                        <span>📅 {formatTarih(i.createdAt)}</span>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <button onClick={() => router.push(`/ilan/${i._id}`)} style={BTN_SM("#f1f5f9", "#475569")}>Detay / Teklifler</button>
                        <button onClick={() => { setAktifTab("mesajlar"); }} style={BTN_SM("#eff6ff", "#2563eb")}>💬 Mesajlar</button>
                        {!isAdmin && (
                          <button onClick={async () => { await fetch(`/api/ilanlar/${i._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ teklifeAcik: !i.teklifeAcik }) }); yukle(); }} style={BTN_SM(i.teklifeAcik ? "#fef9c3" : "#ecfdf5", i.teklifeAcik ? "#92400e" : "#059669")}>
                            {i.teklifeAcik ? "🟡 Kapat" : "🟢 Aç"}
                          </button>
                        )}
                        <button onClick={() => ilanSil(i._id)} style={BTN_SM("#fef2f2", "#dc2626")}>Sil</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* ── GELEN TEKLİFLER ── */}
          {aktifTab === "gelenTeklifler" && (
            <div>
              <p className="sttl">Gelen Teklifler ({gelenTeklifler.length})</p>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> :
                gelenTeklifler.length === 0 ? (
                  <div className="empty-box">
                    <p style={{ fontSize: "2rem", marginBottom: 8 }}>📥</p>
                    <p style={{ fontSize: 14, color: "#64748b" }}>Henüz gelen teklif yok</p>
                  </div>
                ) : gelenTeklifler.map(t => (
                  <div key={t._id} className="row-item">
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>📥</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{t.ilanBaslik || 'İlan Silinmiş'}</p>
                      <p style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 3 }}>{formatSayi(t.teklifFiyat)} {t.doviz || '₺'}</p>
                      {t.aciklama && <p style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{t.aciklama.slice(0, 80)}...</p>}
                      <p style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8 }}>
                        👤 {t.teklifVeren?.ad || t.teklifVeren?.email || 'Bilinmiyor'} · {formatTarih(t.olusturuldu || t.createdAt)}
                      </p>
                      {t.durum === "bekliyor" && (
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => teklifDurumGuncelle(t._id, "kabul_edildi")} style={BTN_SM("#ecfdf5", "#059669")}>✅ Kabul Et</button>
                          <button onClick={() => teklifDurumGuncelle(t._id, "reddedildi")} style={BTN_SM("#fef2f2", "#dc2626")}>❌ Reddet</button>
                          <button onClick={() => { setAktifKonusma(t._id); setAktifTab("mesajlar"); }} style={BTN_SM("#eff6ff", "#2563eb")}>💬 Mesaj</button>
                        </div>
                      )}
                    </div>
                    <span className="dur" style={DURUM_STIL[t.durum] ? { background: DURUM_STIL[t.durum].bg, color: DURUM_STIL[t.durum].c } : { background: "#f1f5f9", color: "#64748b" }}>{t.durum || 'bekliyor'}</span>
                  </div>
                ))}
            </div>
          )}

          {/* ── VERDİĞİM TEKLİFLER ── */}
          {aktifTab === "tekliflerim" && (
            <div>
              <p className="sttl">Verdiğim Teklifler ({teklifler.length})</p>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> :
                teklifler.length === 0 ? (
                  <div className="empty-box">
                    <p style={{ fontSize: "2rem", marginBottom: 8 }}>💼</p>
                    <p style={{ fontSize: 14, color: "#64748b", marginBottom: 12 }}>Henüz teklif vermemişsiniz</p>
                    <button onClick={() => router.push("/")} style={{ padding: "10px 24px", borderRadius: 10, background: "#2563eb", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>İlanlara Bak</button>
                  </div>
                ) : teklifler.map(t => (
                  <div key={t._id} className="row-item">
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>💼</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.ilanBaslik || 'İlan Silinmiş'}</p>
                      <p style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 3 }}>{formatSayi(t.teklifFiyat)} {t.doviz || '₺'}</p>
                      <p style={{ fontSize: 10, color: "#94a3b8", marginBottom: 6 }}>{formatTarih(t.olusturuldu || t.createdAt)}</p>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => router.push(`/ilan/${t.ilanId}`)} style={BTN_SM("#eff6ff", "#2563eb")}>İlana Git</button>
                        {t.durum === "bekliyor" && (
                          <button onClick={() => teklifDurumGuncelle(t._id, "geri_alindi")} style={BTN_SM("#fef2f2", "#dc2626")}>Geri Al</button>
                        )}
                      </div>
                    </div>
                    <span className="dur" style={DURUM_STIL[t.durum] ? { background: DURUM_STIL[t.durum].bg, color: DURUM_STIL[t.durum].c } : { background: "#f1f5f9", color: "#64748b" }}>{t.durum || 'bekliyor'}</span>
                  </div>
                ))}
            </div>
          )}

          {/* ── SİPARİŞLER ── */}
          {aktifTab === "siparisler" && (
            <div>
              <p className="sttl">Siparişler ({siparisler.length})</p>
              {loading ? <p style={{ color: "#94a3b8" }}>Yükleniyor...</p> :
                siparisler.length === 0 ? (
                  <div className="empty-box">
                    <p style={{ fontSize: "2rem", marginBottom: 8 }}>📦</p>
                    <p style={{ fontSize: 14, color: "#64748b" }}>Henüz sipariş yok</p>
                  </div>
                ) : siparisler.map(r => (
                  <div key={r._id} className="row-item">
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>📦</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>
                        {r.musteri?.email === session.user?.email ? `Hizmet: ${r.hizmetVeren?.ad || "—"}` : `Müşteri: ${r.musteri?.ad || "—"}`}
                      </p>
                      <p style={{ fontSize: 16, fontWeight: 800, color: "#059669", marginBottom: 3 }}>{formatSayi(r.fiyat)} {r.doviz || '₺'}</p>
                      <p style={{ fontSize: 11, color: "#94a3b8" }}>{formatTarih(r.olusturuldu || r.createdAt)}</p>
                    </div>
                    <span className="dur" style={DURUM_STIL[r.durum] ? { background: DURUM_STIL[r.durum].bg, color: DURUM_STIL[r.durum].c } : { background: "#f1f5f9", color: "#64748b" }}>{r.durum}</span>
                  </div>
                ))}
            </div>
          )}

          {/* ── MESAJLAR ── */}
          {aktifTab === "mesajlar" && (
            <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16, height: "calc(100vh - 160px)", minHeight: 400 }}>
              {/* Konuşma listesi */}
              <div style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e2e8f0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "12px 14px", borderBottom: "1px solid #e2e8f0" }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>💬 Mesajlarım</p>
                </div>
                <div style={{ flex: 1, overflowY: "auto" }}>
                  {konusmalar.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "32px 16px", color: "#94a3b8", fontSize: 13 }}>
                      Henüz mesajlaşma yok
                    </div>
                  ) : konusmalar.map(k => (
                    <div
                      key={k._id}
                      onClick={() => setAktifKonusma(k._id)}
                      style={{ padding: "12px 14px", borderBottom: "1px solid #f1f5f9", cursor: "pointer", background: aktifKonusma === k._id ? "#eff6ff" : "#fff", transition: ".15s" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {k.karsiTaraf?.split("@")[0] || "Kullanıcı"}
                        </p>
                        {k.okunmamis > 0 && (
                          <span style={{ background: "#2563eb", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 99 }}>{k.okunmamis}</span>
                        )}
                      </div>
                      {k.ilanBaslik && <p style={{ fontSize: 10, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>📋 {k.ilanBaslik}</p>}
                      <p style={{ fontSize: 11, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2 }}>{k.sonMesaj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mesaj içeriği */}
              <div style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
                {!aktifKonusma ? (
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, color: "#94a3b8" }}>
                    <p style={{ fontSize: "3rem" }}>💬</p>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>Bir konuşma seçin</p>
                  </div>
                ) : (
                  <>
                    <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                        {konusmalar.find(k => k._id === aktifKonusma)?.karsiTaraf?.split("@")[0] || "Konuşma"}
                      </p>
                    </div>
                    <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
                      {mesajYukleniyor ? (
                        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 13 }}>Yükleniyor...</p>
                      ) : mesajlar.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 13 }}>Henüz mesaj yok</p>
                      ) : mesajlar.map(m => {
                        const benim = m.gonderen === session.user?.email;
                        return (
                          <div key={m._id} style={{ display: "flex", justifyContent: benim ? "flex-end" : "flex-start" }}>
                            <div style={{ maxWidth: "70%", padding: "10px 14px", borderRadius: benim ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: benim ? "#0f172a" : "#f1f5f9", color: benim ? "#fff" : "#0f172a", fontSize: 13, lineHeight: 1.5 }}>
                              <p>{m.mesaj}</p>
                              <p style={{ fontSize: 10, opacity: .6, marginTop: 4, textAlign: "right" }}>{formatTarih(m.createdAt)}</p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={mesajSonuRef} />
                    </div>
                    <div style={{ padding: "12px 16px", borderTop: "1px solid #e2e8f0", display: "flex", gap: 8 }}>
                      <input
                        type="text" value={yeniMesaj}
                        onChange={e => setYeniMesaj(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && mesajGonder()}
                        placeholder="Mesajınızı yazın..."
                        style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 13, fontFamily: "inherit", outline: "none" }}
                      />
                      <button onClick={mesajGonder} style={{ padding: "10px 20px", borderRadius: 10, background: "#0f172a", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Gönder</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── BİLDİRİMLER ── */}
          {aktifTab === "bildirimler" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <p className="sttl" style={{ marginBottom: 0 }}>Bildirimler</p>
                {bildirimler.some(b => !b.okundu) && (
                  <button onClick={async () => {
                    await Promise.all(bildirimler.filter(b => !b.okundu).map(b => fetch("/api/bildirimler", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: b._id }) })));
                    setBildirimler(p => p.map(b => ({ ...b, okundu: true })));
                    setStats(p => ({ ...p, okunmamisBildirim: 0 }));
                  }} style={{ padding: "7px 14px", borderRadius: 8, background: "#f1f5f9", border: "none", color: "#475569", fontFamily: "inherit", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                    Tümünü Okundu İşaretle
                  </button>
                )}
              </div>
              {bildirimler.length === 0 ? (
                <div className="empty-box"><p style={{ fontSize: "2rem", marginBottom: 8 }}>🔔</p><p style={{ fontSize: 14, color: "#64748b" }}>Bildirim yok</p></div>
              ) : bildirimler.map(b => (
                <div key={b._id} onClick={() => !b.okundu && bildirimOku(b._id)} style={{ background: b.okundu ? "#fff" : "#eff6ff", border: `1.5px solid ${b.okundu ? "#e2e8f0" : "#bfdbfe"}`, borderRadius: 12, padding: "14px 16px", marginBottom: 8, cursor: b.okundu ? "default" : "pointer" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{b.tip === "yeni_teklif" ? "💼" : b.tip === "teklif_kabul" ? "🎉" : "🔔"}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, color: "#0f172a", fontWeight: b.okundu ? 400 : 700, lineHeight: 1.5 }}>{b.mesaj}</p>
                      <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>{formatTarih(b.tarih || b.createdAt)}</p>
                      {b.ilanId && (
                        <button onClick={e => { e.stopPropagation(); router.push(`/ilan/${b.ilanId}`); }} style={{ marginTop: 6, padding: "4px 10px", borderRadius: 6, background: "#0f172a", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>
                          İlana Git →
                        </button>
                      )}
                    </div>
                    {!b.okundu && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563eb", flexShrink: 0, marginTop: 4 }} />}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── PROFİL ── */}
          {aktifTab === "profil" && (
            <div>
              <p className="sttl">Profilim</p>
              <div className="card">
                <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
                  <img src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || "U")}&background=1e3a5f&color=f59e0b`} alt="" style={{ width: 64, height: 64, borderRadius: "50%", border: "3px solid #e2e8f0" }} />
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>{session.user?.name}</p>
                    <p style={{ fontSize: 13, color: "#64748b" }}>{session.user?.email}</p>
                  </div>
                </div>
                <button onClick={() => router.push("/otel-profil")} style={{ padding: "11px 24px", borderRadius: 12, background: "#7c3aed", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  🏢 Kurumsal Profil Oluştur / Güncelle
                </button>
              </div>
            </div>
          )}

          {/* ── AYARLAR ── */}
          {aktifTab === "ayarlar" && (
            <div>
              <p className="sttl">Hesap Ayarları</p>
              <div className="card" style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#0f172a" }}>Profil Bilgileri</p>
                {[
                  { l: "Ad Soyad", v: session.user?.name || "", disabled: false },
                  { l: "E-posta (değiştirilemez)", v: session.user?.email || "", disabled: true },
                ].map(f => (
                  <div key={f.l} style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 5 }}>{f.l}</label>
                    <input type="text" defaultValue={f.v} disabled={f.disabled} style={{ width: "100%", padding: "11px 14px", borderRadius: 11, border: "1.5px solid #e2e8f0", fontSize: 14, fontFamily: "inherit", background: f.disabled ? "#f8fafc" : "#fff", color: f.disabled ? "#94a3b8" : "#0f172a" }} />
                  </div>
                ))}
                <button style={{ padding: "11px 24px", borderRadius: 11, background: "#0f172a", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Kaydet</button>
              </div>
              <div className="card" style={{ background: "#fef2f2", borderColor: "#fecaca" }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#dc2626", marginBottom: 10 }}>Hesap İşlemleri</p>
                <button onClick={() => signOut({ callbackUrl: "/" })} style={{ padding: "10px 20px", borderRadius: 10, background: "#dc2626", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Çıkış Yap</button>
              </div>
            </div>
          )}

          {/* ── ADMIN: BİREYSEL AI İLAN MOTORU ── */}
          {isAdmin && aktifTab === "ai_ilan_bireysel" && (
            <AiIlanBileseni tip="bireysel" sektorler={TUM_SEKTORLER.filter(s => s.tip === 'bireysel' || s.tip === 'both')} adminKey={process.env.NEXT_PUBLIC_ADMIN_KEY || ""} onSuccess={yukle} />
          )}

          {/* ── ADMIN: TİCARİ AI İLAN MOTORU ── */}
          {isAdmin && aktifTab === "ai_ilan_ticari" && (
            <AiIlanBileseni tip="ticari" sektorler={TUM_SEKTORLER.filter(s => s.tip === 'ticari' || s.tip === 'both')} adminKey={process.env.NEXT_PUBLIC_ADMIN_KEY || ""} onSuccess={yukle} />
          )}

        </div>
      </div>
    </div>
  );
}

// Form elemanları için ortak stil
const SEL: React.CSSProperties = { 
  width: "100%", padding: "10px 12px", borderRadius: 10, 
  border: "1.5px solid #e2e8f0", fontSize: 13, 
  fontFamily: "inherit", background: "#fff", outline: "none" 
};

// AI İLAN BİLEŞENİ
function AiIlanBileseni({ tip, sektorler, adminKey, onSuccess }: { tip: string, sektorler: any[], adminKey: string, onSuccess: () => void }) {
  const [secilenSektor, setSecilenSektor] = useState("");
  const [rol, setRol] = useState("her-ikisi");
  const [ulke, setUlke] = useState("Türkiye"); // Varsayılan olarak Türkiye seçili gelsin
  const [sehir, setSehir] = useState("Rastgele");
  const [adet, setAdet] = useState(5);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [sonuc, setSonuc] = useState("");

  const uret = async () => {
    if (!secilenSektor) return alert("Sektör seçin");
    setYukleniyor(true); setSonuc("");
    try {
      const res = await fetch("/api/ai-ilan", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sektorId: secilenSektor, adet, tip, adminKey,
          rol: rol === "her-ikisi" ? undefined : rol,
          ulke: ulke === "Rastgele" ? null : ulke,
          sehir: sehir === "Rastgele" ? null : sehir,
          yapay: true
        })
      });
      const data = await res.json();
      if (data.success) {
        setSonuc(`✅ ${data.uretilen} adet ${tip} ilan ağa eklendi.`);
        onSuccess();
      } else setSonuc(`❌ Hata: ${data.error}`);
    } catch { setSonuc("❌ Bağlantı hatası"); }
    setYukleniyor(false);
  };

  return (
    <div className="card">
      <p className="sttl">{tip === 'ticari' ? '🏭 Endüstriyel B2B AI Motoru' : '🙋 Bireysel AI İlan Motoru'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 5 }}>İlan Rolü</label>
          <select value={rol} onChange={e => setRol(e.target.value)} style={SEL}>
            <option value="her-ikisi">🔄 Mix (Hem Alan Hem Veren)</option>
            <option value="veren">💼 Sadece Hizmet/Ürün Veren</option>
            <option value="alan">🛒 Sadece Hizmet/Ürün Alan</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Sektör</label>
          <select value={secilenSektor} onChange={e => setSecilenSektor(e.target.value)} style={SEL}>
            <option value="">-- Sektör Seçin --</option>
            {sektorler.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.ad}</option>)}
          </select>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Ülke</label>
          <select value={ulke} onChange={e => {
              setUlke(e.target.value);
              if(e.target.value !== 'Türkiye') setSehir('Rastgele'); // Türkiye değilse şehri sıfırla
          }} style={SEL}>
            {ULKELER.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        {/* EĞER ÜLKE TÜRKİYE İSE ŞEHİR SEÇİMİ AÇILIR */}
        {ulke === 'Türkiye' && (
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Şehir</label>
            <select value={sehir} onChange={e => setSehir(e.target.value)} style={SEL}>
              {SEHIRLER.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}

        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: 5 }}>İlan Sayısı: {adet}</label>
          <input type="range" min={1} max={30} value={adet} onChange={e => setAdet(Number(e.target.value))} style={{ width: '100%', marginTop: 8 }} />
        </div>
      </div>

      <button onClick={uret} disabled={yukleniyor || !secilenSektor} style={{ width: "100%", padding: "14px", borderRadius: 10, background: yukleniyor ? "#94a3b8" : "#7c3aed", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: yukleniyor ? "not-allowed" : "pointer" }}>
        {yukleniyor ? "⏳ Claude AI Düşünüyor..." : "⚡ Ağa İlan Bas"}
      </button>
      {sonuc && <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: sonuc.includes('❌') ? '#fef2f2' : '#ecfdf5', color: sonuc.includes('❌') ? '#dc2626' : '#059669', fontSize: 13, fontWeight: 700 }}>{sonuc}</div>}
    </div>
  );
}

export default function PanelPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#64748b" }}>
        Panel Yükleniyor...
      </div>
    }>
      <PanelIcerik />
    </Suspense>
  );
}
