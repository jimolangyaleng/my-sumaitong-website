'use client'

import { useParams } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { Award, Users, Globe, TrendingUp } from 'lucide-react'

export default function AboutPage() {
  const { t } = useI18n()
  const params = useParams()
  const locale = (params.locale as string) || 'en'

  const stats = [
    { icon: Users, value: '50K+', label: locale === 'zh' ? '满意客户' : 'Happy Customers' },
    { icon: Globe, value: '100+', label: locale === 'zh' ? '国家/地区' : 'Countries' },
    { icon: Award, value: '500+', label: locale === 'zh' ? '品牌合作' : 'Brand Partners' },
    { icon: TrendingUp, value: '99%', label: locale === 'zh' ? '客户满意度' : 'Satisfaction Rate' },
  ]

  const values = [
    {
      title: locale === 'zh' ? '质量优先' : 'Quality First',
      desc: locale === 'zh' ? '我们只选择最优质的产品和合作伙伴' : 'We only select the finest products and partners',
    },
    {
      title: locale === 'zh' ? '客户至上' : 'Customer First',
      desc: locale === 'zh' ? '您的满意是我们最大的追求' : 'Your satisfaction is our greatest pursuit',
    },
    {
      title: locale === 'zh' ? '诚信经营' : 'Integrity',
      desc: locale === 'zh' ? '透明、诚实是我们做事的方式' : 'Transparency and honesty guide everything we do',
    },
    {
      title: locale === 'zh' ? '持续创新' : 'Continuous Innovation',
      desc: locale === 'zh' ? '不断改进，为您提供更好的服务' : 'Constantly improving to serve you better',
    },
  ]

  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <div className='mx-auto max-w-3xl'>
        <h1 className='mb-6 text-3xl font-bold'>{t('about.title')}</h1>
        <p className='text-lg text-muted-foreground'>{t('about.description')}</p>
      </div>

      <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat, index) => (
          <div key={index} className='flex flex-col items-center text-center p-6 rounded-lg border bg-card'>
            <stat.icon className='h-10 w-10 mb-4 text-primary' />
            <span className='text-3xl font-bold'>{stat.value}</span>
            <span className='text-sm text-muted-foreground'>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className='mt-16'>
        <h2 className='mb-8 text-2xl font-bold text-center'>{locale === 'zh' ? '我们的价值观' : 'Our Values'}</h2>
        <div className='grid gap-6 md:grid-cols-2'>
          {values.map((value, index) => (
            <div key={index} className='p-6 rounded-lg border bg-card'>
              <h3 className='mb-2 text-lg font-semibold'>{value.title}</h3>
              <p className='text-muted-foreground'>{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-16 rounded-lg bg-muted p-8 md:p-12'>
        <h2 className='mb-4 text-2xl font-bold'>{locale === 'zh' ? '为什么选择我们' : 'Why Choose Us'}</h2>
        <ul className='space-y-3 text-muted-foreground'>
          <li>✓ {locale === 'zh' ? '正品保证，所有商品均为正品' : 'Genuine products guaranteed'}</li>
          <li>✓ {locale === 'zh' ? '全球直邮，快速送达' : 'Global shipping with fast delivery'}</li>
          <li>✓ {locale === 'zh' ? '7x24小时客服服务' : '24/7 customer support'}</li>
          <li>✓ {locale === 'zh' ? '30天无理由退换' : '30-day hassle-free returns'}</li>
          <li>✓ {locale === 'zh' ? '安全支付，多种支付方式' : 'Secure payments with multiple options'}</li>
        </ul>
      </div>
    </div>
  )
}
