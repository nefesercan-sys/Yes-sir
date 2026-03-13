"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import TeklifModal from "@/components/TeklifModal";
import TalepModal  from "@/components/TalepModal";

interface IlanDetay {
  _id: string;
  baslik: string;
  aciklama: string;
  kategori: string;
  tip: "bireysel" | "ticari";
  rol: "alan" | "veren";
  yapay?: boolean;
  sehir: string;
  ulke?: string;
  butceMin: number;
  butceMax: number;
  resimUrl?: string;
  teklifSayisi: number;
  ozellikler?: string[];
  teslimat?: string[];
  createdAt: string;
}

const fmt = (n: number) => new Intl.NumberFormat("tr-TR").format(n);

function IlanDetayIcerik() {
  const { id }       = useParams();
  const searchParams = useSearchParams();
  const router       = useRouter();
  const action       = searchParams.get("action");

  const [ilan,        setIlan]        = useState<IlanDetay | null>(null);
  const [yukleniyor,  setYukleniyor]  = useState(true);
  const [teklifModal, setTeklifModal] = useState(action === "teklif");
  const [talepModal,  setTalepModal]  = useState(action === "talep");

  useEffect(() => {
    fetch(`/api/ilanlar/${id}`)
      .then(r => r.json())
      .then(d => setIlan(d.ilan ?? null))
      .catch(() => {})
      .finally(() => setYukleniyor(false));
  }, [id]);

  if (yukleniyor) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"60vh",
      fontFamily:"'Plus Jakarta Sans',sans-serif",color:"#aaa"}}>
      ⏳ Yükleniyor...
    </div>
  );

  if (!ilan) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"60vh",
      fontFamily:"'Plus Jakarta Sans',sans-serif",color:"#aaa"}}>
      İlan bulunamadı.
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Unbounded:wght@700;900&display=swap');
        :root{--ink:#080811;--cream:#f7f5f0;--red:#e8361a;--gold:#f5a623;
          --navy:#0d1b3e;--mid:#4a4860;--border:#e4e1db;--green:#18a558}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:var(--cream);color:var(--ink)}

        .topbar{background:var(--navy);padding:14px 24px;
          display:flex;align-items:center;justify-content:space-between;gap:12px}
        .topbar-logo{font-family:'Unbounded',sans-serif;font-weight:900;color:#fff;
          font-size:1rem;display:flex;align-items:center;gap:8px}
        .topbar-logo .icon{background:var(--red);width:26px;height:26px;border-radius:6px;
          display:flex;align-items:center;justify-content:center;font-size:.75rem;color:#fff;font-weight:900}
        .topbar-logo span{color:var(--red)}
        .topbar-back{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);
          color:#fff;padding:6px 14px;border-radius:40px;font-size:.75rem;font-weight:600;
          cursor:pointer;font-family:inherit}

        .detay-wrap{max-width:900px;margin:0 auto;padding:40px 24px}
        .detay-grid{display:grid;grid-template-columns:1fr 360px;gap:28px;align-items:start}

        .detay-resim{width:100%;height:300px;border-radius:16px;overflow:hidden;
          background:linear-gradient(135deg,#e8e6e0,#d4d1ca);
          display:flex;align-items:center;justify-content:center;font-size:5rem;
          margin-bottom:24px;position:relative}
        .detay-resim img{width:100%;height:100%;object-fit:cover}
        .detay-tr{position:absolute;top:12px;left:12px;background:rgba(232,54,26,.9);
          color:#fff;font-size:.7rem;font-weight:700;padding:4px 12px;border-radius:20px}

        .detay-kat{font-size:.72rem;font-weight:700;letter-spacing:.08em;
          text-transform:uppercase;color:var(--red);background:rgba(232,54,26,.08);
          padding:3px 10px;border-radius:20px;display:inline-block;margin-bottom:12px}
        .detay-baslik{font-family:'Unbounded',sans-serif;font-weight:900;
          font-size:clamp(1.4rem,2.5vw,2rem);letter-spacing:-.03em;
          line-height:1.2;margin-bottom:14px}
        .detay-meta{display:flex;gap:14px;flex-wrap:wrap;font-size:.8rem;
          color:var(--mid);margin-bottom:18px}
        .detay-aciklama{font-size:.92rem;line-height:1.8;color:#333;margin-bottom:24px}

        .ozellikler{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
        .ozellik{background:#fff;border:1.5px solid var(--border);border-radius:20px;
          padding:5px 14px;font-size:.75rem;font-weight:600;color:var(--mid)}

        /* SIDEBAR */
        .sidebar{background:#fff;border-radius:20px;border:1.5px solid var(--border);
          padding:24px;position:sticky;top:24px}
        .sidebar-fiyat{font-family:'Unbounded',sans-serif;font-weight:900;
          font-size:1.6rem;color:var(--ink);margin-bottom:6px}
        .sidebar-fiyat-lbl{font-size:.72rem;color:var(--mid);margin-bottom:20px}

        .sidebar-btn{width:100%;border:none;padding:14px;border-radius:40px;
          font-weight:700;font-size:.92rem;cursor:pointer;font-family:inherit;
          margin-bottom:10px;transition:background .2s;display:flex;
          align-items:center;justify-content:center;gap:8px}
        .btn-teklif{background:var(--red);color:#fff}
        .btn-teklif:hover{background:#c42d14}
        .btn-talep{background:var(--navy);color:#fff}
        .btn-talep:hover{background:#1a2d5a}
        .btn-whatsapp{background:#25d366;color:#fff}
        .btn-whatsapp:hover{background:#1da851}

        .sidebar-bilgi{font-size:.75rem;color:var(--mid);text-align:center;
          line-height:1.6;padding-top:14px;border-top:1px solid var(--border);margin-top:4px}

        @media(max-width:768px){
          .detay-grid{grid-template-columns:1fr}
          .sidebar{position:static}
        }
      `}</style>

      <div className="topbar">
        <div className="topbar-logo">
          <div className="icon">S</div>
          Swap<span>Hubs</span>
        </div>
        <button className="topbar-back" onClick={() => router.back()}>← Geri</button>
      </div>

      <div className="detay-wrap">
        <div className="detay-grid">
          {/* SOL */}
          <div>
            <div className="detay-resim">
              {ilan.resimUrl
                ? <img src={ilan.resimUrl} alt={ilan.baslik} />
                : <span>{ilan.tip === "ticari" ? "🏭" : "📋"}</span>
              }
              {ilan.tip === "ticari" && <span className="detay-tr">🇹🇷 Türkiye Üretimi</span>}
            </div>

            <div className="detay-kat">{ilan.kategori}</div>
            <h1 className="detay-baslik">{ilan.baslik}</h1>

            <div className="detay-meta">
              <span>📍 {ilan.sehir}{ilan.ulke && ilan.ulke !== "Türkiye" ? `, ${ilan.ulke}` : ""}</span>
              <span>📅 {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}</span>
              {ilan.teklifSayisi > 0 && <span>💬 {ilan.teklifSayisi} teklif</span>}
            </div>

            <p className="detay-aciklama">{ilan.aciklama}</p>

            {ilan.ozellikler && ilan.ozellikler.length > 0 && (
              <div className="ozellikler">
                {ilan.ozellikler.map((o, i) => (
                  <span key={i} className="ozellik">✓ {o}</span>
                ))}
              </div>
            )}
          </div>

          {/* SAĞ — SIDEBAR */}
          <div className="sidebar">
            <div className="sidebar-fiyat">
              ₺{fmt(ilan.butceMin)} – {fmt(ilan.butceMax)}
            </div>
            <div className="sidebar-fiyat-lbl">
              {ilan.tip === "ticari" ? "Tahmini fiyat aralığı" : "Bütçe aralığı"}
            </div>

            {/* İLAN TALEP ise → Teklif Ver */}
            {ilan.rol === "alan" && (
              <button className="sidebar-btn btn-teklif"
                onClick={() => setTeklifModal(true)}>
                ⚡ Teklif Ver
              </button>
            )}

            {/* İLAN HİZMET VEREN ise → Teklif İste / Talep Oluştur */}
            {ilan.rol === "veren" && (
              <button className="sidebar-btn btn-talep"
                onClick={() => setTalepModal(true)}>
                📩 {ilan.tip === "ticari" ? "Teklif Almak İstiyorum" : "Teklif İste"}
              </button>
            )}

            <button className="sidebar-btn btn-whatsapp"
              onClick={() => window.open("https://wa.me/90XXXXXXXXXX", "_blank")}>
              💬 WhatsApp ile Sor
            </button>

            <div className="sidebar-bilgi">
              🔒 Bilgileriniz gizlidir.<br />
              {ilan.rol === "veren" && ilan.tip === "ticari"
                ? "Talebiniz doğrudan tedarikçiye iletilir."
                : "En uygun teklifi seçme hakkı sizdedir."}
            </div>
          </div>
        </div>
      </div>

      {/* MODALLER */}
      {teklifModal && (
        <TeklifModal
          ilanId={ilan._id}
          ilanBaslik={ilan.baslik}
          ilanTip={ilan.tip}
          onKapat={() => setTeklifModal(false)}
        />
      )}
      {talepModal && (
        <TalepModal
          ilanId={ilan._id}
          ilanBaslik={ilan.baslik}
          ilanTip={ilan.tip}
          onKapat={() => setTalepModal(false)}
        />
      )}
    </>
  );
}

export default function IlanDetaySayfa() {
  return <Suspense><IlanDetayIcerik /></Suspense>;
}
