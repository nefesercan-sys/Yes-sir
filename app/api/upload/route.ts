import { NextRequest, NextResponse } from 'next/server';
import { uploadMedia } from '@/lib/cloudinary';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'Dosya yok' }, { status: 400 });

    const isVideo = file.type.startsWith('video/');
    const MAX = isVideo ? 200 * 1024 * 1024 : 20 * 1024 * 1024;
    if (file.size > MAX) return NextResponse.json({ error: `Maks: ${isVideo ? '200MB' : '20MB'}` }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const base64 = `data:${file.type};base64,${Buffer.from(bytes).toString('base64')}`;
    const result = await uploadMedia(base64, isVideo ? 'hizmetara/video' : 'hizmetara/resim');

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
