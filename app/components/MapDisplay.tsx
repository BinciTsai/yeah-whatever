'use client';
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

export default function MapDisplay({
  center,
  zoom,
  selected,
}: {
  center: { lat: number; lng: number } | null;
  zoom: number;
  selected?: { lat: number; lng: number; title?: string } | null;
}) {
  if (!center) return <div className="h-80 bg-gray-100 flex items-center justify-center">Loading map...</div>;
  return (
    <GoogleMap mapContainerStyle={{ width: '100%', height: '520px' }} center={center} zoom={zoom}>
      <Marker position={center} label="You" />
      {selected && <Marker position={{ lat: selected.lat, lng: selected.lng }} label={selected.title || ''} />}
    </GoogleMap>
  );
}
