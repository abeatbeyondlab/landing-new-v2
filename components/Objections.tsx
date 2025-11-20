import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "Ho paura che un progetto personalizzato sia troppo costoso.",
    a: "Il vero costo è l'inefficienza. Le nostre soluzioni sono investimenti mirati al ROI. Spesso, automatizzando un singolo processo manuale, il progetto si ripaga da solo in pochi mesi."
  },
  {
    q: "Temo che l'implementazione sia complessa e blocchi il lavoro.",
    a: "Siamo ingegneri, non improvvisatori. Pianifichiamo migrazioni graduali e testate per garantire la continuità operativa (Business Continuity). Non te ne accorgerai nemmeno."
  },
  {
    q: "Siete adatti a una piccola azienda?",
    a: "Assolutamente. Il nostro metodo 'Engineered' è scalabile. Portiamo la qualità enterprise alla portata delle PMI, tagliando il superfluo."
  }
];

export const Objections: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 mb-4">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Dubbi? Parliamone.</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-slate-800">{faq.q}</span>
                {openIndex === index ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-slate-400" />}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 animate-in fade-in slide-in-from-top-2">
                  <p className="text-slate-600 border-l-2 border-blue-500 pl-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};