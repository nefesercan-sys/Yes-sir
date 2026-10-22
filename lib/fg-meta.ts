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
    en: { t: "Konyaaltı Tailor: Hurma, Liman, Uncalı Beach | SwapHubs", d: "Tailor in Konyaaltı: Hurma, Liman, Uncalı, Sarısu, Gürsu. Dress repair, alterations, custom linen sewing. Free pick-up. ☎ +90 531 898 64 18", kw: ["tailor Konyaaltı", "tailor Konyaaltı beach", "tailor Hurma Konyaaltı", "tailor Liman Konyaaltı", "tailor Uncalı", "tailor Sarısu", "tailor Gürsu", "dress repair Konyaaltı", "custom linen sewing Konyaaltı"] },
    ru: { t: "Портной Коньяалты: Хурма, Лиман, Унджалы | SwapHubs", d: "Портной в Коньяалты: Хурма, Лиман, Унджалы, Сарысу, Гюрсу. Ремонт платьев, подгонка, пошив из льна. Забор бесплатно. ☎ +90 531 898 64 18", kw: ["портной Коньяалты", "портной пляж Коньяалты", "портной Хурма Коньяалты", "портной Лиман Коньяалты", "ремонт платьев Коньяалты", "пошив из льна Коньяалты"] },
    de: { t: "Schneider Konyaaltı: Hurma, Liman, Uncalı | SwapHubs", d: "Schneider in Konyaaltı: Hurma, Liman, Uncalı, Sarısu, Gürsu. Kleider ändern, reparieren, Leinen nach Maß. Abholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Konyaaltı", "Schneider Konyaaltı Strand", "Schneider Hurma Konyaaltı", "Schneider Liman Konyaaltı", "Kleid ändern Konyaaltı", "Leinen nach Maß Konyaaltı"] },
  },
  "muratpasa": {
    en: { t: "Muratpaşa Tailor: Evening & Wedding Dresses | SwapHubs", d: "Evening and wedding dress alteration in Muratpaşa: evening and wedding dresses from ₺800. Fittings included, free pick-up. ☎ +90 531 898 64 18", kw: ["tailor Muratpaşa", "evening dress alteration Muratpaşa", "wedding dress alteration Antalya", "dress tailor Muratpaşa"] },
    ru: { t: "Портной Муратпаша: вечерние и свадебные платья | SwapHubs", d: "Подгонка вечерних и свадебных платьев в Муратпаше: вечернее и свадебное от ₺800. С примеркой, бесплатный забор из отеля и с дома. ☎ +90 531 898 64 18", kw: ["портной Муратпаша", "подгонка вечернего платья Муратпаша", "подгонка свадебного платья Анталья"] },
    de: { t: "Schneider Muratpaşa: Abend- & Brautkleid ändern | SwapHubs", d: "Abendkleid und Brautkleid ändern in Muratpaşa: Abend- und Brautkleid ab ₺800. Mit Anprobe, kostenlose Abholung. ☎ +90 531 898 64 18", kw: ["Schneider Muratpaşa", "Abendkleid ändern Muratpaşa", "Brautkleid ändern Antalya"] },
  },
  "meltem": {
    en: { t: "Meltem Tailor: Suit, Jacket & Trouser Alteration | SwapHubs", d: "Suit, jacket and trouser alterations in Meltem for men and women: sleeves, hems, waist, shoulders. Free pick-up. ☎ +90 531 898 64 18", kw: ["tailor Meltem", "suit alteration Meltem", "jacket alteration Antalya", "trouser hemming Meltem"] },
    ru: { t: "Портной Мельтем: костюм, пиджак, брюки | SwapHubs", d: "Подгонка костюмов, пиджаков и брюк в Мельтеме, мужских и женских: рукава, длина, талия, плечи. Примерка на вас, бесплатный забор. ☎ +90 531 898 64 18", kw: ["портной Мельтем", "подгонка костюма Мельтем", "подгонка пиджака Анталья", "подшив брюк Мельтем"] },
    de: { t: "Schneider Meltem: Anzug, Sakko, Hose ändern | SwapHubs", d: "Anzug, Sakko und Hose ändern in Meltem, für Herren und Damen: Ärmel, Saum, Taille, Schultern. Anprobe am Körper, Abholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Meltem", "Anzug ändern Meltem", "Sakko ändern Antalya", "Hose kürzen Meltem"] },
  },
  "fener": {
    en: { t: "Fener Tailor: Torn Clothes & Seam Repair | SwapHubs", d: "Torn clothes, holes and open seams repaired in Fener, for men and women. Stitched with thread to match the fabric, ready next day. ☎ +90 531 898 64 18", kw: ["tailor Fener", "torn clothes repair Fener", "fix hole in clothes Antalya", "sew open seam Fener"] },
    ru: { t: "Портной Фенер: ремонт порванной одежды, швы | SwapHubs", d: "Ремонт порванной одежды, дырок и распоровшихся швов в Фенере, мужской и женской. Нитки под ткань, готово на следующий день. ☎ +90 531 898 64 18", kw: ["портной Фенер", "ремонт порванной одежды Фенер", "зашить дырку Анталья", "зашить шов Фенер"] },
    de: { t: "Schneider Fener: Riss & Loch in Kleidung flicken | SwapHubs", d: "Risse, Löcher und aufgegangene Nähte in Fener reparieren, für Damen und Herren. Garn passend zum Stoff, meist am nächsten Tag fertig. ☎ +90 531 898 64 18", kw: ["Schneider Fener", "Riss reparieren Fener", "Loch flicken Antalya", "Naht nähen Fener"] },
  },
  "sirinyali": {
    en: { t: "Şirinyalı Tailor: Made-to-Measure Linen Dresses | SwapHubs", d: "Custom dressmaking in Şirinyalı from ₺800: linen and cotton dresses, shirts and outfits for women and men. Free pick-up. ☎ +90 531 898 64 18", kw: ["tailor Şirinyalı", "made to measure dress Antalya", "linen dress tailor Şirinyalı", "custom clothing men women Antalya"] },
    ru: { t: "Ширинъялы: пошив льняных платьев по меркам | SwapHubs", d: "Пошив на заказ в Ширинъялы от ₺800: платья, рубашки и наряды из льна и хлопка, женские и мужские, по вашим меркам и выбранной модели. ☎ +90 531 898 64 18", kw: ["пошив платья по меркам Ширинъялы", "льняное платье на заказ Анталья", "пошив одежды на заказ Анталья"] },
    de: { t: "Şirinyalı: Leinenkleider nach Maß nähen lassen | SwapHubs", d: "Maßanfertigung in Şirinyalı ab ₺800: Kleider, Hemden und Outfits aus Leinen und Baumwolle für Damen und Herren. Abholung gratis. ☎ +90 531 898 64 18", kw: ["Kleid nach Maß Şirinyalı", "Leinenkleid nähen lassen Antalya", "Maßschneiderei Antalya Damen Herren"] },
  },
  "arapsuyu": {
    en: { t: "Arapsuyu Tailor: Men's & Women's Repairs, Jeans | SwapHubs", d: "Men's and women's clothing repairs in Arapsuyu: jeans hemming, trouser taking in, dress repair, open seams. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Arapsuyu", "jeans hemming Arapsuyu", "clothing repair Arapsuyu", "dress alteration Arapsuyu"] },
    ru: { t: "Портной Арапсую: ремонт мужской и женской одежды | SwapHubs", d: "Ремонт мужской и женской одежды в Арапсую: подшив джинсов, ушивание брюк, ремонт платьев, зашить швы. Бесплатный забор и доставка. ☎ +90 531 898 64 18", kw: ["портной Арапсую", "подшить джинсы Арапсую", "ремонт одежды Арапсую"] },
    de: { t: "Arapsuyu: Herren- und Damenkleidung ändern | SwapHubs", d: "Änderungen für Herren und Damen in Arapsuyu: Jeans kürzen, Hose enger machen, Kleid reparieren, Nähte schließen. Abholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Arapsuyu", "Jeans kürzen Arapsuyu", "Kleidung reparieren Arapsuyu"] },
  },
  "toros": {
    en: { t: "Toros Tailor Near Me: Same-Day Trouser Hemming | SwapHubs", d: "Looking for a tailor near Toros? Trouser, skirt and jeans hemming from ₺200, usually ready the same day. Free pick-up. ☎ +90 531 898 64 18", kw: ["tailor near me Toros", "trouser hemming near me", "same day hemming Antalya", "tailor open now Antalya"] },
    ru: { t: "Портной рядом, Торос: подшив брюк в тот же день | SwapHubs", d: "Ищете портного рядом в районе Торос? Подшив брюк, юбок и джинсов от ₺200, обычно в тот же день. Ежедневно 08:00–23:00, бесплатный забор. ☎ +90 531 898 64 18", kw: ["портной рядом Торос", "подшить брюки рядом", "подшив в тот же день Анталья"] },
    de: { t: "Toros: Schneider in der Nähe, Hose am selben Tag | SwapHubs", d: "Schneider in der Nähe von Toros: Hosen, Röcke und Jeans kürzen ab ₺200, meist am selben Tag. Täglich 08:00–23:00, Abholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider in der Nähe Toros", "Hose kürzen in der Nähe", "Hose kürzen am selben Tag Antalya"] },
  },
  "ogretmenevleri": {
    en: { t: "Öğretmenevleri Tailor: Coat, Leather, Zipper Fix | SwapHubs", d: "Coat, jacket and leather jacket alterations in Öğretmenevleri: shorten, take in, replace zippers from ₺300. Free pick-up and delivery. ☎ +90 531 898 64 18", kw: ["tailor Öğretmenevleri", "coat alteration Antalya", "leather jacket repair Antalya", "zipper replacement Öğretmenevleri"] },
    ru: { t: "Огретменевлери: пальто, кожа, молнии, ремонт | SwapHubs", d: "Подгонка пальто, курток и кожаных курток в Огретменевлери: укоротить, ушить, замена молнии от ₺300. Бесплатный забор и доставка. ☎ +90 531 898 64 18", kw: ["портной Огретменевлери", "подгонка пальто Анталья", "ремонт кожаной куртки Анталья", "замена молнии Огретменевлери"] },
    de: { t: "Öğretmenevleri: Mantel, Leder, Reißverschluss | SwapHubs", d: "Mantel, Jacke und Lederjacke ändern in Öğretmenevleri: kürzen, enger machen, Reißverschluss wechseln ab ₺300. Abholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Öğretmenevleri", "Mantel ändern Antalya", "Lederjacke reparieren Antalya", "Reißverschluss wechseln Öğretmenevleri"] },
  },
  "side": {
    en: { t: "Side Tailor: Hotel Pick-up, Clothing Repairs | SwapHubs", d: "Staying in Side? Tailor service from your hotel: alterations, repairs and custom linen and cotton clothing for men and women. ☎ +90 531 898 64 18", kw: ["tailor Side Antalya", "hotel tailor Side", "custom linen clothing Side", "clothing alterations Side Turkey"] },
    ru: { t: "Портной Сиде: из отеля, лён и хлопок на заказ | SwapHubs", d: "Отдыхаете в Сиде? Портной заберёт вещь из отеля: подгонка, ремонт, пошив на заказ из льна и хлопка, мужская и женская одежда. ☎ +90 531 898 64 18", kw: ["портной Сиде", "портной в отеле Сиде", "льняная одежда на заказ Сиде", "ремонт одежды Сиде"] },
    de: { t: "Schneider Side: Hotelabholung, Leinen nach Maß | SwapHubs", d: "Urlaub in Side? Schneiderservice ab Hotel: Änderungen, Reparaturen und Maßanfertigung aus Leinen und Baumwolle für Damen und Herren. ☎ +90 531 898 64 18", kw: ["Schneider Side Antalya", "Hotelschneider Side", "Leinenkleidung nach Maß Side", "Kleidung ändern Side"] },
  },
  "aksu": {
    en: { t: "Aksu Tailor: Custom Sewing & Dress Alteration | SwapHubs", d: "Aksu tailor service: custom sewing for men and women, dress repair and alterations, trouser hemming from ₺200. ☎ +90 531 898 64 18", kw: ["tailor Aksu Antalya", "custom sewing Aksu", "dress alteration Aksu", "trouser hemming Aksu"] },
    ru: { t: "Портной Аксу: пошив на заказ и подгонка платьев | SwapHubs", d: "Портной в Аксу: пошив на заказ мужской и женской одежды, ремонт и подгонка платьев, подшив брюк от ₺200. Забор и доставка — в WhatsApp. ☎ +90 531 898 64 18", kw: ["портной Аксу", "пошив на заказ Аксу", "подгонка платья Аксу", "подшив брюк Аксу"] },
    de: { t: "Schneider Aksu: Maßanfertigung & Kleider ändern | SwapHubs", d: "Schneider in Aksu: Maßanfertigung für Damen und Herren, Kleider ändern und reparieren, Hosen kürzen ab ₺200. ☎ +90 531 898 64 18", kw: ["Schneider Aksu Antalya", "Maßanfertigung Aksu", "Kleid ändern Aksu", "Hose kürzen Aksu"] },
  },
  "lara": {
    en: { t: "Lara Tailor: Evening Dress & Hemming Fixes | SwapHubs", d: "Staying in Lara? Evening dress fitting, hemming, quick repairs and custom linen sewing for men and women. Free hotel pick-up. ☎ +90 531 898 64 18", kw: ["tailor Lara", "tailor Lara Antalya", "evening dress alteration Lara", "hotel tailor Lara", "custom linen dress Lara", "clothing repair Lara", "hemming Lara hotel"] },
    ru: { t: "Портной Лара: вечернее платье и подшив | SwapHubs", d: "Отдыхаете в Ларе? Подгонка вечерних платьев, подшив, быстрый ремонт и пошив из льна для мужчин и женщин. Забор из отеля бесплатно. ☎ +90 531 898 64 18", kw: ["портной Лара", "ателье Лара Анталья", "подгонка вечернего платья Лара", "портной в отель Лара", "пошив льняного платья Лара", "ремонт одежды Лара"] },
    de: { t: "Schneider Lara: Abendkleid & Saum ändern | SwapHubs", d: "Urlaub in Lara? Abendkleid anpassen, Saum kürzen, Reparaturen und Leinen nach Maß für Damen und Herren. Hotelabholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Lara", "Änderungsschneiderei Lara", "Abendkleid ändern Lara", "Hotel Schneider Lara", "Leinenkleid nach Maß Lara", "Kleidung reparieren Lara"] },
  },
  "kundu": {
    en: { t: "Kundu Tailor: Zipper & Torn Clothes Repair | SwapHubs", d: "Broken zipper or torn seam in Kundu? Fast repairs and alterations, plus custom cotton and linen outfits. Free hotel pick-up. ☎ +90 531 898 64 18", kw: ["tailor Kundu", "zipper repair Kundu", "torn clothes repair Kundu", "hotel tailor Kundu", "clothing alterations Kundu", "custom cotton outfit Kundu"] },
    ru: { t: "Портной Кунду: молния и порванная одежда | SwapHubs", d: "Сломалась молния или порвался шов в Кунду? Быстрый ремонт и подгонка, пошив из хлопка и льна. Забор из отеля бесплатно. ☎ +90 531 898 64 18", kw: ["портной Кунду", "замена молнии Кунду", "ремонт порванной одежды Кунду", "портной в отель Кунду", "подгонка одежды Кунду"] },
    de: { t: "Schneider Kundu: Reißverschluss & Risse flicken | SwapHubs", d: "Reißverschluss kaputt oder Naht offen in Kundu? Schnelle Reparaturen, dazu Outfits nach Maß aus Leinen. Abholung gratis. ☎ +90 531 898 64 18", kw: ["Schneider Kundu", "Reißverschluss reparieren Kundu", "Riss in Kleidung flicken Kundu", "Hotel Schneider Kundu", "Kleidung ändern Kundu"] },
  },
  "belek": {
    en: { t: "Belek Tailor: Custom Linen Shirts & Suits | SwapHubs", d: "Custom linen and cotton shirts, trousers, suits and dresses in Belek for men and women. Alterations and repairs too. ☎ +90 531 898 64 18", kw: ["tailor Belek", "custom linen shirt Belek", "made to measure suit Belek", "linen dress tailor Belek", "hotel tailor Belek", "clothing alterations Belek"] },
    ru: { t: "Портной Белек: льняные рубашки и костюмы | SwapHubs", d: "Пошив на заказ в Белеке: рубашки, брюки, костюмы и платья из льна и хлопка по вашим меркам, мужские и женские. Подгонка и ремонт тоже. ☎ +90 531 898 64 18", kw: ["портной Белек", "льняная рубашка на заказ Белек", "костюм по меркам Белек", "пошив платья Белек", "портной в отель Белек", "подгонка одежды Белек"] },
    de: { t: "Schneider Belek: Leinenhemd & Anzug nach Maß | SwapHubs", d: "Maßanfertigung in Belek: Hemden, Hosen, Anzüge und Kleider aus Leinen und Baumwolle für Damen und Herren. Dazu Änderungen und Reparaturen. ☎ +90 531 898 64 18", kw: ["Schneider Belek", "Leinenhemd nach Maß Belek", "Maßanzug Belek", "Leinenkleid Belek", "Hotel Schneider Belek", "Kleidung ändern Belek"] },
  },
  "goynuk": {
    en: { t: "Göynük Tailor: Kids & Family Linen Outfits | SwapHubs", d: "Custom linen and cotton outfits in Göynük for kids, women and men, plus hemming and repairs. Matching family sets. ☎ +90 531 898 64 18", kw: ["tailor Göynük", "kids linen clothing Göynük", "custom family outfits Göynük", "clothing repair Göynük", "hotel tailor Göynük", "hemming Göynük"] },
    ru: { t: "Портной Гёйнюк: льняная одежда для всей семьи | SwapHubs", d: "Пошив из льна и хлопка в Гёйнюке для детей, женщин и мужчин, плюс подшив, молнии и ремонт. Одинаковые семейные комплекты по желанию. ☎ +90 531 898 64 18", kw: ["портной Гёйнюк", "детская льняная одежда Гёйнюк", "семейные образы на заказ Гёйнюк", "ремонт одежды Гёйнюк", "подшив Гёйнюк"] },
    de: { t: "Schneider Göynük: Leinen für Kinder & Familie | SwapHubs", d: "Outfits nach Maß aus Leinen in Göynük für Kinder, Damen und Herren, dazu Saum und Reparaturen. Partnerlook möglich. ☎ +90 531 898 64 18", kw: ["Schneider Göynük", "Kinder Leinenkleidung Göynük", "Partnerlook Familie Göynük", "Kleidung reparieren Göynük", "Saum kürzen Göynük"] },
  },
  "beldibi": {
    en: { t: "Beldibi Tailor: Beach Linen Dresses & Repairs | SwapHubs", d: "Beach linen dresses and shirts made to measure in Beldibi, plus hemming, zipper replacement and torn clothes repair for men and women. ☎ +90 531 898 64 18", kw: ["tailor Beldibi", "beach linen dress Beldibi", "custom linen clothing Beldibi", "zipper replacement Beldibi", "torn clothes repair Beldibi", "hotel tailor Beldibi"] },
    ru: { t: "Портной Бельдиби: пляжные платья и ремонт | SwapHubs", d: "Пляжные льняные платья и рубашки на заказ в Бельдиби, плюс подшив, замена молнии и ремонт порванной одежды, мужской и женской. ☎ +90 531 898 64 18", kw: ["портной Бельдиби", "пляжное платье на заказ Бельдиби", "льняная одежда на заказ Бельдиби", "замена молнии Бельдиби", "ремонт одежды Бельдиби"] },
    de: { t: "Schneider Beldibi: Strandkleider & Reparaturen | SwapHubs", d: "Strandkleider und Hemden aus Leinen nach Maß in Beldibi, dazu Saum kürzen, Reißverschluss wechseln und Risse flicken für Damen und Herren. ☎ +90 531 898 64 18", kw: ["Schneider Beldibi", "Strandkleid nach Maß Beldibi", "Leinenkleidung Beldibi", "Reißverschluss wechseln Beldibi", "Kleidung reparieren Beldibi"] },
  },
};

