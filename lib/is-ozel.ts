// ============================================================
// lib/is-ozel.ts — Küçük dillerde (es, fr, pl, uk, nl, ar) iş rehberi sayfalarına İŞE ÖZEL bilgi:
// başlangıç fiyatı, süre ve 3 pratik ipucu. Amaç: 14 iş sayfasının birbirinin kopyası olmaması
// (Search Console: "Keşfedildi/Tarandı – dizine eklenmedi"; sayfalar %97 aynıydı, Kasım 2026).
// İki sitede aynı dosya kullanılır (terzihizmeti: lib/intl-hizmet.ts, swaphubs: lib/intl-hz.ts).
// Fiyat ve süreler sahip kurallarından (terzihizmeti lib/facts.ts, lib/delivery.ts): € fiyatlar turist
// başlangıç fiyatlarıdır (paça/bel/kol/boy €10, fermuar €15, deri €20), KDV dahildir; gelinlik/abiye
// tadilatı ve dikim işlerinde sabit fiyat yazılmaz. Burada fiyat değişirse lib/facts.ts ile birlikte değiştirin.
// ============================================================
export type IsLang = 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
export type IsId = 'paca' | 'kot' | 'bel' | 'fermuar' | 'elbise' | 'gelinlik' | 'abiye' | 'kol' | 'takim' | 'mont' | 'deri' | 'pantolon' | 'beden' | 'tamir';

type Fiyat = 'hem' | 'zip' | 'leather' | 'suit' | 'coat' | 'byJob' | 'byModel';
type Sure = 'fast' | 'job' | 'model';
const KIND: Record<IsId, [Fiyat, Sure]> = {
  paca: ['hem', 'fast'], kot: ['hem', 'fast'], bel: ['hem', 'fast'], kol: ['hem', 'fast'], pantolon: ['hem', 'fast'], beden: ['hem', 'fast'],
  fermuar: ['zip', 'fast'], mont: ['coat', 'fast'], deri: ['leather', 'job'], takim: ['suit', 'job'], tamir: ['byJob', 'fast'],
  gelinlik: ['byJob', 'job'], abiye: ['byJob', 'job'], elbise: ['byModel', 'model'],
};

type Copy = {
  h: string; priceL: string; timeL: string; tipsH: string;
  price: Record<Fiyat, string>; time: Record<Sure, string>;
  tips: Record<IsId, [string, string, string]>;
};

