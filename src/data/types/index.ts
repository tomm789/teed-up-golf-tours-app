// Tour related types
export interface Tour {
  id: string;
  key: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  dates: string;
  duration: string;
  route: string;
  badges: string[];
  images: {
    hero: string;
    gallery: string[];
  };
  pricing: {
    double: number;
    single: number;
    nonGolfer: number;
    currency: string;
    upgrades?: {
      double: number;
      single: number;
      nonGolfer: number;
    };
  };
  host: {
    name: string;
    title: string;
    image: string;
    bio: string;
  };
  itinerary: Day[];
  highlights: string[];
  included: string[];
  faq: FAQ[];
  similarTours: string[];
  modalData: ModalData[];
}

export interface Day {
  id: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ModalData {
  id: string;
  image: string;
  headline: string;
  content: string;
}

export interface SimilarTour {
  id: number;
  title: string;
  image: string;
  duration: string;
  difficulty: string;
  price: number;
  points: number;
}

// Component props types
export interface TourCardProps {
  tour: Tour;
  variant?: 'default' | 'luxury';
}

export interface TourHeaderProps {
  tour: Tour;
}

export interface TourDetailsProps {
  tour: Tour;
}

// State management types
export interface AppState {
  selectedDay: number;
  activeModal: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface TourState {
  tours: Tour[];
  currentTour: Tour | null;
  isLoading: boolean;
  error: string | null;
}

