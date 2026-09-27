import { NextRequest, NextResponse } from "next/server";

const IS_OBJECTID = /^[0-9a-f]{24}$/i;
const TARGET_DOMAIN = "https://terzihizmeti.com.tr";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname, searchParams } = request.nextUrl;

  // 1. Domain Yönlendirmesi: swaphubs.com -> terzihizmeti.com.tr (301 Permanent)
  if (host.includes("swaphubs.com")) {
    const redirectUrl = new URL(pathname + request.nextUrl.search, TARGET_DOMAIN);
    return NextResponse.redirect(redirectUrl, { status: 301 });
  }

  // 2. Dinamik İlan / Sayfa Yönlendirmeleri
  if (pathname.startsWith("/ilan/")) {
    const segment = pathname.split("/")[2];

    if (segment && IS_OBJECTID.test(segment)) {
      try {
        const res = await fetch(`${TARGET_DOMAIN}/api/ilanlar?id=${segment}`);
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
      } catch {}
      return NextResponse.next();
    }
  }

  if (pathname === "/ilanlar") {
    const sektor = searchParams.get("sektor");
    const tip    = searchParams.get("tip");
    const sehir  = searchParams.get("sehir");

    if (sehir && sektor) {
      return NextResponse.redirect(
        new URL(`/ilanlar/${sehir}/${sektor}`, request.url),
        { status: 301 }
      );
    }
    if (sektor && tip) {
      const url = new URL(`/ilanlar/turkiye/${sektor}`, request.url);
      url.searchParams.set("tip", tip);
      return NextResponse.redirect(url, { status: 301 });
    }
    if (sektor) {
      return NextResponse.redirect(
        new URL(`/ilanlar/turkiye/${sektor}`, request.url),
        { status: 301 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  // Statik dosyalar hariç tüm istekleri yakalar (301 yönlendirmesinin her sayfada aktif olması için)
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
