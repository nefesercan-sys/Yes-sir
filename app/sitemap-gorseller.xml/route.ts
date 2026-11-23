// Görsel site haritası (Google image sitemap): her görsel, göründüğü sayfa ve sayfa dilinde başlık/açıklamayla.
// Görseller yapay zekâ ile üretilmiş örnek görsellerdir; başlıklarda "örnek görsel" etiketi korunur.
import { GORSELLER, gorselMetin, ALT_EK, ORNEK_ETIKET, type GorselAnahtar } from '@/lib/ornek-gorseller';

const SITE = 'https://swaphubs.com';
const SAYFA: Partial<Record<GorselAnahtar, string>> = {"paca-kisaltma": "/terzi/paca-kisaltma-antalya", "fermuar-degisimi": "/terzi/fermuar-degisimi", "dikis-makinesi": "/terzi/dikis-atolyesi-antalya", "bel-daraltma-manken": "/antalya-terzi-elbise-dikimi", "gelinlik-abiye": "/terzi", "keten-kadin-evde": "/dogal-keten-pamuk-giyim", "keten-blazer-atolye": "/dogal-keten-pamuk-giyim", "keten-erkek-gomlek": "/dogal-keten-pamuk-giyim", "keten-pantolon-katli": "/terzi/kot-pantolon-paca-kisaltma-antalya", "erkek-gomlek-atolye": "/terzi/yelek-tamiri-tadilati-antalya", "kadin-trenckot-atolye": "/terzi/kot-ceket-mont-tadilati-antalya", "erkek-palto-atolye": "/terzi/kaban-palto-tadilati-antalya", "sef-mutfak-uniforma": "/terzi/uniforma-uretimi-antalya", "uniforma": "/terzi/uniforma-uretimi-antalya", "atolye-kesim-masasi": "/terzi/dikis-atolyesi-antalya", "abiye-elbise-atolye": "/antalya-terzi-elbise-dikimi", "abiye-askida": "/antalyada-terzi-dikim-tamirat-utu-hizmetleri", "erkek-takim-olcu": "/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti", "manken-palto-takim": "/terzi/kaban-palto-tadilati-antalya", "manken-bej-ceket": "/terzi/bayan-terzi-antalya", "pilili-etek": "/terzi/kot-etek-kisaltma-daraltma-antalya", "beyaz-gomlek-katli": "/terzi/bay-terzi-antalya", "sweatshirt-katli": "/tekstil-antalya", "yun-pantolon-metre": "/terzi/kot-pantolon-daraltma-antalya", "palto-yaka-detay": "/terzi/deri-ceket-tadilati-antalya", "polar-yelek": "/terzi/yelek-tamiri-tadilati-antalya", "eve-gelen-terzi": "/konyaalti-terzi-adrese-gelen-servis", "bez-canta-atolye": "/tekstil-antalya", "hazir-giyim-atolye": "/tekstil-antalya"};
const EK: [string, string, string][] = [["/images/terzi/antalya-terzi-tamir-tadilat.jpg", "/terzi", "Antalya terzi tamir ve tadilat"], ["/images/terzi/antalya-bay-terzi-takim-elbise.jpg", "/terzi", "Antalya bay terzi, takım elbise dikim ve tadilat"], ["/images/terzi/antalya-terzi-gelinlik-abiye-tadilati.jpg", "/terzi", "Antalya terzi gelinlik ve abiye tadilatı"], ["/images/terzi/antalya-terzi-dikis-atolyesi.jpg", "/terzi", "Antalya terzi dikiş atölyesi"], ["/images/elbise-dikimi/antalya-terzi-elbise-takim-ozel-dikim.jpg", "/antalya-terzi-elbise-dikimi", "Antalya terzi elbise ve takım özel dikim"], ["/images/elbise-dikimi/antalya-terzi-elbise-dikimi-atolye.jpg", "/antalya-terzi-elbise-dikimi", "Antalya terzi elbise dikimi"], ["/images/elbise-dikimi/antalya-terzi-yazlik-elbise-dikimi.jpg", "/antalya-terzi-elbise-dikimi", "Antalya terzi yazlık elbise dikimi"], ["/images/elbise-dikimi/antalya-terzi-kruvaze-elbise-dikimi.jpg", "/antalya-terzi-elbise-dikimi", "Antalya terzi kruvaze elbise dikimi"], ["/images/elbise-dikimi/antalya-terzi-tulum-ozel-dikim.jpg", "/antalya-terzi-elbise-dikimi", "Antalya terzi tulum özel dikim"]];
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const dynamic = 'force-static';

export function GET() {
  const bySayfa = new Map<string, string[]>();
  const ekle = (sayfa: string, xml: string) => { if (!bySayfa.has(sayfa)) bySayfa.set(sayfa, []); bySayfa.get(sayfa)!.push(xml); };
  for (const [k, sayfa] of Object.entries(SAYFA) as [GorselAnahtar, string][]) {
    const g = GORSELLER[k]; if (!g) continue;
    const m = gorselMetin(k, 'tr');
    ekle(sayfa, `<image:image><image:loc>${SITE}${g.src}</image:loc><image:title>${esc(m.baslik)}</image:title><image:caption>${esc(`${m.aciklama} ${ALT_EK.tr} (${ORNEK_ETIKET.tr})`)}</image:caption></image:image>`);
  }
  for (const [src, sayfa, baslik] of EK) ekle(sayfa, `<image:image><image:loc>${SITE}${src}</image:loc><image:title>${esc(baslik)}</image:title></image:image>`);
  const body = [...bySayfa].map(([sayfa, imgs]) => `<url><loc>${SITE}${sayfa}</loc>${imgs.join('')}</url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
