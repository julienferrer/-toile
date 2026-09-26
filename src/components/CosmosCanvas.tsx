import React, { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Star } from '../types/universe';
import { spaceAudio } from '../audio/spaceAudio';
import {
  SHOOTING_STAR_STORIES,
  NOSTALGIC_SHOOTING_STAR_STORIES,
  FINAL_SHOOTING_STAR_SEQUENCE,
} from '../data/stories';

export interface CosmosCanvasHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomWide: () => void;
  resetZoom: () => void;
  spawnShootingStar: () => void;
}

interface CosmosCanvasProps {
  stars: Star[];
  selectedStarId: string | null;
  onSelectStar: (star: Star) => void;
  isEndingActive: boolean;
  endingPhase: number;
  discoveredCount: number;
  onCaughtShootingStar: (data: { text: string; isNostalgic?: boolean }) => void;
  onMissedShootingStar: () => void;
  onFinalShootingStarComplete: () => void;
}

interface ActiveShootingStar {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  currentX: number;
  currentY: number;
  progress: number;
  duration: number;
  elapsed: number;
  text: string;
  isNostalgic: boolean;
  isFinal: boolean;
  isCaught: boolean;
  caughtTimer: number;
  hasNearMiss: boolean;
  color: string;
  trailPoints: { x: number; y: number; alpha: number; size: number }[];
  sparks: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string }[];
}

