'use client';
import { useState } from 'react';

interface MedyaYukleyiciProps {
  onYuklendi: (url: string) => void;
}

export default function MedyaYukleyici({ onYuklendi }: MedyaYukleyiciProps) {
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');

  // 🚨 Şahin gözlerimle fotoğraftan bulduğum senin özel Cloudinary bilgilerin:
  const CLOUD_NAME = "dluamcnsj"; 
  const UPLOAD_PRESET = "hizmetara_medya"; 

  const dosyaSecildi = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dosya = e.target.files?.[0];
    if (!dosya) return;

    // Maksimum boyut kontrolü (Örn: 100MB) Vercel'i hiç yormadan!
    if (dosya.size > 100 * 1024 * 1024) {
      setHata('Dosya boyutu çok yüksek! Maksimum 100MB yükleyebilirsiniz.');
      return;
    }

    setYukleniyor(true);
    setHata('');

    const formData = new FormData();
    formData.append('file', dosya);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      // Vercel'i atlayıp doğrudan Cloudinary'ye fırlatıyoruz!
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        onYuklendi(data.secure_url); // Yüklenen devasa medyanın bulut linki
      } else {
        setHata(data.error?.message || 'Yükleme sırasında bir hata oluştu.');
      }
    } catch (err) {
      setHata('Siber bağlantı koptu. Lütfen tekrar deneyin.');
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={{ padding: '16px', border: '2px dashed #cbd5e1', borderRadius: '12px', textAlign: 'center', background: '#f8fafc' }}>
      {yukleniyor ? (
        <div style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>
          ⏳ Yüksek Boyutlu Medya Buluta Aktarılıyor... Lütfen Bekleyin.
        </div>
      ) : (
        <>
          <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '32px' }}>📸🎥</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Resim veya Video Ekle</span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Maksimum 100 MB (MP4, JPG, PNG)</span>
            <input 
              type="file" 
              accept="image/*,video/*" 
              onChange={dosyaSecildi} 
              style={{ display: 'none' }} 
            />
          </label>
          {hata && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>⚠️ {hata}</p>}
        </>
      )}
    </div>
  );
}
