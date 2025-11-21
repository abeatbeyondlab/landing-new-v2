'use client';
import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Services } from './Services';
import { Process } from './Process';
import { Trust } from './Trust';
import { Objections } from './Objections';
import { Contact } from './Contact';
import { servicesData } from '../data/services';
import { ArrowLeft } from 'lucide-react';

interface ServicePageProps {
  slug: string;
}

export const ServicePage: React.FC<ServicePageProps> = ({ slug }) => {
  const service = servicesData.find(s => s.slug === slug);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) return <div>Service not found</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Header />
      
      <main>
        {/* Hero Section for Service */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Decorative backgrounds */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-8">
              <a href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-6 text-sm font-medium group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Torna alla Home
              </a>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
              <div className="lg:w-1/3">
                <div className="sticky top-32">
                  <div className="bg-blue-500/10 p-6 rounded-2xl inline-block mb-6 border border-blue-500/20">
                    <service.icon className="w-16 h-16 text-blue-400" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                    {service.title}
                  </h1>
                  <p className="text-xl text-slate-300 leading-relaxed border-l-2 border-blue-500/50 pl-6">
                    {service.description}
                  </p>
                  <div className="mt-8">
                    <a 
                      href="#contact" 
                      className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                    >
                      Richiedi Consulenza
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3">
                {/* Service Content */}
                <div>
                  {service.fullContent}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-slate-900">
          <Services />
        </div>
        <Process />
        <Trust />
        <Objections />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};
