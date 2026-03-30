import { type ElementType } from "react";
import { Zap, GitBranch, BarChart3, Shield, Bell, Puzzle } from "lucide-react";
import {
  SiSlack, SiGithub, SiNotion, SiJira, SiFigma, SiLinear, SiStripe, SiVercel,
  SiZoom, SiHubspot, SiZapier, SiIntercom, SiSalesforce, SiDatadog, SiTwilio,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

export const BASE = "Launch Your ";
export const PHRASES = [
  "Workflow Into Orbit",
  "Business Into Orbit",
  "Team To the Orbit",
  "Company Into Orbit",
];

export type Tool = { name: string; icon: ElementType; color: string; glow: string; bg: string };

export const TOOLS_ROW1: Tool[] = [
  { name: "Slack",    icon: SiSlack,             color: "#ECB22E", glow: "rgba(236,178,46,0.35)",  bg: "rgba(74,21,75,0.25)"    },
  { name: "GitHub",   icon: SiGithub,            color: "#e6edf3", glow: "rgba(230,237,243,0.2)",  bg: "rgba(36,41,46,0.35)"    },
  { name: "Notion",   icon: SiNotion,            color: "#ffffff", glow: "rgba(255,255,255,0.18)", bg: "rgba(25,25,25,0.35)"    },
  { name: "Jira",     icon: SiJira,              color: "#4BADE8", glow: "rgba(75,173,232,0.35)",  bg: "rgba(0,82,204,0.2)"     },
  { name: "Figma",    icon: SiFigma,             color: "#F24E1E", glow: "rgba(242,78,30,0.35)",   bg: "rgba(242,78,30,0.15)"   },
  { name: "Linear",   icon: SiLinear,            color: "#5E6AD2", glow: "rgba(94,106,210,0.35)",  bg: "rgba(94,106,210,0.15)"  },
  { name: "Stripe",   icon: SiStripe,            color: "#635BFF", glow: "rgba(99,91,255,0.35)",   bg: "rgba(99,91,255,0.15)"   },
  { name: "Vercel",   icon: SiVercel,            color: "#ffffff", glow: "rgba(255,255,255,0.2)",  bg: "rgba(0,0,0,0.4)"        },
];

export const TOOLS_ROW2: Tool[] = [
  { name: "AWS",       icon: FaAws,               color: "#FF9900", glow: "rgba(255,153,0,0.35)",   bg: "rgba(255,153,0,0.12)"   },
  { name: "Zoom",      icon: SiZoom,              color: "#2D8CFF", glow: "rgba(45,140,255,0.35)",  bg: "rgba(45,140,255,0.12)"  },
  { name: "HubSpot",   icon: SiHubspot,           color: "#FF7A59", glow: "rgba(255,122,89,0.35)",  bg: "rgba(255,122,89,0.12)"  },
  { name: "Zapier",    icon: SiZapier,            color: "#FF4A00", glow: "rgba(255,74,0,0.35)",    bg: "rgba(255,74,0,0.12)"    },
  { name: "Intercom",  icon: SiIntercom,          color: "#1F8EFA", glow: "rgba(31,142,250,0.35)",  bg: "rgba(31,142,250,0.12)"  },
  { name: "Salesforce",icon: SiSalesforce,        color: "#00A1E0", glow: "rgba(0,161,224,0.35)",   bg: "rgba(0,161,224,0.12)"   },
  { name: "Datadog",   icon: SiDatadog,           color: "#632CA6", glow: "rgba(99,44,166,0.35)",   bg: "rgba(99,44,166,0.12)"   },
  { name: "Twilio",    icon: SiTwilio,            color: "#F22F46", glow: "rgba(242,47,70,0.35)",   bg: "rgba(242,47,70,0.12)"   },
];

export const FEATURES = [
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

export const TESTIMONIALS = [
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
];
