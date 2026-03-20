import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  return {
    // @/.. gibi işaretler yerine doğrudan üst klasöre çıkıyoruz
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
