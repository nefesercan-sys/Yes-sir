import { NextRequest } from 'next/server';
import { sifirlamaIstegi } from '@/lib/password-reset';

export async function POST(req: NextRequest) {
  const govde = await req.json().catch(() => null);
  return sifirlamaIstegi(req, govde);
}
