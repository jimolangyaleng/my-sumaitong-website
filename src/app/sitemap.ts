import { MetadataRoute } from 'next'
import { locales } from '@/i18n'
import productsData from '@/json/product.json'

const BASE_URL = 'https://sumaitong.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = locales.flatMap(locale => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/${locale}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ])

  const productPages: MetadataRoute.Sitemap = locales.flatMap(locale =>
    productsData.slice(0, 50).map((product: any) => ({
      url: product.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  )

  return [...staticPages, ...productPages]
}
