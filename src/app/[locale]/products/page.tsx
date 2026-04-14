'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart } from 'lucide-react'
import { products as productsData } from '@/lib/products'

export default function ProductsPage() {
  const { t } = useI18n()
  const params = useParams()
  const locale = (params.locale as string) || 'en'

  const products = productsData.map((p: any, index: number) => ({
    id: index + 1,
    name: p.title,
    price: p.price,
    image: p.image,
    url: p.url,
  }))

  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold'>{t('products.title')}</h1>
        <p className='text-muted-foreground'>{locale === 'zh' ? '发现我们精选的优质商品' : 'Discover our curated selection of quality products'}</p>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {products.map(product => (
          <a key={product.id} href={product.url} target='_blank' rel='noopener noreferrer' className='group overflow-hidden rounded-lg border bg-card'>
            <div className='relative aspect-square'>
              <img src={product.image} alt={product.name} className='h-full w-full object-cover transition-transform group-hover:scale-105' />
              <Button variant='ghost' size='icon' className='absolute right-2 top-2 opacity-0 group-hover:opacity-100'>
                <Heart className='h-4 w-4' />
              </Button>
            </div>
            <div className='p-4'>
              <h3 className='font-semibold truncate'>{product.name}</h3>
              <div className='mt-3 flex items-center justify-between'>
                <span className='text-lg font-bold'>{product.price}</span>
                <Button size='sm'>
                  <ShoppingCart className='h-3 w-3 mr-1' />
                  {locale === 'zh' ? '购买' : 'Buy'}
                </Button>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
