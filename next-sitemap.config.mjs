/** @type {import('next-sitemap').IConfig} */
const siteUrl = 'https://heartcrop.netlify.app';

const config = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404'],
  i18n: {
    locales: ['en', 'de', 'es', 'fr', 'hi', 'it', 'pt'], // your locales here
    defaultLocale: 'en',
  },
  alternateRefs: [
    {
      href: `${siteUrl}/en`,
      hreflang: 'en',
    },
    {
      href: `${siteUrl}/de`,
      hreflang: 'de',
    },
    {
      href: `${siteUrl}/es`,
      hreflang: 'es',
    },
    {
      href: `${siteUrl}/fr`,
      hreflang: 'fr',
    },
    {
      href: `${siteUrl}/hi`,
      hreflang: 'hi',
    },
    {
      href: `${siteUrl}/it`,
      hreflang: 'it',
    },
    {
      href: `${siteUrl}/pt`,
      hreflang: 'pt',
    },
  ],
};

export default config;
