import React from 'react';
import Carousel from './Carousel';

type JourneysProps = {
  tours?: Array<{
    id: string;
    title: string;
    slug: string;
    featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
    tourFields?: { subtitle?: string; duration?: string; route?: string; highlights?: string[] };
  }>;
};

const Journeys: React.FC<JourneysProps> = ({ tours }) => {
  return (
    <section 
      id="journeys" 
      className="section-spacing"
      style={{ backgroundColor: 'var(--tu-warmgray)' }}
      aria-labelledby="journeys-title"
    >
      <div className="container">
        {/* Intro */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          <h2 
            id="journeys-title"
            className="display-font text-4xl lg:text-5xl mb-6"
            style={{ color: 'var(--tu-navy)' }}
          >
            JOURNEYS TAILORED AND UNFORGETTABLE
          </h2>
          <p className="text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--tu-ink)' }}>
            Teed Up is Australia's premier golf & sporting travel company. For over 25 years, we've curated 
            life-enriching golf journeys—combining marquee events with the world's top golf courses, local knowledge 
            and effortless hosting.
          </p>
        </div>
      </div>
      
      {/* Carousel - Full Width */}
      <div>
        <Carousel tours={tours} />
      </div>
    </section>
  );
};

export default Journeys;

