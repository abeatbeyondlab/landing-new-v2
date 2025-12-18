import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "I'm afraid a custom project will be too expensive.",
    a: "The real cost is inefficiency. Our solutions are ROI-focused investments. Often, by automizing a single manual process, the project pays for itself in a few months."
  },
  {
    q: "I fear the implementation will be complex and block work.",
    a: "We are engineers, not improvisers. We plan gradual and tested migrations to ensure operational continuity (Business Continuity). You won't even notice."
  },
  {
    q: "Are you suitable for a small company?",
    a: "Absolutely. Our 'Engineered' method is scalable. We bring enterprise quality within reach of SMEs, cutting the superfluous."
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
          <h2 className="text-3xl font-extrabold text-slate-900">Doubts? Let's talk.</h2>
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
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-bold text-slate-800">{faq.q}</span>
                {openIndex === index ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-slate-400" />}
              </button>
              {openIndex === index && (
                <div id={`faq-answer-${index}`} className="px-6 pb-4 animate-in fade-in slide-in-from-top-2">
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