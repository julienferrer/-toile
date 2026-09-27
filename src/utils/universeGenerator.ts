import { Star } from '../types/universe';
import {
  SINGLE_STAR_STORIES,
  BINARY_STORY_PAIRS,
} from '../data/stories';

export const UNIVERSE_RADIUS = 3500; // Radius in world coordinates

const STAR_PALETTE = [
  '#FFFFFF', // Pure stellar white
  '#F4F7FF', // Cool white
  '#FFF8EE', // Warm white
  '#E0E8F8', // Pale celestial blue
  '#EAE4F8', // Subtle starlight lavender
  '#FDF2D6', // Soft gold
  '#CDE0F7', // Deep sky tint
];

// Concentric celestial zones guaranteeing completely homogeneous and equitable distribution
// from the starting screen to the cosmic edge.
const ZONES = [
  { rMin: 60, rMax: 520, singleCount: 10, binaryCount: 11, bgCount: 480 },   // Zone 1: Initial viewport
  { rMin: 520, rMax: 1200, singleCount: 11, binaryCount: 12, bgCount: 520 }, // Zone 2: Inner cosmos
  { rMin: 1200, rMax: 1900, singleCount: 10, binaryCount: 11, bgCount: 480 },// Zone 3: Mid cosmos
  { rMin: 1900, rMax: 2650, singleCount: 10, binaryCount: 10, bgCount: 460 },// Zone 4: Outer cosmos
  { rMin: 2650, rMax: 3450, singleCount: 8, binaryCount: 8, bgCount: 400 },   // Zone 5: Far frontier
];

function sampleAnnulus(rMin: number, rMax: number): { x: number; y: number } {
  const angle = Math.random() * Math.PI * 2;
  const r = Math.sqrt(rMin * rMin + Math.random() * (rMax * rMax - rMin * rMin));
  return {
    x: Math.cos(angle) * r,
    y: Math.sin(angle) * r,
  };
}

