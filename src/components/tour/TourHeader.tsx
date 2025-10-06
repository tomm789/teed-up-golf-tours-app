import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tour } from '@/data/types';

interface TourHeaderProps {
  tour: Tour;
}

export const TourHeader: React.FC<TourHeaderProps> = ({ tour }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-lg mt-20"
    >
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${tour.images.hero}")`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="display-font text-4xl md:text-5xl text-white mb-4"
        >
          {tour.title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-white/90 mb-4"
        >
          {tour.subtitle || tour.description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-6 text-white/90 text-lg"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" style={{ color: 'var(--tu-gold)' }} />
            <span className="text-lg font-semibold">{tour.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" style={{ color: 'var(--tu-gold)' }} />
            <span className="text-lg font-semibold">{tour.dates}</span>
          </div>
          <div className="flex items-center gap-2">
            <img 
              src={tour.host.image}
              alt={tour.host.name}
              className="h-10 w-10 rounded-full object-cover border-2"
              style={{ borderColor: 'var(--tu-gold)' }}
            />
            <span className="text-lg font-semibold">Hosted by {tour.host.name}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TourHeader;

