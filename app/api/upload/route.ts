import { NextRequest, NextResponse } from 'next/server';
import { uploadMedia } from '@/lib/cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Giriş yapmamış ziyaretçi (ör. terzi talep formu): yalnızca resim, küçük boyut, IP başına sınırlı sayıda.
// NOT: Bellekteki sayaç sunucusuz ortamda her örnekte ayrıdır; kalıcı sınır için Upstash/Redis kullanın.
const ANONIM_MAX_RESIM = 8 * 1024 * 1024;
const ANONIM_LIMIT = 10;            // 10 dakikada en fazla 10 yükleme
const PENCERE_MS = 10 * 60 * 1000;
const sayac = new Map<string, number[]>();
function limitAsildi(ip: string) {
  const simdi = Date.now();
  const liste = (sayac.get(ip) || []).filter((t) => simdi - t < PENCERE_MS);
  liste.push(simdi);
  sayac.set(ip, liste);
  if (sayac.size > 5000) sayac.clear();
  return liste.length > ANONIM_LIMIT;
}

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
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
    }

    const oturum = await getServerSession(authOptions);
    const girisli = !!oturum?.user?.email;
    const isVideo = file.type.startsWith('video/');

    if (!girisli) {
      if (isVideo) {
        return NextResponse.json({ error: 'Video yüklemek için giriş yapın' }, { status: 401 });
      }
      const ip = (req.headers.get('x-forwarded-for') || 'bilinmiyor').split(',')[0].trim();
      if (limitAsildi(ip)) {
        return NextResponse.json({ error: 'Çok fazla yükleme. Lütfen biraz sonra tekrar deneyin.' }, { status: 429 });
      }
    }

    const MAX_RESIM = girisli ? 20 * 1024 * 1024 : ANONIM_MAX_RESIM;
    const MAX_VIDEO = 200 * 1024 * 1024;
    const maxSize = isVideo ? MAX_VIDEO : MAX_RESIM;

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
  } catch (e: any) {
    console.error('Upload hatası:', e);
    return NextResponse.json({ error: 'Yükleme başarısız: ' + e.message }, { status: 500 });
  }
}
 
