'use client'

import React from 'react';
import LogoIcon from './LogoIcon'



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
