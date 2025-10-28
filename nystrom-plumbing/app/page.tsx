import Link from 'next/link';

export default function Home() {
  const services = [
    {
      title: 'Emergency Repairs',
      description: '24/7 emergency plumbing services for urgent issues. Fast response time guaranteed.',
      icon: '🚨',
    },
    {
      title: 'Drain Cleaning',
      description: 'Professional drain cleaning and unclogging services for all types of blockages.',
      icon: '🚿',
    },
    {
      title: 'Water Heaters',
      description: 'Installation, repair, and maintenance of all water heater types and brands.',
      icon: '💧',
    },
    {
      title: 'Pipe Installation',
      description: 'Expert pipe installation and replacement for residential and commercial properties.',
      icon: '🔧',
    },
    {
      title: 'Leak Detection',
      description: 'Advanced leak detection technology to find and fix hidden water leaks.',
      icon: '💦',
    },
    {
      title: 'Fixture Installation',
      description: 'Professional installation of faucets, sinks, toilets, and other fixtures.',
      icon: '🚰',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Charlotte, NC',
      rating: 5,
      text: 'Nystrom Plumbing saved the day! Had a pipe burst at 2am and they were here within an hour. Professional, efficient, and reasonably priced.',
    },
    {
      name: 'Michael Chen',
      location: 'Charlotte, NC',
      rating: 5,
      text: 'Best plumber in Charlotte! They installed a new water heater for us and the service was impeccable. Highly recommend!',
    },
    {
      name: 'Emily Davis',
      location: 'Charlotte, NC',
      rating: 5,
      text: 'Very professional and knowledgeable. Fixed our drainage issues quickly and explained everything clearly. Will definitely use again!',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Professional Plumbing Services in Charlotte
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Licensed, insured, and trusted by homeowners across Charlotte. Available 24/7 for emergencies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors text-center"
                >
                  Get Free Quote
                </Link>
                <a
                  href="tel:7045550100"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-500 transition-colors text-center"
                >
                  Call (704) 555-0100
                </a>
              </div>
              <div className="mt-8 flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>24/7 Emergency</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Free Estimates</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🔧</div>
                <h3 className="text-2xl font-bold mb-2">Why Choose Us?</h3>
                <ul className="text-left space-y-2 text-blue-100">
                  <li>✓ 20+ Years Experience</li>
                  <li>✓ Upfront Pricing</li>
                  <li>✓ Quality Workmanship</li>
                  <li>✓ Customer Satisfaction Guaranteed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive plumbing solutions for your home and business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  href="/services"
                  className="text-blue-800 font-semibold hover:text-blue-600 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-900 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by hundreds of satisfied customers in Charlotte
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg shadow-md"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a Plumber? We're Here to Help!
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get a free estimate today. Fast, reliable, and professional service guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Request Service
            </Link>
            <a
              href="tel:7045550100"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-500 transition-colors border-2 border-white"
            >
              Call Now: (704) 555-0100
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
