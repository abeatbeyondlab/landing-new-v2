import React from 'react';
import { AlertTriangle, Anchor, Compass, Wind } from 'lucide-react';
import { PainPoint } from '../../../types';

const points: PainPoint[] = [
  {
    id: 1,
    title: "Disconnected Systems",
    problem: "A crew rowing in different directions. Software that doesn't communicate creates chaos on board.",
    solution: "Total Integration. All systems work in unison for maximum speed."
  },
  {
    id: 2,
    title: "Strategic Fog",
    problem: "Navigating without instruments. Decisions based on instinct because clear data is missing.",
    solution: "Business Intelligence. An always-active radar to see obstacles and opportunities."
  },
  {
    id: 3,
    title: "Technological Ballast",
    problem: "Manual and slow processes that weigh down the hull and make you lose the race against competitors.",
    solution: "Automation and Cloud. We lighten the ship to make it agile and responsive."
  },
  {
    id: 4,
    title: "Security Breaches",
    problem: "The risk of Cyber attacks is like a hole in the hull: silent but lethal.",
    solution: "Cybersecurity ISO 27001. We armor the ship against every external storm."
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
              The Dangers of the Sea
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              What's Slowing Down Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Navigation</span>?
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Even the best Captain cannot win with a ship that takes on water or with the wrong map. We identify the gaps in your IT system and transform them into your strengths.
            </p>
            <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl">
              <p className="font-medium italic">"We don't sell you software. We give you the tools to steer your ship in any weather condition."</p>
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