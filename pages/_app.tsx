import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import '@/styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { locale } = router

  useEffect(() => {
    // Set direction based on locale
    const direction = locale === 'en' ? 'ltr' : 'rtl'
    document.documentElement.setAttribute('dir', direction)
    document.documentElement.setAttribute('lang', locale || 'ku')
  }, [locale])

  return <Component {...pageProps} />
}

export default appWithTranslation(App)
