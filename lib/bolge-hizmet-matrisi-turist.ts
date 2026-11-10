// ============================================================
// lib/bolge-hizmet-matrisi-turist.ts — ES / FR / PL / UK / NL / AR otel bölgesi sayfaları için
// "hangi işleri yapıyoruz" bölümü, ek sorgu kalıplı SSS ve bölgeye göre başlık havuzu
// (TR: lib/bolge-hizmet-matrisi.ts, EN/RU/DE: lib/bolge-hizmet-matrisi-i18n.ts).
// Kurallar: yalnızca sahibin doğruladığı işler/fiyatlar (lib/facts.ts); düğme, astar, yelek, tulum, dikim fiyatı "fotoğrafa göre";
// kazak ve hırkada astar değişimi yok; gelinlikte yalnızca tadilat; otele/eve alım-teslim (ücretsiz denmez); aynı gün, acil 1–2 saat.
// PL/UK'te yer adı çekimi yapılmaz (iki nokta kalıpları): bölge adı her zaman yalın hâlde geçer.
// NOT: es/fr/pl/uk/nl/ar metinleri anadili konuşan biri tarafından gözden geçirilmelidir.
// ============================================================
import { hashStr } from '@/lib/seo-angles';
// Turist başlangıç fiyatları (€; terzihizmeti.com.tr lib/facts.ts ile aynı)
const EUR = { hem: 10, waist: 10, sleeve: 10, zipperPants: 15, zipperCoat: 20, leather: 20 } as const;
const eurFrom = (k: keyof typeof EUR) => EUR[k];
import type { ILang } from '@/lib/intl';
import { zoneData, isZone } from '@/lib/intl-zones';
import { HOTEL_NOTE } from '@/lib/business';

export interface MatrisGroup { id: string; heading: string; text: string }
export interface Matris { title: string; lead: string; groups: MatrisGroup[]; price: string }
type G = { id: string; ops: string[]; heads: ((n: string) => string)[]; intro: (n: string, o: string) => string };
type Pack = { titles: ((n: string) => string)[]; leads: ((n: string) => string)[]; price: (n: string) => string; groups: G[]; faq: { id: string; f: (n: string) => [string, string] }[]; seo: ((n: string) => string)[] };
const e = (k: Parameters<typeof eurFrom>[0]) => '€' + eurFrom(k);

