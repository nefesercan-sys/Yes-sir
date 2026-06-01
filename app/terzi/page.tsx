import type { Metadata } from 'next';
import TerziClient from './TerziClient';

// Antalya'nın tüm ilçe ve mahalleleri — SEO anahtar kelime zenginleştirmesi
const ANTALYA_SEO = [
  // Muratpaşa
  'muratpaşa terzi','fener terzi','kışla terzi','sinan mahallesi terzi',
  'güzeloba terzi','balbey terzi','kaleiçi terzi','haşimişcan terzi',
  'yenigün terzi','meltem terzi','çağlayan terzi','uncalı terzi',
  'bahçelievler terzi','ermenek terzi','özgürlük terzi','soğuksu terzi',
  'yüksekalan terzi','karaalioğlu terzi','selçuk mahallesi terzi','doğuyaka terzi',
  // Konyaaltı
  'konyaaltı terzi','hurma terzi','sarısu terzi','liman terzi',
  'arapsuyu terzi','gürsu terzi','kızıltoprak terzi','çakırlar terzi',
  'altınkum terzi','camikebir terzi',
  // Kepez
  'kepez terzi','varsak terzi','santral terzi','yavuz selim terzi',
  'pınarbaşı terzi','altındağ terzi','göksu terzi','şafak terzi',
  'göçerler terzi','atatürk mahallesi terzi','duraliler terzi',
  'yeşilbayır terzi','karabağ terzi','doyran terzi','emek terzi',
  'teomanpaşa terzi','yıldırım terzi',
  // Aksu
  'aksu terzi','boğazkent terzi','belek terzi','kadriye terzi','gebiz terzi',
  // Döşemealtı
  'döşemealtı terzi','habibler terzi','yağca terzi',
  // Serik
  'serik terzi','taşağıl terzi',
  // Alanya
  'alanya terzi','mahmutlar terzi','oba terzi','tosmur terzi',
  'avsallar terzi','kestel terzi','türkler terzi','konaklı terzi',
  'cikcilli terzi','okurcalar terzi','kargıcak terzi',
  // Manavgat
  'manavgat terzi','side terzi','sorgun terzi','kumköy terzi',
  'evrenseki terzi','gündoğdu terzi','çolaklı terzi',
  // Kemer
  'kemer terzi','beldibi terzi','göynük terzi','çamyuva terzi',
  'tekirova terzi','arslanbucak terzi','kiriş terzi',
  // Kaş
  'kaş terzi','kalkan terzi',
  // Finike
  'finike terzi','turunçova terzi',
  // Kumluca
  'kumluca terzi','mavikent terzi',
  // Elmalı
  'elmalı terzi',
  // Korkuteli
  'korkuteli terzi',
  // Diğer
  'gündoğmuş terzi','ibradı terzi','akseki terzi',
  // Lara — özel
  'lara terzi','lara beach terzi','lara otel terzi',
].join(', ');

const ALMANCA_ILCE = [
  'schneider konyaalti','schneider lara antalya','schneider belek antalya',
  'schneider kemer antalya','schneider alanya','schneider manavgat',
  'schneider kepez antalya','schneider muratpasa antalya',
].join(', ');

const RUSCA_ILCE = [
  'портной коньяалты','портной лара анталья','портной белек',
  'портной кемер','портной аланья','портной манавгат',
  'портной сиде','химчистка коньяалты','химчистка лара анталья',
].join(', ');

const INGILIZCE_ILCE = [
  'tailor konyaalti','tailor lara antalya','tailor belek antalya',
  'tailor kemer antalya','tailor alanya','tailor manavgat',
  'tailor side turkey','dry cleaning konyaalti','dry cleaning lara antalya',
  'ironing service konyaalti','ironing service lara',
].join(', ');

