import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import Particles from "../Particles";
import SectionBadge from "../components/SectionBadge";
import TypewriterHeading from "../components/TypewriterHeading";

export default function HeroSection() {
  return (
    <main className="relative min-h-[100svh] md:min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      <Particles />

      <div className="relative z-10 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mb-8"
        >
          <SectionBadge label="Trusted by space team." />
        </motion.div>

        {/* Main Heading — typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <TypewriterHeading />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed"
        >
          Smart productivity, automation and integration provide the next generation of teams.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.58 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="#feature" className="btn-glow glass px-8 py-4 rounded-full font-semibold flex items-center gap-2 group cursor-pointer">
            Get Started For Free
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#feature" className="px-8 py-4 rounded-full font-semibold text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,210,255,0.8)] transition-all duration-200 cursor-pointer">
            Explore
          </a>
        </motion.div>
      </div>
    </main>
  );
}
