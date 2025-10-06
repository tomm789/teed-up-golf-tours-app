import React from 'react';

const RangeSlider: React.FC<{
  value: [number, number];
  onChange: (v: [number, number]) => void;
  min: number;
  max: number;
  step?: number;
  format?: (v: number) => string;
}> = ({ value, onChange, min, max, step = 1, format }) => {
  const [minVal, maxVal] = value;
  const fmt = (v: number) => (format ? format(v) : String(v));
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{fmt(minVal)}</span>
        <span>{fmt(maxVal)}</span>
      </div>
      <div className="flex gap-2 items-center">
        <input type="range" min={min} max={max} step={step} value={minVal} onChange={(e)=>{
          const next = Math.min(Number(e.target.value), maxVal);
          onChange([next, maxVal]);
        }} className="w-full" />
        <input type="range" min={min} max={max} step={step} value={maxVal} onChange={(e)=>{
          const next = Math.max(Number(e.target.value), minVal);
          onChange([minVal, next]);
        }} className="w-full" />
      </div>
    </div>
  );
};

export default RangeSlider;


