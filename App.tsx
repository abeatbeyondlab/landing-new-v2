import React from 'react';
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
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
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
