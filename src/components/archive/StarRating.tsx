import React from 'react';

const StarRating: React.FC<{ value: number; onChange: (v: number)=>void }>=({ value, onChange })=>{
  return (
    <div className="flex items-center gap-2">
      {[1,2,3,4,5].map(star => (
        <button
          key={star}
          onClick={()=>onChange(star)}
          aria-label={`${star} stars & up`}
          className={`text-xl ${value >= star ? 'text-yellow-500' : 'text-gray-300'}`}
        >★</button>
      ))}
      {value ? (
        <button className="text-sm text-gray-600 underline" onClick={()=>onChange(0)}>Clear</button>
      ) : null}
    </div>
  );
};

export default StarRating;


