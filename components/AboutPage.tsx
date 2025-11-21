'use client'

import  { useEffect } from 'react';
import Image from 'next/image';
import { Header } from './Header';
import { Footer } from './Footer';
import { Trust } from './Trust';
import { Results } from './Results';
import { Contact } from './Contact';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-brand-dark text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <Image
              src="/images/chi-siamo-bg.jpg"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 to-brand-dark"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Chi <span className="text-blue-500">Siamo</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Non siamo solo consulenti. Siamo i tuoi partner nella navigazione digitale.
              Costruiamo rotte sicure per il tuo business nel mare dell'innovazione.
            </p>
          </div>
        </section>

      
        
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900">La Nostra Missione</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            In un mondo digitale in continua tempesta, aiutiamo le aziende a mantenere la rotta. Crediamo che la tecnologia debba essere un vento a favore, non un ostacolo.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Il nostro equipaggio è composto da esperti che uniscono competenza tecnica e visione strategica, pronti a salire a bordo della tua nave per portarla verso nuovi orizzonti.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden shadow-xl border border-slate-100 flex items-center justify-center relative group">
                            
                            {/* Subtle Overlay Texture */}
                            <div className="absolute inset-0 bg-[url('/images/cubes.png')] opacity-[0.03]"></div>

                            <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="gradLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                                        <stop offset="20%" stopColor="#3B82F6" />
                                        <stop offset="80%" stopColor="#06B6D4" />
                                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Bathymetry / Depth Contours */}
                                <g fill="#E0F2FE" stroke="none" opacity="0.4">
                                     {/* Shallow area around start point (bottom left) */}
                                     <path d="M -10 310 L -10 150 Q 50 130 100 160 T 150 250 L 150 310 Z" />
                                     
                                     {/* Shallow area around destination (top right) */}
                                     <path d="M 410 -10 L 410 150 Q 350 180 300 120 T 280 20 L 280 -10 Z" />
                                </g>
                                
                                {/* Depth Lines (Isobaths) - Typical of marine charts */}
                                <g fill="none" stroke="#38BDF8" strokeWidth="0.5" opacity="0.5" strokeDasharray="3 2">
                                     <path d="M -10 130 Q 60 110 120 150 T 170 260 L 170 310" />
                                     <path d="M 410 170 Q 330 200 270 130 T 250 0" />
                                </g>

                                {/* Grid Lines - Lattitude/Longitude style */}
                                <g stroke="#94A3B8" strokeWidth="0.5" strokeOpacity="0.2">
                                    <line x1="100" y1="0" x2="100" y2="300" />
                                    <line x1="200" y1="0" x2="200" y2="300" />
                                    <line x1="300" y1="0" x2="300" y2="300" />
                                    <line x1="0" y1="100" x2="400" y2="100" />
                                    <line x1="0" y1="200" x2="400" y2="200" />
                                </g>

                                {/* Land Masses (Islands) - Filled shapes instead of just lines */}
                                <g>
                                    {/* Destination Island (Top Right) */}
                                    <path d="M340 60 Q 360 40 380 70 T 350 100 Q 330 80 340 60 Z" 
                                          fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
                                    {/* Terrain feature */}
                                    <path d="M345 65 Q 360 50 370 70" fill="none" stroke="#CBD5E1" strokeWidth="0.5" />
                                    
                                    {/* Starting Island (Bottom Left) */}
                                    <path d="M50 200 Q 80 180 100 210 T 70 240 Q 40 230 50 200 Z" 
                                          fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
                                     {/* Terrain feature */}
                                     <path d="M55 205 Q 75 190 90 210" fill="none" stroke="#CBD5E1" strokeWidth="0.5" />
                                </g>

                                {/* Soundings (Depth Numbers) - scattered */}
                                <g fill="#64748B" fontSize="8" fontFamily="monospace" opacity="0.4" style={{userSelect: 'none'}}>
                                    <text x="150" y="200">45</text>
                                    <text x="250" y="100">120</text>
                                    <text x="180" y="250">32</text> 
                                    <text x="50" y="150">15</text>
                                    <text x="350" y="150">22</text>
                                    <text x="280" y="50">18</text>
                                </g>

                                {/* Destination Marker */}
                                <g transform="translate(300, 80)">
                                    <circle cx="0" cy="0" r="4" fill="#06B6D4" className="animate-pulse" />
                                    <circle cx="0" cy="0" r="12" stroke="#06B6D4" strokeWidth="1" fill="none" opacity="0.5" />
                                    <circle cx="0" cy="0" r="20" stroke="#06B6D4" strokeWidth="0.5" fill="none" opacity="0.2" />
                                </g>

                                {/* Navigation Path */}
                                <path 
                                    d="M80 210 C 140 190, 180 140, 300 80" 
                                    stroke="url(#gradLine)" 
                                    strokeWidth="2" 
                                    fill="none" 
                                    strokeDasharray="4 4"
                                    strokeLinecap="round"
                                    className="animate-[dash_20s_linear_infinite]"
                                />
                                <style>{`
                                    @keyframes dash {
                                        to {
                                            stroke-dashoffset: -100;
                                        }
                                    }
                                `}</style>

                                {/* Boat */}
                                <g transform="translate(65, 200) rotate(-15)">
                                    {/* Main Sail */}
                                    <path d="M10 0 L 35 -40 L 35 0 Z" fill="#2563EB" opacity="0.9" />
                                    {/* Jib Sail */}
                                    <path d="M0 0 L 25 -30 L 25 0 Z" fill="#60A5FA" opacity="0.8" />
                                    {/* Hull */}
                                    <path d="M0 5 L 40 5 L 35 15 H 10 Z" fill="#1E40AF" />
                                    
                                    {/* Reflection/Wake */}
                                    <path d="M5 18 L 35 18" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
                                    <path d="M10 22 L 30 22" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" />
                                </g>

                                {/* Compass Rose (Enhanced) */}
                                <g transform="translate(340, 240) scale(0.75)" opacity="0.7">
                                    {/* Outer Ring */}
                                    <circle cx="0" cy="0" r="35" stroke="#94A3B8" strokeWidth="1" fill="whitesmoke" strokeDasharray="1 4" />
                                    <circle cx="0" cy="0" r="38" stroke="#94A3B8" strokeWidth="0.5" fill="none" opacity="0.5" />
                                    
                                    {/* Main Star */}
                                    <path d="M0 -30 L 6 -6 L 30 0 L 6 6 L 0 30 L -6 6 L -30 0 L -6 -6 Z" fill="#F8FAFC" stroke="#64748B" strokeWidth="1" />
                                    
                                    {/* Inner Shading */}
                                    <path d="M0 -30 L 6 -6 L 0 0 Z" fill="#94A3B8" opacity="0.8" />
                                    <path d="M30 0 L 6 6 L 0 0 Z" fill="#94A3B8" opacity="0.8" />
                                    <path d="M0 30 L -6 6 L 0 0 Z" fill="#94A3B8" opacity="0.8" />
                                    <path d="M-30 0 L -6 -6 L 0 0 Z" fill="#94A3B8" opacity="0.8" />

                                    {/* Center decorative dot */}
                                    <circle cx="0" cy="0" r="2" fill="#2563EB" />
                                    
                                    {/* Labels */}
                                    <text x="-3" y="-42" fontSize="10" fontFamily="Serif" fontWeight="bold" fill="#475569">N</text>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Trust />
        <Results />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};
