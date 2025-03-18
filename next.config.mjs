import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig = {
  reactStrictMode: true,
}

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default bundleAnalyzer(nextConfig)