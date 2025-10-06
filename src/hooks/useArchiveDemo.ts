import React, { useEffect, useMemo, useState } from 'react';
import { getHomepageTours } from '@/data/tours';

type ArchiveSort = 'RELEVANCE' | 'PRICE_ASC' | 'PRICE_DESC' | 'DURATION' | 'RATING' | 'DATE_ADDED';

type Layout = 'grid' | 'list';

const allOptions = {
  collections: ['luxury', 'adventure', 'cultural'],
  regions: ['europe', 'asia', 'americas', 'africa', 'oceania'],
  countries: ['portugal', 'spain', 'vietnam', 'japan', 'usa', 'canada', 'south-africa'],
  tourTypes: ['golf', 'cultural', 'adventure'],
  seasons: ['spring', 'summer', 'autumn', 'winter'],
  activities: ['golf', 'wine', 'sightseeing', 'wildlife'],
  accommodationTypes: ['luxury', 'resort', 'boutique'],
  specialInterests: ['wine-country', 'mountains', 'beach']
};

export function useArchiveDemo() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<ArchiveSort>('RELEVANCE');
  const [layout, setLayout] = useState<Layout>('grid');
  const [price, setPrice] = useState<[number, number]>([0, 20000]);
  const [durationDays, setDurationDays] = useState<[number, number]>([1, 30]);
  const [points, setPoints] = useState<[number, number]>([0, 1000]);
  const [rating, setRating] = useState(0);
  const [collections, setCollections] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [tourTypes, setTourTypes] = useState<string[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [accommodationTypes, setAccommodationTypes] = useState<string[]>([]);
  const [specialInterests, setSpecialInterests] = useState<string[]>([]);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  const data = useMemo(() => {
    // Sample: enrich sample tours with pseudo attributes to simulate filters
    const base = getHomepageTours().map(t => ({
      ...t,
      priceMin: t.pricing.double,
      durationDays: Number((t.duration || '0').split(' ')[0]) || 10,
      rating: 4 + (t.title.length % 2 ? 0.5 : 0),
      pointsRequired: (t.pricing.double / 100) | 0,
      region: t.route.toLowerCase().includes('lisbon') || t.route.toLowerCase().includes('spain') ? 'europe' : 'asia',
      country: t.slug.includes('portugal') ? 'portugal' : t.slug.includes('spain') ? 'spain' : t.slug.includes('vietnam') ? 'vietnam' : 'usa',
      collections: t.title.includes('LUXURY') ? ['luxury'] : ['adventure'],
      tourType: 'golf',
      activities: ['golf'],
      accommodationType: 'luxury',
      specialInterests: t.title.includes('WINE') ? ['wine-country'] : []
    }));

    let filtered = base;
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter(t => t.title.toLowerCase().includes(q) || t.route.toLowerCase().includes(q));
    }
    filtered = filtered.filter(t => t.priceMin >= price[0] && t.priceMin <= price[1]);
    filtered = filtered.filter(t => t.durationDays >= durationDays[0] && t.durationDays <= durationDays[1]);
    filtered = filtered.filter(t => t.pointsRequired >= points[0] && t.pointsRequired <= points[1]);
    if (rating) filtered = filtered.filter(t => t.rating >= rating);
    if (collections.length) filtered = filtered.filter(t => collections.some((c) => t.collections.includes(c)));
    if (regions.length) filtered = filtered.filter(t => regions.includes(t.region));
    if (countries.length) filtered = filtered.filter(t => countries.includes(t.country));
    if (tourTypes.length) filtered = filtered.filter(t => tourTypes.includes(t.tourType));
    if (seasons.length) filtered = filtered; // sample has no seasons
    if (activities.length) filtered = filtered.filter(t => activities.some(a => t.activities.includes(a)));
    if (accommodationTypes.length) filtered = filtered.filter(t => accommodationTypes.includes(t.accommodationType));
    if (specialInterests.length) filtered = filtered.filter(t => specialInterests.some(s => t.specialInterests.includes(s)));

    switch (sort) {
      case 'PRICE_ASC': filtered = filtered.sort((a,b)=>a.priceMin-b.priceMin); break;
      case 'PRICE_DESC': filtered = filtered.sort((a,b)=>b.priceMin-a.priceMin); break;
      case 'DURATION': filtered = filtered.sort((a,b)=>b.durationDays-a.durationDays); break;
      case 'RATING': filtered = filtered.sort((a,b)=>b.rating-a.rating); break;
      case 'DATE_ADDED': filtered = filtered; break;
      default: break;
    }
    return filtered;
  }, [search, debouncedSearch, price, durationDays, points, rating, collections, regions, countries, tourTypes, seasons, activities, accommodationTypes, specialInterests, sort]);

  const selected = useMemo(() => {
    const chips: Array<{ key: string; label: string }> = [];
    const pushAll = (k: string, arr: string[]) => arr.forEach(v => chips.push({ key: `${k}:${v}`, label: v }));
    pushAll('collections', collections);
    pushAll('regions', regions);
    pushAll('countries', countries);
    pushAll('types', tourTypes);
    pushAll('seasons', seasons);
    pushAll('activities', activities);
    pushAll('accommodationTypes', accommodationTypes);
    pushAll('interests', specialInterests);
    return chips;
  }, [collections, regions, countries, tourTypes, seasons, activities, accommodationTypes, specialInterests]);

  const toggleArr = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (v: string) => setter((prev: string[]) => prev.includes(v) ? prev.filter((x: string)=>x!==v) : [...prev, v]);

  return {
    // state
    layout, search, sort,
    price, durationDays, points, rating,
    collections, regions, countries, tourTypes, seasons, activities, accommodationTypes, specialInterests,
    // derived
    selected,
    results: data,
    // actions
    toggleLayout: () => setLayout(l => l === 'grid' ? 'list' : 'grid'),
    setLayout, setSearch, setSort,
    setPrice, setDurationDays, setPoints, setRating,
    toggleCollection: toggleArr(setCollections),
    toggleRegion: toggleArr(setRegions),
    toggleCountry: toggleArr(setCountries),
    toggleTourType: toggleArr(setTourTypes),
    toggleSeason: toggleArr(setSeasons),
    toggleActivity: toggleArr(setActivities),
    toggleAccommodationType: toggleArr(setAccommodationTypes),
    toggleSpecialInterest: toggleArr(setSpecialInterests),
    removeFilter: (key: string) => {
      const [k, v] = key.split(':');
      const map: Record<string, (cb: (arr: string[])=>string[])=>void> = {
        collections: (fn) => setCollections(fn as any),
        regions: (fn) => setRegions(fn as any),
        countries: (fn) => setCountries(fn as any),
        types: (fn) => setTourTypes(fn as any),
        seasons: (fn) => setSeasons(fn as any),
        activities: (fn) => setActivities(fn as any),
        accommodationTypes: (fn) => setAccommodationTypes(fn as any),
        interests: (fn) => setSpecialInterests(fn as any)
      };
      const setter = map[k];
      if (setter) setter(arr => arr.filter(x => x !== v));
    },
    clearAll: () => {
      setCollections([]); setRegions([]); setCountries([]); setTourTypes([]);
      setSeasons([]); setActivities([]); setAccommodationTypes([]); setSpecialInterests([]);
    },
    // options (for UI)
    options: allOptions
  };
}


