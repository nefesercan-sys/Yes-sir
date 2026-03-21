import { NextRequest, NextResponse } from "next/server";

const IS_OBJECTID = /^[0-9a-f]{24}$/i;
const BASE = "https://www.swaphubs.com";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ── 1. /ilan/:uuid → /ilan/:slug ─────────────────────────
  if (pathname.startsWith("/ilan/")) {
    const segment = pathname.split("/")[2];

    if (segment && IS_OBJECTID.test(segment)) {
      try {
        const res = await fetch(`${BASE}/api/ilanlar/uuid/${segment}`);
        if (res.ok) {
          const { slug } = await res.json();
          if (slug) {
            return NextResponse.redirect(
              new URL(`/ilan/${slug}`, request.url),
              { status: 301 }
            );
          }
        }
      } catch {}
      return NextResponse.redirect(new URL("/404", request.url));
    }
  }

  // ── 2. /ilanlar?sehir=X&sektor=Y → /ilanlar/X/Y ─────────
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
        new URL(`/ilanlar/sektor/${sektor}/${tip}`, request.url),
        { status: 301 }
      );
    }
    if (sektor) {
      return NextResponse.redirect(
        new URL(`/ilanlar/sektor/${sektor}`, request.url),
        { status: 301 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ilan/:path*", "/ilanlar"],
};
