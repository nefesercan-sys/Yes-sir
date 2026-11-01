// ============================================================
// EN / RU / DE sayfalar için bölge ve hizmet başına ELLE yazılmış, birbirinden FARKLI başlık / açıklama / anahtar kelime.
// Her yakın bölge ayrı bir ihtiyaca odaklanır (tamir-tadilat, abiye/gelinlik, takım elbise, yırtık onarımı, keten-pamuk özel dikim,
// kot/paça, mont/deri...). Hem tamir-tadilat hem özel dikim (keten, pamuk; bay, bayan) kapsanır.
// Yalnızca doğrulanmış bilgi: paça ₺200'den, fermuar ₺300'den, abiye ve gelinlik ₺800'den, elbise dikimi ₺800'den; otellere servis ücretsiz,
// eve ücretsiz servis yakın bölgelerde (lib/business.ts); süreler: normal ertesi gün, acil 1–2 saat.
// Bölgede kayıt yoksa sayfa lib/seo-angles.ts şablonuna döner.
// ============================================================

export type FgMeta = { title: string; desc: string; kw: string[] };
type L3 = 'en' | 'ru' | 'de';
type Row = Record<L3, { t: string; d: string; kw: string[] }>;

const FG_DISTRICT: Record<string, Row> = {
  "konyaalti": {
    en: { t: "Konyaaltı Tailor: Hurma, Liman, Uncalı Beach | Terzi Can", d: "Konyaaltı tailor covering Hurma, Liman, Uncalı, Sarısu and Gürsu: dress repair, alterations, custom linen outfits. Free pick-up. ☎ +90 531 898 64 18", kw: ["tailor Konyaaltı", "tailor Konyaaltı beach", "tailor Hurma Konyaaltı", "tailor Liman Konyaaltı", "tailor Uncalı", "tailor Sarısu", "tailor Gürsu", "dress repair Konyaaltı", "custom linen sewing Konyaaltı"] },
    ru: { t: "Портной Коньяалты: Хурма, Лиман, Унджалы | Terzi Can", d: "Портной в Коньяалты, районы Хурма, Лиман, Унджалы, Сарысу, Гюрсу: ремонт платьев, подгонка, пошив из льна. Забор бесплатно. ☎ +90 531 898 64 18", kw: ["портной Коньяалты", "портной пляж Коньяалты", "портной Хурма Коньяалты", "портной Лиман Коньяалты", "ремонт платьев Коньяалты", "пошив из льна Коньяалты"] },
    de: { t: "Schneider Konyaaltı: Hurma, Liman, Uncalı | Terzi Can", d: "Schneider in Konyaaltı für Hurma, Liman, Uncalı, Sarısu, Gürsu: Kleider ändern und reparieren, Leinen nach Maß. Abholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Konyaaltı", "Schneider Konyaaltı Strand", "Schneider Hurma Konyaaltı", "Schneider Liman Konyaaltı", "Kleid ändern Konyaaltı", "Leinen nach Maß Konyaaltı"] },
  },
  "muratpasa": {
    en: { t: "Muratpaşa Tailor: Evening & Wedding Dresses | Terzi Can", d: "Evening or wedding dress needs altering in Muratpaşa? Done with a fitting. Collection from hotel or home arranged on WhatsApp. ☎ +90 531 898 64 18", kw: ["tailor Muratpaşa", "evening dress alteration Muratpaşa", "wedding dress alteration Antalya", "dress tailor Muratpaşa"] },
    ru: { t: "Портной Муратпаша: вечерние и свадебные платья | Terzi Can", d: "Подгонка вечерних и свадебных платьев в Муратпаше: вечернее и свадебное. С примеркой, забор — по договорённости в WhatsApp. ☎ +90 531 898 64 18", kw: ["портной Муратпаша", "подгонка вечернего платья Муратпаша", "подгонка свадебного платья Анталья"] },
    de: { t: "Schneider Muratpaşa: Abend- & Brautkleid ändern | Terzi Can", d: "Abend- oder Brautkleid in Muratpaşa ändern lassen:, mit Anprobe. Abholung per WhatsApp abstimmen. ☎ +90 531 898 64 18", kw: ["Schneider Muratpaşa", "Abendkleid ändern Muratpaşa", "Brautkleid ändern Antalya"] },
  },
  "meltem": {
    en: { t: "Meltem Tailor: Suit, Jacket & Trouser Alteration | Terzi Can", d: "Suits, jackets and trousers altered in Meltem for men and women: sleeves, hems, waist, shoulders. Pick-up and delivery are free. ☎ +90 531 898 64 18", kw: ["tailor Meltem", "suit alteration Meltem", "jacket alteration Antalya", "trouser hemming Meltem"] },
    ru: { t: "Портной Мельтем: костюм, пиджак, брюки | Terzi Can", d: "Подгонка костюмов, пиджаков и брюк в Мельтеме, мужских и женских: рукава, длина, талия, плечи. Примерка на вас, забор бесплатно. ☎ +90 531 898 64 18", kw: ["портной Мельтем", "подгонка костюма Мельтем", "подгонка пиджака Анталья", "подшив брюк Мельтем"] },
    de: { t: "Schneider Meltem: Anzug, Sakko, Hose ändern | Terzi Can", d: "Anzüge, Sakkos und Hosen in Meltem ändern, für Herren und Damen: Ärmel, Saum, Taille, Schultern. Abholung und Lieferung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Meltem", "Anzug ändern Meltem", "Sakko ändern Antalya", "Hose kürzen Meltem"] },
  },
  "fener": {
    en: { t: "Fener Tailor: Torn Clothes & Seam Repair | Terzi Can", d: "Torn clothes, holes and open seams mended in Fener with matching thread, usually ready the next day, for men and women. ☎ +90 531 898 64 18", kw: ["tailor Fener", "torn clothes repair Fener", "fix hole in clothes Antalya", "sew open seam Fener"] },
    ru: { t: "Портной Фенер: ремонт порванной одежды, швы | Terzi Can", d: "Зашиваем порванную одежду, дырки и распоровшиеся швы в Фенере. Нитки подбираем под ткань, обычно готово на следующий день. ☎ +90 531 898 64 18", kw: ["портной Фенер", "ремонт порванной одежды Фенер", "зашить дырку Анталья", "зашить шов Фенер"] },
    de: { t: "Schneider Fener: Riss & Loch in Kleidung flicken | Terzi Can", d: "Risse, Löcher und offene Nähte in Fener flicken, für Damen und Herren. Passendes Garn, meist am nächsten Tag fertig. ☎ +90 531 898 64 18", kw: ["Schneider Fener", "Riss reparieren Fener", "Loch flicken Antalya", "Naht nähen Fener"] },
  },
  "sirinyali": {
    en: { t: "Şirinyalı Tailor: Made-to-Measure Linen Dresses | Terzi Can", d: "Linen and cotton dresses, shirts and outfits made to measure in Şirinyalı, for women and men. Pick-up arranged on WhatsApp. ☎ +90 531 898 64 18", kw: ["tailor Şirinyalı", "made to measure dress Antalya", "linen dress tailor Şirinyalı", "custom clothing men women Antalya"] },
    ru: { t: "Ширинъялы: пошив льняных платьев по меркам | Terzi Can", d: "Льняные и хлопковые платья, рубашки и наряды на заказ в Ширинъялы, для женщин и мужчин, по вашим меркам. ☎ +90 531 898 64 18", kw: ["пошив платья по меркам Ширинъялы", "льняное платье на заказ Анталья", "пошив одежды на заказ Анталья"] },
    de: { t: "Şirinyalı: Leinenkleider nach Maß nähen lassen | Terzi Can", d: "Kleider, Hemden und Outfits aus Leinen und Baumwolle nach Maß in Şirinyalı, für Damen und Herren. Abholung per WhatsApp. ☎ +90 531 898 64 18", kw: ["Kleid nach Maß Şirinyalı", "Leinenkleid nähen lassen Antalya", "Maßschneiderei Antalya Damen Herren"] },
  },
  "arapsuyu": {
    en: { t: "Arapsuyu Tailor: Men's & Women's Repairs, Jeans | Terzi Can", d: "Men's and women's clothing repairs in Arapsuyu: jeans hemming, trouser taking in, dress repair, open seams. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Arapsuyu", "jeans hemming Arapsuyu", "clothing repair Arapsuyu", "dress alteration Arapsuyu"] },
    ru: { t: "Портной Арапсую: ремонт мужской и женской одежды | Terzi Can", d: "Мужская и женская одежда в Арапсую: подшив джинсов, ушивание брюк, ремонт платьев, швы. Забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Арапсую", "подшить джинсы Арапсую", "ремонт одежды Арапсую"] },
    de: { t: "Arapsuyu: Herren- und Damenkleidung ändern | Terzi Can", d: "Herren- und Damenkleidung in Arapsuyu: Jeans kürzen, Hose enger machen, Kleid reparieren, Nähte schließen. Abholung und Lieferung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Arapsuyu", "Jeans kürzen Arapsuyu", "Kleidung reparieren Arapsuyu"] },
  },
  "toros": {
    en: { t: "Toros Tailor Near Me: Next-Day Trouser Hemming | Terzi Can", d: "Trousers, skirts and jeans hemmed near Toros, ready the next day or in 1–2 hours if urgent. ☎ +90 531 898 64 18", kw: ["tailor near me Toros", "trouser hemming near me", "urgent hemming Antalya", "tailor open now Antalya"] },
    ru: { t: "Портной рядом, Торос: подшив брюк на следующий день | Terzi Can", d: "Портной рядом, район Торос: подшив брюк, юбок и джинсов, готово на следующий день, срочно — за 1–2 часа. ☎ +90 531 898 64 18", kw: ["портной рядом Торос", "подшить брюки рядом", "срочный подшив Анталья"] },
    de: { t: "Toros: Schneider in der Nähe, Hose kürzen bis morgen | Terzi Can", d: "Schneider nahe Toros: Hosen, Röcke und Jeans kürzen, am nächsten Tag fertig, eilig in 1–2 Stunden. ☎ +90 531 898 64 18", kw: ["Schneider in der Nähe Toros", "Hose kürzen in der Nähe", "Hose kürzen eilig Antalya"] },
  },
  "ogretmenevleri": {
    en: { t: "Öğretmenevleri Tailor: Coat, Leather, Zipper Fix | Terzi Can", d: "Coat, jacket and leather jacket alterations in Öğretmenevleri: shorten, take in, replace zippers. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Öğretmenevleri", "coat alteration Antalya", "leather jacket repair Antalya", "zipper replacement Öğretmenevleri"] },
    ru: { t: "Огретменевлери: пальто, кожа, молнии, ремонт | Terzi Can", d: "Пальто, куртки и кожаные куртки в Огретменевлери: укоротить, ушить, заменить молнию. Забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Огретменевлери", "подгонка пальто Анталья", "ремонт кожаной куртки Анталья", "замена молнии Огретменевлери"] },
    de: { t: "Öğretmenevleri: Mantel, Leder, Reißverschluss | Terzi Can", d: "Mäntel, Jacken und Lederjacken in Öğretmenevleri kürzen, enger machen, Reißverschluss. Abholung und Lieferung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Öğretmenevleri", "Mantel ändern Antalya", "Lederjacke reparieren Antalya", "Reißverschluss wechseln Öğretmenevleri"] },
  },
  "side": {
    en: { t: "Side Tailor: Hotel Pick-up, Clothing Repairs | Terzi Can", d: "Hotel guest in Side? We collect your clothes for alterations, repairs or custom linen and cotton pieces, for men and women. ☎ +90 531 898 64 18", kw: ["tailor Side Antalya", "hotel tailor Side", "custom linen clothing Side", "clothing alterations Side Turkey"] },
    ru: { t: "Портной Сиде: из отеля, лён и хлопок на заказ | Terzi Can", d: "Живёте в отеле в Сиде? Заберём вещи на подгонку, ремонт или пошив из льна и хлопка, мужское и женское. ☎ +90 531 898 64 18", kw: ["портной Сиде", "портной в отеле Сиде", "льняная одежда на заказ Сиде", "ремонт одежды Сиде"] },
    de: { t: "Schneider Side: Hotelabholung, Leinen nach Maß | Terzi Can", d: "Im Hotel in Side? Wir holen Ihre Kleidung für Änderungen, Reparaturen oder Leinen und Baumwolle nach Maß ab. ☎ +90 531 898 64 18", kw: ["Schneider Side Antalya", "Hotelschneider Side", "Leinenkleidung nach Maß Side", "Kleidung ändern Side"] },
  },
  "aksu": {
    en: { t: "Aksu Tailor: Custom Sewing & Dress Alteration | Terzi Can", d: "Custom sewing for men and women in Aksu, plus dress repairs, alterations and hemming. Hotel and home pick-up via WhatsApp. ☎ +90 531 898 64 18", kw: ["tailor Aksu Antalya", "custom sewing Aksu", "dress alteration Aksu", "trouser hemming Aksu"] },
    ru: { t: "Портной Аксу: пошив на заказ и подгонка платьев | Terzi Can", d: "Пошив на заказ для мужчин и женщин в Аксу, ремонт платьев, подгонка, подшив брюк. Забор из отелей и домов — в WhatsApp. ☎ +90 531 898 64 18", kw: ["портной Аксу", "пошив на заказ Аксу", "подгонка платья Аксу", "подшив брюк Аксу"] },
    de: { t: "Schneider Aksu: Maßanfertigung & Kleider ändern | Terzi Can", d: "Maßanfertigung für Damen und Herren in Aksu, dazu Kleider reparieren und ändern, Hosen kürzen. Abholung per WhatsApp. ☎ +90 531 898 64 18", kw: ["Schneider Aksu Antalya", "Maßanfertigung Aksu", "Kleid ändern Aksu", "Hose kürzen Aksu"] },
  },
  "lara": {
    en: { t: "Lara Tailor: Evening Dress & Hemming Fixes | Terzi Can", d: "Staying in Lara? Evening dress fitting, hemming, quick repairs and custom linen sewing for men and women. Hotel pick-up on WhatsApp. ☎ +90 531 898 64 18", kw: ["tailor Lara", "tailor Lara Antalya", "evening dress alteration Lara", "hotel tailor Lara", "custom linen dress Lara", "clothing repair Lara", "hemming Lara hotel"] },
    ru: { t: "Портной Лара: вечернее платье и подшив | Terzi Can", d: "Отдыхаете в Ларе? Подгонка вечерних платьев, подшив, быстрый ремонт и пошив из льна для мужчин и женщин. Забор из отеля — через WhatsApp. ☎ +90 531 898 64 18", kw: ["портной Лара", "ателье Лара Анталья", "подгонка вечернего платья Лара", "портной в отель Лара", "пошив льняного платья Лара", "ремонт одежды Лара"] },
    de: { t: "Schneider Lara: Abendkleid & Saum ändern | Terzi Can", d: "Urlaub in Lara? Abendkleid anpassen, Saum kürzen, schnelle Reparaturen und Leinen nach Maß. Hotelabholung per WhatsApp. ☎ +90 531 898 64 18", kw: ["Schneider Lara", "Änderungsschneiderei Lara", "Abendkleid ändern Lara", "Hotel Schneider Lara", "Leinenkleid nach Maß Lara", "Kleidung reparieren Lara"] },
  },
  "kundu": {
    en: { t: "Kundu Tailor: Zipper & Torn Clothes Repair | Terzi Can", d: "Broken zipper or torn seam in Kundu? Fast repairs and alterations, plus custom cotton and linen outfits. Hotel pick-up on WhatsApp. ☎ +90 531 898 64 18", kw: ["tailor Kundu", "zipper repair Kundu", "torn clothes repair Kundu", "hotel tailor Kundu", "clothing alterations Kundu", "custom cotton outfit Kundu"] },
    ru: { t: "Портной Кунду: молния и порванная одежда | Terzi Can", d: "Сломалась молния или порвался шов в Кунду? Быстрый ремонт и подгонка, пошив из хлопка и льна. Забор из отеля — через WhatsApp. ☎ +90 531 898 64 18", kw: ["портной Кунду", "замена молнии Кунду", "ремонт порванной одежды Кунду", "портной в отель Кунду", "подгонка одежды Кунду"] },
    de: { t: "Schneider Kundu: Reißverschluss & Risse flicken | Terzi Can", d: "Reißverschluss defekt oder Naht offen in Kundu? Schnelle Reparaturen und Outfits nach Maß aus Leinen. Abholung per WhatsApp. ☎ +90 531 898 64 18", kw: ["Schneider Kundu", "Reißverschluss reparieren Kundu", "Riss in Kleidung flicken Kundu", "Hotel Schneider Kundu", "Kleidung ändern Kundu"] },
  },
  "belek": {
    en: { t: "Belek Tailor: Custom Linen Shirts & Suits | Terzi Can", d: "Made-to-measure linen and cotton shirts, trousers, suits and dresses in Belek, plus alterations and repairs for guests and locals. ☎ +90 531 898 64 18", kw: ["tailor Belek", "custom linen shirt Belek", "made to measure suit Belek", "linen dress tailor Belek", "hotel tailor Belek", "clothing alterations Belek"] },
    ru: { t: "Портной Белек: льняные рубашки и костюмы | Terzi Can", d: "Рубашки, брюки, костюмы и платья из льна и хлопка на заказ в Белеке, мужские и женские, плюс подгонка и ремонт. ☎ +90 531 898 64 18", kw: ["портной Белек", "льняная рубашка на заказ Белек", "костюм по меркам Белек", "пошив платья Белек", "портной в отель Белек", "подгонка одежды Белек"] },
    de: { t: "Schneider Belek: Leinenhemd & Anzug nach Maß | Terzi Can", d: "Hemden, Hosen, Anzüge und Kleider aus Leinen und Baumwolle nach Maß in Belek, dazu Änderungen und Reparaturen. ☎ +90 531 898 64 18", kw: ["Schneider Belek", "Leinenhemd nach Maß Belek", "Maßanzug Belek", "Leinenkleid Belek", "Hotel Schneider Belek", "Kleidung ändern Belek"] },
  },
  "goynuk": {
    en: { t: "Göynük Tailor: Kids & Family Linen Outfits | Terzi Can", d: "Linen and cotton outfits made in Göynük for kids, women and men, with matching family sets, plus hemming and repairs. ☎ +90 531 898 64 18", kw: ["tailor Göynük", "kids linen clothing Göynük", "custom family outfits Göynük", "clothing repair Göynük", "hotel tailor Göynük", "hemming Göynük"] },
    ru: { t: "Портной Гёйнюк: льняная одежда для всей семьи | Terzi Can", d: "Льняные и хлопковые наряды в Гёйнюке для детей, женщин и мужчин, семейные комплекты, плюс подшив и ремонт. ☎ +90 531 898 64 18", kw: ["портной Гёйнюк", "детская льняная одежда Гёйнюк", "семейные образы на заказ Гёйнюк", "ремонт одежды Гёйнюк", "подшив Гёйнюк"] },
    de: { t: "Schneider Göynük: Leinen für Kinder & Familie | Terzi Can", d: "Leinen- und Baumwollmode nach Maß in Göynük für Kinder, Damen und Herren, Partnerlook möglich, dazu Saum und Reparaturen. ☎ +90 531 898 64 18", kw: ["Schneider Göynük", "Kinder Leinenkleidung Göynük", "Partnerlook Familie Göynük", "Kleidung reparieren Göynük", "Saum kürzen Göynük"] },
  },
  "beldibi": {
    en: { t: "Beldibi Tailor: Beach Linen Dresses & Repairs | Terzi Can", d: "Made-to-measure beach linen dresses and shirts in Beldibi, plus hemming, zipper swaps and mending of torn clothes. ☎ +90 531 898 64 18", kw: ["tailor Beldibi", "beach linen dress Beldibi", "custom linen clothing Beldibi", "zipper replacement Beldibi", "torn clothes repair Beldibi", "hotel tailor Beldibi"] },
    ru: { t: "Портной Бельдиби: пляжные платья и ремонт | Terzi Can", d: "Пляжные льняные платья и рубашки по меркам в Бельдиби, плюс подшив, замена молнии и ремонт порванных вещей. ☎ +90 531 898 64 18", kw: ["портной Бельдиби", "пляжное платье на заказ Бельдиби", "льняная одежда на заказ Бельдиби", "замена молнии Бельдиби", "ремонт одежды Бельдиби"] },
    de: { t: "Schneider Beldibi: Strandkleider & Reparaturen | Terzi Can", d: "Strandkleider und Hemden aus Leinen nach Maß in Beldibi, dazu Saum, Reißverschluss und Risse flicken. ☎ +90 531 898 64 18", kw: ["Schneider Beldibi", "Strandkleid nach Maß Beldibi", "Leinenkleidung Beldibi", "Reißverschluss wechseln Beldibi", "Kleidung reparieren Beldibi"] },
  },
  "hurma": {
    en: { t: "Hurma Tailor Near Me: Photo, Quote, Pick-up | Terzi Can", d: "Need a tailor in Hurma? Send a photo of the garment on WhatsApp and get a price: hemming, zippers. Free pick-up. ☎ +90 531 898 64 18", kw: ["tailor Hurma", "Hurma clothing alterations", "Hurma hemming Antalya"] },
    ru: { t: "Портной в Хурме: пришлите фото — назовём цену | Terzi Can", d: "Нужен портной в Хурме? Пришлите фото вещи в WhatsApp и узнайте цену: подшив, молния. Забор бесплатно. ☎ +90 531 898 64 18", kw: ["портной Хурма", "ремонт одежды Хурма", "подшив брюк Хурма"] },
    de: { t: "Schneider Hurma: Foto senden, Preis erfahren | Terzi Can", d: "Schneider in Hurma gesucht? Foto per WhatsApp senden und Preis erfahren: Kürzen, Reißverschluss. Abholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Hurma", "Kleidung ändern Hurma", "Hose kürzen Hurma"] },
  },
  "liman": {
    en: { t: "Liman Tailor: Alterations Picked Up From Home | Terzi Can", d: "Alterations and repairs in Liman: trousers, dresses, jackets, zippers. We collect from your door and deliver back, free. ☎ +90 531 898 64 18", kw: ["tailor Liman", "Liman clothing alterations", "Liman hemming Antalya"] },
    ru: { t: "Портной в Лимане: забор вещей с доставкой | Terzi Can", d: "Подгонка и ремонт в Лимане: брюки, платья, куртки, молнии. Заберём вещи с вашего адреса и привезём обратно бесплатно. ☎ +90 531 898 64 18", kw: ["портной Лиман", "ремонт одежды Лиман", "подшив брюк Лиман"] },
    de: { t: "Schneider Liman: Abholung bis zur Haustür | Terzi Can", d: "Änderungen und Reparaturen in Liman: Hosen, Kleider, Jacken, Reißverschluss. Wir holen ab und liefern zurück, kostenlos. ☎ +90 531 898 64 18", kw: ["Schneider Liman", "Kleidung ändern Liman", "Hose kürzen Liman"] },
  },
  "gursu": {
    en: { t: "Gürsu Tailor: Coat, Jacket & Trouser Fixes | Terzi Can", d: "Coat, jacket and trouser alterations in Gürsu, from hemming to zipper replacement. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Gürsu", "Gürsu clothing alterations", "Gürsu hemming Antalya"] },
    ru: { t: "Портной в Гюрсу: пальто, куртки, брюки | Terzi Can", d: "Подгонка пальто, курток и брюк в Гюрсу: подшив, замена молнии. Забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Гюрсу", "ремонт одежды Гюрсу", "подшив брюк Гюрсу"] },
    de: { t: "Schneider Gürsu: Mantel, Jacke, Hose ändern | Terzi Can", d: "Mäntel, Jacken und Hosen in Gürsu ändern: Kürzen, Reißverschluss. Abholung und Lieferung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Gürsu", "Kleidung ändern Gürsu", "Hose kürzen Gürsu"] },
  },
  "uncali": {
    en: { t: "Uncalı Tailor: Dress & Evening Gown Alteration | Terzi Can", d: "Dress and evening gown alteration in Uncalı, plus skirt and trouser hemming. Pick-up and delivery are free. ☎ +90 531 898 64 18", kw: ["tailor Uncalı", "Uncalı clothing alterations", "Uncalı hemming Antalya"] },
    ru: { t: "Портной в Унджалы: платья и вечерние наряды | Terzi Can", d: "Подгонка платьев и вечерних нарядов в Унджалы, подшив юбок и брюк. Забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Унджалы", "ремонт одежды Унджалы", "подшив брюк Унджалы"] },
    de: { t: "Schneider Uncalı: Kleider & Abendmode ändern | Terzi Can", d: "Kleider und Abendmode in Uncalı ändern, dazu Röcke und Hosen kürzen. Abholung und Lieferung kostenlos. ☎ +90 531 898 64 18", kw: ["Schneider Uncalı", "Kleidung ändern Uncalı", "Hose kürzen Uncalı"] },
  },
  "sarisu": {
    en: { t: "Sarısu Tailor: Jeans & Shorts Hemming | Terzi Can", d: "Jeans, shorts and trouser hemming in Sarısu, zippers. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Sarısu", "Sarısu clothing alterations", "Sarısu hemming Antalya"] },
    ru: { t: "Портной в Сарысу: подшив джинсов и шорт | Terzi Can", d: "Подшив джинсов, шорт и брюк в Сарысу, замена молнии. Ежедневно 08:00–23:00, забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Сарысу", "ремонт одежды Сарысу", "подшив брюк Сарысу"] },
    de: { t: "Schneider Sarısu: Jeans & Shorts kürzen | Terzi Can", d: "Jeans, Shorts und Hosen in Sarısu kürzen, Reißverschluss. Abholung und Lieferung kostenlos. ☎ +90 531 898 64 18", kw: ["Schneider Sarısu", "Kleidung ändern Sarısu", "Hose kürzen Sarısu"] },
  },
  "uluc": {
    en: { t: "Uluç Tailor: Hemming, Taking In, Custom Sewing | Terzi Can", d: "Tailor service in Uluç: hemming, taking in and shortening, custom sewing. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Uluç", "Uluç clothing alterations", "Uluç hemming Antalya"] },
    ru: { t: "Портной в Улуче: подшив, ушивание, пошив | Terzi Can", d: "Портной в Улуче: подшив, ушивание и укорачивание, пошив на заказ. Забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Улуч", "ремонт одежды Улуч", "подшив брюк Улуч"] },
    de: { t: "Schneider Uluç: Kürzen, Enger, Maßanfertigung | Terzi Can", d: "Schneiderservice in Uluç: Kürzen, enger und kürzer machen, Maßanfertigung. Abholung und Lieferung kostenlos. ☎ +90 531 898 64 18", kw: ["Schneider Uluç", "Kleidung ändern Uluç", "Hose kürzen Uluç"] },
  },
  "siteler": {
    en: { t: "Siteler Tailor: Evening Dress & Zipper Repair | Terzi Can", d: "Tailor in Siteler: evening dress and dress alteration, zipper replacement. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Siteler", "Siteler clothing alterations", "Siteler hemming Antalya"] },
    ru: { t: "Портной в Ситлере: вечерние платья, молнии | Terzi Can", d: "Портной в Ситлере: подгонка вечерних платьев, замена молнии. Забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Ситлер", "ремонт одежды Ситлер", "подшив брюк Ситлер"] },
    de: { t: "Schneider Siteler: Abendkleid, Reißverschluss | Terzi Can", d: "Schneider in Siteler: Abendkleid ändern, Reißverschluss wechseln. Abholung und Lieferung kostenlos. ☎ +90 531 898 64 18", kw: ["Schneider Siteler", "Kleidung ändern Siteler", "Hose kürzen Siteler"] },
  },
  "altinkum": {
    en: { t: "Altınkum Tailor: Beach & Holiday Clothes Fixes | Terzi Can", d: "Quick fixes for beach and holiday clothes in Altınkum: dresses, shorts, trousers, zippers. Hemming, free pick-up. ☎ +90 531 898 64 18", kw: ["tailor Altınkum", "Altınkum clothing alterations", "Altınkum hemming Antalya"] },
    ru: { t: "Портной в Алтынкуме: пляжная и отпускная одежда | Terzi Can", d: "Быстрый ремонт пляжной и отпускной одежды в Алтынкуме: платья, шорты, брюки, молнии. Подшив, забор бесплатно. ☎ +90 531 898 64 18", kw: ["портной Алтынкум", "ремонт одежды Алтынкум", "подшив брюк Алтынкум"] },
    de: { t: "Schneider Altınkum: Strand- & Urlaubskleidung | Terzi Can", d: "Schnelle Reparaturen für Strand- und Urlaubskleidung in Altınkum: Kleider, Shorts, Hosen. Kürzen, Abholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Altınkum", "Kleidung ändern Altınkum", "Hose kürzen Altınkum"] },
  },
};

