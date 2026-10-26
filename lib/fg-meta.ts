// ============================================================
// EN / RU / DE sayfalar için bölge ve hizmet başına ELLE yazılmış, birbirinden FARKLI başlık / açıklama / anahtar kelime.
// Her yakın bölge ayrı bir ihtiyaca odaklanır (tamir-tadilat, abiye/gelinlik, takım elbise, yırtık onarımı, keten-pamuk özel dikim,
// kot/paça, mont/deri...). Hem tamir-tadilat hem özel dikim (keten, pamuk; bay, bayan) kapsanır.
// Yalnızca doğrulanmış bilgi: paça ₺200'den, fermuar ₺300'den, abiye ve gelinlik ₺800'den, elbise dikimi ₺800'den, ücretsiz servis (yakın bölgeler).
// Bölgede kayıt yoksa sayfa lib/seo-angles.ts şablonuna döner.
// ============================================================

export type FgMeta = { title: string; desc: string; kw: string[] };
type L3 = 'en' | 'ru' | 'de';
type Row = Record<L3, { t: string; d: string; kw: string[] }>;

const FG_DISTRICT: Record<string, Row> = {
  "konyaalti": {
    en: { t: "Konyaaltı Tailor: Hurma, Liman, Uncalı Beach | SwapHubs", d: "Konyaaltı tailor covering Hurma, Liman, Uncalı, Sarısu and Gürsu: dress repair, alterations, custom linen outfits. Free pick-up. ☎ +90 531 898 64 18", kw: ["tailor Konyaaltı", "tailor Konyaaltı beach", "tailor Hurma Konyaaltı", "tailor Liman Konyaaltı", "tailor Uncalı", "tailor Sarısu", "tailor Gürsu", "dress repair Konyaaltı", "custom linen sewing Konyaaltı"] },
    ru: { t: "Портной Коньяалты: Хурма, Лиман, Унджалы | SwapHubs", d: "Портной в Коньяалты, районы Хурма, Лиман, Унджалы, Сарысу, Гюрсу: ремонт платьев, подгонка, пошив из льна. Забор бесплатно. ☎ +90 531 898 64 18", kw: ["портной Коньяалты", "портной пляж Коньяалты", "портной Хурма Коньяалты", "портной Лиман Коньяалты", "ремонт платьев Коньяалты", "пошив из льна Коньяалты"] },
    de: { t: "Schneider Konyaaltı: Hurma, Liman, Uncalı | SwapHubs", d: "Schneider in Konyaaltı für Hurma, Liman, Uncalı, Sarısu, Gürsu: Kleider ändern und reparieren, Leinen nach Maß. Abholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Konyaaltı", "Schneider Konyaaltı Strand", "Schneider Hurma Konyaaltı", "Schneider Liman Konyaaltı", "Kleid ändern Konyaaltı", "Leinen nach Maß Konyaaltı"] },
  },
  "muratpasa": {
    en: { t: "Muratpaşa Tailor: Evening & Wedding Dresses | SwapHubs", d: "Evening or wedding dress needs altering in Muratpaşa? From ₺800, with a fitting. Collection from hotel or home arranged on WhatsApp. ☎ +90 531 898 64 18", kw: ["tailor Muratpaşa", "evening dress alteration Muratpaşa", "wedding dress alteration Antalya", "dress tailor Muratpaşa"] },
    ru: { t: "Портной Муратпаша: вечерние и свадебные платья | SwapHubs", d: "Подгонка вечерних и свадебных платьев в Муратпаше: вечернее и свадебное от ₺800. С примеркой, забор — по договорённости в WhatsApp. ☎ +90 531 898 64 18", kw: ["портной Муратпаша", "подгонка вечернего платья Муратпаша", "подгонка свадебного платья Анталья"] },
    de: { t: "Schneider Muratpaşa: Abend- & Brautkleid ändern | SwapHubs", d: "Abend- oder Brautkleid in Muratpaşa ändern lassen: ab ₺800, mit Anprobe. Abholung per WhatsApp abstimmen. ☎ +90 531 898 64 18", kw: ["Schneider Muratpaşa", "Abendkleid ändern Muratpaşa", "Brautkleid ändern Antalya"] },
  },
  "meltem": {
    en: { t: "Meltem Tailor: Suit, Jacket & Trouser Alteration | SwapHubs", d: "Suits, jackets and trousers altered in Meltem for men and women: sleeves, hems, waist, shoulders. Pick-up and delivery are free. ☎ +90 531 898 64 18", kw: ["tailor Meltem", "suit alteration Meltem", "jacket alteration Antalya", "trouser hemming Meltem"] },
    ru: { t: "Портной Мельтем: костюм, пиджак, брюки | SwapHubs", d: "Подгонка костюмов, пиджаков и брюк в Мельтеме, мужских и женских: рукава, длина, талия, плечи. Примерка на вас, забор бесплатно. ☎ +90 531 898 64 18", kw: ["портной Мельтем", "подгонка костюма Мельтем", "подгонка пиджака Анталья", "подшив брюк Мельтем"] },
    de: { t: "Schneider Meltem: Anzug, Sakko, Hose ändern | SwapHubs", d: "Anzüge, Sakkos und Hosen in Meltem ändern, für Herren und Damen: Ärmel, Saum, Taille, Schultern. Abholung und Lieferung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Meltem", "Anzug ändern Meltem", "Sakko ändern Antalya", "Hose kürzen Meltem"] },
  },
  "fener": {
    en: { t: "Fener Tailor: Torn Clothes & Seam Repair | SwapHubs", d: "Torn clothes, holes and open seams mended in Fener with matching thread, usually ready the next day, for men and women. ☎ +90 531 898 64 18", kw: ["tailor Fener", "torn clothes repair Fener", "fix hole in clothes Antalya", "sew open seam Fener"] },
    ru: { t: "Портной Фенер: ремонт порванной одежды, швы | SwapHubs", d: "Зашиваем порванную одежду, дырки и распоровшиеся швы в Фенере. Нитки подбираем под ткань, обычно готово на следующий день. ☎ +90 531 898 64 18", kw: ["портной Фенер", "ремонт порванной одежды Фенер", "зашить дырку Анталья", "зашить шов Фенер"] },
    de: { t: "Schneider Fener: Riss & Loch in Kleidung flicken | SwapHubs", d: "Risse, Löcher und offene Nähte in Fener flicken, für Damen und Herren. Passendes Garn, meist am nächsten Tag fertig. ☎ +90 531 898 64 18", kw: ["Schneider Fener", "Riss reparieren Fener", "Loch flicken Antalya", "Naht nähen Fener"] },
  },
  "sirinyali": {
    en: { t: "Şirinyalı Tailor: Made-to-Measure Linen Dresses | SwapHubs", d: "Linen and cotton dresses, shirts and outfits made to measure in Şirinyalı from ₺800, for women and men. Pick-up arranged on WhatsApp. ☎ +90 531 898 64 18", kw: ["tailor Şirinyalı", "made to measure dress Antalya", "linen dress tailor Şirinyalı", "custom clothing men women Antalya"] },
    ru: { t: "Ширинъялы: пошив льняных платьев по меркам | SwapHubs", d: "Льняные и хлопковые платья, рубашки и наряды на заказ в Ширинъялы от ₺800, для женщин и мужчин, по вашим меркам. ☎ +90 531 898 64 18", kw: ["пошив платья по меркам Ширинъялы", "льняное платье на заказ Анталья", "пошив одежды на заказ Анталья"] },
    de: { t: "Şirinyalı: Leinenkleider nach Maß nähen lassen | SwapHubs", d: "Kleider, Hemden und Outfits aus Leinen und Baumwolle nach Maß in Şirinyalı ab ₺800, für Damen und Herren. Abholung per WhatsApp. ☎ +90 531 898 64 18", kw: ["Kleid nach Maß Şirinyalı", "Leinenkleid nähen lassen Antalya", "Maßschneiderei Antalya Damen Herren"] },
  },
  "arapsuyu": {
    en: { t: "Arapsuyu Tailor: Men's & Women's Repairs, Jeans | SwapHubs", d: "Men's and women's clothing repairs in Arapsuyu: jeans hemming, trouser taking in, dress repair, open seams. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Arapsuyu", "jeans hemming Arapsuyu", "clothing repair Arapsuyu", "dress alteration Arapsuyu"] },
    ru: { t: "Портной Арапсую: ремонт мужской и женской одежды | SwapHubs", d: "Мужская и женская одежда в Арапсую: подшив джинсов, ушивание брюк, ремонт платьев, швы. Забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Арапсую", "подшить джинсы Арапсую", "ремонт одежды Арапсую"] },
    de: { t: "Arapsuyu: Herren- und Damenkleidung ändern | SwapHubs", d: "Herren- und Damenkleidung in Arapsuyu: Jeans kürzen, Hose enger machen, Kleid reparieren, Nähte schließen. Abholung und Lieferung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Arapsuyu", "Jeans kürzen Arapsuyu", "Kleidung reparieren Arapsuyu"] },
  },
  "toros": {
    en: { t: "Toros Tailor Near Me: Same-Day Trouser Hemming | SwapHubs", d: "Trousers, skirts and jeans hemmed near Toros from ₺200, often the same day. Pick-up arranged on WhatsApp. ☎ +90 531 898 64 18", kw: ["tailor near me Toros", "trouser hemming near me", "same day hemming Antalya", "tailor open now Antalya"] },
    ru: { t: "Портной рядом, Торос: подшив брюк в тот же день | SwapHubs", d: "Портной рядом, район Торос: подшив брюк, юбок и джинсов от ₺200, обычно в тот же день. Забор — по договорённости в WhatsApp. ☎ +90 531 898 64 18", kw: ["портной рядом Торос", "подшить брюки рядом", "подшив в тот же день Анталья"] },
    de: { t: "Toros: Schneider in der Nähe, Hose am selben Tag | SwapHubs", d: "Schneider nahe Toros: Hosen, Röcke und Jeans kürzen ab ₺200, oft am selben Tag. Abholung per WhatsApp. ☎ +90 531 898 64 18", kw: ["Schneider in der Nähe Toros", "Hose kürzen in der Nähe", "Hose kürzen am selben Tag Antalya"] },
  },
  "ogretmenevleri": {
    en: { t: "Öğretmenevleri Tailor: Coat, Leather, Zipper Fix | SwapHubs", d: "Coat, jacket and leather jacket alterations in Öğretmenevleri: shorten, take in, replace zippers from ₺300. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Öğretmenevleri", "coat alteration Antalya", "leather jacket repair Antalya", "zipper replacement Öğretmenevleri"] },
    ru: { t: "Огретменевлери: пальто, кожа, молнии, ремонт | SwapHubs", d: "Пальто, куртки и кожаные куртки в Огретменевлери: укоротить, ушить, заменить молнию от ₺300. Забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Огретменевлери", "подгонка пальто Анталья", "ремонт кожаной куртки Анталья", "замена молнии Огретменевлери"] },
    de: { t: "Öğretmenevleri: Mantel, Leder, Reißverschluss | SwapHubs", d: "Mäntel, Jacken und Lederjacken in Öğretmenevleri kürzen, enger machen, Reißverschluss ab ₺300. Abholung und Lieferung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Öğretmenevleri", "Mantel ändern Antalya", "Lederjacke reparieren Antalya", "Reißverschluss wechseln Öğretmenevleri"] },
  },
  "side": {
    en: { t: "Side Tailor: Hotel Pick-up, Clothing Repairs | SwapHubs", d: "Hotel guest in Side? We collect your clothes for alterations, repairs or custom linen and cotton pieces, for men and women. ☎ +90 531 898 64 18", kw: ["tailor Side Antalya", "hotel tailor Side", "custom linen clothing Side", "clothing alterations Side Turkey"] },
    ru: { t: "Портной Сиде: из отеля, лён и хлопок на заказ | SwapHubs", d: "Живёте в отеле в Сиде? Заберём вещи на подгонку, ремонт или пошив из льна и хлопка, мужское и женское. ☎ +90 531 898 64 18", kw: ["портной Сиде", "портной в отеле Сиде", "льняная одежда на заказ Сиде", "ремонт одежды Сиде"] },
    de: { t: "Schneider Side: Hotelabholung, Leinen nach Maß | SwapHubs", d: "Im Hotel in Side? Wir holen Ihre Kleidung für Änderungen, Reparaturen oder Leinen und Baumwolle nach Maß ab. ☎ +90 531 898 64 18", kw: ["Schneider Side Antalya", "Hotelschneider Side", "Leinenkleidung nach Maß Side", "Kleidung ändern Side"] },
  },
  "aksu": {
    en: { t: "Aksu Tailor: Custom Sewing & Dress Alteration | SwapHubs", d: "Custom sewing for men and women in Aksu, plus dress repairs, alterations and hemming from ₺200. Hotel and home pick-up via WhatsApp. ☎ +90 531 898 64 18", kw: ["tailor Aksu Antalya", "custom sewing Aksu", "dress alteration Aksu", "trouser hemming Aksu"] },
    ru: { t: "Портной Аксу: пошив на заказ и подгонка платьев | SwapHubs", d: "Пошив на заказ для мужчин и женщин в Аксу, ремонт платьев, подгонка, подшив брюк от ₺200. Забор из отелей и домов — в WhatsApp. ☎ +90 531 898 64 18", kw: ["портной Аксу", "пошив на заказ Аксу", "подгонка платья Аксу", "подшив брюк Аксу"] },
    de: { t: "Schneider Aksu: Maßanfertigung & Kleider ändern | SwapHubs", d: "Maßanfertigung für Damen und Herren in Aksu, dazu Kleider reparieren und ändern, Hosen kürzen ab ₺200. Abholung per WhatsApp. ☎ +90 531 898 64 18", kw: ["Schneider Aksu Antalya", "Maßanfertigung Aksu", "Kleid ändern Aksu", "Hose kürzen Aksu"] },
  },
  "lara": {
    en: { t: "Lara Tailor: Evening Dress & Hemming Fixes | SwapHubs", d: "Staying in Lara? Evening dress fitting, hemming, quick repairs and custom linen sewing for men and women. Hotel pick-up on WhatsApp. ☎ +90 531 898 64 18", kw: ["tailor Lara", "tailor Lara Antalya", "evening dress alteration Lara", "hotel tailor Lara", "custom linen dress Lara", "clothing repair Lara", "hemming Lara hotel"] },
    ru: { t: "Портной Лара: вечернее платье и подшив | SwapHubs", d: "Отдыхаете в Ларе? Подгонка вечерних платьев, подшив, быстрый ремонт и пошив из льна для мужчин и женщин. Забор из отеля — через WhatsApp. ☎ +90 531 898 64 18", kw: ["портной Лара", "ателье Лара Анталья", "подгонка вечернего платья Лара", "портной в отель Лара", "пошив льняного платья Лара", "ремонт одежды Лара"] },
    de: { t: "Schneider Lara: Abendkleid & Saum ändern | SwapHubs", d: "Urlaub in Lara? Abendkleid anpassen, Saum kürzen, schnelle Reparaturen und Leinen nach Maß. Hotelabholung per WhatsApp. ☎ +90 531 898 64 18", kw: ["Schneider Lara", "Änderungsschneiderei Lara", "Abendkleid ändern Lara", "Hotel Schneider Lara", "Leinenkleid nach Maß Lara", "Kleidung reparieren Lara"] },
  },
  "kundu": {
    en: { t: "Kundu Tailor: Zipper & Torn Clothes Repair | SwapHubs", d: "Broken zipper or torn seam in Kundu? Fast repairs and alterations, plus custom cotton and linen outfits. Hotel pick-up on WhatsApp. ☎ +90 531 898 64 18", kw: ["tailor Kundu", "zipper repair Kundu", "torn clothes repair Kundu", "hotel tailor Kundu", "clothing alterations Kundu", "custom cotton outfit Kundu"] },
    ru: { t: "Портной Кунду: молния и порванная одежда | SwapHubs", d: "Сломалась молния или порвался шов в Кунду? Быстрый ремонт и подгонка, пошив из хлопка и льна. Забор из отеля — через WhatsApp. ☎ +90 531 898 64 18", kw: ["портной Кунду", "замена молнии Кунду", "ремонт порванной одежды Кунду", "портной в отель Кунду", "подгонка одежды Кунду"] },
    de: { t: "Schneider Kundu: Reißverschluss & Risse flicken | SwapHubs", d: "Reißverschluss defekt oder Naht offen in Kundu? Schnelle Reparaturen und Outfits nach Maß aus Leinen. Abholung per WhatsApp. ☎ +90 531 898 64 18", kw: ["Schneider Kundu", "Reißverschluss reparieren Kundu", "Riss in Kleidung flicken Kundu", "Hotel Schneider Kundu", "Kleidung ändern Kundu"] },
  },
  "belek": {
    en: { t: "Belek Tailor: Custom Linen Shirts & Suits | SwapHubs", d: "Made-to-measure linen and cotton shirts, trousers, suits and dresses in Belek, plus alterations and repairs for guests and locals. ☎ +90 531 898 64 18", kw: ["tailor Belek", "custom linen shirt Belek", "made to measure suit Belek", "linen dress tailor Belek", "hotel tailor Belek", "clothing alterations Belek"] },
    ru: { t: "Портной Белек: льняные рубашки и костюмы | SwapHubs", d: "Рубашки, брюки, костюмы и платья из льна и хлопка на заказ в Белеке, мужские и женские, плюс подгонка и ремонт. ☎ +90 531 898 64 18", kw: ["портной Белек", "льняная рубашка на заказ Белек", "костюм по меркам Белек", "пошив платья Белек", "портной в отель Белек", "подгонка одежды Белек"] },
    de: { t: "Schneider Belek: Leinenhemd & Anzug nach Maß | SwapHubs", d: "Hemden, Hosen, Anzüge und Kleider aus Leinen und Baumwolle nach Maß in Belek, dazu Änderungen und Reparaturen. ☎ +90 531 898 64 18", kw: ["Schneider Belek", "Leinenhemd nach Maß Belek", "Maßanzug Belek", "Leinenkleid Belek", "Hotel Schneider Belek", "Kleidung ändern Belek"] },
  },
  "goynuk": {
    en: { t: "Göynük Tailor: Kids & Family Linen Outfits | SwapHubs", d: "Linen and cotton outfits made in Göynük for kids, women and men, with matching family sets, plus hemming and repairs. ☎ +90 531 898 64 18", kw: ["tailor Göynük", "kids linen clothing Göynük", "custom family outfits Göynük", "clothing repair Göynük", "hotel tailor Göynük", "hemming Göynük"] },
    ru: { t: "Портной Гёйнюк: льняная одежда для всей семьи | SwapHubs", d: "Льняные и хлопковые наряды в Гёйнюке для детей, женщин и мужчин, семейные комплекты, плюс подшив и ремонт. ☎ +90 531 898 64 18", kw: ["портной Гёйнюк", "детская льняная одежда Гёйнюк", "семейные образы на заказ Гёйнюк", "ремонт одежды Гёйнюк", "подшив Гёйнюк"] },
    de: { t: "Schneider Göynük: Leinen für Kinder & Familie | SwapHubs", d: "Leinen- und Baumwollmode nach Maß in Göynük für Kinder, Damen und Herren, Partnerlook möglich, dazu Saum und Reparaturen. ☎ +90 531 898 64 18", kw: ["Schneider Göynük", "Kinder Leinenkleidung Göynük", "Partnerlook Familie Göynük", "Kleidung reparieren Göynük", "Saum kürzen Göynük"] },
  },
  "beldibi": {
    en: { t: "Beldibi Tailor: Beach Linen Dresses & Repairs | SwapHubs", d: "Made-to-measure beach linen dresses and shirts in Beldibi, plus hemming, zipper swaps and mending of torn clothes. ☎ +90 531 898 64 18", kw: ["tailor Beldibi", "beach linen dress Beldibi", "custom linen clothing Beldibi", "zipper replacement Beldibi", "torn clothes repair Beldibi", "hotel tailor Beldibi"] },
    ru: { t: "Портной Бельдиби: пляжные платья и ремонт | SwapHubs", d: "Пляжные льняные платья и рубашки по меркам в Бельдиби, плюс подшив, замена молнии и ремонт порванных вещей. ☎ +90 531 898 64 18", kw: ["портной Бельдиби", "пляжное платье на заказ Бельдиби", "льняная одежда на заказ Бельдиби", "замена молнии Бельдиби", "ремонт одежды Бельдиби"] },
    de: { t: "Schneider Beldibi: Strandkleider & Reparaturen | SwapHubs", d: "Strandkleider und Hemden aus Leinen nach Maß in Beldibi, dazu Saum, Reißverschluss und Risse flicken. ☎ +90 531 898 64 18", kw: ["Schneider Beldibi", "Strandkleid nach Maß Beldibi", "Leinenkleidung Beldibi", "Reißverschluss wechseln Beldibi", "Kleidung reparieren Beldibi"] },
  },
  "hurma": {
    en: { t: "Hurma Tailor Near Me: Photo, Quote, Pick-up | SwapHubs", d: "Need a tailor in Hurma? Send a photo of the garment on WhatsApp and get a price: hemming from ₺200, zippers from ₺300. Free pick-up. ☎ +90 531 898 64 18", kw: ["tailor Hurma", "Hurma clothing alterations", "Hurma hemming Antalya"] },
    ru: { t: "Портной в Хурме: пришлите фото — назовём цену | SwapHubs", d: "Нужен портной в Хурме? Пришлите фото вещи в WhatsApp и узнайте цену: подшив от ₺200, молния от ₺300. Забор бесплатно. ☎ +90 531 898 64 18", kw: ["портной Хурма", "ремонт одежды Хурма", "подшив брюк Хурма"] },
    de: { t: "Schneider Hurma: Foto senden, Preis erfahren | SwapHubs", d: "Schneider in Hurma gesucht? Foto per WhatsApp senden und Preis erfahren: Kürzen ab ₺200, Reißverschluss ab ₺300. Abholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Hurma", "Kleidung ändern Hurma", "Hose kürzen Hurma"] },
  },
  "liman": {
    en: { t: "Liman Tailor: Alterations Picked Up From Home | SwapHubs", d: "Alterations and repairs in Liman: trousers, dresses, jackets, zippers from ₺300. We collect from your door and deliver back, free. ☎ +90 531 898 64 18", kw: ["tailor Liman", "Liman clothing alterations", "Liman hemming Antalya"] },
    ru: { t: "Портной в Лимане: забор вещей с доставкой | SwapHubs", d: "Подгонка и ремонт в Лимане: брюки, платья, куртки, молнии от ₺300. Заберём вещи с вашего адреса и привезём обратно бесплатно. ☎ +90 531 898 64 18", kw: ["портной Лиман", "ремонт одежды Лиман", "подшив брюк Лиман"] },
    de: { t: "Schneider Liman: Abholung bis zur Haustür | SwapHubs", d: "Änderungen und Reparaturen in Liman: Hosen, Kleider, Jacken, Reißverschluss ab ₺300. Wir holen ab und liefern zurück, kostenlos. ☎ +90 531 898 64 18", kw: ["Schneider Liman", "Kleidung ändern Liman", "Hose kürzen Liman"] },
  },
  "gursu": {
    en: { t: "Gürsu Tailor: Coat, Jacket & Trouser Fixes | SwapHubs", d: "Coat, jacket and trouser alterations in Gürsu, from hemming at ₺200 to zipper replacement at ₺300. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Gürsu", "Gürsu clothing alterations", "Gürsu hemming Antalya"] },
    ru: { t: "Портной в Гюрсу: пальто, куртки, брюки | SwapHubs", d: "Подгонка пальто, курток и брюк в Гюрсу: подшив от ₺200, замена молнии от ₺300. Забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Гюрсу", "ремонт одежды Гюрсу", "подшив брюк Гюрсу"] },
    de: { t: "Schneider Gürsu: Mantel, Jacke, Hose ändern | SwapHubs", d: "Mäntel, Jacken und Hosen in Gürsu ändern: Kürzen ab ₺200, Reißverschluss ab ₺300. Abholung und Lieferung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Gürsu", "Kleidung ändern Gürsu", "Hose kürzen Gürsu"] },
  },
  "uncali": {
    en: { t: "Uncalı Tailor: Dress & Evening Gown Alteration | SwapHubs", d: "Dress and evening gown alteration in Uncalı from ₺800, plus skirt and trouser hemming from ₺200. Pick-up and delivery are free. ☎ +90 531 898 64 18", kw: ["tailor Uncalı", "Uncalı clothing alterations", "Uncalı hemming Antalya"] },
    ru: { t: "Портной в Унджалы: платья и вечерние наряды | SwapHubs", d: "Подгонка платьев и вечерних нарядов в Унджалы от ₺800, подшив юбок и брюк от ₺200. Забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Унджалы", "ремонт одежды Унджалы", "подшив брюк Унджалы"] },
    de: { t: "Schneider Uncalı: Kleider & Abendmode ändern | SwapHubs", d: "Kleider und Abendmode in Uncalı ändern ab ₺800, dazu Röcke und Hosen kürzen ab ₺200. Abholung und Lieferung kostenlos. ☎ +90 531 898 64 18", kw: ["Schneider Uncalı", "Kleidung ändern Uncalı", "Hose kürzen Uncalı"] },
  },
  "sarisu": {
    en: { t: "Sarısu Tailor: Jeans & Shorts Hemming | SwapHubs", d: "Jeans, shorts and trouser hemming in Sarısu from ₺200, zippers from ₺300. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Sarısu", "Sarısu clothing alterations", "Sarısu hemming Antalya"] },
    ru: { t: "Портной в Сарысу: подшив джинсов и шорт | SwapHubs", d: "Подшив джинсов, шорт и брюк в Сарысу от ₺200, замена молнии от ₺300. Ежедневно 08:00–23:00, забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Сарысу", "ремонт одежды Сарысу", "подшив брюк Сарысу"] },
    de: { t: "Schneider Sarısu: Jeans & Shorts kürzen | SwapHubs", d: "Jeans, Shorts und Hosen in Sarısu kürzen ab ₺200, Reißverschluss ab ₺300. Abholung und Lieferung kostenlos. ☎ +90 531 898 64 18", kw: ["Schneider Sarısu", "Kleidung ändern Sarısu", "Hose kürzen Sarısu"] },
  },
  "uluc": {
    en: { t: "Uluç Tailor: Hemming, Taking In, Custom Sewing | SwapHubs", d: "Tailor service in Uluç: hemming from ₺200, taking in and shortening, custom sewing from ₺800. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Uluç", "Uluç clothing alterations", "Uluç hemming Antalya"] },
    ru: { t: "Портной в Улуче: подшив, ушивание, пошив | SwapHubs", d: "Портной в Улуче: подшив от ₺200, ушивание и укорачивание, пошив на заказ от ₺800. Забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Улуч", "ремонт одежды Улуч", "подшив брюк Улуч"] },
    de: { t: "Schneider Uluç: Kürzen, Enger, Maßanfertigung | SwapHubs", d: "Schneiderservice in Uluç: Kürzen ab ₺200, enger und kürzer machen, Maßanfertigung ab ₺800. Abholung und Lieferung kostenlos. ☎ +90 531 898 64 18", kw: ["Schneider Uluç", "Kleidung ändern Uluç", "Hose kürzen Uluç"] },
  },
  "siteler": {
    en: { t: "Siteler Tailor: Evening Dress & Zipper Repair | SwapHubs", d: "Tailor in Siteler: evening dress and dress alteration from ₺800, zipper replacement from ₺300. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Siteler", "Siteler clothing alterations", "Siteler hemming Antalya"] },
    ru: { t: "Портной в Ситлере: вечерние платья, молнии | SwapHubs", d: "Портной в Ситлере: подгонка вечерних платьев от ₺800, замена молнии от ₺300. Забор и доставка бесплатно. ☎ +90 531 898 64 18", kw: ["портной Ситлер", "ремонт одежды Ситлер", "подшив брюк Ситлер"] },
    de: { t: "Schneider Siteler: Abendkleid, Reißverschluss | SwapHubs", d: "Schneider in Siteler: Abendkleid ändern ab ₺800, Reißverschluss wechseln ab ₺300. Abholung und Lieferung kostenlos. ☎ +90 531 898 64 18", kw: ["Schneider Siteler", "Kleidung ändern Siteler", "Hose kürzen Siteler"] },
  },
  "altinkum": {
    en: { t: "Altınkum Tailor: Beach & Holiday Clothes Fixes | SwapHubs", d: "Quick fixes for beach and holiday clothes in Altınkum: dresses, shorts, trousers, zippers. Hemming from ₺200, free pick-up. ☎ +90 531 898 64 18", kw: ["tailor Altınkum", "Altınkum clothing alterations", "Altınkum hemming Antalya"] },
    ru: { t: "Портной в Алтынкуме: пляжная и отпускная одежда | SwapHubs", d: "Быстрый ремонт пляжной и отпускной одежды в Алтынкуме: платья, шорты, брюки, молнии. Подшив от ₺200, забор бесплатно. ☎ +90 531 898 64 18", kw: ["портной Алтынкум", "ремонт одежды Алтынкум", "подшив брюк Алтынкум"] },
    de: { t: "Schneider Altınkum: Strand- & Urlaubskleidung | SwapHubs", d: "Schnelle Reparaturen für Strand- und Urlaubskleidung in Altınkum: Kleider, Shorts, Hosen. Kürzen ab ₺200, Abholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Altınkum", "Kleidung ändern Altınkum", "Hose kürzen Altınkum"] },
  },
};

