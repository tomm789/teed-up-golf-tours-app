import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tour } from '@/data/types';
import { golfCourses } from '@/data/courses';
import { events } from '@/data/events';
import { activities } from '@/data/activities';
import { Carousel } from '@/components/ui/Carousel';

interface CollectionCarouselsProps {
  tour: Tour;
  onModalOpen: (modalId: string) => void;
}

export const CollectionCarousels: React.FC<CollectionCarouselsProps> = ({ onModalOpen }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (type: string, id: number) => {
    const key = `${type}-${id}`;
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(key)) {
        newFavorites.delete(key);
      } else {
        newFavorites.add(key);
      }
      return newFavorites;
    });
  };

  const isFavorite = (type: string, id: number) => {
    return favorites.has(`${type}-${id}`);
  };

  // Accommodations data for Portugal & Spain tour
  const accommodations = [
    {
      id: 'modal-portobay',
      name: "Hotel PortoBay Liberdade",
      image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_02_Image_0002.jpg",
      description: "Luxury 5-star hotel in Lisbon"
    },
    {
      id: 'modal-quintadolago',
      name: "Hotel Quinta Do Lago",
      image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_04_Image_0002.jpg",
      description: "Luxurious resort in Algarve"
    },
    {
      id: 'modal-kempinski',
      name: "Hotel Kempinski Bahia",
      image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_08_Image_0002.jpg",
      description: "Luxury hotel on Costa del Sol"
    }
  ];

  return (
    <section className="mb-12 space-y-8">
      {/* Accommodations Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Carousel title="Accommodations">
          {accommodations.map((accommodation) => (
            <div 
              key={accommodation.id} 
              className="flex-shrink-0 w-72 snap-start cursor-pointer group"
              onClick={() => onModalOpen(accommodation.id)}
            >
              <div className="relative rounded-xl overflow-hidden mb-3">
                <img 
                  src={accommodation.image} 
                  alt={accommodation.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-sm font-medium text-gray-900">View Details</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('accommodation', parseInt(accommodation.id.split('-')[1] || '0'));
                  }}
                  className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  aria-pressed={isFavorite('accommodation', parseInt(accommodation.id.split('-')[1] || '0'))}
                  aria-label={`${isFavorite('accommodation', parseInt(accommodation.id.split('-')[1] || '0')) ? 'Remove from' : 'Add to'} favorites`}
                >
                  <Heart 
                    className={`h-4 w-4 transition-colors ${
                      isFavorite('accommodation', parseInt(accommodation.id.split('-')[1] || '0')) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`} 
                  />
                </button>
              </div>
              <h4 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">{accommodation.name}</h4>
              <p className="text-sm text-gray-600">{accommodation.description}</p>
            </div>
          ))}
        </Carousel>
      </motion.div>

      {/* Golf Courses Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Carousel title="Golf Courses">
          {golfCourses.map((course) => (
            <div 
              key={course.id} 
              className="flex-shrink-0 w-72 snap-start cursor-pointer group"
              onClick={() => {
                const modalMap: { [key: string]: string } = {
                  'West Cliffs Golf Course': 'modal-westcliffs',
                  'Oitavos Golf Course': 'modal-oitavos',
                  'Dunas Golf Course': 'modal-dunas',
                  'Ombria Golf Course': 'modal-ombria',
                  'Monte Rei Golf Course': 'modal-monterrei',
                  'Finca Golf Course': 'modal-finca',
                  'La Reserva Sotogrande': 'modal-lareserva',
                  'Valderrama Golf Course': 'modal-valderrama'
                };
                onModalOpen(modalMap[course.title] || 'modal-westcliffs');
              }}
            >
              <div className="relative rounded-xl overflow-hidden mb-3">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-sm font-medium text-gray-900">View Details</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('golf', course.id);
                  }}
                  className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  aria-pressed={isFavorite('golf', course.id)}
                  aria-label={`${isFavorite('golf', course.id) ? 'Remove from' : 'Add to'} favorites`}
                >
                  <Heart 
                    className={`h-4 w-4 transition-colors ${
                      isFavorite('golf', course.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`} 
                  />
                </button>
              </div>
              <h4 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">{course.title}</h4>
              <p className="text-sm text-gray-600">
                {course.holes} holes • Par {course.par}
              </p>
            </div>
          ))}
        </Carousel>
      </motion.div>

      {/* Events Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Carousel title="Events">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="flex-shrink-0 w-72 snap-start cursor-pointer group"
              onClick={() => {
                const eventModalMap: { [key: number]: string } = {
                  1: 'modal-golf-competition',
                  2: 'modal-welcome-reception', 
                  3: 'modal-wine-tasting',
                  4: 'modal-vineyard-lunch',
                  5: 'modal-farewell-dinner'
                };
                onModalOpen(eventModalMap[event.id] || 'modal-golf-competition');
              }}
            >
              <div className="relative rounded-xl overflow-hidden mb-3">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-sm font-medium text-gray-900">View Details</span>
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-[#949371] text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                  {event.date}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('event', event.id);
                  }}
                  className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  aria-pressed={isFavorite('event', event.id)}
                  aria-label={`${isFavorite('event', event.id) ? 'Remove from' : 'Add to'} favorites`}
                >
                  <Heart 
                    className={`h-4 w-4 transition-colors ${
                      isFavorite('event', event.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`} 
                  />
                </button>
              </div>
              <h4 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">{event.title}</h4>
            </div>
          ))}
        </Carousel>
      </motion.div>

      {/* Activities Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Carousel title="Activities">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex-shrink-0 w-72 snap-start cursor-pointer group"
              onClick={() => {
                const activityModalMap: { [key: number]: string } = {
                  1: 'modal-welcome-drinks',
                  2: 'modal-wine-tasting-activity', 
                  3: 'modal-vineyard-lunch-activity',
                  4: 'modal-tapas-lunch',
                  5: 'modal-farewell-dinner-activity'
                };
                onModalOpen(activityModalMap[activity.id] || 'modal-welcome-drinks');
              }}
            >
              <div className="relative rounded-xl overflow-hidden mb-3">
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-sm font-medium text-gray-900">View Details</span>
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-[#222136] text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                  {activity.season}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('activity', activity.id);
                  }}
                  className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  aria-pressed={isFavorite('activity', activity.id)}
                  aria-label={`${isFavorite('activity', activity.id) ? 'Remove from' : 'Add to'} favorites`}
                >
                  <Heart 
                    className={`h-4 w-4 transition-colors ${
                      isFavorite('activity', activity.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`} 
                  />
                </button>
              </div>
              <h4 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">{activity.title}</h4>
            </div>
          ))}
        </Carousel>
      </motion.div>
    </section>
  );
};

export default CollectionCarousels;
