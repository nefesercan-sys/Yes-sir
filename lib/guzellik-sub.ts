// Can Beauty Studio — hizmet ve bölge alt sayfaları (tr/en/de/ru). Slug tabloları lib/guzellik-slugs.ts, metinler lib/guzellik-sub-data/*.json.
// Kurallar: fiyat yok, salon adı yok, tıbbi iddia yok; ev/otel hizmeti için 'var' de 'yok' de denmez.
import trData from './guzellik-sub-data/tr.json';
import enData from './guzellik-sub-data/en.json';
import deData from './guzellik-sub-data/de.json';
import ruData from './guzellik-sub-data/ru.json';
import {
  G_DST_SLUG, G_PREFIX, G_SUB_DST_IDS, G_SUB_LANGS, G_SUB_SVC_IDS, G_SVC_SLUG,
  gSubFromSlug, type GSubDstId, type GSubKind, type GSubLang, type GSubSvcId,
} from './guzellik-slugs';
import { G_SITE } from './guzellik';

export type SubUi = {
  svcLinksH: string; dstLinksH: string; mainLink: string; allDst: string;
  waSvc: string; waDst: string; rule: string; faqH: string; langH: string;
};
export type SubSvc = {
  title: string; desc: string; h1: string; crumb: string; name: string; lead: string;
  fitH: string; fit: string[]; expectH: string; expect: string[]; faq: [string, string][];
};
export type SubDst = {
  name: string; title: string; desc: string; h1: string; crumb: string; lead: string;
  whoH: string; who: string; popH: string; pop: string[]; faq: [string, string][];
};
type SubData = { ui: SubUi; svc: Record<GSubSvcId, SubSvc>; dst: Record<GSubDstId, SubDst> };

export const SUB: Record<GSubLang, SubData> = {
  tr: trData as unknown as SubData,
  en: enData as unknown as SubData,
  de: deData as unknown as SubData,
  ru: ruData as unknown as SubData,
};

export const subPath = (k: GSubKind): string =>
  `${G_PREFIX}/${k.kind === 'svc' ? G_SVC_SLUG[k.lang][k.id] : G_DST_SLUG[k.lang][k.id]}`;
export const subAbs = (k: GSubKind): string => `${G_SITE}${subPath(k)}`;

/** Tüm alt sayfa slug'ları (generateStaticParams). */
export function allSubSlugs(): string[] {
  const out: string[] = [];
  for (const l of G_SUB_LANGS) {
    for (const id of G_SUB_SVC_IDS) out.push(G_SVC_SLUG[l][id]);
    for (const id of G_SUB_DST_IDS) out.push(G_DST_SLUG[l][id]);
  }
  return out;
}

/** Aynı sayfanın dört dildeki karşılıkları (hreflang grubu). */
export function subAlternates(k: GSubKind): Record<string, string> {
  const m: Record<string, string> = {};
  for (const l of G_SUB_LANGS) m[l] = subAbs({ ...k, lang: l } as GSubKind);
  m['x-default'] = m.en;
  return m;
}

export { gSubFromSlug };
