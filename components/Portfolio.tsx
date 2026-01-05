/**
 * مكون معرض الأعمال؛ يعرض المشاريع السابقة للوكالة مع الصور، التصنيفات، 
 * والعناوين بشكل جذاب مع إمكانية الضغط للانتقال لموقع العميل.
 */
import React from 'react';
import { TranslationData } from '../types';
import { ExternalLink } from 'lucide-react';

interface PortfolioProps {
  data: TranslationData['portfolio'];
}

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
  return (
    <section id="portfolio" className="py-12 md:py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-white">
          <span className="gradient-text">{data.title}</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, index) => {
            const ItemContent = (
              <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-2xl border border-slate-800 transition-all duration-500 hover:border-brand-primary/50 bg-slate-900">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay with info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em]">
                        {item.category}
                      </span>
                      {item.link && item.link !== '#' && (
                        <ExternalLink className="w-4 h-4 text-white/50" />
                      )}
                    </div>
                    <h3 className="text-white text-xl md:text-2xl font-extrabold tracking-tight">{item.title}</h3>
                  </div>
                </div>
                
                <div className="absolute inset-0 border-[0px] group-hover:border-[1px] border-white/10 transition-all duration-500 rounded-2xl pointer-events-none"></div>
              </div>
            );

            return item.link && item.link !== '#' ? (
              <a 
                key={index} 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block transform transition-transform hover:-translate-y-2"
              >
                {ItemContent}
              </a>
            ) : (
              <div key={index} className="transform transition-transform">
                {ItemContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;