const FG_SERVICE: Record<string, Row> = {
  "paca": {
    en: { t: "Trouser & Skirt Hemming Antalya | Terzi Can", d: "Hemming for trousers, skirts and jeans in Antalya. Length pinned on you, ready the next day or in 1–2 hours if urgent. ☎ +90 531 898 64 18", kw: ["skirt hemming", "trouser hemming Antalya", "shorten trousers", "hem pants near me"] },
    ru: { t: "Подшив брюк и юбок в Анталье | Terzi Can", d: "Подшив брюк, юбок и джинсов в Анталье. Длину отмечаем на вас; готово на следующий день, срочно — за 1–2 часа. ☎ +90 531 898 64 18", kw: ["подшить юбку", "подшив брюк Анталья", "укоротить брюки"] },
    de: { t: "Hosen & Röcke kürzen in Antalya | Terzi Can", d: "Hosen, Röcke und Jeans in Antalya kürzen. Länge am Körper abgesteckt; am nächsten Tag fertig, eilig in 1–2 Std. ☎ +90 531 898 64 18", kw: ["Rock kürzen", "Hose kürzen Antalya", "Hosensaum kürzen"] },
  },
  "kot": {
    en: { t: "Jeans Hemming & Taking In Antalya | Terzi Can", d: "Jeans shortened or taken in in Antalya. Heavy-duty thread for thick denim; leg length and width to your measurements. ☎ +90 531 898 64 18", kw: ["jeans hemming", "taper jeans tailor", "take in jeans waist Antalya"] },
    ru: { t: "Подшив и ушивание джинсов в Анталье | Terzi Can", d: "Джинсы: подшить или ушить в Анталье. Плотные нитки для денима, длину и ширину штанин делаем по вашим меркам. ☎ +90 531 898 64 18", kw: ["подшить джинсы", "ушить джинсы Анталья", "джинсы подшив с сохранением низа"] },
    de: { t: "Jeans kürzen & enger machen Antalya | Terzi Can", d: "Jeans in Antalya kürzen oder enger machen. Garn für dicken Denim, Länge und Beinweite nach Ihren Maßen. ☎ +90 531 898 64 18", kw: ["Jeans kürzen", "Jeans enger machen", "Jeans Bund enger Antalya"] },
  },
  "bel": {
    en: { t: "Take In Waist: Trousers, Skirts, Dresses Antalya | Terzi Can", d: "Clothes too loose? Waists of trousers, skirts, dresses and jackets taken in at a fitting in Antalya, ready the next day. ☎ +90 531 898 64 18", kw: ["waist alteration", "take in trousers waist", "clothes too big alteration", "skirt waist alteration"] },
    ru: { t: "Ушить в талии: брюки, юбка, платье, Анталья | Terzi Can", d: "Велика одежда? Ушиваем талию брюк, юбок, платьев и пиджаков в Анталье на примерке, готово на следующий день. ☎ +90 531 898 64 18", kw: ["ушить в талии", "ушить брюки", "ушить платье", "уменьшить размер одежды"] },
    de: { t: "Taille enger machen: Hose, Rock, Kleid Antalya | Terzi Can", d: "Kleidung zu weit? Taille von Hosen, Röcken, Kleidern und Sakkos in Antalya bei der Anprobe enger machen, am nächsten Tag fertig. ☎ +90 531 898 64 18", kw: ["Taille enger machen", "Hose enger machen", "Kleid enger machen", "Kleidung zu groß ändern"] },
  },
  "fermuar": {
    en: { t: "Zipper Repair & Replacement Antalya | Terzi Can", d: "Zippers replaced or repaired in Antalya, for trousers, jackets, coats, dresses and bags. ☎ +90 531 898 64 18", kw: ["zipper repair", "zipper replacement Antalya", "jacket zipper replacement", "bag zipper repair"] },
    ru: { t: "Замена и ремонт молнии в Анталье | Terzi Can", d: "Замена и ремонт молний в Анталье: брюки, куртки, пальто, платья, сумки. Подбираем по цвету и ткани. ☎ +90 531 898 64 18", kw: ["замена молнии", "ремонт молнии Анталья", "заменить молнию на куртке"] },
    de: { t: "Reißverschluss wechseln & reparieren | Terzi Can", d: "Reißverschlüsse in Antalya wechseln und reparieren: Hosen, Jacken, Mäntel, Kleider, Taschen. ☎ +90 531 898 64 18", kw: ["Reißverschluss wechseln", "Reißverschluss reparieren Antalya", "Reißverschluss Jacke wechseln"] },
  },
  "elbise-dikim": {
    en: { t: "Custom Dress Making: Linen & Cotton, Men & Women | Terzi Can", d: "Made-to-measure dresses, shirts and outfits in linen or cotton for women and men in Antalya,, in your chosen model. ☎ +90 531 898 64 18", kw: ["custom dress making", "made to measure clothing", "linen dress tailor", "cotton clothing custom", "men women custom tailor Antalya"] },
    ru: { t: "Пошив платьев на заказ: лён, хлопок, муж/жен | Terzi Can", d: "Платья, рубашки и наряды из льна или хлопка на заказ в Анталье, для женщин и мужчин, по вашей модели. ☎ +90 531 898 64 18", kw: ["пошив платья на заказ", "пошив по меркам", "льняное платье на заказ", "пошив из хлопка Анталья"] },
    de: { t: "Kleider nach Maß nähen: Leinen, Baumwolle | Terzi Can", d: "Kleider, Hemden und Outfits aus Leinen oder Baumwolle in Antalya nach Maß, für Damen und Herren, nach Ihrem Modell. ☎ +90 531 898 64 18", kw: ["Kleid nach Maß", "Maßschneiderei Antalya", "Leinenkleid nähen lassen", "Baumwollkleidung nach Maß"] },
  },
  "elbise-tamir": {
    en: { t: "Dress Repair & Alteration Antalya, Torn Seams | Terzi Can", d: "Dress repairs in Antalya: take in, shorten, fix straps and sleeves, close open seams and tears. ☎ +90 531 898 64 18", kw: ["dress repair", "dress alteration Antalya", "mend torn clothes", "shorten dress", "take in dress"] },
    ru: { t: "Ремонт и переделка платьев, Анталья, швы | Terzi Can", d: "Ремонт платьев в Анталье: ушить, укоротить, поправить бретели и рукава, зашить швы и порывы. ☎ +90 531 898 64 18", kw: ["ремонт платья", "переделка платья Анталья", "зашить порванную одежду", "ушить платье"] },
    de: { t: "Kleider ändern & reparieren in Antalya, Nähte | Terzi Can", d: "Kleider in Antalya reparieren: enger machen, kürzen, Träger und Ärmel richten, offene Nähte und Risse schließen. ☎ +90 531 898 64 18", kw: ["Kleid ändern", "Kleid reparieren Antalya", "Riss nähen lassen", "Kleid kürzen"] },
  },
  "gelinlik-abiye": {
    en: { t: "Wedding & Evening Dress Alteration | Terzi Can", d: "Wedding and evening dress alterations in Antalya: bodice, hem, corset and straps, with fittings. Hotel service possible. ☎ +90 531 898 64 18", kw: ["wedding dress alteration", "evening gown alteration", "bridal gown alterations Antalya", "prom dress alteration"] },
    ru: { t: "Подгонка свадебных и вечерних платьев | Terzi Can", d: "Подгонка вечерних и свадебных платьев в Анталье: лиф, длина, корсет, бретели, с примеркой. Возможен выезд в отель. ☎ +90 531 898 64 18", kw: ["подгонка свадебного платья", "подгонка вечернего платья", "ателье свадебные платья Анталья"] },
    de: { t: "Brautkleid & Abendkleid ändern | Terzi Can", d: "Abend- und Brautkleid in Antalya ändern: Oberteil, Saum, Korsett, Träger, mit Anprobe. Hotelservice möglich. ☎ +90 531 898 64 18", kw: ["Brautkleid ändern", "Abendkleid ändern", "Brautkleid Änderungsschneiderei Antalya"] },
  },
  "abiye": {
    en: { t: "Evening Dress & Formal Wear Alteration, Antalya | Terzi Can", d: "Evening dress, formal wear and special-occasion outfit alterations in Antalya: take in, let out, shorten, straps and zippers. Pick-up arranged on WhatsApp. ☎ +90 531 898 64 18", kw: ["evening dress alteration", "evening gown tailor", "formal dress alteration", "special occasion dress alteration"] },
    ru: { t: "Подгонка вечерних платьев и нарядов в Анталье | Terzi Can", d: "Подгонка вечерних платьев, нарядной одежды и нарядов для особых случаев в Анталье: ушить, расширить, укоротить, бретели и молнии. Забор и доставка обсуждаются в WhatsApp. ☎ +90 531 898 64 18", kw: ["подгонка вечернего платья", "ушить вечернее платье", "ателье вечерние платья", "нарядное платье подгонка"] },
    de: { t: "Abendkleid & Festmode ändern in Antalya | Terzi Can", d: "Abendkleid, Festmode und Kleidung für besondere Anlässe in Antalya ändern: enger, weiter, kürzen, Träger und Reißverschluss. Abholung per WhatsApp. ☎ +90 531 898 64 18", kw: ["Abendkleid ändern", "Abendkleid enger machen", "Festliches Kleid ändern", "Cocktailkleid ändern"] },
  },
  "pantolon": {
    en: { t: "Trouser Alteration: Hem, Waist, Taper | Terzi Can", d: "Trouser alteration in Antalya: hemming, waist taking-in or letting-out, tapering legs, zipper replacement. Ready the next day, urgent 1–2 hours. ☎ +90 531 898 64 18", kw: ["trouser alteration", "pants alteration", "taper trousers", "take in trousers"] },
    ru: { t: "Подгонка брюк: подшив, талия, сужение | Terzi Can", d: "Подгонка брюк в Анталье: подшив, ушивание и расширение в поясе, сужение штанин, замена молнии. На следующий день, срочно — 1–2 часа. ☎ +90 531 898 64 18", kw: ["подгонка брюк", "ушить брюки", "сузить брюки", "ателье брюки"] },
    de: { t: "Hose ändern: kürzen, Bund, schmaler | Terzi Can", d: "Hosen ändern in Antalya: kürzen, Bund enger oder weiter machen, Beine schmaler machen, Reißverschluss wechseln. Am nächsten Tag fertig, eilig 1–2 Stunden. ☎ +90 531 898 64 18", kw: ["Hose ändern", "Hose enger machen", "Hose schmaler machen", "Anzughose ändern"] },
  },
  "kol": {
    en: { t: "Sleeve Shortening: Jacket, Coat, Shirt | Terzi Can", d: "Sleeve shortening in Antalya for jackets, coats, shirts, sweaters and dresses. Ready the next day, urgent 1–2 hours. Pick-up arranged on WhatsApp. ☎ +90 531 898 64 18", kw: ["sleeve shortening", "shorten sleeves", "jacket sleeve shortening", "shirt sleeve shortening"] },
    ru: { t: "Укорочение рукавов: пиджак, куртка, рубашка | Terzi Can", d: "Укорочение рукавов в Анталье: пиджаки, куртки, пальто, рубашки, свитеры и платья. На следующий день, срочно — 1–2 часа. ☎ +90 531 898 64 18", kw: ["укорочение рукавов", "укоротить рукава", "укоротить рукава пиджака", "укоротить рукава рубашки"] },
    de: { t: "Ärmel kürzen: Sakko, Mantel, Hemd | Terzi Can", d: "Ärmel kürzen in Antalya bei Sakkos, Jacken, Mänteln, Hemden, Pullovern und Kleidern. Am nächsten Tag fertig, eilig 1–2 Stunden. ☎ +90 531 898 64 18", kw: ["Ärmel kürzen", "Sakko Ärmel kürzen", "Mantel Ärmel kürzen", "Hemd Ärmel kürzen"] },
  },
  "takim": {
    en: { t: "Suit & Jacket Alteration: Sleeves, Waist | Terzi Can", d: "Suits and jackets altered in Antalya, men's and women's: sleeves shortened, waist taken in, shoulders corrected. ☎ +90 531 898 64 18", kw: ["suit alteration", "jacket alteration", "shorten jacket sleeves", "blazer alteration Antalya"] },
    ru: { t: "Подгонка костюма и пиджака: рукава, талия | Terzi Can", d: "Подгонка костюмов и пиджаков в Анталье, мужских и женских: укоротить рукава, ушить талию, поправить плечи. С примеркой. ☎ +90 531 898 64 18", kw: ["подгонка костюма", "подгонка пиджака", "укоротить рукава пиджака"] },
    de: { t: "Anzug & Sakko ändern: Ärmel, Taille, Schulter | Terzi Can", d: "Anzüge und Sakkos in Antalya für Herren und Damen: Ärmel kürzen, Taille enger machen, Schultern korrigieren. ☎ +90 531 898 64 18", kw: ["Anzug ändern", "Sakko ändern", "Ärmel kürzen Sakko"] },
  },
  "mont": {
    en: { t: "Coat & Jacket Shortening, Taking In, Zipper Fix | Terzi Can", d: "Coat and jacket alteration in Antalya: shorten, take in, adjust sleeves and replace zippers. Hotel and home pick-up on WhatsApp. ☎ +90 531 898 64 18", kw: ["coat alteration", "shorten coat", "jacket zipper replacement Antalya"] },
    ru: { t: "Куртка и пальто: укоротить, ушить, молния | Terzi Can", d: "Куртки и пальто в Анталье: укоротить, ушить, подогнать рукава, заменить молнию. Забор из отеля и с дома бесплатно. ☎ +90 531 898 64 18", kw: ["подгонка пальто", "укоротить куртку", "замена молнии на куртке Анталья"] },
    de: { t: "Jacke & Mantel kürzen, Reißverschluss wechseln | Terzi Can", d: "Jacken und Mäntel in Antalya kürzen, enger machen, Ärmel anpassen, Reißverschluss wechseln. ☎ +90 531 898 64 18", kw: ["Mantel ändern", "Jacke kürzen", "Reißverschluss Jacke wechseln Antalya"] },
  },
  "gomlek": {
    en: { t: "Shirt Alteration: Take In, Shorten Sleeves | Terzi Can", d: "Shirts altered in Antalya for men and women: sides taken in, sleeves and length shortened, collar adjusted. ☎ +90 531 898 64 18", kw: ["shirt alteration", "take in shirt", "shorten shirt sleeves Antalya"] },
    ru: { t: "Подгонка рубашки: ушить, укоротить рукава | Terzi Can", d: "Подгонка рубашек в Анталье для мужчин и женщин: ушить по бокам, укоротить рукава и длину, поправить воротник. ☎ +90 531 898 64 18", kw: ["ушить рубашку", "укоротить рукава рубашки", "подгонка рубашки Анталья"] },
    de: { t: "Hemd ändern: enger machen, Ärmel kürzen | Terzi Can", d: "Hemden in Antalya für Herren und Damen ändern: seitlich enger, Ärmel und Länge kürzen, Kragen anpassen. ☎ +90 531 898 64 18", kw: ["Hemd enger machen", "Hemd Ärmel kürzen", "Hemd ändern Antalya"] },
  },
  "deri": {
    en: { t: "Leather Jacket & Trouser Repair in Antalya | Terzi Can", d: "Leather jackets and trousers repaired in Antalya: taking in, zipper replacement, lining repair. Send a photo for a quote. ☎ +90 531 898 64 18", kw: ["leather jacket repair", "leather jacket alteration Antalya", "leather trousers tailor"] },
    ru: { t: "Ремонт кожаной куртки и брюк в Анталье | Terzi Can", d: "Ремонт кожаных курток и брюк в Анталье: ушить, заменить молнию, починить подкладку. Фото в WhatsApp — назовём цену. ☎ +90 531 898 64 18", kw: ["ремонт кожаной куртки", "ушить кожаную куртку", "кожаные брюки ателье Анталья"] },
    de: { t: "Lederjacke & Lederhose reparieren in Antalya | Terzi Can", d: "Lederjacken und Lederhosen in Antalya reparieren: enger machen, Reißverschluss wechseln, Futter richten. Foto für Preisangebot. ☎ +90 531 898 64 18", kw: ["Lederjacke reparieren", "Lederjacke ändern Antalya", "Lederhose Schneider"] },
  },
  "tisort": {
    en: { t: "T-Shirt & Shorts Alteration, Hemming Antalya | Terzi Can", d: "T-shirt and shorts alteration in Antalya: shorten, take in, sleeve length, waistband fit. Send a photo on WhatsApp for the price. ☎ +90 531 898 64 18", kw: ["shorts hemming", "t-shirt alteration", "take in shorts Antalya"] },
    ru: { t: "Футболка и шорты: ушить, подшить, Анталья | Terzi Can", d: "Футболки и шорты в Анталье: укоротить, ушить, изменить длину рукава и посадку на поясе. Фото в WhatsApp — назовём цену. ☎ +90 531 898 64 18", kw: ["подшить шорты", "ушить футболку", "подгонка шорт Анталья"] },
    de: { t: "T-Shirt & Shorts ändern, kürzen in Antalya | Terzi Can", d: "T-Shirts und Shorts ändern in Antalya: kürzen, enger machen, Ärmellänge, Bund anpassen. Foto per WhatsApp, wir nennen den Preis. ☎ +90 531 898 64 18", kw: ["Shorts kürzen", "T-Shirt enger machen", "Shorts ändern Antalya"] },
  },
  "beden": {
    en: { t: "Resize Clothes to Your Measurements, Antalya | Terzi Can", d: "Weight changed? We resize clothes to your measurements in Antalya, taking in or letting out, with a fitting. ☎ +90 531 898 64 18", kw: ["resize clothes", "clothes too big alteration", "tailor to measurements Antalya"] },
    ru: { t: "Подгонка одежды по вашим меркам, Анталья | Terzi Can", d: "Изменился вес? Подгоним одежду по вашим меркам в Анталье: ушьём или расширим, с примеркой. ☎ +90 531 898 64 18", kw: ["подгонка одежды по меркам", "уменьшить размер одежды", "расширить одежду Анталья"] },
    de: { t: "Kleidung auf Ihre Maße ändern lassen, Antalya | Terzi Can", d: "Gewicht verändert? Wir passen Kleidung in Antalya an Ihre Maße an: enger oder weiter, mit Anprobe. ☎ +90 531 898 64 18", kw: ["Kleidung auf Maß ändern", "Kleidung enger machen lassen", "Kleidung weiter machen Antalya"] },
  },
  "etek": {
    en: { t: "Skirt Hemming & Alteration Antalya | Terzi Can", d: "Skirt shortening, taking in and zipper repair in Antalya. Free pick-up. ☎ +90 531 898 64 18", kw: ["skirt hemming Antalya", "shorten skirt", "skirt alteration", "take in skirt"] },
    ru: { t: "Подшив и ушивание юбок в Анталье | Terzi Can", d: "Укорачивание, ушивание и ремонт молнии юбок в Анталье. Бесплатный забор. ☎ +90 531 898 64 18", kw: ["подшив юбки Анталья", "укоротить юбку", "ушить юбку", "переделка юбок"] },
    de: { t: "Rock kürzen & ändern in Antalya | Terzi Can", d: "Röcke kürzen und enger machen in Antalya. Gratis-Abholung. ☎ +90 531 898 64 18", kw: ["Rock kürzen Antalya", "Rock ändern", "Rock enger machen", "Schneider Rock"] },
  },
  "gece-kiyafeti": {
    en: { t: "Evening Wear Alteration Antalya | Terzi Can", d: "Evening dress alteration in Antalya: taking in, hem, straps. Free pick-up. ☎ +90 531 898 64 18", kw: ["evening dress alteration Antalya", "formal wear tailor", "evening gown hemming", "night outfit alteration"] },
    ru: { t: "Переделка вечерних нарядов в Анталье | Terzi Can", d: "Переделка вечерних платьев в Анталье: ушивание, длина. Бесплатный забор. ☎ +90 531 898 64 18", kw: ["переделка вечернего платья Анталья", "подгонка вечернего наряда", "подшить вечернее платье"] },
    de: { t: "Abendgarderobe ändern in Antalya | Terzi Can", d: "Abendkleider ändern in Antalya: enger machen, Saum. Gratis-Abholung. ☎ +90 531 898 64 18", kw: ["Abendkleid ändern Antalya", "festliche Kleidung Schneider", "Abendkleid kürzen"] },
  },
  "kiyafet-tamiri": {
    en: { t: "Clothing Repair Antalya, Tears & Seams | Terzi Can", d: "Clothing repair in Antalya: seams, tears, buttons, zippers. Free pick-up. ☎ +90 531 898 64 18", kw: ["clothing repair Antalya", "mend clothes", "fix torn clothes", "repair seams"] },
    ru: { t: "Ремонт одежды в Анталье: швы, дыры | Terzi Can", d: "Ремонт одежды в Анталье: швы, дыры, пуговицы, молнии. Бесплатный забор. ☎ +90 531 898 64 18", kw: ["ремонт одежды Анталья", "зашить одежду", "ремонт швов", "починить одежду"] },
    de: { t: "Kleidung reparieren in Antalya, Risse & Nähte | Terzi Can", d: "Kleidung reparieren in Antalya: Nähte, Risse, Knöpfe, Reißverschlüsse. Gratis-Abholung. ☎ +90 531 898 64 18", kw: ["Kleidung reparieren Antalya", "Risse nähen lassen", "Nähte reparieren", "Schneider Reparatur"] },
  },
  "ozel-dikim": {
    en: { t: "Custom Tailoring Antalya, Made to Measure | Terzi Can", d: "Made-to-measure in Antalya: trousers, skirts, dresses, groom suits. Free pick-up. ☎ +90 531 898 64 18", kw: ["custom tailoring Antalya", "made to measure Antalya", "bespoke clothing", "groom suit tailor Antalya"] },
    ru: { t: "Индивидуальный пошив в Анталье | Terzi Can", d: "Пошив по меркам в Анталье: брюки, юбки, платья, костюмы жениха. Бесплатный забор. ☎ +90 531 898 64 18", kw: ["индивидуальный пошив Анталья", "пошив по меркам", "пошив на заказ", "костюм жениха Анталья"] },
    de: { t: "Maßanfertigung in Antalya | Terzi Can", d: "Maßschneiderei in Antalya: Hosen, Röcke, Kleider, Bräutigamanzüge. Gratis-Abholung. ☎ +90 531 898 64 18", kw: ["Maßanfertigung Antalya", "Maßschneiderei", "Anzug nach Maß", "Schneider Antalya"] },
  },
};

