import { NextRequest, NextResponse } from "next/server";

const IS_OBJECTID = /^[0-9a-f]{24}$/i;

export async function middleware(request: NextRequest) {
  const { pathname, searchParams, origin } = request.nextUrl;

  // 1. /ilan/[id] ObjectId yapısını SEO uyumlu slug adresine yönlendirme
  if (pathname.startsWith("/ilan/")) {
    const segment = pathname.split("/")[2];

    if (segment && IS_OBJECTID.test(segment)) {
      try {
        // Dinamik origin sayesinde Localhost ve Prod ortamlarında hatasız çalışır
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
        // API yanıt vermezse site çökmesin, standart akışa devam etsin
      }
      return NextResponse.next();
    }
  }

  // 2. /ilanlar Query Parametrelerini temiz URL yapısına dönüştürme (SEO Friendly)
  if (pathname === "/ilanlar") {
    const sektor = searchParams.get("sektor");
    const tip    = searchParams.get("tip");
    const sehir  = searchParams.get("sehir");

    let targetPath = null;
    const keysToRemove = []; // URL'den çıkarılıp path'e eklenecek anahtarlar

    if (sehir && sektor) {
      targetPath = `/ilanlar/${sehir}/${sektor}`;
      keysToRemove.push("sehir", "sektor");
    } 
    else if (sektor && tip) {
      targetPath = `/ilanlar/turkiye/${sektor}/${tip}`;
      keysToRemove.push("sektor", "tip");
    } 
    else if (sektor) {
      targetPath = `/ilanlar/turkiye/${sektor}`;
      keysToRemove.push("sektor");
    }

    if (targetPath) {
      const targetUrl = new URL(targetPath, request.url);
      
      // Filtreleme (fiyat, sıralama) veya sayfalama (page) gibi ekstra parametreleri yeni adrese taşı
      searchParams.forEach((val, key) => {
        if (!keysToRemove.includes(key)) {
          targetUrl.searchParams.set(key, val);
        }
      });
      
      return NextResponse.redirect(targetUrl, { status: 301 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ilan/:path*", "/ilanlar"],
};
