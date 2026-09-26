import React, { useEffect, useState } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const subTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1800);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 1800);
    }, 6500);

    return () => {
      clearTimeout(subTimer);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  const handleClick = () => {
    if (!fadeOut) {
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black text-center cursor-pointer select-none transition-opacity duration-1800 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="max-w-2xl px-6">
        <span className="text-[11px] font-sans tracking-[0.35em] uppercase text-cyan-300/80 mb-4 block animate-fade-in">
          Une œuvre contemplative interactive
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-[0.25em] uppercase text-slate-100 animate-ethereal-in">
          L'Univers de nos Vies
        </h1>

        <div
          className={`mt-8 transition-all duration-1500 transform ${
            showSubtitle
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 translate-y-3 blur-xs'
          }`}
        >
          <p className="text-lg sm:text-xl font-serif italic text-slate-300/90 tracking-wide max-w-xl mx-auto leading-relaxed">
            « Nous cherchons notre place dans l'univers alors que l'univers raconte déjà nos vies. »
          </p>

          <p className="text-xs font-sans tracking-[0.2em] uppercase text-slate-500 mt-10">
            Cliquer pour commencer l'exploration
          </p>
        </div>
      </div>
    </div>
  );
};
