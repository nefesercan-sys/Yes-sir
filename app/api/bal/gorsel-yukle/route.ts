import { requireAdmin } from '@/lib/admin-auth';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME, // eski CLOUD_NAME adına geriye dönük düşer
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const guard = await requireAdmin(req);
  if (guard) return guard;
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'Dosya yok' }, { status: 400 });
    if (!file.type.startsWith('image/') || file.size === 0 || file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Dosya bir resim olmalı (en fazla 10 MB)' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'swaphubs/bal', transformation: [{ width: 800, height: 800, crop: 'fill', quality: 'auto' }] },
        (error, result) => { if (error) reject(error); else resolve(result); }
      ).end(buffer);
    });

    return NextResponse.json({ url: (result as any).secure_url });
  } catch (err) {
    console.error('Bal görseli yükleme hatası:', err);
    return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 });
  }
}
