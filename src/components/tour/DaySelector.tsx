import React from 'react';

interface DaySelectorProps {
  selectedDay: number;
  totalDays: number;
  onDaySelect: (day: number) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({ selectedDay, totalDays, onDaySelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {Array.from({ length: totalDays }, (_, index) => index + 1).map((day) => (
        <button
          key={day}
          onClick={() => onDaySelect(day)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedDay === day
              ? 'text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{
            backgroundColor: selectedDay === day ? 'var(--tu-navy)' : 'var(--tu-warmgray)',
          }}
        >
          Day {day}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;

