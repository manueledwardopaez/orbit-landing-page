import { useMemo } from "react";

export default function StarsBackgroundVibrant() {
  const stars = useMemo(() =>
    Array.from({ length: 260 }, (_, i) => {
      const seed = i * 7919 + 12345;
      const rng = (n: number) => ((seed * n + 49297) % 1000000) / 1000000;
      return {
        x: rng(1) * 100,
        y: rng(2) * 100,
        size: rng(3) * 2.4 + 0.5,
        opacity: rng(4) * 0.8 + 0.25,
        duration: rng(5) * 3.5 + 1.5,
        delay: rng(6) * 6,
        color: rng(7) > 0.85 ? '#a5c8ff' : rng(7) > 0.7 ? '#c4b5fd' : '#ffffff',
      };
    }), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large deep nebulas */}
      <div className="absolute top-[-5%] left-[10%]  w-[700px] h-[500px] rounded-full bg-indigo-900/12 blur-[140px]" />
      <div className="absolute top-[20%]  right-[5%]  w-[550px] h-[400px] rounded-full bg-blue-900/10  blur-[120px]" />
      <div className="absolute bottom-[10%] left-[25%] w-[600px] h-[350px] rounded-full bg-violet-900/10 blur-[130px]" />
      <div className="absolute top-[50%]  left-[0%]   w-[350px] h-[250px] rounded-full bg-cyan-900/8   blur-[100px]"  />
      <div className="absolute top-[10%]  left-[45%]  w-[300px] h-[200px] rounded-full bg-purple-900/8  blur-[90px]"  />
      {/* Subtle accent glows */}
      <div className="absolute top-[30%]  left-[20%]  w-[180px] h-[180px] rounded-full bg-indigo-800/8  blur-[60px]"  />
      <div className="absolute bottom-[25%] right-[15%] w-[150px] h-[150px] rounded-full bg-cyan-900/6   blur-[50px]"  />

      {/* Stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.color,
            ["--star-opacity" as string]: s.opacity,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
