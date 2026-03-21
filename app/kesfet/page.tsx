"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
const BIREYSEL_KATEGORILER = [
  { slug:"otel-tatil",   emoji:"🏨", ad:"Otel & Tatil",      aciklama:"Otel, apart, villa, tur" },
  { slug:"arac-kiralama",emoji:"🚗", ad:"Araç Kiralama",     aciklama:"Rent a car, transfer" },
  { slug:"tamir-bakim",  emoji:"🔧", ad:"Tamir & Bakım",     aciklama:"Ev, elektronik, araç" },
  { slug:"temizlik",     emoji:"🧹", ad:"Temizlik",          aciklama:"Ev, ofis, cam silme" },
  { slug:"usta",         emoji:"👷", ad:"Usta & Zanaatkar",  aciklama:"Elektrik, tesisat, boya" },
  { slug:"nakliyat",     emoji:"🚛", ad:"Nakliyat",          aciklama:"Ev taşıma, kargo" },
  { slug:"egitim",       emoji:"📚", ad:"Eğitim & Kurs",     aciklama:"Özel ders, kurslar" },
  { slug:"etkinlik",     emoji:"🎉", ad:"Etkinlik & Organizasyon", aciklama:"Düğün, toplantı" },
  { slug:"saglik",       emoji:"🏥", ad:"Sağlık & Güzellik", aciklama:"Hemşire, kuaför, masaj" },
  { slug:"teknoloji",    emoji:"💻", ad:"Teknoloji",         aciklama:"Web, yazılım, destek" },
  { slug:"urun-al",      emoji:"🛍️", ad:"Ürün Al",          aciklama:"İkinci el, sıfır ürün" },
  { slug:"diger",        emoji:"✨", ad:"Diğer",             aciklama:"Diğer hizmetler" },
];
const TICARI_KATEGORILER = [
  { slug:"tekstil",      emoji:"👕", ad:"Tekstil & Hazır Giyim",    aciklama:"Gömlek, elbise, üniforma, ev tekstili" },
  { slug:"mermer-tas",   emoji:"🪨", ad:"Mermer & Doğal Taş",       aciklama:"Mermer plaka, travertin, granit" },
  { slug:"metal-celik",  emoji:"⚙️", ad:"Metal & Çelik",            aciklama:"Çelik kapı, panel çit, profil" },
  { slug:"plastik-pvc",  emoji:"🧴", ad:"Plastik & PVC",            aciklama:"PVC pencere, boru, ambalaj" },
  { slug:"ahsap-mobilya",emoji:"🪵", ad:"Ahşap & Mobilya",          aciklama:"Kapı, mobilya, parke, palet" },
  { slug:"gida-tarim",   emoji:"🌾", ad:"Gıda & Tarım Ürünleri",   aciklama:"Zeytinyağı, kuru meyve, bakliyat" },
  { slug:"insaat-malz",  emoji:"🏗️", ad:"İnşaat Malzemeleri",      aciklama:"Seramik, çimento, yalıtım" },
  { slug:"elektrik-enerji",emoji:"⚡",ad:"Elektrik & Enerji",       aciklama:"Kablo, LED, solar panel" },
  { slug:"makine-ekipman",emoji:"🏭",ad:"Makine & Ekipman",         aciklama:"Tarım, inşaat, gıda makineleri" },
  { slug:"lojistik",     emoji:"🚢", ad:"Lojistik & Taşımacılık",  aciklama:"Konteyner, TIR, gümrükleme" },
  { slug:"kimya-boya",   emoji:"🧪", ad:"Kimya & Boya",             aciklama:"Boya, vernik, yapıştırıcı" },
  { slug:"saglik-medikal",emoji:"🏥",ad:"Sağlık & Medikal",         aciklama:"Medikal tekstil, tıbbi cihaz" },
];
function KesfetIcerik() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const rol          = (searchParams.get("rol") ?? "alan") as "alan" | "veren";
  const tip          = (searchParams.get("tip") ?? "") as "bireysel" | "ticari" | "";
  const geriGit = () => {
    if (tip) router.push(`/kesfet?rol=${rol}`);
    else router.push("/");
  };
  const ilanlarGit = (kategoriSlug: string) => {
    router.push(`/ilanlar?rol=${rol}&tip=${tip}&kategori=${kategoriSlug}`);
  };
  const ilanVerGit = (kategoriSlug: string) => {
    router.push(`/ilan-ver?rol=${rol}&tip=${tip}&kategori=${kategoriSlug}`);
  };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Unbounded:wght@700;900&display=swap');
        :root{--ink:#080811;--cream:#f7f5f0;--red:#e8361a;--gold:#f5a623;
          --navy:#0d1b3e;--mid:#4a4860;--border:#e4e1db;--green:#18a558;--purple:#7c3aed}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:var(--cream);color:var(--ink)}
        .page{min-height:100vh;padding:0}
        /* HEADER BAR */
        .topbar{background:var(--navy);padding:16px 24px;
          display:flex;align-items:center;justify-content:space-between;gap:12}
        .topbar-logo{font-family:'Unbounded',sans-serif;font-weight:900;
          color:#fff;font-size:1.1rem;display:flex;align-items:center;gap:8px}
        .topbar-logo span{color:var(--red)}
        .topbar-back{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
          color:#fff;padding:7px 16px;border-radius:40px;font-size:.78rem;
          font-weight:600;cursor:pointer;border-style:solid;font-family:inherit}
        .topbar-back:hover{background:rgba(255,255,255,.18)}
        /* HERO BAR */
        .hero-bar{padding:40px 24px 32px;text-align:center;
          background:linear-gradient(135deg,var(--navy),#1a2d5a)}
        .rol-chip{display:inline-flex;align-items:center;gap:8px;
          background:rgba(245,166,35,.15);border:1px solid rgba(245,166,35,.3);
          color:var(--gold);border-radius:40px;padding:5px 14px;
          font-size:.7rem;font-weight:700;letter-spacing:.1em;
          text-transform:uppercase;margin-bottom:16px}
        .hero-bar h1{font-family:'Unbounded',sans-serif;font-weight:900;
          color:#fff;font-size:clamp(1.6rem,3vw,2.6rem);letter-spacing:-.03em;
          line-height:1.2;margin-bottom:10px}
        .hero-bar h1 span{color:var(--gold)}
        .hero-bar p{color:rgba(255,255,255,.65);font-size:.9rem;line-height:1.7}
        /* TİP SEÇİM (Bireysel / Ticari) */
        .tip-wrap{max-width:780px;margin:0 auto;padding:48px 24px}
        .tip-baslik{text-align:center;font-family:'Unbounded',sans-serif;
          font-weight:900;font-size:1.3rem;margin-bottom:8px;letter-spacing:-.02em}
        .tip-sub{text-align:center;color:var(--mid);font-size:.9rem;margin-bottom:36px}
        .tip-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
        .tip-kart{background:#fff;border:2px solid var(--border);border-radius:20px;
          padding:36px 32px;cursor:pointer;transition:all .2s;text-align:left}
        .tip-kart:hover{border-color:var(--red);transform:translateY(-3px);
          box-shadow:0 12px 36px rgba(232,54,26,.12)}
        .tip-ikon{font-size:2.4rem;margin-bottom:14px}
        .tip-kart h3{font-family:'Unbounded',sans-serif;font-weight:800;
          font-size:1.1rem;margin-bottom:8px;letter-spacing:-.02em}
        .tip-kart p{font-size:.85rem;color:var(--mid);line-height:1.65;margin-bottom:16px}
        .tip-ornekler{display:flex;flex-wrap:wrap;gap:6px}
        .tip-ornek{background:var(--cream);color:var(--mid);
          font-size:.7rem;font-weight:600;padding:3px 10px;border-radius:20px}
        /* KATEGORİ SEÇİM */
        .kat-wrap{max-width:1100px;margin:0 auto;padding:40px 24px 64px}
        .kat-baslik{font-family:'Unbounded',sans-serif;font-weight:900;
          font-size:1.3rem;margin-bottom:6px;letter-spacing:-.02em}
        .kat-sub{color:var(--mid);font-size:.9rem;margin-bottom:32px}
        .kat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
        .kat-kart{background:#fff;border:1.5px solid var(--border);border-radius:16px;
          padding:22px 20px;cursor:pointer;transition:all .2s}
        .kat-kart:hover{border-color:var(--red);transform:translateY(-3px);
          box-shadow:0 10px 28px rgba(232,54,26,.1)}
        .kat-emoji{font-size:1.8rem;margin-bottom:10px}
        .kat-ad{font-weight:700;font-size:.92rem;margin-bottom:4px}
        .kat-aciklama{font-size:.75rem;color:var(--mid);line-height:1.5;margin-bottom:14px}
        .kat-butonlar{display:flex;flex-direction:column;gap:7px}
        .kat-btn-ilanlar{background:var(--navy);color:#fff;border:none;
          padding:9px 0;border-radius:40px;font-weight:700;font-size:.78rem;
          cursor:pointer;font-family:inherit;transition:background .2s;width:100%}
        .kat-btn-ilanlar:hover{background:#1a2d5a}
        .kat-btn-ver{background:transparent;color:var(--red);
          border:1.5px solid var(--red);padding:8px 0;border-radius:40px;
          font-weight:700;font-size:.75rem;cursor:pointer;font-family:inherit;
          transition:all .2s;width:100%}
        .kat-btn-ver:hover{background:var(--red);color:#fff}
        @media(max-width:640px){
          .tip-grid{grid-template-columns:1fr}
          .kat-grid{grid-template-columns:repeat(2,1fr)}
        }
      `}</style>
      <div className="page">
        {/* TOP BAR */}
        <div className="topbar">
          <div className="topbar-logo">
            <span style={{background:"#e8361a",width:28,height:28,borderRadius:7,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:".8rem",color:"#fff",fontWeight:900}}>S</span>
            Swap<span>Hubs</span>
          </div>
          <button className="topbar-back" onClick={geriGit}>← Geri</button>
        </div>
        {/* HERO BAR */}
        <div className="hero-bar">
          <div className="rol-chip">
            {rol === "alan" ? "🙋 Hizmet Almak İstiyorum" : "⚡ Hizmet Vermek İstiyorum"}
          </div>
          <h1>
            {!tip && (rol === "alan"
              ? <>Ne tür <span>hizmet</span> arıyorsunuz?</>
              : <>Ne tür <span>hizmet</span> veriyorsunuz?</>
            )}
            {tip === "bireysel" && (
              rol === "alan"
                ? <>Hangi <span>bireysel</span> hizmeti arıyorsunuz?</>
                : <>Hangi <span>bireysel</span> hizmeti veriyorsunuz?</>
            )}
            {tip === "ticari" && (
              rol === "alan"
                ? <>Hangi <span>ticari</span> sektörde ürün/hizmet arıyorsunuz?</>
                : <>Hangi <span>ticari</span> sektörde hizmet/üretim yapıyorsunuz?</>
            )}
          </h1>
          {!tip && (
            <p>Bireysel veya ticari seçim yapın, kategorinizi belirleyin</p>
          )}
        </div>
        {/* ADIM 1: BİREYSEL / TİCARİ */}
        {!tip && (
          <div className="tip-wrap">
            <div className="tip-baslik">
              {rol === "alan" ? "Ne almak istiyorsunuz?" : "Ne sunmak istiyorsunuz?"}
            </div>
            <div className="tip-sub">
              Bireysel günlük hizmetler veya ticari / endüstriyel ürün & üretim
            </div>
            <div className="tip-grid">
              {/* BİREYSEL */}
              <div className="tip-kart"
                onClick={() => router.push(`/kesfet?rol=${rol}&tip=bireysel`)}>
                <div className="tip-ikon">🙋</div>
                <h3>Bireysel</h3>
                <p>
                  {rol === "alan"
                    ? "Kişisel ihtiyaçlarınız için hizmet, ürün veya kiralama arayın."
                    : "Bireysel olarak hizmet verin, ilan açın, müşteri bulun."}
                </p>
                <div className="tip-ornekler">
                  <span className="tip-ornek">🏨 Otel</span>
                  <span className="tip-ornek">🚗 Araç Kiralama</span>
                  <span className="tip-ornek">🔧 Tamir</span>
                  <span className="tip-ornek">🧹 Temizlik</span>
                  <span className="tip-ornek">🛍️ Ürün Al/Ver</span>
                </div>
              </div>
              {/* TİCARİ */}
              <div className="tip-kart"
                onClick={() => router.push(`/kesfet?rol=${rol}&tip=ticari`)}>
                <div className="tip-ikon">🏭</div>
                <h3>Ticari / Endüstriyel</h3>
                <p>
                  {rol === "alan"
                    ? "Toptan alım, ihracat veya endüstriyel üretim talepleri oluşturun."
                    : "Üretim, ihracat veya toptan hizmet ilanı verin, dünyadan talep alın."}
                </p>
                <div className="tip-ornekler">
                  <span className="tip-ornek">👕 Tekstil</span>
                  <span className="tip-ornek">🪨 Mermer</span>
                  <span className="tip-ornek">⚙️ Metal</span>
                  <span className="tip-ornek">🌾 Gıda</span>
                  <span className="tip-ornek">🚢 Lojistik</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ADIM 2: KATEGORİ */}
        {tip && (
          <div className="kat-wrap">
            <div className="kat-baslik">
              {tip === "bireysel" ? "🙋 Bireysel Kategoriler" : "🏭 Ticari / Endüstriyel Sektörler"}
            </div>
            <div className="kat-sub">
              {rol === "alan"
                ? "Kategori seçin → İlanları görün → Teklif isteyin veya kendi ilanınızı verin"
                : "Kategori seçin → İlanları görün → Teklif verin veya kendi ilanınızı yayınlayın"}
            </div>
            <div className="kat-grid">
              {(tip === "bireysel" ? BIREYSEL_KATEGORILER : TICARI_KATEGORILER).map((kat) => (
                <div key={kat.slug} className="kat-kart">
                  <div className="kat-emoji">{kat.emoji}</div>
                  <div className="kat-ad">{kat.ad}</div>
                  <div className="kat-aciklama">{kat.aciklama}</div>
                  <div className="kat-butonlar">
                    {/* İLANLARI GÖR */}
                    <button className="kat-btn-ilanlar"
                      onClick={() => ilanlarGit(kat.slug)}>
                      {rol === "alan"
                        ? `🔍 ${kat.ad} İlanlarını Gör`
                        : `📋 ${kat.ad} Taleplerini Gör`}
                    </button>
                    {/* İLAN VER */}
                    <button className="kat-btn-ver"
                      onClick={() => ilanVerGit(kat.slug)}>
                      {rol === "alan"
                        ? "➕ İlan Ver — Teklif Bekle"
                        : tip === "ticari"
                          ? "🏭 Üretim İlanı Ver"
                          : "⚡ Hizmet İlanı Ver"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default function KesfetSayfa() {
  return (
    <Suspense>
      <KesfetIcerik />
    </Suspense>
  );
}
