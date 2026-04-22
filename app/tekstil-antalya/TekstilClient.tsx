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
}

// ── Statik Veri ──────────────────
const FABRICS = [
  {
    icon: "🌿", nameTr: "Muslin Kumaş", nameEn: "Muslin Fabric",
    descTr: "Ultra hafif ve nefes alan muslin; bebek giyiminden yazlık koleksiyonlara geniş kullanım sunar.",
    descEn: "Ultra-lightweight breathable muslin — from baby apparel to summer collections.",
    tags: ["Nefes Alır", "Hypoallergenic", "Soft Touch", "All-Season"],
  },
  {
    icon: "🌾", nameTr: "Keten Kumaş", nameEn: "Linen Fabric",
    descTr: "Antibakteriyel özelliği, doğal sertliği ve uzun ömrüyle öne çıkar. Serin tutan yapısıyla yazlık giyimde vazgeçilmezdir.",
    descEn: "Prized for antibacterial properties, natural durability and longevity.",
    tags: ["Antibacterial", "Serin Tutar", "Durable", "Eco-Friendly"],
  },
  {
    icon: "☁️", nameTr: "Pamuk-Keten", nameEn: "Cotton-Linen Blend",
    descTr: "%100 doğal pamuk ve keten ipliklerinin mükemmel birlikteliği.",
    descEn: "Perfect union of 100% natural cotton & linen yarns.",
    tags: ["%100 Doğal", "Premium", "Comfort", "Versatile"],
  },
];

// ── Bileşen ──────────────────────────────────────────────────────────────────

