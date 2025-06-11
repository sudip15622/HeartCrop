export default function getRequestConfig({ headers } = {}) {
  const acceptLanguage = headers?.get?.('accept-language');
  const preferred = acceptLanguage?.split(',')[0] || 'en';
  const locale = preferred.split('-')[0];

  return {
    locale: ['en', 'de', 'es', 'fr', 'hi', 'it', 'pt'].includes(locale) ? locale : 'en'
  };
}
