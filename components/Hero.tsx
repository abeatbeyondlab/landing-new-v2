import React from 'react';
import { ArrowRight, CheckCircle2, Compass, Anchor } from 'lucide-react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-brand-dark">
      {/* Abstract Tech Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 mb-8 animate-slide-up backdrop-blur-md hover:bg-blue-500/20 transition-colors cursor-default">
          <span className="relative flex h-2 w-2 mr-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs md:text-sm font-bold tracking-widest uppercase">Digital Transformation Engineered</span>
        </div>

        {/* Main Headline */}
        {/* FIX: Adjusted mobile font size to text-4xl to prevent overflow on small screens */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-black text-white tracking-tight mb-8 leading-[1.1] animate-slide-up" style={{animationDelay: '0.1s'}}>
          Smetti di navigare a vista.<br/>
          <span className="text-gradient relative">
            Riprendi il Timone.
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mb-10 leading-relaxed font-light animate-slide-up" style={{animationDelay: '0.2s'}}>
          Il mercato è in tempesta e la complessità tecnologica rischia di farti affondare. <br className="hidden md:block" />
          Siamo l'Advisor che sale a bordo per trasformare la tua azienda in una nave inaffondabile, veloce e coordinata nell'oceano digitale.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto animate-slide-up" style={{animationDelay: '0.3s'}}>
          <Button variant="glow" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="group w-full sm:w-auto">
            Chiama l'Advisor (30 min Gratis)
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" onClick={() => document.getElementById('metodo')?.scrollIntoView({behavior: 'smooth'})} className="w-full sm:w-auto">
            Scopri la Rotta
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full max-w-4xl flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center gap-3 text-slate-400 font-medium">
            <div className="p-2 bg-white/5 rounded-lg text-emerald-400">
              <Compass size={20} />
            </div>
            <span>Strategia di Navigazione</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 font-medium">
             <div className="p-2 bg-white/5 rounded-lg text-blue-400">
              <CheckCircle2 size={20} />
            </div>
            <span>Sicurezza Certificata</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 font-medium">
             <div className="p-2 bg-white/5 rounded-lg text-purple-400">
              <Anchor size={20} />
            </div>
            <span>Stabilità Operativa</span>
          </div>
        </div>
      </div>
    </section>
  );
};