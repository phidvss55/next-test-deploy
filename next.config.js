const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

const pushNotificationConfig = {
  pwa: {
    dest: 'public',
    sw: 'sw.js',
  },
};

module.exports = Object.assign({}, nextConfig, withPWA(pushNotificationConfig));
