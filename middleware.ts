import { NextRequest, NextResponse } from "next/server";

const IS_OBJECTID = /^[0-9a-f]{24}$/i;

export async function middleware(request: NextRequest) {
  const { pathname, searchParams, origin } = request.nextUrl;

  // 1. /ilan/[id] ObjectId yapısını SEO uyumlu slug adresine yönlendirme
  if (pathname.startsWith("/ilan/")) {
    const segment = pathname.split("/")[2];

    if (segment && IS_OBJECTID.test(segment)) {
      try {
        // Hardcoded domain yerine 'origin' kullanılarak localhost, staging ve prod ortamlarda sorunsuz çalışması sağlandı
        const res = await fetch(`${origin}/api/ilanlar?id=${segment}`);
        if (res.ok) {
          const data = await res.json();
          const slug = data?.slug;
          if (slug) {
            return NextResponse.redirect(
              new URL(`/ilan/${slug}`, request.url),
              { status: 301 }
            );
          }
        }
      } catch {
        // Bağlantı hatasında akışı kesme
      }
      return NextResponse.next();
    }
  }

  // 2. /ilanlar Query Parametrelerini temiz URL yapısına (SEO Friendly) dönüştürme
  if (pathname === "/ilanlar") {
    const sektor = searchParams.get("sektor");
    const tip    = searchParams.get("tip");
    const sehir  = searchParams.get("sehir");

    // Şehir ve Sektör seçildiyse
    if (sehir && sektor) {
      const targetUrl = new URL(`/ilanlar/${sehir}/${sektor}`, request.url);
      searchParams.forEach((val, key) => {
        if (key !== "sehir" && key !== "sektor") targetUrl.searchParams.set(key, val);
      });
      return NextResponse.redirect(targetUrl, { status: 301 });
    }

    // Sektör ve Tip seçildiyse
    if (sektor && tip) {
      const targetUrl = new URL(`/ilanlar/turkiye/${sektor}`, request.url);
      searchParams.forEach((val, key) => {
        if (key !== "sektor") targetUrl.searchParams.set(key, val);
      });
      return NextResponse.redirect(targetUrl, { status: 301 });
    }

    // Sadece Sektör seçildiyse
    if (sektor) {
      const targetUrl = new URL(`/ilanlar/turkiye/${sektor}`, request.url);
      searchParams.forEach((val, key) => {
        if (key !== "sektor") targetUrl.searchParams.set(key, val);
      });
      return NextResponse.redirect(targetUrl, { status: 301 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ilan/:path*", "/ilanlar"],
};
