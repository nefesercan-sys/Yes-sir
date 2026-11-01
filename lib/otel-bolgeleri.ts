// ============================================================
// SwapHubs — lib/otel-bolgeleri.ts
// Belek / Lara / Güzeloba / Kemer / Side otel bölgeleri — EN/RU/DE
// otele gelen terzi sayfaları için ortak veri.
// ============================================================

// NOT: hotels listeleri bölgedeki örnek otel adlarıdır; ortaklık/anlaşma iddiası DEĞİLDİR.
// Her otel yalnızca bulunduğu bölgede listelenir. Mesafe/dakika yazılmaz (sitenin kuralı).
export type OtelBolgesi = {
  slug: string;
  name: string;
  hotels: string[];
  blurb: { en: string; ru: string; de: string };
};

export const OTEL_BOLGELERI: OtelBolgesi[] = [
  {
    slug: 'belek',
    name: 'Belek',
    hotels: [
      'Regnum Carya', 'Rixos Premium Belek', 'Maxx Royal Belek', 'Kaya Palazzo Golf Resort',
      'Gloria Golf Resort', 'Calista Luxury Resort', 'Cornelia Diamond Golf Resort', 'Susesi Luxury Resort',
      'Adam & Eve Hotel', 'TUI Magic Life Belek', 'Ela Quality Resort', 'Papillon Zeugma', 'Voyage Belek', 'Xanadu Resort', 'Belconti Resort',
    ],
    blurb: {
      en: 'Belek is Antalya\'s golf and 5-star hotel district, home to some of the region\'s most exclusive resorts.',
      ru: 'Белек — район гольф-курортов и 5-звёздочных отелей Антальи, один из самых престижных курортных районов региона.',
      de: 'Belek ist der Golf- und 5-Sterne-Hotelbezirk von Antalya, mit einigen der exklusivsten Resorts der Region.',
    },
  },
  {
    slug: 'lara',
    name: 'Lara',
    hotels: [
      'Titanic Mardan Palace', 'Delphin Diva Premiere', 'Delphin BE Grand Resort', 'Fame Residence Lara',
      'Akra Hotel', 'Lara Barut Collection', 'Concorde De Luxe Resort', 'Limak Atlantis', 'Kervansaray Lara',
      'IC Hotels Santai', 'Royal Wings Hotel',
    ],
    blurb: {
      en: 'Lara is Antalya\'s closest major beach-hotel district to the city centre, with a long sandy coastline.',
      ru: 'Лара — ближайший к центру Антальи крупный пляжный отельный район с длинной песчаной береговой линией.',
      de: 'Lara ist der stadtnächste große Strand-Hotelbezirk von Antalya mit einer langen Sandküste.',
    },
  },
  {
    slug: 'guzeloba',
    name: 'Güzeloba',
    hotels: [
      'Sherwood Exclusive Lara', 'Sherwood Breezes Resort', 'Delphin Imperial',
      'Adalya Elite Lara', 'Aydinbey Famous Resort',
    ],
    blurb: {
      en: 'Güzeloba, part of the greater Lara area, is a quieter beachfront hotel district just east of central Lara.',
      ru: 'Гюзельоба, часть района Лара, — более тихий пляжный отельный район чуть восточнее центра Лары.',
      de: 'Güzeloba, Teil des größeren Lara-Gebiets, ist ein ruhigerer Strand-Hotelbezirk östlich des Zentrums von Lara.',
    },
  },
  {
    slug: 'side',
    name: 'Side',
    hotels: [
      'Crystal Sunset Luxury Resort', 'Papillon Ayscha Resort', 'TUI Sensatori Side', 'Barut Hotels Side',
      'Kamelya Collection', 'Nashira Resort', 'Xanthe Resort & Spa',
      'Side Star Resort', 'Defne Defnem Beach Hotel',
    ],
    blurb: {
      en: 'Side is a historic resort town with ancient ruins alongside a large concentration of beach hotels, near Manavgat.',
      ru: 'Сиде — исторический курортный город с античными руинами и большой концентрацией пляжных отелей, рядом с Манавгатом.',
      de: 'Side ist eine historische Kurstadt mit antiken Ruinen und einer großen Konzentration an Strandhotels, nahe Manavgat.',
    },
  },
  {
    slug: 'kemer',
    name: 'Kemer',
    hotels: [
      'Rixos Sungate', 'Club Med Kemer', 'Alva Donna Beach Resort', 'Amara Dolce Vita Luxury',
      'Kilikya Palace Göynük', 'Sentido Zeynep Resort', 'Fantasia Hotel De Luxe Kemer',
      'Club Turan Prince World', 'Simena Holiday Village',
    ],
    blurb: {
      en: 'Kemer is a coastal Antalya town where the Taurus Mountains meet the sea, known for its marina and resort hotels.',
      ru: 'Кемер — прибрежный город Антальи, где горы Тавр встречаются с морем, известный своей мариной и курортными отелями.',
      de: 'Kemer ist eine Küstenstadt bei Antalya, wo das Taurus-Gebirge auf das Meer trifft, bekannt für seine Marina und Resort-Hotels.',
    },
  },
  {
    slug: 'kundu',
    name: 'Kundu',
    hotels: [],
    blurb: {
      en: 'Kundu (Aksu) lies just east of Lara and is a hotel district with many 5-star all-inclusive resorts.',
      ru: 'Кунду (Аксу) находится сразу к востоку от Лары — отельный район с множеством 5-звёздочных курортов «всё включено».',
      de: 'Kundu (Aksu) liegt direkt östlich von Lara und ist ein Hotelbezirk mit vielen 5-Sterne-All-inclusive-Resorts.',
    },
  },
  {
    slug: 'muratpasa',
    name: 'Muratpaşa',
    hotels: [],
    blurb: {
      en: 'Muratpaşa is the central district of Antalya: Kaleiçi, hotels in the city centre and part of the Lara area.',
      ru: 'Муратпаша — центральный район Антальи: Калеичи, отели в центре города и часть района Лара.',
      de: 'Muratpaşa ist der zentrale Bezirk von Antalya: Kaleiçi, Hotels im Stadtzentrum und ein Teil des Lara-Gebiets.',
    },
  },
  {
    slug: 'goynuk',
    name: 'Göynük',
    hotels: [],
    blurb: {
      en: 'Göynük lies just north of Kemer: a quieter row of seaside hotels near the Göynük Canyon.',
      ru: 'Гёйнюк находится к северу от Кемера: более тихая полоса отелей у моря рядом с каньоном Гёйнюк.',
      de: 'Göynük liegt nördlich von Kemer: eine ruhigere Hotelreihe am Meer, nahe dem Göynük-Canyon.',
    },
  },
];

export function bulOtelBolgesi(slug: string) {
  return OTEL_BOLGELERI.find((b) => b.slug === slug);
}
