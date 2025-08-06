import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import Logo from '../assets/Logo.png';

function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'nav.home', to: isHome ? '#home' : '/' },
    { key: 'nav.services', to: isHome ? '#services' : '/' },
    { key: 'nav.gallery', to: isHome ? '#gallery' : '/' },
    { key: 'nav.contact', to: isHome ? '#contact' : '/' },
    { key: 'nav.shop', to: '/shop' },
  ];

  const renderLink = (item) => {
    if (item.to.startsWith('#')) {
      return (
        <a
          key={item.key}
          href={item.to}
          className="relative px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-300 group"
        >
          {t(item.key)}
          <span className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300"></span>
        </a>
      );
    }

    return (
      <Link
        key={item.key}
        to={item.to}
        className="relative px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-300 group"
      >
        {t(item.key)}
        <span className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300"></span>
      </Link>
    );
  };

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            aria-label="Home"
          >
            <img 
              src={Logo} 
              alt={t('brand')} 
              className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105" 
            />
            <h1 className="text-xl md:text-2xl font-heading text-primary tracking-wide uppercase">
              <span className="block font-bold">{t('nav.brand')}</span>
              <span className="block text-xs font-normal lowercase">{t('nav.tagline')}</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(renderLink)}
            <div className="border-l border-gray-200 h-6 mx-2" />
            <LanguageToggle className="ml-2" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg 
                  className="h-6 w-6 transform transition-transform duration-200" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg 
                  className="h-6 w-6 transform transition-transform duration-200" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) =>
              item.to.startsWith('#') ? (
                <a
                  key={item.key}
                  href={item.to}
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              ) : (
                <Link
                  key={item.key}
                  to={item.to}
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;