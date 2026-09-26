import React, { useEffect, useState } from 'react';

interface ShootingStarOverlayProps {
  text: string | null;
  isNostalgic?: boolean;
  onDismiss: () => void;
}

export const ShootingStarOverlay: React.FC<ShootingStarOverlayProps> = ({
  text,
  isNostalgic,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (text) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 800);
      }, 4800);
      return () => clearTimeout(timer);
    }
  }, [text, onDismiss]);

  if (!text) return null;

  return (
    <div
      onClick={onDismiss}
      className={`fixed inset-0 z-35 pointer-events-auto flex items-center justify-center p-6 transition-opacity duration-800 select-none ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full text-center px-8 py-9 rounded-2xl bg-gradient-to-b from-slate-950/85 via-slate-900/90 to-black/95 border border-indigo-900/40 shadow-2xl backdrop-blur-xl animate-ethereal-in"
      >
        {/* Soft stardust aura */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-28 bg-indigo-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-indigo-300/90 font-sans">
            {isNostalgic ? 'Un écho du passé' : 'Un moment éphémère'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse" />
        </div>

        <div className="my-4 min-h-[4rem] flex items-center justify-center">
          <p className="text-xl sm:text-2xl font-serif font-light text-slate-100 leading-relaxed tracking-wide italic">
            « {text} »
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/50">
          <p className="text-[11px] font-sans text-slate-400/70 tracking-wider italic">
            Certaines choses ne sont précieuses que parce qu'elles ne durent pas.
          </p>
        </div>
      </div>
    </div>
  );
};
