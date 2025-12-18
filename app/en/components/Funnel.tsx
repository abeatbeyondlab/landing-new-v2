import React from 'react';
import { useTranslations } from 'next-intl';

export const Funnel: React.FC = () => {
  const t = useTranslations('funnel');

  const steps = [
    { id: 'step1', number: 1, circleClass: 'bg-blue-100 text-blue-800' },
    { id: 'step2', number: 2, circleClass: 'bg-emerald-100 text-emerald-800' },
    { id: 'step3', number: 3, circleClass: 'bg-purple-100 text-purple-800' },
    { id: 'step4', number: 4, circleClass: 'bg-orange-100 text-orange-800' },
  ];

  return (
    <section id="method" className="py-20 bg-white text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6"
              dangerouslySetInnerHTML={{ __html: t.raw('title') }}
          />
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-20">
          
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl shadow-sm ${step.circleClass}`}>
                  {step.number}
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  {t(`steps.${step.id}.title`)}
                </h3>
                <div 
                  className="prose prose-lg text-slate-600 space-y-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t.raw(`steps.${step.id}.content`) }}
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};