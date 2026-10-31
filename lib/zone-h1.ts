// Bölge sayfası H1 alternatifleri (slug'a göre deterministik seçilir; sayfalar birbirinin kopyası olmasın).
type F = (z: string) => string;
export const ZONE_H1: Record<string, F[]> = {
  es: [(z) => `Arreglos de ropa en hoteles de ${z}`, (z) => `Su sastre a domicilio en ${z}`],
  fr: [(z) => `Retouches de vêtements pour hôtels à ${z}`, (z) => `Votre tailleur à l’hôtel : ${z}`],
  pl: [(z) => `Poprawki ubrań dla hoteli w ${z}`, (z) => `Twój krawiec w hotelu: ${z}`],
  uk: [(z) => `Підгонка одягу для готелів: ${z}`, (z) => `Ваш кравець у готелі: ${z}`],
  nl: [(z) => `Kledingaanpassing voor hotels in ${z}`, (z) => `Uw kleermaker aan het hotel in ${z}`],
  ar: [(z) => `تعديل الملابس لفنادق ${z}`, (z) => `خيّاطك في الفندق: ${z}`],
};
export const zoneH1Index = (slug: string) => [...slug].reduce((a, c) => a + c.charCodeAt(0), 0) % 3;