export const metadata: Metadata = {
  title: 'Antalya Terzi Can | Konyaaltı Terzi | Ütü · Dikim · Tamir · Tadilat — Belek by Ercan',
  description: 'Konyaaltı ve tüm Antalya ilçe ve mahallelerinde terzi Can hizmetinizde. Ütü, dikim, tamir, tadilat, paça kısaltma, kuru temizleme, çamaşır yıkama, seri imalat. 24-48 saat ekspres. TR · EN · DE · RU ☎ +90 531 898 64 18',
  keywords: [
    // ── TÜRKÇE TEMEL ──
    'antalya terzi','terzi antalya','konyaaltı terzi','terzi konyaaltı',
    'antalya terzi can','konyaaltı terzi can','can terzi antalya',
    // ── HİZMETLER TR ──
    'ütü hizmeti antalya','ütü hizmeti konyaaltı','kıyafet ütüleme antalya',
    'kıyafet dikimi antalya','elbise dikimi antalya','pantolon dikimi antalya',
    'kıyafet tamiri antalya','giysi tamiri antalya','kıyafet onarımı antalya',
    'tadilat antalya','kıyafet tadilat antalya','elbise tadilat antalya',
    'paça kısaltma antalya','paça kısaltma konyaaltı','pantolon kısaltma antalya',
    'elbise daraltma antalya','elbise genişletme antalya','bel alma antalya',
    'fermuar değişimi antalya','fermuar tamiri antalya',
    'kuru temizleme antalya','kuru temizleme konyaaltı',
    'çamaşır yıkama antalya','antalya çamaşır yıkama',
    'kalıp çıkarma antalya','model dikimi antalya',
    'seri imalat antalya','toptan kıyafet üretimi antalya',
    'gelinlik dikimi antalya','gelinlik tadilat antalya',
    'damatlık dikimi antalya','abiye dikimi antalya',
    'takım elbise dikimi antalya','gömlek dikimi antalya',
    'belek by ercan','antalya en iyi terzi',
    // ── TÜM İLÇE VE MAHALLELER ──
    ANTALYA_SEO,
    // ── İNGİLİZCE ──
    'tailor antalya','antalya tailor','tailor in antalya turkey',
    'tailor can antalya','ironing service antalya','laundry antalya',
    'dry cleaning antalya','clothing alterations antalya',
    'trouser hemming antalya','dress repair antalya',
    'custom clothing antalya','wedding dress antalya',
    'pattern making antalya','mass production antalya',
    'english speaking tailor antalya','tourist tailor antalya',
    'express tailor antalya','same day tailor antalya',
    INGILIZCE_ILCE,
    // ── ALMANCA ──
    'schneider antalya','schneider can antalya',
    'änderungsschneiderei antalya','kleidung ändern antalya',
    'hose kürzen antalya','bügeln antalya','wäsche antalya',
    'reinigung antalya','maßanfertigung antalya',
    'brautkleid antalya','anzug schneidern antalya',
    'deutsch sprechender schneider antalya',
    ALMANCA_ILCE,
    // ── RUSÇA ──
    'портной анталья','портной кан анталья','ателье анталья',
    'ремонт одежды анталья','подгонка одежды анталья',
    'укорочение брюк анталья','глажка анталья',
    'стирка анталья','химчистка анталья',
    'пошив одежды анталья','пошив на заказ анталья',
    'свадебное платье анталья','пошив по лекалам анталья',
    'серийное производство анталья',
    'портной для туристов анталья',
    RUSCA_ILCE,
  ].join(', '),

  openGraph: {
    title: 'Antalya & Konyaaltı Terzi Can | Ütü · Dikim · Tamir · Tadilat — Belek by Ercan',
    description: 'Konyaaltı, Lara, Belek, Kemer, Alanya ve tüm Antalya ilçelerinde terzi Can. Ütü, dikim, tamir, tadilat, kuru temizleme, seri imalat. Tailor Can — alterations, ironing, dry cleaning. Schneider Can — Bügeln, Änderungen. Портной Кан — ремонт, глажка, химчистка. ☎ +90 531 898 64 18',
    url: 'https://swaphubs.com/terzi',
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Antalya Terzi Can | Konyaaltı · Tüm İlçeler · Ütü · Dikim · Tamir',
    description: 'Konyaaltı ve tüm Antalya ilçelerinde terzi Can. TR · EN · DE · RU ☎ +90 531 898 64 18',
  },

  alternates: {
    canonical: 'https://swaphubs.com/terzi',
    languages: {
      'tr': 'https://swaphubs.com/terzi',
      'en': 'https://swaphubs.com/terzi',
      'ru': 'https://swaphubs.com/terzi',
      'de': 'https://swaphubs.com/terzi',
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
