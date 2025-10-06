import React from 'react';

const SearchBar: React.FC<{ value: string; onChange: (v: string)=>void }>=({ value, onChange })=>{
  return (
    <input
      type="search"
      placeholder="Search tours..."
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      className="w-full max-w-xl px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white text-gray-900"
    />
  );
};

export default SearchBar;


