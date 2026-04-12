'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart, Heart } from 'lucide-react'

const allProducts = [
  { id: 1, name: 'Smart Watch Pro', price: 89.99, image: 'https://picsum.photos/seed/watch1/400/400', category: 'Electronics', rating: 4.8, reviews: 234 },
  { id: 2, name: 'Wireless Earbuds', price: 59.99, image: 'https://picsum.photos/seed/earbuds1/400/400', category: 'Electronics', rating: 4.6, reviews: 189 },
  { id: 3, name: 'Fitness Tracker', price: 39.99, image: 'https://picsum.photos/seed/fitness1/400/400', category: 'Electronics', rating: 4.5, reviews: 156 },
  { id: 4, name: 'Bluetooth Speaker', price: 49.99, image: 'https://picsum.photos/seed/speaker1/400/400', category: 'Electronics', rating: 4.7, reviews: 212 },
  { id: 5, name: 'Smart Bulb Kit', price: 29.99, image: 'https://picsum.photos/seed/bulb/400/400', category: 'Home', rating: 4.4, reviews: 98 },
  { id: 6, name: 'USB-C Hub', price: 34.99, image: 'https://picsum.photos/seed/hub/400/400', category: 'Electronics', rating: 4.6, reviews: 167 },
  { id: 7, name: 'Phone Case', price: 14.99, image: 'https://picsum.photos/seed/case/400/400', category: 'Accessories', rating: 4.3, reviews: 321 },
  { id: 8, name: 'Power Bank', price: 24.99, image: 'https://picsum.photos/seed/power/400/400', category: 'Electronics', rating: 4.5, reviews: 276 },
]

export default function ProductsPage() {
  const { t } = useI18n()
  const params = useParams()
  const locale = (params.locale as string) || 'en'

  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold'>{t('products.title')}</h1>
        <p className='text-muted-foreground'>{locale === 'zh' ? '发现我们精选的优质商品' : 'Discover our curated selection of quality products'}</p>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {allProducts.map(product => (
          <div key={product.id} className='group overflow-hidden rounded-lg border bg-card'>
            <div className='relative aspect-square'>
              <img src={product.image} alt={product.name} className='h-full w-full object-cover transition-transform group-hover:scale-105' />
              <Button variant='ghost' size='icon' className='absolute right-2 top-2 opacity-0 group-hover:opacity-100'>
                <Heart className='h-4 w-4' />
              </Button>
            </div>
            <div className='p-4'>
              <p className='text-xs text-muted-foreground'>{product.category}</p>
              <h3 className='font-semibold'>{product.name}</h3>
              <div className='mt-1 flex items-center'>
                <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                <span className='ml-1 text-xs'>{product.rating}</span>
                <span className='ml-1 text-xs text-muted-foreground'>({product.reviews})</span>
              </div>
              <div className='mt-3 flex items-center justify-between'>
                <span className='text-lg font-bold'>${product.price}</span>
                <Button size='sm'>
                  <ShoppingCart className='mr-1 h-3 w-3' />
                  {locale === 'zh' ? '购买' : 'Buy'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
