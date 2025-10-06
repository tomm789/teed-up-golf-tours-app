import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tour } from '@/data/types';

interface TourDetailsProps {
  tour: Tour;
  onBookNow?: () => void;
}

export const TourDetails: React.FC<TourDetailsProps> = ({ tour, onBookNow }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="sticky top-6"
    >
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="mb-6">
          <div className="text-center mb-4">
            <div className="display-font text-lg mb-1" style={{ color: 'var(--tu-gold)' }}>
              {tour.pricing.currency} PER PERSON
            </div>
            <div className="text-sm" style={{ color: 'var(--tu-ink)' }}>{tour.dates}</div>
          </div>
          
          {/* Main Pricing */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium" style={{ color: 'var(--tu-ink)' }}>DOUBLE/TWIN</span>
              <span className="text-lg font-bold" style={{ color: 'var(--tu-gold)' }}>
                {tour.pricing.currency}{tour.pricing.double.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium" style={{ color: 'var(--tu-ink)' }}>SINGLE</span>
              <span className="text-lg font-bold" style={{ color: 'var(--tu-gold)' }}>
                {tour.pricing.currency}{tour.pricing.single.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium" style={{ color: 'var(--tu-ink)' }}>NON GOLFER</span>
              <span className="text-lg font-bold" style={{ color: 'var(--tu-gold)' }}>
                {tour.pricing.currency}{tour.pricing.nonGolfer.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* Room Upgrades */}
          {tour.pricing.upgrades && (
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-sm text-gray-800 mb-3">Room Upgrade at all hotels</h4>
              <div className="space-y-2 text-xs text-gray-600 mb-3">
                <div>• PortoBay – Deluxe Room</div>
                <div>• Alma Lusa Comporta – Garden Suite</div>
                <div>• Quinta do Lago – Lagoon Side Sea View</div>
                <div>• Kempinski Hotel Bahia – Mediterranean Room</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Double/Twin upgrade:</span>
                  <span className="text-sm font-semibold text-[#949371]">
                    {tour.pricing.currency}{tour.pricing.upgrades.double.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Single upgrade:</span>
                  <span className="text-sm font-semibold text-[#949371]">
                    {tour.pricing.currency}{tour.pricing.upgrades.single.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Non Golfer upgrade:</span>
                  <span className="text-sm font-semibold text-[#949371]">
                    {tour.pricing.currency}{tour.pricing.upgrades.nonGolfer.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={onBookNow}
            className="w-full rounded-xl bg-[#949371] hover:bg-[#7a7a5a] text-white font-medium py-3 px-4 transition-colors"
          >
            Book Now
          </button>
          <button className="w-full rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 transition-colors flex items-center justify-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Talk to the Team
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TourDetails;

