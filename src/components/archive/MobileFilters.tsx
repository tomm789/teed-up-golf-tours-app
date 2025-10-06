import React, { useState } from 'react';
import FiltersSidebar from '@/components/archive/FiltersSidebar';

const MobileFilters: React.FC<{ filters: any }>=({ filters })=>{
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden mb-4">
      <button className="btn-outline" onClick={()=>setOpen(!open)}>{open ? 'Hide Filters' : 'Show Filters'}</button>
      {open && (
        <div className="mt-4">
          <FiltersSidebar filters={filters} />
        </div>
      )}
    </div>
  );
};

export default MobileFilters;


