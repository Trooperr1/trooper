import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { CONTACT_INFO } from '../utils/constants';
import type { ContactFormData } from '../types';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact Form Data:', data);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 5000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920')] opacity-5 bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions? Need a quote? We're here to help! Contact us today and
              experience the Elite Plumbing difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.a
              href={`tel:${CONTACT_INFO.phone}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card group hover:scale-105 text-center"
            >
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/30 transition-all">
                <Phone className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Phone</h3>
              <p className="text-gray-400 mb-1">{CONTACT_INFO.phone}</p>
              <p className="text-sm text-red-400 font-semibold">24/7 Emergency</p>
            </motion.a>

            <motion.a
              href={`mailto:${CONTACT_INFO.email}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card group hover:scale-105 text-center"
            >
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/30 transition-all">
                <Mail className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-gray-400 text-sm break-all">{CONTACT_INFO.email}</p>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card group hover:scale-105 text-center"
            >
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/30 transition-all">
                <MapPin className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p className="text-gray-400 text-sm">
                {CONTACT_INFO.address}
                <br />
                {CONTACT_INFO.city}, {CONTACT_INFO.state} {CONTACT_INFO.zip}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card group hover:scale-105 text-center"
            >
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/30 transition-all">
                <Clock className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Hours</h3>
              <p className="text-gray-400 text-sm">
                Mon-Fri: 7AM - 7PM
                <br />
                Sat: 8AM - 5PM
                <br />
                <span className="text-red-400 font-semibold">24/7 Emergency</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400">
                    Thank you for contacting us. We'll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name *</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <span className="text-red-400 text-sm">{errors.name.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <span className="text-red-400 text-sm">{errors.email.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone *</label>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      type="tel"
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <span className="text-red-400 text-sm">{errors.phone.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Subject *</label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="How can we help?"
                    />
                    {errors.subject && (
                      <span className="text-red-400 text-sm">{errors.subject.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Message *</label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={6}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your plumbing needs..."
                    ></textarea>
                    {errors.message && (
                      <span className="text-red-400 text-sm">{errors.message.message}</span>
                    )}
                  </div>

                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Embedded Map */}
              <div className="card p-0 overflow-hidden h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.2740768069!2d-118.69192993534945!3d34.02016130496291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Elite Plumbing Location"
                ></iframe>
              </div>

              {/* Business Hours Card */}
              <div className="card">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary-400" />
                  Business Hours
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-dark-700">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="font-semibold">7:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-dark-700">
                    <span className="text-gray-400">Saturday</span>
                    <span className="font-semibold">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-dark-700">
                    <span className="text-gray-400">Sunday</span>
                    <span className="font-semibold text-red-400">Emergency Only</span>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
                    <p className="text-red-400 font-bold text-center">
                      🚨 24/7 Emergency Service Available
                    </p>
                    <a
                      href={`tel:${CONTACT_INFO.emergencyPhone}`}
                      className="block text-center mt-2 text-white hover:text-red-300 transition-colors"
                    >
                      {CONTACT_INFO.emergencyPhone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="card">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary-400" />
                  Service Areas
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    'Los Angeles',
                    'Beverly Hills',
                    'Santa Monica',
                    'Pasadena',
                    'Glendale',
                    'Burbank',
                    'West Hollywood',
                    'Culver City',
                  ].map((area, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 text-primary-400 flex-shrink-0" />
                      {area}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-4 pt-4 border-t border-dark-700">
                  Don't see your area? <span className="text-primary-400">Contact us</span> to check availability!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'Do you offer emergency services?',
                a: 'Yes! We provide 24/7 emergency plumbing services. Call our emergency line anytime for immediate assistance.',
              },
              {
                q: 'Are you licensed and insured?',
                a: 'Absolutely. We are fully licensed, bonded, and insured. Our plumbers are certified professionals with years of experience.',
              },
              {
                q: 'Do you provide free estimates?',
                a: 'Yes, we provide free, no-obligation estimates for all major work. Contact us to schedule an assessment.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept cash, checks, and all major credit cards. We also offer financing options for larger projects.',
              },
              {
                q: 'Do you warranty your work?',
                a: 'Yes! All our work comes with a comprehensive warranty. We stand behind the quality of our services.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <h3 className="text-lg font-bold mb-3 text-primary-400">{faq.q}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
