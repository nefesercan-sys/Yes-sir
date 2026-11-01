// ============================================================
// swaphubs.com — lib/intl-konu.ts
// ES/FR/PL/UK/NL/AR için konu REHBERLERİ: tamir-tadilat, özel dikim, keten-pamuk, tekstil üretimi (bilgi niyeti: soru başlıklı bölümler).
// terzihizmeti.com.tr'deki konu sayfalarından bilerek farklı yapı/üslup. Kurallar: fiyat YAZILMAZ; deri/kot yalnız tamir-tadilat;
// süreler lib/business.ts DURATION; 2006'dan beri, her gün 08:00–23:00.
// ============================================================
import type { ILang } from '@/lib/intl';
import { DURATION } from '@/lib/business';

export type KonuId = 'tamir' | 'ozel' | 'keten' | 'tekstil';
export const KONU_IDS: KonuId[] = ['tamir', 'ozel', 'keten', 'tekstil'];
export type Konu = {
  slug: string; title: string; desc: string; h1: string; lead: string;
  sections: { h: string; p: string[] }[]; faq: [string, string][]; wa: string;
};
export const KONU_UI: Record<ILang, { back: string; faqTitle: string; cta: string; more: string }> = {
  es: { back: "← Sastre en Antalya para turistas", faqTitle: "Preguntas frecuentes", cta: "Enviar una foto por WhatsApp", more: "Más guías" },
  fr: { back: "← Couturier à Antalya pour les touristes", faqTitle: "Questions fréquentes", cta: "Envoyer une photo sur WhatsApp", more: "Autres guides" },
  pl: { back: "← Krawiec w Antalyi dla turystów", faqTitle: "Najczęstsze pytania", cta: "Wyślij zdjęcie na WhatsApp", more: "Inne poradniki" },
  uk: { back: "← Кравець в Анталії для туристів", faqTitle: "Часті запитання", cta: "Надіслати фото у WhatsApp", more: "Інші поради" },
  nl: { back: "← Kleermaker in Antalya voor toeristen", faqTitle: "Veelgestelde vragen", cta: "Stuur een foto via WhatsApp", more: "Meer gidsen" },
  ar: { back: "← خيّاط في أنطاليا للسياح", faqTitle: "الأسئلة الشائعة", cta: "أرسل صورة عبر واتساب", more: "أدلة أخرى" },
};
const T = DURATION;

