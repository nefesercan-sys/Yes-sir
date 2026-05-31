"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Ilan {
  _id: string;
  baslik: string;
  aciklama?: string;
  sektorId?: string;
  kategori?: string;
  tip: "bireysel" | "ticari";
  rol: "alan" | "veren";
  ulke?: string;
  sehir?: string;
  butceMin?: number;
  butceMax?: number;
  butceBirimi?: string;
  resimUrl?: string;
  medyalar?: string[];
  createdAt: string;
  teklifSayisi?: number;
  goruntulenme?: number;
  kullanici?: {
    _id: string;
    ad?: string;
    isim?: string;
    email?: string;
    avatarUrl?: string;
  };
}

export default function IlanDetayPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [ilan, setIlan] = useState<Ilan | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(false);
  const [aktifGorsel, setAktifGorsel] = useState(0);

  useEffect(() => {
    if (!id) return;
    const fetchIlan = async () => {
      try {
        const res = await fetch(`/api/ilanlar/${id}`);
        if (!res.ok) throw new Error("Bulunamadı");
        const data = await res.json();
        setIlan(data.ilan || data);
      } catch {
        setHata(true);
      }
      setYukleniyor(false);
    };
    fetchIlan();
  }, [id]);

  const fmt = (n: number) => new Intl.NumberFormat("tr-TR").format(n || 0);
  const gorseller = ilan ? [ilan.resimUrl, ...(ilan.medyalar || [])].filter(Boolean) as string[] : [];

  if (yukleniyor) return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
        <p style={{ color: "#64748b" }}>Yükleniyor...</p>
      </div>
    </div>
  );

  if (hata || !ilan) return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>😕</div>
        <p style={{ color: "#0f172a", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>İlan bulunamadı</p>
        <p style={{ color: "#64748b", marginBottom: 20 }}>Bu ilan kaldırılmış veya mevcut değil.</p>
        <button onClick={() => router.push("/ilanlar")}
          style={{ background: "#2563eb", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 10, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 700 }}>
          İlanlara Dön
        </button>
      </div>
    </div>
  );

  const whatsappMsg = `Merhaba, SwapHubs'ta "${ilan.baslik}" ilanınızı gördüm, bilgi almak istiyorum.`;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Unbounded:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "#0f172a", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={() => router.back()}
          style={{ background: "rgba(255,255,255,.1)", border: "none", color: "#fff", padding: "7px 14px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>
          ← Geri
        </button>
        <span style={{ color: "#fff", fontSize: 14, fontWeight: 700, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {ilan.baslik}
        </span>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 16px 80px" }}>

        {/* GÖRSELLER */}
        {gorseller.length > 0 ? (
          <div style={{ marginBottom: 20 }}>
            <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "16/9", background: "#e2e8f0" }}>
              <img
                src={gorseller[aktifGorsel]}
                alt={ilan.baslik}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            {gorseller.length > 1 && (
              <div style={{ display: "flex", gap: 8, marginTop: 10, overflowX: "auto" }}>
                {gorseller.map((g, i) => (
                  <div key={i} onClick={() => setAktifGorsel(i)}
                    style={{ width: 64, height: 64, borderRadius: 10, overflow: "hidden", flexShrink: 0, border: `2px solid ${i === aktifGorsel ? "#2563eb" : "#e2e8f0"}`, cursor: "pointer" }}>
                    <img src={g} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ borderRadius: 16, background: "linear-gradient(135deg,#e2e8f0,#f1f5f9)", height: 200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60, marginBottom: 20 }}>
            {ilan.sektorId === "giyim" ? "👗" : ilan.tip === "ticari" ? "🏭" : "📋"}
          </div>
        )}

        {/* BAŞLIK & BADGE */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20, marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 8,
              background: ilan.tip === "ticari" ? "#fef3c7" : "#dbeafe",
              color: ilan.tip === "ticari" ? "#92400e" : "#1e40af" }}>
              {ilan.tip === "ticari" ? "🏭 TİCARİ" : "👤 BİREYSEL"}
            </span>
            <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 8,
              background: ilan.rol === "alan" ? "#f0fdf4" : "#fff1f2",
              color: ilan.rol === "alan" ? "#166534" : "#be123c" }}>
              {ilan.rol === "alan" ? "🛒 TALEP" : "💼 HİZMET"}
            </span>
            {ilan.kategori && (
              <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: "#f1f5f9", color: "#2563eb" }}>
                {ilan.kategori}
              </span>
            )}
          </div>

          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", lineHeight: 1.3, marginBottom: 14 }}>
            {ilan.baslik}
          </h1>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, color: "#64748b" }}>
            <span>📍 {ilan.sehir || ilan.ulke || "Global"}</span>
            <span>📅 {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}</span>
            {ilan.goruntulenme ? <span>👁 {fmt(ilan.goruntulenme)} görüntülenme</span> : null}
            {ilan.teklifSayisi ? <span>📨 {ilan.teklifSayisi} teklif</span> : null}
          </div>
        </div>

        {/* BÜTÇE */}
        {(ilan.butceMin || ilan.butceMax) ? (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>Bütçe</span>
            <span style={{ fontFamily: "Unbounded, sans-serif", fontWeight: 800, fontSize: 22, color: "#10b981" }}>
              {ilan.butceMin && ilan.butceMax
                ? `${fmt(ilan.butceMin)} – ${fmt(ilan.butceMax)} ${ilan.butceBirimi || "₺"}`
                : `${fmt(ilan.butceMin || ilan.butceMax || 0)} ${ilan.butceBirimi || "₺"}`}
            </span>
          </div>
        ) : null}

        {/* AÇIKLAMA */}
        {ilan.aciklama && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20, marginBottom: 14 }}>
            <h2 style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>📝 Açıklama</h2>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{ilan.aciklama}</p>
          </div>
        )}

        {/* İLAN SAHİBİ */}
        {ilan.kullanici && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20, marginBottom: 14, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontWeight: 800, flexShrink: 0 }}>
              {ilan.kullanici.avatarUrl
                ? <img src={ilan.kullanici.avatarUrl} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                : (ilan.kullanici.ad || ilan.kullanici.isim || "?")[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{ilan.kullanici.ad || ilan.kullanici.isim || "Kullanıcı"}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>İlan Sahibi</div>
            </div>
          </div>
        )}

      </div>

      {/* STICKY ALT BUTON */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 16px 24px", background: "linear-gradient(to top, #fff 60%, transparent)", zIndex: 50 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", gap: 10 }}>
          <button
            onClick={() => router.push(`/teklif-ver?ilanId=${ilan._id}`)}
            style={{ flex: 1, background: ilan.rol === "alan" ? "#e8361a" : "#0f172a", color: "#fff", border: "none", padding: 14, borderRadius: 14, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
            {ilan.rol === "alan" ? "📨 Teklif Ver" : "💬 İletişime Geç"}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank" rel="noreferrer"
            style={{ background: "#25d366", color: "#fff", border: "none", padding: "14px 18px", borderRadius: 14, fontSize: 18, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
            📲
          </a>
        </div>
      </div>

    </div>
  );
}
