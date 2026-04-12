'use client'

import { useParams } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react'

export default function ContactPage() {
  const { t } = useI18n()
  const params = useParams()
  const locale = (params.locale as string) || 'en'
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <div className='mx-auto max-w-2xl'>
        <h1 className='mb-2 text-3xl font-bold text-center'>{t('contact.title')}</h1>
        <p className='mb-8 text-center text-muted-foreground'>{locale === 'zh' ? '我们随时为您提供帮助' : "We're here to help you anytime"}</p>

        <div className='grid gap-6 md:grid-cols-3 mb-8'>
          <div className='flex flex-col items-center text-center p-4 rounded-lg border bg-card'>
            <Mail className='h-8 w-8 mb-2 text-primary' />
            <p className='font-semibold'>Email</p>
            <p className='text-sm text-muted-foreground'>contact@sumaitong.com</p>
          </div>
          <div className='flex flex-col items-center text-center p-4 rounded-lg border bg-card'>
            <Phone className='h-8 w-8 mb-2 text-primary' />
            <p className='font-semibold'>WhatsApp</p>
            <p className='text-sm text-muted-foreground'>+1 234 567 890</p>
          </div>
          <div className='flex flex-col items-center text-center p-4 rounded-lg border bg-card'>
            <MessageCircle className='h-8 w-8 mb-2 text-primary' />
            <p className='font-semibold'>{locale === 'zh' ? '在线客服' : 'Live Chat'}</p>
            <p className='text-sm text-muted-foreground'>24/7 {locale === 'zh' ? '在线' : 'Available'}</p>
          </div>
        </div>

        {submitted ? (
          <div className='rounded-lg border bg-card p-8 text-center'>
            <Send className='mx-auto h-12 w-12 text-green-500 mb-4' />
            <p className='text-lg font-semibold text-green-500'>{t('contact.success')}</p>
            <Button variant='outline' className='mt-4' onClick={() => setSubmitted(false)}>
              {locale === 'zh' ? '发送新消息' : 'Send New Message'}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-4 rounded-lg border bg-card p-6'>
            <div className='space-y-2'>
              <Label htmlFor='name'>{t('contact.name')}</Label>
              <input id='name' type='text' required className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm' placeholder={locale === 'zh' ? '请输入您的姓名' : 'Enter your name'} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>{t('contact.email')}</Label>
              <input id='email' type='email' required className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm' placeholder={locale === 'zh' ? '请输入您的邮箱' : 'Enter your email'} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='message'>{t('contact.message')}</Label>
              <textarea id='message' required rows={5} className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm' placeholder={locale === 'zh' ? '请输入您的留言' : 'Enter your message'} />
            </div>
            <Button type='submit' className='w-full'>
              {t('contact.submit')}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
