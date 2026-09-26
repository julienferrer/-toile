/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useCallback, useRef } from 'react';
import { Star, StoryCategory, Constellation, Satellite, BlackHole, Planet } from './types/universe';
import { generateFullUniverse } from './utils/universeGenerator';
import { spaceAudio } from './audio/spaceAudio';
import { CosmosCanvas, CosmosCanvasHandle } from './components/CosmosCanvas';
import { IntroScreen } from './components/IntroScreen';
import { StoryOverlay } from './components/StoryOverlay';
import { ShootingStarOverlay } from './components/ShootingStarOverlay';
import { ConstellationOverlay } from './components/ConstellationOverlay';
import { SatelliteOverlay } from './components/SatelliteOverlay';
import { BlackHoleOverlay } from './components/BlackHoleOverlay';
import { PlanetOverlay } from './components/PlanetOverlay';
import { MilestoneOverlay } from './components/MilestoneOverlay';
import { EndingSequence } from './components/EndingSequence';
import { AddStarModal } from './components/AddStarModal';
import { MinimalHUD } from './components/MinimalHUD';
import {
  MISSED_SHOOTING_STAR_TEXT,
  FINAL_SHOOTING_STAR_SEQUENCE,
} from './data/stories';

export default function App() {
  const canvasRef = useRef<CosmosCanvasHandle>(null);

  // Initialize Universe Data
  const initialUniverse = useMemo(() => generateFullUniverse(), []);
  const [stars, setStars] = useState<Star[]>(initialUniverse.stars);
  const [constellations] = useState<Constellation[]>(initialUniverse.constellations);
  const [satellites] = useState<Satellite[]>(initialUniverse.satellites);
  const [blackHoles] = useState<BlackHole[]>(initialUniverse.blackHoles);
  const [planets] = useState<Planet[]>(initialUniverse.planets);

  // Selection states
  const [selectedStarId, setSelectedStarId] = useState<string | null>(null);
  const [selectedConstellation, setSelectedConstellation] = useState<Constellation | null>(null);
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null);
  const [selectedBlackHole, setSelectedBlackHole] = useState<BlackHole | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  const [isIntroFinished, setIsIntroFinished] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [discoveredCount, setDiscoveredCount] = useState<number>(0);

  // Shooting star caught state
  const [caughtShootingStar, setCaughtShootingStar] = useState<{
    text: string;
    isNostalgic?: boolean;
  } | null>(null);

  // Transient thoughts (missed moments & reflection)
  const [transientThought, setTransientThought] = useState<string[] | null>(null);
  const missedMomentsTriggeredRef = useRef<number>(0);

  // Grand Earth Revelation / Ending flow
  const [isEndingActive, setIsEndingActive] = useState<boolean>(false);
  const [endingPhase, setEndingPhase] = useState<number>(0);

  // Add star modal
  const [isAddStarOpen, setIsAddStarOpen] = useState<boolean>(false);

  // Zoom handlers for cursor
  const handleZoomIn = useCallback(() => {
    canvasRef.current?.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    canvasRef.current?.zoomOut();
  }, []);

  const handleZoomWide = useCallback(() => {
    canvasRef.current?.zoomWide();
  }, []);

  // Shooting star caught handler
  const handleCaughtShootingStar = useCallback(
    (data: { text: string; isNostalgic?: boolean }) => {
      setCaughtShootingStar(data);
    },
    []
  );

  // Missed shooting star handler
  const handleMissedShootingStar = useCallback(() => {
    if (missedMomentsTriggeredRef.current < 2 && !transientThought) {
      missedMomentsTriggeredRef.current += 1;
      setTimeout(() => {
        setTransientThought([
          MISSED_SHOOTING_STAR_TEXT.line1,
          MISSED_SHOOTING_STAR_TEXT.line2,
        ]);
      }, 1600);
    }
  }, [transientThought]);

  // Final solitary shooting star complete handler
  const handleFinalShootingStarComplete = useCallback(() => {
    setTimeout(() => {
      setTransientThought([
        FINAL_SHOOTING_STAR_SEQUENCE.thought1,
        FINAL_SHOOTING_STAR_SEQUENCE.thought2,
      ]);
    }, 1400);
  }, []);

  // Currently selected star and optional companion
  const selectedStar = useMemo(() => {
    return stars.find((s) => s.id === selectedStarId) || null;
  }, [stars, selectedStarId]);

  const companionStar = useMemo(() => {
    if (!selectedStar || selectedStar.type !== 'binary' || !selectedStar.partnerId) {
      return null;
    }
    return stars.find((s) => s.id === selectedStar.partnerId) || null;
  }, [stars, selectedStar]);

  const totalStoriesCount = useMemo(() => {
    return stars.filter((s) => s.hasStory).length;
  }, [stars]);

  // Star Selection Handler
  const handleSelectStar = useCallback((star: Star) => {
    if (!star.hasStory) {
      spaceAudio.playStarChime('background', 0.2);
      return;
    }

    setSelectedStarId(star.id);

    if (star.type === 'binary') {
      spaceAudio.playBinaryHarmonic();
    } else {
      spaceAudio.playStarChime(star.type);
    }

    if (star.type === 'ephemeral' && !star.isVanished) {
      setTimeout(() => {
        spaceAudio.playVanishSound();
        setStars((prev) =>
          prev.map((s) =>
            s.id === star.id
              ? { ...s, isVanished: true, ringPulseRadius: 0 }
              : s
          )
        );
      }, 3600);
    }

    if (!star.isDiscovered) {
      setStars((prev) =>
        prev.map((s) => (s.id === star.id ? { ...s, isDiscovered: true } : s))
      );
      setDiscoveredCount((prev) => {
        const next = prev + 1;
        spaceAudio.updateExplorationDepth(next);
        return next;
      });
    }
  }, []);

  // Constellation selection
  const handleSelectConstellation = useCallback((constellation: Constellation) => {
    setSelectedConstellation(constellation);
  }, []);

  // Satellite selection
  const handleSelectSatellite = useCallback((satellite: Satellite) => {
    setSelectedSatellite(satellite);
  }, []);

  // Black hole selection
  const handleSelectBlackHole = useCallback((blackHole: BlackHole) => {
    setSelectedBlackHole(blackHole);
  }, []);

  // Planet selection
  const handleSelectPlanet = useCallback((planet: Planet) => {
    setSelectedPlanet(planet);
  }, []);

  // Audio Toggle
  const handleToggleSound = useCallback(() => {
    const nextMuted = spaceAudio.toggleMute();
    setIsMuted(nextMuted);
  }, []);

  // Ending / Grand Earth Revelation controls
  const handleTriggerEnding = useCallback(() => {
    setSelectedStarId(null);
    setSelectedConstellation(null);
    setSelectedSatellite(null);
    setSelectedBlackHole(null);
    setSelectedPlanet(null);
    setIsEndingActive(true);
    setEndingPhase(0);
  }, []);

  const handleAdvanceEndingPhase = useCallback(() => {
    setEndingPhase((prev) => prev + 1);
  }, []);

  const handleExitEnding = useCallback(() => {
    setIsEndingActive(false);
    setEndingPhase(0);
  }, []);

  // User adding their own star
  const handleAddCustomStar = useCallback(
    (text: string, category: StoryCategory) => {
      const newId = `user-star-${Date.now()}`;
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 250;

      const newStar: Star = {
        id: newId,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        z: 1.4,
        baseSize: 4.2,
        baseBrightness: 1.0,
        color: '#FFF2CC',
        twinkleSpeed: 0.04,
        twinklePhase: Math.random() * Math.PI * 2,
        type: 'custom',
        story: {
          id: newId,
          text,
          category,
          categoryLabel: 'Votre instant',
        },
        hasStory: true,
        isDiscovered: true,
        trailLength: 3,
      };

      setStars((prev) => [newStar, ...prev]);
      setSelectedStarId(newId);
      spaceAudio.playStarChime('bright');
    },
    []
  );

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black select-none">
      {/* 1. Introductory Screen */}
      {!isIntroFinished && (
        <IntroScreen onComplete={() => setIsIntroFinished(true)} />
      )}

      {/* 2. Interactive Cosmos Canvas */}
      <CosmosCanvas
        ref={canvasRef}
        stars={stars}
        constellations={constellations}
        satellites={satellites}
        blackHoles={blackHoles}
        planets={planets}
        selectedStarId={selectedStarId}
        onSelectStar={handleSelectStar}
        onSelectConstellation={handleSelectConstellation}
        onSelectSatellite={handleSelectSatellite}
        onSelectBlackHole={handleSelectBlackHole}
        onSelectPlanet={handleSelectPlanet}
        isEndingActive={isEndingActive}
        endingPhase={endingPhase}
        discoveredCount={discoveredCount}
        onCaughtShootingStar={handleCaughtShootingStar}
        onMissedShootingStar={handleMissedShootingStar}
        onFinalShootingStarComplete={handleFinalShootingStarComplete}
        onAutoTriggerEarthRevelation={handleTriggerEnding}
      />

      {/* 3. Story Overlay upon Star Click (Including Dead Stars) */}
      {selectedStar && (
        <StoryOverlay
          selectedStar={selectedStar}
          companionStar={companionStar}
          onDismiss={() => setSelectedStarId(null)}
          onSelectCompanion={(comp) => handleSelectStar(comp)}
        />
      )}

      {/* 4. Constellation Overlay */}
      {selectedConstellation && (
        <ConstellationOverlay
          constellation={selectedConstellation}
          onDismiss={() => setSelectedConstellation(null)}
        />
      )}

      {/* 5. Memory Satellite Overlay */}
      {selectedSatellite && (
        <SatelliteOverlay
          satellite={selectedSatellite}
          onDismiss={() => setSelectedSatellite(null)}
        />
      )}

      {/* 6. Black Hole Contemplation Overlay */}
      {selectedBlackHole && (
        <BlackHoleOverlay
          blackHole={selectedBlackHole}
          onDismiss={() => setSelectedBlackHole(null)}
        />
      )}

      {/* 7. Planet Life Stage Overlay */}
      {selectedPlanet && (
        <PlanetOverlay
          planet={selectedPlanet}
          onDismiss={() => setSelectedPlanet(null)}
        />
      )}

      {/* 8. Shooting Star Caught Overlay */}
      {caughtShootingStar && (
        <ShootingStarOverlay
          text={caughtShootingStar.text}
          isNostalgic={caughtShootingStar.isNostalgic}
          onDismiss={() => setCaughtShootingStar(null)}
        />
      )}

      {/* 9. Subtle Philosophical Milestone Messages & Transient Thoughts */}
      {!isEndingActive && (
        <MilestoneOverlay
          discoveredCount={discoveredCount}
          transientThought={transientThought}
          onTransientThoughtComplete={() => setTransientThought(null)}
        />
      )}

      {/* 10. Minimal HUD (Sound, Contemplation, Legend, Star counter, Cursor Zoom) */}
      <MinimalHUD
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        discoveredCount={discoveredCount}
        totalStoriesCount={totalStoriesCount}
        onTriggerEnding={handleTriggerEnding}
        onOpenAddStar={() => setIsAddStarOpen(true)}
        isEndingActive={isEndingActive}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomWide={handleZoomWide}
      />

      {/* 11. Cinematic Ending Experience / Earth Revelation */}
      {isEndingActive && (
        <EndingSequence
          phase={endingPhase}
          onAdvancePhase={handleAdvanceEndingPhase}
          onExitEnding={handleExitEnding}
        />
      )}

      {/* 12. Modal to Deposit User's Own Star */}
      <AddStarModal
        isOpen={isAddStarOpen}
        onClose={() => setIsAddStarOpen(false)}
        onSubmit={handleAddCustomStar}
      />
    </main>
  );
}
