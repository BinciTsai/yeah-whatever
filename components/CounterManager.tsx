'use client';
import React, { useEffect, useState } from 'react';
const KEY = 'yw_draw_record_final';
const DAILY = 3;
function todayStr(){ return new Date().toISOString().split('T')[0]; }
export default function CounterManager({ children }: { children: (props:any)=>React.ReactNode }) {
  const [state, setState] = useState({ remaining: DAILY, lastReset: todayStr() });
  useEffect(()=>{
    try{
      const raw = localStorage.getItem(KEY);
      const today = todayStr();
      if(!raw){ localStorage.setItem(KEY, JSON.stringify({ date: today, count: 0 })); setState({ remaining: DAILY, lastReset: today }); return; }
      const obj = JSON.parse(raw);
      if(obj.date !== today){ localStorage.setItem(KEY, JSON.stringify({ date: today, count: 0 })); setState({ remaining: DAILY, lastReset: today }); return; }
      setState({ remaining: Math.max(0, DAILY - (obj.count||0)), lastReset: obj.date });
    }catch(e){ setState({ remaining: DAILY, lastReset: todayStr() }); }
  },[]);

  const consume = ()=>{
    try{
      const raw = localStorage.getItem(KEY);
      const today = todayStr();
      let obj = raw ? JSON.parse(raw) : { date: today, count: 0 };
      if(obj.date !== today) obj = { date: today, count: 0 };
      if((obj.count||0) >= DAILY) return false;
      obj.count = (obj.count||0) + 1;
      localStorage.setItem(KEY, JSON.stringify(obj));
      setState({ remaining: Math.max(0, DAILY - obj.count), lastReset: obj.date });
      return true;
    }catch(e){ return false; }
  };

  const add = ()=>{
    try{
      const raw = localStorage.getItem(KEY);
      const today = todayStr();
      let obj = raw ? JSON.parse(raw) : { date: today, count: 0 };
      if(obj.date !== today) obj = { date: today, count: 0 };
      obj.count = Math.max(0, (obj.count||0) - 1);
      localStorage.setItem(KEY, JSON.stringify(obj));
      setState({ remaining: Math.max(0, DAILY - obj.count), lastReset: obj.date });
    }catch(e){}
  };

  return <>{children({ remaining: state.remaining, consume, add, resetDate: state.lastReset })}</>;
}
