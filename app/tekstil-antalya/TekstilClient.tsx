"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// ── Dinamik Veri Tipi ────────
export interface Urun {
  _id: string;
  isimTr: string;
  isimEn: string;
  fiyat: number;
  resimUrl: string;
  medyalar?: string[];
}

// ── Statik Veri ──────────────────
const FABRICS = [
  {
    icon: "🌿", nameTr: "Muslin Kumaş", nameEn: "Muslin Fabric",
    descTr: "Ultra hafif ve nefes alan muslin; bebek giyiminden yazlık koleksiyonlara geniş kullanım sunar.",
  },
  {
    icon: "🌾", nameTr: "Keten Kumaş", nameEn: "Linen Fabric",
    descTr: "Antibakteriyel özelliği, doğal sertliği ve uzun ömrüyle öne çıkar. Serin tutan yapısıyla yazlık giyimde vazgeçilmezdir.",
  },
  {
    icon: "☁️", nameTr: "Pamuk-Keten", nameEn: "Cotton-Linen Blend",
    descTr: "%100 doğal pamuk ve keten ipliklerinin mükemmel birlikteliği.",
  },
];

// ── Bileşen ──────────────────────────────────────────────────────────────────

export default function TekstilClient({ urunler }: { urunler: Urun[] }) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [modalAcik, setModalAcik] = useState(false);
  const [seciliUrun, setSeciliUrun] = useState<Urun | null>(null);
  const [siparisDurumu, setSiparisDurumu] = useState({ loading: false, mesaj: "", success: false });

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationPlayState = "running";
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(`.${styles.reveal}`).forEach((el) => {
      (el as HTMLElement).style.animationPlayState = "paused";
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [urunler]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const siparisBaslat = (urun: Urun) => {
    setSeciliUrun(urun);
    setSiparisDurumu({ loading: false, mesaj: "", success: false });
    setModalAcik(true);
  };

  const siparisGonder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSiparisDurumu({ loading: true, mesaj: "", success: false });

    const formData = new FormData(e.currentTarget);
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
        setSiparisDurumu({ loading: false, mesaj: "✅ Sipariş alındı!", success: true });
        setTimeout(() => setModalAcik(false), 3000);
      } else {
        setSiparisDurumu({ loading: false, mesaj: "❌ " + result.message, success: false });
      }
    } catch {
      setSiparisDurumu({ loading: false, mesaj: "❌ Hata oluştu.", success: false });
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* 🚨 ÇÖZÜM BURADA: Vercel'in çökmemesi için stili güvenli HTML formatına çevirdik */}
      <style dangerouslySetInnerHTML={{ __html: `
        .urun-izgara {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 15px;
          margin-top: 20px;
          width: 100%;
        }
        @media (max-width: 600px) {
          .urun-izgara {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
        }
        .urun-karti {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
        }
        .medya-kutu {
          width: 100%;
          aspect-ratio: 4/5;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 10px;
          background: rgba(255,255,255,0.05);
        }
        .medya-kutu img, .medya-kutu video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .siparis-buton {
          width: 100%;
          margin-top: auto;
          padding: 10px;
          background: #a8e6cf;
          color: #222;
          border: none;
          border-radius: 8px;
          font-weight: 800;
          font-size: 0.9rem;
          cursor: pointer;
        }
      `}} />

      {/* ── HERO ──────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.badge}>Antalya · Doğrulanmış Üretici</span>
          <h1 className={styles.heroTitle}>Doğanın Dokusu,<br/><em>Ustalıkla</em> İşlenmiş</h1>
          <p className={styles.heroDesc}>%100 doğal muslin ve keten koleksiyonu. Maya Tekstil · Toptan & İhracat.</p>
          <div className={styles.heroCta}>
            <button className={styles.btnPrimary} onClick={() => scrollTo("urunler")}>Ürünleri Gör</button>
          </div>
        </div>
      </section>

      {/* ── KUMAŞLAR ──────────────────────────────────── */}
      <section className={styles.section} id="kumaslar">
        <div className={styles.sectionHead}>
          <p className={styles.sectionLabel}>Malzeme & Kumaş</p>
          <h2 className={styles.sectionTitle}>%100 Doğal <em>Kumaşlar</em></h2>
        </div>
        <div className={styles.fabricGrid}>
          {FABRICS.map((f, i) => (
            <div key={i} className={`${styles.fabricCard} ${styles.reveal}`} style={{ animationDelay: `${i * 0.1s}` }}>
              <span className={styles.fabricIcon}>{f.icon}</span>
              <h3 className={styles.fabricName}>{f.nameTr}</h3>
              <p className={styles.fabricDesc}>{f.descTr}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DİNAMİK ÜRÜNLER (KREATİF & DOLGUN GÖRÜNÜM) ────────────── */}
      <section className={styles.sectionDark} id="urunler">
        <div className={styles.sectionHead}>
          <p className={`${styles.sectionLabel} ${styles.light}`}>Ürün Yelpazesi</p>
          <h2 className={`${styles.sectionTitle} ${styles.lightTitle}`}>Tekstil <em>Koleksiyonu</em></h2>
        </div>

        <div className="urun-izgara">
          {urunler.map((p, i) => {
            const medyaUrl = p.resimUrl || (p.medyalar && p.medyalar[0]);
            const isVideo = medyaUrl?.match(/\.(mp4|webm|ogg)$/i);

            return (
              <div key={p._id} className={`urun-karti ${styles.reveal}`} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="medya-kutu">
                  {medyaUrl ? (
                    isVideo ? (
                      <video src={medyaUrl} autoPlay loop muted playsInline />
                    ) : (
                      <img src={medyaUrl} alt={p.isimTr} />
                    )
                  ) : (
                    <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '2rem'}}>📷</div>
                  )}
                </div>
                
                <span style={{ fontSize: "14px", fontWeight: "bold", color: "#fff", marginBottom: "4px" }}>{p.isimTr}</span>
                <span style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>{p.isimEn}</span>
                <span style={{ color: "#a8e6cf", fontWeight: "900", fontSize: "1.1rem", marginBottom: "12px" }}>
                  {p.fiyat > 0 ? `${p.fiyat} ₺` : "Fiyat Sorunuz"}
                </span>
                
                <button className="siparis-buton" onClick={() => siparisBaslat(p)}>
                  Sipariş Ver
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <div className={styles.backRow}>
        <Link href="/" className={styles.backLink}>← SwapHubs Ana Sayfaya Dön</Link>
      </div>

      {/* ── SİPARİŞ MODALI ────────────── */}
      {modalAcik && seciliUrun && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "#2a2520", padding: "25px", borderRadius: "16px", width: "100%", maxWidth: "400px", position: "relative" }}>
            <button onClick={() => setModalAcik(false)} style={{ position: "absolute", top: "15px", right: "20px", background: "none", border: "none", color: "#fff", fontSize: "20px", cursor: "pointer" }}>✕</button>
            <h3 style={{ color: "#a8e6cf", marginBottom: "5px" }}>Sipariş Formu</h3>
            <p style={{ color: "#aaa", fontSize: "13px", marginBottom: "20px" }}>{seciliUrun.isimTr} - {seciliUrun.fiyat} ₺</p>

            <form onSubmit={siparisGonder} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" name="ad" required placeholder="Adınız Soyadınız" style={{ padding: "12px", borderRadius: "8px", border: "none" }} />
              <input type="tel" name="tel" required placeholder="Telefon (05...)" style={{ padding: "12px", borderRadius: "8px", border: "none" }} />
              <input type="number" name="adet" required min="1" defaultValue="1" placeholder="Adet" style={{ padding: "12px", borderRadius: "8px", border: "none" }} />
              <textarea name="not" rows={2} placeholder="Sipariş Notu (Beden, Renk vb.)" style={{ padding: "12px", borderRadius: "8px", border: "none" }}></textarea>
              
              <button type="submit" disabled={siparisDurumu.loading} style={{ padding: "14px", background: siparisDurumu.success ? "#059669" : "#a8e6cf", color: "#111", border: "none", borderRadius: "8px", fontWeight: "bold", marginTop: "10px" }}>
                {siparisDurumu.loading ? "Gönderiliyor..." : siparisDurumu.success ? "Gönderildi ✅" : "Siparişi Tamamla"}
              </button>
              {siparisDurumu.mesaj && <p style={{ color: siparisDurumu.success ? "#a8e6cf" : "#ff8a8a", fontSize: "12px", textAlign: "center", marginTop: "8px" }}>{siparisDurumu.mesaj}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
