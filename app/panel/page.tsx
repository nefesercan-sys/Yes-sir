"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

// --- YARDIMCI STİL FONKSİYONU ---
const BTN_SM = (bg: string, c: string) => ({
  padding: "6px 12px", borderRadius: "8px", background: bg, border: "none",
  color: c, fontFamily: "inherit", fontSize: "11px", fontWeight: 700, cursor: "pointer", transition: "all 0.15s"
});

const DURUM_STIL: Record<string, { bg: string; c: string }> = {
  aktif: { bg: "#ecfdf5", c: "#059669" },
  bekliyor: { bg: "#fffbeb", c: "#d97706" },
  kabul_edildi: { bg: "#eff6ff", c: "#2563eb" },
  reddedildi: { bg: "#fef2f2", c: "#dc2626" },
  tamamlandi: { bg: "#f0fdf4", c: "#16a34a" }
};

type Tab = "ozet" | "ilanlarim" | "tekliflerim" | "gelenTeklifler" | "siparisler" | "mesajlar" | "bildirimler";

export default function MemberPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [aktifTab, setAktifTab] = useState<Tab>((searchParams.get("tab") as Tab) || "ozet");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ ilanlar: [], teklifler: [], gelenTeklifler: [], siparisler: [], bildirimler: [] });
  const [stats, setStats] = useState({ aktifIlan: 0, gelenTeklif: 0, bekleyenTeklif: 0, bildirim: 0, siparis: 0 });

  // ADMIN KONTROLÜ
  const isAdmin = session?.user?.email === 'nefesercan@gmail.com';

  // 📊 VERİLERİ VE SAYILARI GÜNCELLEME FONKSİYONU
  const yukle = useCallback(async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const [iRes, tRes, gRes, sRes, bRes] = await Promise.all([
        fetch("/api/ilanlar?kendi=true"),
        fetch("/api/teklifler?kendi=true"),
        fetch("/api/teklifler"),
        fetch("/api/rezervasyonlar"),
        fetch("/api/bildirimler")
      ]);

      const [i, t, g, s, b] = await Promise.all([
        iRes.json(), tRes.json(), gRes.json(), sRes.json(), bRes.json()
      ]);

      setData({ ilanlar: i, teklifler: t, gelenTeklifler: g, siparisler: s, bildirimler: b });
      
      // Sayıları Hesapla
      setStats({
        aktifIlan: (i || []).filter((x: any) => x.durum === "aktif").length,
        gelenTeklif: (g || []).filter((x: any) => x.durum === "bekliyor").length,
        bekleyenTeklif: (t || []).filter((x: any) => x.durum === "bekliyor").length,
        bildirim: (b || []).filter((x: any) => !x.okundu).length,
        siparis: (s || []).length
      });
    } catch (e) {
      console.error("Veri yükleme hatası:", e);
    }
    setLoading(false);
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") yukle();
  }, [status, yukle]);

  if (status === "loading") return <div className="loading-screen">Siber Kimlik Doğrulanıyor...</div>;
  if (!session) return null;

  return (
    <div className="panel-container">
      <style dangerouslySetInnerHTML={{ __html: `
        .panel-container { min-height: 100vh; background: #f8fafc; font-family: sans-serif; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .stat-card { background: #fff; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; text-align: center; }
        .stat-value { font-size: 28px; font-weight: 800; color: #0f172a; display: block; }
        .stat-label { font-size: 12px; color: #64748b; font-weight: 600; }
        .main-content { padding: 20px; max-width: 1200px; margin: 0 auto; }
        .row-item { background: #fff; padding: 15px; border-radius: 12px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; border: 1px solid #e2e8f0; }
        .badge { padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr 1fr; } }
      `}} />

      {/* ÜST BAR */}
      <header style={{ background: "#0f172a", color: "#fff", padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 800 }}>NEXUS PANEL</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => signOut()} style={BTN_SM("#ef4444", "#fff")}>Çıkış Yap</button>
        </div>
      </header>

      <main className="main-content">
        <h1 style={{ marginBottom: "20px", fontSize: "22px" }}>Hoş geldin, {session.user?.name} 👋</h1>

        {/* 📈 SAYILAR (İSTATİSTİKLER) */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{stats.aktifIlan}</span>
            <span className="stat-label">Aktif İlan</span>
          </div>
          <div className="stat-card">
            <span className="stat-value" style={{ color: "#f59e0b" }}>{stats.gelenTeklif}</span>
            <span className="stat-label">Gelen Teklif</span>
          </div>
          <div className="stat-card">
            <span className="stat-value" style={{ color: "#3b82f6" }}>{stats.siparis}</span>
            <span className="stat-label">Siparişler</span>
          </div>
          <div className="stat-card">
            <span className="stat-value" style={{ color: "#ef4444" }}>{stats.bildirim}</span>
            <span className="stat-label">Yeni Bildirim</span>
          </div>
        </div>

        {/* SEKME İÇERİĞİ */}
        <div className="content-area">
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", overflowX: "auto", paddingBottom: "10px" }}>
            {["ozet", "ilanlarim", "gelenTeklifler", "bildirimler"].map((t) => (
              <button 
                key={t} 
                onClick={() => setAktifTab(t as Tab)}
                style={BTN_SM(aktifTab === t ? "#0f172a" : "#fff", aktifTab === t ? "#fff" : "#0f172a")}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {loading ? <p>Veriler güncelleniyor...</p> : (
            <div className="list">
              {aktifTab === "ozet" && data.ilanlar.slice(0, 3).map((i: any) => (
                <div key={i._id} className="row-item">
                  <div>
                    <p style={{ fontWeight: 700 }}>{i.baslik}</p>
                    <small>{i.fiyat} {i.birim}</small>
                  </div>
                  <span className="badge" style={{ background: DURUM_STIL[i.durum]?.bg, color: DURUM_STIL[i.durum]?.c }}>
                    {i.durum}
                  </span>
                </div>
              ))}
              {data.ilanlar.length === 0 && <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>Henüz veri bulunamadı.</div>}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
