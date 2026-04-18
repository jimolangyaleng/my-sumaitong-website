'use client'

import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { products as productsData } from '@/lib/products'

export function ProductsJsonLd() {
  const params = useParams()
  const locale = (params.locale as string) || 'en'

  const allProducts = useMemo(() => {
    return productsData.slice(0, 50).map((p: any, index: number) => ({
      '@type': 'Product',
      name: p.title,
      image: p.image,
      url: p.url,
      offers: {
        '@type': 'Offer',
        price: p.price.replace('$ ', ''),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'SumaItong',
        },
      },
    }))
  }, [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'zh' ? '我们的产品' : 'Our Products',
    description: locale === 'zh' ? '浏览我们精选的优质商品' : 'Browse our curated selection of quality products',
    numberOfItems: productsData.length,
    itemListElement: allProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: product,
    })),
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function ProductOfferJsonLd() {
  const allProducts = useMemo(() => {
    return productsData.slice(0, 10).map((p: any) => ({
      '@type': 'AggregateOffer',
      name: p.title,
      image: p.image,
      url: p.url,
      price: p.price.replace('$ ', ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'SumaItong',
      },
    }))
  }, [])

  return (
    <>
      {allProducts.map((product, index) => (
        <script
          key={index}
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.name,
              image: product.image,
              url: product.url,
              brand: {
                '@type': 'Brand',
                name: 'SumaItong',
              },
              offers: {
                '@type': 'Offer',
                price: product.price,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'Organization',
                  name: 'SumaItong',
                },
              },
            }),
          }}
        />
      ))}
    </>
  )
}