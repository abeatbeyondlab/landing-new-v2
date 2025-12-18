import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const Objections: React.FC = () => {
  const t = useTranslations('objections');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const keys = ['item1', 'item2', 'item3'] as const;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 mb-4">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">{t('title')}</h2>
        </div>

        <div className="space-y-4">
          {keys.map((key, index) => (
            <div 
              key={key} 
              className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-bold text-slate-800">{t(`items.${key}.q`)}</span>
                {openIndex === index ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-slate-400" />}
              </button>
              {openIndex === index && (
                <div id={`faq-answer-${index}`} className="px-6 pb-4 animate-in fade-in slide-in-from-top-2">
                  <p className="text-slate-600 border-l-2 border-blue-500 pl-4">{t(`items.${key}.a`)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};