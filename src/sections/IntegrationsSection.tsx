import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import StarsBackgroundVibrant from "../components/StarsBackgroundVibrant";
import SectionBadge from "../components/SectionBadge";
import ScrollBlur from "../components/ScrollBlur";
import ShinyText from "../../components/ShinyText";
import DecryptedText from "../../components/DecryptedText";
import LogoLoop from "../../components/LogoLoop";
import { TOOLS_ROW1, TOOLS_ROW2, type Tool } from "../utils/constants";

const toLogoNodes = (tools: Tool[]) =>
  tools.map((tool) => {
    const Icon = tool.icon;
    return {
      node: (
        <div className="tool-card">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ color: tool.color, background: tool.bg, border: `1px solid ${tool.glow}` }}
          >
            <Icon size={18} />
          </div>
          <span
            className="text-sm font-semibold whitespace-nowrap tracking-wide"
            style={{ color: tool.color }}
          >
            {tool.name}
          </span>
        </div>
      ),
    };
  });

const LOGOS_ROW1 = toLogoNodes(TOOLS_ROW1);
const LOGOS_ROW2 = toLogoNodes(TOOLS_ROW2);

export default function IntegrationsSection() {
  return (
    <section className="relative z-10 bg-[#03040e] pt-32 pb-32 overflow-hidden" id="integration">

      {/* Vibrant space background */}
      <StarsBackgroundVibrant />

      {/* Astronaut — pinned to far left edge, outside max-w container */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-20 pointer-events-none select-none z-0 md:z-20"
      >
        <img
          src="/images/astronaut_with_ipad.webp"
          alt="Astronaut with iPad"
          className="astronaut-ipad-float w-52 md:w-64 lg:w-72"
        />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Centered text header */}
        <div className="mb-20">

          {/* Text content — centered */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="mb-6"><SectionBadge label="Integrations" /></div>
            <ScrollBlur>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
                <ShinyText text="Works with your" color="rgba(255,255,255,0.85)" shineColor="#ffffff" spread={90} speed={2.5} /><br />
                <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  favorite tools
                </span>
              </h2>
            </ScrollBlur>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              <DecryptedText
                text="Plug Orbit into your existing stack in minutes. No migration, no disruption."
                animateOn="view"
                sequential
                revealDirection="start"
                speed={35}
                className="text-white/50"
                encryptedClassName="text-white/20"
              />
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-3"
      >
        <LogoLoop
          logos={LOGOS_ROW1}
          direction="left"
          speed={80}
          pauseOnHover
          fadeOut
          fadeOutColor="#03040e"
          logoHeight={56}
          gap={8}
        />
        <LogoLoop
          logos={LOGOS_ROW2}
          direction="right"
          speed={70}
          pauseOnHover
          fadeOut
          fadeOutColor="#03040e"
          logoHeight={56}
          gap={8}
        />
      </motion.div>

      {/* CTA strip */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="feature-card rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/70 text-sm md:text-base">
            Don't see your tool? We're adding new integrations every week.
          </p>
          <button className="flex items-center gap-2 text-cyan-400 font-semibold text-sm hover:gap-3 transition-all whitespace-nowrap cursor-pointer">
            Request an integration <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
