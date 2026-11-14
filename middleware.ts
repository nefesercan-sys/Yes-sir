import { NextRequest, NextResponse } from "next/server";
import { G_PREFIX, gAnySlugToLang } from "@/lib/guzellik-slugs";

// Kaldırılan programatik sayfalar: 404 yerine 410 (kalıcı silindi).
const GONE_PREFIXES = ["/ulke/", "/turkiye/", "/meslek/", "/sektor/"];
// Silinen statik bölümler (hesaplama araçları, Antalya rehberi, Riviera rehberi): 404 yerine 410.
const GONE_SECTIONS = ["/hesapla", "/antalya-rehberi", "/riviera-guide", "/terzi/kuru-temizleme-antalya"];

// URL'den dili çıkar → kök layout <html lang> değerini SUNUCU HTML'inde doğru verir
// (botlar JS çalıştırmadan ham HTML'i okur).
type Lang = "tr" | "en" | "ru" | "de" | "es" | "fr" | "pl" | "uk" | "nl" | "ar";
function langFromPath(pathname: string): Lang {
  if (pathname.startsWith(G_PREFIX + "/")) return (gAnySlugToLang(pathname.slice(G_PREFIX.length + 1).replace(/\/$/, "")) ?? "tr") as Lang;
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  const m = pathname.match(/^\/(es|fr|pl|uk|nl|ar)(\/|$)/);
  if (m) return m[1] as Lang;
  if (pathname.startsWith("/online-tailor-service")) return "en";
  return "tr";
}

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // 0. Kaldırılan sayfalar → 410 Gone
  if (
    GONE_PREFIXES.some((p) => pathname.startsWith(p)) ||
    GONE_SECTIONS.some((p) => pathname === p || pathname.startsWith(p + "/"))
  ) {
    return new NextResponse("Gone", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex",
      },
    });
  }

  // 3. Dil başlığı (kök layout okur)
  const headers = new Headers(request.headers);
  headers.set("x-lang", langFromPath(pathname));
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // statik dosyalar, _next ve api hariç tüm sayfalar
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
