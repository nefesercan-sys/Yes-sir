// app/api/bal/upload-gorsel/route.ts
import { requireAdmin } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME || 'diuamcnej';
const API_KEY = process.env.CLOUDINARY_API_KEY || '';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || '';

async function cloudinaryUpload(file: Buffer, filename: string, mime = 'image/jpeg'): Promise<string> {
  const base64 = file.toString('base64');
  const dataURI = `data:${mime};base64,${base64}`;

  // Signed upload
  const timestamp = Math.round(Date.now() / 1000);
  const str = `folder=bal&public_id=${filename}&timestamp=${timestamp}${API_SECRET}`;
  
  // Use crypto for signature
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  const signedForm = new FormData();
  signedForm.append('file', dataURI);
  signedForm.append('folder', 'bal');
  signedForm.append('public_id', filename);
  signedForm.append('timestamp', timestamp.toString());
  signedForm.append('api_key', API_KEY);
  signedForm.append('signature', signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: signedForm }
  );

  const result = await res.json();
  if (!result.secure_url) throw new Error(result.error?.message || 'Cloudinary yüklemesi başarısız');
  return result.secure_url;
}

const MAX_BOYUT = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  // Yetki ÖNCE (gövde ayrıştırılmadan): yönetici oturumu VEYA x-admin-key başlığı. Anahtar form alanından/URL'den alınmaz.
  const guard = await requireAdmin(req);
  if (guard) return guard;
  try {
    const formData = await req.formData();
    const slug = formData.get('slug');
    const file = formData.get('file');

    if (typeof slug !== 'string' || !/^[a-z0-9-]{1,80}$/.test(slug) || !(file instanceof File)) {
      return NextResponse.json({ error: 'Geçerli slug ve file gerekli' }, { status: 400 });
    }
    if (!file.type.startsWith('image/') || file.size === 0 || file.size > MAX_BOYUT) {
      return NextResponse.json({ error: 'Dosya bir resim olmalı (en fazla 10 MB)' }, { status: 400 });
    }

    const db = await getDb();
    const urun = await db.collection('bal_urunler').findOne({ slug }, { projection: { _id: 1 } });
    if (!urun) return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await cloudinaryUpload(buffer, slug, file.type);

    await db.collection('bal_urunler').updateOne({ slug }, { $set: { gorsel: url } });

    return NextResponse.json({ success: true, url });
  } catch (err) {
    console.error('Bal görseli yükleme hatası:', err); // ayrıntı yalnızca sunucu günlüğünde
    return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 });
  }
}
