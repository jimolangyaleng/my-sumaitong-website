export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export function trackProductClick(productName: string, price: string, location: string) {
  trackEvent('product_click', 'engagement', `${productName} - ${price} - ${location}`)
}

export function trackPageView(pagePath: string) {
  trackEvent('page_view', 'navigation', pagePath)
}