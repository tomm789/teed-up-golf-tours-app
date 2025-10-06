import React, { useState, useEffect } from 'react';
import { Search, Phone, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { tourData } from '@/data/tours';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false);

  // Determine if we're on the homepage
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-tours-dropdown]')) {
        setIsToursDropdownOpen(false);
      }
    };

    if (isToursDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isToursDropdownOpen]);

  // Determine header background and text colors
  const shouldShowDarkBackground = isHomepage ? isScrolled : true;
  const headerBackground = shouldShowDarkBackground ? 'var(--tu-navy)' : 'transparent';
  const textColor = shouldShowDarkBackground ? 'var(--tu-gold)' : 'white';
  const hoverColor = shouldShowDarkBackground ? 'hover:text-yellow-300' : 'hover:text-gray-200';

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 header-transition ${
          shouldShowDarkBackground 
            ? 'shadow-lg' 
            : 'bg-transparent'
        }`}
        style={{ backgroundColor: headerBackground }}
        role="banner"
      >
        <div className="container">
          <nav className="flex items-center h-16" role="navigation" aria-label="Main navigation">
            {/* Left - Logo and Icons */}
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="focus-ring flex-shrink-0"
                aria-label="Teed Up Golf Tours - Home"
              >
                <img
                  src="/Teed_Up_Logo_Orig.png"
                  alt="Teed Up Golf Tours"
                  className="w-[120px] h-[120px] object-contain"
                />
              </Link>
              
              {/* Search and Phone Icons - Desktop Only */}
              <div className="hidden md:flex items-center space-x-2">
                <button 
                  className={`p-2 rounded-full transition-colors focus-ring hover:bg-white/20`}
                  style={{ color: textColor }}
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                <a 
                  href="tel:1800622628" 
                  className={`p-2 rounded-full transition-colors focus-ring hover:bg-white/20`}
                  style={{ color: textColor }}
                  aria-label="Call us at 1800 622 628"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right - Tours and Menu (Desktop) */}
            <div className="hidden md:flex items-center space-x-6 ml-auto" data-tours-dropdown>
              <button 
                className={`flex items-center space-x-1 font-medium uppercase text-sm tracking-wide transition-colors focus-ring ${hoverColor}`}
                style={{ color: textColor }}
                onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
                aria-expanded={isToursDropdownOpen}
              >
                <span>Tours</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isToursDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <button 
                className={`flex items-center space-x-1 font-medium uppercase text-sm tracking-wide transition-colors focus-ring ${hoverColor}`}
                style={{ color: textColor }}
                aria-expanded={false}
              >
                <span>Menu</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile - Search, Phone, and Menu */}
            <div className="flex md:hidden items-center space-x-2 ml-auto">
              <button 
                className={`p-2 rounded-full transition-colors focus-ring hover:bg-white/20`}
                style={{ color: textColor }}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <a 
                href="tel:1800622628" 
                className={`p-2 rounded-full transition-colors focus-ring hover:bg-white/20`}
                style={{ color: textColor }}
                aria-label="Call us at 1800 622 628"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button 
                className={`p-2 rounded-full transition-colors focus-ring hover:bg-white/20`}
                style={{ color: textColor }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div 
              className="md:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="py-4 space-y-2">
                {/* Tours Section */}
                <div className="px-4 py-2">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Tours
                  </div>
                  <div className="space-y-1">
                    {tourData.slice(0, 5).map((tour) => (
                      <Link
                        key={tour.key}
                        to={`/tour/${tour.slug}`}
                        className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 focus-ring rounded"
                        role="menuitem"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {tour.title}
                      </Link>
                    ))}
                    <Link
                      to="/tours-demo"
                      className="block px-2 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 focus-ring rounded"
                      role="menuitem"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      View All Tours →
                    </Link>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 my-2"></div>
                
                {/* Other Pages */}
                <Link 
                  to="/" 
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-50 focus-ring"
                  role="menuitem"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/luxury" 
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-50 focus-ring"
                  role="menuitem"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Luxury Tours
                </Link>
                <Link 
                  to="/about" 
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-50 focus-ring"
                  role="menuitem"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/contact" 
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-50 focus-ring"
                  role="menuitem"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <a 
                  href="tel:1800622628" 
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-50 focus-ring"
                  role="menuitem"
                >
                  Call: 1800 622 628
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Tours Dropdown */}
      {isToursDropdownOpen && (
        <div 
          className="fixed top-16 left-0 right-0 z-40 shadow-xl border-t border-gray-200"
          style={{ backgroundColor: 'var(--tu-navy)' }}
          data-tours-dropdown
        >
          <div className="py-8 pb-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="container">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {tourData.map((tour) => (
                  <Link
                    key={tour.key}
                    to={`/tour/${tour.slug}`}
                    className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 focus-ring hover:transform hover:scale-105"
                    onClick={() => setIsToursDropdownOpen(false)}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={tour.images.hero}
                        alt={`${tour.title} golf tour`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 
                        className="display-font text-sm mb-1 group-hover:text-opacity-80 transition-colors"
                        style={{ color: 'var(--tu-navy)' }}
                      >
                        {tour.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {tour.dates}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  to="/tours-demo"
                  className="inline-block px-8 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all hover:transform hover:scale-105 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                  style={{ 
                    backgroundColor: 'var(--tu-gold)', 
                    color: 'var(--tu-navy)' 
                  }}
                  onClick={() => setIsToursDropdownOpen(false)}
                >
                  VIEW ALL TOURS →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
