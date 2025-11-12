import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from '@/components/Layout'
import Head from 'next/head'
import { useState } from 'react'

export default function Contact() {
  const { t } = useTranslation('common')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create email subject and body
    const subject = encodeURIComponent(`Contact Form: ${formData.subject}`)
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `)
    window.location.href = `mailto:info@jaffexpress.com?subject=${subject}&body=${body}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Layout>
      <Head>
        <title>{t('contact.title')} - {t('companyName')}</title>
      </Head>

      {/* Hero */}
      <section className="bg-navy-blue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">{t('contact.title')}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-navy-blue mb-8">{t('contact.info.title')}</h2>

              <div className="space-y-6">
                {/* Main Office */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-jaff-orange">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-jaff-orange/10 rounded-full flex items-center justify-center flex-shrink-0 ltr:mr-4 rtl:ml-4">
                      <svg className="w-6 h-6 text-jaff-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-blue mb-2">{t('contact.info.office')}</h3>
                      <p className="text-gray-600">{t('contact.info.officeAddress')}</p>
                    </div>
                  </div>
                </div>

                {/* China Office */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 ltr:mr-4 rtl:ml-4">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-blue mb-2">{t('contact.info.chinaOffice')}</h3>
                      <p className="text-gray-600">{t('contact.info.chinaAddress')}</p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 ltr:mr-4 rtl:ml-4">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-blue mb-2">{t('contact.info.phone')}</h3>
                      <a href="tel:+9647501234567" className="text-jaff-orange hover:underline">+964 750 123 4567</a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-green-50 p-6 rounded-xl shadow-lg border-2 border-green-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 ltr:mr-4 rtl:ml-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-green-900 mb-2">{t('contact.info.whatsapp')}</h3>
                      <a href="https://wa.me/9647501234567" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">
                        +964 750 123 4567
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-jaff-orange/10 rounded-full flex items-center justify-center flex-shrink-0 ltr:mr-4 rtl:ml-4">
                      <svg className="w-6 h-6 text-jaff-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-blue mb-2">{t('contact.info.email')}</h3>
                      <a href="mailto:info@jaffexpress.com" className="text-jaff-orange hover:underline">info@jaffexpress.com</a>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-jaff-orange/10 rounded-full flex items-center justify-center flex-shrink-0 ltr:mr-4 rtl:ml-4">
                      <svg className="w-6 h-6 text-jaff-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-blue mb-2">{t('contact.info.hours')}</h3>
                      <p className="text-gray-600">{t('contact.info.hoursValue')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-navy-blue mb-6">{t('contact.form.title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-navy-blue font-semibold mb-2">{t('contact.form.name')} *</label>
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
                    <label className="block text-navy-blue font-semibold mb-2">{t('contact.form.email')} *</label>
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
                    <label className="block text-navy-blue font-semibold mb-2">{t('contact.form.subject')} *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-navy-blue font-semibold mb-2">{t('contact.form.message')} *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-jaff-orange focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-jaff-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
                  >
                    {t('contact.form.send')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy-blue mb-8 text-center">Our Locations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.5!2d44.0!3d36.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDEyJzAwLjAiTiA0NMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Kurdistan Office"
              ></iframe>
              <div className="bg-navy-blue text-white p-4">
                <h3 className="font-bold text-lg">{t('contact.info.office')}</h3>
                <p className="text-gray-300">{t('contact.info.officeAddress')}</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.7!2d113.3!3d23.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA2JzAwLjAiTiAxMTPCsDE4JzAwLjAiRQ!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="China Office"
              ></iframe>
              <div className="bg-navy-blue text-white p-4">
                <h3 className="font-bold text-lg">{t('contact.info.chinaOffice')}</h3>
                <p className="text-gray-300">{t('contact.info.chinaAddress')}</p>
              </div>
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
