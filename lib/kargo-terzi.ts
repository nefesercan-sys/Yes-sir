// swaphubs.com — "Kargoyla hizmet" EK BÖLÜMÜ (10 dil). Ayrı sayfa DEĞİL; yalnızca online terzi sayfalarında (TR/EN/RU/DE) ve
// yurt dışı sipariş rehberinde (ES/FR/PL/UK/NL/AR) görünür. Antalya-öncelikli: ana mesaj otel/eve gelen terzi + fotoğraftan fiyat.
// Sahip onaylı gerçekler: kargoyla hizmet YALNIZCA Antalya içi ve yurt dışı için; Türkiye'nin diğer illeri için vaat yok (WhatsApp'tan sorulur);
// kargo ücreti müşteriye aittir (yurt dışında da); süre işin durumuna göre; garanti = kargo firmasının taşıma garantisi + Terzi Can'ın
// dikim/tadilat işçilik garantisi; beğenilmezse tekrar tamir yapılabilir; gümrük/ücret/ülke/süre rakamı YOK, "WhatsApp'tan netleştirilir".
// terzihizmeti.com.tr'deki karşılıktan BİLEREK farklı yazılmıştır.
export type KargoLang = 'tr' | 'en' | 'ru' | 'de' | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';

export interface KargoCopy {
  h: string; lead: string; steps: string[]; faqH: string; faq: [string, string][]; waMsg: string; wa: string; svcName: string; svcDesc: string;
}

