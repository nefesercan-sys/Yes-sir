// 6 ek dilin (es fr pl uk nl ar) görsel başlık/açıklamaları; tr/en/de/ru için lib/ornek-gorseller.ts.
export type EkLang = 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
export const EK_METIN: Record<string, Record<EkLang, [string, string]>> = {
 "paca-kisaltma": {
 "es": [
  "Bajo de pantalón: largo marcado con alfileres",
  "El largo se marca con los zapatos puestos; el bajo se hace en el día."
 ],
 "fr": [
  "Ourlet de pantalon : longueur marquée aux épingles",
  "La longueur se marque chaussures aux pieds ; l’ourlet est fait le jour même."
 ],
 "pl": [
  "Skracanie spodni: długość zaznaczona szpilkami",
  "Długość zaznaczamy w butach; skracanie tego samego dnia."
 ],
 "uk": [
  "Підшивання штанів: довжина позначена шпильками",
  "Довжину позначаємо у взутті; підшиваємо того ж дня."
 ],
 "nl": [
  "Broek inkorten: lengte afgespeld",
  "De lengte wordt met schoenen aan afgespeld; inkorten op dezelfde dag."
 ],
 "ar": [
  "تقصير البنطال: تحديد الطول بالدبابيس",
  "يُحدَّد الطول مع ارتداء الحذاء، والتقصير في اليوم نفسه."
 ]
},
 "fermuar-degisimi": {
 "es": [
  "Cambio y arreglo de cremallera",
  "Cremalleras de abrigos, pantalones, faldas y bolsos: se quita la rota y se cose una nueva."
 ],
 "fr": [
  "Remplacement et réparation de fermeture éclair",
  "Fermetures de manteaux, pantalons, jupes et sacs : l’ancienne est retirée, une neuve est cousue."
 ],
 "pl": [
  "Wymiana i naprawa zamka",
  "Zamki w kurtkach, spodniach, spódnicach i torbach: stary wypruwamy, wszywamy nowy."
 ],
 "uk": [
  "Заміна та ремонт блискавки",
  "Блискавки на куртках, штанях, спідницях і сумках: стару знімаємо, нову вшиваємо."
 ],
 "nl": [
  "Rits vervangen en repareren",
  "Ritsen in jassen, broeken, rokken en tassen: de kapotte eruit, een nieuwe erin."
 ],
 "ar": [
  "تغيير السحّاب وإصلاحه",
  "سحّابات المعاطف والبناطيل والتنانير والحقائب: يُزال التالف ويُخاط سحّاب جديد."
 ]
},
 "dikis-makinesi": {
 "es": [
  "Costura y arreglos a máquina",
  "Costuras abiertas, rotos y ajustes se cosen firmes a máquina."
 ],
 "fr": [
  "Couture et réparations à la machine",
  "Coutures ouvertes, accrocs et retouches sont cousus solidement à la machine."
 ],
 "pl": [
  "Szycie i naprawy na maszynie",
  "Rozprute szwy, rozdarcia i przeróbki zszywamy mocno na maszynie."
 ],
 "uk": [
  "Пошиття та ремонт на машині",
  "Розпорені шви, розриви та шви підгонки міцно прошиваємо на машині."
 ],
 "nl": [
  "Naaien en repareren op de machine",
  "Open naden, scheuren en vermaaknaden worden stevig op de machine genaaid."
 ],
 "ar": [
  "خياطة وتصليح على الماكينة",
  "تُخاط الدروز المفتوحة والتمزقات ودروز التعديل بإحكام على الماكينة."
 ]
},
 "bel-daraltma-manken": {
 "es": [
  "Entallar la cintura de un vestido",
  "Primero se marca con alfileres lo que hay que entallar y luego se cose."
 ],
 "fr": [
  "Reprise de taille d’une robe",
  "La retouche est d’abord épinglée, puis cousue."
 ],
 "pl": [
  "Zwężanie sukienki w talii",
  "Najpierw spinamy szpilkami, potem zszywamy."
 ],
 "uk": [
  "Ушивання сукні по талії",
  "Спочатку заколюємо шпильками, потім прошиваємо."
 ],
 "nl": [
  "Jurk innemen in de taille",
  "Eerst wordt afgespeld, daarna genaaid."
 ],
 "ar": [
  "تضييق خصر الفستان",
  "يُحدَّد مقدار التضييق بالدبابيس أولًا ثم يُخاط."
 ]
},
 "gelinlik-abiye": {
 "es": [
  "Arreglo de vestido de novia",
  "En vestidos de novia solo hacemos arreglos: talla, largo y tirantes."
 ],
 "fr": [
  "Retouche de robe de mariée",
  "Pour les robes de mariée, uniquement des retouches : taille, longueur et bretelles."
 ],
 "pl": [
  "Poprawki sukni ślubnej",
  "Suknie ślubne tylko poprawiamy: rozmiar, długość i ramiączka."
 ],
 "uk": [
  "Підгонка весільної сукні",
  "Весільні сукні лише підганяємо: розмір, довжина та бретелі."
 ],
 "nl": [
  "Trouwjurk vermaken",
  "Trouwjurken worden alleen vermaakt: maat, lengte en bandjes."
 ],
 "ar": [
  "تعديل فستان الزفاف",
  "فساتين الزفاف نعدّلها فقط: المقاس والطول والحمالات."
 ]
},
 "keten-kadin-evde": {
  "es": [
   "Camisa y pantalón de lino para mujer",
   "Conjunto de lino de corte cómodo; a medida si se confecciona por encargo."
  ],
  "fr": [
   "Chemise et pantalon en lin pour femme",
   "Ensemble en lin à coupe ample ; sur mesure en confection personnalisée."
  ],
  "pl": [
   "Damska lniana koszula i spodnie",
   "Luźny lniany komplet; szyty na miarę przy szyciu na zamówienie."
  ],
  "uk": [
   "Жіноча лляна сорочка і штани",
   "Вільний лляний комплект; на замовлення — за вашими мірками."
  ],
  "nl": [
   "Linnen blouse en broek voor dames",
   "Een comfortabele linnen set; op maat gemaakt bij maatwerk."
  ],
  "ar": [
   "قميص وبنطلون كتان نسائي",
   "طقم كتان بقصّة مريحة؛ يُفصَّل حسب مقاساتك عند التفصيل الخاص."
  ]
 },
 "keten-blazer-atolye": {
  "es": [
   "Blazer y pantalón de lino",
   "Patrones, telas y máquinas en el taller; chaqueta y pantalón a medida."
  ],
  "fr": [
   "Blazer et pantalon en lin",
   "Patrons, tissus et machines à l’atelier ; veste et pantalon sur commande."
  ],
  "pl": [
   "Lniana marynarka i spodnie",
   "Wykroje, tkaniny i maszyny w pracowni; żakiet i spodnie na zamówienie."
  ],
  "uk": [
   "Лляний піджак і штани",
   "Лекала, тканини й машини в ательє; піджак і штани на замовлення."
  ],
  "nl": [
   "Linnen blazer en broek",
   "Patronen, stoffen en machines in het atelier; jasje en broek op bestelling."
  ],
  "ar": [
   "بليزر وبنطلون كتان",
   "باترونات وأقمشة وماكينات في الورشة؛ سترة وبنطلون حسب الطلب."
  ]
 },
 "keten-erkek-gomlek": {
  "es": [
   "Camisa y pantalón de lino para hombre",
   "Conjunto de lino transpirable para días de calor."
  ],
  "fr": [
   "Chemise et pantalon en lin pour homme",
   "Ensemble en lin respirant pour les journées chaudes."
  ],
  "pl": [
   "Męska lniana koszula i spodnie",
   "Przewiewny lniany komplet na upały."
  ],
  "uk": [
   "Чоловіча лляна сорочка і штани",
   "Повітропроникний лляний комплект для спекотної погоди."
  ],
  "nl": [
   "Linnen overhemd en broek voor heren",
   "Een ademende linnen set voor warme dagen."
  ],
  "ar": [
   "قميص وبنطلون كتان رجالي",
   "طقم كتان يسمح بتهوية الجسم للأيام الحارة."
  ]
 },
 "keten-pantolon-katli": {
  "es": [
   "Pantalón de lino",
   "Pantalón de lino; se puede ajustar el bajo y la cintura."
  ],
  "fr": [
   "Pantalon en lin",
   "Pantalon en lin ; ourlet et taille ajustables."
  ],
  "pl": [
   "Lniane spodnie",
   "Spodnie z lnu; długość i talię można dopasować."
  ],
  "uk": [
   "Лляні штани",
   "Штани з льону; довжину й талію можна підігнати."
  ],
  "nl": [
   "Linnen broek",
   "Broek van linnen; zoom en taille kunnen worden aangepast."
  ],
  "ar": [
   "بنطلون كتان",
   "بنطلون من الكتان؛ يمكن تعديل الطول والخصر."
  ]
 },
 "erkek-gomlek-atolye": {
  "es": [
   "Camisa y pantalón para hombre",
   "Camisa y pantalón en un taller; confección y arreglos."
  ],
  "fr": [
   "Chemise et pantalon pour homme",
   "Chemise et pantalon dans un atelier ; couture et retouches."
  ],
  "pl": [
   "Męska koszula i spodnie",
   "Koszula i spodnie w pracowni; szycie i przeróbki."
  ],
  "uk": [
   "Чоловіча сорочка і штани",
   "Сорочка й штани в ательє; пошив і ремонт."
  ],
  "nl": [
   "Herenoverhemd en broek",
   "Overhemd en broek in een atelier; naaiwerk en vermaakwerk."
  ],
  "ar": [
   "قميص وبنطلون رجالي",
   "قميص وبنطلون في الورشة؛ خياطة وتعديلات."
  ]
 },
 "kadin-trenckot-atolye": {
  "es": [
   "Gabardina y camiseta de mujer",
   "Ropa confeccionada en perchas y rollos de tela: se elige modelo y producto juntos."
  ],
  "fr": [
   "Trench et t-shirt pour femme",
   "Prêt-à-porter sur portants et rouleaux de tissu : modèle et produit choisis ensemble."
  ],
  "pl": [
   "Damski trencz i t-shirt",
   "Odzież gotowa na wieszakach i rolki tkanin: model i produkt wybieramy razem."
  ],
  "uk": [
   "Жіночий тренч і футболка",
   "Готовий одяг на вішаках і рулони тканини: модель та виріб обираємо разом."
  ],
  "nl": [
   "Damestrenchcoat en T-shirt",
   "Confectiekleding op rekken en stofrollen: model en product kiezen we samen."
  ],
  "ar": [
   "معطف ترنش وتيشيرت نسائي",
   "ملابس جاهزة على الشماعات ولفّات أقمشة: نختار الموديل والمنتج معًا."
  ]
 },
 "erkek-palto-atolye": {
  "es": [
   "Abrigo de hombre",
   "Arreglos de abrigos y chaquetas: largo, mangas y ajuste."
  ],
  "fr": [
   "Manteau pour homme",
   "Retouches de manteaux et vestes : longueur, manches et ajustement."
  ],
  "pl": [
   "Płaszcz męski",
   "Przeróbki płaszczy i kurtek: długość, rękawy i dopasowanie."
  ],
  "uk": [
   "Чоловіче пальто",
   "Підгонка пальто й курток: довжина, рукави та посадка."
  ],
  "nl": [
   "Herenjas",
   "Vermaakwerk aan jassen: lengte, mouwen en pasvorm."
  ],
  "ar": [
   "معطف رجالي",
   "تعديل المعاطف والجاكيتات: الطول والأكمام والمقاس."
  ]
 },
 "sef-mutfak-uniforma": {
  "es": [
   "Uniforme de cocina",
   "Chaquetilla de cocinero y delantal: para cocinas de restaurantes y hoteles."
  ],
  "fr": [
   "Tenue de cuisine",
   "Veste de cuisinier et tablier : pour les cuisines de restaurants et d’hôtels."
  ],
  "pl": [
   "Uniform kuchenny",
   "Kitel kucharski i fartuch: dla kuchni restauracji i hoteli."
  ],
  "uk": [
   "Форма для кухні",
   "Кухарський кітель і фартух: для кухонь ресторанів і готелів."
  ],
  "nl": [
   "Keukenuniform",
   "Koksjas en schort: voor keukens van restaurants en hotels."
  ],
  "ar": [
   "زيّ موظفي المطبخ",
   "سترة الطاهي ومريلة: لمطابخ المطاعم والفنادق."
  ]
 },
 "atolye-kesim-masasi": {
  "es": [
   "Mesa de corte y patrones",
   "Preparación con patrones, tijeras y tela: el primer paso de la producción."
  ],
  "fr": [
   "Table de coupe et patrons",
   "Préparation avec patrons, ciseaux et tissu : première étape de la production."
  ],
  "pl": [
   "Stół krojczy i wykroje",
   "Przygotowanie z wykrojami, nożycami i tkaniną: pierwszy etap produkcji."
  ],
  "uk": [
   "Розкрійний стіл і лекала",
   "Підготовка з лекалами, ножицями й тканиною: перший етап виробництва."
  ],
  "nl": [
   "Snijtafel en patronen",
   "Voorbereiding met patronen, schaar en stof: de eerste stap van de productie."
  ],
  "ar": [
   "طاولة القص والباترونات",
   "التحضير بالباترونات والمقص والقماش: الخطوة الأولى في الإنتاج."
  ]
 },
 "abiye-elbise-atolye": {
  "es": [
   "Vestido de noche con hombros descubiertos",
   "Medidas, pruebas y confección para vestidos de ocasiones especiales."
  ],
  "fr": [
   "Robe de soirée épaules dénudées",
   "Mesures, essayages et couture pour les robes de cérémonie."
  ],
  "pl": [
   "Suknia wieczorowa z odkrytymi ramionami",
   "Pomiary, przymiarki i szycie sukien na specjalne okazje."
  ],
  "uk": [
   "Вечірня сукня з відкритими плечима",
   "Мірки, примірки й пошив суконь для особливих випадків."
  ],
  "nl": [
   "Avondjurk met ontblote schouders",
   "Opmeten, passessies en naaiwerk voor jurken voor speciale gelegenheden."
  ],
  "ar": [
   "فستان سهرة بكتفين مكشوفين",
   "أخذ القياسات والبروفات والخياطة لفساتين المناسبات."
  ]
 },
 "abiye-askida": {
  "es": [
   "Vestido de noche con abalorios",
   "Arreglos cuidadosos de largo, cintura y ajuste en vestidos con abalorios y tul."
  ],
  "fr": [
   "Robe de soirée perlée",
   "Retouches soignées de la longueur, de la taille et de l’ajustement sur robes perlées et en tulle."
  ],
  "pl": [
   "Suknia wieczorowa z koralikami",
   "Staranne przeróbki długości, talii i dopasowania w sukniach z koralikami i tiulem."
  ],
  "uk": [
   "Вечірня сукня з бісером",
   "Акуратна підгонка довжини, талії та посадки на сукнях із бісером і фатином."
  ],
  "nl": [
   "Avondjurk met kralen",
   "Zorgvuldige aanpassingen van lengte, taille en pasvorm bij jurken met kralen en tule."
  ],
  "ar": [
   "فستان سهرة مطرّز بالخرز",
   "تعديلات دقيقة للطول والخصر والمقاس على فساتين الخرز والتول."
  ]
 },
 "erkek-takim-olcu": {
  "es": [
   "Medidas para traje de hombre",
   "Toma de medidas y prueba de un traje."
  ],
  "fr": [
   "Prise de mesures pour costume homme",
   "Prise de mesures et essayage d’un costume."
  ],
  "pl": [
   "Miary do garnituru męskiego",
   "Zdjęcie miar i przymiarka garnituru."
  ],
  "uk": [
   "Мірки для чоловічого костюма",
   "Зняття мірок і примірка костюма."
  ],
  "nl": [
   "Maatnemen voor herenkostuum",
   "Maatnemen en passen van een kostuum."
  ],
  "ar": [
   "أخذ مقاسات بدلة رجالية",
   "أخذ القياسات وتجربة البدلة."
  ]
 },
 "manken-palto-takim": {
  "es": [
   "Abrigos y traje en maniquíes",
   "Prueba en maniquí: modelo, tela y costuras a la vista."
  ],
  "fr": [
   "Manteaux et costume sur mannequins",
   "Essayage sur mannequin : modèle, tissu et coutures visibles."
  ],
  "pl": [
   "Płaszcze i garnitur na manekinach",
   "Przymiarka na manekinie: model, tkanina i szwy na widoku."
  ],
  "uk": [
   "Пальто й костюм на манекенах",
   "Примірка на манекені: модель, тканина й шви перед очима."
  ],
  "nl": [
   "Jassen en kostuum op paspoppen",
   "Passen op de pop: model, stof en naden in beeld."
  ],
  "ar": [
   "معاطف وبدلة على المانيكان",
   "البروفة على المانيكان: الموديل والقماش والدرزات واضحة."
  ]
 },
 "manken-bej-ceket": {
  "es": [
   "Traje de chaqueta y pantalón beige",
   "Traje de chaqueta y pantalón de mujer; confección y a medida."
  ],
  "fr": [
   "Tailleur pantalon beige",
   "Tailleur pantalon pour femme ; prêt-à-porter et sur mesure."
  ],
  "pl": [
   "Beżowy kostium z żakietem i spodniami",
   "Damski kostium z żakietem i spodniami; odzież gotowa i na miarę."
  ],
  "uk": [
   "Бежевий жіночий костюм",
   "Жіночий костюм із жакетом і штанами; готовий і на замовлення."
  ],
  "nl": [
   "Beige pantalonpak",
   "Dames pantalonpak; confectie en maatwerk."
  ],
  "ar": [
   "بدلة نسائية بيج",
   "بدلة نسائية بسترة وبنطلون؛ جاهزة أو حسب الطلب."
  ]
 },
 "pilili-etek": {
  "es": [
   "Falda plisada",
   "Acortar la falda y ajustar la cintura."
  ],
  "fr": [
   "Jupe plissée",
   "Raccourcissement de la jupe et ajustement de la taille."
  ],
  "pl": [
   "Spódnica plisowana",
   "Skracanie spódnicy i dopasowanie w talii."
  ],
  "uk": [
   "Плісирована спідниця",
   "Вкорочення спідниці й підгонка по талії."
  ],
  "nl": [
   "Plissérok",
   "Rok korter maken en taille aanpassen."
  ],
  "ar": [
   "تنورة بليسيه",
   "تقصير التنورة وتعديل الخصر."
  ]
 },
 "beyaz-gomlek-katli": {
  "es": [
   "Arreglos de camisas",
   "Largo de manga, ajuste lateral y reparación de cuellos."
  ],
  "fr": [
   "Retouches de chemises",
   "Longueur de manche, ajustement sur les côtés et réparation de col."
  ],
  "pl": [
   "Przeróbki koszul",
   "Długość rękawa, zwężanie boków i naprawa kołnierza."
  ],
  "uk": [
   "Ремонт сорочок",
   "Довжина рукава, підгонка по боках і ремонт коміра."
  ],
  "nl": [
   "Overhemden vermaken",
   "Mouwlengte, zijkanten innemen en kraag herstellen."
  ],
  "ar": [
   "تعديل القمصان",
   "طول الكم وتضييق الجوانب وإصلاح الياقة."
  ]
 },
 "sweatshirt-katli": {
  "es": [
   "Sudadera",
   "Sudaderas para equipos y eventos; con impresión de logotipo."
  ],
  "fr": [
   "Sweat-shirt",
   "Sweat-shirts pour équipes et événements ; avec impression de logo."
  ],
  "pl": [
   "Bluza",
   "Bluzy dla zespołów i wydarzeń; z nadrukiem logo."
  ],
  "uk": [
   "Світшот",
   "Світшоти для команд і заходів; з друком логотипа."
  ],
  "nl": [
   "Sweatshirt",
   "Sweatshirts voor teams en evenementen; met logoprint."
  ],
  "ar": [
   "سويت شيرت",
   "سويت شيرت للفرق والفعاليات؛ مع طباعة الشعار."
  ]
 },
 "yun-pantolon-metre": {
  "es": [
   "Pantalón y cinta métrica",
   "El largo del bajo se determina midiendo."
  ],
  "fr": [
   "Pantalon et mètre ruban",
   "La longueur de l’ourlet se détermine par mesure."
  ],
  "pl": [
   "Spodnie i miarka",
   "Długość nogawki ustala się mierząc."
  ],
  "uk": [
   "Штани й сантиметр",
   "Довжину при підгинанні визначають за замірами."
  ],
  "nl": [
   "Broek en meetlint",
   "De zoomlengte wordt bepaald door te meten."
  ],
  "ar": [
   "بنطلون وشريط قياس",
   "يُحدَّد طول الحاشية بالقياس."
  ]
 },
 "palto-yaka-detay": {
  "es": [
   "Solapa de abrigo y detalle de costura",
   "Reparación de solapas, mangas y forros en abrigos y chaquetas de lana."
  ],
  "fr": [
   "Revers de manteau et détail de couture",
   "Réparation des revers, manches et doublures de manteaux et vestes en laine."
  ],
  "pl": [
   "Kołnierz płaszcza i detal szwu",
   "Naprawa kołnierzy, rękawów i podszewek w wełnianych płaszczach i marynarkach."
  ],
  "uk": [
   "Лацкан пальто й деталі строчки",
   "Ремонт лацканів, рукавів і підкладки шерстяних пальто й піджаків."
  ],
  "nl": [
   "Revers en naaddetail van een jas",
   "Reparatie van revers, mouwen en voering bij wollen jassen en jasjes."
  ],
  "ar": [
   "ياقة المعطف وتفاصيل الخياطة",
   "إصلاح الياقات والأكمام والبطانة في المعاطف والجاكيتات الصوفية."
  ]
 },
 "polar-yelek": {
  "es": [
   "Chaleco polar",
   "Chaleco polar con cremallera; con logotipo para ropa de equipo."
  ],
  "fr": [
   "Gilet polaire",
   "Gilet polaire zippé ; avec logo pour les tenues d’équipe."
  ],
  "pl": [
   "Kamizelka polarowa",
   "Kamizelka polarowa na zamek; z logo dla odzieży zespołu."
  ],
  "uk": [
   "Флісовий жилет",
   "Флісовий жилет на блискавці; для командного одягу — з логотипом."
  ],
  "nl": [
   "Fleecebodywarmer",
   "Fleece bodywarmer met rits; met logo voor teamkleding."
  ],
  "ar": [
   "سترة صوف بدون أكمام",
   "سترة صوفية بسحّاب؛ بشعار للزي الموحّد."
  ]
 },
 "eve-gelen-terzi": {
  "es": [
   "Sastre a domicilio y al hotel",
   "Un sastre que va a su dirección para tomar medidas y hacer pruebas."
  ],
  "fr": [
   "Tailleur à domicile ou à l’hôtel",
   "Un tailleur qui se déplace à votre adresse pour les mesures et essayages."
  ],
  "pl": [
   "Krawiec dojeżdża do domu lub hotelu",
   "Krawiec przyjeżdża pod wskazany adres na pomiary i przymiarki."
  ],
  "uk": [
   "Кравець приїздить додому чи в готель",
   "Кравець приїздить за вашою адресою для мірок і примірок."
  ],
  "nl": [
   "Kleermaker aan huis of in het hotel",
   "Een kleermaker die naar uw adres komt voor maatnemen en passen."
  ],
  "ar": [
   "خيّاط يأتي إلى منزلك أو فندقك",
   "خيّاط يأتي إلى عنوانك لأخذ القياسات والبروفات."
  ]
 },
"bez-canta-atolye": {
  "es": [
   "Bolsas de tela",
   "Bolsas de tela impresas con su logotipo: para ferias y eventos."
  ],
  "fr": [
   "Sacs en tissu",
   "Sacs en tissu imprimés à votre logo : pour salons et événements."
  ],
  "pl": [
   "Torby bawełniane",
   "Torby z nadrukiem logo: na targi i wydarzenia."
  ],
  "uk": [
   "Тканинні сумки",
   "Тканинні сумки з друком логотипа: для виставок і заходів."
  ],
  "nl": [
   "Stoffen tassen",
   "Stoffen tassen met uw logo bedrukt: voor beurzen en evenementen."
  ],
  "ar": [
   "حقائب قماشية",
   "حقائب قماشية مطبوعة بشعارك: للمعارض والفعاليات."
  ]
 },
 "hazir-giyim-atolye": {
  "es": [
   "Camisetas",
   "Camisetas impresas con su logotipo o diseño propio."
  ],
  "fr": [
   "T-shirts",
   "T-shirts imprimés à votre logo ou à votre propre design."
  ],
  "pl": [
   "T-shirty",
   "T-shirty z nadrukiem logo lub własnego projektu."
  ],
  "uk": [
   "Футболки",
   "Футболки з друком вашого логотипа чи власного дизайну."
  ],
  "nl": [
   "T-shirts",
   "T-shirts bedrukt met uw logo of eigen ontwerp."
  ],
  "ar": [
   "تيشيرتات",
   "تيشيرتات مطبوعة بشعارك أو تصميمك الخاص."
  ]
 },
 "uniforma": {
  "es": [
   "Uniformes",
   "Uniformes en el modelo y la impresión que desee."
  ],
  "fr": [
   "Uniformes",
   "Uniformes dans le modèle et l’impression de votre choix."
  ],
  "pl": [
   "Uniformy",
   "Uniformy w wybranym modelu i z nadrukiem."
  ],
  "uk": [
   "Уніформа",
   "Уніформа в потрібній моделі та з потрібним друком."
  ],
  "nl": [
   "Uniformen",
   "Uniformen in het model en met de print die u wilt."
  ],
  "ar": [
   "زيّ موحّد",
   "زيّ موحّد بالموديل والطباعة التي تريدها."
  ]
 }
};
