import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export const Trust: React.FC = () => {
  const t = useTranslations('trust');
  const [companiesCount, setCompaniesCount] = useState(0);
  const [solutionsCount, setSolutionsCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animation function
  const animateCounter = (start: number, end: number, duration: number, setter: (value: number) => void) => {
    const startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(start + (end - start) * easeOutQuart);
      
      setter(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Start animations
            animateCounter(0, 30, 1500, setCompaniesCount);
            animateCounter(0, 40, 1500, setSolutionsCount);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section className="py-16 bg-white border-b border-slate-100 overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-logos {
          animation: scroll 30s linear infinite;
          width: max-content;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12 border-b border-slate-100 pb-12">
            {/* Stats Section */}
            <div ref={sectionRef}>
                 <h2 className="text-3xl font-display font-bold text-slate-900 mb-8"
                     dangerouslySetInnerHTML={{ __html: t.raw('title') }}
                 />
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                          {companiesCount}+
                        </div>
                        <p className="text-slate-600 font-medium">{t('companies')}</p>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                          {solutionsCount}+
                        </div>
                         <p className="text-slate-600 font-medium">{t('solutions')}</p>
                    </div>
                 </div>
            </div>

            {/* Context Text */}
            <div className="text-lg text-slate-600 leading-relaxed">
                <p>
                    {t('description')}
                </p>
            </div>
        </div>

        {/* Logos Section - Scrollable */}
        <div className="flex flex-col md:flex-row items-center gap-8 pt-4">
          
          <div className="text-center md:text-left md:w-1/4 shrink-0 z-10 bg-white md:pr-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
              {t('partners')}
            </p>
            <p className="text-slate-900 font-semibold">
              {t('chosenBy')}
            </p>
          </div>
          
          {/* Marquee Container */}
          <div className="md:w-3/4 relative overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-50px),transparent_100%)]">
            <div className="flex gap-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500 animate-scroll-logos">
                {/* Logos Set 1 */}
                <div className="flex gap-12 items-center shrink-0">
                    <div className="text-2xl font-bold tracking-tighter text-slate-800 hover:text-blue-600 cursor-default whitespace-nowrap">BI-REX</div>
                    <div className="text-2xl font-black text-slate-800 hover:text-slate-900 cursor-default whitespace-nowrap">CAE</div>
                    <div className="text-xl font-bold text-slate-800 hover:text-slate-900 cursor-default whitespace-nowrap">ZENITFARMA</div>
                    <div className="text-2xl font-serif italic font-bold text-slate-800 hover:text-black cursor-default whitespace-nowrap">ZATACOM</div>
                    <div className="text-xl font-bold text-slate-800 hover:text-slate-900 cursor-default whitespace-nowrap">TRAVELWARE</div>
                    <div className="text-2xl font-bold tracking-tighter text-slate-500 hover:text-blue-600 cursor-default whitespace-nowrap">NAZARENO COOPSOCIALE</div>
                    <div className="text-xl font-bold text-slate-800 hover:text-slate-900 cursor-default whitespace-nowrap">AUSER</div>
                    <div className="text-xl font-bold text-slate-800 hover:text-slate-900 cursor-default whitespace-nowrap">FARMACIA SAN PIETRO</div>
                    <div className="text-xl font-bold text-slate-800 hover:text-slate-900 cursor-default whitespace-nowrap">MONEYVIZ</div>
                    <div className="text-2xl font-bold tracking-tighter text-slate-800 hover:text-blue-600 cursor-default whitespace-nowrap">FACTORYBOOK</div>
                    <div className="text-2xl font-serif italic font-bold text-slate-800 hover:text-black cursor-default whitespace-nowrap">FANTACALCIO ONLINE</div>
                </div>
                {/* Logos Set 2 (Duplicate) */}
                <div className="flex gap-12 items-center shrink-0">
                    <div className="text-2xl font-bold tracking-tighter text-slate-800 hover:text-blue-600 cursor-default whitespace-nowrap">BI-REX</div>
                    <div className="text-2xl font-black text-slate-800 hover:text-slate-900 cursor-default whitespace-nowrap">CAE</div>
                    <div className="text-xl font-bold text-slate-800 hover:text-slate-900 cursor-default whitespace-nowrap">ZENITFARMA</div>
                    <div className="text-2xl font-serif italic font-bold text-slate-800 hover:text-black cursor-default whitespace-nowrap">ZATACOM</div>
                    <div className="text-xl font-bold text-slate-800 hover:text-slate-900 cursor-default whitespace-nowrap">TRAVELWARE</div>
                    <div className="text-2xl font-bold tracking-tighter text-slate-600 hover:text-blue-600 cursor-default whitespace-nowrap">NAZARENO COOPSOCIALE</div>
                    <div className="text-xl font-bold text-slate-800 hover:text-slate-900 cursor-default whitespace-nowrap">AUSER</div>
                    <div className="text-xl font-bold text-slate-800 hover:text-slate-900 cursor-default whitespace-nowrap">FARMACIA SAN PIETRO</div>
                    <div className="text-xl font-bold text-slate-800 hover:text-slate-900 cursor-default whitespace-nowrap">MONEYVIZ</div>
                    <div className="text-2xl font-bold tracking-tighter text-slate-800 hover:text-blue-600 cursor-default whitespace-nowrap">FACTORYBOOK</div>
                    <div className="text-2xl font-serif italic font-bold text-slate-800 hover:text-black cursor-default whitespace-nowrap">FANTACALCIO ONLINE</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
