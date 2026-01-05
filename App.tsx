/**
 * المكون الرئيسي للتطبيق؛ يتحكم في المنطق الكلي ويدير التنقل بين واجهة العرض العامة للموقع،
 * صفحة تسجيل دخول المسؤول، ولوحة تحكم الإدارة (Dashboard).
 */
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { ContentProvider, useContent } from './contexts/ContentContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import LanguageModal from './components/LanguageModal';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';
import { Menu, X, Lock, Mail, MapPin } from 'lucide-react';

const LOGO_FALLBACK = "https://i.ibb.co/3sX8M8K/433054174-122137941272212906-8178144079872583842-n.png";
const LANG_STORAGE_KEY = 'ama_preferred_lang';

const PublicApp: React.FC<{ onViewAdmin: () => void }> = ({ onViewAdmin }) => {
  const { content, settings } = useContent();
  
  // Initialize state from localStorage or null to trigger modal
  const [lang, setLang] = useState<Language | null>(() => {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return (saved as Language) || null;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (!content) return <div className="min-h-screen bg-brand-dark flex items-center justify-center text-white font-sans">Initialising CMS...</div>;

  // Actual language to display (fallback to 'en' if lang is null, though modal covers it)
  const displayLang = lang || 'en';
  const t = content[displayLang];
  const isRTL = displayLang === 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = displayLang;
    document.title = settings.siteTitle;
    
    if (isRTL) {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-arabic');
    }
  }, [displayLang, isRTL, settings.siteTitle]);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem(LANG_STORAGE_KEY, newLang);
  };

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'pricing', label: t.nav.pricing },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-brand-dark overflow-x-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Show selection modal if no language is selected yet */}
      {!lang && (
        <LanguageModal 
          logoUrl={settings.logoUrl || LOGO_FALLBACK} 
          onSelect={handleLanguageChange} 
        />
      )}

      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-3" onClick={() => handleNavClick('home')}>
             <img 
               src={settings.logoUrl || LOGO_FALLBACK} 
               alt={settings.siteTitle} 
               className="h-12 md:h-14 w-auto object-contain transition-all hover:scale-110" 
               onError={(e) => { (e.target as HTMLImageElement).src = LOGO_FALLBACK; }}
             />
             <span className="hidden sm:block text-white font-bold text-xl tracking-tight">{settings.siteTitle.split(' ')[0]}</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-slate-300 hover:text-brand-primary transition-colors text-sm font-medium uppercase tracking-widest"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <LanguageSwitcher currentLang={displayLang} onLanguageChange={handleLanguageChange} />
          </div>

          <div className="md:hidden flex items-center gap-4">
             <LanguageSwitcher currentLang={displayLang} onLanguageChange={handleLanguageChange} />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 absolute w-full left-0 top-20 shadow-xl p-6 flex flex-col gap-4 animate-fade-in z-40">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left text-slate-300 hover:text-brand-primary py-3 border-b border-slate-800 last:border-0 text-lg font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 md:pb-0 md:pt-20">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-brand-primary/10 rounded-full blur-[80px] md:blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-brand-secondary/10 rounded-full blur-[80px] md:blur-[120px]"></div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className={`space-y-6 ${isRTL ? 'md:order-last' : ''} text-center md:text-start flex flex-col items-center md:items-start`}>
             <div className="inline-block px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary text-xs font-bold uppercase tracking-widest">
                 {settings.siteTitle}
               </span>
             </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg mx-auto md:mx-0">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => handleNavClick('pricing')}
                className="bg-brand-primary text-white font-bold px-8 py-4 rounded-full hover:bg-brand-secondary transition-all shadow-lg transform active:scale-95"
              >
                {t.hero.cta}
              </button>
              <button 
                onClick={() => handleNavClick('portfolio')}
                className="border border-slate-700 text-white font-bold px-8 py-4 rounded-full hover:bg-slate-800 transition-all transform active:scale-95"
              >
                {t.nav.portfolio}
              </button>
            </div>
          </div>

          <div className="flex justify-center relative mt-8 md:mt-0 order-first md:order-none">
             {/* Circular Hero Image Container */}
             <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[500px] md:h-[500px] group flex items-center justify-center">
                {/* Glow behind the circle */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-full opacity-20 blur-3xl animate-pulse group-hover:scale-110 transition-transform duration-1000"></div>
                
                {/* Rotating orbits */}
                <div className="absolute inset-0 border border-slate-800 rounded-full scale-105 opacity-30 animate-spin-slow"></div>
                <div className="absolute inset-4 border border-slate-700 rounded-full scale-95 opacity-20 animate-spin-slow-reverse"></div>

                {/* Main Circular Box */}
                <div className="relative z-10 w-4/5 h-4/5 flex items-center justify-center p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-full shadow-2xl overflow-hidden group-hover:border-brand-primary/30 transition-all duration-500">
                   <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                   <img 
                     src={settings.heroImageUrl || LOGO_FALLBACK} 
                     alt="AmA Logo" 
                     className="max-w-[85%] max-h-[85%] object-contain drop-shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-2" 
                     onError={(e) => { (e.target as HTMLImageElement).src = LOGO_FALLBACK; }}
                   />
                </div>
             </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-12 md:py-20 bg-brand-dark relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
              <span className="gradient-text">{t.about.title}</span>
            </h2>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
              {t.about.content}
            </p>
          </div>
        </div>
      </section>

      <Services data={t.services} />
      <Portfolio data={t.portfolio} />
      <Pricing data={t.pricing} contactText={t.nav.contact} />
      <Contact data={t.contact} />

      <footer className="bg-slate-950 py-16 border-t border-slate-900 px-6">
        <div className="container mx-auto flex flex-col items-center text-center">
          {/* Logo Section */}
          <div className="mb-10">
             <img 
               src={settings.logoUrl || LOGO_FALLBACK} 
               className="h-16 md:h-20 w-auto mx-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer" 
               alt="Footer Logo" 
               onClick={() => handleNavClick('home')}
             />
          </div>

          {/* Contact Information - Balanced Vertically and Centered */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 mb-12">
             <a 
               href={`mailto:${settings.contactEmail}`} 
               className="group flex flex-col items-center gap-2 text-slate-400 hover:text-brand-primary transition-all"
             >
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-brand-primary/50 group-hover:bg-brand-primary/5 transition-all">
                   <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium tracking-wide">{settings.contactEmail}</span>
             </a>
             
             <div className="flex flex-col items-center gap-2 text-slate-400 group">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-brand-secondary/50 transition-all">
                   <MapPin className="w-5 h-5 text-brand-secondary" />
                </div>
                <span className="text-sm font-medium tracking-wide">{settings.location}</span>
             </div>
          </div>

          {/* Divider */}
          <div className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-10"></div>

          {/* Bottom Row: Copyright & Subtle Admin Link */}
          <div className="flex flex-col items-center">
             <p className="text-slate-600 text-[10px] md:text-xs tracking-widest uppercase flex items-center gap-2">
               &copy; {new Date().getFullYear()} <span className="text-slate-400 font-bold">{settings.siteTitle}</span>. {t.footer.rights}
               
               {/* Tiny Stealth Admin Access */}
               <button 
                 onClick={onViewAdmin} 
                 className="opacity-[0.05] hover:opacity-100 transition-all duration-500 cursor-default p-1"
                 aria-hidden="true"
               >
                 <Lock className="w-2.5 h-2.5" />
               </button>
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'public' | 'login' | 'admin'>('public');

  return (
    <ContentProvider>
      {view === 'public' && <PublicApp onViewAdmin={() => setView('login')} />}
      {view === 'login' && <Login onLogin={() => setView('admin')} onCancel={() => setView('public')} />}
      {view === 'admin' && <Dashboard onLogout={() => setView('public')} onViewSite={() => setView('public')} />}
    </ContentProvider>
  );
}

export default App;