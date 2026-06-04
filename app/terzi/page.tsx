import type { Metadata } from 'next';
import TerziClient from './TerziClient';

// Antalya'nın tüm ilçe ve mahalleleri — SEO anahtar kelime zenginleştirmesi
const ANTALYA_SEO = [
  // ── TÜRKÇE: GENEL TERZİ ──────────────────────────────────────────────
  'Antalya Terzi', 'Terzi Antalya', 'En İyi Terzi Antalya', 'Usta Terzi Antalya',
  'Terzi Fiyatları Antalya', 'Terzi Servisi Antalya', 'Araçlı Terzi Antalya',
  'Terzi Atölyesi Antalya', 'Dikim Atölyesi Antalya', 'Online Terzi Antalya',
  'Ölçüye Dikim Antalya', 'Özel Dikim Antalya', 'Hızlı Terzi Antalya',
  'Ekspres Terzi Antalya', '24 Saat Terzi Antalya', 'Ucuz Terzi Antalya',
  'Yakın Terzi Antalya', 'Antalya Terzi Nerede', 'Antalya Dikim',
  
  // ── TÜRKÇE: ADRESTEN ALIM / MOBİL / ONLİNE KONSEPT ───────────────────
  'Adresten Alım Terzi Antalya', 'Kapıdan Kapıya Terzi Servisi', 'Evden Alınan Terzi Hizmeti',
  'Motorlu Terzi Kurye Antalya', 'Online Terzi Siparişi Antalya', 'Evde Ölçü Alan Terzi Antalya',
  'İş Yerine Gelen Terzi Antalya', 'Kıyafetimi Evden Alan Terzi', 'Adrese Teslim Ütü ve Terzi',
  'Kuryeli Terzi Hizmeti Antalya', 'Evden Terzi Çağırma Antalya', 'Mobil Terzi Uygulaması',

  // ── TÜRKÇE: PAÇA / PANTOLON ──────────────────────────────────────────
  'Paça Kısaltma Antalya', 'Paça Dikimi Antalya', 'Paça Fiyatı Antalya',
  'Pantolon Kısaltma Antalya', 'Pantolon Tadilat Antalya', 'Pantolon Daraltma Antalya',
  'Pantolon Dikimi Antalya', 'Pantolon Bel Alma Antalya', 'Pantolon Genişletme Antalya',
  'Kot Pantolon Tadilat Antalya', 'Palazzo Pantolon Dikimi', 'Palazzo Kısaltma',
  'Paça Kısaltma Fiyatı', 'Paça Kısaltma Kaç Lira',

  // ── TÜRKÇE: TADİLAT / TAMİR & FERMUAR DETAY ─────────────────────────
  'Kıyafet Tadilat Antalya', 'Elbise Tadilat Antalya', 'Kıyafet Tamir Antalya',
  'Elbise Tamir Antalya', 'Kıyafet Onarım Antalya', 'Fermuar Değişimi Antalya',
  'Fermuar Takma Antalya', 'Yırtık Onarımı Antalya', 'Dikiş Tamiri Antalya',
  'Düğme Dikimi Antalya', 'Yaka Değişimi Antalya', 'Astar Değişimi Antalya',
  'Cep Tamiri Antalya', 'Kol Kısaltma Antalya', 'Etek Kısaltma Antalya',
  'Fermuar Tamiri Antalya', 'Kot Fermuarı Değişimi', 'Pantolon Fermuarı Antalya',
  'Mont Fermuarı Değişimi Antalya', 'Ceket Fermuarı Tamiri', 'Elbise Fermuarı Değişimi',
  'Sweatshirt Fermuarı Değişimi', 'Çanta Fermuarı Tamiri', 'Etek Tamiri Antalya',
  'Abiye Tamiri Antalya', 'Abiye Tadilatı Antalya', 'Her Türlü Kıyafet Tamiri',

  // ── TÜRKÇE: DARALTMA / KÜÇÜLTME ─────────────────────────────────────
  'Elbise Daraltma Antalya', 'Kıyafet Daraltma Antalya', 'Beden Küçültme Antalya',
  'Beden Seti Çıkarma Antalya', 'Daraltma Fiyatı Antalya', 'Daraltma Antalya',
  'Kıyafet Beden Küçültme', 'Elbise Beden Düşürme Antalya',
  'Gömlek Daraltma Antalya', 'Ceket Daraltma Antalya', 'Elbise Bel Alma Antalya',

  // ── TÜRKÇE: ERKEK TERZİ ─────────────────────────────────────────────
  'Erkek Terzi Antalya', 'Antalya Erkek Terzi', 'Erkek Takım Elbise Antalya',
  'Takım Elbise Dikimi Antalya', 'Ceket Dikimi Antalya', 'Ceket Tadilat Antalya',
  'Gömlek Dikimi Antalya', 'Gömlek Tadilat Antalya', 'Blazer Dikimi Antalya',
  'Erkek Kıyafet Dikimi Antalya', 'Smoking Dikimi Antalya', 'Yelek Dikimi Antalya',
  'İş Kıyafeti Dikimi Antalya', 'Erkek Özel Dikim Antalya',

  // ── TÜRKÇE: BAYAN TERZİ ─────────────────────────────────────────────
  'Bayan Terzi Antalya', 'Antalya Bayan Terzi', 'Kadın Terzi Antalya',
  'Elbise Dikimi Antalya', 'Kadın Elbise Dikimi Antalya', 'Etek Dikimi Antalya',
  'Bluz Dikimi Antalya', 'Tulum Dikimi Antalya', 'Kadın Özel Dikim Antalya',
  'Kadın Kıyafet Dikimi Antalya', 'Abiye Dikimi Antalya', 'Gece Elbisesi Antalya',
  'Nişan Elbisesi Dikimi Antalya', 'Kına Kıyafeti Dikimi Antalya',
  
  // ── TÜRKÇE: KUMAŞ TÜRLERİ & ÖZEL DİKİM DETAY ─────────────────────────
  'Keten Elbise Dikimi Antalya', 'Müslin Kıyafet Tasarımı Antalya', 'Viskon Elbise Tadilatı',
  'Şile Bezi Kıyafet Dikimi', 'İpek Elbise Tamiri Antalya', 'Keten Pantolon Paçası Yapımı',
  'Triko Dikiş Tamiri Antalya', 'Deri Mont Astar Değişimi', 'Kaşe Kaban Tadilatı Antalya',
  'Penye Kıyafet Daraltma', 'Kot Ceket Tadilatı Antalya', 'Saten Elbise Dikim Atölyesi',

  // ── TÜRKÇE: GELİNLİK / DÜĞÜN ────────────────────────────────────────
  'Gelinlik Antalya', 'Gelinlik Dikimi Antalya', 'Gelinlik Tadilat Antalya',
  'Gelinlik Değişim Antalya', 'Damatlık Antalya', 'Damatlık Dikimi Antalya',
  'Düğün Kıyafeti Antalya', 'Abiye Antalya', 'Abiye Dikimi', 'Gelinlik Fiyatı Antalya',

  // ── TÜRKÇE: ÇOCUK / BEBEK ───────────────────────────────────────────
  'Çocuk Kıyafeti Dikimi Antalya', 'Bebek Elbisesi Dikimi Antalya',
  'Çocuk Elbise Dikimi', 'Bebek Kıyafeti Dikimi', 'Çocuk Kostüm Dikimi Antalya',
  'Anne Grubu Dikimi Antalya', 'Toplu Çocuk Kıyafeti Dikimi',
  'Okul Kıyafeti Dikimi Antalya', 'Çocuk Tadilat Antalya',

  // ── TÜRKÇE: BÜYÜK BEDEN ──────────────────────────────────────────────
  'Büyük Beden Terzi Antalya', 'Büyük Beden Dikim Antalya',
  'Büyük Beden Elbise Dikimi Antalya', 'Büyük Beden Tadilat Antalya',
  'Beden Seti Çıkarma', 'Özel Kalıp Antalya', 'Her Bedene Dikim Antalya',
  'Kilolu Beden Kıyafet Dikimi', 'Büyük Beden Gömlek Dikimi',

  // ── TÜRKÇE: EV TEKSTİLİ ─────────────────────────────────────────────
  'Nevresim Dikimi Antalya', 'Nevresim Takımı Dikimi', 'Perde Dikimi Antalya',
  'Stor Perde Dikimi Antalya', 'Tül Dikimi Antalya', 'Kırlent Dikimi Antalya',
  'Masa Örtüsü Dikimi Antalya', 'Yatak Örtüsü Dikimi', 'Ev Tekstili Dikimi Antalya',
  'Antalya Perde Atölyesi', 'Ölçüye Nevresim',

  // ── TÜRKÇE: KURU TEMİZLEME / ÇAMAŞIR ───────────────────────────────
  'Kuru Temizleme Antalya', 'Antalya Kuru Temizleme', 'Kuru Temizleme Fiyatı Antalya',
  'Çamaşır Yıkama Antalya', 'Ütü Hizmeti Antalya', 'Çamaşır Servisi Antalya',
  'Otele Çamaşır Servisi Antalya', 'Kıyafet Temizleme Antalya',
  'Antalya Ütü Servisi', 'Kıyafet Yıkama Antalya',

  // ── TÜRKÇE: KALIP / ÜRETİM ──────────────────────────────────────────
  'Kalıp Çıkarma Antalya', 'Model Dikimi Antalya', 'Prototip Dikimi Antalya',
  'Numune Dikimi Antalya', 'Seri İmalat Antalya', 'Fason İmalat Antalya',
  'Fason Üretim Antalya', 'Konfeksiyon Üretimi Antalya', 'Toptan Dikim Antalya',
  'Antalya Konfeksiyon', 'Tekstil Üretimi Antalya', 'Marka Üretimi Antalya',

  // ── TÜRKÇE: SWEATSHIRT / EŞOFMAN ────────────────────────────────────
  'Sweatshirt Dikimi Antalya', 'Eşofman Dikimi Antalya', 'Eşofman Takımı Dikimi',
  'Kapüşonlu Sweatshirt Dikimi', 'Baskılı Sweatshirt Dikimi', 'Nakışlı Sweatshirt',
  'Sweatshirt Tadilatı', 'Eşofman Tadilatı', 'Toplu Sweatshirt Üretimi', 'Seri Sweatshirt Dikimi',

  // ── TÜRKÇE: NAKİŞ & BASKI ───────────────────────────────────────────
  'Nakış Antalya', 'Kıyafete Nakış', 'Logo Nakışı Antalya', 'İsim Nakışı',
  'Üniforma Nakışı Antalya', 'Sweatshirt Nakışı', 'Eşofman Nakışı',
  'Dijital Baskı Antalya', 'Transfer Baskı Antalya', 'Serigrafi Antalya',
  'Tekstil Baskı Antalya', 'Tişört Baskı Antalya',

  // ── TÜRKÇE: ÜNİFORMA GENEL VE DETAY ──────────────────────────────────
  'Üniforma Dikimi Antalya', 'Üniforma Üretimi Antalya', 'Üniforma Tasarımı Antalya',
  'Personel Üniforma Antalya', 'İş Üniforma Antalya', 'Seri Üniforma Üretimi',
  'Toplu Üniforma Siparişi', 'Özel Tasarım Üniforma', 'Üniforma Tadilat Antalya',
  'İş Üniforma Dikimi', 'Okul Üniforması Dikimi Antalya', 'Kostüm Dikimi Antalya', 
  'Tiyatro Kostümü Antalya', 'Özel Kostüm Dikimi', 'Karnaval Kostümü Antalya', 'Tema Kostüm Dikimi',
  'Barista Önlüğü Tasarımı Antalya', 'Medikal Scrubs Dikimi Antalya', 'Aşçı Ceketi İsim Nakışı',
  'Garson Yeleği Dikimi Antalya', 'Otel Temizlik Personeli Kıyafeti', 'Güvenlik Firması Üniforması',
  'Spa Masöz Kıyafeti Dikimi', 'Otel Resepsiyon Takım Elbise', 'Restoran Personel Kıyafeti Toptan',
  'Logolu İş Kıyafetleri Baskısı', 'Fason Üniforma İmalatı Antalya',

  // ── TÜRKÇE: OTEL / TURİZM ÜNİFORMASI ───────────────────────────────
  'Otel Üniforma Antalya', 'Otel Personel Üniforma', 'Otel Üniforma Dikimi',
  'Resepsiyon Üniforma Antalya', 'Kat Görevlisi Üniforma', 'Meydancı Üniforma Antalya',
  'Kapıcı Üniforma', 'Güvenlik Üniforma Antalya', 'Spa Personel Üniforma',
  'Animatör Üniforma', 'Otel Servis Üniforma', 'Turizm Sektörü Üniforma',
  'Resort Üniforma Antalya', 'Tatil Köyü Üniforma',

  // ── TÜRKÇE: RESTORAN / MUTFAK ───────────────────────────────────────
  'Aşçı Üniforma Antalya', 'Şef Kıyafeti Antalya', 'Aşçı Önlüğü Dikimi',
  'Garson Üniforma Antalya', 'Restoran Üniforma', 'Mutfak Üniforma Antalya',
  'Barista Üniforma', 'Komi Üniforma', 'Pastane Üniforma', 'Mutfak Önlüğü',

  // ── TÜRKÇE: SAĞLIK / ENDÜSTRİ ───────────────────────────────────────
  'Doktor Üniforma Antalya', 'Hemşire Üniforma Antalya', 'Sağlık Personel Kıyafeti',
  'Eczacı Üniforma', 'Laborant Üniforma', 'Hastane Kıyafeti Dikimi',
  'İşçi Üniforma Antalya', 'Fabrika Üniforma Dikimi', 'İş Güvenliği Kıyafeti',
  'Çağrı Merkezi Üniforma', 'Banka Personel Üniforma', 'Mağaza Personel Üniforma',

  // ── TÜRKÇE: OKUL / SPOR ─────────────────────────────────────────────
  'Okul Üniforma Dikimi Antalya', 'Okul Forması Antalya', 'Öğrenci Üniforma',
  'Spor Takım Üniforma', 'Futbol Forması Dikimi', 'Voleybol Forması Dikimi',
  'Basketbol Forması Dikimi', 'Spor Kulübü Kıyafeti',

  // ── TÜRKÇE: KESİM / DİKİM / ÜTÜ / PAKET ────────────────────────────
  'Kesim Dikim Antalya', 'Kesim Dikim Ütü Paket', 'Dikim Ütü Paket Hizmet',
  'Kalıp Tasarım Dikim', 'Model Tasarımı Antalya', 'Kesim Antalya',

  // ── TÜRKÇE: İLÇELER / LOKASYONLAR ────────────────────────────────────
  'Lara Terzi', 'Konyaaltı Terzi', 'Belek Terzi', 'Kemer Terzi',
  'Alanya Terzi', 'Manavgat Terzi', 'Side Terzi', 'Kepez Terzi',
  'Muratpaşa Terzi', 'Aksu Terzi', 'Döşemealtı Terzi', 'Serik Terzi',
  'Kaleiçi Terzi', 'Hurma Terzi', 'Uncalı Terzi', 'Varsak Terzi',
  'Lara Dikim', 'Konyaaltı Dikim', 'Belek Dikim', 'Kemer Dikim',
  'Kundu Terzi', 'Kundu Terzi Servisi', 'Güzeloba Terzi', 'Altıntaş Terzi',
  'Liman Mahallesi Terzi', 'Meltem Terzi', 'Fener Mahallesi Terzi', 'Şirinyalı Terzi',
  'Çağlayan Mahallesi Terzi', 'Kundu Otel Üniforma Dikimi', 'Kemer Otel Kıяafetleri',
  'Belek Otel Personel Kıyafetleri', 'Lara Adresten Alım Terzi', 'Konyaaltı Mobil Terzi',
  'Yakınımda Terzi', 'En Yakın Terzi Antalya', 'Terzi Nerede Antalya',
  'Eve Gelen Terzi Antalya', 'Eve Gelen Terzi', 'Otele Gelen Terzi Antalya',
  'Adrese Teslim Terzi', 'Antalya Terzi Servisi', 'Terzi Çağır Antalya',
  'Terzi Adresi Antalya', 'Antalya Merkez Terzi', 'Lara Terzi Servisi',
  'Konyaaltı Eve Gelen Terzi', 'Belek Terzi Servisi', 'Kemer Eve Gelen Terzi',

  // ── TÜRKÇE: FİYAT / 2026 GÜNCEL SORU TİPLERİ ──────────────────────────
  'Paça Kısaltma Kaç Lira', 'Terzi Fiyat Listesi', 'Elbise Dikimi Fiyatı',
  'Daraltma Fiyatı', 'Tadilat Fiyatı Antalya', 'Terzi Ücretleri Antalya', 
  'Ucuz Tadilat Antalya', 'Hızlı Paça Kısaltma', 'Fermuar Değişimi Kaç Para',
  'En Ucuz Terzi Atölyesi Antalya', 'Gelinlik Tadilatı Kaç Lira',
  'Komple Beden Küçültme Fiyatı', 'Toplu Üniforma Dikim Fiyatları', 'Fason Dikim Fiyatı Al',
  'Paça Kısaltma Fiyatı 2026', 'Terzi Fiyatları 2026', 'Terzi Fiyatları 2026 Antalya', 
  'Paça Kısaltma Ücreti 2026', 'Abiye Daraltma Fiyatları 2026', 'Mont Fermuarı Kaç Lira', 
  'Kot Fermuarı Kaç Lira', 'Ceket Daraltma Fiyatı', 'Elbise Tadilat Fiyatı', 
  'Pantolon Daraltma Kaç Lira', 'Tadilat Fiyatı 2026', 'Dikim Fiyatları 2026', 
  'Terzi Ücret Tarifesi 2026', 'Kuru Temizleme Fiyatı Antalya', 'Etek Kısaltma Kaç Lira',
  'Abiye Tamiri Fiyatı', 'Gelinlik Tadilatı Fiyatı', 'Paça Kısaltma Nasıl Yapılır', 
  'Fermuar Nasıl Değiştirilir', 'Antalya\'da Terzi Nasıl Bulunur', 'Elbise Nasıl Daraltılır',
  'Terzi Randevusu Antalya', 'Aynı Gün Terzi Antalya',

  // ── TÜRKÇE: SEZONSAL ─────────────────────────────────────────────────
  'Mezuniyet Abiye Tamiri', 'Mezuniyet Abiye Kısaltma', 'Mezuniyet Kıyafeti Tadilat',
  'Düğün Sezonu Gelinlik Tadilat', 'Gelinlik Kısaltma', 'Gelinlik Tadilatı Antalya',
  'Kış Sezonu Mont Fermuarı', 'Mont Fermuarı Değişimi', 'Deri Mont Fermuarı',
  'Yaz Sezonu Elbise Daraltma', 'Ramazan Kıyafeti Dikimi', 'Bayramlık Dikim',
  'Düğün Kıyafeti Tadilat', 'Nişan Elbisesi Tadilat',
 
  // ── ENGLISH KEYWORDS ────────────────────────────────────────────────
  'Tailor Antalya', 'Antalya Tailor', 'Best Tailor Antalya', 'Master Tailor Antalya',
  'Tailor Near Me Antalya', 'Same Day Tailor Antalya', 'Express Tailor Antalya',
  'English Speaking Tailor Antalya', 'Tailor Turkey', 'Sewing Antalya',
  'Alterations Antalya', 'Clothing Alterations Antalya', 'Dress Alterations Antalya',
  'Trouser Hemming Antalya', 'Hem Pants Antalya', 'Suit Alterations Antalya',
  'Dress Repair Antalya', 'Clothing Repair Antalya', 'Zip Replacement Antalya',
  'Sleeve Shortening Antalya', 'Taking In Dress Antalya', 'Garment Repair Antalya',
  'Custom Tailoring Antalya', 'Custom Made Clothes Antalya', 'Bespoke Tailor Antalya',
  'Made to Measure Antalya', 'Custom Suit Antalya', 'Custom Dress Antalya',
  'Wedding Dress Alterations Antalya', 'Bridal Alterations Antalya',
  'Evening Gown Alterations Antalya', 'Formal Wear Alterations Antalya',
  'Dry Cleaning Antalya', 'Laundry Service Antalya', 'Ironing Service Antalya',
  'Hotel Laundry Antalya', 'Hotel Dry Cleaning Antalya', 'Hotel Pickup Laundry Antalya',
  'Pattern Making Antalya', 'Mass Production Antalya', 'Contract Manufacturing Antalya',
  'Sample Sewing Antalya', 'Clothing Manufacturer Antalya',
  'Mobile Tailor Antalya', 'Home Visit Tailor Antalya', 'Door to Door Tailor Antalya',
  'Tailor Delivery Antalya', 'Tailor Hotel Delivery Antalya',
  'Plus Size Tailor Antalya', 'Plus Size Alterations Antalya',
  'Children Clothing Antalya', 'Baby Clothes Sewing Antalya',
  'Curtain Sewing Antalya', 'Bed Linen Sewing Antalya',
  'Tailor Lara', 'Tailor Konyaalti', 'Tailor Belek', 'Tailor Kemer',
  'Tailor Alanya', 'Tailor Manavgat', 'Tailor Side', 'Nearest Tailor Antalya', 
  'Tailor Close By Antalya', 'Hotel Tailor Service Antalya', 'Trouser Hemming Cost Antalya', 
  'Alteration Prices Antalya', 'Zip Replacement Cost Antalya', 'Tailor Price List Antalya',
  'Same Day Alterations Antalya', 'Graduation Dress Alteration Antalya', 
  'Wedding Season Alterations Antalya', 'Evening Gown Shortening Antalya', 'Prom Dress Alteration Antalya',

  // ── ENGLISH: UNIFORM ────────────────────────────────────────────────
  'Uniform Production Antalya', 'Uniform Design Antalya', 'Hotel Uniform Antalya',
  'Reception Uniform Antalya', 'Chef Uniform Antalya', 'Waiter Uniform Antalya',
  'Restaurant Uniform Antalya', 'Staff Uniform Antalya', 'Security Uniform Antalya',
  'Medical Uniform Antalya', 'Doctor Uniform Antalya', 'Nurse Uniform Antalya',
  'School Uniform Antalya', 'Sports Uniform Antalya', 'Custom Uniform Antalya',
  'Bulk Uniform Order Antalya', 'Embroidery Antalya', 'Logo Embroidery Antalya',
  'Sweatshirt Sewing Antalya', 'Tracksuit Production Antalya',
  'Zip Repair Antalya', 'Trouser Repair Antalya', 'Skirt Repair Antalya', 'Evening Gown Repair Antalya',

  // ── RUSSIAN KEYWORDS (CYRILLIC & LATIN) ──────────────────────────────
  'Портной Анталья', 'Портной в Анталье', 'Лучший портной Анталья',
  'Пошив одежды Анталья', 'Ателье Анталья', 'Ателье в Анталье',
  'Подгонка одежды Анталья', 'Подгонка брюк Анталья', 'Ушить брюки Анталья',
  'Укоротить брюки Анталья', 'Ремонт одежды Анталья', 'Починить одежду Анталья',
  'Замена молнии Анталья', 'Ушить платье Анталья', 'Подогнать костюм Анталья',
  'Пошив на заказ Анталья', 'Индивидуальный пошив Анталья',
  'Свадебное платье Анталья', 'Подгонка свадебного платья Анталья',
  'Пошив детской одежды Анталья', 'Детская одежда на заказ Анталья',
  'Одежда больших размеров Анталья', 'Пошив штор Анталья',
  'Постельное бельё на заказ Анталья',
  'Химчистка Анталья', 'Стирка Анталья', 'Глажка Анталья',
  'Химчистка в отеле Анталья', 'Стирка с доставкой Анталья',
  'Пошив по лекалам Анталья', 'Серийное производство Анталья',
  'Выездной портной Анталья', 'Портной с выездом Анталья',
  'Портной в отель Анталья', 'Доставка одежды Анталья',
  'Портной Лара', 'Портной Белек', 'Портной Кемер', 'Портной Аланья', 'Портной Коньяалты',
  'Портной рядом Анталья', 'Портной с доставкой Анталья', 'Вызвать портного Анталья',
  'Цены на подгонку Анталья', 'Стоимость замены молнии Анталья', 'Срочный ремонт одежды Анталья', 
  'Ремонт в тот же день Анталья', 'Подгонка выпускного платья Анталья', 'Подгонка свадебного платья Анталья',
  'Poshiv odezhdy Antalya', 'Atelie Antalya', 'Remont odezhdy lara', 'Remont odezhdy konyaalti',

  // ── RUSSIAN: UNIFORM ─────────────────────────────────────────────────
  'Пошив формы Анталья', 'Форма для персонала Анталья', 'Гостиничная форма Анталья',
  'Форма для ресторана Анталья', 'Медицинская форма Анталья', 'Форма для повара Анталья',
  'Вышивка на форме Анталья', 'Логотип на одежде Анталья',
  'Пошив толстовок Анталья', 'Спортивная форма Анталья', 'Ремонт платья Анталья', 'Ремонт юбки Анталья',

  // ── GERMAN KEYWORDS ─────────────────────────────────────────────────
  'Uniformproduktion Antalya', 'Hoteluniform Antalya', 'Kochuniform Antalya',
  'Restaurantuniform Antalya', 'Schuluniform Antalya', 'Sportuniform Antalya',
  'Stickerei Antalya', 'Logo Stickerei Antalya', 'Sweatshirt nähen Antalya',
  'Trainingsanzug nähen Antalya', 'Reißverschluss Reparatur Antalya',
  'Kleider ändern Antalya', 'Hose kürzen Antalya', 'Kleidung reparieren Antalya',
  'Reißverschluss wechseln Antalya', 'Maßanfertigung Antalya',
  'Maßschneiderei Antalya', 'Anzug ändern Antalya', 'Kleid enger machen Antalya',
  'Hochzeitskleid ändern Antalya', 'Brautkleid Anpassung Antalya',
  'Kinderkleidung nähen Antalya', 'Babykleidung Antalya', 'Übergrössen Schneider Antalya',
  'Vorhänge nähen Antalya', 'Bettwäsche nähen Antalya',
  'Reinigung Antalya', 'Chemische Reinigung Antalya', 'Wäsche Antalya',
  'Bügelservice Antalya', 'Hotel Reinigung Antalya', 'Hotel Wäscheservice Antalya',
  'Mobiler Schneider Antalya', 'Schneider mit Hausbesuch Antalya',
  'Schneider Lara', 'Schneider Belek', 'Schneider Kemer', 'Schneider Konyaalti',
  'Schneider Preise Antalya', 'Hose kürzen Kosten Antalya', 'Schneider in der Nähe Antalya'
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
  title: 'Terzi Can Antalya | Konyaaltı Terzi | Ütü · Dikim · Tamir · Tadilat | Tailor Can | Портной Кан | Schneider Can',
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
    title: 'Terzi Can | Tailor Can | Портной Кан | Schneider Can — Antalya & Konyaaltı',
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
