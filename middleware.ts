import { NextRequest, NextResponse } from "next/server";

// Kaldırılan ilan / programatik sayfalar: 404 yerine 410 (kalıcı silindi).
const GONE_PREFIXES = ["/ulke/", "/turkiye/", "/meslek/", "/sektor/", "/ilanlar/", "/ilan/"];

// URL'den dili çıkar → kök layout <html lang> değerini SUNUCU HTML'inde doğru verir
// (botlar JS çalıştırmadan ham HTML'i okur).
function langFromPath(pathname: string): "tr" | "en" | "ru" | "de" {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  if (pathname.startsWith("/online-tailor-service")) return "en";
  return "tr";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Kaldırılan sayfalar → 410 Gone
  if (pathname === "/ilanlar" || GONE_PREFIXES.some((p) => pathname.startsWith(p))) {
    return new NextResponse("Gone", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex",
      },
    });
  }

  // 2. Dil başlığı (kök layout okur)
  const headers = new Headers(request.headers);
  headers.set("x-lang", langFromPath(pathname));
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // statik dosyalar, _next ve api hariç tüm sayfalar
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
