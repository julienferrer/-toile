import React from 'react';
import { Constellation } from '../types/universe';

interface ConstellationOverlayProps {
  constellation: Constellation | null;
  onDismiss: () => void;
}

export const ConstellationOverlay: React.FC<ConstellationOverlayProps> = ({
  constellation,
  onDismiss,
}) => {
  if (!constellation) return null;

  return (
    <div
      onClick={onDismiss}
      className="fixed inset-0 z-35 pointer-events-auto flex items-center justify-center p-6 bg-black/25 backdrop-blur-[2px] transition-opacity duration-700 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full text-center px-8 py-10 rounded-2xl bg-gradient-to-b from-slate-950/85 via-slate-900/90 to-black/95 border border-indigo-900/40 shadow-2xl backdrop-blur-xl animate-ethereal-in"
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-indigo-300/80 font-sans">
            Une constellation • Une relation
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif text-slate-100 font-normal tracking-wide mb-2">
          {constellation.name}
        </h3>

        <div className="my-5 min-h-[4rem] flex items-center justify-center">
          <p className="text-xl sm:text-2xl font-serif font-light text-slate-100 leading-relaxed tracking-wide italic">
            « {constellation.phrase} »
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/50">
          <p className="text-sm font-sans text-slate-400 italic">
            {constellation.philosophy}
          </p>
          {constellation.dynamicMessage && (
            <p className="text-xs font-sans text-amber-200/80 mt-2 italic">
              {constellation.dynamicMessage}
            </p>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onDismiss}
            className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-slate-200 transition-colors py-2 px-6 rounded-full border border-slate-800 hover:border-slate-700 bg-slate-900/40 cursor-pointer"
          >
            Poursuivre le voyage
          </button>
        </div>
      </div>
    </div>
  );
};
