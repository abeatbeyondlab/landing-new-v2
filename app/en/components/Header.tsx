'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/Button';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSelector } from '@/components/LanguageSelector';

export const Header: React.FC = () => {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (pathname === '/en') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/en');
    }
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/en/#${id}`);
    }
  };

  const navItems = [
    { label: t('metodo'), type: 'scroll', id: 'metodo' },
    { label: t('servizi'), type: 'scroll', id: 'servizi' },
    { label: t('blog'), type: 'link', href: '/en/blog' },
    { label: t('chiSiamo'), type: 'link', href: '/en/chi-siamo' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-brand-dark/80 backdrop-blur-lg border-b border-white/10 py-3 shadow-2xl' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button 
          className="flex items-center gap-3 group bg-transparent border-none cursor-pointer p-0" 
          onClick={handleLogoClick}
          aria-label="A Beat Beyond - Back to home"
        >
          <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
             <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
          
          </div>
          
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-display font-black tracking-tight text-white leading-none">
              A Beat Beyond
            </span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/10 backdrop-blur-sm">
          {navItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => {
                if (item.type === 'scroll' && item.id) {
                  scrollToSection(item.id);
                } else if (item.type === 'link' && item.href) {
                  router.push(item.href);
                }
              }}
              className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
            >
              {item.label}
            </button>
          ))}
             <LanguageSelector />
        </nav>

        <div className="hidden lg:flex items-center">
           <Button 
            variant="glow" 
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2 text-sm !rounded-lg"
          >
            {t('prenotaConsulenza')}
          </Button>
       
        </div>

        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-dark border-b border-slate-800 p-6 flex flex-col gap-4 lg:hidden animate-in slide-in-from-top-5 shadow-2xl">
          {navItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => {
                if (item.type === 'scroll' && item.id) {
                  scrollToSection(item.id);
                } else if (item.type === 'link' && item.href) {
                  router.push(item.href);
                  setIsMobileMenuOpen(false);
                }
              }}
              className="text-left text-lg text-slate-300 font-medium py-3 border-b border-slate-800 hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </button>
          ))}
           <div className="flex justify-left mt-4">
            <LanguageSelector />
          </div>
          <Button onClick={() => scrollToSection('contact')} variant="glow" fullWidth className="mt-4">
            {t('prenotaConsulenzaGratuita')}
          </Button>
         
        </div>
      )}
    </header>
  );
};
