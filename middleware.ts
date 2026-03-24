import { NextRequest, NextResponse } from "next/server";

const IS_OBJECTID = /^[0-9a-f]{24}$/i;
const BASE = "https://www.swaphubs.com";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith("/ilan/")) {
    const segment = pathname.split("/")[2];

    if (segment && IS_OBJECTID.test(segment)) {
      try {
        const res = await fetch(`${BASE}/api/ilanlar?id=${segment}`);
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
      // slug bulunamazsa 404'e gitme, olduğu yerde kal
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
      return NextResponse.redirect(
        new URL(`/ilanlar/turkiye/${sektor}/${tip}`, request.url),
        { status: 301 }
      );
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
  matcher: ["/ilan/:path*", "/ilanlar"],
};
