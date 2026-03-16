"use client";

import { useState, useEffect, useCallback, Suspense, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { TUM_SEKTORLER } from "@/lib/sektorler";

// --- Dinamik Bileşenler (Sadece tıklandığında yüklenir, Performans için kritik) ---
const AiIlanBileseni = dynamic(() => import("@/components/panel/Admin/AiIlanMotoru").catch(() => AiIlanBileseniYedek), {
  loading: () => <div className="p-10 animate-pulse bg-gray-50 rounded-xl">AI Motoru Hazırlanıyor...</div>,
  ssr: false
});

// --- Sabitler & Stiller ---
const SEHIRLER = ['Rastgele','İstanbul','Ankara','İzmir','Bursa','Antalya','Adana','Konya','Gaziantep','Mersin','Kayseri','Trabzon','Denizli'];
const ULKELER  = ['Türkiye','Almanya','ABD','İngiltere','Fransa','Hollanda','BAE','Suudi Arabistan','Mısır','Nijerya','Hindistan','Rastgele'];

const DURUM_STIL: Record<string, { bg: string; c: string }> = {
  aktif:          { bg: "#ecfdf5", c: "#059669" },
  bekliyor:       { bg: "#fffbeb", c: "#d97706" },
  kabul_edildi:   { bg: "#eff6ff", c: "#2563eb" },
  reddedildi:     { bg: "#fef2f2", c: "#dc2626" },
  tamamlandi:     { bg: "#f0fdf4", c: "#16a34a" },
  iptal:          { bg: "#fef2f2", c: "#dc2626" },
  on_rezervasyon: { bg: "#eff6ff", c: "#2563eb" },
};

const BTN_SM = (bg: string, c: string) => ({
  padding: "6px 12px",
  borderRadius: "8px",
  background: bg,
  border: "none",
  color: c,
  fontSize: "11px",
  fontWeight: 700,
  cursor: "pointer",
});

// --- Alt Bileşenler ---
function PanelIcerik() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isAdmin = session?.user?.email === 'nefesercan@gmail.com';

  const [aktifTab, setAktifTab] = useState<string>(searchParams.get("tab") || "ozet");
  const [tip, setTip] = useState<"bireysel" | "ticari">("ticari");
  const [rol, setRol] = useState<"alan" | "veren">("alan");

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
  const [stats, setStats] = useState({ aktifIlan: 0, bekleyenTeklif: 0, gelenTeklif: 0, okunmamisBildirim: 0, toplamSiparis: 0 });
  const mesajSonuRef = useRef<HTMLDivElement>(null);

  const yukle = useCallback(async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const ilanApiUrl = isAdmin ? "/api/ilanlar?limit=50" : "/api/ilanlar?kendi=true";
      const [ilanRes, teklifRes, gelenRes, sipRes, bilRes, konRes] = await Promise.all([
        fetch(ilanApiUrl), fetch("/api/teklifler?kendi=true"), fetch("/api/teklifler"),
        fetch("/api/rezervasyonlar"), fetch("/api/bildirimler"), fetch("/api/mesajlar")
      ]);

      const [ilanD, teklifD, gelenD, sipD, bilD, konD] = await Promise.all([
        ilanRes.json(), teklifRes.json(), gelenRes.json(), sipRes.json(), bilRes.json(), konRes.json()
      ]);

      setIlanlar(Array.isArray(ilanD) ? ilanD : (ilanD.data || []));
      setTeklifler(Array.isArray(teklifD) ? teklifD : []);
      setGelenTeklifler(Array.isArray(gelenD) ? gelenD : []);
      setSiparisler(Array.isArray(sipD) ? sipD : []);
      setBildirimler(Array.isArray(bilD) ? bilD : []);
      setKonusmalar(Array.isArray(konD) ? konD : []);

      setStats({
        aktifIlan: (Array.isArray(ilanD) ? ilanD : []).length,
        bekleyenTeklif: (Array.isArray(teklifD) ? teklifD : []).length,
        gelenTeklif: (Array.isArray(gelenD) ? gelenD : []).length,
        okunmamisBildirim: (Array.isArray(bilD) ? bilD : []).filter((b: any) => !b.okundu).length,
        toplamSiparis: (Array.isArray(sipD) ? sipD : []).length,
      });
    } catch (e) { console.error("Yükleme hatası:", e); }
    setLoading(false);
  }, [session, isAdmin]);

  useEffect(() => { if (session) yukle(); }, [session, yukle]);

  // Yardımcı Fonksiyonlar
  const formatTarih = (t: any) => t ? new Date(t).toLocaleDateString("tr-TR") : "—";
  const formatSayi = (s: any) => Number(s || 0).toLocaleString("tr-TR");

  if (status === "loading") return <div className="p-20 text-center font-bold text-slate-500">Sistem Yükleniyor...</div>;
  if (!session) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .panel-container { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
        .sidebar { background: #fff; border-right: 1px solid #e2e8f0; padding: 20px; position: sticky; top: 0; height: 100vh; }
        .tab-btn { width: 100%; display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: 12px; border: none; background: none; color: #64748b; cursor: pointer; font-weight: 600; margin-bottom: 4px; transition: 0.2s; }
        .tab-btn.active { background: #0f172a; color: #fff; }
        .tab-btn:hover:not(.active) { background: #f1f5f9; }
        .content { padding: 40px; max-width: 1100px; }
        .stat-card { background: #fff; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; text-align: center; }
        @media (max-width: 900px) {
          .panel-container { grid-template-columns: 1fr; }
          .sidebar { height: auto; position: relative; border-right: none; border-bottom: 1px solid #e2e8f0; }
          .tab-list { display: flex; overflow-x: auto; gap: 10px; padding-bottom: 10px; }
          .tab-btn { white-space: nowrap; width: auto; }
        }
      `}} />

      <div className="panel-container">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>SwapHubs</h2>
            <p style={{ fontSize: 12, color: "#94a3b8" }}>{session.user?.email}</p>
          </div>

          <nav className="tab-list">
            <button onClick={() => setAktifTab("ozet")} className={`tab-btn ${aktifTab === "ozet" ? "active" : ""}`}>📊 Özet</button>
            <button onClick={() => setAktifTab("ilanlarim")} className={`tab-btn ${aktifTab === "ilanlarim" ? "active" : ""}`}>📋 İlanlarım</button>
            <button onClick={() => setAktifTab("mesajlar")} className={`tab-btn ${aktifTab === "mesajlar" ? "active" : ""}`}>💬 Mesajlar {stats.okunmamisBildirim > 0 && "🔴"}</button>
            <button onClick={() => setAktifTab("ayarlar")} className={`tab-btn ${aktifTab === "ayarlar" ? "active" : ""}`}>⚙️ Ayarlar</button>
            
            {isAdmin && (
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
                <p style={{ fontSize: 10, fontWeight: 800, color: "#cbd5e1", marginBottom: 10 }}>ADMIN ENGINE</p>
                <button onClick={() => setAktifTab("ai_b2b")} className={`tab-btn ${aktifTab === "ai_b2b" ? "active" : ""}`} style={{ color: "#7c3aed" }}>🏭 AI B2B Motoru</button>
              </div>
            )}
          </nav>

          <button onClick={() => signOut()} style={{ marginTop: "auto", width: "100%", padding: 12, borderRadius: 12, border: "1px solid #fee2e2", color: "#ef4444", background: "#fff", cursor: "pointer", fontWeight: 700 }}>Çıkış Yap</button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="content">
          <Suspense fallback={<div>Yükleniyor...</div>}>
            {aktifTab === "ozet" && (
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>Merhaba, {session.user?.name?.split(" ")[0]}!</h1>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 40 }}>
                  <div className="stat-card">
                    <p style={{ color: "#64748b", fontSize: 12 }}>Aktif İlan</p>
                    <p style={{ fontSize: 32, fontWeight: 800, color: "#2563eb" }}>{stats.aktifIlan}</p>
                  </div>
                  <div className="stat-card">
                    <p style={{ color: "#64748b", fontSize: 12 }}>Gelen Teklif</p>
                    <p style={{ fontSize: 32, fontWeight: 800, color: "#059669" }}>{stats.gelenTeklif}</p>
                  </div>
                </div>

                <h3 style={{ marginBottom: 15 }}>Son İlanlar</h3>
                {ilanlar.slice(0, 5).map(i => (
                  <div key={i._id} style={{ background: "#fff", padding: 15, borderRadius: 12, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #e2e8f0" }}>
                    <div>
                      <p style={{ fontWeight: 700 }}>{i.baslik}</p>
                      <p style={{ fontSize: 12, color: "#94a3b8" }}>{formatTarih(i.createdAt)} • {i.teklifSayisi || 0} Teklif</p>
                    </div>
                    <span style={{ ...DURUM_STIL[i.durum], padding: "4px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{i.durum}</span>
                  </div>
                ))}
              </div>
            )}

            {aktifTab === "ai_b2b" && isAdmin && (
              <AiIlanBileseni 
                tip="ticari" 
                sektorler={TUM_SEKTORLER} 
                adminKey={process.env.NEXT_PUBLIC_ADMIN_KEY || ""} 
                onSuccess={yukle} 
              />
            )}

            {/* Diğer tab içerikleri buraya gelecek... */}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

// Yedek AI Bileşeni (Hata durumunda)
function AiIlanBileseniYedek() {
  return <div className="p-10 bg-red-50 text-red-500 rounded-xl">AI Bileşeni yüklenemedi. Lütfen components klasörünü kontrol edin.</div>;
}

export default function PanelPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Panel Hazırlanıyor...</div>}>
      <PanelIcerik />
    </Suspense>
  );
}
