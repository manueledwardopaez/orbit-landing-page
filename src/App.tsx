import { motion } from "motion/react";
import { useState, useEffect, useMemo, type ReactNode } from "react";
import { Sparkles, ChevronRight, Zap, GitBranch, BarChart3, Shield, Bell, Puzzle, Star, Twitter, Github, Linkedin, ArrowRight } from "lucide-react";
import Particles from "./Particles";

const BASE = "Launch Your ";
const PHRASES = [
  "Workflow Into Orbit",
  "Business Into Orbit",
  "Team To the Orbit",
  "Company Into Orbit",
];

/* ── Integration tool data ─────────────────────────────────────────────── */
type Tool = { name: string; letter: string; color: string; glow: string; bg: string };

const TOOLS_ROW1: Tool[] = [
  { name: "Slack",    letter: "S", color: "#ECB22E", glow: "rgba(236,178,46,0.35)",  bg: "rgba(74,21,75,0.25)"    },
  { name: "GitHub",   letter: "G", color: "#e6edf3", glow: "rgba(230,237,243,0.2)",  bg: "rgba(36,41,46,0.35)"    },
  { name: "Notion",   letter: "N", color: "#ffffff", glow: "rgba(255,255,255,0.18)", bg: "rgba(25,25,25,0.35)"    },
  { name: "Jira",     letter: "J", color: "#4BADE8", glow: "rgba(75,173,232,0.35)",  bg: "rgba(0,82,204,0.2)"     },
  { name: "Figma",    letter: "F", color: "#F24E1E", glow: "rgba(242,78,30,0.35)",   bg: "rgba(242,78,30,0.15)"   },
  { name: "Linear",   letter: "L", color: "#5E6AD2", glow: "rgba(94,106,210,0.35)",  bg: "rgba(94,106,210,0.15)"  },
  { name: "Stripe",   letter: "S", color: "#635BFF", glow: "rgba(99,91,255,0.35)",   bg: "rgba(99,91,255,0.15)"   },
  { name: "Vercel",   letter: "V", color: "#ffffff", glow: "rgba(255,255,255,0.2)",  bg: "rgba(0,0,0,0.4)"        },
];

const TOOLS_ROW2: Tool[] = [
  { name: "AWS",       letter: "A", color: "#FF9900", glow: "rgba(255,153,0,0.35)",   bg: "rgba(255,153,0,0.12)"   },
  { name: "Zoom",      letter: "Z", color: "#2D8CFF", glow: "rgba(45,140,255,0.35)",  bg: "rgba(45,140,255,0.12)"  },
  { name: "HubSpot",   letter: "H", color: "#FF7A59", glow: "rgba(255,122,89,0.35)",  bg: "rgba(255,122,89,0.12)"  },
  { name: "Zapier",    letter: "Z", color: "#FF4A00", glow: "rgba(255,74,0,0.35)",    bg: "rgba(255,74,0,0.12)"    },
  { name: "Intercom",  letter: "I", color: "#1F8EFA", glow: "rgba(31,142,250,0.35)",  bg: "rgba(31,142,250,0.12)"  },
  { name: "Salesforce",letter: "S", color: "#00A1E0", glow: "rgba(0,161,224,0.35)",   bg: "rgba(0,161,224,0.12)"   },
  { name: "Datadog",   letter: "D", color: "#632CA6", glow: "rgba(99,44,166,0.35)",   bg: "rgba(99,44,166,0.12)"   },
  { name: "Twilio",    letter: "T", color: "#F22F46", glow: "rgba(242,47,70,0.35)",   bg: "rgba(242,47,70,0.12)"   },
];

