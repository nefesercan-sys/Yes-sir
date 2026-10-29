// ============================================================
// swaphubs.com — lib/intl.ts
// Ek turist dilleri (ES/FR/PL/UK/NL/AR): "Tatilde kıyafet sorunu rehberi" (bilgi niyeti).
// terzihizmeti.com.tr'deki tanıtım sayfalarından BİLEREK farklıdır: başlık/H1/yapı/metin/SSS ayrıdır (tekrar içerik olmasın);
// swaphubs rehber + hazırlık listesi + adım adım akış anlatır, hizmet sağlayıcıya (Terzi Can) /terzi üzerinden bağlanır.
// Yalnızca doğrulanmış bilgi: Hurma/Konyaaltı atölye, 2006'dan beri, her gün 08:00–23:00, tadilat genellikle 1 gün,
// özel dikim genellikle 3 gün, acilde çoğunlukla 2–4 saat, fiyat WhatsApp'tan fotoğrafla. Fiyat yazılmaz.
// Ücretsiz alım-teslim yalnızca Konyaaltı ve yakın mahallelerde; diğer bölgeler WhatsApp'tan sorulur.
// ============================================================
export type ILang = 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
export const ILANGS: ILang[] = ['es', 'fr', 'pl', 'uk', 'nl', 'ar'];
export const SLUG: Record<ILang, string> = {
  es: 'arreglos-de-ropa-en-vacaciones-antalya',
  fr: 'retouches-vetements-vacances-antalya',
  pl: 'przerobki-ubran-na-wakacjach-antalya',
  uk: 'pidhonka-odyahu-u-vidpustci-antaliya',
  nl: 'kleding-laten-vermaken-op-vakantie-antalya',
  ar: 'tadil-malabis-fi-el-ijaza-antalya',
};
export const iUrl = (l: ILang) => `/${l}/${SLUG[l]}`;
export const isILang = (l: string): l is ILang => (ILANGS as string[]).includes(l);
export const iPaths = () => ILANGS.map(iUrl);

export type ICopy = {
  locale: string; name: string; dir: 'ltr' | 'rtl'; hreflang: string;
  title: string; desc: string; keywords: string[];
  tag: string; h1: string; lead: string;
  sections: { h: string; p: string[] }[];
  checklistTitle: string; checklist: string[];
  stepsTitle: string; steps: string[];
  faqTitle: string; faq: [string, string][];
  providerTitle: string; providerText: string; providerLink: string;
  cta: string; wa: string; call: string; mapLabel: string; otherLangs: string; updated: string;
};

