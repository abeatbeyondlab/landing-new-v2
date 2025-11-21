import React from 'react';
import { TrendingUp, ShieldCheck, BarChart3 } from 'lucide-react';

export const Results: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Expertise Comprovata
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
            Non Solo Parole: <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Risultati Misurabili</span>
          </h2>
          <p className="text-lg text-slate-600">
            I nostri metodi sono stati applicati con successo in contesti ad alta complessità. Ecco come trasformiamo le sfide in vantaggio competitivo.
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
                Settore Automotive
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-6 uppercase tracking-wide">
                Ottimizzazione Produzione
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-1">LA SFIDA</span>
                  <p className="text-slate-600 text-sm">
                    Sistemi di produzione non allineati con il gestionale, causando ritardi nell'approvvigionamento.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                   <span className="text-xs font-bold text-emerald-600 block mb-1">IL RISULTATO</span>
                   <p className="text-slate-900 font-bold text-lg">
                     +25% Efficienza Operativa
                   </p>
                   <p className="text-slate-500 text-sm mt-1">
                     Riduzione tempi morti e tracciabilità totale.
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
                Manifattura & Logistica
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-6 uppercase tracking-wide">
                Business Intelligence
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-1">LA SFIDA</span>
                  <p className="text-slate-600 text-sm">
                    Decisioni basate su report mensili obsoleti, navigazione "a vista" della dirigenza.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                   <span className="text-xs font-bold text-emerald-600 block mb-1">IL RISULTATO</span>
                   <p className="text-slate-900 font-bold text-lg">
                     Dashboard Real-Time
                   </p>
                   <p className="text-slate-500 text-sm mt-1">
                     Decisioni strategiche immediate basate su dati certi.
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
                Servizi Finanziari
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-6 uppercase tracking-wide">
                Cybersecurity & Compliance
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-1">LA SFIDA</span>
                  <p className="text-slate-600 text-sm">
                    Necessità di adeguamento ISO 27001 e protezione dati sensibili da attacchi ransomware.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                   <span className="text-xs font-bold text-emerald-600 block mb-1">IL RISULTATO</span>
                   <p className="text-slate-900 font-bold text-lg">
                     Blindatura Totale
                   </p>
                   <p className="text-slate-500 text-sm mt-1">
                     Zero incidenti di sicurezza e ottenimento certificazione.
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
