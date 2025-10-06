import React from 'react';
import { Link } from 'react-router-dom';
import { getHomepageTours } from '@/data/tours';

const TourCardEnhanced: React.FC<{ tour: any }>=({ tour })=>{
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={tour.images.hero} alt={tour.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{tour.duration}</div>
        <h3 className="display-font text-lg mb-1" style={{ color: 'var(--tu-navy)' }}>{tour.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{tour.route}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tour.highlights?.slice(0, 3)?.map((h: string, i: number)=>(
            <span key={i} className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: 'var(--tu-gold)', color: 'var(--tu-navy)' }}>{h}</span>
          ))}
        </div>
        <Link to={`/tour/${tour.slug}`} className="btn-primary text-sm">View Tour →</Link>
      </div>
    </div>
  );
};

const TourList: React.FC<{ filters: any }>=({ filters })=>{
  // TEMP: use local sample tours; later replace with WP GraphQL filtered query using filters
  const tours = React.useMemo(()=>{
    let data = getHomepageTours();
    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter(t => t.title.toLowerCase().includes(q) || t.route.toLowerCase().includes(q));
    }
    return data;
  }, [filters.search]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map(t => (
          <TourCardEnhanced key={t.key} tour={t} />
        ))}
      </div>
      {/* TODO: pagination/infinite scroll */}
    </div>
  );
};

export default TourList;


