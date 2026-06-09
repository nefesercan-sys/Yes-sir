export interface BalSiparis {
  _id?: string;
  urunId: string;
  urunAd: string;
  miktar: number;
  adSoyad: string;
  telefon: string;
  adres: string;
  sehir: string;
  notlar?: string;
  durum: 'bekliyor' | 'onaylandi' | 'kargolandi' | 'teslim';
  toplamFiyat: number;
  createdAt: Date;
}
