'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Shield, Truck, RefreshCw, ShoppingCart, Heart } from 'lucide-react'
import { products as productsData } from '@/lib/products'
import { trackProductClick } from '@/lib/analytics'

export default function HomePage() {
  const { t } = useI18n()
  const params = useParams()
  const locale = (params.locale as string) || 'en'

  const features = [
    { icon: Shield, title: t('features.quality'), desc: t('features.authentic') },
    { icon: Truck, title: t('features.shipping'), desc: t('features.fast') },
    { icon: RefreshCw, title: t('features.returns'), desc: t('features.days') },
  ]

  const products = productsData.slice(0, 40).map((p: any, index: number) => ({
    id: index + 1,
    name: p.title,
    price: p.price,
    image: p.image,
    url: p.url,
  }))

  return (
    <div className='flex flex-col'>
      <section className='relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 md:py-32'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-3xl text-center'>
            <h1 className='mb-6 text-4xl font-bold tracking-tight md:text-6xl'>{t('hero.title')}</h1>
            <p className='mb-8 text-lg text-muted-foreground md:text-xl'>{t('hero.subtitle')}</p>
            <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
              <Link href={`/${locale}/products`}>
                <Button size='lg' className='w-full sm:w-auto'>
                  {t('hero.cta')}
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
              <Link href={`/${locale}/about`}>
                <Button variant='outline' size='lg' className='w-full sm:w-auto'>
                  {t('nav.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-4'>
          <div className='grid gap-6 md:grid-cols-3'>
            {features.map((feature, index) => (
              <div key={index} className='flex flex-col items-center text-center p-6 rounded-lg border bg-card'>
                <feature.icon className='h-10 w-10 mb-4 text-primary' />
                <h3 className='font-semibold mb-2'>{feature.title}</h3>
                <p className='text-sm text-muted-foreground'>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-4'>
          <div className='mb-8 flex items-center justify-between'>
            <h2 className='text-2xl font-bold'>{t('products.title')}</h2>
            <Link href={`/${locale}/products`} className='text-sm text-primary hover:underline'>
              {t('products.viewAll')}
            </Link>
          </div>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {products.map(product => (
              <a key={product.id} href={product.url} target='_blank' rel='noopener noreferrer' className='group' onClick={() => trackProductClick(product.name, product.price, 'home')}>
                <div className='overflow-hidden rounded-lg border bg-card'>
                  <div className='aspect-square'>
                    <img src={product.image} alt={product.name} className='h-full w-full object-cover transition-transform group-hover:scale-105' />
                  </div>
                  <div className='p-4'>
                    <h3 className='font-semibold truncate'>{product.name}</h3>
                    <div className='mt-2 flex items-center justify-between'>
                      <span className='font-bold'>{product.price}</span>
                      <Button
                        size='sm'
                        className='ml-2'
                        onClick={e => {
                          e.preventDefault()
                          trackProductClick(product.name, product.price, 'home_buy_button')
                          window.open(product.url, '_blank')
                        }}
                      >
                        <ShoppingCart className='h-3 w-3 mr-1' />
                        {locale === 'zh' ? '购买' : 'Buy'}
                      </Button>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-muted py-12 md:py-16'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='mb-4 text-2xl font-bold'>{t('cta.title')}</h2>
          <p className='mb-8 text-muted-foreground'>{t('cta.subtitle')}</p>
          <Link href={`/${locale}/products`}>
            <Button size='lg'>{t('hero.cta')}</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
