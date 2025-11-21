import React from 'react';
import LogoIcon from './LogoIcon'


const SailboatLogoV2 = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="sailGradV2" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F8FAFC" />
        <stop offset="1" stopColor="#CBD5E1" />
      </linearGradient>
      <linearGradient id="waterGrad" x1="0" y1="150" x2="200" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2DD4BF" stopOpacity="0.8" />
        <stop offset="1" stopColor="#3B82F6" stopOpacity="0.8" />
      </linearGradient>
    </defs>

    {/* Dynamic Water/Waves - More splashy for V2 */}
    <path d="M20 160 Q 60 150 90 165 T 160 160 T 220 170" stroke="url(#waterGrad)" strokeWidth="4" strokeLinecap="round" className="opacity-80" />
    <path d="M0 170 Q 50 165 100 175 T 190 165" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" className="opacity-60" />
    <path d="M40 155 Q 80 145 120 160" stroke="white" strokeWidth="2" strokeLinecap="round" className="opacity-40" />

    {/* Group for the Boat - Tilted for action */}
    <g transform="rotate(-5, 100, 100)">
      {/* Hull */}
      <path 
        d="M60 145 C 60 145 75 165 120 160 C 155 155 165 135 165 135 L 60 145 Z" 
        fill="#1E3A8A" 
        stroke="#172554" 
        strokeWidth="1.5"
      />
      
      {/* Mast */}
      <path d="M115 148 L 145 30" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Main Sail - Billowing */}
      <path 
        d="M118 145 L 146 32 L 175 125 Q 145 135 118 145 Z" 
        fill="url(#sailGradV2)" 
        stroke="#94A3B8" 
        strokeWidth="0.5"
      />
      
      {/* Jib Sail - Billowing */}
      <path 
        d="M110 142 L 142 35 L 75 125 Q 95 135 110 142 Z" 
        fill="url(#sailGradV2)" 
        stroke="#94A3B8" 
        strokeWidth="0.5"
      />

      {/* Italian Flag at Masthead */}
      <g transform="translate(144, 25) rotate(15)">
        <path d="M0 0 L 0 8 L 4 6 L 4 0 Z" fill="#16A34A" />
        <path d="M4 0 L 4 6 L 8 8 L 8 0 Z" fill="#FFFFFF" />
        <path d="M8 0 L 8 8 L 12 6 L 12 0 Z" fill="#DC2626" />
      </g>
    </g>
  </svg>
);
export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-12 text-slate-400 text-sm relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Logo Section - Centered & Large */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            {/*<Sailb<SailboatLogoV2 className="w-40 h-40 drop-shadow-2xl transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1" />oatLogoV2 className="w-40 h-40 drop-shadow-2xl transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1" />*/}
          <LogoIcon></LogoIcon>
          </div>
          
          <div className="text-center mt-6">
            <h3 className="text-2xl font-display font-bold text-white tracking-tight mb-2">A Beat Beyond</h3>
            <p className="text-slate-500 font-medium tracking-wider uppercase text-xs">Digital Transformation Engineered</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-slate-800 mb-10"></div>
        
        {/* Legal & Info */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl text-center md:text-left gap-6">
          <div className="space-y-1">
            <p className="text-slate-300 font-medium">A BEAT BEYOND di MORANDI engineering</p>
            <p className="text-slate-400 text-xs mb-1">divisione di Morandi COMMERCIALE Srl</p>
            <p>Strada S.Anna 580, 41122 MODENA (MO)</p>
          </div>
          
          <div className="space-y-1 text-center md:text-right">
             <p>C.F. e P.I. 03699910364</p>
            <p className="text-slate-500">© 2025 All rights reserved</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
