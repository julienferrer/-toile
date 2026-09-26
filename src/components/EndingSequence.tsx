import React, { useEffect, useState, useCallback } from 'react';
import { EARTH_REVELATION_SEQUENCE } from '../data/stories';

interface EndingSequenceProps {
  phase: number;
  onAdvancePhase: () => void;
  onExitEnding: () => void;
}

export const EndingSequence: React.FC<EndingSequenceProps> = ({
  phase,
  onAdvancePhase,
  onExitEnding,
}) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const maxVerseIndex = EARTH_REVELATION_SEQUENCE.length; // 7

  // Handle auto-advance timers
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === 0) {
      timer = setTimeout(() => {
        onAdvancePhase();
      }, 2500);
    } else if (phase >= 1 && phase < maxVerseIndex) {
      setFadeState('in');
      setDisplayText(EARTH_REVELATION_SEQUENCE[phase - 1]);

      timer = setTimeout(() => {
        setFadeState('out');
        setTimeout(() => {
          onAdvancePhase();
        }, 800);
      }, 5500);
    } else if (phase === maxVerseIndex) {
      setFadeState('in');
      setDisplayText(EARTH_REVELATION_SEQUENCE[maxVerseIndex - 1]);
    }

    return () => clearTimeout(timer);
  }, [phase, maxVerseIndex, onAdvancePhase]);

  // Click anywhere to immediately skip text
  const handleClick = useCallback(() => {
    if (phase < maxVerseIndex) {
      onAdvancePhase();
    }
  }, [phase, maxVerseIndex, onAdvancePhase]);

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-40 pointer-events-auto flex flex-col items-center justify-end pb-24 sm:justify-center sm:pb-0 p-6 select-none cursor-pointer"
      title={phase < maxVerseIndex ? "Cliquer pour passer au texte suivant" : undefined}
    >
      {/* Background subtle cinematic vignette so the Earth remains visible */}
      <div
        className={`fixed inset-0 bg-radial from-transparent via-black/40 to-black/80 transition-opacity duration-2000 pointer-events-none ${
          phase >= 1 ? 'opacity-90' : 'opacity-0'
        }`}
      />

      {/* Main poetic verses */}
      <div className="relative z-10 max-w-2xl text-center px-8">
        {phase > 0 && (
          <div
            className={`transition-all duration-700 transform ${
              fadeState === 'in'
                ? 'opacity-100 translate-y-0 filter-none'
                : 'opacity-0 -translate-y-2 blur-sm'
            }`}
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-slate-100 leading-relaxed tracking-wide drop-shadow-md">
              « {displayText} »
            </p>
          </div>
        )}

        {/* Skip hint */}
        {phase < maxVerseIndex && (
          <div className="mt-8 text-center pointer-events-none opacity-40 hover:opacity-80 transition-opacity">
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-slate-400">
              Cliquer pour continuer
            </span>
          </div>
        )}

        {/* Final controls */}
        {phase === maxVerseIndex && (
          <div className="mt-14 animate-ethereal-in flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExitEnding();
              }}
              className="text-xs uppercase tracking-[0.25em] text-cyan-200 hover:text-white py-3 px-8 rounded-full border border-cyan-500/40 bg-slate-950/80 hover:bg-cyan-950/50 backdrop-blur-md transition-all cursor-pointer shadow-lg"
            >
              Continuer à contempler
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