const PACKS: Record<ILang, Pack> = {
  es: {
    titles: [(n) => `Precios de sastre en ${n} y qué arreglos hacemos`, (n) => `Arreglos de ropa en ${n}: qué se puede hacer y cuánto cuesta`],
    leads: [
      (n) => `Antes de pedir precio en ${n}, vea qué se puede hacer en cada prenda y desde qué importe. La lista está abajo; con una foto le damos el precio exacto y recogemos la prenda en su hotel.`,
      (n) => `Acortar y estrechar desde €10, cremalleras desde €15 y piel desde €20 (IVA no incluido). Abajo tiene los arreglos para huéspedes de ${n}, ordenados por prenda.`,
    ],
    price: (n) => `Resumen de precios para ${n}: bajos, cintura, mangas y largo desde ${e('hem')}, cremalleras desde ${e('zipperPants')} (abrigos y chaquetas ${e('zipperCoat')}), piel desde ${e('leather')}; IVA no incluido. Lo que no aparece en la lista se presupuesta por foto.`,
    groups: [
      { id: 'pantolon', ops: ['acortar bajos de pantalón', 'estrechar la cintura', 'estrechar las piernas', 'ensanchar la cintura', 'acortar vaqueros manteniendo el bajo original', 'cambiar y reparar cremalleras de pantalón', 'cambiar botones', 'reparar rotos y descosidos'], heads: [(n) => `¿Cuánto cuesta acortar o estrechar un pantalón en ${n}?`, (n) => `Pantalón o vaquero largo o ancho en ${n}`], intro: (n, o) => `Lo que más nos piden en pantalones y vaqueros en ${n}: ${o}. Bajos y cintura desde ${e('hem')}.` },
      { id: 'etek-elbise', ops: ['acortar faldas', 'estrechar la cintura de faldas', 'acortar vestidos', 'estrechar vestidos', 'ajustar la longitud de los tirantes', 'cambiar cremalleras de vestido', 'cambiar forros', 'arreglar vestidos de fiesta y de novia (solo arreglos)', 'confección de vestidos a medida'], heads: [(n) => `Largo, cintura y tirantes de vestidos y faldas en ${n}`, (n) => `¿Cómo se presupuesta el arreglo de un vestido en ${n}?`], intro: (n, o) => `Qué hacemos en vestidos, faldas y ropa de fiesta en ${n}: ${o}. Los vestidos de novia se arreglan, no se confeccionan.` },
      { id: 'ust-giyim', ops: ['acortar mangas de chaquetas y abrigos', 'acortar el largo', 'entallar', 'arreglar abrigos y parkas', 'cambiar cremalleras de chaquetas y abrigos', 'cambiar forros', 'cambiar botones', 'reparar rotos y descosidos', 'arreglar chaquetas de piel'], heads: [(n) => `Mangas, largo y cremallera de chaquetas y abrigos en ${n}`, (n) => `¿Cuánto cuesta arreglar un abrigo o una chaqueta en ${n}?`], intro: (n, o) => `Qué hacemos en chaquetas, abrigos y parkas en ${n}: ${o}. Los trabajos normales están listos el mismo día y los urgentes en 1–2 horas.` },
      { id: 'gomlek-bluz', ops: ['entallar y acortar camisas', 'entallar blusas', 'acortar y entallar camisetas', 'acortar mangas', 'cambiar botones', 'coser descosidos', 'camisas y blusas a medida'], heads: [(n) => `Camisa o blusa demasiado ancha en ${n}`, (n) => `¿Cuánto cuesta entallar una camisa en ${n}?`], intro: (n, o) => `Qué hacemos en camisas, blusas y camisetas en ${n}: ${o}. Entallar desde ${e('waist')}.` },
      { id: 'yelek-tulum', ops: ['arreglar chalecos', 'acortar y entallar monos', 'ajustar bajos y cintura de pantalones de chándal', 'acortar pantalones cortos', 'chalecos, monos y chándales a medida', 'cambiar cremalleras', 'reparar rotos y descosidos'], heads: [(n) => `Chalecos, monos, chándales y pantalones cortos en ${n}`, (n) => `Bajo del chándal y largo del pantalón corto en ${n}`], intro: (n, o) => `Qué hacemos en chalecos, monos, chándales y pantalones cortos en ${n}: ${o}. El precio se indica según la foto.` },
      { id: 'fermuar-dugme', ops: ['cambiar cremalleras en pantalones, abrigos, chaquetas y bolsos (con y sin cremallera)', 'reparar cremalleras atascadas', 'cambiar botones', 'cambiar forros (excepto en jerséis y chaquetas de punto)', 'reparar rotos y descosidos'], heads: [(n) => `¿Cuánto cuesta cambiar una cremallera en ${n}?`, (n) => `Cremallera rota, botón perdido o forro roto en ${n}`], intro: (n, o) => `Qué hacemos con cremalleras, botones y forros en ${n}: ${o}. Cambiar una cremallera cuesta desde ${e('zipperPants')}.` },
      { id: 'deri', ops: ['cambiar el cuello de chaquetas de piel', 'acortar mangas de chaquetas de piel', 'acortar el largo de chaquetas de piel', 'entallar chaquetas de piel', 'estrechar la cintura de pantalones de piel', 'acortar pantalones de piel', 'cambiar cremalleras de pantalones de piel', 'arreglar chalecos de piel'], heads: [(n) => `¿Cuánto cuesta arreglar una chaqueta o un pantalón de piel en ${n}?`, (n) => `Mangas, largo, cuello y cremallera en prendas de piel en ${n}`], intro: (n, o) => `Qué hacemos en piel en ${n}: ${o}. Desde ${e('leather')}; no todo es posible en cada prenda, así que primero miramos la foto.` },
      { id: 'kot', ops: ['acortar bajos de vaqueros', 'acortar vaqueros manteniendo el bajo original', 'estrechar la cintura de vaqueros', 'estrechar piernas de vaqueros', 'acortar mangas y largo de chaquetas vaqueras', 'entallar chaquetas vaqueras', 'acortar y entallar abrigos vaqueros', 'acortar faldas vaqueras y estrechar la cintura', 'acortar pantalones cortos vaqueros', 'cambiar cremalleras y botones de vaqueros', 'reparar rotos en vaqueros'], heads: [(n) => `¿Cuánto cuesta acortar unos vaqueros con el bajo original en ${n}?`, (n) => `Chaquetas, faldas y pantalones cortos vaqueros en ${n}`], intro: (n, o) => `Qué hacemos en prendas vaqueras en ${n}: ${o}. Desde ${e('hem')}; el bajo puede conservar su aspecto original.` },
    ],
    faq: [
      { id: 'paca', f: (n) => [`¿Qué cuesta acortar un pantalón en ${n}?`, `Desde ${e('hem')}, IVA no incluido. Envíe una foto por WhatsApp y le decimos el precio exacto. Los trabajos normales están listos el mismo día y los urgentes en 1–2 horas.`] },
      { id: 'fermuar', f: (n) => [`¿Qué cuesta una cremallera nueva de pantalón en ${n}?`, `Cambiar la cremallera cuesta desde ${e('zipperPants')}; en abrigos y chaquetas desde ${e('zipperCoat')}. Si solo falla el cursor, a menudo basta con repararlo sin cambiar toda la cremallera. Se lo decimos al ver la foto.`] },
      { id: 'kol', f: (n) => [`¿Qué cuesta acortar las mangas de una chaqueta o un abrigo en ${n}?`, `Acortar mangas y largo cuesta desde ${e('hem')}. La manga se marca con la prenda puesta; podemos recogerla en su hotel y devolvérsela.`] },
      { id: 'aski', f: (n) => [`Los tirantes de mi vestido son largos en ${n}: ¿se pueden acortar?`, `Sí, acortamos los tirantes de vestidos y ropa de fiesta. El precio depende del trabajo, así que envíe una foto. Los vestidos de novia solo se arreglan, no se confeccionan.`] },
      { id: 'astar', f: (n) => [`¿Se puede cambiar el forro roto de una chaqueta o un abrigo en ${n}?`, `Sí, el forro se repara o se cambia; no lo hacemos en jerséis ni chaquetas de punto. El precio depende del forro y de cuánto haya que cambiar; se indica por foto.`] },
      { id: 'dugme', f: (n) => [`¿Merece la pena ir al sastre por un botón perdido en ${n}?`, `Sí. Cosemos o cambiamos botones en camisas, chaquetas, abrigos y pantalones; el precio se indica por foto.`] },
      { id: 'soktuk', f: (n) => [`¿Se puede reparar una prenda rota o descosida en ${n}?`, `Sí, cosemos descosidos y reparamos rotos en cualquier tipo de prenda. El precio depende del trabajo, así que envíe una foto.`] },
      { id: 'dikim', f: (n) => [`¿Puedo encargar un vestido, una blusa, un chaleco o un mono a medida en ${n}?`, `Sí, a su medida. La confección no tiene precio fijo: le indicamos precio y plazo según la foto del modelo. Los vestidos de novia solo se arreglan, no se confeccionan.`] },
      { id: 'deri', f: (n) => [`¿Qué cuesta arreglar una chaqueta de piel en ${n}?`, `Los trabajos en piel empiezan desde ${e('leather')}. Cambiamos cuellos, acortamos mangas y largo y entallamos; el precio exacto se indica por foto.`] },
      { id: 'deripant', f: (n) => [`¿Qué cuesta arreglar un pantalón o un chaleco de piel en ${n}?`, `Desde ${e('leather')}. Se puede estrechar la cintura, acortar, cambiar la cremallera y reparar; el precio exacto se indica por foto.`] },
      { id: 'kotmont', f: (n) => [`¿Qué cuesta acortar una chaqueta, un abrigo o un pantalón corto vaquero en ${n}?`, `Los trabajos en vaquero empiezan desde ${e('hem')}. En chaquetas y abrigos acortamos mangas y largo y entallamos; los pantalones cortos se acortan.`] },
    ],
    seo: [(n) => `Sastre en ${n}: precios de bajos y cremalleras`, (n) => `Arreglos de ropa en ${n}: cuánto cuesta acortar`, (n) => `Sastre ${n}: bajos desde €10, cremallera desde €15`],
  },
  fr: {
    titles: [(n) => `Prix du tailleur à ${n} et retouches proposées`, (n) => `Retouches à ${n} : ce qui est possible et combien ça coûte`],
    leads: [
      (n) => `Avant de demander un prix à ${n}, voyez ce qui peut être fait sur chaque vêtement et à partir de quel montant. La liste est ci-dessous ; une photo suffit pour un prix exact et nous passons prendre le vêtement à votre hôtel.`,
      (n) => `Raccourcir et ajuster dès €10, fermetures éclair dès €15 et cuir dès €20 (hors TVA). Vous trouverez ci-dessous les retouches pour les clients de ${n}, classées par vêtement.`,
    ],
    price: (n) => `Résumé des prix pour ${n} : ourlet, taille, manches et longueur dès ${e('hem')}, fermetures éclair dès ${e('zipperPants')} (manteaux et vestes ${e('zipperCoat')}), cuir dès ${e('leather')} ; hors TVA. Ce qui ne figure pas dans la liste est chiffré sur photo.`,
    groups: [
      { id: 'pantolon', ops: ['raccourcir l\'ourlet des pantalons', 'reprendre la taille', 'affiner les jambes', 'élargir la taille', 'raccourcir un jean en gardant l\'ourlet d\'origine', 'changer et réparer la fermeture éclair d\'un pantalon', 'remplacer des boutons', 'réparer déchirures et coutures défaites'], heads: [(n) => `Combien coûte un ourlet ou une reprise de taille à ${n} ?`, (n) => `Pantalon ou jean trop long ou trop large à ${n}`], intro: (n, o) => `Les demandes les plus fréquentes pour pantalons et jeans à ${n} : ${o}. Ourlet et taille dès ${e('hem')}.` },
      { id: 'etek-elbise', ops: ['raccourcir les jupes', 'reprendre la taille des jupes', 'raccourcir les robes', 'ajuster les robes', 'régler la longueur des bretelles', 'changer la fermeture éclair d\'une robe', 'remplacer la doublure', 'retoucher robes de soirée et de mariée (retouches uniquement)', 'robes sur mesure'], heads: [(n) => `Longueur, taille et bretelles des robes et jupes à ${n}`, (n) => `Comment est chiffrée la retouche d'une robe à ${n} ?`], intro: (n, o) => `Ce que nous faisons sur robes, jupes et tenues de soirée à ${n} : ${o}. Les robes de mariée sont retouchées, pas confectionnées.` },
      { id: 'ust-giyim', ops: ['raccourcir les manches de vestes et manteaux', 'raccourcir la longueur', 'ajuster à la taille', 'retoucher manteaux et parkas', 'changer la fermeture éclair de vestes et manteaux', 'remplacer la doublure', 'remplacer des boutons', 'réparer déchirures et coutures défaites', 'retoucher les vestes en cuir'], heads: [(n) => `Manches, longueur et fermeture des vestes et manteaux à ${n}`, (n) => `Combien coûte la retouche d'un manteau ou d'une veste à ${n} ?`], intro: (n, o) => `Ce que nous faisons sur vestes, manteaux et parkas à ${n} : ${o}. Travaux normaux prêts le jour même, urgents en 1 à 2 heures.` },
      { id: 'gomlek-bluz', ops: ['ajuster et raccourcir les chemises', 'ajuster les chemisiers', 'raccourcir et ajuster les T-shirts', 'raccourcir les manches', 'remplacer des boutons', 'recoudre les coutures défaites', 'chemises et chemisiers sur mesure'], heads: [(n) => `Chemise ou chemisier trop large à ${n}`, (n) => `Combien coûte l'ajustement d'une chemise à ${n} ?`], intro: (n, o) => `Ce que nous faisons sur chemises, chemisiers et T-shirts à ${n} : ${o}. Ajustement dès ${e('waist')}.` },
      { id: 'yelek-tulum', ops: ['retoucher les gilets', 'raccourcir et ajuster les combinaisons', 'ajuster le bas et la taille des joggings', 'raccourcir les shorts', 'gilets, combinaisons et joggings sur mesure', 'changer les fermetures éclair', 'réparer déchirures et coutures défaites'], heads: [(n) => `Gilets, combinaisons, joggings et shorts à ${n}`, (n) => `Bas de jogging et longueur de short à ${n}`], intro: (n, o) => `Ce que nous faisons sur gilets, combinaisons, joggings et shorts à ${n} : ${o}. Le prix est donné d'après la photo.` },
      { id: 'fermuar-dugme', ops: ['changer les fermetures éclair de pantalons, manteaux, vestes et sacs (avec ou sans fermeture)', 'réparer les fermetures coincées', 'remplacer des boutons', 'remplacer la doublure (sauf pulls et gilets en maille)', 'réparer déchirures et coutures défaites'], heads: [(n) => `Combien coûte un changement de fermeture éclair à ${n} ?`, (n) => `Fermeture cassée, bouton perdu ou doublure déchirée à ${n}`], intro: (n, o) => `Ce que nous faisons sur fermetures, boutons et doublures à ${n} : ${o}. Changement de fermeture éclair dès ${e('zipperPants')}.` },
      { id: 'deri', ops: ['changer le col des vestes en cuir', 'raccourcir les manches des vestes en cuir', 'raccourcir la longueur des vestes en cuir', 'ajuster les vestes en cuir', 'reprendre la taille des pantalons en cuir', 'raccourcir les pantalons en cuir', 'changer la fermeture éclair des pantalons en cuir', 'retoucher les gilets en cuir'], heads: [(n) => `Combien coûte la retouche d'une veste ou d'un pantalon en cuir à ${n} ?`, (n) => `Manches, longueur, col et fermeture sur le cuir à ${n}`], intro: (n, o) => `Ce que nous faisons sur le cuir à ${n} : ${o}. Dès ${e('leather')} ; tout n'est pas possible sur chaque pièce, nous regardons donc d'abord la photo.` },
      { id: 'kot', ops: ['raccourcir l\'ourlet des jeans', 'raccourcir un jean en gardant l\'ourlet d\'origine', 'reprendre la taille des jeans', 'affiner les jambes des jeans', 'raccourcir manches et longueur des vestes en jean', 'ajuster les vestes en jean', 'raccourcir et ajuster les manteaux en jean', 'raccourcir les jupes en jean et reprendre la taille', 'raccourcir les shorts en jean', 'changer fermetures éclair et boutons des jeans', 'réparer les déchirures de jean'], heads: [(n) => `Combien coûte un ourlet de jean avec le bas d'origine à ${n} ?`, (n) => `Vestes, jupes et shorts en jean à ${n}`], intro: (n, o) => `Ce que nous faisons sur le jean à ${n} : ${o}. Dès ${e('hem')} ; l'ourlet peut garder son aspect d'origine.` },
    ],
    faq: [
      { id: 'paca', f: (n) => [`Quel est le prix d'un ourlet de pantalon à ${n} ?`, `Dès ${e('hem')}, hors TVA. Envoyez une photo sur WhatsApp et nous vous donnons le prix exact. Travaux normaux prêts le jour même, urgents en 1 à 2 heures.`] },
      { id: 'fermuar', f: (n) => [`Quel est le prix d'une nouvelle fermeture de pantalon à ${n} ?`, `Le changement de fermeture éclair coûte dès ${e('zipperPants')} ; sur manteaux et vestes dès ${e('zipperCoat')}. Si seul le curseur est en cause, une réparation suffit souvent sans tout changer. Nous vous le disons d'après la photo.`] },
      { id: 'kol', f: (n) => [`Quel est le prix pour raccourcir les manches d'une veste ou d'un manteau à ${n} ?`, `Raccourcir les manches et la longueur coûte dès ${e('hem')}. La manche est marquée lorsque vous portez le vêtement ; nous pouvons le prendre à votre hôtel et vous le rapporter.`] },
      { id: 'aski', f: (n) => [`Les bretelles de ma robe sont trop longues à ${n} : peut-on les raccourcir ?`, `Oui, nous raccourcissons les bretelles des robes et tenues de soirée. Le prix dépend du travail, envoyez donc une photo. Les robes de mariée sont seulement retouchées, pas confectionnées.`] },
      { id: 'astar', f: (n) => [`Peut-on remplacer la doublure déchirée d'une veste ou d'un manteau à ${n} ?`, `Oui, la doublure est réparée ou remplacée ; nous ne le faisons pas sur les pulls ni les gilets en maille. Le prix dépend de la doublure et de la partie à remplacer ; il est donné sur photo.`] },
      { id: 'dugme', f: (n) => [`Faut-il aller chez le tailleur pour un bouton perdu à ${n} ?`, `Oui. Nous cousons ou remplaçons les boutons de chemises, vestes, manteaux et pantalons ; le prix est donné sur photo.`] },
      { id: 'soktuk', f: (n) => [`Peut-on réparer un vêtement déchiré ou décousu à ${n} ?`, `Oui, nous recousons les coutures défaites et réparons les déchirures sur tout type de vêtement. Le prix dépend du travail, envoyez donc une photo.`] },
      { id: 'dikim', f: (n) => [`Puis-je faire confectionner une robe, un chemisier, un gilet ou une combinaison à ${n} ?`, `Oui, à vos mesures. Le sur-mesure n'a pas de prix fixe : nous indiquons le prix et le délai d'après la photo du modèle. Les robes de mariée sont seulement retouchées, pas confectionnées.`] },
      { id: 'deri', f: (n) => [`Quel est le prix de la retouche d'une veste en cuir à ${n} ?`, `Les travaux sur cuir commencent dès ${e('leather')}. Nous changeons le col, raccourcissons manches et longueur et ajustons ; le prix exact est donné sur photo.`] },
      { id: 'deripant', f: (n) => [`Quel est le prix de la retouche d'un pantalon ou d'un gilet en cuir à ${n} ?`, `Dès ${e('leather')}. Reprise de la taille, raccourcissement, changement de fermeture éclair et réparations sont possibles ; le prix exact est donné sur photo.`] },
      { id: 'kotmont', f: (n) => [`Quel est le prix pour raccourcir une veste, un manteau ou un short en jean à ${n} ?`, `Les travaux sur jean commencent dès ${e('hem')}. Sur vestes et manteaux, nous raccourcissons manches et longueur et ajustons ; les shorts sont raccourcis.`] },
    ],
    seo: [(n) => `Tailleur à ${n} : prix des ourlets et fermetures`, (n) => `Retouches à ${n} : combien coûte un ourlet ?`, (n) => `Tailleur ${n} : ourlet dès €10, fermeture dès €15`],
  },
  pl: {
    titles: [(n) => `${n}: ceny krawca i lista przeróbek`, (n) => `${n}: co można przerobić i ile to kosztuje`],
    leads: [
      (n) => `Zanim zapytasz o cenę (${n}), sprawdź, co da się zrobić przy danym ubraniu i od jakiej kwoty. Lista jest poniżej; do dokładnej wyceny wystarczy zdjęcie, a ubranie odbierzemy z hotelu.`,
      (n) => `Skracanie i zwężanie od €10, zamki od €15, skóra od €20 (ceny bez VAT). Poniżej przeróbki dla gości hotelowych (${n}), ułożone według rodzaju ubrania.`,
    ],
    price: (n) => `Ceny w skrócie (${n}): nogawki, pas, rękawy i długość od ${e('hem')}, zamki od ${e('zipperPants')} (płaszcze i kurtki ${e('zipperCoat')}), skóra od ${e('leather')}; ceny bez VAT. Prace spoza listy wyceniamy ze zdjęcia.`,
    groups: [
      { id: 'pantolon', ops: ['skracanie nogawek', 'zwężanie w pasie', 'zwężanie nogawek', 'poszerzanie w pasie', 'skracanie jeansów z zachowaniem oryginalnego dołu', 'wymiana i naprawa zamka w spodniach', 'wymiana guzików', 'naprawa dziur i rozprutych szwów'], heads: [(n) => `${n}: ile kosztuje skrócenie lub zwężenie spodni?`, (n) => `${n}: spodnie lub jeansy za długie albo za szerokie`], intro: (n, o) => `Najczęstsze zlecenia przy spodniach i jeansach (${n}): ${o}. Nogawki i pas od ${e('hem')}.` },
      { id: 'etek-elbise', ops: ['skracanie spódnic', 'zwężanie spódnic w pasie', 'skracanie sukienek', 'zwężanie sukienek', 'regulacja długości ramiączek', 'wymiana zamka w sukience', 'wymiana podszewki', 'przeróbki sukien wieczorowych i ślubnych (tylko przeróbki)', 'szycie sukienek na miarę'], heads: [(n) => `${n}: długość, talia i ramiączka sukienek i spódnic`, (n) => `${n}: jak wyceniamy przeróbkę sukienki?`], intro: (n, o) => `Co robimy przy sukienkach, spódnicach i strojach wieczorowych (${n}): ${o}. Suknie ślubne przerabiamy, ale ich nie szyjemy.` },
      { id: 'ust-giyim', ops: ['skracanie rękawów kurtek i płaszczy', 'skracanie długości', 'zwężanie w talii', 'przeróbki płaszczy i parek', 'wymiana zamka w kurtkach i płaszczach', 'wymiana podszewki', 'wymiana guzików', 'naprawa dziur i rozprutych szwów', 'przeróbki kurtek skórzanych'], heads: [(n) => `${n}: rękawy, długość i zamek w kurtkach i płaszczach`, (n) => `${n}: ile kosztuje przeróbka płaszcza lub kurtki?`], intro: (n, o) => `Co robimy przy kurtkach, płaszczach i parkach (${n}): ${o}. Zwykłe prace gotowe tego samego dnia, pilne w 1–2 godziny.` },
      { id: 'gomlek-bluz', ops: ['zwężanie i skracanie koszul', 'zwężanie bluzek', 'skracanie i zwężanie T-shirtów', 'skracanie rękawów', 'wymiana guzików', 'zszywanie rozprutych szwów', 'koszule i bluzki na miarę'], heads: [(n) => `${n}: koszula lub bluzka za szeroka`, (n) => `${n}: ile kosztuje zwężenie koszuli?`], intro: (n, o) => `Co robimy przy koszulach, bluzkach i T-shirtach (${n}): ${o}. Zwężanie od ${e('waist')}.` },
      { id: 'yelek-tulum', ops: ['naprawa i przeróbki kamizelek', 'skracanie i zwężanie kombinezonów', 'dopasowanie dołu i pasa spodni dresowych', 'skracanie szortów', 'kamizelki, kombinezony i dresy na miarę', 'wymiana zamków', 'naprawa dziur i rozprutych szwów'], heads: [(n) => `${n}: kamizelki, kombinezony, dresy i szorty`, (n) => `${n}: nogawki dresów i długość szortów`], intro: (n, o) => `Co robimy przy kamizelkach, kombinezonach, dresach i szortach (${n}): ${o}. Cenę podajemy na podstawie zdjęcia.` },
      { id: 'fermuar-dugme', ops: ['wymiana zamków w spodniach, płaszczach, kurtkach i torbach (z zamkiem i bez)', 'naprawa zablokowanych zamków', 'wymiana guzików', 'wymiana podszewki (oprócz swetrów i kardiganów)', 'naprawa dziur i rozprutych szwów'], heads: [(n) => `${n}: ile kosztuje wymiana zamka?`, (n) => `${n}: zepsuty zamek, urwany guzik, rozdarta podszewka`], intro: (n, o) => `Co robimy przy zamkach, guzikach i podszewkach (${n}): ${o}. Wymiana zamka od ${e('zipperPants')}.` },
      { id: 'deri', ops: ['wymiana kołnierza w kurtce skórzanej', 'skracanie rękawów kurtki skórzanej', 'skracanie długości kurtki skórzanej', 'zwężanie kurtki skórzanej', 'zwężanie w pasie spodni skórzanych', 'skracanie spodni skórzanych', 'wymiana zamka w spodniach skórzanych', 'naprawa kamizelek skórzanych'], heads: [(n) => `${n}: ile kosztuje przeróbka kurtki lub spodni skórzanych?`, (n) => `${n}: rękawy, długość, kołnierz i zamek w skórze`], intro: (n, o) => `Co robimy przy skórze (${n}): ${o}. Od ${e('leather')}; nie każda praca jest możliwa przy każdej rzeczy, dlatego najpierw oglądamy zdjęcie.` },
      { id: 'kot', ops: ['skracanie nogawek jeansów', 'skracanie jeansów z zachowaniem oryginalnego dołu', 'zwężanie jeansów w pasie', 'zwężanie nogawek jeansów', 'skracanie rękawów i długości kurtek jeansowych', 'zwężanie kurtek jeansowych', 'skracanie i zwężanie płaszczy jeansowych', 'skracanie spódnic jeansowych i zwężanie w pasie', 'skracanie szortów jeansowych', 'wymiana zamków i guzików w jeansach', 'naprawa dziur w jeansie'], heads: [(n) => `${n}: ile kosztuje skrócenie jeansów z oryginalnym dołem?`, (n) => `${n}: kurtki, spódnice i szorty jeansowe`], intro: (n, o) => `Co robimy przy odzieży jeansowej (${n}): ${o}. Od ${e('hem')}; dół nogawki może zachować oryginalny wygląd.` },
    ],
    faq: [
      { id: 'paca', f: (n) => [`Jaka jest cena skrócenia spodni (${n})?`, `Od ${e('hem')}, bez VAT. Wyślij zdjęcie na WhatsAppie, a podamy dokładną cenę. Zwykłe prace są gotowe tego samego dnia, pilne w 1–2 godziny.`] },
      { id: 'fermuar', f: (n) => [`Jaka jest cena nowego zamka w spodniach (${n})?`, `Wymiana zamka od ${e('zipperPants')}; w płaszczach i kurtkach od ${e('zipperCoat')}. Jeśli zepsuty jest tylko suwak, często wystarczy naprawa bez wymiany całego zamka. Powiemy to po obejrzeniu zdjęcia.`] },
      { id: 'kol', f: (n) => [`Jaka jest cena skrócenia rękawów kurtki lub płaszcza (${n})?`, `Skracanie rękawów i długości od ${e('hem')}. Rękaw zaznaczamy na założonym ubraniu; możemy odebrać je z hotelu i przywieźć z powrotem.`] },
      { id: 'aski', f: (n) => [`Ramiączka sukienki są za długie (${n}). Czy można je skrócić?`, `Tak, skracamy ramiączka w sukienkach i strojach wieczorowych. Cena zależy od pracy, więc wyślij zdjęcie. Suknie ślubne tylko przerabiamy, nie szyjemy ich.`] },
      { id: 'astar', f: (n) => [`Czy można wymienić rozdartą podszewkę w kurtce lub płaszczu (${n})?`, `Tak, podszewkę naprawiamy lub wymieniamy; nie robimy tego w swetrach ani kardiganach. Cena zależy od podszewki i zakresu wymiany, podajemy ją ze zdjęcia.`] },
      { id: 'dugme', f: (n) => [`Czy warto iść do krawca z urwanym guzikiem (${n})?`, `Tak. Przyszywamy i wymieniamy guziki w koszulach, kurtkach, płaszczach i spodniach; cenę podajemy ze zdjęcia.`] },
      { id: 'soktuk', f: (n) => [`Czy można naprawić rozdarte lub rozprute ubranie (${n})?`, `Tak, zszywamy rozprute szwy i naprawiamy rozdarcia w każdym rodzaju odzieży. Cena zależy od pracy, więc wyślij zdjęcie.`] },
      { id: 'dikim', f: (n) => [`Czy mogę zamówić sukienkę, bluzkę, kamizelkę lub kombinezon na miarę (${n})?`, `Tak, na Twoje wymiary. Szycie na miarę nie ma stałej ceny: cenę i termin podajemy na podstawie zdjęcia modelu. Suknie ślubne tylko przerabiamy, nie szyjemy ich.`] },
      { id: 'deri', f: (n) => [`Jaka jest cena przeróbki kurtki skórzanej (${n})?`, `Prace na skórze od ${e('leather')}. Wymieniamy kołnierze, skracamy rękawy i długość, zwężamy; dokładną cenę podajemy ze zdjęcia.`] },
      { id: 'deripant', f: (n) => [`Jaka jest cena przeróbki spodni lub kamizelki skórzanej (${n})?`, `Od ${e('leather')}. Możliwe są zwężenie w pasie, skrócenie, wymiana zamka i naprawy; dokładną cenę podajemy ze zdjęcia.`] },
      { id: 'kotmont', f: (n) => [`Jaka jest cena skrócenia kurtki, płaszcza lub szortów jeansowych (${n})?`, `Prace przy jeansie od ${e('hem')}. W kurtkach i płaszczach skracamy rękawy i długość oraz zwężamy; szorty skracamy.`] },
    ],
    seo: [(n) => `Krawiec ${n}: ceny skracania i wymiany zamka`, (n) => `${n}: przeróbki krawieckie – ile kosztuje skracanie?`, (n) => `Krawiec ${n}: skracanie od €10, zamek od €15`],
  },
  uk: {
    titles: [(n) => `${n}: ціни кравця і перелік робіт`, (n) => `${n}: що можна переробити і скільки це коштує`],
    leads: [
      (n) => `Перш ніж питати про ціну (${n}), подивіться, що можна зробити з кожною річчю і від якої суми. Перелік нижче; для точної ціни достатньо фото, а річ ми заберемо з готелю.`,
      (n) => `Вкорочення та вшивання — від €10, блискавки — від €15, шкіра — від €20 (ціни без ПДВ). Нижче роботи для гостей готелів (${n}), згруповані за видами одягу.`,
    ],
    price: (n) => `Коротко про ціни (${n}): низ, пояс, рукави та довжина — від ${e('hem')}, блискавки — від ${e('zipperPants')} (пальта й куртки — ${e('zipperCoat')}), шкіра — від ${e('leather')}; ціни без ПДВ. Чого немає в переліку, оцінюємо за фото.`,
    groups: [
      { id: 'pantolon', ops: ['підшивання штанів', 'зауження в поясі', 'зауження штанин', 'розширення пояса', 'вкорочення джинсів зі збереженням оригінального низу', 'заміна й ремонт блискавки на штанях', 'заміна ґудзиків', 'ремонт дір і розпоротих швів'], heads: [(n) => `${n}: скільки коштує підшити або вшити штани?`, (n) => `${n}: штани чи джинси задовгі або завеликі`], intro: (n, o) => `Найчастіші замовлення зі штанами та джинсами (${n}): ${o}. Низ і пояс — від ${e('hem')}.` },
      { id: 'etek-elbise', ops: ['вкорочення спідниць', 'зауження спідниць у поясі', 'вкорочення суконь', 'зауження суконь', 'регулювання довжини бретельок', 'заміна блискавки на сукні', 'заміна підкладки', 'переробка вечірніх і весільних суконь (лише переробка)', 'пошиття суконь на замовлення'], heads: [(n) => `${n}: довжина, талія та бретелі суконь і спідниць`, (n) => `${n}: як рахується ціна переробки сукні?`], intro: (n, o) => `Що робимо із сукнями, спідницями та вечірнім одягом (${n}): ${o}. Весільні сукні переробляємо, але не шиємо.` },
      { id: 'ust-giyim', ops: ['вкорочення рукавів курток і пальт', 'вкорочення довжини', 'зауження по фігурі', 'переробка пальт і парок', 'заміна блискавки на куртках і пальтах', 'заміна підкладки', 'заміна ґудзиків', 'ремонт дір і розпоротих швів', 'переробка шкіряних курток'], heads: [(n) => `${n}: рукави, довжина та блискавка курток і пальт`, (n) => `${n}: скільки коштує переробка пальта чи куртки?`], intro: (n, o) => `Що робимо з куртками, пальтами та парками (${n}): ${o}. Звичайні роботи готові того ж дня, термінові — за 1–2 години.` },
      { id: 'gomlek-bluz', ops: ['зауження й вкорочення сорочок', 'зауження блузок', 'вкорочення й зауження футболок', 'вкорочення рукавів', 'заміна ґудзиків', 'зашивання розпоротих швів', 'сорочки й блузки на замовлення'], heads: [(n) => `${n}: сорочка чи блузка завелика`, (n) => `${n}: скільки коштує вшити сорочку?`], intro: (n, o) => `Що робимо із сорочками, блузками та футболками (${n}): ${o}. Вшивання — від ${e('waist')}.` },
      { id: 'yelek-tulum', ops: ['ремонт і переробка жилетів', 'вкорочення й зауження комбінезонів', 'підгонка низу й пояса спортивних штанів', 'вкорочення шортів', 'жилети, комбінезони й спортивні костюми на замовлення', 'заміна блискавок', 'ремонт дір і розпоротих швів'], heads: [(n) => `${n}: жилети, комбінезони, спортивні штани та шорти`, (n) => `${n}: низ спортивних штанів і довжина шортів`], intro: (n, o) => `Що робимо з жилетами, комбінезонами, спортивними костюмами та шортами (${n}): ${o}. Ціну називаємо за фото.` },
      { id: 'fermuar-dugme', ops: ['заміна блискавок на штанях, пальтах, куртках і сумках (з блискавкою й без)', 'ремонт заклинених блискавок', 'заміна ґудзиків', 'заміна підкладки (крім светрів і кардиганів)', 'ремонт дір і розпоротих швів'], heads: [(n) => `${n}: скільки коштує заміна блискавки?`, (n) => `${n}: зламана блискавка, відірваний ґудзик, порвана підкладка`], intro: (n, o) => `Що робимо з блискавками, ґудзиками та підкладкою (${n}): ${o}. Заміна блискавки — від ${e('zipperPants')}.` },
      { id: 'deri', ops: ['заміна коміра шкіряної куртки', 'вкорочення рукавів шкіряної куртки', 'вкорочення довжини шкіряної куртки', 'зауження шкіряної куртки', 'зауження шкіряних штанів у поясі', 'підшивання шкіряних штанів', 'заміна блискавки на шкіряних штанях', 'ремонт шкіряних жилетів'], heads: [(n) => `${n}: скільки коштує переробка шкіряної куртки чи штанів?`, (n) => `${n}: рукави, довжина, комір і блискавка на шкірі`], intro: (n, o) => `Що робимо зі шкірою (${n}): ${o}. Від ${e('leather')}; не кожну роботу можна зробити на будь-якій речі, тому спершу дивимося фото.` },
      { id: 'kot', ops: ['підшивання джинсів', 'вкорочення джинсів зі збереженням оригінального низу', 'зауження джинсів у поясі', 'зауження штанин джинсів', 'вкорочення рукавів і довжини джинсової куртки', 'зауження джинсової куртки', 'вкорочення й зауження джинсового пальта', 'вкорочення джинсової спідниці й зауження в поясі', 'вкорочення джинсових шортів', 'заміна блискавок і ґудзиків на джинсах', 'ремонт дір на джинсах'], heads: [(n) => `${n}: скільки коштує підшити джинси з оригінальним низом?`, (n) => `${n}: джинсові куртки, спідниці та шорти`], intro: (n, o) => `Що робимо з джинсовим одягом (${n}): ${o}. Від ${e('hem')}; низ може зберегти оригінальний вигляд.` },
    ],
    faq: [
      { id: 'paca', f: (n) => [`У скільки обійдеться підшити штани (${n})?`, `Від ${e('hem')}, без ПДВ. Надішліть фото у WhatsApp — назвемо точну ціну. Звичайні роботи готові того ж дня, термінові — за 1–2 години.`] },
      { id: 'fermuar', f: (n) => [`Скільки коштує нова блискавка на штанах (${n})?`, `Заміна блискавки — від ${e('zipperPants')}; на пальтах і куртках — від ${e('zipperCoat')}. Якщо зламаний лише бігунок, часто вистачає ремонту без заміни всієї блискавки. Скажемо за фото.`] },
      { id: 'kol', f: (n) => [`Скільки коштує вкоротити рукави куртки чи пальта (${n})?`, `Вкорочення рукавів і довжини — від ${e('hem')}. Довжину рукава позначаємо на вас; річ можемо забрати з готелю й привезти назад.`] },
      { id: 'aski', f: (n) => [`Бретелі сукні задовгі (${n}). Їх можна вкоротити?`, `Так, бретелі на сукнях і вечірньому одязі вкорочуємо. Ціна залежить від роботи, тож надішліть фото. Весільні сукні лише переробляємо, не шиємо.`] },
      { id: 'astar', f: (n) => [`Чи можна замінити порвану підкладку куртки чи пальта (${n})?`, `Так, підкладку ремонтуємо або міняємо; на светрах і кардиганах цього не робимо. Ціна залежить від підкладки та обсягу заміни, називаємо за фото.`] },
      { id: 'dugme', f: (n) => [`Чи варто йти до кравця через відірваний ґудзик (${n})?`, `Так. Пришиваємо й міняємо ґудзики на сорочках, куртках, пальтах і штанах; ціну називаємо за фото.`] },
      { id: 'soktuk', f: (n) => [`Чи можна полагодити порвану або розпорену річ (${n})?`, `Так, зашиваємо шви й ремонтуємо дірки на будь-якому одязі. Ціна залежить від роботи, тож надішліть фото.`] },
      { id: 'dikim', f: (n) => [`Чи можна замовити сукню, блузку, жилет або комбінезон за мірками (${n})?`, `Так, за вашими мірками. Пошиття не має фіксованої ціни: ціну й строк називаємо за фото моделі. Весільні сукні лише переробляємо, не шиємо.`] },
      { id: 'deri', f: (n) => [`Скільки коштує переробка шкіряної куртки (${n})?`, `Роботи зі шкірою — від ${e('leather')}. Міняємо комір, вкорочуємо рукави й довжину, вшиваємо; точну ціну називаємо за фото.`] },
      { id: 'deripant', f: (n) => [`Скільки коштує переробка шкіряних штанів або жилета (${n})?`, `Від ${e('leather')}. Можливі вшивання в поясі, вкорочення, заміна блискавки та ремонт; точну ціну називаємо за фото.`] },
      { id: 'kotmont', f: (n) => [`Скільки коштує вкоротити джинсову куртку, пальто чи шорти (${n})?`, `Роботи з джинсом — від ${e('hem')}. У куртках і пальтах вкорочуємо рукави й довжину та вшиваємо; шорти вкорочуємо.`] },
    ],
    seo: [(n) => `Кравець ${n}: ціни на підшивання і блискавки`, (n) => `${n}: переробка одягу — скільки коштує вкоротити?`, (n) => `Кравець ${n}: підшивання від €10, блискавка від €15`],
  },
  nl: {
    titles: [(n) => `Kleermakersprijzen in ${n} en wat wij doen`, (n) => `Kleding vermaken in ${n}: wat kan er en wat kost het?`],
    leads: [
      (n) => `Voordat u in ${n} een prijs vraagt: bekijk wat er per kledingstuk mogelijk is en vanaf welk bedrag. De lijst staat hieronder; met een foto krijgt u de exacte prijs en wij halen het kledingstuk op bij uw hotel.`,
      (n) => `Korter en nauwer maken vanaf €10, ritsen vanaf €15 en leer vanaf €20 (excl. btw). Hieronder staat het vermaakwerk voor hotelgasten in ${n}, per kledingstuk.`,
    ],
    price: (n) => `Prijsoverzicht voor ${n}: zoom, taille, mouwen en lengte vanaf ${e('hem')}, ritsen vanaf ${e('zipperPants')} (jassen en mantels ${e('zipperCoat')}), leer vanaf ${e('leather')}; excl. btw. Wat niet in de lijst staat, berekenen wij op basis van een foto.`,
    groups: [
      { id: 'pantolon', ops: ['broekspijpen korter maken', 'taille nauwer maken', 'pijpen smaller maken', 'taille wijder maken', 'spijkerbroek korter maken met behoud van de originele zoom', 'rits van broeken vervangen en repareren', 'knopen vervangen', 'scheuren en losse naden repareren'], heads: [(n) => `Wat kost een broek korter of nauwer maken in ${n}?`, (n) => `Broek of spijkerbroek te lang of te wijd in ${n}`], intro: (n, o) => `Het meest gevraagde werk aan broeken en spijkerbroeken in ${n}: ${o}. Zoom en taille vanaf ${e('hem')}.` },
      { id: 'etek-elbise', ops: ['rokken korter maken', 'taille van rokken nauwer maken', 'jurken korter maken', 'jurken nauwer maken', 'lengte van bandjes aanpassen', 'rits van jurken vervangen', 'voering vervangen', 'avond- en bruidsjurken vermaken (alleen vermaken)', 'jurken op maat maken'], heads: [(n) => `Lengte, taille en bandjes van jurken en rokken in ${n}`, (n) => `Hoe wordt het vermaken van een jurk in ${n} berekend?`], intro: (n, o) => `Wat wij doen aan jurken, rokken en avondkleding in ${n}: ${o}. Bruidsjurken vermaken wij, maar maken wij niet nieuw.` },
      { id: 'ust-giyim', ops: ['mouwen van jassen en mantels korter maken', 'lengte korter maken', 'innemen in de taille', 'mantels en parka\'s vermaken', 'rits van jassen en mantels vervangen', 'voering vervangen', 'knopen vervangen', 'scheuren en losse naden repareren', 'leren jassen vermaken'], heads: [(n) => `Mouwen, lengte en rits van jassen en mantels in ${n}`, (n) => `Wat kost het vermaken van een jas of mantel in ${n}?`], intro: (n, o) => `Wat wij doen aan jassen, mantels en parka's in ${n}: ${o}. Gewoon werk is dezelfde dag klaar, spoed in 1–2 uur.` },
      { id: 'gomlek-bluz', ops: ['overhemden innemen en korter maken', 'blouses innemen', 'T-shirts korter maken en innemen', 'mouwen korter maken', 'knopen vervangen', 'losse naden dichtnaaien', 'overhemden en blouses op maat'], heads: [(n) => `Overhemd of blouse te wijd in ${n}`, (n) => `Wat kost een overhemd innemen in ${n}?`], intro: (n, o) => `Wat wij doen aan overhemden, blouses en T-shirts in ${n}: ${o}. Innemen vanaf ${e('waist')}.` },
      { id: 'yelek-tulum', ops: ['gilets repareren en vermaken', 'jumpsuits korter maken en innemen', 'zoom en taille van joggingbroeken aanpassen', 'korte broeken korter maken', 'gilets, jumpsuits en joggingpakken op maat', 'ritsen vervangen', 'scheuren en losse naden repareren'], heads: [(n) => `Gilets, jumpsuits, joggingbroeken en korte broeken in ${n}`, (n) => `Zoom van de joggingbroek en lengte van de korte broek in ${n}`], intro: (n, o) => `Wat wij doen aan gilets, jumpsuits, joggingpakken en korte broeken in ${n}: ${o}. De prijs volgt op basis van een foto.` },
      { id: 'fermuar-dugme', ops: ['ritsen vervangen in broeken, mantels, jassen en tassen (met en zonder rits)', 'vastzittende ritsen repareren', 'knopen vervangen', 'voering vervangen (behalve bij truien en vesten)', 'scheuren en losse naden repareren'], heads: [(n) => `Wat kost een nieuwe rits in ${n}?`, (n) => `Rits kapot, knoop kwijt of voering gescheurd in ${n}`], intro: (n, o) => `Wat wij doen aan ritsen, knopen en voering in ${n}: ${o}. Een rits vervangen kost vanaf ${e('zipperPants')}.` },
      { id: 'deri', ops: ['kraag van leren jassen vervangen', 'mouwen van leren jassen korter maken', 'lengte van leren jassen korter maken', 'leren jassen innemen', 'taille van leren broeken nauwer maken', 'leren broeken korter maken', 'rits van leren broeken vervangen', 'leren gilets repareren'], heads: [(n) => `Wat kost het vermaken van een leren jas of broek in ${n}?`, (n) => `Mouwen, lengte, kraag en rits bij leer in ${n}`], intro: (n, o) => `Wat wij doen aan leer in ${n}: ${o}. Vanaf ${e('leather')}; niet alles kan bij elk stuk, daarom bekijken wij eerst de foto.` },
      { id: 'kot', ops: ['spijkerbroek korter maken', 'spijkerbroek korter maken met behoud van de originele zoom', 'taille van spijkerbroeken nauwer maken', 'pijpen van spijkerbroeken smaller maken', 'mouwen en lengte van spijkerjassen korter maken', 'spijkerjassen innemen', 'spijkermantels korter maken en innemen', 'spijkerrokken korter maken en taille nauwer maken', 'korte spijkerbroeken korter maken', 'ritsen en knopen van spijkerbroeken vervangen', 'scheuren in spijkerstof repareren'], heads: [(n) => `Wat kost een spijkerbroek korter maken met de originele zoom in ${n}?`, (n) => `Spijkerjassen, spijkerrokken en korte spijkerbroeken in ${n}`], intro: (n, o) => `Wat wij doen aan spijkerkleding in ${n}: ${o}. Vanaf ${e('hem')}; de zoom kan zijn originele uiterlijk houden.` },
    ],
    faq: [
      { id: 'paca', f: (n) => [`Hoeveel kost het inkorten van een broek in ${n}?`, `Vanaf ${e('hem')}, excl. btw. Stuur een foto via WhatsApp en wij noemen de exacte prijs. Gewoon werk is dezelfde dag klaar, spoed in 1–2 uur.`] },
      { id: 'fermuar', f: (n) => [`Hoeveel kost een nieuwe broekrits in ${n}?`, `Een rits vervangen kost vanaf ${e('zipperPants')}; bij jassen en mantels vanaf ${e('zipperCoat')}. Is alleen de schuiver stuk, dan volstaat vaak een reparatie zonder de hele rits te vervangen. Dat zeggen wij u aan de hand van de foto.`] },
      { id: 'kol', f: (n) => [`Hoeveel kost het inkorten van jas- of mantelmouwen in ${n}?`, `Mouwen en lengte korter maken kost vanaf ${e('hem')}. De mouw wordt afgemerkt terwijl u het kledingstuk draagt; wij kunnen het bij uw hotel ophalen en terugbrengen.`] },
      { id: 'aski', f: (n) => [`De bandjes van mijn jurk zijn te lang in ${n}: kunnen ze korter?`, `Ja, wij maken bandjes van jurken en avondkleding korter. De prijs hangt af van het werk, stuur dus een foto. Bruidsjurken vermaken wij alleen, wij maken ze niet nieuw.`] },
      { id: 'astar', f: (n) => [`Kan een gescheurde voering van een jas of mantel worden vervangen in ${n}?`, `Ja, voering wordt gerepareerd of vervangen; bij truien en vesten doen wij dat niet. De prijs hangt af van de voering en hoeveel er vervangen wordt en volgt op basis van een foto.`] },
      { id: 'dugme', f: (n) => [`Loont het om voor een ontbrekende knoop naar de kleermaker te gaan in ${n}?`, `Ja. Wij zetten knopen aan of vervangen ze, bij overhemden, jassen, mantels en broeken; de prijs volgt op basis van een foto.`] },
      { id: 'soktuk', f: (n) => [`Kan een gescheurd of losgeraakt kledingstuk worden hersteld in ${n}?`, `Ja, wij naaien losse naden dicht en repareren scheuren in alle soorten kleding. De prijs hangt af van het werk, stuur dus een foto.`] },
      { id: 'dikim', f: (n) => [`Kan ik een jurk, blouse, gilet of jumpsuit op maat laten maken in ${n}?`, `Ja, op uw maten. Maatwerk heeft geen vaste prijs: prijs en doorlooptijd noemen wij aan de hand van een foto van het model. Bruidsjurken vermaken wij alleen, wij maken ze niet nieuw.`] },
      { id: 'deri', f: (n) => [`Hoeveel kost het vermaken van een leren jas in ${n}?`, `Leerwerk begint vanaf ${e('leather')}. Wij vervangen kragen, maken mouwen en lengte korter en nemen in; de exacte prijs volgt op basis van een foto.`] },
      { id: 'deripant', f: (n) => [`Hoeveel kost het vermaken van een leren broek of leren gilet in ${n}?`, `Vanaf ${e('leather')}. Taille nauwer maken, korter maken, rits vervangen en reparaties zijn mogelijk; de exacte prijs volgt op basis van een foto.`] },
      { id: 'kotmont', f: (n) => [`Hoeveel kost het inkorten van een spijkerjas, spijkermantel of korte spijkerbroek in ${n}?`, `Werk aan spijkerstof begint vanaf ${e('hem')}. Bij jassen en mantels maken wij mouwen en lengte korter en nemen wij in; korte broeken maken wij korter.`] },
    ],
    seo: [(n) => `Kleermaker ${n}: prijzen voor zoom en rits`, (n) => `Kleding vermaken in ${n}: wat kost inkorten?`, (n) => `Kleermaker ${n}: zoom vanaf €10, rits vanaf €15`],
  },
  ar: {
    titles: [(n) => `أسعار الخياط في ${n} والأعمال التي نقوم بها`, (n) => `تعديل الملابس في ${n}: ما الممكن وكم يكلّف؟`],
    leads: [
      (n) => `قبل أن تسأل عن السعر في ${n}، اطّلع على ما يمكن عمله لكل قطعة ومن أي مبلغ يبدأ. القائمة في الأسفل؛ تكفي صورة لمعرفة السعر الدقيق، ونستلم القطعة من فندقك.`,
      (n) => `التقصير والتضييق من €10، والسحابات من €15، والجلد من €20 (الأسعار لا تشمل الضريبة). في الأسفل أعمال التعديل لنزلاء الفنادق في ${n} مرتبة حسب نوع القطعة.`,
    ],
    price: (n) => `ملخص الأسعار في ${n}: الأطراف والخصر والأكمام والطول من ${e('hem')}، السحابات من ${e('zipperPants')} (المعاطف والسترات ${e('zipperCoat')})، الجلد من ${e('leather')}؛ الأسعار لا تشمل الضريبة. ما ليس في القائمة يُسعَّر حسب الصورة.`,
    groups: [
      { id: 'pantolon', ops: ['تقصير أطراف البنطال', 'تضييق الخصر', 'تضييق الساقين', 'توسيع الخصر', 'تقصير الجينز مع الحفاظ على الطرف الأصلي', 'استبدال سحاب البنطال وإصلاحه', 'استبدال الأزرار', 'إصلاح الخروق والدرزات المفتوحة'], heads: [(n) => `كم يكلّف تقصير البنطال أو تضييقه في ${n}؟`, (n) => `بنطال أو جينز طويل أو واسع في ${n}`], intro: (n, o) => `أكثر ما يُطلب للبناطيل والجينز في ${n}: ${o}. الأطراف والخصر من ${e('hem')}.` },
      { id: 'etek-elbise', ops: ['تقصير التنانير', 'تضييق خصر التنانير', 'تقصير الفساتين', 'تضييق الفساتين', 'ضبط طول الحمالات', 'استبدال سحاب الفستان', 'استبدال البطانة', 'تعديل فساتين السهرة والزفاف (تعديل فقط)', 'خياطة الفساتين حسب المقاس'], heads: [(n) => `طول الفستان والتنورة والخصر والحمالات في ${n}`, (n) => `كيف يُحسب سعر تعديل الفستان في ${n}؟`], intro: (n, o) => `ما نقوم به للفساتين والتنانير وملابس السهرة في ${n}: ${o}. فساتين الزفاف نعدّلها ولا نخيطها.` },
      { id: 'ust-giyim', ops: ['تقصير أكمام السترات والمعاطف', 'تقصير الطول', 'تضييق الجسم', 'تعديل المعاطف والباركا', 'استبدال سحاب السترات والمعاطف', 'استبدال البطانة', 'استبدال الأزرار', 'إصلاح الخروق والدرزات المفتوحة', 'تعديل السترات الجلدية'], heads: [(n) => `أكمام وطول وسحاب السترات والمعاطف في ${n}`, (n) => `كم يكلّف تعديل المعطف أو السترة في ${n}؟`], intro: (n, o) => `ما نقوم به للسترات والمعاطف والباركا في ${n}: ${o}. الأعمال العادية جاهزة في اليوم نفسه والمستعجلة خلال 1–2 ساعة.` },
      { id: 'gomlek-bluz', ops: ['تضييق القمصان وتقصيرها', 'تضييق البلوزات', 'تقصير القمصان القطنية وتضييقها', 'تقصير الأكمام', 'استبدال الأزرار', 'خياطة الدرزات المفتوحة', 'خياطة القمصان والبلوزات حسب المقاس'], heads: [(n) => `قميص أو بلوزة واسعة في ${n}`, (n) => `كم يكلّف تضييق القميص في ${n}؟`], intro: (n, o) => `ما نقوم به للقمصان والبلوزات والتيشيرتات في ${n}: ${o}. التضييق من ${e('waist')}.` },
      { id: 'yelek-tulum', ops: ['إصلاح الصدريات وتعديلها', 'تقصير الأفرولات وتضييقها', 'ضبط أطراف وخصر البناطيل الرياضية', 'تقصير الشورتات', 'خياطة الصدريات والأفرولات والملابس الرياضية حسب المقاس', 'استبدال السحابات', 'إصلاح الخروق والدرزات المفتوحة'], heads: [(n) => `الصدريات والأفرولات والملابس الرياضية والشورتات في ${n}`, (n) => `طرف البنطال الرياضي وطول الشورت في ${n}`], intro: (n, o) => `ما نقوم به للصدريات والأفرولات والملابس الرياضية والشورتات في ${n}: ${o}. يُحدَّد السعر حسب الصورة.` },
      { id: 'fermuar-dugme', ops: ['استبدال السحاب في البناطيل والمعاطف والسترات والحقائب (بسحاب وبدونه)', 'إصلاح السحاب العالق', 'استبدال الأزرار', 'استبدال البطانة (باستثناء البلوفرات والكارديجان)', 'إصلاح الخروق والدرزات المفتوحة'], heads: [(n) => `كم يكلّف استبدال السحاب في ${n}؟`, (n) => `سحاب مكسور أو زر مفقود أو بطانة ممزقة في ${n}`], intro: (n, o) => `ما نقوم به للسحابات والأزرار والبطانة في ${n}: ${o}. استبدال السحاب من ${e('zipperPants')}.` },
      { id: 'deri', ops: ['استبدال ياقة السترة الجلدية', 'تقصير أكمام السترة الجلدية', 'تقصير طول السترة الجلدية', 'تضييق السترة الجلدية', 'تضييق خصر البنطال الجلدي', 'تقصير البنطال الجلدي', 'استبدال سحاب البنطال الجلدي', 'إصلاح الصدريات الجلدية'], heads: [(n) => `كم يكلّف تعديل السترة أو البنطال الجلدي في ${n}؟`, (n) => `الأكمام والطول والياقة والسحاب في الجلد في ${n}`], intro: (n, o) => `ما نقوم به للملابس الجلدية في ${n}: ${o}. من ${e('leather')}؛ ليس كل عمل ممكناً في كل قطعة، لذلك نرى الصورة أولاً.` },
      { id: 'kot', ops: ['تقصير أطراف الجينز', 'تقصير الجينز مع الحفاظ على الطرف الأصلي', 'تضييق خصر الجينز', 'تضييق ساقي الجينز', 'تقصير أكمام وطول سترات الجينز', 'تضييق سترات الجينز', 'تقصير معاطف الجينز وتضييقها', 'تقصير تنانير الجينز وتضييق الخصر', 'تقصير شورتات الجينز', 'استبدال سحابات وأزرار الجينز', 'إصلاح خروق الجينز'], heads: [(n) => `كم يكلّف تقصير الجينز مع الحفاظ على الطرف الأصلي في ${n}؟`, (n) => `سترات وتنانير وشورتات الجينز في ${n}`], intro: (n, o) => `ما نقوم به لملابس الجينز في ${n}: ${o}. من ${e('hem')}؛ ويمكن أن يحتفظ الطرف بمظهره الأصلي.` },
    ],
    faq: [
      { id: 'paca', f: (n) => [`ما سعر تقصير البنطال في ${n}؟`, `من ${e('hem')}، غير شامل الضريبة. أرسل صورة عبر واتساب ونخبرك بالسعر الدقيق. الأعمال العادية جاهزة في اليوم نفسه والمستعجلة خلال 1–2 ساعة.`] },
      { id: 'fermuar', f: (n) => [`ما سعر سحاب جديد للبنطال في ${n}؟`, `استبدال السحاب من ${e('zipperPants')}، وفي المعاطف والسترات من ${e('zipperCoat')}. إذا كان العطل في المنزلق فقط فغالباً يكفي إصلاحه دون تغيير السحاب كله. نخبرك بعد رؤية الصورة.`] },
      { id: 'kol', f: (n) => [`ما سعر تقصير أكمام السترة أو المعطف في ${n}؟`, `تقصير الأكمام والطول من ${e('hem')}. نحدد طول الكم وأنت ترتدي القطعة؛ ويمكننا استلامها من فندقك وإعادتها.`] },
      { id: 'aski', f: (n) => [`حمالات فستاني طويلة في ${n}، هل يمكن تقصيرها؟`, `نعم، نقصّر حمالات الفساتين وملابس السهرة. السعر حسب العمل، لذا أرسل صورة. فساتين الزفاف نعدّلها فقط ولا نخيطها.`] },
      { id: 'astar', f: (n) => [`هل يمكن استبدال بطانة ممزقة لسترة أو معطف في ${n}؟`, `نعم، نصلح البطانة أو نستبدلها؛ ولا نفعل ذلك في البلوفرات والكارديجان. السعر حسب نوع البطانة ومقدار ما يُستبدل، ونحدده من الصورة.`] },
      { id: 'dugme', f: (n) => [`هل يستحق زر مفقود زيارة الخياط في ${n}؟`, `نعم. نخيط الأزرار أو نستبدلها في القمصان والسترات والمعاطف والبناطيل؛ ونحدد السعر من الصورة.`] },
      { id: 'soktuk', f: (n) => [`هل يمكن إصلاح قطعة ممزقة أو مفتوقة في ${n}؟`, `نعم، نخيط الدرزات المفتوحة ونصلح التمزقات في جميع أنواع الملابس. السعر حسب العمل، لذا أرسل صورة.`] },
      { id: 'dikim', f: (n) => [`هل يمكنني طلب فستان أو بلوزة أو صدرية أو أفرول حسب المقاس في ${n}؟`, `نعم، حسب مقاسك. الخياطة حسب المقاس ليس لها سعر ثابت: نحدد السعر والمدة من صورة الموديل. فساتين الزفاف نعدّلها فقط ولا نخيطها.`] },
      { id: 'deri', f: (n) => [`ما سعر تعديل السترة الجلدية في ${n}؟`, `أعمال الجلد من ${e('leather')}. نستبدل الياقة ونقصّر الأكمام والطول ونضيّق؛ والسعر الدقيق من الصورة.`] },
      { id: 'deripant', f: (n) => [`ما سعر تعديل البنطال الجلدي أو الصدرية الجلدية في ${n}؟`, `من ${e('leather')}. يمكن تضييق الخصر والتقصير واستبدال السحاب والإصلاح؛ والسعر الدقيق من الصورة.`] },
      { id: 'kotmont', f: (n) => [`ما سعر تقصير سترة أو معطف أو شورت جينز في ${n}؟`, `أعمال الجينز من ${e('hem')}. في السترات والمعاطف نقصّر الأكمام والطول ونضيّق؛ والشورتات نقصّرها.`] },
    ],
    seo: [(n) => `خياط في ${n}: أسعار التقصير والسحابات`, (n) => `تعديل الملابس في ${n}: كم يكلّف التقصير؟`, (n) => `خياط ${n}: التقصير من €10 والسحاب من €15`],
  },
};

