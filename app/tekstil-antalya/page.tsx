"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// ── Veri ────────────────────────────────────────────────────────────────────

const FABRICS = [
  {
    icon: "🌿",
    nameTr: "Muslin Kumaş",
    nameEn: "Muslin Fabric",
    descTr:
      "Ultra hafif ve nefes alan muslin; bebek giyiminden yazlık koleksiyonlara, astar ürünlerinden ev tekstiline geniş kullanım sunar. Deriye nazik dokusu her mevsim tercih sebebidir.",
    descEn:
      "Ultra-lightweight breathable muslin — from baby apparel to summer collections. Skin-friendly texture for year-round use.",
    tags: ["Nefes Alır", "Hypoallergenic", "Soft Touch", "All-Season"],
  },
  {
    icon: "🌾",
    nameTr: "Keten Kumaş",
    nameEn: "Linen Fabric",
    descTr:
      "Antibakteriyel özelliği, doğal sertliği ve uzun ömrüyle öne çıkar. Serin tutan yapısıyla yazlık giyimde vazgeçilmezdir.",
    descEn:
      "Prized for antibacterial properties, natural durability and longevity. Essential for summer collections.",
    tags: ["Antibacterial", "Serin Tutar", "Durable", "Eco-Friendly"],
  },
  {
    icon: "☁️",
    nameTr: "Pamuk-Keten",
    nameEn: "Cotton-Linen Blend",
    descTr:
      "%100 doğal pamuk ve keten ipliklerinin mükemmel birlikteliği. Her yaş grubuna uygun premium kumaş.",
    descEn:
      "Perfect union of 100% natural cotton & linen yarns. Premium fabric for all age groups.",
    tags: ["%100 Doğal", "Premium", "Comfort", "Versatile"],
  },
];

const PRODUCTS = [
  { num: "01", tr: "Yazlık Elbise", en: "Summer Dresses" },
  { num: "02", tr: "Keten Gömlek", en: "Linen Shirts" },
  { num: "03", tr: "Şort & Pantolon", en: "Shorts & Trousers" },
  { num: "04", tr: "Bebek Giyim", en: "Baby Apparel" },
  { num: "05", tr: "Kimono & Kaftan", en: "Kimono & Kaftan" },
  { num: "06", tr: "Tulum & Salopet", en: "Jumpsuits & Overalls" },
  { num: "07", tr: "Plaj Giyim", en: "Beachwear" },
  { num: "08", tr: "Bluz & Tunik", en: "Blouses & Tunics" },
  { num: "09", tr: "Masa Örtüsü", en: "Tablecloths" },
  { num: "10", tr: "Nevresim Takımı", en: "Bed Linen Sets" },
  { num: "11", tr: "Mutfak Tekstili", en: "Kitchen Textiles" },
  { num: "12", tr: "Özel Sipariş", en: "Custom Orders" },
];

// ── Bileşen ──────────────────────────────────────────────────────────────────

