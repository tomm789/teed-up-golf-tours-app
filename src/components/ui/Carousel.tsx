import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({ 
  children, 
  title, 
  className = "" 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`bg-white rounded-none sm:rounded-2xl p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="display-font text-2xl" style={{ color: 'var(--tu-navy)' }}>
          {title}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('left')}
            aria-label={`Scroll ${title} left`}
            className="h-8 w-8 p-0 rounded-full border-gray-300 hover:border-[#949371] hover:bg-[#949371]/5"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('right')}
            aria-label={`Scroll ${title} right`}
            className="h-8 w-8 p-0 rounded-full border-gray-300 hover:border-[#949371] hover:bg-[#949371]/5"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
};
