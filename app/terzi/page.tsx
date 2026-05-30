'use client';

import { useState } from 'react';
import Head from 'next/head';

const PHONE = '905318986418';

const content = {
  tr: {
    title: 'Antalya\'nın Terzisi',
    titleEm: 'Terzisi',
    sub: 'Özel Dikim · Tadilat · Hızlı Teslimat',
    heroBtn: 'WhatsApp\'tan Yazın',
    heroBtn2: 'Hizmetlerimizi İncele ↓',
    secServices: 'Hizmetler',
    secServicesTitle: 'Ne Yapıyoruz?',
    secWhy: 'Turistlere Özel',
    secWhyTitle: 'Neden Bizi\nTercih Edersiniz?',
    secContact: 'İletişim',
    contactTitle: 'Bize Ulaşın',
    contactSub: 'WhatsApp\'tan mesaj atın, hemen yanıt verelim',
    waBtn: 'WhatsApp\'tan Yaz',
    mapBtn: 'Haritada Bul',
    waMsg: 'Merhaba, terzi hizmetiniz hakkında bilgi almak istiyorum.',
    why: [
      { icon: '⚡', title: '24–48 Saat Teslimat', text: 'Tatildesiniz, beklemenize gerek yok. Hızlı teslim, mükemmel uyum.' },
      { icon: '🌍', title: '3 Dilde Hizmet', text: 'Türkçe, İngilizce ve Rusça konuşuyoruz. Dil engeli yok.' },
      { icon: '🏨', title: 'Otele Teslimat', text: 'Lara, Konyaaltı, Belek bölgelerine teslimat yapıyoruz.' },
      { icon: '💳', title: 'Kart & Döviz Kabul', text: 'Kredi kartı, Euro, Dolar ve Ruble ile ödeme alıyoruz.' },
    ],
  },
  en: {
    title: 'Antalya\'s Master Tailor',
    titleEm: 'Master Tailor',
    sub: 'Custom Tailoring · Alterations · Fast Delivery',
    heroBtn: 'WhatsApp Us Now',
    heroBtn2: 'View Our Services ↓',
    secServices: 'Services',
    secServicesTitle: 'What We Do',
    secWhy: 'For Tourists',
    secWhyTitle: 'Why Choose\nUs?',
    secContact: 'Contact',
    contactTitle: 'Contact Us',
    contactSub: 'Send a WhatsApp message, we\'ll reply right away',
    waBtn: 'Chat on WhatsApp',
    mapBtn: 'Find on Map',
    waMsg: 'Hello, I would like to get information about your tailoring service.',
    why: [
      { icon: '⚡', title: '24–48hr Express', text: 'You\'re on holiday — no long waits. Express service, perfect fit.' },
      { icon: '🌍', title: '3 Languages', text: 'We speak Turkish, English and Russian. No language barrier.' },
      { icon: '🏨', title: 'Hotel Delivery', text: 'We deliver to Lara, Konyaaltı, Belek and surrounding hotels.' },
      { icon: '💳', title: 'Card & Currency', text: 'We accept credit cards, Euro, Dollar and Ruble.' },
    ],
  },
  ru: {
    title: 'Лучший Портной Антальи',
    titleEm: 'Портной Антальи',
    sub: 'Пошив на заказ · Ремонт · Быстро',
    heroBtn: 'Написать в WhatsApp',
    heroBtn2: 'Посмотреть услуги ↓',
    secServices: 'Услуги',
    secServicesTitle: 'Что мы делаем',
    secWhy: 'Для туристов',
    secWhyTitle: 'Почему\nвыбирают нас?',
    secContact: 'Контакты',
    contactTitle: 'Свяжитесь с нами',
    contactSub: 'Напишите в WhatsApp, ответим сразу',
    waBtn: 'Написать в WhatsApp',
    mapBtn: 'Найти на карте',
    waMsg: 'Здравствуйте, я хотел бы узнать о ваших услугах портного.',
    why: [
      { icon: '⚡', title: 'Готово за 24–48 часов', text: 'Вы в отпуске — не нужно ждать. Экспресс-сервис, идеальная посадка.' },
      { icon: '🌍', title: 'На 3 языках', text: 'Говорим по-турецки, по-английски и по-русски.' },
      { icon: '🏨', title: 'Доставка в отель', text: 'Доставляем в отели Лары, Коньяалты и Белека.' },
      { icon: '💳', title: 'Карта и валюта', text: 'Принимаем карты, евро, доллар и рубли.' },
    ],
  },
};

