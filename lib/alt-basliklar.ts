// Sayfa alt başlıkları (H2) + kısa açıklamalar, 10 dilde. Yalnızca sitede yayınlanan doğrulanmış bilgiler:
// fiyatlar (paça/bel ₺200+, fermuar ₺300+, gelinlik/abiye ₺800+), süreler (acil 1–2 saat, normal ertesi gün, özel dikim modele/adede göre),
// çalışma saatleri (her gün 08:00–23:00), WhatsApp'tan fotoğrafla fiyat, otel alım-teslim (hizmet verilen bölgelerde ücretsiz).
export type L10 = 'tr' | 'en' | 'de' | 'ru' | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
export type Konu = 'genel' | 'paca' | 'fermuar' | 'gelinlik' | 'keten' | 'uniforma' | 'promo' | 'otel';
export const ALT_BASLIKLAR: Record<Konu, { h: Record<L10, string>; p: Record<L10, string> }[]> = {
 "genel": [
  {
   "h": {
    "tr": "Ne kadar sürede teslim edilir?",
    "en": "How long does it take?",
    "de": "Wie lange dauert es?",
    "ru": "Как быстро будет готово?",
    "es": "¿Cuánto tarda?",
    "fr": "Quel est le délai ?",
    "pl": "Ile to trwa?",
    "uk": "Скільки часу це займає?",
    "nl": "Hoe lang duurt het?",
    "ar": "كم تستغرق المدة؟"
   },
   "p": {
    "tr": "Acil tamir ve tadilat 1–2 saatte, normal tamir ve tadilat ertesi gün teslim edilir. Özel dikimde süre modele ve adede göre belirlenir.",
    "en": "Urgent repairs and alterations are ready in 1–2 hours; normal repairs and alterations are delivered the next day. For custom tailoring, the time depends on the model and quantity.",
    "de": "Dringende Reparaturen und Änderungen sind in 1–2 Stunden fertig, normale am nächsten Tag. Bei Maßanfertigung hängt die Dauer von Modell und Menge ab.",
    "ru": "Срочный ремонт и подгонка — за 1–2 часа, обычный — на следующий день. При индивидуальном пошиве срок зависит от модели и количества.",
    "es": "Los arreglos urgentes están listos en 1–2 horas y los normales se entregan al día siguiente. En la confección a medida, el plazo depende del modelo y de la cantidad.",
    "fr": "Les retouches urgentes sont prêtes en 1 à 2 heures, les retouches normales sont livrées le lendemain. Pour la couture sur mesure, le délai dépend du modèle et de la quantité.",
    "pl": "Pilne naprawy i przeróbki są gotowe w 1–2 godziny, zwykłe — następnego dnia. Przy szyciu na miarę czas zależy od modelu i ilości.",
    "uk": "Термінові ремонт і підгонка — за 1–2 години, звичайні — наступного дня. При індивідуальному пошиві строк залежить від моделі та кількості.",
    "nl": "Spoedreparaties en -aanpassingen zijn klaar in 1–2 uur, gewone de volgende dag. Bij maatwerk hangt de duur af van model en aantal.",
    "ar": "التصليحات والتعديلات العاجلة جاهزة خلال ساعة إلى ساعتين، والعادية تُسلَّم في اليوم التالي. أما التفصيل الخاص فتعتمد المدة على الموديل والكمية."
   }
  },
  {
   "h": {
    "tr": "Fiyatı önceden öğrenebilir miyim?",
    "en": "Can I find out the price in advance?",
    "de": "Kann ich den Preis vorab erfahren?",
    "ru": "Можно ли узнать цену заранее?",
    "es": "¿Puedo saber el precio de antemano?",
    "fr": "Puis-je connaître le prix à l’avance ?",
    "pl": "Czy mogę poznać cenę z góry?",
    "uk": "Чи можна дізнатися ціну заздалегідь?",
    "nl": "Kan ik de prijs vooraf weten?",
    "ar": "هل أستطيع معرفة السعر مسبقًا؟"
   },
   "p": {
    "tr": "Evet. Paça kısaltma ve bel daraltma ₺200'den, fermuar değişimi ₺300'den, gelinlik ve abiye tadilatı ₺800'den başlar. Kıyafetin fotoğrafını WhatsApp'tan göndererek net fiyat alabilirsiniz.",
    "en": "Yes. Hemming and waist taking-in start from ₺200, zipper replacement from ₺300, and wedding and evening dress alterations from ₺800. Send a photo of the garment on WhatsApp to get an exact price.",
    "de": "Ja. Saum kürzen und Bund enger machen ab ₺200, Reißverschluss-Wechsel ab ₺300, Änderungen an Brautkleid und Abendkleid ab ₺800. Schicken Sie ein Foto per WhatsApp, um den genauen Preis zu erhalten.",
    "ru": "Да. Подшив брюк и ушивание в талии — от ₺200, замена молнии — от ₺300, переделка свадебного и вечернего платья — от ₺800. Пришлите фото вещи в WhatsApp, и мы назовём точную цену.",
    "es": "Sí. Acortar bajos y ajustar la cintura desde ₺200, cambio de cremallera desde ₺300 y arreglos de vestidos de novia y de noche desde ₺800. Envíe una foto de la prenda por WhatsApp para recibir el precio exacto.",
    "fr": "Oui. Ourlet et ajustement de taille à partir de ₺200, remplacement de fermeture à glissière à partir de ₺300, retouches de robes de mariée et de soirée à partir de ₺800. Envoyez une photo du vêtement par WhatsApp pour obtenir le prix exact.",
    "pl": "Tak. Skracanie nogawek i zwężanie w talii od ₺200, wymiana zamka od ₺300, przeróbki sukni ślubnych i wieczorowych od ₺800. Wyślij zdjęcie ubrania przez WhatsApp, aby poznać dokładną cenę.",
    "uk": "Так. Підшивання штанів і звуження в талії — від ₺200, заміна блискавки — від ₺300, переробка весільних і вечірніх суконь — від ₺800. Надішліть фото речі у WhatsApp, щоб отримати точну ціну.",
    "nl": "Ja. Broekzoom en taille innemen vanaf ₺200, ritsvervanging vanaf ₺300, aanpassingen van bruids- en avondjurken vanaf ₺800. Stuur een foto van het kledingstuk via WhatsApp voor een exacte prijs.",
    "ar": "نعم. تقصير البنطلون وتضييق الخصر يبدآن من ₺200، واستبدال السحّاب من ₺300، وتعديل فساتين الزفاف والسهرة من ₺800. أرسل صورة القطعة عبر واتساب لتحصل على السعر الدقيق."
   }
  },
  {
   "h": {
    "tr": "Hangi saatlerde ve dillerde hizmet veriyorsunuz?",
    "en": "What are your hours and languages?",
    "de": "Öffnungszeiten und Sprachen?",
    "ru": "Часы работы и языки?",
    "es": "¿Horario e idiomas?",
    "fr": "Horaires et langues ?",
    "pl": "Godziny pracy i języki?",
    "uk": "Години роботи та мови?",
    "nl": "Openingstijden en talen?",
    "ar": "ساعات العمل واللغات؟"
   },
   "p": {
    "tr": "Her gün 08:00–23:00 arası hizmet veriyoruz. Türkçe, İngilizce, Rusça ve Almanca ile WhatsApp'tan yazabilirsiniz.",
    "en": "We are open every day from 08:00 to 23:00. You can message us on WhatsApp in Turkish, English, Russian or German.",
    "de": "Wir sind täglich von 08:00 bis 23:00 Uhr erreichbar. Per WhatsApp können Sie uns auf Türkisch, Englisch, Russisch oder Deutsch schreiben.",
    "ru": "Мы работаем ежедневно с 08:00 до 23:00. В WhatsApp можно писать на турецком, английском, русском или немецком.",
    "es": "Atendemos todos los días de 08:00 a 23:00. Puede escribirnos por WhatsApp en turco, inglés, ruso o alemán.",
    "fr": "Nous sommes ouverts tous les jours de 08h00 à 23h00. Vous pouvez nous écrire sur WhatsApp en turc, anglais, russe ou allemand.",
    "pl": "Pracujemy codziennie od 08:00 do 23:00. Możesz napisać do nas na WhatsApp po turecku, angielsku, rosyjsku lub niemiecku.",
    "uk": "Ми працюємо щодня з 08:00 до 23:00. У WhatsApp можна писати турецькою, англійською, російською або німецькою.",
    "nl": "We zijn elke dag open van 08:00 tot 23:00. U kunt ons via WhatsApp schrijven in het Turks, Engels, Russisch of Duits.",
    "ar": "نعمل يوميًا من 08:00 إلى 23:00. يمكنك مراسلتنا عبر واتساب بالتركية أو الإنجليزية أو الروسية أو الألمانية."
   }
  }
 ],
 "paca": [
  {
   "h": {
    "tr": "Paça boyu nasıl belirlenir?",
    "en": "How is the hem length decided?",
    "de": "Wie wird die Saumlänge festgelegt?",
    "ru": "Как определяют длину брюк?",
    "es": "¿Cómo se decide el largo del bajo?",
    "fr": "Comment la longueur de l’ourlet est-elle fixée ?",
    "pl": "Jak ustala się długość nogawki?",
    "uk": "Як визначають довжину штанів?",
    "nl": "Hoe wordt de zoomlengte bepaald?",
    "ar": "كيف يُحدَّد طول الحاشية؟"
   },
   "p": {
    "tr": "Pantolon, giyeceğiniz ayakkabıyla ayakta denenir ve boy sizin tercihinize göre işaretlenir. Spor ve klasik ayakkabı için boy farklı olabilir.",
    "en": "The trousers are tried on standing, with the shoes you will wear, and the length is marked to your preference. The length can differ for sneakers and dress shoes.",
    "de": "Die Hose wird im Stehen mit den Schuhen anprobiert, die Sie tragen werden, und die Länge nach Ihrem Wunsch markiert. Für Sneaker und klassische Schuhe kann die Länge unterschiedlich sein.",
    "ru": "Брюки примеряют стоя, в обуви, с которой вы их будете носить, и отмечают длину по вашему желанию. Для кроссовок и классической обуви длина может отличаться.",
    "es": "El pantalón se prueba de pie, con los zapatos que va a usar, y el largo se marca según su preferencia. El largo puede cambiar para zapatillas o zapatos de vestir.",
    "fr": "Le pantalon est essayé debout, avec les chaussures que vous porterez, et la longueur est marquée selon votre préférence. Elle peut différer pour des baskets ou des chaussures classiques.",
    "pl": "Spodnie przymierza się na stojąco, w butach, w których będą noszone, a długość zaznacza według Twoich preferencji. Dla sportowych i klasycznych butów długość może się różnić.",
    "uk": "Штани приміряють стоячи, у взутті, з яким їх носитимуть, і позначають довжину за вашим бажанням. Для кросівок і класичного взуття довжина може відрізнятися.",
    "nl": "De broek wordt staand gepast, met de schoenen die u gaat dragen, en de lengte wordt naar uw wens gemarkeerd. Voor sneakers en nette schoenen kan de lengte verschillen.",
    "ar": "يُجرَّب البنطلون واقفًا مع الحذاء الذي سترتديه، ويُعلَّم الطول حسب رغبتك. قد يختلف الطول بين الحذاء الرياضي والكلاسيكي."
   }
  },
  {
   "h": {
    "tr": "Paça kısaltma ne kadar sürer ve kaça yapılır?",
    "en": "How long does hemming take and what does it cost?",
    "de": "Wie lange dauert das Kürzen und was kostet es?",
    "ru": "Сколько занимает подшив и сколько стоит?",
    "es": "¿Cuánto tarda acortar el bajo y cuánto cuesta?",
    "fr": "Combien de temps et quel prix pour raccourcir un ourlet ?",
    "pl": "Ile trwa skracanie i ile kosztuje?",
    "uk": "Скільки триває підшивання і скільки коштує?",
    "nl": "Hoe lang duurt het korter maken en wat kost het?",
    "ar": "كم يستغرق التقصير وكم يكلّف؟"
   },
   "p": {
    "tr": "Paça kısaltma ₺200'den başlar. Acil işler 1–2 saatte, normal işler ertesi gün teslim edilir.",
    "en": "Hemming starts from ₺200. Urgent jobs are ready in 1–2 hours, normal jobs the next day.",
    "de": "Das Kürzen beginnt ab ₺200. Eilige Aufträge sind in 1–2 Stunden fertig, normale am nächsten Tag.",
    "ru": "Подшив брюк — от ₺200. Срочные заказы — за 1–2 часа, обычные — на следующий день.",
    "es": "Acortar el bajo cuesta desde ₺200. Los trabajos urgentes están listos en 1–2 horas y los normales al día siguiente.",
    "fr": "Le raccourcissement commence à ₺200. Les travaux urgents sont prêts en 1 à 2 heures, les autres le lendemain.",
    "pl": "Skracanie nogawek zaczyna się od ₺200. Pilne zlecenia są gotowe w 1–2 godziny, zwykłe następnego dnia.",
    "uk": "Підшивання штанів — від ₺200. Термінові замовлення — за 1–2 години, звичайні — наступного дня.",
    "nl": "Korter maken begint vanaf ₺200. Spoedwerk is klaar in 1–2 uur, gewoon werk de volgende dag.",
    "ar": "يبدأ تقصير الحاشية من ₺200. الأعمال العاجلة جاهزة خلال ساعة إلى ساعتين والعادية في اليوم التالي."
   }
  }
 ],
 "fermuar": [
  {
   "h": {
    "tr": "Fermuar tamir mi, değişim mi?",
    "en": "Repair or replacement?",
    "de": "Reparatur oder Austausch?",
    "ru": "Ремонт или замена?",
    "es": "¿Reparar o sustituir?",
    "fr": "Réparer ou remplacer ?",
    "pl": "Naprawa czy wymiana?",
    "uk": "Ремонт чи заміна?",
    "nl": "Repareren of vervangen?",
    "ar": "إصلاح أم استبدال؟"
   },
   "p": {
    "tr": "Dişler sağlam ve şerit yırtık değilse çoğu zaman yalnızca sürgü değişir ya da sıkışma giderilir. Dişler kopmuşsa veya şerit yırtılmışsa fermuarın tamamı değişir.",
    "en": "If the teeth are intact and the tape isn't torn, often only the slider is replaced or the jam is cleared. If teeth are missing or the tape is torn, the whole zipper is replaced.",
    "de": "Sind die Zähne intakt und das Band nicht gerissen, genügt oft ein neuer Schieber oder das Beheben des Klemmens. Fehlen Zähne oder ist das Band gerissen, wird der gesamte Reißverschluss ersetzt.",
    "ru": "Если зубцы целы, а лента не порвана, часто достаточно заменить бегунок или устранить заедание. Если зубцы выпали или лента порвана, молнию меняют полностью.",
    "es": "Si los dientes están intactos y la cinta no está rota, a menudo basta cambiar el cursor o desatascar la cremallera. Si faltan dientes o la cinta está rota, se cambia toda la cremallera.",
    "fr": "Si les dents sont intactes et le ruban n’est pas déchiré, il suffit souvent de changer le curseur ou de débloquer la fermeture. Si des dents manquent ou si le ruban est déchiré, la fermeture est remplacée en entier.",
    "pl": "Jeśli ząbki są całe, a taśma nie jest rozdarta, często wystarczy wymienić suwak lub usunąć zacięcie. Gdy brakuje ząbków lub taśma jest rozdarta, wymienia się cały zamek.",
    "uk": "Якщо зубці цілі, а стрічка не порвана, часто достатньо замінити бігунок або усунути заїдання. Якщо зубців бракує чи стрічка порвана, блискавку міняють повністю.",
    "nl": "Zijn de tanden heel en de tape niet gescheurd, dan volstaat vaak een nieuwe schuif of het losmaken van de blokkade. Ontbreken er tanden of is de tape gescheurd, dan wordt de hele rits vervangen.",
    "ar": "إذا كانت الأسنان سليمة والشريط غير ممزّق، يكفي غالبًا تبديل الزلّاجة أو إزالة الانحشار. وإذا كانت الأسنان مكسورة أو الشريط ممزّقًا، يُستبدل السحّاب كاملًا."
   }
  },
  {
   "h": {
    "tr": "Fermuar değişimi fiyatı ve süresi",
    "en": "Zipper replacement price and time",
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
    "en": "Zipper replacement starts from ₺300. Urgent jobs are ready in 1–2 hours, normal jobs the next day.",
    "de": "Der Austausch beginnt ab ₺300. Eilige Aufträge sind in 1–2 Stunden fertig, normale am nächsten Tag.",
    "ru": "Замена молнии — от ₺300. Срочные заказы — за 1–2 часа, обычные — на следующий день.",
    "es": "El cambio de cremallera cuesta desde ₺300. Los trabajos urgentes están listos en 1–2 horas y los normales al día siguiente.",
    "fr": "Le remplacement commence à ₺300. Les travaux urgents sont prêts en 1 à 2 heures, les autres le lendemain.",
    "pl": "Wymiana zamka zaczyna się od ₺300. Pilne zlecenia są gotowe w 1–2 godziny, zwykłe następnego dnia.",
    "uk": "Заміна блискавки — від ₺300. Термінові замовлення — за 1–2 години, звичайні — наступного дня.",
    "nl": "Ritsvervanging begint vanaf ₺300. Spoedwerk is klaar in 1–2 uur, gewoon werk de volgende dag.",
    "ar": "يبدأ استبدال السحّاب من ₺300. الأعمال العاجلة جاهزة خلال ساعة إلى ساعتين والعادية في اليوم التالي."
   }
  }
 ],
 "gelinlik": [
  {
   "h": {
    "tr": "Prova ne zaman yapılır?",
    "en": "When should the fittings be?",
    "de": "Wann sollten die Anproben stattfinden?",
    "ru": "Когда делать примерки?",
    "es": "¿Cuándo se hacen las pruebas?",
    "fr": "Quand faire les essayages ?",
    "pl": "Kiedy robić przymiarki?",
    "uk": "Коли робити примірки?",
    "nl": "Wanneer zijn de pasbeurten?",
    "ar": "متى تُجرى البروفات؟"
   },
   "p": {
    "tr": "Gelinlik ve abiyede boy, bel ve korse ayarı için düğünden birkaç hafta önce ilk provayı, düğüne yakın bir tarihte son provayı yapmanız önerilir.",
    "en": "For length, waist and bodice adjustments on a wedding or evening dress, we recommend a first fitting a few weeks before the event and a final fitting close to the date.",
    "de": "Für Länge, Taille und Mieder bei Braut- und Abendkleidern empfehlen wir die erste Anprobe einige Wochen vor dem Anlass und die letzte kurz davor.",
    "ru": "Для подгонки длины, талии и корсета свадебного или вечернего платья рекомендуем первую примерку за несколько недель до события, а финальную — ближе к дате.",
    "es": "Para ajustar largo, cintura y corpiño de vestidos de novia o de noche, recomendamos una primera prueba unas semanas antes del evento y una última cerca de la fecha.",
    "fr": "Pour ajuster longueur, taille et corset d’une robe de mariée ou de soirée, nous conseillons un premier essayage quelques semaines avant l’événement et un dernier à l’approche de la date.",
    "pl": "Przy dopasowaniu długości, talii i gorsetu sukni ślubnej lub wieczorowej zalecamy pierwszą przymiarkę na kilka tygodni przed wydarzeniem, a ostatnią tuż przed terminem.",
    "uk": "Для підгонки довжини, талії та корсета весільної чи вечірньої сукні радимо першу примірку за кілька тижнів до події, а останню — ближче до дати.",
    "nl": "Voor lengte, taille en lijfje van een bruids- of avondjurk raden we een eerste pasbeurt een paar weken voor het evenement aan en een laatste vlak voor de datum.",
    "ar": "لتعديل الطول والخصر والكورسيه في فستان الزفاف أو السهرة، ننصح ببروفة أولى قبل المناسبة بأسابيع وبروفة أخيرة قريبة من الموعد."
   }
  },
  {
   "h": {
    "tr": "Gelinlik ve abiye tadilatı fiyatı",
    "en": "Wedding and evening dress alteration price",
    "de": "Preis für Brautkleid- und Abendkleid-Änderungen",
    "ru": "Цена переделки свадебных и вечерних платьев",
    "es": "Precio de arreglos de vestidos de novia y de noche",
    "fr": "Prix des retouches de robes de mariée et de soirée",
    "pl": "Cena przeróbek sukni ślubnych i wieczorowych",
    "uk": "Ціна переробки весільних і вечірніх суконь",
    "nl": "Prijs voor aanpassingen van bruids- en avondjurken",
    "ar": "سعر تعديل فساتين الزفاف والسهرة"
   },
   "p": {
    "tr": "Gelinlik ve abiye tadilatı ₺800'den başlar. Kesin fiyat, kumaşa ve yapılacak işe göre ilk provada netleşir.",
    "en": "Wedding and evening dress alterations start from ₺800. The exact price is set at the first fitting, depending on the fabric and the work needed.",
    "de": "Änderungen an Braut- und Abendkleidern beginnen ab ₺800. Der genaue Preis wird bei der ersten Anprobe nach Stoff und Aufwand festgelegt.",
    "ru": "Переделка свадебных и вечерних платьев — от ₺800. Точная цена определяется на первой примерке в зависимости от ткани и объёма работ.",
    "es": "Los arreglos de vestidos de novia y de noche empiezan desde ₺800. El precio exacto se fija en la primera prueba, según la tela y el trabajo necesario.",
    "fr": "Les retouches de robes de mariée et de soirée commencent à ₺800. Le prix exact est fixé au premier essayage, selon le tissu et le travail à faire.",
    "pl": "Przeróbki sukni ślubnych i wieczorowych zaczynają się od ₺800. Dokładną cenę ustalamy na pierwszej przymiarce, w zależności od tkaniny i zakresu prac.",
    "uk": "Переробка весільних і вечірніх суконь — від ₺800. Точну ціну визначають на першій примірці залежно від тканини та обсягу робіт.",
    "nl": "Aanpassingen van bruids- en avondjurken beginnen vanaf ₺800. De exacte prijs wordt bij de eerste pasbeurt vastgesteld, afhankelijk van stof en werk.",
    "ar": "يبدأ تعديل فساتين الزفاف والسهرة من ₺800. يُحدَّد السعر الدقيق في البروفة الأولى حسب القماش والعمل المطلوب."
   }
  }
 ],
 "keten": [
  {
   "h": {
    "tr": "Keten çeker mi?",
    "en": "Does linen shrink?",
    "de": "Läuft Leinen ein?",
    "ru": "Садится ли лён?",
    "es": "¿Encoge el lino?",
    "fr": "Le lin rétrécit-il ?",
    "pl": "Czy len się kurczy?",
    "uk": "Чи сідає льон?",
    "nl": "Krimpt linnen?",
    "ar": "هل ينكمش الكتان؟"
   },
   "p": {
    "tr": "Keten, özellikle ilk yıkamada çekebilir. Dikimden önce kumaşın ön yıkamasının yapılması, bitmiş kıyafetin boyunun ve bedeninin sonradan değişmesini önler.",
    "en": "Linen can shrink, especially in the first wash. Pre-washing the fabric before sewing prevents the finished garment's length and fit from changing later.",
    "de": "Leinen kann besonders beim ersten Waschen einlaufen. Eine Vorwäsche des Stoffes vor dem Nähen verhindert, dass sich Länge und Passform des fertigen Kleidungsstücks später ändern.",
    "ru": "Лён может садиться, особенно при первой стирке. Предварительная стирка ткани перед пошивом не даёт готовой вещи изменить длину и посадку.",
    "es": "El lino puede encoger, sobre todo en el primer lavado. Prelavar la tela antes de coser evita que el largo y el ajuste de la prenda terminada cambien después.",
    "fr": "Le lin peut rétrécir, surtout au premier lavage. Prélaver le tissu avant la couture évite que la longueur et la coupe du vêtement fini changent par la suite.",
    "pl": "Len może się kurczyć, zwłaszcza przy pierwszym praniu. Wstępne pranie tkaniny przed szyciem zapobiega zmianie długości i dopasowania gotowego ubrania.",
    "uk": "Льон може сідати, особливо при першому пранні. Попереднє прання тканини перед пошивом не дає готовій речі змінити довжину й посадку.",
    "nl": "Linnen kan krimpen, vooral bij de eerste wasbeurt. Het stof voorwassen vóór het naaien voorkomt dat lengte en pasvorm van het afgewerkte kledingstuk later veranderen.",
    "ar": "قد ينكمش الكتان، خاصة عند أول غسلة. غسل القماش مسبقًا قبل الخياطة يمنع تغيّر طول القطعة ومقاسها بعد الانتهاء."
   }
  },
  {
   "h": {
    "tr": "Özel dikimde süre ve fiyat",
    "en": "Time and price for custom tailoring",
    "de": "Dauer und Preis bei Maßanfertigung",
    "ru": "Срок и цена индивидуального пошива",
    "es": "Plazo y precio de la confección a medida",
    "fr": "Délai et prix de la couture sur mesure",
    "pl": "Czas i cena szycia na miarę",
    "uk": "Строк і ціна індивідуального пошиву",
    "nl": "Doorlooptijd en prijs van maatwerk",
    "ar": "مدة وسعر التفصيل الخاص"
   },
   "p": {
    "tr": "Özel dikimde süre ve fiyat modele, kumaşa ve adede göre belirlenir; dikime başlamadan önce net olarak konuşulur.",
    "en": "For custom tailoring, time and price depend on the model, fabric and quantity, and are agreed clearly before sewing begins.",
    "de": "Bei Maßanfertigung hängen Dauer und Preis von Modell, Stoff und Menge ab und werden vor Nähbeginn klar besprochen.",
    "ru": "При индивидуальном пошиве срок и цена зависят от модели, ткани и количества и обсуждаются до начала работы.",
    "es": "En la confección a medida, el plazo y el precio dependen del modelo, la tela y la cantidad, y se acuerdan claramente antes de empezar a coser.",
    "fr": "Pour la couture sur mesure, le délai et le prix dépendent du modèle, du tissu et de la quantité, et sont précisés avant de commencer.",
    "pl": "Przy szyciu na miarę czas i cena zależą od modelu, tkaniny i ilości i są ustalane jasno przed rozpoczęciem szycia.",
    "uk": "При індивідуальному пошиві строк і ціна залежать від моделі, тканини та кількості й обговорюються до початку роботи.",
    "nl": "Bij maatwerk hangen tijd en prijs af van model, stof en aantal en worden duidelijk afgesproken voordat het naaien begint.",
    "ar": "في التفصيل الخاص تعتمد المدة والسعر على الموديل والقماش والكمية، ويُتَّفق عليهما بوضوح قبل بدء الخياطة."
   }
  }
 ],
 "uniforma": [
  {
   "h": {
    "tr": "Üniforma siparişinde ne gerekir?",
    "en": "What do I need for a uniform order?",
    "de": "Was brauche ich für eine Uniformbestellung?",
    "ru": "Что нужно для заказа униформы?",
    "es": "¿Qué necesito para pedir uniformes?",
    "fr": "De quoi ai-je besoin pour commander des uniformes ?",
    "pl": "Czego potrzeba do zamówienia uniformów?",
    "uk": "Що потрібно для замовлення уніформи?",
    "nl": "Wat is nodig voor een uniformbestelling?",
    "ar": "ماذا أحتاج لطلب الزي الموحّد؟"
   },
   "p": {
    "tr": "Model, adet, beden listesi ve varsa logo bilgisi yeterlidir. Seri üretimden önce numune üzerinde ölçü ve görünüm onaylanır.",
    "en": "The model, quantity, size list and logo (if any) are enough. Before serial production, size and appearance are approved on a sample.",
    "de": "Modell, Menge, Größenliste und gegebenenfalls das Logo genügen. Vor der Serienproduktion werden Größe und Aussehen an einem Muster freigegeben.",
    "ru": "Достаточно модели, количества, списка размеров и логотипа (если есть). Перед серийным производством размер и вид утверждаются на образце.",
    "es": "Bastan el modelo, la cantidad, la lista de tallas y el logotipo, si lo hay. Antes de la producción en serie se aprueban medidas y aspecto en una muestra.",
    "fr": "Le modèle, la quantité, la liste des tailles et le logo éventuel suffisent. Avant la production en série, taille et aspect sont validés sur un échantillon.",
    "pl": "Wystarczą model, ilość, lista rozmiarów i ewentualne logo. Przed produkcją seryjną rozmiar i wygląd zatwierdza się na próbce.",
    "uk": "Достатньо моделі, кількості, списку розмірів і логотипа (за наявності). Перед серійним виробництвом розмір і вигляд затверджують на зразку.",
    "nl": "Model, aantal, maatlijst en eventueel een logo volstaan. Vóór de serieproductie worden maat en uiterlijk op een voorbeeld goedgekeurd.",
    "ar": "يكفي تحديد الموديل والكمية وقائمة المقاسات والشعار إن وُجد. قبل الإنتاج بالجملة تُعتمد المقاسات والمظهر على نموذج."
   }
  },
  {
   "h": {
    "tr": "Süre ve teklif",
    "en": "Time and quote",
    "de": "Dauer und Angebot",
    "ru": "Срок и предложение",
    "es": "Plazo y presupuesto",
    "fr": "Délai et devis",
    "pl": "Czas i wycena",
    "uk": "Строк і пропозиція",
    "nl": "Doorlooptijd en offerte",
    "ar": "المدة وعرض السعر"
   },
   "p": {
    "tr": "Üretim süresi modele ve adede göre belirlenir. Teklif için model, adet ve logo bilgisini WhatsApp'tan göndermeniz yeterli.",
    "en": "Production time depends on the model and quantity. To get a quote, send the model, quantity and logo on WhatsApp.",
    "de": "Die Produktionsdauer hängt von Modell und Menge ab. Für ein Angebot senden Sie Modell, Menge und Logo per WhatsApp.",
    "ru": "Срок производства зависит от модели и количества. Для расчёта пришлите в WhatsApp модель, количество и логотип.",
    "es": "El plazo de producción depende del modelo y de la cantidad. Para un presupuesto, envíe por WhatsApp el modelo, la cantidad y el logotipo.",
    "fr": "Le délai de production dépend du modèle et de la quantité. Pour un devis, envoyez le modèle, la quantité et le logo par WhatsApp.",
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
    "tr": "Teklif için ne göndermeliyim?",
    "en": "What should I send to get a quote?",
    "de": "Was sende ich für ein Angebot?",
    "ru": "Что прислать для расчёта?",
    "es": "¿Qué envío para recibir un presupuesto?",
    "fr": "Que dois-je envoyer pour un devis ?",
    "pl": "Co wysłać, aby otrzymać wycenę?",
    "uk": "Що надіслати для розрахунку?",
    "nl": "Wat stuur ik voor een offerte?",
    "ar": "ماذا أرسل للحصول على عرض سعر؟"
   },
   "p": {
    "tr": "Logo veya tasarım dosyanızı, istediğiniz ürünü ve yaklaşık adedi gönderin. Elinizde yalnızca bir fikir ya da örnek fotoğraf varsa o da yeterli.",
    "en": "Send your logo or design file, the product you want and the approximate quantity. An idea or a reference photo is enough too.",
    "de": "Senden Sie Ihre Logo- oder Designdatei, das gewünschte Produkt und die ungefähre Menge. Auch eine Idee oder ein Beispielfoto genügt.",
    "ru": "Пришлите файл с логотипом или дизайном, нужное изделие и примерное количество. Достаточно и идеи или фото-примера.",
    "es": "Envíe su archivo de logotipo o diseño, el producto que desea y la cantidad aproximada. También basta una idea o una foto de referencia.",
    "fr": "Envoyez votre fichier de logo ou de design, le produit souhaité et la quantité approximative. Une idée ou une photo de référence suffit aussi.",
    "pl": "Wyślij plik z logo lub projektem, wybrany produkt i przybliżoną ilość. Wystarczy też pomysł lub zdjęcie przykładowe.",
    "uk": "Надішліть файл із логотипом чи дизайном, потрібний виріб і приблизну кількість. Достатньо й ідеї або фото-прикладу.",
    "nl": "Stuur uw logo- of ontwerpbestand, het gewenste product en het geschatte aantal. Een idee of voorbeeldfoto is ook genoeg.",
    "ar": "أرسل ملف الشعار أو التصميم والمنتج المطلوب والكمية التقريبية. تكفي أيضًا فكرة أو صورة مرجعية."
   }
  },
  {
   "h": {
    "tr": "Baskı çeşidi nasıl seçilir?",
    "en": "How is the print type chosen?",
    "de": "Wie wird die Druckart gewählt?",
    "ru": "Как выбирают вид печати?",
    "es": "¿Cómo se elige el tipo de impresión?",
    "fr": "Comment choisir le type d’impression ?",
    "pl": "Jak wybiera się rodzaj nadruku?",
    "uk": "Як обирають вид друку?",
    "nl": "Hoe wordt het printtype gekozen?",
    "ar": "كيف يُختار نوع الطباعة؟"
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
    "tr": "Otele gelen terzi nasıl çalışır?",
    "en": "How does the hotel tailor service work?",
    "de": "Wie funktioniert der Hotel-Schneider?",
    "ru": "Как работает портной с выездом в отель?",
    "es": "¿Cómo funciona el sastre a domicilio en hoteles?",
    "fr": "Comment fonctionne le tailleur à l’hôtel ?",
    "pl": "Jak działa krawiec dojeżdżający do hotelu?",
    "uk": "Як працює кравець із виїздом до готелю?",
    "nl": "Hoe werkt de hotelkleermaker?",
    "ar": "كيف يعمل الخيّاط الذي يأتي إلى الفندق؟"
   },
   "p": {
    "tr": "Terzi otelinize gelir, ölçü alır, gerekirse kıyafeti atölyeye götürür ve tadilat bitince otelinize teslim eder. Randevu için WhatsApp'tan yazmanız yeterli.",
    "en": "The tailor comes to your hotel, takes measurements, takes the garment to the workshop if needed and delivers it back to your hotel when finished. Just message us on WhatsApp to book.",
    "de": "Der Schneider kommt in Ihr Hotel, nimmt Maß, bringt das Kleidungsstück bei Bedarf ins Atelier und liefert es nach der Änderung zurück ins Hotel. Zur Terminvereinbarung schreiben Sie uns einfach per WhatsApp.",
    "ru": "Портной приезжает в ваш отель, снимает мерки, при необходимости забирает вещь в ателье и после работы возвращает её в отель. Для записи достаточно написать в WhatsApp.",
    "es": "El sastre va a su hotel, toma medidas, lleva la prenda al taller si hace falta y la devuelve al hotel al terminar. Para reservar basta con escribirnos por WhatsApp.",
    "fr": "Le tailleur se rend à votre hôtel, prend les mesures, emporte le vêtement à l’atelier si besoin et le rapporte à l’hôtel une fois terminé. Pour réserver, écrivez-nous simplement sur WhatsApp.",
    "pl": "Krawiec przyjeżdża do Twojego hotelu, zdejmuje miary, w razie potrzeby zabiera ubranie do pracowni i po skończeniu odwozi je do hotelu. Aby umówić wizytę, wystarczy napisać na WhatsApp.",
    "uk": "Кравець приїздить до вашого готелю, знімає мірки, за потреби забирає річ в ательє й після роботи повертає її в готель. Для запису достатньо написати у WhatsApp.",
    "nl": "De kleermaker komt naar uw hotel, neemt maat, brengt het kledingstuk indien nodig naar het atelier en levert het na afloop terug in het hotel. Stuur ons voor een afspraak gewoon een WhatsApp-bericht.",
    "ar": "يأتي الخيّاط إلى فندقك ويأخذ المقاسات ويحمل القطعة إلى الورشة عند الحاجة ثم يُعيدها إلى الفندق بعد الانتهاء. للحجز يكفي أن تراسلنا عبر واتساب."
   }
  },
  {
   "h": {
    "tr": "Otel alım ve teslim ücretsiz mi?",
    "en": "Are hotel pickup and delivery free?",
    "de": "Sind Abholung und Lieferung im Hotel kostenlos?",
    "ru": "Бесплатны ли забор и доставка в отеле?",
    "es": "¿Son gratuitas la recogida y la entrega en el hotel?",
    "fr": "La prise en charge et la livraison à l’hôtel sont-elles gratuites ?",
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
  }
 ]
};
