import React from 'react';
import { Vulnerability } from '../types';
import { X, ShieldAlert, Activity, Terminal, BookOpen, History } from 'lucide-react';
import ImpactChart from './ImpactChart';
import SimulationViewer from './SimulationViewer';

interface DetailModalProps {
  vuln: Vulnerability;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ vuln, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-7xl h-[90vh] glass-panel rounded-2xl border border-slate-700 shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-full transition-all z-20"
        >
          <X size={24} />
        </button>

        {/* Left Column: Info & Stats */}
        <div className="w-full md:w-[35%] p-8 border-r border-slate-700/50 bg-slate-900/60 overflow-y-auto custom-scrollbar flex flex-col gap-8">
          
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                ${vuln.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                  'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                  {vuln.severity}
               </span>
               <span className="text-slate-400 text-sm flex items-center gap-1">
                  <Terminal size={14} /> {vuln.category}
               </span>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4 leading-tight font-mono tracking-tight">{vuln.title}</h2>
            
            <p className="text-lg text-slate-300 leading-relaxed font-light border-l-2 border-indigo-500 pl-4">
              {vuln.shortDesc}
            </p>
          </div>

          {/* Beginner Concepts Guide */}
          <div className="space-y-3">
             <h3 className="flex items-center gap-2 text-indigo-300 font-semibold text-xs uppercase tracking-wider">
                <BookOpen size={14} /> Concept Guide
             </h3>
             <div className="grid grid-cols-1 gap-3">
               {vuln.beginnerConcepts.map((concept, idx) => (
                 <div key={idx} className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
                    <div className="text-indigo-400 font-bold text-sm mb-1">{concept.title}</div>
                    <div className="text-slate-400 text-xs leading-relaxed">{concept.description}</div>
                 </div>
               ))}
             </div>
          </div>

          {/* Similar Cases */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-indigo-300 font-semibold text-xs uppercase tracking-wider">
                <History size={14} /> Similar History
             </h3>
             <div className="bg-slate-800/40 rounded-lg border border-slate-700/50 overflow-hidden">
                {vuln.similarCases.map((incident, idx) => (
                   <div key={idx} className="flex justify-between items-center p-3 border-b border-slate-700/50 last:border-0 hover:bg-slate-700/30 transition-colors">
                      <div>
                        <div className="text-slate-200 font-mono text-sm font-bold">{incident.name}</div>
                        <div className="text-slate-500 text-xs">{incident.date}</div>
                      </div>
                      <div className="text-red-400 font-mono text-xs bg-red-500/10 px-2 py-1 rounded">
                        {incident.loss}
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Real World Case */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="flex items-center gap-2 text-indigo-400 font-semibold mb-4 text-xs uppercase tracking-wider">
              <ShieldAlert size={14} /> Spotlight Case
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                <span className="text-slate-400 text-sm">Target</span>
                <span className="text-white font-mono text-sm font-bold">{vuln.realWorldCase.name}</span>
              </div>
              <div className="text-sm text-slate-400 leading-relaxed italic opacity-80">
                "{vuln.realWorldCase.description}"
              </div>
            </div>
          </div>

          {/* Impact Chart */}
          <div className="flex-grow min-h-[250px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <Activity className="text-emerald-400" size={16} />
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Impact Metrics</h3>
            </div>
            <div className="flex-grow bg-slate-800/30 rounded-xl border border-slate-700/50 p-4">
                <ImpactChart data={vuln.impactStats} />
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Simulation Only */}
        <div className="w-full md:w-[65%] bg-slate-950/50 p-6 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
          
          <div className="h-full w-full flex flex-col">
             <SimulationViewer vulnId={vuln.id} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailModal;