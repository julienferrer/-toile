import React, { useEffect, useState } from 'react';
import { Star } from '../types/universe';
import { EPHEMERAL_TEXTS } from '../data/stories';

interface StoryOverlayProps {
  selectedStar: Star | null;
  companionStar?: Star | null;
  onDismiss: () => void;
  onSelectCompanion?: (companion: Star) => void;
}

export const StoryOverlay: React.FC<StoryOverlayProps> = ({
  selectedStar,
  companionStar,
  onDismiss,
  onSelectCompanion,
}) => {
  const [ephemeralPhase, setEphemeralPhase] = useState<'initial' | 'afterglow'>('initial');
  const [fadeKey, setFadeKey] = useState<string>('');

  useEffect(() => {
    if (selectedStar) {
      setFadeKey(selectedStar.id + '-' + Date.now());
      setEphemeralPhase('initial');

      // If ephemeral star, handle delayed transition to afterglow
      if (selectedStar.type === 'ephemeral') {
        const timer = setTimeout(() => {
          setEphemeralPhase('afterglow');
        }, 3600);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedStar]);

  if (!selectedStar || !selectedStar.story) {
    return null;
  }

  const story = selectedStar.story;
  const isEphemeral = selectedStar.type === 'ephemeral';
  const isBinary = selectedStar.type === 'binary';
  const sharedInsight = story.sharedInsight || companionStar?.story?.sharedInsight;

  return (
    <div
      onClick={onDismiss}
      className="fixed inset-0 z-30 pointer-events-auto flex items-end sm:items-center justify-center p-6 sm:p-12 transition-colors duration-700 bg-black/40 backdrop-blur-[3px]"
    >
      <div
        key={fadeKey}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full text-center px-8 py-10 rounded-2xl bg-gradient-to-b from-slate-950/90 via-slate-900/95 to-black border border-slate-800/80 shadow-2xl backdrop-blur-xl animate-ethereal-in"
      >
        {/* Subtle decorative celestial halo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Quiet category / nature marker */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400/60 animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400/90 font-sans">
            {isBinary
              ? `Étoiles doubles — ${story.title || story.categoryLabel || 'Une relation'}`
              : story.categoryLabel || 'Une existence'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400/60 animate-pulse" />
        </div>

        {/* Main poetic sentence (Current Star) */}
        <div className="my-4 min-h-[4.5rem] flex flex-col items-center justify-center">
          {isEphemeral ? (
            <p className="text-xl sm:text-2xl font-serif font-light text-slate-100 leading-relaxed tracking-wide italic transition-opacity duration-1000">
              {ephemeralPhase === 'initial' ? (
                <span>« {EPHEMERAL_TEXTS.initial} »</span>
              ) : (
                <span className="text-indigo-200">
                  « {EPHEMERAL_TEXTS.afterglow} »
                </span>
              )}
            </p>
          ) : isBinary ? (
            <div className="space-y-4 w-full text-left">
              {/* Star A voice */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/70">
                <div className="flex items-center gap-2 mb-1.5 text-[11px] uppercase tracking-wider text-amber-200/80 font-sans">
                  <span className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(253,230,138,0.8)]" />
                  <span>Cette étoile</span>
                </div>
                <p className="text-lg sm:text-xl font-serif font-light text-slate-100 leading-relaxed">
                  « {story.text} »
                </p>
              </div>

              {/* Star B companion voice (relier au message de la première) */}
              {companionStar?.story && (
                <div className="p-4 rounded-xl bg-slate-900/50 border border-indigo-900/40 relative">
                  <div className="flex items-center justify-between gap-2 mb-1.5 text-[11px] uppercase tracking-wider text-indigo-300/80 font-sans">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-300 shadow-[0_0_8px_rgba(165,180,252,0.8)]" />
                      <span>L'étoile compagne en orbite</span>
                    </div>
                    {onSelectCompanion && (
                      <button
                        onClick={() => onSelectCompanion(companionStar)}
                        className="text-[10px] text-slate-400 hover:text-indigo-200 transition-colors underline cursor-pointer"
                      >
                        Basculer vers elle
                      </button>
                    )}
                  </div>
                  <p className="text-base sm:text-lg font-serif italic text-indigo-100/90 leading-relaxed">
                    « {companionStar.story.text} »
                  </p>
                </div>
              )}

              {/* Shared philosophical insight (pour les couples 49, 50, 51) */}
              {sharedInsight && (
                <div className="mt-3 p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-center">
                  <p className="text-sm sm:text-base font-serif italic text-indigo-200/90 leading-relaxed">
                    « {sharedInsight} »
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xl sm:text-2xl font-serif font-light text-slate-100 leading-relaxed tracking-wide">
              « {story.text} »
            </p>
          )}
        </div>

        {/* Ephemeral progress hint */}
        {isEphemeral && (
          <p className="mt-4 text-[12px] font-sans text-slate-500 italic">
            {ephemeralPhase === 'initial'
              ? "Cette lumière s'atténue doucement..."
              : "Son éclat s'est dispersé dans l'immensité de l'espace."}
          </p>
        )}

        {/* Quiet close instruction */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onDismiss}
            className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-slate-200 transition-colors py-2 px-6 rounded-full border border-slate-800 hover:border-slate-700 bg-slate-900/60 cursor-pointer"
          >
            Poursuivre le voyage
          </button>
        </div>
      </div>
    </div>
  );
};