export const CosmosCanvas = forwardRef<CosmosCanvasHandle, CosmosCanvasProps>(
  (
    {
      stars,
      selectedStarId,
      onSelectStar,
      isEndingActive,
      endingPhase,
      discoveredCount,
      onCaughtShootingStar,
      onMissedShootingStar,
      onFinalShootingStarComplete,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Viewport and Camera state
    const cameraRef = useRef({
      x: 0,
      y: 0,
      zoom: 0.9,
      targetX: 0,
      targetY: 0,
      targetZoom: 0.9,
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      cameraStartX: 0,
      cameraStartY: 0,
      hasMovedDuringClick: false,
    });

    // Shooting stars state
    const shootingStarsRef = useRef<ActiveShootingStar[]>([]);
    const dissipatingSparksRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string }[]>([]);
    const nextShootingStarTimeRef = useRef<number>(performance.now() + 8000);
    const hasTriggeredFinalShootingStarRef = useRef<boolean>(false);

    // Spawning function for shooting stars
    const spawnShootingStar = useCallback((isFinal: boolean = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Trajectory: diagonal crossing the visible field
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.45;
      const travelDist = Math.max(width, height) * (isFinal ? 1.25 : 0.85 + Math.random() * 0.4);

      // Start from top or top-left
      const startFromTop = Math.random() > 0.4;
      let sx: number, sy: number;
      if (startFromTop) {
        sx = Math.random() * (width * 0.75);
        sy = -25;
      } else {
        sx = -25;
        sy = Math.random() * (height * 0.45);
      }

      const ex = sx + Math.cos(angle) * travelDist;
      const ey = sy + Math.sin(angle) * travelDist;

      const isNostalgic = !isFinal && Math.random() < 0.22;
      let text = '';
      if (isFinal) {
        text = FINAL_SHOOTING_STAR_SEQUENCE.starText;
      } else if (isNostalgic) {
        text = NOSTALGIC_SHOOTING_STAR_STORIES[Math.floor(Math.random() * NOSTALGIC_SHOOTING_STAR_STORIES.length)];
      } else {
        text = SHOOTING_STAR_STORIES[Math.floor(Math.random() * SHOOTING_STAR_STORIES.length)];
      }

      const duration = isFinal ? 8.5 : 4.6 + Math.random() * 2.2;
      const color = isNostalgic ? '#FDE68A' : '#FFFFFF';

      shootingStarsRef.current.push({
        id: `shooting-${Date.now()}-${Math.random()}`,
        startX: sx,
        startY: sy,
        endX: ex,
        endY: ey,
        currentX: sx,
        currentY: sy,
        progress: 0,
        duration,
        elapsed: 0,
        text,
        isNostalgic,
        isFinal,
        isCaught: false,
        caughtTimer: 0,
        hasNearMiss: false,
        color,
        trailPoints: [],
        sparks: [],
      });

      spaceAudio.playShootingStarFlyby();
    }, []);

    useImperativeHandle(ref, () => ({
      zoomIn: () => {
        const cam = cameraRef.current;
        cam.targetZoom = Math.min(2.5, cam.targetZoom * 1.35);
      },
      zoomOut: () => {
        const cam = cameraRef.current;
        cam.targetZoom = Math.max(0.12, cam.targetZoom * 0.72);
      },
      zoomWide: () => {
        const cam = cameraRef.current;
        cam.targetZoom = 0.18;
        cam.targetX = 0;
        cam.targetY = 0;
      },
      resetZoom: () => {
        const cam = cameraRef.current;
        cam.targetZoom = 0.9;
        cam.targetX = 0;
        cam.targetY = 0;
      },
      spawnShootingStar: () => {
        spawnShootingStar(false);
      },
    }));

  // Cursor & Parallax state
  const mouseRef = useRef({
    screenX: window.innerWidth / 2,
    screenY: window.innerHeight / 2,
    targetScreenX: window.innerWidth / 2,
    targetScreenY: window.innerHeight / 2,
    normX: 0, // -1 to 1
    normY: 0,
    smoothNormX: 0,
    smoothNormY: 0,
    isHoveringStar: false,
    isInside: true,
  });

  // Touch gesture state for mobile pinch-to-zoom
  const touchStateRef = useRef<{
    initialDistance: number | null;
    initialZoom: number;
  }>({
    initialDistance: null,
    initialZoom: 0.9,
  });

  // Genesis appearance (visible immediately, smooth blossom)
  const genesisProgressRef = useRef<number>(0.6);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Handle Resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Adjust camera when Ending sequence triggers
  useEffect(() => {
    if (isEndingActive) {
      const cam = cameraRef.current;
      cam.targetX = 0;
      cam.targetY = 0;
      cam.targetZoom = 0.22; // Majestic deep space wide view
    }
  }, [isEndingActive]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = (time: number) => {
      if (!isRunning) return;
      const prevTime = lastTimeRef.current || time;
      const dt = Math.max(0.001, Math.min((time - prevTime) / 1000, 0.1));
      lastTimeRef.current = time;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // 1. Progress Genesis appearance
      if (genesisProgressRef.current < 1) {
        genesisProgressRef.current = Math.min(1, genesisProgressRef.current + dt * 0.35);
      }

      // 2. Smooth camera motion
      const cam = cameraRef.current;
      const lerpSpeed = isEndingActive ? 0.025 : 0.07;
      cam.x += (cam.targetX - cam.x) * lerpSpeed;
      cam.y += (cam.targetY - cam.y) * lerpSpeed;
      cam.zoom += (cam.targetZoom - cam.zoom) * lerpSpeed;

      // 3. Smooth mouse parallax
      const mouse = mouseRef.current;
      mouse.screenX += (mouse.targetScreenX - mouse.screenX) * 0.08;
      mouse.screenY += (mouse.targetScreenY - mouse.screenY) * 0.08;
      mouse.smoothNormX += (mouse.normX - mouse.smoothNormX) * 0.04;
      mouse.smoothNormY += (mouse.normY - mouse.smoothNormY) * 0.04;

      // 4. Clear Canvas & Draw Deep Cosmic Void
      ctx.save();
      ctx.scale(dpr, dpr);

      // Pitch black base
      ctx.fillStyle = '#010205';
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric celestial nebulas in background
      const nebulaPulse = Math.sin(time * 0.0003) * 0.04;
      
      // Nebular core 1: deep cosmic indigo
      const neb1 = ctx.createRadialGradient(
        width * 0.45 + mouse.smoothNormX * 40,
        height * 0.5 + mouse.smoothNormY * 40,
        50,
        width * 0.45,
        height * 0.5,
        width * 0.75
      );
      neb1.addColorStop(0, `rgba(10, 16, 38, ${0.45 + nebulaPulse})`);
      neb1.addColorStop(0.5, `rgba(7, 9, 22, ${0.25 + nebulaPulse})`);
      neb1.addColorStop(1, 'rgba(1, 2, 5, 0)');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      // Nebular core 2: subtle starlight violet
      const neb2 = ctx.createRadialGradient(
        width * 0.65 - mouse.smoothNormX * 30,
        height * 0.4 - mouse.smoothNormY * 30,
        30,
        width * 0.65,
        height * 0.4,
        width * 0.6
      );
      neb2.addColorStop(0, `rgba(16, 10, 32, ${0.35 + nebulaPulse})`);
      neb2.addColorStop(0.6, `rgba(9, 6, 20, ${0.15 + nebulaPulse})`);
      neb2.addColorStop(1, 'rgba(1, 2, 5, 0)');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      // 5. Cursor Light Lantern / Subtle celestial aura revealing the universe
      if (mouse.isInside && !isEndingActive) {
        const lanternRadius = Math.max(160, Math.min(width, height) * 0.28);
        const lanternGrad = ctx.createRadialGradient(
          mouse.screenX,
          mouse.screenY,
          0,
          mouse.screenX,
          mouse.screenY,
          lanternRadius
        );
        lanternGrad.addColorStop(0, 'rgba(230, 240, 255, 0.07)');
        lanternGrad.addColorStop(0.4, 'rgba(160, 190, 255, 0.03)');
        lanternGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = lanternGrad;
        ctx.beginPath();
        ctx.arc(mouse.screenX, mouse.screenY, lanternRadius, 0, Math.PI * 2);
        ctx.fill();

        // Tiny pointer starlight dot
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.beginPath();
        ctx.arc(mouse.screenX, mouse.screenY, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 6. Transform World Coordinate Space
      ctx.save();
      const centerX = width / 2;
      const centerY = height / 2;

      // Overall global genesis fade
      const genesisAlpha = genesisProgressRef.current;

      // Ending fade factor
      let endingAlpha = 1;
      if (isEndingActive && endingPhase >= 4) {
        // Black screen fade before the final lone star
        endingAlpha = endingPhase === 4 ? Math.max(0, 1 - (time % 2000) / 1000) : 0;
      }

      ctx.globalAlpha = genesisAlpha * endingAlpha;

      // 7. Draw Binary Threads first (under stars)
      stars.forEach((star) => {
        if (star.type === 'binary' && star.partnerId) {
          const partner = stars.find((s) => s.id === star.partnerId);
          if (partner && star.id < partner.id) {
            // Screen positions
            const zFactorA = star.z;
            const parallaxXA = -mouse.smoothNormX * (35 * zFactorA);
            const parallaxYA = -mouse.smoothNormY * (35 * zFactorA);
            const sxA = centerX + (star.x - cam.x + parallaxXA) * cam.zoom;
            const syA = centerY + (star.y - cam.y + parallaxYA) * cam.zoom;

            const zFactorB = partner.z;
            const parallaxXB = -mouse.smoothNormX * (35 * zFactorB);
            const parallaxYB = -mouse.smoothNormY * (35 * zFactorB);
            const sxB = centerX + (partner.x - cam.x + parallaxXB) * cam.zoom;
            const syB = centerY + (partner.y - cam.y + parallaxYB) * cam.zoom;

            const isPairSelected = selectedStarId === star.id || selectedStarId === partner.id;

            // Render delicate gravitational filament
            ctx.beginPath();
            if (star.relationType === 'diverging') {
              ctx.setLineDash([4, 6]);
              ctx.strokeStyle = isPairSelected
                ? 'rgba(255, 195, 205, 0.7)'
                : 'rgba(225, 180, 195, 0.22)';
            } else if (star.relationType === 'distant') {
              ctx.setLineDash([2, 5]);
              ctx.strokeStyle = isPairSelected
                ? 'rgba(215, 230, 255, 0.65)'
                : 'rgba(180, 205, 235, 0.2)';
            } else {
              ctx.setLineDash([]);
              ctx.strokeStyle = isPairSelected
                ? 'rgba(255, 245, 220, 0.7)'
                : 'rgba(225, 238, 255, 0.25)';
            }
            ctx.moveTo(sxA, syA);
            ctx.lineTo(sxB, syB);
            ctx.lineWidth = isPairSelected ? 1.6 : 0.8;
            ctx.stroke();
            ctx.setLineDash([]); // Reset line dash

            // Subtle pulsing mid-node
            const midX = (sxA + sxB) / 2;
            const midY = (syA + syB) / 2;
            const pulse = (Math.sin(time * 0.002) + 1) * 0.5;
            ctx.fillStyle = isPairSelected
              ? (star.relationType === 'diverging'
                  ? `rgba(255, 195, 205, ${0.4 + pulse * 0.4})`
                  : `rgba(255, 240, 220, ${0.4 + pulse * 0.4})`)
              : `rgba(180, 200, 240, ${0.1 + pulse * 0.15})`;
            ctx.beginPath();
            ctx.arc(midX, midY, isPairSelected ? 2.4 : 1.3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // 8. Draw Stars
      let hoveredFound = false;

      stars.forEach((star) => {
        // Ephemeral star animation handling
        if (star.isVanished) {
          // Draw expanding photon ring / light ripple
          if (star.ringPulseRadius !== undefined && star.ringPulseRadius < 180) {
            star.ringPulseRadius += dt * 38;
            const ringAlpha = Math.max(0, 1 - star.ringPulseRadius / 180) * 0.5;

            const zFactor = star.z;
            const parallaxX = -mouse.smoothNormX * (35 * zFactor);
            const parallaxY = -mouse.smoothNormY * (35 * zFactor);
            const sx = centerX + (star.x - cam.x + parallaxX) * cam.zoom;
            const sy = centerY + (star.y - cam.y + parallaxY) * cam.zoom;

            ctx.beginPath();
            ctx.arc(sx, sy, star.ringPulseRadius * cam.zoom, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(220, 230, 255, ${ringAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          return;
        }

        // Orbital motion for binary star pairs, or slow ambient drift
        if (star.orbitCenter && star.orbitRadius !== undefined && star.orbitAngle !== undefined && star.orbitSpeed) {
          const currentAngle = star.orbitAngle + time * 0.0006 * star.orbitSpeed;
          let r = star.orbitRadius;
          if (star.relationType === 'diverging') {
            r += Math.sin(time * 0.0003 + star.twinklePhase) * 12;
          }
          star.x = star.orbitCenter.x + Math.cos(currentAngle) * r;
          star.y = star.orbitCenter.y + Math.sin(currentAngle) * r;
        } else if (star.driftVx && star.driftVy) {
          star.x += star.driftVx * dt * 60;
          star.y += star.driftVy * dt * 60;
        }

        // Depth & Parallax calculation:
        // Stars close to cursor move noticeably, distant stars barely budge
        const zFactor = star.z;
        const parallaxX = -mouse.smoothNormX * (35 * zFactor);
        const parallaxY = -mouse.smoothNormY * (35 * zFactor);

        const sx = centerX + (star.x - cam.x + parallaxX) * cam.zoom;
        const sy = centerY + (star.y - cam.y + parallaxY) * cam.zoom;

        // Viewport culling with safe margin
        const margin = 80;
        if (sx < -margin || sx > width + margin || sy < -margin || sy > height + margin) {
          return;
        }

        const isSelected = selectedStarId === star.id;

        // Mouse distance for lantern lighting & hover detection
        const distToCursor = Math.hypot(sx - mouse.screenX, sy - mouse.screenY);
        const inLantern = distToCursor < 200;
        const lanternInfluence = inLantern ? (1 - distToCursor / 200) * 0.45 : 0;

        // Hover test for interactive stars
        let isHovered = false;
        if (star.hasStory && distToCursor < 18 && !mouse.isHoveringStar) {
          isHovered = true;
          hoveredFound = true;
        }

        // Twinkle luminance calculation
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        let starAlpha = star.baseBrightness + twinkle * 0.2 + lanternInfluence;
        if (isSelected) starAlpha = 1.0;
        starAlpha = Math.max(0.15, Math.min(1.0, starAlpha));

        // Effective star visual size
        let renderSize = star.baseSize * Math.max(0.4, Math.min(2.5, cam.zoom * (zFactor * 0.8 + 0.3)));
        if (isSelected) renderSize *= 1.6;
        else if (isHovered) renderSize *= 1.35;

        // Draw luminous trail for selected or swift stars
        if (star.trailLength && star.trailLength > 0 && cam.zoom > 0.45) {
          const trailDx = mouse.smoothNormX * star.trailLength * 3 * zFactor;
          const trailDy = mouse.smoothNormY * star.trailLength * 3 * zFactor;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx + trailDx, sy + trailDy);
          ctx.strokeStyle = `rgba(200, 220, 255, ${starAlpha * 0.25})`;
          ctx.lineWidth = renderSize * 0.4;
          ctx.stroke();
        }

        // Draw soft halo for bright, interactive or selected stars
        if (isSelected || star.type === 'bright' || isHovered || star.type === 'binary') {
          const haloRadius = renderSize * (isSelected ? 5.5 : isHovered ? 4.0 : 3.2);
          const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, haloRadius);
          const haloColor = isSelected
            ? 'rgba(255, 245, 230, 0.45)'
            : isHovered
            ? 'rgba(230, 240, 255, 0.3)'
            : 'rgba(200, 220, 255, 0.15)';
          halo.addColorStop(0, haloColor);
          halo.addColorStop(0.6, haloColor.replace(/[\d.]+\)$/, '0.04)'));
          halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(sx, sy, haloRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw diffraction cross spikes for bright or selected stars
        if ((isSelected || star.type === 'bright') && cam.zoom > 0.6) {
          const spikeLen = renderSize * (isSelected ? 4.5 : 2.5);
          ctx.strokeStyle = `rgba(255, 255, 255, ${starAlpha * (isSelected ? 0.7 : 0.35)})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(sx - spikeLen, sy);
          ctx.lineTo(sx + spikeLen, sy);
          ctx.moveTo(sx, sy - spikeLen);
          ctx.lineTo(sx, sy + spikeLen);
          ctx.stroke();
        }

        // Draw star core
        ctx.fillStyle = star.color;
        ctx.globalAlpha = starAlpha * genesisAlpha * endingAlpha;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.7, renderSize), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = genesisAlpha * endingAlpha;
      });

      mouse.isHoveringStar = hoveredFound;

      // 9. If Ending sequence is on final verse (Phase 5), draw the single lone newborn star
      if (isEndingActive && endingPhase === 5) {
        const finalStarPulse = (Math.sin(time * 0.003) + 1) * 0.5;
        const fx = centerX;
        const fy = centerY;

        // Big warm halo
        const halo = ctx.createRadialGradient(fx, fy, 0, fx, fy, 45);
        halo.addColorStop(0, 'rgba(255, 248, 235, 0.6)');
        halo.addColorStop(0.4, 'rgba(220, 235, 255, 0.2)');
        halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(fx, fy, 45, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(fx, fy, 3.5 + finalStarPulse * 1.0, 0, Math.PI * 2);
        ctx.fill();

        // Spikes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(fx - 14, fy);
        ctx.lineTo(fx + 14, fy);
        ctx.moveTo(fx, fy - 14);
        ctx.lineTo(fx, fy + 14);
        ctx.stroke();
      }

      // 10. Update & Spawn Shooting Stars (Étoiles filantes = Les moments éphémères)
      if (!isEndingActive && genesisProgressRef.current > 0.8) {
        if (time >= nextShootingStarTimeRef.current) {
          if (discoveredCount >= 10 && !hasTriggeredFinalShootingStarRef.current) {
            hasTriggeredFinalShootingStarRef.current = true;
            spawnShootingStar(true);
            nextShootingStarTimeRef.current = time + 75000;
          } else if (shootingStarsRef.current.length === 0) {
            const interval =
              discoveredCount < 4
                ? 18000 + Math.random() * 12000
                : discoveredCount < 9
                ? 28000 + Math.random() * 16000
                : 45000 + Math.random() * 25000;
            spawnShootingStar(false);
            nextShootingStarTimeRef.current = time + interval;
          }
        }
      }

      // Update & Draw Shooting Stars in screen coordinates
      const activeShooting = shootingStarsRef.current;
      for (let sIdx = activeShooting.length - 1; sIdx >= 0; sIdx--) {
        const sStar = activeShooting[sIdx];

        if (!sStar.isCaught) {
          // Slow down noticeably as cursor approaches (down to 35% speed) to make catching effortless
          const distToCursor = Math.hypot(mouse.screenX - sStar.currentX, mouse.screenY - sStar.currentY);
          const proximitySlowdown = distToCursor < 240 ? 0.35 + 0.65 * (distToCursor / 240) : 1.0;

          sStar.elapsed += dt * proximitySlowdown;
          sStar.progress = Math.min(1, sStar.elapsed / sStar.duration);
          const easeP = Math.pow(sStar.progress, 1.06);
          sStar.currentX = sStar.startX + (sStar.endX - sStar.startX) * easeP;
          sStar.currentY = sStar.startY + (sStar.endY - sStar.startY) * easeP;

          // Add trail point
          sStar.trailPoints.unshift({
            x: sStar.currentX,
            y: sStar.currentY,
            alpha: 1.0,
            size: sStar.isNostalgic ? 3.5 : 2.8,
          });
          if (sStar.trailPoints.length > 42) {
            sStar.trailPoints.pop();
          }

          // Age trail points
          for (let pIdx = 0; pIdx < sStar.trailPoints.length; pIdx++) {
            sStar.trailPoints[pIdx].alpha *= 0.93;
            sStar.trailPoints[pIdx].size *= 0.975;
          }

          // Sparks
          if (Math.random() < 0.45) {
            sStar.sparks.push({
              x: sStar.currentX + (Math.random() - 0.5) * 4,
              y: sStar.currentY + (Math.random() - 0.5) * 4,
              vx: (Math.random() - 0.5) * 14,
              vy: (Math.random() - 0.5) * 14,
              life: 0,
              maxLife: 0.35 + Math.random() * 0.25,
              color: sStar.color,
            });
          }
        } else {
          // If caught, hover in place gently
          sStar.caughtTimer -= dt;
          for (let pIdx = 0; pIdx < sStar.trailPoints.length; pIdx++) {
            sStar.trailPoints[pIdx].alpha *= 0.94;
          }
          if (sStar.caughtTimer <= 0) {
            sStar.progress = 1.0;
          }
        }

        // Update sparks
        for (let spIdx = sStar.sparks.length - 1; spIdx >= 0; spIdx--) {
          const sp = sStar.sparks[spIdx];
          sp.x += sp.vx * dt * 60;
          sp.y += sp.vy * dt * 60;
          sp.life += dt;
          if (sp.life >= sp.maxLife) {
            sStar.sparks.splice(spIdx, 1);
          }
        }

        // Alpha envelope
        let headAlpha = 1.0;
        if (!sStar.isCaught) {
          if (sStar.progress < 0.12) headAlpha = sStar.progress / 0.12;
          else if (sStar.progress > 0.8) headAlpha = (1 - sStar.progress) / 0.2;
        }

        // Check hover for cursor pointer: anywhere near head (120px) or along the luminous trail (90px)
        const distToCursorHead = Math.hypot(mouse.screenX - sStar.currentX, mouse.screenY - sStar.currentY);
        let isCursorInRange = distToCursorHead < 120;
        if (isCursorInRange) {
          hoveredFound = true;
        } else {
          for (let pIdx = 0; pIdx < sStar.trailPoints.length; pIdx += 2) {
            const pt = sStar.trailPoints[pIdx];
            if (Math.hypot(mouse.screenX - pt.x, mouse.screenY - pt.y) < 90) {
              hoveredFound = true;
              isCursorInRange = true;
              break;
            }
          }
        }

        // Draw an inviting soft celestial target ring when cursor is in range
        if (isCursorInRange && !sStar.isCaught) {
          const targetRingR = 24 + Math.sin(time * 0.008) * 4;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + Math.sin(time * 0.008) * 0.2})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(sStar.currentX, sStar.currentY, targetRingR, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw sparks
        for (const sp of sStar.sparks) {
          const sparkAlpha = (1 - sp.life / sp.maxLife) * headAlpha * 0.7;
          ctx.fillStyle = sp.color;
          ctx.globalAlpha = sparkAlpha * genesisAlpha;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, 1.0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw luminous trail
        if (sStar.trailPoints.length > 1) {
          for (let i = 0; i < sStar.trailPoints.length - 1; i++) {
            const ptA = sStar.trailPoints[i];
            const ptB = sStar.trailPoints[i + 1];
            const segAlpha = ptA.alpha * headAlpha * genesisAlpha;
            if (segAlpha <= 0.01) continue;

            ctx.beginPath();
            ctx.moveTo(ptA.x, ptA.y);
            ctx.lineTo(ptB.x, ptB.y);
            ctx.strokeStyle = sStar.isNostalgic
              ? `rgba(253, 230, 138, ${segAlpha * 0.8})`
              : `rgba(235, 242, 255, ${segAlpha * 0.85})`;
            ctx.lineWidth = ptA.size;
            ctx.lineCap = 'round';
            ctx.stroke();
          }
        }

        // Head aura & glow
        const auraR = sStar.isCaught ? 32 : sStar.isNostalgic ? 24 : 20;
        const auraGrad = ctx.createRadialGradient(
          sStar.currentX,
          sStar.currentY,
          0,
          sStar.currentX,
          sStar.currentY,
          auraR
        );
        const auraColor = sStar.isNostalgic
          ? `rgba(253, 230, 138, ${headAlpha * 0.85 * genesisAlpha})`
          : `rgba(255, 255, 255, ${headAlpha * 0.9 * genesisAlpha})`;
        const midAura = sStar.isNostalgic
          ? `rgba(245, 158, 11, ${headAlpha * 0.3 * genesisAlpha})`
          : `rgba(180, 205, 255, ${headAlpha * 0.35 * genesisAlpha})`;

        auraGrad.addColorStop(0, auraColor);
        auraGrad.addColorStop(0.4, midAura);
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(sStar.currentX, sStar.currentY, auraR, 0, Math.PI * 2);
        ctx.fill();

        // If caught, pulsing starlight halo
        if (sStar.isCaught) {
          const ringR = 16 + Math.sin(time * 0.006) * 5;
          ctx.strokeStyle = `rgba(220, 230, 255, ${0.45 + Math.sin(time * 0.006) * 0.25})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(sStar.currentX, sStar.currentY, ringR, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Head Core
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = headAlpha * genesisAlpha;
        ctx.beginPath();
        ctx.arc(sStar.currentX, sStar.currentY, sStar.isCaught ? 3.8 : 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Check completion
        if (sStar.progress >= 1 && !sStar.isCaught) {
          if (sStar.hasNearMiss) {
            onMissedShootingStar();
          }
          if (sStar.isFinal) {
            onFinalShootingStarComplete();
          }
          activeShooting.splice(sIdx, 1);
        }
      }

      // Update & Draw dissipating stardust from clicked shooting stars
      const dissipating = dissipatingSparksRef.current;
      for (let dIdx = dissipating.length - 1; dIdx >= 0; dIdx--) {
        const dp = dissipating[dIdx];
        dp.x += dp.vx * dt * 60;
        dp.y += dp.vy * dt * 60;
        dp.life += dt;
        if (dp.life >= dp.maxLife) {
          dissipating.splice(dIdx, 1);
          continue;
        }
        const dAlpha = (1 - dp.life / dp.maxLife) * genesisAlpha;
        ctx.fillStyle = dp.color;
        ctx.globalAlpha = dAlpha;
        ctx.beginPath();
        ctx.arc(dp.x, dp.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      ctx.restore();
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    stars,
    selectedStarId,
    isEndingActive,
    endingPhase,
    discoveredCount,
    onCaughtShootingStar,
    onMissedShootingStar,
    onFinalShootingStarComplete,
    spawnShootingStar,
  ]);

  // Helper function to test if a pointer position hits a shooting star
  const testShootingStarHit = (clickX: number, clickY: number): ActiveShootingStar | null => {
    for (const sStar of shootingStarsRef.current) {
      if (sStar.isCaught) continue;

      // 1. Distance to head (generous 120px radius)
      const distToHead = Math.hypot(clickX - sStar.currentX, clickY - sStar.currentY);
      if (distToHead < 120) {
        return sStar;
      }

      // 2. Distance to any trail point (90px radius)
      for (let pIdx = 0; pIdx < sStar.trailPoints.length; pIdx++) {
        const pt = sStar.trailPoints[pIdx];
        if (Math.hypot(clickX - pt.x, clickY - pt.y) < 90) {
          return sStar;
        }
      }

      // 3. Distance to line segment between head and oldest trail point
      if (sStar.trailPoints.length > 0) {
        const tail = sStar.trailPoints[sStar.trailPoints.length - 1];
        const hx = sStar.currentX;
        const hy = sStar.currentY;
        const tx = tail.x;
        const ty = tail.y;
        const segLenSq = (tx - hx) * (tx - hx) + (ty - hy) * (ty - hy);
        if (segLenSq > 0) {
          const t = Math.max(0, Math.min(1, ((clickX - hx) * (tx - hx) + (clickY - hy) * (ty - hy)) / segLenSq));
          const projX = hx + t * (tx - hx);
          const projY = hy + t * (ty - hy);
          if (Math.hypot(clickX - projX, clickY - projY) < 95) {
            return sStar;
          }
        }
      }

      // Near miss detection for subtle philosophical reflection
      if (distToHead < 180) {
        sStar.hasNearMiss = true;
      }
    }
    return null;
  };

  // Catch a shooting star immediately -> it disappears instantly
  const catchShootingStar = (sStar: ActiveShootingStar) => {
    // Subtle graceful stardust dispersal as it vanishes
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 * i) / 16 + (Math.random() - 0.5) * 0.3;
      const speed = 8 + Math.random() * 22;
      dissipatingSparksRef.current.push({
        x: sStar.currentX,
        y: sStar.currentY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.35 + Math.random() * 0.2,
        color: sStar.color,
      });
    }

    spaceAudio.playShootingStarCatch();
    onCaughtShootingStar({ text: sStar.text, isNostalgic: sStar.isNostalgic });

    // The shooting star disappears immediately once clicked!
    const idx = shootingStarsRef.current.indexOf(sStar);
    if (idx !== -1) {
      shootingStarsRef.current.splice(idx, 1);
    }
  };

  // Click & Tap Star Detection - Test shooting star IMMEDIATELY on pointerDown
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Immediate test on button down
      const hitShootingStar = testShootingStarHit(clickX, clickY);
      if (hitShootingStar) {
        catchShootingStar(hitShootingStar);
        cameraRef.current.isDragging = false;
        cameraRef.current.hasMovedDuringClick = false;
        return;
      }
    }

    const cam = cameraRef.current;
    cam.isDragging = true;
    cam.dragStartX = e.clientX;
    cam.dragStartY = e.clientY;
    cam.cameraStartX = cam.targetX;
    cam.cameraStartY = cam.targetY;
    cam.hasMovedDuringClick = false;

    // Wake audio engine on interaction
    spaceAudio.ensureResume();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const mouse = mouseRef.current;
    mouse.targetScreenX = mouseX;
    mouse.targetScreenY = mouseY;
    mouse.normX = (mouseX / window.innerWidth - 0.5) * 2;
    mouse.normY = (mouseY / window.innerHeight - 0.5) * 2;
    mouse.isInside = true;

    const cam = cameraRef.current;
    if (cam.isDragging && !isEndingActive) {
      const dx = e.clientX - cam.dragStartX;
      const dy = e.clientY - cam.dragStartY;
      if (Math.hypot(dx, dy) > 6) {
        cam.hasMovedDuringClick = true;
      }
      cam.targetX = cam.cameraStartX - dx / cam.zoom;
      cam.targetY = cam.cameraStartY - dy / cam.zoom;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const cam = cameraRef.current;
    cam.isDragging = false;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Also test shooting star on release, even if cursor moved during click
    const hitShootingStar = testShootingStarHit(clickX, clickY);
    if (hitShootingStar) {
      catchShootingStar(hitShootingStar);
      return;
    }

    // If it was a clean click without dragging, perform normal star hit test
    if (!cam.hasMovedDuringClick && !isEndingActive) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      let closestStar: Star | null = null;
      let minDistance = 26; // Generous tap target for mobile and desktop

      for (const star of stars) {
        if (star.isVanished) continue;
        const zFactor = star.z;
        const parallaxX = -mouseRef.current.smoothNormX * (35 * zFactor);
        const parallaxY = -mouseRef.current.smoothNormY * (35 * zFactor);

        const sx = centerX + (star.x - cam.x + parallaxX) * cam.zoom;
        const sy = centerY + (star.y - cam.y + parallaxY) * cam.zoom;

        const dist = Math.hypot(sx - clickX, sy - clickY);
        // Prioritize stars with stories
        const hitRadius = star.hasStory ? 24 : 14;

        if (dist < hitRadius && dist < minDistance) {
          minDistance = dist;
          closestStar = star;
        }
      }

      if (closestStar) {
        onSelectStar(closestStar);
      }
    }
  };

  const handlePointerLeave = () => {
    mouseRef.current.isInside = false;
    cameraRef.current.isDragging = false;
  };

  // Wheel zoom with cursor
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (isEndingActive) return;

    const cam = cameraRef.current;
    // Smoother and wider zoom range
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.86;
    const newZoom = Math.min(2.5, Math.max(0.12, cam.targetZoom * zoomFactor));
    cam.targetZoom = newZoom;
  };

  // Double click with cursor to toggle between wide cosmos view and standard view
  const handleDoubleClick = () => {
    if (isEndingActive) return;
    const cam = cameraRef.current;
    if (cam.targetZoom < 0.35) {
      cam.targetZoom = 0.9;
    } else {
      cam.targetZoom = 0.18;
    }
  };

  // Touch gesture support for mobile pinch zoom
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      touchStateRef.current.initialDistance = dist;
      touchStateRef.current.initialZoom = cameraRef.current.targetZoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2 && touchStateRef.current.initialDistance) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const ratio = currentDist / touchStateRef.current.initialDistance;
      const newZoom = Math.min(2.5, Math.max(0.12, touchStateRef.current.initialZoom * ratio));
      cameraRef.current.targetZoom = newZoom;
    }
  };

  const handleTouchEnd = () => {
    touchStateRef.current.initialDistance = null;
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onDoubleClick={handleDoubleClick}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`fixed inset-0 w-full h-full block touch-none ${
        mouseRef.current.isHoveringStar ? 'cursor-pointer' : 'cursor-default'
      }`}
    />
  );
});

