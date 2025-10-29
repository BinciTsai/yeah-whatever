'use client';
import { Dispatch, SetStateAction } from 'react';
type Props = {
  lang: 'en' | 'zh-TW';
  setLang: Dispatch<SetStateAction<'en' | 'zh-TW'>>;
};
export default function LangSwitcher({ lang, setLang }: Props) {
  return (
    <select value={lang} onChange={(e) => setLang(e.target.value as 'en' | 'zh-TW')} className="border rounded p-1 bg-white text-sm">
      <option value="en">English</option>
      <option value="zh-TW">繁體中文</option>
    </select>
  );
}
