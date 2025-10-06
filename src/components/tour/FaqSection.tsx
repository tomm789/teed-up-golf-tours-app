import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tour } from '@/data/types';

interface FaqSectionProps {
  tour: Tour;
}

interface FaqItemProps {
  item: {
    id: string;
    question: string;
    answer: string;
  };
  index: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
      >
        <span className="font-medium text-gray-900 pr-4">
          {item.question}
        </span>
        <ChevronDown 
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="overflow-hidden bg-white"
      >
        <div className="px-6 pb-4 pt-2">
          <p className="text-gray-600 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const FaqSection: React.FC<FaqSectionProps> = ({ tour }) => {
  if (!tour.faq || tour.faq.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-none sm:rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="text-xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h3>
      <div className="space-y-3">
        {tour.faq.map((item, index) => (
          <FaqItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default FaqSection;

