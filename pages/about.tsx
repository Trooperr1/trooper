import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from '@/components/Layout'
import Head from 'next/head'

export default function About() {
  const { t } = useTranslation('common')

  return (
    <Layout>
      <Head>
        <title>{t('about.title')} - {t('companyName')}</title>
      </Head>

      {/* Hero */}
      <section className="bg-navy-blue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">{t('about.title')}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy-blue mb-6">{t('about.story.title')}</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t('about.story.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-jaff-orange rounded-full flex items-center justify-center flex-shrink-0 ltr:mr-4 rtl:ml-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-blue mb-2">Our Mission</h3>
                    <p className="text-gray-600">{t('about.story.mission')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-jaff-orange rounded-full flex items-center justify-center flex-shrink-0 ltr:mr-4 rtl:ml-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-blue mb-2">Our Vision</h3>
                    <p className="text-gray-600">{t('about.story.vision')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=600&fit=crop"
                alt="JAFF EXPRESS Office"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kurdistan Advantage */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-blue mb-4">{t('about.advantages.title')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-jaff-orange/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-jaff-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-blue mb-3">{t('about.advantages.local')}</h3>
              <p className="text-gray-600">{t('about.advantages.localDesc')}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-jaff-orange/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-jaff-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-blue mb-3">{t('about.advantages.network')}</h3>
              <p className="text-gray-600">{t('about.advantages.networkDesc')}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-jaff-orange/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-jaff-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-blue mb-3">{t('about.advantages.logistics')}</h3>
              <p className="text-gray-600">{t('about.advantages.logisticsDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-navy-blue text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-jaff-orange mb-2">10+</div>
              <div className="text-lg text-gray-300">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-jaff-orange mb-2">50K+</div>
              <div className="text-lg text-gray-300">Successful Deliveries</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-jaff-orange mb-2">98%</div>
              <div className="text-lg text-gray-300">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-jaff-orange mb-2">24/7</div>
              <div className="text-lg text-gray-300">Customer Support</div>
            </div>
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
