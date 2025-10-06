import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Tour } from '@/data/types';

interface HighlightsProps {
  tour: Tour;
}

export const Highlights: React.FC<HighlightsProps> = ({ tour }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-sm p-6"
    >
      <h2 className="display-font text-2xl mb-4" style={{ color: 'var(--tu-navy)' }}>
        Tour Highlights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tour.highlights.map((highlight, index) => (
          <motion.div
            key={highlight}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4 text-[#949371] flex-shrink-0" />
            <span className="text-sm text-gray-700">{highlight}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Highlights;

