import React from 'react'
import '@/app/globals.css'
import { GoogleAnalytics } from '@/components/google-analytics'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
