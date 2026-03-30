import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useMemo, useRef, type ReactNode, type ElementType } from "react";
import { ChevronRight, Zap, GitBranch, BarChart3, Shield, Bell, Puzzle, Star, Twitter, Github, Linkedin, ArrowRight } from "lucide-react";
import {
  SiSlack, SiGithub, SiNotion, SiJira, SiFigma, SiLinear, SiStripe, SiVercel,
  SiZoom, SiHubspot, SiZapier, SiIntercom, SiSalesforce, SiDatadog, SiTwilio,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import Particles from "./Particles";
import ShinyText from "../components/ShinyText";
import DecryptedText from "../components/DecryptedText";
import LogoLoop from "../components/LogoLoop";
import LightRays from "../components/LightRays";

const BASE = "Launch Your ";
const PHRASES = [
  "Workflow Into Orbit",
  "Business Into Orbit",
  "Team To the Orbit",
  "Company Into Orbit",
];

/* ── Integration tool data ─────────────────────────────────────────────── */
type Tool = { name: string; icon: ElementType; color: string; glow: string; bg: string };

const TOOLS_ROW1: Tool[] = [
  { name: "Slack",    icon: SiSlack,             color: "#ECB22E", glow: "rgba(236,178,46,0.35)",  bg: "rgba(74,21,75,0.25)"    },
  { name: "GitHub",   icon: SiGithub,            color: "#e6edf3", glow: "rgba(230,237,243,0.2)",  bg: "rgba(36,41,46,0.35)"    },
  { name: "Notion",   icon: SiNotion,            color: "#ffffff", glow: "rgba(255,255,255,0.18)", bg: "rgba(25,25,25,0.35)"    },
  { name: "Jira",     icon: SiJira,              color: "#4BADE8", glow: "rgba(75,173,232,0.35)",  bg: "rgba(0,82,204,0.2)"     },
  { name: "Figma",    icon: SiFigma,             color: "#F24E1E", glow: "rgba(242,78,30,0.35)",   bg: "rgba(242,78,30,0.15)"   },
  { name: "Linear",   icon: SiLinear,            color: "#5E6AD2", glow: "rgba(94,106,210,0.35)",  bg: "rgba(94,106,210,0.15)"  },
  { name: "Stripe",   icon: SiStripe,            color: "#635BFF", glow: "rgba(99,91,255,0.35)",   bg: "rgba(99,91,255,0.15)"   },
  { name: "Vercel",   icon: SiVercel,            color: "#ffffff", glow: "rgba(255,255,255,0.2)",  bg: "rgba(0,0,0,0.4)"        },
];

const TOOLS_ROW2: Tool[] = [
  { name: "AWS",       icon: FaAws,               color: "#FF9900", glow: "rgba(255,153,0,0.35)",   bg: "rgba(255,153,0,0.12)"   },
  { name: "Zoom",      icon: SiZoom,              color: "#2D8CFF", glow: "rgba(45,140,255,0.35)",  bg: "rgba(45,140,255,0.12)"  },
  { name: "HubSpot",   icon: SiHubspot,           color: "#FF7A59", glow: "rgba(255,122,89,0.35)",  bg: "rgba(255,122,89,0.12)"  },
  { name: "Zapier",    icon: SiZapier,            color: "#FF4A00", glow: "rgba(255,74,0,0.35)",    bg: "rgba(255,74,0,0.12)"    },
  { name: "Intercom",  icon: SiIntercom,          color: "#1F8EFA", glow: "rgba(31,142,250,0.35)",  bg: "rgba(31,142,250,0.12)"  },
  { name: "Salesforce",icon: SiSalesforce,        color: "#00A1E0", glow: "rgba(0,161,224,0.35)",   bg: "rgba(0,161,224,0.12)"   },
  { name: "Datadog",   icon: SiDatadog,           color: "#632CA6", glow: "rgba(99,44,166,0.35)",   bg: "rgba(99,44,166,0.12)"   },
  { name: "Twilio",    icon: SiTwilio,            color: "#F22F46", glow: "rgba(242,47,70,0.35)",   bg: "rgba(242,47,70,0.12)"   },
];

const toLogoNodes = (tools: Tool[]) =>
  tools.map(tool => {
    const Icon = tool.icon;
    return {
      node: (
        <div className="tool-card">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
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

/* ── Section badge ───────────────────────────────────────────────────────── */
function SectionBadge({ label }: { label: string }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(255,255,255,0.04)',
      padding: '6px 14px 6px 8px',
    }}>
      <div className="badge-dot-outer" style={{
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        background: '#00c8ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#060d1b' }} />
      </div>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.55)',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
      }}>
        {label}
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

/* ── Canvas star background for features section ───────────────────────── */
function FeatureStarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.6 + 0.3,
      baseOpacity: Math.random() * 0.55 + 0.2,
      speed: Math.random() * 0.008 + 0.004,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    const animate = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        const opacity = p.baseOpacity * (0.5 + 0.5 * Math.sin(t * 0.001 * p.speed * 100 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ── Feature data ────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
    iconLg: <Zap className="w-10 h-10 text-cyan-400" />,
    title: "Instant Automation",
    description: "Eliminate repetitive tasks with smart triggers and flows that run in the background, 24/7.",
    detail: "Our intelligent automation engine learns your team's patterns and surfaces workflow suggestions before you even need them. From simple task assignments to complex multi-step pipelines — set it once and let Orbit handle the rest around the clock.",
    stats: [
      { num: "80%", label: "Time saved on repetitive tasks" },
      { num: "10x", label: "Faster workflow deployment" },
      { num: "24/7", label: "Background execution" },
    ],
    accent: "#22d3ee",
  },
  {
    icon: <GitBranch className="w-6 h-6 text-blue-400" />,
    iconLg: <GitBranch className="w-10 h-10 text-blue-400" />,
    title: "Visual Workflows",
    description: "Drag-and-drop builder to design multi-step processes without writing a single line of code.",
    detail: "Build complex multi-step automations through an intuitive drag-and-drop canvas. Connect triggers, conditions, and actions visually. Share and collaborate on workflow templates with your entire team in real time.",
    stats: [
      { num: "200+", label: "Pre-built templates" },
      { num: "0", label: "Lines of code required" },
      { num: "5 min", label: "Average setup time" },
    ],
    accent: "#60a5fa",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-indigo-400" />,
    iconLg: <BarChart3 className="w-10 h-10 text-indigo-400" />,
    title: "Real-time Analytics",
    description: "Track performance, bottlenecks and team velocity with dashboards that update live.",
    detail: "Get a live pulse on your team's performance with dashboards that refresh in milliseconds. Drill into bottlenecks, track sprint velocity, and surface actionable insights before they become blockers.",
    stats: [
      { num: "<1s", label: "Dashboard refresh rate" },
      { num: "50+", label: "Built-in metric types" },
      { num: "3x", label: "Faster incident detection" },
    ],
    accent: "#818cf8",
  },
  {
    icon: <Shield className="w-6 h-6 text-cyan-400" />,
    iconLg: <Shield className="w-10 h-10 text-cyan-400" />,
    title: "Enterprise Security",
    description: "SOC 2 compliant with role-based access, SSO, and end-to-end encryption built in.",
    detail: "Built from the ground up for enterprise requirements. SOC 2 Type II certified, GDPR compliant, with granular role-based access controls, SSO via SAML/OIDC, and AES-256 encryption for all data in transit and at rest.",
    stats: [
      { num: "SOC2", label: "Type II certified" },
      { num: "256-bit", label: "AES encryption" },
      { num: "99.99%", label: "Uptime SLA" },
    ],
    accent: "#22d3ee",
  },
  {
    icon: <Bell className="w-6 h-6 text-blue-400" />,
    iconLg: <Bell className="w-10 h-10 text-blue-400" />,
    title: "Smart Notifications",
    description: "Stay in the loop without noise. Context-aware alerts that surface what actually matters.",
    detail: "Orbit's notification engine uses context signals to determine exactly when to alert you — and when to stay quiet. No more notification fatigue. The right information at the right moment, delivered wherever your team works.",
    stats: [
      { num: "73%", label: "Reduction in alert noise" },
      { num: "12+", label: "Delivery channels" },
      { num: "AI", label: "Context-aware filtering" },
    ],
    accent: "#60a5fa",
  },
  {
    icon: <Puzzle className="w-6 h-6 text-indigo-400" />,
    iconLg: <Puzzle className="w-10 h-10 text-indigo-400" />,
    title: "100+ Integrations",
    description: "Connect with the tools your team already uses — Slack, GitHub, Notion, Jira and more.",
    detail: "Plug Orbit into your existing stack in minutes. Native two-way integrations with Slack, GitHub, Notion, Jira, Figma, and 100+ more tools keep everything in context without ever leaving your workflow.",
    stats: [
      { num: "100+", label: "Native integrations" },
      { num: "2-way", label: "Bidirectional sync" },
      { num: "<5 min", label: "Integration setup" },
    ],
    accent: "#818cf8",
  },
];

/* ── Interactive features grid + detail panel ───────────────────────────── */
function FeaturesSection() {
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

      <FeaturesSection />

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
          className="absolute left-0 top-20 pointer-events-none select-none z-0 md:z-20"
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
              <div className="mb-6"><SectionBadge label="Integrations" /></div>
              <ScrollBlur>
                <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
                  <ShinyText text="Works with your" color="rgba(255,255,255,0.85)" shineColor="#ffffff" spread={90} speed={2.5} /><br />
                  <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
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

      {/* Testimonials Section */}
      <section className="relative z-10 px-4 pt-40 pb-32 overflow-hidden">
        {/* Background image */}
        <div className="testimonials-bg" />

        {/* Light rays — above bg image, below content */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
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
            <p className="text-xs text-white/25">© {new Date().getFullYear()} Orbit Workflow, Inc. All rights reserved.</p>
            <p className="text-xs text-white/25">Made with care for teams that dare to move a the speed of light.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
