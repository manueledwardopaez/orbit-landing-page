import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Sparkles, ChevronRight, Zap, GitBranch, BarChart3, Shield, Bell, Puzzle, Star, Twitter, Github, Linkedin, ArrowRight } from "lucide-react";
import Particles from "./Particles";

const LINE1 = "Launch Your ";
const LINE2 = "Workflow Into Orbit";
const FULL  = LINE1 + LINE2;

function TypewriterHeading() {
  const [count, setCount] = useState(0);
  const [done, setDone]   = useState(false);

  useEffect(() => {
    if (count >= FULL.length) { setDone(true); return; }
    const delay = count === 0 ? 600 : 55 + Math.random() * 35; // initial pause, then per-char
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [count]);

  const part1 = FULL.slice(0, Math.min(count, LINE1.length));
  const part2 = count > LINE1.length ? FULL.slice(LINE1.length, count) : "";
  const showCursor = !done;

  return (
    <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-8 max-w-4xl leading-[1.1] text-glow">
      {part1}
      {part1.length === LINE1.length && <br />}
      <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
        {part2}
      </span>
      {showCursor && (
        <span className="typewriter-cursor" aria-hidden="true">|</span>
      )}
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
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Feature</a>
            <a href="#" className="hover:text-white transition-colors">Integration</a>
            <a href="#" className="hover:text-white transition-colors">Testimonial</a>
          </div>
          
          <button className="btn-glow glass px-6 py-2 rounded-full text-sm font-medium">
            Sign In
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

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-8 max-w-4xl leading-[1.1] text-glow"
          >
            Launch Your <br />
            <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              Workflow Into Orbit
            </span>
          </motion.h1>

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
            <button className="btn-glow glass px-8 py-4 rounded-full font-semibold flex items-center gap-2 group">
              Get Started For Free
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full font-semibold text-white/80 hover:text-white transition-colors">
              Explore
            </button>
          </motion.div>
        </div>
      </main>

      {/* Hero bottom fade */}
      <div className="hero-bottom-fade" />

      {/* Features Section */}
      <section className="relative z-10 bg-[#060812] px-4 pb-32">
        <div className="max-w-6xl mx-auto">

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
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4 text-glow">
              Everything your team<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                needs to ship faster
              </span>
            </h2>
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
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="feature-card rounded-2xl p-7 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
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
      <section className="relative z-10 bg-[#060812] px-4 pb-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
              <Puzzle className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-medium tracking-wide text-white/70 uppercase">Integrations</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
              Works with your<br />
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                favorite tools
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Plug Orbit into your existing stack in minutes. No migration, no disruption.
            </p>
          </motion.div>

          {/* Integration logos grid */}
          <div className="relative">
            {/* Glow behind grid */}
            <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { name: "Slack", color: "text-purple-400", letter: "S" },
                { name: "GitHub", color: "text-white", letter: "G" },
                { name: "Notion", color: "text-white", letter: "N" },
                { name: "Jira", color: "text-blue-400", letter: "J" },
                { name: "Figma", color: "text-pink-400", letter: "F" },
                { name: "Linear", color: "text-violet-400", letter: "L" },
                { name: "Stripe", color: "text-cyan-400", letter: "S" },
                { name: "Vercel", color: "text-white", letter: "V" },
                { name: "AWS", color: "text-orange-400", letter: "A" },
                { name: "Zoom", color: "text-blue-400", letter: "Z" },
                { name: "Hubspot", color: "text-orange-400", letter: "H" },
                { name: "Zapier", color: "text-orange-300", letter: "Z" },
              ].map((tool, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="feature-card rounded-2xl p-5 flex flex-col items-center gap-3 group cursor-default"
                >
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-lg ${tool.color}`}>
                    {tool.letter}
                  </div>
                  <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors">{tool.name}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 feature-card rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <p className="text-white/70 text-sm md:text-base">
                Don't see your tool? We're adding new integrations every week.
              </p>
              <button className="flex items-center gap-2 text-cyan-400 font-semibold text-sm hover:gap-3 transition-all whitespace-nowrap">
                Request an integration <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 bg-[#060812] px-4 pb-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-medium tracking-wide text-white/70 uppercase">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
              Loved by teams<br />
              <span className="bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
                across the galaxy
              </span>
            </h2>
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
                stars: 5,
              },
              {
                quote: "Finally a tool that actually connects everything. We replaced three apps with Orbit and never looked back.",
                name: "Marcus Wright",
                role: "Head of Product @ Nova Labs",
                stars: 5,
              },
              {
                quote: "The analytics are insane. We spotted a bottleneck in our pipeline on day one and fixed it immediately.",
                name: "Priya Sharma",
                role: "CTO @ Stellar Systems",
                stars: 5,
              },
              {
                quote: "Onboarding was seamless. We were fully set up and running automated workflows within the first afternoon.",
                name: "Tomás Rivera",
                role: "Ops Manager @ Vega Co",
                stars: 5,
              },
              {
                quote: "The notification system is thoughtful. No noise, just the right alert at the right time. Love it.",
                name: "Aiko Nakamura",
                role: "Designer @ Cosmo Studio",
                stars: 5,
              },
              {
                quote: "We've tried everything. Orbit is the only platform that feels like it was actually built for how teams work.",
                name: "Liam O'Brien",
                role: "Founder @ PulseTech",
                stars: 5,
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="feature-card rounded-2xl p-7 flex flex-col gap-5"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-bold">
                    {t.name.charAt(0)}
                  </div>
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
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-lg">f</div>
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
                      <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{link}</a>
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