export const KONU: Record<ILang, Record<KonuId, Konu>> = {
  es: {
    tamir: { slug: "guia-arreglos-ropa-antalya", title: "Guía: dónde arreglar la ropa en Antalya durante las vacaciones", desc: "Qué arreglos se hacen en poco tiempo, cómo dejar la prenda y qué se puede hacer con cuero y vaqueros. Konyaaltı, Antalya.", h1: "Guía de arreglos de ropa en Antalya", lead: "Una prenda que no le queda bien no tiene por qué estropear el viaje. Así funciona un arreglo en nuestro taller de Konyaaltı.",
      sections: [{ h: "¿Qué arreglos se hacen?", p: ["Bajos y largos de pantalones, vaqueros, faldas y vestidos; ajustes de cintura, caderas y costados; mangas y hombros de chaquetas; cambio y reparación de cremalleras."] }, { h: "¿Cuánto se tarda?", p: [`${T.es.all}`] }, { h: "¿Y el cuero y los vaqueros?", p: ["Con cuero y vaqueros hacemos solo reparación y ajuste, por ejemplo acortar un vaquero o cambiar una cremallera. No confeccionamos prendas nuevas con esos materiales."] }],
      faq: [["¿Cómo sé el precio?", "Envíe una foto de la prenda por WhatsApp y le indicamos el precio antes de empezar."]], wa: "Hola, necesito arreglar una prenda en Antalya." },
    ozel: { slug: "guia-ropa-a-medida-antalya", title: "Guía: cómo encargar ropa a medida en Antalya", desc: "Cómo funciona un encargo a medida: medidas, modelo, tejidos y plazos en el taller de Konyaaltı, Antalya.", h1: "Guía de ropa a medida en Antalya", lead: "Del modelo a la prenda terminada: los pasos de un encargo a medida para mujer y hombre.",
      sections: [{ h: "¿Cómo es el proceso?", p: ["Elige un modelo o trae una foto o una prenda parecida. Tomamos las medidas, elegimos el tejido y cosemos en el taller, con pruebas si hace falta."] }, { h: "¿Qué tejidos se usan?", p: ["Lino, algodón, punto, satén y seda. También confeccionamos vestidos de noche."] }, { h: "¿Qué plazo hay?", p: [`${T.es.custom}.`] }],
      faq: [["¿Hacen prendas nuevas de cuero o vaquero?", "No. Con cuero y vaqueros hacemos solo arreglos."]], wa: "Hola, quiero encargar una prenda a medida." },
    keten: { slug: "guia-lino-algodon-antalya", title: "Guía: lino y algodón a medida para el verano en Antalya", desc: "Por qué el lino y el algodón son los tejidos del verano en Antalya y qué prendas se pueden encargar a medida.", h1: "Guía de ropa de lino y algodón a medida", lead: "El lino y el algodón respiran y se secan rápido: por eso funcionan tan bien con el calor de la costa turca.",
      sections: [{ h: "¿Qué prendas conviene hacer en lino o algodón?", p: ["Camisas, vestidos de verano, pantalones amplios y chaquetas ligeras, también para niños."] }, { h: "¿Se puede encargar desde otro país?", p: ["Sí. Envíe sus medidas en línea; cosemos en Antalya y enviamos al país que indique. Plazo y envío se acuerdan por WhatsApp."] }],
      faq: [["¿Cuánto tarda?", `${T.es.custom}.`]], wa: "Hola, me interesa ropa de lino o algodón a medida." },
    tekstil: { slug: "guia-produccion-textil-antalya", title: "Guía: producción textil y marca propia en Antalya", desc: "Cómo encargar ropa y uniformes en serie en Antalya: muestra, etiqueta propia, sin cantidad mínima y envío internacional.", h1: "Guía de producción textil en serie", lead: "Para empresas y marcas que buscan un taller en Antalya: de la muestra a la serie y al envío.",
      sections: [{ h: "¿Cómo se empieza?", p: ["Envíenos por WhatsApp el modelo, las cantidades y el país de destino. Hacemos una muestra antes de la serie."] }, { h: "¿Hay cantidad mínima?", p: ["No. Se puede empezar con series pequeñas, con su etiqueta y su marca."] }],
      faq: [["¿Envían al extranjero?", "Sí, a cualquier país."]], wa: "Hola, quiero información sobre producción textil en serie." },
  },
  fr: {
    tamir: { slug: "guide-retouches-vetements-antalya", title: "Guide : où faire retoucher ses vêtements à Antalya en vacances", desc: "Quelles retouches sont possibles, comment déposer le vêtement et ce que l’on peut faire avec le cuir et le jean. Konyaaltı, Antalya.", h1: "Guide des retouches de vêtements à Antalya", lead: "Un vêtement qui ne va pas ne doit pas gâcher le voyage. Voici comment se passe une retouche dans notre atelier de Konyaaltı.",
      sections: [{ h: "Quelles retouches faites-vous ?", p: ["Ourlets et longueurs de pantalons, jeans, jupes et robes ; ajustement de la taille, des hanches et des côtés ; manches et épaules de vestes ; changement et réparation de fermetures."] }, { h: "Combien de temps cela prend-il ?", p: [`${T.fr.all}`] }, { h: "Et le cuir et le jean ?", p: ["Pour le cuir et le jean, nous faisons uniquement des retouches et des réparations, par exemple raccourcir un jean ou changer une fermeture. Nous ne confectionnons pas de vêtements neufs dans ces matières."] }],
      faq: [["Comment connaître le prix ?", "Envoyez une photo du vêtement sur WhatsApp et nous vous indiquons le prix avant de commencer."]], wa: "Bonjour, j’ai besoin de faire retoucher un vêtement à Antalya." },
    ozel: { slug: "guide-sur-mesure-antalya", title: "Guide : commander un vêtement sur mesure à Antalya", desc: "Comment se passe une commande sur mesure : mesures, modèle, tissus et délais dans l’atelier de Konyaaltı, Antalya.", h1: "Guide du sur-mesure à Antalya", lead: "Du modèle au vêtement terminé : les étapes d’une commande sur mesure pour femme et homme.",
      sections: [{ h: "Comment cela se passe-t-il ?", p: ["Vous choisissez un modèle ou apportez une photo ou un vêtement similaire. Nous prenons les mesures, choisissons le tissu et cousons dans l’atelier, avec essayage si nécessaire."] }, { h: "Quels tissus utilisez-vous ?", p: ["Lin, coton, jersey, satin et soie. Nous réalisons aussi des robes de soirée."] }, { h: "Quel est le délai ?", p: [`${T.fr.custom}.`] }],
      faq: [["Faites-vous des vêtements neufs en cuir ou en jean ?", "Non. Pour le cuir et le jean, nous faisons uniquement des retouches."]], wa: "Bonjour, je souhaite commander un vêtement sur mesure." },
    keten: { slug: "guide-lin-coton-antalya", title: "Guide : lin et coton sur mesure pour l’été à Antalya", desc: "Pourquoi le lin et le coton sont les tissus de l’été à Antalya et quels vêtements commander sur mesure.", h1: "Guide des vêtements en lin et coton sur mesure", lead: "Le lin et le coton respirent et sèchent vite : ils conviennent très bien à la chaleur de la côte turque.",
      sections: [{ h: "Quels vêtements choisir en lin ou en coton ?", p: ["Chemises, robes d’été, pantalons amples et vestes légères, aussi pour enfants."] }, { h: "Peut-on commander depuis un autre pays ?", p: ["Oui. Envoyez vos mesures en ligne ; nous cousons à Antalya et expédions dans le pays de votre choix. Délai et envoi se règlent sur WhatsApp."] }],
      faq: [["Combien de temps cela prend-il ?", `${T.fr.custom}.`]], wa: "Bonjour, je suis intéressé(e) par un vêtement en lin ou coton sur mesure." },
    tekstil: { slug: "guide-production-textile-antalya", title: "Guide : production textile et marque propre à Antalya", desc: "Comment commander des vêtements et uniformes en série à Antalya : échantillon, étiquette propre, sans minimum et envoi international.", h1: "Guide de la production textile en série", lead: "Pour les entreprises et marques qui cherchent un atelier à Antalya : de l’échantillon à la série et à l’expédition.",
      sections: [{ h: "Comment commencer ?", p: ["Envoyez-nous sur WhatsApp le modèle, les quantités et le pays de destination. Nous réalisons un échantillon avant la série."] }, { h: "Y a-t-il une quantité minimale ?", p: ["Non. On peut commencer par de petites séries, avec votre étiquette et votre marque."] }],
      faq: [["Expédiez-vous à l’étranger ?", "Oui, dans tous les pays."]], wa: "Bonjour, je souhaite des informations sur la production textile en série." },
  },
  pl: {
    tamir: { slug: "poradnik-przerobki-odziezy-antalya", title: "Poradnik: gdzie przerobić ubranie w Antalyi na wakacjach", desc: "Jakie przeróbki da się zrobić szybko, jak zostawić ubranie i co można zrobić ze skórą i jeansem. Konyaaltı, Antalya.", h1: "Poradnik: przeróbki odzieży w Antalyi", lead: "Źle leżące ubranie nie musi psuć wyjazdu. Oto jak wygląda przeróbka w naszej pracowni w Konyaaltı.",
      sections: [{ h: "Jakie przeróbki wykonujemy?", p: ["Skracanie spodni, jeansów, spódnic i sukienek; dopasowanie talii, bioder i boków; rękawy i ramiona marynarek; wymiana i naprawa zamków."] }, { h: "Ile to trwa?", p: [`${T.pl.all}`] }, { h: "A skóra i jeans?", p: ["Skórę i jeans tylko naprawiamy i przerabiamy, na przykład skracamy jeansy lub wymieniamy zamek. Nie szyjemy z nich nowych ubrań."] }],
      faq: [["Jak poznać cenę?", "Wyślij zdjęcie ubrania na WhatsApp, a podamy cenę przed rozpoczęciem pracy."]], wa: "Dzień dobry, potrzebuję przeróbki ubrania w Antalyi." },
    ozel: { slug: "poradnik-szycie-na-miare-antalya", title: "Poradnik: jak zamówić szycie na miarę w Antalyi", desc: "Jak wygląda zamówienie na miarę: wymiary, wzór, tkaniny i terminy w pracowni w Konyaaltı, Antalya.", h1: "Poradnik: szycie na miarę w Antalyi", lead: "Od wzoru do gotowego ubrania: etapy zamówienia na miarę dla pań i panów.",
      sections: [{ h: "Jak przebiega zamówienie?", p: ["Wybierasz wzór lub przynosisz zdjęcie albo podobne ubranie. Bierzemy miarę, dobieramy tkaninę i szyjemy w pracowni, w razie potrzeby z przymiarką."] }, { h: "Z jakich tkanin szyjemy?", p: ["Len, bawełna, dzianina, satyna i jedwab. Szyjemy też suknie wieczorowe."] }, { h: "Jaki jest termin?", p: [`${T.pl.custom}.`] }],
      faq: [["Czy szyjecie nowe rzeczy ze skóry lub jeansu?", "Nie. Skórę i jeans tylko naprawiamy i przerabiamy."]], wa: "Dzień dobry, chcę zamówić ubranie na miarę." },
    keten: { slug: "poradnik-len-bawelna-antalya", title: "Poradnik: len i bawełna na miarę na lato w Antalyi", desc: "Dlaczego len i bawełna to tkaniny lata w Antalyi i jakie ubrania można zamówić na miarę.", h1: "Poradnik: odzież z lnu i bawełny na miarę", lead: "Len i bawełna oddychają i szybko schną, dlatego tak dobrze sprawdzają się w upale na tureckim wybrzeżu.",
      sections: [{ h: "Co warto uszyć z lnu lub bawełny?", p: ["Koszule, letnie sukienki, luźne spodnie i lekkie marynarki, także dla dzieci."] }, { h: "Czy można zamówić z innego kraju?", p: ["Tak. Prześlij wymiary online; uszyjemy w Antalyi i wyślemy do wybranego kraju. Termin i wysyłkę ustalamy przez WhatsApp."] }],
      faq: [["Ile to trwa?", `${T.pl.custom}.`]], wa: "Dzień dobry, interesuje mnie odzież z lnu lub bawełny na miarę." },
    tekstil: { slug: "poradnik-produkcja-odziezy-antalya", title: "Poradnik: produkcja odzieży i własna marka w Antalyi", desc: "Jak zamówić seryjną odzież i mundury w Antalyi: próbka, własna metka, bez minimum i wysyłka za granicę.", h1: "Poradnik: seryjna produkcja odzieży", lead: "Dla firm i marek szukających pracowni w Antalyi: od próbki przez serię po wysyłkę.",
      sections: [{ h: "Jak zacząć?", p: ["Napisz na WhatsApp, podając model, ilości i kraj docelowy. Przed serią szyjemy próbkę."] }, { h: "Czy jest minimalna ilość?", p: ["Nie. Można zacząć od małych serii, z Twoją metką i marką."] }],
      faq: [["Czy wysyłacie za granicę?", "Tak, do każdego kraju."]], wa: "Dzień dobry, proszę o informacje o produkcji seryjnej odzieży." },
  },
  uk: {
    tamir: { slug: "posibnyk-pidhonka-odyahu-antaliya", title: "Посібник: де підігнати одяг в Анталії під час відпустки", desc: "Які підгонки роблять швидко, як залишити річ і що можна зробити зі шкірою та джинсом. Коньяалти, Анталія.", h1: "Посібник: підгонка одягу в Анталії", lead: "Річ, що погано сидить, не має псувати подорож. Ось як проходить підгонка в нашому ательє в Коньяалти.",
      sections: [{ h: "Які підгонки ми робимо?", p: ["Вкорочення штанів, джинсів, спідниць і суконь; підгонка талії, стегон і боків; рукави й плечі піджаків; заміна та ремонт блискавок."] }, { h: "Скільки це триває?", p: [`${T.uk.all}`] }, { h: "А шкіра та джинс?", p: ["Зі шкірою та джинсом ми лише ремонтуємо й підганяємо, наприклад вкорочуємо джинси чи міняємо блискавку. Нових речей з них не шиємо."] }],
      faq: [["Як дізнатися ціну?", "Надішліть фото речі у WhatsApp, і ми назвемо ціну до початку роботи."]], wa: "Добрий день, мені потрібна підгонка одягу в Анталії." },
    ozel: { slug: "posibnyk-poshyv-na-zamovlennia-antaliya", title: "Посібник: як замовити пошив одягу в Анталії", desc: "Як проходить замовлення: мірки, модель, тканини й строки в ательє в Коньяалти, Анталія.", h1: "Посібник: пошив одягу на замовлення в Анталії", lead: "Від моделі до готової речі: етапи індивідуального замовлення для жінок і чоловіків.",
      sections: [{ h: "Як проходить замовлення?", p: ["Ви обираєте модель або приносите фото чи схожу річ. Ми знімаємо мірки, підбираємо тканину й шиємо в ательє, за потреби з приміркою."] }, { h: "Які тканини використовуємо?", p: ["Льон, бавовна, трикотаж, атлас і шовк. Також шиємо вечірні сукні."] }, { h: "Які строки?", p: [`${T.uk.custom}.`] }],
      faq: [["Чи шиєте ви нові речі зі шкіри або джинсу?", "Ні. Зі шкірою та джинсом ми лише ремонтуємо й підганяємо."]], wa: "Добрий день, хочу замовити пошив одягу." },
    keten: { slug: "posibnyk-lon-bavovna-antaliya", title: "Посібник: льон і бавовна на замовлення для літа в Анталії", desc: "Чому льон і бавовна — тканини літа в Анталії та що можна замовити на пошив.", h1: "Посібник: одяг з льону та бавовни на замовлення", lead: "Льон і бавовна дихають і швидко сохнуть, тому чудово підходять для спеки на турецькому узбережжі.",
      sections: [{ h: "Що варто шити з льону чи бавовни?", p: ["Сорочки, літні сукні, вільні штани та легкі піджаки, також для дітей."] }, { h: "Чи можна замовити з іншої країни?", p: ["Так. Надішліть мірки онлайн; ми пошиємо в Анталії та відправимо в обрану країну. Строки й доставку узгоджуємо у WhatsApp."] }],
      faq: [["Скільки це триває?", `${T.uk.custom}.`]], wa: "Добрий день, мене цікавить пошив одягу з льону або бавовни." },
    tekstil: { slug: "posibnyk-vyrobnytstvo-odyahu-antaliya", title: "Посібник: виробництво одягу та власний бренд в Анталії", desc: "Як замовити серійний одяг та уніформу в Анталії: зразок, власна етикетка, без мінімуму й міжнародна доставка.", h1: "Посібник: серійне виробництво одягу", lead: "Для компаній і брендів, які шукають ательє в Анталії: від зразка до серії та відправлення.",
      sections: [{ h: "З чого почати?", p: ["Напишіть у WhatsApp: модель, кількість і країна призначення. Перед серією робимо зразок."] }, { h: "Чи є мінімальна кількість?", p: ["Ні. Можна почати з малих серій, з вашою етикеткою та брендом."] }],
      faq: [["Чи відправляєте за кордон?", "Так, у будь-яку країну."]], wa: "Добрий день, прошу інформацію про серійне виробництво одягу." },
  },
  nl: {
    tamir: { slug: "gids-kleding-vermaken-antalya", title: "Gids: waar kleding laten vermaken in Antalya tijdens uw vakantie", desc: "Welke aanpassingen snel kunnen, hoe u het kledingstuk brengt en wat er met leer en jeans kan. Konyaaltı, Antalya.", h1: "Gids: kleding vermaken in Antalya", lead: "Kleding die niet zit hoeft uw reis niet te bederven. Zo gaat vermaken in ons atelier in Konyaaltı.",
      sections: [{ h: "Wat vermaken wij?", p: ["Zomen en lengtes van broeken, jeans, rokken en jurken; taille, heupen en zijkanten aanpassen; mouwen en schouders van jasjes; ritsen vervangen en repareren."] }, { h: "Hoe lang duurt het?", p: [`${T.nl.all}`] }, { h: "En leer en jeans?", p: ["Leer en jeans doen wij alleen als reparatie en vermaakwerk, bijvoorbeeld een jeans inkorten of een rits vervangen. Nieuwe kleding maken wij daarvan niet."] }],
      faq: [["Hoe kom ik aan de prijs?", "Stuur een foto van het kledingstuk via WhatsApp, dan noemen wij de prijs voordat wij beginnen."]], wa: "Hallo, ik wil kleding laten vermaken in Antalya." },
    ozel: { slug: "gids-kleding-op-maat-antalya", title: "Gids: kleding op maat bestellen in Antalya", desc: "Hoe een bestelling op maat verloopt: maten, model, stoffen en doorlooptijd in het atelier in Konyaaltı, Antalya.", h1: "Gids: kleding op maat in Antalya", lead: "Van model tot kant-en-klaar kledingstuk: de stappen van een maatbestelling voor dames en heren.",
      sections: [{ h: "Hoe verloopt het?", p: ["U kiest een model of brengt een foto of vergelijkbaar kledingstuk mee. Wij nemen de maten op, kiezen de stof en naaien in het atelier, zo nodig met een pasmoment."] }, { h: "Welke stoffen gebruiken wij?", p: ["Linnen, katoen, tricot, satijn en zijde. Ook avondjurken maken wij."] }, { h: "Hoe lang duurt het?", p: [`${T.nl.custom}.`] }],
      faq: [["Maken jullie nieuwe kleding van leer of jeans?", "Nee. Leer en jeans doen wij alleen als reparatie en vermaakwerk."]], wa: "Hallo, ik wil kleding op maat laten maken." },
    keten: { slug: "gids-linnen-katoen-antalya", title: "Gids: linnen en katoen op maat voor de zomer in Antalya", desc: "Waarom linnen en katoen de zomerstoffen zijn in Antalya en wat u op maat kunt laten maken.", h1: "Gids: linnen en katoenen kleding op maat", lead: "Linnen en katoen ademen en drogen snel, daarom werken ze zo goed in de hitte aan de Turkse kust.",
      sections: [{ h: "Wat laat u het best maken van linnen of katoen?", p: ["Overhemden, zomerjurken, wijde broeken en lichte jasjes, ook voor kinderen."] }, { h: "Kan ik vanuit een ander land bestellen?", p: ["Ja. Stuur uw maten online; wij naaien in Antalya en sturen naar het land van uw keuze. Doorlooptijd en verzending regelen we via WhatsApp."] }],
      faq: [["Hoe lang duurt het?", `${T.nl.custom}.`]], wa: "Hallo, ik ben geïnteresseerd in linnen of katoenen kleding op maat." },
    tekstil: { slug: "gids-kledingproductie-antalya", title: "Gids: kledingproductie en eigen merk in Antalya", desc: "Hoe u serie-kleding en uniformen bestelt in Antalya: monster, eigen label, geen minimum en internationale verzending.", h1: "Gids: serieproductie van kleding", lead: "Voor bedrijven en merken die een atelier in Antalya zoeken: van monster tot serie en verzending.",
      sections: [{ h: "Hoe begin ik?", p: ["Stuur ons via WhatsApp het model, de aantallen en het bestemmingsland. Vóór de serie maken wij een monster."] }, { h: "Is er een minimale afname?", p: ["Nee. U kunt met kleine series beginnen, met uw eigen label en merk."] }],
      faq: [["Verzenden jullie naar het buitenland?", "Ja, naar elk land."]], wa: "Hallo, ik wil informatie over serieproductie van kleding." },
  },
  ar: {
    tamir: { slug: "dalil-tadil-malabis-antalya", title: "دليل: أين تعدّل ملابسك في أنطاليا أثناء الإجازة", desc: "أي التعديلات تتم بسرعة، وكيف تسلّم القطعة، وما الممكن مع الجلد والجينز. كونيالتي، أنطاليا.", h1: "دليل تعديل الملابس في أنطاليا", lead: "قطعة غير مناسبة لا يجب أن تفسد رحلتك. هكذا يتم التعديل في ورشتنا في كونيالتي.",
      sections: [{ h: "ما التعديلات التي نجريها؟", p: ["تقصير البناطيل والجينز والتنانير والفساتين، وتعديل الخصر والوركين والجوانب، وأكمام السترات وأكتافها، وتبديل السحّابات وإصلاحها."] }, { h: "كم يستغرق ذلك؟", p: [`${T.ar.all}`] }, { h: "وماذا عن الجلد والجينز؟", p: ["نتعامل مع الجلد والجينز إصلاحًا وتعديلًا فقط، مثل تقصير الجينز أو تبديل السحّاب. لا نخيط منهما قطعًا جديدة."] }],
      faq: [["كيف أعرف السعر؟", "أرسل صورة للقطعة عبر واتساب ونخبرك بالسعر قبل البدء."]], wa: "مرحبًا، أحتاج إلى تعديل قطعة ملابس في أنطاليا." },
    ozel: { slug: "dalil-khayata-hasab-al-maqas-antalya", title: "دليل: كيف تطلب خياطة حسب المقاس في أنطاليا", desc: "كيف يتم الطلب حسب المقاس: القياسات والنموذج والأقمشة والمدة في ورشة كونيالتي، أنطاليا.", h1: "دليل الخياطة حسب المقاس في أنطاليا", lead: "من النموذج إلى القطعة الجاهزة: خطوات طلب خياطة للنساء والرجال.",
      sections: [{ h: "كيف تتم العملية؟", p: ["تختار نموذجًا أو تحضر صورة أو قطعة مشابهة. نأخذ المقاسات ونختار القماش ونخيط في الورشة مع قياس تجريبي عند الحاجة."] }, { h: "ما الأقمشة المستخدمة؟", p: ["الكتان والقطن والجيرسيه والساتان والحرير. ونخيط فساتين السهرة أيضًا."] }, { h: "ما المدة؟", p: [`${T.ar.custom}.`] }],
      faq: [["هل تخيطون قطعًا جديدة من الجلد أو الجينز؟", "لا. نتعامل مع الجلد والجينز إصلاحًا وتعديلًا فقط."]], wa: "مرحبًا، أريد طلب قطعة حسب المقاس." },
    keten: { slug: "dalil-kitan-qutn-antalya", title: "دليل: ملابس الكتان والقطن حسب المقاس لصيف أنطاليا", desc: "لماذا الكتان والقطن هما قماشا الصيف في أنطاليا وما القطع التي يمكن طلبها حسب المقاس.", h1: "دليل ملابس الكتان والقطن حسب المقاس", lead: "الكتان والقطن يسمحان بمرور الهواء ويجفان بسرعة، ولذلك يناسبان حرّ الساحل التركي.",
      sections: [{ h: "ماذا يُفضَّل أن نخيط من الكتان أو القطن؟", p: ["قمصان وفساتين صيفية وبناطيل واسعة وسترات خفيفة، وللأطفال أيضًا."] }, { h: "هل يمكن الطلب من بلد آخر؟", p: ["نعم. أرسل مقاساتك عبر الإنترنت ونخيط في أنطاليا ونشحن إلى البلد الذي تختاره. نتفق على المدة والشحن عبر واتساب."] }],
      faq: [["كم يستغرق ذلك؟", `${T.ar.custom}.`]], wa: "مرحبًا، أنا مهتم بملابس الكتان أو القطن حسب المقاس." },
    tekstil: { slug: "dalil-intaj-malabis-antalya", title: "دليل: إنتاج الملابس والعلامة التجارية الخاصة في أنطاليا", desc: "كيف تطلب ملابس وزيًّا موحّدًا بالجملة في أنطاليا: عيّنة وملصق خاص ودون حدّ أدنى وشحن دولي.", h1: "دليل الإنتاج بالجملة للملابس", lead: "للشركات والعلامات التجارية التي تبحث عن ورشة في أنطاليا: من العيّنة إلى الإنتاج والشحن.",
      sections: [{ h: "كيف أبدأ؟", p: ["راسلنا عبر واتساب مع النموذج والكميات وبلد الوجهة. نصنع عيّنة قبل الإنتاج."] }, { h: "هل يوجد حدّ أدنى للكمية؟", p: ["لا. يمكن البدء بكميات صغيرة بملصقك وعلامتك."] }],
      faq: [["هل تشحنون إلى الخارج؟", "نعم، إلى أي بلد."]], wa: "مرحبًا، أريد معلومات عن إنتاج الملابس بالجملة." },
  },
};

