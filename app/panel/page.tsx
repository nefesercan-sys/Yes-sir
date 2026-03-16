"use client";

// ============================================================
// SwapHubs — app/panel/page.tsx
// Tam üye paneli + Adminler için Gizli AI İlan Motoru
// ============================================================
import { useState, useEffect, useCallback, Suspense, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

// --- SABİTLER VE YARDIMCI FONKSİYONLAR ---
const DURUM_STIL: Record<string, { bg: string; c: string }> = {
  aktif:          { bg: "#ecfdf5", c: "#059669" },
  bekliyor:       { bg: "#fffbeb", c: "#d97706" },
  kabul_edildi:   { bg: "#eff6ff", c: "#2563eb" },
  reddedildi:     { bg: "#fef2f2", c: "#dc2626" },
  tamamlandi:     { bg: "#f0fdf4", c: "#16a34a" },
  iptal:          { bg: "#fef2f2", c: "#dc2626" },
  gonullu_kapali: { bg: "#f1f5f9", c: "#64748b" },
  geri_alindi:    { bg: "#f1f5f9", c: "#64748b" },
};

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

type Tab = "ozet" | "ilanlarim" | "tekliflerim" | "gelenTeklifler" | "siparisler" | "mesajlar" | "bildirimler" | "profil" | "ayarlar" | "ai_ilan_bireysel" | "ai_ilan_ticari";
type Rol = "alan" | "veren";
type Tip = "bireysel" | "ticari";

function PanelIcerik() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Admin Kontrolü
  const isAdmin = session?.user?.email === 'nefesercan@gmail.com';

  const [aktifTab, setAktifTab] = useState<Tab>((searchParams.get("tab") as Tab) || "ozet");
  const [tip, setTip] = useState<Tip>("ticari");
  const [rol, setRol] = useState<Rol>("alan");

  // State Yönetimi
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

  // Veri Çekme Fonksiyonu
  const yukle = useCallback(async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
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

      const tumIlanlar = Array.isArray(ilanD) ? ilanD : ilanD.ilanlar || [];
      const filtreIlanlar = tumIlanlar.filter((i: any) => isAdmin ? true : (i.rol === rol && i.tip === tip));
      
      setIlanlar(filtreIlanlar);
      setTeklifler(Array.isArray(teklifD) ? teklifD : []);
      setGelenTeklifler(Array.isArray(gelenD) ? gelenD : []);
      setSiparisler(Array.isArray(sipD) ? sipD : []);
      setBildirimler(Array.isArray(bilD) ? bilD : []);
      setKonusmalar(Array.isArray(konD) ? konD : []);

      setStats({
        aktifIlan: filtreIlanlar.filter((i: any) => i.durum === "aktif").length,
        bekleyenTeklif: Array.isArray(teklifD) ? teklifD.filter((t: any) => t.durum === "bekliyor").length : 0,
        gelenTeklif: Array.isArray(gelenD) ? gelenD.filter((t: any) => t.durum === "bekliyor").length : 0,
        okunmamisBildirim: Array.isArray(bilD) ? bilD.filter((b: any) => !b.okundu).length : 0,
        toplamSiparis: Array.isArray(sipD) ? sipD.length : 0,
      });
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [session, rol, tip, isAdmin]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/giris?redirect=/panel");
    if (session) yukle();
  }, [session, status, yukle]);

  // Mesajlaşma İşlemleri
  const mesajYukle = useCallback(async (karsiEmail: string, ilanId?: string) => {
    setMesajYukleniyor(true);
    try {
      const res = await fetch(`/api/mesajlar?with=${karsiEmail}${ilanId ? `&ilanId=${ilanId}` : ''}`);
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

  const formatTarih = (t: any) => t ? new Date(t).toLocaleDateString("tr-TR") : "-";
  const formatSayi = (s: any) => Number(s || 0).toLocaleString("tr-TR");

  if (status === "loading") return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#64748b" }}>⏳ Siber Panel Yükleniyor...</div>;
  if (!session) return null;

  const TABS: { key: Tab; label: string; icon: string; badge?: number; adminOnly?: boolean }[] = [
    { key: "ozet", label: "Özet", icon: "📊" },
    { key: "ilanlarim", label: isAdmin ? "Tüm İlanlar" : "İlanlarım", icon: "📋", badge: stats.aktifIlan },
    { key: "gelenTeklifler", label: "Gelen Teklifler", icon: "📥", badge: stats.gelenTeklif },
    { key: "tekliflerim", label: "Verdiğim Teklifler", icon: "💼", badge: stats.bekleyenTeklif },
    { key: "siparisler", label: "Siparişler", icon: "📦", badge: stats.toplamSiparis },
    { key: "mesajlar", label: "Mesajlarım", icon: "💬" },
    { key: "bildirimler", label: "Bildirimler", icon: "🔔", badge: stats.okunmamisBildirim },
    { key: "ai_ilan_bireysel", label: "🤖 AI (Bireysel)", icon: "⚡", adminOnly: true },
    { key: "ai_ilan_ticari", label: "🤖 AI (B2B)", icon: "🏭", adminOnly: true },
    { key: "profil", label: "Profil", icon: "🏢" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .panel-layout { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }
        .sidebar { background: #fff; border-right: 1px solid #e2e8f0; padding: 20px 10px; position: sticky; top: 0; height: 100vh; }
        .tab-btn { width: 100%; display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 10px; border: none; font-size: 13px; font-weight: 600; cursor: pointer; background: transparent; color: #475569; transition: .2s; margin-bottom: 2px; }
        .tab-btn.on { background: #0f172a; color: #fff; }
        .tab-btn:hover:not(.on) { background: #f1f5f9; }
        .badge { background: #f59e0b; color: #000; font-size: 10px; padding: 2px 6px; border-radius: 99px; margin-left: auto; }
        .card { background: #fff; border-radius: 16px; border: 1.5px solid #e2e8f0; padding: 20px; margin-bottom: 16px; }
        .row-item { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px; }
        .sttl { font-size: 18px; font-weight: 800; margin-bottom: 20px; font-family: sans-serif; }
        @media (max-width: 768px) { .panel-layout { display: flex; flex-direction: column; } .sidebar { position: static; height: auto; border-right: none; border-bottom: 1px solid #e2e8f0; } }
      `}} />

      <div className="panel-layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div style={{ padding: "0 10px 20px" }}>
            <h2 style={{ fontSize: 16, fontWeight: 800 }}>SwapHubs</h2>
            <p style={{ fontSize: 11, color: "#94a3b8" }}>{session.user?.email}</p>
          </div>

          <div style={{ display: "flex", gap: 5, background: "#f1f5f9", padding: 4, borderRadius: 10, marginBottom: 20 }}>
            {["bireysel", "ticari"].map(t => (
              <button key={t} onClick={() => setTip(t as Tip)} style={{ flex: 1, padding: "6px", border: "none", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", background: tip === t ? "#fff" : "transparent", boxShadow: tip === t ? "0 2px 4px rgba(0,0,0,0.05)" : "none" }}>{t.toUpperCase()}</button>
            ))}
          </div>

          {TABS.filter(t => !t.adminOnly || isAdmin).map(t => (
            <button key={t.key} className={`tab-btn ${aktifTab === t.key ? "on" : ""}`} onClick={() => setAktifTab(t.key)}>
              <span>{t.icon}</span> {t.label} {t.badge ? <span className="badge">{t.badge}</span> : null}
            </button>
          ))}

          <button onClick={() => signOut()} style={{ ...BTN_SM("transparent", "#dc2626"), width: "100%", marginTop: 20, textAlign: "left" }}>🚪 Çıkış Yap</button>
        </aside>

        {/* MAIN AREA */}
        <main style={{ padding: 30 }}>
          
          {aktifTab === "ozet" && (
            <div>
              <p className="sttl">Hoş geldin, {session.user?.name} 👋</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 15, marginBottom: 30 }}>
                <div className="card"><h3>{stats.aktifIlan}</h3><p>Aktif İlan</p></div>
                <div className="card"><h3>{stats.gelenTeklif}</h3><p>Gelen Teklif</p></div>
                <div className="card"><h3>{stats.toplamSiparis}</h3><p>Siparişler</p></div>
              </div>
            </div>
          )}

          {aktifTab === "ilanlarim" && (
            <div>
              <p className="sttl">İlanlarım ({ilanlar.length})</p>
              {ilanlar.map(i => (
                <div key={i._id} className="row-item">
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700 }}>{i.baslik}</p>
                    <p style={{ fontSize: 12, color: "#64748b" }}>{i.tip} - {i.rol} | {formatTarih(i.createdAt)}</p>
                  </div>
                  <span style={{ ...DURUM_STIL[i.durum], padding: "4px 8px", borderRadius: 6, fontSize: 10, fontWeight: 800 }}>{i.durum?.toUpperCase()}</span>
                </div>
              ))}
            </div>
          )}

          {aktifTab === "mesajlar" && (
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, height: 500, background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ borderRight: "1px solid #e2e8f0", overflowY: "auto", background: "#f8fafc" }}>
                {konusmalar.map(k => (
                  <div key={k._id} onClick={() => setAktifKonusma(k._id)} style={{ padding: 15, cursor: "pointer", borderBottom: "1px solid #eee", background: aktifKonusma === k._id ? "#fff" : "transparent" }}>
                    <p style={{ fontSize: 13, fontWeight: 700 }}>{k.karsiTarafAd || k.karsiTaraf}</p>
                    <p style={{ fontSize: 11, color: "#64748b" }}>{k.sonMesaj}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>
                  {mesajlar.map((m, idx) => (
                    <div key={idx} style={{ alignSelf: m.gonderen === session.user?.email ? "flex-end" : "flex-start", background: m.gonderen === session.user?.email ? "#0f172a" : "#f1f5f9", color: m.gonderen === session.user?.email ? "#fff" : "#000", padding: "8px 12px", borderRadius: 12, marginBottom: 8, maxWidth: "70%" }}>{m.mesaj}</div>
                  ))}
                  <div ref={mesajSonuRef} />
                </div>
                <div style={{ padding: 15, borderTop: "1px solid #eee", display: "flex", gap: 10 }}>
                  <input value={yeniMesaj} onChange={(e) => setYeniMesaj(e.target.value)} placeholder="Yazın..." style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
                  <button onClick={mesajGonder} style={{ padding: "10px 20px", background: "#0f172a", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700 }}>Gönder</button>
                </div>
              </div>
            </div>
          )}

          {(aktifTab === "ai_ilan_bireysel" || aktifTab === "ai_ilan_ticari") && isAdmin && (
            <AIPanel tip={aktifTab === "ai_ilan_bireysel" ? "bireysel" : "ticari"} />
          )}

        </main>
      </div>
    </div>
  );
}

function AIPanel({ tip }: { tip: Tip }) {
  const [loading, setLoading] = useState(false);
  const [adet, setAdet] = useState(1);
  const [log, setLog] = useState<string[]>([]);

  const aiUret = async () => {
    setLoading(true);
    setLog(p => [`🚀 ${tip} üretimi başladı...`, ...p]);
    try {
      const res = await fetch("/api/admin/ai-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip, adet })
      });
      const data = await res.json();
      setLog(p => [`✅ ${data.count} ilan oluşturuldu.`, ...p]);
    } catch { setLog(p => ["❌ Hata oluştu.", ...p]); }
    setLoading(false);
  };

  return (
    <div className="card" style={{ border: "2px solid #7c3aed" }}>
      <h2 style={{ color: "#7c3aed" }}>🤖 Nexus AI Evolution Engine</h2>
      <div style={{ display: "flex", gap: 10, margin: "20px 0" }}>
        <input type="number" value={adet} onChange={e => setAdet(Number(e.target.value))} style={{ padding: 10, width: 80 }} />
        <button onClick={aiUret} disabled={loading} style={{ flex: 1, background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, fontWeight: 800 }}>{loading ? "Üretiliyor..." : "İlan Üret"}</button>
      </div>
      <div style={{ background: "#1e1e2e", color: "#a6accd", padding: 15, borderRadius: 10, height: 150, overflowY: "auto", fontSize: 11, fontFamily: "monospace" }}>
        {log.map((l, i) => <div key={i}>{`> ${l}`}</div>)}
      </div>
    </div>
  );
}

export default function PanelPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <PanelIcerik />
    </Suspense>
  );
}
