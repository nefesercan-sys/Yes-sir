"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function IlanDuzenle({
  params,
}: {
  params: { slug: string };
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [ilan, setIlan] = useState<any>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [hata, setHata] = useState("");
  const [formData, setFormData] = useState({
    baslik: "",
    aciklama: "",
    fiyat: "",
    sehir: "",
    iletisim: "",
  });

  useEffect(() => {
    fetch(`/api/ilanlar?slug=${params.slug}`)
      .then(r => r.json())
      .then(data => {
        const v = Array.isArray(data) ? data[0] : data;
        if (v) {
          setIlan(v);
          setFormData({
            baslik: v.baslik || "",
            aciklama: v.aciklama || v.formData?.aciklama || "",
            fiyat: v.butceMin || "",
            sehir: v.sehir || "",
            iletisim: v.iletisim || v.formData?.iletisim || "",
          });
        }
        setYukleniyor(false);
      });
  }, [params.slug]);

  const handleKaydet = async () => {
    if (!formData.baslik.trim()) {
      setHata("Başlık zorunludur");
      return;
    }
    setKaydediliyor(true);
    setHata("");

    try {
      const res = await fetch(`/api/ilanlar/${ilan._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baslik: formData.baslik,
          aciklama: formData.aciklama,
          butceMin: Number(formData.fiyat) || 0,
          sehir: formData.sehir,
          iletisim: formData.iletisim,
        }),
      });

      if (res.ok) {
        router.push(`/ilan/${params.slug}?guncellendi=1`);
      } else {
        const err = await res.json();
        setHata(err.error || "Güncelleme başarısız");
      }
    } catch {
      setHata("Bağlantı hatası");
    }
    setKaydediliyor(false);
  };

  const INP: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 11,
    border: "1.5px solid #e2e8f0",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    background: "#fff",
    color: "#0f172a",
  };

  if (yukleniyor) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      Yükleniyor...
    </div>
  );

  if (!ilan) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      İlan bulunamadı
    </div>
  );

  // Sadece ilan sahibi düzenleyebilir
  if (session?.user?.email !== ilan.sahibi?.email &&
      session?.user?.email !== ilan.satici?.email) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        Bu ilanı düzenleme yetkiniz yok.
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "inherit", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ background: "#0f172a", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 100 }}>
        <button
          onClick={() => router.back()}
          style={{ background: "rgba(255,255,255,.1)", border: "none", color: "#fff", width: 38, height: 38, borderRadius: 10, cursor: "pointer", fontSize: 16 }}
        >←</button>
        <h1 style={{ color: "#fff", fontSize: 16, fontWeight: 800 }}>İlanı Düzenle</h1>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>

        {hata && (
          <div style={{ padding: "12px 16px", borderRadius: 12, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 13, marginBottom: 14, fontWeight: 600 }}>
            ⚠️ {hata}
          </div>
        )}

        {/* Başlık */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>
            İlan Başlığı *
          </label>
          <input
            value={formData.baslik}
            onChange={e => setFormData(p => ({ ...p, baslik: e.target.value }))}
            style={INP}
          />
        </div>

        {/* Açıklama */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>
            Açıklama
          </label>
          <textarea
            value={formData.aciklama}
            onChange={e => setFormData(p => ({ ...p, aciklama: e.target.value }))}
            rows={6}
            style={{ ...INP, resize: "vertical" }}
          />
        </div>

        {/* Fiyat & Şehir */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>
                Fiyat (₺)
              </label>
              <input
                type="number"
                value={formData.fiyat}
                onChange={e => setFormData(p => ({ ...p, fiyat: e.target.value }))}
                style={INP}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>
                Şehir
              </label>
              <input
                value={formData.sehir}
                onChange={e => setFormData(p => ({ ...p, sehir: e.target.value }))}
                style={INP}
              />
            </div>
          </div>
        </div>

        {/* İletişim */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", padding: 18, marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 8 }}>
            İletişim Bilgisi
          </label>
          <input
            value={formData.iletisim}
            onChange={e => setFormData(p => ({ ...p, iletisim: e.target.value }))}
            placeholder="Telefon veya e-posta"
            style={INP}
          />
        </div>

        {/* Kaydet */}
        <button
          onClick={handleKaydet}
          disabled={kaydediliyor}
          style={{
            width: "100%", padding: 16, borderRadius: 14,
            background: kaydediliyor ? "#94a3b8" : "#f59e0b",
            border: "none", color: "#0f172a",
            fontFamily: "inherit", fontSize: 15, fontWeight: 800,
            cursor: kaydediliyor ? "not-allowed" : "pointer",
          }}
        >
          {kaydediliyor ? "⏳ Kaydediliyor..." : "✅ Değişiklikleri Kaydet"}
        </button>

      </div>
    </div>
  );
}
