import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import FeatureStarsCanvas from "../components/FeatureStarsCanvas";
import SectionBadge from "../components/SectionBadge";
import ScrollBlur from "../components/ScrollBlur";
import ShinyText from "../../components/ShinyText";
import DecryptedText from "../../components/DecryptedText";
import MagicBento from "../../components/MagicBento";
import { FEATURES } from "../utils/constants";
import astronautThumbnailSrcSet from "../images/png-clipart-astronaut-astronaut-thumbnail.webp?w=150;300;600&format=webp&as=srcset";

// ── Analytics mini bar chart ──────────────────────────────────────────────
const BARS = [
  { h: 42, w: 'W1' }, { h: 61, w: 'W2' }, { h: 34, w: 'W3' },
  { h: 75, w: 'W4' }, { h: 52, w: 'W5' }, { h: 91, w: 'W6' }, { h: 68, w: 'W7' },
];

function WaterBar({ heightPct }: { heightPct: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} style={{
      flex: 1,
      height: `${heightPct}%`,
      alignSelf: 'flex-end',
      position: 'relative',
      borderRadius: '3px 3px 2px 2px',
      overflow: 'hidden',
      boxShadow: '0 0 16px rgba(0,200,255,0.5)',
    }}>
      {/* Water fill — grows from bottom */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to top, rgba(0,160,220,0.85) 0%, rgba(96,165,250,0.65) 100%)',
        }}
        initial={{ height: 0 }}
        animate={{ height: inView ? '100%' : 0 }}
        transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Primary wave — water surface */}
        <motion.div
          style={{ position: 'absolute', top: -12, left: 0, width: '200%' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 200 24" preserveAspectRatio="none" style={{ width: '100%', height: 24, display: 'block' }}>
            <path
              d="M0,12 C16.7,0 33.3,24 50,12 C66.7,0 83.3,24 100,12 C116.7,0 133.3,24 150,12 C166.7,0 183.3,24 200,12 L200,24 L0,24 Z"
              fill="rgba(0,210,255,0.9)"
            />
          </svg>
        </motion.div>

        {/* Secondary wave — depth layer */}
        <motion.div
          style={{ position: 'absolute', top: -8, left: 0, width: '200%', opacity: 0.35 }}
          animate={{ x: ['-25%', '-75%'] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 200 20" preserveAspectRatio="none" style={{ width: '100%', height: 20, display: 'block' }}>
            <path
              d="M0,10 C20,0 40,20 60,10 C80,0 100,20 120,10 C140,0 160,20 180,10 C190,5 195,15 200,10 L200,20 L0,20 Z"
              fill="rgba(160,230,255,0.8)"
            />
          </svg>
        </motion.div>

        {/* Shimmer reflection */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.14) 0%, transparent 45%)',
          pointerEvents: 'none',
        }} />
      </motion.div>
    </div>
  );
}

function AnalyticsVisual() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: '-60px' });

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', letterSpacing: '0.06em' }}>
          SPRINT VELOCITY
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#22d3ee', fontFamily: 'monospace' }}>
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', display: 'inline-block', flexShrink: 0 }}
          />
          LIVE
        </span>
      </div>

      {/* Chart */}
      <div ref={chartRef} style={{ position: 'relative', height: 80 }}>
        {/* Grid lines */}
        {[33, 66].map(pct => (
          <div key={pct} style={{ position: 'absolute', left: 0, right: 0, bottom: `${pct}%`, height: 1, background: 'rgba(255,255,255,0.04)' }} />
        ))}
        {/* Bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: '100%' }}>
          {BARS.map((bar, i) =>
            i === 5 ? (
              <span key={i} style={{ flex: 1, display: 'contents' }}><WaterBar heightPct={bar.h} /></span>
            ) : (
              <div key={i} style={{ flex: 1, height: `${bar.h}%`, alignSelf: 'flex-end' }}>
                <motion.div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '3px 3px 2px 2px',
                    transformOrigin: 'bottom',
                    background: 'linear-gradient(to top, rgba(0,200,255,0.4), rgba(96,165,250,0.25))',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: chartInView ? 1 : 0 }}
                  transition={{ duration: 0.65, delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* X labels */}
      <div style={{ display: 'flex', gap: 5 }}>
        {BARS.map((bar, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: i === 5 ? 'rgba(0,200,255,0.5)' : 'rgba(255,255,255,0.18)', fontFamily: 'monospace' }}>
            {bar.w}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Security role hierarchy ───────────────────────────────────────────────
const ROLES = [
  {
    name: 'Admin',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.07)',
    border: 'rgba(245,158,11,0.2)',
    perms: ['Full access', 'Billing', 'SSO'],
  },
  {
    name: 'Team Lead',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.06)',
    border: 'rgba(96,165,250,0.18)',
    perms: ['Projects', 'Members', 'Reports'],
  },
  {
    name: 'Developer',
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.05)',
    border: 'rgba(34,211,238,0.15)',
    perms: ['Tasks', 'Workflows', 'Read-only'],
  },
];

