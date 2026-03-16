"use client";

export default function PanelSidebar({ aktifTab, setAktifTab, isAdmin }: any) {
  const menuler = [
    { id: "ozet", label: "Özet", icon: "📊" },
    { id: "ilanlarim", label: "İlanlarım", icon: "📋" },
    { id: "mesajlar", label: "Mesajlar", icon: "💬" },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4 shrink-0">
      <div className="space-y-1">
        {menuler.map((m) => (
          <button
            key={m.id}
            onClick={() => setAktifTab(m.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-semibold transition-colors ${
              aktifTab === m.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>{m.icon}</span> {m.label}
          </button>
        ))}
        
        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase px-3 mb-2">Admin Araçları</p>
            <button
              onClick={() => setAktifTab("ai_ilan_ticari")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-semibold transition-colors ${
                aktifTab === "ai_ilan_ticari" ? "bg-purple-600 text-white" : "text-purple-600 hover:bg-purple-50"
              }`}
            >
              <span>🏭</span> AI B2B Motoru
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
