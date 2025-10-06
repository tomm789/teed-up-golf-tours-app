import { Tour } from './types';
import { days } from './days';
import { modalData } from './modals';

export const tourData: Tour[] = [
  {
    id: "portugal-spain",
    key: "portugal-spain",
    title: "PORTUGAL & SPAIN",
    slug: "portugal-spain-golf-tour",
    subtitle: "An Exquisite Journey Through Premier Golf Destinations",
    description: "In Portugal, golfers can enjoy a unique experience against a backdrop of rolling hills, dramatic cliffs, and sweeping ocean views. The Algarve region is particularly notable, with its collection of championship courses nestled along the coastline. Each course offers a unique challenge and breathtaking vistas, from the prestigious fairways of Ombria to the rugged beauty of Monte Rei, providing an enchanting Portuguese ambiance for players of all levels.\n\nAcross the border in Spain, golf enthusiasts are equally spoiled with an impressive array of courses set amidst stunning landscapes, from the sun-drenched beaches of the Costa del Sol to the majestic mountains of Andalusia. The Costa del Sol, often called the \"Costa del Golf,\" boasts over 50 championship courses, making it one of Europe's most popular golfing destinations. A highlight of this tour is the chance to play at Club de Golf Valderrama, ranked as Spain's number one and the \"Augusta of Europe,\" providing a world-class golfing experience.",
    dates: "17th - 29th September, 2026",
    duration: "12 days",
    route: "Lisbon · Algarve · Costa del Sol",
    badges: ["11 Nights", "8 Rounds", "Hosted by Bede Hendren"],
    images: {
      hero: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_06_Image_0002.jpg",
      gallery: [
        "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_06_Image_0002.jpg",
        "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_09_Image_0002.jpg",
        "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_09_Image_0003.jpg"
      ]
    },
    pricing: {
      double: 9825,
      single: 11650,
      nonGolfer: 7045,
      currency: "EUR",
      upgrades: {
        double: 935,
        single: 1600,
        nonGolfer: 935
      }
    },
    host: {
      name: "Bede Hendren",
      title: "CEO, Teed Up Golf Tours",
      image: "/assets/Bede-Hendren-CEO-Teed-Up-Golf-Tours-768x1024.jpg",
      bio: "With over two decades of experience leading groups to premier golf destinations worldwide, Bede brings unparalleled expertise and passion to every tour."
    },
    itinerary: days,
    highlights: [
      "8 Championship Golf Courses",
      "Wine Tastings & Vineyard Experiences", 
      "3 Luxury Hotels Across 2 Countries",
      "Expert Host Bede Hendren",
      "Welcome & Farewell Events",
      "All Transfers & Golf Transportation"
    ],
    included: [
      "11 nights luxury accommodation",
      "8 rounds of golf at championship courses",
      "All transfers and transportation",
      "Welcome and farewell dinners",
      "Wine tasting experiences",
      "Tour host throughout",
      "Golf competition with prizes"
    ],
    faq: [
      {
        id: "item-1",
        question: "Can I request a specific room type?",
        answer: "Yes, you can request a specific room type. We will do our best to accommodate your preferences."
      },
      {
        id: "item-2", 
        question: "What is the dress code for the tour?",
        answer: "The dress code is casual for most activities. For golf, please adhere to the dress code of each golf course."
      },
      {
        id: "item-3",
        question: "Are meals included in the tour?",
        answer: "Some meals are included, such as daily breakfasts, specific dinners, and lunches. Please refer to the itinerary for details."
      },
      {
        id: "item-4",
        question: "Is travel insurance required?",
        answer: "Yes, travel insurance is required for all participants. It is important to have coverage for any unforeseen circumstances."
      },
      {
        id: "item-5",
        question: "What is the cancellation policy?",
        answer: "Cancellations must be in writing to Teed Up Golf Tours. Please refer to the Terms and Conditions for the full cancellation policy."
      },
      {
        id: "item-6",
        question: "Can non-golfers join the tour?",
        answer: "Yes, non-golfers are welcome to join the tour. There are various activities and sightseeing options available for non-golfers."
      },
      {
        id: "item-7",
        question: "Are flights included in the tour package?",
        answer: "No, flights are not included in the tour package. Participants are responsible for their own travel arrangements to and from Spain and Portugal."
      },
      {
        id: "item-8",
        question: "How will airport transfers be handled?",
        answer: "Airport transfers are included in the tour package. We will arrange for transportation from the airport to your hotel and vice versa."
      },
      {
        id: "item-9",
        question: "What activities are available for non-golfers?",
        answer: "Non-golfers can enjoy activities such as vineyard tours, wine tastings, local sightseeing, and leisure time at the hotels and resorts."
      },
      {
        id: "item-10",
        question: "What is the payment schedule?",
        answer: "Details regarding the payment schedule will be provided upon booking. Generally, a deposit is required to secure your spot, with the balance due closer to the departure date."
      },
      {
        id: "item-11",
        question: "What should I pack for the tour?",
        answer: "Pack comfortable casual wear, golf attire for the courses, and appropriate clothing for dinners and special events. Don't forget essentials like sunscreen, hats, and travel documents."
      },
      {
        id: "item-12",
        question: "What if I need additional assistance or have specific needs?",
        answer: "If you require additional assistance or have specific needs, please inform us in advance, and we will do our best to accommodate you."
      }
    ],
    similarTours: ["vietnam", "south-africa", "japan"],
    modalData: modalData
  },
  {
    id: "vietnam",
    key: "vietnam",
    title: "VIETNAM",
    slug: "vietnam-golf-tour",
    description: "Discover Vietnam's emerging golf scene with luxury accommodations",
    dates: "23–30 AUG 2025",
    duration: "8 days",
    route: "Da Nang · Hoi An · Ba Na Hills",
    badges: ["7 Nights", "5 Rounds", "Hosted by Sandy Baltussen"],
    images: {
      hero: "/montgomerie-links-vietnam-128.jpg",
      gallery: ["/montgomerie-links-vietnam-128.jpg"]
    },
    pricing: {
      double: 3200,
      single: 3800,
      nonGolfer: 2800,
      currency: "USD"
    },
    host: {
      name: "Sandy Baltussen",
      title: "Senior Tour Host",
      image: "/host-sandy.jpg",
      bio: "Sandy brings extensive experience in Asian golf destinations and cultural experiences."
    },
    itinerary: [],
    highlights: [
      "Play at Montgomerie Links Vietnam",
      "Explore historic Hoi An",
      "Luxury beachfront resorts",
      "Cultural experiences"
    ],
    included: [
      "7 nights luxury accommodation",
      "5 rounds of golf",
      "All transfers",
      "Cultural tours"
    ],
    faq: [],
    similarTours: ["portugal-spain", "japan"],
    modalData: []
  },
  {
    id: "south-africa",
    key: "south-africa",
    title: "SOUTH AFRICA",
    slug: "south-africa-golf-tour",
    description: "Experience the best of South African golf and wildlife",
    dates: "26 MAR–8 APR 2026",
    duration: "14 days",
    route: "Cape Town · Garden Route",
    badges: ["13 Nights", "7 Rounds", "Hosted by Sandy Baltussen"],
    images: {
      hero: "/Teed-Up-Golf-Tours-South-Africa-Golf-Tours-Capetown.jpg",
      gallery: ["/Teed-Up-Golf-Tours-South-Africa-Golf-Tours-Capetown.jpg"]
    },
    pricing: {
      double: 4500,
      single: 5200,
      nonGolfer: 3800,
      currency: "USD"
    },
    host: {
      name: "Sandy Baltussen",
      title: "Senior Tour Host",
      image: "/host-sandy.jpg",
      bio: "Sandy has extensive experience in South African golf and safari experiences."
    },
    itinerary: [],
    highlights: [
      "Play at world-class courses",
      "Safari experiences",
      "Cape Town exploration",
      "Wine country tours"
    ],
    included: [
      "13 nights luxury accommodation",
      "7 rounds of golf",
      "Safari experience",
      "All transfers"
    ],
    faq: [],
    similarTours: ["portugal-spain", "japan"],
    modalData: []
  },
  {
    id: "japan",
    key: "japan",
    title: "JAPAN",
    slug: "japan-golf-tour",
    description: "Experience Japanese golf culture and hospitality",
    dates: "19–30 MAY 2026",
    duration: "12 days",
    route: "Tokyo · Kyoto · Osaka",
    badges: ["11 Nights", "6 Rounds", "Hosted by Sandy Baltussen"],
    images: {
      hero: "/2026-Teed-Up-Japan-Golf-Tour-19-30th-May-2026-hosted-by-Sandy-Baltussen_Page_13_Image_0001.jpg",
      gallery: ["/2026-Teed-Up-Japan-Golf-Tour-19-30th-May-2026-hosted-by-Sandy-Baltussen_Page_13_Image_0001.jpg"]
    },
    pricing: {
      double: 4800,
      single: 5500,
      nonGolfer: 4200,
      currency: "USD"
    },
    host: {
      name: "Sandy Baltussen",
      title: "Senior Tour Host",
      image: "/host-sandy.jpg",
      bio: "Sandy has deep knowledge of Japanese golf culture and traditions."
    },
    itinerary: [],
    highlights: [
      "Traditional Japanese golf courses",
      "Cultural experiences",
      "Luxury ryokan stays",
      "Tokyo and Kyoto exploration"
    ],
    included: [
      "11 nights luxury accommodation",
      "6 rounds of golf",
      "Cultural tours",
      "All transfers"
    ],
    faq: [],
    similarTours: ["portugal-spain", "vietnam"],
    modalData: []
  },
  {
    id: "us-masters",
    key: "us-masters",
    title: "US MASTERS",
    slug: "us-masters-golf-tour",
    description: "Experience the magic of Augusta National",
    dates: "3–13 APR 2026",
    duration: "11 days",
    route: "Augusta · Atlanta",
    badges: ["8 Nights", "3 Rounds", "2 Days at the Masters"],
    images: {
      hero: "/Teed-Up-Golf-Tours-US-Masters-Tour-Tigers-Woods.jpg",
      gallery: ["/Teed-Up-Golf-Tours-US-Masters-Tour-Tigers-Woods.jpg"]
    },
    pricing: {
      double: 6500,
      single: 7500,
      nonGolfer: 4500,
      currency: "USD"
    },
    host: {
      name: "Mike Mosher",
      title: "PGA Professional",
      image: "/host-mike.jpg",
      bio: "With over 20 years leading Masters tours, Mike provides unparalleled access and expertise."
    },
    itinerary: [],
    highlights: [
      "2 days at Augusta National",
      "Practice round and tournament days",
      "Exclusive hospitality",
      "Local course rounds"
    ],
    included: [
      "8 nights accommodation",
      "Masters tournament tickets",
      "3 rounds of golf",
      "All transfers"
    ],
    faq: [],
    similarTours: ["portugal-spain"],
    modalData: []
  },
  {
    id: "canada",
    key: "canada",
    title: "CANADA",
    slug: "canada-golf-tour",
    description: "Mountain golf at its finest in the Canadian Rockies",
    dates: "2026",
    duration: "10 days",
    route: "Banff · Jasper",
    badges: ["9 Nights", "7 Rounds", "Hosted by Mike Mosher"],
    images: {
      hero: "/Teed-Up-Golf-Tours-Canada-Golf-Tours-Banff (1).jpg",
      gallery: ["/Teed-Up-Golf-Tours-Canada-Golf-Tours-Banff (1).jpg"]
    },
    pricing: {
      double: 4200,
      single: 4800,
      nonGolfer: 3600,
      currency: "USD"
    },
    host: {
      name: "Mike Mosher",
      title: "PGA Professional",
      image: "/host-mike.jpg",
      bio: "Mike specializes in mountain golf experiences and Canadian hospitality."
    },
    itinerary: [],
    highlights: [
      "Mountain golf courses",
      "Banff and Jasper exploration",
      "Wildlife viewing",
      "Scenic beauty"
    ],
    included: [
      "9 nights accommodation",
      "7 rounds of golf",
      "National park access",
      "All transfers"
    ],
    faq: [],
    similarTours: ["portugal-spain", "south-africa"],
    modalData: []
  },
  {
    id: "med-cruise",
    key: "med-cruise",
    title: "MEDITERRANEAN GOLF CRUISE",
    slug: "mediterranean-golf-cruise",
    description: "Luxury cruise with golf at Mediterranean ports",
    dates: "5–14 SEP 2026",
    duration: "10 days",
    route: "Adriatic & Med ports",
    badges: ["9 Nights", "5 Rounds", "Hosted by Sandy Baltussen"],
    images: {
      hero: "/2026-Teed-Up-LUXURY-MEDITERRANEAN-Barcelona-to-Rome-GOLF-CRUISE-Itinerary-12.2.25_Page_04_Image_0002.jpg",
      gallery: ["/2026-Teed-Up-LUXURY-MEDITERRANEAN-Barcelona-to-Rome-GOLF-CRUISE-Itinerary-12.2.25_Page_04_Image_0002.jpg"]
    },
    pricing: {
      double: 5800,
      single: 6800,
      nonGolfer: 4800,
      currency: "USD"
    },
    host: {
      name: "Sandy Baltussen",
      title: "Senior Tour Host",
      image: "/host-sandy.jpg",
      bio: "Sandy has extensive experience in Mediterranean golf and cruise experiences."
    },
    itinerary: [],
    highlights: [
      "Luxury cruise ship",
      "Golf at Mediterranean ports",
      "Cultural shore excursions",
      "All-inclusive experience"
    ],
    included: [
      "9 nights cruise accommodation",
      "5 rounds of golf",
      "All meals and drinks",
      "Shore excursions"
    ],
    faq: [],
    similarTours: ["portugal-spain", "japan"],
    modalData: []
  },
  {
    id: "nz-north",
    key: "nz-north",
    title: "NEW ZEALAND – NORTH ISLAND",
    slug: "new-zealand-north-island-golf-tour",
    description: "Experience New Zealand's premier golf destinations",
    dates: "16–24 MAR 2026",
    duration: "9 days",
    route: "Auckland · Taupō",
    badges: ["6 Nights", "5 Rounds", "Hosted by Bede Hendren"],
    images: {
      hero: "/Teed-Up-Golf-Tours-Queenstown-New-Zealand-Golf-Tours5.jpg",
      gallery: ["/Teed-Up-Golf-Tours-Queenstown-New-Zealand-Golf-Tours5.jpg"]
    },
    pricing: {
      double: 3800,
      single: 4400,
      nonGolfer: 3200,
      currency: "USD"
    },
    host: {
      name: "Bede Hendren",
      title: "CEO, Teed Up Golf Tours",
      image: "/Bede-Hendren-CEO-Teed-Up-Golf-Tours-768x1024.jpg",
      bio: "Bede brings his expertise to showcase New Zealand's world-class golf destinations."
    },
    itinerary: [],
    highlights: [
      "World-class golf courses",
      "Auckland city exploration",
      "Taupō lake district",
      "New Zealand hospitality"
    ],
    included: [
      "6 nights accommodation",
      "5 rounds of golf",
      "City tours",
      "All transfers"
    ],
    faq: [],
    similarTours: ["portugal-spain", "canada"],
    modalData: []
  },
  {
    id: "arg-chile",
    key: "arg-chile",
    title: "ARGENTINA & CHILE",
    slug: "argentina-chile-golf-tour",
    description: "South American golf adventure",
    dates: "9–20 FEB 2026",
    duration: "12 days",
    route: "Buenos Aires · Santiago",
    badges: ["11 Nights", "6 Rounds", "Hosted by Sandy Baltussen"],
    images: {
      hero: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      gallery: ["https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop"]
    },
    pricing: {
      double: 4200,
      single: 4800,
      nonGolfer: 3600,
      currency: "USD"
    },
    host: {
      name: "Sandy Baltussen",
      title: "Senior Tour Host",
      image: "/host-sandy.jpg",
      bio: "Sandy has extensive experience in South American golf and cultural experiences."
    },
    itinerary: [],
    highlights: [
      "Buenos Aires exploration",
      "Santiago golf courses",
      "Cultural experiences",
      "South American hospitality"
    ],
    included: [
      "11 nights accommodation",
      "6 rounds of golf",
      "City tours",
      "All transfers"
    ],
    faq: [],
    similarTours: ["portugal-spain", "south-africa"],
    modalData: []
  },
  {
    id: "italy",
    key: "italy",
    title: "ITALY",
    slug: "italy-golf-tour",
    description: "Golf and culture in beautiful Italy",
    dates: "2026",
    duration: "TBA",
    route: "Tuscany · Lazio",
    badges: ["Register Interest", "Hosted by Sandy Baltussen"],
    images: {
      hero: "/2025-Italy-Golf-Tour-hosted-by-Sandy-Baltussen-Image-1.jpeg",
      gallery: ["/2025-Italy-Golf-Tour-hosted-by-Sandy-Baltussen-Image-1.jpeg"]
    },
    pricing: {
      double: 0,
      single: 0,
      nonGolfer: 0,
      currency: "EUR"
    },
    host: {
      name: "Sandy Baltussen",
      title: "Senior Tour Host",
      image: "/host-sandy.jpg",
      bio: "Sandy will lead this exciting new Italian golf tour."
    },
    itinerary: [],
    highlights: [
      "Tuscan golf courses",
      "Italian culture and cuisine",
      "Historic sites",
      "Wine country experiences"
    ],
    included: [
      "Details coming soon",
      "Register your interest"
    ],
    faq: [],
    similarTours: ["portugal-spain", "med-cruise"],
    modalData: []
  }
];

// Helper function to get tour by key
export const getTourByKey = (key: string): Tour | undefined => {
  return tourData.find(tour => tour.key === key);
};

// Helper function to get tour by slug
export const getTourBySlug = (slug: string): Tour | undefined => {
  return tourData.find(tour => tour.slug === slug);
};

// Helper function to get tours for homepage
export const getHomepageTours = (): Tour[] => {
  return tourData;
};
