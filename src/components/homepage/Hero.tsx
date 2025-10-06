import React from 'react';
import { useNavigate } from 'react-router-dom';
import { tourData } from '@/data/tours';

type Slide = {
  tour?: {
    id: string;
    title: string;
    slug: string;
    featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
    tourFields?: { subtitle?: string; duration?: string; route?: string };
  } | null;
};

type HeroProps = {
  slides?: Slide[];
};

const Hero: React.FC<HeroProps> = ({ slides }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const images = React.useMemo(() => {
    if (slides && slides.length) {
      return slides.map((s) => ({
        key: s.tour?.slug || s.tour?.id || Math.random().toString(36),
        title: s.tour?.title || '',
        slug: s.tour?.slug || '',
        hero: s.tour?.featuredImage?.node?.sourceUrl || ''
      })).filter(i => i.hero);
    }
    return tourData.map(t => ({ key: t.key, title: t.title, slug: t.slug, hero: t.images.hero }));
  }, [slides]);

  // Auto-advance slideshow
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, images.length));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handleTourClick = (slug: string) => {
    if (slug) navigate(`/tour/${slug}`);
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-labelledby="hero-title"
    >
      {/* Background Slideshow with Overlay */}
      <div className="absolute inset-0">
        {/* Slideshow Images */}
        {images.map((tour, index) => (
          <div
            key={tour.key}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={tour.hero}
              alt={`${tour.title} golf tour destination`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
        
        {/* Additional Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10">
        <div
          className="
            grid grid-cols-1
            lg:grid-cols-[max-content_max-content]
            items-center gap-y-6
            lg:justify-center
            lg:[column-gap:50px]
          "
        >
          {/* LEFT */}
          <div className="w-full lg:w-auto text-center pt-16 lg:pt-0">
            {/* Logo */}
            <div className="mb-12">
              <img
                src="/Teed_Up_Logo_Orig.png"
                alt="Teed Up Golf Tours"
                className="w-[280px] h-[75px] md:w-[400px] md:h-[107px] object-contain mx-auto"
              />
            </div>
            
            <h1
              id="hero-title"
              className="display-font text-white leading-none mb-4"
              style={{ fontSize: 'clamp(2rem, 5.3vw, 3rem)' }}
            >
              <div className="block">YOUR PASSION,</div>
              <div className="block">IS OUR OBSESSION</div>
            </h1>
            <p
              className="text-white/80 text-lg md:text-xl font-medium mb-6 tracking-widest"
              style={{ color: 'var(--tu-gold)' }}
            >
              EST. 1999
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-auto text-center lg:text-left pb-6 lg:pb-0">
            <nav role="navigation" aria-label="Tour list" className="w-full lg:w-auto">
              <ul className="space-y-0 lg:space-y-1 text-center lg:text-left">
                {images.slice(0, 10).map((tour, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleTourClick(tour.slug)}
                      className="w-full lg:w-auto text-center lg:text-left text-white/90 hover:text-white focus-ring rounded py-1 px-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-0 lg:hover:translate-x-2"
                      aria-label={`View ${tour.title} tour`}
                    >
                      <span className="font-medium">{tour.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
