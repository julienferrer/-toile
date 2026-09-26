import { Star } from '../types/universe';
import {
  PIVOTAL_STORIES,
  ORDINARY_STORIES,
  SPARKLING_STORIES,
  BINARY_STORY_PAIRS,
  EPHEMERAL_TEXTS,
} from '../data/stories';

export const UNIVERSE_RADIUS = 3600; // Radius in world coordinates

const STAR_PALETTE = [
  '#FFFFFF', // Pure stellar white
  '#F4F7FF', // Cool white
  '#FFF8EE', // Warm white
  '#E0E8F8', // Pale celestial blue
  '#EAE4F8', // Subtle starlight lavender
  '#FDF2D6', // Soft gold
  '#CDE0F7', // Deep sky tint
];

/**
 * Samples a point uniformly in a 2D circular disk annulus [rMin, rMax].
 * Using r = sqrt(rMin^2 + U * (rMax^2 - rMin^2)) guarantees flat, uniform surface density,
 * preventing any artificial bunching at the center.
 */
function sampleUniformDisk(rMin: number, rMax: number): { x: number; y: number } {
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

  // Track placed interactive coordinates to prevent overlapping stars
  const placedInteractiveCenters: { x: number; y: number }[] = [];

  function getSpacedInteractivePosition(rMin: number, rMax: number, minDistance = 75): { x: number; y: number } {
    for (let attempt = 0; attempt < 40; attempt++) {
      const pos = sampleUniformDisk(rMin, rMax);
      const isTooClose = placedInteractiveCenters.some(
        (p) => Math.hypot(p.x - pos.x, p.y - pos.y) < minDistance
      );
      if (!isTooClose) {
        placedInteractiveCenters.push(pos);
        return pos;
      }
    }
    const fallback = sampleUniformDisk(rMin, rMax);
    placedInteractiveCenters.push(fallback);
    return fallback;
  }

  // 1. Generate Binary Star Pairs (Couples d'étoiles gravitant l'une autour de l'autre)
  // Distributed equitably from 200px to 3300px across the entire cosmos
  BINARY_STORY_PAIRS.forEach((pair) => {
    const centerPair = getSpacedInteractivePosition(200, 3300, 130);
    const orbitRadius = (pair.orbitRadius || 60) * 0.5; // Radius of each star from barycenter
    const pairAngle = Math.random() * Math.PI * 2;

    // Distinct orbit speeds depending on relationship type
    const orbitSpeed =
      pair.relationType === 'diverging'
        ? 0.09 + Math.random() * 0.05
        : pair.relationType === 'distant'
        ? 0.07 + Math.random() * 0.05
        : 0.15 + Math.random() * 0.08;

    // Harmonious/Separation/Distant color variations
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
      baseSize: 3.3,
      baseBrightness: 0.92,
      color: colorA,
      twinkleSpeed: 0.02 + Math.random() * 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
      type: 'binary',
      story: {
        id: pair.idA,
        ...pair.storyA,
        companionStoryId: pair.idB,
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
      baseSize: 3.1,
      baseBrightness: 0.9,
      color: colorB,
      twinkleSpeed: 0.02 + Math.random() * 0.02,
      twinklePhase: starA.twinklePhase + Math.PI / 2, // Slight offset twinkle
      type: 'binary',
      story: {
        id: pair.idB,
        ...pair.storyB,
        companionStoryId: pair.idA,
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
  });

  // 2. Generate Ephemeral Stars (Vies éphémères réparties équitablement)
  for (let i = 0; i < 12; i++) {
    const pos = getSpacedInteractivePosition(250, 3350, 95);
    const starId = `ephemeral-${i}`;

    stars.push({
      id: starId,
      x: pos.x,
      y: pos.y,
      z: 1.0 + Math.random() * 0.4,
      baseSize: 3.4,
      baseBrightness: 0.95,
      color: '#EDE8FF',
      twinkleSpeed: 0.03,
      twinklePhase: Math.random() * Math.PI * 2,
      type: 'ephemeral',
      story: {
        id: starId,
        text: EPHEMERAL_TEXTS.initial,
        category: 'éphémère',
        categoryLabel: 'Lumière éphémère',
        subtext: EPHEMERAL_TEXTS.afterglow,
      },
      hasStory: true,
      trailLength: 3,
      driftVx: (Math.random() - 0.5) * 0.05,
      driftVy: (Math.random() - 0.5) * 0.05,
    });
  }

  // 3. Generate Pivotal / Bright Stars (Grandes existences réparties sur toute la carte)
  PIVOTAL_STORIES.forEach((storyData, idx) => {
    const pos = getSpacedInteractivePosition(150, 3400, 80);
    const id = `pivotal-${idx}`;

    stars.push({
      id,
      x: pos.x,
      y: pos.y,
      z: 1.2 + Math.random() * 0.6,
      baseSize: 3.8 + Math.random() * 1.4,
      baseBrightness: 0.96,
      color: idx % 2 === 0 ? '#FFFFFF' : '#FFF4DE',
      twinkleSpeed: 0.02 + Math.random() * 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
      type: 'bright',
      story: {
        id,
        ...storyData,
      },
      hasStory: true,
      trailLength: 4,
      driftVx: (Math.random() - 0.5) * 0.04,
      driftVy: (Math.random() - 0.5) * 0.04,
    });
  });

  // 4. Generate Ordinary Moment Stars (Petites étoiles ordinaires réparties partout)
  ORDINARY_STORIES.forEach((storyData, idx) => {
    const pos = getSpacedInteractivePosition(150, 3450, 68);
    const id = `ordinary-${idx}`;

    stars.push({
      id,
      x: pos.x,
      y: pos.y,
      z: 0.7 + Math.random() * 0.5,
      baseSize: 2.3 + Math.random() * 0.8,
      baseBrightness: 0.78,
      color: '#E8EFFB',
      twinkleSpeed: 0.015 + Math.random() * 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
      type: 'ordinary',
      story: {
        id,
        ...storyData,
      },
      hasStory: true,
      trailLength: 1,
      driftVx: (Math.random() - 0.5) * 0.03,
      driftVy: (Math.random() - 0.5) * 0.03,
    });
  });

  // 5. Generate Sparkling Memory Stars (Étoiles scintillantes réparties partout)
  SPARKLING_STORIES.forEach((storyData, idx) => {
    const pos = getSpacedInteractivePosition(180, 3400, 75);
    const id = `sparkling-${idx}`;

    stars.push({
      id,
      x: pos.x,
      y: pos.y,
      z: 0.9 + Math.random() * 0.6,
      baseSize: 2.8 + Math.random() * 1.0,
      baseBrightness: 0.88,
      color: '#F4EAFF',
      twinkleSpeed: 0.06 + Math.random() * 0.05, // Faster shimmering
      twinklePhase: Math.random() * Math.PI * 2,
      type: 'sparkling',
      story: {
        id,
        ...storyData,
      },
      hasStory: true,
      trailLength: 2,
      driftVx: (Math.random() - 0.5) * 0.04,
      driftVy: (Math.random() - 0.5) * 0.04,
    });
  });

  // 6. Generate Background Anonymous Stars (2600 stars distributed uniformly across the entire universe)
  // Uniform area density: r = sqrt(random) * UNIVERSE_RADIUS
  const totalBackground = 2600;
  for (let i = 0; i < totalBackground; i++) {
    starCounter++;
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * UNIVERSE_RADIUS;
    const z = 0.2 + Math.random() * 1.5; // Depth factor

    const isMidDepth = z > 0.8;
    const baseSize = isMidDepth ? 1.2 + Math.random() * 1.4 : 0.6 + Math.random() * 0.8;
    const color = STAR_PALETTE[Math.floor(Math.random() * STAR_PALETTE.length)];

    stars.push({
      id: `star-bg-${starCounter}`,
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
      z,
      baseSize,
      baseBrightness: 0.3 + Math.random() * 0.5,
      color,
      twinkleSpeed: 0.01 + Math.random() * 0.03,
      twinklePhase: Math.random() * Math.PI * 2,
      type: 'ordinary',
      hasStory: false,
      trailLength: Math.random() > 0.85 ? 1 + Math.floor(Math.random() * 3) : 0,
      driftVx: (Math.random() - 0.5) * 0.02,
      driftVy: (Math.random() - 0.5) * 0.02,
    });
  }

  return stars;
}
