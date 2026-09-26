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

  return (
    <div
      onClick={onDismiss}
      className="fixed inset-0 z-30 pointer-events-auto flex items-end sm:items-center justify-center p-6 sm:p-12 transition-colors duration-700 bg-black/20 backdrop-blur-[2px]"
    >
      <div
        key={fadeKey}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full text-center px-8 py-10 rounded-2xl bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-black/95 border border-slate-800/60 shadow-2xl backdrop-blur-xl animate-ethereal-in"
      >
        {/* Subtle decorative celestial halo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Quiet category / nature marker */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400/60 animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400/80 font-sans">
            {story.categoryLabel || 'Une existence'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400/60 animate-pulse" />
        </div>

        {/* Main poetic sentence */}
        <div className="my-3 min-h-[5.5rem] flex items-center justify-center">
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
          ) : (
            <p className="text-xl sm:text-2xl font-serif font-light text-slate-100 leading-relaxed tracking-wide">
              « {story.text} »
            </p>
          )}
        </div>

        {/* Binary star connection notice */}
        {selectedStar.type === 'binary' && companionStar && (
          <div className="mt-6 pt-5 border-t border-slate-800/60 text-left sm:text-center">
            {companionStar.isDiscovered ? (
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-indigo-300/80 font-sans block">
                  {selectedStar.relationType === 'diverging'
                    ? 'Trajectoire liée autrefois'
                    : selectedStar.relationType === 'distant'
                    ? 'Chemin qui a divergé'
                    : 'Étoile compagne liée'}
                </span>
                <p className="text-base sm:text-lg font-serif italic text-indigo-100/90 leading-relaxed">
                  « {companionStar.story?.text} »
                </p>
              </div>
            ) : (
              <button
                onClick={() => onSelectCompanion?.(companionStar)}
                className="group inline-flex items-center gap-2 text-xs font-sans text-slate-400 hover:text-slate-200 transition-colors py-1 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/70 group-hover:scale-125 transition-transform" />
                <span>
                  {selectedStar.relationType === 'diverging'
                    ? 'Une autre étoile partageait autrefois son orbite. Découvrir son écho...'
                    : 'Une autre existence lui est liée tout près. Découvrir son écho...'}
                </span>
              </button>
            )}
          </div>
        )}

        {/* Ephemeral progress hint */}
        {isEphemeral && (
          <p className="mt-4 text-[12px] font-sans text-slate-500 italic">
            {ephemeralPhase === 'initial'
              ? "Cette lumière s'atténue doucement..."
              : "Son éclat s'est dispersé dans l'immensité de l'espace."}
          </p>
        )}

        {/* Quiet close instruction */}
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
