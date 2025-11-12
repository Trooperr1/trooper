import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from '@/components/Layout'
import Head from 'next/head'
import { useState } from 'react'

export default function Pricing() {
  const { t } = useTranslation('common')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    origin: 'China',
    destination: 'Kurdistan, Iraq',
    weight: '',
    dimensions: '',
    serviceType: '',
    description: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create WhatsApp message
    const message = `
New Quote Request:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
WhatsApp: ${formData.whatsapp}
From: ${formData.origin}
To: ${formData.destination}
Weight: ${formData.weight}kg
Dimensions: ${formData.dimensions}cm
Service: ${formData.serviceType}
Description: ${formData.description}
    `.trim()

    const whatsappNumber = '9647501234567'
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Layout>
      <Head>
        <title>{t('quote.title')} - {t('companyName')}</title>
      </Head>

      {/* Hero */}
      <section className="bg-navy-blue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">{t('quote.title')}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('quote.subtitle')}
          </p>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-navy-blue font-semibold mb-2">{t('quote.form.name')} *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-navy-blue font-semibold mb-2">{t('quote.form.email')} *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-navy-blue font-semibold mb-2">{t('quote.form.phone')} *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-navy-blue font-semibold mb-2">{t('quote.form.whatsapp')}</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-navy-blue font-semibold mb-2">{t('quote.form.origin')} *</label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-navy-blue font-semibold mb-2">{t('quote.form.destination')} *</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-navy-blue font-semibold mb-2">{t('quote.form.weight')} *</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-navy-blue font-semibold mb-2">{t('quote.form.dimensions')}</label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="L x W x H"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-navy-blue font-semibold mb-2">{t('quote.form.serviceType')} *</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none"
                  required
                >
                  <option value="">Select service type</option>
                  <option value="air">{t('quote.serviceTypes.air')}</option>
                  <option value="sea">{t('quote.serviceTypes.sea')}</option>
                  <option value="door">{t('quote.serviceTypes.door')}</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-navy-blue font-semibold mb-2">{t('quote.form.description')}</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-jaff-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              {t('quote.form.submit')}
            </button>
          </form>

          {/* Info Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-navy-blue mb-2">Fast Response</h3>
              <p className="text-gray-600">Get a quote within 24 hours</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold text-navy-blue mb-2">Best Rates</h3>
              <p className="text-gray-600">Competitive pricing guaranteed</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-bold text-navy-blue mb-2">No Obligation</h3>
              <p className="text-gray-600">Free quote, no commitment</p>
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
