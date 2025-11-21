import React from 'react';
import { Map, Wrench, Ship, ChevronRight } from 'lucide-react';

export const Process: React.FC = () => {
  return (
    <section id="metodo" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            La nostra <span className="text-blue-600">Rotta</span> verso il successo
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Non ti lasciamo in balia delle onde. Abbiamo un metodo collaudato per portarti dal porto sicuro al mare aperto del mercato globale.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          
          {/* Animated Progress Line (static for now but styled to look active) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            
            {/* Step 1 */}
            <div className="group relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-lg border-4 border-slate-50 z-10 shadow-lg group-hover:bg-blue-600 transition-colors">1</div>
              
              <div className="mt-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  <Map className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Tracciamo la Rotta</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Analisi dello stato attuale (AS-IS) e definizione degli obiettivi (TO-BE). Capiamo dove sei e dove vuoi arrivare.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative bg-white p-8 rounded-3xl shadow-xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 md:-mt-8">
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg border-4 border-slate-50 z-10 shadow-lg shadow-blue-500/30">2</div>
               
              <div className="mt-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <Wrench className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Armiamo la Nave</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Implementazione tecnica e ingegnerizzazione. Integriamo i sistemi, potenziamo la sicurezza e ottimizziamo i processi.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-lg border-4 border-slate-50 z-10 shadow-lg group-hover:bg-cyan-500 transition-colors">3</div>
              
              <div className="mt-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform">
                  <Ship className="h-7 w-7 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Spieghiamo le Vele</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Go-live e monitoraggio. La tua azienda naviga autonoma, veloce e pronta ad affrontare il mercato globale.
                </p>
              </div>
            </div>

          </div>
          
          <div className="mt-12 text-center md:hidden">
            <div className="inline-flex flex-col items-center animate-bounce text-blue-500">
              <span className="text-xs font-bold uppercase tracking-widest mb-2">Scorri giù</span>
              <ChevronRight className="rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
