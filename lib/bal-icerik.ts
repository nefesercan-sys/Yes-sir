// Ürün metinleri: slug'a göre sade, sağlık beyanı içermeyen açıklamalar.
// Veritabanında eski metin kalmış olsa bile sayfada bu metinler gösterilir.
export const BAL_WA_VARSAYILAN = '905345104458';

type Metin = { aciklama: string; icerik: string[] };

export const BAL_METIN: Record<string, Metin> = {
  'sivas-yayla-bali-500g': {
    aciklama:
      "Sivas yaylalarından, katkısız yayla balı. Dağ kekiği, nane, adaçayı ve kantaron gibi yayla bitkilerinden toplanan nektardan üretilir.",
    icerik: ['Dağ Kekiği', 'Nane', 'Adaçayı', 'Kantaron', 'Yayla Bitkileri'],
  },
  'sivas-yayla-bali-1kg': {
    aciklama:
      'Aynı yayla balının 1 kg boyu. Ailece tüketim için uygundur. Rezervasyonla sezon başında taze olarak gönderilir.',
    icerik: ['Dağ Kekiği', 'Nane', 'Adaçayı', 'Kantaron', 'Yayla Bitkileri'],
  },
  'kekik-bali-500g': {
    aciklama:
      'Sivas dağlarındaki kekik bitkilerinden toplanan nektardan elde edilir. Kendine özgü aromatik kokusu ve koyu altın rengiyle öne çıkar.',
    icerik: ['Dağ Kekiği', 'Yabani Kekik'],
  },
  'mese-bali-500g': {
    aciklama:
      'Meşe ormanlarından toplanan salgı balı. Koyu rengi ve yoğun kıvamıyla diğer ballardan ayrışır.',
    icerik: ['Meşe Özü', 'Orman Salgısı'],
  },
  'cicek-poleni-250g': {
    aciklama:
      'Arıların dağ çiçeklerinden topladığı taze çiçek poleni. Bal ile karıştırılarak ya da doğrudan tüketilebilir.',
    icerik: ['Çiçek Poleni', 'Taze', 'Doğal'],
  },
  'ham-propolis-50g': {
    aciklama:
      'Arıların kovanda kullandığı doğal reçinemsi madde. İşlenmemiş, katkısız ham haliyle, kovandan çıktığı gibi.',
    icerik: ['Ham Reçine', 'Bal Mumu', 'Katkısız'],
  },
  'karisik-koy-seti': {
    aciklama:
      "Arım Balım Çiçeğim'in üçlüsü bir arada: 500 g yayla balı, 250 g çiçek poleni ve 50 g ham propolis. Hediye paketiyle.",
    icerik: ['500g Yayla Balı', '250g Çiçek Poleni', '50g Ham Propolis', 'Hediye Paketi'],
  },
  'kusburnu-kuru-100g': {
    aciklama:
      'Sivas dağlarından elle toplanan yabani kuşburnu. Çay olarak demlenebilir ya da bal ile karıştırılabilir. Katkısız, doğal kurutma.',
    icerik: ['Elle Toplama', 'Doğal Kurutma', 'Katkısız'],
  },
  'dag-kekigi-kuru-100g': {
    aciklama:
      'Sivas yaylalarından elle toplanan yabani dağ kekiği. Kekik çayı ve yemeklerde kullanılır. Aromatik kokusuyla öne çıkar.',
    icerik: ['Elle Toplama', 'Doğal Kurutma'],
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function balMetinUygula<T extends Record<string, any>>(urun: T): T {
  const m = BAL_METIN[urun?.slug];
  return m ? { ...urun, aciklama: m.aciklama, icerik: m.icerik } : urun;
}

export const SSS: [string, string][] = [
  ['Nasıl sipariş verebilirim?', 'Ürün kartındaki "Satın Al" veya WhatsApp düğmesiyle bize yazın; ürün, adet ve teslimat bilgilerini birlikte netleştirelim.'],
  ['Kargo yapıyor musunuz?', '81 ile kargo gönderimi yapıyoruz. Teslimat ayrıntıları için WhatsApp üzerinden bize yazabilirsiniz.'],
  ['Bal neden kristalleşir?', 'Bal zamanla kristalleşebilir; bu doğal bir durumdur. Kavanozu ılık suda bekleterek tekrar akışkan hale getirebilirsiniz.'],
];

