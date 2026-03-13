export interface Country {
  code: string;
  name: string;
  flag: string;
  phone: string;
  cities?: string[];
}

export const COUNTRIES: Country[] = [
  {
    code: 'TR', name: 'Türkiye', flag: '🇹🇷', phone: '+90',
    cities: [
      'Adana','Adıyaman','Afyonkarahisar','Ağrı','Amasya','Ankara','Antalya',
      'Artvin','Aydın','Balıkesir','Bilecik','Bingöl','Bitlis','Bolu',
      'Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır',
      'Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun',
      'Gümüşhane','Hakkari','Hatay','Isparta','Mersin','İstanbul','İzmir',
      'Kars','Kastamonu','Kayseri','Kırklareli','Kırşehir','Kocaeli','Konya',
      'Kütahya','Malatya','Manisa','Kahramanmaraş','Mardin','Muğla','Muş',
      'Nevşehir','Niğde','Ordu','Rize','Sakarya','Samsun','Siirt','Sinop',
      'Sivas','Tekirdağ','Tokat','Trabzon','Tunceli','Şanlıurfa','Uşak',
      'Van','Yozgat','Zonguldak','Aksaray','Bayburt','Karaman','Kırıkkale',
      'Batman','Şırnak','Bartın','Ardahan','Iğdır','Yalova','Karabük',
      'Kilis','Osmaniye','Düzce'
    ]
  },
  {
    code: 'DE', name: 'Almanya', flag: '🇩🇪', phone: '+49',
    cities: ['Berlin','Hamburg','Münih','Köln','Frankfurt','Stuttgart','Düsseldorf','Dortmund','Essen','Leipzig','Bremen','Dresden','Hannover','Nürnberg','Duisburg']
  },
  {
    code: 'US', name: 'Amerika Birleşik Devletleri', flag: '🇺🇸', phone: '+1',
    cities: ['New York','Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Antonio','San Diego','Dallas','San Jose','Austin','Jacksonville','Fort Worth','Columbus','Charlotte']
  },
  {
    code: 'GB', name: 'İngiltere', flag: '🇬🇧', phone: '+44',
    cities: ['Londra','Manchester','Birmingham','Leeds','Glasgow','Sheffield','Edinburgh','Liverpool','Bristol','Cardiff','Leicester','Coventry','Nottingham','Newcastle','Southampton']
  },
  {
    code: 'FR', name: 'Fransa', flag: '🇫🇷', phone: '+33',
    cities: ['Paris','Marsilya','Lyon','Toulouse','Nice','Nantes','Strasbourg','Montpellier','Bordeaux','Lille','Rennes','Reims','Saint-Étienne','Toulon','Grenoble']
  },
  {
    code: 'IT', name: 'İtalya', flag: '🇮🇹', phone: '+39',
    cities: ['Roma','Milano','Napoli','Torino','Palermo','Cenova','Bologna','Floransa','Bari','Catania','Venedik','Verona','Messina','Padova','Trieste']
  },
  {
    code: 'ES', name: 'İspanya', flag: '🇪🇸', phone: '+34',
    cities: ['Madrid','Barselona','Valencia','Sevilla','Zaragoza','Malaga','Murcia','Palma','Las Palmas','Bilbao','Alicante','Córdoba','Valladolid','Vigo','Gijón']
  }
];

// Ülke koduna göre şehirleri döndüren fonksiyon
export function getCitiesForCountry(code: string): string[] {
  const country = COUNTRIES.find((c) => c.code === code);
  return country?.cities || [];
}
