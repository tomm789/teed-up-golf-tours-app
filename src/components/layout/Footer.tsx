import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer 
      className="pt-16 pb-8"
      style={{ backgroundColor: 'var(--tu-ink)', color: 'var(--tu-white)' }}
      role="contentinfo"
    >
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Column 1 - Logo & Description */}
          <div>
            <div className="mb-4">
              <img
                src="/Teed_Up_Logo_Light.png"
                alt="Teed Up Golf Tours"
                className="w-32 h-auto"
              />
            </div>
            <p className="text-white/80 leading-relaxed">
              Discover the world's finest golf courses with expert-guided tours and authentic experiences.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="display-font text-lg mb-6" style={{ color: 'var(--tu-gold)' }}>
              QUICK LINKS
            </h3>
            <nav>
              <ul className="space-y-3">
                <li><Link to="/" className="text-white/80 hover:text-white transition-colors focus-ring">Home</Link></li>
                <li><a href="#about" className="text-white/80 hover:text-white transition-colors focus-ring">About</a></li>
                <li><a href="#contact" className="text-white/80 hover:text-white transition-colors focus-ring">Contact</a></li>
                <li><a href="#careers" className="text-white/80 hover:text-white transition-colors focus-ring">Careers</a></li>
                <li><a href="#blog" className="text-white/80 hover:text-white transition-colors focus-ring">Blog</a></li>
              </ul>
            </nav>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <h3 className="display-font text-lg mb-6" style={{ color: 'var(--tu-gold)' }}>
              LEGAL
            </h3>
            <nav>
              <ul className="space-y-3">
                <li><a href="#privacy" className="text-white/80 hover:text-white transition-colors focus-ring">Privacy Policy</a></li>
                <li><a href="#terms" className="text-white/80 hover:text-white transition-colors focus-ring">Terms of Service</a></li>
                <li><a href="#cookies" className="text-white/80 hover:text-white transition-colors focus-ring">Cookie Policy</a></li>
              </ul>
            </nav>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="display-font text-lg mb-6" style={{ color: 'var(--tu-gold)' }}>
              CONTACT
            </h3>
            <div className="space-y-4">
              <div>
                <a 
                  href="mailto:info@teedupgolftours.com" 
                  className="text-white/80 hover:text-white transition-colors focus-ring block"
                >
                  info@teedupgolftours.com
                </a>
              </div>
              <div>
                <a 
                  href="tel:1800622628" 
                  className="text-white/80 hover:text-white transition-colors focus-ring block"
                >
                  1800 622 628
                </a>
              </div>
              <div>
                <span className="text-white/60 text-sm">
                  24/7 Customer Support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip - Full Width */}
        <div className="border-t border-white/20 pt-8">
          <div className="text-center">
            <div className="text-sm text-white/60">
              © 2025 Teed Up Golf Tours. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

