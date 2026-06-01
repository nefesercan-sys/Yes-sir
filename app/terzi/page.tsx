import type { Metadata } from 'next';
import TerziClient from './TerziClient';

export const metadata: Metadata = {
  title: 'Antalya Terzi | Paça Kısaltma | Kuru Temizleme | Tailor in Antalya — Belek by Ercan',
  description: 'Antalya terzi Belek by Ercan. Paça kısaltma, tadilat, tamir, daraltma, kuru temizleme, çamaşır yıkama, ütü, kalıp çıkarma, seri imalat. 24-48 saat ekspres. Türkçe, İngilizce, Rusça. ☎ +90 531 898 64 18',
  keywords: [
    // Türkçe — temel
    'antalya terzi','terzi antalya','antalya terzisi',
    // Türkçe — hizmetler
    'paça kısaltma antalya','pantolon kısaltma antalya','elbise daraltma antalya',
    'kıyafet tamir antalya','tadilat antalya','antalya tadilat','fermuar değişimi antalya',
    'kuru temizleme antalya','antalya kuru temizleme','çamaşır yıkama antalya',
    'ütü hizmeti antalya','kalıp çıkarma antalya','model dikimi antalya',
    'seri imalat antalya','antalya konfeksiyon','antalya özel dikim',
    'antalya gelinlik','antalya damatlık','antalya abiye',
    // Türkçe — ilçeler
    'lara terzi','konyaaltı terzi','belek terzi','kemer terzi',
    'alanya terzi','manavgat terzi','side terzi','kepez terzi','muratpaşa terzi',
    // İngilizce
    'tailor antalya','antalya tailor','tailor in antalya turkey',
    'alterations antalya','trouser hemming antalya','dress alteration antalya',
    'dry cleaning antalya','laundry antalya','pattern making antalya',
    'custom clothing antalya','wedding dress antalya','mass production antalya',
    'english speaking tailor antalya','tourist tailor antalya',
    // Rusça
    'портной анталья','анталья портной','пошив анталья','ремонт одежды анталья',
    'химчистка анталья','стирка анталья','пошив по лекалам анталья',
    'серийное производство анталья','свадебное платье анталья',
    // Marka
    'belek by ercan',
  ].join(', '),
  openGraph: {
    title: 'Antalya Terzi | Paça Kısaltma | Kuru Temizleme — Belek by Ercan',
    description: 'Paça kısaltma, tadilat, kuru temizleme, seri imalat. Alterations, dry cleaning, pattern making. Подгонка, химчистка, пошив. +90 531 898 64 18',
    url: 'https://swaphubs.com/terzi',
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antalya Terzi | Paça Kısaltma | Kuru Temizleme — Belek by Ercan',
    description: 'Paça kısaltma, tadilat, kuru temizleme, seri imalat. Antalya. +90 531 898 64 18',
  },
  alternates: {
    canonical: 'https://swaphubs.com/terzi',
    languages: {
      'tr': 'https://swaphubs.com/terzi',
      'en': 'https://swaphubs.com/terzi',
      'ru': 'https://swaphubs.com/terzi',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function TerziPage() {
  return <TerziClient />;
}
