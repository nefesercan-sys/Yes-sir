import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/ru/vyezdnoy-portnoy-antalya';
const TR_URL = 'https://swaphubs.com/terzi/eve-gelen-terzi-antalya';
const EN_URL = 'https://swaphubs.com/en/hotel-tailor-antalya';
const DE_URL = 'https://swaphubs.com/de/schneider-service-hotel-antalya';
const PARENT_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Здравствуйте, хочу вызвать выездного портного. Мой адрес: ')}`;
const TODAY = new Date().toISOString().split('T')[0];

const HOTELS = [
  'Rixos Downtown Antalya','Regnum Carya','Kaya Palazzo Golf Resort',
  'Gloria Golf Resort','Delphin BE Grand Resort','Delphin Diva Premiere',
  'Susesi Luxury Resort','Adam & Eve Hotel','Calista Luxury Resort',
  'TUI Magic Life Belek','Ela Quality Resort','Cornelia Diamond Golf Resort',
  'Maxx Royal Belek','Maxx Royal Kemer','Titanic Mardan Palace',
  'Sheraton Cesme','Rixos Premium Belek','Crystal Sunset Luxury Resort',
  'Fame Residence Lara','Akra Hotel','Hillside Su Hotel','Lara Barut Collection',
  'Concorde De Luxe Resort','Papillon Ayscha Resort','Limak Atlantis',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Выездной портной Анталья — обслуживание в отеле',
      alternateName: [
        'Портной в отель Анталья','Выездной портной','Русскоговорящий портной Анталья',
        'Eve Gelen Terzi Antalya','Otele Gelen Terzi Antalya',
      ],
      description: 'Выездной портной в Анталье. Приедем в ваш отель в Белеке, Ларе, Кемере, Аланье, Сиде, Манавгате — во все районы Антальи. Снятие мерок, пошив и доставка к вашей двери.',
      provider: { '@type': 'ClothingStore', '@id': `${PARENT_URL}#business`, name: 'Terzi Can', telephone: PHONE_E164 },
      areaServed: [
        {name:'Antalya'},{name:'Konyaaltı'},{name:'Muratpaşa'},
        {name:'Lara'},{name:'Belek'},{name:'Kemer'},{name:'Alanya'},
        {name:'Manavgat'},{name:'Side'},{name:'Kepez'},
      ].map(c=>({...c,'@type':'City'})),
      offers: { '@type': 'Offer', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Выездной портной Анталья · Обслуживание в отеле · Terzi Can',
      url: SITE_URL,
      description: 'Выездной портной и обслуживание в отеле в Анталье. Белек, Лара, Кемер, Аланья и все районы. Срочный ремонт за 24–48 часов. Говорим по-русски. ☎ ' + PHONE,
      inLanguage: 'ru',
      dateModified: TODAY,
      breadcrumb: {'@id': `${SITE_URL}#breadcrumb`},
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        {position:1, name:'SwapHubs', item:HOME_URL},
        {position:2, name:'Портной Анталья', item:PARENT_URL},
        {position:3, name:'Выездной портной Анталья', item:SITE_URL},
      ].map(i=>({...i,'@type':'ListItem'})),
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type':'Question', name:'Есть ли выездной портной в Анталье?',
          acceptedAnswer:{'@type':'Answer',text:`Да! Портной Кан приедет по любому адресу в Анталье. Напишите название отеля или адрес в WhatsApp — портной приедет, снимет мерки, сошьёт и доставит. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'В какие отели Белека и Лары вы приезжаете?',
          acceptedAnswer:{'@type':'Answer',text:`Мы обслуживаем все крупные отели — Rixos, Regnum, Maxx Royal, Kaya Palazzo, Delphin, Calista, Gloria, Titanic. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Выезд портного платный?',
          acceptedAnswer:{'@type':'Answer',text:`Нет, сам выезд бесплатный — оплачивается только выполненная работа. Подшив брюк от ₺150, ушив платья от ₺200. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Можно ли сделать срочный ремонт в тот же день перед мероприятием?',
          acceptedAnswer:{'@type':'Answer',text:`Да! Портной Кан делает срочный ремонт в тот же день или за 24 часа по всей Анталье, включая отели Белека, Лары, Кемера и Аланьи. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Вы говорите по-русски?',
          acceptedAnswer:{'@type':'Answer',text:`Да, наша команда говорит по-русски, английски, немецки и турецки. WhatsApp: ${PHONE}`} },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'Как работает выездной портной / обслуживание в отеле',
      totalTime: 'PT24H',
      step: [
        { '@type':'HowToStep', name:'Напишите в WhatsApp', text:`Отправьте геолокацию или название отеля на номер ${PHONE}.` },
        { '@type':'HowToStep', name:'Согласуйте время', text:'В течение 30 минут мы подтвердим удобное время.' },
        { '@type':'HowToStep', name:'Портной приезжает', text:'Портной приезжает по адресу, снимает мерки и забирает вещь.' },
        { '@type':'HowToStep', name:'Доставка', text:'Готовая вещь доставляется обратно за 24–48 часов.' },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: 'Выездной портной Анталья · Обслуживание в отеле · Terzi Can',
  description: 'Выездной портной в Анталье. Приедем в ваш отель в Белеке, Ларе, Кемере, Аланье. Срочный ремонт, говорим по-русски. ☎ ' + PHONE,
  keywords: [
    'выездной портной Анталья','портной в отель Анталья','портной Анталья',
    'русскоговорящий портной Анталья','ателье Белек','ателье Лара',
    'ателье Кемер','ателье Аланья','срочный ремонт одежды Анталья',
    'подгонка платья Анталья отель','подгонка костюма Анталья',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { 'tr': TR_URL, 'en': EN_URL, 'ru': SITE_URL, 'de': DE_URL, 'x-default': TR_URL },
  },
  openGraph: {
    title: 'Выездной портной Анталья · Обслуживание в отеле',
    description: 'Выездной портной приедет в ваш отель в Белеке, Ларе, Кемере, Аланье и по всей Анталье.',
    url: SITE_URL, type: 'website', locale: 'ru_RU',
  },
  robots: { index: true, follow: true },
};

const DISTRICTS = [
  {name:'Белек', time:'~35 мин', desc:'Все отели Белека — Rixos, Regnum, Kaya Palazzo, Gloria, Delphin, Calista, Cornelia, Maxx Royal'},
  {name:'Лара', time:'~10 мин', desc:'Все отели Лары — Delphin Diva, Titanic Mardan, Fame Residence, Akra, Lara Barut Collection'},
  {name:'Кемер', time:'~45 мин', desc:'Все отели Кемера — Maxx Royal Kemer, Club Med Palmiye, Rixos Sungate, Sentido Perissia'},
  {name:'Аланья', time:'~1.5 ч', desc:'Центр Аланьи и окрестности — Махмутлар, Оба, Конаклы, Авсаллар'},
  {name:'Муратпаша / Лиман', time:'~5 мин', desc:'Центр города, Калеичи, Ширинъялы, Фенер'},
  {name:'Коньяалты', time:'Рядом', desc:'Мастерская Terzi Can — Хурма, Унджалы, Арапсую, Сарысу'},
  {name:'Манавгат / Сиде', time:'~1 ч', desc:'Отели Сиде, Соргуна, Кумкёй, Эвренсеки'},
  {name:'Серик / Дёшемеалты', time:'~40 мин', desc:'Центр Серика и окрестные деревни'},
];

export default function VyezdnoyPortnoyAntalyaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: 'system-ui,sans-serif', background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <nav style={{ padding: '1rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.1)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Портной Анталья</Link>
          {' › '}
          <span>Выездной портной Анталья</span>
        </nav>

        <section style={{ background: 'linear-gradient(135deg,#1C1814 0%,#2E2820 100%)', padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: `url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&auto=format&fit=crop') center/cover`, opacity: .15 }} />
          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.3em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              🚗 Выездной портной · Вся Анталья
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: '1.2rem' }}>
              Выездной портной Анталья<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Приедем в ваш отель</span>
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#fff' }}>Terzi Can</strong> приезжает <strong style={{ color: '#D4B07A' }}>в любой район Антальи</strong> с выездным сервисом.
              Белек, Лара, Кемер, Аланья — все отели. Снятие мерок, пошив и доставка к вашей двери.
              Срочно за 24–48 часов.
            </p>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {[
                ['🇷🇺', 'Приедем в ваш отель'],
                ['🇹🇷', 'Eve ve otele geliyoruz'],
                ['🇬🇧', 'We come to your hotel'],
                ['🇩🇪', 'Wir kommen zu Ihnen'],
              ].map(([flag, text]) => (
                <span key={flag as string} style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.65)', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', padding: '.3rem .8rem', borderRadius: '2px' }}>
                  {flag} {text}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '1rem 2.2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.88rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                💬 Отправить геолокацию → Портной приедет
              </a>
              <a href={`tel:${PHONE_E164}`}
                style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '1rem 1.8rem', textDecoration: 'none', fontSize: '.88rem' }}>
                📞 {PHONE}
              </a>
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.6rem' }}>
              Как работает выездной портной
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.9rem', marginBottom: '2.5rem' }}>Сервис к вашей двери за 4 шага</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1px', background: '#E8E0D2' }}>
              {[
                ['📍', 'Отправьте геолокацию в WhatsApp', `Отправьте адрес или название отеля на номер ${PHONE}`],
                ['📞', 'Запись в течение 30 минут', 'Мы согласуем удобное для вас время'],
                ['✂️', 'Снятие мерок на месте', 'Портной приезжает, снимает мерки и забирает вещь'],
                ['🚗', 'Доставка за 24–48 часов', 'Готовая вещь доставляется к вашей двери'],
              ].map(([ic, t, d], i) => (
                <div key={i} style={{ background: '#FAF7F2', padding: '2rem 1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '.7rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#B8975A', marginBottom: '.4rem' }}>{t}</div>
                  <div style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Выездной портной во все районы Антальи
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2.5rem' }}>Из нашей мастерской в Коньяалты — во все районы Антальи</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
              {DISTRICTS.map(({name, time, desc}) => (
                <div key={name} style={{ background: '#fff', border: '1px solid rgba(184,151,90,.15)', borderRadius: '2px', padding: '1.4rem', borderLeft: '3px solid #B8975A' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.5rem' }}>
                    <strong style={{ fontFamily: 'Georgia,serif', fontSize: '1.1rem', color: '#1C1814' }}>📍 {name}</strong>
                    <span style={{ fontSize: '.7rem', color: '#B8975A', fontWeight: 600, letterSpacing: '.08em' }}>{time}</span>
                  </div>
                  <p style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Портной в отелях Антальи
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>
              Мы приезжаем во все отели Антальи, включая перечисленные ниже.
              Не обязательно обращаться к консьержу — просто напишите нам напрямую в WhatsApp.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.5rem' }}>
              {HOTELS.map(hotel => (
                <span key={hotel} style={{ fontSize: '.77rem', color: '#3A3028', background: '#F2EDE4', border: '1px solid rgba(184,151,90,.2)', padding: '.3rem .75rem', borderRadius: '2px' }}>
                  {hotel}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '.8rem', color: '#7A6E62', fontStyle: 'italic' }}>
              + Все остальные отели Антальи. Просто напишите название вашего отеля в WhatsApp.
            </p>
            <div style={{ marginTop: '1.8rem' }}>
              <a href={`https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Здравствуйте, нужен портной в наш отель. Наш отель: ')}`} target="_blank" rel="noopener noreferrer"
                style={{ background: '#25d366', color: '#fff', padding: '1rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', borderRadius: '4px', display: 'inline-block' }}>
                💬 Напишите название отеля → Портной приедет
              </a>
            </div>
          </div>
        </section>

        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Цены на выездного портного
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.85rem', marginBottom: '1.5rem' }}>Сам выезд бесплатный — оплачивается только выполненная работа</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Услуга', 'Цена', 'Срок'].map(h => (
                    <th key={h} style={{ textAlign: h==='Услуга'?'left':'right', padding: '.7rem .8rem', fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Стоимость выезда','БЕСПЛАТНО','—'],
                  ['Подшив брюк','от ₺150','24 часа'],
                  ['Замена молнии','от ₺120','В тот же день'],
                  ['Ушив платья / пиджака','от ₺200','48 часов'],
                  ['Укорачивание рукавов','от ₺200','48 часов'],
                  ['Ремонт вечернего платья','от ₺350','48 часов'],
                  ['Ушив свадебного платья','от ₺500','3–5 дней'],
                  ['Пошив мужского костюма','от ₺2 500','5–7 дней'],
                  ['Ремонт разрыва ткани','от ₺100','В тот же день'],
                ].map(([s, p, t], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i % 2 ? 'rgba(184,151,90,.02)' : '#fff' }}>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.88rem' }}>{s}</td>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.88rem', color: p==='БЕСПЛАТНО'?'#22c55e':'#8A6E3E', fontWeight: 600, textAlign: 'right' }}>{p}</td>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.78rem', color: '#7A6E62', textAlign: 'right' }}>{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ background: '#FAF7F2', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '2rem' }}>
              Выездной портной Анталья — Часто задаваемые вопросы
            </h2>
            {[
              ['Есть ли выездной портной в Анталье?', `Да! Портной Кан приедет по любому адресу в Анталье. Напишите адрес или отель в WhatsApp. WhatsApp: ${PHONE}`],
              ['Выезд портного платный?', 'Нет! Сам выезд полностью бесплатный — оплачивается только выполненная работа. Подшив брюк от ₺150, ушив платья от ₺200.'],
              ['Вы обслуживаете отели Белека?', `Да! Мы приезжаем во все отели Белека, включая Regnum, Rixos, Kaya Palazzo, Gloria, Delphin, Calista, Maxx Royal и Cornelia. WhatsApp: ${PHONE}`],
              ['Вы обслуживаете отели Лары?', `Да! Мы обслуживаем все отели Лары, включая Titanic Mardan, Delphin Diva, Fame Residence, Akra и Lara Barut Collection. WhatsApp: ${PHONE}`],
              ['Как быстро приезжает портной?', 'Мы согласуем время в течение 30 минут после вашего сообщения в WhatsApp. Обычно портной приезжает в тот же день или на следующий.'],
              ['Do you come to hotels in Antalya?', `Yes! Tailor Can serves all Antalya hotels — Belek, Lara, Kemer, Alanya, Manavgat. English-speaking tailor service. WhatsApp: ${PHONE}`],
            ].map(([q, a], i) => (
              <details key={i} style={{ borderBottom: '1px solid rgba(184,151,90,.1)', padding: '1rem 0' }}>
                <summary style={{ cursor: 'pointer', fontSize: '.93rem', fontWeight: 500, color: '#1C1814', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q} <span style={{ color: '#B8975A', fontSize: '1.2rem', fontWeight: 300 }}>+</span>
                </summary>
                <p style={{ marginTop: '.8rem', fontSize: '.84rem', color: '#7A6E62', lineHeight: 1.85 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section style={{ background: '#B8975A', padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.8rem' }}>
            Вызвать портного сейчас
          </h2>
          <p style={{ color: 'rgba(255,255,255,.85)', marginBottom: '2rem', fontSize: '.92rem' }}>
            Отправьте геолокацию — запись за 30 минут, доставка за 24 часа
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Отправить геолокацию
            </a>
            <a href={`tel:${PHONE_E164}`}
              style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
          <p style={{ marginTop: '1.2rem', fontSize: '.78rem', color: 'rgba(255,255,255,.7)' }}>
            ⭐ 4.9 / 5 · 94 отзыва в Google · 09:00–19:00 Пн–Сб
          </p>
        </section>

        <section style={{ padding: '2.5rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>Похожие страницы</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[
                ['English — Mobile Tailor', '/en/hotel-tailor-antalya'],
                ['Deutsch — Schneider Service', '/de/schneider-service-hotel-antalya'],
                ['Türkçe — Eve Gelen Terzi', '/terzi/eve-gelen-terzi-antalya'],
                ['← Все услуги', '/terzi'],
              ].map(([label, href]) => (
                <Link key={label} href={href}
                  style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
