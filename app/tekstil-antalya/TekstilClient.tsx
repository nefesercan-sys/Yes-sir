"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function TekstilClient({ urunler }: { urunler: any[] }) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [modalAcik, setModalAcik] = useState(false);
  const [seciliUrun, setSeciliUrun] = useState<any | null>(null);
  const [siparisDurumu, setSiparisDurumu] = useState({ loading: false, mesaj: "", success: false });

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animationPlayState = "running";
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".kutu-animasyon").forEach((el) => {
      (el as HTMLElement).style.animationPlayState = "paused";
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [urunler]);

  const scrollToUrunler = () => document.getElementById("urunler")?.scrollIntoView({ behavior: "smooth" });

  const siparisBaslat = (urun: any) => {
    setSeciliUrun(urun);
    setSiparisDurumu({ loading: false, mesaj: "", success: false });
    setModalAcik(true);
  };

  const siparisGonder = async (e: any) => {
    e.preventDefault();
    setSiparisDurumu({ loading: true, mesaj: "", success: false });

    const formData = new FormData(e.target);
    const siparisData = {
      urunId: seciliUrun?._id,
      urunBaslik: seciliUrun?.isimTr,
      fiyat: seciliUrun?.fiyat,
      musteriAd: formData.get("ad"),
      musteriTel: formData.get("tel"),
      adet: Number(formData.get("adet")),
      not: formData.get("not"),
    };

    try {
      const res = await fetch("/api/tekstil-siparis", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(siparisData),
      });
      const result = await res.json();
      if (result.success) {
        setSiparisDurumu({ loading: false, mesaj: "Siparis basariyla alindi!", success: true });
        setTimeout(() => setModalAcik(false), 3000);
      } else {
        setSiparisDurumu({ loading: false, mesaj: "Hata: " + result.message, success: false });
      }
    } catch {
      setSiparisDurumu({ loading: false, mesaj: "Sunucu hatasi olustu.", success: false });
    }
  };

  return (
    <div style={{ background: "#f8f5f0", minHeight: "100vh", color: "#333", fontFamily: "sans-serif" }}>
      
      {/* UST KISIM */}
      <section style={{ padding: "60px 20px", textAlign: "center", borderBottom: "1px solid #e5e0d8" }}>
        <span style={{ display: "inline-block", padding: "5px 12px", background: "#e5e0d8", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", marginBottom: "15px", color: "#555" }}>
          Antalya - Dogrulanmis Uretici
        </span>
        <h1 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "15px", color: "#3e3226" }}>
          Doganin Dokusu, Ustalikla Islenmis
        </h1>
        <p style={{ color: "#666", maxWidth: "600px", margin: "0 auto 20px" }}>
          %100 dogal muslin ve keten koleksiyonu. Maya Tekstil - Toptan ve Ihracat.
        </p>
        <button onClick={scrollToUrunler} style={{ padding: "12px 24px", background: "#8a6c4c", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
          Urunleri Gor
        </button>
      </section>

      {/* URUNLER ALANI */}
      <section id="urunler" style={{ padding: "40px 5%", background: "#3e3226" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <p style={{ color: "#a89f91", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Urun Yelpazesi</p>
          <h2 style={{ color: "#fff", fontSize: "28px", marginTop: "5px" }}>Tekstil Koleksiyonu</h2>
        </div>

        {/* YAN YANA URUN IZGARASI */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", width: "100%", justifyContent: "center" }}>
          {urunler.length === 0 ? (
            <p style={{ color: "#fff" }}>Henuz urun eklenmemis.</p>
          ) : (
            urunler.map((p, i) => {
              const medyaUrl = p.resimUrl || (p.medyalar && p.medyalar[0]);
              const isVideo = medyaUrl?.match(/\.(mp4|webm|ogg)$/i);

              return (
                <div key={p._id} className="kutu-animasyon" style={{ flex: "1 1 160px", maxWidth: "300px", background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "15px", display: "flex", flexDirection: "column" }}>
                  <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: "8px", overflow: "hidden", marginBottom: "15px", background: "rgba(0,0,0,0.2)" }}>
                    {medyaUrl ? (
                      isVideo ? (
                        <video src={medyaUrl} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <img src={medyaUrl} alt={p.isimTr} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      )
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#888", fontSize: "2rem" }}>📷</div>
                    )}
                  </div>
                  
                  <span style={{ fontSize: "15px", fontWeight: "bold", color: "#fff", marginBottom: "4px" }}>{p.isimTr}</span>
                  <span style={{ fontSize: "12px", color: "#a89f91", marginBottom: "10px" }}>{p.isimEn}</span>
                  <span style={{ color: "#a8e6cf", fontWeight: "bold", fontSize: "1.2rem", marginBottom: "15px" }}>
                    {p.fiyat > 0 ? `${p.fiyat} TL` : "Fiyat Sorunuz"}
                  </span>
                  
                  <button onClick={() => siparisBaslat(p)} style={{ width: "100%", marginTop: "auto", padding: "12px", background: "#a8e6cf", color: "#222", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                    Siparis Ver
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

      <div style={{ padding: "30px", textAlign: "center", background: "#f8f5f0" }}>
        <Link href="/" style={{ color: "#8a6c4c", textDecoration: "none", fontWeight: "bold" }}>Ana Sayfaya Don</Link>
      </div>

      {/* SIPARIS FORMU */}
      {modalAcik && seciliUrun && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "#3e3226", padding: "25px", borderRadius: "16px", width: "100%", maxWidth: "400px", position: "relative" }}>
            <button onClick={() => setModalAcik(false)} style={{ position: "absolute", top: "15px", right: "20px", background: "none", border: "none", color: "#fff", fontSize: "20px", cursor: "pointer" }}>X</button>
            <h3 style={{ color: "#a8e6cf", marginBottom: "5px" }}>Siparis Formu</h3>
            <p style={{ color: "#aaa", fontSize: "13px", marginBottom: "20px" }}>{seciliUrun.isimTr} - {seciliUrun.fiyat} TL</p>

            <form onSubmit={siparisGonder} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" name="ad" required placeholder="Adiniz Soyadiniz" style={{ padding: "12px", borderRadius: "8px", border: "none" }} />
              <input type="tel" name="tel" required placeholder="Telefon Numarasi" style={{ padding: "12px", borderRadius: "8px", border: "none" }} />
              <input type="number" name="adet" required min="1" defaultValue="1" placeholder="Adet" style={{ padding: "12px", borderRadius: "8px", border: "none" }} />
              <textarea name="not" rows={2} placeholder="Siparis Notu (Beden vb.)" style={{ padding: "12px", borderRadius: "8px", border: "none" }}></textarea>
              
              <button type="submit" disabled={siparisDurumu.loading} style={{ padding: "14px", background: siparisDurumu.success ? "#059669" : "#a8e6cf", color: "#111", border: "none", borderRadius: "8px", fontWeight: "bold", marginTop: "10px" }}>
                {siparisDurumu.loading ? "Gonderiliyor..." : siparisDurumu.success ? "Gonderildi" : "Siparisi Tamamla"}
              </button>
              {siparisDurumu.mesaj && <p style={{ color: siparisDurumu.success ? "#a8e6cf" : "#ff8a8a", fontSize: "12px", textAlign: "center", marginTop: "8px" }}>{siparisDurumu.mesaj}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