function renderToolCard(tool: Tool, i: number) {
  return (
    <div key={i} className="tool-card">
      {/* Icon badge — colored, grayscaled by parent filter, revives on hover */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
        style={{ color: tool.color, background: tool.bg, border: `1px solid ${tool.glow}` }}
      >
        {tool.letter}
      </div>
      {/* Name */}
      <span
        className="text-sm font-semibold whitespace-nowrap tracking-wide"
        style={{ color: tool.color }}
      >
        {tool.name}
      </span>
    </div>
  );
}

/* ── Scroll-blur reveal wrapper ──────────────────────────────────────────── */
function ScrollBlur({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ filter: 'blur(14px)', opacity: 0, y: 16 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Stars background for the features section ───────────────────────────── */
function StarsBackground() {
  const stars = useMemo(() =>
    Array.from({ length: 160 }, (_, i) => {
      const seed = i * 9301 + 49297;
      const rng = (n: number) => ((seed * n + 233280) % 1000000) / 1000000;
      return {
        x: rng(1) * 100,
        y: rng(2) * 100,
        size: rng(3) * 1.8 + 0.4,
        opacity: rng(4) * 0.6 + 0.2,
        duration: rng(5) * 4 + 2,
        delay: rng(6) * 5,
      };
    }), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Nebula glows */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[300px] rounded-full bg-indigo-900/20 blur-[100px]" />
      <div className="absolute top-[40%] right-[10%] w-[400px] h-[250px] rounded-full bg-blue-900/15 blur-[90px]" />
      <div className="absolute bottom-[15%] left-[30%] w-[350px] h-[200px] rounded-full bg-violet-900/15 blur-[80px]" />
      <div className="absolute top-[60%] left-[5%] w-[250px] h-[150px] rounded-full bg-cyan-900/10 blur-[70px]" />

      {/* Stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            ["--star-opacity" as string]: s.opacity,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Vibrant star background for integrations section ───────────────────── */
function StarsBackgroundVibrant() {
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

type TWPhase = 'base' | 'typing' | 'pausing' | 'deleting';

function TypewriterHeading() {
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
    <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-8 max-w-4xl leading-[1.1] text-glow">
      {BASE.slice(0, baseCount)}
      {baseCount >= BASE.length && <br />}
      <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
        {phrase.slice(0, varCount)}
      </span>
      <span className="typewriter-cursor" aria-hidden="true" />
    </h1>
  );
}

export default function App() {
  return (
    <div className="relative overflow-hidden selection:bg-cyan-500/30">
      {/* Background Layers */}
      <div className="hero-bg" />
      <div className="atmosphere" />
      
      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <img
              src="/src/Astronaut-Helmet-PNG-File.png"
              alt="Orbit logo"
              className="w-9 h-9 rounded-full object-cover"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,210,255,0.8)] transition-all duration-200">Home</a>
            <a href="#" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,210,255,0.8)] transition-all duration-200">Feature</a>
            <a href="#" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,210,255,0.8)] transition-all duration-200">Integration</a>
            <a href="#" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,210,255,0.8)] transition-all duration-200">Testimonial</a>
          </div>
          
          <button className="btn-glow glass px-6 py-2 rounded-full text-sm font-medium">
            Contact Us
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        <Particles />

        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="glass px-4 py-1.5 rounded-full flex items-center gap-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium tracking-wide text-white/80 uppercase">
              Trusted by space team.
            </span>
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
            <button className="btn-glow glass px-8 py-4 rounded-full font-semibold flex items-center gap-2 group cursor-pointer">
              Get Started For Free
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full font-semibold text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,210,255,0.8)] transition-all duration-200 cursor-pointer">
              Explore
            </button>
          </motion.div>
        </div>
      </main>

      {/* Hero bottom fade */}
      <div className="hero-bottom-fade" />

      {/* Features Section */}
      <section className="relative z-10 bg-[#03040e] px-4 pt-40 pb-32 overflow-hidden">

        {/* Space background: stars + nebula */}
        <StarsBackground />

        {/* Floating astronaut */}
        <div className="absolute right-[4%] top-[12%] z-10 pointer-events-none select-none">
          <img
            src="/src/png-clipart-astronaut-astronaut-thumbnail.png"
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
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-medium tracking-wide text-white/70 uppercase">Features</span>
            </div>
            <ScrollBlur>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4 text-glow">
                Everything your team<br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  needs to ship faster
                </span>
              </h2>
            </ScrollBlur>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              One platform to plan, execute and track — built for teams that move at the speed of orbit.
            </p>
          </motion.div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Zap className="w-6 h-6 text-cyan-400" />,
                title: "Instant Automation",
                description: "Eliminate repetitive tasks with smart triggers and flows that run in the background, 24/7.",
              },
              {
                icon: <GitBranch className="w-6 h-6 text-blue-400" />,
                title: "Visual Workflows",
                description: "Drag-and-drop builder to design multi-step processes without writing a single line of code.",
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-indigo-400" />,
                title: "Real-time Analytics",
                description: "Track performance, bottlenecks and team velocity with dashboards that update live.",
              },
              {
                icon: <Shield className="w-6 h-6 text-cyan-400" />,
                title: "Enterprise Security",
                description: "SOC 2 compliant with role-based access, SSO, and end-to-end encryption built in.",
              },
              {
                icon: <Bell className="w-6 h-6 text-blue-400" />,
                title: "Smart Notifications",
                description: "Stay in the loop without noise. Context-aware alerts that surface what actually matters.",
              },
              {
                icon: <Puzzle className="w-6 h-6 text-indigo-400" />,
                title: "100+ Integrations",
                description: "Connect with the tools your team already uses — Slack, GitHub, Notion, Jira and more.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="feature-card rounded-2xl p-7 flex flex-col gap-4 cursor-default"
              >
                <div className="feature-icon w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-display font-semibold text-lg text-white">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="relative z-10 bg-[#03040e] pt-32 pb-32 overflow-hidden">

        {/* Vibrant space background */}
        <StarsBackgroundVibrant />

        {/* Astronaut — pinned to far left edge, outside max-w container */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-20 pointer-events-none select-none z-20"
        >
          <img
            src="/src/astronaut_with_ipad.png"
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
              <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
                <Puzzle className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-medium tracking-wide text-white/70 uppercase">Integrations</span>
              </div>
              <ScrollBlur>
                <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
                  Works with your<br />
                  <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
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
          className="max-w-5xl mx-auto"
        >
          {/* Edge-fade wrapper for both rows */}
          <div className="marquee-fade-wrapper space-y-3">
            {/* Row 1 — scrolls left */}
            <div className="marquee-track">
              <div className="marquee-left">
                <div className="marquee-half">
                  {TOOLS_ROW1.map((t, i) => renderToolCard(t, i))}
                </div>
                <div className="marquee-half">
                  {TOOLS_ROW1.map((t, i) => renderToolCard(t, i))}
                </div>
              </div>
            </div>
            {/* Row 2 — scrolls right */}
            <div className="marquee-track">
              <div className="marquee-right">
                <div className="marquee-half">
                  {TOOLS_ROW2.map((t, i) => renderToolCard(t, i))}
                </div>
                <div className="marquee-half">
                  {TOOLS_ROW2.map((t, i) => renderToolCard(t, i))}
                </div>
              </div>
            </div>
          </div>
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

      {/* Testimonials Section */}
      <section className="relative z-10 px-4 pt-40 pb-32 overflow-hidden">
        {/* Background image */}
        <div className="testimonials-bg" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
              <Star className="w-4 h-4 text-cyan-400 fill-cyan-400"/>
              <span className="text-xs font-medium tracking-wide text-white/70 uppercase">Testimonials</span>
            </div>
            <ScrollBlur>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
                Loved by teams<br />
                <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  across the galaxy
                </span>
              </h2>
            </ScrollBlur>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Don't take our word for it — hear from the teams already in orbit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                quote: "Orbit cut our sprint planning time in half. The automation alone saved us 6 hours a week per engineer.",
                name: "Sarah Chen",
                role: "Engineering Lead @ Helios",
                avatar: "https://i.pravatar.cc/80?img=47",
                stars: 5,
              },
              {
                quote: "Finally a tool that actually connects everything. We replaced three apps with Orbit and never looked back.",
                name: "Marcus Wright",
                role: "Head of Product @ Nova Labs",
                avatar: "https://i.pravatar.cc/80?img=52",
                stars: 5,
              },
              {
                quote: "The analytics are insane. We spotted a bottleneck in our pipeline on day one and fixed it immediately.",
                name: "Priya Sharma",
                role: "CTO @ Stellar Systems",
                avatar: "https://i.pravatar.cc/80?img=45",
                stars: 5,
              },
              {
                quote: "Onboarding was seamless. We were fully set up and running automated workflows within the first afternoon.",
                name: "Tomás Rivera",
                role: "Ops Manager @ Vega Co",
                avatar: "https://i.pravatar.cc/80?img=33",
                stars: 5,
              },
              {
                quote: "The notification system is thoughtful. No noise, just the right alert at the right time. Love it.",
                name: "Aiko Nakamura",
                role: "Designer @ Cosmo Studio",
                avatar: "https://i.pravatar.cc/80?img=49",
                stars: 5,
              },
              {
                quote: "We've tried everything. Orbit is the only platform that feels like it was actually built for how teams work.",
                name: "Liam O'Brien",
                role: "Founder @ PulseTech",
                avatar: "https://i.pravatar.cc/80?img=53",
                stars: 5,
              },
            ].map((t, i) => (
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
                    className="testimonial-avatar w-9 h-9 rounded-full object-cover flex-shrink-0"
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

      {/* Footer */}
      <footer className="relative z-10 bg-[#060812] border-t border-white/5 px-4 pt-16 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/src/Astronaut-Helmet-PNG-File.png"
                  alt="Orbit logo"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-display font-bold text-lg">Orbit</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                The productivity platform built for teams that move fast and ship faster.
              </p>
              <div className="flex items-center gap-3 mt-6">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 feature-card rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Product",
                links: ["Features", "Integrations", "Changelog", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security", "Cookies"],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">{col.title}</p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/50 hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,210,255,0.8)] transition-all duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">© 2025 Orbit Workflow, Inc. All rights reserved.</p>
            <p className="text-xs text-white/25">Made with care for teams that dare to move faster.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
