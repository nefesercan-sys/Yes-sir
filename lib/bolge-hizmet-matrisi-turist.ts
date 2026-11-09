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
    titles: [(n) => `Qué arreglos hacemos en ${n}`, (n) => `Arreglos de ropa en ${n}: acortar, entallar, reparar`],
    leads: [
      (n) => `Si se aloja en ${n}, acortamos, entallamos, reparamos y arreglamos ropa de hombre y de mujer, cambiamos cremalleras, botones y forros, y confeccionamos a medida. Recogemos en su hotel.`,
      (n) => `Pantalones, vaqueros, faldas, vestidos, chaquetas, abrigos, camisas, blusas, chalecos, monos y chándales: todos los arreglos para huéspedes en ${n}, con recogida en el hotel.`,
    ],
    price: (n) => `Precios desde para ${n}: acortar o estrechar bajos, cintura, mangas y largo desde ${e('hem')}, cambio de cremallera desde ${e('zipperPants')} (abrigos y chaquetas ${e('zipperCoat')}), arreglos de piel desde ${e('leather')}. El resto de trabajos, según la foto.`,
    groups: [
      { id: 'pantolon', ops: ['acortar bajos de pantalón', 'estrechar la cintura', 'estrechar las piernas', 'ensanchar la cintura', 'acortar vaqueros manteniendo el bajo original', 'cambiar y reparar cremalleras de pantalón', 'cambiar botones', 'reparar rotos y descosidos'], heads: [(n) => `Pantalones y vaqueros: arreglos en ${n}`, (n) => `Acortar bajos y estrechar cintura en ${n}`], intro: (n, o) => `Para pantalones y vaqueros en ${n}: ${o}.` },
      { id: 'etek-elbise', ops: ['acortar faldas', 'estrechar la cintura de faldas', 'acortar vestidos', 'estrechar vestidos', 'ajustar la longitud de los tirantes', 'cambiar cremalleras de vestido', 'cambiar forros', 'arreglar vestidos de fiesta y de novia (solo arreglos)', 'confección de vestidos a medida'], heads: [(n) => `Faldas y vestidos: arreglos en ${n}`, (n) => `Vestidos de fiesta y tirantes en ${n}`], intro: (n, o) => `Faldas, vestidos y ropa de fiesta en ${n}: ${o}.` },
      { id: 'ust-giyim', ops: ['acortar mangas de chaquetas y abrigos', 'acortar el largo', 'entallar', 'arreglar abrigos y parkas', 'cambiar cremalleras de chaquetas y abrigos', 'cambiar forros', 'cambiar botones', 'reparar rotos y descosidos', 'arreglar chaquetas de piel'], heads: [(n) => `Chaquetas, abrigos y parkas en ${n}`, (n) => `Cremallera, forro y botones de chaqueta en ${n}`], intro: (n, o) => `Chaquetas, abrigos y parkas en ${n}: ${o}. Listo el mismo día; urgente en 1–2 horas.` },
      { id: 'gomlek-bluz', ops: ['entallar y acortar camisas', 'entallar blusas', 'acortar y entallar camisetas', 'acortar mangas', 'cambiar botones', 'coser descosidos', 'camisas y blusas a medida'], heads: [(n) => `Camisas y blusas: arreglos en ${n}`, (n) => `Camisetas, blusas y camisas en ${n}`], intro: (n, o) => `Camisas, blusas y camisetas en ${n}: ${o}.` },
      { id: 'yelek-tulum', ops: ['arreglar chalecos', 'acortar y entallar monos', 'ajustar bajos y cintura de pantalones de chándal', 'acortar pantalones cortos', 'chalecos, monos y chándales a medida', 'cambiar cremalleras', 'reparar rotos y descosidos'], heads: [(n) => `Chalecos, monos y chándales en ${n}`, (n) => `Acortar pantalones cortos y entallar monos en ${n}`], intro: (n, o) => `Chalecos, monos, chándales y pantalones cortos en ${n}: ${o}.` },
      { id: 'fermuar-dugme', ops: ['cambiar cremalleras en pantalones, abrigos, chaquetas y bolsos (con y sin cremallera)', 'reparar cremalleras atascadas', 'cambiar botones', 'cambiar forros (excepto en jerséis y chaquetas de punto)', 'reparar rotos y descosidos'], heads: [(n) => `Cambiar o reparar una cremallera en ${n}`, (n) => `Cremalleras, botones y forros en ${n}`], intro: (n, o) => `Cremalleras, botones y forros en ${n}: ${o}.` },
      { id: 'deri', ops: ['cambiar el cuello de chaquetas de piel', 'acortar mangas de chaquetas de piel', 'acortar el largo de chaquetas de piel', 'entallar chaquetas de piel', 'estrechar la cintura de pantalones de piel', 'acortar pantalones de piel', 'cambiar cremalleras de pantalones de piel', 'arreglar chalecos de piel'], heads: [(n) =>`Chaquetas, pantalones y chalecos de piel en ${n}`, (n) =>`Cuello y mangas de chaqueta de piel en ${n}`], intro: (n, o) => `Prendas de piel en ${n}: ${o}. Los trabajos de piel empiezan desde ${e('leather')}.` },
      { id: 'kot', ops: ['acortar bajos de vaqueros', 'acortar vaqueros manteniendo el bajo original', 'estrechar la cintura de vaqueros', 'estrechar piernas de vaqueros', 'acortar mangas y largo de chaquetas vaqueras', 'entallar chaquetas vaqueras', 'acortar y entallar abrigos vaqueros', 'acortar faldas vaqueras y estrechar la cintura', 'acortar pantalones cortos vaqueros', 'cambiar cremalleras y botones de vaqueros', 'reparar rotos en vaqueros'], heads: [(n) =>`Vaqueros, chaquetas y abrigos vaqueros en ${n}`, (n) =>`Falda y pantalón corto vaquero: acortar en ${n}`], intro: (n, o) => `Prendas vaqueras en ${n}: ${o}. Desde ${e('hem')}.` },
    ],
    faq: [
      { id: 'paca', f: (n) => [`¿Cuánto cuesta acortar un pantalón en ${n}?`, `Acortar bajos cuesta desde ${e('hem')}; el precio exacto se indica por foto en WhatsApp. Los trabajos normales están listos el mismo día y los urgentes en 1–2 horas.`] },
      { id: 'fermuar', f: (n) => [`Se me ha roto la cremallera en ${n}: ¿qué hago?`, `Envíe una foto de la cremallera por WhatsApp. Cambiarla cuesta desde ${e('zipperPants')} (abrigos y chaquetas ${e('zipperCoat')}); una cremallera atascada a menudo se repara sin cambiarla.`] },
      { id: 'kol', f: (n) => [`¿Acortan mangas de chaquetas y abrigos en ${n}?`, `Sí. Acortar mangas y largo de chaquetas y abrigos cuesta desde ${e('hem')}; la manga se marca con la prenda puesta. La recogida y la entrega en el hotel están disponibles.`] },
      { id: 'aski', f: (n) => [`¿Pueden ajustar los tirantes de un vestido en ${n}?`, 'Sí. Ajustamos la longitud de los tirantes en vestidos y ropa de fiesta; el precio depende del trabajo, envíe una foto. En vestidos de novia solo hacemos arreglos.'] },
      { id: 'astar', f: (n) => [`¿Cambian el forro de chaquetas y abrigos en ${n}?`, 'Sí, cambiamos forros (no en jerséis ni chaquetas de punto). El precio depende del forro y del trabajo; se indica por foto.'] },
      { id: 'dugme', f: (n) => [`¿Cambian botones en ${n}?`, 'Sí. Cambiamos botones en camisas, chaquetas, abrigos y pantalones; el precio se indica por foto.'] },
      { id: 'soktuk', f: (n) => [`¿Reparan rotos y descosidos en ${n}?`, 'Sí. Cosemos descosidos y reparamos rotos en cualquier prenda; el precio depende del trabajo, envíe una foto.'] },
      { id: 'dikim', f: (n) => [`¿Confeccionan vestidos, chalecos o chándales a medida para ${n}?`, 'Sí. Confeccionamos vestidos, chalecos, monos, blusas y chándales a su medida; envíe una foto del modelo y le decimos precio y plazo. Los vestidos de novia no se confeccionan, solo se arreglan.'] },
      { id: 'deri', f: (n) => [`¿Pueden cambiar el cuello o acortar mangas y largo de una chaqueta de piel en ${n}?`, `Sí. Cambiamos cuellos, acortamos mangas y largo y entallamos chaquetas de piel; los trabajos de piel empiezan desde ${e('leather')}, precio exacto por foto.`] },
      { id: 'deripant', f: (n) => [`¿Estrechan la cintura y acortan pantalones de piel en ${n}?`, `Sí. En pantalones y chalecos de piel: estrechar cintura, acortar, cambiar y reparar cremalleras; desde ${e('leather')}, precio exacto por foto.`] },
      { id: 'kotmont', f: (n) => [`¿Acortan chaquetas vaqueras, abrigos vaqueros y pantalones cortos vaqueros en ${n}?`, `Sí. Acortamos y entallamos mangas y largo de chaquetas y abrigos vaqueros, y acortamos pantalones cortos vaqueros; desde ${e('hem')}.`] },
    ],
    seo: [(n) => `Sastre en ${n}: acortar, cremalleras, arreglos`, (n) => `Arreglos de ropa en ${n} · entallar y acortar`, (n) => `Sastre ${n}: pantalón, vestido, chaqueta`],
  },
  fr: {
    titles: [(n) => `Les retouches que nous faisons à ${n}`, (n) => `Retouches à ${n} : raccourcir, ajuster, réparer`],
    leads: [
      (n) => `Si vous séjournez à ${n}, nous raccourcissons, ajustons, réparons et retouchons les vêtements pour hommes et femmes, changeons fermetures éclair, boutons et doublures, et confectionnons sur mesure. Collecte à votre hôtel.`,
      (n) => `Pantalons, jeans, jupes, robes, vestes, manteaux, chemises, chemisiers, gilets, combinaisons et joggings : toutes les retouches pour les clients à ${n}, avec collecte à l'hôtel.`,
    ],
    price: (n) => `Prix « à partir de » pour ${n} : ourlet, taille, manches et longueur dès ${e('hem')}, changement de fermeture éclair dès ${e('zipperPants')} (manteaux et vestes ${e('zipperCoat')}), retouches du cuir dès ${e('leather')}. Les autres travaux selon la photo.`,
    groups: [
      { id: 'pantolon', ops: ['raccourcir l\'ourlet des pantalons', 'reprendre la taille', 'affiner les jambes', 'élargir la taille', 'raccourcir un jean en gardant l\'ourlet d\'origine', 'changer et réparer la fermeture éclair d\'un pantalon', 'remplacer des boutons', 'réparer déchirures et coutures défaites'], heads: [(n) => `Pantalons et jeans : retouches à ${n}`, (n) => `Raccourcir l'ourlet et reprendre la taille à ${n}`], intro: (n, o) => `Pour pantalons et jeans à ${n} : ${o}.` },
      { id: 'etek-elbise', ops: ['raccourcir les jupes', 'reprendre la taille des jupes', 'raccourcir les robes', 'ajuster les robes', 'régler la longueur des bretelles', 'changer la fermeture éclair d\'une robe', 'remplacer la doublure', 'retoucher robes de soirée et de mariée (retouches uniquement)', 'robes sur mesure'], heads: [(n) => `Jupes et robes : retouches à ${n}`, (n) => `Robes de soirée et bretelles à ${n}`], intro: (n, o) => `Jupes, robes et tenues de soirée à ${n} : ${o}.` },
      { id: 'ust-giyim', ops: ['raccourcir les manches de vestes et manteaux', 'raccourcir la longueur', 'ajuster à la taille', 'retoucher manteaux et parkas', 'changer la fermeture éclair de vestes et manteaux', 'remplacer la doublure', 'remplacer des boutons', 'réparer déchirures et coutures défaites', 'retoucher les vestes en cuir'], heads: [(n) => `Vestes, manteaux et parkas à ${n}`, (n) => `Fermeture éclair, doublure et boutons de veste à ${n}`], intro: (n, o) => `Vestes, manteaux et parkas à ${n} : ${o}. Prêt le jour même ; urgent en 1 à 2 heures.` },
      { id: 'gomlek-bluz', ops: ['ajuster et raccourcir les chemises', 'ajuster les chemisiers', 'raccourcir et ajuster les T-shirts', 'raccourcir les manches', 'remplacer des boutons', 'recoudre les coutures défaites', 'chemises et chemisiers sur mesure'], heads: [(n) => `Chemises et chemisiers : retouches à ${n}`, (n) => `T-shirts, chemisiers et chemises à ${n}`], intro: (n, o) => `Chemises, chemisiers et T-shirts à ${n} : ${o}.` },
      { id: 'yelek-tulum', ops: ['retoucher les gilets', 'raccourcir et ajuster les combinaisons', 'ajuster le bas et la taille des joggings', 'raccourcir les shorts', 'gilets, combinaisons et joggings sur mesure', 'changer les fermetures éclair', 'réparer déchirures et coutures défaites'], heads: [(n) => `Gilets, combinaisons et joggings à ${n}`, (n) => `Raccourcir un short et ajuster une combinaison à ${n}`], intro: (n, o) => `Gilets, combinaisons, joggings et shorts à ${n} : ${o}.` },
      { id: 'fermuar-dugme', ops: ['changer les fermetures éclair de pantalons, manteaux, vestes et sacs (avec ou sans fermeture)', 'réparer les fermetures coincées', 'remplacer des boutons', 'remplacer la doublure (sauf pulls et gilets en maille)', 'réparer déchirures et coutures défaites'], heads: [(n) => `Changer ou réparer une fermeture éclair à ${n}`, (n) => `Fermetures éclair, boutons et doublures à ${n}`], intro: (n, o) => `Fermetures éclair, boutons et doublures à ${n} : ${o}.` },
      { id: 'deri', ops: ['changer le col des vestes en cuir', 'raccourcir les manches des vestes en cuir', 'raccourcir la longueur des vestes en cuir', 'ajuster les vestes en cuir', 'reprendre la taille des pantalons en cuir', 'raccourcir les pantalons en cuir', 'changer la fermeture éclair des pantalons en cuir', 'retoucher les gilets en cuir'], heads: [(n) =>`Vestes, pantalons et gilets en cuir à ${n}`, (n) =>`Col et manches de veste en cuir à ${n}`], intro: (n, o) => `Vêtements en cuir à ${n} : ${o}. Travaux sur cuir dès ${e('leather')}.` },
      { id: 'kot', ops: ['raccourcir l\'ourlet des jeans', 'raccourcir un jean en gardant l\'ourlet d\'origine', 'reprendre la taille des jeans', 'affiner les jambes des jeans', 'raccourcir manches et longueur des vestes en jean', 'ajuster les vestes en jean', 'raccourcir et ajuster les manteaux en jean', 'raccourcir les jupes en jean et reprendre la taille', 'raccourcir les shorts en jean', 'changer fermetures éclair et boutons des jeans', 'réparer les déchirures de jean'], heads: [(n) =>`Jeans, vestes et manteaux en jean à ${n}`, (n) =>`Jupe et short en jean : raccourcir à ${n}`], intro: (n, o) => `Vêtements en jean à ${n} : ${o}. Dès ${e('hem')}.` },
    ],
    faq: [
      { id: 'paca', f: (n) => [`Combien coûte le raccourcissement d'un pantalon à ${n} ?`, `Raccourcir l'ourlet coûte dès ${e('hem')} ; le prix exact est donné par photo sur WhatsApp. Travaux normaux prêts le jour même, urgents en 1 à 2 heures.`] },
      { id: 'fermuar', f: (n) => [`Ma fermeture éclair est cassée à ${n} : que faire ?`, `Envoyez une photo de la fermeture sur WhatsApp. Le remplacement coûte dès ${e('zipperPants')} (manteaux et vestes ${e('zipperCoat')}) ; une fermeture coincée peut souvent être réparée sans remplacement.`] },
      { id: 'kol', f: (n) => [`Raccourcissez-vous les manches de vestes et manteaux à ${n} ?`, `Oui. Raccourcir manches et longueur de vestes et manteaux coûte dès ${e('hem')} ; la manche est marquée vêtement porté. La collecte et la livraison à l'hôtel sont assurées.`] },
      { id: 'aski', f: (n) => [`Peut-on régler les bretelles d'une robe à ${n} ?`, 'Oui. Nous réglons la longueur des bretelles sur robes et tenues de soirée ; le prix dépend du travail, envoyez une photo. Robes de mariée : retouches uniquement.'] },
      { id: 'astar', f: (n) => [`Changez-vous la doublure des vestes et manteaux à ${n} ?`, 'Oui, nous changeons les doublures (pas sur pulls ni gilets en maille). Le prix dépend de la doublure et du travail, indiqué par photo.'] },
      { id: 'dugme', f: (n) => [`Remplacez-vous les boutons à ${n} ?`, 'Oui. Nous remplaçons les boutons de chemises, vestes, manteaux et pantalons ; le prix est indiqué par photo.'] },
      { id: 'soktuk', f: (n) => [`Réparez-vous déchirures et coutures défaites à ${n} ?`, 'Oui. Nous recousons les coutures défaites et réparons les déchirures sur tous les vêtements ; le prix dépend du travail, envoyez une photo.'] },
      { id: 'dikim', f: (n) => [`Confectionnez-vous robes, gilets ou joggings sur mesure pour ${n} ?`, 'Oui. Robes, gilets, combinaisons, chemisiers et joggings sont confectionnés sur vos mesures ; envoyez une photo du modèle, nous indiquons prix et délai. Les robes de mariée ne sont pas confectionnées, seulement retouchées.'] },
      { id: 'deri', f: (n) => [`Peut-on changer le col ou raccourcir manches et longueur d'une veste en cuir à ${n} ?`, `Oui. Nous changeons les cols, raccourcissons manches et longueur et ajustons les vestes en cuir ; travaux sur cuir dès ${e('leather')}, prix exact par photo.`] },
      { id: 'deripant', f: (n) => [`Reprenez-vous la taille et raccourcissez-vous les pantalons en cuir à ${n} ?`, `Oui. Pantalons et gilets en cuir : reprise de taille, raccourcissement, changement et réparation de fermeture ; dès ${e('leather')}, prix exact par photo.`] },
      { id: 'kotmont', f: (n) => [`Raccourcissez-vous vestes, manteaux et shorts en jean à ${n} ?`, `Oui. Nous raccourcissons et ajustons manches et longueur des vestes et manteaux en jean, et raccourcissons les shorts en jean ; dès ${e('hem')}.`] },
    ],
    seo: [(n) => `Couturier à ${n} : raccourcir, fermetures, retouches`, (n) => `Retouches vêtements à ${n} · ajuster, raccourcir`, (n) => `Couturier ${n} : pantalon, robe, veste`],
  },
  pl: {
    titles: [(n) => `Jakie poprawki krawieckie robimy: ${n}`, (n) => `${n}: skracanie, zwężanie, naprawa ubrań`],
    leads: [
      (n) => `Jeśli nocujesz w rejonie: ${n}, skracamy, zwężamy, naprawiamy i przerabiamy odzież damską i męską, wymieniamy zamki, guziki i podszewki oraz szyjemy na miarę. Odbieramy z hotelu.`,
      (n) => `Spodnie, jeansy, spódnice, sukienki, kurtki, płaszcze, koszule, bluzki, kamizelki, kombinezony i dresy: wszystkie poprawki dla gości hotelowych (${n}), z odbiorem z hotelu.`,
    ],
    price: (n) => `Ceny „od” (${n}): skracanie i zwężanie nogawek, pasa, rękawów i długości od ${e('hem')}, wymiana zamka od ${e('zipperPants')} (płaszcze i kurtki ${e('zipperCoat')}), naprawy skóry od ${e('leather')}. Pozostałe prace wyceniamy ze zdjęcia.`,
    groups: [
      { id: 'pantolon', ops: ['skracanie nogawek', 'zwężanie w pasie', 'zwężanie nogawek', 'poszerzanie w pasie', 'skracanie jeansów z zachowaniem oryginalnego dołu', 'wymiana i naprawa zamka w spodniach', 'wymiana guzików', 'naprawa dziur i rozprutych szwów'], heads: [(n) => `${n}: spodnie i jeansy – przeróbki`, (n) => `${n}: skracanie nogawek i zwężanie w pasie`], intro: (n, o) => `Spodnie i jeansy (${n}): ${o}.` },
      { id: 'etek-elbise', ops: ['skracanie spódnic', 'zwężanie spódnic w pasie', 'skracanie sukienek', 'zwężanie sukienek', 'regulacja długości ramiączek', 'wymiana zamka w sukience', 'wymiana podszewki', 'przeróbki sukien wieczorowych i ślubnych (tylko przeróbki)', 'szycie sukienek na miarę'], heads: [(n) => `${n}: spódnice i sukienki – przeróbki`, (n) => `${n}: suknie wieczorowe i ramiączka`], intro: (n, o) => `Spódnice, sukienki i stroje wieczorowe (${n}): ${o}.` },
      { id: 'ust-giyim', ops: ['skracanie rękawów kurtek i płaszczy', 'skracanie długości', 'zwężanie w talii', 'przeróbki płaszczy i parek', 'wymiana zamka w kurtkach i płaszczach', 'wymiana podszewki', 'wymiana guzików', 'naprawa dziur i rozprutych szwów', 'przeróbki kurtek skórzanych'], heads: [(n) => `${n}: kurtki, płaszcze i parki`, (n) => `${n}: zamek, podszewka i guziki w kurtce`], intro: (n, o) => `Kurtki, płaszcze i parki (${n}): ${o}. Gotowe tego samego dnia; pilne w 1–2 godziny.` },
      { id: 'gomlek-bluz', ops: ['zwężanie i skracanie koszul', 'zwężanie bluzek', 'skracanie i zwężanie T-shirtów', 'skracanie rękawów', 'wymiana guzików', 'zszywanie rozprutych szwów', 'koszule i bluzki na miarę'], heads: [(n) => `${n}: koszule i bluzki – przeróbki`, (n) => `${n}: T-shirty, bluzki i koszule`], intro: (n, o) => `Koszule, bluzki i T-shirty (${n}): ${o}.` },
      { id: 'yelek-tulum', ops: ['naprawa i przeróbki kamizelek', 'skracanie i zwężanie kombinezonów', 'dopasowanie dołu i pasa spodni dresowych', 'skracanie szortów', 'kamizelki, kombinezony i dresy na miarę', 'wymiana zamków', 'naprawa dziur i rozprutych szwów'], heads: [(n) => `${n}: kamizelki, kombinezony i dresy`, (n) => `${n}: skracanie szortów i zwężanie kombinezonów`], intro: (n, o) => `Kamizelki, kombinezony, dresy i szorty (${n}): ${o}.` },
      { id: 'fermuar-dugme', ops: ['wymiana zamków w spodniach, płaszczach, kurtkach i torbach (z zamkiem i bez)', 'naprawa zablokowanych zamków', 'wymiana guzików', 'wymiana podszewki (oprócz swetrów i kardiganów)', 'naprawa dziur i rozprutych szwów'], heads: [(n) => `${n}: wymiana i naprawa zamka`, (n) => `${n}: zamki, guziki i podszewki`], intro: (n, o) => `Zamki, guziki i podszewki (${n}): ${o}.` },
      { id: 'deri', ops: ['wymiana kołnierza w kurtce skórzanej', 'skracanie rękawów kurtki skórzanej', 'skracanie długości kurtki skórzanej', 'zwężanie kurtki skórzanej', 'zwężanie w pasie spodni skórzanych', 'skracanie spodni skórzanych', 'wymiana zamka w spodniach skórzanych', 'naprawa kamizelek skórzanych'], heads: [(n) =>`${n}: kurtki, spodnie i kamizelki skórzane`, (n) =>`${n}: kołnierz i rękawy kurtki skórzanej`], intro: (n, o) => `Odzież skórzana (${n}): ${o}. Prace na skórze od ${e('leather')}.` },
      { id: 'kot', ops: ['skracanie nogawek jeansów', 'skracanie jeansów z zachowaniem oryginalnego dołu', 'zwężanie jeansów w pasie', 'zwężanie nogawek jeansów', 'skracanie rękawów i długości kurtek jeansowych', 'zwężanie kurtek jeansowych', 'skracanie i zwężanie płaszczy jeansowych', 'skracanie spódnic jeansowych i zwężanie w pasie', 'skracanie szortów jeansowych', 'wymiana zamków i guzików w jeansach', 'naprawa dziur w jeansie'], heads: [(n) =>`${n}: jeansy, kurtki i płaszcze jeansowe`, (n) =>`${n}: spódnica i szorty jeansowe – skracanie`], intro: (n, o) => `Odzież jeansowa (${n}): ${o}. Od ${e('hem')}.` },
    ],
    faq: [
      { id: 'paca', f: (n) => [`Ile kosztuje skrócenie spodni (${n})?`, `Skracanie nogawek od ${e('hem')}; dokładną cenę podajemy ze zdjęcia na WhatsAppie. Zwykłe prace gotowe tego samego dnia, pilne w 1–2 godziny.`] },
      { id: 'fermuar', f: (n) => [`Zepsuł mi się zamek (${n}) – co robić?`, `Wyślij zdjęcie zamka na WhatsAppie. Wymiana zamka od ${e('zipperPants')} (płaszcze i kurtki ${e('zipperCoat')}); zablokowany zamek często da się naprawić bez wymiany.`] },
      { id: 'kol', f: (n) => [`Czy skracacie rękawy kurtek i płaszczy (${n})?`, `Tak. Skracanie rękawów i długości kurtek i płaszczy od ${e('hem')}; rękaw zaznaczamy na ubraniu założonym przez klienta. Odbiór i dostawa do hotelu są dostępne.`] },
      { id: 'aski', f: (n) => [`Czy można wyregulować ramiączka sukienki (${n})?`, 'Tak. Regulujemy długość ramiączek w sukienkach i strojach wieczorowych; cena zależy od pracy, wyślij zdjęcie. Suknie ślubne tylko przerabiamy.'] },
      { id: 'astar', f: (n) => [`Czy wymieniacie podszewkę w kurtkach i płaszczach (${n})?`, 'Tak, wymieniamy podszewki (nie w swetrach ani kardiganach). Cena zależy od podszewki i zakresu pracy, podajemy ją ze zdjęcia.'] },
      { id: 'dugme', f: (n) => [`Czy wymieniacie guziki (${n})?`, 'Tak. Wymieniamy guziki w koszulach, kurtkach, płaszczach i spodniach; cenę podajemy ze zdjęcia.'] },
      { id: 'soktuk', f: (n) => [`Czy naprawiacie dziury i rozprute szwy (${n})?`, 'Tak. Zszywamy rozprute szwy i naprawiamy dziury w każdym rodzaju odzieży; cena zależy od pracy, wyślij zdjęcie.'] },
      { id: 'dikim', f: (n) => [`Czy szyjecie sukienki, kamizelki lub dresy na miarę (${n})?`, 'Tak. Sukienki, kamizelki, kombinezony, bluzki i dresy szyjemy na Twoje wymiary; wyślij zdjęcie modelu, a podamy cenę i termin. Sukien ślubnych nie szyjemy od zera, tylko przerabiamy.'] },
      { id: 'deri', f: (n) => [`Czy można wymienić kołnierz lub skrócić rękawy i długość kurtki skórzanej (${n})?`, `Tak. Wymieniamy kołnierze, skracamy rękawy i długość oraz zwężamy kurtki skórzane; prace na skórze od ${e('leather')}, dokładna cena ze zdjęcia.`] },
      { id: 'deripant', f: (n) => [`Czy zwężacie w pasie i skracacie spodnie skórzane (${n})?`, `Tak. Spodnie i kamizelki skórzane: zwężanie w pasie, skracanie, wymiana i naprawa zamka; od ${e('leather')}, dokładna cena ze zdjęcia.`] },
      { id: 'kotmont', f: (n) => [`Czy skracacie kurtki, płaszcze i szorty jeansowe (${n})?`, `Tak. Skracamy i zwężamy rękawy i długość kurtek i płaszczy jeansowych oraz skracamy szorty jeansowe; od ${e('hem')}.`] },
    ],
    seo: [(n) => `Krawiec ${n}: skracanie, zamki, przeróbki`, (n) => `${n}: przeróbki krawieckie, zwężanie, skracanie`, (n) => `Krawiec ${n}: spodnie, sukienka, kurtka`],
  },
  uk: {
    titles: [(n) => `Які роботи ми виконуємо: ${n}`, (n) => `${n}: вкорочення, зауження, ремонт одягу`],
    leads: [
      (n) => `Якщо ви зупинилися в районі: ${n}, ми вкорочуємо, зауджуємо, ремонтуємо та переробляємо чоловічий і жіночий одяг, міняємо блискавки, ґудзики й підкладку та шиємо на замовлення. Забираємо з готелю.`,
      (n) => `Штани, джинси, спідниці, сукні, куртки, пальта, сорочки, блузки, жилети, комбінезони й спортивні костюми: усі переробки для гостей готелів (${n}) із забором з готелю.`,
    ],
    price: (n) => `Ціни «від» (${n}): вкорочення й зауження низу, пояса, рукавів і довжини від ${e('hem')}, заміна блискавки від ${e('zipperPants')} (куртки й пальта ${e('zipperCoat')}), ремонт шкіряних виробів від ${e('leather')}. Інші роботи оцінюємо за фото.`,
    groups: [
      { id: 'pantolon', ops: ['підшивання штанів', 'зауження в поясі', 'зауження штанин', 'розширення пояса', 'вкорочення джинсів зі збереженням оригінального низу', 'заміна й ремонт блискавки на штанях', 'заміна ґудзиків', 'ремонт дір і розпоротих швів'], heads: [(n) => `${n}: переробка штанів і джинсів`, (n) => `${n}: підшити штани й звузити пояс`], intro: (n, o) => `Штани й джинси (${n}): ${o}.` },
      { id: 'etek-elbise', ops: ['вкорочення спідниць', 'зауження спідниць у поясі', 'вкорочення суконь', 'зауження суконь', 'регулювання довжини бретельок', 'заміна блискавки на сукні', 'заміна підкладки', 'переробка вечірніх і весільних суконь (лише переробка)', 'пошиття суконь на замовлення'], heads: [(n) => `${n}: переробка спідниць і суконь`, (n) => `${n}: вечірні сукні й бретельки`], intro: (n, o) => `Спідниці, сукні та вечірній одяг (${n}): ${o}.` },
      { id: 'ust-giyim', ops: ['вкорочення рукавів курток і пальт', 'вкорочення довжини', 'зауження по фігурі', 'переробка пальт і парок', 'заміна блискавки на куртках і пальтах', 'заміна підкладки', 'заміна ґудзиків', 'ремонт дір і розпоротих швів', 'переробка шкіряних курток'], heads: [(n) => `${n}: куртки, пальта й парки`, (n) => `${n}: блискавка, підкладка й ґудзики куртки`], intro: (n, o) => `Куртки, пальта й парки (${n}): ${o}. Готово того ж дня; термінове — за 1–2 години.` },
      { id: 'gomlek-bluz', ops: ['зауження й вкорочення сорочок', 'зауження блузок', 'вкорочення й зауження футболок', 'вкорочення рукавів', 'заміна ґудзиків', 'зашивання розпоротих швів', 'сорочки й блузки на замовлення'], heads: [(n) => `${n}: переробка сорочок і блузок`, (n) => `${n}: футболки, блузки й сорочки`], intro: (n, o) => `Сорочки, блузки й футболки (${n}): ${o}.` },
      { id: 'yelek-tulum', ops: ['ремонт і переробка жилетів', 'вкорочення й зауження комбінезонів', 'підгонка низу й пояса спортивних штанів', 'вкорочення шортів', 'жилети, комбінезони й спортивні костюми на замовлення', 'заміна блискавок', 'ремонт дір і розпоротих швів'], heads: [(n) => `${n}: жилети, комбінезони, спортивні штани`, (n) => `${n}: вкоротити шорти, звузити комбінезон`], intro: (n, o) => `Жилети, комбінезони, спортивні костюми й шорти (${n}): ${o}.` },
      { id: 'fermuar-dugme', ops: ['заміна блискавок на штанях, пальтах, куртках і сумках (з блискавкою й без)', 'ремонт заклинених блискавок', 'заміна ґудзиків', 'заміна підкладки (крім светрів і кардиганів)', 'ремонт дір і розпоротих швів'], heads: [(n) => `${n}: заміна й ремонт блискавки`, (n) => `${n}: блискавки, ґудзики й підкладка`], intro: (n, o) => `Блискавки, ґудзики й підкладка (${n}): ${o}.` },
      { id: 'deri', ops: ['заміна коміра шкіряної куртки', 'вкорочення рукавів шкіряної куртки', 'вкорочення довжини шкіряної куртки', 'зауження шкіряної куртки', 'зауження шкіряних штанів у поясі', 'підшивання шкіряних штанів', 'заміна блискавки на шкіряних штанях', 'ремонт шкіряних жилетів'], heads: [(n) =>`${n}: шкіряні куртки, штани й жилети`, (n) =>`${n}: комір і рукави шкіряної куртки`], intro: (n, o) => `Шкіряний одяг (${n}): ${o}. Роботи зі шкірою від ${e('leather')}.` },
      { id: 'kot', ops: ['підшивання джинсів', 'вкорочення джинсів зі збереженням оригінального низу', 'зауження джинсів у поясі', 'зауження штанин джинсів', 'вкорочення рукавів і довжини джинсової куртки', 'зауження джинсової куртки', 'вкорочення й зауження джинсового пальта', 'вкорочення джинсової спідниці й зауження в поясі', 'вкорочення джинсових шортів', 'заміна блискавок і ґудзиків на джинсах', 'ремонт дір на джинсах'], heads: [(n) =>`${n}: джинси, джинсові куртки й пальта`, (n) =>`${n}: джинсова спідниця й шорти — вкорочення`], intro: (n, o) => `Джинсовий одяг (${n}): ${o}. Від ${e('hem')}.` },
    ],
    faq: [
      { id: 'paca', f: (n) => [`Скільки коштує підшити штани (${n})?`, `Підшивання низу штанів — від ${e('hem')}; точну ціну називаємо за фото у WhatsApp. Звичайні роботи готові того ж дня, термінові — за 1–2 години.`] },
      { id: 'fermuar', f: (n) => [`Зламалася блискавка (${n}) — що робити?`, `Надішліть фото блискавки у WhatsApp. Заміна блискавки — від ${e('zipperPants')} (куртки й пальта ${e('zipperCoat')}); заклинену блискавку часто можна полагодити без заміни.`] },
      { id: 'kol', f: (n) => [`Чи вкорочуєте ви рукави курток і пальт (${n})?`, `Так. Вкорочення рукавів і довжини курток і пальт — від ${e('hem')}; довжину рукава позначаємо на вас. Забір і доставка до готелю доступні.`] },
      { id: 'aski', f: (n) => [`Чи можна підігнати бретельки сукні (${n})?`, 'Так. Регулюємо довжину бретельок на сукнях і вечірньому одязі; ціна залежить від роботи, надішліть фото. Весільні сукні лише переробляємо.'] },
      { id: 'astar', f: (n) => [`Чи міняєте ви підкладку на куртках і пальтах (${n})?`, 'Так, міняємо підкладку (крім светрів і кардиганів). Ціна залежить від підкладки й обсягу роботи, називаємо за фото.'] },
      { id: 'dugme', f: (n) => [`Чи міняєте ґудзики (${n})?`, 'Так. Міняємо ґудзики на сорочках, куртках, пальтах і штанах; ціну називаємо за фото.'] },
      { id: 'soktuk', f: (n) => [`Чи ремонтуєте діри й розпороті шви (${n})?`, 'Так. Зашиваємо розпороті шви й ремонтуємо діри на будь-якому одязі; ціна залежить від роботи, надішліть фото.'] },
      { id: 'dikim', f: (n) => [`Чи шиєте сукні, жилети або спортивні костюми на замовлення (${n})?`, 'Так. Сукні, жилети, комбінезони, блузки й спортивні костюми шиємо за вашими мірками; надішліть фото моделі — назвемо ціну й термін. Весільні сукні з нуля не шиємо, лише переробляємо.'] },
      { id: 'deri', f: (n) => [`Чи можна замінити комір або вкоротити рукави й довжину шкіряної куртки (${n})?`, `Так. Міняємо коміри, вкорочуємо рукави й довжину та зауджуємо шкіряні куртки; роботи зі шкірою від ${e('leather')}, точна ціна за фото.`] },
      { id: 'deripant', f: (n) => [`Чи зауджуєте в поясі й підшиваєте шкіряні штани (${n})?`, `Так. Шкіряні штани й жилети: зауження в поясі, підшивання, заміна й ремонт блискавки; від ${e('leather')}, точна ціна за фото.`] },
      { id: 'kotmont', f: (n) => [`Чи вкорочуєте джинсові куртки, пальта й шорти (${n})?`, `Так. Вкорочуємо й зауджуємо рукави та довжину джинсових курток і пальт, а також вкорочуємо джинсові шорти; від ${e('hem')}.`] },
    ],
    seo: [(n) => `Кравець ${n}: вкорочення, блискавки, переробка`, (n) => `${n}: переробка одягу, зауження, підшивання`, (n) => `Кравець ${n}: штани, сукня, куртка`],
  },
  nl: {
    titles: [(n) => `Welke kleermakerswerk wij doen in ${n}`, (n) => `Kleding vermaken in ${n}: korter, nauwer, repareren`],
    leads: [
      (n) => `Verblijft u in ${n}? Wij korten in, nemen in, repareren en vermaken dames- en herenkleding, vervangen ritsen, knopen en voering en maken kleding op maat. Wij halen op bij uw hotel.`,
      (n) => `Broeken, spijkerbroeken, rokken, jurken, jassen, mantels, overhemden, blouses, gilets, jumpsuits en joggingbroeken: alle vermaakwerk voor hotelgasten in ${n}, met ophaalservice.`,
    ],
    price: (n) => `Vanafprijzen voor ${n}: zoom, taille, mouwen en lengte korter of nauwer vanaf ${e('hem')}, rits vervangen vanaf ${e('zipperPants')} (jassen en mantels ${e('zipperCoat')}), leerreparaties vanaf ${e('leather')}. Overig werk op basis van een foto.`,
    groups: [
      { id: 'pantolon', ops: ['broekspijpen korter maken', 'taille nauwer maken', 'pijpen smaller maken', 'taille wijder maken', 'spijkerbroek korter maken met behoud van de originele zoom', 'rits van broeken vervangen en repareren', 'knopen vervangen', 'scheuren en losse naden repareren'], heads: [(n) => `Broeken en spijkerbroeken vermaken in ${n}`, (n) => `Zoom korter en taille nauwer in ${n}`], intro: (n, o) => `Voor broeken en spijkerbroeken in ${n}: ${o}.` },
      { id: 'etek-elbise', ops: ['rokken korter maken', 'taille van rokken nauwer maken', 'jurken korter maken', 'jurken nauwer maken', 'lengte van bandjes aanpassen', 'rits van jurken vervangen', 'voering vervangen', 'avond- en bruidsjurken vermaken (alleen vermaken)', 'jurken op maat maken'], heads: [(n) => `Rokken en jurken vermaken in ${n}`, (n) => `Avondjurken en bandjes in ${n}`], intro: (n, o) => `Rokken, jurken en avondkleding in ${n}: ${o}.` },
      { id: 'ust-giyim', ops: ['mouwen van jassen en mantels korter maken', 'lengte korter maken', 'innemen in de taille', 'mantels en parka\'s vermaken', 'rits van jassen en mantels vervangen', 'voering vervangen', 'knopen vervangen', 'scheuren en losse naden repareren', 'leren jassen vermaken'], heads: [(n) => `Jassen, mantels en parka's in ${n}`, (n) => `Rits, voering en knopen van jassen in ${n}`], intro: (n, o) => `Jassen, mantels en parka's in ${n}: ${o}. Klaar op dezelfde dag; spoed in 1–2 uur.` },
      { id: 'gomlek-bluz', ops: ['overhemden innemen en korter maken', 'blouses innemen', 'T-shirts korter maken en innemen', 'mouwen korter maken', 'knopen vervangen', 'losse naden dichtnaaien', 'overhemden en blouses op maat'], heads: [(n) => `Overhemden en blouses vermaken in ${n}`, (n) => `T-shirts, blouses en overhemden in ${n}`], intro: (n, o) => `Overhemden, blouses en T-shirts in ${n}: ${o}.` },
      { id: 'yelek-tulum', ops: ['gilets repareren en vermaken', 'jumpsuits korter maken en innemen', 'zoom en taille van joggingbroeken aanpassen', 'korte broeken korter maken', 'gilets, jumpsuits en joggingpakken op maat', 'ritsen vervangen', 'scheuren en losse naden repareren'], heads: [(n) => `Gilets, jumpsuits en joggingbroeken in ${n}`, (n) => `Korte broek korter en jumpsuit nauwer in ${n}`], intro: (n, o) => `Gilets, jumpsuits, joggingpakken en korte broeken in ${n}: ${o}.` },
      { id: 'fermuar-dugme', ops: ['ritsen vervangen in broeken, mantels, jassen en tassen (met en zonder rits)', 'vastzittende ritsen repareren', 'knopen vervangen', 'voering vervangen (behalve bij truien en vesten)', 'scheuren en losse naden repareren'], heads: [(n) => `Rits vervangen of repareren in ${n}`, (n) => `Ritsen, knopen en voering in ${n}`], intro: (n, o) => `Ritsen, knopen en voering in ${n}: ${o}.` },
      { id: 'deri', ops: ['kraag van leren jassen vervangen', 'mouwen van leren jassen korter maken', 'lengte van leren jassen korter maken', 'leren jassen innemen', 'taille van leren broeken nauwer maken', 'leren broeken korter maken', 'rits van leren broeken vervangen', 'leren gilets repareren'], heads: [(n) =>`Leren jassen, broeken en gilets in ${n}`, (n) =>`Kraag en mouwen van een leren jas in ${n}`], intro: (n, o) => `Lederen kleding in ${n}: ${o}. Leerwerk vanaf ${e('leather')}.` },
      { id: 'kot', ops: ['spijkerbroek korter maken', 'spijkerbroek korter maken met behoud van de originele zoom', 'taille van spijkerbroeken nauwer maken', 'pijpen van spijkerbroeken smaller maken', 'mouwen en lengte van spijkerjassen korter maken', 'spijkerjassen innemen', 'spijkermantels korter maken en innemen', 'spijkerrokken korter maken en taille nauwer maken', 'korte spijkerbroeken korter maken', 'ritsen en knopen van spijkerbroeken vervangen', 'scheuren in spijkerstof repareren'], heads: [(n) =>`Spijkerbroeken, spijkerjassen en -mantels in ${n}`, (n) =>`Spijkerrok en korte spijkerbroek korter maken in ${n}`], intro: (n, o) => `Spijkerkleding in ${n}: ${o}. Vanaf ${e('hem')}.` },
    ],
    faq: [
      { id: 'paca', f: (n) => [`Wat kost het om een broek korter te maken in ${n}?`, `Broekspijpen korter maken kost vanaf ${e('hem')}; de exacte prijs noemen wij op basis van een foto via WhatsApp. Gewoon werk is dezelfde dag klaar, spoed in 1–2 uur.`] },
      { id: 'fermuar', f: (n) => [`Mijn rits is kapot in ${n}: wat nu?`, `Stuur een foto van de rits via WhatsApp. Een rits vervangen kost vanaf ${e('zipperPants')} (jassen en mantels ${e('zipperCoat')}); een vastzittende rits kan vaak zonder vervanging worden gerepareerd.`] },
      { id: 'kol', f: (n) => [`Kunnen jullie mouwen van jassen en mantels korter maken in ${n}?`, `Ja. Mouwen en lengte van jassen en mantels korter maken kost vanaf ${e('hem')}; de mouw wordt afgemerkt terwijl u de jas draagt. Ophalen en bezorgen bij het hotel is .`] },
      { id: 'aski', f: (n) => [`Kan de lengte van jurkbandjes worden aangepast in ${n}?`, 'Ja. Wij passen de bandjes van jurken en avondkleding aan; de prijs hangt af van het werk, stuur een foto. Bruidsjurken worden alleen vermaakt.'] },
      { id: 'astar', f: (n) => [`Vervangen jullie de voering van jassen en mantels in ${n}?`, 'Ja, wij vervangen voering (niet bij truien en vesten). De prijs hangt af van de voering en het werk en volgt op basis van een foto.'] },
      { id: 'dugme', f: (n) => [`Vervangen jullie knopen in ${n}?`, 'Ja. Wij vervangen knopen van overhemden, jassen, mantels en broeken; de prijs volgt op basis van een foto.'] },
      { id: 'soktuk', f: (n) => [`Repareren jullie scheuren en losse naden in ${n}?`, 'Ja. Wij naaien losse naden dicht en repareren scheuren in alle soorten kleding; de prijs hangt af van het werk, stuur een foto.'] },
      { id: 'dikim', f: (n) => [`Maken jullie jurken, gilets of joggingpakken op maat voor ${n}?`, 'Ja. Jurken, gilets, jumpsuits, blouses en joggingpakken maken wij op uw maat; stuur een foto van het model en wij noemen prijs en doorlooptijd. Bruidsjurken maken wij niet helemaal nieuw, alleen vermaken.'] },
      { id: 'deri', f: (n) => [`Kan bij een leren jas de kraag worden vervangen of de mouwen en lengte korter gemaakt worden in ${n}?`, `Ja. Wij vervangen kragen, maken mouwen en lengte korter en nemen leren jassen in; leerwerk vanaf ${e('leather')}, exacte prijs op basis van een foto.`] },
      { id: 'deripant', f: (n) => [`Maken jullie leren broeken nauwer in de taille en korter in ${n}?`, `Ja. Leren broeken en gilets: taille nauwer maken, korter maken, rits vervangen en repareren; vanaf ${e('leather')}, exacte prijs op basis van een foto.`] },
      { id: 'kotmont', f: (n) => [`Maken jullie spijkerjassen, spijkermantels en korte spijkerbroeken korter in ${n}?`, `Ja. Wij maken mouwen en lengte van spijkerjassen en -mantels korter en nemen ze in, en korten korte spijkerbroeken in; vanaf ${e('hem')}.`] },
    ],
    seo: [(n) => `Kleermaker ${n}: korter maken, ritsen, vermaken`, (n) => `Kleding vermaken in ${n} · inkorten en innemen`, (n) => `Kleermaker ${n}: broek, jurk, jas`],
  },
  ar: {
    titles: [(n) => `الأعمال التي نقوم بها في ${n}`, (n) => `تعديل الملابس في ${n}: تقصير وتضييق وإصلاح`],
    leads: [
      (n) => `إذا كنت تقيم في ${n}، نقوم بتقصير الملابس الرجالية والنسائية وتضييقها وإصلاحها وتعديلها، واستبدال السحابات والأزرار والبطانة، والخياطة حسب المقاس. نستلم القطعة من فندقك.`,
      (n) => `بناطيل وجينز وتنانير وفساتين وسترات ومعاطف وقمصان وبلوزات وصدريات وأفرولات وملابس رياضية: جميع التعديلات لنزلاء الفنادق في ${n} مع الاستلام من الفندق.`,
    ],
    price: (n) => `أسعار تبدأ من (${n}): تقصير أو تضييق الأطراف والخصر والأكمام والطول من ${e('hem')}، استبدال السحاب من ${e('zipperPants')} (المعاطف والسترات ${e('zipperCoat')})، إصلاح الجلد من ${e('leather')}. وباقي الأعمال حسب الصورة.`,
    groups: [
      { id: 'pantolon', ops: ['تقصير أطراف البنطال', 'تضييق الخصر', 'تضييق الساقين', 'توسيع الخصر', 'تقصير الجينز مع الحفاظ على الطرف الأصلي', 'استبدال سحاب البنطال وإصلاحه', 'استبدال الأزرار', 'إصلاح الخروق والدرزات المفتوحة'], heads: [(n) => `تعديل البناطيل والجينز في ${n}`, (n) => `تقصير الأطراف وتضييق الخصر في ${n}`], intro: (n, o) => `للبناطيل والجينز في ${n}: ${o}.` },
      { id: 'etek-elbise', ops: ['تقصير التنانير', 'تضييق خصر التنانير', 'تقصير الفساتين', 'تضييق الفساتين', 'ضبط طول الحمالات', 'استبدال سحاب الفستان', 'استبدال البطانة', 'تعديل فساتين السهرة والزفاف (تعديل فقط)', 'خياطة الفساتين حسب المقاس'], heads: [(n) => `تعديل التنانير والفساتين في ${n}`, (n) => `فساتين السهرة والحمالات في ${n}`], intro: (n, o) => `للتنانير والفساتين وملابس السهرة في ${n}: ${o}.` },
      { id: 'ust-giyim', ops: ['تقصير أكمام السترات والمعاطف', 'تقصير الطول', 'تضييق الجسم', 'تعديل المعاطف والباركا', 'استبدال سحاب السترات والمعاطف', 'استبدال البطانة', 'استبدال الأزرار', 'إصلاح الخروق والدرزات المفتوحة', 'تعديل السترات الجلدية'], heads: [(n) => `السترات والمعاطف والباركا في ${n}`, (n) => `سحاب وبطانة وأزرار السترة في ${n}`], intro: (n, o) => `للسترات والمعاطف والباركا في ${n}: ${o}. جاهز في اليوم نفسه، والمستعجل خلال 1–2 ساعة.` },
      { id: 'gomlek-bluz', ops: ['تضييق القمصان وتقصيرها', 'تضييق البلوزات', 'تقصير القمصان القطنية وتضييقها', 'تقصير الأكمام', 'استبدال الأزرار', 'خياطة الدرزات المفتوحة', 'خياطة القمصان والبلوزات حسب المقاس'], heads: [(n) => `تعديل القمصان والبلوزات في ${n}`, (n) => `التيشيرتات والبلوزات والقمصان في ${n}`], intro: (n, o) => `للقمصان والبلوزات والتيشيرتات في ${n}: ${o}.` },
      { id: 'yelek-tulum', ops: ['إصلاح الصدريات وتعديلها', 'تقصير الأفرولات وتضييقها', 'ضبط أطراف وخصر البناطيل الرياضية', 'تقصير الشورتات', 'خياطة الصدريات والأفرولات والملابس الرياضية حسب المقاس', 'استبدال السحابات', 'إصلاح الخروق والدرزات المفتوحة'], heads: [(n) => `الصدريات والأفرولات والملابس الرياضية في ${n}`, (n) => `تقصير الشورت وتضييق الأفرول في ${n}`], intro: (n, o) => `للصدريات والأفرولات والملابس الرياضية والشورتات في ${n}: ${o}.` },
      { id: 'fermuar-dugme', ops: ['استبدال السحاب في البناطيل والمعاطف والسترات والحقائب (بسحاب وبدونه)', 'إصلاح السحاب العالق', 'استبدال الأزرار', 'استبدال البطانة (باستثناء البلوفرات والكارديجان)', 'إصلاح الخروق والدرزات المفتوحة'], heads: [(n) => `استبدال السحاب أو إصلاحه في ${n}`, (n) => `السحابات والأزرار والبطانة في ${n}`], intro: (n, o) => `للسحابات والأزرار والبطانة في ${n}: ${o}.` },
      { id: 'deri', ops: ['استبدال ياقة السترة الجلدية', 'تقصير أكمام السترة الجلدية', 'تقصير طول السترة الجلدية', 'تضييق السترة الجلدية', 'تضييق خصر البنطال الجلدي', 'تقصير البنطال الجلدي', 'استبدال سحاب البنطال الجلدي', 'إصلاح الصدريات الجلدية'], heads: [(n) =>`السترات والبناطيل والصدريات الجلدية في ${n}`, (n) =>`ياقة وأكمام السترة الجلدية في ${n}`], intro: (n, o) => `للملابس الجلدية في ${n}: ${o}. أعمال الجلد تبدأ من ${e('leather')}.` },
      { id: 'kot', ops: ['تقصير أطراف الجينز', 'تقصير الجينز مع الحفاظ على الطرف الأصلي', 'تضييق خصر الجينز', 'تضييق ساقي الجينز', 'تقصير أكمام وطول سترات الجينز', 'تضييق سترات الجينز', 'تقصير معاطف الجينز وتضييقها', 'تقصير تنانير الجينز وتضييق الخصر', 'تقصير شورتات الجينز', 'استبدال سحابات وأزرار الجينز', 'إصلاح خروق الجينز'], heads: [(n) =>`الجينز وسترات ومعاطف الجينز في ${n}`, (n) =>`تقصير تنورة وشورت الجينز في ${n}`], intro: (n, o) => `لملابس الجينز في ${n}: ${o}. تبدأ من ${e('hem')}.` },
    ],
    faq: [
      { id: 'paca', f: (n) => [`كم تكلفة تقصير البنطال في ${n}؟`, `تقصير أطراف البنطال يبدأ من ${e('hem')}؛ ونحدد السعر الدقيق من الصورة عبر واتساب. الأعمال العادية جاهزة في اليوم نفسه والمستعجلة خلال 1–2 ساعة.`] },
      { id: 'fermuar', f: (n) => [`انكسر السحاب عندي في ${n}، ماذا أفعل؟`, `أرسل صورة السحاب عبر واتساب. استبدال السحاب يبدأ من ${e('zipperPants')} (المعاطف والسترات ${e('zipperCoat')})؛ وغالباً يمكن إصلاح السحاب العالق دون استبداله.`] },
      { id: 'kol', f: (n) => [`هل تقصّرون أكمام السترات والمعاطف في ${n}؟`, `نعم. تقصير أكمام وطول السترات والمعاطف يبدأ من ${e('hem')}؛ ونحدد طول الكم وأنت ترتدي القطعة. الاستلام والتسليم في الفندق متاحان.`] },
      { id: 'aski', f: (n) => [`هل يمكن ضبط طول حمالات الفستان في ${n}؟`, 'نعم. نضبط طول الحمالات في الفساتين وملابس السهرة؛ والسعر حسب العمل، أرسل صورة. فساتين الزفاف نعدّلها فقط.'] },
      { id: 'astar', f: (n) => [`هل تستبدلون بطانة السترات والمعاطف في ${n}؟`, 'نعم، نستبدل البطانة (لا في البلوفرات والكارديجان). السعر حسب نوع البطانة وحجم العمل ونحدده من الصورة.'] },
      { id: 'dugme', f: (n) => [`هل تستبدلون الأزرار في ${n}؟`, 'نعم. نستبدل الأزرار في القمصان والسترات والمعاطف والبناطيل؛ ونحدد السعر من الصورة.'] },
      { id: 'soktuk', f: (n) => [`هل تصلحون الخروق والدرزات المفتوحة في ${n}؟`, 'نعم. نخيط الدرزات المفتوحة ونصلح الخروق في جميع أنواع الملابس؛ والسعر حسب العمل، أرسل صورة.'] },
      { id: 'dikim', f: (n) => [`هل تخيطون فساتين أو صدريات أو ملابس رياضية حسب المقاس لـ ${n}؟`, 'نعم. نخيط الفساتين والصدريات والأفرولات والبلوزات والملابس الرياضية حسب مقاسك؛ أرسل صورة الموديل ونخبرك بالسعر والمدة. فساتين الزفاف لا نخيطها من الصفر، بل نعدّلها فقط.'] },
      { id: 'deri', f: (n) => [`هل يمكن استبدال ياقة السترة الجلدية أو تقصير أكمامها وطولها في ${n}؟`, `نعم. نستبدل الياقات ونقصّر الأكمام والطول ونضيّق السترات الجلدية؛ أعمال الجلد تبدأ من ${e('leather')}، والسعر الدقيق من الصورة.`] },
      { id: 'deripant', f: (n) => [`هل تضيّقون خصر البناطيل الجلدية وتقصّرونها في ${n}؟`, `نعم. للبناطيل والصدريات الجلدية: تضييق الخصر والتقصير واستبدال السحاب وإصلاحه؛ من ${e('leather')}، والسعر الدقيق من الصورة.`] },
      { id: 'kotmont', f: (n) => [`هل تقصّرون سترات ومعاطف وشورتات الجينز في ${n}؟`, `نعم. نقصّر ونضيّق أكمام وطول سترات ومعاطف الجينز، ونقصّر شورتات الجينز؛ تبدأ من ${e('hem')}.`] },
    ],
    seo: [(n) => `خياط في ${n}: تقصير وسحابات وتعديل`, (n) => `تعديل الملابس في ${n} · تضييق وتقصير`, (n) => `خياط ${n}: بنطال وفستان وسترة`],
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
