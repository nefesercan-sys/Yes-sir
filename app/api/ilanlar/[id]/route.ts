import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ilan = await prisma.ilan.findUnique({
      where: { id: params.id },
      include: { kullanici: { select: { id: true, name: true, image: true } } },
    });
    if (!ilan) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    return NextResponse.json(ilan);
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Giriş yapmanız gerekiyor" }, { status: 401 });

    const sessionUserId = (session.user as any).id as string;
    const mevcutIlan = await prisma.ilan.findUnique({ where: { id: params.id } });
    if (!mevcutIlan) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    if (mevcutIlan.kullaniciId !== sessionUserId) return NextResponse.json({ error: "Bu ilanı düzenleme yetkiniz yok" }, { status: 403 });

    const body = await req.json();
    if (!body.baslik?.trim()) return NextResponse.json({ error: "Başlık zorunludur" }, { status: 400 });
    if (!body.aciklama?.trim()) return NextResponse.json({ error: "Açıklama zorunludur" }, { status: 400 });
    if (!body.iletisim?.trim()) return NextResponse.json({ error: "İletişim bilgisi zorunludur" }, { status: 400 });

    const guncellenmisIlan = await prisma.ilan.update({
      where: { id: params.id },
      data: {
        sektorId: body.sektorId,
        baslik: body.baslik.trim(),
        aciklama: body.aciklama.trim(),
        iletisim: body.iletisim.trim(),
        adres: body.adres?.trim() || null,
        kategori: body.kategori,
        formData: body.formData,
        medyalar: body.medyalar || [],
        butceMin: body.butceMin || 0,
        butceMax: body.butceMax || 0,
        butceBirimi: body.butceBirimi || "₺",
        tip: body.tip,
        rol: body.rol,
        ulke: body.ulke,
        sehir: body.sehir,
      },
    });
    return NextResponse.json(guncellenmisIlan);
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Giriş yapmanız gerekiyor" }, { status: 401 });

    const sessionUserId = (session.user as any).id as string;
    const mevcutIlan = await prisma.ilan.findUnique({ where: { id: params.id } });
    if (!mevcutIlan) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    if (mevcutIlan.kullaniciId !== sessionUserId) return NextResponse.json({ error: "Bu ilanı silme yetkiniz yok" }, { status: 403 });

    await prisma.ilan.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
