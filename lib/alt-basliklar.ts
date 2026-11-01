// Sayfa alt başlıkları (H2) + kısa açıklamalar, 10 dilde. {y} = yer adı (varsayılan: Antalya).
// Yalnızca doğrulanmış bilgiler: paça/bel ₺200+, fermuar ₺300+, gelinlik/abiye ₺800+, acil 1–2 saat, normal ertesi gün,
// özel dikim modele/adede göre, her gün 08:00–23:00, WhatsApp'tan fotoğrafla fiyat, hizmet verilen bölgelerde ücretsiz otel alım-teslim.
export type L10 = 'tr' | 'en' | 'de' | 'ru' | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
export type Konu = 'genel' | 'paca' | 'fermuar' | 'gelinlik' | 'keten' | 'uniforma' | 'promo' | 'otel' | 'terzi' | 'fiyat' | 'hizmet' | 'bolge' | 'terziFp' | 'hizmetFp';
type Item = { h: Record<L10, string>; p: Record<L10, string> };
const BASE: Record<Exclude<Konu, 'terziFp' | 'hizmetFp'>, Item[]> = {
 "paca": [
  {
   "h": {
    "tr": "{y} paça kısaltma fiyatı ve süresi",
    "en": "Trouser hemming in {y}: price and time",
    "de": "Hose kürzen in {y}: Preis und Dauer",
    "ru": "Подшив брюк в {y}: цена и срок",
    "es": "Acortar bajos de pantalón en {y}: precio y plazo",
    "fr": "Ourlet de pantalon à {y} : prix et délai",
    "pl": "Skracanie spodni w {y}: cena i czas",
    "uk": "Підшивання штанів у {y}: ціна й строк",
    "nl": "Broek korter maken in {y}: prijs en tijd",
    "ar": "تقصير البنطلون في {y}: السعر والمدة"
   },
   "p": {
    "tr": "Paça kısaltma ₺200'den başlar. Acil işler 1–2 saatte, normal işler ertesi gün teslim edilir.",
    "en": "Trouser hemming starts from €10. Urgent jobs are ready in 1–2 hours, normal jobs the next day.",
    "de": "Das Kürzen beginnt ab €10. Eilige Aufträge sind in 1–2 Stunden fertig, normale am nächsten Tag.",
    "ru": "Подшив брюк — от €10. Срочные заказы — за 1–2 часа, обычные — на следующий день.",
    "es": "Acortar bajos cuesta desde €10. Los trabajos urgentes están listos en 1–2 horas y los normales al día siguiente.",
    "fr": "Le raccourcissement commence à €10. Les travaux urgents sont prêts en 1 à 2 heures, les autres le lendemain.",
    "pl": "Skracanie nogawek zaczyna się od €10. Pilne zlecenia są gotowe w 1–2 godziny, zwykłe następnego dnia.",
    "uk": "Підшивання штанів — від €10. Термінові замовлення — за 1–2 години, звичайні — наступного дня.",
    "nl": "Korter maken begint vanaf €10. Spoedwerk is klaar in 1–2 uur, gewoon werk de volgende dag.",
    "ar": "يبدأ تقصير الحاشية من €10. الأعمال العاجلة جاهزة خلال ساعة إلى ساعتين والعادية في اليوم التالي."
   }
  },
  {
   "h": {
    "tr": "Paça boyu nasıl ayarlanır?",
    "en": "How is the trouser length set?",
    "de": "Wie wird die Hosenlänge festgelegt?",
    "ru": "Как подбирается длина брюк?",
    "es": "¿Cómo se ajusta el largo del pantalón?",
    "fr": "Comment ajuster la longueur du pantalon ?",
    "pl": "Jak ustala się długość spodni?",
    "uk": "Як підбирають довжину штанів?",
    "nl": "Hoe wordt de broeklengte bepaald?",
    "ar": "كيف يُضبط طول البنطلون؟"
   },
   "p": {
    "tr": "Pantolon, giyeceğiniz ayakkabıyla ayakta denenir ve boy sizin tercihinize göre işaretlenir. Spor ve klasik ayakkabı için boy farklı olabilir.",
    "en": "The trousers are tried on standing, with the shoes you will wear, and the length is marked to your preference. It can differ for sneakers and dress shoes.",
    "de": "Die Hose wird im Stehen mit den Schuhen anprobiert, die Sie tragen werden, und die Länge nach Ihrem Wunsch markiert. Für Sneaker und klassische Schuhe kann sie unterschiedlich sein.",
    "ru": "Брюки примеряют стоя, в обуви, с которой вы их будете носить, и отмечают длину по вашему желанию. Для кроссовок и классической обуви она может отличаться.",
    "es": "El pantalón se prueba de pie, con los zapatos que va a usar, y el largo se marca según su preferencia. Puede cambiar para zapatillas o zapatos de vestir.",
    "fr": "Le pantalon est essayé debout, avec les chaussures que vous porterez, et la longueur est marquée selon votre préférence. Elle peut différer pour des baskets ou des chaussures classiques.",
    "pl": "Spodnie przymierza się na stojąco, w butach, w których będą noszone, a długość zaznacza według Twoich preferencji. Dla sportowych i klasycznych butów może być inna.",
    "uk": "Штани приміряють стоячи, у взутті, з яким їх носитимуть, і позначають довжину за вашим бажанням. Для кросівок і класичного взуття вона може відрізнятися.",
    "nl": "De broek wordt staand gepast, met de schoenen die u gaat dragen, en de lengte wordt naar uw wens gemarkeerd. Voor sneakers en nette schoenen kan die verschillen.",
    "ar": "يُجرَّب البنطلون واقفًا مع الحذاء الذي سترتديه، ويُعلَّم الطول حسب رغبتك. وقد يختلف بين الحذاء الرياضي والكلاسيكي."
   }
  },
  {
   "h": {
    "tr": "Bel daraltma ve pantolon tadilatı",
    "en": "Waist taking-in and trouser alterations",
    "de": "Bund enger machen und Hosenänderungen",
    "ru": "Ушивание в талии и переделка брюк",
    "es": "Ajuste de cintura y arreglos de pantalón",
    "fr": "Ajustement de taille et retouches de pantalon",
    "pl": "Zwężanie w talii i przeróbki spodni",
    "uk": "Звуження в талії та переробка штанів",
    "nl": "Taille innemen en broekaanpassingen",
    "ar": "تضييق الخصر وتعديل البنطلون"
   },
   "p": {
    "tr": "Bel daraltma ₺200'den başlar. Kıyafetin fotoğrafını WhatsApp'tan göndererek yapılacak işe göre net fiyat alabilirsiniz.",
    "en": "Waist taking-in starts from €10. Send a photo of the garment on WhatsApp to get an exact price for the work needed.",
    "de": "Bund enger machen beginnt ab €10. Senden Sie ein Foto per WhatsApp, um den genauen Preis für die nötige Arbeit zu erhalten.",
    "ru": "Ушивание в талии — от €10. Пришлите фото вещи в WhatsApp, и мы назовём точную цену работы.",
    "es": "Ajustar la cintura cuesta desde €10. Envíe una foto de la prenda por WhatsApp para recibir el precio exacto del trabajo.",
    "fr": "L’ajustement de taille commence à €10. Envoyez une photo du vêtement par WhatsApp pour obtenir le prix exact.",
    "pl": "Zwężanie w talii zaczyna się od €10. Wyślij zdjęcie ubrania przez WhatsApp, aby poznać dokładną cenę pracy.",
    "uk": "Звуження в талії — від €10. Надішліть фото речі у WhatsApp, щоб отримати точну ціну роботи.",
    "nl": "Taille innemen begint vanaf €10. Stuur een foto van het kledingstuk via WhatsApp voor een exacte prijs.",
    "ar": "يبدأ تضييق الخصر من €10. أرسل صورة القطعة عبر واتساب لتحصل على السعر الدقيق للعمل المطلوب."
   }
  }
 ],
 "fermuar": [
  {
   "h": {
    "tr": "{y} fermuar değişimi: tamir mi, yenisi mi?",
    "en": "Zipper repair in {y}: fix or replace?",
    "de": "Reißverschluss in {y}: reparieren oder ersetzen?",
    "ru": "Молния в {y}: ремонт или замена?",
    "es": "Cremallera en {y}: ¿reparar o cambiar?",
    "fr": "Fermeture à glissière à {y} : réparer ou remplacer ?",
    "pl": "Zamek błyskawiczny w {y}: naprawa czy wymiana?",
    "uk": "Блискавка в {y}: ремонт чи заміна?",
    "nl": "Rits in {y}: repareren of vervangen?",
    "ar": "السحّاب في {y}: إصلاح أم استبدال؟"
   },
   "p": {
    "tr": "Dişler sağlam ve şerit yırtık değilse çoğu zaman yalnızca sürgü değişir ya da sıkışma giderilir. Dişler kopmuşsa veya şerit yırtılmışsa fermuarın tamamı değişir.",
    "en": "If the teeth are intact and the tape isn't torn, often only the slider is replaced or the jam is cleared. If teeth are missing or the tape is torn, the whole zipper is replaced.",
    "de": "Sind die Zähne intakt und das Band nicht gerissen, genügt oft ein neuer Schieber oder das Beheben des Klemmens. Fehlen Zähne oder ist das Band gerissen, wird der ganze Reißverschluss ersetzt.",
    "ru": "Если зубцы целы, а лента не порвана, часто достаточно заменить бегунок или устранить заедание. Если зубцы выпали или лента порвана, молнию меняют полностью.",
    "es": "Si los dientes están intactos y la cinta no está rota, a menudo basta cambiar el cursor o desatascarla. Si faltan dientes o la cinta está rota, se cambia toda la cremallera.",
    "fr": "Si les dents sont intactes et le ruban n’est pas déchiré, il suffit souvent de changer le curseur ou de débloquer la fermeture. Sinon, elle est remplacée en entier.",
    "pl": "Jeśli ząbki są całe, a taśma nie jest rozdarta, często wystarczy wymienić suwak lub usunąć zacięcie. Gdy brakuje ząbków lub taśma jest rozdarta, wymienia się cały zamek.",
    "uk": "Якщо зубці цілі, а стрічка не порвана, часто достатньо замінити бігунок або усунути заїдання. Якщо зубців бракує чи стрічка порвана, блискавку міняють повністю.",
    "nl": "Zijn de tanden heel en de tape niet gescheurd, dan volstaat vaak een nieuwe schuif of het losmaken van de blokkade. Anders wordt de hele rits vervangen.",
    "ar": "إذا كانت الأسنان سليمة والشريط غير ممزّق، يكفي غالبًا تبديل الزلّاجة أو إزالة الانحشار. وإذا كانت الأسنان مكسورة أو الشريط ممزّقًا، يُستبدل السحّاب كاملًا."
   }
  },
  {
   "h": {
    "tr": "Fermuar değişimi fiyatı ve teslim süresi",
    "en": "Zipper replacement price and turnaround",
    "de": "Preis und Dauer beim Reißverschluss-Wechsel",
    "ru": "Цена и срок замены молнии",
    "es": "Precio y plazo del cambio de cremallera",
    "fr": "Prix et délai du remplacement de fermeture",
    "pl": "Cena i czas wymiany zamka",
    "uk": "Ціна й строк заміни блискавки",
    "nl": "Prijs en doorlooptijd ritsvervanging",
    "ar": "سعر ومدة استبدال السحّاب"
   },
   "p": {
    "tr": "Fermuar değişimi ₺300'den başlar. Acil işler 1–2 saatte, normal işler ertesi gün teslim edilir.",
    "en": "Zipper replacement starts from €20. Urgent jobs are ready in 1–2 hours, normal jobs the next day.",
    "de": "Der Austausch beginnt ab €20. Eilige Aufträge sind in 1–2 Stunden fertig, normale am nächsten Tag.",
    "ru": "Замена молнии — от €20. Срочные заказы — за 1–2 часа, обычные — на следующий день.",
    "es": "El cambio de cremallera cuesta desde €20. Los trabajos urgentes están listos en 1–2 horas y los normales al día siguiente.",
    "fr": "Le remplacement commence à €20. Les travaux urgents sont prêts en 1 à 2 heures, les autres le lendemain.",
    "pl": "Wymiana zamka zaczyna się od €20. Pilne zlecenia są gotowe w 1–2 godziny, zwykłe następnego dnia.",
    "uk": "Заміна блискавки — від €20. Термінові замовлення — за 1–2 години, звичайні — наступного дня.",
    "nl": "Ritsvervanging begint vanaf €20. Spoedwerk is klaar in 1–2 uur, gewoon werk de volgende dag.",
    "ar": "يبدأ استبدال السحّاب من €20. الأعمال العاجلة جاهزة خلال ساعة إلى ساعتين والعادية في اليوم التالي."
   }
  },
  {
   "h": {
    "tr": "Mont, ceket ve pantolon fermuarı",
    "en": "Zippers for coats, jackets and trousers",
    "de": "Reißverschlüsse für Mäntel, Jacken und Hosen",
    "ru": "Молнии для курток, пальто и брюк",
    "es": "Cremalleras de abrigos, chaquetas y pantalones",
    "fr": "Fermetures de manteaux, vestes et pantalons",
    "pl": "Zamki w płaszczach, kurtkach i spodniach",
    "uk": "Блискавки для курток, пальто і штанів",
    "nl": "Ritsen voor jassen, jacks en broeken",
    "ar": "سحّابات المعاطف والجاكيتات والبناطيل"
   },
   "p": {
    "tr": "Fermuar değişimi pantolon, etek, elbise, ceket, mont ve çanta gibi kıyafet ve ürünlerde yapılır. Fotoğrafını WhatsApp'tan gönderin, yapılabilirliği söyleyelim.",
    "en": "Zipper replacement is done on trousers, skirts, dresses, jackets, coats and bags. Send a photo on WhatsApp and we will tell you if it can be done.",
    "de": "Der Austausch erfolgt bei Hosen, Röcken, Kleidern, Jacken, Mänteln und Taschen. Senden Sie ein Foto per WhatsApp, wir sagen Ihnen, ob es machbar ist.",
    "ru": "Замену молнии делают в брюках, юбках, платьях, куртках, пальто и сумках. Пришлите фото в WhatsApp, и мы скажем, возможно ли это.",
    "es": "Se cambia la cremallera en pantalones, faldas, vestidos, chaquetas, abrigos y bolsos. Envíe una foto por WhatsApp y le diremos si es posible.",
    "fr": "Le remplacement se fait sur pantalons, jupes, robes, vestes, manteaux et sacs. Envoyez une photo par WhatsApp, nous vous dirons si c’est faisable.",
    "pl": "Wymieniamy zamki w spodniach, spódnicach, sukienkach, kurtkach, płaszczach i torbach. Wyślij zdjęcie przez WhatsApp, a powiemy, czy da się to zrobić.",
    "uk": "Заміну блискавки роблять у штанах, спідницях, сукнях, куртках, пальтах і сумках. Надішліть фото у WhatsApp, і ми скажемо, чи це можливо.",
    "nl": "Ritsvervanging gebeurt bij broeken, rokken, jurken, jacks, jassen en tassen. Stuur een foto via WhatsApp en we zeggen of het kan.",
    "ar": "يُستبدل السحّاب في البناطيل والتنانير والفساتين والجاكيتات والمعاطف والحقائب. أرسل صورة عبر واتساب ونخبرك إن كان ذلك ممكنًا."
   }
  }
 ],
 "gelinlik": [
  {
   "h": {
    "tr": "{y} abiye tadilatı fiyatı",
    "en": "Evening dress alteration price in {y}",
    "de": "Abendkleid ändern in {y}: Preis",
    "ru": "Цена подгонки вечернего платья в {y}",
    "es": "Precio de arreglos de vestido de noche en {y}",
    "fr": "Prix des retouches de robe de soirée à {y}",
    "pl": "Cena przeróbek sukni wieczorowej w {y}",
    "uk": "Ціна переробки вечірньої сукні в {y}",
    "nl": "Prijs aanpassing avondjurk in {y}",
    "ar": "سعر تعديل فستان السهرة في {y}"
   },
   "p": {
    "tr": "Abiye, gelinlik ve elbise tadilatı ₺800'den başlar. Kesin fiyat, kumaşa ve yapılacak işe göre ilk provada netleşir.",
    "en": "Evening gown, wedding dress and dress alterations start from €40. The exact price is set at the first fitting, depending on fabric and the work needed.",
    "de": "Änderungen an Abend-, Braut- und Kleidern beginnen ab €40. Den genauen Preis legen wir bei der ersten Anprobe nach Stoff und Aufwand fest.",
    "ru": "Переделка вечерних, свадебных платьев и платьев — от €40. Точная цена определяется на первой примерке в зависимости от ткани и объёма работ.",
    "es": "Los arreglos de vestidos de noche, de novia y de vestir empiezan desde €40. El precio exacto se fija en la primera prueba, según la tela y el trabajo.",
    "fr": "Les retouches de robes de soirée, de mariée et d’habillées commencent à €40. Le prix exact est fixé au premier essayage, selon le tissu et le travail.",
    "pl": "Przeróbki sukni wieczorowych, ślubnych i sukienek zaczynają się od €40. Dokładną cenę ustalamy na pierwszej przymiarce, zależnie od tkaniny i zakresu prac.",
    "uk": "Переробка вечірніх, весільних суконь і суконь — від €40. Точну ціну визначають на першій примірці залежно від тканини та обсягу робіт.",
    "nl": "Aanpassingen van avond-, bruids- en gewone jurken beginnen vanaf €40. De exacte prijs wordt bij de eerste pasbeurt bepaald, afhankelijk van stof en werk.",
    "ar": "يبدأ تعديل فساتين السهرة والزفاف والفساتين من €40. يُحدَّد السعر الدقيق في البروفة الأولى حسب القماش والعمل."
   }
  },
  {
   "h": {
    "tr": "Abiye ve gelinlik provası ne zaman yapılır?",
    "en": "When to book evening and wedding dress fittings",
    "de": "Wann Anproben für Abend- und Brautkleid?",
    "ru": "Когда делать примерки вечернего и свадебного платья?",
    "es": "¿Cuándo probar el vestido de noche o de novia?",
    "fr": "Quand essayer robe de soirée et de mariée ?",
    "pl": "Kiedy przymiarki sukni wieczorowej i ślubnej?",
    "uk": "Коли робити примірки вечірньої та весільної сукні?",
    "nl": "Wanneer pasbeurten voor avond- en bruidsjurk?",
    "ar": "متى تُجرى بروفات فستان السهرة والزفاف؟"
   },
   "p": {
    "tr": "Boy, bel ve korse ayarı için düğünden birkaç hafta önce ilk provayı, düğüne yakın bir tarihte son provayı yapmanız önerilir.",
    "en": "For length, waist and bodice adjustments, we recommend a first fitting a few weeks before the event and a final fitting close to the date.",
    "de": "Für Länge, Taille und Mieder empfehlen wir die erste Anprobe einige Wochen vor dem Anlass und die letzte kurz davor.",
    "ru": "Для подгонки длины, талии и корсета рекомендуем первую примерку за несколько недель до события, а финальную — ближе к дате.",
    "es": "Para ajustar largo, cintura y corpiño, recomendamos una primera prueba unas semanas antes del evento y una última cerca de la fecha.",
    "fr": "Pour ajuster longueur, taille et corset, nous conseillons un premier essayage quelques semaines avant l’événement et un dernier à l’approche de la date.",
    "pl": "Przy dopasowaniu długości, talii i gorsetu zalecamy pierwszą przymiarkę kilka tygodni przed wydarzeniem, a ostatnią tuż przed terminem.",
    "uk": "Для підгонки довжини, талії та корсета радимо першу примірку за кілька тижнів до події, а останню — ближче до дати.",
    "nl": "Voor lengte, taille en lijfje raden we een eerste pasbeurt een paar weken voor het evenement aan en een laatste vlak voor de datum.",
    "ar": "لضبط الطول والخصر والكورسيه، ننصح ببروفة أولى قبل المناسبة بأسابيع وبروفة أخيرة قريبة من الموعد."
   }
  },
  {
   "h": {
    "tr": "Abiye elbise dikimi ve özel dikim",
    "en": "Evening dress sewing and custom tailoring",
    "de": "Abendkleid nähen und Maßanfertigung",
    "ru": "Пошив вечернего платья и индивидуальный пошив",
    "es": "Confección de vestidos de noche y a medida",
    "fr": "Couture de robes de soirée et sur mesure",
    "pl": "Szycie sukienek wieczorowych i na miarę",
    "uk": "Пошив вечірніх суконь та індивідуальний пошив",
    "nl": "Avondjurk laten maken en maatwerk",
    "ar": "خياطة فساتين السهرة والتفصيل الخاص"
   },
   "p": {
    "tr": "Abiye ve elbise dikimi ₺800'den başlar. Özel dikimde süre ve fiyat modele, kumaşa ve adede göre belirlenir.",
    "en": "Evening and dress sewing starts from €40. For custom tailoring, time and price depend on the model, fabric and quantity.",
    "de": "Das Nähen von Abend- und Kleidern beginnt ab €40. Bei Maßanfertigung hängen Dauer und Preis von Modell, Stoff und Menge ab.",
    "ru": "Пошив вечерних платьев и платьев — от €40. При индивидуальном пошиве срок и цена зависят от модели, ткани и количества.",
    "es": "La confección de vestidos de noche y de vestir empieza desde €40. En la confección a medida, plazo y precio dependen del modelo, la tela y la cantidad.",
    "fr": "La couture de robes de soirée commence à €40. Pour le sur mesure, délai et prix dépendent du modèle, du tissu et de la quantité.",
    "pl": "Szycie sukienek wieczorowych zaczyna się od €40. Przy szyciu na miarę czas i cena zależą od modelu, tkaniny i ilości.",
    "uk": "Пошив вечірніх суконь і суконь — від €40. При індивідуальному пошиві строк і ціна залежать від моделі, тканини та кількості.",
    "nl": "Het maken van avond- en gewone jurken begint vanaf €40. Bij maatwerk hangen tijd en prijs af van model, stof en aantal.",
    "ar": "تبدأ خياطة فساتين السهرة والفساتين من €40. وفي التفصيل الخاص تعتمد المدة والسعر على الموديل والقماش والكمية."
   }
  }
 ],
 "keten": [
  {
   "h": {
    "tr": "Keten kıyafet dikimi: kumaş çeker mi?",
    "en": "Linen clothing tailoring: does the fabric shrink?",
    "de": "Leinenkleidung nähen: läuft der Stoff ein?",
    "ru": "Пошив льняной одежды: садится ли ткань?",
    "es": "Confección de ropa de lino: ¿encoge la tela?",
    "fr": "Couture de vêtements en lin : le tissu rétrécit-il ?",
    "pl": "Szycie ubrań z lnu: czy tkanina się kurczy?",
    "uk": "Пошив лляного одягу: чи сідає тканина?",
    "nl": "Linnen kleding laten maken: krimpt de stof?",
    "ar": "خياطة ملابس الكتان: هل ينكمش القماش؟"
   },
   "p": {
    "tr": "Keten, özellikle ilk yıkamada çekebilir. Dikimden önce kumaşın ön yıkamasının yapılması, bitmiş kıyafetin boyunun ve bedeninin sonradan değişmesini önler.",
    "en": "Linen can shrink, especially in the first wash. Pre-washing the fabric before sewing prevents the finished garment's length and fit from changing later.",
    "de": "Leinen kann besonders beim ersten Waschen einlaufen. Eine Vorwäsche des Stoffes vor dem Nähen verhindert, dass sich Länge und Passform später ändern.",
    "ru": "Лён может садиться, особенно при первой стирке. Предварительная стирка ткани перед пошивом не даёт готовой вещи изменить длину и посадку.",
    "es": "El lino puede encoger, sobre todo en el primer lavado. Prelavar la tela antes de coser evita que el largo y el ajuste cambien después.",
    "fr": "Le lin peut rétrécir, surtout au premier lavage. Prélaver le tissu avant la couture évite que la longueur et la coupe changent par la suite.",
    "pl": "Len może się kurczyć, zwłaszcza przy pierwszym praniu. Wstępne pranie tkaniny przed szyciem zapobiega zmianie długości i dopasowania.",
    "uk": "Льон може сідати, особливо при першому пранні. Попереднє прання тканини перед пошивом не дає готовій речі змінити довжину й посадку.",
    "nl": "Linnen kan krimpen, vooral bij de eerste wasbeurt. Het stof voorwassen vóór het naaien voorkomt dat lengte en pasvorm later veranderen.",
    "ar": "قد ينكمش الكتان، خاصة عند أول غسلة. غسل القماش مسبقًا قبل الخياطة يمنع تغيّر الطول والمقاس بعد الانتهاء."
   }
  },
  {
   "h": {
    "tr": "Keten ve pamuk özel dikim: süre ve fiyat",
    "en": "Custom linen and cotton tailoring: time and price",
    "de": "Leinen und Baumwolle nach Maß: Dauer und Preis",
    "ru": "Индивидуальный пошив из льна и хлопка: срок и цена",
    "es": "Lino y algodón a medida: plazo y precio",
    "fr": "Lin et coton sur mesure : délai et prix",
    "pl": "Len i bawełna na miarę: czas i cena",
    "uk": "Льон і бавовна на замовлення: строк і ціна",
    "nl": "Linnen en katoen op maat: tijd en prijs",
    "ar": "الكتان والقطن بالتفصيل الخاص: المدة والسعر"
   },
   "p": {
    "tr": "Özel dikimde süre ve fiyat modele, kumaşa ve adede göre belirlenir; dikime başlamadan önce net olarak konuşulur.",
    "en": "For custom tailoring, time and price depend on the model, fabric and quantity, and are agreed clearly before sewing begins.",
    "de": "Bei Maßanfertigung hängen Dauer und Preis von Modell, Stoff und Menge ab und werden vor Nähbeginn klar besprochen.",
    "ru": "Срок и цена зависят от модели, ткани и количества и обсуждаются до начала работы.",
    "es": "Plazo y precio dependen del modelo, la tela y la cantidad, y se acuerdan claramente antes de empezar a coser.",
    "fr": "Délai et prix dépendent du modèle, du tissu et de la quantité, et sont précisés avant de commencer.",
    "pl": "Czas i cena zależą od modelu, tkaniny i ilości i są ustalane jasno przed rozpoczęciem szycia.",
    "uk": "Строк і ціна залежать від моделі, тканини та кількості й обговорюються до початку роботи.",
    "nl": "Tijd en prijs hangen af van model, stof en aantal en worden duidelijk afgesproken voordat het naaien begint.",
    "ar": "تعتمد المدة والسعر على الموديل والقماش والكمية، ويُتَّفق عليهما بوضوح قبل بدء الخياطة."
   }
  }
 ],
 "uniforma": [
  {
   "h": {
    "tr": "{y} üniforma imalatı: sipariş için ne gerekir?",
    "en": "Uniform manufacturing in {y}: what do you need to order?",
    "de": "Uniformen in {y} fertigen lassen: was wird benötigt?",
    "ru": "Производство униформы в {y}: что нужно для заказа?",
    "es": "Fabricación de uniformes en {y}: ¿qué se necesita?",
    "fr": "Fabrication d’uniformes à {y} : que faut-il fournir ?",
    "pl": "Produkcja uniformów w {y}: czego potrzeba do zamówienia?",
    "uk": "Виробництво уніформи в {y}: що потрібно для замовлення?",
    "nl": "Uniformen laten maken in {y}: wat is nodig?",
    "ar": "تصنيع الزي الموحّد في {y}: ماذا تحتاج للطلب؟"
   },
   "p": {
    "tr": "Model, adet, beden listesi ve varsa logo bilgisi yeterlidir. Seri üretimden önce numune üzerinde ölçü ve görünüm onaylanır.",
    "en": "The model, quantity, size list and logo (if any) are enough. Before serial production, size and appearance are approved on a sample.",
    "de": "Modell, Menge, Größenliste und gegebenenfalls Logo genügen. Vor der Serienproduktion werden Größe und Aussehen an einem Muster freigegeben.",
    "ru": "Достаточно модели, количества, списка размеров и логотипа (если есть). Перед серийным производством размер и вид утверждаются на образце.",
    "es": "Bastan el modelo, la cantidad, la lista de tallas y el logotipo, si lo hay. Antes de la producción en serie se aprueban medidas y aspecto en una muestra.",
    "fr": "Le modèle, la quantité, la liste des tailles et le logo éventuel suffisent. Avant la série, taille et aspect sont validés sur un échantillon.",
    "pl": "Wystarczą model, ilość, lista rozmiarów i ewentualne logo. Przed produkcją seryjną rozmiar i wygląd zatwierdza się na próbce.",
    "uk": "Достатньо моделі, кількості, списку розмірів і логотипа (за наявності). Перед серією розмір і вигляд затверджують на зразку.",
    "nl": "Model, aantal, maatlijst en eventueel een logo volstaan. Vóór de serieproductie worden maat en uiterlijk op een voorbeeld goedgekeurd.",
    "ar": "يكفي تحديد الموديل والكمية وقائمة المقاسات والشعار إن وُجد. قبل الإنتاج بالجملة تُعتمد المقاسات والمظهر على نموذج."
   }
  },
  {
   "h": {
    "tr": "Otel, restoran ve şirket üniforması: süre ve teklif",
    "en": "Hotel, restaurant and company uniforms: time and quote",
    "de": "Hotel-, Restaurant- und Firmenuniformen: Dauer und Angebot",
    "ru": "Униформа для отелей, ресторанов и компаний: срок и предложение",
    "es": "Uniformes de hotel, restaurante y empresa: plazo y presupuesto",
    "fr": "Uniformes d’hôtel, de restaurant et d’entreprise : délai et devis",
    "pl": "Uniformy dla hoteli, restauracji i firm: czas i wycena",
    "uk": "Уніформа для готелів, ресторанів і компаній: строк і пропозиція",
    "nl": "Uniformen voor hotels, restaurants en bedrijven: tijd en offerte",
    "ar": "زي موحّد للفنادق والمطاعم والشركات: المدة وعرض السعر"
   },
   "p": {
    "tr": "Üretim süresi modele ve adede göre belirlenir. Teklif için model, adet ve logo bilgisini WhatsApp'tan göndermeniz yeterli.",
    "en": "Production time depends on the model and quantity. To get a quote, send the model, quantity and logo on WhatsApp.",
    "de": "Die Produktionsdauer hängt von Modell und Menge ab. Für ein Angebot senden Sie Modell, Menge und Logo per WhatsApp.",
    "ru": "Срок производства зависит от модели и количества. Для расчёта пришлите в WhatsApp модель, количество и логотип.",
    "es": "El plazo depende del modelo y de la cantidad. Para un presupuesto, envíe por WhatsApp el modelo, la cantidad y el logotipo.",
    "fr": "Le délai dépend du modèle et de la quantité. Pour un devis, envoyez le modèle, la quantité et le logo par WhatsApp.",
    "pl": "Czas produkcji zależy od modelu i ilości. Aby otrzymać wycenę, wyślij przez WhatsApp model, ilość i logo.",
    "uk": "Строк виробництва залежить від моделі та кількості. Для розрахунку надішліть у WhatsApp модель, кількість і логотип.",
    "nl": "De productietijd hangt af van model en aantal. Stuur voor een offerte het model, het aantal en het logo via WhatsApp.",
    "ar": "تعتمد مدة الإنتاج على الموديل والكمية. للحصول على عرض سعر أرسل الموديل والكمية والشعار عبر واتساب."
   }
  }
 ],
 "promo": [
  {
   "h": {
    "tr": "Promosyon tekstil ve bez çanta: teklif için ne gönderilir?",
    "en": "Promotional textiles and tote bags: what to send for a quote",
    "de": "Werbetextilien und Stoffbeutel: was für ein Angebot senden",
    "ru": "Рекламный текстиль и сумки-шопперы: что прислать для расчёта",
    "es": "Textil promocional y bolsas de tela: qué enviar para un presupuesto",
    "fr": "Textile promotionnel et sacs en tissu : que envoyer pour un devis",
    "pl": "Tekstylia reklamowe i torby bawełniane: co wysłać do wyceny",
    "uk": "Рекламний текстиль і сумки-шопери: що надіслати для розрахунку",
    "nl": "Promotioneel textiel en katoenen tassen: wat sturen voor een offerte",
    "ar": "المنسوجات الدعائية والحقائب القماشية: ماذا ترسل للحصول على عرض سعر"
   },
   "p": {
    "tr": "Logo veya tasarım dosyanızı, istediğiniz ürünü ve yaklaşık adedi gönderin. Elinizde yalnızca bir fikir ya da örnek fotoğraf varsa o da yeterli.",
    "en": "Send your logo or design file, the product you want and the approximate quantity. An idea or a reference photo is enough too.",
    "de": "Senden Sie Ihre Logo- oder Designdatei, das gewünschte Produkt und die ungefähre Menge. Auch eine Idee oder ein Beispielfoto genügt.",
    "ru": "Пришлите файл с логотипом или дизайном, нужное изделие и примерное количество. Достаточно и идеи или фото-примера.",
    "es": "Envíe su archivo de logotipo o diseño, el producto y la cantidad aproximada. También basta una idea o una foto de referencia.",
    "fr": "Envoyez votre fichier de logo ou de design, le produit souhaité et la quantité approximative. Une idée ou une photo de référence suffit aussi.",
    "pl": "Wyślij plik z logo lub projektem, wybrany produkt i przybliżoną ilość. Wystarczy też pomysł lub zdjęcie przykładowe.",
    "uk": "Надішліть файл із логотипом чи дизайном, потрібний виріб і приблизну кількість. Достатньо й ідеї або фото-прикладу.",
    "nl": "Stuur uw logo- of ontwerpbestand, het gewenste product en het geschatte aantal. Een idee of voorbeeldfoto is ook genoeg.",
    "ar": "أرسل ملف الشعار أو التصميم والمنتج المطلوب والكمية التقريبية. تكفي أيضًا فكرة أو صورة مرجعية."
   }
  },
  {
   "h": {
    "tr": "Logolu baskı çeşidi nasıl seçilir?",
    "en": "How to choose the print type for logo products",
    "de": "Druckart für Logo-Produkte richtig wählen",
    "ru": "Как выбрать вид печати логотипа",
    "es": "Cómo elegir el tipo de impresión del logotipo",
    "fr": "Comment choisir l’impression du logo",
    "pl": "Jak wybrać rodzaj nadruku logo",
    "uk": "Як обрати вид друку логотипа",
    "nl": "Het juiste printtype voor logoproducten kiezen",
    "ar": "كيف تختار نوع طباعة الشعار"
   },
   "p": {
    "tr": "Baskı çeşidini ürüne ve tasarıma göre birlikte seçeriz. Fiyat ve süre; model, adet ve baskıya göre netleşir.",
    "en": "We choose the print type together, based on the product and the design. Price and time depend on the model, quantity and print.",
    "de": "Wir wählen die Druckart gemeinsam nach Produkt und Design. Preis und Dauer hängen von Modell, Menge und Druck ab.",
    "ru": "Вид печати мы выбираем вместе, исходя из изделия и дизайна. Цена и срок зависят от модели, количества и печати.",
    "es": "Elegimos juntos el tipo de impresión según el producto y el diseño. El precio y el plazo dependen del modelo, la cantidad y la impresión.",
    "fr": "Nous choisissons ensemble le type d’impression selon le produit et le design. Le prix et le délai dépendent du modèle, de la quantité et de l’impression.",
    "pl": "Rodzaj nadruku wybieramy razem, w zależności od produktu i projektu. Cena i czas zależą od modelu, ilości i nadruku.",
    "uk": "Вид друку ми обираємо разом, виходячи з виробу й дизайну. Ціна й строк залежать від моделі, кількості та друку.",
    "nl": "We kiezen het printtype samen, op basis van product en ontwerp. Prijs en tijd hangen af van model, aantal en print.",
    "ar": "نختار نوع الطباعة معًا حسب المنتج والتصميم. يتحدد السعر والمدة حسب الموديل والكمية والطباعة."
   }
  }
 ],
 "otel": [
  {
   "h": {
    "tr": "{y} otele gelen terzi nasıl çalışır?",
    "en": "How does the hotel tailor in {y} work?",
    "de": "So funktioniert der Hotel-Schneider in {y}",
    "ru": "Как работает портной с выездом в отель в {y}",
    "es": "Cómo funciona el sastre a hoteles en {y}",
    "fr": "Comment fonctionne le tailleur à l’hôtel à {y}",
    "pl": "Jak działa krawiec dojeżdżający do hotelu w {y}",
    "uk": "Як працює кравець із виїздом до готелю в {y}",
    "nl": "Hoe werkt de hotelkleermaker in {y}",
    "ar": "كيف يعمل الخيّاط الذي يأتي إلى الفندق في {y}"
   },
   "p": {
    "tr": "Terzi otelinize gelir, ölçü alır, gerekirse kıyafeti atölyeye götürür ve tadilat bitince otelinize teslim eder. Randevu için WhatsApp'tan yazmanız yeterli.",
    "en": "The tailor comes to your hotel, takes measurements, takes the garment to the workshop if needed and delivers it back when finished. Just message us on WhatsApp to book.",
    "de": "Der Schneider kommt in Ihr Hotel, nimmt Maß, bringt das Kleidungsstück bei Bedarf ins Atelier und liefert es zurück. Zur Terminvereinbarung schreiben Sie uns per WhatsApp.",
    "ru": "Портной приезжает в отель, снимает мерки, при необходимости забирает вещь в ателье и возвращает её после работы. Для записи достаточно написать в WhatsApp.",
    "es": "El sastre va a su hotel, toma medidas, lleva la prenda al taller si hace falta y la devuelve al terminar. Para reservar, escríbanos por WhatsApp.",
    "fr": "Le tailleur se rend à votre hôtel, prend les mesures, emporte le vêtement à l’atelier si besoin et le rapporte une fois terminé. Pour réserver, écrivez-nous sur WhatsApp.",
    "pl": "Krawiec przyjeżdża do hotelu, zdejmuje miary, w razie potrzeby zabiera ubranie do pracowni i odwozi je po skończeniu. Aby umówić wizytę, napisz na WhatsApp.",
    "uk": "Кравець приїздить до готелю, знімає мірки, за потреби забирає річ в ательє й повертає після роботи. Для запису напишіть у WhatsApp.",
    "nl": "De kleermaker komt naar uw hotel, neemt maat, brengt het kledingstuk indien nodig naar het atelier en levert het terug. Stuur ons voor een afspraak een WhatsApp-bericht.",
    "ar": "يأتي الخيّاط إلى فندقك ويأخذ المقاسات ويحمل القطعة إلى الورشة عند الحاجة ثم يُعيدها بعد الانتهاء. للحجز راسلنا عبر واتساب."
   }
  },
  {
   "h": {
    "tr": "Otel alım ve teslim ücretsiz mi?",
    "en": "Is hotel pickup and delivery free?",
    "de": "Sind Abholung und Lieferung im Hotel kostenlos?",
    "ru": "Бесплатны ли забор и доставка в отеле?",
    "es": "¿Son gratuitas la recogida y entrega en el hotel?",
    "fr": "Prise en charge et livraison à l’hôtel gratuites ?",
    "pl": "Czy odbiór i dostawa w hotelu są bezpłatne?",
    "uk": "Чи безкоштовні забір і доставка в готелі?",
    "nl": "Zijn ophalen en bezorgen in het hotel gratis?",
    "ar": "هل الاستلام والتسليم في الفندق مجاني؟"
   },
   "p": {
    "tr": "Hizmet verilen bölgelerde (Konyaaltı, Lara, Belek, Kemer, Side ve çevresi) otel alım ve teslimi ücretsizdir.",
    "en": "In the areas we serve (Konyaaltı, Lara, Belek, Kemer, Side and surroundings), hotel pickup and delivery are free.",
    "de": "In unseren Servicegebieten (Konyaaltı, Lara, Belek, Kemer, Side und Umgebung) sind Abholung und Lieferung im Hotel kostenlos.",
    "ru": "В районах обслуживания (Коньяалты, Лара, Белек, Кемер, Сиде и окрестности) забор и доставка в отель бесплатны.",
    "es": "En las zonas donde damos servicio (Konyaaltı, Lara, Belek, Kemer, Side y alrededores), la recogida y la entrega en el hotel son gratuitas.",
    "fr": "Dans les zones desservies (Konyaaltı, Lara, Belek, Kemer, Side et alentours), la prise en charge et la livraison à l’hôtel sont gratuites.",
    "pl": "W obsługiwanych rejonach (Konyaaltı, Lara, Belek, Kemer, Side i okolice) odbiór i dostawa w hotelu są bezpłatne.",
    "uk": "У районах обслуговування (Коньяалти, Лара, Белек, Кемер, Сіде та околиці) забір і доставка в готель безкоштовні.",
    "nl": "In de gebieden waar we werken (Konyaaltı, Lara, Belek, Kemer, Side en omgeving) zijn ophalen en bezorgen in het hotel gratis.",
    "ar": "في المناطق التي نخدمها (كونيالتي، لارا، بلك، كمر، سيدي والمناطق المحيطة) الاستلام والتسليم في الفندق مجاني."
   }
  },
  {
   "h": {
    "tr": "Tatilde acil kıyafet tadilatı",
    "en": "Urgent clothing alterations on holiday",
    "de": "Eilige Kleideränderungen im Urlaub",
    "ru": "Срочная подгонка одежды в отпуске",
    "es": "Arreglos urgentes de ropa en vacaciones",
    "fr": "Retouches urgentes en vacances",
    "pl": "Pilne poprawki ubrań na wakacjach",
    "uk": "Термінова підгонка одягу у відпустці",
    "nl": "Spoedaanpassingen van kleding op vakantie",
    "ar": "تعديل الملابس العاجل أثناء العطلة"
   },
   "p": {
    "tr": "Acil tamir ve tadilat 1–2 saatte hazırdır. Düğün, toplantı veya tatil öncesi son dakika paça, fermuar ve bel işleri için WhatsApp'tan yazın.",
    "en": "Urgent repairs and alterations are ready in 1–2 hours. For last-minute hemming, zipper and waist jobs before a wedding, meeting or trip, message us on WhatsApp.",
    "de": "Dringende Reparaturen und Änderungen sind in 1–2 Stunden fertig. Für kurzfristiges Kürzen, Reißverschluss und Bund vor Hochzeit, Termin oder Reise schreiben Sie uns per WhatsApp.",
    "ru": "Срочный ремонт и подгонка готовы за 1–2 часа. Для срочного подшива, молнии и талии перед свадьбой, встречей или поездкой пишите в WhatsApp.",
    "es": "Los arreglos urgentes están listos en 1–2 horas. Para bajos, cremalleras y cintura de última hora antes de una boda, reunión o viaje, escríbanos por WhatsApp.",
    "fr": "Les retouches urgentes sont prêtes en 1 à 2 heures. Pour un ourlet, une fermeture ou une taille de dernière minute avant un mariage, une réunion ou un voyage, écrivez-nous sur WhatsApp.",
    "pl": "Pilne naprawy i przeróbki są gotowe w 1–2 godziny. Przy skracaniu, zamku i talii na ostatnią chwilę przed ślubem, spotkaniem lub podróżą napisz na WhatsApp.",
    "uk": "Термінові ремонт і підгонка готові за 1–2 години. Для термінового підшивання, блискавки й талії перед весіллям, зустріччю чи поїздкою пишіть у WhatsApp.",
    "nl": "Spoedreparaties en -aanpassingen zijn klaar in 1–2 uur. Voor last-minute zoom, rits en taille voor een bruiloft, vergadering of reis stuurt u een WhatsApp-bericht.",
    "ar": "التصليحات والتعديلات العاجلة جاهزة خلال ساعة إلى ساعتين. للتقصير والسحّاب والخصر في اللحظة الأخيرة قبل حفل أو اجتماع أو سفر راسلنا عبر واتساب."
   }
  }
 ],
 "terzi": [
  {
   "h": {
    "tr": "{y} terzi hizmetleri: paça, fermuar, bel ve elbise",
    "en": "Tailor services in {y}: hemming, zippers, waist and dresses",
    "de": "Schneiderservice in {y}: Saum, Reißverschluss, Bund und Kleider",
    "ru": "Услуги портного в {y}: подшив, молнии, талия и платья",
    "es": "Servicios de sastrería en {y}: bajos, cremalleras, cintura y vestidos",
    "fr": "Services de couture à {y} : ourlets, fermetures, taille et robes",
    "pl": "Usługi krawieckie w {y}: nogawki, zamki, talia i suknie",
    "uk": "Послуги кравця в {y}: підшивання, блискавки, талія і сукні",
    "nl": "Kleermakersdiensten in {y}: zoom, ritsen, taille en jurken",
    "ar": "خدمات الخياطة في {y}: التقصير والسحّاب والخصر والفساتين"
   },
   "p": {
    "tr": "{y} bölgesinde paça kısaltma, fermuar değişimi, bel daraltma, gelinlik ve abiye tadilatı ile özel dikim yapılır. Fiyatlar paça ve bel ₺200'den, fermuar ₺300'den, gelinlik ve abiye ₺800'den başlar.",
    "en": "In {y} we do hemming, zipper replacement, waist taking-in, wedding and evening dress alterations and custom tailoring. Prices start from €10 for hemming and waist, €20 for zippers and €40 for wedding and evening dresses.",
    "de": "In {y} erledigen wir Saum kürzen, Reißverschluss-Wechsel, Bund enger machen, Änderungen an Braut- und Abendkleidern sowie Maßanfertigung. Preise ab €10 für Saum und Bund, €20 für Reißverschlüsse, €40 für Brautkleider.",
    "ru": "В {y} мы делаем подшив брюк, замену молний, ушивание в талии, переделку свадебных и вечерних платьев и индивидуальный пошив. Цены: подшив и талия — от €10, молния — от €20, платья — от €40.",
    "es": "En {y} hacemos bajos, cambio de cremalleras, ajuste de cintura, arreglos de vestidos de novia y de noche y confección a medida. Precios desde €10 (bajos y cintura), €20 (cremalleras) y €40 (vestidos).",
    "fr": "À {y}, nous faisons ourlets, remplacement de fermetures, ajustement de taille, retouches de robes de mariée et de soirée et couture sur mesure. Prix dès €10 (ourlet, taille), €20 (fermeture) et €40 (robes).",
    "pl": "W {y} wykonujemy skracanie, wymianę zamków, zwężanie w talii, przeróbki sukni ślubnych i wieczorowych oraz szycie na miarę. Ceny od €10 (nogawki, talia), €20 (zamki) i €40 (suknie).",
    "uk": "У {y} ми підшиваємо штани, міняємо блискавки, звужуємо в талії, переробляємо весільні й вечірні сукні та шиємо на замовлення. Ціни: підшивання й талія — від €10, блискавка — від €20, сукні — від €40.",
    "nl": "In {y} doen we broekzoom, ritsvervanging, taille innemen, aanpassingen van bruids- en avondjurken en maatwerk. Prijzen vanaf €10 (zoom, taille), €20 (ritsen) en €40 (jurken).",
    "ar": "نقدّم في {y} تقصير البنطلون واستبدال السحّاب وتضييق الخصر وتعديل فساتين الزفاف والسهرة والتفصيل الخاص. الأسعار من €10 للتقصير والخصر، €20 للسحّاب، €40 للفساتين."
   }
  },
  {
   "h": {
    "tr": "Terzi hizmeti için WhatsApp'tan fotoğrafla fiyat",
    "en": "Get a tailor quote by photo on WhatsApp",
    "de": "Schneider-Preis per Foto über WhatsApp",
    "ru": "Цена портного по фото в WhatsApp",
    "es": "Presupuesto de sastrería por foto en WhatsApp",
    "fr": "Devis couturier par photo sur WhatsApp",
    "pl": "Wycena krawiecka ze zdjęcia na WhatsApp",
    "uk": "Ціна кравця за фото у WhatsApp",
    "nl": "Kleermakersprijs via foto op WhatsApp",
    "ar": "سعر الخيّاط عبر صورة على واتساب"
   },
   "p": {
    "tr": "Kıyafetin fotoğrafını ve yapılacak işi WhatsApp'tan gönderin; net fiyat ve teslim süresini söyleyelim. Her gün 08:00–23:00 yazabilirsiniz.",
    "en": "Send a photo of the garment and the work you need on WhatsApp, and we will give you the exact price and turnaround. You can write every day from 08:00 to 23:00.",
    "de": "Senden Sie ein Foto des Kleidungsstücks und die gewünschte Arbeit per WhatsApp, wir nennen Preis und Dauer. Sie erreichen uns täglich von 08:00 bis 23:00 Uhr.",
    "ru": "Пришлите в WhatsApp фото вещи и нужную работу, и мы назовём точную цену и срок. Писать можно каждый день с 08:00 до 23:00.",
    "es": "Envíe por WhatsApp una foto de la prenda y el arreglo que necesita, y le diremos el precio y el plazo exactos. Puede escribir todos los días de 08:00 a 23:00.",
    "fr": "Envoyez sur WhatsApp une photo du vêtement et le travail souhaité, nous vous donnerons le prix et le délai exacts. Vous pouvez écrire tous les jours de 08h00 à 23h00.",
    "pl": "Wyślij przez WhatsApp zdjęcie ubrania i opis pracy, a podamy dokładną cenę i czas. Możesz pisać codziennie od 08:00 do 23:00.",
    "uk": "Надішліть у WhatsApp фото речі та потрібну роботу, і ми назвемо точну ціну й строк. Писати можна щодня з 08:00 до 23:00.",
    "nl": "Stuur via WhatsApp een foto van het kledingstuk en het gewenste werk, dan noemen we de exacte prijs en doorlooptijd. U kunt elke dag van 08:00 tot 23:00 schrijven.",
    "ar": "أرسل عبر واتساب صورة القطعة والعمل المطلوب لنخبرك بالسعر الدقيق والمدة. يمكنك مراسلتنا يوميًا من 08:00 إلى 23:00."
   }
  }
 ],
 "fiyat": [
  {
   "h": {
    "tr": "Terzi fiyatları {y}: paça, fermuar, bel, gelinlik",
    "en": "Tailor prices in {y}: hemming, zipper, waist, wedding dress",
    "de": "Schneiderpreise in {y}: Saum, Reißverschluss, Bund, Brautkleid",
    "ru": "Цены портного в {y}: подшив, молния, талия, свадебное платье",
    "es": "Precios de sastrería en {y}: bajos, cremallera, cintura, novia",
    "fr": "Tarifs de couture à {y} : ourlet, fermeture, taille, mariée",
    "pl": "Cennik krawiecki w {y}: nogawki, zamek, talia, suknia ślubna",
    "uk": "Ціни кравця в {y}: підшивання, блискавка, талія, весільна сукня",
    "nl": "Kleermakersprijzen in {y}: zoom, rits, taille, bruidsjurk",
    "ar": "أسعار الخياطة في {y}: التقصير والسحّاب والخصر وفستان الزفاف"
   },
   "p": {
    "tr": "Paça kısaltma ve bel daraltma ₺200'den, fermuar değişimi ₺300'den, gelinlik, abiye ve elbise tadilatı ₺800'den başlar.",
    "en": "Hemming and waist taking-in start from €10, zipper replacement from €20, wedding, evening and dress alterations from €40.",
    "de": "Saum kürzen und Bund enger machen ab €10, Reißverschluss-Wechsel ab €20, Änderungen an Braut-, Abend- und Kleidern ab €40.",
    "ru": "Подшив и ушивание в талии — от €10, замена молнии — от €20, переделка свадебных, вечерних платьев — от €40.",
    "es": "Bajos y cintura desde €10, cambio de cremallera desde €20, arreglos de vestidos de novia, de noche y de vestir desde €40.",
    "fr": "Ourlet et taille dès €10, remplacement de fermeture dès €20, retouches de robes de mariée, de soirée et d’habillées dès €40.",
    "pl": "Nogawki i talia od €10, wymiana zamka od €20, przeróbki sukni ślubnych, wieczorowych i sukienek od €40.",
    "uk": "Підшивання й звуження в талії — від €10, заміна блискавки — від €20, переробка весільних і вечірніх суконь — від €40.",
    "nl": "Zoom en taille innemen vanaf €10, ritsvervanging vanaf €20, aanpassingen van bruids-, avond- en gewone jurken vanaf €40.",
    "ar": "التقصير وتضييق الخصر من €10، واستبدال السحّاب من €20، وتعديل فساتين الزفاف والسهرة من €40."
   }
  },
  {
   "h": {
    "tr": "Kesin fiyat nasıl belirlenir?",
    "en": "How is the exact tailoring price decided?",
    "de": "Wie wird der genaue Schneiderpreis bestimmt?",
    "ru": "Как определяется точная цена?",
    "es": "¿Cómo se fija el precio exacto?",
    "fr": "Comment le prix exact est-il fixé ?",
    "pl": "Jak ustalana jest dokładna cena?",
    "uk": "Як визначається точна ціна?",
    "nl": "Hoe wordt de exacte prijs bepaald?",
    "ar": "كيف يُحدَّد السعر الدقيق؟"
   },
   "p": {
    "tr": "Fiyat; kumaşa, yapılacak işe ve aciliyete göre değişir. Fotoğrafı WhatsApp'tan gönderdiğinizde işe başlamadan önce net fiyatı öğrenirsiniz.",
    "en": "The price varies with the fabric, the work and the urgency. When you send a photo on WhatsApp, you learn the exact price before any work begins.",
    "de": "Der Preis hängt von Stoff, Arbeit und Dringlichkeit ab. Wenn Sie ein Foto per WhatsApp senden, erfahren Sie den genauen Preis vor Arbeitsbeginn.",
    "ru": "Цена зависит от ткани, вида работы и срочности. Если прислать фото в WhatsApp, вы узнаете точную цену до начала работы.",
    "es": "El precio varía según la tela, el trabajo y la urgencia. Si envía una foto por WhatsApp, conocerá el precio exacto antes de empezar.",
    "fr": "Le prix varie selon le tissu, le travail et l’urgence. En envoyant une photo par WhatsApp, vous connaissez le prix exact avant le début des travaux.",
    "pl": "Cena zależy od tkaniny, rodzaju pracy i pilności. Gdy wyślesz zdjęcie przez WhatsApp, poznasz dokładną cenę przed rozpoczęciem prac.",
    "uk": "Ціна залежить від тканини, виду роботи й терміновості. Якщо надіслати фото у WhatsApp, ви дізнаєтеся точну ціну до початку роботи.",
    "nl": "De prijs hangt af van stof, werk en spoed. Als u een foto via WhatsApp stuurt, kent u de exacte prijs vóór het werk begint.",
    "ar": "يختلف السعر حسب القماش والعمل المطلوب والاستعجال. عند إرسال صورة عبر واتساب تعرف السعر الدقيق قبل بدء العمل."
   }
  }
 ],
 "hizmet": [
  {
   "h": {
    "tr": "{y} terzi: teslim süresi ve fiyat",
    "en": "Tailor in {y}: turnaround and price",
    "de": "Schneider in {y}: Dauer und Preis",
    "ru": "Портной в {y}: срок и цена",
    "es": "Sastre en {y}: plazo y precio",
    "fr": "Couturier à {y} : délai et prix",
    "pl": "Krawiec w {y}: czas i cena",
    "uk": "Кравець у {y}: строк і ціна",
    "nl": "Kleermaker in {y}: doorlooptijd en prijs",
    "ar": "خيّاط في {y}: المدة والسعر"
   },
   "p": {
    "tr": "Acil tamir ve tadilat 1–2 saatte, normal işler ertesi gün teslim edilir. Fiyatlar paça ve bel ₺200'den, fermuar ₺300'den, gelinlik ve abiye ₺800'den başlar.",
    "en": "Urgent repairs and alterations are ready in 1–2 hours, normal jobs the next day. Prices start from €10 for hemming and waist, €20 for zippers and €40 for wedding and evening dresses.",
    "de": "Dringende Reparaturen und Änderungen sind in 1–2 Stunden fertig, normale am nächsten Tag. Preise ab €10 für Saum und Bund, €20 für Reißverschlüsse, €40 für Brautkleider.",
    "ru": "Срочный ремонт и подгонка — за 1–2 часа, обычные работы — на следующий день. Цены: подшив и талия — от €10, молния — от €20, платья — от €40.",
    "es": "Los arreglos urgentes están listos en 1–2 horas y los normales al día siguiente. Precios desde €10 (bajos y cintura), €20 (cremalleras) y €40 (vestidos).",
    "fr": "Les retouches urgentes sont prêtes en 1 à 2 heures, les normales le lendemain. Prix dès €10 (ourlet et taille), €20 (fermeture) et €40 (robes).",
    "pl": "Pilne naprawy są gotowe w 1–2 godziny, zwykłe następnego dnia. Ceny od €10 (nogawki, talia), €20 (zamki) i €40 (suknie).",
    "uk": "Термінові ремонт і підгонка — за 1–2 години, звичайні — наступного дня. Ціни: підшивання й талія — від €10, блискавка — від €20, сукні — від €40.",
    "nl": "Spoedreparaties zijn klaar in 1–2 uur, gewone de volgende dag. Prijzen vanaf €10 (zoom, taille), €20 (ritsen) en €40 (jurken).",
    "ar": "التصليحات العاجلة جاهزة خلال ساعة إلى ساعتين والعادية في اليوم التالي. الأسعار من €10 للتقصير والخصر، €20 للسحّاب، €40 للفساتين."
   }
  },
  {
   "h": {
    "tr": "Fotoğrafla fiyat al, otelinize teslim",
    "en": "Get a price by photo, delivered to your hotel",
    "de": "Preis per Foto, Lieferung ins Hotel",
    "ru": "Цена по фото, доставка в отель",
    "es": "Precio por foto, entrega en su hotel",
    "fr": "Prix par photo, livraison à l’hôtel",
    "pl": "Cena ze zdjęcia, dostawa do hotelu",
    "uk": "Ціна за фото, доставка в готель",
    "nl": "Prijs via foto, levering aan uw hotel",
    "ar": "السعر عبر صورة والتسليم إلى فندقك"
   },
   "p": {
    "tr": "Kıyafetin fotoğrafını WhatsApp'tan gönderin. Hizmet verilen bölgelerde otel alım ve teslimi ücretsizdir; her gün 08:00–23:00 yazabilirsiniz.",
    "en": "Send a photo of the garment on WhatsApp. In the areas we serve, hotel pickup and delivery are free; you can write every day from 08:00 to 23:00.",
    "de": "Senden Sie ein Foto des Kleidungsstücks per WhatsApp. In unseren Servicegebieten sind Abholung und Lieferung im Hotel kostenlos; Sie erreichen uns täglich von 08:00 bis 23:00 Uhr.",
    "ru": "Пришлите фото вещи в WhatsApp. В районах обслуживания забор и доставка в отель бесплатны; писать можно каждый день с 08:00 до 23:00.",
    "es": "Envíe una foto de la prenda por WhatsApp. En las zonas de servicio, la recogida y la entrega en el hotel son gratuitas; puede escribir todos los días de 08:00 a 23:00.",
    "fr": "Envoyez une photo du vêtement par WhatsApp. Dans les zones desservies, la prise en charge et la livraison à l’hôtel sont gratuites ; vous pouvez écrire tous les jours de 08h00 à 23h00.",
    "pl": "Wyślij zdjęcie ubrania przez WhatsApp. W obsługiwanych rejonach odbiór i dostawa w hotelu są bezpłatne; możesz pisać codziennie od 08:00 do 23:00.",
    "uk": "Надішліть фото речі у WhatsApp. У районах обслуговування забір і доставка в готель безкоштовні; писати можна щодня з 08:00 до 23:00.",
    "nl": "Stuur een foto van het kledingstuk via WhatsApp. In de gebieden waar we werken zijn ophalen en bezorgen in het hotel gratis; u kunt elke dag van 08:00 tot 23:00 schrijven.",
    "ar": "أرسل صورة القطعة عبر واتساب. في المناطق التي نخدمها الاستلام والتسليم في الفندق مجاني؛ يمكنك المراسلة يوميًا من 08:00 إلى 23:00."
   }
  }
 ],
 "genel": [
  {
   "h": {
    "tr": "{y} terzi: teslim süresi ve fiyat",
    "en": "Tailor in {y}: turnaround and price",
    "de": "Schneider in {y}: Dauer und Preis",
    "ru": "Портной в {y}: срок и цена",
    "es": "Sastre en {y}: plazo y precio",
    "fr": "Couturier à {y} : délai et prix",
    "pl": "Krawiec w {y}: czas i cena",
    "uk": "Кравець у {y}: строк і ціна",
    "nl": "Kleermaker in {y}: doorlooptijd en prijs",
    "ar": "خيّاط في {y}: المدة والسعر"
   },
   "p": {
    "tr": "Acil tamir ve tadilat 1–2 saatte, normal işler ertesi gün teslim edilir. Fiyatlar paça ve bel ₺200'den, fermuar ₺300'den, gelinlik ve abiye ₺800'den başlar.",
    "en": "Urgent repairs and alterations are ready in 1–2 hours, normal jobs the next day. Prices start from €10 for hemming and waist, €20 for zippers and €40 for wedding and evening dresses.",
    "de": "Dringende Reparaturen und Änderungen sind in 1–2 Stunden fertig, normale am nächsten Tag. Preise ab €10 für Saum und Bund, €20 für Reißverschlüsse, €40 für Brautkleider.",
    "ru": "Срочный ремонт и подгонка — за 1–2 часа, обычные работы — на следующий день. Цены: подшив и талия — от €10, молния — от €20, платья — от €40.",
    "es": "Los arreglos urgentes están listos en 1–2 horas y los normales al día siguiente. Precios desde €10 (bajos y cintura), €20 (cremalleras) y €40 (vestidos).",
    "fr": "Les retouches urgentes sont prêtes en 1 à 2 heures, les normales le lendemain. Prix dès €10 (ourlet et taille), €20 (fermeture) et €40 (robes).",
    "pl": "Pilne naprawy są gotowe w 1–2 godziny, zwykłe następnego dnia. Ceny od €10 (nogawki, talia), €20 (zamki) i €40 (suknie).",
    "uk": "Термінові ремонт і підгонка — за 1–2 години, звичайні — наступного дня. Ціни: підшивання й талія — від €10, блискавка — від €20, сукні — від €40.",
    "nl": "Spoedreparaties zijn klaar in 1–2 uur, gewone de volgende dag. Prijzen vanaf €10 (zoom, taille), €20 (ritsen) en €40 (jurken).",
    "ar": "التصليحات العاجلة جاهزة خلال ساعة إلى ساعتين والعادية في اليوم التالي. الأسعار من €10 للتقصير والخصر، €20 للسحّاب، €40 للفساتين."
   }
  },
  {
   "h": {
    "tr": "Fotoğrafla fiyat al, otelinize teslim",
    "en": "Get a price by photo, delivered to your hotel",
    "de": "Preis per Foto, Lieferung ins Hotel",
    "ru": "Цена по фото, доставка в отель",
    "es": "Precio por foto, entrega en su hotel",
    "fr": "Prix par photo, livraison à l’hôtel",
    "pl": "Cena ze zdjęcia, dostawa do hotelu",
    "uk": "Ціна за фото, доставка в готель",
    "nl": "Prijs via foto, levering aan uw hotel",
    "ar": "السعر عبر صورة والتسليم إلى فندقك"
   },
   "p": {
    "tr": "Kıyafetin fotoğrafını WhatsApp'tan gönderin. Hizmet verilen bölgelerde otel alım ve teslimi ücretsizdir; her gün 08:00–23:00 yazabilirsiniz.",
    "en": "Send a photo of the garment on WhatsApp. In the areas we serve, hotel pickup and delivery are free; you can write every day from 08:00 to 23:00.",
    "de": "Senden Sie ein Foto des Kleidungsstücks per WhatsApp. In unseren Servicegebieten sind Abholung und Lieferung im Hotel kostenlos; Sie erreichen uns täglich von 08:00 bis 23:00 Uhr.",
    "ru": "Пришлите фото вещи в WhatsApp. В районах обслуживания забор и доставка в отель бесплатны; писать можно каждый день с 08:00 до 23:00.",
    "es": "Envíe una foto de la prenda por WhatsApp. En las zonas de servicio, la recogida y la entrega en el hotel son gratuitas; puede escribir todos los días de 08:00 a 23:00.",
    "fr": "Envoyez une photo du vêtement par WhatsApp. Dans les zones desservies, la prise en charge et la livraison à l’hôtel sont gratuites ; vous pouvez écrire tous les jours de 08h00 à 23h00.",
    "pl": "Wyślij zdjęcie ubrania przez WhatsApp. W obsługiwanych rejonach odbiór i dostawa w hotelu są bezpłatne; możesz pisać codziennie od 08:00 do 23:00.",
    "uk": "Надішліть фото речі у WhatsApp. У районах обслуговування забір і доставка в готель безкоштовні; писати можна щодня з 08:00 до 23:00.",
    "nl": "Stuur een foto van het kledingstuk via WhatsApp. In de gebieden waar we werken zijn ophalen en bezorgen in het hotel gratis; u kunt elke dag van 08:00 tot 23:00 schrijven.",
    "ar": "أرسل صورة القطعة عبر واتساب. في المناطق التي نخدمها الاستلام والتسليم في الفندق مجاني؛ يمكنك المراسلة يوميًا من 08:00 إلى 23:00."
   }
  }
 ],
 "bolge": [
  {
   "h": {
    "tr": "{y} otele gelen terzi nasıl çalışır?",
    "en": "How does the hotel tailor in {y} work?",
    "de": "So funktioniert der Hotel-Schneider in {y}",
    "ru": "Как работает портной с выездом в отель в {y}",
    "es": "Cómo funciona el sastre a hoteles en {y}",
    "fr": "Comment fonctionne le tailleur à l’hôtel à {y}",
    "pl": "Jak działa krawiec dojeżdżający do hotelu w {y}",
    "uk": "Як працює кравець із виїздом до готелю в {y}",
    "nl": "Hoe werkt de hotelkleermaker in {y}",
    "ar": "كيف يعمل الخيّاط الذي يأتي إلى الفندق في {y}"
   },
   "p": {
    "tr": "Terzi otelinize gelir, ölçü alır, gerekirse kıyafeti atölyeye götürür ve tadilat bitince otelinize teslim eder. Randevu için WhatsApp'tan yazmanız yeterli.",
    "en": "The tailor comes to your hotel, takes measurements, takes the garment to the workshop if needed and delivers it back when finished. Just message us on WhatsApp to book.",
    "de": "Der Schneider kommt in Ihr Hotel, nimmt Maß, bringt das Kleidungsstück bei Bedarf ins Atelier und liefert es zurück. Zur Terminvereinbarung schreiben Sie uns per WhatsApp.",
    "ru": "Портной приезжает в отель, снимает мерки, при необходимости забирает вещь в ателье и возвращает её после работы. Для записи достаточно написать в WhatsApp.",
    "es": "El sastre va a su hotel, toma medidas, lleva la prenda al taller si hace falta y la devuelve al terminar. Para reservar, escríbanos por WhatsApp.",
    "fr": "Le tailleur se rend à votre hôtel, prend les mesures, emporte le vêtement à l’atelier si besoin et le rapporte une fois terminé. Pour réserver, écrivez-nous sur WhatsApp.",
    "pl": "Krawiec przyjeżdża do hotelu, zdejmuje miary, w razie potrzeby zabiera ubranie do pracowni i odwozi je po skończeniu. Aby umówić wizytę, napisz na WhatsApp.",
    "uk": "Кравець приїздить до готелю, знімає мірки, за потреби забирає річ в ательє й повертає після роботи. Для запису напишіть у WhatsApp.",
    "nl": "De kleermaker komt naar uw hotel, neemt maat, brengt het kledingstuk indien nodig naar het atelier en levert het terug. Stuur ons voor een afspraak een WhatsApp-bericht.",
    "ar": "يأتي الخيّاط إلى فندقك ويأخذ المقاسات ويحمل القطعة إلى الورشة عند الحاجة ثم يُعيدها بعد الانتهاء. للحجز راسلنا عبر واتساب."
   }
  },
  {
   "h": {
    "tr": "Otel alım ve teslim ücretsiz mi?",
    "en": "Is hotel pickup and delivery free?",
    "de": "Sind Abholung und Lieferung im Hotel kostenlos?",
    "ru": "Бесплатны ли забор и доставка в отеле?",
    "es": "¿Son gratuitas la recogida y entrega en el hotel?",
    "fr": "Prise en charge et livraison à l’hôtel gratuites ?",
    "pl": "Czy odbiór i dostawa w hotelu są bezpłatne?",
    "uk": "Чи безкоштовні забір і доставка в готелі?",
    "nl": "Zijn ophalen en bezorgen in het hotel gratis?",
    "ar": "هل الاستلام والتسليم في الفندق مجاني؟"
   },
   "p": {
    "tr": "Hizmet verilen bölgelerde (Konyaaltı, Lara, Belek, Kemer, Side ve çevresi) otel alım ve teslimi ücretsizdir.",
    "en": "In the areas we serve (Konyaaltı, Lara, Belek, Kemer, Side and surroundings), hotel pickup and delivery are free.",
    "de": "In unseren Servicegebieten (Konyaaltı, Lara, Belek, Kemer, Side und Umgebung) sind Abholung und Lieferung im Hotel kostenlos.",
    "ru": "В районах обслуживания (Коньяалты, Лара, Белек, Кемер, Сиде и окрестности) забор и доставка в отель бесплатны.",
    "es": "En las zonas donde damos servicio (Konyaaltı, Lara, Belek, Kemer, Side y alrededores), la recogida y la entrega en el hotel son gratuitas.",
    "fr": "Dans les zones desservies (Konyaaltı, Lara, Belek, Kemer, Side et alentours), la prise en charge et la livraison à l’hôtel sont gratuites.",
    "pl": "W obsługiwanych rejonach (Konyaaltı, Lara, Belek, Kemer, Side i okolice) odbiór i dostawa w hotelu są bezpłatne.",
    "uk": "У районах обслуговування (Коньяалти, Лара, Белек, Кемер, Сіде та околиці) забір і доставка в готель безкоштовні.",
    "nl": "In de gebieden waar we werken (Konyaaltı, Lara, Belek, Kemer, Side en omgeving) zijn ophalen en bezorgen in het hotel gratis.",
    "ar": "في المناطق التي نخدمها (كونيالتي، لارا، بلك، كمر، سيدي والمناطق المحيطة) الاستلام والتسليم في الفندق مجاني."
   }
  },
  {
   "h": {
    "tr": "Tatilde acil kıyafet tadilatı",
    "en": "Urgent clothing alterations on holiday",
    "de": "Eilige Kleideränderungen im Urlaub",
    "ru": "Срочная подгонка одежды в отпуске",
    "es": "Arreglos urgentes de ropa en vacaciones",
    "fr": "Retouches urgentes en vacances",
    "pl": "Pilne poprawki ubrań na wakacjach",
    "uk": "Термінова підгонка одягу у відпустці",
    "nl": "Spoedaanpassingen van kleding op vakantie",
    "ar": "تعديل الملابس العاجل أثناء العطلة"
   },
   "p": {
    "tr": "Acil tamir ve tadilat 1–2 saatte hazırdır. Düğün, toplantı veya tatil öncesi son dakika paça, fermuar ve bel işleri için WhatsApp'tan yazın.",
    "en": "Urgent repairs and alterations are ready in 1–2 hours. For last-minute hemming, zipper and waist jobs before a wedding, meeting or trip, message us on WhatsApp.",
    "de": "Dringende Reparaturen und Änderungen sind in 1–2 Stunden fertig. Für kurzfristiges Kürzen, Reißverschluss und Bund vor Hochzeit, Termin oder Reise schreiben Sie uns per WhatsApp.",
    "ru": "Срочный ремонт и подгонка готовы за 1–2 часа. Для срочного подшива, молнии и талии перед свадьбой, встречей или поездкой пишите в WhatsApp.",
    "es": "Los arreglos urgentes están listos en 1–2 horas. Para bajos, cremalleras y cintura de última hora antes de una boda, reunión o viaje, escríbanos por WhatsApp.",
    "fr": "Les retouches urgentes sont prêtes en 1 à 2 heures. Pour un ourlet, une fermeture ou une taille de dernière minute avant un mariage, une réunion ou un voyage, écrivez-nous sur WhatsApp.",
    "pl": "Pilne naprawy i przeróbki są gotowe w 1–2 godziny. Przy skracaniu, zamku i talii na ostatnią chwilę przed ślubem, spotkaniem lub podróżą napisz na WhatsApp.",
    "uk": "Термінові ремонт і підгонка готові за 1–2 години. Для термінового підшивання, блискавки й талії перед весіллям, зустріччю чи поїздкою пишіть у WhatsApp.",
    "nl": "Spoedreparaties en -aanpassingen zijn klaar in 1–2 uur. Voor last-minute zoom, rits en taille voor een bruiloft, vergadering of reis stuurt u een WhatsApp-bericht.",
    "ar": "التصليحات والتعديلات العاجلة جاهزة خلال ساعة إلى ساعتين. للتقصير والسحّاب والخصر في اللحظة الأخيرة قبل حفل أو اجتماع أو سفر راسلنا عبر واتساب."
   }
  }
 ]
};
// Fiyat rakamı YAZILMAYAN diller (es/fr/pl/uk/nl/ar sayfaları: fiyat WhatsApp'ta netleşir).
const YENI_FP = {
 "h": {
  "tr": "{y} terzi hizmetleri ve teslim süresi",
  "en": "Tailor services in {y} and turnaround",
  "de": "Schneiderservice in {y} und Dauer",
  "ru": "Услуги портного в {y} и сроки",
  "es": "Servicios de sastrería en {y}: bajos, cremalleras, cintura y vestidos",
  "fr": "Services de couture à {y} : ourlets, fermetures, taille et robes",
  "pl": "Usługi krawieckie w {y}: nogawki, zamki, talia i suknie",
  "uk": "Послуги кравця в {y}: підшивання, блискавки, талія і сукні",
  "nl": "Kleermakersdiensten in {y}: zoom, ritsen, taille en jurken",
  "ar": "خدمات الخياطة في {y}: التقصير والسحّاب والخصر والفساتين"
 },
 "p": {
  "tr": "Paça kısaltma, fermuar değişimi, bel daraltma, gelinlik ve abiye tadilatı ile özel dikim yapılır. Acil işler 1–2 saatte, normal işler ertesi gün teslim edilir; fiyat WhatsApp'ta netleşir.",
  "en": "Hemming, zipper replacement, waist taking-in, wedding and evening dress alterations and custom tailoring. Urgent jobs are ready in 1–2 hours, normal jobs the next day; the price is confirmed on WhatsApp.",
  "de": "Saum kürzen, Reißverschluss-Wechsel, Bund enger machen, Änderungen an Braut- und Abendkleidern sowie Maßanfertigung. Eilige Aufträge in 1–2 Stunden, normale am nächsten Tag; der Preis wird per WhatsApp geklärt.",
  "ru": "Подшив брюк, замена молний, ушивание в талии, переделка свадебных и вечерних платьев, индивидуальный пошив. Срочные заказы — за 1–2 часа, обычные — на следующий день; цена уточняется в WhatsApp.",
  "es": "Acortar bajos, cambiar cremalleras, ajustar la cintura, arreglar vestidos de novia y de noche y confeccionar a medida. Los arreglos urgentes están listos en 1–2 horas y los normales al día siguiente; el precio se confirma por WhatsApp.",
  "fr": "Ourlets, remplacement de fermetures, ajustement de taille, retouches de robes de mariée et de soirée et couture sur mesure. Retouches urgentes en 1 à 2 heures, normales le lendemain ; le prix est confirmé sur WhatsApp.",
  "pl": "Skracanie nogawek, wymiana zamków, zwężanie w talii, przeróbki sukni ślubnych i wieczorowych oraz szycie na miarę. Pilne naprawy w 1–2 godziny, zwykłe następnego dnia; cenę potwierdzamy na WhatsApp.",
  "uk": "Підшивання штанів, заміна блискавок, звуження в талії, переробка весільних і вечірніх суконь та пошив на замовлення. Термінові роботи — за 1–2 години, звичайні — наступного дня; ціну уточнюємо у WhatsApp.",
  "nl": "Broekzoom, ritsvervanging, taille innemen, aanpassingen van bruids- en avondjurken en maatwerk. Spoedwerk klaar in 1–2 uur, gewoon werk de volgende dag; de prijs wordt via WhatsApp bevestigd.",
  "ar": "تقصير البنطلون واستبدال السحّاب وتضييق الخصر وتعديل فساتين الزفاف والسهرة والتفصيل الخاص. الأعمال العاجلة خلال ساعة إلى ساعتين والعادية في اليوم التالي؛ ويُؤكَّد السعر عبر واتساب."
 }
};
export const ALT_BASLIKLAR: Record<Konu, Item[]> = { ...BASE, terziFp: [YENI_FP, BASE.terzi[1]], hizmetFp: [YENI_FP, BASE.hizmet[1]] };

/** Konuya ait alt başlıkları döndürür. Türkçe dışındaki dillerde fiyat (₺) içeren cümleler çıkarılır; yer adı {y} yerleştirilir. */
export function altMetinler(konu: Konu | Konu[], lang: L10, yer = 'Antalya') {
  const konular = Array.isArray(konu) ? konu : [konu];
  const fiyatSayfasi = konular.includes('fiyat');
  return konular.flatMap((k) => ALT_BASLIKLAR[k]).map((a) => {
    let p = a.p[lang].replace(/\{y\}/g, yer);
    if (lang !== 'tr' && !fiyatSayfasi && p.includes('₺')) {
      p = p.split(/(?<=[.!?])\s+/).filter((c) => !c.includes('₺')).join(' ').trim();
    }
    return { h: a.h[lang].replace(/\{y\}/g, yer), p };
  }).filter((a) => a.p.length > 0);
}