const KW_PLACE: Record<L3, string[]> = {
  en: ['dress repair', 'trouser hemming', 'zipper replacement', 'custom dressmaking linen cotton', 'men and women tailor'],
  ru: ['ремонт платьев', 'подшив брюк', 'замена молнии', 'пошив на заказ лён хлопок', 'портной мужская и женская одежда'],
  de: ['Kleid reparieren', 'Hose kürzen', 'Reißverschluss wechseln', 'Maßanfertigung Leinen Baumwolle', 'Schneider Damen Herren'],
};

const PH = ' ☎ +90 531 898 64 18';
const splitPhone = (d: string) => (d.endsWith(PH) ? [d.slice(0, -PH.length), PH] : [d, '']);
const OPEN_NEAR: Record<L3, string> = {
  en: 'Near you, open daily 08:00–23:00.',
  ru: 'Рядом, ежедневно 08:00–23:00.',
  de: 'In der Nähe, täglich 08:00–23:00 geöffnet.',
};
const NEAR_KW: Record<L3, string> = { en: 'tailor near me', ru: 'портной рядом', de: 'Schneider in der Nähe' };

/** Hizmet başına başlangıç fiyatı (EUR); null = fotoğrafla fiyat. Yalnızca EN/RU/DE sayfalarda gösterilir. */
export const EUR_FROM: Record<string, number | null> = {
  paca: 10, kot: 10, bel: 10, pantolon: 10, kol: 10, takim: 10, 'elbise-tamir': 10, gomlek: 10, tisort: 10, etek: 10,
  'kiyafet-tamiri': 10, beden: 10, fermuar: 15, mont: 20, deri: 30,
};
export const eurFromText = (lang: string, id: string): string => {
  const n = EUR_FROM[id];
  if (!n) return '';
  return lang === 'en' ? `From €${n}` : lang === 'de' ? `Ab ${n} €` : lang === 'ru' ? `От ${n} €` : '';
};
const PHOTO: Record<L3, string> = { en: 'Price by photo on WhatsApp', ru: 'Цена по фото в WhatsApp', de: 'Preis per Foto über WhatsApp' };
const OPEN_SHORT: Record<L3, string> = { en: 'open daily 08:00–23:00', ru: 'ежедневно 08:00–23:00', de: 'täglich 08:00–23:00' };