export const INTL: Record<ILang, ICopy> = {
  es: {
    locale: 'es_ES', name: 'Español', dir: 'ltr', hreflang: 'es',
    title: 'Arreglos de ropa en vacaciones en Antalya: guía',
    desc: 'Cremallera rota o bajo largo: guía práctica para arreglar ropa en Antalya sin perder vacaciones, con lista de qué enviar y cómo es la recogida.',
    keywords: ['arreglos de ropa vacaciones Antalya', 'qué hacer si se rompe la ropa de viaje', 'sastre Antalya turistas guía', 'ajustar ropa en vacaciones Turquía'],
    tag: 'Guía de vacaciones · Antalya', h1: 'Ropa que necesita arreglo en vacaciones: guía práctica para Antalya',
    lead: 'No hace falta perder una mañana de playa por un botón o una cremallera. Esta guía explica qué problemas se resuelven rápido, qué conviene preparar y cómo organizar el arreglo desde su hotel.',
    sections: [
      { h: 'Problemas habituales durante un viaje', p: ['Los casos más frecuentes son una cremallera atascada o rota por la maleta, un bajo que queda largo en una prenda comprada en el bazar, una costura abierta y un vestido o traje que hay que ajustar para una boda o una cena.', 'Casi todos son arreglos pequeños: no suelen requerir cambiar de plan, solo decidir cuándo entregar la prenda.'] },
      { h: 'Lino y algodón con el calor de Antalya', p: ['Las fibras naturales respiran mejor con calor, por eso el lino y el algodón son una buena elección en verano. El lino se arruga por naturaleza: es parte de su aspecto.', 'Siga la etiqueta de lavado y planche el lino ligeramente húmedo. Si planea encargar una prenda a medida, tenga en cuenta que suele llevar unos 3 días.'] },
    ],
    checklistTitle: 'Qué preparar antes de escribir', checklist: ['Una foto de la prenda completa', 'Un primer plano del problema (cremallera, costura, bajo)', 'Qué resultado quiere: acortar, ajustar, cambiar cremallera, reparar', 'Su fecha de salida, para fijar el plazo', 'El nombre de su hotel, si quiere recogida'],
    stepsTitle: 'Cómo suele funcionar', steps: ['Envía las fotos por WhatsApp.', 'Recibe precio y plazo orientativo a partir de las fotos.', 'Elige entre que recojan la prenda en su hotel o llevarla usted al taller, abierto todos los días de 08:00 a 23:00.', 'Recibe la prenda: los arreglos sencillos suelen estar listos en un día y las urgencias con frecuencia en 2–4 horas.'],
    faqTitle: 'Preguntas útiles',
    faq: [['¿Llegaré a tiempo antes de mi vuelo?', 'Indique su fecha de salida al escribir. Los trabajos sencillos suelen terminarse en un día y las urgencias con frecuencia en 2 a 4 horas, pero el plazo exacto se confirma por WhatsApp.'], ['¿Tengo que ir al taller?', 'No necesariamente. Se puede organizar la recogida en el hotel; en Konyaaltı y barrios cercanos es gratuita, y para otras zonas se confirma por WhatsApp.'], ['¿Merece la pena encargar una prenda a medida si solo estoy una semana?', 'Sí, si la encarga al principio de la estancia: suele llevar unos 3 días.']],
    providerTitle: 'Quién realiza estos arreglos', providerText: 'Terzi Can es una sastrería en Hurma, Konyaaltı, que trabaja desde 2006 y recibe tanto en el taller como con recogida en hoteles.', providerLink: 'Ver el servicio de sastrería',
    cta: 'Enviar fotos por WhatsApp', wa: 'Hola, estoy de vacaciones en Antalya y necesito un arreglo de ropa. Le envío fotos.', call: 'Llamar', mapLabel: 'Ver en Google Maps', otherLangs: 'Otros idiomas', updated: 'Actualizado',
  },
  fr: {
    locale: 'fr_FR', name: 'Français', dir: 'ltr', hreflang: 'fr',
    title: 'Retouches de vêtements en vacances à Antalya : guide',
    desc: 'Fermeture cassée ou ourlet trop long : guide pour faire retoucher vos vêtements à Antalya sans gâcher vos vacances, avec la liste à envoyer.',
    keywords: ['retouche vêtements vacances Antalya', 'fermeture éclair cassée en voyage', 'couturier Antalya touristes guide', 'ajuster vêtement vacances Turquie'],
    tag: 'Guide vacances · Antalya', h1: 'Un vêtement à retoucher en vacances : le guide pratique pour Antalya',
    lead: 'Inutile de sacrifier une matinée de plage pour un bouton ou une fermeture. Ce guide explique ce qui se règle vite, quoi préparer et comment organiser la retouche depuis votre hôtel.',
    sections: [
      { h: 'Les soucis les plus courants en voyage', p: ['Les cas fréquents : une fermeture bloquée ou cassée par la valise, un ourlet trop long sur un vêtement acheté au bazar, une couture qui lâche, une robe ou un costume à ajuster pour un mariage ou un dîner.', 'Ce sont presque toujours de petites retouches : il s\'agit surtout de choisir quand confier le vêtement.'] },
      { h: 'Lin et coton sous la chaleur d\'Antalya', p: ['Les fibres naturelles respirent mieux par temps chaud, ce qui explique le succès du lin et du coton l\'été. Le lin se froisse naturellement : cela fait partie de son charme.', 'Suivez l\'étiquette d\'entretien et repassez le lin légèrement humide. Si vous envisagez un vêtement sur mesure, comptez environ 3 jours.'] },
    ],
    checklistTitle: 'À préparer avant d\'écrire', checklist: ['Une photo du vêtement en entier', 'Un gros plan du problème (fermeture, couture, ourlet)', 'Le résultat voulu : raccourcir, ajuster, changer la fermeture, réparer', 'Votre date de départ, pour fixer le délai', 'Le nom de votre hôtel si vous voulez une collecte'],
    stepsTitle: 'Comment ça se passe en général', steps: ['Vous envoyez les photos sur WhatsApp.', 'Vous recevez un prix et un délai indicatifs d\'après les photos.', 'Vous choisissez entre une collecte à l\'hôtel ou un passage à l\'atelier, ouvert tous les jours de 08h00 à 23h00.', 'Vous récupérez le vêtement : les retouches simples sont souvent prêtes en un jour, les urgences souvent en 2 à 4 heures.'],
    faqTitle: 'Questions utiles',
    faq: [['Serai-je prêt avant mon vol ?', 'Indiquez votre date de départ en écrivant. Les travaux simples sont souvent terminés en un jour, les urgences souvent en 2 à 4 heures ; le délai exact est confirmé sur WhatsApp.'], ['Dois-je me rendre à l\'atelier ?', 'Pas forcément. Une collecte à l\'hôtel peut être organisée ; elle est gratuite à Konyaaltı et dans les quartiers voisins, et confirmée sur WhatsApp pour les autres secteurs.'], ['Un vêtement sur mesure est-il possible pour une semaine de séjour ?', 'Oui, si vous le commandez dès le début du séjour : il faut généralement environ 3 jours.']],
    providerTitle: 'Qui réalise ces retouches', providerText: 'Terzi Can est un atelier de couture à Hurma, Konyaaltı, en activité depuis 2006, qui reçoit à l\'atelier et assure la collecte dans les hôtels.', providerLink: 'Voir le service de couture',
    cta: 'Envoyer des photos sur WhatsApp', wa: 'Bonjour, je suis en vacances à Antalya et j\'ai besoin d\'une retouche. Je vous envoie des photos.', call: 'Appeler', mapLabel: 'Voir sur Google Maps', otherLangs: 'Autres langues', updated: 'Mis à jour',
  },
  pl: {
    locale: 'pl_PL', name: 'Polski', dir: 'ltr', hreflang: 'pl',
    title: 'Przeróbki ubrań na wakacjach w Antalyi: poradnik',
    desc: 'Zepsuty zamek lub za długie nogawki: poradnik, jak poprawić ubrania w Antalyi bez tracenia wakacji, z listą tego, co wysłać.',
    keywords: ['przeróbki ubrań wakacje Antalya', 'zepsuty zamek w podróży', 'krawiec Antalya poradnik dla turystów', 'dopasowanie ubrania na wakacjach Turcja'],
    tag: 'Poradnik wakacyjny · Antalya', h1: 'Ubranie do poprawki na wakacjach: praktyczny poradnik dla Antalyi',
    lead: 'Nie warto tracić plażowego poranka przez guzik czy zamek. Poradnik wyjaśnia, co da się załatwić szybko, co przygotować i jak zorganizować przeróbkę z poziomu hotelu.',
    sections: [
      { h: 'Najczęstsze kłopoty w podróży', p: ['Najczęściej to zamek zablokowany lub zepsuty w walizce, za długa nogawka w ubraniu kupionym na bazarze, rozchodzący się szew oraz sukienka lub garnitur do dopasowania na wesele czy kolację.', 'To prawie zawsze drobne poprawki: chodzi głównie o to, kiedy oddać ubranie.'] },
      { h: 'Len i bawełna w upale Antalyi', p: ['Naturalne włókna lepiej oddychają w upale, dlatego len i bawełna sprawdzają się latem. Len z natury się gniecie, to część jego wyglądu.', 'Stosuj się do metki z instrukcją prania, a len prasuj lekko wilgotny. Jeśli planujesz coś szytego na miarę, licz około 3 dni.'] },
    ],
    checklistTitle: 'Co przygotować, zanim napiszesz', checklist: ['Zdjęcie całego ubrania', 'Zbliżenie problemu (zamek, szew, brzeg)', 'Czego oczekujesz: skrócenie, zwężenie, wymiana zamka, naprawa', 'Data wyjazdu, by ustalić termin', 'Nazwa hotelu, jeśli chcesz odbioru'],
    stepsTitle: 'Jak to zwykle wygląda', steps: ['Wysyłasz zdjęcia na WhatsAppie.', 'Dostajesz orientacyjną cenę i termin na podstawie zdjęć.', 'Wybierasz odbiór z hotelu albo wizytę w pracowni, czynnej codziennie 08:00–23:00.', 'Odbierasz ubranie: proste przeróbki bywają gotowe w jeden dzień, pilne często w 2–4 godziny.'],
    faqTitle: 'Przydatne pytania',
    faq: [['Czy zdążę przed odlotem?', 'Podaj datę wyjazdu, pisząc wiadomość. Proste prace zwykle kończą się w jeden dzień, pilne często w 2–4 godziny, ale dokładny termin potwierdzamy na WhatsAppie.'], ['Czy muszę jechać do pracowni?', 'Niekoniecznie. Można zorganizować odbiór z hotelu; w Konyaaltı i pobliskich dzielnicach jest bezpłatny, a dla innych rejonów potwierdzamy warunki na WhatsAppie.'], ['Czy opłaca się zamówić coś na miarę na tydzień pobytu?', 'Tak, jeśli zamówisz na początku pobytu: szycie trwa zwykle około 3 dni.']],
    providerTitle: 'Kto wykonuje te przeróbki', providerText: 'Terzi Can to pracownia krawiecka w Hurma w Konyaaltı, działająca od 2006 roku, przyjmuje w pracowni i odbiera ubrania z hoteli.', providerLink: 'Zobacz usługę krawiecką',
    cta: 'Wyślij zdjęcia na WhatsAppie', wa: 'Dzień dobry, jestem na wakacjach w Antalyi i potrzebuję przeróbki ubrania. Wysyłam zdjęcia.', call: 'Zadzwoń', mapLabel: 'Zobacz w Mapach Google', otherLangs: 'Inne języki', updated: 'Zaktualizowano',
  },
  uk: {
    locale: 'uk_UA', name: 'Українська', dir: 'ltr', hreflang: 'uk',
    title: 'Підгонка одягу у відпустці в Анталії: путівник',
    desc: 'Зламана блискавка чи задовга довжина: путівник, як підігнати одяг в Анталії, не втрачаючи відпустку, зі списком, що надіслати.',
    keywords: ['підгонка одягу відпустка Анталія', 'зламалась блискавка в подорожі', 'кравець Анталія гід для туристів', 'підігнати одяг у відпустці Туреччина'],
    tag: 'Гід для відпустки · Анталія', h1: 'Одяг потребує підгонки у відпустці: практичний гід по Анталії',
    lead: 'Не варто втрачати ранок на пляжі через ґудзик чи блискавку. Гід пояснює, що вирішується швидко, що підготувати і як організувати підгонку з готелю.',
    sections: [
      { h: 'Найчастіші проблеми в подорожі', p: ['Найчастіше це блискавка, що заїла або зламалася у валізі, задовгі штани з базару, шов, що розійшовся, і сукня чи костюм, які треба підігнати для весілля або вечері.', 'Майже завжди це дрібні роботи: питання лише в тому, коли віддати річ.'] },
      { h: 'Льон і бавовна в спеку Анталії', p: ['Натуральні волокна краще дихають у спеку, тому льон і бавовна влітку виручають. Льон за природою мнеться, це частина його вигляду.', 'Дотримуйтесь етикетки з догляду, а льон прасуйте злегка вологим. Якщо плануєте пошиття за мірками, зважайте, що це зазвичай близько 3 днів.'] },
    ],
    checklistTitle: 'Що підготувати перед повідомленням', checklist: ['Фото речі повністю', 'Крупний план проблеми (блискавка, шов, низ)', 'Що потрібно: вкоротити, звузити, замінити блискавку, відремонтувати', 'Дата виїзду, щоб визначити строк', 'Назва готелю, якщо потрібен забір'],
    stepsTitle: 'Як це зазвичай відбувається', steps: ['Ви надсилаєте фото у WhatsApp.', 'Отримуєте орієнтовні ціну й строк за фото.', 'Обираєте: забір з готелю або візит в ательє, яке працює щодня з 08:00 до 23:00.', 'Отримуєте річ: прості роботи часто готові за день, термінові нерідко за 2–4 години.'],
    faqTitle: 'Корисні запитання',
    faq: [['Чи встигну до вильоту?', 'Вкажіть дату виїзду в повідомленні. Прості роботи зазвичай виконують за день, термінові часто за 2–4 години, але точний строк підтверджується у WhatsApp.'], ['Чи треба їхати в ательє?', 'Не обов\'язково. Можна домовитися про забір з готелю; у Коньяалти та сусідніх районах він безкоштовний, для інших районів умови підтверджуються у WhatsApp.'], ['Чи варто замовляти пошиття за мірками, якщо я тут лише тиждень?', 'Так, якщо замовити на початку поїздки: пошиття зазвичай займає близько 3 днів.']],
    providerTitle: 'Хто виконує ці роботи', providerText: 'Terzi Can це ательє в районі Хурма, Коньяалти, яке працює з 2006 року, приймає в ательє та забирає одяг у готелях.', providerLink: 'Переглянути послугу кравця',
    cta: 'Надіслати фото у WhatsApp', wa: 'Добрий день, я у відпустці в Анталії та потребую підгонки одягу. Надсилаю фото.', call: 'Зателефонувати', mapLabel: 'Відкрити в Google Maps', otherLangs: 'Інші мови', updated: 'Оновлено',
  },
  nl: {
    locale: 'nl_NL', name: 'Nederlands', dir: 'ltr', hreflang: 'nl',
    title: 'Kleding laten vermaken op vakantie in Antalya: gids',
    desc: 'Kapotte rits of te lange broek: praktische gids om kleding in Antalya te laten vermaken zonder vakantiedagen te verliezen, met checklist.',
    keywords: ['kleding vermaken vakantie Antalya', 'kapotte rits op reis', 'kleermaker Antalya gids toeristen', 'kleding aanpassen op vakantie Turkije'],
    tag: 'Vakantiegids · Antalya', h1: 'Kleding aanpassen op vakantie: praktische gids voor Antalya',
    lead: 'U hoeft geen strandochtend te missen voor een knoop of rits. Deze gids legt uit wat snel opgelost is, wat u moet voorbereiden en hoe u het vermaken vanuit uw hotel regelt.',
    sections: [
      { h: 'Veelvoorkomende problemen onderweg', p: ['Vaak gaat het om een rits die vastzit of kapot is gegaan in de koffer, een te lange broekspijp bij kleding uit de bazaar, een naad die loslaat en een jurk of pak dat moet worden aangepast voor een bruiloft of diner.', 'Bijna altijd zijn het kleine klussen: het gaat vooral om het moment waarop u het kledingstuk afgeeft.'] },
      { h: 'Linnen en katoen in de hitte van Antalya', p: ['Natuurlijke vezels ademen beter bij warm weer, daarom zijn linnen en katoen in de zomer geliefd. Linnen kreukt van nature: dat hoort bij de look.', 'Volg het wasetiket en strijk linnen licht vochtig. Overweegt u maatwerk, reken dan op ongeveer 3 dagen.'] },
    ],
    checklistTitle: 'Wat u klaar moet hebben voordat u schrijft', checklist: ['Een foto van het hele kledingstuk', 'Een close-up van het probleem (rits, naad, zoom)', 'Wat u wilt: inkorten, innemen, rits vervangen, herstellen', 'Uw vertrekdatum, om de termijn te bepalen', 'De naam van uw hotel als u ophalen wilt'],
    stepsTitle: 'Hoe het meestal gaat', steps: ['U stuurt de foto\'s via WhatsApp.', 'U krijgt op basis van de foto\'s een indicatie van prijs en termijn.', 'U kiest tussen ophalen bij uw hotel of zelf langskomen in het atelier, dagelijks geopend van 08:00 tot 23:00.', 'U krijgt het kledingstuk terug: eenvoudige klussen zijn vaak binnen een dag klaar, spoedklussen vaak binnen 2–4 uur.'],
    faqTitle: 'Handige vragen',
    faq: [['Is het klaar voor mijn vlucht?', 'Geef uw vertrekdatum door als u schrijft. Eenvoudige klussen zijn meestal binnen een dag klaar en spoedklussen vaak binnen 2 tot 4 uur, maar de exacte termijn bevestigen wij via WhatsApp.'], ['Moet ik naar het atelier?', 'Niet per se. Ophalen bij het hotel kan worden geregeld; in Konyaaltı en nabijgelegen wijken is dat gratis, voor andere gebieden bevestigen wij het via WhatsApp.'], ['Is maatwerk zinvol als ik maar een week blijf?', 'Ja, als u het aan het begin van uw verblijf bestelt: maatwerk duurt meestal ongeveer 3 dagen.']],
    providerTitle: 'Wie voert deze aanpassingen uit', providerText: 'Terzi Can is een kleermakerij in Hurma, Konyaaltı, actief sinds 2006, met ontvangst in het atelier en ophalen bij hotels.', providerLink: 'Bekijk de kleermakersdienst',
    cta: 'Stuur foto\'s via WhatsApp', wa: 'Hallo, ik ben op vakantie in Antalya en heb een kledingaanpassing nodig. Ik stuur foto\'s.', call: 'Bellen', mapLabel: 'Bekijk op Google Maps', otherLangs: 'Andere talen', updated: 'Bijgewerkt',
  },
  ar: {
    locale: 'ar_AR', name: 'العربية', dir: 'rtl', hreflang: 'ar',
    title: 'تعديل الملابس أثناء العطلة في أنطاليا: دليل عملي',
    desc: 'سحّاب معطّل أو بنطلون طويل أو إطلالة تحتاج إلى ضبط: دليل عملي لتعديل الملابس في أنطاليا دون إضاعة أيام الإجازة، مع قائمة بما ترسله.',
    keywords: ['تعديل ملابس الإجازة أنطاليا', 'سحاب مكسور أثناء السفر', 'خياط أنطاليا دليل السياح', 'تعديل الملابس في العطلة تركيا'],
    tag: 'دليل الإجازة · أنطاليا', h1: 'ملابس تحتاج تعديلاً أثناء الإجازة: دليل عملي لأنطاليا',
    lead: 'لا داعي لإضاعة صباح على الشاطئ بسبب زر أو سحّاب. يشرح هذا الدليل ما يُحلّ بسرعة، وما يجب تجهيزه، وكيف تنظّم التعديل من فندقك.',
    sections: [
      { h: 'مشكلات شائعة أثناء السفر', p: ['أكثرها شيوعاً سحّاب علق أو انكسر داخل الحقيبة، أو بنطلون طويل اشتريته من السوق، أو درز بدأ ينفتح، أو فستان أو بدلة تحتاج إلى ضبط لحفل زفاف أو عشاء.', 'غالباً هي تعديلات صغيرة، والمسألة هي متى تسلّم القطعة.'] },
      { h: 'الكتان والقطن في حرارة أنطاليا', p: ['الألياف الطبيعية تسمح بتهوية أفضل في الحر، ولذلك يناسب الكتان والقطن الصيف. والكتان يتجعّد بطبيعته، وهذا جزء من مظهره.', 'اتبع تعليمات الغسيل على الملصق واكوِ الكتان وهو رطب قليلاً. وإذا كنت تفكر في تفصيل قطعة، فاحسب نحو 3 أيام.'] },
    ],
    checklistTitle: 'ما الذي تجهّزه قبل أن تراسلنا', checklist: ['صورة للقطعة كاملة', 'صورة مقرّبة للمشكلة (السحّاب أو الدرز أو الحاشية)', 'ما تريده: تقصير أو تضييق أو تبديل سحّاب أو إصلاح', 'تاريخ مغادرتك لتحديد المدة', 'اسم فندقك إذا أردت الاستلام منه'],
    stepsTitle: 'كيف يتم الأمر عادةً', steps: ['ترسل الصور عبر واتساب.', 'تتلقى سعراً ومدة تقريبية بناءً على الصور.', 'تختار بين الاستلام من فندقك أو زيارة الورشة المفتوحة كل يوم من 08:00 إلى 23:00.', 'تستلم القطعة: التعديلات البسيطة غالباً جاهزة خلال يوم، والحالات العاجلة غالباً خلال 2–4 ساعات.'],
    faqTitle: 'أسئلة مفيدة',
    faq: [['هل ستكون جاهزة قبل رحلتي؟', 'اذكر تاريخ مغادرتك عند المراسلة. الأعمال البسيطة تنتهي عادةً خلال يوم والعاجلة غالباً خلال 2 إلى 4 ساعات، ويُؤكَّد الموعد الدقيق عبر واتساب.'], ['هل يجب أن أذهب إلى الورشة؟', 'ليس بالضرورة. يمكن ترتيب الاستلام من الفندق؛ وهو مجاني في كونيالتي والأحياء القريبة، ويُؤكَّد عبر واتساب للمناطق الأخرى.'], ['هل يستحق التفصيل إن كنت سأبقى أسبوعاً فقط؟', 'نعم، إذا طلبته في بداية إقامتك: التفصيل يستغرق عادةً نحو 3 أيام.']],
    providerTitle: 'من ينفّذ هذه التعديلات', providerText: 'Terzi Can ورشة خياطة في حي هورما بكونيالتي تعمل منذ عام 2006، وتستقبل في الورشة وتستلم الملابس من الفنادق.', providerLink: 'عرض خدمة الخياطة',
    cta: 'أرسل الصور عبر واتساب', wa: 'مرحباً، أنا في إجازة في أنطاليا وأحتاج إلى تعديل ملابس. أرسل لكم صوراً.', call: 'اتصل', mapLabel: 'افتح في خرائط Google', otherLangs: 'لغات أخرى', updated: 'آخر تحديث',
  },
};


