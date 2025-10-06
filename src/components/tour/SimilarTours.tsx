import React from 'react';
import { Link } from 'react-router-dom';
import { Tour } from '@/data/types';
import { getTourByKey } from '@/data/tours';

interface SimilarToursProps {
  tour: Tour;
}

export const SimilarTours: React.FC<SimilarToursProps> = ({ tour }) => {
  const similarTours = tour.similarTours
    .map(key => getTourByKey(key))
    .filter(Boolean);

  if (similarTours.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="display-font text-2xl mb-6" style={{ color: 'var(--tu-navy)' }}>
        Similar Tours
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarTours.map((similarTour) => (
          <Link
            key={similarTour!.key}
            to={`/tour/${similarTour!.slug}`}
            className="group block bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={similarTour!.images.hero}
                alt={`${similarTour!.title} golf tour`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="display-font text-lg mb-2 group-hover:text-opacity-80 transition-colors" style={{ color: 'var(--tu-navy)' }}>
                {similarTour!.title}
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--tu-ink)' }}>
                {similarTour!.dates} · {similarTour!.duration}
              </p>
              <div className="flex flex-wrap gap-2">
                {similarTour!.badges.slice(0, 2).map((badge, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ 
                      backgroundColor: 'var(--tu-gold)', 
                      color: 'var(--tu-navy)' 
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SimilarTours;

