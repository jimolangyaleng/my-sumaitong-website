import '@/app/globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { locales } from '@/i18n'
import { I18nProvider } from '@/lib/i18n'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'SumaItong - Quality Products Store',
  description: 'Your trusted partner for quality products from around the world',
  keywords: ['shopping', 'products', 'electronics', 'AliExpress', 'global store'],
  openGraph: {
    title: 'SumaItong - Quality Products Store',
    description: 'Your trusted partner for quality products from around the world',
    type: 'website',
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className='min-h-screen bg-background font-sans antialiased'>
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
