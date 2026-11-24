// ============================================================
// lib/terzi-hizmet-listesi.ts — bölge sayfalarındaki "Antalya'da terzi hizmetlerimiz" bölümü (10 dil)
// Sahibin isteği (24 Kasım 2026): bölge sayfalarında her dilde bu işler öne çıksın.
// Kurallar: kuru temizleme/ütü yok; gelinlikte yalnız tadilat; dikimde sabit fiyat yok.
// Model revizyonu: eski bir kıyafetin modelini değiştirmek (yaka, kol, boy vb.).
// ============================================================
export type HLang = 'tr' | 'en' | 'ru' | 'de' | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';

/** Her madde: [metin, bağlanacak hizmet kimliği (lib/seo-data.ts SERVICES) ya da null]. */
export type HItem = [string, string | null];

export const HIZMET_IDS: (string | null)[] = [
  null, 'elbise-dikim', 'kiyafet-tamiri', 'elbise-tamir', 'beden', 'paca', 'bel', 'fermuar', 'kot', 'mont', 'abiye', null, 'ozel-dikim',
];

export const HIZMET_LISTESI: Record<HLang, { h: string; intro: string; items: string[]; note: string }> = {
  tr: {
    h: "Antalya'da terzi hizmetlerimiz",
    intro: "Hurma, Konyaaltı'ndaki atölyemizde kadın ve erkek kıyafetleri için:",
    items: ['Bay bayan terzi', 'Elbise dikimi', 'Kıyafet tamiri ve tadilatı', 'Giysi onarımı', 'Beden ayarlama', 'Paça ve boy kısaltma', 'Bel daraltma', 'Fermuar değişimi', 'Kot pantolon paçası kısaltma', 'Mont fermuarı değişimi ve tamiri', 'Abiye elbise tadilatı', 'Model revizyonu (kıyafetin modelini yenileme)', 'Özel dikim atölyesi'],
    note: 'Gelinlikte yalnızca tadilat yapılır.',
  },
  en: {
    h: 'Our tailoring services in Antalya',
    intro: "At our workshop in Hurma, Konyaaltı, for women's and men's clothing:",
    items: ["Men's and women's tailor", 'Dressmaking', 'Clothing repairs and alterations', 'Garment mending', 'Resizing (taking in and letting out)', 'Trouser hemming and length shortening', 'Waist taking-in', 'Zipper replacement', 'Jeans hemming', 'Jacket and coat zipper replacement and repair', 'Evening dress alterations', 'Restyling (changing the design of a garment)', 'Made-to-measure tailoring workshop'],
    note: 'Wedding dresses: alterations only.',
  },
  ru: {
    h: 'Услуги ателье в Анталии',
    intro: 'В нашей мастерской в Хурме (Коньяалты) — для женской и мужской одежды:',
    items: ['Портной для мужчин и женщин', 'Пошив платьев', 'Ремонт и подгонка одежды', 'Починка одежды', 'Подгонка по размеру (ушить, расшить)', 'Подшив брюк и укорачивание длины', 'Ушить в талии', 'Замена молнии', 'Подшив джинсов', 'Замена и ремонт молнии на куртке и пальто', 'Подгонка вечерних платьев', 'Переделка модели (обновление фасона)', 'Ателье индивидуального пошива'],
    note: 'Свадебные платья: только подгонка.',
  },
  de: {
    h: 'Unsere Schneiderleistungen in Antalya',
    intro: 'In unserer Werkstatt in Hurma, Konyaaltı – für Damen- und Herrenkleidung:',
    items: ['Schneider für Damen und Herren', 'Kleider nähen lassen', 'Kleidung ändern und reparieren', 'Kleidung flicken', 'Größe anpassen (enger und weiter machen)', 'Hose kürzen und Länge ändern', 'Taille enger machen', 'Reißverschluss wechseln', 'Jeans kürzen', 'Reißverschluss an Jacke und Mantel wechseln und reparieren', 'Abendkleid ändern', 'Umarbeitung (Modell eines Kleidungsstücks ändern)', 'Maßschneiderei-Werkstatt'],
    note: 'Brautkleider: nur Änderungen.',
  },
  es: {
    h: 'Nuestros servicios de sastrería en Antalya',
    intro: 'En nuestro taller de Hurma, Konyaaltı, para ropa de mujer y de hombre:',
    items: ['Sastre para hombre y mujer', 'Confección de vestidos', 'Arreglos y reparación de ropa', 'Remiendos de prendas', 'Ajuste de talla (estrechar y ensanchar)', 'Acortar bajos y largo', 'Estrechar cintura', 'Cambio de cremallera', 'Acortar bajos de vaqueros', 'Cambio y reparación de cremallera de chaqueta y abrigo', 'Arreglos de vestidos de fiesta', 'Transformación de prendas (cambio de modelo)', 'Taller de confección a medida'],
    note: 'Vestidos de novia: solo arreglos.',
  },
  fr: {
    h: 'Nos services de couture à Antalya',
    intro: 'Dans notre atelier de Hurma, Konyaaltı, pour vêtements femme et homme :',
    items: ['Couturier homme et femme', 'Confection de robes', 'Retouches et réparation de vêtements', 'Raccommodage', 'Ajustement de taille (reprendre, élargir)', 'Ourlet de pantalon et raccourcissement', 'Reprise de taille', 'Changement de fermeture éclair', 'Ourlet de jean', 'Changement et réparation de fermeture de veste et manteau', 'Retouche de robe de soirée', 'Transformation de vêtement (changement de modèle)', 'Atelier de couture sur mesure'],
    note: 'Robes de mariée : retouches uniquement.',
  },
  pl: {
    h: 'Nasze usługi krawieckie w Antalyi',
    intro: 'W naszej pracowni w Hurma, Konyaaltı – dla odzieży damskiej i męskiej:',
    items: ['Krawiec damski i męski', 'Szycie sukienek', 'Przeróbki i naprawa odzieży', 'Cerowanie i łatanie', 'Dopasowanie rozmiaru (zwężanie, poszerzanie)', 'Skracanie nogawek i długości', 'Zwężanie w pasie', 'Wymiana zamka', 'Skracanie jeansów', 'Wymiana i naprawa zamka w kurtce i płaszczu', 'Przeróbki sukni wieczorowych', 'Przeróbka fasonu (zmiana modelu)', 'Pracownia szycia na miarę'],
    note: 'Suknie ślubne: tylko przeróbki.',
  },
  uk: {
    h: 'Наші кравецькі послуги в Анталії',
    intro: 'У нашій майстерні в Хурмі (Коньяалти) — для жіночого та чоловічого одягу:',
    items: ['Кравець для чоловіків і жінок', 'Пошиття суконь', 'Ремонт і підгонка одягу', 'Лагодження одягу', 'Підгонка за розміром (звузити, розширити)', 'Підшивання штанів і вкорочення довжини', 'Звуження в талії', 'Заміна блискавки', 'Підшивання джинсів', 'Заміна та ремонт блискавки на куртці й пальті', 'Підгонка вечірніх суконь', 'Переробка моделі (оновлення фасону)', 'Ательє індивідуального пошиття'],
    note: 'Весільні сукні: лише підгонка.',
  },
  nl: {
    h: 'Onze kleermakersdiensten in Antalya',
    intro: 'In ons atelier in Hurma, Konyaaltı, voor dames- en herenkleding:',
    items: ['Kleermaker voor dames en heren', 'Jurken op maat laten maken', 'Kleding vermaken en repareren', 'Kledingreparatie', 'Maat aanpassen (innemen en uitleggen)', 'Broek inkorten en lengte aanpassen', 'Taille innemen', 'Rits vervangen', 'Jeans inkorten', 'Rits van jas en jack vervangen en repareren', 'Avondjurk vermaken', 'Kleding restylen (model veranderen)', 'Maatwerkatelier'],
    note: 'Trouwjurken: alleen vermaken.',
  },
  ar: {
    h: 'خدمات الخياطة لدينا في أنطاليا',
    intro: 'في ورشتنا في حي هورما، كونيالتي، للملابس النسائية والرجالية:',
    items: ['خياط رجالي ونسائي', 'تفصيل الفساتين', 'إصلاح الملابس وتعديلها', 'ترقيع الملابس', 'ضبط المقاس (تضييق وتوسيع)', 'تقصير البنطال والطول', 'تضييق الخصر', 'تبديل السحّاب', 'تقصير الجينز', 'تبديل سحّاب الجاكيت والمعطف وإصلاحه', 'تعديل فساتين السهرة', 'تجديد الموديل (تغيير تصميم القطعة)', 'ورشة خياطة حسب المقاس'],
    note: 'فساتين الزفاف: تعديل فقط.',
  },
};
