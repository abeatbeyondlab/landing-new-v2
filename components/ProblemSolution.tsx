import React from 'react';
import { AlertTriangle, Anchor, Compass, Wind } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const ProblemSolution: React.FC = () => {
  const t = useTranslations('problem_solution');

  const pointsConfig = [
    { key: 'point1', Icon: Anchor },
    { key: 'point2', Icon: Compass },
    { key: 'point3', Icon: Wind },
    { key: 'point4', Icon: AlertTriangle },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
       {/* Background Element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Copy */}
          {/* FIX: Changed 'sticky' to 'lg:sticky' so it only sticks on desktop. Added 'relative' for mobile context. */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32 relative mb-8 lg:mb-0">
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              {t('badge')}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight"
                dangerouslySetInnerHTML={{ __html: t.raw('title') }}
            />
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t('description')}
            </p>
            <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl">
              <p className="font-medium italic">{t('quote')}</p>
            </div>
          </div>

          {/* Right Column: Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {pointsConfig.map(({ key, Icon }) => (
              <div key={key} className="group bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-[100px] transition-colors group-hover:bg-blue-600/10"></div>
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-right max-w-[70%]">
                    {t(`points.${key}.title`)}
                  </h3>
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div className="group/item">
                    <p className="text-slate-500 text-sm italic border-l-2 border-red-200 pl-4 mb-3">"{t(`points.${key}.problem`)}"</p>
                  </div>
                  
                  <div className="h-px w-full bg-slate-100 group-hover:bg-blue-100 transition-colors"></div>

                  <div className="group/item">
                    <p className="text-slate-800 font-medium text-sm pl-4 border-l-2 border-emerald-400">{t(`points.${key}.solution`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
