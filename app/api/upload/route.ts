import { NextRequest, NextResponse } from 'next/server';
import { uploadMedia } from '@/lib/cloudinary';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
    }

    const isVideo = file.type.startsWith('video/');
    const MAX_RESIM = 20 * 1024 * 1024;
    const MAX_VIDEO = 200 * 1024 * 1024;
    const maxSize = isVideo ? MAX_VIDEO : MAX_RESIM;

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `Dosya çok büyük. Maksimum: ${isVideo ? '200MB' : '20MB'}` },
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
