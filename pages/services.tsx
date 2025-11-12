import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from '@/components/Layout'
import Head from 'next/head'
import Link from 'next/link'

export default function Services() {
  const { t } = useTranslation('common')

  const services = [
    {
      key: 'airFreight',
      icon: '✈️',
      color: 'from-blue-500 to-blue-600'
    },
    {
      key: 'seaFreight',
      icon: '🚢',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      key: 'customs',
      icon: '📋',
      color: 'from-green-500 to-green-600'
    },
    {
      key: 'doorToDoor',
      icon: '🚚',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <Layout>
      <Head>
        <title>{t('nav.services')} - {t('companyName')}</title>
      </Head>

      {/* Hero */}
      <section className="bg-navy-blue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">{t('services.title')}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service) => (
              <div
                key={service.key}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h2 className="text-3xl font-bold">{t(`services.${service.key}.title`)}</h2>
                </div>
                <div className="p-8">
                  <p className="text-lg text-gray-700 mb-6">
                    {t(`services.${service.key}.description`)}
                  </p>
                  <h3 className="font-bold text-navy-blue mb-4 text-lg">Key Features:</h3>
                  <ul className="space-y-3">
                    {[0, 1, 2, 3].map((i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-6 h-6 text-jaff-orange ltr:mr-3 rtl:ml-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{t(`services.${service.key}.features.${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-jaff-orange to-orange-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Request a quote and let us handle your shipping needs</p>
            <Link
              href="/pricing"
              className="inline-block bg-white text-jaff-orange hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              Request A Quote
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ku', ['common'])),
    },
  }
}
