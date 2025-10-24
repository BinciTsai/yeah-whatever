'use client';
import React from 'react';
export default function AdBanner({ onAdWatched }: { onAdWatched?: ()=>void }) {
  const [key, setKey] = React.useState(0);
  const watch = ()=>{
    setTimeout(()=>{
      setKey(k=>k+1);
      if(onAdWatched) onAdWatched();
      alert('Ad watched (simulated). +1 draw granted.');
    }, 800);
  };
  return (
    <div className="border p-3 rounded bg-white shadow-sm text-center">
      <div className="text-xs text-gray-500">Ad Placeholder — refresh #{key}</div>
      <div className="mt-2">
        <button onClick={watch} className="px-3 py-1 bg-blue-600 text-white rounded">Watch Ad</button>
      </div>
    </div>
  );
}
