/**
 * مكون اختيار اللغة للزيارة الأولى؛ يظهر كواجهة كاملة الشاشة 
 * ويختفي بمجرد اختيار المستخدم للغته المفضلة.
 */
import React from 'react';
import { Language } from '../types';

interface LanguageModalProps {
  onSelect: (lang: Language) => void;
  logoUrl: string;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ onSelect, logoUrl }) => {
  const options: { code: Language; label: string; flag: string }[] = [
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark flex items-center justify-center p-6 animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/10 opacity-50"></div>
      
      <div className="relative z-10 w-full max-w-md text-center">
        <div className="mb-10 flex justify-center">
           <div className="w-32 h-32 rounded-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 flex items-center justify-center p-6 shadow-2xl">
              <img src={logoUrl} alt="AmA Logo" className="max-w-full max-h-full object-contain" />
           </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-8">Choose Your Language / اختر لغتك</h2>
        
        <div className="grid gap-4">
          {options.map((opt) => (
            <button
              key={opt.code}
              onClick={() => onSelect(opt.code)}
              className="group flex items-center justify-between bg-slate-800/50 hover:bg-brand-primary border border-slate-700 hover:border-brand-primary p-5 rounded-2xl transition-all duration-300 transform active:scale-95"
            >
              <span className="text-2xl">{opt.flag}</span>
              <span className="text-xl font-bold text-white group-hover:text-white">{opt.label}</span>
              <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-white transition-colors"></div>
            </button>
          ))}
        </div>
        
        <p className="mt-10 text-slate-500 text-sm italic">
          Welcome to AmA Social & Web Agency
        </p>
      </div>
    </div>
  );
};

export default LanguageModal;