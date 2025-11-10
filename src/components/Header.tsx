import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Droplet } from 'lucide-react';
import { NAV_LINKS, CONTACT_INFO } from '../utils/constants';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 text-center font-bold text-sm md:text-base shadow-lg">
        <span className="inline-flex items-center gap-2 animate-pulse">
          🚨 24/7 EMERGENCY PLUMBING SERVICES AVAILABLE
        </span>
        <a
          href={`tel:${CONTACT_INFO.emergencyPhone}`}
          className="ml-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 inline-block mt-2 md:mt-0"
        >
          CALL NOW: {CONTACT_INFO.emergencyPhone}
        </a>
      </div>

      {/* Main Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-900/95 backdrop-blur-lg shadow-2xl border-b border-primary-500/30'
            : 'bg-dark-900/50 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Droplet className="w-10 h-10 text-primary-500 group-hover:text-primary-400 transition-colors drop-shadow-[0_0_10px_rgba(24,144,255,0.6)]" />
                <div className="absolute inset-0 blur-lg bg-primary-500/30 animate-pulse-slow"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold gradient-text">
                  ELITE PLUMBING
                </span>
                <span className="text-xs text-gray-400 tracking-widest">PRO SERVICES</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-semibold tracking-wide transition-colors group ${
                    location.pathname === link.path
                      ? 'text-primary-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 transition-all duration-300 ${
                      location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* Call Button */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="hidden md:flex items-center gap-2 btn-primary text-sm py-3"
            >
              <Phone className="w-4 h-4" />
              {CONTACT_INFO.phone}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-primary-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-dark-800/95 backdrop-blur-lg border-t border-primary-500/20"
            >
              <div className="flex flex-col p-6 space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-lg font-semibold py-2 transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="btn-primary text-center mt-4"
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