const C: Record<IsLang, Copy> = {
  es: {
    h: 'Precio, plazo y consejos para este arreglo', priceL: 'Precio', timeL: 'Plazo', tipsH: 'Consejos prácticos',
    price: {
      hem: 'desde 10 € (IVA incluido); el precio exacto se confirma con una foto',
      zip: 'cambio de cremallera desde 15 € (IVA incluido), también en abrigos y chaquetas',
      leather: 'arreglos en cuero desde 20 € (IVA incluido)',
      suit: 'mangas y bajos desde 10 € (IVA incluido); otros ajustes según la foto o los detalles del trabajo',
      coat: 'cremallera de abrigo desde 15 € (IVA incluido); otras reparaciones según la foto',
      byJob: 'según la foto o los detalles del trabajo; se lo decimos antes de empezar',
      byModel: 'según la foto y el modelo que quiera',
    },
    time: { fast: 'urgente en 1–2 horas; trabajos normales el mismo día, según el trabajo', job: 'según el trabajo; se lo confirmamos por WhatsApp', model: 'según el modelo y la cantidad' },
    tips: {
      paca: ['Traiga o póngase los zapatos que va a usar: el largo se marca con ellos.', 'Si el pantalón tiene vuelta (dobladillo doblado hacia fuera), díganoslo para mantenerla.', 'En lino y algodón que encogen al lavar, podemos dejar un poco más de tela en el bajo.'],
      kot: ['En la mayoría de vaqueros se puede conservar el bajo original con el desgaste de fábrica.', 'En vaqueros muy gruesos o elásticos a veces queda mejor un bajo nuevo; se lo decimos al verlo.', 'Si además quiere estrechar la pernera, indíquelo y lo marcamos en la misma prueba.'],
      bel: ['El ajuste de cintura funciona mejor cuando la prenda queda una o dos tallas grande.', 'Según los bolsillos y las trabillas, se ajusta por la costura trasera o por los costados.', 'Póngase la prenda en la prueba: así marcamos con alfileres la medida exacta.'],
      fermuar: ['Los abrigos llevan cremallera separable; los pantalones, cremallera cerrada.', 'Si solo falla el cursor, a veces basta con cambiarlo y es más económico.', 'Los vestidos con cremallera invisible necesitan otra invisible: traiga la prenda para elegirla.'],
      elbise: ['Envíe una foto del modelo que desea y diga qué tejido prefiere.', 'Para el verano de Antalya, el lino y el algodón son los tejidos más cómodos.', 'Si su estancia es corta, díganos la fecha de salida para planificar la prueba.'],
      gelinlik: ['Lo ideal es traer el vestido con tiempo; si viaja, indíquenos la fecha del evento.', 'Traiga los zapatos y la ropa interior que llevará ese día.', 'Encaje, pedrería y cola necesitan más tiempo: primero vemos la foto.'],
      abiye: ['¿Lo compró durante el viaje? Lo acortamos o ajustamos antes de su evento.', 'Traiga los zapatos de la noche para marcar el largo.', 'Los bajos con pedrería o lentejuelas se valoran con una foto.'],
      kol: ['En chaquetas, la manga se acorta desde el puño; los ojales funcionales pueden limitar el ajuste.', 'En camisas se acorta conservando la forma del puño.', 'Póngase la chaqueta con la camisa que llevará debajo.'],
      takim: ['Lo más habitual: mangas, bajos del pantalón, cintura y costados de la chaqueta.', 'Los cambios de hombro son limitados; se lo decimos con sinceridad antes de empezar.', 'Si es para una boda o evento, díganos la fecha para planificar la prueba.'],
      mont: ['Cambiamos la cremallera de abrigos y chaquetas, también la separable.', 'Reparamos forros rotos y bolsillos descosidos.', 'En plumíferos cerramos los agujeros con cuidado para que no se salga el relleno.'],
      deri: ['En el cuero los agujeros de la aguja quedan para siempre, por eso marcamos con mucho cuidado.', 'Se pueden acortar mangas y bajos o estrechar, según el tipo de cuero.', 'Envíe una foto de la prenda y de la etiqueta.'],
      pantolon: ['Hacemos bajos, cintura y estrechamiento de pernera.', 'Para estrechar la pernera, póngase el pantalón y lo marcamos.', 'Díganos si prefiere pierna recta o más ajustada.'],
      beden: ['Estrechar es más fácil que ensanchar; ensanchar depende del margen de las costuras.', 'Revisamos los costados para ver cuánta tela de reserva hay.', 'En vestidos ajustamos cintura y pecho en la misma prueba.'],
      tamir: ['Los descosidos suelen quedar listos el mismo día.', 'Un roto no siempre admite zurcido invisible; le proponemos zurcido o parche.', 'Envíe una foto del daño y le decimos el precio.'],
    },
  },
  fr: {
    h: 'Prix, délai et conseils pour cette retouche', priceL: 'Prix', timeL: 'Délai', tipsH: 'Conseils pratiques',
    price: {
      hem: 'à partir de 10 € (TVA incluse) ; le prix exact est confirmé sur photo',
      zip: 'remplacement de fermeture à glissière à partir de 15 € (TVA incluse), aussi pour manteaux et vestes',
      leather: 'retouches cuir à partir de 20 € (TVA incluse)',
      suit: 'manches et ourlets à partir de 10 € (TVA incluse) ; autres ajustements selon la photo ou les détails du travail',
      coat: 'fermeture de manteau à partir de 15 € (TVA incluse) ; autres réparations selon la photo',
      byJob: 'selon la photo ou les détails du travail ; nous vous le disons avant de commencer',
      byModel: 'selon la photo et le modèle souhaité',
    },
    time: { fast: 'urgent en 1 à 2 heures ; travaux courants le jour même, selon le travail', job: 'selon le travail ; confirmé sur WhatsApp', model: 'selon le modèle et la quantité' },
    tips: {
      paca: ['Apportez ou portez les chaussures prévues : la longueur se marque avec elles.', 'Si le pantalon a un revers, dites-le-nous pour le conserver.', 'Pour le lin et le coton qui rétrécissent, nous pouvons laisser un peu plus de tissu dans l’ourlet.'],
      kot: ['Sur la plupart des jeans, on peut garder l’ourlet d’origine avec son délavage.', 'Sur un jean très épais ou stretch, un nouvel ourlet est parfois préférable ; nous vous le dirons.', 'Si vous voulez aussi resserrer la jambe, dites-le : nous le marquons au même essayage.'],
      bel: ['La reprise de taille marche le mieux quand le vêtement est trop grand d’une ou deux tailles.', 'Selon les poches et les passants, on reprend par la couture arrière ou par les côtés.', 'Portez le vêtement à l’essayage : nous épinglons la mesure exacte.'],
      fermuar: ['Les manteaux ont une fermeture séparable, les pantalons une fermeture fermée.', 'Si seul le curseur est cassé, le changer suffit parfois et coûte moins cher.', 'Une robe à fermeture invisible demande une fermeture invisible : apportez la robe.'],
      elbise: ['Envoyez une photo du modèle souhaité et dites quel tissu vous préférez.', 'Pour l’été à Antalya, le lin et le coton sont les plus agréables.', 'Si votre séjour est court, donnez-nous votre date de départ pour prévoir l’essayage.'],
      gelinlik: ['Idéalement, apportez la robe bien à l’avance ; en voyage, donnez-nous la date de l’événement.', 'Apportez les chaussures et les sous-vêtements prévus pour ce jour-là.', 'Dentelle, perles et traîne demandent plus de temps : nous regardons d’abord la photo.'],
      abiye: ['Achetée pendant le voyage ? Nous la raccourcissons ou l’ajustons avant votre soirée.', 'Apportez les chaussures de la soirée pour marquer la longueur.', 'Les ourlets perlés ou à paillettes sont estimés sur photo.'],
      kol: ['Sur une veste, la manche se raccourcit par le poignet ; les boutonnières fonctionnelles peuvent limiter la retouche.', 'Sur une chemise, on raccourcit en gardant la forme du poignet.', 'Portez la veste avec la chemise prévue en dessous.'],
      takim: ['Le plus courant : manches, ourlets du pantalon, taille et côtés de la veste.', 'Les épaules se modifient peu ; nous vous le disons franchement avant de commencer.', 'Pour un mariage ou un événement, donnez-nous la date pour planifier l’essayage.'],
      mont: ['Nous changeons la fermeture des manteaux et vestes, y compris séparable.', 'Nous réparons les doublures déchirées et les poches décousues.', 'Sur une doudoune, nous refermons les trous avec soin pour que le duvet ne s’échappe pas.'],
      deri: ['Sur le cuir, les trous d’aiguille restent : nous marquons avec beaucoup de soin.', 'On peut raccourcir manches et bas ou resserrer, selon le cuir.', 'Envoyez une photo du vêtement et de l’étiquette.'],
      pantolon: ['Ourlets, taille et resserrage de jambe.', 'Pour resserrer la jambe, portez le pantalon et nous épinglons.', 'Dites-nous si vous voulez une jambe droite ou plus ajustée.'],
      beden: ['Reprendre est plus facile qu’agrandir ; agrandir dépend de la marge des coutures.', 'Nous vérifions les côtés pour voir le tissu de réserve.', 'Pour une robe, nous ajustons taille et poitrine au même essayage.'],
      tamir: ['Les coutures défaites sont en général prêtes le jour même.', 'Une déchirure n’accepte pas toujours un stoppage invisible ; nous proposons reprise ou pièce.', 'Envoyez une photo du dommage et nous vous donnons le prix.'],
    },
  },
  pl: {
    h: 'Cena, czas i porady do tej przeróbki', priceL: 'Cena', timeL: 'Czas', tipsH: 'Praktyczne porady',
    price: {
      hem: 'od 10 € (z VAT); dokładną cenę potwierdzamy po zdjęciu',
      zip: 'wymiana zamka od 15 € (z VAT), także w płaszczach i kurtkach',
      leather: 'przeróbki skóry od 20 € (z VAT)',
      suit: 'rękawy i dół od 10 € (z VAT); inne poprawki według zdjęcia lub zakresu prac',
      coat: 'zamek w płaszczu od 15 € (z VAT); inne naprawy według zdjęcia',
      byJob: 'według zdjęcia lub zakresu prac; podajemy cenę przed rozpoczęciem',
      byModel: 'według zdjęcia i wybranego modelu',
    },
    time: { fast: 'pilne w 1–2 godziny; zwykłe prace tego samego dnia, zależnie od pracy', job: 'zależnie od pracy; potwierdzamy na WhatsApp', model: 'zależnie od modelu i ilości' },
    tips: {
      paca: ['Przynieś lub załóż buty, w których będziesz chodzić: długość zaznaczamy w nich.', 'Jeśli spodnie mają mankiet, powiedz nam, a go zachowamy.', 'W lnie i bawełnie, które kurczą się w praniu, możemy zostawić więcej materiału w podłożeniu.'],
      kot: ['W większości dżinsów da się zachować oryginalny dół z fabrycznym przetarciem.', 'Przy bardzo grubym lub elastycznym dżinsie czasem lepszy jest nowy dół; powiemy po obejrzeniu.', 'Jeśli chcesz też zwęzić nogawkę, powiedz – zaznaczymy to przy tej samej przymiarce.'],
      bel: ['Zwężanie w pasie najlepiej wychodzi, gdy ubranie jest za duże o jeden–dwa rozmiary.', 'Zależnie od kieszeni i szlufek zwężamy w tylnym szwie albo po bokach.', 'Załóż ubranie na przymiarkę – zaznaczymy szpilkami dokładny wymiar.'],
      fermuar: ['Płaszcze mają zamek rozdzielczy, spodnie – zamek zamknięty.', 'Jeśli zepsuł się tylko suwak, czasem wystarczy go wymienić i jest taniej.', 'Sukienka z zamkiem krytym wymaga zamka krytego – przynieś ją, dobierzemy go.'],
      elbise: ['Wyślij zdjęcie wybranego modelu i napisz, jaki materiał wolisz.', 'Na lato w Antalyi najwygodniejsze są len i bawełna.', 'Jeśli pobyt jest krótki, podaj datę wyjazdu, a zaplanujemy przymiarkę.'],
      gelinlik: ['Najlepiej przynieść suknię z wyprzedzeniem; w podróży podaj datę uroczystości.', 'Przynieś buty i bieliznę, które założysz tego dnia.', 'Koronka, koraliki i tren wymagają więcej czasu – najpierw oglądamy zdjęcie.'],
      abiye: ['Kupiona w czasie podróży? Skrócimy lub dopasujemy ją przed wieczorem.', 'Przynieś wieczorowe buty, żeby zaznaczyć długość.', 'Doły z koralikami lub cekinami wyceniamy po zdjęciu.'],
      kol: ['W marynarce rękaw skraca się od mankietu; działające dziurki na guziki mogą ograniczać przeróbkę.', 'W koszuli skracamy, zachowując kształt mankietu.', 'Załóż marynarkę z koszulą, którą będziesz pod nią nosić.'],
      takim: ['Najczęściej: rękawy, dół spodni, pas i boki marynarki.', 'Zmiany w ramionach są ograniczone – uczciwie powiemy to przed rozpoczęciem.', 'Jeśli to na ślub lub wydarzenie, podaj datę, a zaplanujemy przymiarkę.'],
      mont: ['Wymieniamy zamki w płaszczach i kurtkach, także rozdzielcze.', 'Naprawiamy rozdartą podszewkę i rozprute kieszenie.', 'W kurtkach puchowych ostrożnie zamykamy dziury, żeby puch nie uciekał.'],
      deri: ['W skórze dziurki po igle zostają na zawsze, dlatego zaznaczamy bardzo starannie.', 'Można skrócić rękawy i dół albo zwęzić, zależnie od rodzaju skóry.', 'Wyślij zdjęcie ubrania i metki.'],
      pantolon: ['Robimy podłożenia, pas i zwężanie nogawek.', 'Przy zwężaniu nogawek załóż spodnie, a my je zaznaczymy.', 'Powiedz, czy wolisz prostą, czy bardziej dopasowaną nogawkę.'],
      beden: ['Zwężyć jest łatwiej niż poszerzyć; poszerzenie zależy od zapasu w szwach.', 'Sprawdzamy boki, ile jest zapasu materiału.', 'W sukience dopasowujemy pas i biust przy jednej przymiarce.'],
      tamir: ['Rozprute szwy są zwykle gotowe tego samego dnia.', 'Nie każde rozdarcie da się niewidocznie zacerować; zaproponujemy cerowanie lub łatę.', 'Wyślij zdjęcie uszkodzenia, a podamy cenę.'],
    },
  },
  uk: {
    h: 'Ціна, термін і поради щодо цієї роботи', priceL: 'Ціна', timeL: 'Термін', tipsH: 'Практичні поради',
    price: {
      hem: 'від 10 € (з ПДВ); точну ціну підтверджуємо за фото',
      zip: 'заміна блискавки від 15 € (з ПДВ), також у пальтах і куртках',
      leather: 'роботи зі шкірою від 20 € (з ПДВ)',
      suit: 'рукави й низ від 10 € (з ПДВ); інші зміни за фото або за деталями роботи',
      coat: 'блискавка в пальті від 15 € (з ПДВ); інший ремонт за фото',
      byJob: 'за фото або за деталями роботи; ціну скажемо до початку',
      byModel: 'за фото та бажаною моделлю',
    },
    time: { fast: 'терміново за 1–2 години; звичайні роботи в той самий день, залежно від роботи', job: 'залежно від роботи; підтверджуємо у WhatsApp', model: 'залежно від моделі та кількості' },
    tips: {
      paca: ['Принесіть або взуйте взуття, яке носитимете: довжину позначаємо саме з ним.', 'Якщо на штанях є відворот, скажіть нам — ми його збережемо.', 'Для льону й бавовни, що сідають після прання, можемо залишити більше тканини в підгині.'],
      kot: ['У більшості джинсів можна зберегти оригінальний низ із фабричною потертістю.', 'На дуже щільному або еластичному деніме інколи краще новий низ — скажемо, коли побачимо.', 'Якщо хочете ще й звузити холошу, скажіть — позначимо на тій самій примірці.'],
      bel: ['Ушивання в поясі найкраще вдається, коли річ завелика на один-два розміри.', 'Залежно від кишень і шлеївок ушиваємо по задньому шву або з боків.', 'Одягніть річ на примірку — ми точно позначимо шпильками.'],
      fermuar: ['У пальтах — роз’ємна блискавка, у штанях — нероз’ємна.', 'Якщо зламався лише бігунок, часто достатньо замінити його, і це дешевше.', 'Для сукні з прихованою блискавкою потрібна прихована — принесіть сукню.'],
      elbise: ['Надішліть фото бажаної моделі й напишіть, яку тканину обираєте.', 'Для літа в Анталії найзручніші льон і бавовна.', 'Якщо ви ненадовго, повідомте дату від’їзду — сплануємо примірку.'],
      gelinlik: ['Найкраще принести сукню заздалегідь; у подорожі повідомте дату події.', 'Принесіть взуття та білизну, які одягнете в цей день.', 'Мереживо, бісер і шлейф потребують більше часу — спершу дивимось фото.'],
      abiye: ['Купили під час подорожі? Вкоротимо або підженемо до вашого вечора.', 'Принесіть вечірнє взуття, щоб позначити довжину.', 'Низ із бісером чи паєтками оцінюємо за фото.'],
      kol: ['У піджаку рукав вкорочують від манжети; робочі петлі можуть обмежувати роботу.', 'У сорочці вкорочуємо, зберігаючи форму манжети.', 'Одягніть піджак із сорочкою, яку носитимете під ним.'],
      takim: ['Найчастіше: рукави, низ штанів, пояс і боки піджака.', 'Плечі змінюються обмежено — чесно скажемо про це до початку.', 'Якщо це на весілля чи подію, назвіть дату — сплануємо примірку.'],
      mont: ['Міняємо блискавки в пальтах і куртках, зокрема роз’ємні.', 'Ремонтуємо порвану підкладку й розпорені кишені.', 'У пуховиках обережно закриваємо дірки, щоб пух не виходив.'],
      deri: ['На шкірі сліди від голки лишаються назавжди, тому позначаємо дуже уважно.', 'Можна вкоротити рукави й низ або звузити — залежно від шкіри.', 'Надішліть фото речі та етикетки.'],
      pantolon: ['Підгин, пояс і звуження холош.', 'Для звуження холош одягніть штани — ми позначимо.', 'Скажіть, чи хочете пряму, чи більш облягаючу холошу.'],
      beden: ['Звузити легше, ніж розширити; розширення залежить від запасу у швах.', 'Перевіряємо бокові шви, скільки є запасу тканини.', 'У сукні підганяємо талію й груди за одну примірку.'],
      tamir: ['Розпорені шви зазвичай готові того ж дня.', 'Не кожну дірку можна непомітно заштопати; запропонуємо штопку або латку.', 'Надішліть фото пошкодження — назвемо ціну.'],
    },
  },
  nl: {
    h: 'Prijs, duur en tips voor deze aanpassing', priceL: 'Prijs', timeL: 'Duur', tipsH: 'Praktische tips',
    price: {
      hem: 'vanaf € 10 (incl. btw); de exacte prijs bevestigen we op basis van een foto',
      zip: 'rits vervangen vanaf € 15 (incl. btw), ook bij jassen en jacks',
      leather: 'aanpassingen aan leer vanaf € 20 (incl. btw)',
      suit: 'mouwen en zomen vanaf € 10 (incl. btw); andere aanpassingen op basis van foto of details van het werk',
      coat: 'jasrits vanaf € 15 (incl. btw); andere reparaties op basis van een foto',
      byJob: 'op basis van foto of details van het werk; u hoort de prijs vooraf',
      byModel: 'op basis van foto en het gewenste model',
    },
    time: { fast: 'spoed binnen 1–2 uur; gewone klussen dezelfde dag, afhankelijk van het werk', job: 'afhankelijk van het werk; we bevestigen het via WhatsApp', model: 'afhankelijk van model en aantal' },
    tips: {
      paca: ['Neem de schoenen mee die u gaat dragen: de lengte wordt ermee afgespeld.', 'Heeft de broek een omslag, zeg het ons, dan houden we die.', 'Bij linnen en katoen die krimpen, laten we graag wat extra stof in de zoom.'],
      kot: ['Bij de meeste jeans kan de originele zoom met fabriekswassing blijven.', 'Bij heel dikke of stretchjeans is een nieuwe zoom soms beter; dat zeggen we na het bekijken.', 'Wilt u ook de pijp smaller, zeg het, dan spelden we dat bij dezelfde pasbeurt.'],
      bel: ['Innemen in de taille werkt het best als het kledingstuk een of twee maten te groot is.', 'Afhankelijk van zakken en lusjes nemen we in via de achternaad of de zijkanten.', 'Draag het kledingstuk bij het passen, dan spelden we de exacte maat.'],
      fermuar: ['Jassen hebben een deelbare rits, broeken een gesloten rits.', 'Is alleen de schuiver kapot, dan volstaat vaak een nieuwe schuiver en is het goedkoper.', 'Een jurk met blinde rits heeft weer een blinde rits nodig: neem de jurk mee.'],
      elbise: ['Stuur een foto van het gewenste model en zeg welke stof u wilt.', 'Voor de zomer in Antalya zijn linnen en katoen het prettigst.', 'Bent u kort hier, geef dan uw vertrekdatum door voor de pasbeurt.'],
      gelinlik: ['Breng de jurk liefst ruim van tevoren; op reis geeft u de datum van het feest door.', 'Neem de schoenen en het ondergoed mee die u die dag draagt.', 'Kant, kralen en sleep vragen meer tijd: we bekijken eerst de foto.'],
      abiye: ['Op reis gekocht? We korten of passen hem aan vóór uw avond.', 'Neem de avondschoenen mee om de lengte af te spelden.', 'Zomen met kralen of pailletten prijzen we op basis van een foto.'],
      kol: ['Bij een colbert wordt de mouw aan de manchetkant ingekort; werkende knoopsgaten kunnen dat beperken.', 'Bij een overhemd korten we in met behoud van de manchetvorm.', 'Trek het colbert aan met het overhemd dat u eronder draagt.'],
      takim: ['Meest gevraagd: mouwen, broekzoom, taille en zijkanten van het colbert.', 'Schouders aanpassen kan maar beperkt; dat zeggen we eerlijk vooraf.', 'Is het voor een bruiloft of evenement, geef de datum door voor de pasbeurt.'],
      mont: ['We vervangen ritsen van jassen en jacks, ook deelbare ritsen.', 'We repareren gescheurde voering en losgeraakte zakken.', 'Bij donsjassen dichten we gaten zorgvuldig zodat de vulling er niet uit komt.'],
      deri: ['In leer blijven naaldgaatjes zichtbaar, dus we spelden heel zorgvuldig af.', 'Mouwen en zoom inkorten of innemen kan, afhankelijk van het leer.', 'Stuur een foto van het kledingstuk en het label.'],
      pantolon: ['Zomen, taille en pijpen smaller maken.', 'Voor smallere pijpen trekt u de broek aan en spelden wij af.', 'Zeg of u een rechte of een smallere pijp wilt.'],
      beden: ['Innemen is makkelijker dan uitleggen; uitleggen hangt af van de naadtoeslag.', 'We kijken in de zijnaden hoeveel reservestof er is.', 'Bij een jurk passen we taille en buste in één pasbeurt aan.'],
      tamir: ['Losse naden zijn meestal dezelfde dag klaar.', 'Niet elk gat kan onzichtbaar gestopt worden; we stellen stoppen of een lap voor.', 'Stuur een foto van de schade, dan noemen we de prijs.'],
    },
  },
  ar: {
    h: 'السعر والمدة ونصائح لهذا العمل', priceL: 'السعر', timeL: 'المدة', tipsH: 'نصائح عملية',
    price: {
      hem: 'ابتداءً من 10 € (شامل ضريبة القيمة المضافة)؛ نؤكد السعر الدقيق من الصورة',
      zip: 'تغيير السحاب ابتداءً من 15 € (شامل الضريبة)، ويشمل المعاطف والجاكيتات',
      leather: 'تعديلات الجلد ابتداءً من 20 € (شامل الضريبة)',
      suit: 'الأكمام والحواف ابتداءً من 10 € (شامل الضريبة)؛ التعديلات الأخرى حسب الصورة أو تفاصيل العمل',
      coat: 'سحاب المعطف ابتداءً من 15 € (شامل الضريبة)؛ الإصلاحات الأخرى حسب الصورة',
      byJob: 'حسب الصورة أو تفاصيل العمل؛ نخبرك بالسعر قبل البدء',
      byModel: 'حسب الصورة والموديل الذي تريده',
    },
    time: { fast: 'المستعجل خلال 1–2 ساعة؛ الأعمال العادية في اليوم نفسه حسب العمل', job: 'حسب العمل؛ نؤكده عبر واتساب', model: 'حسب الموديل والكمية' },
    tips: {
      paca: ['أحضر الحذاء الذي ستلبسه أو البسه: نحدد الطول به.', 'إذا كان للبنطال ثنية في الأسفل فأخبرنا لنحافظ عليها.', 'في الكتان والقطن الذي ينكمش بالغسيل يمكننا ترك قماش إضافي في الحاشية.'],
      kot: ['في معظم الجينز يمكن الحفاظ على الحاشية الأصلية بغسلتها المصنعية.', 'في الجينز السميك جدًا أو المطاطي تكون الحاشية الجديدة أحيانًا أفضل؛ نخبرك بعد المعاينة.', 'إذا أردت أيضًا تضييق الرجل فأخبرنا لنحدده في البروفة نفسها.'],
      bel: ['يكون تضييق الخصر أفضل عندما تكون القطعة أكبر بمقاس أو مقاسين.', 'حسب الجيوب والعراوي نضيّق من الدرزة الخلفية أو من الجانبين.', 'البس القطعة في البروفة لنحدد المقاس بالدبابيس بدقة.'],
      fermuar: ['المعاطف تستخدم سحابًا منفصلًا، والبناطيل سحابًا مغلقًا.', 'إذا تعطل المنزلق فقط فقد يكفي تغييره وهو أقل تكلفة.', 'الفستان بسحاب مخفي يحتاج سحابًا مخفيًا: أحضر الفستان لنختاره.'],
      elbise: ['أرسل صورة الموديل الذي تريده وأخبرنا بالقماش المفضل.', 'في صيف أنطاليا يكون الكتان والقطن الأكثر راحة.', 'إذا كانت إقامتك قصيرة فأخبرنا بموعد مغادرتك لنرتب البروفة.'],
      gelinlik: ['الأفضل إحضار الفستان مبكرًا؛ وإن كنت مسافرًا فأخبرنا بموعد المناسبة.', 'أحضر الحذاء والملابس الداخلية التي ستلبسها في ذلك اليوم.', 'الدانتيل والخرز والذيل تحتاج وقتًا أطول: نرى الصورة أولًا.'],
      abiye: ['اشتريته أثناء السفر؟ نقصّره أو نضبطه قبل سهرتك.', 'أحضر حذاء السهرة لتحديد الطول.', 'الحواف المطرزة بالخرز أو الترتر نقدّر سعرها من الصورة.'],
      kol: ['في الجاكيت يُقصَّر الكم من جهة الطرف؛ وقد تحد العراوي العاملة من التعديل.', 'في القميص نقصّر مع الحفاظ على شكل الطرف (الكبك).', 'البس الجاكيت مع القميص الذي ستلبسه تحته.'],
      takim: ['الأكثر طلبًا: الأكمام وحاشية البنطال والخصر وجانبا الجاكيت.', 'تعديل الأكتاف محدود؛ نخبرك بصراحة قبل البدء.', 'إذا كانت لحفل زفاف أو مناسبة فأخبرنا بالموعد لنرتب البروفة.'],
      mont: ['نغيّر سحابات المعاطف والجاكيتات، ومنها السحاب المنفصل.', 'نصلح البطانة الممزقة والجيوب المفتوقة.', 'في جاكيتات الريش نغلق الثقوب بعناية حتى لا يخرج الحشو.'],
      deri: ['في الجلد تبقى ثقوب الإبرة دائمًا، لذلك نحدد بعناية كبيرة.', 'يمكن تقصير الأكمام والحاشية أو التضييق حسب نوع الجلد.', 'أرسل صورة للقطعة وللملصق.'],
      pantolon: ['نقوم بالحاشية والخصر وتضييق الرجلين.', 'لتضييق الرجلين البس البنطال ونحدده بالدبابيس.', 'أخبرنا إن كنت تريد رجلًا مستقيمة أم أكثر ضيقًا.'],
      beden: ['التضييق أسهل من التوسيع؛ التوسيع يعتمد على هامش الدرزات.', 'نفحص الجانبين لنرى كمية القماش الاحتياطي.', 'في الفستان نضبط الخصر والصدر في بروفة واحدة.'],
      tamir: ['الدرزات المفتوقة تجهز عادة في اليوم نفسه.', 'ليس كل تمزق يقبل الرتق غير المرئي؛ نقترح الرتق أو رقعة.', 'أرسل صورة للضرر ونخبرك بالسعر.'],
    },
  },
};


