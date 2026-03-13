"use client";
// Hizmet verenin, bir talep ilanına teklif göndermesi

import { useState } from "react";

const S: React.CSSProperties = {
  display:"block",fontSize:".73rem",fontWeight:700,color:"#6b6984",marginBottom:6
};
const I: React.CSSProperties = {
  width:"100%",border:"1.5px solid #e4e1db",borderRadius:10,
  padding:"10px 14px",fontSize:".87rem",fontFamily:"inherit",
  outline:"none",color:"#080811",background:"#faf9f7"
};

export default function TeklifModal({ ilanId, ilanBaslik, ilanTip, onKapat }: {
  ilanId: string;
  ilanBaslik: string;
  ilanTip: "bireysel" | "ticari";
  onKapat: () => void;
}) {
  const [form, setForm] = useState({
    ad:"", email:"", telefon:"", sirket:"",
    fiyat:"", aciklama:"", teslimSuresi:"",
  });
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [gonderildi,   setGonderildi]   = useState(false);
  const [hata,         setHata]         = useState("");

  const setF = (k: string, v: string) => setForm(p => ({ ...p, [k]:v }));

  const gonder = async () => {
    if (!form.ad || !form.email || !form.fiyat) {
      setHata("Ad, e-posta ve fiyat zorunludur."); return;
    }
    setGonderiliyor(true); setHata("");
    try {
      const r = await fetch("/api/teklif/ver", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ilanId, ilanBaslik, ...form }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.mesaj);
      setGonderildi(true);
    } catch (e: unknown) {
      setHata(e instanceof Error ? e.message : "Hata oluştu.");
    } finally {
      setGonderiliyor(false);
    }
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",
      zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:520,
        maxHeight:"90vh",overflow:"auto",boxShadow:"0 24px 64px rgba(0,0,0,.2)"}}>

        <div style={{padding:"18px 24px",borderBottom:"1px solid #e4e1db",
          display:"flex",justifyContent:"space-between",alignItems:"center",
          position:"sticky",top:0,background:"#fff"}}>
          <div>
            <div style={{fontWeight:800,fontSize:".95rem"}}>⚡ Teklif Ver</div>
            <div style={{fontSize:".72rem",color:"#6b6984",marginTop:2}}>{ilanBaslik}</div>
          </div>
          <button onClick={onKapat}
            style={{background:"none",border:"none",fontSize:"1.4rem",cursor:"pointer",opacity:.5}}>
            ✕
          </button>
        </div>

        {gonderildi ? (
          <div style={{padding:"48px 32px",textAlign:"center"}}>
            <div style={{fontSize:"3rem",marginBottom:14}}>✅</div>
            <h3 style={{fontFamily:"'Unbounded',sans-serif",fontWeight:900,
              fontSize:"1.1rem",marginBottom:10}}>Teklifiniz Gönderildi!</h3>
            <p style={{color:"#6b6984",fontSize:".88rem",lineHeight:1.7,marginBottom:24}}>
              İlan sahibi teklifinizi inceleyecek ve size dönüş yapacak.
            </p>
            <button onClick={onKapat}
              style={{background:"#0d1b3e",color:"#fff",border:"none",
                padding:"12px 32px",borderRadius:40,fontWeight:700,cursor:"pointer"}}>
              Tamam
            </button>
          </div>
        ) : (
          <div style={{padding:"24px"}}>
            {hata && (
              <div style={{background:"#fff3f0",border:"1px solid #f5c4bc",color:"#c0200a",
                borderRadius:10,padding:"10px 14px",fontSize:".83rem",marginBottom:14}}>
                {hata}
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                <label style={S}>Ad Soyad *</label>
                <input value={form.ad} onChange={e => setF("ad",e.target.value)}
                  placeholder="Adınız" style={I} />
              </div>
              {ilanTip === "ticari" && (
                <div>
                  <label style={S}>Firma Adı</label>
                  <input value={form.sirket} onChange={e => setF("sirket",e.target.value)}
                    placeholder="Firma adı" style={I} />
                </div>
              )}
              <div>
                <label style={S}>E-posta *</label>
                <input type="email" value={form.email}
                  onChange={e => setF("email",e.target.value)}
                  placeholder="email@domain.com" style={I} />
              </div>
              <div>
                <label style={S}>Telefon</label>
                <input value={form.telefon} onChange={e => setF("telefon",e.target.value)}
                  placeholder="+90 5xx xxx xx xx" style={I} />
              </div>
              <div>
                <label style={S}>
                  {ilanTip === "ticari" ? "Birim Fiyat / Toplam Teklif *" : "Teklif Fiyatı (₺) *"}
                </label>
                <input value={form.fiyat} onChange={e => setF("fiyat",e.target.value)}
                  placeholder={ilanTip === "ticari" ? "örn: 5.50 USD/kg" : "örn: 2500"} style={I} />
              </div>
              <div>
                <label style={S}>Teslim Süresi</label>
                <input value={form.teslimSuresi} onChange={e => setF("teslimSuresi",e.target.value)}
                  placeholder={ilanTip === "ticari" ? "örn: 30 gün" : "örn: 2 gün"} style={I} />
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <label style={S}>Teklif Detayı / Hizmet Açıklaması</label>
                <textarea rows={3} value={form.aciklama}
                  onChange={e => setF("aciklama",e.target.value)}
                  placeholder="Neler dahil, ne sunuyorsunuz..."
                  style={{...I,resize:"vertical"}} />
              </div>
            </div>
            <div style={{marginTop:18,display:"flex",gap:10}}>
              <button onClick={gonder} disabled={gonderiliyor}
                style={{flex:1,background:"#e8361a",color:"#fff",border:"none",
                  padding:"14px",borderRadius:40,fontWeight:700,fontSize:".9rem",
                  cursor:gonderiliyor?"not-allowed":"pointer",
                  opacity:gonderiliyor?.6:1,fontFamily:"inherit"}}>
                {gonderiliyor ? "⏳ Gönderiliyor..." : "⚡ Teklif Gönder"}
              </button>
              <button onClick={onKapat}
                style={{background:"#f2f1ef",color:"#4a4860",border:"none",
                  padding:"14px 20px",borderRadius:40,fontWeight:600,cursor:"pointer"}}>
                İptal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
