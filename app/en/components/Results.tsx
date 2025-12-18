import React from 'react';
import { TrendingUp, ShieldCheck, BarChart3 } from 'lucide-react';

export const Results: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Proven Expertise
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
            Not Just Words: <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Measurable Results</span>
          </h2>
          <p className="text-lg text-slate-600">
            Our methods have been successfully applied in highly complex contexts. Here's how we transform challenges into competitive advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Case Study 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[80px] transition-all group-hover:bg-blue-100"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <TrendingUp size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Automotive Sector
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-6 uppercase tracking-wide">
                Production Optimization
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">THE CHALLENGE</span>
                  <p className="text-slate-600 text-sm">
                    Production systems not aligned with management software, causing supply delays.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                   <span className="text-xs font-bold text-emerald-700 block mb-1">THE RESULT</span>
                   <p className="text-slate-900 font-bold text-lg">
                     +25% Operational Efficiency
                   </p>
                   <p className="text-slate-500 text-sm mt-1">
                     Reduced downtime and total traceability.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-[80px] transition-all group-hover:bg-purple-100"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <BarChart3 size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Manufacturing & Logistics
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-6 uppercase tracking-wide">
                Business Intelligence
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">THE CHALLENGE</span>
                  <p className="text-slate-600 text-sm">
                    Decisions based on outdated monthly reports, management "navigating blind".
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                   <span className="text-xs font-bold text-emerald-700 block mb-1">THE RESULT</span>
                   <p className="text-slate-900 font-bold text-lg">
                     Real-Time Dashboard
                   </p>
                   <p className="text-slate-500 text-sm mt-1">
                     Immediate strategic decisions based on certain data.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-[80px] transition-all group-hover:bg-orange-100"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <ShieldCheck size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Financial Services
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-6 uppercase tracking-wide">
                Cybersecurity & Compliance
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">THE CHALLENGE</span>
                  <p className="text-slate-600 text-sm">
                    Need for ISO 27001 compliance and protection of sensitive data from ransomware attacks.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                   <span className="text-xs font-bold text-emerald-700 block mb-1">THE RESULT</span>
                   <p className="text-slate-900 font-bold text-lg">
                     Total Armor
                   </p>
                   <p className="text-slate-500 text-sm mt-1">
                     Zero security incidents and certification obtained.
                   </p>
                </div>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
};