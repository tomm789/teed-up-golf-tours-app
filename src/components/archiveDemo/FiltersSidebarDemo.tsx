import React from 'react';
import RangeSlider from '@/components/archive/RangeSlider';
import StarRating from '@/components/archive/StarRating';

const Accordion: React.FC<{ title: string; children: React.ReactNode }>=({ title, children })=>{
  const [open, setOpen] = React.useState(true);
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        className="w-full flex items-center justify-between py-3 text-left"
        aria-expanded={open ? 'true' : 'false'}
        onClick={()=>setOpen(!open)}
      >
        <span className="font-semibold" style={{ color: 'var(--tu-navy)' }}>{title}</span>
        <span className="text-gray-500">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="pb-4 max-h-[180px] overflow-auto pr-1">
          {children}
        </div>
      )}
    </div>
  );
};

const CheckboxList: React.FC<{ options: string[] }>=({ options }) => (
  <div className="space-y-2">
    {options.map(opt => (
      <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" />
        <span>{opt}</span>
      </label>
    ))}
  </div>
);

const FiltersSidebarDemo: React.FC<{ filters: any }>=() =>{
  const collections = ["Luxury","Adventure","Cultural"];
  const featuredDestinations = ["Portugal","Spain","Vietnam","Japan","USA"];
  const regions = ["Europe","Asia","Americas","Africa","Oceania"];
  const countries = ["Portugal","Spain","Vietnam","Japan","USA","Canada","South Africa"];
  const tourTypes = ["Golf","Cultural","Adventure"];
  const events: string[] = [];
  const activities = ["Golf","Wine","Sightseeing","Wildlife"];
  const seasons = ["Spring","Summer","Autumn","Winter"];
  const accommodationTypes = ["Luxury","Resort","Boutique"];
  const specialInterests = ["Wine Country","Mountains","Beach"];
  const availability = ["Available","Waitlist","Sold Out"];

  return (
    <aside className="bg-white rounded-xl p-4 shadow-sm sticky top-24">
      {/* Selected filters chips (placeholders) */}
      <div className="flex items-center flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 rounded-full bg-gray-100 border text-sm">Luxury ×</span>
        <span className="px-3 py-1 rounded-full bg-gray-100 border text-sm">Europe ×</span>
        <button className="ml-auto text-sm underline">Clear all</button>
      </div>

      {/* Accordions in specified order */}
      <div className="space-y-2">
        <Accordion title="Collections">
          <CheckboxList options={collections} />
        </Accordion>
        <Accordion title="Featured Destinations">
          <CheckboxList options={featuredDestinations} />
        </Accordion>
        <Accordion title="Region">
          <CheckboxList options={regions} />
        </Accordion>
        <Accordion title="Country">
          <CheckboxList options={countries} />
        </Accordion>
        <Accordion title="Tour Type">
          <CheckboxList options={tourTypes} />
        </Accordion>
        <Accordion title="Events">
          {events.length ? <CheckboxList options={events} /> : <div className="text-sm text-gray-500">No events</div>}
        </Accordion>
        <Accordion title="Activities">
          <CheckboxList options={activities} />
        </Accordion>
        <Accordion title="Travel Dates">
          <div className="grid grid-cols-2 gap-2">
            <input type="date" className="px-2 py-1 rounded border border-gray-300 text-sm" aria-label="Start date" />
            <input type="date" className="px-2 py-1 rounded border border-gray-300 text-sm" aria-label="End date" />
          </div>
        </Accordion>
        <Accordion title="Duration (Days/Nights)">
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-600 mb-1">Days</div>
              <RangeSlider value={[1,30]} onChange={()=>{}} min={1} max={30} step={1} />
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Nights</div>
              <RangeSlider value={[1,30]} onChange={()=>{}} min={1} max={30} step={1} />
            </div>
          </div>
        </Accordion>
        <Accordion title="Availability">
          <CheckboxList options={availability} />
        </Accordion>
        <Accordion title="Accommodation Type">
          <CheckboxList options={accommodationTypes} />
        </Accordion>
        <Accordion title="Special Interests">
          <CheckboxList options={specialInterests} />
        </Accordion>
        <Accordion title="Season">
          <CheckboxList options={seasons} />
        </Accordion>
        <Accordion title="Difficulty Level">
          <CheckboxList options={["Easy","Moderate","Challenging"]} />
        </Accordion>
        <Accordion title="Points Required">
          <RangeSlider value={[0,1000]} onChange={()=>{}} min={0} max={1000} step={10} />
        </Accordion>
        <Accordion title="Rating">
          <StarRating value={0} onChange={()=>{}} />
        </Accordion>
        <Accordion title="Price">
          <RangeSlider value={[0,20000]} onChange={()=>{}} min={0} max={20000} step={50} />
        </Accordion>
      </div>
    </aside>
  );
};

export default FiltersSidebarDemo;


