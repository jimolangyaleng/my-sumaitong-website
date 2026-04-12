'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useI18n } from '@/lib/i18n'

export function Footer() {
  const { t } = useI18n()
  const params = useParams()
  const locale = (params.locale as string) || 'en'

  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto px-4 py-8 md:py-12'>
        <div className='grid gap-8 md:grid-cols-3'>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>SumaItong</h3>
            <p className='text-sm text-muted-foreground'>{t('footer.description')}</p>
          </div>
          <div>
            <h4 className='mb-4 text-sm font-semibold'>{locale === 'zh' ? '快速链接' : 'Quick Links'}</h4>
            <nav className='space-y-2'>
              <Link href={`/${locale}`} className='block text-sm text-muted-foreground hover:text-foreground'>
                {t('nav.home')}
              </Link>
              <Link href={`/${locale}/products`} className='block text-sm text-muted-foreground hover:text-foreground'>
                {t('nav.products')}
              </Link>
              <Link href={`/${locale}/about`} className='block text-sm text-muted-foreground hover:text-foreground'>
                {t('nav.about')}
              </Link>
              <Link href={`/${locale}/contact`} className='block text-sm text-muted-foreground hover:text-foreground'>
                {t('nav.contact')}
              </Link>
            </nav>
          </div>
          <div>
            <h4 className='mb-4 text-sm font-semibold'>{locale === 'zh' ? '联系方式' : 'Contact Info'}</h4>
            <div className='space-y-2 text-sm text-muted-foreground'>
              <p>Email: contact@sumaitong.com</p>
              <p>WhatsApp: +1 234 567 890</p>
            </div>
          </div>
        </div>
        <div className='mt-8 border-t pt-8 text-center text-sm text-muted-foreground'>
          © {new Date().getFullYear()} SumaItong. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
