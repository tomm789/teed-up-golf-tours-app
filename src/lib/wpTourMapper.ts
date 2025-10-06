import { SingleTour } from '@/services/tourService';
import { Tour } from '@/data/types';

export function mapSingleTourToTour(wp: SingleTour): Tour {
  return {
    id: wp.id,
    key: wp.slug,
    title: wp.title,
    slug: wp.slug,
    subtitle: wp.tourFields?.subtitle || '',
    description: wp.content || '',
    dates: wp.tourFields?.dates || '',
    duration: wp.tourFields?.duration || '',
    route: wp.tourFields?.route || '',
    badges: wp.tourFields?.badges || [],
    images: {
      hero: wp.featuredImage?.node?.sourceUrl || '',
      gallery: []
    },
    pricing: {
      double: wp.tourFields?.pricing?.double || 0,
      single: wp.tourFields?.pricing?.single || 0,
      nonGolfer: wp.tourFields?.pricing?.nonGolfer || 0,
      currency: wp.tourFields?.pricing?.currency || 'USD'
    },
    host: {
      name: wp.host?.hostFields?.name || '',
      title: wp.host?.hostFields?.title || '',
      image: wp.host?.featuredImage?.node?.sourceUrl || '',
      bio: wp.host?.hostFields?.bio || ''
    },
    itinerary: (wp.days || []).map((d, index) => ({
      id: d?.id ? Number(d.id) : index + 1,
      title: d?.title || `Day ${index + 1}`,
      description: d?.description || '',
      activities: d?.activities || [],
      meals: d?.meals || [],
      accommodation: d?.accommodation || []
    })),
    highlights: wp.tourFields?.highlights || [],
    included: [],
    faq: (wp.faq || []).map((f, i) => ({ id: `${i}`, question: f.question || '', answer: f.answer || '' })),
    similarTours: (wp.similarTours?.nodes || []).map(n => n.slug),
    modalData: []
  };
}


