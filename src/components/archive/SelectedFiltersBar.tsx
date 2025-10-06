import React from 'react';

const SelectedFiltersBar: React.FC<{
  selected: Array<{ key: string; label: string }>;
  onRemove: (key: string)=>void;
  onClearAll: ()=>void;
}>=({ selected, onRemove, onClearAll })=>{
  if (!selected.length) return null;
  return (
    <div className="flex items-center flex-wrap gap-2 mb-4">
      {selected.map(chip => (
        <button key={chip.key} className="px-3 py-1 rounded-full bg-white border text-sm" onClick={()=>onRemove(chip.key)}>
          {chip.label} ×
        </button>
      ))}
      <button className="ml-auto text-sm underline" onClick={onClearAll}>Clear all</button>
    </div>
  );
};

export default SelectedFiltersBar;


