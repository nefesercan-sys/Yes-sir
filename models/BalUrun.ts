export interface BalUrun {
  _id?: string;
  slug: string;
  ad: string;
  kategori: 'bal' | 'polen' | 'propolis' | 'set' | 'koy-urun' | 'ot';
  fiyat: number;
  birim: string;
  stok: 'var' | 'yok' | 'rezervasyon';
  aciklama: string;
  icerik: string[];
  gorsel: string;
  aktif: boolean;
  createdAt: Date;
  updatedAt: Date;
}