const services = [
  { icon: '👗', nameKey: ['Özel Dikim', 'Custom Dress', 'Платья на заказ'], descKey: ['Ölçünüze özel elbise', 'Made to your measurements', 'По вашим меркам'], price: '₺500+' },
  { icon: '✂️', nameKey: ['Tadilat', 'Alterations', 'Ремонт одежды'], descKey: ['Dar/geniş, kısaltma', 'Take in/out, hem, zip', 'Подгонка по фигуре'], price: '₺80+' },
  { icon: '💍', nameKey: ['Gelinlik', 'Wedding Dress', 'Свадебное платье'], descKey: ['Düğün ve abiye dikim', 'Bridal & evening gowns', 'Свадьба и вечер'], price: '₺2.000+' },
  { icon: '👔', nameKey: ['Takım Elbise', 'Suits & Shirts', 'Костюмы'], descKey: ['Erkek takım, gömlek', 'Bespoke men\'s suits', 'Мужской костюм'], price: '₺1.500+' },
];

const reviews = [
  { stars: 5, text: '"Amazing tailor! I needed a dress altered in 24 hours before my dinner. Perfect fit, very professional."', author: 'Sarah M.', flag: '🇬🇧', city: 'London, UK' },
  { stars: 5, text: '"Отличный портной! Сшил платье на заказ за 2 дня. Говорят по-русски, цены честные."', author: 'Наталья К.', flag: '🇷🇺', city: 'Москва' },
  { stars: 5, text: '"Düğün öncesi gelinliğimi mükemmel şekilde teslim ettiler. Hızlı, kaliteli ve güler yüzlü hizmet!"', author: 'Elif Y.', flag: '🇹🇷', city: 'Antalya' },
];

type Lang = 'tr' | 'en' | 'ru';
const langIndex: Record<Lang, number> = { tr: 0, en: 1, ru: 2 };

