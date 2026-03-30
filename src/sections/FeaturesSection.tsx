import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import FeatureStarsCanvas from "../components/FeatureStarsCanvas";
import SectionBadge from "../components/SectionBadge";
import ScrollBlur from "../components/ScrollBlur";
import ShinyText from "../../components/ShinyText";
import DecryptedText from "../../components/DecryptedText";
import { FEATURES } from "../utils/constants";
import astronautThumbnail from "../images/png-clipart-astronaut-astronaut-thumbnail.webp";

export default function FeaturesSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const toggle = (i: number) => setActiveIdx(prev => prev === i ? null : i);

  const active = activeIdx !== null ? FEATURES[activeIdx] : null;

  return (
    <section className="relative z-10 bg-[#03040e] px-4 pt-40 pb-32 overflow-hidden">

      {/* Canvas background */}
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
          src={astronautThumbnail}
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
          className="text-center mb-20"
        >
          <div className="mb-6"><SectionBadge label="Features" /></div>
          <ScrollBlur>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
              <ShinyText text="Everything your team" color="rgba(255,255,255,0.85)" shineColor="#ffffff" spread={90} speed={2.5} /><br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
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
              speed={35}
              className="text-white/50"
              encryptedClassName="text-white/20"
            />
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => {
            const isActive = activeIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => toggle(i)}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl p-7 flex flex-col gap-4 cursor-pointer overflow-hidden"
                style={{
                  background: isActive
                    ? 'rgba(34,211,238,0.05)'
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? 'rgba(34,211,238,0.35)' : 'rgba(255,255,255,0.07)'}`,
                  transition: 'border-color 0.25s, background 0.25s',
                }}
              >
                {/* Hover glow from top */}
                <div
                  className="absolute inset-x-0 top-0 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${feature.accent}22 0%, transparent 70%)`,
                  }}
                />

                {/* Active border glow */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: `0 0 24px 0 ${feature.accent}22` }}
                  />
                )}

                {/* Pulsing dot — top-right when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse"
                      style={{ background: feature.accent }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <div
                  className="feature-icon w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-colors duration-300"
                  style={isActive ? { background: `${feature.accent}18` } : {}}
                >
                  {feature.icon}
                </div>

                <h3 className="font-display font-semibold text-lg text-white">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 rounded-2xl p-8 md:p-10"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${active.accent}33`,
                boxShadow: `0 0 40px 0 ${active.accent}12`,
              }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left: icon + title + description */}
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

                {/* Right: stat cards */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:w-64">
                  {active.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
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
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
