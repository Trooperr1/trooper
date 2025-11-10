import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Award, Users, TrendingUp, Star, Quote } from 'lucide-react';
import { SERVICES, STATS, TESTIMONIALS } from '../utils/constants';
import { useCounter } from '../hooks/useCounter';

// Lazy load the 3D component for better performance
const WaterPipes3D = lazy(() =>
  import('../components/WaterPipes3D').then((module) => ({ default: module.WaterPipes3D }))
);

/**
 * Hero Section with 3D Background
 */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Suspense fallback={<div className="w-full h-full bg-dark-900"></div>}>
          <WaterPipes3D />
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900/90 via-dark-900/70 to-dark-900/90"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block px-6 py-3 bg-primary-500/20 border border-primary-500/40 rounded-full">
              <span className="text-primary-300 font-semibold tracking-wider text-sm flex items-center gap-2">
                <Award className="w-4 h-4" />
                CERTIFIED & LICENSED PROFESSIONALS
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              Your <span className="gradient-text">Elite</span>
              <br />
              Plumbing Partner
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Professional plumbing services available 24/7. From emergency repairs to complete
              installations, we deliver excellence with every job. Licensed, insured, and trusted
              by thousands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking" className="btn-primary flex items-center justify-center gap-2">
                Request Service
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:(555)123-4567"
                className="btn-secondary flex items-center justify-center gap-2"
              >
                Call Emergency
                <span className="animate-pulse">🚨</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-500/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Licensed</p>
                  <p className="text-sm text-gray-400">Fully Certified</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">24/7</p>
                  <p className="text-sm text-gray-400">Emergency Service</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">5.0 Rating</p>
                  <p className="text-sm text-gray-400">1000+ Reviews</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-primary-500/30 shadow-2xl shadow-primary-500/20">
              <img
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop"
                alt="Professional Plumber at Work"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>

              {/* Floating Badge 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-6 left-6 glass-dark p-4 rounded-2xl"
              >
                <div className="text-3xl mb-2">🛡️</div>
                <p className="font-bold text-sm">Fully Insured</p>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                className="absolute bottom-6 right-6 glass-dark p-4 rounded-2xl"
              >
                <div className="text-3xl mb-2">⏰</div>
                <p className="font-bold text-sm">Same Day Service</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Statistics Section
 */
function StatsSection() {
  return (
    <section className="section bg-dark-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: typeof STATS[0] }) {
  const { ref, displayValue } = useCounter({
    end: stat.value,
    suffix: stat.suffix,
    prefix: stat.prefix,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center space-y-2"
    >
      <div className="text-5xl md:text-6xl font-bold gradient-text">{displayValue}</div>
      <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
    </motion.div>
  );
}

/**
 * Services Preview Section
 */
function ServicesSection() {
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Our <span className="gradient-text">Premium</span> Services
          </h2>
          <p className="section-subtitle">
            Comprehensive plumbing solutions for residential and commercial properties.
            No job too big or small.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.slice(0, 6).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary-400">{service.title}</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-primary-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-400">{service.price}</span>
                <Link
                  to="/services"
                  className="text-primary-400 hover:text-primary-300 flex items-center gap-1 font-semibold"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="btn-primary">
            View All Services
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Why Choose Us Section
 */
function WhyChooseUsSection() {
  const features = [
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Fast Response',
      description: 'Same-day service available. We arrive on time, every time.',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Expert Team',
      description: 'Licensed, certified, and highly trained plumbers with years of experience.',
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Quality Guarantee',
      description: '100% satisfaction guaranteed with comprehensive warranties.',
    },
  ];

  return (
    <section className="section bg-dark-800/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Why Choose <span className="gradient-text">Elite Plumbing</span>
          </h2>
          <p className="section-subtitle">
            We're not just another plumbing company. We're your trusted partner for all plumbing needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center card"
            >
              <div className="text-primary-400 mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Testimonials Section
 */
function TestimonialsSection() {
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="section-subtitle">
            Don't just take our word for it. See what our satisfied customers have to say.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card relative"
            >
              <Quote className="w-12 h-12 text-primary-500/30 absolute top-6 right-6" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 italic">"{testimonial.comment}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/about" className="btn-secondary">
            Read More Reviews
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * CTA Section
 */
function CTASection() {
  return (
    <section className="section bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            Ready to Experience Elite Service?
          </h2>
          <p className="text-xl text-white/90">
            Don't wait for plumbing problems to get worse. Contact us today for fast,
            professional service you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="px-12 py-5 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider shadow-xl"
            >
              Book Appointment
            </Link>
            <a
              href="tel:(555)123-4567"
              className="px-12 py-5 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary-600 transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider"
            >
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Main Home Page Component
 */
export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