/** Yakın bölge sayfası için elle yazılmış EN/RU/DE meta; kayıt yoksa undefined. */
export function fgNearDistrict(lang: string, slug: string, name: string): FgMeta | undefined {
  const x = FG_DISTRICT[slug]?.[lang as L3];
  if (!x) return undefined;
  const l = lang as L3;
  const [body, ph] = splitPhone(x.d);
  return {
    title: x.t,
    desc: `${body} ${OPEN_NEAR[l]}${ph}`,
    kw: Array.from(new Set([`${NEAR_KW[l]} ${name}`, ...x.kw, ...KW_PLACE[l].map((k) => `${k} ${name}`)])),
  };
}

/** Hizmet sayfası için elle yazılmış EN/RU/DE meta (başlangıç fiyatı dahil); kayıt yoksa undefined. */
export function fgServiceMeta(lang: string, id: string): FgMeta | undefined {
  const x = FG_SERVICE[id]?.[lang as L3];
  if (!x) return undefined;
  const l = lang as L3;
  const city = { en: ['Antalya', 'Konyaaltı'], ru: ['Анталья', 'Коньяалты'], de: ['Antalya', 'Konyaaltı'] }[l];
  const [body, ph] = splitPhone(x.d);
  const price = eurFromText(lang, id) || PHOTO[l];
  return {
    title: x.t,
    desc: `${body} ${price} · ${OPEN_SHORT[l]}.${ph}`,
    kw: Array.from(new Set([...x.kw.flatMap((k) => [k, `${k} ${city[0]}`, `${k} ${city[1]}`]), `${NEAR_KW[l]} ${city[0]}`])),
  };
}
