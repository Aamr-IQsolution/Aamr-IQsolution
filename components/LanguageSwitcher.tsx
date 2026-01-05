/**
 * مكون مبدل اللغة؛ يظهر في شريط التنقل ويسمح للمستخدمين باختيار لغة عرض الموقع 
 * من بين الخيارات المتاحة (الهولندية، الإنجليزية، العربية).
 */
import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-400" />
      <select
        value={currentLang}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="bg-brand-dark border border-slate-700 text-sm rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-brand-primary"
      >
        <option value="nl">Nederlands</option>
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;