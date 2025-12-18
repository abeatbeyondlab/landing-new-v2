import React from 'react';
import { TrendingUp, ShieldCheck, BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const Results: React.FC = () => {
  const t = useTranslations('results');

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            {t('badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6"
              dangerouslySetInnerHTML={{ __html: t.raw('title') }}
          />
          <p className="text-lg text-slate-600">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Case Study 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[80px] transition-all group-hover:bg-blue-100"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <TrendingUp size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t('cases.case1.sector')}
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-6 uppercase tracking-wide">
                {t('cases.case1.area')}
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">{t('labels.challenge')}</span>
                  <p className="text-slate-600 text-sm">
                    {t('cases.case1.challenge')}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                   <span className="text-xs font-bold text-emerald-700 block mb-1">{t('labels.result')}</span>
                   <p className="text-slate-900 font-bold text-lg">
                     {t('cases.case1.resultValue')}
                   </p>
                   <p className="text-slate-500 text-sm mt-1">
                     {t('cases.case1.resultDesc')}
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-[80px] transition-all group-hover:bg-purple-100"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <BarChart3 size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t('cases.case2.sector')}
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-6 uppercase tracking-wide">
                {t('cases.case2.area')}
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">{t('labels.challenge')}</span>
                  <p className="text-slate-600 text-sm">
                    {t('cases.case2.challenge')}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                   <span className="text-xs font-bold text-emerald-700 block mb-1">{t('labels.result')}</span>
                   <p className="text-slate-900 font-bold text-lg">
                     {t('cases.case2.resultValue')}
                   </p>
                   <p className="text-slate-500 text-sm mt-1">
                     {t('cases.case2.resultDesc')}
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-[80px] transition-all group-hover:bg-orange-100"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <ShieldCheck size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t('cases.case3.sector')}
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-6 uppercase tracking-wide">
                {t('cases.case3.area')}
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">{t('labels.challenge')}</span>
                  <p className="text-slate-600 text-sm">
                    {t('cases.case3.challenge')}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                   <span className="text-xs font-bold text-emerald-700 block mb-1">{t('labels.result')}</span>
                   <p className="text-slate-900 font-bold text-lg">
                     {t('cases.case3.resultValue')}
                   </p>
                   <p className="text-slate-500 text-sm mt-1">
                     {t('cases.case3.resultDesc')}
                   </p>
                </div>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
};
