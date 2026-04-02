import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown, Mail, MessageCircle } from "lucide-react";
import { SiGithub } from "react-icons/si";
import StarsBackgroundVibrant from "../components/StarsBackgroundVibrant";
import SectionBadge from "../components/SectionBadge";
import ScrollBlur from "../components/ScrollBlur";
import ShinyText from "../../components/ShinyText";

import ipadAstronautSrcSet from "../images/astronaut_with_ipad.webp?w=200;400;800&format=webp&as=srcset";
import LogoLoop from "../../components/LogoLoop";
import { TOOLS_ROW1, TOOLS_ROW2, type Tool } from "../utils/constants";
import { REDIRECTS } from "../utils/redirect";

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

const CHANNELS = [
  {
    icon: <SiGithub size={20} color="#e6edf3" />,
    label: 'Open a GitHub issue',
    description: 'Browse existing requests or open a new one in our public repo.',
    href: REDIRECTS.GITHUB,
    color: 'rgba(230,237,243,0.06)',
    border: 'rgba(230,237,243,0.1)',
    colorHover: 'rgba(230,237,243,0.1)',
    borderHover: 'rgba(230,237,243,0.25)',
    glow: '0 0 20px rgba(230,237,243,0.08)',
  },
  {
    icon: <Mail size={20} color="#22d3ee" />,
    label: 'Send us an email',
    description: 'Reach the integrations team directly at integrations@orbit.io.',
    href: 'mailto:integrations@orbit.io',
    color: 'rgba(34,211,238,0.06)',
    border: 'rgba(34,211,238,0.15)',
    colorHover: 'rgba(34,211,238,0.12)',
    borderHover: 'rgba(34,211,238,0.4)',
    glow: '0 0 20px rgba(34,211,238,0.12)',
  },
  {
    icon: <MessageCircle size={20} color="#818cf8" />,
    label: 'Vote in the community',
    description: 'Upvote and discuss integration ideas with other Orbit users.',
    href: '#integration',
    color: 'rgba(129,140,248,0.06)',
    border: 'rgba(129,140,248,0.15)',
    colorHover: 'rgba(129,140,248,0.12)',
    borderHover: 'rgba(129,140,248,0.4)',
    glow: '0 0 20px rgba(129,140,248,0.12)',
  },
];

function RequestDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="feature-card rounded-2xl overflow-hidden"
    >
      {/* Header row — always visible, clickable */}
      <button
        onClick={() => setOpen((v: boolean) => !v)}
        className="w-full px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer"
      >
        <p className="text-white/70 text-sm md:text-base text-left">
          Don't see your tool? We're adding new integrations every week.
        </p>
        <span className="flex items-center gap-2 text-cyan-400 font-semibold text-sm whitespace-nowrap shrink-0">
          Request an integration
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex' }}
          >
            <ChevronDown size={16} />
          </motion.span>
        </span>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-8 pt-6 pb-8 flex flex-col gap-4 border-t border-white/5">
              <p className="text-white/40 text-xs">
                Pick a channel and tell us what you need — we prioritize based on votes and demand.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {CHANNELS.map((ch, i) => (
                  <motion.a
                    key={i}
                    href={ch.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    rel="noopener noreferrer"
                    target="_blank"
                    transition={{ duration: 0.3, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-2 p-4 rounded-xl group hover:scale-[1.02] transition-all duration-300"
                    style={{
                      background: ch.color,
                      border: `1px solid ${ch.border}`,
                      transition: 'background 0.1s ease, border-color 0.1s ease, box-shadow 0.1s ease, transform 0.1s ease',
                    }}
                    whileHover={{
                      background: ch.colorHover,
                      borderColor: ch.borderHover,
                      boxShadow: ch.glow,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {ch.icon}
                      <span className="text-sm font-semibold text-white/90">{ch.label}</span>
                      <ArrowRight size={13} className="ml-auto text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">{ch.description}</p>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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
          srcSet={ipadAstronautSrcSet}
          sizes="(max-width: 768px) 208px, (max-width: 1024px) 256px, 288px"
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
                <ShinyText text="Works with your" color="rgba(180,190,200,0.85)" shineColor="#ffffff" spread={90} speed={2} /><br />
                <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  favorite tools
                </span>
              </h2>
            </ScrollBlur>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Plug Orbit into your existing stack in minutes. No migration, no disruption.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-3 pb-4"
      >
        {/* Mobile: 1 Row with all logos */}
        <div className="block md:hidden">
          <LogoLoop
            logos={[...LOGOS_ROW1, ...LOGOS_ROW2]}
            direction="left"
            speed={80}
            pauseOnHover
            fadeOut
            fadeOutColor="#03040e"
            logoHeight={56}
            gap={8}
          />
        </div>

        {/* Desktop: 2 Rows */}
        <div className="hidden md:block space-y-3">
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
        </div>
      </motion.div>

      {/* CTA strip — dropdown — Hidden on mobile */}
      <div className="hidden md:block max-w-6xl mx-auto px-4 my-12">
        <RequestDropdown />
      </div>
    </section>
  );
}
