import { motion } from "motion/react";
import { Star } from "lucide-react";
import SectionBadge from "../components/SectionBadge";
import ScrollBlur from "../components/ScrollBlur";
import ShinyText from "../../components/ShinyText";
import LightRays from "../../components/LightRays";

import { TESTIMONIALS } from "../utils/constants";

export default function TestimonialsSection() {
  return (
    <section className="relative z-10 px-4 pt-40 pb-32 overflow-hidden" id="testimonial">
      {/* Background image */}
      <div className="testimonials-bg" />

      {/* Light rays — above bg image, below content */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00c8ff"
          raysSpeed={0.4}
          lightSpread={2.2}
          rayLength={1.4}
          pulsating
          fadeDistance={0.85}
          followMouse
          mouseInfluence={0.06}
          distortion={0.1}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="mb-6"><SectionBadge label="Testimonials" /></div>
          <ScrollBlur>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
              <ShinyText text="Loved by teams" color="rgba(255,255,255,0.85)" shineColor="#ffffff" spread={90} speed={2.5} /><br />
              <span className="bg-linear-to from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                across the galaxy
              </span>
            </h2>
          </ScrollBlur>
          <p className="text-white/50 text-lg max-w-xl mx-auto h-4">
              Don't take our word for it — hear from the teams already in orbit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="feature-card rounded-2xl p-7 flex flex-col gap-5 group"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-white/30 fill-white/30 group-hover:text-cyan-400 group-hover:fill-cyan-400 transition-colors duration-300" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="testimonial-avatar w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
