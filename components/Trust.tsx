import React from 'react';

export const Trust: React.FC = () => {
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
            <div>
                 <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">
                    Vendiamo <span className="text-blue-600">Risultati</span>.
                 </h2>
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">30+</div>
                        <p className="text-slate-600 font-medium">Aziende che si fidano di noi</p>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">40+</div>
                         <p className="text-slate-600 font-medium">Soluzioni sviluppate</p>
                    </div>
                 </div>
            </div>

            {/* Context Text */}
            <div className="text-lg text-slate-600 leading-relaxed">
                <p>
                    Non offriamo solo tecnologia, ma un percorso di crescita misurabile. I numeri parlano chiaro: la nostra metodologia ingegneristica trasforma le sfide in traguardi raggiunti.
                </p>
            </div>
        </div>

        {/* Logos Section - Scrollable */}
        <div className="flex flex-col md:flex-row items-center gap-8 pt-4">
          
          <div className="text-center md:text-left md:w-1/4 shrink-0 z-10 bg-white md:pr-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
              Partner di Eccellenza
            </p>
            <p className="text-slate-900 font-semibold">
              Hanno scelto la nostra qualità
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
