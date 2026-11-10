// Sayfa alt başlıkları (H2) + kısa açıklamalar, 10 dilde. {y} = yer adı (varsayılan: Antalya).
// Yalnızca doğrulanmış bilgiler: paça/bel ₺200+, fermuar ₺300+, gelinlik/abiye fotoğrafa veya işin detayına göre, acil 1–2 saat, normal aynı gün,
// özel dikim modele/adede göre, her gün 08:00–23:00, WhatsApp'tan fotoğrafla fiyat, hizmet verilen bölgelerde otel alım-teslim.
export type L10 = 'tr' | 'en' | 'de' | 'ru' | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
export type Konu = 'genel' | 'paca' | 'fermuar' | 'gelinlik' | 'keten' | 'uniforma' | 'promo' | 'otel' | 'terzi' | 'fiyat' | 'hizmet' | 'bolge' | 'terziFp' | 'hizmetFp';
type Item = { h: Record<L10, string>; p: Record<L10, string> };
const BASE: Record<Exclude<Konu, 'terziFp' | 'hizmetFp'>, Item[]> = {
 "paca": [
  {
   "h": {
    "tr": "{y} paça kısaltma kaç TL, ne zaman hazır olur?",
    "en": "Trouser hemming in {y}: what it costs and when it is ready",
    "de": "Hose kürzen in {y}: Was kostet es, wann ist es fertig?",
    "ru": "Подшив брюк в {y}: сколько стоит и когда готово",
    "es": "Acortar bajos de pantalón en {y}: cuánto cuesta y cuándo está listo",
    "fr": "Ourlet de pantalon à {y} : combien ça coûte et quand c'est prêt",
    "pl": "Skracanie spodni w {y}: ile kosztuje i kiedy będzie gotowe",
    "uk": "Підшивання штанів у {y}: скільки коштує і коли буде готово",
    "nl": "Broek korter maken in {y}: wat kost het en wanneer is het klaar?",
    "ar": "تقصير البنطلون في {y}: كم يكلّف ومتى يكون جاهزاً؟"
   },
   "p": {
    "tr": "Başlangıç fiyatı ₺200'dür (KDV hariç). Normal işler aynı gün, acil işler 1–2 saatte hazır olur; süre işin durumuna göre değişir.",
    "en": "Prices start from €10, excluding VAT. Normal jobs are ready the same day and urgent ones in 1–2 hours, depending on the job.",
    "de": "Ab €10, zzgl. MwSt. Normale Arbeiten sind am selben Tag fertig, eilige in 1–2 Stunden, je nach Arbeit.",
    "ru": "От €10, без НДС. Обычные работы готовы в тот же день, срочные — за 1–2 часа, в зависимости от работы.",
    "es": "Desde €10, IVA no incluido. Los trabajos normales están listos el mismo día y los urgentes en 1–2 horas, según el trabajo.",
    "fr": "Dès €10, hors TVA. Les travaux normaux sont prêts le jour même et les urgents en 1 à 2 heures, selon le travail.",
    "pl": "Od €10, bez VAT. Zwykłe prace są gotowe tego samego dnia, pilne w 1–2 godziny, zależnie od pracy.",
    "uk": "Від €10, без ПДВ. Звичайні роботи готові того ж дня, термінові — за 1–2 години, залежно від роботи.",
    "nl": "Vanaf €10, excl. btw. Gewoon werk is dezelfde dag klaar en spoed in 1–2 uur, afhankelijk van het werk.",
    "ar": "من €10، غير شامل الضريبة. الأعمال العادية جاهزة في اليوم نفسه والمستعجلة خلال 1–2 ساعة، حسب العمل."
   }
  },
  {
   "h": {
    "tr": "Paça boyunu kim belirliyor?",
    "en": "Who decides the trouser length?",
    "de": "Wer legt die Hosenlänge fest?",
    "ru": "Кто определяет длину брюк?",
    "es": "¿Quién decide el largo del pantalón?",
    "fr": "Qui décide de la longueur du pantalon ?",
    "pl": "Kto decyduje o długości spodni?",
    "uk": "Хто визначає довжину штанів?",
    "nl": "Wie bepaalt de broeklengte?",
    "ar": "من يحدد طول البنطلون؟"
   },
   "p": {
    "tr": "Siz belirlersiniz. Pantolonu en çok giyeceğiniz ayakkabıyla deneyin; boy ayakta işaretlenir. Topuklu, klasik ve spor ayakkabıda doğru boy aynı değildir.",
    "en": "You do. Try the trousers on with the shoes you will wear most; the length is marked while you stand. Heels, dress shoes and sneakers each need a different length.",
    "de": "Sie selbst. Probieren Sie die Hose mit den Schuhen an, die Sie am häufigsten dazu tragen; die Länge wird im Stehen markiert. Absatz, Lederschuh und Sneaker brauchen jeweils eine andere Länge.",
    "ru": "Вы сами. Примерьте брюки с той обувью, с которой будете носить их чаще всего; длину отмечаем стоя. Для каблуков, классической обуви и кроссовок длина разная.",
    "es": "Usted. Pruébese el pantalón con los zapatos que más vaya a llevar; el largo se marca de pie. Tacón, zapato de vestir y zapatilla piden largos distintos.",
    "fr": "Vous. Essayez le pantalon avec les chaussures que vous porterez le plus ; la longueur est marquée debout. Talons, chaussures de ville et baskets demandent des longueurs différentes.",
    "pl": "Ty. Przymierz spodnie z butami, które będziesz do nich nosić najczęściej; długość zaznaczamy na stojąco. Obcasy, buty eleganckie i sportowe wymagają różnej długości.",
    "uk": "Ви самі. Приміряйте штани з тим взуттям, з яким носитимете їх найчастіше; довжину позначаємо стоячи. Для підборів, класичного взуття і кросівок довжина різна.",
    "nl": "U zelf. Pas de broek met de schoenen die u er het meest bij draagt; de lengte wordt staand afgemerkt. Hakken, nette schoenen en sneakers vragen elk een andere lengte.",
    "ar": "أنت. جرّب البنطلون مع الحذاء الذي سترتديه معه غالباً؛ نحدد الطول وأنت واقف. الكعب والحذاء الرسمي والحذاء الرياضي لكلٍّ منها طول مختلف."
   }
  },
  {
   "h": {
    "tr": "Beli bol gelen pantolon",
    "en": "Trousers too loose at the waist",
    "de": "Hose am Bund zu weit",
    "ru": "Брюки велики в поясе",
    "es": "Pantalón ancho de cintura",
    "fr": "Pantalon trop large à la taille",
    "pl": "Spodnie za szerokie w pasie",
    "uk": "Штани завеликі в поясі",
    "nl": "Broek te wijd in de taille",
    "ar": "بنطلون واسع عند الخصر"
   },
   "p": {
    "tr": "Bel daraltma ₺200'den başlar. Ne kadar daraltılacağını yazıp fotoğrafı WhatsApp'tan gönderin, net fiyatı öğrenin.",
    "en": "Taking in the waist starts from €10. Tell us how much it should come in and send a photo on WhatsApp for the exact price.",
    "de": "Bund enger machen ab €10. Schreiben Sie, wie viel enger es werden soll, und schicken Sie ein Foto per WhatsApp; dann nennen wir den genauen Preis.",
    "ru": "Ушивание в поясе — от €10. Напишите, на сколько нужно ушить, и пришлите фото в WhatsApp — назовём точную цену.",
    "es": "Estrechar la cintura cuesta desde €10. Díganos cuánto hay que estrechar y envíe una foto por WhatsApp para saber el precio exacto.",
    "fr": "La reprise de taille commence à €10. Dites-nous de combien il faut reprendre et envoyez une photo sur WhatsApp pour connaître le prix exact.",
    "pl": "Zwężenie w pasie kosztuje od €10. Napisz, o ile zwęzić, i wyślij zdjęcie na WhatsAppie, a podamy dokładną cenę.",
    "uk": "Вшивання в поясі — від €10. Напишіть, на скільки потрібно вшити, і надішліть фото у WhatsApp — назвемо точну ціну.",
    "nl": "De taille nauwer maken kost vanaf €10. Laat weten hoeveel het nauwer moet en stuur een foto via WhatsApp voor de exacte prijs.",
    "ar": "تضييق الخصر يبدأ من €10. أخبرنا بمقدار التضييق وأرسل صورة عبر واتساب لتعرف السعر الدقيق."
   }
  }
 ],
 "fermuar": [
  {
   "h": {
    "tr": "{y} bozulan fermuar: onarılır mı, değişir mi?",
    "en": "Broken zipper in {y}: repair it or replace it?",
    "de": "Reißverschluss defekt in {y}: reparieren oder ersetzen?",
    "ru": "Сломалась молния в {y}: чинить или менять?",
    "es": "Cremallera rota en {y}: ¿se repara o se cambia?",
    "fr": "Fermeture éclair cassée à {y} : réparer ou remplacer ?",
    "pl": "Zepsuty zamek w {y}: naprawić czy wymienić?",
    "uk": "Зламалася блискавка в {y}: лагодити чи міняти?",
    "nl": "Rits kapot in {y}: repareren of vervangen?",
    "ar": "سحاب مكسور في {y}: إصلاح أم استبدال؟"
   },
   "p": {
    "tr": "Sorun sürgüdeyse çoğu zaman yalnızca sürgü yenilenir. Diş eksikse ya da fermuar şeridi yırtıksa fermuar baştan sona değiştirilir. Fotoğrafa bakıp hangisi olduğunu söyleriz.",
    "en": "If the slider is the problem, usually only the slider is renewed. If teeth are missing or the tape is torn, the zipper is replaced from end to end. We tell you which from a photo.",
    "de": "Liegt es am Schieber, wird meist nur der Schieber erneuert. Fehlen Zähne oder ist das Band gerissen, wird der Reißverschluss komplett ersetzt. Was nötig ist, sagen wir Ihnen nach Foto.",
    "ru": "Если дело в бегунке, обычно меняем только его. Если не хватает зубцов или порвана тесьма, молнию меняем целиком. Что именно нужно, скажем по фото.",
    "es": "Si el problema está en el cursor, normalmente solo se cambia el cursor. Si faltan dientes o la cinta está rota, la cremallera se cambia entera. Se lo decimos al ver la foto.",
    "fr": "Si le problème vient du curseur, on ne change en général que le curseur. S'il manque des dents ou si le ruban est déchiré, la fermeture est remplacée entièrement. Nous vous le disons d'après la photo.",
    "pl": "Jeśli problem tkwi w suwaku, zwykle wymieniamy tylko suwak. Gdy brakuje ząbków albo taśma jest rozdarta, wymieniamy cały zamek. Co jest potrzebne, powiemy po obejrzeniu zdjęcia.",
    "uk": "Якщо справа в бігунку, зазвичай міняємо лише його. Якщо бракує зубців або порвана тасьма, блискавку міняємо повністю. Що саме потрібно, скажемо за фото.",
    "nl": "Ligt het aan de schuiver, dan wordt meestal alleen de schuiver vernieuwd. Ontbreken er tanden of is het band gescheurd, dan wordt de hele rits vervangen. Wat nodig is, zeggen wij aan de hand van de foto.",
    "ar": "إذا كانت المشكلة في المنزلق فغالباً يُستبدل المنزلق فقط. وإذا كانت الأسنان ناقصة أو الشريط ممزقاً يُستبدل السحاب كاملاً. نخبرك بما يلزم بعد رؤية الصورة."
   }
  },
  {
   "h": {
    "tr": "Fermuar değişimi kaç TL?",
    "en": "What does zipper replacement cost?",
    "de": "Was kostet ein neuer Reißverschluss?",
    "ru": "Сколько стоит замена молнии?",
    "es": "¿Cuánto cuesta cambiar una cremallera?",
    "fr": "Combien coûte un changement de fermeture éclair ?",
    "pl": "Ile kosztuje wymiana zamka?",
    "uk": "Скільки коштує заміна блискавки?",
    "nl": "Wat kost een nieuwe rits?",
    "ar": "كم يكلّف استبدال السحاب؟"
   },
   "p": {
    "tr": "₺300'den başlar (KDV hariç); fermuarın boyu ve giysinin türü fiyatı etkiler. Normal işler aynı gün, acil işler 1–2 saatte hazır olur.",
    "en": "From €15, excluding VAT; coats and jackets from €20. Zipper length and garment type affect the price. Normal jobs are ready the same day, urgent ones in 1–2 hours.",
    "de": "Ab €15, zzgl. MwSt.; Mäntel und Jacken ab €20. Länge des Reißverschlusses und Art des Kleidungsstücks beeinflussen den Preis. Normale Arbeiten am selben Tag, eilige in 1–2 Stunden.",
    "ru": "От €15, без НДС; куртки и пальто — от €20. Цена зависит от длины молнии и вида одежды. Обычные работы — в тот же день, срочные — за 1–2 часа.",
    "es": "Desde €15, IVA no incluido; en abrigos y chaquetas desde €20. El largo de la cremallera y el tipo de prenda influyen en el precio. Trabajos normales el mismo día, urgentes en 1–2 horas.",
    "fr": "Dès €15, hors TVA ; manteaux et vestes dès €20. La longueur de la fermeture et le type de vêtement influencent le prix. Travaux normaux le jour même, urgents en 1 à 2 heures.",
    "pl": "Od €15, bez VAT; w płaszczach i kurtkach od €20. Na cenę wpływają długość zamka i rodzaj ubrania. Zwykłe prace tego samego dnia, pilne w 1–2 godziny.",
    "uk": "Від €15, без ПДВ; на пальтах і куртках — від €20. Ціна залежить від довжини блискавки та виду одягу. Звичайні роботи — того ж дня, термінові — за 1–2 години.",
    "nl": "Vanaf €15, excl. btw; jassen en mantels vanaf €20. De lengte van de rits en het soort kledingstuk bepalen de prijs. Gewoon werk dezelfde dag, spoed in 1–2 uur.",
    "ar": "من €15، غير شامل الضريبة؛ وفي المعاطف والسترات من €20. طول السحاب ونوع القطعة يؤثران في السعر. الأعمال العادية في اليوم نفسه والمستعجلة خلال 1–2 ساعة."
   }
  },
  {
   "h": {
    "tr": "Hangi ürünlerde fermuar değişir?",
    "en": "Which items can get a new zipper?",
    "de": "An welchen Stücken wechseln wir den Reißverschluss?",
    "ru": "На каких вещах меняем молнию?",
    "es": "¿En qué prendas se cambia la cremallera?",
    "fr": "Sur quels articles change-t-on la fermeture ?",
    "pl": "W jakich rzeczach wymieniamy zamek?",
    "uk": "На яких речах міняємо блискавку?",
    "nl": "Bij welke artikelen vervangen wij de rits?",
    "ar": "في أي القطع نستبدل السحاب؟"
   },
   "p": {
    "tr": "Pantolon, etek, elbise, ceket, mont ve çantada değişir. Emin değilseniz ürünün fotoğrafını WhatsApp'tan gönderin; yapılıp yapılamayacağını yazarız.",
    "en": "Trousers, skirts, dresses, jackets, coats and bags. If you are not sure, send a photo on WhatsApp and we will tell you whether it can be done.",
    "de": "An Hosen, Röcken, Kleidern, Jacken, Mänteln und Taschen. Wenn Sie unsicher sind, schicken Sie ein Foto per WhatsApp; wir schreiben Ihnen, ob es möglich ist.",
    "ru": "На брюках, юбках, платьях, пиджаках, куртках и сумках. Если не уверены, пришлите фото в WhatsApp — напишем, возможно ли это.",
    "es": "En pantalones, faldas, vestidos, chaquetas, abrigos y bolsos. Si no está seguro, envíe una foto por WhatsApp y le decimos si se puede hacer.",
    "fr": "Sur les pantalons, jupes, robes, vestes, manteaux et sacs. En cas de doute, envoyez une photo sur WhatsApp et nous vous disons si c'est faisable.",
    "pl": "W spodniach, spódnicach, sukienkach, marynarkach, kurtkach i torbach. Jeśli nie masz pewności, wyślij zdjęcie na WhatsAppie, a napiszemy, czy da się to zrobić.",
    "uk": "На штанах, спідницях, сукнях, піджаках, куртках і сумках. Якщо не впевнені, надішліть фото у WhatsApp — напишемо, чи це можливо.",
    "nl": "Bij broeken, rokken, jurken, jassen, mantels en tassen. Twijfelt u, stuur dan een foto via WhatsApp en wij laten weten of het kan.",
    "ar": "في البناطيل والتنانير والفساتين والسترات والمعاطف والحقائب. إن لم تكن متأكداً فأرسل صورة عبر واتساب ونخبرك إن كان ذلك ممكناً."
   }
  }
 ],
 "gelinlik": [
  {
   "h": {
    "tr": "{y} abiye tadilatı nasıl fiyatlanır?",
    "en": "How are evening dress alterations priced in {y}?",
    "de": "Wie wird die Änderung eines Abendkleids in {y} berechnet?",
    "ru": "Как считается цена переделки вечернего платья в {y}?",
    "es": "¿Cómo se presupuesta el arreglo de un vestido de fiesta en {y}?",
    "fr": "Comment est chiffrée la retouche d'une robe de soirée à {y} ?",
    "pl": "Jak wyceniamy przeróbkę sukni wieczorowej w {y}?",
    "uk": "Як рахується ціна переробки вечірньої сукні в {y}?",
    "nl": "Hoe wordt het vermaken van een avondjurk in {y} berekend?",
    "ar": "كيف يُحسب سعر تعديل فستان السهرة في {y}؟"
   },
   "p": {
    "tr": "Abiye, gelinlik ve elbise tadilatı fotoğrafa veya işin detayına göre fiyatlanır. Kesin fiyat, kumaşa ve yapılacak işe göre ilk provada netleşir.",
    "en": "Evening gown, wedding dress and dress alterations are priced by photo or job detail. The exact price is set at the first fitting, depending on fabric and the work needed.",
    "de": "Änderungen an Abend-, Braut- und Kleidern werden nach Foto oder Aufwand berechnet. Den genauen Preis legen wir bei der ersten Anprobe nach Stoff und Aufwand fest.",
    "ru": "Переделка вечерних, свадебных платьев и платьев — цена по фото или объёму работ. Точная цена определяется на первой примерке в зависимости от ткани и объёма работ.",
    "es": "Los arreglos de vestidos de noche, de novia y de vestir se presupuestan según la foto o el trabajo. El precio exacto se fija en la primera prueba, según la tela y el trabajo.",
    "fr": "Les retouches de robes de soirée, de mariée et d’habillées sont chiffrées selon la photo ou le travail. Le prix exact est fixé au premier essayage, selon le tissu et le travail.",
    "pl": "Przeróbki sukni wieczorowych, ślubnych i sukienek wyceniamy na podstawie zdjęcia lub zakresu prac. Dokładną cenę ustalamy na pierwszej przymiarce, zależnie od tkaniny i zakresu prac.",
    "uk": "Переробка вечірніх, весільних суконь і суконь — ціна за фото або обсягом робіт. Точну ціну визначають на першій примірці залежно від тканини та обсягу робіт.",
    "nl": "Aanpassingen van avond-, bruids- en gewone jurken worden geprijsd op foto of omvang van het werk. De exacte prijs wordt bij de eerste pasbeurt bepaald, afhankelijk van stof en werk.",
    "ar": "يبدأ تعديل فساتين السهرة والزفاف والفساتين حسب الصورة أو تفاصيل العمل. يُحدَّد السعر الدقيق في البروفة الأولى حسب القماش والعمل."
   }
  },
  {
   "h": {
    "tr": "Abiye ya da gelinlik için ne zaman gelmeliyim?",
    "en": "When should I come in for an evening or wedding dress?",
    "de": "Wann sollte ich mit Abend- oder Brautkleid kommen?",
    "ru": "Когда приходить с вечерним или свадебным платьем?",
    "es": "¿Cuándo debo ir con un vestido de fiesta o de novia?",
    "fr": "Quand venir avec une robe de soirée ou de mariée ?",
    "pl": "Kiedy przyjść z suknią wieczorową lub ślubną?",
    "uk": "Коли приходити з вечірньою чи весільною сукнею?",
    "nl": "Wanneer moet ik komen met een avondjurk of bruidsjurk?",
    "ar": "متى أحضر فستان السهرة أو فستان الزفاف؟"
   },
   "p": {
    "tr": "İki prova öneriyoruz: ilki törenden birkaç hafta önce, sonuncusu törene yakın. Böylece boy, bel ve korse ayarı son ölçünüze göre yapılır.",
    "en": "We suggest two fittings: the first a few weeks before the event and the last close to the date, so length, waist and bodice match your final measurements.",
    "de": "Wir empfehlen zwei Anproben: die erste einige Wochen vor dem Anlass, die letzte kurz davor. So passen Länge, Taille und Korsage zu Ihren endgültigen Maßen.",
    "ru": "Советуем две примерки: первую за несколько недель до события, последнюю ближе к дате. Так длина, талия и корсет будут подогнаны по окончательным меркам.",
    "es": "Recomendamos dos pruebas: la primera unas semanas antes del evento y la última cerca de la fecha. Así el largo, la cintura y el corpiño se ajustan a sus medidas finales.",
    "fr": "Nous conseillons deux essayages : le premier quelques semaines avant l'événement, le dernier peu avant la date. Longueur, taille et bustier sont ainsi ajustés à vos mesures définitives.",
    "pl": "Zalecamy dwie przymiarki: pierwszą kilka tygodni przed uroczystością, ostatnią tuż przed nią. Dzięki temu długość, talia i gorset są dopasowane do ostatecznych wymiarów.",
    "uk": "Радимо дві примірки: першу за кілька тижнів до події, останню ближче до дати. Так довжина, талія і корсет будуть підігнані за остаточними мірками.",
    "nl": "Wij raden twee pasbeurten aan: de eerste enkele weken voor het evenement, de laatste vlak ervoor. Zo passen lengte, taille en lijfje bij uw uiteindelijke maten.",
    "ar": "ننصح ببروفتين: الأولى قبل المناسبة بعدة أسابيع والأخيرة قرب الموعد. بهذا يُضبط الطول والخصر والكورسيه على مقاسك النهائي."
   }
  },
  {
   "h": {
    "tr": "Abiye ya da elbise diktirmek",
    "en": "Having an evening dress or dress made",
    "de": "Abendkleid oder Kleid nähen lassen",
    "ru": "Сшить вечернее платье или платье на заказ",
    "es": "Encargar un vestido o un vestido de fiesta",
    "fr": "Faire confectionner une robe ou une robe de soirée",
    "pl": "Uszycie sukienki lub sukni wieczorowej",
    "uk": "Пошити сукню або вечірню сукню на замовлення",
    "nl": "Een jurk of avondjurk laten maken",
    "ar": "تفصيل فستان أو فستان سهرة"
   },
   "p": {
    "tr": "Abiye ve elbise dikiminde fiyat fotoğrafa ve istediğiniz modele göre belirlenir; süre modele, kumaşa ve adede göre değişir.",
    "en": "Evening and dress sewing is priced by photo and the model you want; timing depends on the model, fabric and quantity.",
    "de": "Das Nähen von Abend- und Kleidern wird nach Foto und gewünschtem Modell berechnet; die Dauer hängt von Modell, Stoff und Menge ab.",
    "ru": "Пошив вечерних платьев и платьев — по фото и желаемой модели; срок зависит от модели, ткани и количества.",
    "es": "La confección de vestidos de noche y de vestir se presupuesta según la foto y el modelo que desee; el plazo depende del modelo, la tela y la cantidad.",
    "fr": "La couture de robes de soirée et de robes se chiffre d’après la photo et le modèle souhaité ; le délai dépend du modèle, du tissu et de la quantité.",
    "pl": "Szycie sukienek wieczorowych i sukienek wyceniamy na podstawie zdjęcia i wybranego modelu; czas zależy od modelu, tkaniny i ilości.",
    "uk": "Пошиття вечірніх суконь і суконь — за фото та бажаною моделлю; термін залежить від моделі, тканини та кількості.",
    "nl": "Het maken van avond- en gewone jurken wordt geprijsd op basis van foto en gewenst model; de tijd hangt af van model, stof en aantal.",
    "ar": "تُحدَّد أسعار خياطة فساتين السهرة والفساتين حسب الصورة والموديل الذي تريده؛ وتعتمد المدة على الموديل والقماش والكمية."
   }
  }
 ],
 "keten": [
  {
   "h": {
    "tr": "Keten diktirirsem yıkayınca küçülür mü?",
    "en": "Will a linen garment shrink in the wash?",
    "de": "Läuft ein Leinenstück beim Waschen ein?",
    "ru": "Сядет ли льняная вещь после стирки?",
    "es": "¿Encoge una prenda de lino al lavarla?",
    "fr": "Un vêtement en lin rétrécit-il au lavage ?",
    "pl": "Czy lniane ubranie kurczy się w praniu?",
    "uk": "Чи сідає лляна річ після прання?",
    "nl": "Krimpt linnen kleding in de was?",
    "ar": "هل تنكمش قطعة الكتان بعد الغسيل؟"
   },
   "p": {
    "tr": "Keten ilk yıkamada çekebilir. Bu yüzden kumaş dikimden önce yıkanır; böylece kıyafetin boyu ve bedeni sonradan değişmez.",
    "en": "Linen can shrink in its first wash. That is why the fabric is washed before sewing, so the garment keeps its length and fit afterwards.",
    "de": "Leinen kann bei der ersten Wäsche einlaufen. Deshalb wird der Stoff vor dem Nähen gewaschen, damit Länge und Passform später gleich bleiben.",
    "ru": "Лён может сесть при первой стирке. Поэтому ткань стирают до пошива, и готовая вещь потом не меняет длину и посадку.",
    "es": "El lino puede encoger en el primer lavado. Por eso la tela se lava antes de coser y la prenda conserva después su largo y su talla.",
    "fr": "Le lin peut rétrécir au premier lavage. C'est pourquoi le tissu est lavé avant la couture ; le vêtement garde ensuite sa longueur et sa taille.",
    "pl": "Len może się skurczyć przy pierwszym praniu. Dlatego tkaninę pierzemy przed szyciem, a gotowe ubranie zachowuje potem długość i rozmiar.",
    "uk": "Льон може сісти під час першого прання. Тому тканину перуть до пошиття, і готова річ потім зберігає довжину та розмір.",
    "nl": "Linnen kan bij de eerste wasbeurt krimpen. Daarom wordt de stof vóór het naaien gewassen, zodat het kledingstuk daarna zijn lengte en pasvorm houdt.",
    "ar": "قد ينكمش الكتان في الغسلة الأولى. لذلك يُغسل القماش قبل الخياطة فتحتفظ القطعة بطولها ومقاسها بعد ذلك."
   }
  },
  {
   "h": {
    "tr": "Keten ve pamuk dikimde fiyat ve süre",
    "en": "Linen and cotton tailoring: price and time",
    "de": "Leinen und Baumwolle nach Maß: Preis und Dauer",
    "ru": "Пошив изо льна и хлопка: цена и срок",
    "es": "Confección en lino y algodón: precio y plazo",
    "fr": "Confection en lin et coton : prix et délai",
    "pl": "Szycie z lnu i bawełny: cena i termin",
    "uk": "Пошиття з льону та бавовни: ціна і строк",
    "nl": "Maatwerk in linnen en katoen: prijs en doorlooptijd",
    "ar": "الخياطة من الكتان والقطن: السعر والمدة"
   },
   "p": {
    "tr": "Sabit fiyat yoktur. Model, kumaş ve adet belli olunca fiyatı ve süreyi dikime başlamadan önce yazarız.",
    "en": "There is no fixed price. Once model, fabric and quantity are clear, we tell you the price and time before sewing starts.",
    "de": "Einen Festpreis gibt es nicht. Sobald Modell, Stoff und Stückzahl feststehen, nennen wir Preis und Dauer, bevor wir mit dem Nähen beginnen.",
    "ru": "Фиксированной цены нет. Когда понятны модель, ткань и количество, называем цену и срок до начала пошива.",
    "es": "No hay precio fijo. Cuando están claros el modelo, la tela y la cantidad, le indicamos precio y plazo antes de empezar a coser.",
    "fr": "Il n'y a pas de prix fixe. Une fois le modèle, le tissu et la quantité définis, nous indiquons le prix et le délai avant de commencer la couture.",
    "pl": "Nie ma stałej ceny. Gdy znamy model, tkaninę i liczbę sztuk, podajemy cenę i termin przed rozpoczęciem szycia.",
    "uk": "Фіксованої ціни немає. Коли зрозумілі модель, тканина й кількість, називаємо ціну та строк до початку пошиття.",
    "nl": "Er is geen vaste prijs. Zodra model, stof en aantal duidelijk zijn, noemen wij prijs en doorlooptijd voordat wij beginnen met naaien.",
    "ar": "لا يوجد سعر ثابت. عندما يتضح الموديل والقماش والكمية نخبرك بالسعر والمدة قبل بدء الخياطة."
   }
  }
 ],
 "uniforma": [
  {
   "h": {
    "tr": "{y} üniforma siparişi vermek için ne lazım?",
    "en": "What do I need to order uniforms in {y}?",
    "de": "Was brauche ich für eine Uniformbestellung in {y}?",
    "ru": "Что нужно, чтобы заказать униформу в {y}?",
    "es": "¿Qué necesito para encargar uniformes en {y}?",
    "fr": "Que faut-il pour commander des uniformes à {y} ?",
    "pl": "Czego potrzeba, by zamówić uniformy w {y}?",
    "uk": "Що потрібно, щоб замовити уніформу в {y}?",
    "nl": "Wat heb ik nodig om uniformen te bestellen in {y}?",
    "ar": "ما المطلوب لطلب زي موحد في {y}؟"
   },
   "p": {
    "tr": "Model, adet ve beden listesini, varsa logonuzu gönderin. Önce numune hazırlanır; ölçü ve görünümü onayladıktan sonra üretime geçilir.",
    "en": "Send the model, quantity and size list, plus your logo if you have one. A sample is made first; production starts once you approve its size and look.",
    "de": "Schicken Sie Modell, Stückzahl und Größenliste, dazu Ihr Logo, falls vorhanden. Zuerst entsteht ein Muster; nach Ihrer Freigabe von Größe und Aussehen beginnt die Produktion.",
    "ru": "Пришлите модель, количество и список размеров, а также логотип, если он есть. Сначала делаем образец; после вашего одобрения размера и вида начинаем производство.",
    "es": "Envíe el modelo, la cantidad y la lista de tallas, y su logotipo si lo tiene. Primero se hace una muestra; cuando aprueba la talla y el aspecto, empieza la producción.",
    "fr": "Envoyez le modèle, la quantité et la liste des tailles, ainsi que votre logo si vous en avez un. Un échantillon est d'abord réalisé ; la production commence après votre validation de la taille et de l'aspect.",
    "pl": "Wyślij model, liczbę sztuk i listę rozmiarów oraz logo, jeśli je masz. Najpierw powstaje wzór; po akceptacji rozmiaru i wyglądu zaczynamy produkcję.",
    "uk": "Надішліть модель, кількість і перелік розмірів, а також логотип, якщо він є. Спершу робимо зразок; після вашого схвалення розміру й вигляду починаємо виробництво.",
    "nl": "Stuur het model, het aantal en de matenlijst, en uw logo als u dat heeft. Eerst maken wij een proefstuk; na uw akkoord op maat en uiterlijk start de productie.",
    "ar": "أرسل الموديل والكمية وقائمة المقاسات، وشعارك إن وُجد. نُعدّ عيّنة أولاً؛ وبعد موافقتك على المقاس والشكل يبدأ الإنتاج."
   }
  },
  {
   "h": {
    "tr": "Otel, restoran ve şirket üniformasında teklif",
    "en": "Quotes for hotel, restaurant and company uniforms",
    "de": "Angebot für Hotel-, Restaurant- und Firmenuniformen",
    "ru": "Расчёт униформы для отелей, ресторанов и компаний",
    "es": "Presupuesto de uniformes para hoteles, restaurantes y empresas",
    "fr": "Devis d'uniformes pour hôtels, restaurants et entreprises",
    "pl": "Wycena uniformów dla hoteli, restauracji i firm",
    "uk": "Розрахунок уніформи для готелів, ресторанів і компаній",
    "nl": "Offerte voor uniformen van hotels, restaurants en bedrijven",
    "ar": "عرض سعر لأزياء الفنادق والمطاعم والشركات"
   },
   "p": {
    "tr": "Teklif için model, adet ve logo bilgisini WhatsApp'tan yazın. Üretim süresi modele ve adede göre birlikte belirlenir.",
    "en": "For a quote, send the model, quantity and logo details on WhatsApp. The production time is agreed with you according to model and quantity.",
    "de": "Für ein Angebot schreiben Sie uns Modell, Stückzahl und Logo per WhatsApp. Die Produktionszeit stimmen wir je nach Modell und Stückzahl mit Ihnen ab.",
    "ru": "Для расчёта напишите в WhatsApp модель, количество и данные логотипа. Срок производства согласуем с вами в зависимости от модели и количества.",
    "es": "Para el presupuesto, escríbanos por WhatsApp el modelo, la cantidad y los datos del logotipo. El plazo de producción se acuerda con usted según el modelo y la cantidad.",
    "fr": "Pour un devis, écrivez-nous sur WhatsApp le modèle, la quantité et les informations du logo. Le délai de production est convenu avec vous selon le modèle et la quantité.",
    "pl": "Aby otrzymać wycenę, napisz na WhatsAppie model, liczbę sztuk i dane logo. Termin produkcji ustalamy z Tobą zależnie od modelu i liczby sztuk.",
    "uk": "Для розрахунку напишіть у WhatsApp модель, кількість і дані логотипа. Строк виробництва узгоджуємо з вами залежно від моделі та кількості.",
    "nl": "Voor een offerte stuurt u model, aantal en logogegevens via WhatsApp. De productietijd spreken wij met u af op basis van model en aantal.",
    "ar": "للحصول على عرض سعر اكتب لنا عبر واتساب الموديل والكمية وبيانات الشعار. نتفق معك على مدة الإنتاج حسب الموديل والكمية."
   }
  }
 ],
 "promo": [
  {
   "h": {
    "tr": "Bez çanta ve promosyon ürününde teklif almak",
    "en": "Getting a quote for tote bags and promotional items",
    "de": "Angebot für Stofftaschen und Werbeartikel einholen",
    "ru": "Как получить расчёт на сумки и промопродукцию",
    "es": "Pedir presupuesto de bolsas de tela y artículos promocionales",
    "fr": "Obtenir un devis pour sacs en tissu et articles promotionnels",
    "pl": "Wycena toreb materiałowych i artykułów promocyjnych",
    "uk": "Як отримати розрахунок на тканинні сумки та промопродукцію",
    "nl": "Offerte aanvragen voor stoffen tassen en promotieartikelen",
    "ar": "طلب عرض سعر للحقائب القماشية والمنتجات الترويجية"
   },
   "p": {
    "tr": "Hangi ürünü istediğinizi, yaklaşık adedi ve logonuzu gönderin. Hazır dosyanız yoksa örnek bir fotoğraf ya da kısa bir tarif de olur.",
    "en": "Tell us the product, the approximate quantity and send your logo. If you have no ready file, a reference photo or a short description is fine.",
    "de": "Nennen Sie uns das Produkt und die ungefähre Stückzahl und schicken Sie Ihr Logo. Ohne fertige Datei genügt auch ein Beispielfoto oder eine kurze Beschreibung.",
    "ru": "Напишите, какой товар нужен и примерное количество, пришлите логотип. Если готового файла нет, подойдёт фото-пример или короткое описание.",
    "es": "Díganos qué producto quiere, la cantidad aproximada y envíe su logotipo. Si no tiene un archivo listo, sirve una foto de ejemplo o una breve descripción.",
    "fr": "Indiquez le produit souhaité et la quantité approximative, et envoyez votre logo. Sans fichier prêt, une photo d'exemple ou une courte description suffit.",
    "pl": "Napisz, jaki produkt i w jakiej przybliżonej liczbie chcesz zamówić, i wyślij logo. Jeśli nie masz gotowego pliku, wystarczy zdjęcie przykładowe lub krótki opis.",
    "uk": "Напишіть, який товар потрібен і приблизну кількість, надішліть логотип. Якщо готового файла немає, підійде фото-приклад або короткий опис.",
    "nl": "Laat weten welk product u wilt en het geschatte aantal, en stuur uw logo. Heeft u geen kant-en-klaar bestand, dan is een voorbeeldfoto of korte omschrijving genoeg.",
    "ar": "أخبرنا بالمنتج المطلوب والكمية التقريبية وأرسل شعارك. إن لم يكن لديك ملف جاهز فتكفي صورة مثال أو وصف قصير."
   }
  },
  {
   "h": {
    "tr": "Hangi baskı uygun olur?",
    "en": "Which print suits my product?",
    "de": "Welcher Druck passt?",
    "ru": "Какая печать подойдёт?",
    "es": "¿Qué tipo de estampado conviene?",
    "fr": "Quelle impression convient ?",
    "pl": "Jaki nadruk będzie odpowiedni?",
    "uk": "Який друк підійде?",
    "nl": "Welke bedrukking past het best?",
    "ar": "أي نوع طباعة يناسب؟"
   },
   "p": {
    "tr": "Baskıyı ürüne ve tasarıma bakarak birlikte seçeriz. Fiyat ve süre model, adet ve baskı belli olunca yazılır.",
    "en": "We pick the print together after looking at the product and the design. Price and time follow once model, quantity and print are settled.",
    "de": "Den Druck wählen wir gemeinsam nach Produkt und Design aus. Preis und Dauer nennen wir, sobald Modell, Stückzahl und Druck feststehen.",
    "ru": "Печать выбираем вместе, исходя из изделия и дизайна. Цену и срок называем, когда определены модель, количество и печать.",
    "es": "Elegimos el estampado juntos según el producto y el diseño. El precio y el plazo se indican cuando están definidos el modelo, la cantidad y el estampado.",
    "fr": "Nous choisissons l'impression ensemble selon le produit et le design. Le prix et le délai sont indiqués une fois le modèle, la quantité et l'impression définis.",
    "pl": "Nadruk dobieramy wspólnie do produktu i projektu. Cenę i termin podajemy, gdy ustalone są model, liczba sztuk i nadruk.",
    "uk": "Друк обираємо разом, виходячи з виробу та дизайну. Ціну і строк називаємо, коли визначено модель, кількість і друк.",
    "nl": "De bedrukking kiezen wij samen op basis van product en ontwerp. Prijs en doorlooptijd volgen zodra model, aantal en bedrukking vaststaan.",
    "ar": "نختار الطباعة معاً حسب المنتج والتصميم. نخبرك بالسعر والمدة بعد تحديد الموديل والكمية والطباعة."
   }
  }
 ],
 "otel": [
  {
   "h": {
    "tr": "{y} otele terzi çağırınca ne olur?",
    "en": "What happens when you call a tailor to your hotel in {y}?",
    "de": "Was passiert, wenn Sie in {y} einen Schneider ins Hotel rufen?",
    "ru": "Что происходит, когда вы вызываете портного в отель в {y}?",
    "es": "¿Qué pasa cuando pide un sastre en su hotel de {y}?",
    "fr": "Que se passe-t-il quand vous appelez un tailleur à votre hôtel à {y} ?",
    "pl": "Co się dzieje, gdy wzywasz krawca do hotelu w {y}?",
    "uk": "Що відбувається, коли ви викликаєте кравця в готель у {y}?",
    "nl": "Wat gebeurt er als u in {y} een kleermaker naar uw hotel laat komen?",
    "ar": "ماذا يحدث عندما تطلب خياطاً إلى فندقك في {y}؟"
   },
   "p": {
    "tr": "WhatsApp'tan otelinizi ve işi yazarsınız. Terzi otele gelir, ölçüyü alır, kıyafeti atölyede yapar ve bitince otele geri getirir.",
    "en": "You write your hotel and the job on WhatsApp. The tailor comes to the hotel, takes the measurements, does the work in the workshop and brings the garment back.",
    "de": "Sie schreiben uns Hotel und Arbeit per WhatsApp. Der Schneider kommt ins Hotel, nimmt Maß, erledigt die Arbeit in der Werkstatt und bringt das Stück zurück.",
    "ru": "Вы пишете в WhatsApp название отеля и задачу. Портной приезжает в отель, снимает мерки, выполняет работу в мастерской и привозит вещь обратно.",
    "es": "Nos escribe por WhatsApp su hotel y el trabajo. El sastre va al hotel, toma las medidas, hace el trabajo en el taller y le devuelve la prenda.",
    "fr": "Vous nous écrivez sur WhatsApp votre hôtel et le travail. Le tailleur vient à l'hôtel, prend les mesures, réalise le travail à l'atelier et vous rapporte le vêtement.",
    "pl": "Piszesz na WhatsAppie nazwę hotelu i zakres pracy. Krawiec przyjeżdża do hotelu, bierze miarę, wykonuje pracę w pracowni i odwozi ubranie.",
    "uk": "Ви пишете у WhatsApp назву готелю та завдання. Кравець приїжджає в готель, знімає мірки, виконує роботу в майстерні й привозить річ назад.",
    "nl": "U stuurt ons via WhatsApp uw hotel en het werk. De kleermaker komt naar het hotel, neemt de maten, doet het werk in het atelier en brengt het kledingstuk terug.",
    "ar": "تكتب لنا عبر واتساب اسم فندقك والعمل المطلوب. يأتي الخياط إلى الفندق ويأخذ المقاسات وينجز العمل في الورشة ثم يعيد القطعة إليك."
   }
  },
  {
   "h": {
    "tr": "Otel alım ve teslim yapıyor musunuz?",
    "en": "Do you collect from and deliver to hotels?",
    "de": "Holen Sie im Hotel ab und liefern dorthin zurück?",
    "ru": "Забираете ли вы вещи из отеля и привозите обратно?",
    "es": "¿Son disponibles la recogida y entrega en el hotel?",
    "fr": "Proposez-vous la prise en charge et la livraison à l’hôtel ?",
    "pl": "Czy odbiór i dostawa w hotelu są dostępne?",
    "uk": "Чи забір і доставка в готелі?",
    "nl": "Zijn ophalen en bezorgen in het hotel mogelijk?",
    "ar": "هل الاستلام والتسليم في الفندق متاح؟"
   },
   "p": {
    "tr": "Evet. Konyaaltı, Lara, Belek, Kemer, Side ve çevresindeki otellerden alıp geri getiriyoruz.",
    "en": "Yes. We collect from and return to hotels in Konyaaltı, Lara, Belek, Kemer, Side and nearby.",
    "de": "Ja. Wir holen in Hotels in Konyaaltı, Lara, Belek, Kemer, Side und Umgebung ab und bringen zurück.",
    "ru": "Да. Забираем из отелей в Коньяалты, Ларе, Белеке, Кемере, Сиде и рядом и привозим обратно.",
    "es": "Sí. Recogemos y devolvemos en hoteles de Konyaaltı, Lara, Belek, Kemer, Side y alrededores.",
    "fr": "Oui. Nous prenons et rapportons les vêtements dans les hôtels de Konyaaltı, Lara, Belek, Kemer, Side et des environs.",
    "pl": "Tak. Odbieramy z hoteli i odwozimy do nich w Konyaaltı, Larze, Belek, Kemer, Side i okolicach.",
    "uk": "Так. Забираємо з готелів і привозимо назад у Коньяалти, Ларі, Белеку, Кемері, Сіде та поруч.",
    "nl": "Ja. Wij halen op bij en brengen terug naar hotels in Konyaaltı, Lara, Belek, Kemer, Side en omgeving.",
    "ar": "نعم. نستلم من فنادق كونيالتي ولارا وبيليك وكيمير وسيدا وما حولها ونعيد القطعة إليها."
   }
  },
  {
   "h": {
    "tr": "Tatilde kıyafetim bozuldu, yetişir mi?",
    "en": "My outfit broke on holiday. Can it be ready in time?",
    "de": "Mein Outfit ist im Urlaub kaputtgegangen. Wird es rechtzeitig fertig?",
    "ru": "Одежда испортилась в отпуске. Успеете?",
    "es": "Se me ha estropeado la ropa en vacaciones: ¿llegará a tiempo?",
    "fr": "Mon vêtement s'est abîmé en vacances : sera-t-il prêt à temps ?",
    "pl": "Ubranie zniszczyło się na wakacjach. Zdążycie?",
    "uk": "Одяг зіпсувався у відпустці. Встигнете?",
    "nl": "Mijn kleding is stukgegaan op vakantie: is het op tijd klaar?",
    "ar": "تلفت ملابسي في العطلة، هل تلحقون؟"
   },
   "p": {
    "tr": "Acil paça, fermuar ve bel işleri 1–2 saatte hazır olur; süre işin durumuna göre değişir. Davet ya da toplantı saatinizi WhatsApp'tan yazın.",
    "en": "Urgent hem, zipper and waist jobs are ready in 1–2 hours, depending on the job. Tell us the time of your event or meeting on WhatsApp.",
    "de": "Eilige Arbeiten an Saum, Reißverschluss und Bund sind in 1–2 Stunden fertig, je nach Arbeit. Schreiben Sie uns die Uhrzeit Ihres Termins per WhatsApp.",
    "ru": "Срочные работы с низом, молнией и поясом готовы за 1–2 часа, в зависимости от работы. Напишите в WhatsApp, к какому времени нужна вещь.",
    "es": "Los arreglos urgentes de bajos, cremalleras y cintura están listos en 1–2 horas, según el trabajo. Díganos por WhatsApp a qué hora es su evento.",
    "fr": "Les travaux urgents d'ourlet, de fermeture et de taille sont prêts en 1 à 2 heures, selon le travail. Indiquez-nous sur WhatsApp l'heure de votre événement.",
    "pl": "Pilne prace przy nogawkach, zamku i pasie są gotowe w 1–2 godziny, zależnie od pracy. Napisz na WhatsAppie, na którą godzinę potrzebujesz ubrania.",
    "uk": "Термінові роботи з низом, блискавкою та поясом готові за 1–2 години, залежно від роботи. Напишіть у WhatsApp, на котру годину потрібна річ.",
    "nl": "Spoedwerk aan zoom, rits en taille is klaar in 1–2 uur, afhankelijk van het werk. Laat ons via WhatsApp weten hoe laat uw afspraak is.",
    "ar": "الأعمال المستعجلة للأطراف والسحاب والخصر جاهزة خلال 1–2 ساعة، حسب العمل. اكتب لنا عبر واتساب موعد مناسبتك."
   }
  }
 ],
 "terzi": [
  {
   "h": {
    "tr": "{y} terzide neler yaptırabilirim?",
    "en": "What can a tailor do for me in {y}?",
    "de": "Was kann ein Schneider in {y} für mich tun?",
    "ru": "Что может сделать портной в {y}?",
    "es": "¿Qué puede hacer un sastre por mí en {y}?",
    "fr": "Que peut faire un tailleur pour moi à {y} ?",
    "pl": "Co może dla mnie zrobić krawiec w {y}?",
    "uk": "Що може зробити для мене кравець у {y}?",
    "nl": "Wat kan een kleermaker voor mij doen in {y}?",
    "ar": "ماذا يمكن أن يفعل الخياط لي في {y}؟"
   },
   "p": {
    "tr": "{y} bölgesinde paça kısaltma, fermuar değişimi, bel daraltma, gelinlik ve abiye tadilatı ile özel dikim yapılır. Fiyatlar paça ve bel ₺200'den, fermuar ₺300'den, gelinlik ve abiye tadilatı fotoğrafa veya işin detayına göre fiyatlanır.",
    "en": "In {y} we do hemming, zipper replacement, waist taking-in, wedding and evening dress alterations and custom tailoring. Prices start from €10 for hemming and waist and €15 for zippers; wedding and evening dress alterations are priced by photo or job detail.",
    "de": "In {y} erledigen wir Saum kürzen, Reißverschluss-Wechsel, Bund enger machen, Änderungen an Braut- und Abendkleidern sowie Maßanfertigung. Preise ab €10 für Saum und Bund, ab €15 für Reißverschlüsse; Änderungen an Braut- und Abendkleidern nach Foto oder Aufwand.",
    "ru": "В {y} мы делаем подшив брюк, замену молний, ушивание в талии, переделку свадебных и вечерних платьев и индивидуальный пошив. Цены: подшив и талия — от €10, молния — от €15; переделка платьев — по фото или объёму работ.",
    "es": "En {y} hacemos bajos, cambio de cremalleras, ajuste de cintura, arreglos de vestidos de novia y de noche y confección a medida. Precios desde €10 (bajos y cintura) y €15 (cremalleras); los arreglos de vestidos, según la foto o el trabajo.",
    "fr": "À {y}, nous faisons ourlets, remplacement de fermetures, ajustement de taille, retouches de robes de mariée et de soirée et couture sur mesure. Prix dès €10 (ourlet, taille) et €15 (fermeture) ; retouches de robes selon la photo ou le travail.",
    "pl": "W {y} wykonujemy skracanie, wymianę zamków, zwężanie w talii, przeróbki sukni ślubnych i wieczorowych oraz szycie na miarę. Ceny od €10 (nogawki, talia) i €15 (zamki); przeróbki sukni według zdjęcia lub zakresu prac.",
    "uk": "У {y} ми підшиваємо штани, міняємо блискавки, звужуємо в талії, переробляємо весільні й вечірні сукні та шиємо на замовлення. Ціни: підшивання й талія — від €10, блискавка — від €15; переробка суконь — за фото або обсягом робіт.",
    "nl": "In {y} doen we broekzoom, ritsvervanging, taille innemen, aanpassingen van bruids- en avondjurken en maatwerk. Prijzen vanaf €10 (zoom, taille) en €15 (ritsen); aanpassing van jurken op foto of omvang van het werk.",
    "ar": "نقدّم في {y} تقصير البنطلون واستبدال السحّاب وتضييق الخصر وتعديل فساتين الزفاف والسهرة والتفصيل الخاص. الأسعار من €10 للتقصير والخصر و€15 للسحّاب؛ وتعديل الفساتين حسب الصورة أو تفاصيل العمل."
   }
  },
  {
   "h": {
    "tr": "Gelmeden fiyat öğrenmek",
    "en": "Getting a price before you come",
    "de": "Preis erfahren, bevor Sie kommen",
    "ru": "Узнать цену заранее",
    "es": "Saber el precio antes de venir",
    "fr": "Connaître le prix avant de venir",
    "pl": "Poznaj cenę, zanim przyjdziesz",
    "uk": "Дізнатися ціну заздалегідь",
    "nl": "De prijs weten voordat u komt",
    "ar": "اعرف السعر قبل أن تأتي"
   },
   "p": {
    "tr": "Kıyafeti fotoğraflayıp ne istediğinizi WhatsApp'tan yazın. Net fiyatı ve ne zaman hazır olacağını cevaplarız; her gün 08:00–23:00 açığız.",
    "en": "Photograph the garment and tell us what you need on WhatsApp. We reply with the exact price and when it will be ready; we are open every day 08:00–23:00.",
    "de": "Fotografieren Sie das Kleidungsstück und schreiben Sie uns per WhatsApp, was Sie brauchen. Wir antworten mit genauem Preis und Termin; geöffnet täglich 08:00–23:00.",
    "ru": "Сфотографируйте вещь и напишите в WhatsApp, что нужно сделать. Ответим точной ценой и сроком; работаем ежедневно 08:00–23:00.",
    "es": "Fotografíe la prenda y escríbanos por WhatsApp qué necesita. Le respondemos con el precio exacto y cuándo estará lista; abrimos todos los días de 08:00 a 23:00.",
    "fr": "Photographiez le vêtement et écrivez-nous sur WhatsApp ce qu'il vous faut. Nous répondons avec le prix exact et la date de disponibilité ; ouvert tous les jours de 08:00 à 23:00.",
    "pl": "Zrób zdjęcie ubrania i napisz na WhatsAppie, czego potrzebujesz. Odpowiemy, podając dokładną cenę i termin; pracujemy codziennie 08:00–23:00.",
    "uk": "Сфотографуйте річ і напишіть у WhatsApp, що потрібно зробити. Відповімо точною ціною та строком; працюємо щодня 08:00–23:00.",
    "nl": "Maak een foto van het kledingstuk en stuur via WhatsApp wat u nodig heeft. Wij antwoorden met de exacte prijs en wanneer het klaar is; elke dag open van 08:00 tot 23:00.",
    "ar": "صوّر القطعة واكتب لنا عبر واتساب ما تحتاجه. نرد بالسعر الدقيق وموعد الجاهزية؛ نعمل يومياً من 08:00 إلى 23:00."
   }
  }
 ],
 "fiyat": [
  {
   "h": {
    "tr": "{y} terzi fiyat listesi",
    "en": "Tailor price list for {y}",
    "de": "Schneider-Preisliste für {y}",
    "ru": "Прайс-лист портного в {y}",
    "es": "Lista de precios del sastre en {y}",
    "fr": "Tarifs du tailleur à {y}",
    "pl": "Cennik krawca w {y}",
    "uk": "Прайс-лист кравця в {y}",
    "nl": "Prijslijst kleermaker in {y}",
    "ar": "قائمة أسعار الخياط في {y}"
   },
   "p": {
    "tr": "Paça kısaltma ve bel daraltma ₺200'den, fermuar değişimi ₺300'den, gelinlik, abiye ve elbise tadilatı fotoğrafa veya işin detayına göre fiyatlanır.",
    "en": "Hemming and waist taking-in start from €10, zipper replacement from €15, wedding, evening and dress alterations priced by photo or job detail.",
    "de": "Saum kürzen und Bund enger machen ab €10, Reißverschluss-Wechsel ab €15, Änderungen an Braut-, Abend- und Kleidern nach Foto oder Aufwand.",
    "ru": "Подшив и ушивание в талии — от €10, замена молнии — от €15, переделка свадебных, вечерних платьев — по фото или объёму работ.",
    "es": "Bajos y cintura desde €10, cambio de cremallera desde €15, arreglos de vestidos de novia, de noche y de vestir según la foto o el trabajo.",
    "fr": "Ourlet et taille dès €10, remplacement de fermeture dès €15, retouches de robes de mariée, de soirée et d’habillées selon la photo ou le travail.",
    "pl": "Nogawki i talia od €10, wymiana zamka od €15, przeróbki sukni ślubnych, wieczorowych i sukienek według zdjęcia lub zakresu prac.",
    "uk": "Підшивання й звуження в талії — від €10, заміна блискавки — від €15, переробка весільних і вечірніх суконь — за фото або обсягом робіт.",
    "nl": "Zoom en taille innemen vanaf €10, ritsvervanging vanaf €15, aanpassingen van bruids-, avond- en gewone jurken op foto of omvang van het werk.",
    "ar": "التقصير وتضييق الخصر من €10، واستبدال السحّاب من €15، وتعديل فساتين الزفاف والسهرة حسب الصورة أو تفاصيل العمل."
   }
  },
  {
   "h": {
    "tr": "Listedeki fiyat neden 'başlangıç' fiyatı?",
    "en": "Why are the listed prices 'from' prices?",
    "de": "Warum sind die Preise 'ab'-Preise?",
    "ru": "Почему цены указаны «от»?",
    "es": "¿Por qué los precios de la lista son «desde»?",
    "fr": "Pourquoi les prix affichés sont-ils des prix « à partir de » ?",
    "pl": "Dlaczego ceny w cenniku są cenami „od”?",
    "uk": "Чому ціни в переліку вказано «від»?",
    "nl": "Waarom zijn de prijzen in de lijst vanafprijzen?",
    "ar": "لماذا الأسعار في القائمة «تبدأ من»؟"
   },
   "p": {
    "tr": "Çünkü kumaş, işin kapsamı ve aciliyet fiyatı değiştirir. Fotoğrafı gönderdiğinizde net fiyatı işe başlamadan önce yazarız; sürpriz olmaz.",
    "en": "Because fabric, the scope of the job and urgency change the price. Once you send a photo, we give the exact price before any work begins, so there are no surprises.",
    "de": "Weil Stoff, Umfang und Dringlichkeit den Preis verändern. Nach Ihrem Foto nennen wir den genauen Preis vor Arbeitsbeginn; Überraschungen gibt es nicht.",
    "ru": "Потому что на цену влияют ткань, объём работы и срочность. Получив фото, называем точную цену до начала работы — без сюрпризов.",
    "es": "Porque la tela, el alcance del trabajo y la urgencia cambian el precio. Con la foto le damos el precio exacto antes de empezar, sin sorpresas.",
    "fr": "Parce que le tissu, l'ampleur du travail et l'urgence font varier le prix. Avec la photo, nous donnons le prix exact avant de commencer, sans surprise.",
    "pl": "Bo tkanina, zakres pracy i pilność zmieniają cenę. Po otrzymaniu zdjęcia podajemy dokładną cenę przed rozpoczęciem pracy, bez niespodzianek.",
    "uk": "Бо на ціну впливають тканина, обсяг роботи й терміновість. Отримавши фото, називаємо точну ціну до початку роботи — без несподіванок.",
    "nl": "Omdat stof, omvang van het werk en spoed de prijs veranderen. Na uw foto noemen wij de exacte prijs voordat wij beginnen, zonder verrassingen.",
    "ar": "لأن القماش وحجم العمل والاستعجال تغيّر السعر. بعد استلام الصورة نخبرك بالسعر الدقيق قبل بدء العمل، دون مفاجآت."
   }
  }
 ],
 "hizmet": [
  {
   "h": {
    "tr": "{y} terzi: ne zaman hazır, kaç TL?",
    "en": "Tailor in {y}: when is it ready and what does it cost?",
    "de": "Schneider in {y}: Wann fertig, was kostet es?",
    "ru": "Портной в {y}: когда готово и сколько стоит?",
    "es": "Sastre en {y}: cuándo está listo y cuánto cuesta",
    "fr": "Tailleur à {y} : quand est-ce prêt et combien ça coûte ?",
    "pl": "Krawiec w {y}: kiedy gotowe i ile kosztuje?",
    "uk": "Кравець у {y}: коли готово і скільки коштує?",
    "nl": "Kleermaker in {y}: wanneer klaar en wat kost het?",
    "ar": "خياط في {y}: متى يجهز وكم يكلّف؟"
   },
   "p": {
    "tr": "Acil tamir ve tadilat 1–2 saatte, normal işler aynı gün teslim edilir. Fiyatlar paça ve bel ₺200'den, fermuar ₺300'den, gelinlik ve abiye tadilatı fotoğrafa veya işin detayına göre fiyatlanır.",
    "en": "Urgent repairs and alterations are ready in 1–2 hours, normal jobs the same day. Prices start from €10 for hemming and waist and €15 for zippers; wedding and evening dress alterations are priced by photo or job detail.",
    "de": "Dringende Reparaturen und Änderungen sind in 1–2 Stunden fertig, normale am selben Tag. Preise ab €10 für Saum und Bund, ab €15 für Reißverschlüsse; Änderungen an Braut- und Abendkleidern nach Foto oder Aufwand.",
    "ru": "Срочный ремонт и подгонка — за 1–2 часа, обычные работы — в тот же день. Цены: подшив и талия — от €10, молния — от €15; переделка платьев — по фото или объёму работ.",
    "es": "Los arreglos urgentes están listos en 1–2 horas y los normales el mismo día. Precios desde €10 (bajos y cintura) y €15 (cremalleras); los arreglos de vestidos, según la foto o el trabajo.",
    "fr": "Les retouches urgentes sont prêtes en 1 à 2 heures, les normales le jour même. Prix dès €10 (ourlet et taille) et €15 (fermeture) ; retouches de robes selon la photo ou le travail.",
    "pl": "Pilne naprawy są gotowe w 1–2 godziny, zwykłe tego samego dnia. Ceny od €10 (nogawki, talia) i €15 (zamki); przeróbki sukni według zdjęcia lub zakresu prac.",
    "uk": "Термінові ремонт і підгонка — за 1–2 години, звичайні — того ж дня. Ціни: підшивання й талія — від €10, блискавка — від €15; переробка суконь — за фото або обсягом робіт.",
    "nl": "Spoedreparaties zijn klaar in 1–2 uur, gewone dezelfde dag. Prijzen vanaf €10 (zoom, taille) en €15 (ritsen); aanpassing van jurken op foto of omvang van het werk.",
    "ar": "التصليحات العاجلة جاهزة خلال ساعة إلى ساعتين والعادية في اليوم نفسه. الأسعار من €10 للتقصير والخصر و€15 للسحّاب؛ وتعديل الفساتين حسب الصورة أو تفاصيل العمل."
   }
  },
  {
   "h": {
    "tr": "Fotoğraf gönderin, otelinizden alalım",
    "en": "Send a photo, we collect from your hotel",
    "de": "Foto schicken, wir holen im Hotel ab",
    "ru": "Пришлите фото — заберём из отеля",
    "es": "Envíe una foto y recogemos en su hotel",
    "fr": "Envoyez une photo, nous passons à votre hôtel",
    "pl": "Wyślij zdjęcie, odbierzemy z hotelu",
    "uk": "Надішліть фото — заберемо з готелю",
    "nl": "Stuur een foto, wij halen op bij uw hotel",
    "ar": "أرسل صورة ونستلم من فندقك"
   },
   "p": {
    "tr": "Fotoğrafı WhatsApp'tan gönderin, fiyatı öğrenin. Hizmet verdiğimiz bölgelerde kıyafeti otelinizden alıp geri getiriyoruz; her gün 08:00–23:00.",
    "en": "Send a photo on WhatsApp and get the price. In the areas we serve we collect the garment from your hotel and bring it back; every day 08:00–23:00.",
    "de": "Foto per WhatsApp schicken und Preis erfahren. In unseren Gebieten holen wir das Kleidungsstück in Ihrem Hotel ab und bringen es zurück; täglich 08:00–23:00.",
    "ru": "Пришлите фото в WhatsApp и узнайте цену. В районах, где мы работаем, забираем вещь из отеля и привозим обратно; ежедневно 08:00–23:00.",
    "es": "Envíe una foto por WhatsApp y conozca el precio. En las zonas donde trabajamos recogemos la prenda en su hotel y se la devolvemos; todos los días de 08:00 a 23:00.",
    "fr": "Envoyez une photo sur WhatsApp et obtenez le prix. Dans les zones que nous desservons, nous prenons le vêtement à votre hôtel et le rapportons ; tous les jours de 08:00 à 23:00.",
    "pl": "Wyślij zdjęcie na WhatsAppie i poznaj cenę. W rejonach, które obsługujemy, odbieramy ubranie z hotelu i odwozimy je; codziennie 08:00–23:00.",
    "uk": "Надішліть фото у WhatsApp і дізнайтеся ціну. У районах, де ми працюємо, забираємо річ із готелю та привозимо назад; щодня 08:00–23:00.",
    "nl": "Stuur een foto via WhatsApp en ontvang de prijs. In de gebieden waar wij werken halen wij het kledingstuk op bij uw hotel en brengen het terug; elke dag van 08:00 tot 23:00.",
    "ar": "أرسل صورة عبر واتساب واعرف السعر. في المناطق التي نخدمها نستلم القطعة من فندقك ونعيدها؛ يومياً من 08:00 إلى 23:00."
   }
  }
 ],
 "genel": [
  {
   "h": {
    "tr": "{y} terzi: ne zaman hazır, kaç TL?",
    "en": "Tailor in {y}: when is it ready and what does it cost?",
    "de": "Schneider in {y}: Wann fertig, was kostet es?",
    "ru": "Портной в {y}: когда готово и сколько стоит?",
    "es": "Sastre en {y}: cuándo está listo y cuánto cuesta",
    "fr": "Tailleur à {y} : quand est-ce prêt et combien ça coûte ?",
    "pl": "Krawiec w {y}: kiedy gotowe i ile kosztuje?",
    "uk": "Кравець у {y}: коли готово і скільки коштує?",
    "nl": "Kleermaker in {y}: wanneer klaar en wat kost het?",
    "ar": "خياط في {y}: متى يجهز وكم يكلّف؟"
   },
   "p": {
    "tr": "Acil tamir ve tadilat 1–2 saatte, normal işler aynı gün teslim edilir. Fiyatlar paça ve bel ₺200'den, fermuar ₺300'den, gelinlik ve abiye tadilatı fotoğrafa veya işin detayına göre fiyatlanır.",
    "en": "Urgent repairs and alterations are ready in 1–2 hours, normal jobs the same day. Prices start from €10 for hemming and waist and €15 for zippers; wedding and evening dress alterations are priced by photo or job detail.",
    "de": "Dringende Reparaturen und Änderungen sind in 1–2 Stunden fertig, normale am selben Tag. Preise ab €10 für Saum und Bund, ab €15 für Reißverschlüsse; Änderungen an Braut- und Abendkleidern nach Foto oder Aufwand.",
    "ru": "Срочный ремонт и подгонка — за 1–2 часа, обычные работы — в тот же день. Цены: подшив и талия — от €10, молния — от €15; переделка платьев — по фото или объёму работ.",
    "es": "Los arreglos urgentes están listos en 1–2 horas y los normales el mismo día. Precios desde €10 (bajos y cintura) y €15 (cremalleras); los arreglos de vestidos, según la foto o el trabajo.",
    "fr": "Les retouches urgentes sont prêtes en 1 à 2 heures, les normales le jour même. Prix dès €10 (ourlet et taille) et €15 (fermeture) ; retouches de robes selon la photo ou le travail.",
    "pl": "Pilne naprawy są gotowe w 1–2 godziny, zwykłe tego samego dnia. Ceny od €10 (nogawki, talia) i €15 (zamki); przeróbki sukni według zdjęcia lub zakresu prac.",
    "uk": "Термінові ремонт і підгонка — за 1–2 години, звичайні — того ж дня. Ціни: підшивання й талія — від €10, блискавка — від €15; переробка суконь — за фото або обсягом робіт.",
    "nl": "Spoedreparaties zijn klaar in 1–2 uur, gewone dezelfde dag. Prijzen vanaf €10 (zoom, taille) en €15 (ritsen); aanpassing van jurken op foto of omvang van het werk.",
    "ar": "التصليحات العاجلة جاهزة خلال ساعة إلى ساعتين والعادية في اليوم نفسه. الأسعار من €10 للتقصير والخصر و€15 للسحّاب؛ وتعديل الفساتين حسب الصورة أو تفاصيل العمل."
   }
  },
  {
   "h": {
    "tr": "Fotoğraf gönderin, otelinizden alalım",
    "en": "Send a photo, we collect from your hotel",
    "de": "Foto schicken, wir holen im Hotel ab",
    "ru": "Пришлите фото — заберём из отеля",
    "es": "Envíe una foto y recogemos en su hotel",
    "fr": "Envoyez une photo, nous passons à votre hôtel",
    "pl": "Wyślij zdjęcie, odbierzemy z hotelu",
    "uk": "Надішліть фото — заберемо з готелю",
    "nl": "Stuur een foto, wij halen op bij uw hotel",
    "ar": "أرسل صورة ونستلم من فندقك"
   },
   "p": {
    "tr": "Fotoğrafı WhatsApp'tan gönderin, fiyatı öğrenin. Hizmet verdiğimiz bölgelerde kıyafeti otelinizden alıp geri getiriyoruz; her gün 08:00–23:00.",
    "en": "Send a photo on WhatsApp and get the price. In the areas we serve we collect the garment from your hotel and bring it back; every day 08:00–23:00.",
    "de": "Foto per WhatsApp schicken und Preis erfahren. In unseren Gebieten holen wir das Kleidungsstück in Ihrem Hotel ab und bringen es zurück; täglich 08:00–23:00.",
    "ru": "Пришлите фото в WhatsApp и узнайте цену. В районах, где мы работаем, забираем вещь из отеля и привозим обратно; ежедневно 08:00–23:00.",
    "es": "Envíe una foto por WhatsApp y conozca el precio. En las zonas donde trabajamos recogemos la prenda en su hotel y se la devolvemos; todos los días de 08:00 a 23:00.",
    "fr": "Envoyez une photo sur WhatsApp et obtenez le prix. Dans les zones que nous desservons, nous prenons le vêtement à votre hôtel et le rapportons ; tous les jours de 08:00 à 23:00.",
    "pl": "Wyślij zdjęcie na WhatsAppie i poznaj cenę. W rejonach, które obsługujemy, odbieramy ubranie z hotelu i odwozimy je; codziennie 08:00–23:00.",
    "uk": "Надішліть фото у WhatsApp і дізнайтеся ціну. У районах, де ми працюємо, забираємо річ із готелю та привозимо назад; щодня 08:00–23:00.",
    "nl": "Stuur een foto via WhatsApp en ontvang de prijs. In de gebieden waar wij werken halen wij het kledingstuk op bij uw hotel en brengen het terug; elke dag van 08:00 tot 23:00.",
    "ar": "أرسل صورة عبر واتساب واعرف السعر. في المناطق التي نخدمها نستلم القطعة من فندقك ونعيدها؛ يومياً من 08:00 إلى 23:00."
   }
  }
 ],
 "bolge": [
  {
   "h": {
    "tr": "{y} otele terzi çağırınca ne olur?",
    "en": "What happens when you call a tailor to your hotel in {y}?",
    "de": "Was passiert, wenn Sie in {y} einen Schneider ins Hotel rufen?",
    "ru": "Что происходит, когда вы вызываете портного в отель в {y}?",
    "es": "¿Qué pasa cuando pide un sastre en su hotel de {y}?",
    "fr": "Que se passe-t-il quand vous appelez un tailleur à votre hôtel à {y} ?",
    "pl": "Co się dzieje, gdy wzywasz krawca do hotelu w {y}?",
    "uk": "Що відбувається, коли ви викликаєте кравця в готель у {y}?",
    "nl": "Wat gebeurt er als u in {y} een kleermaker naar uw hotel laat komen?",
    "ar": "ماذا يحدث عندما تطلب خياطاً إلى فندقك في {y}؟"
   },
   "p": {
    "tr": "WhatsApp'tan otelinizi ve işi yazarsınız. Terzi otele gelir, ölçüyü alır, kıyafeti atölyede yapar ve bitince otele geri getirir.",
    "en": "You write your hotel and the job on WhatsApp. The tailor comes to the hotel, takes the measurements, does the work in the workshop and brings the garment back.",
    "de": "Sie schreiben uns Hotel und Arbeit per WhatsApp. Der Schneider kommt ins Hotel, nimmt Maß, erledigt die Arbeit in der Werkstatt und bringt das Stück zurück.",
    "ru": "Вы пишете в WhatsApp название отеля и задачу. Портной приезжает в отель, снимает мерки, выполняет работу в мастерской и привозит вещь обратно.",
    "es": "Nos escribe por WhatsApp su hotel y el trabajo. El sastre va al hotel, toma las medidas, hace el trabajo en el taller y le devuelve la prenda.",
    "fr": "Vous nous écrivez sur WhatsApp votre hôtel et le travail. Le tailleur vient à l'hôtel, prend les mesures, réalise le travail à l'atelier et vous rapporte le vêtement.",
    "pl": "Piszesz na WhatsAppie nazwę hotelu i zakres pracy. Krawiec przyjeżdża do hotelu, bierze miarę, wykonuje pracę w pracowni i odwozi ubranie.",
    "uk": "Ви пишете у WhatsApp назву готелю та завдання. Кравець приїжджає в готель, знімає мірки, виконує роботу в майстерні й привозить річ назад.",
    "nl": "U stuurt ons via WhatsApp uw hotel en het werk. De kleermaker komt naar het hotel, neemt de maten, doet het werk in het atelier en brengt het kledingstuk terug.",
    "ar": "تكتب لنا عبر واتساب اسم فندقك والعمل المطلوب. يأتي الخياط إلى الفندق ويأخذ المقاسات وينجز العمل في الورشة ثم يعيد القطعة إليك."
   }
  },
  {
   "h": {
    "tr": "Otel alım ve teslim yapıyor musunuz?",
    "en": "Do you collect from and deliver to hotels?",
    "de": "Holen Sie im Hotel ab und liefern dorthin zurück?",
    "ru": "Забираете ли вы вещи из отеля и привозите обратно?",
    "es": "¿Son disponibles la recogida y entrega en el hotel?",
    "fr": "Proposez-vous la prise en charge et la livraison à l’hôtel ?",
    "pl": "Czy odbiór i dostawa w hotelu są dostępne?",
    "uk": "Чи забір і доставка в готелі?",
    "nl": "Zijn ophalen en bezorgen in het hotel mogelijk?",
    "ar": "هل الاستلام والتسليم في الفندق متاح؟"
   },
   "p": {
    "tr": "Evet. Konyaaltı, Lara, Belek, Kemer, Side ve çevresindeki otellerden alıp geri getiriyoruz.",
    "en": "Yes. We collect from and return to hotels in Konyaaltı, Lara, Belek, Kemer, Side and nearby.",
    "de": "Ja. Wir holen in Hotels in Konyaaltı, Lara, Belek, Kemer, Side und Umgebung ab und bringen zurück.",
    "ru": "Да. Забираем из отелей в Коньяалты, Ларе, Белеке, Кемере, Сиде и рядом и привозим обратно.",
    "es": "Sí. Recogemos y devolvemos en hoteles de Konyaaltı, Lara, Belek, Kemer, Side y alrededores.",
    "fr": "Oui. Nous prenons et rapportons les vêtements dans les hôtels de Konyaaltı, Lara, Belek, Kemer, Side et des environs.",
    "pl": "Tak. Odbieramy z hoteli i odwozimy do nich w Konyaaltı, Larze, Belek, Kemer, Side i okolicach.",
    "uk": "Так. Забираємо з готелів і привозимо назад у Коньяалти, Ларі, Белеку, Кемері, Сіде та поруч.",
    "nl": "Ja. Wij halen op bij en brengen terug naar hotels in Konyaaltı, Lara, Belek, Kemer, Side en omgeving.",
    "ar": "نعم. نستلم من فنادق كونيالتي ولارا وبيليك وكيمير وسيدا وما حولها ونعيد القطعة إليها."
   }
  },
  {
   "h": {
    "tr": "Tatilde kıyafetim bozuldu, yetişir mi?",
    "en": "My outfit broke on holiday. Can it be ready in time?",
    "de": "Mein Outfit ist im Urlaub kaputtgegangen. Wird es rechtzeitig fertig?",
    "ru": "Одежда испортилась в отпуске. Успеете?",
    "es": "Se me ha estropeado la ropa en vacaciones: ¿llegará a tiempo?",
    "fr": "Mon vêtement s'est abîmé en vacances : sera-t-il prêt à temps ?",
    "pl": "Ubranie zniszczyło się na wakacjach. Zdążycie?",
    "uk": "Одяг зіпсувався у відпустці. Встигнете?",
    "nl": "Mijn kleding is stukgegaan op vakantie: is het op tijd klaar?",
    "ar": "تلفت ملابسي في العطلة، هل تلحقون؟"
   },
   "p": {
    "tr": "Acil paça, fermuar ve bel işleri 1–2 saatte hazır olur; süre işin durumuna göre değişir. Davet ya da toplantı saatinizi WhatsApp'tan yazın.",
    "en": "Urgent hem, zipper and waist jobs are ready in 1–2 hours, depending on the job. Tell us the time of your event or meeting on WhatsApp.",
    "de": "Eilige Arbeiten an Saum, Reißverschluss und Bund sind in 1–2 Stunden fertig, je nach Arbeit. Schreiben Sie uns die Uhrzeit Ihres Termins per WhatsApp.",
    "ru": "Срочные работы с низом, молнией и поясом готовы за 1–2 часа, в зависимости от работы. Напишите в WhatsApp, к какому времени нужна вещь.",
    "es": "Los arreglos urgentes de bajos, cremalleras y cintura están listos en 1–2 horas, según el trabajo. Díganos por WhatsApp a qué hora es su evento.",
    "fr": "Les travaux urgents d'ourlet, de fermeture et de taille sont prêts en 1 à 2 heures, selon le travail. Indiquez-nous sur WhatsApp l'heure de votre événement.",
    "pl": "Pilne prace przy nogawkach, zamku i pasie są gotowe w 1–2 godziny, zależnie od pracy. Napisz na WhatsAppie, na którą godzinę potrzebujesz ubrania.",
    "uk": "Термінові роботи з низом, блискавкою та поясом готові за 1–2 години, залежно від роботи. Напишіть у WhatsApp, на котру годину потрібна річ.",
    "nl": "Spoedwerk aan zoom, rits en taille is klaar in 1–2 uur, afhankelijk van het werk. Laat ons via WhatsApp weten hoe laat uw afspraak is.",
    "ar": "الأعمال المستعجلة للأطراف والسحاب والخصر جاهزة خلال 1–2 ساعة، حسب العمل. اكتب لنا عبر واتساب موعد مناسبتك."
   }
  }
 ]
};
// Fiyat rakamı YAZILMAYAN diller (es/fr/pl/uk/nl/ar sayfaları: fiyat WhatsApp'ta netleşir).
const YENI_FP = {
 "h": {
  "tr": "{y} terzi: yapılan işler ve süre",
  "en": "Tailor in {y}: what we do and how long it takes",
  "de": "Schneider in {y}: Arbeiten und Dauer",
  "ru": "Портной в {y}: работы и сроки",
  "es": "Sastre en {y}: trabajos y plazos",
  "fr": "Tailleur à {y} : travaux et délais",
  "pl": "Krawiec w {y}: zakres prac i terminy",
  "uk": "Кравець у {y}: роботи та строки",
  "nl": "Kleermaker in {y}: werkzaamheden en doorlooptijd",
  "ar": "خياط في {y}: الأعمال والمدة"
 },
 "p": {
  "tr": "Paça, bel, fermuar, gelinlik ve abiye tadilatı ile özel dikim yapıyoruz. Normal işler aynı gün, acil işler 1–2 saatte hazır olur; net fiyatı WhatsApp'tan yazarız.",
  "en": "We do hems, waists, zippers, wedding and evening dress alterations and made-to-measure sewing. Normal jobs are ready the same day, urgent ones in 1–2 hours; we send the exact price on WhatsApp.",
  "de": "Wir machen Saum, Bund, Reißverschluss, Änderungen an Braut- und Abendkleidern sowie Maßanfertigung. Normale Arbeiten am selben Tag, eilige in 1–2 Stunden; den genauen Preis schreiben wir per WhatsApp.",
  "ru": "Делаем подшив, пояс, молнии, переделку свадебных и вечерних платьев и пошив по меркам. Обычные работы — в тот же день, срочные — за 1–2 часа; точную цену пишем в WhatsApp.",
  "es": "Hacemos bajos, cintura, cremalleras, arreglos de vestidos de novia y de fiesta y confección a medida. Trabajos normales el mismo día, urgentes en 1–2 horas; el precio exacto se lo escribimos por WhatsApp.",
  "fr": "Nous faisons ourlets, taille, fermetures éclair, retouches de robes de mariée et de soirée et confection sur mesure. Travaux normaux le jour même, urgents en 1 à 2 heures ; nous vous écrivons le prix exact sur WhatsApp.",
  "pl": "Robimy nogawki, pas, zamki, przeróbki sukien ślubnych i wieczorowych oraz szycie na miarę. Zwykłe prace tego samego dnia, pilne w 1–2 godziny; dokładną cenę napiszemy na WhatsAppie.",
  "uk": "Робимо підшивання, пояс, блискавки, переробку весільних і вечірніх суконь та пошиття за мірками. Звичайні роботи — того ж дня, термінові — за 1–2 години; точну ціну пишемо у WhatsApp.",
  "nl": "Wij doen zoom, taille, ritsen, vermaak van bruids- en avondjurken en maatwerk. Gewoon werk dezelfde dag, spoed in 1–2 uur; de exacte prijs sturen wij via WhatsApp.",
  "ar": "نقوم بتقصير الأطراف وتضييق الخصر واستبدال السحابات وتعديل فساتين الزفاف والسهرة والخياطة حسب المقاس. الأعمال العادية في اليوم نفسه والمستعجلة خلال 1–2 ساعة؛ ونكتب لك السعر الدقيق عبر واتساب."
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
