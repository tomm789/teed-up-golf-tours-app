import React from 'react';
import RangeSlider from '@/components/archive/RangeSlider';
import StarRating from '@/components/archive/StarRating';

const Section: React.FC<{ title: string; children: React.ReactNode }>=({ title, children })=> (
  <div className="mb-6">
    <h4 className="font-semibold mb-3" style={{ color: 'var(--tu-navy)' }}>{title}</h4>
    {children}
  </div>
);

const CheckboxList: React.FC<{ options: string[]; selected: string[]; onToggle: (v: string)=>void }>=({ options, selected, onToggle }) => (
  <div className="space-y-2">
    {options.map(opt => (
      <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={selected.includes(opt)} onChange={()=>onToggle(opt)} />
        <span>{opt}</span>
      </label>
    ))}
  </div>
);

const FiltersSidebar: React.FC<{ filters: any }>=({ filters })=>{
  return (
    <aside className="bg-white rounded-xl p-4 shadow-sm sticky top-24">
      <Section title="Price">
        <RangeSlider value={filters.price} onChange={filters.setPrice} min={0} max={50000} step={50} format={(v)=>`$${v}`} />
      </Section>
      <Section title="Duration (days)">
        <RangeSlider value={filters.durationDays} onChange={filters.setDurationDays} min={1} max={30} step={1} />
      </Section>
      <Section title="Points Required">
        <RangeSlider value={filters.points} onChange={filters.setPoints} min={0} max={1000} step={10} />
      </Section>
      <Section title="Rating">
        <StarRating value={filters.rating} onChange={filters.setRating} />
      </Section>
      <Section title="Collections">
        <CheckboxList options={["luxury","adventure","cultural"]} selected={filters.collections} onToggle={(v)=>filters.toggle('collections', v)} />
      </Section>
      <Section title="Region">
        <CheckboxList options={["europe","asia","americas","africa","oceania"]} selected={filters.regions} onToggle={(v)=>filters.toggle('regions', v)} />
      </Section>
      <Section title="Tour Type">
        <CheckboxList options={["golf","cultural","adventure"]} selected={filters.tourTypes} onToggle={(v)=>filters.toggle('tourTypes', v)} />
      </Section>
    </aside>
  );
};

export default FiltersSidebar;


