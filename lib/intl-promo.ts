// ============================================================
// swaphubs.com — lib/intl-promo.ts
// Ek turist dilleri (ES/FR/PL/UK/NL/AR): "Promosyon tekstili ve baskılı bez çanta" REHBERİ (bilgi niyeti).
// TR/EN/RU/DE karşılıkları lib/tekstil-sayfalari.ts içindeki 'promo' konusudur; 10 dilin tamamı karşılıklı hreflang taşır.
// Yalnızca işletme sahibinin doğruladığı bilgi: fuar/organizasyon için logolu bez çanta imalatı ve baskısı; tişört, polar yelek, mont,
// pantolon, şort, önlük, uniforma ve diğer tekstil; baskı ve logo tasarımı; Antalya'daki EXPO ve diğer fuar/organizasyonlar için üretim.
// Fiyat, adet, süre, sertifika, müşteri adı, "ücretsiz/garanti/en iyi" ve yorum/puan YOKTUR. Resmi tedarikçi/sponsor ima edilmez.
// ============================================================
import { ILANGS, INTL, type ILang } from '@/lib/intl';
import { URLS } from '@/lib/tekstil-sayfalari';

export type PromoGuide = {
  slug: string; title: string; desc: string; h1: string; lead: string; crumb: string;
  sections: { h: string; p?: string[]; ul?: string[] }[];
  faqTitle: string; faq: [string, string][]; cta: string; wa: string;
  tekstilLabel: string; langsLabel: string; note: string;
};

