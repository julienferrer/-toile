import React, { useEffect, useState } from 'react';
import { BlackHole } from '../types/universe';

interface BlackHoleOverlayProps {
  blackHole: BlackHole | null;
  onDismiss: () => void;
}

export const BlackHoleOverlay: React.FC<BlackHoleOverlayProps> = ({ blackHole, onDismiss }) => {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (blackHole) {
      setVisible(true);
      setPhase(1);

      const nextPhaseTimer = setTimeout(() => {
        setPhase(2);
      }, 3500);

      const closeTimer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 900);
      }, 7500);

      return () => {
        clearTimeout(nextPhaseTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [blackHole, onDismiss]);

  if (!blackHole) return null;

  return (
    <div
      onClick={onDismiss}
      className={`fixed inset-0 z-40 pointer-events-auto flex items-center justify-center p-6 transition-opacity duration-1000 select-none bg-black/40 backdrop-blur-md ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full text-center px-10 py-12 rounded-3xl bg-black/90 border border-slate-800/80 shadow-[0_0_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl animate-ethereal-in"
      >
        {/* Event horizon dark singularity pulse */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-36 h-36 bg-indigo-950/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400 font-sans">
            {blackHole.name} • {blackHole.subtitle}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />
        </div>

        <div className="my-6 min-h-[5.5rem] flex items-center justify-center">
          <p className="text-xl sm:text-2xl font-serif font-light text-slate-100 leading-relaxed tracking-wide italic transition-opacity duration-1000">
            « {phase === 1 ? blackHole.phrase1 : blackHole.phrase2} »
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/60">
          <p className="text-xs font-sans text-slate-400/80 tracking-wider">
            Ce que nous ne pouvons plus récupérer. L'irréversibilité du temps.
          </p>
        </div>

        <button
          onClick={onDismiss}
          className="mt-8 text-[11px] uppercase tracking-[0.2em] text-slate-400 hover:text-slate-200 py-2 px-6 rounded-full border border-slate-800 hover:border-slate-700 bg-slate-900/50 cursor-pointer transition-colors"
        >
          Revenir à la lumière
        </button>
      </div>
    </div>
  );
};
