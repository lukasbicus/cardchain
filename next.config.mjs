import withSerwistInit from '@serwist/next';

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development', // disable PWA in the development environment
});

export default withSerwist(nextConfig);
