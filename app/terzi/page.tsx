import type { Metadata } from 'next';
import TerziClient from './TerziClient';

export const metadata: Metadata = {
  title: 'Antalya Terzi | Tailor in Antalya | Портной в Анталье — Belek by Ercan',
  description: 'Antalya\'nın en iyi terzisi Belek by Ercan. Özel dikim, tadilat, gelinlik, damatlık. Turistlere 24-48 saat ekspres hizmet. Türkçe, İngilizce, Rusça. ☎ +90 531 898 64 18',
  keywords: [
    'antalya terzi','terzi antalya','antalya terzisi','antalya özel dikim',
    'antalya tadilat','antalya gelinlik','antalya damatlık',
    'tailor antalya','antalya tailor','tailor in antalya turkey',
    'alteration antalya','wedding dress antalya','custom clothing antalya',
    'портной анталья','анталья портной','пошив анталья','ремонт одежды анталья',
    'свадебное платье анталья','портной в анталье',
    'lara terzi','konyaaltı terzi','belek terzi','kemer terzi',
    'belek by ercan','antalya tourist tailor',
  ].join(', '),
  openGraph: {
    title: 'Antalya Terzi | Tailor in Antalya | Портной в Анталье',
    description: 'Özel dikim, tadilat, gelinlik. Custom tailoring, alterations. Пошив, ремонт. +90 531 898 64 18',
    url: 'https://swaphubs.com/terzi',
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antalya Terzi | Tailor in Antalya | Портной в Анталье',
    description: 'Özel dikim & tadilat. Custom tailoring. Пошив & ремонт. Antalya.',
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
