import React from 'react';
import { Link } from 'react-router-dom';

const TourCard: React.FC<{ tour: any; layout: 'grid' | 'list' }>=({ tour, layout })=>{
  if (layout === 'list') {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex">
        <div className="w-48 flex-shrink-0">
          <img src={tour.images.hero} alt={tour.title} className="w-48 h-full object-cover" loading="lazy" />
        </div>
        <div className="p-4 pb-6 flex-1">
          <div className="text-xs text-gray-500 mb-1">{tour.duration}</div>
          <h3 className="display-font text-lg mb-1" style={{ color: 'var(--tu-navy)' }}>{tour.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{tour.route}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tour.highlights?.slice(0, 3)?.map((h: string, i: number)=>(
              <span key={i} className="px-3 py-2 text-xs rounded-full" style={{ backgroundColor: 'var(--tu-gold)', color: 'var(--tu-navy)' }}>{h}</span>
            ))}
          </div>
          <Link to={`/tour/${tour.slug}`} className="btn-primary text-sm">View Tour →</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={tour.images.hero} alt={tour.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-4 pb-6">
        <div className="text-xs text-gray-500 mb-1">{tour.duration}</div>
        <h3 className="display-font text-lg mb-1" style={{ color: 'var(--tu-navy)' }}>{tour.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{tour.route}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tour.highlights?.slice(0, 3)?.map((h: string, i: number)=>(
            <span key={i} className="px-3 py-2 text-xs rounded-full" style={{ backgroundColor: 'var(--tu-gold)', color: 'var(--tu-navy)' }}>{h}</span>
          ))}
        </div>
        <Link to={`/tour/${tour.slug}`} className="btn-primary text-sm">View Tour →</Link>
      </div>
    </div>
  );
};

const TourListDemo: React.FC<{ filters: any }>=({ filters })=>{
  const tours = filters.results;
  if (!tours.length) {
    return <div className="text-center text-gray-600 py-12">No tours match your filters.</div>;
  }
  if (filters.layout === 'list') {
    return (
      <div className="space-y-4">
        {tours.map((t: any) => (
          <TourCard key={t.key} tour={t} layout="list" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((t: any) => (
        <TourCard key={t.key} tour={t} layout="grid" />
      ))}
    </div>
  );
};

export default TourListDemo;


