// Turist niyetli 4 dilli rehber sayfaları (Terzi Can, Konyaaltı): acil onarım, otele gelen terzi, etkinlik kıyafeti tadilatı.
// Yalnızca doğrulanmış bilgi: Hurma/Konyaaltı atölyesi, her gün 08:00–23:00, WhatsApp'tan fotoğrafla fiyat,
// Konyaaltı'nda ücretsiz alım-teslim (diğer bölgelerde mesafeye göre), paça ₺200'den, fermuar ₺300'den,
// bel daraltma ₺200'den, abiye/gelinlik tadilatı ve elbise dikimi ₺800'den, süre işe göre (aynı gün / 1 gün / ~3 gün).
// Para birimi, ödeme yöntemi, puan, müşteri sayısı veya sahte vaat YOKTUR.
type L4 = 'tr' | 'en' | 'ru' | 'de';
type Sec = { h: string; p?: string; ul?: string[] };
type Pg = { t: string; d: string; h1: string; badge: string; lead: string; secs: Sec[]; faq: [string, string][]; cta: string; wa: string; crumb: string };
export type TatilTopic = 'acil' | 'otel' | 'etkinlik';

export const TATIL_URLS: Record<TatilTopic, Record<L4, string>> = {
  acil: {
    tr: '/tatilde-acil-kiyafet-tamiri-antalya',
    en: '/en/urgent-clothing-repair-antalya',
    ru: '/ru/srochnyy-remont-odezhdy-antalya',
    de: '/de/dringende-kleiderreparatur-antalya',
  },
  otel: {
    tr: '/otele-gelen-terzi-nasil-calisir',
    en: '/en/how-hotel-tailor-works-antalya',
    ru: '/ru/kak-rabotaet-vyezdnoy-portnoy-antalya',
    de: '/de/so-funktioniert-hotel-schneider-antalya',
  },
  etkinlik: {
    tr: '/tatilde-abiye-takim-tadilati-antalya',
    en: '/en/event-outfit-alteration-antalya',
    ru: '/ru/podgonka-naryada-dlya-sobytiya-antalya',
    de: '/de/festkleidung-aendern-antalya',
  },
};

export const TATIL_NEXT: Record<TatilTopic, TatilTopic> = { acil: 'otel', otel: 'etkinlik', etkinlik: 'acil' };