export function generateUniverse(): Star[] {
  const stars: Star[] = [];
  let starCounter = 0;

  // Track placed interactive coordinates to prevent collision and ensure spacing
  const placedInteractiveCenters: { x: number; y: number }[] = [];

  function getSpacedPosition(
    rMin: number,
    rMax: number,
    minDistance = 75
  ): { x: number; y: number } {
    for (let attempt = 0; attempt < 50; attempt++) {
      const pos = sampleAnnulus(rMin, rMax);
      const isTooClose = placedInteractiveCenters.some(
        (p) => Math.hypot(p.x - pos.x, p.y - pos.y) < minDistance
      );
      if (!isTooClose) {
        placedInteractiveCenters.push(pos);
        return pos;
      }
    }
    const fallback = sampleAnnulus(rMin, rMax);
    placedInteractiveCenters.push(fallback);
    return fallback;
  }

  // --------------------------------------------------------------------------
  // 1. ⭐ ÉTOILES SIMPLES — LES PERSONNES (49 existences uniques)
  // --------------------------------------------------------------------------
  let singleStoryIndex = 0;

  ZONES.forEach((zone) => {
    for (let i = 0; i < zone.singleCount && singleStoryIndex < SINGLE_STAR_STORIES.length; i++) {
      const storyData = SINGLE_STAR_STORIES[singleStoryIndex];
      const pos = getSpacedPosition(zone.rMin, zone.rMax, 70);
      const id = `single-star-${singleStoryIndex + 1}`;

      let starColor = '#FFFFFF';
      let baseSize = 3.6;
      let twinkleSpeed = 0.025;

      if (storyData.category === 'naissance') {
        starColor = '#FDF2D6';
        baseSize = 4.0;
        twinkleSpeed = 0.035;
      } else if (storyData.category === 'amour' || storyData.category === 'couple') {
        starColor = '#FFE4E6';
        baseSize = 4.1;
        twinkleSpeed = 0.03;
      } else if (storyData.category === 'enfance') {
        starColor = '#FEF08A';
        baseSize = 3.8;
        twinkleSpeed = 0.04;
      } else if (storyData.category === 'solitude') {
        starColor = '#CBD5E1';
        baseSize = 3.2;
        twinkleSpeed = 0.018;
      } else if (storyData.category === 'espoir') {
        starColor = '#E0F2FE';
        baseSize = 4.2;
        twinkleSpeed = 0.032;
      } else if (storyData.category === 'réflexion') {
        starColor = '#EDE9FE';
        baseSize = 3.7;
        twinkleSpeed = 0.022;
      }

      stars.push({
        id,
        x: pos.x,
        y: pos.y,
        z: 1.0 + Math.random() * 0.5,
        baseSize,
        baseBrightness: 0.95,
        color: starColor,
        twinkleSpeed,
        twinklePhase: Math.random() * Math.PI * 2,
        type: 'bright',
        story: {
          id,
          ...storyData,
        },
        hasStory: true,
        trailLength: 3,
        driftVx: (Math.random() - 0.5) * 0.025,
        driftVy: (Math.random() - 0.5) * 0.025,
      });

      singleStoryIndex++;
    }
  });

  // --------------------------------------------------------------------------
  // 2. ⭐⭐ ÉTOILES DOUBLES — LES RELATIONS (52 couples avec messages reliés)
  // --------------------------------------------------------------------------
  let binaryPairIndex = 0;

  ZONES.forEach((zone) => {
    for (let i = 0; i < zone.binaryCount && binaryPairIndex < BINARY_STORY_PAIRS.length; i++) {
      const pair = BINARY_STORY_PAIRS[binaryPairIndex];
      const centerPair = getSpacedPosition(zone.rMin, zone.rMax, 110);

      const orbitRadius = (pair.orbitRadius || 55) * 0.5;
      const pairAngle = Math.random() * Math.PI * 2;

      const orbitSpeed =
        pair.relationType === 'diverging'
          ? 0.08 + Math.random() * 0.04
          : pair.relationType === 'distant'
          ? 0.06 + Math.random() * 0.04
          : 0.14 + Math.random() * 0.06;

      let colorA = '#FDF6E8';
      let colorB = '#E8F0FE';
      if (pair.relationType === 'diverging') {
        colorA = '#FFE4E6';
        colorB = '#E0E7FF';
      } else if (pair.relationType === 'distant') {
        colorA = '#FDE68A';
        colorB = '#E2E8F0';
      }

      const starA: Star = {
        id: pair.idA,
        x: centerPair.x + Math.cos(pairAngle) * orbitRadius,
        y: centerPair.y + Math.sin(pairAngle) * orbitRadius,
        z: 1.1 + Math.random() * 0.3,
        baseSize: 3.6,
        baseBrightness: 0.95,
        color: colorA,
        twinkleSpeed: 0.02 + Math.random() * 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
        type: 'binary',
        story: {
          id: pair.idA,
          ...pair.storyA,
          title: pair.title,
          companionStoryId: pair.idB,
          sharedInsight: pair.sharedInsight,
        },
        partnerId: pair.idB,
        hasStory: true,
        trailLength: 2,
        orbitCenter: { x: centerPair.x, y: centerPair.y },
        orbitRadius,
        orbitAngle: pairAngle,
        orbitSpeed,
        relationType: pair.relationType,
      };

      const starB: Star = {
        id: pair.idB,
        x: centerPair.x + Math.cos(pairAngle + Math.PI) * orbitRadius,
        y: centerPair.y + Math.sin(pairAngle + Math.PI) * orbitRadius,
        z: 1.1 + Math.random() * 0.3,
        baseSize: 3.4,
        baseBrightness: 0.92,
        color: colorB,
        twinkleSpeed: 0.02 + Math.random() * 0.02,
        twinklePhase: starA.twinklePhase + Math.PI / 2,
        type: 'binary',
        story: {
          id: pair.idB,
          ...pair.storyB,
          title: pair.title,
          companionStoryId: pair.idA,
          sharedInsight: pair.sharedInsight,
        },
        partnerId: pair.idA,
        hasStory: true,
        trailLength: 2,
        orbitCenter: { x: centerPair.x, y: centerPair.y },
        orbitRadius,
        orbitAngle: pairAngle + Math.PI,
        orbitSpeed,
        relationType: pair.relationType,
      };

      stars.push(starA, starB);
      binaryPairIndex++;
    }
  });

  // --------------------------------------------------------------------------
  // 3. ÉTOILES DE FOND (2340 étoiles réparties avec une densité homogène parfaite)
  // --------------------------------------------------------------------------
  ZONES.forEach((zone) => {
    for (let i = 0; i < zone.bgCount; i++) {
      starCounter++;
      const pos = sampleAnnulus(zone.rMin, zone.rMax);
      const z = 0.2 + Math.random() * 1.5;

      const isMidDepth = z > 0.8;
      const baseSize = isMidDepth
        ? 1.2 + Math.random() * 1.2
        : 0.6 + Math.random() * 0.8;

      const baseBrightness = isMidDepth
        ? 0.45 + Math.random() * 0.45
        : 0.2 + Math.random() * 0.35;

      const color = STAR_PALETTE[Math.floor(Math.random() * STAR_PALETTE.length)];

      stars.push({
        id: `bg-${starCounter}`,
        x: pos.x,
        y: pos.y,
        z,
        baseSize,
        baseBrightness,
        color,
        twinkleSpeed: 0.01 + Math.random() * 0.035,
        twinklePhase: Math.random() * Math.PI * 2,
        type: 'ordinary',
        hasStory: false,
      });
    }
  });

  return stars;
}

/**
 * Universal export supporting both:
 * 1. `const stars = generateFullUniverse();` (array access)
 * 2. `const { stars, constellations } = generateFullUniverse();` (object destructuring)
 */
export function generateFullUniverse() {
  const stars = generateUniverse();
  return Object.assign(stars, {
    stars,
    constellations: [] as any[],
    satellites: [] as any[],
    blackHoles: [] as any[],
    planets: [] as any[],
  });
}
