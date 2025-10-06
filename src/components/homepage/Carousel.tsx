import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tourData } from '@/data/tours';

type WPCard = {
  id: string;
  title: string;
  slug: string;
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
  tourFields?: { subtitle?: string; duration?: string; route?: string; highlights?: string[] };
};

type CarouselProps = {
  tours?: WPCard[];
};

const Carousel: React.FC<CarouselProps> = ({ tours }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(4.3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const cards = tours && tours.length
    ? tours.map(t => ({
        key: t.id,
        title: t.title,
        slug: t.slug,
        image: t.featuredImage?.node?.sourceUrl || '',
        dates: '',
        duration: t.tourFields?.duration || '',
        route: t.tourFields?.route || '',
        badges: t.tourFields?.highlights || []
      }))
    : tourData.map(t => ({
        key: t.key,
        title: t.title,
        slug: t.slug,
        image: t.images.hero,
        dates: t.dates,
        duration: t.duration,
        route: t.route,
        badges: t.badges
      }));

  const maxIndex = Math.max(0, cards.length - Math.floor(slidesPerView));

  // Update carousel position when currentIndex changes
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardWidth = 288 + 24; // 72 (w-72) * 4 + 24 (gap-6) = 312px per card
    const targetScrollLeft = currentIndex * cardWidth;
    
    carousel.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  }, [currentIndex]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Mouse events for click and drag
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - carousel.offsetLeft);
      setStartScrollLeft(carousel.scrollLeft);
      carousel.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      carousel.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      carousel.style.cursor = 'grab';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = x - startX;
      carousel.scrollLeft = startScrollLeft - walk;
    };

    // Touch events for mobile swiping
    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setStartScrollLeft(carousel.scrollLeft);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.touches[0].clientX;
      const walk = x - startX;
      carousel.scrollLeft = startScrollLeft - walk;
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      
      // Snap to nearest slide
      const cardWidth = 288 + 24; // Card width + gap
      const newIndex = Math.round(carousel.scrollLeft / cardWidth);
      setCurrentIndex(Math.max(0, Math.min(newIndex, Math.floor(maxIndex))));
    };

    // Snap to slide after mouse drag ends
    const handleDragEnd = () => {
      if (!isDragging) return;
      
      const cardWidth = 288 + 24; // Card width + gap
      const newIndex = Math.round(carousel.scrollLeft / cardWidth);
      setCurrentIndex(Math.max(0, Math.min(newIndex, Math.floor(maxIndex))));
    };

    // Add event listeners
    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('mouseup', handleMouseUp);
    carousel.addEventListener('mouseleave', handleMouseLeave);
    carousel.addEventListener('mousemove', handleMouseMove);
    carousel.addEventListener('mouseup', handleDragEnd);
    carousel.addEventListener('mouseleave', handleDragEnd);
    
    // Touch events
    carousel.addEventListener('touchstart', handleTouchStart, { passive: false });
    carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
    carousel.addEventListener('touchend', handleTouchEnd);

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown);
      carousel.removeEventListener('mouseup', handleMouseUp);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
      carousel.removeEventListener('mousemove', handleMouseMove);
      carousel.removeEventListener('mouseup', handleDragEnd);
      carousel.removeEventListener('mouseleave', handleDragEnd);
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchmove', handleTouchMove);
      carousel.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startX, startScrollLeft, maxIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, Math.floor(maxIndex))));
  };

  const goToPrevious = () => {
    goToSlide(currentIndex - 1);
  };

  const goToNext = () => {
    goToSlide(currentIndex + 1);
  };

  return (
    <div className="relative w-full overflow-hidden" role="region" aria-label="Tour carousel">
      {/* Carousel Container */}
      <div 
        className="overflow-x-hidden w-full scrollbar-hide" 
        ref={carouselRef}
        style={{ cursor: 'grab' }}
      >
        <div 
          className="flex gap-6"
          style={{ 
            width: 'max-content',
            paddingLeft: 'max(1rem, calc((100vw - 1240px) / 2 + 1rem))'
          }}
        >
          <div 
            className="flex gap-6 pl-8 md:pl-16 lg:pl-24 xl:pl-32"
            style={{ 
              width: 'max-content'
            }}
          >
            {cards.map((tour) => (
              <div
                key={tour.key}
                className="flex-none w-72 md:w-80 lg:w-72"
                role="article"
                aria-label={`${tour.title} tour`}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={tour.image}
                      alt={`${tour.title} golf tour destination`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
                      {tour.duration}
                    </div>
                    
                    <h3 className="display-font text-xl mb-2" style={{ color: 'var(--tu-navy)' }}>
                      {tour.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {tour.route}
                    </p>
                    
                    {/* Flexible spacer */}
                    <div className="flex-1"></div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tour.badges.slice(0, 3).map((badge, badgeIndex) => (
                        <span
                          key={badgeIndex}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: 'var(--tu-gold)', 
                            color: 'var(--tu-navy)' 
                          }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      to={`/tour/${tour.slug}`}
                      className="btn-primary text-sm w-full text-center block"
                    >
                      VIEW TOUR →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation with Arrows and Dots */}
      <div className="flex items-center justify-center mt-8 space-x-6">
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
          aria-label="Previous tours"
        >
          <ChevronLeft className="w-5 h-5" style={{ color: 'var(--tu-navy)' }} />
        </button>

        {/* Dot Pagination */}
        <div className="flex space-x-3">
          {Array.from({ length: Math.floor(maxIndex) + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          disabled={currentIndex >= Math.floor(maxIndex)}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
          aria-label="Next tours"
        >
          <ChevronRight className="w-5 h-5" style={{ color: 'var(--tu-navy)' }} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