const FG_SERVICE: Record<string, Row> = {
  "paca": {
    en: { t: "Trouser & Skirt Hemming Antalya from ₺200 | SwapHubs", d: "Hemming for trousers, skirts and jeans in Antalya from ₺200. Length pinned on you, neat stitching, often done the same day. ☎ +90 531 898 64 18", kw: ["skirt hemming", "trouser hemming Antalya", "shorten trousers", "hem pants near me"] },
    ru: { t: "Подшив брюк и юбок в Анталье от ₺200 | SwapHubs", d: "Подшив брюк, юбок и джинсов в Анталье от ₺200. Длину отмечаем на вас, шов аккуратный, часто готово в тот же день. ☎ +90 531 898 64 18", kw: ["подшить юбку", "подшив брюк Анталья", "укоротить брюки"] },
    de: { t: "Hosen & Röcke kürzen in Antalya ab ₺200 | SwapHubs", d: "Hosen, Röcke und Jeans in Antalya ab ₺200 kürzen. Länge am Körper abgesteckt, saubere Naht, oft am selben Tag. ☎ +90 531 898 64 18", kw: ["Rock kürzen", "Hose kürzen Antalya", "Hosensaum kürzen"] },
  },
  "kot": {
    en: { t: "Jeans Hemming & Taking In Antalya from ₺200 | SwapHubs", d: "Jeans shortened or taken in from ₺200 in Antalya. Heavy-duty thread for thick denim; leg length and width to your measurements. ☎ +90 531 898 64 18", kw: ["jeans hemming", "taper jeans tailor", "take in jeans waist Antalya"] },
    ru: { t: "Подшив и ушивание джинсов в Анталье от ₺200 | SwapHubs", d: "Джинсы: подшить или ушить от ₺200 в Анталье. Плотные нитки для денима, длину и ширину штанин делаем по вашим меркам. ☎ +90 531 898 64 18", kw: ["подшить джинсы", "ушить джинсы Анталья", "джинсы подшив с сохранением низа"] },
    de: { t: "Jeans kürzen & enger machen Antalya ab ₺200 | SwapHubs", d: "Jeans in Antalya ab ₺200 kürzen oder enger machen. Garn für dicken Denim, Länge und Beinweite nach Ihren Maßen. ☎ +90 531 898 64 18", kw: ["Jeans kürzen", "Jeans enger machen", "Jeans Bund enger Antalya"] },
  },
  "bel": {
    en: { t: "Take In Waist: Trousers, Skirts, Dresses Antalya | SwapHubs", d: "Clothes too loose? Waists of trousers, skirts, dresses and jackets taken in at a fitting in Antalya, often the same day. ☎ +90 531 898 64 18", kw: ["waist alteration", "take in trousers waist", "clothes too big alteration", "skirt waist alteration"] },
    ru: { t: "Ушить в талии: брюки, юбка, платье, Анталья | SwapHubs", d: "Велика одежда? Ушиваем талию брюк, юбок, платьев и пиджаков в Анталье на примерке, нередко в тот же день. ☎ +90 531 898 64 18", kw: ["ушить в талии", "ушить брюки", "ушить платье", "уменьшить размер одежды"] },
    de: { t: "Taille enger machen: Hose, Rock, Kleid Antalya | SwapHubs", d: "Kleidung zu weit? Taille von Hosen, Röcken, Kleidern und Sakkos in Antalya bei der Anprobe enger machen, oft am selben Tag. ☎ +90 531 898 64 18", kw: ["Taille enger machen", "Hose enger machen", "Kleid enger machen", "Kleidung zu groß ändern"] },
  },
  "fermuar": {
    en: { t: "Zipper Repair & Replacement Antalya from ₺300 | SwapHubs", d: "Zippers replaced or repaired in Antalya from ₺300, for trousers, jackets, coats, dresses and bags. ☎ +90 531 898 64 18", kw: ["zipper repair", "zipper replacement Antalya", "jacket zipper replacement", "bag zipper repair"] },
    ru: { t: "Замена и ремонт молнии в Анталье от ₺300 | SwapHubs", d: "Замена и ремонт молний в Анталье от ₺300: брюки, куртки, пальто, платья, сумки. Подбираем по цвету и ткани. ☎ +90 531 898 64 18", kw: ["замена молнии", "ремонт молнии Анталья", "заменить молнию на куртке"] },
    de: { t: "Reißverschluss wechseln & reparieren ab ₺300 | SwapHubs", d: "Reißverschlüsse in Antalya ab ₺300 wechseln und reparieren: Hosen, Jacken, Mäntel, Kleider, Taschen. ☎ +90 531 898 64 18", kw: ["Reißverschluss wechseln", "Reißverschluss reparieren Antalya", "Reißverschluss Jacke wechseln"] },
  },
  "elbise-dikim": {
    en: { t: "Custom Dress Making: Linen & Cotton, Men & Women | SwapHubs", d: "Made-to-measure dresses, shirts and outfits in linen or cotton for women and men in Antalya, from ₺800, in your chosen model. ☎ +90 531 898 64 18", kw: ["custom dress making", "made to measure clothing", "linen dress tailor", "cotton clothing custom", "men women custom tailor Antalya"] },
    ru: { t: "Пошив платьев на заказ: лён, хлопок, муж/жен | SwapHubs", d: "Платья, рубашки и наряды из льна или хлопка на заказ в Анталье от ₺800, для женщин и мужчин, по вашей модели. ☎ +90 531 898 64 18", kw: ["пошив платья на заказ", "пошив по меркам", "льняное платье на заказ", "пошив из хлопка Анталья"] },
    de: { t: "Kleider nach Maß nähen: Leinen, Baumwolle | SwapHubs", d: "Kleider, Hemden und Outfits aus Leinen oder Baumwolle in Antalya ab ₺800 nach Maß, für Damen und Herren, nach Ihrem Modell. ☎ +90 531 898 64 18", kw: ["Kleid nach Maß", "Maßschneiderei Antalya", "Leinenkleid nähen lassen", "Baumwollkleidung nach Maß"] },
  },
  "elbise-tamir": {
    en: { t: "Dress Repair & Alteration Antalya, Torn Seams | SwapHubs", d: "Dress repairs in Antalya: take in, shorten, fix straps and sleeves, close open seams and tears. ☎ +90 531 898 64 18", kw: ["dress repair", "dress alteration Antalya", "mend torn clothes", "shorten dress", "take in dress"] },
    ru: { t: "Ремонт и переделка платьев, Анталья, швы | SwapHubs", d: "Ремонт платьев в Анталье: ушить, укоротить, поправить бретели и рукава, зашить швы и порывы. ☎ +90 531 898 64 18", kw: ["ремонт платья", "переделка платья Анталья", "зашить порванную одежду", "ушить платье"] },
    de: { t: "Kleider ändern & reparieren in Antalya, Nähte | SwapHubs", d: "Kleider in Antalya reparieren: enger machen, kürzen, Träger und Ärmel richten, offene Nähte und Risse schließen. ☎ +90 531 898 64 18", kw: ["Kleid ändern", "Kleid reparieren Antalya", "Riss nähen lassen", "Kleid kürzen"] },
  },
  "gelinlik-abiye": {
    en: { t: "Wedding & Evening Dress Alteration from ₺800 | SwapHubs", d: "Wedding and evening dress alterations in Antalya from ₺800: bodice, hem, corset and straps, with fittings. Hotel service possible. ☎ +90 531 898 64 18", kw: ["wedding dress alteration", "evening gown alteration", "bridal gown alterations Antalya", "prom dress alteration"] },
    ru: { t: "Подгонка свадебных и вечерних платьев от ₺800 | SwapHubs", d: "Подгонка вечерних и свадебных платьев в Анталье от ₺800: лиф, длина, корсет, бретели, с примеркой. Возможен выезд в отель. ☎ +90 531 898 64 18", kw: ["подгонка свадебного платья", "подгонка вечернего платья", "ателье свадебные платья Анталья"] },
    de: { t: "Brautkleid & Abendkleid ändern ab ₺800 | SwapHubs", d: "Abend- und Brautkleid in Antalya ab ₺800 ändern: Oberteil, Saum, Korsett, Träger, mit Anprobe. Hotelservice möglich. ☎ +90 531 898 64 18", kw: ["Brautkleid ändern", "Abendkleid ändern", "Brautkleid Änderungsschneiderei Antalya"] },
  },
  "takim": {
    en: { t: "Suit & Jacket Alteration: Sleeves, Waist | SwapHubs", d: "Suits and jackets altered in Antalya, men's and women's: sleeves shortened, waist taken in, shoulders corrected. ☎ +90 531 898 64 18", kw: ["suit alteration", "jacket alteration", "shorten jacket sleeves", "blazer alteration Antalya"] },
    ru: { t: "Подгонка костюма и пиджака: рукава, талия | SwapHubs", d: "Подгонка костюмов и пиджаков в Анталье, мужских и женских: укоротить рукава, ушить талию, поправить плечи. С примеркой. ☎ +90 531 898 64 18", kw: ["подгонка костюма", "подгонка пиджака", "укоротить рукава пиджака"] },
    de: { t: "Anzug & Sakko ändern: Ärmel, Taille, Schulter | SwapHubs", d: "Anzüge und Sakkos in Antalya für Herren und Damen: Ärmel kürzen, Taille enger machen, Schultern korrigieren. ☎ +90 531 898 64 18", kw: ["Anzug ändern", "Sakko ändern", "Ärmel kürzen Sakko"] },
  },
  "mont": {
    en: { t: "Coat & Jacket Shortening, Taking In, Zipper Fix | SwapHubs", d: "Coat and jacket alteration in Antalya: shorten, take in, adjust sleeves and replace zippers from ₺300. Hotel and home pick-up on WhatsApp. ☎ +90 531 898 64 18", kw: ["coat alteration", "shorten coat", "jacket zipper replacement Antalya"] },
    ru: { t: "Куртка и пальто: укоротить, ушить, молния | SwapHubs", d: "Куртки и пальто в Анталье: укоротить, ушить, подогнать рукава, заменить молнию от ₺300. Забор из отеля и с дома бесплатно. ☎ +90 531 898 64 18", kw: ["подгонка пальто", "укоротить куртку", "замена молнии на куртке Анталья"] },
    de: { t: "Jacke & Mantel kürzen, Reißverschluss wechseln | SwapHubs", d: "Jacken und Mäntel in Antalya kürzen, enger machen, Ärmel anpassen, Reißverschluss ab ₺300 wechseln. ☎ +90 531 898 64 18", kw: ["Mantel ändern", "Jacke kürzen", "Reißverschluss Jacke wechseln Antalya"] },
  },
  "gomlek": {
    en: { t: "Shirt Alteration: Take In, Shorten Sleeves | SwapHubs", d: "Shirts altered in Antalya for men and women: sides taken in, sleeves and length shortened, collar adjusted. ☎ +90 531 898 64 18", kw: ["shirt alteration", "take in shirt", "shorten shirt sleeves Antalya"] },
    ru: { t: "Подгонка рубашки: ушить, укоротить рукава | SwapHubs", d: "Подгонка рубашек в Анталье для мужчин и женщин: ушить по бокам, укоротить рукава и длину, поправить воротник. ☎ +90 531 898 64 18", kw: ["ушить рубашку", "укоротить рукава рубашки", "подгонка рубашки Анталья"] },
    de: { t: "Hemd ändern: enger machen, Ärmel kürzen | SwapHubs", d: "Hemden in Antalya für Herren und Damen ändern: seitlich enger, Ärmel und Länge kürzen, Kragen anpassen. ☎ +90 531 898 64 18", kw: ["Hemd enger machen", "Hemd Ärmel kürzen", "Hemd ändern Antalya"] },
  },
  "deri": {
    en: { t: "Leather Jacket & Trouser Repair in Antalya | SwapHubs", d: "Leather jackets and trousers repaired in Antalya: taking in, zipper replacement, lining repair. Send a photo for a quote. ☎ +90 531 898 64 18", kw: ["leather jacket repair", "leather jacket alteration Antalya", "leather trousers tailor"] },
    ru: { t: "Ремонт кожаной куртки и брюк в Анталье | SwapHubs", d: "Ремонт кожаных курток и брюк в Анталье: ушить, заменить молнию, починить подкладку. Фото в WhatsApp — назовём цену. ☎ +90 531 898 64 18", kw: ["ремонт кожаной куртки", "ушить кожаную куртку", "кожаные брюки ателье Анталья"] },
    de: { t: "Lederjacke & Lederhose reparieren in Antalya | SwapHubs", d: "Lederjacken und Lederhosen in Antalya reparieren: enger machen, Reißverschluss wechseln, Futter richten. Foto für Preisangebot. ☎ +90 531 898 64 18", kw: ["Lederjacke reparieren", "Lederjacke ändern Antalya", "Lederhose Schneider"] },
  },
  "tisort": {
    en: { t: "T-Shirt & Shorts Alteration, Hemming Antalya | SwapHubs", d: "T-shirt and shorts alteration in Antalya: shorten, take in, sleeve length, waistband fit. Send a photo on WhatsApp for the price. ☎ +90 531 898 64 18", kw: ["shorts hemming", "t-shirt alteration", "take in shorts Antalya"] },
    ru: { t: "Футболка и шорты: ушить, подшить, Анталья | SwapHubs", d: "Футболки и шорты в Анталье: укоротить, ушить, изменить длину рукава и посадку на поясе. Фото в WhatsApp — назовём цену. ☎ +90 531 898 64 18", kw: ["подшить шорты", "ушить футболку", "подгонка шорт Анталья"] },
    de: { t: "T-Shirt & Shorts ändern, kürzen in Antalya | SwapHubs", d: "T-Shirts und Shorts ändern in Antalya: kürzen, enger machen, Ärmellänge, Bund anpassen. Foto per WhatsApp, wir nennen den Preis. ☎ +90 531 898 64 18", kw: ["Shorts kürzen", "T-Shirt enger machen", "Shorts ändern Antalya"] },
  },
  "beden": {
    en: { t: "Resize Clothes to Your Measurements, Antalya | SwapHubs", d: "Weight changed? We resize clothes to your measurements in Antalya, taking in or letting out, with a fitting. ☎ +90 531 898 64 18", kw: ["resize clothes", "clothes too big alteration", "tailor to measurements Antalya"] },
    ru: { t: "Подгонка одежды по вашим меркам, Анталья | SwapHubs", d: "Изменился вес? Подгоним одежду по вашим меркам в Анталье: ушьём или расширим, с примеркой. ☎ +90 531 898 64 18", kw: ["подгонка одежды по меркам", "уменьшить размер одежды", "расширить одежду Анталья"] },
    de: { t: "Kleidung auf Ihre Maße ändern lassen, Antalya | SwapHubs", d: "Gewicht verändert? Wir passen Kleidung in Antalya an Ihre Maße an: enger oder weiter, mit Anprobe. ☎ +90 531 898 64 18", kw: ["Kleidung auf Maß ändern", "Kleidung enger machen lassen", "Kleidung weiter machen Antalya"] },
  },
};

