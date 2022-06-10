/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/posts/edit',
        destination: '/posts/new/edit',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/math',
        destination: 'https://eiiot.github.io/math/',
        permanent: true,
      },
      {
        source: '/scripts',
        destination: 'https://eiiot.github.io/scripts/',
        permanent: true,
      },
    ]
  },
}
