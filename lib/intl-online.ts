// ============================================================
// swaphubs.com — lib/intl-online.ts
// "Online terzi hizmeti" sayfaları, 10 dil: TR/EN/DE/RU (mevcut sayfalar, adresler DEĞİŞMEZ) + ES/FR/PL/UK/NL/AR (bu dosyadaki yeni sayfalar).
// Sahip onaylı gerçekler: Antalya'da otel/eve ücretsiz alım-teslim (tüm ilçeler), fotoğraftan fiyat; paça/bel/kol/boy kısaltma-daraltma ₺200'den (€10),
// fermuar ₺300'den (pantolon €15), deri ₺400'den (€20); fiyatlara KDV dahil değil; normal iş aynı gün, acil 1–2 saat, işin durumuna göre;
// gelinlik/abiye YALNIZCA tadilat (gelinlik dikimi yok); kargoyla hizmet yalnızca Antalya içi ve yurt dışı (diğer iller: WhatsApp'tan sorulur);
// kargo ücreti müşteriye ait; garanti = kargo firmasının taşıma garantisi + işçilik garantisi, beğenilmezse tekrar tamir (para iadesi vaadi YOK);
// 2006'dan beri, 10 dil, tüm para birimleri (nakit/kart), her gün 08:00–23:00. Kargo firması/kargo ücreti/gümrük rakamı YAZILMAZ.
// ============================================================
import type { ILang } from '@/lib/intl';

export type OnlineLang = 'tr' | 'en' | 'ru' | 'de' | ILang;
export const ONLINE_ALL: OnlineLang[] = ['tr', 'en', 'de', 'ru', 'es', 'fr', 'pl', 'uk', 'nl', 'ar'];

export const ONLINE_PATH: Record<OnlineLang, string> = {
  tr: '/online-terzi-hizmeti',
  en: '/online-tailor-service',
  de: '/de/online-schneiderservice-antalya',
  ru: '/ru/atelie-antalya-online',
  es: '/es/servicio-de-sastreria-online-antalya',
  fr: '/fr/service-de-couture-en-ligne-antalya',
  pl: '/pl/internetowy-serwis-krawiecki-antalya',
  uk: '/uk/onlayn-servis-kravtsya-antaliya',
  nl: '/nl/online-kleermakersservice-antalya',
  ar: '/ar/khidmat-khayyat-online-antalya',
};
export const ONLINE_HREFLANG: Record<OnlineLang, string> = { tr: 'tr', en: 'en', de: 'de', ru: 'ru', es: 'es', fr: 'fr', pl: 'pl', uk: 'uk', nl: 'nl', ar: 'ar' };

/** 10 dilli hreflang haritası (x-default = TR çapası). `base` verilirse mutlak adres üretir. */
export function onlineLanguages(base: string): Record<string, string> {
  const m: Record<string, string> = Object.fromEntries(ONLINE_ALL.map((l) => [ONLINE_HREFLANG[l], `${base}${ONLINE_PATH[l]}`]));
  m['x-default'] = `${base}${ONLINE_PATH.tr}`;
  return m;
}

export const onlineUrl = (l: ILang) => ONLINE_PATH[l];

export type OnlineGuide = {
  slug: string; title: string; desc: string; h1: string; lead: string; crumb: string; back: string;
  short: string; contactH: string; callLine: string;
  sections: { h: string; p: string[] }[];
  stepsH: string; steps: string[];
  faqTitle: string; faq: [string, string][]; cta: string; wa: string; svcName: string; svcDesc: string;
};

