"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface Mesaj {
  _id: string;
  gonderen: { ad: string; email: string };
  alici: { ad: string; email: string };
  mesaj: string;
  ilanId?: string;
  ilanBaslik?: string;
  okundu: boolean;
  createdAt: string;
}

interface Konusma {
  kisiEmail: string;
  kisiAd: string;
  ilanBaslik?: string;
  ilanId?: string;
  sonMesaj: string;
  sonTarih: string;
  okunmamis: number;
  mesajlar: Mesaj[];
}

export default function MesajlarPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [konusmalar, setKonusmalar] = useState<Konusma[]>([]);
  const [secili, setSecili] = useState<Konusma | null>(null);
  const [yeniMesaj, setYeniMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const mesajSonuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/giris");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") yukle();
  }, [status]);

  useEffect(() => {
    mesajSonuRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [secili?.mesajlar]);

  const yukle = async () => {
    setYukleniyor(true);
    try {
      const res = await fetch("/api/mesajlar");
      if (res.ok) {
        const data = await res.json();
        const liste: Mesaj[] = Array.isArray(data) ? data : data.mesajlar || [];
        // Konuşmalara grupla
        const map = new Map<string, Konusma>();
        liste.forEach(m => {
          const benimEmail = session?.user?.email;
          const kisiEmail = m.gonderen.email === benimEmail ? m.alici.email : m.gonderen.email;
          const kisiAd = m.gonderen.email === benimEmail ? m.alici.ad : m.gonderen.ad;
          const key = `${kisiEmail}_${m.ilanId || "genel"}`;
          if (!map.has(key)) {
            map.set(key, {
              kisiEmail, kisiAd,
              ilanBaslik: m.ilanBaslik,
              ilanId: m.ilanId,
              sonMesaj: m.mesaj,
              sonTarih: m.createdAt,
              okunmamis: 0,
              mesajlar: [],
            });
          }
          const k = map.get(key)!;
          k.mesajlar.push(m);
          if (new Date(m.createdAt) > new Date(k.sonTarih)) {
            k.sonMesaj = m.mesaj;
            k.sonTarih = m.createdAt;
          }
          if (!m.okundu && m.alici.email === benimEmail) k.okunmamis++;
        });
        setKonusmalar(Array.from(map.values()).sort((a, b) =>
          new Date(b.sonTarih).getTime() - new Date(a.sonTarih).getTime()
        ));
      }
    } catch {}
    setYukleniyor(false);
  };

  const gonder = async () => {
    if (!yeniMesaj.trim() || !secili || gonderiliyor) return;
    setGonderiliyor(true);
    try {
      const res = await fetch("/api/mesajlar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aliciEmail: secili.kisiEmail,
          mesaj: yeniMesaj,
          ilanId: secili.ilanId,
        }),
      });
      if (res.ok) {
        setYeniMesaj("");
        await yukle();
      }
    } catch {}
    setGonderiliyor(false);
  };

  const tarihFormat = (d: string) => {
    const tarih = new Date(d);
    const simdi = new Date();
    const fark = simdi.getTime() - tarih.getTime();
    if (fark < 60000) return "az önce";
    if (fark < 3600000) return `${Math.floor(fark / 60000)} dk`;
    if (fark < 86400000) return tarih.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
    return tarih.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
  };

  if (status === "loading" || yukleniyor) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>💬</div>
          <p style={{ color: "#64748b", fontWeight: 600 }}>Mesajlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* NAVBAR */}
      <nav style={{ background: "#0d1b3e", padding: "0 16px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => secili ? setSecili(null) : router.back()}
            style={{ background: "none", border: "none", color: "#fff", fontSize: "1.2rem", cursor: "pointer", padding: 4 }}>
            ←
          </button>
          {secili ? (
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: ".95rem" }}>{secili.kisiAd}</div>
              {secili.ilanBaslik && <div style={{ color: "rgba(255,255,255,.6)", fontSize: ".72rem" }}>📋 {secili.ilanBaslik}</div>}
            </div>
          ) : (
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>💬 Mesajlarım</span>
          )}
        </div>
        {secili && (
          <button onClick={() => router.push(`/ilan/${secili.ilanId}`)}
            style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", padding: "6px 12px", borderRadius: 20, fontSize: ".75rem", fontWeight: 700, cursor: "pointer" }}>
            İlanı Gör
          </button>
        )}
      </nav>

      {/* ANA ALAN */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
        {/* KONUŞMA LİSTESİ */}
        {!secili && (
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
            {konusmalar.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 24px" }}>
                <div style={{ fontSize: "4rem", marginBottom: 12 }}>📭</div>
                <p style={{ fontWeight: 800, color: "#0f172a", fontSize: "1.1rem", marginBottom: 6 }}>Henüz mesajınız yok</p>
                <p style={{ color: "#64748b", fontSize: ".9rem", marginBottom: 20 }}>İlan sahipleriyle iletişime geçin</p>
                <button onClick={() => router.push("/ilanlar")}
                  style={{ background: "#e8361a", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 12, fontWeight: 700, cursor: "pointer", fontSize: ".9rem" }}>
                  İlanları Keşfet
                </button>
              </div>
            ) : (
              konusmalar.map((k, i) => (
                <div key={i} onClick={() => setSecili(k)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid #f1f5f9", cursor: "pointer", background: "#fff", transition: ".15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                >
                  {/* Avatar */}
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #1e3a8a, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "1.1rem", flexShrink: 0 }}>
                    {k.kisiAd?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <span style={{ fontWeight: 700, color: "#0f172a", fontSize: ".95rem" }}>{k.kisiAd}</span>
                      <span style={{ fontSize: ".72rem", color: "#94a3b8" }}>{tarihFormat(k.sonTarih)}</span>
                    </div>
                    {k.ilanBaslik && (
                      <div style={{ fontSize: ".72rem", color: "#2563eb", fontWeight: 600, marginBottom: 2 }}>📋 {k.ilanBaslik}</div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: ".82rem", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                        {k.sonMesaj}
                      </span>
                      {k.okunmamis > 0 && (
                        <span style={{ background: "#e8361a", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".65rem", fontWeight: 800, flexShrink: 0, marginLeft: 8 }}>
                          {k.okunmamis}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* SOHBET EKRANI */}
        {secili && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Mesajlar */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 8, background: "#efeae2" }}>
              {secili.mesajlar
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                .map((m, i) => {
                  const benden = m.gonderen.email === session?.user?.email;
                  return (
                    <div key={i} style={{ display: "flex", justifyContent: benden ? "flex-end" : "flex-start" }}>
                      <div style={{
                        maxWidth: "75%", padding: "10px 14px", borderRadius: benden ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                        background: benden ? "#dcf8c6" : "#fff",
                        boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                      }}>
                        {!benden && (
                          <div style={{ fontSize: ".7rem", fontWeight: 700, color: "#2563eb", marginBottom: 4 }}>{m.gonderen.ad}</div>
                        )}
                        <p style={{ fontSize: ".9rem", color: "#0f172a", lineHeight: 1.5, margin: 0 }}>{m.mesaj}</p>
                        <div style={{ fontSize: ".65rem", color: "#94a3b8", marginTop: 4, textAlign: "right" }}>
                          {tarihFormat(m.createdAt)} {benden && (m.okundu ? "✓✓" : "✓")}
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div ref={mesajSonuRef} />
            </div>

            {/* Mesaj yazma */}
            <div style={{ padding: "12px 16px", background: "#f0f2f5", display: "flex", gap: 10, alignItems: "flex-end", flexShrink: 0 }}>
              <textarea
                value={yeniMesaj}
                onChange={e => setYeniMesaj(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); gonder(); } }}
                placeholder="Mesaj yazın..."
                rows={1}
                style={{
                  flex: 1, padding: "12px 16px", borderRadius: 24, border: "none", outline: "none",
                  fontFamily: "inherit", fontSize: ".9rem", resize: "none", background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,.1)", maxHeight: 120, overflowY: "auto",
                }}
              />
              <button onClick={gonder} disabled={!yeniMesaj.trim() || gonderiliyor}
                style={{
                  width: 44, height: 44, borderRadius: "50%", background: gonderiliyor || !yeniMesaj.trim() ? "#94a3b8" : "#0d1b3e",
                  border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem", flexShrink: 0, transition: ".2s",
                }}>
                {gonderiliyor ? "⏳" : "➤"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ALT MENÜ */}
      <nav style={{ background: "#0d1b3e", height: 64, display: "flex", alignItems: "stretch", borderTop: "1px solid rgba(255,255,255,.08)" }}>
        {[
          { icon: "🏠", label: "Ana Sayfa", href: "/" },
          { icon: "🔍", label: "Keşfet", href: "/ilanlar" },
          { icon: "➕", label: "İlan Ver", href: "/ilan-ver", primary: true },
          { icon: "💬", label: "Mesajlar", href: "/mesajlar", active: true },
          { icon: "👤", label: "Profilim", href: "/panel" },
        ].map(item => (
          <button key={item.href} onClick={() => router.push(item.href)}
            style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 3, border: "none", cursor: "pointer", fontSize: ".62rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: ".03em", transition: ".18s", padding: 0,
              background: item.primary ? "#e8361a" : "transparent",
              color: item.active ? "#f5a623" : item.primary ? "#fff" : "rgba(255,255,255,.5)",
              margin: item.primary ? "8px 6px" : 0,
              borderRadius: item.primary ? 12 : 0,
              height: item.primary ? "calc(100% - 16px)" : "auto",
            }}>
            <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
