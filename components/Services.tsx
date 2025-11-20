import React from 'react';
import { ShieldCheck, BarChart3, Cog, Layers, Code2, BookOpen, Users, Layout, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "Advisor e Strategia IT",
    description: "Il tuo Ufficiale di Rotta. Definiamo la direzione tecnologica per raggiungere i tuoi obiettivi di business.",
    icon: Users
  },
  {
    title: "Architetture IT",
    description: "Lo Scafo della nave. Progettiamo infrastrutture robuste e scalabili per affrontare ogni mare.",
    icon: Layout
  },
  {
    title: "Integrazione Sistemi",
    description: "Sincronia dell'equipaggio. ERP, CRM e MES dialogano perfettamente per eliminare errori e ritardi.",
    icon: Layers
  },
  {
    title: "Cybersecurity",
    description: "Scudo contro le tempeste. Protezione dati e conformità ISO 27001 per navigare sicuri.",
    icon: ShieldCheck
  },
  {
    title: "Business Intelligence",
    description: "Il Radar di bordo. Trasformiamo i dati in una visione chiara per evitare scogli e cogliere opportunità.",
    icon: BarChart3
  },
  {
    title: "Open Source",
    description: "Libertà di manovra. Riduciamo la dipendenza da fornitori esterni (Vendor Lock-in) e tagliamo i costi.",
    icon: Code2
  },
  {
    title: "Project Management",
    description: "Il Capitano in seconda. Gestiamo i progetti complessi garantendo tempi, costi e risultati.",
    icon: Cog
  },
  {
    title: "Formazione",
    description: "Addestramento equipaggio. Trasferiamo competenze al tuo team per rendervi autonomi.",
    icon: BookOpen
  }
];

export const Services: React.FC = () => {
  return (
    <section id="servizi" className="py-24 bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative blurred gradient background */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm text-cyan-400 font-bold tracking-[0.2em] uppercase mb-3">L'Arsenale Tecnologico</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Strumenti d'avanguardia per la tua <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Impresa</span>
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-slate-400 mx-auto">
            Ogni componente del nostro intervento è pensato per un solo scopo: far viaggiare la tua azienda più veloce e più sicura delle altre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-blue-500/50 hover:to-cyan-400/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              
              <div className="relative h-full bg-slate-900/90 backdrop-blur-xl p-6 rounded-xl overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
                  <ArrowUpRight className="text-white/50 w-5 h-5" />
                </div>

                <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="h-6 w-6 text-blue-400 group-hover:text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};