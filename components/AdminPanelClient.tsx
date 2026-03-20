"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

// Kategori ve Alt Kategori Verileri (Ekran görüntüsündeki yapıya göre)
const KATEGORILER = [
  { id: "emlak", ad: "Emlak", emoji: "🏠" },
  { id: "vasita", ad: "Vasıta", emoji: "🚗" },
  { id: "yedek-parca", ad: "Yedek Parça", emoji: "⚙️" },
  { id: "ikinci-el", ad: "İkinci El & Sıfır Alışveriş", emoji: "🛍️" },
  { id: "is-makineleri", ad: "İş Makineleri & Sanayi", emoji: "🏗️" },
  { id: "ustalar", ad: "Ustalar & Hizmetler", emoji: "🛠️" },
  { id: "ozel-ders", ad: "Özel Ders Verenler", emoji: "📚" },
  { id: "is-ilanlari", ad: "İş İlanları", emoji: "💼" },
  { id: "yardimci-arayanlar", ad: "Yardımcı Arayanlar", emoji: "🤝" },
  { id: "hayvanlar-alemi", ad: "Hayvanlar Alemi", emoji: "🐾" },
];

const SEHIRLER = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya"];

export default function AdminPanelClient() {
  const t = useTranslations('Admin');
  const [activeTab, setActiveTab] = useState("ilanlar");
  const [seciliKategori, setSeciliKategori] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar / Yan Menü */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 space-y-4">
        <h2 className="text-xl font-bold text-blue-600 mb-8">SwapHubs Admin</h2>
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab("ilanlar")}
            className={`w-full text-left p-3 rounded-lg transition ${activeTab === "ilanlar" ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}`}
          >
            📋 {t('manageAds') || 'İlan Yönetimi'}
          </button>
          <button 
            onClick={() => setActiveTab("kategoriler")}
            className={`w-full text-left p-3 rounded-lg transition ${activeTab === "kategoriler" ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}`}
          >
            📁 {t('categories') || 'Kategoriler'}
          </button>
          <button 
            onClick={() => setActiveTab("ayarlar")}
            className={`w-full text-left p-3 rounded-lg transition ${activeTab === "ayarlar" ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}`}
          >
            ⚙️ {t('settings') || 'Sistem Ayarları'}
          </button>
        </nav>
      </aside>

      {/* Ana İçerik Alanı */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === "ilanlar" && "İlanları Yönet"}
            {activeTab === "kategoriler" && "Kategori Yapılandırması"}
            {activeTab === "ayarlar" && "Genel Ayarlar"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Hoş geldin, Admin</span>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        {/* İlan Filtreleme ve Liste (Ekran görüntündeki mantık) */}
        {activeTab === "ilanlar" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <select 
                className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSeciliKategori(e.target.value)}
              >
                <option value="">Tüm Kategoriler</option>
                {KATEGORILER.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.emoji} {cat.ad}</option>
                ))}
              </select>
              
              <select className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tüm Şehirler</option>
                {SEHIRLER.map(sehir => (
                  <option key={sehir} value={sehir}>{sehir}</option>
                ))}
              </select>

              <button className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
                Filtrele
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-4 font-semibold text-gray-600">İlan Başlığı</th>
                    <th className="p-4 font-semibold text-gray-600">Kategori</th>
                    <th className="p-4 font-semibold text-gray-600">Durum</th>
                    <th className="p-4 font-semibold text-gray-600">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="p-4">iPhone 15 Pro Max Takaslı</td>
                    <td className="p-4 text-sm text-gray-500">İkinci El</td>
                    <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Aktif</span></td>
                    <td className="p-4 flex gap-2">
                      <button className="text-blue-600 hover:underline text-sm">Düzenle</button>
                      <button className="text-red-600 hover:underline text-sm">Sil</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
