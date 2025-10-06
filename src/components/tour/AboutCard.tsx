import React from 'react';
import { motion } from 'framer-motion';
import { Tour } from '@/data/types';

interface AboutCardProps {
  tour: Tour;
}

export const AboutCard: React.FC<AboutCardProps> = ({ tour }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white rounded-2xl shadow-sm p-6"
    >
      <h2 className="display-font text-2xl mb-4" style={{ color: 'var(--tu-navy)' }}>
        About This Tour
      </h2>
      <div className="text-lg leading-relaxed" style={{ color: 'var(--tu-ink)' }}>
        {tour.description.split('\n\n').map((paragraph, index) => (
          <p key={index} className={index > 0 ? 'mt-4' : ''}>
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutCard;

