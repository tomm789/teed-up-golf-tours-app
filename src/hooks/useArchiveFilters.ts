import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type ArchiveSort = 'RELEVANCE' | 'PRICE_ASC' | 'PRICE_DESC' | 'DURATION' | 'RATING' | 'DATE_ADDED';

export type ArchiveFiltersState = {
  search: string;
  sort: ArchiveSort;
  price: [number, number];
  durationDays: [number, number];
  points: [number, number];
  rating: number;
  collections: string[];
  regions: string[];
  countries: string[];
  tourTypes: string[];
  seasons: string[];
  activities: string[];
  accommodationTypes: string[];
  specialInterests: string[];
};

export function useArchiveFilters() {
  const [params, setParams] = useSearchParams();
  const [state, setState] = useState<ArchiveFiltersState>({
    search: params.get('q') || '',
    sort: (params.get('sort') as ArchiveSort) || 'RELEVANCE',
    price: [Number(params.get('pmin') || 0), Number(params.get('pmax') || 50000)],
    durationDays: [Number(params.get('dmin') || 1), Number(params.get('dmax') || 30)],
    points: [Number(params.get('ptmin') || 0), Number(params.get('ptmax') || 1000)],
    rating: Number(params.get('rating') || 0),
    collections: (params.get('collections') || '').split(',').filter(Boolean),
    regions: (params.get('regions') || '').split(',').filter(Boolean),
    countries: (params.get('countries') || '').split(',').filter(Boolean),
    tourTypes: (params.get('types') || '').split(',').filter(Boolean),
    seasons: (params.get('seasons') || '').split(',').filter(Boolean),
    activities: (params.get('activities') || '').split(',').filter(Boolean),
    accommodationTypes: (params.get('accommodationTypes') || '').split(',').filter(Boolean),
    specialInterests: (params.get('interests') || '').split(',').filter(Boolean)
  });

  useEffect(() => {
    const next = new URLSearchParams();
    if (state.search) next.set('q', state.search);
    if (state.sort && state.sort !== 'RELEVANCE') next.set('sort', state.sort);
    next.set('pmin', String(state.price[0])); next.set('pmax', String(state.price[1]));
    next.set('dmin', String(state.durationDays[0])); next.set('dmax', String(state.durationDays[1]));
    next.set('ptmin', String(state.points[0])); next.set('ptmax', String(state.points[1]));
    if (state.rating) next.set('rating', String(state.rating));
    const setCSV = (k: string, arr: string[]) => { if (arr.length) next.set(k, arr.join(',')); };
    setCSV('collections', state.collections);
    setCSV('regions', state.regions);
    setCSV('countries', state.countries);
    setCSV('types', state.tourTypes);
    setCSV('seasons', state.seasons);
    setCSV('activities', state.activities);
    setCSV('accommodationTypes', state.accommodationTypes);
    setCSV('interests', state.specialInterests);
    setParams(next, { replace: true });
  }, [state, setParams]);

  const selected = useMemo(() => {
    const chips: Array<{ key: string; label: string }> = [];
    const pushAll = (k: string, arr: string[]) => arr.forEach(v => chips.push({ key: `${k}:${v}`, label: v }));
    pushAll('collections', state.collections);
    pushAll('regions', state.regions);
    pushAll('countries', state.countries);
    pushAll('types', state.tourTypes);
    pushAll('seasons', state.seasons);
    pushAll('activities', state.activities);
    pushAll('accommodationTypes', state.accommodationTypes);
    pushAll('interests', state.specialInterests);
    return chips;
  }, [state]);

  return {
    ...state,
    selected,
    setSearch: (v: string) => setState(s => ({ ...s, search: v })),
    setSort: (v: ArchiveSort) => setState(s => ({ ...s, sort: v })),
    setPrice: (v: [number, number]) => setState(s => ({ ...s, price: v })),
    setDurationDays: (v: [number, number]) => setState(s => ({ ...s, durationDays: v })),
    setPoints: (v: [number, number]) => setState(s => ({ ...s, points: v })),
    setRating: (v: number) => setState(s => ({ ...s, rating: v })),
    toggle: (k: keyof ArchiveFiltersState, v: string) => setState(s => {
      const arr = (s[k] as string[]) || [];
      const exists = arr.includes(v);
      const next = exists ? arr.filter(x => x !== v) : [...arr, v];
      return { ...s, [k]: next } as any;
    }),
    removeFilter: (key: string) => setState(s => {
      const [k, v] = key.split(':');
      const arr = (s as any)[k] as string[];
      if (!Array.isArray(arr)) return s;
      return { ...s, [k]: arr.filter(x => x !== v) };
    }),
    clearAll: () => setState(s => ({
      ...s,
      collections: [], regions: [], countries: [], tourTypes: [], seasons: [], activities: [], accommodationTypes: [], specialInterests: []
    }))
  };
}


