'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, ShoppingCart, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { products as productsData } from '@/lib/products'
import { trackProductClick } from '@/lib/analytics'
import { ProductsJsonLd, ProductOfferJsonLd } from '@/components/seo/products-json-ld'
import { useState, useMemo } from 'react'

export default function ProductsPage() {
  const { t } = useI18n()
  const params = useParams()
  const locale = (params.locale as string) || 'en'
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(100)

  const allProducts = productsData.map((p: any, index: number) => ({
    id: index + 1,
    name: p.title,
    price: p.price,
    image: p.image,
    url: p.url,
  }))

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return allProducts
    const query = searchQuery.toLowerCase()
    return allProducts.filter(product => product.name.toLowerCase().includes(query))
  }, [allProducts, searchQuery])

  const totalProducts = filteredProducts.length
  const totalPages = Math.ceil(totalProducts / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalProducts)
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const handleJumpToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const page = parseInt(e.currentTarget.value)
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page)
      } else if (page > totalPages) {
        setCurrentPage(totalPages)
      } else {
        setCurrentPage(1)
      }
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <ProductsJsonLd />
      <ProductOfferJsonLd />
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold'>{t('products.title')}</h1>
        <p className='text-muted-foreground'>{locale === 'zh' ? '发现我们精选的优质商品' : 'Discover our curated selection of quality products'}</p>
      </div>

      <div className='mb-6'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            type='text'
            placeholder={locale === 'zh' ? '搜索产品名称...' : 'Search by product name...'}
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className='pl-10 max-w-md'
          />
        </div>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {currentProducts.map(product => (
          <a key={product.id} href={product.url} target='_blank' rel='noopener noreferrer' className='group overflow-hidden rounded-lg border bg-card' onClick={() => trackProductClick(product.name, product.price, 'products_page')}>
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
                <Button
                  size='sm'
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    trackProductClick(product.name, product.price, 'products_page_buy_button')
                    window.open(product.url, '_blank')
                  }}
                >
                  <ShoppingCart className='h-3 w-3 mr-1' />
                  {locale === 'zh' ? '购买' : 'Buy'}
                </Button>
              </div>
            </div>
          </a>
        ))}
      </div>

      {totalProducts === 0 && <div className='text-center py-12 text-muted-foreground'>{locale === 'zh' ? '未找到匹配的产品' : 'No products found matching your search'}</div>}

      {totalProducts > 0 && (
        <div className='mt-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-muted-foreground'>{locale === 'zh' ? '每页显示' : 'Show per page'}</span>
            <div className='flex gap-1'>
              {[10, 30, 50, 100].map(size => (
                <Button key={size} variant={pageSize === size ? 'default' : 'outline'} size='sm' onClick={() => handlePageSizeChange(size)}>
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-sm text-muted-foreground'>
              {startIndex + 1}-{endIndex} / {totalProducts}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' onClick={handlePrevPage} disabled={currentPage === 1}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <div className='flex items-center gap-1'>
              <span className='text-sm text-muted-foreground'>{locale === 'zh' ? '页' : 'Page'}</span>
              <Input
                type='number'
                min={1}
                max={totalPages}
                value={currentPage}
                onKeyDown={handleJumpToPage}
                onChange={e => {
                  const page = parseInt(e.target.value)
                  if (page >= 1 && page <= totalPages) {
                    setCurrentPage(page)
                  }
                }}
                className='w-16 h-8 text-center'
              />
              <span className='text-sm text-muted-foreground'>/ {totalPages}</span>
            </div>
            <Button variant='outline' size='sm' onClick={handleNextPage} disabled={currentPage === totalPages}>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
