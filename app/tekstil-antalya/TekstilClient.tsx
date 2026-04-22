"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export interface Urun {
  _id: string;
  isimTr: string;
  isimEn: string;
  fiyat: number;
  resimUrl: string;
  medyalar?: string[];
}

export default function TekstilClient({ urunler }: { urunler: Urun[] }) {
  const [modalAcik, setModalAcik] = useState(false);
  const [seciliUrun, setSeciliUrun] = useState<Urun | null>(null);

  // Intersection Observer animasyonları
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add(styles.animate);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(`.${styles.reveal}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [urunler]);

  return (
    <div className={styles.wrapper}>
      {/* ── HERO: DAHA KOMPAKT ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.badge}>Antalya · Doğrulanmış Üretici</span>
          <h1 className={styles.heroTitle}>Doğanın Dokusu, <em>Ustalıkla</em> İşlenmiş</h1>
          <p className={styles.heroDesc}>
            %100 doğal muslin ve keten koleksiyonu. Maya Tekstil · Toptan & İhracat.
          </p>
          <div className={styles.heroCta}>
            <button className={styles.btnPrimary} onClick={() => document.getElementById('urunler')?.scrollIntoView({behavior:'smooth'})}>Ürünleri Gör</button>
          </div>
        </div>
      </section>

      {/* ── ÜRÜN VİTRİNİ: YARATICI GRID ── */}
      <section className={styles.sectionDark} id="urunler">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Tekstil <em>Koleksiyonu</em></h2>
          <div className={styles.accentLine}></div>
        </div>

        <div className={styles.creativeGrid}>
          {urunler.length === 0 ? (
            <p className={styles.noData}>Henüz ürün eklenmemiş.</p>
          ) : (
            urunler.map((p, i) => {
              // Resim mi video mu kontrolü
              const anaMedya = p.resimUrl || (p.medyalar && p.medyalar[0]);
              const isVideo = anaMedya?.match(/\.(mp4|webm|ogg)$/i);

              return (
                <div key={p._id} className={`${styles.productCard} ${styles.reveal}`} style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className={styles.mediaWrapper}>
                    {isVideo ? (
                      <video src={anaMedya} autoPlay loop muted playsInline className={styles.cardMedia} />
                    ) : (
                      <img src={anaMedya || "/placeholder.jpg"} alt={p.isimTr} className={styles.cardMedia} 
                           onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x500?text=Resim+Yok")} />
                    )}
                    <div className={styles.cardOverlay}>
                       <button className={styles.quickOrder} onClick={() => {setSeciliUrun(p); setModalAcik(true);}}>Sipariş Ver</button>
                    </div>
                  </div>
                  
                  <div className={styles.cardInfo}>
                    <h3 className={styles.pTitle}>{p.isimTr}</h3>
                    <p className={styles.pEn}>{p.isimEn}</p>
                    <div className={styles.priceTag}>{p.fiyat > 0 ? `${p.fiyat.toLocaleString('tr-TR')} ₺` : "Fiyat Sorunuz"}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* ── SİPARİŞ MODAL ── */}
      {modalAcik && seciliUrun && (
        <div className={styles.modalOverlay} onClick={() => setModalAcik(false)}>
           <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <h3>Sipariş Talebi</h3>
              <p>{seciliUrun.isimTr}</p>
              <form className={styles.modalForm}>
                <input type="text" placeholder="Adınız Soyadınız" required />
                <input type="tel" placeholder="Telefon Numaranız" required />
                <textarea placeholder="Sipariş Notu (Adet, Beden vb.)"></textarea>
                <button type="submit" className={styles.btnPrimary}>Talebi Gönder</button>
              </form>
           </div>
        </div>
      )}

      <div className={styles.footerRow}>
        <Link href="/">← SwapHubs Ana Sayfaya Dön</Link>
      </div>
    </div>
  );
}
