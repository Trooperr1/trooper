import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale })
  }

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'services', href: '/services' },
    { key: 'tracking', href: '/tracking' },
    { key: 'pricing', href: '/pricing' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
  ]

  return (
    <header className="bg-navy-blue sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-12 h-12 bg-jaff-orange rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white font-bold text-2xl">{t('companyName')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-white hover:text-jaff-orange transition-colors duration-200 font-medium"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={() => changeLanguage('ku')}
              className={`px-3 py-1 rounded ${
                router.locale === 'ku' ? 'bg-jaff-orange text-white' : 'bg-gray-700 text-gray-300'
              } hover:bg-jaff-orange hover:text-white transition-colors`}
            >
              {t('languages.ku')}
            </button>
            <button
              onClick={() => changeLanguage('ar')}
              className={`px-3 py-1 rounded ${
                router.locale === 'ar' ? 'bg-jaff-orange text-white' : 'bg-gray-700 text-gray-300'
              } hover:bg-jaff-orange hover:text-white transition-colors`}
            >
              {t('languages.ar')}
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded ${
                router.locale === 'en' ? 'bg-jaff-orange text-white' : 'bg-gray-700 text-gray-300'
              } hover:bg-jaff-orange hover:text-white transition-colors`}
            >
              {t('languages.en')}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block text-white hover:text-jaff-orange py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
