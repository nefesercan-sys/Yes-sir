"use client";
// Müşterinin, bir hizmet/ürün ilanından teklif istemesi
// Ticari ilanlarda → senin paneline gelir

import { useState } from "react";

const S: React.CSSProperties = {
  display:"block",fontSize:".73rem",fontWeight:700,color:"#6b6984",marginBottom:6
};
const I: React.CSSProperties = {
  width:"100%",border:"1.5px solid #e4e1db",borderRadius:10,
  padding:"10px 14px",fontSize:".87rem",fontFamily:"inherit",
  outline:"none",color:"#080811",background:"#faf9f7"
};

const ULKELER = [
  "Türkiye","ABD","Almanya","İngiltere","Fransa","İtalya","Hollanda",
  "Belçika","Polonya","BAE","Suudi Arabistan","Katar","Mısır","Nijerya",
  "Güney Afrika","Hindistan","Çin","Japonya","Güney Kore","Avustralya",
  "Brezilya","Kanada","Diğer"
];

export default function TalepModal({ ilanId, ilanBaslik, ilanTip, onKapat }: {
  ilanId: string;
  ilanBaslik: string;
  ilanTip: "bireysel" | "ticari";
  onKapat: () => void;
}) {
  const [form, setForm] = useState({
    ad:"", email:"", telefon:"", sirket:"",
    ulke:"Almanya", miktar:"", birim:"Adet", mesaj:"",
  });
  const [dosyalar,     setDosyalar]     = useState<File[]>([]);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [gonderildi,   setGonderildi]   = useState(false);
  const [hata,         setHata]         = useState("");

  const setF = (k: string, v: string) => setForm(p => ({ ...p, [k]:v }));

  const gonder = async () => {
    if (!form.ad || !form.email || !form.mesaj) {
      setHata("Ad, e-posta ve mesaj zorunludur."); return;
    }
    setGonderiliyor(true); setHata("");
    try {
      const fd = new FormData();
      Object.entries({ ilanId, ilanBaslik, ...form }).forEach(([k,v]) => fd.append(k, v));
      dosyalar.forEach(f => fd.append("dosyalar", f));
      const r = await fetch("/api/mesaj/gonder", { method:"POST", body:fd });
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
      <div style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:560,
        maxHeight:"90vh",overflow:"auto",boxShadow:"0 24px 64px rgba(0,0,0,.2)"}}>

        <div style={{padding:"18px 24px",borderBottom:"1px solid #e4e1db",
          display:"flex",justifyContent:"space-between",alignItems:"center",
          position:"sticky",top:0,background:"#fff"}}>
          <div>
            <div style={{fontWeight:800,fontSize:".95rem"}}>
              📩 {ilanTip === "ticari" ? "Teklif Almak İstiyorum" : "Teklif İste"}
            </div>
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
              fontSize:"1.1rem",marginBottom:10}}>Talebiniz Alındı!</h3>
            <p style={{color:"#6b6984",fontSize:".88rem",lineHeight:1.7,marginBottom:8}}>
              {ilanTip === "ticari"
                ? "Talebiniz tedarikçiye iletildi. En kısa sürede fiyat teklifi ve detaylı bilgi sunulacak."
                : "Hizmet sağlayıcı en kısa sürede size dönüş yapacak."}
            </p>
            <p style={{color:"#18a558",fontSize:".8rem",marginBottom:24}}>
              📧 {form.email} adresinize bilgilendirme gönderildi.
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

            {ilanTip === "ticari" && (
              <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:10,
                padding:"10px 14px",fontSize:".82rem",color:"#1e40af",marginBottom:16,lineHeight:1.6}}>
                🏭 Bu ticari bir üretim/ihracat ilanıdır. Talebiniz doğrudan
                tedarikçiye iletilecek, fiyat teklifi ve üretim detayları size sunulacaktır.
              </div>
            )}

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                <label style={S}>Ad Soyad *</label>
                <input value={form.ad} onChange={e => setF("ad",e.target.value)}
                  placeholder="John Smith" style={I} />
              </div>
              {ilanTip === "ticari" && (
                <div>
                  <label style={S}>Şirket Adı</label>
                  <input value={form.sirket} onChange={e => setF("sirket",e.target.value)}
                    placeholder="ABC Trading Ltd." style={I} />
                </div>
              )}
              <div>
                <label style={S}>E-posta *</label>
                <input type="email" value={form.email}
                  onChange={e => setF("email",e.target.value)}
                  placeholder="info@firma.com" style={I} />
              </div>
              <div>
                <label style={S}>Telefon / WhatsApp</label>
                <input value={form.telefon} onChange={e => setF("telefon",e.target.value)}
                  placeholder="+49 xxx xxx xxxx" style={I} />
              </div>
              {ilanTip === "ticari" && (
                <div>
                  <label style={S}>Ülkeniz</label>
                  <select value={form.ulke} onChange={e => setF("ulke",e.target.value)} style={I}>
                    {ULKELER.map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
              )}
              {ilanTip === "ticari" && (
                <div style={{display:"flex",gap:8}}>
                  <div style={{flex:1}}>
                    <label style={S}>Miktar</label>
                    <input value={form.miktar} onChange={e => setF("miktar",e.target.value)}
                      placeholder="500" style={I} />
                  </div>
                  <div style={{width:90}}>
                    <label style={S}>Birim</label>
                    <select value={form.birim} onChange={e => setF("birim",e.target.value)} style={I}>
                      {["Adet","Kg","Ton","m²","m³","Konteyner","Palet"].map(b =>
                        <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              )}
              <div style={{gridColumn:"1/-1"}}>
                <label style={S}>
                  {ilanTip === "ticari"
                    ? "Talep Detayları * (ürün özellikleri, hedef piyasa, teslimat şekli...)"
                    : "Mesajınız *"}
                </label>
                <textarea rows={4} value={form.mesaj}
                  onChange={e => setF("mesaj",e.target.value)}
                  placeholder={ilanTip === "ticari"
                    ? "Hangi ürünü, ne kadar, nereye teslim, hangi özelliklerde istiyorsunuz?"
                    : "İhtiyacınızı açıklayın..."}
                  style={{...I,resize:"vertical"}} />
              </div>
              {ilanTip === "ticari" && (
                <div style={{gridColumn:"1/-1"}}>
                  <label style={S}>Teknik Çizim / Numune / Döküman (isteğe bağlı)</label>
                  <input type="file" multiple
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.dwg,.xlsx"
                    onChange={e => setDosyalar(Array.from(e.target.files ?? []))}
                    style={{...I,padding:"8px 14px",cursor:"pointer"}} />
                  {dosyalar.length > 0 && (
                    <div style={{fontSize:".72rem",color:"#18a558",marginTop:6}}>
                      ✅ {dosyalar.length} dosya: {dosyalar.map(f => f.name).join(", ")}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{marginTop:18,display:"flex",gap:10}}>
              <button onClick={gonder} disabled={gonderiliyor}
                style={{flex:1,background:"#0d1b3e",color:"#fff",border:"none",
                  padding:"14px",borderRadius:40,fontWeight:700,fontSize:".9rem",
                  cursor:gonderiliyor?"not-allowed":"pointer",
                  opacity:gonderiliyor?.6:1,fontFamily:"inherit"}}>
                {gonderiliyor ? "⏳ Gönderiliyor..." : "📩 Teklif Talebi Gönder"}
              </button>
              <button onClick={onKapat}
                style={{background:"#f2f1ef",color:"#4a4860",border:"none",
                  padding:"14px 20px",borderRadius:40,fontWeight:600,cursor:"pointer"}}>
                İptal
              </button>
            </div>
            <p style={{fontSize:".68rem",color:"#aaa",textAlign:"center",marginTop:12}}>
              🔒 Bilgileriniz gizlidir. Spam göndermeyiz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
