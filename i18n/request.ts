// i18n/request.ts
export default getRequestConfig(async ({ locale }) => {
  return {
    // Mesajlar app/messages altındaysa yol tam olarak budur:
    messages: (await import(`../app/messages/${locale}.json`)).default
  };
});
