import { useState, useEffect } from "react";
import ShinyText from "../../components/ShinyText";
import { BASE, PHRASES } from "../utils/constants";

type TWPhase = 'base' | 'typing' | 'pausing' | 'deleting';

export default function TypewriterHeading() {
  const [baseCount, setBaseCount] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [varCount, setVarCount]   = useState(0);
  const [phase, setPhase]         = useState<TWPhase>('base');

  const phrase = PHRASES[phraseIdx];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'base') {
      if (baseCount < BASE.length) {
        const delay = baseCount === 0 ? 600 : 55 + Math.random() * 35;
        timer = setTimeout(() => setBaseCount((c) => c + 1), delay);
      } else {
        setPhase('typing');
      }
    } else if (phase === 'typing') {
      if (varCount < phrase.length) {
        timer = setTimeout(() => setVarCount((c) => c + 1), 60 + Math.random() * 40);
      } else {
        setPhase('pausing');
      }
    } else if (phase === 'pausing') {
      timer = setTimeout(() => setPhase('deleting'), 2200);
    } else if (phase === 'deleting') {
      if (varCount > 0) {
        timer = setTimeout(() => setVarCount((c) => c - 1), 28 + Math.random() * 18);
      } else {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timer);
  }, [phase, baseCount, varCount, phrase]);

  return (
    <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-8 max-w-4xl leading-[1.1]">
      <ShinyText text={BASE.slice(0, baseCount)} color="rgba(255,255,255,0.85)" shineColor="#ffffff" spread={90} speed={2.5} />
      {baseCount >= BASE.length && <br />}
      <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
        {phrase.slice(0, varCount)}
      </span>
      <span className="typewriter-cursor" aria-hidden="true" />
    </h1>
  );
}
