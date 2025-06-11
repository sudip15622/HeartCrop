import nextIntl from 'next-intl/plugin';
import nextIntlConfig from './next-intl.config.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  }
};

export default nextIntl(nextIntlConfig)(nextConfig);
