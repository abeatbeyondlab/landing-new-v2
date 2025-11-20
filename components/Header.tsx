import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

const SailboatLogo = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Water Splash Effect */}
    <path d="M10 85 Q 25 95 40 88 T 70 85 T 95 90" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" className="opacity-60" />
    <path d="M15 90 Q 30 98 45 92 T 75 90" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" className="opacity-40" />
    
    {/* Hull */}
    <path 
      d="M25 75 C 25 75 35 88 60 85 C 85 82 90 70 90 70 L 25 75 Z" 
      fill="#3B82F6" 
      stroke="#1E3A8A" 
      strokeWidth="1"
    />
    
    {/* Mast */}
    <path d="M55 78 L 75 15" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
    
    {/* Main Sail */}
    <path 
      d="M58 75 L 76 18 L 92 65 Q 75 70 58 75 Z" 
      fill="url(#sailGradient)" 
      stroke="#94A3B8" 
      strokeWidth="0.5"
    />
    
    {/* Jib Sail */}
    <path 
      d="M52 73 L 72 20 L 35 65 Q 45 70 52 73 Z" 
      fill="url(#sailGradient)" 
      stroke="#94A3B8" 
      strokeWidth="0.5"
    />

    {/* Italian Flag */}
    <g transform="translate(74, 12) rotate(15)">
      <rect x="0" y="0" width="3" height="6" fill="#16A34A" />
      <rect x="3" y="0" width="3" height="6" fill="#FFFFFF" />
      <rect x="6" y="0" width="3" height="6" fill="#DC2626" />
    </g>

    {/* Gradients */}
    <defs>
      <linearGradient id="sailGradient" x1="50" y1="0" x2="80" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F8FAFC" />
        <stop offset="1" stopColor="#E2E8F0" />
      </linearGradient>
    </defs>
  </svg>
);

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-brand-dark/80 backdrop-blur-lg border-b border-white/10 py-3 shadow-2xl' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Area */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => scrollToSection('hero')}
        >
          {/* Logo Container */}
          <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
             <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <SailboatLogo className="w-full h-full drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-display font-black tracking-tight text-white leading-none">
              A Beat Beyond
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/10 backdrop-blur-sm">
          {['Metodo', 'Servizi', 'Chi Siamo'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
           <Button 
            variant="glow" 
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2 text-sm !rounded-lg"
          >
            Prenota Consulenza
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-dark border-b border-slate-800 p-6 flex flex-col gap-4 lg:hidden animate-in slide-in-from-top-5 shadow-2xl">
          {['Metodo', 'Servizi', 'Chi Siamo'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-left text-lg text-slate-300 font-medium py-3 border-b border-slate-800 hover:text-cyan-400 transition-colors"
            >
              {item}
            </button>
          ))}
          <Button onClick={() => scrollToSection('contact')} variant="glow" fullWidth className="mt-4">
            Prenota Consulenza Gratuita
          </Button>
        </div>
      )}
    </header>
  );
};