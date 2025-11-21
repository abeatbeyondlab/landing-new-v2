'use client'

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Trust } from './components/Trust';
import { Funnel } from './components/Funnel';
import { ProblemSolution } from './components/ProblemSolution';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Results } from './components/Results';
import { Objections } from './components/Objections';
import { Contact } from './components/Contact';
import { JsonLd, organizationSchema, websiteSchema } from './components/JsonLd';

const Footer = dynamic(() => import('./components/Footer').then(mod => mod.Footer), {
  loading: () => <div className="bg-slate-900 border-t border-slate-800 pt-16 pb-12 text-slate-400 text-sm"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">Loading...</div></div>
});

const App: React.FC = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <Header />
      
      <main>
        <Hero />
        <Funnel />
        <ProblemSolution />
        <Services />
        <Process />
        <Results />
        <Trust />
        <Objections />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
