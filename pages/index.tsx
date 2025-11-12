import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from '@/components/Layout'
import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  const { t } = useTranslation('common')

  const services = ['airFreight', 'seaFreight', 'customs', 'doorToDoor']
  const whyReasons = ['speed', 'reliability', 'kurdistan', 'customs', 'pricing', 'support']

  const testimonials = [
    {
      name: 'Ahmed Hussein',
      role: 'Business Owner',
      text: 'JAFF EXPRESS has been incredibly reliable for our China imports. Fast delivery and excellent customer service!',
      rating: 5
    },
    {
      name: 'Sara Mohammed',
      role: 'Online Retailer',
      text: 'The best shipping company for China-Iraq route. Their Kurdistan base makes everything much faster.',
      rating: 5
    },
    {
      name: 'Omar Ali',
      role: 'Importer',
      text: 'Professional customs clearance service. They handle everything smoothly and keep me updated throughout.',
      rating: 5
    }
  ]

  return (
    <Layout>
      <Head>
        <title>{t('companyName')} - {t('hero.subtitle')}</title>
        <meta name="description" content={t('hero.description')} />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-blue via-[#1e3a5f] to-navy-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-jaff-orange/20 border-2 border-jaff-orange px-4 py-2 rounded-full">
                <span className="text-jaff-orange font-semibold">{t('hero.badge')}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {t('hero.title')}
                <span className="block text-jaff-orange mt-2">{t('hero.subtitle')}</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/pricing"
                  className="bg-jaff-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-xl text-center"
                >
                  {t('hero.cta.quote')}
                </Link>
                <Link
                  href="/tracking"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-navy-blue text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 text-center"
                >
                  {t('hero.cta.track')}
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-jaff-orange mb-1">
                    {t('hero.trust.experienceYears')}
                  </div>
                  <div className="text-sm text-gray-300">{t('hero.trust.experience')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-jaff-orange mb-1">
                    {t('hero.trust.deliveriesCount')}
                  </div>
                  <div className="text-sm text-gray-300">{t('hero.trust.deliveries')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-jaff-orange mb-1">
                    {t('hero.trust.satisfactionRate')}
                  </div>
                  <div className="text-sm text-gray-300">{t('hero.trust.satisfaction')}</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop"
                  alt="Shipping Container"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-blue/60 to-transparent"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white text-navy-blue p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-jaff-orange rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-blue mb-4">{t('services.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('services.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-jaff-orange/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-jaff-orange transition-colors">
                  <svg className="w-8 h-8 text-jaff-orange group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-navy-blue mb-3">{t(`services.${service}.title`)}</h3>
                <p className="text-gray-600 mb-4">{t(`services.${service}.description`)}</p>
                <ul className="space-y-2">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-jaff-orange ltr:mr-2 rtl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t(`services.${service}.features.${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-navy-blue hover:bg-jaff-orange text-white px-8 py-4 rounded-lg font-bold transition-all duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-navy-blue text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('why.title')}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t('why.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyReasons.map((reason) => (
              <div
                key={reason}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-jaff-orange rounded-full flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{t(`why.${reason}.title`)}</h3>
                <p className="text-gray-300">{t(`why.${reason}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-blue mb-4">{t('testimonials.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-jaff-orange rounded-full flex items-center justify-center text-white font-bold ltr:mr-4 rtl:ml-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-navy-blue">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-jaff-orange to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ship with JAFF EXPRESS?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get started today and experience the most reliable shipping service from China to Iraq
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-white text-jaff-orange hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              Get A Free Quote
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-jaff-orange px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              Contact Us
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