/** Ücretsiz alım-teslim mahalleleri (işletme sahibinin onayladığı liste, Ekim 2026) — her dilde mahalle adlarıyla görünür. */
export const NB: Record<ILang, { title: string; text: string }> = {
  es: { title: '¿Hay recogida gratis en su zona?', text: 'Sí: en Hurma, Liman, Sarısu, Gürsu, Uluç, Uncalı, Meltem, Siteler, Öğretmenevleri, Altınkum y Arapsuyu no se cobra la recogida y entrega. Si su hotel está en otra zona, pregunte por WhatsApp. Atención de 08:00 a 23:00.' },
  fr: { title: 'La prise en charge est-elle gratuite chez vous ?', text: 'Oui : à Hurma, Liman, Sarısu, Gürsu, Uluç, Uncalı, Meltem, Siteler, Öğretmenevleri, Altınkum et Arapsuyu, la prise en charge et la livraison sont gratuites. Si votre hôtel est ailleurs, demandez sur WhatsApp. Ouvert de 08h00 à 23h00.' },
  pl: { title: 'Czy odbiór jest bezpłatny w Twojej okolicy?', text: 'Tak: w Hurma, Liman, Sarısu, Gürsu, Uluç, Uncalı, Meltem, Siteler, Öğretmenevleri, Altınkum i Arapsuyu odbiór i dowóz są bezpłatne. Jeśli hotel jest gdzie indziej, zapytaj na WhatsApp. Godziny: 08:00–23:00.' },
  uk: { title: 'Чи безкоштовний забір у вашому районі?', text: 'Так: у Hurma, Liman, Sarısu, Gürsu, Uluç, Uncalı, Meltem, Siteler, Öğretmenevleri, Altınkum та Arapsuyu забір і доставка безкоштовні. Якщо ваш готель в іншому районі, запитайте у WhatsApp. Працюємо 08:00–23:00.' },
  nl: { title: 'Is ophalen gratis in jouw buurt?', text: 'Ja: in Hurma, Liman, Sarısu, Gürsu, Uluç, Uncalı, Meltem, Siteler, Öğretmenevleri, Altınkum en Arapsuyu is ophalen en terugbrengen gratis. Zit je hotel elders, vraag het dan via WhatsApp. Open van 08:00 tot 23:00.' },
  ar: { title: 'هل الاستلام مجاني في منطقتك؟', text: 'نعم: في Hurma, Liman, Sarısu, Gürsu, Uluç, Uncalı, Meltem, Siteler, Öğretmenevleri, Altınkum, Arapsuyu الاستلام والتسليم مجاني. إذا كان فندقك في منطقة أخرى فاسأل عبر واتساب. ساعات العمل 08:00–23:00.' },
};

