// Sesli asistanların (Google Assistant, Siri, Alexa) okuyabileceği alanları işaretler.
// Sunucu bileşeni: ham HTML'de JSON-LD olarak görünür.
const SITE = 'https://swaphubs.com';

export default function SpeakableSchema({ path }: { path: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${SITE}${path}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.hero-slogan', '#quick-actions', '#sik-sorulan-sorular'],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
