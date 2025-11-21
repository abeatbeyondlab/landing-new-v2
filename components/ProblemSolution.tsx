import React from 'react';
import { AlertTriangle, Anchor, Compass, Wind } from 'lucide-react';
import { PainPoint } from '../types';

const points: PainPoint[] = [
  {
    id: 1,
    title: "Sistemi Disconnessi",
    problem: "Un equipaggio che rema in direzioni diverse. Software che non si parlano creano caos a bordo.",
    solution: "Integrazione Totale. Tutti i sistemi lavorano all'unisono per la massima velocità."
  },
  {
    id: 2,
    title: "Nebbia Strategica",
    problem: "Navigare senza strumenti. Decisioni basate sull'istinto perché mancano dati chiari.",
    solution: "Business Intelligence. Un radar sempre attivo per vedere ostacoli e opportunità."
  },
  {
    id: 3,
    title: "Zavorra Tecnologica",
    problem: "Processi manuali e lenti che appesantiscono lo scafo e ti fanno perdere gara contro i competitor.",
    solution: "Automazione e Cloud. Alleggeriamo la nave per renderla agile e scattante."
  },
  {
    id: 4,
    title: "Falle di Sicurezza",
    problem: "Il rischio di attacchi Cyber è come una falla nello scafo: silenziosa ma letale.",
    solution: "Cybersecurity ISO 27001. Blindiamo la nave contro ogni tempesta esterna."
  }
];

export const ProblemSolution: React.FC = () => {
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
              Le Insidie del Mare
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Cosa sta rallentando la tua <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Navigazione</span>?
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Anche il miglior Capitano non può vincere con una nave che imbarca acqua o con una mappa sbagliata. Identifichiamo le falle nel tuo sistema informatico e le trasformiamo nei tuoi punti di forza.
            </p>
            <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl">
              <p className="font-medium italic">"Non ti vendiamo software. Ti diamo gli strumenti per governare la tua nave in qualsiasi condizione meteo."</p>
            </div>
          </div>

          {/* Right Column: Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {points.map((point) => (
              <div key={point.id} className="group bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-[100px] transition-colors group-hover:bg-blue-600/10"></div>
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {point.id === 1 ? <Anchor size={24} /> : 
                     point.id === 2 ? <Compass size={24} /> :
                     point.id === 3 ? <Wind size={24} /> : <AlertTriangle size={24} />}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-right max-w-[70%]">{point.title}</h3>
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div className="group/item">
                    <p className="text-slate-500 text-sm italic border-l-2 border-red-200 pl-4 mb-3">"{point.problem}"</p>
                  </div>
                  
                  <div className="h-px w-full bg-slate-100 group-hover:bg-blue-100 transition-colors"></div>

                  <div className="group/item">
                    <p className="text-slate-800 font-medium text-sm pl-4 border-l-2 border-emerald-400">{point.solution}</p>
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
