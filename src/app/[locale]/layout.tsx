import '@/app/globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { locales } from '@/i18n'
import { I18nProvider } from '@/lib/i18n'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import productsData from '@/json/product.json'

const BASE_URL = 'https://sumaitong.com'

const siteMetadata = {
  title: 'SumaItong - Quality Products Store',
  description: 'Your trusted partner for quality products from around the world. Shop coffee capsule storage, pet supplies, and more at competitive prices.',
  keywords: ['online shopping', 'coffee capsule storage', 'pet supplies', 'home organization', 'eBay store', 'quality products', 'affordable prices'],
  siteName: 'SumaItong',
  locale: 'en_US',
}

const productKeywords = productsData
  .slice(0, 10)
  .map((p: any) => {
    const words = p.title.split(',').map((w: string) => w.trim())
    return words.slice(0, 3)
  })
  .flat()

const allKeywords = [...new Set([...siteMetadata.keywords, ...productKeywords])].slice(0, 20)

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.siteName}`,
  },
  description: siteMetadata.description,
  keywords: allKeywords,
  authors: [{ name: 'SumaItong' }],
  creator: 'SumaItong',
  publisher: 'SumaItong',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: siteMetadata.siteName,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SumaItong - Quality Products Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-US': `${BASE_URL}/en`,
      'zh-CN': `${BASE_URL}/zh`,
      'ja-JP': `${BASE_URL}/ja`,
      'ko-KR': `${BASE_URL}/ko`,
      'es-ES': `${BASE_URL}/es`,
      'fr-FR': `${BASE_URL}/fr`,
      'de-DE': `${BASE_URL}/de`,
      'ru-RU': `${BASE_URL}/ru`,
    },
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SumaItong',
    url: BASE_URL,
    description: siteMetadata.description,
    sameAs: ['https://www.ebay.com/str/haizcx1'],
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <I18nProvider>
          <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  )
}
