import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from '@/components/Layout'
import Head from 'next/head'
import { useState } from 'react'

export default function Tracking() {
  const { t } = useTranslation('common')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingNumber.trim()) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTrackingResult({
        number: trackingNumber,
        status: 'transit',
        lastUpdate: new Date().toISOString(),
        timeline: [
          { status: 'received', date: '2024-01-15', completed: true },
          { status: 'transit', date: '2024-01-18', completed: true },
          { status: 'customs', date: '2024-01-20', completed: false },
          { status: 'delivery', date: 'Pending', completed: false },
        ]
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <Layout>
      <Head>
        <title>{t('tracking.title')} - {t('companyName')}</title>
      </Head>

      {/* Hero */}
      <section className="bg-navy-blue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">{t('tracking.title')}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('tracking.subtitle')}
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <form onSubmit={handleTrack} className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={t('tracking.placeholder')}
                className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none text-lg"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-jaff-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Tracking...' : t('tracking.button')}
              </button>
            </div>
          </form>

          {/* Tracking Result */}
          {trackingResult && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-navy-blue mb-2">Tracking Number: {trackingResult.number}</h2>
                <p className="text-gray-600">Last Update: {new Date(trackingResult.lastUpdate).toLocaleString()}</p>
              </div>

              <div className="space-y-6">
                {trackingResult.timeline.map((item: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {item.completed ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="ltr:ml-6 rtl:mr-6 flex-1">
                      <h3 className={`text-lg font-bold mb-1 ${item.completed ? 'text-navy-blue' : 'text-gray-400'}`}>
                        {t(`tracking.status.${item.status}`)}
                      </h3>
                      <p className="text-gray-600">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-600 ltr:mr-3 rtl:ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-green-900">Current Status: In Transit</h4>
                    <p className="text-green-700">Your shipment is on its way to the customs clearance facility.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Cards */}
          {!trackingResult && (
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="font-bold text-navy-blue mb-2">Real-Time Updates</h3>
                <p className="text-gray-600">Track your shipment in real-time from China to Iraq</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="text-3xl mb-3">🔔</div>
                <h3 className="font-bold text-navy-blue mb-2">Instant Notifications</h3>
                <p className="text-gray-600">Get notified at every stage of your delivery</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-bold text-navy-blue mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our team is always ready to help you</p>
              </div>
            </div>
          )}
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