export default function TekstilClient({ urunler }: { urunler: Urun[] }) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Sipariş Modalı İçin State'ler
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
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

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
      musteriEmail: formData.get("email"),
      musteriTel: formData.get("tel"),
      adet: Number(formData.get("adet")),
      not: formData.get("not"),
    };

    try {
      const res = await fetch("/api/tekstil-siparis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siparisData),
      });

      const result = await res.json();

      if (result.success) {
        setSiparisDurumu({ loading: false, mesaj: "✅ Siparişiniz başarıyla alındı! Size en kısa sürede ulaşacağız.", success: true });
        setTimeout(() => {
          setModalAcik(false);
        }, 3000);
      } else {
        setSiparisDurumu({ loading: false, mesaj: "❌ " + result.message, success: false });
      }
    } catch {
      setSiparisDurumu({ loading: false, mesaj: "❌ Bağlantı hatası oluştu.", success: false });
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden />
        <div className={styles.heroGlow} aria-hidden />

        <div className={styles.heroInner}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            Antalya, Türkiye · Doğrulanmış Üretici
          </span>

          <h1 className={styles.heroTitle}>
            Doğanın Dokusu,
            <br />
            <em>Ustalıkla</em> İşlenmiş
          </h1>

          <p className={styles.heroEn}>The Texture of Nature, Crafted with Mastery</p>

          <p className={styles.heroDesc}>
            Antalya&apos;nın bereketli topraklarından ilham alan, %100 doğal muslin, keten ve pamuk-keten kumaşlardan üretilen tekstil koleksiyonumuzu keşfedin. Maya Tekstil · Toptan &amp; özel sipariş.
          </p>

          <div className={styles.heroCta}>
            <button className={styles.btnPrimary} onClick={() => scrollTo("iletisim")}>İletişime Geç</button>
            <button className={styles.btnOutline} onClick={() => scrollTo("urunler")}>Ürünleri Gör</button>
          </div>
        </div>
      </section>

      {/* ── KUMAŞLAR ──────────────────────────────────── */}
      <section className={styles.section} id="kumaslar">
        <div className={styles.sectionHead}>
          <p className={styles.sectionLabel}>Malzeme &amp; Kumaş</p>
          <h2 className={styles.sectionTitle}>%100 Doğal <em>Kumaşlar</em></h2>
        </div>
        <div className={styles.fabricGrid}>
          {FABRICS.map((f, i) => (
            <div key={i} className={`${styles.fabricCard} ${styles.reveal}`} style={{ animationDelay: `${i * 0.12}s` }}>
              <span className={styles.fabricIcon}>{f.icon}</span>
              <h3 className={styles.fabricName}>{f.nameTr}</h3>
              <p className={styles.fabricDesc}>{f.descTr}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DİNAMİK ÜRÜNLER (SİPARİŞ BUTONLU) ────────────── */}
      <section className={styles.sectionDark} id="urunler">
        <div className={styles.sectionHead}>
          <p className={`${styles.sectionLabel} ${styles.light}`}>Ürün Yelpazesi · Product Range</p>
          <h2 className={`${styles.sectionTitle} ${styles.lightTitle}`}>Tekstil <em>Koleksiyonu</em></h2>
        </div>

        <div className={styles.productGrid}>
          {urunler.map((p, i) => (
            <div key={p._id} className={`${styles.productItem} ${styles.reveal}`} style={{ animationDelay: `${i * 0.04}s`, paddingBottom: "20px" }}>
              {p.resimUrl && (
                <div style={{ width: "100%", height: "200px", borderRadius: "8px", overflow: "hidden", marginBottom: "1rem", backgroundColor: "#1a1a2e" }}>
                  <img src={p.resimUrl} alt={p.isimTr} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <span className={styles.productTr}>{p.isimTr}</span>
              <span className={styles.productEn}>{p.isimEn}</span>
              <span style={{ display: "block", marginTop: "12px", color: "#a8e6cf", fontWeight: "bold", fontSize: "1.2rem" }}>
                {p.fiyat > 0 ? `${p.fiyat} ₺` : "Fiyat Sorunuz"}
              </span>
              
              {/* YENİ: SİPARİŞ BUTONU */}
              <button onClick={() => siparisBaslat(p)} style={{ width: "100%", marginTop: "15px", padding: "10px", background: "#a8e6cf", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", transition: "0.2s" }}>
                Hemen Sipariş Ver
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── İLETİŞİM ──────────────────────────────────── */}
      <section className={styles.contact} id="iletisim">
        <div className={styles.contactInner}>
          <div className={styles.contactLeft}>
            <h2 className={styles.contactTitle}>Birlikte <em>Üretelim</em></h2>
            <p className={styles.contactDesc}>Toptan sipariş veya özel tasarım talebi için iletişime geçin.</p>
            <a href="mailto:nefesercan@gmail.com" className={styles.btnLight}>✉️ E-posta Gönder</a>
          </div>
        </div>
      </section>

      <div className={styles.backRow}>
        <Link href="/" className={styles.backLink}>← SwapHubs Ana Sayfaya Dön</Link>
      </div>

      {/* ── SİPARİŞ AÇILIR PENCERESİ (MODAL) ────────────── */}
      {modalAcik && seciliUrun && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "#0f172a", padding: "30px", borderRadius: "16px", maxWidth: "500px", width: "100%", border: "1px solid #a8e6cf", position: "relative" }}>
            
            <button onClick={() => setModalAcik(false)} style={{ position: "absolute", top: "15px", right: "20px", background: "transparent", border: "none", color: "#fff", fontSize: "20px", cursor: "pointer" }}>✕</button>
            
            <h3 style={{ color: "#a8e6cf", marginBottom: "5px", fontSize: "1.4rem" }}>Sipariş Formu</h3>
            <p style={{ color: "#94a3b8", marginBottom: "20px", fontSize: "0.9rem" }}>{seciliUrun.isimTr} - {seciliUrun.fiyat} ₺</p>

            <form onSubmit={siparisGonder} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ color: "#94a3b8", fontSize: "12px", fontWeight: "bold" }}>Adınız Soyadınız / Firma Adı *</label>
                <input type="text" name="ad" required style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #333", background: "#1e293b", color: "#fff", outline: "none", marginTop: "5px" }} />
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ color: "#94a3b8", fontSize: "12px", fontWeight: "bold" }}>Telefon *</label>
                  <input type="tel" name="tel" required placeholder="0555..." style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #333", background: "#1e293b", color: "#fff", outline: "none", marginTop: "5px" }} />
                </div>
                <div>
                  <label style={{ color: "#94a3b8", fontSize: "12px", fontWeight: "bold" }}>E-posta</label>
                  <input type="email" name="email" placeholder="@" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #333", background: "#1e293b", color: "#fff", outline: "none", marginTop: "5px" }} />
                </div>
              </div>

              <div>
                <label style={{ color: "#94a3b8", fontSize: "12px", fontWeight: "bold" }}>Sipariş Adedi *</label>
                <input type="number" name="adet" required min="1" defaultValue="1" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #333", background: "#1e293b", color: "#fff", outline: "none", marginTop: "5px" }} />
              </div>

              <div>
                <label style={{ color: "#94a3b8", fontSize: "12px", fontWeight: "bold" }}>Sipariş Notu (Beden, Renk, Adres vb.)</label>
                <textarea name="not" rows={3} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #333", background: "#1e293b", color: "#fff", outline: "none", marginTop: "5px" }}></textarea>
              </div>

              <button type="submit" disabled={siparisDurumu.loading || siparisDurumu.success} style={{ padding: "14px", background: siparisDurumu.success ? "#059669" : "#a8e6cf", color: siparisDurumu.success ? "#fff" : "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", marginTop: "10px", transition: "0.3s" }}>
                {siparisDurumu.loading ? "Gönderiliyor..." : siparisDurumu.success ? "Gönderildi" : "Siparişi Tamamla"}
              </button>

              {siparisDurumu.mesaj && (
                <div style={{ padding: "10px", marginTop: "5px", borderRadius: "8px", background: siparisDurumu.success ? "rgba(5, 150, 105, 0.1)" : "rgba(220, 38, 38, 0.1)", color: siparisDurumu.success ? "#a8e6cf" : "#ff8a8a", textAlign: "center", fontSize: "0.9rem", fontWeight: "bold" }}>
                  {siparisDurumu.mesaj}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
