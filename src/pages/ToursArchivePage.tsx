import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FiltersSidebar from '@/components/archive/FiltersSidebar';
import MobileFilters from '@/components/archive/MobileFilters';
import SelectedFiltersBar from '@/components/archive/SelectedFiltersBar';
import SortDropdown from '@/components/archive/SortDropdown';
import SearchBar from '@/components/archive/SearchBar';
import TourList from '@/components/archive/TourList';
import { useArchiveFilters } from '@/hooks/useArchiveFilters';

const ToursArchivePage: React.FC = () => {
  const filters = useArchiveFilters();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--tu-warmgray)' }}>
      <Header />
      <main className="pt-16">
        <div className="container py-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <SearchBar value={filters.search} onChange={filters.setSearch} />
            <SortDropdown value={filters.sort} onChange={filters.setSort} />
          </div>
          <SelectedFiltersBar selected={filters.selected} onRemove={filters.removeFilter} onClearAll={filters.clearAll} />
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mt-6">
            <div className="hidden lg:block">
              <FiltersSidebar filters={filters} />
            </div>
            <div>
              <MobileFilters filters={filters} />
              <TourList filters={filters} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToursArchivePage;


