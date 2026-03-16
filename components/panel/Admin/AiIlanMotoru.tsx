"use client";
import { useState } from "react";

export default function AiIlanMotoru({ tip, onSuccess }: { tip: string, onSuccess: () => void }) {
  const [yukleniyor, setYukleniyor] = useState(false);

  const uret = async () => {
    setYukleniyor(true);
    try {
      // Mevcut API isteği kodun buraya gelecek
      alert(`${tip} ilanlar başarıyla üretildi!`);
      onSuccess();
    } catch (e) {
      console.error(e);
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-purple-200">
      <h3 className="text-lg font-bold text-purple-900 mb-2">🤖 AI İlan Jeneratörü ({tip})</h3>
      <p className="text-sm text-gray-500 mb-4">Bu işlem arka planda yüksek işlem gücü kullanır.</p>
      <button 
        onClick={uret}
        disabled={yukleniyor}
        className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all disabled:opacity-50"
      >
        {yukleniyor ? "⏳ Claude API Düşünüyor..." : "⚡ İlanları Ağa Enjekte Et"}
      </button>
    </div>
  );
}
