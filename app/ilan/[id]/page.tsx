import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import IlanDetayClient from './IlanDetayClient';
import { SEKTOR_MAP } from '@/lib/sektorler';

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const db = await getDb();
    const ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(params.id) });
    if (!ilan) return { title: 'İlan Bulunamadı' };
    const sektor = SEKTOR_MAP[ilan.sektorId];
    return {
      title: `${ilan.baslik} | HizmetAra`,
      description: `${sektor?.ad || ''} - ${ilan.formData?.sehir || ''} - ${ilan.butceMin ? ilan.butceMin.toLocaleString() + ilan.butceBirimi : 'Bütçe müzakere edilebilir'}`,
    };
  } catch { return { title: 'İlan | HizmetAra' }; }
}

export default async function IlanDetayPage({ params }: Props) {
  try {
    const db = await getDb();
    const ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(params.id) });
    if (!ilan) notFound();

    const teklifler = await db.collection('teklifler')
      .find({ ilanId: new ObjectId(params.id) })
      .sort({ teklifFiyat: 1 })
      .limit(50)
      .toArray();

    await db.collection('ilanlar').updateOne({ _id: new ObjectId(params.id) }, { $inc: { goruntulenme: 1 } });

    return (
      <IlanDetayClient
        ilan={JSON.parse(JSON.stringify(ilan))}
        teklifler={JSON.parse(JSON.stringify(teklifler))}
      />
    );
  } catch { notFound(); }
}