export default function TerziPage() {
  const [lang, setLang] = useState<Lang>('tr');
  const c = content[lang];
  const li = langIndex[lang];

  const waLink = (msg: string) =>
    `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

  return (
    <>
      {/* ── SEO ── */}
      <title>Antalya Terzi | Tailor in Antalya | Портной в Анталье | swaphubs.com</title>
      <meta name="description" content="Antalya terzi. Özel dikim, tadilat, gelinlik. Tailor in Antalya — custom clothing, alterations. Портной в Анталье — пошив, ремонт. +90 531 898 64 18" />
      <meta name="keywords" content="antalya terzi, terzi antalya, tailor antalya, портной анталья, antalya tadilat, alteration antalya" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Antalya Terzi',
            url: 'https://swaphubs.com/terzi',
            telephone: '+90 531 898 64 18',
            priceRange: '₺₺',
            description: 'Antalya özel dikim ve tadilat. Custom tailoring in Antalya. Пошив в Анталье.',
            address: { '@type': 'PostalAddress', addressLocality: 'Antalya', addressCountry: 'TR' },
            geo: { '@type': 'GeoCoordinates', latitude: '36.8841', longitude: '30.7056' },
            openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '19:00' }],
          }),
        }}
      />

      <div style={{ fontFamily: "'Outfit', sans-serif", background: '#faf8f4', minHeight: '100vh', color: '#2c2418' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          .hero-title-em { color: #d4af6e; font-style: italic; }
          [data-visible='false'] { display: none !important; }
          @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
          .fade-up { animation: fadeUp 0.4s ease both; }
        `}</style>

        {/* LANG BAR */}
        <div style={{ background: '#1c1814', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['tr','en','ru'] as Lang[]).map((l) => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                cursor: 'pointer', border: `1px solid ${lang === l ? '#b8954a' : 'rgba(255,255,255,0.15)'}`,
                background: lang === l ? '#b8954a' : 'transparent',
                color: lang === l ? '#fff' : 'rgba(255,255,255,0.5)',
                fontFamily: 'inherit', transition: 'all 0.2s',
              }}>
                {l === 'tr' ? '🇹🇷 TR' : l === 'en' ? '🇬🇧 EN' : '🇷🇺 РУ'}
              </button>
            ))}
          </div>
          <a href={waLink(c.waMsg)} style={{ fontSize: 11, color: '#25d366', fontWeight: 600, textDecoration: 'none' }}>📲 WhatsApp</a>
        </div>

        {/* HERO */}
        <div style={{ background: '#1c1814', padding: '52px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(184,149,74,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#b8954a', marginBottom: 14 }}>✂ Antalya</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 600, lineHeight: 1.1, color: '#fff', marginBottom: 10, position: 'relative' }}>
            {lang === 'tr' ? <>Antalya&apos;nın<br /><em className="hero-title-em">Terzisi</em></> : lang === 'en' ? <>Antalya&apos;s<br /><em className="hero-title-em">Master Tailor</em></> : <>Лучший<br /><em className="hero-title-em">Портной Антальи</em></>}
          </h1>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24, position: 'relative' }}>{c.sub}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
            {['🇹🇷 Türkçe','🇬🇧 English','🇷🇺 Русский'].map((l) => (
              <span key={l} style={{ fontSize: 11, padding: '5px 12px', borderRadius: 20, border: '1px solid rgba(184,149,74,0.3)', background: 'rgba(184,149,74,0.08)', color: '#d4af6e' }}>{l}</span>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
            <a href={waLink(c.waMsg)} style={{ background: '#25d366', color: '#fff', borderRadius: 14, padding: '15px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              📲 {c.heroBtn}
            </a>
            <a href="#services" style={{ color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14, padding: '13px 24px', fontSize: 13, textDecoration: 'none', textAlign: 'center' }}>
              {c.heroBtn2}
            </a>
          </div>
        </div>

        {/* SERVICES */}
        <section id="services" style={{ padding: '40px 20px', background: '#fff' }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.secServices}</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, marginBottom: 20 }}>{c.secServicesTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {services.map((s, i) => (
              <div key={i} style={{ background: '#faf8f4', border: '1px solid #e0d8c8', borderRadius: 16, padding: '18px 14px' }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{s.nameKey[li]}</div>
                <div style={{ fontSize: 11, color: '#8a7d6a', lineHeight: 1.4 }}>{s.descKey[li]}</div>
                <div style={{ marginTop: 10, fontSize: 11, fontWeight: 600, color: '#b8954a', background: 'rgba(184,149,74,0.1)', borderRadius: 8, padding: '3px 8px', display: 'inline-block' }}>{s.price}</div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY */}
        <section style={{ padding: '40px 20px', background: '#f0ebe0' }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.secWhy}</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, marginBottom: 20, whiteSpace: 'pre-line' }}>{c.secWhyTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {c.why.map((w, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, background: '#fff', border: '1px solid #e0d8c8', borderRadius: 14, padding: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg,#b8954a,#8a6a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{w.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{w.title}</div>
                  <div style={{ fontSize: 11, color: '#8a7d6a', lineHeight: 1.5 }}>{w.text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section style={{ padding: '40px 20px', background: '#1c1814' }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#d4af6e', marginBottom: 6 }}>⭐ Reviews</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
            {lang === 'tr' ? 'Müşterilerimiz Ne Diyor?' : lang === 'en' ? 'What Clients Say' : 'Отзывы клиентов'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 14 }}>
                <div style={{ fontSize: 12, marginBottom: 6 }}>{'⭐'.repeat(r.stars)}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 8 }}>{r.text}</div>
                <div style={{ fontSize: 11, color: '#d4af6e', fontWeight: 600 }}>{r.flag} {r.author} — {r.city}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section style={{ padding: '40px 20px', background: '#f0ebe0' }}>
          <div style={{ background: '#fff', border: '1px solid #e0d8c8', borderRadius: 20, padding: 24, textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, marginBottom: 6 }}>{c.contactTitle}</h2>
            <div style={{ fontSize: 12, color: '#8a7d6a', marginBottom: 20 }}>{c.contactSub}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={waLink(c.waMsg)} style={{ background: '#25d366', color: '#fff', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                📲 {c.waBtn}
              </a>
              <a href="https://maps.google.com/?q=Antalya+Terzi" target="_blank" rel="noreferrer" style={{ background: 'transparent', color: '#2c2418', border: '1px solid #e0d8c8', borderRadius: 12, padding: 13, fontSize: 13, textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                📍 {c.mapBtn}
              </a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16, flexWrap: 'wrap' }}>
              {['🕐 09:00–19:00','📍 Antalya','⚡ 24–48h'].map((t) => (
                <div key={t} style={{ fontSize: 11, color: '#8a7d6a' }}>{t}</div>
              ))}
            </div>
          </div>
        </section>

        {/* STICKY CTA */}
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '12px 20px 24px', background: 'linear-gradient(to top, #faf8f4 60%, transparent)', zIndex: 50 }}>
          <a href={waLink(c.waMsg)} style={{ background: '#25d366', color: '#fff', borderRadius: 14, padding: 14, fontSize: 14, fontWeight: 600, width: '100%', maxWidth: 430, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 24px rgba(37,211,102,0.35)', textDecoration: 'none' }}>
            📲 {c.heroBtn}
          </a>
        </div>

      </div>
    </>
  );
}
