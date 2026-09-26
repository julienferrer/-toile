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

// Concentric celestial zones guaranteeing rich visibility from startup to deep space
const ZONES = [
  { rMin: 70, rMax: 520 },    // Zone 1: Starting screen field of view
  { rMin: 520, rMax: 1350 },  // Zone 2: Inner-mid exploration
  { rMin: 1350, rMax: 2380 }, // Zone 3: Outer expanse
  { rMin: 2380, rMax: 3450 }, // Zone 4: Far cosmic frontier
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

  // Track placed interactive coordinates to prevent collision
  const placedInteractiveCenters: { x: number; y: number }[] = [];

  function getSpacedInteractivePosition(
    rMin: number,
    rMax: number,
    minDistance = 65
  ): { x: number; y: number } {
    for (let attempt = 0; attempt < 35; attempt++) {
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

  // 1. Generate Binary Star Pairs equitably across all 4 zones
  // 5 in Zone 1, 6 in Zone 2, 5 in Zone 3, 4 in Zone 4
  const binaryZoneDistribution = [
    ...Array(5).fill(0),
    ...Array(6).fill(1),
    ...Array(5).fill(2),
    ...Array(4).fill(3),
  ];

  BINARY_STORY_PAIRS.forEach((pair, idx) => {
    const zoneIndex = binaryZoneDistribution[idx % binaryZoneDistribution.length];
    const { rMin, rMax } = ZONES[zoneIndex];
    const centerPair = getSpacedInteractivePosition(rMin, rMax, 110);

    const orbitRadius = (pair.orbitRadius || 60) * 0.5;
    const pairAngle = Math.random() * Math.PI * 2;

    const orbitSpeed =
      pair.relationType === 'diverging'
        ? 0.09 + Math.random() * 0.05
        : pair.relationType === 'distant'
        ? 0.07 + Math.random() * 0.05
        : 0.15 + Math.random() * 0.08;

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
      baseSize: 3.4,
      baseBrightness: 0.95,
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
      baseSize: 3.2,
      baseBrightness: 0.92,
      color: colorB,
      twinkleSpeed: 0.02 + Math.random() * 0.02,
      twinklePhase: starA.twinklePhase + Math.PI / 2,
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

  // 2. Generate Ephemeral Stars (3 in each of the 4 zones)
  for (let i = 0; i < 12; i++) {
    const zoneIndex = i % 4;
    const { rMin, rMax } = ZONES[zoneIndex];
    const pos = getSpacedInteractivePosition(rMin, rMax, 80);
    const starId = `ephemeral-${i}`;

    stars.push({
      id: starId,
      x: pos.x,
      y: pos.y,
      z: 1.0 + Math.random() * 0.4,
      baseSize: 3.4,
      baseBrightness: 0.95,
      color: '#E0E7FF',
      twinkleSpeed: 0.03 + Math.random() * 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
      type: 'ephemeral',
      story: {
        id: starId,
        text: EPHEMERAL_TEXTS.initial,
        category: 'ordinaire',
        categoryLabel: 'Éphémère',
      },
      hasStory: true,
      trailLength: 3,
      driftVx: (Math.random() - 0.5) * 0.04,
      driftVy: (Math.random() - 0.5) * 0.04,
    });
  }

  // 3. Generate Pivotal / Bright Stars distributed across all zones
  PIVOTAL_STORIES.forEach((storyData, idx) => {
    const zoneIndex = idx % 4;
    const { rMin, rMax } = ZONES[zoneIndex];
    const pos = getSpacedInteractivePosition(rMin, rMax, 70);
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
      driftVx: (Math.random() - 0.5) * 0.03,
      driftVy: (Math.random() - 0.5) * 0.03,
    });
  });

  // 4. Generate Ordinary Moment Stars distributed across all zones
  ORDINARY_STORIES.forEach((storyData, idx) => {
    const zoneIndex = idx % 4;
    const { rMin, rMax } = ZONES[zoneIndex];
    const pos = getSpacedInteractivePosition(rMin, rMax, 60);
    const id = `ordinary-${idx}`;

    stars.push({
      id,
      x: pos.x,
      y: pos.y,
      z: 0.7 + Math.random() * 0.5,
      baseSize: 2.4 + Math.random() * 0.8,
      baseBrightness: 0.82,
      color: '#E8EFFB',
      twinkleSpeed: 0.015 + Math.random() * 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
      type: 'ordinary',
      story: {
        id,
        ...storyData,
      },
      hasStory: true,
      trailLength: 2,
    });
  });

  // 5. Generate Sparkling Memory Stars distributed across all zones
  SPARKLING_STORIES.forEach((storyData, idx) => {
    const zoneIndex = idx % 4;
    const { rMin, rMax } = ZONES[zoneIndex];
    const pos = getSpacedInteractivePosition(rMin, rMax, 65);
    const id = `sparkling-${idx}`;

    stars.push({
      id,
      x: pos.x,
      y: pos.y,
      z: 0.9 + Math.random() * 0.6,
      baseSize: 2.8 + Math.random() * 1.0,
      baseBrightness: 0.9,
      color: '#F4EAFF',
      twinkleSpeed: 0.06 + Math.random() * 0.05,
      twinklePhase: Math.random() * Math.PI * 2,
      type: 'sparkling',
      story: {
        id,
        ...storyData,
      },
      hasStory: true,
      trailLength: 3,
    });
  });

  // 6. Generate Background Anonymous Stars (2600 stars distributed across all zones)
  // Ensures visible star density at center and extends rich field to cosmos boundary
  const bgZoneCounts = [550, 750, 750, 550];
  bgZoneCounts.forEach((count, zoneIdx) => {
    const { rMin, rMax } = ZONES[zoneIdx];
    for (let i = 0; i < count; i++) {
      starCounter++;
      const pos = sampleAnnulus(rMin, rMax);
      const z = 0.2 + Math.random() * 1.5;

      const isMidDepth = z > 0.8;
      const baseSize = isMidDepth
        ? 1.3 + Math.random() * 1.2
        : 0.7 + Math.random() * 0.8;

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
