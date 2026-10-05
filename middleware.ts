import { NextRequest, NextResponse } from "next/server";

const IS_OBJECTID = /^[0-9a-f]{24}$/i;

// Kaldırılan programatik sayfalar: 404 yerine 410 (kalıcı silindi).
// NOT: /ilan/ ve /ilanlar/ listede YOK — üyelerin ilanları çalışmaya devam ediyor.
const GONE_PREFIXES = ["/ulke/", "/turkiye/", "/meslek/", "/sektor/"];

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
  const { pathname, searchParams, origin } = request.nextUrl;

  // 0. Kaldırılan sayfalar → 410 Gone
  if (GONE_PREFIXES.some((p) => pathname.startsWith(p))) {
    return new NextResponse("Gone", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex",
      },
    });
  }

  // 1. /ilan/[id] ObjectId → SEO uyumlu slug adresine 301
  if (pathname.startsWith("/ilan/")) {
    const segment = pathname.split("/")[2];
    if (segment && IS_OBJECTID.test(segment)) {
      try {
        const res = await fetch(`${origin}/api/ilanlar?id=${segment}`);
        if (res.ok) {
          const data = await res.json();
          const slug = data?.slug;
          if (slug) {
            return NextResponse.redirect(new URL(`/ilan/${slug}`, request.url), { status: 301 });
          }
        }
      } catch {
        // API yanıt vermezse site çökmesin
      }
    }
  }

  // 2. /ilanlar query parametrelerini temiz URL'ye çevir
  if (pathname === "/ilanlar") {
    const sektor = searchParams.get("sektor");
    const sehir = searchParams.get("sehir");
    let targetPath: string | null = null;
    const keysToRemove: string[] = [];
    if (sehir && sektor) {
      targetPath = `/ilanlar/${sehir}/${sektor}`;
      keysToRemove.push("sehir", "sektor");
    } else if (sektor) {
      targetPath = `/ilanlar/turkiye/${sektor}`;
      keysToRemove.push("sektor");
    }
    if (targetPath) {
      const targetUrl = new URL(targetPath, request.url);
      searchParams.forEach((val, key) => {
        if (!keysToRemove.includes(key)) targetUrl.searchParams.set(key, val);
      });
      return NextResponse.redirect(targetUrl, { status: 301 });
    }
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
