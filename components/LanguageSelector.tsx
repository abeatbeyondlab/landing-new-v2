'use client';

import  { useEffect, useState } from 'react';
import {
     //useRouter,
      usePathname } from 'next/navigation';
//import { Globe } from 'lucide-react';

export const LanguageSelector = () => {
  //const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState('it');

  useEffect(() => {
    // Determine current locale from path or default to 'it'
    if (pathname.startsWith('/en')) {
      setCurrentLocale('en');
    } else {
      setCurrentLocale('it');
    }
  }, [pathname]);

  const switchLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // Set the cookie to persist preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Force redirect to root of the selected language for safety
    if (newLocale === 'en') {
      window.location.href = '/en';
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="flex items-center gap-2 ml-4">
      {
      /*
        <Globe className="w-4 h-4 text-slate-400" />
      */
      }
      <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
        <button
          onClick={() => switchLanguage('it')}
          className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
            currentLocale === 'it'
              ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          IT
        </button>
        <button
          onClick={() => switchLanguage('en')}
          className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
            currentLocale === 'en'
              ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};
