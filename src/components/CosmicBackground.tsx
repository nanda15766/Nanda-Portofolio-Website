import { useEffect, useRef } from 'react';

/**
 * CosmicBackground
 * Creates the subtle, deep cosmic stardust and particle atmosphere
 * matching the reference screenshots with optimized Canvas 2D rendering.
 */
export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speedAlpha: number;
      vy: number;
    }

    const count = Math.min(80, Math.floor((width * height) / 18000));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.2,
        speedAlpha: (Math.random() - 0.5) * 0.008,
        vy: (Math.random() - 0.5) * 0.15,
      });
    }

    // Occasional subtle shooting star
    interface ShootingStar {
      x: number;
      y: number;
      len: number;
      speed: number;
      angle: number;
      alpha: number;
    }
    let shootingStar: ShootingStar | null = null;
    let nextShootingStarTime = Date.now() + 4000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint starry particles
      for (const p of particles) {
        p.alpha += p.speedAlpha;
        if (p.alpha > 0.85 || p.alpha < 0.15) {
          p.speedAlpha = -p.speedAlpha;
        }

        p.y += p.vy;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Brand sky-blue tint (#67BAF4) for starlight
        ctx.fillStyle = `rgba(103, 186, 244, ${p.alpha * 0.8})`;
        ctx.shadowBlur = p.radius * 3;
        ctx.shadowColor = 'rgba(103, 186, 244, 0.6)';
        ctx.fill();
      }

      // Check shooting star
      const now = Date.now();
      if (!shootingStar && now > nextShootingStarTime) {
        shootingStar = {
          x: Math.random() * (width * 0.8),
          y: Math.random() * (height * 0.5),
          len: Math.random() * 60 + 40,
          speed: Math.random() * 4 + 4,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          alpha: 1,
        };
        nextShootingStarTime = now + Math.random() * 8000 + 6000;
      }

      if (shootingStar) {
        const endX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.len;
        const endY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.len;

        const grad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          endX,
          endY
        );
        grad.addColorStop(0, `rgba(103, 186, 244, 0)`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${shootingStar.alpha})`);

        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.015;

        if (shootingStar.alpha <= 0) {
          shootingStar = null;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