export const KARGO: Record<KargoLang, KargoCopy> = {
  tr: {
    h: 'Kargoyla da hizmet: Antalya içi ve yurt dışı',
    lead: "Asıl hizmetimiz Antalya'da otelinize veya evinize gelen terzi ve fotoğraftan fiyattır. Bunun yanında kıyafetinizi kargoyla da gönderebilirsiniz; kargoyla hizmet şu anda Antalya içi ve yurt dışı için geçerlidir. Tatil dönüşü evine dönenler veya yurt dışında yaşayanlar da fotoğrafla fiyat alıp kıyafetini bize ulaştırabilir.",
    steps: ["WhatsApp'tan kıyafetin ve işlem yapılacak yerin fotoğrafını gönderin.", 'Fiyatı ve işi siz onaylayın.', 'Kıyafeti kargoyla bize gönderin (kargo ücreti müşteriye aittir).', 'İşlem yapılır ve kıyafet kargoyla adresinize teslim edilir.'],
    faqH: 'Kargoyla hizmet: kısa cevaplar',
    faq: [
      ["Antalya içinde kargoyla olur mu?", "Olur. Ancak Antalya'da ev ve otele alım-teslim ücretsiz olduğundan çoğu müşteri kargoya gerek duymaz; yine de kargoyu tercih ederseniz fotoğraf ve fiyat onayıyla gönderebilirsiniz."],
      ["Yurt dışından kargoyla hizmet alabilir miyim?", "Evet. Yurt dışından fotoğrafla fiyat alıp kıyafetinizi kargoyla gönderebilir, işlem sonrası adresinize kargoyla geri alabilirsiniz. Kargo ve gümrük detayları WhatsApp'tan netleştirilir."],
      ["Antalya dışındaki Türkiye illeri için kargoyla hizmet var mı?", "Şu anda kargoyla hizmetimiz Antalya içi ve yurt dışı için geçerlidir; Türkiye'nin diğer illeri için WhatsApp'tan sorabilirsiniz."],
      ["Kargo ücreti, süre ve garanti nasıl işliyor?", "Kargo ücreti müşteriye aittir. Teslim süresi işin durumuna göre değişir. Kargo firmasının taşıma garantisi vardır; ayrıca dikim ve tadilat işçiliğimiz garantilidir ve beğenilmezse tekrar tamir edilebilir."],
    ],
    waMsg: 'Merhaba, kıyafetimi kargoyla göndermek istiyorum. Fotoğrafı gönderiyorum; yapılacak işin fiyatını öğrenebilir miyim?',
    wa: "Fotoğraf gönder, fiyat al", svcName: 'Kargoyla terzi hizmeti (Antalya içi ve yurt dışı)',
    svcDesc: "Antalya'da otel ve eve ücretsiz alım-teslimin yanında, kıyafetin fotoğrafla fiyatlandırılıp kargoyla alınıp geri gönderildiği tamir, tadilat ve dikim hizmeti. Kargo Antalya içi ve yurt dışı için geçerlidir; kargo ücreti müşteriye aittir.",
  },
  en: {
    h: 'Also by post: within Antalya and from abroad',
    lead: 'Our main service is a tailor who comes to your hotel or home in Antalya, with a price from your photo. On top of that you can post us your garment: shipping is currently available within Antalya and from abroad. If you are back home after your holiday, or you live abroad, you can still get a price from a photo and send the item to us.',
    steps: ['Send a photo of the garment and the area to work on via WhatsApp.', 'Approve the price and the job.', 'Post the garment to us (shipping is paid by the customer).', 'We do the work and ship it back to your address.'],
    faqH: 'Shipping: quick answers',
    faq: [
      ['Can I use shipping inside Antalya?', 'Yes, but since pick-up and delivery to hotels and homes in Antalya are free, most customers do not need it. If you prefer to post the item, send a photo and approve the price first.'],
      ['Can I send my garment from abroad?', 'Yes. You can get a price from a photo, ship the garment to us and receive it back at your address after the work. Shipping and customs details are clarified on WhatsApp.'],
      ['Do you offer shipping for other provinces in Turkey?', 'At the moment our shipping service covers Antalya and international customers; for other Turkish provinces please ask us on WhatsApp.'],
      ['How do shipping cost, timing and guarantee work?', 'The customer pays for shipping. The turnaround depends on the job. The carrier’s transport guarantee applies, our sewing and alteration work is guaranteed too, and if you are not happy the garment can be repaired again.'],
    ],
    waMsg: 'Hello, I would like to send a garment to you by post. I am sending a photo; can you tell me the price for the work?',
    wa: 'Send a photo, get a price', svcName: 'Tailoring by post (within Antalya and from abroad)',
    svcDesc: 'Alongside free hotel and home pick-up in Antalya, a repair, alteration and tailoring service where the garment is priced from a photo, shipped to us and returned by post. Available within Antalya and internationally; shipping is paid by the customer.',
  },
  ru: {
    h: 'Также по почте: по Анталье и из-за рубежа',
    lead: 'Наша основная услуга — портной, который приезжает к вам в отель или домой в Анталье, с ценой по фото. Дополнительно вещь можно отправить нам: отправка сейчас доступна внутри Антальи и из-за границы. Если вы уже вернулись домой после отпуска или живёте за рубежом, цену по фото вы всё равно узнаете и сможете отправить вещь нам.',
    steps: ['Пришлите в WhatsApp фото вещи и нужного места.', 'Подтвердите цену и работу.', 'Отправьте вещь нам (доставку оплачивает клиент).', 'Мы выполняем работу и отправляем вещь обратно на ваш адрес.'],
    faqH: 'Отправка: короткие ответы',
    faq: [
      ['Можно ли отправить вещь внутри Антальи?', 'Можно, но так как забор и доставка в отель или домой в Анталье бесплатны, большинству клиентов отправка не нужна. Если хотите отправить, сначала пришлите фото и подтвердите цену.'],
      ['Можно ли отправить вещь из-за границы?', 'Да. Цену можно узнать по фото, затем отправить вещь нам и получить её обратно на свой адрес после работы. Детали доставки и таможни уточняются в WhatsApp.'],
      ['Работаете ли вы по почте с другими регионами Турции?', 'Сейчас отправка действует внутри Антальи и для клиентов из-за границы; по другим провинциям Турции спросите нас в WhatsApp.'],
      ['Как с оплатой доставки, сроком и гарантией?', 'Доставку оплачивает клиент. Срок зависит от работы. Действует гарантия перевозчика, на наш пошив и подгонку тоже есть гарантия, а если результат не понравится, вещь можно переделать.'],
    ],
    waMsg: 'Здравствуйте, хочу отправить вам одежду по почте. Отправляю фото: сколько будет стоить работа?',
    wa: 'Отправить фото, узнать цену', svcName: 'Портной с отправкой по почте (по Анталье и из-за рубежа)',
    svcDesc: 'Помимо бесплатного забора из отеля и дома в Анталье — ремонт, подгонка и пошив, когда цена называется по фото, а вещь отправляется нам и возвращается по почте. Доступно внутри Антальи и из-за рубежа; доставку оплачивает клиент.',
  },
  de: {
    h: 'Auch per Post: innerhalb von Antalya und aus dem Ausland',
    lead: 'Unser Hauptangebot ist der Schneider, der in Antalya zu Ihnen ins Hotel oder nach Hause kommt, mit Preis nach Foto. Zusätzlich können Sie uns Ihr Kleidungsstück schicken: Der Versand ist derzeit innerhalb von Antalya und aus dem Ausland möglich. Wer nach dem Urlaub schon wieder zu Hause ist oder im Ausland lebt, bekommt den Preis ebenfalls per Foto und kann uns das Stück zusenden.',
    steps: ['Foto des Kleidungsstücks und der Stelle per WhatsApp senden.', 'Preis und Arbeit bestätigen.', 'Das Stück an uns versenden (Versandkosten trägt der Kunde).', 'Wir erledigen die Arbeit und senden es an Ihre Adresse zurück.'],
    faqH: 'Versand: kurze Antworten',
    faq: [
      ['Ist Versand auch innerhalb von Antalya möglich?', 'Ja, doch da Abholung und Lieferung zu Hotel und Wohnung in Antalya kostenlos sind, brauchen die meisten Kunden ihn nicht. Wenn Sie lieber versenden, schicken Sie zuerst ein Foto und bestätigen den Preis.'],
      ['Kann ich mein Kleidungsstück aus dem Ausland schicken?', 'Ja. Sie erhalten den Preis per Foto, senden uns das Stück und bekommen es nach der Arbeit an Ihre Adresse zurück. Versand- und Zolldetails klären wir per WhatsApp.'],
      ['Gibt es Versand auch für andere Provinzen der Türkei?', 'Derzeit gilt unser Versandservice für Antalya und das Ausland; für andere türkische Provinzen fragen Sie uns bitte per WhatsApp.'],
      ['Wie sind Versandkosten, Dauer und Garantie geregelt?', 'Die Versandkosten trägt der Kunde. Die Dauer hängt von der Arbeit ab. Es gilt die Transportgarantie des Versanddienstleisters, auch unsere Näh- und Änderungsarbeit ist garantiert, und bei Nichtgefallen kann nachgebessert werden.'],
    ],
    waMsg: 'Guten Tag, ich möchte Ihnen ein Kleidungsstück per Post schicken. Ich sende ein Foto; was kostet die Arbeit?',
    wa: 'Foto senden, Preis erfahren', svcName: 'Schneiderservice per Post (Antalya und Ausland)',
    svcDesc: 'Neben der kostenlosen Abholung in Hotel und Wohnung in Antalya: Reparatur, Änderung und Maßanfertigung, bei der das Stück per Foto bepreist, per Post eingesandt und zurückgeschickt wird. Möglich innerhalb von Antalya und international; die Versandkosten trägt der Kunde.',
  },
  es: {
    h: 'También por correo: dentro de Antalya y desde el extranjero',
    lead: 'Nuestro servicio principal es el sastre que va a su hotel o a su casa en Antalya, con precio según la foto. Además, puede enviarnos su prenda: el envío está disponible ahora dentro de Antalya y desde el extranjero. Si ya ha vuelto a casa tras las vacaciones o vive fuera de Turquía, también puede pedir precio por foto y mandarnos la prenda.',
    steps: ['Envíe por WhatsApp una foto de la prenda y de la zona a trabajar.', 'Apruebe el precio y el trabajo.', 'Envíenos la prenda (el envío lo paga el cliente).', 'Hacemos el trabajo y se la devolvemos a su dirección.'],
    faqH: 'Envío: respuestas rápidas',
    faq: [
      ['¿Puedo usar el envío dentro de Antalya?', 'Sí, pero como la recogida y la entrega en hoteles y casas de Antalya son gratuitas, la mayoría de clientes no lo necesita. Si prefiere enviarla, mande antes una foto y apruebe el precio.'],
      ['¿Puedo enviar mi prenda desde el extranjero?', 'Sí. Puede pedir precio por foto, enviarnos la prenda y recibirla de vuelta en su dirección tras el trabajo. Los detalles de envío y aduana se aclaran por WhatsApp.'],
      ['¿Hay envío para otras provincias de Turquía?', 'Por ahora el servicio por envío cubre Antalya y el extranjero; para otras provincias turcas, consúltenos por WhatsApp.'],
      ['¿Cómo funcionan el coste de envío, el plazo y la garantía?', 'El envío lo paga el cliente. El plazo depende del trabajo. Rige la garantía de transporte de la empresa de envíos, nuestro trabajo de costura y arreglos también está garantizado y, si no le gusta, se puede volver a arreglar.'],
    ],
    waMsg: 'Hola, quiero enviarles una prenda por correo. Le mando una foto: ¿cuánto cuesta el arreglo?',
    wa: 'Enviar foto y pedir precio', svcName: 'Sastre por correo (Antalya y extranjero)',
    svcDesc: 'Además de la recogida gratuita en hotel y casa en Antalya, un servicio de reparación, arreglo y confección en el que la prenda se presupuesta por foto, se envía y se devuelve por correo. Disponible dentro de Antalya y desde el extranjero; el envío lo paga el cliente.',
  },
  fr: {
    h: 'Aussi par colis : à Antalya et depuis l’étranger',
    lead: "Notre service principal, c'est le couturier qui vient à votre hôtel ou chez vous à Antalya, avec un prix d'après photo. En complément, vous pouvez nous envoyer votre vêtement : l'envoi est possible actuellement à Antalya et depuis l'étranger. De retour chez vous après les vacances, ou installé à l'étranger, vous pouvez aussi obtenir un prix sur photo et nous expédier la pièce.",
    steps: ["Envoyez sur WhatsApp une photo du vêtement et de la zone à travailler.", 'Validez le prix et le travail.', 'Expédiez-nous le vêtement (frais d’envoi à la charge du client).', 'Nous faisons le travail et le renvoyons à votre adresse.'],
    faqH: 'Envoi : réponses rapides',
    faq: [
      ["Puis-je utiliser l'envoi à Antalya même ?", "Oui, mais la collecte et la livraison à l'hôtel ou à domicile étant gratuites à Antalya, la plupart des clients n'en ont pas besoin. Si vous préférez expédier, envoyez d'abord une photo et validez le prix."],
      ["Puis-je envoyer mon vêtement depuis l'étranger ?", "Oui. Vous obtenez un prix sur photo, nous expédiez la pièce et la recevez à votre adresse après le travail. Les détails d'envoi et de douane se précisent sur WhatsApp."],
      ["L'envoi est-il possible pour d'autres provinces de Turquie ?", "Pour l'instant, l'envoi concerne Antalya et l'étranger ; pour les autres provinces turques, demandez-nous sur WhatsApp."],
      ["Comment fonctionnent frais d'envoi, délai et garantie ?", "Les frais d'envoi sont à la charge du client. Le délai dépend du travail. La garantie de transport du transporteur s'applique, notre travail de couture et de retouche est aussi garanti et, si le résultat ne vous plaît pas, il peut être repris."],
    ],
    waMsg: "Bonjour, je voudrais vous envoyer un vêtement par colis. Je vous envoie une photo : quel est le prix de la retouche ?",
    wa: 'Envoyer la photo, demander le prix', svcName: 'Couturier par colis (Antalya et étranger)',
    svcDesc: "En plus de la collecte gratuite à l'hôtel et à domicile à Antalya, un service de réparation, retouche et confection où le vêtement est chiffré sur photo, expédié puis renvoyé par colis. Disponible à Antalya et depuis l'étranger ; frais d'envoi à la charge du client.",
  },
  pl: {
    h: 'Także wysyłkowo: w Antalyi i z zagranicy',
    lead: 'Naszą główną usługą jest krawiec, który przyjeżdża do hotelu lub domu w Antalyi, z ceną na podstawie zdjęcia. Dodatkowo możesz wysłać nam ubranie: wysyłka jest obecnie dostępna w obrębie Antalyi i z zagranicy. Jeśli po wakacjach wróciłeś już do domu lub mieszkasz za granicą, cenę też poznasz ze zdjęcia i możesz przesłać nam rzecz.',
    steps: ['Wyślij na WhatsApp zdjęcie ubrania i miejsca do pracy.', 'Zaakceptuj cenę i zakres pracy.', 'Wyślij nam ubranie (koszt przesyłki ponosi klient).', 'Wykonujemy pracę i odsyłamy ubranie pod Twój adres.'],
    faqH: 'Wysyłka: krótkie odpowiedzi',
    faq: [
      ['Czy mogę skorzystać z wysyłki w obrębie Antalyi?', 'Tak, ale skoro odbiór i dostawa do hotelu lub domu w Antalyi są bezpłatne, większość klientów jej nie potrzebuje. Jeśli wolisz wysłać, najpierw prześlij zdjęcie i zaakceptuj cenę.'],
      ['Czy mogę wysłać ubranie z zagranicy?', 'Tak. Poznasz cenę ze zdjęcia, wyślesz nam ubranie i odbierzesz je pod swoim adresem po wykonaniu pracy. Szczegóły wysyłki i cła ustalamy na WhatsApp.'],
      ['Czy wysyłka dotyczy innych prowincji Turcji?', 'Obecnie usługa wysyłkowa obejmuje Antalyę i klientów z zagranicy; w sprawie innych prowincji Turcji zapytaj nas na WhatsApp.'],
      ['Jak wyglądają koszt wysyłki, czas i gwarancja?', 'Koszt wysyłki ponosi klient. Czas zależy od zlecenia. Obowiązuje gwarancja transportowa firmy kurierskiej, nasza praca krawiecka i przeróbki są również gwarantowane, a jeśli efekt Ci się nie spodoba, można poprawić ponownie.'],
    ],
    waMsg: 'Dzień dobry, chcę wysłać Państwu ubranie pocztą. Wysyłam zdjęcie: ile kosztuje poprawka?',
    wa: 'Wyślij zdjęcie, zapytaj o cenę', svcName: 'Krawiec wysyłkowy (Antalya i zagranica)',
    svcDesc: 'Oprócz bezpłatnego odbioru z hotelu i domu w Antalyi — naprawy, przeróbki i szycie, gdzie cenę podajemy ze zdjęcia, a ubranie jest wysyłane do nas i odsyłane pocztą. Dostępne w Antalyi i z zagranicy; koszt wysyłki ponosi klient.',
  },
  uk: {
    h: 'Також поштою: по Анталії та з-за кордону',
    lead: 'Наша основна послуга — кравець, який приїздить до вас у готель чи додому в Анталії, із ціною за фото. Додатково ви можете надіслати нам річ: відправлення зараз доступне в межах Анталії та з-за кордону. Якщо ви вже повернулися додому після відпустки або живете за кордоном, ціну за фото ви теж дізнаєтеся й зможете надіслати нам річ.',
    steps: ['Надішліть у WhatsApp фото речі та потрібного місця.', 'Погодьте ціну й роботу.', 'Відправте річ нам (доставку оплачує клієнт).', 'Ми виконуємо роботу й надсилаємо річ назад на вашу адресу.'],
    faqH: 'Відправлення: короткі відповіді',
    faq: [
      ['Чи можна відправити річ у межах Анталії?', 'Можна, але оскільки забір і доставка до готелю чи додому в Анталії безкоштовні, більшості клієнтів відправлення не потрібне. Якщо хочете відправити, спершу надішліть фото й погодьте ціну.'],
      ['Чи можна надіслати річ з-за кордону?', 'Так. Ціну можна дізнатися за фото, потім відправити річ нам і отримати її назад на свою адресу після роботи. Деталі доставки й митниці уточнюються у WhatsApp.'],
      ['Чи є відправлення для інших провінцій Туреччини?', 'Наразі відправлення діє в межах Анталії та для клієнтів із-за кордону; щодо інших провінцій Туреччини запитайте нас у WhatsApp.'],
      ['Як щодо оплати доставки, строку та гарантії?', 'Доставку оплачує клієнт. Строк залежить від роботи. Діє гарантія перевізника, на наш пошив і підгонку також є гарантія, а якщо результат не сподобається, річ можна переробити.'],
    ],
    waMsg: 'Добрий день, хочу надіслати вам одяг поштою. Надсилаю фото: скільки коштуватиме робота?',
    wa: 'Надіслати фото, дізнатися ціну', svcName: 'Кравець із відправленням поштою (Анталія та з-за кордону)',
    svcDesc: 'Крім безкоштовного забору з готелю й дому в Анталії — ремонт, підгонка та пошив, коли ціну називаємо за фото, а річ надсилається нам і повертається поштою. Доступно в межах Анталії та з-за кордону; доставку оплачує клієнт.',
  },
  nl: {
    h: 'Ook per post: binnen Antalya en vanuit het buitenland',
    lead: 'Onze belangrijkste dienst is de kleermaker die naar je hotel of huis in Antalya komt, met een prijs op basis van een foto. Daarnaast kun je ons je kledingstuk opsturen: verzenden kan momenteel binnen Antalya en vanuit het buitenland. Ben je na je vakantie alweer thuis of woon je in het buitenland, dan krijg je ook een prijs via een foto en kun je het stuk naar ons sturen.',
    steps: ['Stuur via WhatsApp een foto van het kledingstuk en de plek waar het werk moet gebeuren.', 'Keur prijs en werk goed.', 'Stuur het kledingstuk naar ons (verzendkosten zijn voor de klant).', 'Wij doen het werk en sturen het terug naar je adres.'],
    faqH: 'Verzenden: korte antwoorden',
    faq: [
      ['Kan ik binnen Antalya verzenden?', 'Ja, maar omdat ophalen en bezorgen bij hotels en woningen in Antalya gratis is, hebben de meeste klanten het niet nodig. Wil je toch versturen, stuur dan eerst een foto en keur de prijs goed.'],
      ['Kan ik mijn kledingstuk vanuit het buitenland opsturen?', 'Ja. Je krijgt een prijs via een foto, stuurt ons het kledingstuk en ontvangt het na het werk terug op je adres. Details over verzending en douane stemmen we af via WhatsApp.'],
      ['Is verzenden ook mogelijk voor andere provincies van Turkije?', 'Op dit moment geldt onze verzenddienst voor Antalya en voor klanten in het buitenland; vraag ons voor andere Turkse provincies via WhatsApp.'],
      ['Hoe zit het met verzendkosten, doorlooptijd en garantie?', 'De verzendkosten zijn voor de klant. De doorlooptijd hangt af van het werk. De transportgarantie van het koeriersbedrijf geldt, ons naai- en vermaakwerk is ook gegarandeerd en bij ontevredenheid kan het opnieuw worden aangepast.'],
    ],
    waMsg: 'Hallo, ik wil graag een kledingstuk per post naar u sturen. Ik stuur een foto: wat kost het werk?',
    wa: 'Foto sturen, prijs vragen', svcName: 'Kleermaker per post (Antalya en buitenland)',
    svcDesc: 'Naast gratis ophalen bij hotel en huis in Antalya: herstel, vermaak en maatwerk waarbij het kledingstuk via een foto geprijsd, opgestuurd en per post teruggestuurd wordt. Beschikbaar binnen Antalya en vanuit het buitenland; verzendkosten zijn voor de klant.',
  },
  ar: {
    h: 'وبالبريد أيضاً: داخل أنطاليا ومن خارج تركيا',
    lead: 'خدمتنا الأساسية هي الخياط الذي يأتي إلى فندقك أو منزلك في أنطاليا، مع سعر حسب الصورة. وإضافةً إلى ذلك يمكنك إرسال قطعتك إلينا: الشحن متاح حالياً داخل أنطاليا ومن خارج تركيا. وإذا عدت إلى بلدك بعد العطلة أو كنت تقيم في الخارج، فيمكنك أيضاً معرفة السعر من الصورة وإرسال القطعة إلينا.',
    steps: ['أرسل عبر واتساب صورة للقطعة وللمكان المطلوب العمل عليه.', 'وافق على السعر والعمل.', 'أرسل القطعة إلينا بالشحن (تكلفة الشحن على العميل).', 'ننفّذ العمل ونعيد القطعة إلى عنوانك.'],
    faqH: 'الشحن: إجابات سريعة',
    faq: [
      ['هل يمكن استخدام الشحن داخل أنطاليا؟', 'نعم، لكن بما أن الاستلام والتسليم من الفنادق والمنازل في أنطاليا مجانيان فمعظم العملاء لا يحتاجون إليه. وإن فضّلت الشحن فأرسل صورة أولاً ووافق على السعر.'],
      ['هل يمكنني إرسال قطعتي من خارج تركيا؟', 'نعم. يمكنك معرفة السعر من الصورة ثم شحن القطعة إلينا واستلامها على عنوانك بعد إنجاز العمل. تفاصيل الشحن والجمارك تُوضَّح عبر واتساب.'],
      ['هل الشحن متاح لبقية ولايات تركيا؟', 'حالياً تشمل خدمة الشحن أنطاليا والعملاء من خارج تركيا؛ وللولايات التركية الأخرى اسألنا عبر واتساب.'],
      ['كيف تعمل تكلفة الشحن والمدة والضمان؟', 'تكلفة الشحن على العميل. والمدة تعتمد على العمل. يسري ضمان النقل لدى شركة الشحن، وعملنا في الخياطة والتعديل مضمون أيضاً، وإن لم يعجبك الناتج يمكن إعادة التعديل.'],
    ],
    waMsg: 'مرحباً، أريد إرسال قطعة ملابس إليكم بالبريد. أرسل لكم صورة: كم تكلفة العمل؟',
    wa: 'أرسل الصورة واسأل عن السعر', svcName: 'خياط بالبريد (أنطاليا ومن الخارج)',
    svcDesc: 'إلى جانب الاستلام المجاني من الفندق والمنزل في أنطاليا، خدمة إصلاح وتعديل وخياطة تُسعَّر فيها القطعة من الصورة وتُشحن إلينا وتعود بالبريد. متاحة داخل أنطاليا ومن خارج تركيا؛ وتكلفة الشحن على العميل.',
  },
};
