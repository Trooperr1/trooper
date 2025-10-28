import Link from 'next/link';

export default function About() {
  const teamMembers = [
    {
      name: 'Erik Nystrom',
      role: 'Owner & Master Plumber',
      experience: '25+ years',
      description: 'Licensed master plumber with a passion for quality workmanship and customer satisfaction.',
    },
    {
      name: 'David Martinez',
      role: 'Lead Technician',
      experience: '15+ years',
      description: 'Specializes in emergency repairs and complex plumbing installations.',
    },
    {
      name: 'Jennifer Walsh',
      role: 'Service Manager',
      experience: '10+ years',
      description: 'Ensures every customer receives exceptional service and support.',
    },
  ];

  const values = [
    {
      title: 'Quality Workmanship',
      description: 'We take pride in every job, ensuring the highest standards of quality and craftsmanship.',
      icon: '⭐',
    },
    {
      title: 'Honest Pricing',
      description: 'Transparent, upfront pricing with no hidden fees or surprises.',
      icon: '💎',
    },
    {
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to exceed expectations.',
      icon: '🤝',
    },
    {
      title: 'Reliability',
      description: 'On-time service and dependable solutions you can count on.',
      icon: '⏰',
    },
    {
      title: 'Expertise',
      description: 'Licensed, insured, and continuously trained in the latest plumbing technologies.',
      icon: '🎓',
    },
    {
      title: 'Community Focused',
      description: 'Proud to serve Charlotte and contribute to our local community.',
      icon: '🏘️',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Nystrom Plumbing
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Serving Charlotte with excellence since 2000
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  Nystrom Plumbing was founded in 2000 by Erik Nystrom, a master plumber with a vision to provide Charlotte with honest, reliable, and professional plumbing services. What started as a one-man operation has grown into a trusted team of skilled professionals.
                </p>
                <p>
                  Over the past two decades, we've built our reputation on quality workmanship, transparent pricing, and exceptional customer service. We're not just plumbers – we're your neighbors, committed to keeping Charlotte's homes and businesses running smoothly.
                </p>
                <p>
                  Today, Nystrom Plumbing is proud to be one of Charlotte's most trusted plumbing companies, serving thousands of satisfied customers throughout the region. Our commitment to excellence remains as strong as it was on day one.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Charlotte Trusts Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-800 font-bold text-xl mr-3">✓</span>
                  <div>
                    <strong className="text-gray-900">20+ Years in Business</strong>
                    <p className="text-gray-600">Two decades of trusted service in Charlotte</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-800 font-bold text-xl mr-3">✓</span>
                  <div>
                    <strong className="text-gray-900">Licensed & Insured</strong>
                    <p className="text-gray-600">Fully licensed master plumbers and comprehensive insurance</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-800 font-bold text-xl mr-3">✓</span>
                  <div>
                    <strong className="text-gray-900">5,000+ Happy Customers</strong>
                    <p className="text-gray-600">Thousands of satisfied customers across Charlotte</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-800 font-bold text-xl mr-3">✓</span>
                  <div>
                    <strong className="text-gray-900">24/7 Emergency Service</strong>
                    <p className="text-gray-600">Always available when you need us most</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to your satisfaction
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-8 text-center"
              >
                <div className="w-32 h-32 bg-blue-800 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-800 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.experience} experience</p>
                <p className="text-gray-700">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the Nystrom Difference
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers who trust Nystrom Plumbing for all their plumbing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-500 transition-colors border-2 border-white"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
