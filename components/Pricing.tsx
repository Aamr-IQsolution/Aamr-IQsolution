/**
 * مكون الباقات والأسعار؛ يعرض خطط الأسعار لخدمات السوشال ميديا وتطوير المواقع، 
 * مع إبراز الباقات "الأكثر شيوعاً" وتوضيح الميزات لكل باقة.
 */
import React from 'react';
import { TranslationData, PricingTier } from '../types';
import { Check } from 'lucide-react';

interface PricingProps {
  data: TranslationData['pricing'];
  contactText: string;
}

const PricingCard: React.FC<{ tier: PricingTier; contactText: string }> = ({ tier, contactText }) => (
  <div className={`relative p-6 md:p-8 rounded-2xl border ${tier.isPopular ? 'border-brand-primary bg-slate-800/50' : 'border-slate-700 bg-slate-800/20'} flex flex-col h-full transition-all duration-300 hover:border-brand-primary/40`}>
    {tier.isPopular && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max">
        <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
          Popular
        </span>
      </div>
    )}
    <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
    <div className="mb-6">
      <span className="text-3xl md:text-4xl font-bold text-white">{tier.price}</span>
      {tier.price.startsWith('€') && (
        <span className="text-slate-400 text-sm block md:inline md:ml-2">
          {tier.priceSuffix ? ` / ${tier.priceSuffix}` : ' / p.m.'}
        </span>
      )}
    </div>
    <ul className="flex-1 space-y-4 mb-8">
      {tier.features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3 text-slate-300">
          <Check className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
          <span className="text-sm leading-tight">{feature}</span>
        </li>
      ))}
    </ul>
    <a 
      href="#contact" 
      className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 active:scale-95 ${
        tier.isPopular 
          ? 'bg-brand-primary hover:bg-brand-secondary text-white shadow-lg shadow-brand-primary/20' 
          : 'bg-slate-700 hover:bg-slate-600 text-white'
      }`}
    >
      {contactText}
    </a>
  </div>
);

const Pricing: React.FC<PricingProps> = ({ data, contactText }) => {
  return (
    <section id="pricing" className="py-12 md:py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="gradient-text">{data.title}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">{data.subtitle}</p>
        </div>

        <div className="mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-8 text-center border-b border-slate-800 pb-4 inline-block w-full">
            {data.social.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
            {data.social.tiers.map((tier, idx) => (
              <PricingCard key={idx} tier={tier} contactText={contactText} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-8 text-center border-b border-slate-800 pb-4 inline-block w-full">
            {data.web.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {data.web.tiers.map((tier, idx) => (
              <PricingCard key={idx} tier={tier} contactText={contactText} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;