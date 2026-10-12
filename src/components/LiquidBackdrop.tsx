import { useEffect, useRef } from 'react';

/**
 * Procedural dark fluid/liquid rippling backdrop matching the DAQ Consulting aesthetic.
 * Uses an optimized canvas renderer with metallic liquid ripples, organic caustic waves,
 * and architectural blueprint grid coordinates.
 */
export default function LiquidBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let t = 0;

    const render = () => {
      t += 0.003;
      ctx.clearRect(0, 0, width, height);

      // Deep dark base
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#07090c');
      bgGrad.addColorStop(0.5, '#05070a');
      bgGrad.addColorStop(1, '#020304');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render organic liquid waves
      const waveCount = 5;
      for (let i = 0; i < waveCount; i++) {
        ctx.save();
        ctx.beginPath();
        const yOffset = (height / (waveCount + 1)) * (i + 1);

        ctx.moveTo(0, yOffset);
        for (let x = 0; x <= width; x += 40) {
          const wave1 = Math.sin(x * 0.002 + t * 1.5 + i) * 70;
          const wave2 = Math.cos(x * 0.004 - t * 0.8 + i * 2) * 45;
          const wave3 = Math.sin(x * 0.001 + t * 0.5) * 30;
          ctx.lineTo(x, yOffset + wave1 + wave2 + wave3);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Brand navy & sky accents blended with dark obsidian
        const waveGrad = ctx.createRadialGradient(
          width * 0.4 + Math.sin(t + i) * 200,
          yOffset + Math.cos(t * 0.8) * 100,
          10,
          width * 0.5,
          yOffset,
          width * 0.8
        );

        if (i % 2 === 0) {
          waveGrad.addColorStop(0, 'rgba(30, 70, 107, 0.12)'); // brand-bold navy
          waveGrad.addColorStop(0.5, 'rgba(103, 186, 244, 0.03)'); // brand-light sky
          waveGrad.addColorStop(1, 'rgba(5, 7, 10, 0)');
        } else {
          waveGrad.addColorStop(0, 'rgba(103, 186, 244, 0.08)'); // brand-light sky
          waveGrad.addColorStop(0.6, 'rgba(30, 70, 107, 0.04)');
          waveGrad.addColorStop(1, 'rgba(5, 7, 10, 0)');
        }

        ctx.fillStyle = waveGrad;
        ctx.fill();
        ctx.restore();
      }

      // Specular liquid caustic highlights
      for (let j = 0; j < 3; j++) {
        ctx.save();
        ctx.beginPath();
        const cx = (width * (0.25 + j * 0.25) + Math.sin(t * 1.2 + j * 2) * 120);
        const cy = (height * 0.35 + Math.cos(t * 0.9 + j) * 80);
        const radius = Math.min(width, height) * (0.2 + j * 0.1);

        const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        radial.addColorStop(0, 'rgba(103, 186, 244, 0.07)');
        radial.addColorStop(0.5, 'rgba(30, 70, 107, 0.03)');
        radial.addColorStop(1, 'transparent');

        ctx.fillStyle = radial;
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (!paused && !reducedMotion) animationFrameId = requestAnimationFrame(render);
    };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let paused = document.hidden;
    const handleVisibility = () => {
      paused = document.hidden;
      if (!paused && !reducedMotion) {
        cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibility);
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-90 dark:opacity-100 transition-opacity duration-700"
      />
      {/* Precision architectural hairline grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />
      {/* Vignette edge shading */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 pointer-events-none" />
    </div>
  );
}
