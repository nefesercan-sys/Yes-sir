import { NextRequest, NextResponse } from 'next/server';
import { uploadMedia } from '@/lib/cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { rateLimited } from '@/lib/api-guard';

// Giriş yapmamış ziyaretçi (ör. terzi talep formu): yalnızca resim, küçük boyut, IP başına sınırlı sayıda.
// NOT: Sayaçlar bellek içidir (sunucusuz ortamda her örnekte ayrı, lib/api-guard.ts); kalıcı sınır için Upstash/Redis önerilir.
const ANONIM_MAX_RESIM = 8 * 1024 * 1024;
const GIRISLI_MAX_RESIM = 20 * 1024 * 1024;
const MAX_VIDEO = 200 * 1024 * 1024;
const PENCERE_MS = 10 * 60 * 1000;

function icerikTurleUyumlu(b: Buffer, tip: string): boolean {
  const ascii = (a: number, z: number) => b.subarray(a, z).toString('latin1');
  if (tip === 'image/jpeg' || tip === 'image/jpg') return b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
  if (tip === 'image/png') return ascii(1, 4) === 'PNG';
  if (tip === 'image/gif') return ascii(0, 3) === 'GIF';
  if (tip === 'image/webp') return ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP';
  if (tip === 'video/webm') return b.length > 4 && b[0] === 0x1a && b[1] === 0x45 && b[2] === 0xdf && b[3] === 0xa3;
  if (tip === 'video/avi') return ascii(0, 4) === 'RIFF' && ascii(8, 11) === 'AVI';
  if (tip === 'video/mp4' || tip === 'video/quicktime') return ascii(4, 8) === 'ftyp' || ascii(4, 8) === 'moov' || ascii(4, 8) === 'mdat' || ascii(4, 8) === 'wide';
  return false;
}

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    // 1) Önce oturum ve hız sınırı: kimliği/limiti geçmeyen istek için gövde (formData) hiç okunmaz.
    const oturum = await getServerSession(authOptions);
    const girisli = !!oturum?.user?.email;

    if (girisli) {
      if (rateLimited(req, 'upload-girisli', 60, PENCERE_MS)) {
        return NextResponse.json({ error: 'Çok fazla yükleme. Lütfen biraz sonra tekrar deneyin.' }, { status: 429 });
      }
    } else if (rateLimited(req, 'upload-anonim', 10, PENCERE_MS)) {
      return NextResponse.json({ error: 'Çok fazla yükleme. Lütfen biraz sonra tekrar deneyin.' }, { status: 429 });
    }

    // 2) Gövde boyutu ön kontrolü (başlık sahte olabilir; asıl kontrol dosya boyutunda yapılır)
    const tavan = girisli ? MAX_VIDEO : ANONIM_MAX_RESIM;
    const bildirilen = Number(req.headers.get('content-length') || 0);
    if (bildirilen > tavan + 1024 * 1024) {
      return NextResponse.json({ error: 'Dosya çok büyük' }, { status: 413 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
    }

    const isVideo = file.type.startsWith('video/');

    if (!girisli && isVideo) {
      return NextResponse.json({ error: 'Video yüklemek için giriş yapın' }, { status: 401 });
    }

    const maxSize = isVideo ? MAX_VIDEO : girisli ? GIRISLI_MAX_RESIM : ANONIM_MAX_RESIM;

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `Dosya çok büyük. Maksimum: ${isVideo ? '200MB' : girisli ? '20MB' : '8MB'}` },
        { status: 400 }
      );
    }

    const izinliTipler = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
      'video/mp4', 'video/webm', 'video/quicktime', 'video/avi',
    ];

    if (!izinliTipler.includes(file.type)) {
      return NextResponse.json(
        { error: 'Desteklenmeyen dosya tipi' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Dosya içeriği (magic bytes) bildirilen türle uyuşmalı; yalnızca file.type'a güvenilmez.
    if (!icerikTurleUyumlu(buffer, file.type)) {
      return NextResponse.json({ error: 'Dosya içeriği türüyle uyuşmuyor' }, { status: 400 });
    }
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    const klasor = isVideo ? 'hizmetara/videolar' : 'hizmetara/resimler';
    const result = await uploadMedia(base64, klasor);

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      tip: isVideo ? 'video' : 'resim',
      boyut: result.bytes,
      genislik: result.width,
      yukseklik: result.height,
      format: result.format,
    });
  } catch (e) {
    // İç hata ayrıntısı (Cloudinary/ağ mesajı) istemciye verilmez; yalnızca sunucu günlüğüne yazılır.
    console.error('Upload hatası:', e);
    return NextResponse.json({ error: 'Yükleme başarısız. Lütfen tekrar deneyin.' }, { status: 500 });
  }
}
