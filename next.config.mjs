import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    publicRuntimeConfig: { APP_NAME: process.env.APP_NAME },
    env: { CONFIG_NAME: process.env.WELCOME_APP },
}

export default withNextIntl(nextConfig)
