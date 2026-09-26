export type StarType = 'bright' | 'ordinary' | 'sparkling' | 'ephemeral' | 'binary' | 'custom';

export type StoryCategory = 
  | 'naissance'
  | 'amour'
  | 'famille'
  | 'amitié'
  | 'séparation'
  | 'changement'
  | 'inconnu'
  | 'solitude'
  | 'perte'
  | 'découverte'
  | 'espoir'
  | 'peur'
  | 'réussite'
  | 'échec'
  | 'souvenirs'
  | 'rêves'
  | 'ordinaire'
  | 'lien'
  | 'éphémère';

export interface Story {
  id: string;
  text: string;
  category: StoryCategory;
  categoryLabel?: string;
  subtext?: string;
  companionStoryId?: string; // For binary stars
  isOrdinary?: boolean;
  isPivotal?: boolean;
}

export interface Star {
  id: string;
  x: number; // World coordinates
  y: number;
  z: number; // Depth 0.2 (distant) to 2.0 (very close)
  baseSize: number;
  baseBrightness: number;
  color: string; // Hex or hsla
  twinkleSpeed: number;
  twinklePhase: number;
  type: StarType;
  story?: Story;
  partnerId?: string; // If binary star
  hasStory: boolean;
  isDiscovered?: boolean;
  isVanished?: boolean; // For ephemeral stars after fading
  vanishProgress?: number; // 0 to 1
  ringPulseRadius?: number; // Traveling photon ripple
  trailLength?: number;
  driftVx?: number;
  driftVy?: number;
  // Binary orbital dynamics
  orbitCenter?: { x: number; y: number };
  orbitRadius?: number;
  orbitAngle?: number;
  orbitSpeed?: number;
  relationType?: 'harmonious' | 'diverging' | 'distant';
}

export interface ShootingStarTrailPoint {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export interface ShootingStar {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  currentX: number;
  currentY: number;
  speed: number;
  progress: number; // 0 to 1
  duration: number; // in seconds (1.5 to 4s)
  elapsed: number;
  text: string;
  isNostalgic?: boolean;
  isFinalMoment?: boolean;
  isCaught: boolean;
  caughtTimer: number; // remaining pause time when caught
  isFadingOut: boolean;
  fadeAlpha: number;
  trailPoints: ShootingStarTrailPoint[];
  color: string;
}

export interface UniverseState {
  cameraX: number;
  cameraY: number;
  cameraZoom: number;
  targetCameraX: number;
  targetCameraY: number;
  targetCameraZoom: number;
  cursorWorldX: number;
  cursorWorldY: number;
  cursorScreenX: number;
  cursorScreenY: number;
  isCursorInside: boolean;
  hoveredStarId: string | null;
  selectedStar: Star | null;
  discoveredCount: number;
  totalStoriesCount: number;
}
