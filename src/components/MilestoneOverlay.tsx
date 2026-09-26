import React, { useEffect, useState } from 'react';
import { MILESTONES } from '../data/stories';

interface MilestoneOverlayProps {
  discoveredCount: number;
  transientThought?: string[] | null;
  onTransientThoughtComplete?: () => void;
}

export const MilestoneOverlay: React.FC<MilestoneOverlayProps> = ({
  discoveredCount,
  transientThought,
  onTransientThoughtComplete,
}) => {
  const [currentLines, setCurrentLines] = useState<string[] | null>(null);
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasShownTier1, setHasShownTier1] = useState<boolean>(false);
  const [hasShownTier2, setHasShownTier2] = useState<boolean>(false);

  // Trigger tier 1
  useEffect(() => {
    if (discoveredCount >= MILESTONES.firstTier.triggerCount && !hasShownTier1 && !transientThought) {
      setHasShownTier1(true);
      setCurrentLines([MILESTONES.firstTier.line1, MILESTONES.firstTier.line2]);
      setLineIndex(0);
      setIsVisible(true);
    }
  }, [discoveredCount, hasShownTier1, transientThought]);

  // Trigger tier 2
  useEffect(() => {
    if (discoveredCount >= MILESTONES.secondTier.triggerCount && !hasShownTier2 && !transientThought) {
      setHasShownTier2(true);
      setCurrentLines(MILESTONES.secondTier.lines);
      setLineIndex(0);
      setIsVisible(true);
    }
  }, [discoveredCount, hasShownTier2, transientThought]);

  // Handle transient custom thoughts (like missed shooting star or reflection)
  useEffect(() => {
    if (transientThought && transientThought.length > 0) {
      setCurrentLines(transientThought);
      setLineIndex(0);
      setIsVisible(true);
    }
  }, [transientThought]);

  // Step through lines
  useEffect(() => {
    if (!isVisible || !currentLines) return;

    const interval = setTimeout(() => {
      if (lineIndex < currentLines.length - 1) {
        setLineIndex((prev) => prev + 1);
      } else {
        // Fade out
        const hideTimer = setTimeout(() => {
          setIsVisible(false);
          setCurrentLines(null);
          onTransientThoughtComplete?.();
        }, 4500);
        return () => clearTimeout(hideTimer);
      }
    }, 4000);

    return () => clearTimeout(interval);
  }, [isVisible, lineIndex, currentLines, onTransientThoughtComplete]);

  if (!isVisible || !currentLines) return null;

  return (
    <div className="fixed top-14 sm:top-20 inset-x-0 z-20 pointer-events-none flex justify-center px-6">
      <div className="max-w-xl text-center px-6 py-4 rounded-xl bg-slate-950/40 border border-slate-800/30 backdrop-blur-sm animate-ethereal-in">
        <p className="text-base sm:text-lg font-serif italic text-slate-300/90 tracking-wide transition-all duration-1000">
          « {currentLines[lineIndex]} »
        </p>
      </div>
    </div>
  );
};
