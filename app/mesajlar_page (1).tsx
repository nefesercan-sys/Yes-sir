"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface Konusma {
  _id: string;
  karsiTaraf: string;
  ilanId: string;
  ilanBaslik: string;
  sonMesaj: string;
  okunmamis: number;
  createdAt: string;
}

interface MesajDetay {
  _id: string;
  gonderen: string;
  alici: string;
  mesaj: string;
  okundu: boolean;
  createdAt: string;
}

export default function MesajlarPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [konusmalar, setKonusmalar] = useState<Konusma[]>([]);
  const [secili, setSecili] = useState<Konusma | null>(null);
  const [mesajlar, setMesajlar] = useState<MesajDetay[]>([]);
  const [yeniMesaj, setYeniMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const sonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/giris");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") yukle();
  }, [status]);

  useEffect(() => {
    sonRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mesajlar]);

  const yukle = async () => {
    setYukleniyor(true);
    try {
      const res = await fetch("/api/mesajlar");
      if (res.ok) {
        const data = await res.json();
        setKonusmalar(Array.isArray(data) ? data : []);
      }
    } catch {}
    setYukleniyor(false);
  };

  const konusmaAc = async (k: Konusma) => {
    setSecili(k);
    try {
      const res = await fetch(`/api/mesajlar?ilanId=${k.ilanId}&karsiTaraf=${k.karsiTaraf}`);
      if (res.ok) {
        const data = await res.json();
        setMesajlar(Array.isArray(data) ? data : data.mesajlar || []);
      }
    } catch {}
  };

  const gonder = async () => {
    if (!yeniMesaj.trim() || !secili || gonderiliyor) return;
    setGonderiliyor(true);
    try {
      const res = await fetch("/api/mesajlar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alici: secili.karsiTaraf,
          mesaj: yeniMesaj,
          ilanId: secili.ilanId,
        }),
      });
      if (res.ok) {
        setYeniMesaj("");
        konusmaAc(secili);
      }
    } catch {}
    setGonderiliyor(false);
  };

  const tarih = (d: string) => {
    const t = new Date(d);
    const fark = Date.now() - t.getTime();
    if (fark < 60000) return "az önce";
    if (fark < 3600000) return `${Math.floor(fark / 60000)} dk`;
    if (fark < 86400000) return t.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
    return t.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
  };

  if (status === "loading" || yukleniyor) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>💬</div>
          <p style={{ color: "#64748b", fontWeight: 600 }}>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* NAVBAR */}
      <nav style={{ background: "#0d1b3e", padding: "0 16px", height: 56, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={() => secili ? setSecili(null) : router.back()}
          style={{ background: "none", border: "none", color: "#fff", fontSize: "1.3rem", cursor: "pointer", padding: 4 }}>
          ←
        </button>
        {secili ? (
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: ".95rem" }}>{secili.karsiTaraf}</div>
            <div style={{ color: "rgba(255,255,255,.6)", fontSize: ".72rem" }}>📋 {secili.ilanBaslik}</div>
          </div>
        ) : (
          <span style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>💬 Mesajlarım</span>
        )}
      </nav>

      {/* KONUŞMA LİSTESİ */}
      {!secili && (
        <div style={{ flex: 1, overflowY: "auto" }}>
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
            konusmalar.map((k) => (
              <div key={k._id} onClick={() => konusmaAc(k)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid #f1f5f9", cursor: "pointer", background: "#fff" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #1e3a8a, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "1.1rem", flexShrink: 0 }}>
                  {k.karsiTaraf?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontWeight: 700, color: "#0f172a", fontSize: ".9rem" }}>{k.karsiTaraf}</span>
                    <span style={{ fontSize: ".72rem", color: "#94a3b8" }}>{tarih(k.createdAt)}</span>
                  </div>
                  <div style={{ fontSize: ".72rem", color: "#2563eb", fontWeight: 600, marginBottom: 2 }}>📋 {k.ilanBaslik}</div>
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
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 8, background: "#efeae2" }}>
            {mesajlar.length === 0 && (
              <p style={{ textAlign: "center", color: "#94a3b8", fontSize: ".85rem", padding: "20px 0" }}>Henüz mesaj yok</p>
            )}
            {mesajlar.map((m, i) => {
              const benden = m.gonderen === session?.user?.email;
              return (
                <div key={i} style={{ display: "flex", justifyContent: benden ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "75%", padding: "10px 14px",
                    borderRadius: benden ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: benden ? "#dcf8c6" : "#fff",
                    boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                  }}>
                    <p style={{ fontSize: ".9rem", color: "#0f172a", lineHeight: 1.5, margin: 0 }}>{m.mesaj}</p>
                    <div style={{ fontSize: ".65rem", color: "#94a3b8", marginTop: 4, textAlign: "right" }}>
                      {tarih(m.createdAt)} {benden && (m.okundu ? "✓✓" : "✓")}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={sonRef} />
          </div>

          <div style={{ padding: "12px 16px", background: "#f0f2f5", display: "flex", gap: 10, alignItems: "flex-end", flexShrink: 0 }}>
            <textarea
              value={yeniMesaj}
              onChange={e => setYeniMesaj(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); gonder(); } }}
              placeholder="Mesaj yazın..."
              rows={1}
              style={{ flex: 1, padding: "12px 16px", borderRadius: 24, border: "none", outline: "none", fontFamily: "inherit", fontSize: ".9rem", resize: "none", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.1)" }}
            />
            <button onClick={gonder} disabled={!yeniMesaj.trim() || gonderiliyor}
              style={{ width: 44, height: 44, borderRadius: "50%", background: !yeniMesaj.trim() ? "#94a3b8" : "#0d1b3e", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
              {gonderiliyor ? "⏳" : "➤"}
            </button>
          </div>
        </div>
      )}

      {/* ALT MENÜ */}
      <nav style={{ background: "#0d1b3e", height: 64, display: "flex", alignItems: "stretch", borderTop: "1px solid rgba(255,255,255,.08)", flexShrink: 0 }}>
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
              textTransform: "uppercase", padding: 0, transition: ".18s",
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
