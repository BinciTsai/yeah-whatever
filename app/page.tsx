'use client';
import React, { useEffect, useState } from 'react';
import LangSwitcher from '../components/LangSwitcher';
import SettingsPanel from '../components/SettingsPanel';
import AdBanner from '../components/AdBanner';
import CounterManager from '../components/CounterManager';
type Place = { name: string; rating?: number; vicinity?: string; place_id?: string; };
export default function Page() {
  const [lang, setLang] = useState<'en'|'zh-TW'>('en');
  const [radiusMeters, setRadiusMeters] = useState<number>(Number(process.env.NEXT_PUBLIC_DEFAULT_RADIUS_METERS || 6000));
  const [minRating, setMinRating] = useState<number>(Number(process.env.NEXT_PUBLIC_MIN_RATING || 3.5));
  const [position, setPosition] = useState<{lat:number,lng:number}|null>(null);
  const [picked, setPicked] = useState<Place|null>(null);
  const [loading, setLoading] = useState(false);
  const [adKey, setAdKey] = useState(0);
  useEffect(()=>{
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
    if(stored === 'zh-TW') setLang('zh-TW');
    if(typeof navigator !== 'undefined' && navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=> setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }), ()=> setPosition({ lat:25.0330, lng:121.5654 }));
    } else {
      setPosition({ lat:25.0330, lng:121.5654 });
    }
  },[]);
  async function fetchPlaces(lat:number,lng:number){
    const resp = await fetch(`/api/places?lat=${lat}&lng=${lng}&radius=${radiusMeters}&minRating=${minRating}`);
    const data = await resp.json();
    return data.results || [];
  }
  return (
    <CounterManager>
      {({ remaining, consume, add }: any) => (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">whatever! <span className="text-gray-500 font-normal">隨便吃啦</span></h1>
              <p className="text-sm text-gray-600">{lang==='en' ? 'Random restaurant picker' : '隨機餐廳抽選器'}</p>
            </div>
            <LangSwitcher lang={lang} setLang={setLang} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-4">
              <SettingsPanel radiusMeters={radiusMeters} setRadiusMeters={setRadiusMeters} minRating={minRating} setMinRating={setMinRating} />
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-sky-600 text-white rounded" onClick={async ()=>{
                    if (remaining <= 0) {
                      alert(lang==='en' ? 'No free draws left. Watch an ad to get +1.' : '今日免費次數已用盡，觀看廣告可+1。');
                      return;
                    }
                    if (!position) { alert('Waiting for location...'); return; }
                    setLoading(true);
                    const places = await fetchPlaces(position.lat, position.lng);
                    if (!places.length) { alert(lang==='en' ? 'No nearby restaurants found.' : '找不到附近餐廳'); setLoading(false); return; }
                    const pick = places[Math.floor(Math.random()*places.length)];
                    setPicked(pick);
                    consume();
                    setAdKey(k=>k+1);
                    setLoading(false);
                  }}>{lang==='en' ? 'Pick a restaurant' : '抽餐廳'}</button>
                  <div className="text-sm text-gray-600">{lang==='en' ? `Free draws left: ${remaining}` : `今日免費次數：${remaining}`}</div>
                </div>
                {loading && <div className="mt-3 text-sm text-gray-500">Loading...</div>}
                {picked && (
                  <div className="mt-4 p-4 border rounded">
                    <div className="font-semibold">{picked.name}</div>
                    <div className="text-sm text-gray-600">⭐ {picked.rating || '-'} • {picked.vicinity || ''}</div>
                    <div className="mt-2">
                      <a className="text-sky-600" target="_blank" rel="noreferrer" href={picked.place_id ? `https://www.google.com/maps/search/?api=1&query_place_id=${picked.place_id}` : '#'}>{lang==='en' ? 'Open in Maps' : '在地圖中開啟'}</a>
                      <button className="ml-3 px-3 py-1 bg-green-600 text-white rounded" onClick={()=>{ alert(lang==='en' ? 'Simulated affiliate click +$0.05' : '模擬聯盟點擊 +$0.05'); }}>Order</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <AdBanner key={adKey} onAdWatched={()=>{ add(); }} />
              <div className="bg-white p-4 rounded shadow text-sm text-gray-600">
                <div className="font-semibold mb-2">{lang==='en' ? 'Settings' : '設定'}</div>
                <div>{lang==='en' ? 'Radius' : '距離'}: {(radiusMeters/1000).toFixed(1)} km</div>
                <div>{lang==='en' ? 'Min rating' : '最低評等'}: {minRating.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CounterManager>
  );
}
