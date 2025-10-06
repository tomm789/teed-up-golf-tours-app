import React from 'react';
import { Day } from '@/data/types';

interface DayCardProps {
  day: Day;
}

export const DayCard: React.FC<DayCardProps> = ({ day }) => {
  if (!day) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h4 className="display-font text-lg mb-3" style={{ color: 'var(--tu-navy)' }}>
        Day {day.id}: {day.title}
      </h4>
      <p className="mb-6" style={{ color: 'var(--tu-ink)' }}>{day.description}</p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h5 className="font-semibold text-sm mb-3" style={{ color: 'var(--tu-gold)' }}>Activities</h5>
          <ul className="space-y-2">
            {day.activities.map((activity, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div 
                  className="h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: 'var(--tu-gold)' }}
                />
                <span style={{ color: 'var(--tu-ink)' }}>{activity}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="font-semibold text-sm mb-3" style={{ color: 'var(--tu-gold)' }}>Meals Included</h5>
          <ul className="space-y-2">
            {day.meals.map((meal, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div 
                  className="h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: 'var(--tu-gold)' }}
                />
                <span style={{ color: 'var(--tu-ink)' }}>{meal}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="font-semibold text-sm mb-3" style={{ color: 'var(--tu-gold)' }}>Accommodation</h5>
          <ul className="space-y-2">
            {day.accommodation.map((acc, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div 
                  className="h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: 'var(--tu-gold)' }}
                />
                <span style={{ color: 'var(--tu-ink)' }}>{acc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DayCard;

