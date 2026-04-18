import { Metadata } from 'next'
import productsData from '@/json/product.json'

const BASE_URL = 'https://sumaitong.com'

export function generateProductsMetadata(locale: string): Metadata {
  const localeNames: Record<string, string> = {
    en: 'English',
    zh: 'Chinese',
    ja: 'Japanese',
    ko: 'Korean',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    ru: 'Russian',
  }

  const titles: Record<string, string> = {
    en: 'Shop Quality Products - Coffee Capsule Storage, Pet Supplies & More',
    zh: 'Shop Quality Products - Coffee Capsule Storage, Pet Supplies & More',
    ja: 'Shop Quality Products - Coffee Capsule Storage, Pet Supplies & More',
    ko: 'Shop Quality Products - Coffee Capsule Storage, Pet Supplies & More',
    es: 'Shop Quality Products - Coffee Capsule Storage, Pet Supplies & More',
    fr: 'Shop Quality Products - Coffee Capsule Storage, Pet Supplies & More',
    de: 'Shop Quality Products - Coffee Capsule Storage, Pet Supplies & More',
    ru: 'Shop Quality Products - Coffee Capsule Storage, Pet Supplies & More',
  }

  const descriptions: Record<string, string> = {
    en: 'Browse our curated collection of quality products including coffee capsule storage solutions, pet supplies, and home organization items. Competitive prices and fast shipping available.',
    zh: 'Browse our curated collection of quality products including coffee capsule storage solutions, pet supplies, and home organization items. Competitive prices and fast shipping available.',
    ja: 'Browse our curated collection of quality products including coffee capsule storage solutions, pet supplies, and home organization items. Competitive prices and fast shipping available.',
    ko: 'Browse our curated collection of quality products including coffee capsule storage solutions, pet supplies, and home organization items. Competitive prices and fast shipping available.',
    es: 'Browse our curated collection of quality products including coffee capsule storage solutions, pet supplies, and home organization items. Competitive prices and fast shipping available.',
    fr: 'Browse our curated collection of quality products including coffee capsule storage solutions, pet supplies, and home organization items. Competitive prices and fast shipping available.',
    de: 'Browse our curated collection of quality products including coffee capsule storage solutions, pet supplies, and home organization items. Competitive prices and fast shipping available.',
    ru: 'Browse our curated collection of quality products including coffee capsule storage solutions, pet supplies, and home organization items. Competitive prices and fast shipping available.',
  }

  const productKeywords = productsData
    .slice(0, 10)
    .map((p: any) => {
      const words = p.title.split(',').map((w: string) => w.trim())
      return words.slice(0, 3)
    })
    .flat()

  const keywords = ['online shopping', 'quality products', 'coffee capsule storage', 'pet supplies', 'home organization', localeNames[locale] || 'English', ...productKeywords].slice(0, 15)

  const localeMap: Record<string, string> = {
    en: 'en_US',
    zh: 'zh_CN',
    ja: 'ja_JP',
    ko: 'ko_KR',
    es: 'es_ES',
    fr: 'fr_FR',
    de: 'de_DE',
    ru: 'ru_RU',
  }

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/products`,
      languages: {
        'en-US': `${BASE_URL}/en/products`,
        'zh-CN': `${BASE_URL}/zh/products`,
        'ja-JP': `${BASE_URL}/ja/products`,
        'ko-KR': `${BASE_URL}/ko/products`,
        'es-ES': `${BASE_URL}/es/products`,
        'fr-FR': `${BASE_URL}/fr/products`,
        'de-DE': `${BASE_URL}/de/products`,
        'ru-RU': `${BASE_URL}/ru/products`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${BASE_URL}/${locale}/products`,
      siteName: 'SumaItong',
      locale: localeMap[locale] || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
  }
}