export const ONL: Record<ILang, OnlineGuide> = {
  es: {
    slug: 'servicio-de-sastreria-online-antalya',
    title: 'Sastre online en Antalya: arreglos y ropa a medida',
    desc: 'Sastre online en Antalya: envíe una foto por WhatsApp y reciba el precio. Recogida gratis en su hotel o casa. Arreglos, ropa a medida y envío. +90 531 898 64 18',
    h1: 'Sastre online en Antalya: foto por WhatsApp, precio y recogida en su hotel',
    lead: 'Terzi Can (Konyaaltı, desde 2006) trabaja así: usted manda una foto de la prenda por WhatsApp, le decimos el precio y, si lo acepta, pasamos a recogerla gratis a su hotel o a su casa en cualquier distrito de Antalya. Si está en otro país, también se puede hacer con envío.',
    crumb: 'Sastrería en Antalya',
    back: '← Sastrería para turistas en Antalya',
    short: 'Respuesta corta: escriba por WhatsApp al +90 531 898 64 18 con una foto de la prenda. Le damos el precio, recogemos y entregamos gratis en hoteles y casas de Antalya (cada día de 08:00 a 23:00), y también atendemos por envío dentro de Antalya y desde el extranjero.',
    contactH: 'Contacto directo',
    callLine: 'Llame o escriba',
    sections: [
      { h: 'Cómo funciona el servicio online', p: ['El servicio online no sustituye al taller: es la forma más cómoda de empezar. Por WhatsApp se resuelve todo lo previo (qué hay que hacer, cuánto cuesta y cuándo se puede entregar) y el trabajo se hace en el taller de Konyaaltı.', 'Aceptamos arreglos, reparaciones y ropa a medida para hombre, mujer y niños: acortar o estrechar dobladillos, cintura, mangas y largos, cambiar cremalleras, reparar prendas y coser a medida según el modelo que usted indique.'] },
      { h: 'Si está de vacaciones en Antalya', p: ['Lo habitual es no mover nada: pasamos por su hotel o su alojamiento, recogemos la prenda y la devolvemos allí mismo. La recogida y la entrega son gratis en todos los distritos de Antalya. Si hace falta una prueba, podemos quedar en el hotel.', 'No somos socios de ningún hotel, pero atendemos a los huéspedes de todos los hoteles de la ciudad.'] },
      { h: 'Si está en otro país', p: ['Para clientes del extranjero se trabaja con foto, precio acordado y envío postal. El envío lo paga el cliente y los detalles de pago y aduana se aclaran por WhatsApp antes de enviar nada.', 'El servicio por envío está disponible dentro de Antalya y desde el extranjero; para otras provincias de Turquía, pregúntenos por WhatsApp.'] },
    ],
    stepsH: 'Cuatro pasos',
    steps: ['Envíe por WhatsApp una foto de la prenda y de la zona que hay que arreglar.', 'Le indicamos el precio y el plazo; usted decide.', 'Recogemos la prenda en su hotel o casa en Antalya, o usted la envía por correo si está en el extranjero.', 'Hecho el trabajo, se la devolvemos en mano o por envío.'],
    faqTitle: 'Preguntas frecuentes sobre el sastre online',
    faq: [
      ['¿Qué es exactamente un sastre online?', 'Es un taller al que se le consulta todo por WhatsApp: usted manda una foto, recibe el precio y se coordina la recogida o el envío. El número es +90 531 898 64 18 y atendemos cada día de 08:00 a 23:00.'],
      ['¿Vienen a mi hotel a recoger la ropa?', 'Sí. La recogida y la entrega en hoteles y casas son gratuitas en todos los distritos de Antalya. Si hace falta una prueba, se puede quedar en el hotel.'],
      ['¿Cuánto cuesta acortar un pantalón?', 'Acortar o estrechar bajos, cintura, mangas y largos cuesta desde 200 TL (unos 10 €). El precio exacto se confirma con la foto; los precios no incluyen IVA.'],
      ['¿Y cambiar una cremallera o arreglar cuero?', 'Cambiar la cremallera de un pantalón cuesta desde 300 TL (unos 15 €); la de abrigos, chaquetas y cuero, unos 20 €. Los arreglos de cuero empiezan en 400 TL (unos 20 €). Sin IVA.'],
      ['¿Cuánto tarda un arreglo?', 'Los arreglos normales suelen estar listos el mismo día y los urgentes en 1–2 horas, siempre según el estado de la prenda. Las prendas a medida dependen del modelo.'],
      ['¿Hacen vestidos de novia?', 'Arreglamos vestidos de novia y de fiesta (ajustes y modificaciones), pero no confeccionamos vestidos de novia nuevos. El precio de estos trabajos se da con la foto.'],
      ['¿Puedo enviar la prenda desde otro país?', 'Sí. Se envía una foto, se acuerda el precio y la prenda llega por correo; después se devuelve a su dirección. El envío corre por cuenta del cliente y los detalles de pago y aduana se confirman por WhatsApp.'],
      ['¿Qué ocurre si no me gusta el resultado?', 'Si algo no queda bien, se vuelve a arreglar. Además, el transportista tiene su propia garantía de transporte y nuestro trabajo de costura está garantizado. No prometemos devolución del dinero.'],
      ['¿Cómo se paga y en qué idioma me atienden?', 'Se acepta cualquier divisa, en efectivo o con tarjeta. Atendemos en diez idiomas; basta escribir por WhatsApp al +90 531 898 64 18.'],
      ['¿Hay servicio de envío al resto de Turquía?', 'De momento el envío está disponible dentro de Antalya y desde el extranjero. Para otras provincias de Turquía, consúltenos por WhatsApp y le diremos qué es posible.'],
    ],
    cta: 'Enviar foto por WhatsApp', wa: 'Hola, le envío una foto de una prenda para un arreglo. ¿Cuál sería el precio?',
    svcName: 'Sastre online en Antalya (recogida en hotel y envío)', svcDesc: 'Arreglos, reparaciones y ropa a medida con precio por foto, recogida y entrega gratis en hoteles y casas de Antalya, y envío desde el extranjero.',
  },
  fr: {
    slug: 'service-de-couture-en-ligne-antalya',
    title: 'Service de couture en ligne à Antalya : retouches',
    desc: 'Couturier en ligne à Antalya : envoyez une photo sur WhatsApp, recevez le prix. Ramassage gratuit à l’hôtel ou à domicile. Retouches, sur mesure, envoi. +90 531 898 64 18',
    h1: 'Service de couture en ligne à Antalya : photo sur WhatsApp, prix et ramassage à l’hôtel',
    lead: 'Terzi Can (Konyaaltı, depuis 2006) fonctionne simplement : vous envoyez une photo du vêtement sur WhatsApp, nous donnons le prix et, si vous acceptez, nous venons le chercher gratuitement à votre hôtel ou à votre domicile, dans tous les quartiers d’Antalya. Depuis l’étranger, c’est possible par colis.',
    crumb: 'Couturier à Antalya',
    back: '← Couturier pour touristes à Antalya',
    short: 'Réponse courte : écrivez sur WhatsApp au +90 531 898 64 18 avec une photo du vêtement. Nous donnons le prix, puis récupérons et livrons gratuitement dans les hôtels et logements d’Antalya (tous les jours de 08 h à 23 h) ; envoi par colis possible à Antalya et depuis l’étranger.',
    contactH: 'Contact direct',
    callLine: 'Appelez ou écrivez',
    sections: [
      { h: 'Comment fonctionne le service en ligne', p: ['Le service en ligne ne remplace pas l’atelier : c’est la façon la plus simple de commencer. Tout ce qui précède le travail (ce qu’il faut faire, le prix, le délai) se règle sur WhatsApp, puis le travail est réalisé dans l’atelier de Konyaaltı.', 'Nous prenons les retouches, réparations et vêtements sur mesure pour hommes, femmes et enfants : ourlets, taille, manches et longueurs à raccourcir ou à reprendre, remplacement de fermetures éclair, réparations et couture selon le modèle que vous indiquez.'] },
      { h: 'Si vous êtes en vacances à Antalya', p: ['En général, vous n’avez rien à déplacer : nous passons à votre hôtel ou à votre location, prenons le vêtement et le rapportons au même endroit. Ramassage et livraison sont gratuits dans tous les quartiers d’Antalya. Si un essayage est nécessaire, nous pouvons nous retrouver à l’hôtel.', 'Nous ne sommes partenaires d’aucun hôtel, mais nous servons les clients de tous les hôtels de la ville.'] },
      { h: 'Si vous êtes à l’étranger', p: ['Pour les clients à l’étranger, le travail se fait sur photo, prix convenu et envoi postal. Les frais d’envoi sont à la charge du client ; le paiement et les formalités douanières sont précisés sur WhatsApp avant tout envoi.', 'Le service par colis est disponible à Antalya et depuis l’étranger ; pour les autres provinces de Turquie, demandez-nous sur WhatsApp.'] },
    ],
    stepsH: 'En quatre étapes',
    steps: ['Envoyez sur WhatsApp une photo du vêtement et de la zone à retoucher.', 'Nous indiquons le prix et le délai ; vous décidez.', 'Nous récupérons le vêtement à votre hôtel ou domicile à Antalya, ou vous l’envoyez par colis depuis l’étranger.', 'Le travail terminé, nous le rendons en main propre ou par colis.'],
    faqTitle: 'Questions fréquentes sur le couturier en ligne',
    faq: [
      ['Qu’est-ce qu’un couturier en ligne ?', 'C’est un atelier que l’on consulte entièrement sur WhatsApp : vous envoyez une photo, vous recevez le prix, puis on organise le ramassage ou l’envoi. Le numéro est le +90 531 898 64 18, tous les jours de 08 h à 23 h.'],
      ['Venez-vous chercher les vêtements à mon hôtel ?', 'Oui. Le ramassage et la livraison dans les hôtels et à domicile sont gratuits dans tous les quartiers d’Antalya. Si un essayage est utile, on peut se retrouver à l’hôtel.'],
      ['Combien coûte le raccourcissement d’un pantalon ?', 'Raccourcir ou reprendre un ourlet, la taille, les manches ou la longueur coûte à partir de 200 TL (environ 10 €). Le prix exact est confirmé sur photo ; les prix s’entendent hors TVA.'],
      ['Et le changement d’une fermeture éclair ou la retouche du cuir ?', 'Changer la fermeture d’un pantalon coûte à partir de 300 TL (environ 15 €) ; pour un manteau, une veste ou du cuir, environ 20 €. Les retouches en cuir commencent à 400 TL (environ 20 €). Hors TVA.'],
      ['Quel est le délai d’une retouche ?', 'Les retouches courantes sont souvent prêtes le jour même et les urgentes en 1 à 2 heures, selon l’état du vêtement. Pour le sur mesure, cela dépend du modèle.'],
      ['Faites-vous des robes de mariée ?', 'Nous retouchons les robes de mariée et de soirée (ajustements et modifications), mais nous ne confectionnons pas de robe de mariée neuve. Le prix de ces travaux est donné sur photo.'],
      ['Puis-je envoyer mon vêtement depuis l’étranger ?', 'Oui. Vous envoyez une photo, nous convenons du prix, le vêtement arrive par colis puis repart à votre adresse. Les frais d’envoi sont à votre charge ; paiement et douane sont précisés sur WhatsApp.'],
      ['Et si le résultat ne me plaît pas ?', 'Si quelque chose ne va pas, nous reprenons la retouche. Le transporteur a sa propre garantie de transport et notre travail de couture est garanti. Nous ne promettons pas de remboursement.'],
      ['Comment payer et dans quelle langue êtes-vous joignables ?', 'Toutes les devises sont acceptées, en espèces ou par carte. Nous répondons en dix langues ; écrivez simplement sur WhatsApp au +90 531 898 64 18.'],
      ['Le service par colis existe-t-il pour le reste de la Turquie ?', 'Pour l’instant, l’envoi est disponible à Antalya et depuis l’étranger. Pour les autres provinces de Turquie, demandez-nous sur WhatsApp ce qui est possible.'],
    ],
    cta: 'Envoyer une photo sur WhatsApp', wa: 'Bonjour, je vous envoie la photo d’un vêtement à retoucher. Quel serait le prix ?',
    svcName: 'Couturier en ligne à Antalya (ramassage à l’hôtel et envoi)', svcDesc: 'Retouches, réparations et vêtements sur mesure avec prix sur photo, ramassage et livraison gratuits dans les hôtels et logements d’Antalya, envoi depuis l’étranger.',
  },
  pl: {
    slug: 'internetowy-serwis-krawiecki-antalya',
    title: 'Internetowy serwis krawiecki Antalya: poprawki',
    desc: 'Krawiec online w Antalyi: zdjęcie na WhatsApp, wycena, bezpłatny odbiór z hotelu lub domu. Poprawki, szycie na miarę, wysyłka. +90 531 898 64 18',
    h1: 'Internetowy serwis krawiecki w Antalyi: zdjęcie na WhatsApp, cena i odbiór z hotelu',
    lead: 'Terzi Can (Konyaaltı, od 2006 roku) działa prosto: wysyłasz zdjęcie ubrania na WhatsApp, podajemy cenę, a po akceptacji odbieramy rzecz bezpłatnie z hotelu lub domu w każdej dzielnicy Antalyi. Z zagranicy można skorzystać z wysyłki.',
    crumb: 'Krawiec w Antalyi',
    back: '← Krawiec dla turystów w Antalyi',
    short: 'Krótka odpowiedź: napisz na WhatsApp pod numer +90 531 898 64 18 i dołącz zdjęcie ubrania. Podamy cenę, a odbiór i dostawa do hoteli i domów w Antalyi są bezpłatne (codziennie 08:00–23:00). Możliwa też wysyłka w obrębie Antalyi i z zagranicy.',
    contactH: 'Kontakt bezpośredni',
    callLine: 'Zadzwoń lub napisz',
    sections: [
      { h: 'Jak działa usługa online', p: ['Usługa online nie zastępuje pracowni, tylko ułatwia start. Wszystko, co poprzedza pracę (co trzeba zrobić, ile to kosztuje, na kiedy będzie gotowe), ustalamy na WhatsApp, a robota wykonywana jest w pracowni w Konyaaltı.', 'Przyjmujemy poprawki, naprawy i szycie na miarę dla mężczyzn, kobiet i dzieci: skracanie i zwężanie nogawek, talii, rękawów i długości, wymianę zamków, naprawy oraz szycie według wskazanego modelu.'] },
      { h: 'Jeśli jesteś na wakacjach w Antalyi', p: ['Zwykle nie musisz nigdzie jechać: przyjeżdżamy do hotelu lub apartamentu, odbieramy ubranie i oddajemy je w to samo miejsce. Odbiór i dostawa są bezpłatne w każdej dzielnicy Antalyi. Gdy potrzebna jest przymiarka, możemy spotkać się w hotelu.', 'Nie jesteśmy partnerem żadnego hotelu, ale obsługujemy gości wszystkich hoteli w mieście.'] },
      { h: 'Jeśli mieszkasz za granicą', p: ['Klienci z zagranicy korzystają z wyceny na podstawie zdjęcia i wysyłki pocztowej. Koszt przesyłki ponosi klient, a płatność i kwestie celne ustalamy na WhatsApp przed wysłaniem czegokolwiek.', 'Usługa wysyłkowa obejmuje Antalyę i klientów z zagranicy; w sprawie innych prowincji Turcji prosimy o pytanie na WhatsApp.'] },
    ],
    stepsH: 'Cztery kroki',
    steps: ['Wyślij na WhatsApp zdjęcie ubrania i miejsca do poprawy.', 'Podamy cenę i termin, a Ty decydujesz.', 'Odbieramy ubranie z hotelu lub domu w Antalyi albo wysyłasz je pocztą z zagranicy.', 'Po wykonaniu pracy oddajemy je osobiście lub wysyłamy z powrotem.'],
    faqTitle: 'Najczęstsze pytania o krawca online',
    faq: [
      ['Czym jest krawiec online?', 'To pracownia, z którą załatwiasz wszystko przez WhatsApp: wysyłasz zdjęcie, dostajesz cenę i umawiamy odbiór lub wysyłkę. Numer to +90 531 898 64 18, pracujemy codziennie 08:00–23:00.'],
      ['Czy odbieracie ubrania z mojego hotelu?', 'Tak. Odbiór i dostawa do hoteli i domów są bezpłatne we wszystkich dzielnicach Antalyi. Jeśli przydaje się przymiarka, możemy spotkać się w hotelu.'],
      ['Ile kosztuje skrócenie spodni?', 'Skrócenie lub zwężenie nogawek, talii, rękawów i długości kosztuje od 200 TL (około 10 €). Dokładną cenę potwierdzamy na podstawie zdjęcia; ceny nie zawierają VAT.'],
      ['A wymiana zamka lub poprawki skóry?', 'Wymiana zamka w spodniach kosztuje od 300 TL (około 15 €), w płaszczu, kurtce lub skórze około 20 €. Poprawki skórzanych ubrań zaczynają się od 400 TL (około 20 €). Bez VAT.'],
      ['Jak długo trwa poprawka?', 'Zwykłe poprawki bywają gotowe tego samego dnia, a pilne w 1–2 godziny, zależnie od stanu ubrania. Przy szyciu na miarę czas zależy od modelu.'],
      ['Czy szyjecie suknie ślubne?', 'Poprawiamy suknie ślubne i wieczorowe (dopasowanie, przeróbki), ale nie szyjemy nowych sukien ślubnych. Cenę takich prac podajemy po obejrzeniu zdjęcia.'],
      ['Czy mogę wysłać ubranie z zagranicy?', 'Tak. Wysyłasz zdjęcie, ustalamy cenę, ubranie dociera pocztą, a po pracy wraca na Twój adres. Koszt przesyłki ponosi klient; płatność i cło ustalamy na WhatsApp.'],
      ['Co, jeśli efekt mi się nie spodoba?', 'Jeśli coś nie jest dobrze, poprawiamy to ponownie. Przewoźnik ma własną gwarancję przewozu, a nasza praca krawiecka jest objęta gwarancją. Nie obiecujemy zwrotu pieniędzy.'],
      ['Jak zapłacić i w jakim języku się dogadamy?', 'Przyjmujemy wszystkie waluty, gotówką lub kartą. Obsługujemy w dziesięciu językach; wystarczy napisać na WhatsApp pod numer +90 531 898 64 18.'],
      ['Czy wysyłka działa dla reszty Turcji?', 'Na razie wysyłka obejmuje Antalyę i klientów z zagranicy. W sprawie innych prowincji Turcji napisz na WhatsApp, a odpowiemy, co jest możliwe.'],
    ],
    cta: 'Wyślij zdjęcie na WhatsApp', wa: 'Dzień dobry, wysyłam zdjęcie ubrania do poprawki. Ile to będzie kosztować?',
    svcName: 'Krawiec online w Antalyi (odbiór z hotelu i wysyłka)', svcDesc: 'Poprawki, naprawy i szycie na miarę z wyceną ze zdjęcia, bezpłatny odbiór i dostawa do hoteli i domów w Antalyi oraz wysyłka z zagranicy.',
  },
  uk: {
    slug: 'onlayn-servis-kravtsya-antaliya',
    title: 'Онлайн-сервіс кравця в Анталії: ремонт і пошив',
    desc: 'Онлайн-кравець в Анталії: фото у WhatsApp, ціна, безкоштовний забір з готелю чи дому. Ремонт, підгонка, пошив, пересилання. +90 531 898 64 18',
    h1: 'Онлайн-сервіс кравця в Анталії: фото у WhatsApp, ціна та забір з готелю',
    lead: 'Terzi Can (Коньяалти, з 2006 року) працює просто: ви надсилаєте у WhatsApp фото речі, ми називаємо ціну, а після вашої згоди безкоштовно забираємо її з готелю чи дому в будь-якому районі Анталії. З-за кордону можна скористатися пересиланням.',
    crumb: 'Кравець в Анталії',
    back: '← Кравець для туристів в Анталії',
    short: 'Коротко: напишіть у WhatsApp на +90 531 898 64 18 і додайте фото речі. Ми назвемо ціну, а забір і доставка до готелів та осель в Анталії безкоштовні (щодня 08:00–23:00). Є також пересилання по Анталії та з-за кордону.',
    contactH: 'Прямий контакт',
    callLine: 'Телефонуйте або пишіть',
    sections: [
      { h: 'Як працює онлайн-сервіс', p: ['Онлайн-сервіс не замінює майстерню, а лише полегшує початок. Усе, що передує роботі (що зробити, скільки коштує, коли буде готово), вирішується у WhatsApp, а саму роботу виконують у майстерні в Коньяалти.', 'Беремо підгонку, ремонт і пошив на замовлення для чоловіків, жінок і дітей: вкорочення та звуження низу, талії, рукавів і довжини, заміна блискавок, ремонт і пошив за вказаною моделлю.'] },
      { h: 'Якщо ви на відпочинку в Анталії', p: ['Зазвичай нікуди їхати не треба: ми приїжджаємо до готелю чи апартаментів, забираємо річ і повертаємо на те саме місце. Забір і доставка безкоштовні в усіх районах Анталії. Якщо потрібна примірка, можемо зустрітися в готелі.', 'Ми не є партнером жодного готелю, але обслуговуємо гостей усіх готелів міста.'] },
      { h: 'Якщо ви за кордоном', p: ['Для клієнтів з-за кордону працюємо за фото, погодженою ціною та поштовим пересиланням. Вартість пересилання сплачує клієнт, а оплату й митні питання уточнюємо у WhatsApp до відправлення.', 'Сервіс пересилання діє по Анталії та для клієнтів із-за кордону; щодо інших провінцій Туреччини запитайте у WhatsApp.'] },
    ],
    stepsH: 'Чотири кроки',
    steps: ['Надішліть у WhatsApp фото речі та місця, яке потрібно виправити.', 'Ми назвемо ціну й термін, а ви вирішуєте.', 'Забираємо річ з готелю чи дому в Анталії або ви надсилаєте її поштою з-за кордону.', 'Після роботи повертаємо особисто або пересиланням.'],
    faqTitle: 'Часті запитання про онлайн-кравця',
    faq: [
      ['Що таке онлайн-кравець?', 'Це майстерня, з якою все вирішується у WhatsApp: ви надсилаєте фото, отримуєте ціну, і ми домовляємося про забір чи пересилання. Номер +90 531 898 64 18, працюємо щодня з 08:00 до 23:00.'],
      ['Чи забираєте ви речі з мого готелю?', 'Так. Забір і доставка до готелів та осель безкоштовні в усіх районах Анталії. Якщо корисна примірка, можемо зустрітися в готелі.'],
      ['Скільки коштує вкоротити штани?', 'Вкорочення чи звуження низу, талії, рукавів і довжини коштує від 200 TL (близько 10 €). Точну ціну підтверджуємо за фото; ціни без ПДВ.'],
      ['А заміна блискавки чи ремонт шкіри?', 'Заміна блискавки на штанях коштує від 300 TL (близько 15 €), на пальті, куртці чи шкірі близько 20 €. Ремонт шкіряних виробів починається від 400 TL (близько 20 €). Без ПДВ.'],
      ['Як швидко виконується ремонт?', 'Звичайні роботи часто готові того ж дня, термінові за 1–2 години, залежно від стану речі. Для пошиву на замовлення термін залежить від моделі.'],
      ['Чи шиєте ви весільні сукні?', 'Ми переробляємо весільні та вечірні сукні (підгонка, зміни), але нових весільних суконь не шиємо. Ціну таких робіт називаємо за фото.'],
      ['Чи можна надіслати річ з-за кордону?', 'Так. Ви надсилаєте фото, ми погоджуємо ціну, річ приходить поштою, а після роботи повертається на вашу адресу. Пересилання оплачує клієнт; оплату й митницю уточнюємо у WhatsApp.'],
      ['А якщо результат не сподобається?', 'Якщо щось не так, ми виправимо ще раз. Перевізник має власну гарантію на перевезення, а наша кравецька робота гарантована. Повернення грошей ми не обіцяємо.'],
      ['Як оплатити і якою мовою можна спілкуватися?', 'Приймаємо будь-яку валюту, готівкою чи карткою. Обслуговуємо десятьма мовами; достатньо написати у WhatsApp на +90 531 898 64 18.'],
      ['Чи є пересилання для решти Туреччини?', 'Наразі пересилання діє по Анталії та з-за кордону. Щодо інших провінцій Туреччини напишіть у WhatsApp, і ми скажемо, що можливо.'],
    ],
    cta: 'Надіслати фото у WhatsApp', wa: 'Добрий день, надсилаю фото речі для ремонту. Скільки це коштуватиме?',
    svcName: 'Онлайн-кравець в Анталії (забір з готелю та пересилання)', svcDesc: 'Ремонт, підгонка та пошив на замовлення з ціною за фото, безкоштовний забір і доставка до готелів та осель в Анталії, пересилання з-за кордону.',
  },
  nl: {
    slug: 'online-kleermakersservice-antalya',
    title: 'Online kleermakersservice Antalya: vermaakwerk',
    desc: 'Online kleermaker in Antalya: stuur een foto via WhatsApp en ontvang de prijs. Gratis ophalen bij uw hotel of huis. Vermaakwerk, maatwerk, verzending. +90 531 898 64 18',
    h1: 'Online kleermakersservice in Antalya: foto via WhatsApp, prijs en ophalen bij uw hotel',
    lead: 'Terzi Can (Konyaaltı, sinds 2006) werkt eenvoudig: u stuurt een foto van het kledingstuk via WhatsApp, wij noemen de prijs en na uw akkoord halen we het gratis op bij uw hotel of huis in elke wijk van Antalya. Vanuit het buitenland kan het per post.',
    crumb: 'Kleermaker in Antalya',
    back: '← Kleermaker voor toeristen in Antalya',
    short: 'Kort antwoord: stuur een WhatsApp-bericht naar +90 531 898 64 18 met een foto van het kledingstuk. Wij noemen de prijs; ophalen en terugbrengen bij hotels en huizen in Antalya is gratis (elke dag 08:00–23:00). Verzending binnen Antalya en vanuit het buitenland is ook mogelijk.',
    contactH: 'Direct contact',
    callLine: 'Bel of stuur een bericht',
    sections: [
      { h: 'Zo werkt de onlineservice', p: ['De onlineservice vervangt het atelier niet, maar maakt de start makkelijk. Alles vooraf (wat er moet gebeuren, wat het kost en wanneer het klaar is) regelen we via WhatsApp; het werk gebeurt in het atelier in Konyaaltı.', 'We nemen vermaakwerk, reparaties en maatwerk aan voor mannen, vrouwen en kinderen: zomen en taille, mouwen en lengtes korter of nauwer maken, ritsen vervangen, repareren en naaien volgens het model dat u aangeeft.'] },
      { h: 'Als u op vakantie bent in Antalya', p: ['Meestal hoeft u nergens heen: wij komen langs bij uw hotel of appartement, nemen het kledingstuk mee en brengen het op dezelfde plek terug. Ophalen en brengen is gratis in alle wijken van Antalya. Is een pasbeurt nodig, dan spreken we af in het hotel.', 'We zijn geen partner van een bepaald hotel, maar helpen gasten van alle hotels in de stad.'] },
      { h: 'Als u in het buitenland woont', p: ['Voor klanten buiten Turkije werken we met een foto, een afgesproken prijs en verzending per post. De verzendkosten zijn voor de klant; betaling en douanezaken regelen we via WhatsApp voordat u iets opstuurt.', 'De verzendservice geldt binnen Antalya en vanuit het buitenland; voor andere provincies in Turkije kunt u via WhatsApp navragen wat mogelijk is.'] },
    ],
    stepsH: 'In vier stappen',
    steps: ['Stuur via WhatsApp een foto van het kledingstuk en de plek die aangepast moet worden.', 'Wij noemen prijs en doorlooptijd; u beslist.', 'We halen het op bij uw hotel of huis in Antalya, of u stuurt het per post vanuit het buitenland.', 'Na het werk brengen we het persoonlijk terug of sturen we het op.'],
    faqTitle: 'Veelgestelde vragen over de online kleermaker',
    faq: [
      ['Wat is een online kleermaker?', 'Een atelier waarmee u alles via WhatsApp regelt: u stuurt een foto, krijgt een prijs en we spreken af hoe het kledingstuk wordt opgehaald of verzonden. Het nummer is +90 531 898 64 18, elke dag van 08:00 tot 23:00.'],
      ['Komen jullie kleding ophalen bij mijn hotel?', 'Ja. Ophalen en terugbrengen bij hotels en huizen is gratis in alle wijken van Antalya. Is een pasbeurt handig, dan kunnen we in het hotel afspreken.'],
      ['Wat kost het om een broek korter te maken?', 'Zomen, taille, mouwen en lengtes korter of nauwer maken kost vanaf 200 TL (ongeveer € 10). De exacte prijs bevestigen we met de foto; prijzen zijn exclusief btw.'],
      ['En een rits vervangen of leer vermaken?', 'Een rits in een broek vervangen kost vanaf 300 TL (ongeveer € 15); bij jassen, mantels en leer ongeveer € 20. Leervermaak begint bij 400 TL (ongeveer € 20). Exclusief btw.'],
      ['Hoe lang duurt vermaakwerk?', 'Gewoon vermaakwerk is vaak dezelfde dag klaar en spoedwerk binnen 1–2 uur, afhankelijk van het kledingstuk. Bij maatwerk hangt het af van het model.'],
      ['Maken jullie trouwjurken?', 'We passen trouw- en galajurken aan (verstellen en vermaken), maar maken geen nieuwe trouwjurken. De prijs van dat werk noemen we na het zien van een foto.'],
      ['Kan ik mijn kledingstuk vanuit het buitenland opsturen?', 'Ja. U stuurt een foto, we spreken de prijs af, het kledingstuk komt per post en gaat na het werk terug naar uw adres. De verzendkosten zijn voor de klant; betaling en douane regelen we via WhatsApp.'],
      ['Wat als ik het resultaat niet mooi vind?', 'Als iets niet goed zit, passen we het opnieuw aan. De vervoerder heeft een eigen transportgarantie en ons naai- en vermaakwerk is gegarandeerd. Geld-terug beloven we niet.'],
      ['Hoe betaal ik en in welke taal kan ik terecht?', 'Alle valuta worden geaccepteerd, contant of met pas. We helpen in tien talen; stuur gewoon een WhatsApp-bericht naar +90 531 898 64 18.'],
      ['Is verzending ook mogelijk voor de rest van Turkije?', 'Voorlopig geldt verzending binnen Antalya en vanuit het buitenland. Voor andere provincies in Turkije kunt u via WhatsApp vragen wat mogelijk is.'],
    ],
    cta: 'Stuur een foto via WhatsApp', wa: 'Hallo, ik stuur een foto van een kledingstuk dat vermaakt moet worden. Wat zou dat kosten?',
    svcName: 'Online kleermaker in Antalya (ophalen bij hotel en verzending)', svcDesc: 'Vermaakwerk, reparaties en maatwerk met prijs op basis van een foto, gratis ophalen en brengen bij hotels en huizen in Antalya, en verzending vanuit het buitenland.',
  },
  ar: {
    slug: 'khidmat-khayyat-online-antalya',
    title: 'خدمة خياط أونلاين في أنطاليا: تعديل وتصليح',
    desc: 'خياط أونلاين في أنطاليا: أرسل صورة عبر واتساب واعرف السعر. استلام وتسليم مجاني من الفندق أو البيت. تعديل وتصليح وخياطة حسب الطلب وشحن. +90 531 898 64 18',
    h1: 'خدمة خياط أونلاين في أنطاليا: صورة عبر واتساب، سعر، واستلام من فندقك',
    lead: 'ترزي جان (كونيالتي، منذ 2006) يعمل ببساطة: ترسل صورة القطعة عبر واتساب، فنحدد لك السعر، وإذا وافقت نستلمها مجانًا من فندقك أو بيتك في أي منطقة من أنطاليا. ومن خارج تركيا يمكن الاستفادة من الخدمة بالشحن.',
    crumb: 'خياط في أنطاليا',
    back: '← خياط للسياح في أنطاليا',
    short: 'الجواب المختصر: راسلنا على واتساب على الرقم ‎+90 531 898 64 18‎ مع صورة القطعة. نحدد لك السعر، والاستلام والتسليم مجاني للفنادق والبيوت في أنطاليا (يوميًا من 08:00 إلى 23:00)، كما يتوفر الشحن داخل أنطاليا ومن خارج تركيا.',
    contactH: 'تواصل مباشر',
    callLine: 'اتصل أو راسل',
    sections: [
      { h: 'كيف تعمل الخدمة أونلاين', p: ['الخدمة أونلاين لا تلغي الورشة، بل تسهّل البداية. كل ما يسبق العمل (المطلوب، والسعر، والموعد) نتفق عليه عبر واتساب، ثم يُنفَّذ العمل في الورشة في كونيالتي.', 'نقبل التعديل والتصليح والخياطة حسب الطلب للرجال والنساء والأطفال: تقصير وتضييق الأطراف والخصر والأكمام والطول، واستبدال السحّابات، وإصلاح الملابس، والخياطة وفق النموذج الذي تحدده.'] },
      { h: 'إذا كنت في عطلة في أنطاليا', p: ['غالبًا لا تحتاج إلى التنقل: نصل إلى فندقك أو شقتك، نستلم القطعة ونعيدها إلى المكان نفسه. الاستلام والتسليم مجانيان في جميع مناطق أنطاليا. وإذا لزم قياس القطعة يمكننا اللقاء في الفندق.', 'لسنا شريكًا لأي فندق، لكننا نخدم نزلاء جميع فنادق المدينة.'] },
      { h: 'إذا كنت خارج تركيا', p: ['لعملائنا في الخارج نعمل بالصورة والسعر المتفق عليه والشحن البريدي. تكلفة الشحن على العميل، وتفاصيل الدفع والجمارك نوضحها عبر واتساب قبل إرسال أي شيء.', 'خدمة الشحن متاحة داخل أنطاليا ومن خارج تركيا؛ وللولايات التركية الأخرى اسألنا عبر واتساب.'] },
    ],
    stepsH: 'أربع خطوات',
    steps: ['أرسل عبر واتساب صورة للقطعة وللمكان المطلوب تعديله.', 'نحدد لك السعر والمدة وأنت تقرر.', 'نستلم القطعة من فندقك أو بيتك في أنطاليا، أو ترسلها بالبريد إن كنت في الخارج.', 'بعد إنجاز العمل نسلّمها لك يدًا بيد أو نشحنها إليك.'],
    faqTitle: 'أسئلة شائعة عن الخياط أونلاين',
    faq: [
      ['ما هو الخياط أونلاين؟', 'هو ورشة تتعامل معها كليًا عبر واتساب: ترسل صورة وتحصل على السعر ثم نتفق على الاستلام أو الشحن. الرقم ‎+90 531 898 64 18‎ ونعمل يوميًا من 08:00 إلى 23:00.'],
      ['هل تستلمون الملابس من فندقي؟', 'نعم. الاستلام والتسليم مجانيان للفنادق والبيوت في جميع مناطق أنطاليا. وإن كان القياس مفيدًا يمكننا اللقاء في الفندق.'],
      ['كم تكلفة تقصير بنطلون؟', 'تقصير أو تضييق الأطراف والخصر والأكمام والطول يبدأ من 200 ليرة (نحو 10 يورو). نؤكد السعر الدقيق من الصورة، والأسعار لا تشمل ضريبة القيمة المضافة.'],
      ['وماذا عن تبديل السحّاب أو تعديل الجلد؟', 'تبديل سحّاب البنطلون يبدأ من 300 ليرة (نحو 15 يورو)، وللمعطف والجاكيت والجلد نحو 20 يورو. وتعديل الجلد يبدأ من 400 ليرة (نحو 20 يورو). دون ضريبة القيمة المضافة.'],
      ['كم يستغرق التعديل؟', 'التعديلات العادية تكون غالبًا جاهزة في اليوم نفسه والعاجلة خلال ساعة إلى ساعتين، بحسب حالة القطعة. أما الخياطة حسب الطلب فتعتمد على النموذج.'],
      ['هل تخيطون فساتين الزفاف؟', 'نعدّل فساتين الزفاف والسهرة (تضبيط وتغييرات)، لكننا لا نخيط فستان زفاف جديدًا. ونحدد سعر هذه الأعمال بعد رؤية الصورة.'],
      ['هل يمكنني إرسال القطعة من خارج تركيا؟', 'نعم. ترسل صورة ونتفق على السعر، ثم تصل القطعة بالبريد وبعد العمل تعود إلى عنوانك. الشحن على العميل، وتفاصيل الدفع والجمارك نوضحها عبر واتساب.'],
      ['ماذا لو لم يعجبني الناتج؟', 'إن لم يكن العمل مناسبًا نعيد تعديله. ولشركة الشحن ضمان نقل خاص بها، وعملنا في الخياطة والتعديل مضمون. لا نعد باسترجاع المال.'],
      ['كيف أدفع وبأي لغة تتحدثون؟', 'نقبل جميع العملات، نقدًا أو بالبطاقة. نخدم بعشر لغات؛ يكفي أن تراسلنا على واتساب على الرقم ‎+90 531 898 64 18‎.'],
      ['هل يتوفر الشحن لبقية مناطق تركيا؟', 'حاليًا الشحن متاح داخل أنطاليا ومن خارج تركيا. وللولايات التركية الأخرى اسألنا عبر واتساب لنخبرك بما هو ممكن.'],
    ],
    cta: 'أرسل صورة عبر واتساب', wa: 'مرحبًا، أرسل لكم صورة قطعة تحتاج إلى تعديل. كم سيكون السعر؟',
    svcName: 'خياط أونلاين في أنطاليا (استلام من الفندق وشحن)', svcDesc: 'تعديل وتصليح وخياطة حسب الطلب مع تحديد السعر من الصورة، واستلام وتسليم مجاني للفنادق والبيوت في أنطاليا، وشحن من خارج تركيا.',
  },
};

export const parseOnline = (lang: ILang, slug: string) => ONL[lang].slug === slug;
