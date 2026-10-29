// ============================================================
// swaphubs.com — lib/intl-svc.ts
// Ek turist dilleri (ES/FR/PL/UK/NL/AR): "Hizmetler, kumaşlar ve yurt dışı sipariş" REHBERİ (bilgi niyeti).
// terzihizmeti.com.tr'deki "hizmetler ve kumaşlar" sayfasından bilerek farklı yapı/üslup (rehber: sorular + adımlar).
// Kural (işletme sahibi, 29 Eki 2026): deri ve kot YALNIZCA tamir/tadilat; sıfırdan dikim keten, pamuk, penye, saten, ipek vb.
// Yurt dışı: ölçü online, Antalya'da dikim, istenen ülkeye kargo; banka havalesi; kargo ücreti müşteriye ait; kumaşı biz temin ederiz;
// uymazsa düzeltme; genelde 1–3 hafta. Tadilat ~1 gün, özel dikim ~3 gün, acil çoğu kez 2–4 saat. 08:00–23:00. Fiyat YAZILMAZ.
// ============================================================
import type { ILang } from '@/lib/intl';

export type SvcGuide = {
  slug: string; title: string; desc: string; h1: string; lead: string; back: string;
  sections: { h: string; p: string[] }[];
  faqTitle: string; faq: [string, string][]; cta: string; wa: string;
};

