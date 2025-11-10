import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Droplet, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { NAV_LINKS, CONTACT_INFO } from '../utils/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-primary-500/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <Droplet className="w-10 h-10 text-primary-500 group-hover:text-primary-400 transition-colors" />
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold gradient-text">
                  ELITE PLUMBING
                </span>
                <span className="text-xs text-gray-400 tracking-widest">PRO SERVICES</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional plumbing services you can trust. Available 24/7 for emergencies.
              Licensed, insured, and committed to excellence since 1999.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-500/10 hover:bg-primary-500/20 flex items-center justify-center text-primary-400 hover:text-primary-300 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-500/10 hover:bg-primary-500/20 flex items-center justify-center text-primary-400 hover:text-primary-300 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-500/10 hover:bg-primary-500/20 flex items-center justify-center text-primary-400 hover:text-primary-300 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-500/10 hover:bg-primary-500/20 flex items-center justify-center text-primary-400 hover:text-primary-300 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-primary-400 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="text-gray-400 hover:text-primary-400 transition-colors block"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                  <a
                    href={`tel:${CONTACT_INFO.emergencyPhone}`}
                    className="text-red-400 hover:text-red-300 transition-colors block font-semibold mt-1"
                  >
                    Emergency: {CONTACT_INFO.emergencyPhone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-gray-400 hover:text-primary-400 transition-colors block"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  {CONTACT_INFO.address}
                  <br />
                  {CONTACT_INFO.city}, {CONTACT_INFO.state} {CONTACT_INFO.zip}
                </div>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Business Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Clock className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  <p>{CONTACT_INFO.hours.weekday}</p>
                  <p className="mt-1">{CONTACT_INFO.hours.saturday}</p>
                  <p className="mt-1">{CONTACT_INFO.hours.sunday}</p>
                  <p className="mt-3 text-red-400 font-semibold">
                    {CONTACT_INFO.hours.emergency}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-500/10 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Elite Plumbing Pro. All Rights Reserved. | Licensed & Insured
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-primary-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Emergency Button */}
      <a
        href={`tel:${CONTACT_INFO.emergencyPhone}`}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 transform hover:scale-110 transition-all duration-300 z-50 animate-bounce"
        aria-label="Emergency Call"
      >
        <Phone className="w-8 h-8 text-white" />
      </a>
    </footer>
  );
}
