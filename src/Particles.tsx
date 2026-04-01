import { useEffect, useRef } from "react";

// ── Tiny drifting stars ──────────────────────────────────────────────────────
interface Star {
  x: number; y: number;
  size: number;
  speedX: number; speedY: number;
  opacity: number; opacityDir: number;
  color: string;
}

// ── Glowing orbs (large, blurred) ───────────────────────────────────────────
interface Orb {
  x: number; y: number;
  radius: number;
  speedX: number; speedY: number;
  opacity: number; opacityDir: number;
  color: string; // css color string for gradient
}

// ── Shooting stars ───────────────────────────────────────────────────────────
interface Shoot {
  x: number; y: number;
  len: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number; maxLife: number;
}

const STAR_COLORS  = ["255,255,255", "180,230,255", "140,200,255", "200,170,255"];
const ORB_COLORS   = ["0,200,255", "80,120,255", "120,80,255", "0,160,220"];

function randBetween(a: number, b: number) { return a + Math.random() * (b - a); }

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    // ── collections ──────────────────────────────────────────────────────────
    const stars:  Star[]  = [];
    const orbs:   Orb[]   = [];
    const shoots: Shoot[] = [];

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
        canvas.width = clientWidth;
        canvas.height = clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // ── spawn helpers ────────────────────────────────────────────────────────
    const spawnStar = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: randBetween(0.3, 1.8),
      speedX: (Math.random() - 0.5) * 0.12,
      speedY: (Math.random() - 0.5) * 0.12,
      opacity: Math.random(),
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    });

    const spawnOrb = (): Orb => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: randBetween(60, 180),
      speedX: (Math.random() - 0.5) * 0.08,
      speedY: (Math.random() - 0.5) * 0.06,
      opacity: randBetween(0.04, 0.13),
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      color: ORB_COLORS[Math.floor(Math.random() * ORB_COLORS.length)],
    });

    const spawnShoot = (): Shoot => {
      const angle = randBetween(Math.PI * 0.1, Math.PI * 0.35);
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.5),
        len: randBetween(80, 200),
        speed: randBetween(8, 16),
        angle,
        opacity: 1,
        life: 0,
        maxLife: randBetween(30, 60),
      };
    };

    // ── initial population ───────────────────────────────────────────────────
    for (let i = 0; i < 160; i++) stars.push(spawnStar());
    for (let i = 0; i < 6;   i++) orbs.push(spawnOrb());

    // shooting stars: random intervals
    let nextShoot = randBetween(20, 80); // frames until next shooting star
    let frameCount = 0;

    // ── draw loops ───────────────────────────────────────────────────────────
    const drawStar = (p: Star) => {
      // core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.opacity.toFixed(3)})`;
      ctx.fill();

      // tiny glow for bigger stars
      if (p.size > 1.2) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        g.addColorStop(0, `rgba(${p.color},${(p.opacity * 0.4).toFixed(3)})`);
        g.addColorStop(1, `rgba(${p.color},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
    };

    const drawOrb = (o: Orb) => {
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.radius);
      g.addColorStop(0, `rgba(${o.color},${o.opacity.toFixed(3)})`);
      g.addColorStop(1, `rgba(${o.color},0)`);
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.radius, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    };

    const drawShoot = (s: Shoot) => {
      const progress = s.life / s.maxLife;
      const alpha = (1 - progress) * s.opacity;
      const tailX = s.x - Math.cos(s.angle) * s.len;
      const tailY = s.y - Math.sin(s.angle) * s.len;

      const g = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      g.addColorStop(0, `rgba(180,230,255,0)`);
      g.addColorStop(0.6, `rgba(200,240,255,${(alpha * 0.5).toFixed(3)})`);
      g.addColorStop(1, `rgba(255,255,255,${alpha.toFixed(3)})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // head glow
      const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6);
      hg.addColorStop(0, `rgba(255,255,255,${alpha.toFixed(3)})`);
      hg.addColorStop(1, `rgba(180,230,255,0)`);
      ctx.beginPath();
      ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = hg;
      ctx.fill();
    };

    // ── tick ─────────────────────────────────────────────────────────────────
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      // ── orbs ──
      for (const o of orbs) {
        o.x += o.speedX;
        o.y += o.speedY;
        o.opacity += o.opacityDir * 0.0003;
        if (o.opacity > 0.14 || o.opacity < 0.03) o.opacityDir *= -1;
        if (o.x < -o.radius) o.x = canvas.width + o.radius;
        if (o.x > canvas.width + o.radius) o.x = -o.radius;
        if (o.y < -o.radius) o.y = canvas.height + o.radius;
        if (o.y > canvas.height + o.radius) o.y = -o.radius;
        drawOrb(o);
      }

      // ── stars ──
      for (const p of stars) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacityDir * (Math.random() * 0.005 + 0.002);
        if (p.opacity >= 1)  { p.opacity = 1;  p.opacityDir = -1; }
        if (p.opacity <= 0)  { p.opacity = 0;  p.opacityDir =  1; }
        if (p.x < 0)  p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0)  p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        drawStar(p);
      }

      // ── shooting stars ──
      if (frameCount >= nextShoot) {
        // spawn 1-3 at once occasionally
        const batch = Math.random() < 0.25 ? Math.floor(randBetween(2, 4)) : 1;
        for (let b = 0; b < batch; b++) shoots.push(spawnShoot());
        nextShoot = frameCount + randBetween(40, 140);
      }

      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life++;
        drawShoot(s);
        if (s.life >= s.maxLife) shoots.splice(i, 1);
      }

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
