import React from 'react';
import { Link } from 'react-router-dom';

type FeatureBlock = {
  icon?: string | null;
  headline?: string | null;
  description?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
};

type FeatureBlockAProps = {
  blocks?: FeatureBlock[];
};

const FeatureBlockA: React.FC<FeatureBlockAProps> = ({ blocks }) => {
  const first = blocks && blocks.length ? blocks[0] : undefined;
  return (
    <section className="section-spacing bg-white" aria-labelledby="feature-a-title">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <img
                src="/2025-Super-Bowl-New-Orleans-Phoenix-Open-Golf-Tour-Teed-Up-Golf-Tours-Luxury-Sports-Tours-We-Ko-Pa-Cholla-Golf-Course.jpg"
                alt="Super Bowl New Orleans Phoenix Open golf tour at We-Ko-Pa Cholla Golf Course"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <p 
                className="text-sm font-medium uppercase tracking-widest mb-4"
                style={{ color: 'var(--tu-gold)' }}
              >
                {first?.headline ? 'FEATURED' : 'PIONEERS OF'}
              </p>
              <h2 
                id="feature-a-title"
                className="display-font text-3xl lg:text-4xl xl:text-5xl leading-tight mb-6"
                style={{ color: 'var(--tu-navy)' }}
              >
                {first?.headline || 'BUCKET-LIST DESTINATIONS'}
              </h2>
            </div>
            
            <p className="text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--tu-ink)' }}>
              {first?.description || "Teed Up has crafted hosted golf journeys to the world's great tournaments and courses—pairing five-star stays with local knowledge and access to hidden gems."}
            </p>
            
            <div className="pt-4">
              <Link to="/tours-demo" className="btn-primary">
                {first?.ctaText || 'LEARN MORE →'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBlockA;

