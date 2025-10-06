import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useArchiveDemo } from '@/hooks/useArchiveDemo';
import FiltersSidebarDemo from '@/components/archiveDemo/FiltersSidebarDemo';
import MobileFiltersDemo from '@/components/archiveDemo/MobileFiltersDemo';
import SelectedFiltersBar from '@/components/archive/SelectedFiltersBar';
import SortDropdown from '@/components/archive/SortDropdown';
import SearchBar from '@/components/archive/SearchBar';
import TourListDemo from '@/components/archiveDemo/TourListDemo';

const ToursArchiveDemoPage: React.FC = () => {
  const filters = useArchiveDemo();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--tu-warmgray)' }}>
      <Header />
      <main className="pt-16">
        <div className="container py-8">
          {/* Desktop layout */}
          <div className="hidden md:flex items-center justify-between gap-4 mb-4">
            <SearchBar value={filters.search} onChange={filters.setSearch} />
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">View</span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => filters.setLayout('grid')}
                    className={`p-2 rounded ${filters.layout === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    aria-label="Grid view"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => filters.setLayout('list')}
                    className={`p-2 rounded ${filters.layout === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    aria-label="List view"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Sort by</span>
                <SortDropdown value={filters.sort} onChange={filters.setSort} />
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden space-y-4 mb-4">
            <SearchBar value={filters.search} onChange={filters.setSearch} />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">View</span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => filters.setLayout('grid')}
                    className={`p-2 rounded ${filters.layout === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    aria-label="Grid view"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => filters.setLayout('list')}
                    className={`p-2 rounded ${filters.layout === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    aria-label="List view"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Sort by</span>
                <SortDropdown value={filters.sort} onChange={filters.setSort} />
              </div>
            </div>
          </div>

          {/* Mobile Show Filters Button - Centered */}
          <div className="md:hidden flex justify-center mb-4">
            <MobileFiltersDemo filters={filters} />
          </div>

          <SelectedFiltersBar selected={filters.selected} onRemove={filters.removeFilter} onClearAll={filters.clearAll} />

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mt-6">
            <div className="hidden lg:block">
              <FiltersSidebarDemo filters={filters} />
            </div>
            <div>
              <TourListDemo filters={filters} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToursArchiveDemoPage;


