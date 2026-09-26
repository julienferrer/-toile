import React, { useEffect, useState } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Reveal "Explorez." after 1.4 seconds
    const subTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1400);

    // Auto fade after 4.2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 800);
    }, 4200);

    return () => {
      clearTimeout(subTimer);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  // Clicking anywhere skips immediately
  const handleClick = () => {
    if (!fadeOut) {
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/90 backdrop-blur-xs text-center cursor-pointer select-none transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="max-w-2xl px-6 pointer-events-none">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light tracking-[0.3em] uppercase text-slate-100">
          Les personnes sont des étoiles
        </h1>

        <div
          className={`mt-8 transition-all duration-700 transform ${
            showSubtitle
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          <p className="text-base sm:text-lg font-serif italic text-slate-300 tracking-[0.2em]">
            Explorez.
          </p>
          <p className="mt-4 text-[11px] font-sans text-slate-400/80 tracking-widest uppercase">
            Toucher ou cliquer pour entrer
          </p>
        </div>
      </div>
    </div>
  );
};
