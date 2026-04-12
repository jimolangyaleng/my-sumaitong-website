'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'es', name: 'ES' },
  { code: 'fr', name: 'FR' },
  { code: 'de', name: 'DE' },
  { code: 'ru', name: 'RU' },
]

export function Header() {
  const { t } = useI18n()
  const params = useParams()
  const locale = (params.locale as string) || 'en'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const navItems = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/products`, label: t('nav.products') },
    { href: `/${locale}/about`, label: t('nav.about') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ]

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link href={`/${locale}`} className='flex items-center space-x-2'>
          <span className='text-xl font-bold'>SumaItong</span>
        </Link>

        <nav className='hidden md:flex md:items-center md:space-x-6'>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className='text-sm font-medium transition-colors hover:text-primary'>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center space-x-2'>
          <div className='relative'>
            <Button variant='ghost' size='sm' onClick={() => setLangMenuOpen(!langMenuOpen)} className='text-xs'>
              {languages.find(l => l.code === locale)?.name || 'EN'}
            </Button>
            {langMenuOpen && (
              <div className='absolute right-0 mt-1 w-24 rounded-md border bg-background shadow-md'>
                {languages.map(lang => (
                  <Link key={lang.code} href={`/${lang.code}`} onClick={() => setLangMenuOpen(false)} className={cn('block px-3 py-2 text-xs hover:bg-accent', locale === lang.code && 'bg-accent')}>
                    {lang.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Button variant='ghost' size='icon' className='md:hidden' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className='border-t md:hidden'>
          <div className='container mx-auto space-y-2 px-4 py-4'>
            {navItems.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className='block py-2 text-sm font-medium'>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
