'use client';
import React from 'react';
export default function SettingsPanel({ radiusMeters, setRadiusMeters, minRating, setMinRating }: any) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="mb-3">
        <label className="text-sm text-gray-600">Distance: {(radiusMeters/1000).toFixed(1)} km</label>
        <input type="range" min="1000" max="10000" step="500" value={radiusMeters} onChange={(e)=>setRadiusMeters(Number(e.target.value))} className="w-full" />
      </div>
      <div>
        <label className="text-sm text-gray-600">Minimum rating: {minRating.toFixed(1)}</label>
        <input type="range" min="1" max="5" step="0.1" value={minRating} onChange={(e)=>setMinRating(Number(e.target.value))} className="w-full" />
      </div>
    </div>
  );
}
