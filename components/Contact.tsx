import React, { useState } from 'react';
import { Button } from './Button';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      challenge: formData.get('challenge') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/v1/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to submit form';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Google Ads Conversion Tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-17763341638/Ch8YCLu44McbEMaqnJZC',
          'value': 1.0,
          'currency': 'EUR'
        });
      }

      setFormStatus('success');
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      setFormStatus('error');
    }
  };

  if (formStatus === 'success') {
    return (
      <section id="contact" className="py-24 bg-brand-dark flex items-center justify-center min-h-[600px]">
        <div className="max-w-lg w-full mx-4 text-center text-white p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-slide-up">
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-emerald-400" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-4">Messaggio in Bottiglia Inviato!</h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Hai fatto la mossa giusta. Il nostro team ti contatterà entro 24 ore.
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
                  Hai visto come un approccio ingegnerizzato all'IT può fare la differenza per la tua PMI. 
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
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Nome e Cognome</label>
                  <input 
                    id="name"
                    name="name"
                    type="text" 
                    required 
                    className="w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-blue-600 outline-none transition-colors font-medium text-slate-900 placeholder-slate-500"
                    placeholder="Comandante Rossi"
                  />
                </div>
                <div className="group">
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Telefono</label>
                  <input 
                    id="phone"
                    name="phone"
                    type="tel" 
                    required 
                    className="w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-blue-600 outline-none transition-colors font-medium text-slate-900 placeholder-slate-500"
                    placeholder="+39 333 ..."
                  />
                </div>
              </div>
              
              <div className="group">
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Email Aziendale</label>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  required 
                  className="w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-blue-600 outline-none transition-colors font-medium text-slate-900 placeholder-slate-500"
                  placeholder="mario@azienda.it"
                />
              </div>

              <div className="group">
                <label htmlFor="challenge" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">La tua sfida principale</label>
                <select id="challenge" name="challenge" className="w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-blue-600 outline-none transition-colors font-medium text-slate-900 cursor-pointer">
                  <option>Voglio aumentare l'efficienza (Velocità)</option>
                  <option>Ho problemi di sicurezza (Falle)</option>
                  <option>I sistemi non comunicano (Equipaggio)</option>
                  <option>Altro</option>
                </select>
              </div>

              <div className="group">
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Richiesta</label>
                <textarea 
                  id="message"
                  name="message"
                  required 
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-blue-600 outline-none transition-colors font-medium text-slate-900 placeholder-slate-500 resize-none"
                  placeholder="Descrivi brevemente la tua richiesta o il tuo progetto..."
                />
              </div>

              {formStatus === 'error' && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-800">{errorMessage}</p>
                </div>
              )}

              <div className="pt-4">
                <Button fullWidth variant="primary" disabled={formStatus === 'submitting'} className="!py-4 text-lg shadow-xl">
                  {formStatus === 'submitting' ? 'Invio in corso...' : (
                    <span className="flex items-center gap-2">
                      Richiedi Analisi Gratuita <Send size={18} />
                    </span>
                  )}
                </Button>
                <p className="text-center text-xs text-slate-600 mt-4">
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
