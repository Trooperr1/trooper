import { motion } from 'framer-motion';
import { Award, Heart, TrendingUp, Shield, Star } from 'lucide-react';
import { CERTIFICATIONS, TIMELINE, TESTIMONIALS } from '../utils/constants';
import { useCounter } from '../hooks/useCounter';

// Team Members Data
const TEAM_MEMBERS = [
  {
    id: '1',
    name: 'John Mitchell',
    role: 'Master Plumber & Founder',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: '25+ years of experience. Licensed Master Plumber.',
    certifications: ['Master Plumber', 'EPA Certified', 'OSHA Safety'],
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Operations Manager',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Ensures every project exceeds expectations.',
    certifications: ['PMP Certified', 'Business Management'],
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    role: 'Lead Technician',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: 'Specialist in commercial plumbing systems.',
    certifications: ['Journeyman Plumber', 'Backflow Certified'],
  },
  {
    id: '4',
    name: 'Emily Thompson',
    role: 'Customer Success Lead',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Dedicated to exceptional customer experiences.',
    certifications: ['Customer Service Excellence'],
  },
];

const STATS = [
  { value: 25, label: 'Years in Business', suffix: '+' },
  { value: 15000, label: 'Projects Completed', suffix: '+' },
  { value: 50, label: 'Expert Technicians', suffix: '+' },
  { value: 99, label: 'Satisfaction Rate', suffix: '%' },
];

function StatCard({ stat }: { stat: typeof STATS[0] }) {
  const { ref, displayValue } = useCounter({
    end: stat.value,
    suffix: stat.suffix,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">{displayValue}</div>
      <p className="text-gray-400">{stat.label}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920')] opacity-5 bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              About <span className="gradient-text">Elite Plumbing</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built on trust, powered by expertise, driven by excellence.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {STATS.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Founded in 1999, Elite Plumbing Pro started as a small family business with a
                  simple mission: deliver exceptional plumbing services with integrity and
                  professionalism.
                </p>
                <p>
                  Over the past 25 years, we've grown into one of the most trusted plumbing
                  companies in the region, serving over 15,000 satisfied customers with our team
                  of 50+ expert technicians.
                </p>
                <p>
                  Our commitment to quality, continuous training, and customer satisfaction has
                  earned us numerous industry awards and an A+ rating from the Better Business
                  Bureau.
                </p>
                <p>
                  Today, we combine traditional craftsmanship with cutting-edge technology to
                  provide the best plumbing solutions for residential and commercial properties.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop"
                alt="Our Team"
                className="rounded-2xl shadow-2xl border border-primary-500/30"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              Our <span className="gradient-text">Core Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield />, title: 'Integrity', description: 'Honest, transparent service' },
              { icon: <Award />, title: 'Excellence', description: 'Uncompromising quality' },
              { icon: <Heart />, title: 'Care', description: 'Treating every home like our own' },
              { icon: <TrendingUp />, title: 'Innovation', description: 'Latest technology & techniques' },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="text-primary-400 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              Our <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-500/30"></div>

            {TIMELINE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-1/2'
                }`}
              >
                <div className="glass-dark p-6 rounded-xl ml-16 md:ml-0">
                  <div className="text-3xl font-bold gradient-text mb-2">{item.year}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 top-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-dark-900 transform -translate-x-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="section-subtitle">
              Expert professionals dedicated to your plumbing needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center group"
              >
                <div className="relative mb-6">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary-500/30 group-hover:border-primary-500/60 transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary-400 text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                <div className="space-y-1">
                  {member.certifications.map((cert, i) => (
                    <div key={i} className="text-xs text-gray-500">
                      ✓ {cert}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              Certifications & <span className="gradient-text">Awards</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark p-6 rounded-xl text-center"
              >
                <div className="text-5xl mb-4">{cert.icon}</div>
                <h3 className="text-lg font-bold mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{cert.issuer}</p>
                <p className="text-xs text-primary-400">Since {cert.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              Client <span className="gradient-text">Testimonials</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6">"{testimonial.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