// İlçe/mahalle bağlantısı (Konyaaltı ve Muratpaşa) — 6 yeni dil
export const NB_DISTRICT: Record<ILang, { title: string; text: string }> = {
  es: { title: '¿De qué distrito es cada barrio?', text: 'Hurma, Liman, Sarısu, Gürsu, Uluç, Uncalı, Siteler, Öğretmenevleri, Altınkum y Arapsuyu son barrios del distrito de Konyaaltı, el mismo donde está nuestro taller (en Hurma). Meltem pertenece al distrito de Muratpaşa. En todos ellos la recogida y entrega es gratuita.' },
  fr: { title: 'De quel district dépend chaque quartier ?', text: 'Hurma, Liman, Sarısu, Gürsu, Uluç, Uncalı, Siteler, Öğretmenevleri, Altınkum et Arapsuyu sont des quartiers du district de Konyaaltı, celui de notre atelier (à Hurma). Meltem relève du district de Muratpaşa. La prise en charge et la livraison y sont gratuites.' },
  pl: { title: 'Do którego dystryktu należy każde osiedle?', text: 'Hurma, Liman, Sarısu, Gürsu, Uluç, Uncalı, Siteler, Öğretmenevleri, Altınkum i Arapsuyu to osiedla dystryktu Konyaaltı, tego samego, w którym mamy pracownię (w Hurma). Meltem należy do dystryktu Muratpaşa. Odbiór i dowóz są tam bezpłatne.' },
  uk: { title: 'До якого району належить кожен мікрорайон?', text: 'Hurma, Liman, Sarısu, Gürsu, Uluç, Uncalı, Siteler, Öğretmenevleri, Altınkum та Arapsuyu — мікрорайони району Коньяалти, де розташоване наше ательє (у Hurma). Meltem належить до району Муратпаша. Забір і доставка там безкоштовні.' },
  nl: { title: 'Bij welk district hoort elke wijk?', text: 'Hurma, Liman, Sarısu, Gürsu, Uluç, Uncalı, Siteler, Öğretmenevleri, Altınkum en Arapsuyu zijn wijken van het district Konyaaltı, waar ook ons atelier staat (in Hurma). Meltem hoort bij het district Muratpaşa. Ophalen en terugbrengen is er gratis.' },
  ar: { title: 'إلى أي منطقة يتبع كل حي؟', text: 'Hurma, Liman, Sarısu, Gürsu, Uluç, Uncalı, Siteler, Öğretmenevleri, Altınkum, Arapsuyu أحياء تابعة لمنطقة Konyaaltı حيث تقع ورشتنا (في Hurma). أما Meltem فتتبع منطقة Muratpaşa. الاستلام والتسليم فيها مجاني.' },
};
