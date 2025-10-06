import { create } from 'zustand';
import { AppState, TourState } from '@/data/types';

// App-wide state management
interface AppStore extends AppState {
  setSelectedDay: (day: number) => void;
  setActiveModal: (modalId: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetAppState: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // Initial state
  selectedDay: 1,
  activeModal: null,
  isLoading: false,
  error: null,

  // Actions
  setSelectedDay: (day: number) => set({ selectedDay: day }),
  setActiveModal: (modalId: string | null) => set({ activeModal: modalId }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  resetAppState: () => set({ 
    selectedDay: 1, 
    activeModal: null, 
    isLoading: false, 
    error: null 
  }),
}));

// Tour-specific state management
interface TourStore extends TourState {
  setTours: (tours: any[]) => void;
  setCurrentTour: (tour: any | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getTourByKey: (key: string) => any | undefined;
  resetTourState: () => void;
}

export const useTourStore = create<TourStore>((set, get) => ({
  // Initial state
  tours: [],
  currentTour: null,
  isLoading: false,
  error: null,

  // Actions
  setTours: (tours: any[]) => set({ tours }),
  setCurrentTour: (tour: any | null) => set({ currentTour: tour }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  getTourByKey: (key: string) => {
    const { tours } = get();
    return tours.find((tour: any) => tour.key === key);
  },
  resetTourState: () => set({ 
    tours: [], 
    currentTour: null, 
    isLoading: false, 
    error: null 
  }),
}));

