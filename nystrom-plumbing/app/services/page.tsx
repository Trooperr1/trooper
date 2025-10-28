import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: 'Emergency Plumbing Services',
      icon: '🚨',
      description: 'Plumbing emergencies can happen at any time. We offer 24/7 emergency services to address urgent issues quickly and efficiently.',
      features: [
        'Available 24 hours a day, 7 days a week',
        'Fast response time - typically within 1 hour',
        'Burst pipe repairs',
        'Severe leak repairs',
        'Blocked drain emergencies',
        'Water heater failures',
        'Sewer line backups',
      ],
    },
    {
      title: 'Drain Cleaning & Unclogging',
      icon: '🚿',
      description: 'Professional drain cleaning services to clear blockages and restore proper water flow throughout your home or business.',
      features: [
        'Kitchen sink drain cleaning',
        'Bathroom drain clearing',
        'Main line cleaning',
        'Video camera inspection',
        'Hydro jetting services',
        'Root removal',
        'Preventive maintenance',
      ],
    },
    {
      title: 'Water Heater Services',
      icon: '💧',
      description: 'Complete water heater services including installation, repair, and maintenance for all types and brands.',
      features: [
        'Tank water heater installation',
        'Tankless water heater installation',
        'Water heater repairs',
        'Routine maintenance',
        'Energy-efficient upgrades',
        'Same-day service available',
        'All major brands serviced',
      ],
    },
    {
      title: 'Pipe Installation & Repair',
      icon: '🔧',
      description: 'Expert pipe installation, repair, and replacement services for residential and commercial properties.',
      features: [
        'New pipe installation',
        'Pipe repair and patching',
        'Complete pipe replacement',
        'Copper, PEX, and PVC piping',
        'Leak detection and repair',
        'Pipe insulation',
        'Repiping services',
      ],
    },
    {
      title: 'Leak Detection & Repair',
      icon: '💦',
      description: 'Advanced leak detection technology to find and fix hidden leaks before they cause major damage.',
      features: [
        'Electronic leak detection',
        'Thermal imaging',
        'Acoustic leak detection',
        'Slab leak detection',
        'Hidden leak location',
        'Prompt leak repairs',
        'Water damage prevention',
      ],
    },
    {
      title: 'Fixture Installation',
      icon: '🚰',
      description: 'Professional installation and replacement of all plumbing fixtures for your home or business.',
      features: [
        'Faucet installation and repair',
        'Toilet installation and replacement',
        'Sink installation',
        'Shower and bathtub installation',
        'Garbage disposal installation',
        'Water filtration systems',
        'Fixture upgrades',
      ],
    },
    {
      title: 'Sewer Line Services',
      icon: '🔩',
      description: 'Complete sewer line inspection, repair, and replacement services to keep your system flowing properly.',
      features: [
        'Sewer camera inspection',
        'Sewer line repair',
        'Sewer line replacement',
        'Root intrusion removal',
        'Trenchless sewer repair',
        'Sewer line cleaning',
        'Preventive maintenance',
      ],
    },
    {
      title: 'Commercial Plumbing',
      icon: '🏢',
      description: 'Comprehensive plumbing services for businesses, offices, and commercial properties.',
      features: [
        'Commercial installations',
        'Maintenance programs',
        'Emergency commercial service',
        'Restaurant plumbing',
        'Office building plumbing',
        'Retail plumbing services',
        'Industrial plumbing',
      ],
    },
    {
      title: 'Bathroom Remodeling',
      icon: '🛁',
      description: 'Transform your bathroom with our complete plumbing services for remodeling projects.',
      features: [
        'Complete bathroom plumbing',
        'Fixture upgrades',
        'New shower/tub installation',
        'Vanity and sink installation',
        'Toilet replacement',
        'Design consultation',
        'Code compliance',
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Plumbing Services
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive plumbing solutions for homes and businesses in Charlotte
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="grid md:grid-cols-3 gap-8 p-8">
                  <div className="md:col-span-1">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 text-lg">{service.description}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      What We Offer:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          <span className="text-blue-800 font-bold text-lg mr-2">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Nystrom Plumbing?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Response</h3>
              <p className="text-gray-600">Quick arrival times for emergency services</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Upfront Pricing</h3>
              <p className="text-gray-600">No hidden fees or surprise charges</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Work</h3>
              <p className="text-gray-600">Guaranteed workmanship on all services</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Licensed Experts</h3>
              <p className="text-gray-600">Fully licensed and insured professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Contact us today for a free estimate on any of our plumbing services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </Link>
            <a
              href="tel:7045550100"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-500 transition-colors border-2 border-white"
            >
              Call (704) 555-0100
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