const KW_PLACE: Record<L3, string[]> = {
  en: ['dress repair', 'trouser hemming', 'zipper replacement', 'custom dressmaking linen cotton', 'men and women tailor'],
  ru: ['ремонт платьев', 'подшив брюк', 'замена молнии', 'пошив на заказ лён хлопок', 'портной мужская и женская одежда'],
  de: ['Kleid reparieren', 'Hose kürzen', 'Reißverschluss wechseln', 'Maßanfertigung Leinen Baumwolle', 'Schneider Damen Herren'],
};

/** Yakın bölge sayfası için elle yazılmış EN/RU/DE meta; kayıt yoksa undefined. */
export function fgNearDistrict(lang: string, slug: string, name: string): FgMeta | undefined {
  const x = FG_DISTRICT[slug]?.[lang as L3];
  if (!x) return undefined;
  return { title: x.t, desc: x.d, kw: Array.from(new Set([...x.kw, ...KW_PLACE[lang as L3].map((k) => `${k} ${name}`)])) };
}

/** Hizmet sayfası için elle yazılmış EN/RU/DE meta; kayıt yoksa undefined. */
export function fgServiceMeta(lang: string, id: string): FgMeta | undefined {
  const x = FG_SERVICE[id]?.[lang as L3];
  if (!x) return undefined;
  const city = { en: ['Antalya', 'Konyaaltı'], ru: ['Анталья', 'Коньяалты'], de: ['Antalya', 'Konyaaltı'] }[lang as L3];
  return { title: x.t, desc: x.d, kw: Array.from(new Set(x.kw.flatMap((k) => [k, `${k} ${city[0]}`, `${k} ${city[1]}`]))) };
}
