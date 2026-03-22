// ============================================================
// SwapHubs — app/api/ilanlar/[id]/route.ts
// GET  — İlan detayını döner (herkese açık)
// PUT  — İlanı günceller (sadece ilan sahibi)
// DELETE — İlanı siler (sadece ilan sahibi)
// ============================================================
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ─── GET ───────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ilan = await prisma.ilan.findUnique({
      where: { id: params.id },
      include: {
        kullanici: { select: { id: true, name: true, image: true } },
      },
    });
    if (!ilan) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    return NextResponse.json(ilan);
  } catch (err) {
    console.error("GET /api/ilanlar/[id]:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// ─── PUT ───────────────────────────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Giriş yapmanız gerekiyor" }, { status: 401 });
    }

    const mevcut = await prisma.ilan.findUnique({ where: { id: params.id } });
    if (!mevcut) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    if (mevcut.kullaniciId !== session.user.id) {
      return NextResponse.json({ error: "Bu ilanı düzenleme yetkiniz yok" }, { status: 403 });
    }

    const body = await req.json();
    const {
      sektorId, baslik, aciklama, iletisim, adres,
      kategori, formData, medyalar,
      butceMin, butceMax, butceBirimi,
      tip, rol, ulke, sehir,
    } = body;

    if (!baslik?.trim()) return NextResponse.json({ error: "Başlık zorunludur" }, { status: 400 });
    if (!aciklama?.trim()) return NextResponse.json({ error: "Açıklama zorunludur" }, { status: 400 });
    if (!iletisim?.trim()) return NextResponse.json({ error: "İletişim bilgisi zorunludur" }, { status: 400 });

    const guncellenmis = await prisma.ilan.update({
      where: { id: params.id },
      data: {
        sektorId,
        baslik: baslik.trim(),
        aciklama: aciklama.trim(),
        iletisim: iletisim.trim(),
        adres: adres?.trim() || null,
        kategori,
        formData,
        medyalar: medyalar || [],
        butceMin: butceMin || 0,
        butceMax: butceMax || 0,
        butceBirimi: butceBirimi || "₺",
        tip,
        rol,
        ulke,
        sehir,
        // Eğer Prisma şemanızda "guncellenmeTarihi" alanı varsa:
        // guncellenmeTarihi: new Date(),
      },
    });

    return NextResponse.json(guncellenmis);
  } catch (err) {
    console.error("PUT /api/ilanlar/[id]:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// ─── DELETE ────────────────────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Giriş yapmanız gerekiyor" }, { status: 401 });
    }

    const mevcut = await prisma.ilan.findUnique({ where: { id: params.id } });
    if (!mevcut) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    if (mevcut.kullaniciId !== session.user.id) {
      return NextResponse.json({ error: "Bu ilanı silme yetkiniz yok" }, { status: 403 });
    }

    await prisma.ilan.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/ilanlar/[id]:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
