import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Filter } from 'lucide-react';
import { SERVICES } from '../utils/constants';
import type { Service } from '../types';

export default function Services() {
  const [filter, setFilter] = useState<'all' | Service['category']>('all');

  const filteredServices = filter === 'all'
    ? SERVICES
    : SERVICES.filter(service => service.category === filter);

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'maintenance', label: 'Maintenance' },
  ] as const;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1920')] opacity-5 bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive plumbing solutions tailored to your needs. From emergency repairs
              to complete installations, we've got you covered 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Filter className="w-5 h-5 text-primary-400" />
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setFilter(category.value)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  filter === category.value
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/50'
                    : 'bg-dark-700/50 text-gray-300 hover:bg-dark-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="card group hover:scale-105"
              >
                {/* Service Icon */}
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>

                {/* Service Title */}
                <h3 className="text-2xl font-bold mb-4 text-primary-400 group-hover:text-primary-300 transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="mt-auto pt-6 border-t border-primary-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Starting at</span>
                    <span className="text-2xl font-bold text-primary-400">{service.price}</span>
                  </div>
                  <Link
                    to="/booking"
                    className="btn-primary w-full text-center flex items-center justify-center gap-2"
                  >
                    Book This Service
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* Category Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 bg-primary-500/20 border border-primary-500/40 rounded-full text-xs font-semibold text-primary-300 uppercase">
                    {service.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredServices.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No services found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="section bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-6xl mb-4 animate-pulse">🚨</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Need Emergency Service?
            </h2>
            <p className="text-xl text-white/90">
              We're available 24/7 for plumbing emergencies. Fast response, expert solutions.
            </p>
            <a
              href="tel:(555)911-HELP"
              className="inline-block px-12 py-5 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider shadow-xl text-xl"
            >
              Call Emergency Line: (555) 911-HELP
            </a>
          </motion.div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="section bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="text-5xl mb-4">💯</div>
              <h3 className="text-xl font-bold mb-2">100% Satisfaction</h3>
              <p className="text-gray-400">Guaranteed quality work or your money back</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">Free Estimates</h3>
              <p className="text-gray-400">Transparent pricing with no hidden fees</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Warranty Included</h3>
              <p className="text-gray-400">All work backed by comprehensive warranty</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
