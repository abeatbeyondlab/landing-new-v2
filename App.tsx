import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Trust } from './components/Trust';
import { ProblemSolution } from './components/ProblemSolution';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Objections } from './components/Objections';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      <main>
        <Hero />
        <Trust />
        <ProblemSolution />
        <Services />
        <Process />
        <Objections />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;