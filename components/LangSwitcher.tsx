'use client';
import React from 'react';
export default function LangSwitcher({ lang, setLang }: { lang: string; setLang: (l:string)=>void }) {
  return (
    <div>
      <button onClick={() => setLang(lang === 'en' ? 'zh-TW' : 'en')} className="px-3 py-1 border rounded bg-white text-sm">
        {lang === 'en' ? '繁體中文' : 'English'}
      </button>
    </div>
  );
}
