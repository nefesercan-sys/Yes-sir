"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

interface Ilan {
  id: string;
  baslik: string;
  aciklama: string;
  iletisim: string;
  adres?: string;
  sektorId: string;
  kategori: string;
  tip: "bireysel" | "ticari";
  rol: "alan" | "veren";
  ulke: string;
  sehir: string;
  butceMin: number;
  butceMax: number;
  butceBirimi: string;
  medyalar: string[];
  formData: Record<string, any>;
  olusturmaTarihi: string;
  kullanici?: { id: string; name: string; image?: string };
  kullaniciId?: string;
}

export default function IlanDetayPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const ilanId = params?.id as string;
  const yeniIlan = searchParams.get("yeni") === "1";

  const [ilan, setIlan] = useState<Ilan | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState("");
  const [aktifFoto, setAktifFoto] = useState(0);
  const [silOnay, setSilOnay] = useState(false);
  const [siliyor, setSiliyor] = useState(false);
  const [toast, setToast] = useState(yeniIlan ? "🎉 İlanınız başarıyla yayınlandı!" : "");

  useEffect(() => {
    if (!ilanId) return;
    (async () => {
      try {
        const res = await fetch(`/api/ilanlar/${ilanId}`);
        if (!res.ok) {
          setHata(res.status === 404 ? "İlan bulunamadı." : "İlan yüklenirken bir hata oluştu.");
        } else {
          setIlan(await res.json());
        }
      } catch {
        setHata("Bağlantı hatası. Lütfen sayfayı yenileyin.");
      }
      setYukleniyor(false);
    })();
  }, [ilanId]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSil = async () => {
    setSiliyor(true);
    try {
      const res = await fetch(`/api/ilanlar/${ilanId}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/profil?silindi=1");
      } else {
        const d = await res.json();
        setHata(d.error || "Silme başarısız.");
        setSilOnay(false);
      }
    } catch {
      setHata("Bağlantı hatası.");
      setSilOnay(false);
    }
    setSiliyor(false);
  };

  const handlePaylasim = () => {
    if (navigator.share) {
      navigator.share({ title: ilan?.baslik, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToast("🔗 Bağlantı kopyalandı!");
    }
  };

  const fiyatGoster = () => {
    if (!ilan) return null;
    const { butceMin: mn, butceMax: mx, butceBirimi: b } = ilan;
    const birim = b || "₺";
    if (!mn && !mx) return null;
    if (mn === mx) return `${mn.toLocaleString("tr-TR")} ${birim}`;
    if (!mn) return `${mx.toLocaleString("tr-TR")} ${birim}'e kadar`;
    if (!mx) return `${mn.toLocaleString("tr-TR")} ${birim}'den başlayan`;
    return `${mn.toLocaleString("tr-TR")} — ${mx.toLocaleString("tr-TR")} ${birim}`;
  };

  const tarihFmt = (iso: string) =>
    new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

  const sessionUserId = (session?.user as any)?.id as string | undefined;
const sessionEmail = session?.user?.email as string | undefined;
const sahipMi = !!(
  (sessionUserId && (ilan?.kullanici?.id === sessionUserId || ilan?.kullaniciId === sessionUserId)) ||
  (sessionEmail && ilan?.kullaniciId === sessionEmail)
);

  if (yukleniyor) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", gap: 14 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: 40, height: 40, border: "3px solid #e2e8f0", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
      <p style={{ color: "#64748b", fontSize: 14 }}>İlan yükleniyor...</p>
    </div>
  );

  if (!ilan && hata) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", gap: 16, padding: 24 }}>
      <p style={{ fontSize: 40 }}>😕</p>
      <p style={{ fontSize: 16, fontWeight: 700, color: "#dc2626", textAlign: "center" }}>{hata}</p>
      <button onClick={() => router.push("/")} style={{ padding: "10px 24px", borderRadius: 12, background: "#2563eb", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Ana Sayfaya Dön</button>
    </div>
  );
  if (!ilan) return null;

  const medyalar = ilan.medyalar || [];
  const fiyat = fiyatGoster();
  const SKIP_KEYS = ["ulke", "sehir", "baslik", "aciklama", "iletisim", "adres", "butceMin", "butceMax"];

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: 100 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Unbounded:wght@700;800&display=swap');
        *{box-sizing:border-box}
        @keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      <div style={{ background: "#0f172a", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,.3)" }}>
        <button onClick={() => router.back()} style={{ background: "rgba(255,255,255,.1)", border: "none", color: "#fff", width: 38, height: 38, borderRadius: 10, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>←</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "Unbounded, sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ilan.baslik}</h1>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 11, marginTop: 2 }}>{ilan.sehir}{ilan.ulke && ilan.ulke !== "Türkiye" ? `, ${ilan.ulke}` : ""} · {ilan.tip === "ticari" ? "Ticari" : "Bireysel"}</p>
        </div>
        <button onClick={handlePaylasim} style={{ background: "rgba(255,255,255,.1)", border: "none", color: "#fff", width: 38, height: 38, borderRadius: 10, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>🔗</button>
      </div>

      {(toast || hata) && (
        <div style={{ position: "fixed", top: 70, left: "50%", transform: "translateX(-50%)", zIndex: 200, background: hata && !toast ? "#dc2626" : "#166534", color: "#fff", padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700, boxShadow: "0 4px 20px rgba(0,0,0,.2)", animation: "fadeIn .2s ease", whiteSpace: "nowrap" }}>
          {toast || hata}
        </div>
      )}

      {medyalar.length > 0 ? (
        <div>
          <div style={{ position: "relative", background: "#0f172a", maxHeight: 340, overflow: "hidden" }}>
            {medyalar[aktifFoto]?.match(/\.(mp4|webm|ogg|mov)$/i)
              ? <video src={medyalar[aktifFoto]} controls style={{ width: "100%", maxHeight: 340, objectFit: "contain" }} />
              : <img src={medyalar[aktifFoto]} alt={ilan.baslik} style={{ width: "100%", maxHeight: 340, objectFit: "cover" }} />
            }
            {medyalar.length > 1 && (
              <>
                <button onClick={() => setAktifFoto(p => (p - 1 + medyalar.length) % medyalar.length)} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,.55)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
                <button onClick={() => setAktifFoto(p => (p + 1) % medyalar.length)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,.55)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
                <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,.6)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 8 }}>{aktifFoto + 1} / {medyalar.length}</div>
                <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
                  {medyalar.map((_, i) => <div key={i} onClick={() => setAktifFoto(i)} style={{ width: i === aktifFoto ? 20 : 6, height: 6, borderRadius: 3, background: i === aktifFoto ? "#f59e0b" : "rgba(255,255,255,.5)", cursor: "pointer", transition: "all .2s" }} />)}
                </div>
              </>
            )}
          </div>
          {medyalar.length > 1 && (
            <div style={{ display: "flex", gap: 6, padding: "8px 16px", overflowX: "auto", background: "#0f172a" }}>
              {medyalar.map((url, i) => (
                <div key={i} onClick={() => setAktifFoto(i)} style={{ width: 52, height: 52, borderRadius: 8, overflow: "hidden", border: `2px solid ${i === aktifFoto ? "#f59e0b" : "transparent"}`, cursor: "pointer", flexShrink: 0 }}>
                  {url.match(/\.(mp4|webm|ogg|mov)$/i)
                    ? <div style={{ width: "100%", height: "100%", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎥</div>
                    : <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  }
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ height: 200, background: "linear-gradient(135deg, #0f172a, #1e3a5f)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontSize: 48, opacity: .3 }}>🖼️</p>
        </div>
      )}

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "16px 16px" }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, background: ilan.tip === "ticari" ? "#fffbeb" : "#eff6ff", color: ilan.tip === "ticari" ? "#92400e" : "#1d4ed8", padding: "3px 9px", borderRadius: 6, border: `1px solid ${ilan.tip === "ticari" ? "#fde68a" : "#bfdbfe"}` }}>{ilan.tip === "ticari" ? "🏭 Ticari" : "👤 Bireysel"}</span>
            <span style={{ fontSize: 10, fontWeight: 700, background: ilan.rol === "alan" ? "#f0fdf4" : "#fff1f2", color: ilan.rol === "alan" ? "#166534" : "#9f1239", padding: "3px 9px", borderRadius: 6, border: `1px solid ${ilan.rol === "alan" ? "#bbf7d0" : "#fecdd3"}` }}>{ilan.rol === "alan" ? "🛒 Talep" : "💼 Hizmet Veren"}</span>
            <span style={{ fontSize: 10, fontWeight: 700, background: "#f8fafc", color: "#475569", padding: "3px 9px", borderRadius: 6, border: "1px solid #e2e8f0" }}>📂 {ilan.kategori}</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", fontFamily: "Unbounded, sans-serif", lineHeight: 1.3, marginBottom: 10 }}>{ilan.baslik}</h1>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "#64748b" }}>📍 {ilan.sehir}{ilan.ulke && ilan.ulke !== "Türkiye" ? `, ${ilan.ulke}` : ""}</span>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>·</span>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>📅 {tarihFmt(ilan.olusturmaTarihi)}</span>
          </div>
        </div>

        {fiyat && (
          <div style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)", borderRadius: 16, padding: "16px 20px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,.5)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>Fiyat</p>
              <p style={{ color: "#f59e0b", fontSize: 24, fontWeight: 800, fontFamily: "Unbounded, sans-serif" }}>{fiyat}</p>
            </div>
            <div style={{ fontSize: 32, opacity: .25 }}>💰</div>
          </div>
        )}

        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
          <h2 style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>📝 Açıklama</h2>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{ilan.aciklama}</p>
        </div>

        {ilan.formData && Object.entries(ilan.formData).filter(([k, v]) => !SKIP_KEYS.includes(k) && v).length > 0 && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
            <h2 style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>📋 Ek Bilgiler</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {Object.entries(ilan.formData).filter(([k, v]) => !SKIP_KEYS.includes(k) && v).map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", fontSize: 13, padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ color: "#64748b", fontWeight: 600, textTransform: "capitalize", flexShrink: 0, marginRight: 12 }}>{k.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}</span>
                  <span style={{ color: "#0f172a", fontWeight: 700, textAlign: "right" }}>{Array.isArray(v) ? v.join(", ") : String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
          <h2 style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>📍 Konum</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {ilan.sehir && <p style={{ fontSize: 14, color: "#374151" }}>🏙️ {ilan.sehir}</p>}
            {ilan.ulke && <p style={{ fontSize: 14, color: "#374151" }}>🌍 {ilan.ulke}</p>}
            {ilan.adres && <p style={{ fontSize: 13, color: "#64748b" }}>📌 {ilan.adres}</p>}
          </div>
        </div>

        {ilan.kullanici && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14, display: "flex", alignItems: "center", gap: 14 }}>
            {ilan.kullanici.image
              ? <img src={ilan.kullanici.image} alt={ilan.kullanici.name} style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0", flexShrink: 0 }} />
              : <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: 800, flexShrink: 0 }}>{ilan.kullanici.name?.[0]?.toUpperCase()}</div>
            }
            <div>
              <p style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>{ilan.kullanici.name}</p>
              <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>İlan sahibi</p>
            </div>
          </div>
        )}

        {sahipMi && (
          <div style={{ background: "#fffbeb", borderRadius: 16, border: "1.5px solid #fde68a", padding: 16, marginBottom: 14 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 12 }}>⚙️ İlan Yönetimi</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => router.push(`/ilan-duzenle/${ilanId}`)} style={{ flex: 1, padding: 12, borderRadius: 12, background: "#0f172a", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>✏️ Düzenle</button>
              <button onClick={() => setSilOnay(true)} style={{ flex: 1, padding: 12, borderRadius: 12, background: "#fef2f2", border: "1.5px solid #fecaca", color: "#dc2626", fontFamily: "inherit", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>🗑️ Sil</button>
            </div>
          </div>
        )}
      </div>

      {silOnay && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, width: "100%", maxWidth: 420, animation: "fadeIn .2s ease" }}>
            <p style={{ fontSize: 24, textAlign: "center", marginBottom: 8 }}>🗑️</p>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", textAlign: "center", marginBottom: 8, fontFamily: "Unbounded, sans-serif" }}>İlanı Sil?</h3>
            <p style={{ fontSize: 13, color: "#64748b", textAlign: "center", marginBottom: 20, lineHeight: 1.6 }}>Bu işlem geri alınamaz. İlanınız kalıcı olarak silinecektir.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setSilOnay(false)} style={{ flex: 1, padding: 13, borderRadius: 12, background: "#f1f5f9", border: "none", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", color: "#475569" }}>İptal</button>
              <button onClick={handleSil} disabled={siliyor} style={{ flex: 1, padding: 13, borderRadius: 12, background: siliyor ? "#94a3b8" : "#dc2626", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 800, cursor: siliyor ? "not-allowed" : "pointer" }}>{siliyor ? "⏳ Siliniyor..." : "Evet, Sil"}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1.5px solid #e2e8f0", padding: "12px 16px", display: "flex", gap: 10, zIndex: 100, boxShadow: "0 -4px 20px rgba(0,0,0,.08)" }}>
        <button
          onClick={() => {
            if (!ilan.iletisim) return;
            const tel = ilan.iletisim.replace(/\s/g, "");
            window.location.href = tel.includes("@") ? `mailto:${tel}` : `tel:${tel}`;
          }}
          style={{ flex: 2, padding: 14, borderRadius: 14, background: "#2563eb", border: "none", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
        >💬 {ilan.rol === "alan" ? "Teklif Ver" : "Hizmet Al"}</button>
        <button onClick={handlePaylasim} style={{ flex: 1, padding: 14, borderRadius: 14, background: "#f1f5f9", border: "1.5px solid #e2e8f0", color: "#475569", fontFamily: "inherit", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>🔗 Paylaş</button>
      </div>
    </div>
  );
}
