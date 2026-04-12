'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useParams } from 'next/navigation'
import { messages, getLangMessages } from '@/lib/messages'

type Messages = typeof messages.en

interface I18nContextType {
  locale: string
  t: (key: string) => string
  messages: Messages
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const params = useParams()
  const locale = (params.locale as string) || 'en'
  const [msgs, setMsgs] = useState<Messages>(messages.en)

  useEffect(() => {
    setMsgs(getLangMessages(locale))
  }, [locale])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = msgs
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return <I18nContext.Provider value={{ locale, t, messages: msgs }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