export const konuUrl = (l: ILang, t: KonuId) => `/${l}/${KONU[l][t].slug}`;
export const parseKonu = (l: ILang, slug: string): KonuId | undefined => KONU_IDS.find((t) => KONU[l][t].slug === slug);

// ── 10 dilli hreflang: keten ve tekstil konularında TR/EN/RU/DE çekirdek sayfalarla karşılıklı bağ ──
import { URLS as CORE_URLS } from '@/lib/tekstil-sayfalari';
const SITE_ABS = 'https://swaphubs.com';
const CORE_HL: Record<'tr' | 'en' | 'ru' | 'de', string> = { tr: 'tr-TR', en: 'en', ru: 'ru', de: 'de' };
const SIX: ILang[] = ['es', 'fr', 'pl', 'uk', 'nl', 'ar'];
/** Yeni 6 dil rehberleri (hreflang → mutlak URL). */
export const sixAlt = (t: KonuId): Record<string, string> => Object.fromEntries(SIX.map((l) => [l, `${SITE_ABS}${konuUrl(l, t)}`]));
/** Keten/tekstil için TR/EN/RU/DE çekirdek sayfalar; diğer konularda boş. */
export const coreAlt = (t: KonuId): Record<string, string> =>
  t === 'keten' || t === 'tekstil'
    ? Object.fromEntries((['tr', 'en', 'ru', 'de'] as const).map((l) => [CORE_HL[l], `${SITE_ABS}${CORE_URLS[t][l]}`]))
    : {};
/** Rehber sayfasının tam hreflang kümesi. */
export const konuLanguages = (t: KonuId): Record<string, string> => {
  const m = { ...coreAlt(t), ...sixAlt(t) };
  return t === 'keten' || t === 'tekstil' ? { ...m, 'x-default': m['tr-TR'] } : m;
};
