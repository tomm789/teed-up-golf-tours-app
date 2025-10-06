import React from 'react';
import { ArchiveSort } from '@/hooks/useArchiveFilters';

const SortDropdown: React.FC<{ value: ArchiveSort; onChange: (v: ArchiveSort)=>void }>=({ value, onChange })=>{
  return (
    <select
      value={value}
      onChange={(e)=>onChange(e.target.value as ArchiveSort)}
      className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
    >
      <option value="RELEVANCE">Relevance</option>
      <option value="PRICE_ASC">Price: Low to High</option>
      <option value="PRICE_DESC">Price: High to Low</option>
      <option value="DURATION">Duration</option>
      <option value="RATING">Rating</option>
      <option value="DATE_ADDED">Date Added</option>
    </select>
  );
};

export default SortDropdown;


