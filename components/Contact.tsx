import React, { useState } from 'react';
import { Button } from './Button';
import { Send, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  if (formStatus === 'success') {
    return (
      <section id="contact" className="py-24 bg-brand-dark flex items-center justify-center min-h-[600px]">
        <div className="max-w-lg w-full mx-4 text-center text-white p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-slide-up">
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-emerald-400" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-4">Messaggio in Bottiglia Ricevuto!</h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Hai fatto la mossa giusta. Il nostro team analizzerà la tua rotta attuale e ti contatterà entro 24 ore.
          </p>
          <Button variant="outline" onClick={() => setFormStatus('idle')}>Torna alla Home</Button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-brand-dark relative overflow-hidden">
      {/* Advanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-blue-950 to-slate-900"></div>
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side: Value Prop */}
          {/* FIX: Reduced padding on mobile from p-10 to p-6 */}
          <div className="lg:w-5/12 p-6 md:p-10 lg:p-16 bg-gradient-to-b from-blue-600/20 to-transparent flex flex-col justify-between relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
            
            <div>
              <h3 className="text-3xl font-display font-bold text-white mb-6">
                Fai il Primo Passo <span className="text-cyan-400">Ora</span>.
              </h3>
              
              <div className="text-blue-100 text-lg mb-8 leading-relaxed space-y-4">
                <p className="font-semibold text-white">Non Rimandare la Crescita.</p>
                <p>
                  Hai visto come un approccio ingegneristico all'IT può fare la differenza per la tua PMI. 
                  Ora è il momento di agire. 
                  Trasforma le sfide tecnologiche in opportunità concrete.
                </p>
              </div>

              <div className="mb-6">
                <p className="text-white font-bold text-lg mb-2 leading-tight">
                  Richiedi Ora la Tua Consulenza Strategica Gratuita di 30 Minuti!
                </p>
                <p className="text-blue-100">
                  Scopri senza impegno come possiamo aiutarti a:
                </p>
              </div>
              
              <ul className="space-y-3">
                {[
                  "Aumentare l'efficienza operativa",
                  "Prendere decisioni migliori con la Business Intelligence",
                  "Integrare i tuoi sistemi software",
                  "Rafforzare la tua Cybersecurity",
                  "Sfruttare le nuove tecnologie (Cloud, AI, Web3...)"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-white group">
                    <div className="mt-1 mr-3 min-w-[20px]">
                      <CheckCircle size={18} className="text-emerald-400" />
                    </div>
                    <span className="opacity-90 text-sm md:text-base">{item}.</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
               <p className="text-sm text-slate-400 italic">
                 "Non esiste vento favorevole per il marinaio che non sa dove andare. Noi ti diamo la mappa."
               </p>
            </div>
          </div>

          {/* Right Side: Form */}
          {/* FIX: Reduced padding on mobile from p-10 to p-6 */}
          <div className="lg:w-7/12 p-6 md:p-10 lg:p-16 bg-white">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Prenota la tua Consulenza Strategica</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Nome e Cognome</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-blue-600 outline-none transition-colors font-medium text-slate-900 placeholder-slate-400"
                    placeholder="Comandante Rossi"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Telefono</label>
                  <input 
                    type="tel" 
                    required 
                    className="w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-blue-600 outline-none transition-colors font-medium text-slate-900 placeholder-slate-400"
                    placeholder="+39 333 ..."
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Email Aziendale</label>
                <input 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-blue-600 outline-none transition-colors font-medium text-slate-900 placeholder-slate-400"
                  placeholder="mario@azienda.it"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">La tua sfida principale</label>
                <select className="w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-blue-600 outline-none transition-colors font-medium text-slate-900 cursor-pointer">
                  <option>Voglio aumentare l'efficienza (Velocità)</option>
                  <option>Ho problemi di sicurezza (Falle)</option>
                  <option>I sistemi non comunicano (Equipaggio)</option>
                  <option>Altro</option>
                </select>
              </div>

              <div className="pt-4">
                <Button fullWidth variant="primary" disabled={formStatus === 'submitting'} className="!py-4 text-lg shadow-xl">
                  {formStatus === 'submitting' ? 'Invio in corso...' : (
                    <span className="flex items-center gap-2">
                      Richiedi Analisi Gratuita <Send size={18} />
                    </span>
                  )}
                </Button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  Nessun impegno. I tuoi dati sono al sicuro.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