/** Deterministik karıştırma (mulberry32 + Fisher–Yates): aynı tohum → aynı sıra; tüm elemanlar korunur. */
const shuf = <T,>(a: T[], seed: number): T[] => {
  const r = [...a]; let t = seed >>> 0;
  const rnd = () => { t = (t + 0x6d2b79f5) >>> 0; let x = Math.imul(t ^ (t >>> 15), 1 | t); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
};
// Fiyat satırı için ek kalıplar (aynı rakamlar: ₺200'den ≈ €10, fermuar €15/€20, deri €20; KDV hariç yazılmaz çünkü ana satırla aynı kalır → fiyat denetimi tek kaynak).
const PRICE_ALT: Record<ILang, ((n: string) => string)[]> = {
  es: [(n) => `Orientación para ${n}: bajos, cintura y mangas desde ${e('hem')}; cremallera desde ${e('zipperPants')} (chaquetas y abrigos ${e('zipperCoat')}); piel desde ${e('leather')}. Lo demás se presupuesta por foto.`],
  fr: [(n) => `Repères pour ${n} : ourlets, taille et manches dès ${e('hem')} ; fermeture éclair dès ${e('zipperPants')} (vestes et manteaux ${e('zipperCoat')}) ; cuir dès ${e('leather')}. Le reste est chiffré sur photo.`],
  pl: [(n) => `Orientacyjnie dla ${n}: nogawki, talia i rękawy od ${e('hem')}; zamek od ${e('zipperPants')} (kurtki i płaszcze ${e('zipperCoat')}); skóra od ${e('leather')}. Resztę wyceniamy ze zdjęcia.`],
  uk: [(n) => `Орієнтири для ${n}: низ штанин, талія й рукави від ${e('hem')}; блискавка від ${e('zipperPants')} (куртки й пальта ${e('zipperCoat')}); шкіра від ${e('leather')}. Решту оцінюємо за фото.`],
  nl: [(n) => `Richtprijzen voor ${n}: zomen, taille en mouwen vanaf ${e('hem')}; rits vanaf ${e('zipperPants')} (jassen en mantels ${e('zipperCoat')}); leer vanaf ${e('leather')}. De rest begroten wij op basis van een foto.`],
  ar: [(n) => `أسعار استرشادية في ${n}: الأطراف والخصر والأكمام من ${e('hem')}؛ السحاب من ${e('zipperPants')} (السترات والمعاطف ${e('zipperCoat')})؛ الجلد من ${e('leather')}. وباقي الأعمال نسعّرها من الصورة.`],
};

const LEAD_ALT: Partial<Record<ILang, ((n: string) => string)[]>> = {
  es: [(n) => `¿Qué puede arreglarse durante su estancia en ${n}? Casi todo: bajos, cinturas, mangas, cremalleras, botones, forros, rotos y prendas de piel, además de confección a medida. Recogida y entrega disponibles en el hotel.`],
  fr: [(n) => `Que peut-on retoucher pendant un séjour à ${n} ? Presque tout : ourlets, tailles, manches, fermetures, boutons, doublures, déchirures et articles en cuir, ainsi que la confection sur mesure. Collecte et livraison à l'hôtel.`],
};

const rot = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

export function bolgeMatrisiTurist(lang: ILang, slug: string, n: string): Matris {
  const P = PACKS[lang];
  const h = (s: string) => hashStr(slug + ':' + lang + ':' + s);
  const order = shuf(P.groups, h('g'));
  const groups = order.map((g) => {
    const all = shuf(g.ops, h('o' + g.id)); const ops = g.ops.length > 5 ? all.slice(0, Math.max(5, Math.ceil(g.ops.length * 0.6))) : all; // işlemlerin ~%60'i (en az 5) bölgeye göre seçilir, her işlem başka bölgelerde yer alır; sıra bölgeye göre deterministik karışır (terzihizmeti ile ve bölgeler arası farklı dizilim)
    return { id: g.id, heading: g.heads[h('h' + g.id) % g.heads.length](n), text: g.intro(n, ops.join(lang === 'ar' ? '، ' : ', ')) };
  });
  return { title: P.titles[h('T') % P.titles.length](n), lead: [...P.leads, ...(LEAD_ALT[lang] ?? [])][h('L') % (P.leads.length + (LEAD_ALT[lang]?.length ?? 0))](n), groups, price: [P.price, ...PRICE_ALT[lang]][h('P') % (1 + PRICE_ALT[lang].length)](n) };
}

/** Bölge başına 2 ek soru + 1 bölgeye özgü otel sorusu; slug karmasıyla farklı alt küme. */
export function bolgeEkSssTurist(lang: ILang, slug: string, n: string): [string, string][] {
  const pool = PACKS[lang].faq;
  const start = hashStr(slug + ':' + lang + ':faq2') % pool.length;
  const step = [1, 3, 5][hashStr(slug + ':' + lang + ':fs2') % 3];
  const out: typeof pool = [];
  for (let i = 0; out.length < 2 && i < pool.length * 3; i++) {
    const x = pool[(start + i * step) % pool.length];
    if (!out.includes(x)) out.push(x);
  }
  const list = shuf(out, hashStr(slug + ':' + lang + ':fo')).map((x) => x.f(n));
  const hf = hotelFaq(lang, slug, n);
  if (hf) list.splice(hashStr(slug + ':' + lang + ':hp') % (list.length + 1), 0, hf);
  return list;
}

// Bölgeye özgü otel sorusu: o bölgenin örnek otel adlarını içerir (sayfayı benzersizleştirir); ortaklık iddiası yok.
const HQ: Record<ILang, (n: string, h: string) => string> = {
  es: (n, h) => `¿Atienden en hoteles de ${n} como ${h}?`,
  fr: (n, h) => `Intervenez-vous dans les hôtels de ${n} comme ${h} ?`,
  pl: (n, h) => `Czy obsługujecie hotele w ${n}, takie jak ${h}?`,
  uk: (n, h) => `Чи обслуговуєте ви готелі в районі ${n}, як-от ${h}?`,
  nl: (n, h) => `Komen jullie naar hotels in ${n} zoals ${h}?`,
  ar: (n, h) => `هل تخدمون فنادق ${n} مثل ${h}؟`,
};
const HA: Record<ILang, string> = {
  es: 'Sí. Recogemos y entregamos la prenda en el hotel; si hace falta una prueba, nos vemos en el hotel.',
  fr: "Oui. Nous récupérons et rapportons le vêtement à l'hôtel ; si un essayage est utile, nous nous retrouvons à l'hôtel.",
  pl: 'Tak. Odbieramy i dowozimy ubranie do hotelu; jeśli potrzebna jest przymiarka, spotykamy się w hotelu.',
  uk: 'Так. Забираємо й привозимо одяг до готелю ; якщо потрібна приміряння, зустрічаємося в готелі.',
  nl: 'Ja. Wij halen het kledingstuk op in het hotel en brengen het terug; is een pasbeurt nodig, dan spreken we af in het hotel.',
  ar: 'نعم. نستلم القطعة ونسلّمها في الفندق؛ وإذا لزم القياس نلتقي في الفندق.',
};
function hotelFaq(lang: ILang, slug: string, n: string): [string, string] | null {
  if (!isZone(slug)) return null;
  const hs = zoneData(lang, slug).hotels;
  if (!hs.length) return null;
  const pick = shuf(hs, hashStr(slug + ':' + lang + ':hn')).slice(0, 3).join(lang === 'ar' ? '، ' : ', ');
  return [HQ[lang](n, pick), HA[lang] + ' ' + HOTEL_NOTE[lang]];
}

/** Bölgeye göre farklı başlık/açıklama için ek başlık alternatifleri (ZCOPY.title'a ek). */
export function zoneSeoTitles(lang: ILang, n: string, order: number): string[] {
  const t = PACKS[lang].seo.map((f) => f(n));
  const k = Math.max(0, order) % t.length;
  return rot(t, k);
}
