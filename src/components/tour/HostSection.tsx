import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tour } from '@/data/types';

interface HostSectionProps {
  tour: Tour;
}

export const HostSection: React.FC<HostSectionProps> = ({ tour }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <Card className="p-8 rounded-none sm:rounded-2xl shadow-sm">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Host Image */}
          <div className="lg:col-span-1">
            <div className="relative">
              <img
                src={tour.host.image}
                alt={`${tour.host.name} - Tour Host`}
                className="w-full h-80 lg:h-96 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
            </div>
          </div>
          
          {/* Host Information */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Host</h2>
              <h3 className="text-2xl font-semibold text-[#D2CB97] mb-6">{tour.host.name}</h3>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Bede Hendren is the Co-founder and Managing Director of Teed Up Golf, Australia's premier golf travel company. 
                  With over 25 years of experience in establishing and growing businesses, Bede has made a significant impact in 
                  the Human Resources and Travel and Tourism Industries.
                </p>
                
                <p>
                  In 2003, Bede co-founded Teed Up Golf, which has since become Australia's largest outbound and inbound golf 
                  tour operator. The company hosts over 3000 golfers annually, organizing corporate golf days and tours to 
                  prestigious destinations around the world, including the US Masters and US Open Tournaments. An avid golfer 
                  himself, Bede is a member of Long Reef Golf Club and plays off a handicap of 14 on a good day.
                </p>
                
                <p>
                  Bede's extensive experience and passion for golf ensure that every Teed Up tour is meticulously planned and 
                  executed, providing guests with unforgettable golfing experiences. Join Bede on the 2026 Portugal and Spain 
                  and enjoy playing on some of the world's most iconic courses.
                </p>
              </div>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#D2CB97]">25+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#949371]">3000+</div>
                  <div className="text-sm text-gray-600">Golfers Annually</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#222136]">14</div>
                  <div className="text-sm text-gray-600">Golf Handicap</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default HostSection;