export const SVCG: Record<ILang, SvcGuide> = {
  es: {
    slug: 'guia-servicios-telas-sastreria-antalya',
    title: 'Qué hace una sastrería en Antalya: servicios y telas',
    desc: 'Guía de arreglos, ropa a medida y pedidos desde el extranjero: qué se puede hacer con lino, algodón, seda o satén, y qué con cuero y vaqueros.',
    h1: 'Qué puede hacer una sastrería en Antalya: arreglos, telas y pedidos a distancia',
    lead: 'Esta guía resume qué trabajos admite el taller Terzi Can de Konyaaltı (desde 2006, cada día de 08:00 a 23:00), con qué telas trabaja y cómo se encarga una prenda desde otro país.',
    back: '← Guía de arreglos en vacaciones',
    sections: [
      { h: 'Arreglos que se piden con más frecuencia', p: ['Acortar o ajustar pantalones, vaqueros, faldas y vestidos, estrechar cintura y costados, y cambiar o reparar cremalleras. También abrigos y chaquetas (mangas, largo, cremallera) y vestidos de noche (estrechar, acortar o ensanchar).', 'Los arreglos sencillos suelen estar listos en un día y las urgencias a menudo en 2–4 horas; confirme el plazo por WhatsApp.'] },
      { h: 'Cuero y vaqueros: solo reparación', p: ['Con el cuero y los vaqueros se hacen arreglos y reparaciones (acortar vaqueros, reparar o estrechar una chaqueta o un pantalón de cuero, cambiar cremalleras). No se confeccionan prendas nuevas de cuero ni de vaquero.'] },
      { h: 'Ropa a medida y telas', p: ['La ropa a medida (mujer y hombre, vestidos de noche, modelos propios) se cose en lino, algodón, punto (penye), satén y seda. La tela la proporciona el taller. También se diseñan y producen modelos, y existe producción en serie.', 'Una prenda a medida suele llevar unos 3 días.'] },
      { h: 'Si se aloja en un hotel', p: ['Se pueden tomar las medidas en el hotel y devolver allí la prenda terminada. En los barrios de Konyaaltı la recogida y entrega es gratuita; para zonas más alejadas se acuerda por WhatsApp.'] },
      { h: 'Pedir desde el extranjero', p: ['1) Envíe por WhatsApp el modelo y sus medidas. 2) Se cose en el taller de Antalya. 3) Se envía al país que indique. El pago es por transferencia bancaria y el envío lo paga el cliente; suele tardar de 1 a 3 semanas. Si la prenda no le queda bien, se corrige.'] },
    ],
    faqTitle: 'Preguntas útiles',
    faq: [
      ['¿Se puede encargar una chaqueta nueva de cuero?', 'No. Con cuero y vaqueros solo se hacen arreglos y reparaciones. La ropa nueva a medida es en lino, algodón, punto, satén, seda y telas similares.'],
      ['¿Quién pone la tela en un pedido a medida?', 'La tela la proporciona el taller.'],
      ['¿Cómo se sabe el precio?', 'Envíe una foto o el modelo por WhatsApp; el precio se indica antes de empezar.'],
    ],
    cta: 'Escribir por WhatsApp', wa: 'Hola, quisiera información sobre un arreglo o una prenda a medida. Le envío una foto.',
  },
  fr: {
    slug: 'guide-services-tissus-couture-antalya',
    title: 'Atelier de couture à Antalya : services et tissus',
    desc: 'Guide des retouches, du sur-mesure et des commandes depuis l’étranger : lin, coton, soie, satin, et cuir ou jean en réparation seulement.',
    h1: 'Ce que peut faire un atelier de couture à Antalya : retouches, tissus et commandes à distance',
    lead: 'Ce guide résume les travaux acceptés par l’atelier Terzi Can de Konyaaltı (depuis 2006, tous les jours de 08h00 à 23h00), les tissus utilisés et la façon de commander depuis un autre pays.',
    back: '← Guide des retouches en vacances',
    sections: [
      { h: 'Retouches les plus demandées', p: ['Raccourcir ou ajuster pantalons, jeans, jupes et robes, reprendre la taille et les côtés, remplacer ou réparer les fermetures éclair. Aussi manteaux et vestes (manches, longueur, fermeture) et robes de soirée (reprendre, raccourcir ou élargir).', 'Les retouches simples sont souvent prêtes en une journée, les urgences en 2 à 4 heures ; le délai se confirme sur WhatsApp.'] },
      { h: 'Cuir et jean : réparation uniquement', p: ['Pour le cuir et le jean, on effectue des retouches et des réparations (raccourcir un jean, réparer ou reprendre une veste ou un pantalon en cuir, changer une fermeture). Aucun vêtement neuf en cuir ou en jean n’est confectionné.'] },
      { h: 'Sur-mesure et tissus', p: ['Le sur-mesure (femme et homme, robes de soirée, modèles personnels) se réalise en lin, coton, jersey (penye), satin et soie. Le tissu est fourni par l’atelier. Des modèles sont aussi conçus et produits, et la production en série existe.', 'Un vêtement sur mesure demande en général environ 3 jours.'] },
      { h: 'Si vous séjournez à l’hôtel', p: ['Les mesures peuvent être prises à l’hôtel et le vêtement terminé y est rapporté. Dans les quartiers de Konyaaltı, la collecte et la livraison sont gratuites ; pour les secteurs plus éloignés, on convient des conditions sur WhatsApp.'] },
      { h: 'Commander depuis l’étranger', p: ['1) Envoyez le modèle et vos mesures sur WhatsApp. 2) Le vêtement est cousu à l’atelier d’Antalya. 3) Il est expédié dans le pays de votre choix. Paiement par virement bancaire, frais d’expédition à la charge du client, en général 1 à 3 semaines. Si le vêtement ne vous va pas, il est corrigé.'] },
    ],
    faqTitle: 'Questions utiles',
    faq: [
      ['Peut-on commander une veste neuve en cuir ?', 'Non. Le cuir et le jean sont réservés aux retouches et réparations. Le sur-mesure se fait en lin, coton, jersey, satin, soie et tissus similaires.'],
      ['Qui fournit le tissu pour une commande sur mesure ?', 'Le tissu est fourni par l’atelier.'],
      ['Comment connaître le prix ?', 'Envoyez une photo ou le modèle sur WhatsApp ; le prix est annoncé avant de commencer.'],
    ],
    cta: 'Écrire sur WhatsApp', wa: 'Bonjour, je voudrais des informations sur une retouche ou un vêtement sur mesure. Je vous envoie une photo.',
  },
  pl: {
    slug: 'przewodnik-uslugi-tkaniny-krawiec-antalya',
    title: 'Co robi krawiec w Antalyi: usługi i tkaniny',
    desc: 'Przewodnik po przeróbkach, szyciu na miarę i zamówieniach z zagranicy: len, bawełna, jedwab, satyna oraz skóra i jeans tylko w naprawach.',
    h1: 'Co może zrobić krawiec w Antalyi: przeróbki, tkaniny i zamówienia na odległość',
    lead: 'Ten przewodnik opisuje, jakie prace przyjmuje zakład Terzi Can w Konyaaltı (od 2006 roku, codziennie 08:00–23:00), z jakich tkanin szyje i jak zamówić ubranie z innego kraju.',
    back: '← Przewodnik po przeróbkach na wakacjach',
    sections: [
      { h: 'Najczęstsze przeróbki', p: ['Skracanie i dopasowanie spodni, jeansów, spódnic i sukienek, zwężanie talii i boków, wymiana i naprawa zamków. Także płaszcze i kurtki (rękawy, długość, zamek) oraz suknie wieczorowe (zwężanie, skracanie, poszerzanie).', 'Proste przeróbki zwykle są gotowe w jeden dzień, pilne często w 2–4 godziny; termin potwierdza się na WhatsApp.'] },
      { h: 'Skóra i jeans: tylko naprawy', p: ['Skórę i jeans przerabiamy i naprawiamy (skracanie jeansów, naprawa lub zwężenie skórzanej kurtki czy spodni, wymiana zamków). Nowych ubrań ze skóry ani z jeansu nie szyjemy.'] },
      { h: 'Szycie na miarę i tkaniny', p: ['Odzież na miarę (damska i męska, suknie wieczorowe, własne modele) szyjemy z lnu, bawełny, dzianiny (penye), satyny i jedwabiu. Tkaninę zapewnia zakład. Projektujemy i produkujemy też modele, jest także produkcja seryjna.', 'Ubranie na miarę zajmuje zwykle około 3 dni.'] },
      { h: 'Jeśli mieszkasz w hotelu', p: ['Miarę można wziąć w hotelu, a gotowe ubranie odwieźć tam z powrotem. W dzielnicach Konyaaltı odbiór i dostawa są bezpłatne; dla dalszych rejonów warunki ustala się na WhatsApp.'] },
      { h: 'Zamówienie z zagranicy', p: ['1) Wyślij na WhatsApp model i swoje wymiary. 2) Ubranie szyjemy w zakładzie w Antalyi. 3) Wysyłamy do wybranego kraju. Płatność przelewem bankowym, koszt wysyłki ponosi klient, zwykle 1–3 tygodnie. Jeśli ubranie nie pasuje, poprawiamy je.'] },
    ],
    faqTitle: 'Przydatne pytania',
    faq: [
      ['Czy można zamówić nową skórzaną kurtkę?', 'Nie. Skórę i jeans tylko przerabiamy i naprawiamy. Nowe ubrania na miarę szyjemy z lnu, bawełny, dzianiny, satyny, jedwabiu i podobnych tkanin.'],
      ['Kto zapewnia tkaninę przy zamówieniu na miarę?', 'Tkaninę zapewnia zakład.'],
      ['Jak poznać cenę?', 'Wyślij zdjęcie lub model na WhatsApp; cenę podajemy przed rozpoczęciem pracy.'],
    ],
    cta: 'Napisz na WhatsApp', wa: 'Dzień dobry, chciałbym uzyskać informacje o przeróbce lub szyciu na miarę. Wysyłam zdjęcie.',
  },
  uk: {
    slug: 'putivnyk-poslugy-tkanyny-kravets-antaliya',
    title: 'Що робить кравець в Анталії: послуги та тканини',
    desc: 'Путівник з підгонки, пошиву на замовлення та замовлень з-за кордону: льон, бавовна, шовк, атлас; шкіра й джинс лише в ремонті.',
    h1: 'Що може кравець в Анталії: підгонка, тканини та замовлення на відстані',
    lead: 'Цей путівник описує, які роботи приймає майстерня Terzi Can у Коньяалти (з 2006 року, щодня 08:00–23:00), з яких тканин шиє і як замовити річ з іншої країни.',
    back: '← Путівник з підгонки одягу у відпустці',
    sections: [
      { h: 'Найчастіші роботи з підгонки', p: ['Вкорочення та підгонка штанів, джинсів, спідниць і суконь, звуження талії та боків, заміна й ремонт блискавок. Також пальта й куртки (рукави, довжина, блискавка) та вечірні сукні (звузити, вкоротити, розширити).', 'Прості роботи зазвичай готові за день, термінові часто за 2–4 години; термін уточнюйте у WhatsApp.'] },
      { h: 'Шкіра й джинс: лише ремонт', p: ['Зі шкірою та джинсом виконуємо підгонку й ремонт (вкоротити джинси, відремонтувати або звузити шкіряну куртку чи штани, замінити блискавку). Нових речей зі шкіри чи джинсу не шиємо.'] },
      { h: 'Пошив на замовлення й тканини', p: ['Одяг на замовлення (жіночий і чоловічий, вечірні сукні, власні моделі) шиємо з льону, бавовни, трикотажу (пенье), атласу та шовку. Тканину забезпечує майстерня. Також розробляємо й виробляємо моделі, є серійне виробництво.', 'Річ на замовлення зазвичай потребує близько 3 днів.'] },
      { h: 'Якщо ви живете в готелі', p: ['Мірки можна зняти в готелі, а готову річ привезти назад. У районах Коньяалти забір і доставка безкоштовні; для віддаленіших районів умови узгоджуємо у WhatsApp.'] },
      { h: 'Замовлення з-за кордону', p: ['1) Надішліть у WhatsApp модель і свої мірки. 2) Річ шиємо в майстерні в Анталії. 3) Відправляємо у вибрану вами країну. Оплата банківським переказом, доставку оплачує клієнт, зазвичай 1–3 тижні. Якщо річ не підійшла, ми її виправимо.'] },
    ],
    faqTitle: 'Корисні питання',
    faq: [
      ['Чи можна замовити нову шкіряну куртку?', 'Ні. Зі шкірою й джинсом лише підгонка та ремонт. Нові речі на замовлення шиємо з льону, бавовни, трикотажу, атласу, шовку та подібних тканин.'],
      ['Хто надає тканину для пошиву на замовлення?', 'Тканину забезпечує майстерня.'],
      ['Як дізнатися ціну?', 'Надішліть фото або модель у WhatsApp; ціну називаємо до початку роботи.'],
    ],
    cta: 'Написати у WhatsApp', wa: 'Добрий день, хочу дізнатися про підгонку або пошив на замовлення. Надсилаю фото.',
  },
  nl: {
    slug: 'gids-diensten-stoffen-kleermaker-antalya',
    title: 'Wat een kleermaker in Antalya doet: diensten en stoffen',
    desc: 'Gids voor vermaakwerk, maatkleding en bestellingen uit het buitenland: linnen, katoen, zijde en satijn; leer en spijkerstof alleen als reparatie.',
    h1: 'Wat een kleermaker in Antalya kan doen: vermaken, stoffen en bestellen op afstand',
    lead: 'Deze gids beschrijft welk werk het atelier Terzi Can in Konyaaltı aanneemt (sinds 2006, dagelijks 08:00–23:00), met welke stoffen het werkt en hoe u vanuit een ander land bestelt.',
    back: '← Gids kleding vermaken op vakantie',
    sections: [
      { h: 'Vaakgevraagd vermaakwerk', p: ['Broeken, spijkerbroeken, rokken en jurken korter maken of aanpassen, taille en zijkanten innemen, ritsen vervangen of repareren. Ook jassen en jasjes (mouwen, lengte, rits) en avondjurken (innemen, korter maken of uitleggen).', 'Eenvoudig werk is meestal in een dag klaar, spoedwerk vaak in 2–4 uur; de termijn bevestigen we via WhatsApp.'] },
      { h: 'Leer en spijkerstof: alleen reparatie', p: ['Leer en spijkerstof vermaken en repareren we (spijkerbroek korter maken, leren jas of broek repareren of innemen, rits vervangen). Nieuwe kleding van leer of spijkerstof maken we niet.'] },
      { h: 'Maatkleding en stoffen', p: ['Maatkleding (dames en heren, avondjurken, eigen modellen) naaien we in linnen, katoen, tricot (penye), satijn en zijde. De stof leveren wij. We ontwerpen en produceren ook modellen en er is serieproductie.', 'Een maatwerkstuk duurt meestal ongeveer 3 dagen.'] },
      { h: 'Verblijft u in een hotel?', p: ['De maten kunnen in het hotel worden opgenomen en het afgewerkte stuk wordt er teruggebracht. In de wijken van Konyaaltı zijn ophalen en bezorgen gratis; voor verder gelegen gebieden spreken we de voorwaarden af via WhatsApp.'] },
      { h: 'Bestellen vanuit het buitenland', p: ['1) Stuur via WhatsApp het model en uw maten. 2) Het stuk wordt in ons atelier in Antalya genaaid. 3) Het wordt verzonden naar het land van uw keuze. Betaling per bankoverschrijving, de klant betaalt de verzendkosten, meestal 1–3 weken. Past het niet, dan wordt het aangepast.'] },
    ],
    faqTitle: 'Nuttige vragen',
    faq: [
      ['Kan ik een nieuwe leren jas laten maken?', 'Nee. Leer en spijkerstof doen we alleen als vermaak- of reparatiewerk. Nieuwe maatkleding is van linnen, katoen, tricot, satijn, zijde en vergelijkbare stoffen.'],
      ['Wie levert de stof bij maatwerk?', 'De stof wordt door het atelier geleverd.'],
      ['Hoe weet ik de prijs?', 'Stuur een foto of het model via WhatsApp; de prijs noemen we voordat we beginnen.'],
    ],
    cta: 'Stuur een bericht via WhatsApp', wa: 'Hallo, ik wil informatie over vermaakwerk of maatkleding. Ik stuur een foto.',
  },
  ar: {
    slug: 'dalil-khadamat-aqmisha-khayyat-antalya',
    title: 'ماذا يفعل الخياط في أنطاليا: الخدمات والأقمشة',
    desc: 'دليل التعديلات والخياطة حسب الطلب والطلبات من الخارج: الكتان والقطن والحرير والساتان، أما الجلد والجينز فللإصلاح فقط.',
    h1: 'ماذا يستطيع الخياط في أنطاليا: التعديل والأقمشة والطلب عن بُعد',
    lead: 'يلخّص هذا الدليل الأعمال التي يقبلها مشغل تيرزي جان في كونيالتي (منذ 2006، يوميًا من 08:00 إلى 23:00)، والأقمشة التي يعمل بها، وكيف تطلب قطعة من بلد آخر.',
    back: '← دليل تعديل الملابس في العطلة',
    sections: [
      { h: 'أكثر التعديلات طلبًا', p: ['تقصير البنطلونات والجينز والتنانير والفساتين وتعديل مقاسها، وتضييق الخصر والجانبين، واستبدال السحّابات أو إصلاحها. وكذلك المعاطف والسترات (الأكمام والطول والسحّاب) وفساتين السهرة (تضييق أو تقصير أو توسيع).', 'تُنجز التعديلات البسيطة عادةً في يوم واحد والمستعجلة غالبًا خلال 2–4 ساعات، ويُؤكَّد الموعد عبر واتساب.'] },
      { h: 'الجلد والجينز: الإصلاح فقط', p: ['نُصلح الجلد والجينز ونعدّلهما (تقصير الجينز، إصلاح سترة أو بنطلون جلد أو تضييقهما، استبدال السحّاب). لا نخيط ملابس جديدة من الجلد أو الجينز.'] },
      { h: 'الخياطة حسب الطلب والأقمشة', p: ['نخيط الملابس حسب الطلب (نسائية ورجالية، فساتين سهرة، نماذج خاصة) من الكتان والقطن والجيرسي (بينيه) والساتان والحرير. القماش يوفّره المشغل. كما نصمّم النماذج وننتجها، ويتوفر الإنتاج بالجملة.', 'تستغرق القطعة حسب الطلب عادةً نحو 3 أيام.'] },
      { h: 'إذا كنت تقيم في فندق', p: ['يمكن أخذ المقاسات في الفندق وتسليم القطعة الجاهزة إليه. الاستلام والتسليم مجانيان في أحياء كونيالتي، أما المناطق الأبعد فيُتفق عليها عبر واتساب.'] },
      { h: 'الطلب من خارج تركيا', p: ['1) أرسل النموذج ومقاساتك عبر واتساب. 2) تُخاط القطعة في مشغلنا في أنطاليا. 3) تُشحن إلى البلد الذي تختاره. الدفع بالحوالة المصرفية وتكلفة الشحن على العميل، وعادةً خلال 1–3 أسابيع. وإن لم تناسبك القطعة نعدّلها.'] },
    ],
    faqTitle: 'أسئلة مفيدة',
    faq: [
      ['هل يمكن طلب سترة جلد جديدة؟', 'لا. الجلد والجينز للتعديل والإصلاح فقط. أما الملابس الجديدة حسب الطلب فمن الكتان والقطن والجيرسي والساتان والحرير وما يشبهها.'],
      ['من يوفّر القماش في الطلب حسب المقاس؟', 'القماش يوفّره المشغل.'],
      ['كيف أعرف السعر؟', 'أرسل صورة أو النموذج عبر واتساب، ونذكر السعر قبل البدء.'],
    ],
    cta: 'راسلنا عبر واتساب', wa: 'مرحبًا، أودّ الاستفسار عن تعديل أو خياطة حسب الطلب. أرسل لكم صورة.',
  },
};

export const svcgUrl = (l: ILang) => `/${l}/${SVCG[l].slug}`;
export const parseSvcg = (l: ILang, slug: string) => SVCG[l].slug === slug;
