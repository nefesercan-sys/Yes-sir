// app/api/bal/upload-gorsel/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'diuamcnej';
const API_KEY = process.env.CLOUDINARY_API_KEY || '';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || '';

async function cloudinaryUpload(file: Buffer, filename: string): Promise<string> {
  const base64 = file.toString('base64');
  const dataURI = `data:image/jpeg;base64,${base64}`;

  const formData = new FormData();
  formData.append('file', dataURI);
  formData.append('upload_preset', 'unsigned_bal');
  formData.append('folder', 'bal');
  formData.append('public_id', filename);

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
  if (!result.secure_url) throw new Error(result.error?.message || 'Upload failed');
  return result.secure_url;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const slug = formData.get('slug') as string;
    const file = formData.get('file') as File;
    const secret = formData.get('secret') as string;

    if (secret !== 'arimbalim2024') {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
    }

    if (!slug || !file) {
      return NextResponse.json({ error: 'slug ve file gerekli' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await cloudinaryUpload(buffer, slug);

    const db = await getDb();
    await db.collection('bal_urunler').updateOne(
      { slug },
      { $set: { gorsel: url } }
    );

    return NextResponse.json({ success: true, url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