function SecurityVisual() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', letterSpacing: '0.06em', marginBottom: 2 }}>
        ACCESS CONTROL
      </span>
      {ROLES.map((role, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 12px',
            borderRadius: 12,
            background: role.bg,
            border: `1px solid ${role.border}`,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.25, 1], boxShadow: [`0 0 6px ${role.color}`, `0 0 2px ${role.color}`, `0 0 6px ${role.color}`] }}
            transition={{ duration: 2.2 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: role.color, flexShrink: 0, display: 'inline-block' }}
          />
          <span style={{ fontSize: 12, fontWeight: 600, color: role.color, flexShrink: 0, minWidth: 72 }}>{role.name}</span>
          <div style={{ display: 'flex', gap: 5, marginLeft: 'auto', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {role.perms.map((p, j) => (
              <span
                key={j}
                style={{
                  fontSize: 9,
                  padding: '2px 6px',
                  borderRadius: 6,
                  background: 'rgba(255,255,255,0.05)',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'monospace',
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const bentoCards = FEATURES.map((f, i) => ({
  icon: f.icon,
  title: f.title,
  description: f.description,
  color: '#06080f',
  visual: i === 2 ? <AnalyticsVisual /> : i === 3 ? <SecurityVisual /> : undefined,
}));

export default function FeaturesSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const toggle = (i: number) => setActiveIdx(prev => prev === i ? null : i);

  const active = activeIdx !== null ? FEATURES[activeIdx] : null;

  return (
    <section className="relative z-10 bg-[#03040e] px-4 pt-40 pb-32 overflow-hidden" id="feature">

      <FeatureStarsCanvas />

      {/* Nebula glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[300px] rounded-full bg-indigo-900/20 blur-[100px]" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[250px] rounded-full bg-blue-900/15 blur-[90px]" />
        <div className="absolute bottom-[15%] left-[30%] w-[350px] h-[200px] rounded-full bg-violet-900/15 blur-[80px]" />
        <div className="absolute top-[60%] left-[5%] w-[250px] h-[150px] rounded-full bg-cyan-900/10 blur-[70px]" />
      </div>

      {/* Floating astronaut */}
      <div className="absolute right-[4%] top-[12%] z-10 pointer-events-none select-none">
        <img
          srcSet={astronautThumbnailSrcSet}
          sizes="(max-width: 768px) 144px, (max-width: 1024px) 208px, 256px"
          alt="Floating astronaut"
          className="astronaut-float w-36 md:w-52 lg:w-64 opacity-90"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="mb-6"><SectionBadge label="Features" /></div>
          <ScrollBlur>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
              <ShinyText text="Everything your team" color="rgba(180,190,200,0.85)" shineColor="#ffffff" spread={90} speed={2} /><br />
              <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                needs to ship faster
              </span>
            </h2>
          </ScrollBlur>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            <DecryptedText
              text="One platform to plan, execute and track — built for teams that move at the speed of orbit."
              animateOn="view"
              sequential
              revealDirection="start"
              speed={10}
              className="text-white/50"
              encryptedClassName="text-white/20"
            />
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <MagicBento
            cards={bentoCards}
            onCardClick={toggle}
            activeIndex={activeIdx}
            glowColor="0, 200, 255"
            enableSpotlight
            enableBorderGlow
            enableStars
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            textAutoHide
          />
        </motion.div>

        {/* Detail panel */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={activeIdx}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.38, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 rounded-2xl p-8 md:p-10"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active.accent}33`,
                  boxShadow: `0 0 40px 0 ${active.accent}12`,
                }}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 flex flex-col gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: `${active.accent}18`, border: `1px solid ${active.accent}33` }}
                    >
                      {active.iconLg}
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white">{active.title}</h3>
                    <p className="text-white/60 leading-relaxed">{active.detail}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:w-64">
                    {active.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.12 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 rounded-xl p-4 flex flex-col gap-1"
                        style={{ background: `${active.accent}0d`, border: `1px solid ${active.accent}22` }}
                      >
                        <span className="text-2xl font-display font-bold" style={{ color: active.accent }}>
                          {stat.num}
                        </span>
                        <span className="text-xs text-white/50">{stat.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
