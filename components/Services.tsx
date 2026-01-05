/**
 * مكون قسم الخدمات؛ يقوم بعرض الخدمات التي تقدمها الوكالة في شكل شبكة (Grid) 
 * مع أيقونات ديناميكية مستمدة من مكتبة lucide-react.
 */
import React from 'react';
import { TranslationData } from '../types';
import * as Icons from 'lucide-react';

interface ServicesProps {
  data: TranslationData['services'];
}

const Services: React.FC<ServicesProps> = ({ data }) => {
  return (
    <section id="services" className="py-12 md:py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-white">
          <span className="gradient-text">{data.title}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.items.map((item, index) => {
            // Dynamically resolve icon from string name
            const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;
            
            return (
              <div 
                key={index} 
                className="bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-700 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 group"
              >
                <div className="w-14 h-14 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-brand-primary group-hover:text-brand-secondary transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;