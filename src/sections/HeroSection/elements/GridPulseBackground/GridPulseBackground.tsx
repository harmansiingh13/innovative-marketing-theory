"use client";

import { useEffect, useRef } from "react";
import styles from "./GridPulseBackground.module.css";

interface Pulse {
  id: number;
  orientation: "horizontal" | "vertical";
  fixedCoord: number; // Y for horizontal, X for vertical
  startCoord: number; // X for horizontal, Y for vertical
  endCoord: number;
  startTime: number;
  duration: number;
  direction: 1 | -1;
  tailLength: number;
  opacityMultiplier: number;
  tier: "standard" | "major";
  triggeredIntersections: Set<number>;
}

interface Glint {
  x: number;
  y: number;
  startTime: number;
  duration: number;
  maxRadius: number;
}

interface PhosphorSegment {
  orientation: "horizontal" | "vertical";
  fixedCoord: number;
  start: number;
  end: number;
  startTime: number;
  duration: number;
}

export const GridPulseBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let gridSize = 90; // Architectural refined grid spacing (scaled on resize)
    let animationFrameId: number;
    let isVisible = true;

    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Adaptive grid spacing: slightly tighter on mobile for balanced proportion
      gridSize = width < 640 ? 65 : width < 1024 ? 80 : 92;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse Tracking with smooth inertia
    const mouse = {
      targetX: -1000,
      targetY: -1000,
      currentX: -1000,
      currentY: -1000,
      active: false,
      alpha: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Optional interactive click: spawns an energetic pulse from nearest intersection
    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (clickX >= 0 && clickX <= width && clickY >= 0 && clickY <= height) {
        spawnInteractivePulse(clickX, clickY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    // IntersectionObserver to pause when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    // Simulation State
    let nextPulseId = 1;
    const activePulses: Pulse[] = [];
    const activeGlints: Glint[] = [];
    const phosphorTrails: PhosphorSegment[] = [];
    let lastSpawnTime = performance.now();
    let nextSpawnDelay = 350;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const spawnPulse = (
      currentTime: number,
      initialProgressOffset = 0,
      forcedOrientation?: "horizontal" | "vertical",
      forcedFixedCoord?: number,
      forcedStartCoord?: number,
      forcedDirection?: 1 | -1,
    ) => {
      const cols = Math.floor(width / gridSize);
      const rows = Math.floor(height / gridSize);

      if (cols < 2 || rows < 2) return;

      const orientation: "horizontal" | "vertical" =
        forcedOrientation || (Math.random() < 0.5 ? "horizontal" : "vertical");
      const direction: 1 | -1 = forcedDirection || (Math.random() < 0.5 ? 1 : -1);

      const isMajor = Math.random() < 0.35;
      const tier: "standard" | "major" = isMajor ? "major" : "standard";

      const busyLines = new Set<number>(
        activePulses.filter((p) => p.orientation === orientation).map((p) => p.fixedCoord),
      );

      if (orientation === "horizontal") {
        let fixedCoord: number;

        if (forcedFixedCoord !== undefined) {
          fixedCoord = forcedFixedCoord;
        } else {
          const availableRows: number[] = [];
          for (let r = 1; r < rows; r++) {
            if (!busyLines.has(r * gridSize)) {
              availableRows.push(r);
            }
          }
          const chosenRow =
            availableRows.length > 0
              ? availableRows[Math.floor(Math.random() * availableRows.length)]
              : Math.floor(Math.random() * (rows - 1)) + 1;
          fixedCoord = chosenRow * gridSize;
        }

        const maxCells = Math.min(cols, 5);
        const cells = Math.floor(Math.random() * (maxCells - 1)) + 2;

        let startCoord: number;
        if (forcedStartCoord !== undefined) {
          startCoord = forcedStartCoord;
        } else {
          let startCol: number;
          if (direction === 1) {
            const maxStart = Math.max(0, cols - cells);
            startCol = Math.floor(Math.random() * (maxStart + 1));
          } else {
            const minStart = Math.min(cols, cells);
            startCol = Math.floor(Math.random() * (cols - minStart + 1)) + minStart;
          }
          startCoord = startCol * gridSize;
        }

        const endCoord = Math.max(0, Math.min(width, startCoord + direction * cells * gridSize));
        const duration = 1800 + cells * 240 + (Math.random() - 0.5) * 250;
        const tailLength = (isMajor ? 110 : 85) + Math.random() * 35;
        const opacityMultiplier = isMajor ? 1.0 : 0.75 + Math.random() * 0.2;

        activePulses.push({
          id: nextPulseId++,
          orientation,
          fixedCoord,
          startCoord,
          endCoord,
          startTime: currentTime - duration * initialProgressOffset,
          duration,
          direction,
          tailLength,
          opacityMultiplier,
          tier,
          triggeredIntersections: new Set<number>(),
        });
      } else {
        let fixedCoord: number;

        if (forcedFixedCoord !== undefined) {
          fixedCoord = forcedFixedCoord;
        } else {
          const availableCols: number[] = [];
          for (let c = 1; c < cols; c++) {
            if (!busyLines.has(c * gridSize)) {
              availableCols.push(c);
            }
          }
          const chosenCol =
            availableCols.length > 0
              ? availableCols[Math.floor(Math.random() * availableCols.length)]
              : Math.floor(Math.random() * (cols - 1)) + 1;
          fixedCoord = chosenCol * gridSize;
        }

        const maxCells = Math.min(rows, 5);
        const cells = Math.floor(Math.random() * (maxCells - 1)) + 2;

        let startCoord: number;
        if (forcedStartCoord !== undefined) {
          startCoord = forcedStartCoord;
        } else {
          let startRow: number;
          if (direction === 1) {
            const maxStart = Math.max(0, rows - cells);
            startRow = Math.floor(Math.random() * (maxStart + 1));
          } else {
            const minStart = Math.min(rows, cells);
            startRow = Math.floor(Math.random() * (rows - minStart + 1)) + minStart;
          }
          startCoord = startRow * gridSize;
        }

        const endCoord = Math.max(0, Math.min(height, startCoord + direction * cells * gridSize));
        const duration = 1800 + cells * 240 + (Math.random() - 0.5) * 250;
        const tailLength = (isMajor ? 110 : 85) + Math.random() * 35;
        const opacityMultiplier = isMajor ? 1.0 : 0.75 + Math.random() * 0.2;

        activePulses.push({
          id: nextPulseId++,
          orientation,
          fixedCoord,
          startCoord,
          endCoord,
          startTime: currentTime - duration * initialProgressOffset,
          duration,
          direction,
          tailLength,
          opacityMultiplier,
          tier,
          triggeredIntersections: new Set<number>(),
        });
      }
    };

    const spawnInteractivePulse = (x: number, y: number) => {
      const nearX = Math.round(x / gridSize) * gridSize;
      const nearY = Math.round(y / gridSize) * gridSize;
      const currentTime = performance.now();

      const orient: "horizontal" | "vertical" = Math.random() < 0.5 ? "horizontal" : "vertical";
      const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;

      if (orient === "horizontal") {
        spawnPulse(currentTime, 0, "horizontal", nearY, nearX, dir);
      } else {
        spawnPulse(currentTime, 0, "vertical", nearX, nearY, dir);
      }
    };

    // Immediately start with 2 staggered pulses on mount
    const now = performance.now();
    spawnPulse(now, 0.35);
    spawnPulse(now, 0.75);

    // =========================================================================
    // MAIN RENDER LOOP
    // =========================================================================
    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Mouse alpha interpolation
      if (mouse.active) {
        mouse.alpha += (1 - mouse.alpha) * 0.08;
      } else {
        mouse.alpha += (0 - mouse.alpha) * 0.05;
      }

      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.1;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.1;

      const cols = Math.floor(width / gridSize);
      const rows = Math.floor(height / gridSize);
      const centerX = width * 0.5;
      const centerY = height * 0.45;

      // =======================================================================
      // 1. REFINED ARCHITECTURAL STATIC GRID WITH FOCAL VIGNETTE
      // =======================================================================
      // Vertical grid lines
      for (let c = 0; c <= cols; c++) {
        const x = c * gridSize;
        const distFromCenterX = Math.abs(x - centerX) / (width * 0.5);

        // Focal breathing room behind center typography + gentle edge fade
        const centerSoften = 0.6 + 0.4 * Math.min(1, Math.pow(distFromCenterX, 1.2));
        const edgeFade = Math.sin((x / width) * Math.PI);
        const lineAlpha = 0.026 * centerSoften * Math.pow(edgeFade, 0.3);

        ctx.strokeStyle = `rgba(245, 242, 235, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let r = 0; r <= rows; r++) {
        const y = r * gridSize;
        const distFromCenterY = Math.abs(y - centerY) / (height * 0.5);

        const centerSoften = 0.65 + 0.35 * Math.min(1, Math.pow(distFromCenterY, 1.2));
        // Vertical fade towards bottom (matching the 85% hero mask)
        const bottomFade = Math.max(0, 1 - Math.pow(y / (height * 0.9), 3));
        const lineAlpha = 0.028 * centerSoften * bottomFade;

        // Faint warm amber undertone on horizontal lines for luxury depth
        ctx.strokeStyle = `rgba(232, 169, 26, ${lineAlpha * 0.85})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Precision Micro-Crosshair Markers `+` at Grid Intersections
      ctx.strokeStyle = "rgba(245, 242, 235, 0.038)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let r = 1; r < rows; r++) {
        const y = r * gridSize;
        const bFade = Math.max(0, 1 - Math.pow(y / (height * 0.88), 2.5));

        for (let c = 1; c < cols; c++) {
          const x = c * gridSize;
          const eFade = Math.sin((x / width) * Math.PI);
          if (bFade * eFade < 0.1) continue;

          // Tiny 3px cross arms
          ctx.moveTo(x - 3, y);
          ctx.lineTo(x + 3, y);
          ctx.moveTo(x, y - 3);
          ctx.lineTo(x, y + 3);
        }
      }
      ctx.stroke();

      // =======================================================================
      // 2. PHOSPHOR GRID MEMORY (Warm Cooling Trails along Grid Lines)
      // =======================================================================
      for (let pIdx = phosphorTrails.length - 1; pIdx >= 0; pIdx--) {
        const ph = phosphorTrails[pIdx];
        const phElapsed = time - ph.startTime;
        const phProgress = phElapsed / ph.duration;

        if (phProgress >= 1) {
          phosphorTrails.splice(pIdx, 1);
          continue;
        }

        const phAlpha = (1 - phProgress) * 0.22;

        if (ph.orientation === "horizontal") {
          const pGrad = ctx.createLinearGradient(ph.start, ph.fixedCoord, ph.end, ph.fixedCoord);
          pGrad.addColorStop(0, "rgba(232, 169, 26, 0)");
          pGrad.addColorStop(0.5, `rgba(244, 196, 77, ${phAlpha})`);
          pGrad.addColorStop(1, "rgba(232, 169, 26, 0)");

          ctx.strokeStyle = pGrad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(ph.start, ph.fixedCoord);
          ctx.lineTo(ph.end, ph.fixedCoord);
          ctx.stroke();
        } else {
          const pGrad = ctx.createLinearGradient(ph.fixedCoord, ph.start, ph.fixedCoord, ph.end);
          pGrad.addColorStop(0, "rgba(232, 169, 26, 0)");
          pGrad.addColorStop(0.5, `rgba(244, 196, 77, ${phAlpha})`);
          pGrad.addColorStop(1, "rgba(232, 169, 26, 0)");

          ctx.strokeStyle = pGrad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(ph.fixedCoord, ph.start);
          ctx.lineTo(ph.fixedCoord, ph.end);
          ctx.stroke();
        }
      }

      // =======================================================================
      // 3. MOUSE INTERACTION (Subtle Ambient Flashlight & Intersection Glow)
      // =======================================================================
      if (mouse.alpha > 0.005) {
        const mx = mouse.currentX;
        const my = mouse.currentY;

        // A. Soft, gentle ambient cursor aura
        const aura = ctx.createRadialGradient(mx, my, 0, mx, my, 125);
        aura.addColorStop(0, `rgba(232, 169, 26, ${0.038 * mouse.alpha})`);
        aura.addColorStop(0.6, `rgba(232, 169, 26, ${0.012 * mouse.alpha})`);
        aura.addColorStop(1, "rgba(232, 169, 26, 0)");
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, width, height);

        // B. Nearest Grid Intersection Magnetism & Highlight
        const nearestIntX = Math.round(mx / gridSize) * gridSize;
        const nearestIntY = Math.round(my / gridSize) * gridSize;
        const distToInt = Math.hypot(mx - nearestIntX, my - nearestIntY);

        if (distToInt < 85) {
          const prox = 1 - distToInt / 85;
          const intAlpha = prox * mouse.alpha;

          // Glowing intersection dot
          ctx.beginPath();
          ctx.arc(nearestIntX, nearestIntY, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 246, 215, ${0.6 * intAlpha})`;
          ctx.fill();

          // Illuminated micro-crosshair
          ctx.strokeStyle = `rgba(244, 196, 77, ${0.42 * intAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nearestIntX - 8, nearestIntY);
          ctx.lineTo(nearestIntX + 8, nearestIntY);
          ctx.moveTo(nearestIntX, nearestIntY - 8);
          ctx.lineTo(nearestIntX, nearestIntY + 8);
          ctx.stroke();
        }

        // C. Nearby grid lines subtle brightening
        const nearestLineY = Math.round(my / gridSize) * gridSize;
        const distToHLine = Math.abs(my - nearestLineY);
        if (distToHLine < 35) {
          const hFactor = (1 - distToHLine / 35) * mouse.alpha;
          const hGrad = ctx.createLinearGradient(mx - 85, nearestLineY, mx + 85, nearestLineY);
          hGrad.addColorStop(0, "rgba(232, 169, 26, 0)");
          hGrad.addColorStop(0.5, `rgba(244, 196, 77, ${0.14 * hFactor})`);
          hGrad.addColorStop(1, "rgba(232, 169, 26, 0)");

          ctx.strokeStyle = hGrad;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(mx - 85, nearestLineY);
          ctx.lineTo(mx + 85, nearestLineY);
          ctx.stroke();
        }

        const nearestLineX = Math.round(mx / gridSize) * gridSize;
        const distToVLine = Math.abs(mx - nearestLineX);
        if (distToVLine < 35) {
          const vFactor = (1 - distToVLine / 35) * mouse.alpha;
          const vGrad = ctx.createLinearGradient(nearestLineX, my - 85, nearestLineX, my + 85);
          vGrad.addColorStop(0, "rgba(232, 169, 26, 0)");
          vGrad.addColorStop(0.5, `rgba(244, 196, 77, ${0.14 * vFactor})`);
          vGrad.addColorStop(1, "rgba(232, 169, 26, 0)");

          ctx.strokeStyle = vGrad;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(nearestLineX, my - 85);
          ctx.lineTo(nearestLineX, my + 85);
          ctx.stroke();
        }
      }

      // =======================================================================
      // 4. CONTINUOUS GOLDEN GRID STREAKS & OPTICAL FLARES
      // =======================================================================
      if (!prefersReducedMotion) {
        // Concurrency Controller: Keep 2-3 trails alive continuously (max 4)
        const activeCount = activePulses.length;
        const elapsedSinceLastSpawn = time - lastSpawnTime;

        let shouldSpawn = false;

        if (activeCount < 2) {
          shouldSpawn = elapsedSinceLastSpawn > 160;
        } else if (activeCount === 2) {
          shouldSpawn = elapsedSinceLastSpawn > nextSpawnDelay;
        } else if (activeCount === 3) {
          shouldSpawn = elapsedSinceLastSpawn > nextSpawnDelay * 1.6 && Math.random() < 0.05;
        }

        if (shouldSpawn && activeCount < 4) {
          spawnPulse(time);
          lastSpawnTime = time;
          nextSpawnDelay = 480 + Math.random() * 550;
        }

        // Update and Render Active Pulses
        for (let i = activePulses.length - 1; i >= 0; i--) {
          const p = activePulses[i];
          const elapsed = time - p.startTime;
          const progress = Math.min(Math.max(elapsed / p.duration, 0), 1);

          if (progress >= 1) {
            // Register remaining phosphor trail upon completion
            phosphorTrails.push({
              orientation: p.orientation,
              fixedCoord: p.fixedCoord,
              start: p.startCoord,
              end: p.endCoord,
              startTime: time,
              duration: 950,
            });

            // 15% chance to branch/turn corner at the destination intersection!
            if (activePulses.length < 3 && Math.random() < 0.15) {
              const branchOrient = p.orientation === "horizontal" ? "vertical" : "horizontal";
              const branchDir = Math.random() < 0.5 ? 1 : -1;
              spawnPulse(
                time,
                0,
                branchOrient,
                p.endCoord, // new fixed coordinate is the previous end coordinate!
                p.fixedCoord, // new start coordinate is the previous fixed coordinate!
                branchDir,
              );
            }

            activePulses.splice(i, 1);
            continue;
          }

          const eased = easeInOutCubic(progress);
          const currentPos = p.startCoord + (p.endCoord - p.startCoord) * eased;

          // Dynamic tail length expands with velocity and collapses at arrival
          const currentTailLen = Math.sin(progress * Math.PI) * p.tailLength;
          const tailPos = currentPos - p.direction * currentTailLen;

          // Fade envelope
          let alpha = 1;
          if (progress < 0.12) {
            alpha = progress / 0.12;
          } else if (progress > 0.85) {
            alpha = (1 - progress) / 0.15;
          }
          alpha *= p.opacityMultiplier;

          let headX: number;
          let headY: number;
          let tailX: number;
          let tailY: number;

          if (p.orientation === "horizontal") {
            headX = currentPos;
            headY = p.fixedCoord;
            tailX = tailPos;
            tailY = p.fixedCoord;
          } else {
            headX = p.fixedCoord;
            headY = currentPos;
            tailX = p.fixedCoord;
            tailY = tailPos;
          }

          // Intersection Crossing Trigger
          const currentGridIndex = Math.round(currentPos / gridSize);
          const distToGrid = Math.abs(currentPos - currentGridIndex * gridSize);

          if (distToGrid < 5 && !p.triggeredIntersections.has(currentGridIndex)) {
            p.triggeredIntersections.add(currentGridIndex);
            const intX =
              p.orientation === "horizontal" ? currentGridIndex * gridSize : p.fixedCoord;
            const intY =
              p.orientation === "horizontal" ? p.fixedCoord : currentGridIndex * gridSize;

            activeGlints.push({
              x: intX,
              y: intY,
              startTime: time,
              duration: 580,
              maxRadius: p.tier === "major" ? 4.5 : 3.2,
            });

            // Add short localized phosphor glow segment
            phosphorTrails.push({
              orientation: p.orientation,
              fixedCoord: p.fixedCoord,
              start: currentPos - p.direction * gridSize,
              end: currentPos,
              startTime: time,
              duration: 1100,
            });
          }

          // -------------------------------------------------------------------
          // A. Outer Soft Ambient Aura
          // -------------------------------------------------------------------
          const outerGlowGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
          outerGlowGrad.addColorStop(0, "rgba(232, 169, 26, 0)");
          outerGlowGrad.addColorStop(0.5, `rgba(232, 169, 26, ${0.16 * alpha})`);
          outerGlowGrad.addColorStop(1, `rgba(244, 196, 77, ${0.42 * alpha})`);

          ctx.strokeStyle = outerGlowGrad;
          ctx.lineWidth = p.tier === "major" ? 6.5 : 5.0;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(headX, headY);
          ctx.stroke();

          // -------------------------------------------------------------------
          // B. Medium Core Body Streak
          // -------------------------------------------------------------------
          const midGlowGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
          midGlowGrad.addColorStop(0, "rgba(232, 169, 26, 0)");
          midGlowGrad.addColorStop(0.35, `rgba(232, 169, 26, ${0.45 * alpha})`);
          midGlowGrad.addColorStop(1, `rgba(244, 196, 77, ${0.85 * alpha})`);

          ctx.strokeStyle = midGlowGrad;
          ctx.lineWidth = p.tier === "major" ? 3.0 : 2.4;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(headX, headY);
          ctx.stroke();

          // -------------------------------------------------------------------
          // C. Inner Precision Filament
          // -------------------------------------------------------------------
          const innerGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
          innerGrad.addColorStop(0, "rgba(232, 169, 26, 0)");
          innerGrad.addColorStop(0.5, `rgba(244, 196, 77, ${0.65 * alpha})`);
          innerGrad.addColorStop(1, `rgba(255, 248, 230, ${0.98 * alpha})`);

          ctx.strokeStyle = innerGrad;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(headX, headY);
          ctx.stroke();

          // -------------------------------------------------------------------
          // D. Optical Lens-Flare Starburst Head
          // -------------------------------------------------------------------
          const headHalo = ctx.createRadialGradient(
            headX,
            headY,
            0,
            headX,
            headY,
            p.tier === "major" ? 18 : 14,
          );
          headHalo.addColorStop(0, `rgba(244, 196, 77, ${0.65 * alpha})`);
          headHalo.addColorStop(0.35, `rgba(232, 169, 26, ${0.25 * alpha})`);
          headHalo.addColorStop(1, "rgba(232, 169, 26, 0)");
          ctx.fillStyle = headHalo;
          ctx.beginPath();
          ctx.arc(headX, headY, p.tier === "major" ? 18 : 14, 0, Math.PI * 2);
          ctx.fill();

          const flareMajor = p.tier === "major" ? 24 : 18;
          const flareMinor = p.tier === "major" ? 12 : 9;

          if (p.orientation === "horizontal") {
            // Horizontal directional spike
            const hSpike = ctx.createLinearGradient(
              headX - flareMajor,
              headY,
              headX + flareMajor,
              headY,
            );
            hSpike.addColorStop(0, "rgba(255, 242, 205, 0)");
            hSpike.addColorStop(0.5, `rgba(255, 248, 225, ${0.95 * alpha})`);
            hSpike.addColorStop(1, "rgba(255, 242, 205, 0)");
            ctx.strokeStyle = hSpike;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(headX - flareMajor, headY);
            ctx.lineTo(headX + flareMajor, headY);
            ctx.stroke();

            // Vertical cross-glint
            const vSpike = ctx.createLinearGradient(
              headX,
              headY - flareMinor,
              headX,
              headY + flareMinor,
            );
            vSpike.addColorStop(0, "rgba(244, 196, 77, 0)");
            vSpike.addColorStop(0.5, `rgba(255, 248, 225, ${0.7 * alpha})`);
            vSpike.addColorStop(1, "rgba(244, 196, 77, 0)");
            ctx.strokeStyle = vSpike;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(headX, headY - flareMinor);
            ctx.lineTo(headX, headY + flareMinor);
            ctx.stroke();
          } else {
            // Vertical directional spike
            const vSpike = ctx.createLinearGradient(
              headX,
              headY - flareMajor,
              headX,
              headY + flareMajor,
            );
            vSpike.addColorStop(0, "rgba(255, 242, 205, 0)");
            vSpike.addColorStop(0.5, `rgba(255, 248, 225, ${0.95 * alpha})`);
            vSpike.addColorStop(1, "rgba(255, 242, 205, 0)");
            ctx.strokeStyle = vSpike;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(headX, headY - flareMajor);
            ctx.lineTo(headX, headY + flareMajor);
            ctx.stroke();

            // Horizontal cross-glint
            const hSpike = ctx.createLinearGradient(
              headX - flareMinor,
              headY,
              headX + flareMinor,
              headY,
            );
            hSpike.addColorStop(0, "rgba(244, 196, 77, 0)");
            hSpike.addColorStop(0.5, `rgba(255, 248, 225, ${0.7 * alpha})`);
            hSpike.addColorStop(1, "rgba(244, 196, 77, 0)");
            ctx.strokeStyle = hSpike;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(headX - flareMinor, headY);
            ctx.lineTo(headX + flareMinor, headY);
            ctx.stroke();
          }

          // Core radiant point
          ctx.fillStyle = `rgba(255, 252, 240, ${0.98 * alpha})`;
          ctx.beginPath();
          ctx.arc(headX, headY, 2.3, 0, Math.PI * 2);
          ctx.fill();
        }

        // ---------------------------------------------------------------------
        // Render Intersection Junction Glints
        // ---------------------------------------------------------------------
        for (let j = activeGlints.length - 1; j >= 0; j--) {
          const g = activeGlints[j];
          const gProgress = (time - g.startTime) / g.duration;

          if (gProgress >= 1) {
            activeGlints.splice(j, 1);
            continue;
          }

          const gAlpha = (1 - gProgress) * 0.55;
          const crossLen = 7 + gProgress * 9;

          ctx.strokeStyle = `rgba(244, 196, 77, ${gAlpha * 0.75})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(g.x - crossLen, g.y);
          ctx.lineTo(g.x + crossLen, g.y);
          ctx.moveTo(g.x, g.y - crossLen);
          ctx.lineTo(g.x, g.y + crossLen);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(g.x, g.y, (1.5 + gProgress * g.maxRadius) * 0.55, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 248, 225, ${gAlpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.canvasContainer} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vignetteOverlay} />
    </div>
  );
};
