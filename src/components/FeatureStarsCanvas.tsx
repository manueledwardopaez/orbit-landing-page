import { useEffect, useRef } from "react";

export default function FeatureStarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.6 + 0.3,
      baseOpacity: Math.random() * 0.55 + 0.2,
      speed: Math.random() * 0.008 + 0.004,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    const animate = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        const opacity = p.baseOpacity * (0.5 + 0.5 * Math.sin(t * 0.001 * p.speed * 100 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