export const TATIL_CONTENT: Record<TatilTopic, Record<L4, Pg>> = {
  acil: {
    tr: {
      t: 'Tatilde Acil Kıyafet Tamiri Antalya | Terzi Can',
      d: "Tatilde fermuar bozuldu, dikiş söküldü ya da pantolon yırtıldı mı? Fotoğraf gönderin, WhatsApp'tan fiyat alın. Her gün 08:00–23:00, Konyaaltı.",
      h1: 'Tatilde Acil Kıyafet Tamiri: Antalya',
      badge: 'Terzi Can · Konyaaltı, Antalya',
      lead: "Fermuar bozuldu, dikiş söküldü, pantolon yırtıldı: tatildeyken de çözümü var. Kıyafetin fotoğrafını WhatsApp'tan gönderin, ne yapılabileceğini ve fiyatı söyleyelim.",
      secs: [
        { h: 'Hangi sorunlara bakıyoruz?', ul: ["Fermuar değişimi: ₺300'den", "Paça kısaltma: ₺200'den", "Bel daraltma: ₺200'den", 'Söküklerin dikilmesi ve yırtık onarımı', 'Düğme, astar ve kemer tamiri'] },
        { h: 'Nasıl ilerliyor?', ul: ["Sorunlu kıyafetin fotoğrafını WhatsApp'tan gönderin", 'Yapılacak işi ve fiyatı yazılı olarak bildiririz', "Atölyeye getirin ya da otelden/evden alım-teslim isteyin: Konyaaltı'nda ücretsiz, diğer bölgelerde mesafeye göre", "Basit işler çoğunlukla aynı gün ya da ertesi gün hazır olur; kesin süreyi WhatsApp'ta netleştiririz"] },
        { h: 'Atölye ve çalışma saatleri', p: "Atölyemiz Konyaaltı, Hurma Mahallesi'nde. Haftanın her günü 08:00–23:00 arası açığız; Türkçe, İngilizce, Rusça ve Almanca yazışabilirsiniz." },
      ],
      faq: [
        ['Kıyafetim yarın lazım, yetişir mi?', 'Basit onarımlar çoğunlukla aynı gün ya da ertesi gün hazır olur. İşin türüne ve yoğunluğa göre değiştiği için fotoğrafla yazın, kesin süreyi söyleyelim.'],
        ['Otelimden alıp getiriyor musunuz?', "Evet. Konyaaltı'nda alım-teslim ücretsiz; diğer bölgelerde ücret mesafeye göre belirlenir ve WhatsApp'ta baştan söylenir."],
        ['Fermuar değişimi ne kadar?', "Fermuar değişimi ₺300'den başlar; kıyafete ve fermuar türüne göre netleşir."],
        ['Hangi dillerde yazışabilirim?', 'Türkçe, İngilizce, Rusça ve Almanca.'],
      ],
      cta: "WhatsApp'tan fotoğraf gönderin", wa: 'Merhaba, kıyafetim için acil tamir gerekiyor. Fotoğrafı gönderiyorum.', crumb: 'Acil kıyafet tamiri',
    },
    en: {
      t: 'Urgent Clothing Repair in Antalya on Holiday | Terzi Can',
      d: 'Broken zipper, open seam or torn trousers on holiday in Antalya? Send a photo on WhatsApp for a price. Open daily 08:00–23:00, Konyaaltı.',
      h1: 'Urgent Clothing Repair on Holiday in Antalya',
      badge: 'Terzi Can · Konyaaltı, Antalya',
      lead: 'Broken zipper, open seam, torn trousers: there is a fix even on holiday. Send a photo of the garment on WhatsApp and we will tell you what can be done and the price.',
      secs: [
        { h: 'What can we fix?', ul: ['Zipper replacement: from ₺300', 'Trouser hemming: from ₺200', 'Waist taking in: from ₺200', 'Open seams and tear repairs', 'Buttons, lining and belt repairs'] },
        { h: 'How does it work?', ul: ['Send a photo of the problem on WhatsApp', 'We reply with what we will do and the price, in writing', 'Bring it to the workshop or ask for hotel or home pick-up and delivery: free in Konyaaltı, priced by distance elsewhere', 'Simple jobs are usually ready the same or next day; the exact time is confirmed on WhatsApp'] },
        { h: 'Workshop and opening hours', p: 'Our workshop is in Hurma, Konyaaltı. We are open every day of the week from 08:00 to 23:00 and you can write to us in English, Turkish, Russian or German.' },
      ],
      faq: [
        ['I need my clothes tomorrow. Is that possible?', 'Simple repairs are usually ready the same day or the next day. It depends on the job and workload, so send a photo and we will confirm the exact time.'],
        ['Can you collect from my hotel?', 'Yes. Pick-up and delivery is free in Konyaaltı; elsewhere the fee depends on distance and is confirmed on WhatsApp beforehand.'],
        ['How much is a zipper replacement?', 'Zipper replacement starts from ₺300; the final price depends on the garment and zipper type.'],
        ['Which languages can I write in?', 'English, Turkish, Russian and German.'],
      ],
      cta: 'Send a photo on WhatsApp', wa: 'Hello, I need an urgent clothing repair. I am sending a photo.', crumb: 'Urgent clothing repair',
    },
    ru: {
      t: 'Срочный ремонт одежды в Анталье в отпуске | Terzi Can',
      d: 'Сломалась молния, разошёлся шов или порвались брюки? Пришлите фото в WhatsApp и узнайте цену. Ежедневно 08:00–23:00, Коньяалты.',
      h1: 'Срочный ремонт одежды в Анталье во время отпуска',
      badge: 'Terzi Can · Коньяалты, Анталья',
      lead: 'Сломалась молния, разошёлся шов, порвались брюки: решение есть и в отпуске. Пришлите фото вещи в WhatsApp, и мы скажем, что можно сделать и сколько это стоит.',
      secs: [
        { h: 'Что мы ремонтируем?', ul: ['Замена молнии: от ₺300', 'Подшив брюк: от ₺200', 'Ушивание в талии: от ₺200', 'Зашивание швов и ремонт разрывов', 'Пуговицы, подкладка, ремни'] },
        { h: 'Как это работает?', ul: ['Пришлите фото проблемы в WhatsApp', 'Мы письменно сообщим, что будем делать и сколько это стоит', 'Принесите вещь в мастерскую или закажите забор и доставку из отеля или с дома: в Коньяалты бесплатно, в другие районы по расстоянию', 'Простые работы обычно готовы в тот же или на следующий день; точный срок уточняем в WhatsApp'] },
        { h: 'Мастерская и часы работы', p: 'Наша мастерская находится в Хурме, Коньяалты. Мы работаем каждый день с 08:00 до 23:00; можно писать по-русски, по-английски, по-турецки и по-немецки.' },
      ],
      faq: [
        ['Вещь нужна завтра. Успеете?', 'Простой ремонт обычно готов в тот же или на следующий день. Срок зависит от работы и загрузки, поэтому пришлите фото, и мы назовём точный срок.'],
        ['Вы забираете вещи из отеля?', 'Да. В Коньяалты забор и доставка бесплатны; в другие районы стоимость зависит от расстояния и называется заранее в WhatsApp.'],
        ['Сколько стоит замена молнии?', 'Замена молнии стоит от ₺300; окончательная цена зависит от вещи и типа молнии.'],
        ['На каком языке можно писать?', 'По-русски, по-английски, по-турецки и по-немецки.'],
      ],
      cta: 'Отправить фото в WhatsApp', wa: 'Здравствуйте, нужен срочный ремонт одежды. Отправляю фото.', crumb: 'Срочный ремонт одежды',
    },
    de: {
      t: 'Dringende Kleiderreparatur in Antalya im Urlaub | Terzi Can',
      d: 'Reißverschluss kaputt, Naht aufgegangen oder Hose gerissen? Foto per WhatsApp senden und Preis erfahren. Täglich 08:00–23:00, Konyaaltı.',
      h1: 'Dringende Kleiderreparatur im Urlaub in Antalya',
      badge: 'Terzi Can · Konyaaltı, Antalya',
      lead: 'Reißverschluss kaputt, Naht aufgegangen, Hose gerissen: Auch im Urlaub gibt es eine Lösung. Senden Sie ein Foto per WhatsApp, wir sagen Ihnen, was möglich ist und was es kostet.',
      secs: [
        { h: 'Was reparieren wir?', ul: ['Reißverschluss wechseln: ab ₺300', 'Hosen kürzen: ab ₺200', 'Bund enger machen: ab ₺200', 'Aufgegangene Nähte und Risse', 'Knöpfe, Futter und Gürtel'] },
        { h: 'So läuft es ab', ul: ['Foto des Problems per WhatsApp senden', 'Wir nennen Ihnen schriftlich Arbeit und Preis', 'In die Werkstatt bringen oder Abholung und Lieferung am Hotel oder zu Hause wünschen: in Konyaaltı kostenlos, sonst je nach Entfernung', 'Einfache Arbeiten sind meist am selben oder nächsten Tag fertig; die genaue Dauer klären wir per WhatsApp'] },
        { h: 'Werkstatt und Öffnungszeiten', p: 'Unsere Werkstatt liegt in Hurma, Konyaaltı. Wir sind jeden Tag von 08:00 bis 23:00 Uhr erreichbar; Sie können auf Deutsch, Englisch, Türkisch oder Russisch schreiben.' },
      ],
      faq: [
        ['Ich brauche meine Kleidung morgen. Geht das?', 'Einfache Reparaturen sind meist am selben oder nächsten Tag fertig. Es hängt von Arbeit und Auslastung ab; senden Sie ein Foto, wir nennen die genaue Dauer.'],
        ['Holen Sie die Kleidung im Hotel ab?', 'Ja. Abholung und Lieferung sind in Konyaaltı kostenlos; sonst richtet sich der Preis nach der Entfernung und wird vorher per WhatsApp genannt.'],
        ['Was kostet ein Reißverschlusswechsel?', 'Ein Reißverschlusswechsel kostet ab ₺300; der Endpreis hängt vom Kleidungsstück und der Reißverschlussart ab.'],
        ['In welcher Sprache kann ich schreiben?', 'Deutsch, Englisch, Türkisch und Russisch.'],
      ],
      cta: 'Foto per WhatsApp senden', wa: 'Guten Tag, ich brauche eine dringende Kleiderreparatur. Ich sende ein Foto.', crumb: 'Dringende Kleiderreparatur',
    },
  },
  otel: {
    tr: {
      t: 'Otele Gelen Terzi Antalya: Nasıl Çalışır? | Terzi Can',
      d: "Otele gelen terzi nasıl çalışır? Fotoğraf gönderin, fiyat alın, kıyafetinizi otelden alıp teslim edelim. Konyaaltı'nda ücretsiz, diğer bölgelerde mesafeye göre.",
      h1: 'Otele Gelen Terzi Antalya: Adım Adım Nasıl Çalışır?',
      badge: 'Terzi Can · Konyaaltı, Antalya',
      lead: "Tatilde terziye gitmek zorunda değilsiniz: kıyafetinizi otelinizden alıp atölyemizde düzeltir, otelinize geri getiririz. Başlamak için WhatsApp'tan fotoğraf göndermeniz yeterli.",
      secs: [
        { h: 'Adım adım', ul: ["WhatsApp'tan kıyafetin fotoğrafını ve otelinizin bölgesini yazın", 'Yapılacak işi ve fiyatı size bildiririz', 'Kıyafetinizi otelinizden alırız (isterseniz atölyeye de getirebilirsiniz)', 'Tadilatı Konyaaltı atölyemizde yaparız', 'Hazır olunca otelinize teslim ederiz'] },
        { h: 'Servis ücreti', p: "Konyaaltı'nda alım-teslim ücretsizdir. Lara, Güzeloba, Kundu, Belek, Kemer, Side gibi diğer bölgelerde servis ücreti mesafeye göre belirlenir; tutarı baştan WhatsApp'ta söyleriz." },
        { h: 'Ne zaman hazır olur?', p: "Süre işe ve yoğunluğa bağlıdır. Basit tadilatlar çoğunlukla aynı gün ya da ertesi gün, kapsamlı işler yaklaşık 3 güne kadar sürebilir; kesin süreyi WhatsApp'ta netleştiririz. Otelden çıkış tarihinizi baştan yazmanız yeterli." },
      ],
      faq: [
        ['Otele gelen terzi ücretli mi?', "Konyaaltı'nda ücretsiz; diğer bölgelerde mesafeye göre belirlenir ve WhatsApp'ta baştan söylenir."],
        ['Hangi otel bölgelerine hizmet veriyorsunuz?', 'Konyaaltı merkezli çalışıyoruz; Lara, Güzeloba, Kundu, Belek, Kemer, Side ve diğer Antalya bölgelerindeki otellere servis veriyoruz. Bölgenizi yazın, uygunluğu ve ücreti söyleyelim.'],
        ['Fiyatı önceden öğrenebilir miyim?', "Evet. Fotoğraf gönderin, işlemden önce fiyatı WhatsApp'ta yazılı olarak söyleyelim."],
        ['Hangi saatlerde ulaşabilirim?', 'Her gün 08:00–23:00 arası.'],
      ],
      cta: "WhatsApp'tan fotoğraf gönderin", wa: 'Merhaba, otelime gelen terzi hizmeti hakkında bilgi almak istiyorum. Fotoğrafı gönderiyorum.', crumb: 'Otele gelen terzi nasıl çalışır',
    },
    en: {
      t: 'Hotel Tailor in Antalya: How It Works | Terzi Can',
      d: 'How does a hotel tailor work? Send a photo, get a price, and we collect and return your clothes at your hotel. Free in Konyaaltı, priced by distance elsewhere.',
      h1: 'Hotel Tailor in Antalya: How It Works, Step by Step',
      badge: 'Terzi Can · Konyaaltı, Antalya',
      lead: 'You do not have to go to a tailor on holiday: we collect your garment from your hotel, fix it in our workshop and bring it back. To start, just send a photo on WhatsApp.',
      secs: [
        { h: 'Step by step', ul: ['Send a photo of the garment and your hotel area on WhatsApp', 'We tell you what we will do and the price', 'We collect the garment from your hotel (or you can bring it to the workshop)', 'We do the work in our Konyaaltı workshop', 'We deliver it back to your hotel when it is ready'] },
        { h: 'Service fee', p: 'Pick-up and delivery is free in Konyaaltı. In other areas such as Lara, Güzeloba, Kundu, Belek, Kemer and Side, the service fee depends on distance; we tell you the amount on WhatsApp beforehand.' },
        { h: 'When will it be ready?', p: 'It depends on the job and workload. Simple alterations are usually ready the same or next day, bigger jobs can take up to about 3 days; the exact time is confirmed on WhatsApp. Just tell us your check-out date at the start.' },
      ],
      faq: [
        ['Does the hotel tailor cost extra?', 'Free in Konyaaltı; elsewhere it depends on distance and is confirmed on WhatsApp beforehand.'],
        ['Which hotel areas do you serve?', 'We are based in Konyaaltı and serve hotels in Lara, Güzeloba, Kundu, Belek, Kemer, Side and other parts of Antalya. Tell us your area and we will confirm availability and the fee.'],
        ['Can I get the price in advance?', 'Yes. Send a photo and we will give you the price in writing on WhatsApp before we start.'],
        ['When can I reach you?', 'Every day from 08:00 to 23:00.'],
      ],
      cta: 'Send a photo on WhatsApp', wa: 'Hello, I would like to know about the hotel tailor service. I am sending a photo.', crumb: 'How a hotel tailor works',
    },
    ru: {
      t: 'Выездной портной в Анталье: как это работает | Terzi Can',
      d: 'Как работает выездной портной? Пришлите фото, узнайте цену, мы заберём вещи из отеля и вернём обратно. В Коньяалты бесплатно, в другие районы по расстоянию.',
      h1: 'Выездной портной в Анталье: как это работает шаг за шагом',
      badge: 'Terzi Can · Коньяалты, Анталья',
      lead: 'В отпуске не нужно искать ателье: мы заберём вещь из отеля, исправим её в мастерской и вернём обратно. Чтобы начать, достаточно прислать фото в WhatsApp.',
      secs: [
        { h: 'Шаг за шагом', ul: ['Пришлите в WhatsApp фото вещи и район вашего отеля', 'Мы сообщим, что будем делать и сколько это стоит', 'Мы заберём вещь из отеля (или вы можете принести её в мастерскую)', 'Выполним работу в нашей мастерской в Коньяалты', 'Когда всё готово, доставим в ваш отель'] },
        { h: 'Стоимость выезда', p: 'В Коньяалты забор и доставка бесплатны. В другие районы, например Лара, Гюзельоба, Кунду, Белек, Кемер и Сиде, стоимость выезда зависит от расстояния; сумму мы называем заранее в WhatsApp.' },
        { h: 'Когда будет готово?', p: 'Срок зависит от работы и загрузки. Простая подгонка обычно готова в тот же или на следующий день, более сложные работы могут занять до 3 дней; точный срок уточняем в WhatsApp. Сразу напишите дату выезда из отеля.' },
      ],
      faq: [
        ['Выезд портного платный?', 'В Коньяалты бесплатно; в другие районы по расстоянию, сумма называется заранее в WhatsApp.'],
        ['В какие районы с отелями вы выезжаете?', 'Мы работаем из Коньяалты и выезжаем в отели в Ларе, Гюзельобе, Кунду, Белеке, Кемере, Сиде и других районах Антальи. Напишите район, и мы подтвердим возможность и стоимость.'],
        ['Можно узнать цену заранее?', 'Да. Пришлите фото, и мы письменно назовём цену в WhatsApp до начала работы.'],
        ['В какое время можно написать?', 'Ежедневно с 08:00 до 23:00.'],
      ],
      cta: 'Отправить фото в WhatsApp', wa: 'Здравствуйте, хочу узнать об услуге выездного портного. Отправляю фото.', crumb: 'Как работает выездной портной',
    },
    de: {
      t: 'Schneider im Hotel Antalya: So funktioniert es | Terzi Can',
      d: 'So funktioniert der Hotel-Schneider: Foto senden, Preis erhalten, wir holen Ihre Kleidung im Hotel ab. In Konyaaltı kostenlos, sonst je nach Entfernung.',
      h1: 'Schneider im Hotel in Antalya: So funktioniert es Schritt für Schritt',
      badge: 'Terzi Can · Konyaaltı, Antalya',
      lead: 'Im Urlaub müssen Sie keinen Schneider suchen: Wir holen das Kleidungsstück im Hotel ab, ändern es in unserer Werkstatt und bringen es zurück. Zum Start genügt ein Foto per WhatsApp.',
      secs: [
        { h: 'Schritt für Schritt', ul: ['Foto des Kleidungsstücks und Ihre Hotelgegend per WhatsApp senden', 'Wir nennen Ihnen Arbeit und Preis', 'Wir holen das Stück im Hotel ab (oder Sie bringen es in die Werkstatt)', 'Wir erledigen die Arbeit in unserer Werkstatt in Konyaaltı', 'Fertig geliefert wird es zurück ins Hotel'] },
        { h: 'Servicegebühr', p: 'Abholung und Lieferung sind in Konyaaltı kostenlos. In anderen Gegenden wie Lara, Güzeloba, Kundu, Belek, Kemer und Side richtet sich die Servicegebühr nach der Entfernung; den Betrag nennen wir vorher per WhatsApp.' },
        { h: 'Wann ist es fertig?', p: 'Das hängt von Arbeit und Auslastung ab. Einfache Änderungen sind meist am selben oder nächsten Tag fertig, größere Arbeiten können bis zu etwa 3 Tage dauern; die genaue Dauer klären wir per WhatsApp. Nennen Sie uns gleich Ihr Abreisedatum.' },
      ],
      faq: [
        ['Kostet der Hotel-Schneider extra?', 'In Konyaaltı kostenlos; sonst richtet sich der Preis nach der Entfernung und wird vorher per WhatsApp genannt.'],
        ['Welche Hotelgegenden bedienen Sie?', 'Wir arbeiten von Konyaaltı aus und bedienen Hotels in Lara, Güzeloba, Kundu, Belek, Kemer, Side und anderen Teilen von Antalya. Nennen Sie Ihre Gegend, wir bestätigen Verfügbarkeit und Preis.'],
        ['Kann ich den Preis vorher erfahren?', 'Ja. Senden Sie ein Foto, wir nennen Ihnen den Preis vor Beginn schriftlich per WhatsApp.'],
        ['Wann kann ich Sie erreichen?', 'Täglich von 08:00 bis 23:00 Uhr.'],
      ],
      cta: 'Foto per WhatsApp senden', wa: 'Guten Tag, ich möchte mich über den Schneider-Service im Hotel informieren. Ich sende ein Foto.', crumb: 'So funktioniert der Hotel-Schneider',
    },
  },
  etkinlik: {
    tr: {
      t: 'Tatilde Abiye ve Takım Tadilatı Antalya | Terzi Can',
      d: "Düğün, gala ya da akşam yemeği için abiye, gece elbisesi ve takım elbise tadilatı. Abiye tadilatı ₺800'den. Fotoğraf gönderin, tarihinizi yazın.",
      h1: 'Tatilde Etkinlik Kıyafeti Tadilatı: Abiye, Gece Elbisesi, Takım',
      badge: 'Terzi Can · Konyaaltı, Antalya',
      lead: "Düğün, gala ya da özel bir akşam için kıyafetiniz olmuyor mu? Daraltma, kısaltma ve fermuar değişimi için fotoğraf gönderin; etkinlik tarihinizi yazın, buna göre planlayalım.",
      secs: [
        { h: 'Neler yapıyoruz?', ul: ["Abiye ve gece elbisesi tadilatı: ₺800'den", "Gelinlik tadilatı: ₺800'den", 'Takım elbise ve ceket tadilatı', 'Daraltma, kısaltma, fermuar değişimi', "Ölçüye göre gece kıyafeti dikimi (elbise dikimi ₺800'den)"] },
        { h: 'Tarihinizi baştan yazın', p: "Etkinlik tarihini ve otelinizin bölgesini WhatsApp'ta yazın. Süre işe ve yoğunluğa göre değişir; abiye ve gelinlik gibi kapsamlı işlerde daha erken yazmanız gerekir. Yetişip yetişmeyeceğini baştan açıkça söyleriz." },
        { h: 'Alım ve teslim', p: "Konyaaltı'nda otelden/evden alım-teslim ücretsizdir; diğer bölgelerde ücret mesafeye göre belirlenir ve WhatsApp'ta baştan söylenir." },
      ],
      faq: [
        ['Abiye tadilatı ne kadar?', "Abiye ve gelinlik tadilatı ₺800'den başlar; işin kapsamı fotoğrafla netleşir."],
        ['Etkinliğim birkaç gün sonra, yetişir mi?', 'Süre işe ve yoğunluğa bağlıdır; basit işler çoğunlukla aynı gün ya da 1 gün, kapsamlı işler yaklaşık 3 güne kadar sürebilir. Tarihi yazın, yetişip yetişmeyeceğini baştan söyleyelim.'],
        ['Kıyafeti otelden alıyor musunuz?', "Konyaaltı'nda ücretsiz; diğer bölgelerde mesafeye göre belirlenir."],
        ['Sıfırdan gece elbisesi diktirebilir miyim?', "Evet, ölçüye göre elbise dikimi yapıyoruz (₺800'den). Model ve kumaşı birlikte belirleriz; süre ve fiyat işe göre WhatsApp'ta netleşir."],
      ],
      cta: "WhatsApp'tan fotoğraf gönderin", wa: 'Merhaba, bir etkinlik için kıyafet tadilatı gerekiyor. Fotoğrafı ve tarihi gönderiyorum.', crumb: 'Abiye ve takım tadilatı',
    },
    en: {
      t: 'Evening Dress & Suit Alteration in Antalya | Terzi Can',
      d: 'Alterations for a wedding, gala or dinner: evening dress, gown and suit. Evening dress alteration from ₺800. Send a photo and your date.',
      h1: 'Event Outfit Alteration on Holiday: Evening Dress, Gown, Suit',
      badge: 'Terzi Can · Konyaaltı, Antalya',
      lead: 'Is your outfit for a wedding, gala or special evening not fitting right? Send a photo for taking in, shortening or a zipper replacement, and tell us your event date so we can plan around it.',
      secs: [
        { h: 'What do we do?', ul: ['Evening dress and gown alteration: from ₺800', 'Wedding dress alteration: from ₺800', 'Suit and jacket alteration', 'Taking in, shortening, zipper replacement', 'Evening outfits made to measure (dress making from ₺800)'] },
        { h: 'Tell us your date first', p: 'Write your event date and hotel area on WhatsApp. Timing depends on the job and workload; bigger jobs such as evening or wedding dresses need an earlier start. We tell you honestly at the beginning whether it will be ready in time.' },
        { h: 'Pick-up and delivery', p: 'Hotel or home pick-up and delivery is free in Konyaaltı; elsewhere the fee depends on distance and is confirmed on WhatsApp beforehand.' },
      ],
      faq: [
        ['How much does an evening dress alteration cost?', 'Evening dress and wedding dress alterations start from ₺800; the exact price depends on the work and is confirmed from a photo.'],
        ['My event is in a few days. Is that enough time?', 'It depends on the job and workload: simple jobs are usually ready the same or next day, bigger ones can take up to about 3 days. Tell us the date and we will say up front whether it works.'],
        ['Can you collect the outfit from my hotel?', 'Free in Konyaaltı; elsewhere it depends on distance.'],
        ['Can I have an evening dress made from scratch?', 'Yes, we make dresses to measure (from ₺800). We decide the style and fabric together; time and price are confirmed on WhatsApp.'],
      ],
      cta: 'Send a photo on WhatsApp', wa: 'Hello, I need an outfit altered for an event. I am sending a photo and the date.', crumb: 'Evening dress & suit alteration',
    },
    ru: {
      t: 'Подгонка вечернего платья и костюма в Анталье | Terzi Can',
      d: 'Подгонка наряда для свадьбы, гала или ужина: вечернее платье, костюм. Подгонка вечернего платья от ₺800. Пришлите фото и дату.',
      h1: 'Подгонка наряда для события в отпуске: платье, костюм',
      badge: 'Terzi Can · Коньяалты, Анталья',
      lead: 'Наряд для свадьбы, гала или особого вечера сидит не так? Пришлите фото для ушивания, укорачивания или замены молнии и напишите дату события, мы спланируем работу.',
      secs: [
        { h: 'Что мы делаем?', ul: ['Подгонка вечерних платьев: от ₺800', 'Подгонка свадебных платьев: от ₺800', 'Подгонка костюмов и пиджаков', 'Ушивание, укорачивание, замена молнии', 'Пошив вечернего наряда по меркам (пошив платья от ₺800)'] },
        { h: 'Сразу напишите дату', p: 'Напишите в WhatsApp дату события и район вашего отеля. Срок зависит от работы и загрузки; для сложных работ, например вечерних и свадебных платьев, писать нужно заранее. Мы честно скажем в начале, успеем ли.' },
        { h: 'Забор и доставка', p: 'Забор и доставка из отеля или с дома бесплатны в Коньяалты; в другие районы по расстоянию, сумма называется заранее в WhatsApp.' },
      ],
      faq: [
        ['Сколько стоит подгонка вечернего платья?', 'Подгонка вечерних и свадебных платьев стоит от ₺800; точная цена зависит от работы и уточняется по фото.'],
        ['Событие через несколько дней. Успеете?', 'Срок зависит от работы и загрузки: простая работа обычно готова в тот же или на следующий день, сложная может занять до 3 дней. Напишите дату, и мы сразу скажем, успеем ли.'],
        ['Вы заберёте наряд из отеля?', 'В Коньяалты бесплатно; в другие районы по расстоянию.'],
        ['Можно сшить вечернее платье с нуля?', 'Да, шьём платья по меркам (от ₺800). Модель и ткань выбираем вместе; срок и цену уточняем в WhatsApp.'],
      ],
      cta: 'Отправить фото в WhatsApp', wa: 'Здравствуйте, нужна подгонка наряда для события. Отправляю фото и дату.', crumb: 'Подгонка платья и костюма',
    },
    de: {
      t: 'Abendkleid & Anzug ändern in Antalya | Terzi Can',
      d: 'Änderungen für Hochzeit, Gala oder Dinner: Abendkleid, Festkleid, Anzug. Abendkleid ändern ab ₺800. Foto und Termin senden.',
      h1: 'Festkleidung im Urlaub ändern: Abendkleid, Festkleid, Anzug',
      badge: 'Terzi Can · Konyaaltı, Antalya',
      lead: 'Passt Ihr Outfit für Hochzeit, Gala oder einen besonderen Abend nicht richtig? Senden Sie ein Foto für Enger-Machen, Kürzen oder Reißverschlusswechsel und nennen Sie uns Ihren Termin, dann planen wir danach.',
      secs: [
        { h: 'Was machen wir?', ul: ['Abend- und Festkleid ändern: ab ₺800', 'Brautkleid ändern: ab ₺800', 'Anzug und Sakko ändern', 'Enger machen, Kürzen, Reißverschluss wechseln', 'Abendmode nach Maß (Kleid nähen ab ₺800)'] },
        { h: 'Nennen Sie uns zuerst den Termin', p: 'Schreiben Sie uns per WhatsApp Ihr Veranstaltungsdatum und Ihre Hotelgegend. Die Dauer hängt von Arbeit und Auslastung ab; bei größeren Arbeiten wie Abend- oder Brautkleidern sollten Sie früh schreiben. Wir sagen Ihnen gleich ehrlich, ob es rechtzeitig klappt.' },
        { h: 'Abholung und Lieferung', p: 'Abholung und Lieferung am Hotel oder zu Hause sind in Konyaaltı kostenlos; sonst richtet sich der Preis nach der Entfernung und wird vorher per WhatsApp genannt.' },
      ],
      faq: [
        ['Was kostet es, ein Abendkleid zu ändern?', 'Abend- und Brautkleid-Änderungen beginnen ab ₺800; der genaue Preis hängt von der Arbeit ab und wird anhand eines Fotos genannt.'],
        ['Mein Termin ist in wenigen Tagen. Reicht die Zeit?', 'Das hängt von Arbeit und Auslastung ab: Einfache Arbeiten sind meist am selben oder nächsten Tag fertig, größere können bis zu etwa 3 Tage dauern. Nennen Sie den Termin, wir sagen sofort, ob es passt.'],
        ['Holen Sie das Outfit im Hotel ab?', 'In Konyaaltı kostenlos; sonst je nach Entfernung.'],
        ['Kann ich ein Abendkleid ganz neu anfertigen lassen?', 'Ja, wir nähen Kleider nach Maß (ab ₺800). Schnitt und Stoff legen wir gemeinsam fest; Dauer und Preis klären wir per WhatsApp.'],
      ],
      cta: 'Foto per WhatsApp senden', wa: 'Guten Tag, ich brauche eine Änderung für ein Outfit zu einem Anlass. Ich sende Foto und Datum.', crumb: 'Abendkleid & Anzug ändern',
    },
  },
};
