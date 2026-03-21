// middleware.ts — SwapHubs
// Eski query param URL'leri → Yeni temiz URL'lere yönlendir

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/ilanlar") {
    const sektor = searchParams.get("sektor");
    const tip    = searchParams.get("tip");
    const sehir  = searchParams.get("sehir");

    // /ilanlar?sehir=istanbul&sektor=turizm → /ilanlar/istanbul/turizm
    if (sehir && sektor) {
      return NextResponse.redirect(
        new URL(`/ilanlar/${sehir}/${sektor}`, request.url),
        { status: 301 }
      );
    }

    // /ilanlar?sektor=turizm&tip=ticari → /ilanlar/sektor/turizm/ticari
    if (sektor && tip) {
      return NextResponse.redirect(
        new URL(`/ilanlar/sektor/${sektor}/${tip}`, request.url),
        { status: 301 }
      );
    }

    // /ilanlar?sektor=turizm → /ilanlar/sektor/turizm
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
  matcher: ["/ilanlar"],
};
