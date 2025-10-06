import { create } from 'zustand';
import { TourService, SingleTour } from '@/services/tourService';

type TourWPState = {
  tour: SingleTour | null;
  isLoading: boolean;
  error: string | null;
  fetchTour: (slug: string) => Promise<void>;
  clear: () => void;
};

export const useWordPressTourStore = create<TourWPState>((set) => ({
  tour: null,
  isLoading: false,
  error: null,
  fetchTour: async (slug: string) => {
    set({ isLoading: true, error: null });
    try {
      const svc = new TourService();
      const data = await svc.fetchTour(slug);
      set({ tour: data, isLoading: false });
    } catch (e: any) {
      set({ error: e?.message || 'Failed to load tour', isLoading: false });
    }
  },
  clear: () => set({ tour: null, isLoading: false, error: null })
}));


