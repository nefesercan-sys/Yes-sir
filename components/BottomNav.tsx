"use client";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const NAV_ITEMS = [
  { icon: "🏠", label: "Ana Sayfa", href: "/" },
  { icon: "🔍", label: "Keşfet", href: "/ilanlar" },
  { icon: "➕", label: "İlan Ver", href: "/ilan-ver", primary: true },
  { icon: "💬", label: "Mesajlar", href: "/mesajlar" },
  { icon: "👤", label: "Profilim", href: "/panel" },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();

  return (
    <>
      <style>{`
        .bnav {
          position: fixed; bottom: 0; left: 0; right: 0; height: 64px;
          background: #0d1b3e; display: flex; align-items: stretch;
          z-index: 9999; box-shadow: 0 -4px 20px rgba(0,0,0,.3);
          border-top: 1px solid rgba(255,255,255,.08);
        }
        .bnav-item {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 3px;
          cursor: pointer; border: none; background: transparent;
          color: rgba(255,255,255,.45); font-family: inherit;
          font-size: .58rem; font-weight: 700; transition: .18s;
          position: relative; padding: 0; text-transform: uppercase;
          letter-spacing: .03em;
        }
        .bnav-item:hover { color: rgba(255,255,255,.8); }
        .bnav-item.active { color: #f5a623; }
        .bnav-item.active::after {
          content: ''; position: absolute; top: 0; left: 15%; right: 15%;
          height: 2px; background: #f5a623; border-radius: 0 0 4px 4px;
        }
        .bnav-icon { font-size: 1.2rem; line-height: 1; }
        .bnav-primary {
          background: #e8361a !important; color: #fff !important;
          margin: 8px 5px; border-radius: 12px !important;
          height: calc(100% - 16px); flex: 1.2;
          box-shadow: 0 4px 14px rgba(232,54,26,.4);
        }
        .bnav-primary .bnav-icon { font-size: 1.3rem; }
        @media (min-width: 768px) { .bnav { display: none; } }
        .bnav-spacer { height: 64px; display: block; }
        @media (min-width: 768px) { .bnav-spacer { display: none; } }
      `}</style>

      <nav className="bnav" aria-label="Alt navigasyon">
        {NAV_ITEMS.map(item => (
          <button
            key={item.href}
            className={`bnav-item ${(item as any).primary ? "bnav-primary" : ""} ${pathname === item.href ? "active" : ""}`}
            onClick={() => {
              if (item.href === "/ilan-ver" && status !== "authenticated") {
                router.push("/giris");
              } else if (item.href === "/panel" && status !== "authenticated") {
                router.push("/giris");
              } else {
                router.push(item.href);
              }
            }}
          >
            <span className="bnav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="bnav-spacer" />
    </>
  );
}