const FG_SERVICE: Record<string, Row> = {
  "paca": {
    en: { t: "Trouser & Skirt Hemming Antalya from ₺200 | SwapHubs", d: "Trouser, skirt and jeans hemming in Antalya from ₺200, usually the same day. Length marked on you, clean stitching. ☎ +90 531 898 64 18", kw: ["skirt hemming", "trouser hemming Antalya", "shorten trousers", "hem pants near me"] },
    ru: { t: "Подшив брюк и юбок в Анталье от ₺200 | SwapHubs", d: "Подшив брюк, юбок и джинсов в Анталье от ₺200, обычно в тот же день. Длину отмечаем на вас, аккуратный шов. ☎ +90 531 898 64 18", kw: ["подшить юбку", "подшив брюк Анталья", "укоротить брюки"] },
    de: { t: "Hosen & Röcke kürzen in Antalya ab ₺200 | SwapHubs", d: "Hosen, Röcke und Jeans kürzen in Antalya ab ₺200, meist am selben Tag. Länge am Körper abgesteckt, saubere Naht. ☎ +90 531 898 64 18", kw: ["Rock kürzen", "Hose kürzen Antalya", "Hosensaum kürzen"] },
  },
  "kot": {
    en: { t: "Jeans Hemming & Taking In Antalya from ₺200 | SwapHubs", d: "Jeans hemming and taking in from ₺200 in Antalya. Machines and thread made for heavy denim, length and leg width set to your measurements. ☎ +90 531 898 64 18", kw: ["jeans hemming", "taper jeans tailor", "take in jeans waist Antalya"] },
    ru: { t: "Подшив и ушивание джинсов в Анталье от ₺200 | SwapHubs", d: "Подшив и ушивание джинсов в Анталье от ₺200. Машины и нитки для плотного денима, длина и ширина штанин по вашим меркам. ☎ +90 531 898 64 18", kw: ["подшить джинсы", "ушить джинсы Анталья", "джинсы подшив с сохранением низа"] },
    de: { t: "Jeans kürzen & enger machen Antalya ab ₺200 | SwapHubs", d: "Jeans kürzen und enger machen ab ₺200 in Antalya. Maschinen und Garn für dicken Denim, Länge und Beinweite nach Ihren Maßen. ☎ +90 531 898 64 18", kw: ["Jeans kürzen", "Jeans enger machen", "Jeans Bund enger Antalya"] },
  },
  "bel": {
    en: { t: "Take In Waist: Trousers, Skirts, Dresses Antalya | SwapHubs", d: "Clothes too big? We take in the waist of trousers, skirts, dresses and jackets in Antalya, set at a fitting. Often ready the same day. ☎ +90 531 898 64 18", kw: ["waist alteration", "take in trousers waist", "clothes too big alteration", "skirt waist alteration"] },
    ru: { t: "Ушить в талии: брюки, юбка, платье, Анталья | SwapHubs", d: "Одежда велика? Ушиваем талию брюк, юбок, платьев и пиджаков в Анталье, посадка определяется на примерке. Часто в тот же день. ☎ +90 531 898 64 18", kw: ["ушить в талии", "ушить брюки", "ушить платье", "уменьшить размер одежды"] },
    de: { t: "Taille enger machen: Hose, Rock, Kleid Antalya | SwapHubs", d: "Kleidung zu groß? Wir machen die Taille von Hosen, Röcken, Kleidern und Sakkos enger, abgestimmt bei der Anprobe. Oft am selben Tag. ☎ +90 531 898 64 18", kw: ["Taille enger machen", "Hose enger machen", "Kleid enger machen", "Kleidung zu groß ändern"] },
  },
  "fermuar": {
    en: { t: "Zipper Repair & Replacement Antalya from ₺300 | SwapHubs", d: "Zipper replacement and repair from ₺300 in Antalya: trousers, jackets, coats, dresses and bags. ☎ +90 531 898 64 18", kw: ["zipper repair", "zipper replacement Antalya", "jacket zipper replacement", "bag zipper repair"] },
    ru: { t: "Замена и ремонт молнии в Анталье от ₺300 | SwapHubs", d: "Замена и ремонт молнии в Анталье от ₺300: брюки, куртки, пальто, платья и сумки. Подбираем по ткани и цвету, часто в тот же день. ☎ +90 531 898 64 18", kw: ["замена молнии", "ремонт молнии Анталья", "заменить молнию на куртке"] },
    de: { t: "Reißverschluss wechseln & reparieren ab ₺300 | SwapHubs", d: "Reißverschluss wechseln und reparieren ab ₺300 in Antalya: Hosen, Jacken, Mäntel, Kleider und Taschen. ☎ +90 531 898 64 18", kw: ["Reißverschluss wechseln", "Reißverschluss reparieren Antalya", "Reißverschluss Jacke wechseln"] },
  },
  "elbise-dikim": {
    en: { t: "Custom Dress Making: Linen & Cotton, Men & Women | SwapHubs", d: "Custom sewing in Antalya from ₺800: dresses, shirts and outfits in linen or cotton for women and men, to your measurements and model. ☎ +90 531 898 64 18", kw: ["custom dress making", "made to measure clothing", "linen dress tailor", "cotton clothing custom", "men women custom tailor Antalya"] },
    ru: { t: "Пошив платьев на заказ: лён, хлопок, муж/жен | SwapHubs", d: "Пошив на заказ в Анталье от ₺800: платья, рубашки и наряды из льна или хлопка, женские и мужские, по вашим меркам и модели. ☎ +90 531 898 64 18", kw: ["пошив платья на заказ", "пошив по меркам", "льняное платье на заказ", "пошив из хлопка Анталья"] },
    de: { t: "Kleider nach Maß nähen: Leinen, Baumwolle | SwapHubs", d: "Maßanfertigung in Antalya ab ₺800: Kleider, Hemden und Outfits aus Leinen oder Baumwolle für Damen und Herren, nach Maß und Modell. ☎ +90 531 898 64 18", kw: ["Kleid nach Maß", "Maßschneiderei Antalya", "Leinenkleid nähen lassen", "Baumwollkleidung nach Maß"] },
  },
  "elbise-tamir": {
    en: { t: "Dress Repair & Alteration Antalya, Torn Seams | SwapHubs", d: "Dress repair and alteration in Antalya: taking in, shortening, straps and sleeves, open seams and tears. ☎ +90 531 898 64 18", kw: ["dress repair", "dress alteration Antalya", "mend torn clothes", "shorten dress", "take in dress"] },
    ru: { t: "Ремонт и переделка платьев, Анталья, швы | SwapHubs", d: "Ремонт и переделка платьев в Анталье: ушить, укоротить, бретели и рукава, распоровшиеся швы и порывы. ☎ +90 531 898 64 18", kw: ["ремонт платья", "переделка платья Анталья", "зашить порванную одежду", "ушить платье"] },
    de: { t: "Kleider ändern & reparieren in Antalya, Nähte | SwapHubs", d: "Kleider ändern und reparieren in Antalya: enger machen, kürzen, Träger und Ärmel, aufgegangene Nähte und Risse. ☎ +90 531 898 64 18", kw: ["Kleid ändern", "Kleid reparieren Antalya", "Riss nähen lassen", "Kleid kürzen"] },
  },
  "gelinlik-abiye": {
    en: { t: "Wedding & Evening Dress Alteration from ₺800 | SwapHubs", d: "Evening dress alteration from ₺800, wedding dress from ₺800 in Antalya: taking in, hem, corset and straps, with fittings. ☎ +90 531 898 64 18", kw: ["wedding dress alteration", "evening gown alteration", "bridal gown alterations Antalya", "prom dress alteration"] },
    ru: { t: "Подгонка свадебных и вечерних платьев от ₺800 | SwapHubs", d: "Подгонка вечернего платья от ₺800, свадебного от ₺800 в Анталье: ушивание, длина, корсет и бретели, с примеркой. Выезд в отели возможен. ☎ +90 531 898 64 18", kw: ["подгонка свадебного платья", "подгонка вечернего платья", "ателье свадебные платья Анталья"] },
    de: { t: "Brautkleid & Abendkleid ändern ab ₺800 | SwapHubs", d: "Abendkleid ändern ab ₺800, Brautkleid ab ₺800 in Antalya: enger machen, Saum, Korsett und Träger, mit Anprobe. Service zu Hotels möglich. ☎ +90 531 898 64 18", kw: ["Brautkleid ändern", "Abendkleid ändern", "Brautkleid Änderungsschneiderei Antalya"] },
  },
  "takim": {
    en: { t: "Suit & Jacket Alteration: Sleeves, Waist | SwapHubs", d: "Suit and jacket alteration in Antalya for men and women: shorten sleeves, take in waist, fix shoulders. ☎ +90 531 898 64 18", kw: ["suit alteration", "jacket alteration", "shorten jacket sleeves", "blazer alteration Antalya"] },
    ru: { t: "Подгонка костюма и пиджака: рукава, талия | SwapHubs", d: "Подгонка костюмов и пиджаков в Анталье, мужских и женских: укоротить рукава, ушить талию, исправить плечи. ☎ +90 531 898 64 18", kw: ["подгонка костюма", "подгонка пиджака", "укоротить рукава пиджака"] },
    de: { t: "Anzug & Sakko ändern: Ärmel, Taille, Schulter | SwapHubs", d: "Anzug und Sakko ändern in Antalya für Herren und Damen: Ärmel kürzen, Taille enger machen, Schultern anpassen. ☎ +90 531 898 64 18", kw: ["Anzug ändern", "Sakko ändern", "Ärmel kürzen Sakko"] },
  },
  "mont": {
    en: { t: "Coat & Jacket Shortening, Taking In, Zipper Fix | SwapHubs", d: "Coat and jacket alteration in Antalya: shorten, take in, adjust sleeves and replace zippers from ₺300. Free hotel and home pick-up. ☎ +90 531 898 64 18", kw: ["coat alteration", "shorten coat", "jacket zipper replacement Antalya"] },
    ru: { t: "Куртка и пальто: укоротить, ушить, молния | SwapHubs", d: "Подгонка курток и пальто в Анталье: укоротить, ушить, подогнать рукава, заменить молнию от ₺300. Бесплатный забор из отеля и с дома. ☎ +90 531 898 64 18", kw: ["подгонка пальто", "укоротить куртку", "замена молнии на куртке Анталья"] },
    de: { t: "Jacke & Mantel kürzen, Reißverschluss wechseln | SwapHubs", d: "Jacken und Mäntel ändern in Antalya: kürzen, enger machen, Ärmel anpassen, Reißverschluss ab ₺300 wechseln. ☎ +90 531 898 64 18", kw: ["Mantel ändern", "Jacke kürzen", "Reißverschluss Jacke wechseln Antalya"] },
  },
  "gomlek": {
    en: { t: "Shirt Alteration: Take In, Shorten Sleeves | SwapHubs", d: "Shirt alteration in Antalya for men and women: take in the sides, shorten sleeves and length, fix the collar. ☎ +90 531 898 64 18", kw: ["shirt alteration", "take in shirt", "shorten shirt sleeves Antalya"] },
    ru: { t: "Подгонка рубашки: ушить, укоротить рукава | SwapHubs", d: "Подгонка рубашек в Анталье, мужских и женских: ушить по бокам, укоротить рукава и длину, поправить воротник. ☎ +90 531 898 64 18", kw: ["ушить рубашку", "укоротить рукава рубашки", "подгонка рубашки Анталья"] },
    de: { t: "Hemd ändern: enger machen, Ärmel kürzen | SwapHubs", d: "Hemden ändern in Antalya für Herren und Damen: seitlich enger machen, Ärmel und Länge kürzen, Kragen anpassen. ☎ +90 531 898 64 18", kw: ["Hemd enger machen", "Hemd Ärmel kürzen", "Hemd ändern Antalya"] },
  },
  "deri": {
    en: { t: "Leather Jacket & Trouser Repair in Antalya | SwapHubs", d: "Leather jacket and leather trouser repair in Antalya: taking in, zipper replacement and lining repair. ☎ +90 531 898 64 18", kw: ["leather jacket repair", "leather jacket alteration Antalya", "leather trousers tailor"] },
    ru: { t: "Ремонт кожаной куртки и брюк в Анталье | SwapHubs", d: "Ремонт кожаных курток и брюк в Анталье: ушивание, замена молнии и ремонт подкладки. Пришлите фото в WhatsApp — назовём цену. ☎ +90 531 898 64 18", kw: ["ремонт кожаной куртки", "ушить кожаную куртку", "кожаные брюки ателье Анталья"] },
    de: { t: "Lederjacke & Lederhose reparieren in Antalya | SwapHubs", d: "Lederjacke und Lederhose reparieren in Antalya: enger machen, Reißverschluss wechseln, Futter reparieren. ☎ +90 531 898 64 18", kw: ["Lederjacke reparieren", "Lederjacke ändern Antalya", "Lederhose Schneider"] },
  },
  "tisort": {
    en: { t: "T-Shirt & Shorts Alteration, Hemming Antalya | SwapHubs", d: "T-shirt and shorts alteration in Antalya: shorten, take in, sleeve length, waistband fit. ☎ +90 531 898 64 18", kw: ["shorts hemming", "t-shirt alteration", "take in shorts Antalya"] },
    ru: { t: "Футболка и шорты: ушить, подшить, Анталья | SwapHubs", d: "Подгонка футболок и шорт в Анталье: укоротить, ушить, длина рукава, посадка пояса. Быстро и просто, пришлите фото — назовём цену. ☎ +90 531 898 64 18", kw: ["подшить шорты", "ушить футболку", "подгонка шорт Анталья"] },
    de: { t: "T-Shirt & Shorts ändern, kürzen in Antalya | SwapHubs", d: "T-Shirts und Shorts ändern in Antalya: kürzen, enger machen, Ärmellänge, Bund anpassen. ☎ +90 531 898 64 18", kw: ["Shorts kürzen", "T-Shirt enger machen", "Shorts ändern Antalya"] },
  },
  "beden": {
    en: { t: "Resize Clothes to Your Measurements, Antalya | SwapHubs", d: "Lost or gained weight? We resize clothes to your measurements in Antalya: take in or let out, to the length and fit you want. ☎ +90 531 898 64 18", kw: ["resize clothes", "clothes too big alteration", "tailor to measurements Antalya"] },
    ru: { t: "Подгонка одежды по вашим меркам, Анталья | SwapHubs", d: "Похудели или поправились? Подгоним одежду по вашим меркам в Анталье: ушьём или расширим, до нужной длины и посадки. С примеркой. ☎ +90 531 898 64 18", kw: ["подгонка одежды по меркам", "уменьшить размер одежды", "расширить одежду Анталья"] },
    de: { t: "Kleidung auf Ihre Maße ändern lassen, Antalya | SwapHubs", d: "Abgenommen oder zugenommen? Wir ändern Kleidung in Antalya auf Ihre Maße: enger oder weiter machen, auf Wunschlänge und Passform. ☎ +90 531 898 64 18", kw: ["Kleidung auf Maß ändern", "Kleidung enger machen lassen", "Kleidung weiter machen Antalya"] },
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
