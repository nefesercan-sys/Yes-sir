import OnlineTerziClient from './OnlineTerziClient';

export const metadata = {
  title: 'Online Terzi & Özel Dikim Tekstil Atölyesi | SwapHubs E-Terzi',
  description: 'Türkiye\'nin en güvenilir dijital e-terzi platformu. Evinizden çıkmadan kendi ölçülerinize göre %100 organik müslin ve keten kıyafet siparişi verin. Kadın, erkek, bebek ve anne-bebek kombinleri.',
  keywords: [
    'online terzi', 'e-terzi hizmeti', 'özel dikim elbise', 'müslin elbise modelleri', 'kıyafet tadilatı',
    'online tekstil atölyesi', 'kadın müslin takım', 'bebek müslin tulum', 'anne bebek kombini',
    'fason tekstil üretimi', 'güvenilir terzi', 'antalya online terzi', 'kendi ölçünle sipariş'
  ].join(', '),
  alternates: {
    canonical: 'https://swaphubs.com/online-terzi-hizmeti',
  },
  robots: 'index, follow',
};

export default function Page() {
  return <OnlineTerziClient />;
}
