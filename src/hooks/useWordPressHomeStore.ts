import { create } from 'zustand';
import { HomepageService, HomepageData } from '@/services/homepageService';

type HomeState = {
  data: HomepageData | null;
  isLoading: boolean;
  error: string | null;
  fetch: () => Promise<void>;
};

export const useWordPressHomeStore = create<HomeState>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  fetch: async () => {
    set({ isLoading: true, error: null });
    try {
      const svc = new HomepageService();
      const data = await svc.fetchHomepage();
      set({ data, isLoading: false });
    } catch (e: any) {
      set({ error: e?.message || 'Failed to load homepage', isLoading: false });
    }
  }
}));


