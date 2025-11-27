import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Server, Skull, FileCode, Wallet, ArrowRight, Play, RotateCcw, Terminal } from 'lucide-react';
import { SIMULATIONS } from '../data/simulations';

interface SimulationViewerProps {
  vulnId: string;
}

const SimulationViewer: React.FC<SimulationViewerProps> = ({ vulnId }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const steps = SIMULATIONS[vulnId] || [];
  const currentStep = steps[stepIndex];

  // Reset when vulnId changes
  useEffect(() => {
    setStepIndex(0);
  }, [vulnId]);

  if (!steps.length) return <div className="text-slate-500">No simulation data available.</div>;

  const handleNext = () => {
    if (stepIndex < steps.length - 1) setStepIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex(prev => prev - 1);
  };

  const handleReset = () => {
    setStepIndex(0);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'user': return <User size={24} />;
      case 'server': return <Server size={24} />;
      case 'hacker': return <Skull size={24} />;
      case 'contract': return <FileCode size={24} />;
      case 'wallet': return <Wallet size={24} />;
      default: return <User size={24} />;
    }
  };

  return (
    <div className="w-full bg-slate-950/50 rounded-xl border border-slate-800 overflow-hidden flex flex-col h-[550px]">
      {/* Top Bar: Progress */}
      <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center px-4 justify-between shrink-0">
         <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest flex items-center gap-2">
            <Play size={12} /> Attack Simulation
         </div>
         <div className="flex gap-1">
            {steps.map((_, i) => (
                <div 
                    key={i} 
                    className={`h-1.5 w-6 rounded-full transition-all duration-300 ${i <= stepIndex ? 'bg-indigo-500' : 'bg-slate-700'}`}
                />
            ))}
         </div>
      </div>

      {/* Stage (Visualization) */}
      <div className="relative flex-grow w-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-10 border-b border-slate-800/50 overflow-hidden min-h-[300px]">
        
        {/* Actors */}
        <div className="absolute inset-0 w-full h-full">
            {currentStep.actors.map((actor) => (
                <motion.div
                    key={actor.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                        opacity: 1, 
                        scale: actor.isActive ? 1.1 : 1,
                        left: `${actor.x}%`,
                        top: `${actor.y}%`
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={`p-3 rounded-xl border transition-colors duration-500 shadow-xl
                        ${actor.isCompromised 
                            ? 'bg-red-900/20 border-red-500/50 text-red-400 shadow-red-900/20' 
                            : actor.isActive 
                                ? 'bg-slate-800 border-indigo-400 text-indigo-400 shadow-indigo-500/20' 
                                : 'bg-slate-900 border-slate-700 text-slate-500'
                        }
                    `}>
                        {getIcon(actor.icon)}
                    </div>
                    <span className={`text-xs font-bold whitespace-nowrap px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-sm ${actor.isCompromised ? 'text-red-400' : 'text-slate-400'}`}>
                        {actor.label}
                    </span>
                </motion.div>
            ))}
        </div>

        {/* Packet Animation */}
        <AnimatePresence>
            {currentStep.packet && (
                <motion.div
                    key={`packet-${stepIndex}`}
                    className={`absolute z-20 px-3 py-1 rounded-full text-xs font-bold border shadow-lg flex items-center gap-1
                        ${currentStep.packet.type === 'malicious' 
                            ? 'bg-red-500 text-white border-red-400' 
                            : 'bg-emerald-500 text-white border-emerald-400'}
                    `}
                    initial={{ 
                        left: `${currentStep.actors.find(a => a.id === currentStep.packet?.from)?.x}%`, 
                        top: `${currentStep.actors.find(a => a.id === currentStep.packet?.from)?.y}%`,
                        opacity: 0,
                        scale: 0.5,
                        translateX: '-50%',
                        translateY: '-50%'
                    }}
                    animate={{ 
                        left: `${currentStep.actors.find(a => a.id === currentStep.packet?.to)?.x}%`, 
                        top: `${currentStep.actors.find(a => a.id === currentStep.packet?.to)?.y}%`,
                        opacity: 1,
                        scale: 1,
                        translateX: '-50%',
                        translateY: '-50%'
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    {currentStep.packet.label}
                    <ArrowRight size={10} />
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Controls & Description & Code */}
      <div className="bg-slate-900 p-6 flex flex-col h-[200px] shrink-0">
        <div className="flex gap-6 h-full">
            
            {/* Left: Text & Controls */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <span className="text-indigo-400 font-mono">0{stepIndex + 1}.</span> 
                        {currentStep.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        {currentStep.description}
                    </p>
                </div>
                
                <div className="flex gap-3 mt-4">
                    {stepIndex > 0 && (
                        <button 
                            onClick={handlePrev}
                            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors uppercase tracking-wider"
                        >
                            Back
                        </button>
                    )}
                    
                    {stepIndex < steps.length - 1 ? (
                        <button 
                            onClick={handleNext}
                            className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 uppercase tracking-wider"
                        >
                            Next Step <ArrowRight size={14} />
                        </button>
                    ) : (
                        <button 
                            onClick={handleReset}
                            className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 uppercase tracking-wider"
                        >
                            Replay <RotateCcw size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Right: Code Snippet (Terminal View) */}
            <div className="flex-1 hidden md:block">
                 <div className="h-full bg-slate-950 rounded-lg border border-slate-800 p-3 font-mono text-xs overflow-y-auto custom-scrollbar relative">
                    <div className="absolute top-2 right-2 text-slate-600">
                        <Terminal size={14} />
                    </div>
                    {currentStep.codeSnippet ? (
                        <pre className="text-emerald-400 whitespace-pre-wrap">
                            <span className="text-slate-500 select-none mr-2">$</span>
                            {currentStep.codeSnippet}
                        </pre>
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-700 italic">
                            No active payload in this step.
                        </div>
                    )}
                 </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default SimulationViewer;