export function waLink(telefon: string, mesaj: string): string {
  return `https://wa.me/${telefon}?text=${encodeURIComponent(mesaj)}`;
}

export function formatFiyat(fiyat: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(fiyat);
}

export function stokLabel(stok: string): string {
  const map: Record<string, string> = {
    var: '✅ Stokta Var',
    yok: '❌ Tükendi',
    rezervasyon: '📋 Rezervasyon',
  };
  return map[stok] ?? stok;
}
