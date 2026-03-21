const TR: Record<string, string> = {
  ş: "s", Ş: "s", ğ: "g", Ğ: "g",
  ü: "u", Ü: "u", ö: "o", Ö: "o",
  ı: "i", İ: "i", ç: "c", Ç: "c",
};

export function slugify(text: string): string {
  return text
    .split("").map((c) => TR[c] ?? c).join("")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

export function generateIlanSlug(
  baslik: string,
  sehir: string,
  sektor: string
): string {
  return slugify(`${baslik} ${sehir} ${sektor}`);
}

export async function generateUniqueSlug(
  baslik: string,
  sehir: string,
  sektor: string,
  checkExists: (slug: string) => Promise<boolean>
): Promise<string> {
  const base = generateIlanSlug(baslik, sehir, sektor);
  let slug = base;
  let i = 1;
  while (await checkExists(slug)) {
    slug = `${base}-${i++}`;
  }
  return slug;
}