/** İşin kısa adı (terzihizmeti lib/intl-hizmet.ts 'name' alanlarından). */
const NAME: Record<IsLang, Record<IsId, string>> = {
  es: {"paca": "Acortar pantalones", "kot": "Acortar vaqueros", "bel": "Estrechar la cintura", "fermuar": "Cambiar o reparar cremalleras", "elbise": "Vestidos a medida", "gelinlik": "Arreglos de vestidos de novia y de noche", "abiye": "Arreglos de vestidos de noche y ropa de gala", "kol": "Acortar mangas", "takim": "Arreglos de trajes y chaquetas", "mont": "Arreglos de abrigos y chaquetas", "deri": "Arreglos de chaquetas y pantalones de cuero", "pantolon": "Arreglos de pantalones", "beden": "Ajuste de talla de la ropa", "tamir": "Reparación de ropa"},
  fr: {"paca": "Raccourcir un pantalon", "kot": "Raccourcir un jean", "bel": "Reprendre la taille", "fermuar": "Changer ou réparer une fermeture éclair", "elbise": "Robes sur mesure", "gelinlik": "Retouches de robes de mariée et de soirée", "abiye": "Retouches de robes de soirée et tenues de cérémonie", "kol": "Raccourcir les manches", "takim": "Retouches de costumes et vestes", "mont": "Retouches de manteaux et vestes", "deri": "Retouches de vestes et pantalons en cuir", "pantolon": "Retouches de pantalons", "beden": "Ajustement de la taille des vêtements", "tamir": "Réparation de vêtements"},
  pl: {"paca": "Skracanie spodni", "kot": "Skracanie jeansów", "bel": "Zwężanie talii", "fermuar": "Wymiana i naprawa zamków", "elbise": "Sukienki na miarę", "gelinlik": "Przeróbki sukni ślubnych i wieczorowych", "abiye": "Przeróbki sukni wieczorowych i strojów galowych", "kol": "Skracanie rękawów", "takim": "Przeróbki garniturów i marynarek", "mont": "Przeróbki płaszczy i kurtek", "deri": "Przeróbki skórzanych kurtek i spodni", "pantolon": "Przeróbki spodni", "beden": "Dopasowanie rozmiaru odzieży", "tamir": "Naprawa odzieży"},
  uk: {"paca": "Вкорочення штанів", "kot": "Вкорочення джинсів", "bel": "Зуження талії", "fermuar": "Заміна та ремонт блискавок", "elbise": "Сукні на замовлення", "gelinlik": "Підгонка весільних і вечірніх суконь", "abiye": "Підгонка вечірніх суконь і святкового одягу", "kol": "Вкорочення рукавів", "takim": "Підгонка костюмів і піджаків", "mont": "Підгонка пальт і курток", "deri": "Підгонка шкіряних курток і штанів", "pantolon": "Підгонка штанів", "beden": "Підгонка одягу за розміром", "tamir": "Ремонт одягу"},
  nl: {"paca": "Broek inkorten", "kot": "Jeans inkorten", "bel": "Taille innemen", "fermuar": "Rits vervangen of repareren", "elbise": "Jurken op maat", "gelinlik": "Trouwjurken en avondjurken vermaken", "abiye": "Avondjurken en galakleding vermaken", "kol": "Mouwen inkorten", "takim": "Pakken en colberts vermaken", "mont": "Jassen en jacks vermaken", "deri": "Leren jassen en broeken vermaken", "pantolon": "Broeken vermaken", "beden": "Kleding aan uw maat aanpassen", "tamir": "Kleding repareren"},
  ar: {"paca": "تقصير البناطيل", "kot": "تقصير الجينز", "bel": "تضييق الخصر", "fermuar": "تبديل السحّابات وإصلاحها", "elbise": "خياطة الفساتين حسب المقاس", "gelinlik": "تعديل فساتين الزفاف والسهرة", "abiye": "تعديل فساتين السهرة وملابس المناسبات", "kol": "تقصير الأكمام", "takim": "تعديل البدلات والسترات", "mont": "تعديل المعاطف والجاكيتات", "deri": "تعديل السترات والبناطيل الجلدية", "pantolon": "تعديل البناطيل", "beden": "ضبط مقاس الملابس", "tamir": "إصلاح الملابس"},
};

export const IS_LANGS = Object.keys(C) as IsLang[];
export const isIsLang = (l: string): l is IsLang => (IS_LANGS as string[]).includes(l);

export type IsOzel = { name: string; h: string; priceL: string; timeL: string; tipsH: string; price: string; time: string; tips: [string, string, string] };
/** Bir dil ve iş için işe özel bilgi (yalnızca es, fr, pl, uk, nl, ar). */
export function isOzel(lang: string, id: string): IsOzel | null {
  if (!isIsLang(lang) || !(id in KIND)) return null;
  const c = C[lang]; const [f, s] = KIND[id as IsId];
  const cap = (t: string) => t.charAt(0).toLocaleUpperCase(lang) + t.slice(1);
  return { name: NAME[lang][id as IsId], h: c.h, priceL: c.priceL, timeL: c.timeL, tipsH: c.tipsH, price: cap(c.price[f]), time: cap(c.time[s]), tips: c.tips[id as IsId] };
}
