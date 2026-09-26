import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Compass, ZoomIn, ZoomOut, Maximize2, BookOpen, X } from 'lucide-react';

interface MinimalHUDProps {
  isMuted: boolean;
  onToggleSound: () => void;
  discoveredCount: number;
  totalStoriesCount: number;
  onTriggerEnding: () => void;
  onOpenAddStar: () => void;
  isEndingActive: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomWide: () => void;
}

export const MinimalHUD: React.FC<MinimalHUDProps> = ({
  isMuted,
  onToggleSound,
  discoveredCount,
  onTriggerEnding,
  onOpenAddStar,
  isEndingActive,
  onZoomIn,
  onZoomOut,
  onZoomWide,
}) => {
  const [showLegend, setShowLegend] = useState(false);

  if (isEndingActive) return null;

  return (
    <>
      {/* Top Left: Sound and quiet Presence */}
      <div className="fixed top-5 left-5 z-20 flex items-center gap-3 select-none pointer-events-auto">
        <button
          onClick={onToggleSound}
          aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          className="p-2.5 rounded-full text-slate-400 hover:text-slate-100 bg-slate-950/40 hover:bg-slate-900/60 border border-slate-800/40 backdrop-blur-md transition-all cursor-pointer group"
          title={isMuted ? 'Activer l’ambiance sonore' : 'Silence'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          ) : (
            <Volume2 className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          )}
        </button>

        <button
          onClick={() => setShowLegend(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-sans text-slate-400 hover:text-slate-200 bg-slate-950/40 hover:bg-slate-900/60 border border-slate-800/40 backdrop-blur-md transition-all cursor-pointer"
          title="Guide philosophique de l'univers"
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-300/80" />
          <span className="hidden sm:inline">Sens de l'univers</span>
        </button>

        {discoveredCount > 0 && (
          <span className="text-[12px] font-sans text-slate-400/80 tracking-wider">
            {discoveredCount} {discoveredCount === 1 ? 'existence effleurée' : 'existences effleurées'}
          </span>
        )}
      </div>

      {/* Bottom Left: Cursor Zoom and Dezoom Controls */}
      <div className="fixed bottom-5 left-5 z-20 flex items-center gap-1 select-none pointer-events-auto bg-slate-950/50 p-1 rounded-full border border-slate-800/50 backdrop-blur-md">
        <button
          onClick={onZoomOut}
          aria-label="Dézoomer"
          className="p-2 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-colors cursor-pointer"
          title="Dézoomer avec le curseur (-)"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onZoomIn}
          aria-label="Zoomer"
          className="p-2 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-colors cursor-pointer"
          title="Zoomer avec le curseur (+)"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onZoomWide}
          aria-label="Dézoomer tout (Vue d'ensemble)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-colors cursor-pointer"
          title="Dézoomer pour voir la Terre et l'ensemble de l'univers"
        >
          <Maximize2 className="w-3 h-3 opacity-80" />
          <span className="hidden sm:inline text-[11px] tracking-wide">Vue cosmique</span>
        </button>
      </div>

      {/* Bottom Right: Contemplation Actions */}
      <div className="fixed bottom-5 right-5 z-20 flex items-center gap-2 select-none pointer-events-auto">
        <button
          onClick={onOpenAddStar}
          aria-label="Déposer une étoile"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-sans text-slate-400 hover:text-slate-200 bg-slate-950/40 hover:bg-slate-900/60 border border-slate-800/40 backdrop-blur-md transition-all cursor-pointer"
          title="Déposer votre moment dans l'univers"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
          <span className="hidden sm:inline">Déposer une étoile</span>
        </button>

        <button
          onClick={onTriggerEnding}
          aria-label="Prendre du recul"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-sans text-cyan-200 hover:text-white bg-slate-950/60 hover:bg-cyan-950/50 border border-cyan-800/40 backdrop-blur-md transition-all cursor-pointer shadow-sm"
          title="Prendre du recul pour observer la révélation finale"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-300" />
          <span className="hidden sm:inline">Prendre du recul</span>
        </button>
      </div>

      {/* Bottom Center subtle interaction guide */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center hidden md:block">
        <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-slate-400/60">
          Molette ou boutons pour dézoomer · Cliquez sur les corps célestes pour écouter leurs vies
        </span>
      </div>

      {/* Philosophical Legend Modal */}
      {showLegend && (
        <div
          onClick={() => setShowLegend(false)}
          className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-fade-in select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full px-8 py-9 rounded-2xl bg-gradient-to-b from-slate-950/90 via-slate-900/95 to-black/95 border border-slate-800/80 shadow-2xl backdrop-blur-xl animate-ethereal-in"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/60 mb-6">
              <h3 className="text-xl font-serif text-slate-100 font-light">
                Le Sens de l'Univers
              </h3>
              <button
                onClick={() => setShowLegend(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm font-serif italic text-slate-300/90 leading-relaxed mb-6">
              « Nous cherchons notre place dans l'univers alors que l'univers raconte déjà nos vies. »
            </p>

            <div className="space-y-3.5 text-xs font-sans text-slate-300">
              <div className="flex items-center gap-3">
                <span className="text-base">⭐</span>
                <div>
                  <strong className="text-slate-100 font-medium">Les Étoiles</strong>
                  <span className="text-slate-400 ml-2">→ Les personnes et leurs existences individuelles.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base">✨</span>
                <div>
                  <strong className="text-slate-100 font-medium">Les Constellations</strong>
                  <span className="text-slate-400 ml-2">→ Les relations, familles, amours et chemins croisés.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base">🌑</span>
                <div>
                  <strong className="text-slate-100 font-medium">Les Étoiles Mortes</strong>
                  <span className="text-slate-400 ml-2">→ Les personnes perdues dont la lumière continue de voyager.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base">🛰️</span>
                <div>
                  <strong className="text-slate-100 font-medium">Les Satellites</strong>
                  <span className="text-slate-400 ml-2">→ Les souvenirs en mouvement qui reviennent sans prévenir.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base">☄️</span>
                <div>
                  <strong className="text-slate-100 font-medium">Les Étoiles Filantes</strong>
                  <span className="text-slate-400 ml-2">→ Les moments éphémères précieux parce qu'ils ne durent pas.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base">🕳️</span>
                <div>
                  <strong className="text-slate-100 font-medium">Les Trous Noirs</strong>
                  <span className="text-slate-400 ml-2">→ Ce que nous ne pouvons pas récupérer. L'irréversibilité.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base">🪐</span>
                <div>
                  <strong className="text-slate-100 font-medium">Les Planètes</strong>
                  <span className="text-slate-400 ml-2">→ Les étapes de la vie (enfance, adolescence, rêves, adulte, souvenirs).</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base">🌍</span>
                <div>
                  <strong className="text-slate-100 font-medium">La Terre (Grand Dézoom)</strong>
                  <span className="text-slate-400 ml-2">→ L'humanité entière réunie dans ce petit monde.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/60 text-center">
              <button
                onClick={() => setShowLegend(false)}
                className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-white py-2 px-6 rounded-full border border-slate-800 hover:border-slate-700 bg-slate-900/50 cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