export default function TekstilAntalyaPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

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

          <p className={styles.heroEn}>
            The Texture of Nature, Crafted with Mastery
          </p>

          <p className={styles.heroDesc}>
            Antalya&apos;nın bereketli topraklarından ilham alan, %100 doğal
            muslin, keten ve pamuk-keten kumaşlardan üretilen tekstil
            koleksiyonumuzu keşfedin. Maya Tekstil · Toptan &amp; özel sipariş · Yurt içi &amp; ihracat.
          </p>

          <div className={styles.heroCta}>
            <button className={styles.btnPrimary} onClick={() => scrollTo("iletisim")}>
              İletişime Geç
            </button>
            <button className={styles.btnOutline} onClick={() => scrollTo("urunler")}>
              Ürünleri Gör
            </button>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>🏭 Üretici</span>
            <span className={styles.metaBadge}>📦 Toptan</span>
            <span className={styles.metaBadge}>🌍 İhracat</span>
            <span className={styles.metaBadge}>✅ Özel Sipariş</span>
          </div>
        </div>
      </section>

      {/* ── KUMAŞLAR ──────────────────────────────────── */}
      <section className={styles.section} id="kumaslar">
        <div className={styles.sectionHead}>
          <p className={styles.sectionLabel}>Malzeme &amp; Kumaş</p>
          <h2 className={styles.sectionTitle}>%100 Doğal <em>Kumaşlar</em></h2>
          <p className={styles.sectionSub}>100% Natural Fabrics · Certified &amp; Sustainable</p>
        </div>

        <div className={styles.fabricGrid}>
          {FABRICS.map((f, i) => (
            <div key={i} className={`${styles.fabricCard} ${styles.reveal}`} style={{ animationDelay: `${i * 0.12}s` }}>
              <span className={styles.fabricIcon}>{f.icon}</span>
              <h3 className={styles.fabricName}>{f.nameTr}</h3>
              <span className={styles.fabricNameEn}>{f.nameEn}</span>
              <p className={styles.fabricDesc}>{f.descTr}</p>
              <p className={styles.fabricDescEn}>{f.descEn}</p>
              <div className={styles.tags}>
                {f.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ÜRÜNLER ───────────────────────────────────── */}
      <section className={styles.sectionDark} id="urunler">
        <div className={styles.sectionHead}>
          <p className={`${styles.sectionLabel} ${styles.light}`}>Ürün Yelpazesi · Product Range</p>
          <h2 className={`${styles.sectionTitle} ${styles.lightTitle}`}>Tekstil <em>Koleksiyonu</em></h2>
          <p className={`${styles.sectionSub} ${styles.lightSub}`}>Giyim &amp; Ev Tekstili · Apparel &amp; Home Textiles</p>
        </div>

        <div className={styles.productGrid}>
          {PRODUCTS.map((p, i) => (
            <div key={i} className={`${styles.productItem} ${styles.reveal}`} style={{ animationDelay: `${i * 0.04}s` }}>
              <span className={styles.productNum}>{p.num}</span>
              <span className={styles.productTr}>{p.tr}</span>
              <span className={styles.productEn}>{p.en}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── AVANTAJLAR ────────────────────────────────── */}
      <section className={styles.sectionLight} id="avantajlar">
        <div className={styles.sectionHead}>
          <p className={styles.sectionLabel}>Neden Biz · Why Us</p>
          <h2 className={styles.sectionTitle}>Üretim <em>Avantajları</em></h2>
        </div>

        <div className={styles.advantageGrid}>
          {[
            { icon: "🏭", tr: "Fabrika Direkt Üretim", en: "Direct Factory Production", desc: "Aracısız, fabrika fiyatına temin. Küçük miktardan büyük hacimli siparişe esnek kapasite." },
            { icon: "🏷️", tr: "Özel Tasarım & Etiket", en: "Private Label & Custom Design", desc: "Kendi markanız için özel etiket, tasarım desteği ve ambalajlama hizmeti." },
            { icon: "🚚", tr: "Hızlı Teslimat & İhracat", en: "Fast Delivery & Export", desc: "Türkiye geneli hızlı kargo. Avrupa, Orta Doğu ve dünya geneline ihracat." },
            { icon: "📍", tr: "Antalya'dan Dünyaya", en: "From Antalya to the World", desc: "Tatil destinasyonları, resort oteller, mağazalar ve bireysel alıcılara özel üretim." },
          ].map((a, i) => (
            <div key={i} className={`${styles.advantageCard} ${styles.reveal}`} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className={styles.advantageIcon}>{a.icon}</span>
              <h3 className={styles.advantageTr}>{a.tr}</h3>
              <span className={styles.advantageEn}>{a.en}</span>
              <p className={styles.advantageDesc}>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── İLETİŞİM ──────────────────────────────────── */}
      <section className={styles.contact} id="iletisim">
        <div className={styles.contactInner}>
          <div className={styles.contactLeft}>
            <h2 className={styles.contactTitle}>Birlikte <em>Üretelim</em></h2>
            <p className={styles.contactDesc}>
              Toptan sipariş, özel tasarım veya numune talebi için iletişime geçin.
              Yurt içi &amp; yurt dışı alıcılara özel fiyat teklifi.
            </p>
            <p className={styles.contactDescEn}>
              Contact us for wholesale orders, custom design or fabric samples.
              Special pricing for domestic &amp; international buyers.
            </p>
            <a href="mailto:nefesercan@gmail.com" className={styles.btnLight}>
              ✉️ E-posta Gönder / Send Email
            </a>
          </div>

          <div className={styles.contactInfo}>
            {[
              { label: "Şirket / Company", val: "Maya Tekstil" },
              { label: "Konum / Location", val: "Antalya, Türkiye 🇹🇷" },
              { label: "E-posta", val: "nefesercan@gmail.com", href: "mailto:nefesercan@gmail.com" },
              { label: "Telefon / WhatsApp", val: "+90 531 898 64 18", href: "tel:+905318986418" },
              { label: "Çalışma Saati", val: "Pzt–Cum 08:00–18:00" },
              { label: "Min. Sipariş / MOQ", val: "İletişime geçin" },
            ].map((row, i) => (
              <div key={i} className={styles.infoRow}>
                <span className={styles.infoLabel}>{row.label}</span>
                {row.href
                  ? <a href={row.href} className={styles.infoVal}>{row.val}</a>
                  : <span className={styles.infoVal}>{row.val}</span>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GERİ DÖN ──────────────────────────────────── */}
      <div className={styles.backRow}>
        <Link href="/" className={styles.backLink}>← SwapHubs Ana Sayfaya Dön</Link>
      </div>
    </div>
  );
}