export const PROMO: Record<ILang, PromoGuide> = {
  es: {
    slug: 'textil-promocional-bolsas-de-tela-antalya',
    title: 'Textil promocional y bolsas de tela impresas: guía',
    desc: 'Cómo planificar textil promocional para ferias y eventos: bolsas de tela, camisetas, chalecos polares, uniformes, archivo del logo, estampado y pedido.',
    h1: 'Textil promocional y bolsas de tela con logo para ferias y eventos: cómo planificarlo',
    lead: 'Al preparar textil con logo para una feria o un evento, lo que más tiempo ahorra es seguir el orden adecuado: primero los productos, luego el archivo del logo y después el estampado. Esta página explica ese orden. La producción es en Antalya.',
    crumb: 'Textil promocional y bolsas de tela',
    sections: [
      { h: 'Por dónde empezar', p: ['Empiece por decidir para quién son las prendas. Los regalos para visitantes y la ropa de su propio equipo son necesidades distintas: para lo primero encajan las bolsas de tela y las camisetas; para lo segundo, chalecos polares, chaquetas, pantalones, delantales o uniformes que se llevan todo el día. Indicar la fecha de la feria o del evento en el primer mensaje facilita la planificación.'] },
      { h: 'Qué productos hacemos', ul: ['Bolsas de tela impresas con su logo (promoción y regalo)', 'Camisetas', 'Chalecos polares', 'Chaquetas', 'Pantalones', 'Pantalones cortos', 'Delantales', 'Uniformes y otros productos textiles'], p: ['Las prendas se confeccionan con el diseño, el modelo y el tipo de estampado que usted elija.'] },
      { h: 'Archivo del logo, estampado y diseño del logo', p: ['También diseñamos el logo y el estampado, así que puede empezar aunque aún no tenga logo. Si lo tiene, un archivo vectorial (por ejemplo AI, PDF o SVG) es lo más cómodo para trabajar; una imagen de alta resolución también puede servir. El tipo de estampado se elige según la tela, el número de colores y el detalle del logo, y la cantidad; cuál conviene lo decidimos juntos al hacer el pedido.'], ul: ['Anote los colores del logo y, si los tiene, los códigos de color de su marca', 'Indique en qué parte de la prenda quiere el estampado (delante, detrás, etc.)', 'Valoren juntos cómo quedará el mismo logo en productos distintos, por ejemplo una bolsa y una camiseta'] },
      { h: 'Producción para ferias y eventos', p: ['Producimos los productos textiles que se necesitan en la EXPO de Antalya y en otras ferias y eventos; la fabricación y el estampado de bolsas de tela con logo para empresas forman parte de ello. Como el plazo se concreta en cada pedido, conviene dar la fecha del evento desde el principio para decidir producto y estampado en función de ella.'] },
      { h: 'Cómo funciona el pedido', ul: ['Envía por WhatsApp su logo, su archivo de diseño o su idea, junto con los productos que necesita y la fecha del evento', 'Se eligen juntos el modelo, el producto y el estampado', 'Se produce según el modelo y el estampado aprobados', 'El plazo y el precio se concretan en cada pedido'] },
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      ['¿Hay un pedido mínimo?', 'La cantidad depende del producto, del estampado y del pedido, y aquí no damos cifras. Escríbanos por WhatsApp cuántas piezas necesita y lo concretamos juntos.'],
      ['¿Cómo sé el precio?', 'El precio depende del producto, del estampado y de la cantidad, por eso no lo publicamos. Envíe su logo o su idea por WhatsApp y el presupuesto se da para cada pedido.'],
      ['¿Cuánto tarda?', 'El plazo se concreta en cada pedido. Si indica la fecha de la feria o del evento en el primer mensaje, planificamos en función de ella.'],
      ['¿Y si no tengo logo ni diseño?', 'También diseñamos el logo y el estampado. Basta con que nos diga el nombre de su organización, sus colores si los tiene y la idea que tiene en mente.'],
      ['¿Qué hacen además de bolsas de tela?', 'Camisetas, chalecos polares, chaquetas, pantalones, pantalones cortos, delantales, uniformes y otros productos textiles, con el diseño, el modelo y el tipo de estampado que usted elija.'],
    ],
    cta: 'Pedir presupuesto por WhatsApp',
    wa: 'Hola, quisiera información y un presupuesto sobre textil promocional con logo y bolsas de tela impresas para una feria o un evento. Le envío mi logo o mi idea.',
    tekstilLabel: 'Producción textil en Antalya: Anavera Tekstil (en inglés)', langsLabel: 'Otros idiomas',
    note: 'El plazo y el precio se concretan en cada pedido; producto, modelo y estampado se eligen juntos.',
  },
  fr: {
    slug: 'textile-promotionnel-sacs-en-tissu-antalya',
    title: 'Textile promotionnel et sacs en tissu imprimés : guide',
    desc: 'Préparer du textile promotionnel pour un salon ou un événement : sacs en tissu, t-shirts, gilets polaires, uniformes, fichier du logo et impression.',
    h1: 'Textile promotionnel et sacs en tissu à votre logo pour salons et événements : comment s\'y prendre',
    lead: 'Quand on prépare du textile à son logo pour un salon ou un événement, le plus grand gain de temps vient de l\'ordre dans lequel on avance : d\'abord les produits, ensuite le fichier du logo, enfin l\'impression. Cette page détaille cet ordre. La production se fait à Antalya.',
    crumb: 'Textile promotionnel et sacs en tissu',
    sections: [
      { h: 'Par où commencer', p: ['Commencez par préciser à qui sont destinés les articles. Les cadeaux pour les visiteurs et les vêtements de votre équipe répondent à deux besoins différents : sacs en tissu et t-shirts conviennent au premier ; gilets polaires, vestes, pantalons, tabliers ou uniformes, portés toute la journée, au second. Indiquer la date du salon ou de l\'événement dès le premier message facilite l\'organisation.'] },
      { h: 'Ce que nous fabriquons', ul: ['Sacs en tissu imprimés à votre logo (promotion et cadeaux)', 'T-shirts', 'Gilets polaires', 'Vestes', 'Pantalons', 'Shorts', 'Tabliers', 'Uniformes et autres produits textiles'], p: ['Les articles sont réalisés avec le design, le modèle et le type d\'impression de votre choix.'] },
      { h: 'Fichier du logo, impression et création de logo', p: ['Nous réalisons aussi la création du logo et du visuel d\'impression : vous pouvez donc commencer même si votre logo n\'est pas prêt. S\'il existe, un fichier vectoriel (AI, PDF ou SVG, par exemple) est le plus pratique ; une image en haute résolution peut aussi suffire. Le type d\'impression se choisit selon le tissu, le nombre de couleurs et le niveau de détail du logo, ainsi que la quantité ; nous décidons ensemble de ce qui convient lors de la commande.'], ul: ['Notez les couleurs de votre logo et, le cas échéant, les codes couleur de votre charte', 'Précisez où l\'impression doit se placer sur l\'article (devant, dos, etc.)', 'Regardez ensemble comment un même logo rendra sur des articles différents, par exemple un sac et un t-shirt'] },
      { h: 'Production pour salons et événements', p: ['Nous produisons les articles textiles dont on a besoin à l\'EXPO d\'Antalya et lors d\'autres salons et événements ; la fabrication et l\'impression de sacs en tissu à logo pour les entreprises en font partie. Le délai se précisant commande par commande, mieux vaut donner la date de l\'événement dès le départ pour choisir produits et impression en conséquence.'] },
      { h: 'Comment se passe une commande', ul: ['Vous envoyez par WhatsApp votre logo, votre fichier de création ou votre idée, avec les produits souhaités et la date de l\'événement', 'Le modèle, les produits et l\'impression sont choisis ensemble', 'La production suit le modèle et l\'impression validés', 'Le délai et le prix sont précisés commande par commande'] },
    ],
    faqTitle: 'Questions fréquentes',
    faq: [
      ['Y a-t-il une quantité minimale ?', 'La quantité dépend du produit, de l\'impression et de la commande ; nous ne donnons pas de chiffres ici. Écrivez-nous sur WhatsApp le nombre d\'articles dont vous avez besoin et nous préciserons ensemble.'],
      ['Comment connaître le prix ?', 'Le prix dépend du produit, de l\'impression et de la quantité, c\'est pourquoi nous ne l\'affichons pas. Envoyez votre logo ou votre idée sur WhatsApp : le devis est établi commande par commande.'],
      ['Quel est le délai ?', 'Le délai se précise commande par commande. Si vous indiquez la date du salon ou de l\'événement dans votre premier message, nous planifions en fonction.'],
      ['Et si je n\'ai ni logo ni visuel ?', 'Nous créons aussi le logo et le visuel d\'impression. Indiquez-nous le nom de votre organisation, ses couleurs le cas échéant, et l\'idée que vous avez en tête.'],
      ['Que fabriquez-vous en dehors des sacs en tissu ?', 'T-shirts, gilets polaires, vestes, pantalons, shorts, tabliers, uniformes et autres produits textiles, avec le design, le modèle et le type d\'impression de votre choix.'],
    ],
    cta: 'Demander un devis sur WhatsApp',
    wa: 'Bonjour, je souhaite des informations et un devis pour du textile promotionnel à mon logo et des sacs en tissu imprimés pour un salon ou un événement. Je vous envoie mon logo ou mon idée.',
    tekstilLabel: 'Production textile à Antalya : Anavera Tekstil (en anglais)', langsLabel: 'Autres langues',
    note: 'Le délai et le prix sont précisés commande par commande ; produit, modèle et impression se choisissent ensemble.',
  },
  pl: {
    slug: 'tekstylia-reklamowe-torby-materialowe-antalya',
    title: 'Tekstylia reklamowe i torby z nadrukiem: poradnik',
    desc: 'Jak zaplanować tekstylia reklamowe na targi i wydarzenia: torby materiałowe, koszulki, kamizelki polarowe, uniformy, plik z logo, nadruk i zamówienie.',
    h1: 'Tekstylia reklamowe i torby materiałowe z logo na targi i wydarzenia: jak to zaplanować',
    lead: 'Przygotowując tekstylia z logo na targi lub wydarzenie, najwięcej czasu oszczędza właściwa kolejność: najpierw produkty, potem plik z logo, na końcu nadruk. Ta strona opisuje właśnie tę kolejność. Produkcja odbywa się w Antalyi.',
    crumb: 'Tekstylia reklamowe i torby materiałowe',
    sections: [
      { h: 'Od czego zacząć', p: ['Najpierw trzeba ustalić, dla kogo są produkty. Upominki dla odwiedzających i odzież dla własnego zespołu to dwie różne potrzeby: do pierwszej pasują torby materiałowe i koszulki, do drugiej kamizelki polarowe, kurtki, spodnie, fartuchy lub uniformy noszone przez cały dzień. Podanie daty targów lub wydarzenia już w pierwszej wiadomości ułatwia planowanie.'] },
      { h: 'Co szyjemy', ul: ['Torby materiałowe z nadrukiem i logo (promocja i upominki)', 'Koszulki', 'Kamizelki polarowe', 'Kurtki', 'Spodnie', 'Szorty', 'Fartuchy', 'Uniformy i inne wyroby tekstylne'], p: ['Wyroby powstają w wybranym przez Państwa projekcie, fasonie i rodzaju nadruku.'] },
      { h: 'Plik z logo, nadruk i projekt logo', p: ['Projektujemy też logo i nadruk, więc można zacząć, nawet jeśli logo nie jest jeszcze gotowe. Jeśli już istnieje, najwygodniejszy jest plik wektorowy (np. AI, PDF lub SVG); wystarczyć może również obraz w wysokiej rozdzielczości. Rodzaj nadruku dobiera się do tkaniny, liczby kolorów i szczegółowości logo oraz do nakładu; co będzie najlepsze, ustalamy wspólnie przy zamówieniu.'], ul: ['Warto spisać kolory logo oraz ewentualne kody kolorów firmy', 'Trzeba wskazać, w którym miejscu produktu ma być nadruk (przód, tył itp.)', 'Warto wspólnie ocenić, jak to samo logo będzie wyglądać na różnych produktach, np. na torbie i koszulce'] },
      { h: 'Produkcja na targi i wydarzenia', p: ['Wytwarzamy wyroby tekstylne potrzebne podczas EXPO w Antalyi oraz na innych targach i wydarzeniach; szycie i nadruk toreb materiałowych z logo dla firm jest tego częścią. Ponieważ czas realizacji ustala się przy każdym zamówieniu, warto podać datę wydarzenia od razu, by dobrać produkty i nadruk do tego terminu.'] },
      { h: 'Jak przebiega zamówienie', ul: ['Przez WhatsApp wysyłają Państwo logo, plik z projektem lub pomysł, a także listę potrzebnych produktów i datę wydarzenia', 'Fason, produkty i nadruk wybieramy razem', 'Produkcja przebiega według zatwierdzonego fasonu i nadruku', 'Czas realizacji i cena są ustalane przy każdym zamówieniu'] },
    ],
    faqTitle: 'Najczęstsze pytania',
    faq: [
      ['Czy obowiązuje minimalna ilość w zamówieniu?', 'Ilość zależy od produktu, nadruku i zamówienia; nie podajemy tu liczb. Proszę napisać na WhatsAppie, ile sztuk potrzeba, a ustalimy to razem.'],
      ['Jak poznać cenę?', 'Cena zależy od produktu, nadruku i ilości, dlatego jej nie publikujemy. Proszę wysłać logo lub pomysł przez WhatsApp; wycena jest przygotowywana do każdego zamówienia.'],
      ['Ile to trwa?', 'Czas realizacji ustala się przy każdym zamówieniu. Jeśli w pierwszej wiadomości podadzą Państwo datę targów lub wydarzenia, zaplanujemy pracę pod ten termin.'],
      ['Co zrobić, jeśli nie mam logo ani projektu?', 'Projektujemy też logo i nadruk. Wystarczy podać nazwę organizacji, jej kolory (jeśli są) i pomysł, który Państwo mają.'],
      ['Co szyjecie poza torbami materiałowymi?', 'Koszulki, kamizelki polarowe, kurtki, spodnie, szorty, fartuchy, uniformy i inne wyroby tekstylne, w wybranym projekcie, fasonie i rodzaju nadruku.'],
    ],
    cta: 'Zapytaj o wycenę na WhatsAppie',
    wa: 'Dzień dobry, proszę o informacje i wycenę dotyczące tekstyliów reklamowych z logo oraz toreb materiałowych z nadrukiem na targi/wydarzenie. Wysyłam logo lub pomysł.',
    tekstilLabel: 'Produkcja tekstylna w Antalyi: Anavera Tekstil (po angielsku)', langsLabel: 'Inne języki',
    note: 'Czas realizacji i cena są ustalane przy każdym zamówieniu; produkt, fason i nadruk wybieramy razem.',
  },
  uk: {
    slug: 'reklamnyi-tekstyl-tkanynovi-sumky-antaliya',
    title: 'Рекламний текстиль і тканинні сумки з друком: гід',
    desc: 'Як спланувати рекламний текстиль для виставок і заходів: тканинні сумки, футболки, флісові жилети, уніформа, файл логотипу, друк і порядок замовлення.',
    h1: 'Рекламний текстиль і тканинні сумки з логотипом для виставок і заходів: як усе спланувати',
    lead: 'Коли готуєте текстиль із логотипом до виставки чи заходу, найбільше часу заощаджує правильна послідовність: спершу вироби, потім файл логотипу, потім друк. Ця сторінка описує саме її. Виробництво — в Анталії.',
    crumb: 'Рекламний текстиль і тканинні сумки',
    sections: [
      { h: 'З чого почати', p: ['Спершу визначте, для кого вироби. Подарунки відвідувачам і одяг для власної команди — це різні завдання: для першого підходять тканинні сумки та футболки, для другого — флісові жилети, куртки, штани, фартухи чи уніформа, яку носять увесь день. Якщо вже в першому повідомленні вказати дату виставки чи заходу, планувати буде легше.'] },
      { h: 'Що ми виготовляємо', ul: ['Тканинні сумки з друком і вашим логотипом (для реклами та в подарунок)', 'Футболки', 'Флісові жилети', 'Куртки', 'Штани', 'Шорти', 'Фартухи', 'Уніформа та інші текстильні вироби'], p: ['Вироби шиються з тим дизайном, моделлю та видом друку, які ви оберете.'] },
      { h: 'Файл логотипу, друк і розробка логотипу', p: ['Ми також розробляємо логотип і макет друку, тож почати можна, навіть якщо логотипу ще немає. Якщо він є, найзручніший векторний файл (наприклад, AI, PDF або SVG); може підійти й зображення у високій роздільній здатності. Вид друку добирають залежно від тканини, кількості кольорів і деталізації логотипу та тиражу; що саме підходить краще, вирішуємо разом під час замовлення.'], ul: ['Запишіть кольори логотипу та, якщо є, фірмові колірні коди', 'Вкажіть, де на виробі має бути друк (спереду, ззаду тощо)', 'Разом подивіться, як той самий логотип виглядатиме на різних виробах, наприклад на сумці й футболці'] },
      { h: 'Виробництво для виставок і заходів', p: ['Ми виготовляємо текстильні вироби, потрібні на EXPO та інших виставках і заходах в Анталії; пошиття й друк тканинних сумок із логотипом для компаній — частина цієї роботи. Оскільки терміни уточнюються під кожне замовлення, дату заходу краще назвати одразу: тоді вибір виробів і друку можна підігнати під неї.'] },
      { h: 'Як проходить замовлення', ul: ['Ви надсилаєте в WhatsApp логотип, файл із дизайном або ідею, а також перелік виробів і дату заходу', 'Модель, вироби та друк обираємо разом', 'Виробництво йде за затвердженою моделлю та друком', 'Терміни та вартість уточнюються під кожне замовлення'] },
    ],
    faqTitle: 'Часті запитання',
    faq: [
      ['Чи є мінімальний тираж?', 'Кількість залежить від виробу, друку та замовлення, тому цифр на сторінці немає. Напишіть у WhatsApp, скільки виробів потрібно, і ми все обговоримо.'],
      ['Як дізнатися вартість?', 'Вартість залежить від виробу, друку та кількості, тому ми її не публікуємо. Надішліть логотип або ідею в WhatsApp: розрахунок робимо під кожне замовлення.'],
      ['Скільки часу це займає?', 'Терміни уточнюються під кожне замовлення. Якщо в першому повідомленні вказати дату виставки чи заходу, ми плануватимемо роботу з огляду на неї.'],
      ['Що робити, якщо немає логотипу чи макета?', 'Ми розробляємо логотип і макет друку. Досить написати назву організації, її кольори (якщо є) та вашу ідею.'],
      ['Що ви шиєте, окрім сумок?', 'Футболки, флісові жилети, куртки, штани, шорти, фартухи, уніформу та інші текстильні вироби — з тим дизайном, моделлю та видом друку, які ви оберете.'],
    ],
    cta: 'Отримати розрахунок у WhatsApp',
    wa: 'Добрий день, хочу дізнатися про рекламний текстиль із логотипом і тканинні сумки з друком для виставки/заходу та отримати розрахунок. Надішлю логотип або ідею.',
    tekstilLabel: 'Текстильне виробництво в Анталії: Anavera Tekstil (англійською)', langsLabel: 'Інші мови',
    note: 'Терміни та вартість уточнюються під кожне замовлення; вироби, модель і друк обираємо разом.',
  },
  nl: {
    slug: 'promotiekleding-stoffen-tassen-antalya',
    title: 'Promotietextiel en bedrukte stoffen tassen: gids',
    desc: 'Promotietextiel plannen voor beurzen en evenementen: stoffen tassen, T-shirts, fleecebodywarmers, uniformen, logobestand, bedrukking en bestelverloop.',
    h1: 'Promotietextiel en stoffen tassen met logo voor beurzen en evenementen: zo plant u het',
    lead: 'Wie textiel met logo voorbereidt voor een beurs of evenement, wint het meeste tijd met de juiste volgorde: eerst de producten, dan het logobestand, dan de bedrukking. Deze pagina loopt die volgorde door. De productie vindt plaats in Antalya.',
    crumb: 'Promotietextiel en stoffen tassen',
    sections: [
      { h: 'Waar begint u?', p: ['Bepaal eerst voor wie de artikelen zijn. Relatiegeschenken voor bezoekers en kleding voor uw eigen team zijn verschillende behoeften: bij het eerste passen stoffen tassen en T-shirts, bij het tweede fleecebodywarmers, jassen, broeken, schorten of uniformen die de hele dag gedragen worden. Als u de datum van de beurs of het evenement al in uw eerste bericht noemt, is plannen eenvoudiger.'] },
      { h: 'Wat wij maken', ul: ['Bedrukte stoffen tassen met uw logo (voor promotie en als cadeau)', 'T-shirts', 'Fleecebodywarmers', 'Jassen', 'Broeken', 'Korte broeken', 'Schorten', 'Uniformen en andere textielproducten'], p: ['De artikelen worden gemaakt in het ontwerp, het model en de bedrukkingswijze die u kiest.'] },
      { h: 'Logobestand, bedrukking en logo-ontwerp', p: ['Wij ontwerpen ook logo en bedrukking, dus u kunt beginnen zonder dat uw logo al klaar is. Heeft u er een, dan is een vectorbestand (bijvoorbeeld AI, PDF of SVG) het gemakkelijkst om mee te werken; ook een afbeelding in hoge resolutie kan volstaan. De bedrukkingswijze kiest men op basis van de stof, het aantal kleuren en de detaillering van het logo en de oplage; wat het best past, bepalen we samen bij de bestelling.'], ul: ['Noteer de kleuren van uw logo en eventuele huisstijlkleurcodes', 'Geef aan waar de bedrukking op het artikel moet komen (voorkant, achterkant enzovoort)', 'Bekijk samen hoe hetzelfde logo eruitziet op verschillende artikelen, zoals een tas en een T-shirt'] },
      { h: 'Productie voor beurzen en evenementen', p: ['Wij maken de textielproducten die nodig zijn bij de EXPO in Antalya en op andere beurzen en evenementen; het maken en bedrukken van stoffen tassen met logo voor bedrijven hoort daarbij. Omdat de levertijd per bestelling wordt vastgesteld, noemt u de datum van het evenement het best meteen, zodat producten en bedrukking daarop afgestemd kunnen worden.'] },
      { h: 'Hoe een bestelling verloopt', ul: ['U stuurt uw logo, ontwerpbestand of idee via WhatsApp, samen met de gewenste producten en de datum van het evenement', 'Model, producten en bedrukking kiezen we samen', 'De productie volgt het goedgekeurde model en de goedgekeurde bedrukking', 'Levertijd en prijs worden per bestelling vastgesteld'] },
    ],
    faqTitle: 'Veelgestelde vragen',
    faq: [
      ['Is er een minimale bestelhoeveelheid?', 'De hoeveelheid hangt af van het product, de bedrukking en de bestelling; cijfers noemen we hier niet. Laat ons via WhatsApp weten hoeveel stuks u nodig heeft, dan bepalen we dat samen.'],
      ['Hoe kom ik aan de prijs?', 'De prijs hangt af van product, bedrukking en aantal, daarom vermelden we hem niet. Stuur uw logo of idee via WhatsApp; de offerte maken we per bestelling.'],
      ['Hoe lang duurt het?', 'De levertijd wordt per bestelling vastgesteld. Noemt u de datum van de beurs of het evenement in uw eerste bericht, dan plannen we daarop.'],
      ['Wat als ik geen logo of ontwerp heb?', 'Wij ontwerpen ook logo en bedrukking. Laat ons de naam van uw organisatie weten, eventueel de kleuren en het idee dat u in gedachten heeft.'],
      ['Wat maakt u naast stoffen tassen?', 'T-shirts, fleecebodywarmers, jassen, broeken, korte broeken, schorten, uniformen en andere textielproducten, in het ontwerp, model en de bedrukkingswijze die u kiest.'],
    ],
    cta: 'Offerte aanvragen via WhatsApp',
    wa: 'Hallo, ik wil graag informatie en een offerte over promotietextiel met logo en bedrukte stoffen tassen voor een beurs of evenement. Ik stuur mijn logo of idee mee.',
    tekstilLabel: 'Textielproductie in Antalya: Anavera Tekstil (in het Engels)', langsLabel: 'Andere talen',
    note: 'Levertijd en prijs worden per bestelling vastgesteld; product, model en bedrukking kiezen we samen.',
  },
  ar: {
    slug: 'mansujat-tarwijiya-haqaib-qumash-antalya',
    title: 'المنسوجات الدعائية وحقائب القماش المطبوعة: دليل التخطيط',
    desc: 'كيف تخطّط للمنسوجات الدعائية للمعارض والفعاليات: حقائب القماش والتيشيرتات وصدريات الفليس والأزياء الموحّدة وملف الشعار والطباعة وخطوات الطلب.',
    h1: 'المنسوجات الدعائية وحقائب القماش المطبوعة بالشعار للمعارض والفعاليات: كيف تخطّط لها؟',
    lead: 'عند تجهيز منسوجات تحمل شعار شركتك لمعرض أو فعالية، فأكثر ما يوفّر الوقت هو الترتيب الصحيح: المنتجات أولًا، ثم ملف الشعار، ثم الطباعة. تشرح هذه الصفحة هذا الترتيب، والإنتاج لدينا في أنطاليا.',
    crumb: 'المنسوجات الدعائية وحقائب القماش',
    sections: [
      { h: 'من أين يبدأ التخطيط؟', p: ['ابدأ بتحديد لمن هذه المنتجات. الهدايا للزوّار وملابس فريقك حاجتان مختلفتان: تناسب الأولى حقائب القماش والتيشيرتات، وتناسب الثانية صدريات الفليس والجاكيتات والبناطيل والمآزر أو الأزياء الموحّدة التي تُرتدى طوال اليوم. وذِكر تاريخ المعرض أو الفعالية في رسالتك الأولى يسهّل التخطيط.'] },
      { h: 'ماذا ننتج؟', ul: ['حقائب قماش مطبوعة بشعارك (للدعاية وللهدايا)', 'تيشيرتات', 'صدريات فليس', 'جاكيتات', 'بناطيل', 'شورتات', 'مآزر', 'أزياء موحّدة ومنتجات نسيجية أخرى'], p: ['تُنتَج القطع بالتصميم والموديل ونوع الطباعة الذي تختاره.'] },
      { h: 'ملف الشعار والطباعة وتصميم الشعار', p: ['نقوم أيضًا بتصميم الشعار والطباعة، فيمكنك أن تبدأ حتى لو لم يكن شعارك جاهزًا. وإن كان لديك شعار فأسهل صيغة للعمل ملف متجهي (Vector) مثل AI أو PDF أو SVG، وقد تكفي صورة عالية الدقة. يُختار نوع الطباعة بحسب القماش وعدد ألوان الشعار وتفاصيله والكمية، وما يناسبك أكثر نحدده معًا عند الطلب.'], ul: ['دوّن ألوان شعارك وأكواد ألوان هويتك إن وُجدت', 'حدّد موضع الطباعة على القطعة (الأمام أو الخلف وغيرهما)', 'انظروا معًا كيف سيبدو الشعار نفسه على منتجات مختلفة، كحقيبة وتيشيرت'] },
      { h: 'الإنتاج للمعارض والفعاليات', p: ['ننتج المنتجات النسيجية المطلوبة في إكسبو أنطاليا وفي المعارض والفعاليات الأخرى؛ ويدخل في ذلك تصنيع حقائب القماش المطبوعة بالشعار للشركات وطباعتها. ولأن المدة تُحدَّد لكل طلب على حدة، فمن الأفضل ذكر تاريخ الفعالية من البداية لتختار المنتجات والطباعة على أساسه.'] },
      { h: 'كيف يسير الطلب؟', ul: ['ترسل عبر واتساب شعارك أو ملف التصميم أو فكرتك، مع المنتجات التي تحتاجها وتاريخ الفعالية', 'يُختار الموديل والمنتجات والطباعة معًا', 'يبدأ الإنتاج وفق الموديل والطباعة المعتمدين', 'تُحدَّد المدة والسعر لكل طلب'] },
    ],
    faqTitle: 'أسئلة شائعة',
    faq: [
      ['هل هناك حدّ أدنى للطلب؟', 'تختلف الكمية بحسب المنتج والطباعة والطلب، ولا نذكر أرقامًا هنا. اكتب لنا عبر واتساب كم قطعة تحتاج وسنحدّد ذلك معًا.'],
      ['كيف أعرف السعر؟', 'يعتمد السعر على المنتج والطباعة والكمية، لذلك لا ننشره هنا. أرسل شعارك أو فكرتك عبر واتساب ويُقدَّم عرض السعر لكل طلب.'],
      ['كم تستغرق المدة؟', 'تُحدَّد المدة لكل طلب. إن ذكرت تاريخ المعرض أو الفعالية في رسالتك الأولى فسنخطّط على أساسه.'],
      ['ماذا لو لم يكن لدي شعار أو تصميم؟', 'نصمّم الشعار والطباعة أيضًا. يكفي أن تذكر اسم مؤسستك وألوانها إن وُجدت والفكرة التي في ذهنك.'],
      ['ماذا تصنعون غير حقائب القماش؟', 'تيشيرتات وصدريات فليس وجاكيتات وبناطيل وشورتات ومآزر وأزياء موحّدة ومنتجات نسيجية أخرى، بالتصميم والموديل ونوع الطباعة الذي تختاره.'],
    ],
    cta: 'اطلب عرض سعر عبر واتساب',
    wa: 'مرحبًا، أودّ الحصول على معلومات وعرض سعر عن المنسوجات الدعائية بالشعار وحقائب القماش المطبوعة لمعرض أو فعالية. سأرسل لكم شعاري أو فكرتي.',
    tekstilLabel: 'الإنتاج النسيجي في أنطاليا: Anavera Tekstil (بالإنجليزية)', langsLabel: 'لغات أخرى',
    note: 'تُحدَّد المدة والسعر لكل طلب؛ ويُختار المنتج والموديل والطباعة معًا.',
  },
};

export const promoUrl = (l: ILang) => `/${l}/${PROMO[l].slug}`;
export const parsePromo = (l: ILang, slug: string) => PROMO[l].slug === slug;

/** Promosyon sayfasının 10 dilli karşılıkları (dil seçici, hreflang ve sitemap için tek kaynak). */
const NAME4 = { tr: 'Türkçe', en: 'English', de: 'Deutsch', ru: 'Русский' } as const;
export const PROMO_ALL: { code: string; hreflang: string; name: string; path: string }[] = [
  { code: 'tr', hreflang: 'tr-TR', name: NAME4.tr, path: URLS.promo.tr },
  { code: 'en', hreflang: 'en', name: NAME4.en, path: URLS.promo.en },
  { code: 'de', hreflang: 'de', name: NAME4.de, path: URLS.promo.de },
  { code: 'ru', hreflang: 'ru', name: NAME4.ru, path: URLS.promo.ru },
  ...ILANGS.map((l) => ({ code: l, hreflang: INTL[l].hreflang, name: INTL[l].name, path: promoUrl(l) })),
];
