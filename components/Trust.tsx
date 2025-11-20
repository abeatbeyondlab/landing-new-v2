import React from 'react';

export const Trust: React.FC = () => {
  return (
    <section className="py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="text-center md:text-left md:w-1/3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            Fiducia costruita con
          </p>
          <p className="text-slate-900 font-semibold">
            Leader di settore ed Eccellenze Italiane
          </p>
        </div>
        
        <div className="md:w-2/3 flex flex-wrap justify-center md:justify-end items-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Stylized Logos */}
          <div className="text-2xl font-serif italic font-bold text-slate-800 hover:text-black cursor-default">Lamborghini</div>
          <div className="text-2xl font-bold tracking-tighter text-slate-800 hover:text-blue-600 cursor-default">bi-rex</div>
          <div className="text-xl font-bold text-slate-800 hover:text-slate-900 cursor-default">PMOStudio</div>
          <div className="text-2xl font-black text-slate-800 hover:text-slate-900 cursor-default">ZE<span className="font-light">FORM</span></div>
        </div>

      </div>
    </section>
  );
};