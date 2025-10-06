import React from 'react';
import { Link } from 'react-router-dom';

const FeatureBlockB: React.FC = () => {
  return (
    <section 
      className="section-spacing"
      style={{ backgroundColor: 'var(--tu-warmgray)' }}
      aria-labelledby="feature-b-title"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-6">
            <div>
              <h2 
                id="feature-b-title"
                className="display-font text-3xl lg:text-4xl xl:text-5xl leading-tight mb-6"
                style={{ color: 'var(--tu-navy)' }}
              >
                LUXURY SPORTING TOURS
              </h2>
            </div>
            
            <p className="text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--tu-ink)' }}>
              From the US Masters to the Super Bowl, Wimbledon, the Melbourne Cup and more, 
              our fully-escorted sporting trips blend world-class events with golf in 
              effortless comfort.
            </p>
            
            <div className="pt-4">
              <Link to="/tours-demo" className="btn-outline">
                VIEW COLLECTION →
              </Link>
            </div>
          </div>

          {/* Right - Image */}
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <img
                src="/2025-RYDER-CUP-NEW-YORK-and-WHISTLING-STRAITS-Golf-tour-itinerary-16 (1).jpg"
                alt="Ryder Cup New York and Whistling Straits golf tour itinerary"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBlockB;

