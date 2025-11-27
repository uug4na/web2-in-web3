import React, { useState } from 'react';
import { VULNERABILITIES } from './data/vulnerabilities';
import { Vulnerability } from './types';
import DetailModal from './components/DetailModal';
import { Shield, ArrowRight, Repeat, Code, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 font-inter selection:bg-indigo-500/30">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Header */}
      <header className="pt-20 pb-16 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-indigo-400 text-xs tracking-[0.2em] uppercase font-bold mb-8 shadow-xl backdrop-blur-sm">
           <Zap size={14} className="text-yellow-400 fill-yellow-400" /> Live Exploitation Workshop
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter leading-none">
          Web2 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Vulns</span><br/>
          <span className="text-slate-700">in</span> Web3
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          Your smart contracts are audited. <span className="text-slate-200 font-medium">Your frontend isn't.</span><br/>
          See how basic Web2 bugs lead to total wallet compromise.
        </p>
      </header>

      {/* Grid */}
      <main className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {VULNERABILITIES.map((vuln) => (
            <div
              key={vuln.id}
              onClick={() => setSelectedVuln(vuln)}
              className="group relative bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-8 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between h-[340px] overflow-hidden backdrop-blur-sm"
            >
              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="inline-flex p-4 rounded-2xl bg-slate-900 border border-slate-800 text-indigo-400 group-hover:scale-110 group-hover:border-indigo-500/30 transition-all duration-300 shadow-lg">
                        {vuln.id === 'sig-replay' && <Repeat size={32} strokeWidth={1.5} />}
                        {vuln.id === 'xss-contract-hijack' && <Code size={32} strokeWidth={1.5} />}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 bg-indigo-500/20 p-2 rounded-full">
                        <ArrowRight className="text-indigo-400" size={20} />
                    </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors tracking-tight">
                  {vuln.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed line-clamp-2 font-light">
                  {vuln.shortDesc}
                </p>
              </div>

              <div className="relative z-10 mt-auto pt-6 border-t border-slate-800/50 flex justify-between items-center">
                <div className="text-xs text-slate-500 font-mono tracking-widest uppercase">
                  Scenario: {vuln.realWorldCase.date}
                </div>
                <div className={`text-xs px-3 py-1.5 rounded-full border font-bold uppercase tracking-wider ${
                    vuln.severity === 'Critical' ? 'border-red-500/20 text-red-400 bg-red-500/10' : 'border-orange-500/20 text-orange-400 bg-orange-500/10'
                }`}>
                    {vuln.severity} Impact
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedVuln && (
        <DetailModal vuln={selectedVuln} onClose={() => setSelectedVuln(null)} />
      )}
      
    </div>
  );
};

export default App;
